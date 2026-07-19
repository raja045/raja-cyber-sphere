const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || "nakamotosecurity";
const MEDIUM_RSS_URL =
  process.env.MEDIUM_RSS_URL || `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const HASHNODE_HOST = process.env.HASHNODE_HOST || "toxsec.hashnode.dev";
const HASHNODE_RSS_URL = `https://${HASHNODE_HOST}/rss.xml`;

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

const parseRssItems = (xml, platform) => {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

  return items.map((item, index) => {
    const title = getTagValue(item, "title");
    const link = getTagValue(item, "link") || getTagValue(item, "guid");
    const pubDate = getTagValue(item, "pubDate") || getTagValue(item, "dc:date");
    const description = getTagValue(item, "description") || getTagValue(item, "content:encoded");
    const enclosureMatch = item.match(/<enclosure[^>]+url="([^"]+)"/i);
    const publishedAt = pubDate ? new Date(pubDate).toISOString() : new Date(0).toISOString();

    return {
      id: `${platform}-${index}-${link}`,
      title,
      url: link,
      publishedAt,
      excerpt: stripHtml(description).slice(0, 180),
      platform,
      imageUrl: enclosureMatch?.[1],
    };
  });
};

const fetchRss = async (url, platform) => {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "RajaPortfolioBlogBot/1.0",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.warn(`RSS fetch failed for ${platform}: ${response.status}`);
      return [];
    }

    const xml = await response.text();
    if (!xml.includes("<rss") && !xml.includes("<feed")) {
      console.warn(`Invalid RSS response for ${platform}`);
      return [];
    }

    return parseRssItems(xml, platform).filter((post) => post.title && post.url);
  } catch (error) {
    console.warn(`RSS fetch error for ${platform}:`, error.message);
    return [];
  }
};

const sortPosts = (posts) =>
  [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

async function fetchBlogPosts(limit = 6) {
  const [hashnodePosts, mediumPosts] = await Promise.all([
    fetchRss(HASHNODE_RSS_URL, "hashnode"),
    fetchRss(MEDIUM_RSS_URL, "medium"),
  ]);

  const posts = sortPosts([...hashnodePosts, ...mediumPosts]).slice(0, limit);

  return {
    posts,
    fetchedAt: new Date().toISOString(),
    sources: {
      hashnode: { url: HASHNODE_RSS_URL, count: hashnodePosts.length },
      medium: { url: MEDIUM_RSS_URL, count: mediumPosts.length },
    },
  };
}

module.exports = {
  fetchBlogPosts,
  MEDIUM_USERNAME,
  HASHNODE_HOST,
};
