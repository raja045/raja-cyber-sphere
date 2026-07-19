const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const decodeXml = (value = "") =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

const stripHtml = (value = "") =>
  decodeXml(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const getTagValue = (block, tag) => {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
};

const extractImageFromHtml = (html = "") => {
  const match = html.match(/<img[^>]+src="([^"]+)"/i);
  return match?.[1];
};

const parseRssItems = (xml, platform) => {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

  return items.map((item, index) => {
    const title = getTagValue(item, "title");
    const link = getTagValue(item, "link") || getTagValue(item, "guid");
    const pubDate = getTagValue(item, "pubDate") || getTagValue(item, "dc:date");
    const description = getTagValue(item, "description") || getTagValue(item, "content:encoded");
    const enclosureMatch = item.match(/<enclosure[^>]+url="([^"]+)"/i);
    const mediaMatch = item.match(/<media:thumbnail[^>]+url="([^"]+)"/i);
    const publishedAt = pubDate ? new Date(pubDate).toISOString() : new Date(0).toISOString();

    return {
      id: `${platform}-${index}-${link}`,
      title,
      url: link,
      publishedAt,
      excerpt: stripHtml(description).slice(0, 180),
      platform,
      imageUrl:
        enclosureMatch?.[1] || mediaMatch?.[1] || extractImageFromHtml(description),
    };
  });
};

const parseRss2Json = (data, platform) => {
  if (!data?.items?.length) return [];

  return data.items.map((item, index) => ({
    id: `${platform}-rss2json-${index}-${item.link}`,
    title: item.title,
    url: item.link,
    publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date(0).toISOString(),
    excerpt: stripHtml(item.description).slice(0, 180),
    platform,
    imageUrl: item.thumbnail || item.enclosure?.link,
  }));
};

const buildMediumFeedUrls = (username, customRssUrl) => {
  if (customRssUrl) return [customRssUrl];

  const normalized = username.replace(/^@/, "");
  return [
    `https://medium.com/feed/@${normalized}`,
    `https://${normalized}.medium.com/feed`,
    `https://medium.com/feed/${normalized}`,
  ];
};

async function fetchRssXml(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": BROWSER_USER_AGENT,
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
    signal: AbortSignal.timeout(12000),
  });

  if (!response.ok) {
    return null;
  }

  const xml = await response.text();
  if (!xml.includes("<rss") && !xml.includes("<feed")) {
    return null;
  }

  return xml;
}

async function fetchRss(url, platform) {
  try {
    const xml = await fetchRssXml(url);
    if (!xml) return [];

    return parseRssItems(xml, platform).filter((post) => post.title && post.url);
  } catch (error) {
    console.warn(`RSS fetch error for ${platform} (${url}):`, error.message);
    return [];
  }
}

async function fetchMediumViaRss2Json(rssUrl, apiKey) {
  if (!apiKey) return [];

  try {
    const endpoint = new URL("https://api.rss2json.com/v1/api.json");
    endpoint.searchParams.set("rss_url", rssUrl);
    endpoint.searchParams.set("api_key", apiKey);
    endpoint.searchParams.set("count", "10");

    const response = await fetch(endpoint.toString(), {
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) return [];

    const data = await response.json();
    if (data.status !== "ok") {
      console.warn("rss2json error:", data.message);
      return [];
    }

    return parseRss2Json(data, "medium");
  } catch (error) {
    console.warn("rss2json fetch error:", error.message);
    return [];
  }
}

async function fetchMediumPosts(username, options = {}) {
  const { customRssUrl, rss2JsonApiKey } = options;
  const feedUrls = buildMediumFeedUrls(username, customRssUrl);

  for (const url of feedUrls) {
    const posts = await fetchRss(url, "medium");
    if (posts.length > 0) {
      return { posts, feedUrl: url };
    }
  }

  if (rss2JsonApiKey) {
    for (const url of feedUrls) {
      const posts = await fetchMediumViaRss2Json(url, rss2JsonApiKey);
      if (posts.length > 0) {
        return { posts, feedUrl: url, via: "rss2json" };
      }
    }
  }

  return {
    posts: [],
    feedUrl: feedUrls[0],
    error:
      "No Medium posts found. Verify MEDIUM_USERNAME is correct and the profile has published stories.",
  };
}

module.exports = {
  BROWSER_USER_AGENT,
  buildMediumFeedUrls,
  fetchRss,
  fetchMediumPosts,
  parseRssItems,
};
