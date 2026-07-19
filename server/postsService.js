const Parser = require("rss-parser");

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

function estimateReadMin(html) {
  if (!html) return 1;
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function stripHtml(value = "") {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function toBlogPost({ title, link, date, thumbnail, snippet, platform, readMin, tags }) {
  return {
    id: `${platform}-${link}`,
    title,
    url: link,
    publishedAt: date ? new Date(date).toISOString() : new Date(0).toISOString(),
    excerpt: snippet,
    platform,
    imageUrl: thumbnail,
    readMin,
    tags,
  };
}

async function getMedium() {
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

async function getHashnodeGraphQL() {
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

  const headers = { "Content-Type": "application/json" };
  if (HASHNODE_PAT) {
    headers.Authorization = HASHNODE_PAT;
  }

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

  return edges.map(({ node }) =>
    toBlogPost({
      title: node.title,
      link: node.url,
      date: node.publishedAt,
      thumbnail: node.coverImage?.url ?? null,
      snippet: (node.brief ?? "").slice(0, 200),
      platform: "hashnode",
      readMin: node.readTimeInMinutes ?? 1,
      tags: (node.tags ?? []).map((t) => t.name),
    })
  );
}

async function getHashnodeRss() {
  const feed = await parser.parseURL(`https://${HASHNODE_HOST}/rss.xml`);

  return feed.items.map((item) => {
    const enclosure = item.enclosure?.url;
    const img = item.contentEncoded?.match(/<img[^>]+src="([^">]+)"/);
    return toBlogPost({
      title: item.title ?? "",
      link: item.link ?? "",
      date: item.isoDate ?? item.pubDate ?? "",
      thumbnail: enclosure || img?.[1] || null,
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
    if (posts.length > 0) {
      return { posts, via: "graphql" };
    }
  } catch (error) {
    console.warn("Hashnode GraphQL failed, falling back to RSS:", error.message);
  }

  const posts = await getHashnodeRss();
  return { posts, via: "rss" };
}

async function fetchBlogPosts(limit = 6) {
  const settled = await Promise.allSettled([getMedium(), getHashnode()]);

  const mediumResult =
    settled[0].status === "fulfilled"
      ? { posts: settled[0].value, error: undefined }
      : { posts: [], error: settled[0].reason?.message || "Medium fetch failed" };

  const hashnodeResult =
    settled[1].status === "fulfilled"
      ? settled[1].value
      : { posts: [], via: "failed", error: settled[1].reason?.message || "Hashnode fetch failed" };

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

module.exports = {
  fetchBlogPosts,
  getMedium,
  getHashnode,
  MEDIUM_FEED,
  HASHNODE_HOST,
};
