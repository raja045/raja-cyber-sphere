import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Parser from "https://esm.sh/rss-parser@3.13.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const parser = new Parser({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

const MEDIUM_FEED =
  Deno.env.get("MEDIUM_FEED") ||
  Deno.env.get("MEDIUM_RSS_URL") ||
  `https://medium.com/feed/@${(Deno.env.get("MEDIUM_USERNAME") || "seeurity").replace(/^@/, "")}`;
const HASHNODE_HOST = Deno.env.get("HASHNODE_HOST") || "seeurity.hashnode.dev";
const HASHNODE_PAT = Deno.env.get("HASHNODE_PAT") || "";

type BlogPlatform = "medium" | "hashnode";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  excerpt: string;
  platform: BlogPlatform;
  imageUrl?: string | null;
  readMin: number;
  tags: string[];
}

function estimateReadMin(html?: string): number {
  if (!html) return 1;
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function toBlogPost(input: {
  title: string;
  link: string;
  date: string;
  thumbnail: string | null;
  snippet: string;
  platform: BlogPlatform;
  readMin: number;
  tags: string[];
}): BlogPost {
  return {
    id: `${input.platform}-${input.link}`,
    title: input.title,
    url: input.link,
    publishedAt: input.date ? new Date(input.date).toISOString() : new Date(0).toISOString(),
    excerpt: input.snippet,
    platform: input.platform,
    imageUrl: input.thumbnail,
    readMin: input.readMin,
    tags: input.tags,
  };
}

async function getMedium(): Promise<BlogPost[]> {
  const feed = await parser.parseURL(MEDIUM_FEED);

  return feed.items.map((item: any) => {
    const img = item.contentEncoded?.match(/<img[^>]+src="([^">]+)"/);
    return toBlogPost({
      title: item.title ?? "",
      link: item.link ?? "",
      date: item.isoDate ?? item.pubDate ?? "",
      thumbnail: img?.[1] ?? null,
      snippet: (item.contentSnippet ?? "").slice(0, 200),
      platform: "medium",
      readMin: estimateReadMin(item.contentEncoded),
      tags: item.categories ?? [],
    });
  });
}

async function getHashnodeGraphQL(): Promise<BlogPost[]> {
  const query = `
    query Posts($host: String!) {
      publication(host: $host) {
        posts(first: 12) {
          edges {
            node {
              title
              brief
              url
              publishedAt
              readTimeInMinutes
              coverImage { url }
              tags { name }
            }
          }
        }
      }
    }`;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (HASHNODE_PAT) headers.Authorization = HASHNODE_PAT;

  const response = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables: { host: HASHNODE_HOST } }),
  });

  const text = await response.text();
  if (!text.startsWith("{")) {
    throw new Error("Hashnode GraphQL unavailable");
  }

  const json = JSON.parse(text);
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message || "Hashnode GraphQL error");
  }

  const edges = json?.data?.publication?.posts?.edges ?? [];

  return edges.map(({ node }: any) =>
    toBlogPost({
      title: node.title,
      link: node.url,
      date: node.publishedAt,
      thumbnail: node.coverImage?.url ?? null,
      snippet: (node.brief ?? "").slice(0, 200),
      platform: "hashnode",
      readMin: node.readTimeInMinutes ?? 1,
      tags: (node.tags ?? []).map((t: any) => t.name),
    })
  );
}

async function getHashnodeRss(): Promise<BlogPost[]> {
  const feed = await parser.parseURL(`https://${HASHNODE_HOST}/rss.xml`);

  return feed.items.map((item: any) => {
    const img = item.contentEncoded?.match(/<img[^>]+src="([^">]+)"/);
    return toBlogPost({
      title: item.title ?? "",
      link: item.link ?? "",
      date: item.isoDate ?? item.pubDate ?? "",
      thumbnail: item.enclosure?.url || img?.[1] || null,
      snippet: (item.contentSnippet ?? "").slice(0, 200),
      platform: "hashnode",
      readMin: estimateReadMin(item.contentEncoded),
      tags: item.categories ?? [],
    });
  });
}

async function getHashnode() {
  try {
    const posts = await getHashnodeGraphQL();
    if (posts.length > 0) return { posts, via: "graphql" };
  } catch (error) {
    console.warn("Hashnode GraphQL failed, falling back to RSS:", error);
  }

  const posts = await getHashnodeRss();
  return { posts, via: "rss" };
}

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

    const settled = await Promise.allSettled([getMedium(), getHashnode()]);

    const mediumResult =
      settled[0].status === "fulfilled"
        ? { posts: settled[0].value }
        : { posts: [], error: String(settled[0].reason) };

    const hashnodeResult =
      settled[1].status === "fulfilled"
        ? settled[1].value
        : { posts: [], via: "failed", error: String(settled[1].reason) };

    const posts = [...mediumResult.posts, ...hashnodeResult.posts]
      .filter((post) => post.title && post.url)
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
          medium: { count: mediumResult.posts.length, error: mediumResult.error },
          hashnode: {
            count: hashnodeResult.posts.length,
            via: hashnodeResult.via,
            error: hashnodeResult.error,
          },
        },
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600",
        },
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
