import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const MEDIUM_USERNAME = Deno.env.get("MEDIUM_USERNAME") || "nakamotosecurity";
const MEDIUM_RSS_URL = Deno.env.get("MEDIUM_RSS_URL") || "";
const RSS2JSON_API_KEY = Deno.env.get("RSS2JSON_API_KEY") || "";
const HASHNODE_HOST = Deno.env.get("HASHNODE_HOST") || "toxsec.hashnode.dev";
const HASHNODE_RSS_URL = `https://${HASHNODE_HOST}/rss.xml`;

type BlogPlatform = "medium" | "hashnode";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  excerpt: string;
  platform: BlogPlatform;
  imageUrl?: string;
}

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

const getTagValue = (block: string, tag: string) => {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
};

const extractImageFromHtml = (html = "") => {
  const match = html.match(/<img[^>]+src="([^"]+)"/i);
  return match?.[1];
};

const parseRssItems = (xml: string, platform: BlogPlatform): BlogPost[] => {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

  return items
    .map((item, index) => {
      const title = getTagValue(item, "title");
      const link = getTagValue(item, "link") || getTagValue(item, "guid");
      const pubDate = getTagValue(item, "pubDate") || getTagValue(item, "dc:date");
      const description =
        getTagValue(item, "description") || getTagValue(item, "content:encoded");
      const enclosureMatch = item.match(/<enclosure[^>]+url="([^"]+)"/i);
      const mediaMatch = item.match(/<media:thumbnail[^>]+url="([^"]+)"/i);
      const publishedAt = pubDate
        ? new Date(pubDate).toISOString()
        : new Date(0).toISOString();

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
    })
    .filter((post) => post.title && post.url);
};

const buildMediumFeedUrls = (username: string, customRssUrl?: string) => {
  if (customRssUrl) return [customRssUrl];
  const normalized = username.replace(/^@/, "");
  return [
    `https://medium.com/feed/@${normalized}`,
    `https://${normalized}.medium.com/feed`,
    `https://medium.com/feed/${normalized}`,
  ];
};

const fetchRss = async (url: string, platform: BlogPlatform): Promise<BlogPost[]> => {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": BROWSER_USER_AGENT,
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    if (!xml.includes("<rss") && !xml.includes("<feed")) return [];

    return parseRssItems(xml, platform);
  } catch {
    return [];
  }
};

const fetchMediumViaRss2Json = async (rssUrl: string, apiKey: string) => {
  const endpoint = new URL("https://api.rss2json.com/v1/api.json");
  endpoint.searchParams.set("rss_url", rssUrl);
  endpoint.searchParams.set("api_key", apiKey);
  endpoint.searchParams.set("count", "10");

  const response = await fetch(endpoint.toString());
  if (!response.ok) return [];

  const data = await response.json();
  if (data.status !== "ok" || !data.items?.length) return [];

  return data.items.map((item: any, index: number) => ({
    id: `medium-rss2json-${index}-${item.link}`,
    title: item.title,
    url: item.link,
    publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date(0).toISOString(),
    excerpt: stripHtml(item.description).slice(0, 180),
    platform: "medium" as const,
    imageUrl: item.thumbnail || item.enclosure?.link,
  }));
};

const fetchMediumPosts = async () => {
  const feedUrls = buildMediumFeedUrls(MEDIUM_USERNAME, MEDIUM_RSS_URL || undefined);

  for (const url of feedUrls) {
    const posts = await fetchRss(url, "medium");
    if (posts.length > 0) {
      return { posts, feedUrl: url };
    }
  }

  if (RSS2JSON_API_KEY) {
    for (const url of feedUrls) {
      const posts = await fetchMediumViaRss2Json(url, RSS2JSON_API_KEY);
      if (posts.length > 0) {
        return { posts, feedUrl: url, via: "rss2json" };
      }
    }
  }

  return {
    posts: [],
    feedUrl: feedUrls[0],
    error: "No Medium posts found. Check MEDIUM_USERNAME and published stories.",
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let limit = 6;
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      limit = Math.min(Number(body?.limit) || 6, 12);
    } else {
      const url = new URL(req.url);
      limit = Math.min(Number(url.searchParams.get("limit") || 6), 12);
    }

    const [hashnodePosts, mediumResult] = await Promise.all([
      fetchRss(HASHNODE_RSS_URL, "hashnode"),
      fetchMediumPosts(),
    ]);

    const posts = [...hashnodePosts, ...mediumResult.posts]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .slice(0, limit);

    return new Response(
      JSON.stringify({
        posts,
        fetchedAt: new Date().toISOString(),
        sources: {
          hashnode: { url: HASHNODE_RSS_URL, count: hashnodePosts.length },
          medium: {
            url: mediumResult.feedUrl,
            count: mediumResult.posts.length,
            via: mediumResult.via || "rss",
            error: mediumResult.error,
          },
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("fetch-blogs error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch blog posts", posts: [] }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
