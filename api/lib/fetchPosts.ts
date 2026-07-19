import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

const MEDIUM_FEED =
  process.env.MEDIUM_FEED ||
  process.env.MEDIUM_RSS_URL ||
  `https://medium.com/feed/@${(process.env.MEDIUM_USERNAME || "seeurity").replace(/^@/, "")}`;
const HASHNODE_HOST = process.env.HASHNODE_HOST || "seeurity.hashnode.dev";
const HASHNODE_PAT = process.env.HASHNODE_PAT || "";

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

  return feed.items.map((item) => {
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

  return edges.map(({ node }: { node: Record<string, unknown> }) =>
    toBlogPost({
      title: node.title as string,
      link: node.url as string,
      date: node.publishedAt as string,
      thumbnail: (node.coverImage as { url?: string } | null)?.url ?? null,
      snippet: ((node.brief as string) ?? "").slice(0, 200),
      platform: "hashnode",
      readMin: (node.readTimeInMinutes as number) ?? 1,
      tags: ((node.tags as { name: string }[]) ?? []).map((t) => t.name),
    })
  );
}

async function getHashnodeRss(): Promise<BlogPost[]> {
  const feed = await parser.parseURL(`https://${HASHNODE_HOST}/rss.xml`);

  return feed.items.map((item) => {
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
    if (posts.length > 0) return { posts, via: "graphql" as const };
  } catch (error) {
    console.warn("Hashnode GraphQL failed, falling back to RSS:", error);
  }

  const posts = await getHashnodeRss();
  return { posts, via: "rss" as const };
}

export async function fetchBlogPosts(limit = 6) {
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
