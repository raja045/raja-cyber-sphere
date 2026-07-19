import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MEDIUM_USERNAME = Deno.env.get("MEDIUM_USERNAME") || "nakamotosecurity";
const MEDIUM_RSS_URL =
  Deno.env.get("MEDIUM_RSS_URL") || `https://medium.com/feed/@${MEDIUM_USERNAME}`;
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
        imageUrl: enclosureMatch?.[1],
      };
    })
    .filter((post) => post.title && post.url);
};

const fetchRss = async (url: string, platform: BlogPlatform): Promise<BlogPost[]> => {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "RajaPortfolioBlogBot/1.0",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
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

    return parseRssItems(xml, platform);
  } catch (error) {
    console.warn(`RSS fetch error for ${platform}:`, error);
    return [];
  }
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

    const [hashnodePosts, mediumPosts] = await Promise.all([
      fetchRss(HASHNODE_RSS_URL, "hashnode"),
      fetchRss(MEDIUM_RSS_URL, "medium"),
    ]);

    const posts = [...hashnodePosts, ...mediumPosts]
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
          medium: { url: MEDIUM_RSS_URL, count: mediumPosts.length },
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
