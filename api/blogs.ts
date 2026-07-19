export const config = {
  runtime: "edge",
};

const MEDIUM_FEED =
  (typeof process !== "undefined" && process.env.MEDIUM_FEED) ||
  (typeof process !== "undefined" && process.env.MEDIUM_RSS_URL) ||
  `https://medium.com/feed/@${((typeof process !== "undefined" && process.env.MEDIUM_USERNAME) || "seeurity").replace(/^@/, "")}`;
const HASHNODE_HOST =
  (typeof process !== "undefined" && process.env.HASHNODE_HOST) || "seeurity.hashnode.dev";
const HASHNODE_PAT = (typeof process !== "undefined" && process.env.HASHNODE_PAT) || "";

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

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractTag(xml: string, tag: string): string {
  const patterns = [
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i"),
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"),
  ];

  for (const pattern of patterns) {
    const match = xml.match(pattern);
    if (match?.[1]) return decodeEntities(match[1].trim());
  }

  return "";
}

function stripHtml(value = ""): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadMin(html?: string): number {
  if (!html) return 1;
  const words = stripHtml(html).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parseRssItems(xml: string) {
  const items: string[] = [];
  const regex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(xml)) !== null) {
    items.push(match[1]);
  }

  return items.map((block) => {
    const categories = [...block.matchAll(/<category[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/gi)].map(
      (entry) => entry[1].trim()
    );

    return {
      title: extractTag(block, "title"),
      link: extractTag(block, "link"),
      pubDate: extractTag(block, "pubDate"),
      contentSnippet: stripHtml(extractTag(block, "description")),
      contentEncoded: extractTag(block, "content:encoded"),
      categories,
      enclosure: block.match(/<enclosure[^>]+url="([^"]+)"/i)?.[1] ?? null,
    };
  });
}

async function fetchRss(url: string) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; RajaPortfolioBot/1.0)",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });

  if (!response.ok) {
    throw new Error(`RSS fetch failed (${response.status}) for ${url}`);
  }

  return parseRssItems(await response.text());
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
  const items = await fetchRss(MEDIUM_FEED);

  return items.map((item) => {
    const img = item.contentEncoded.match(/<img[^>]+src="([^">]+)"/);
    return toBlogPost({
      title: item.title,
      link: item.link,
      date: item.pubDate,
      thumbnail: img?.[1] ?? null,
      snippet: item.contentSnippet.slice(0, 200),
      platform: "medium",
      readMin: estimateReadMin(item.contentEncoded),
      tags: item.categories,
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

  return edges.map(({ node }: { node: Record<string, unknown> }) =>
    toBlogPost({
      title: node.title as string,
      link: node.url as string,
      date: node.publishedAt as string,
      thumbnail: (node.coverImage as { url?: string } | null)?.url ?? null,
      snippet: ((node.brief as string) ?? "").slice(0, 200),
      platform: "hashnode",
      readMin: (node.readTimeInMinutes as number) ?? 1,
      tags: ((node.tags as { name: string }[]) ?? []).map((tag) => tag.name),
    })
  );
}

async function getHashnodeRss(): Promise<BlogPost[]> {
  const items = await fetchRss(`https://${HASHNODE_HOST}/rss.xml`);

  return items.map((item) => {
    const img = item.contentEncoded.match(/<img[^>]+src="([^">]+)"/);
    return toBlogPost({
      title: item.title,
      link: item.link,
      date: item.pubDate,
      thumbnail: item.enclosure || img?.[1] || null,
      snippet: item.contentSnippet.slice(0, 200),
      platform: "hashnode",
      readMin: estimateReadMin(item.contentEncoded),
      tags: item.categories,
    });
  });
}

async function getHashnode() {
  try {
    const posts = await getHashnodeGraphQL();
    if (posts.length > 0) return { posts, via: "graphql" as const };
  } catch {
    // Fall back to RSS
  }

  const posts = await getHashnodeRss();
  return { posts, via: "rss" as const };
}

async function fetchBlogPosts(limit = 6) {
  const settled = await Promise.allSettled([getMedium(), getHashnode()]);

  const mediumResult =
    settled[0].status === "fulfilled"
      ? { posts: settled[0].value, error: undefined }
      : { posts: [], error: String(settled[0].reason) };

  const hashnodeResult =
    settled[1].status === "fulfilled"
      ? settled[1].value
      : { posts: [], via: "failed" as const, error: String(settled[1].reason) };

  const posts = [...mediumResult.posts, ...hashnodeResult.posts]
    .filter((post) => post.title && post.url)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);

  return {
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
  };
}

export default async function handler(request: Request) {
  if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const url = new URL(request.url);
    const limit = Math.min(Number(url.searchParams.get("limit")) || 6, 12);
    const data = await fetchBlogPosts(limit);

    return Response.json(data, {
      headers: {
        "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("api/blogs error:", error);
    return Response.json({ error: "Failed to fetch blog posts", posts: [] }, { status: 500 });
  }
}
