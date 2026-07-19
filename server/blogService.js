const { fetchRss, fetchMediumPosts } = require("./mediumFeed");

const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || "nakamotosecurity";
const MEDIUM_RSS_URL = process.env.MEDIUM_RSS_URL || "";
const RSS2JSON_API_KEY = process.env.RSS2JSON_API_KEY || "";
const HASHNODE_HOST = process.env.HASHNODE_HOST || "toxsec.hashnode.dev";
const HASHNODE_RSS_URL = `https://${HASHNODE_HOST}/rss.xml`;

const sortPosts = (posts) =>
  [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

async function fetchBlogPosts(limit = 6) {
  const [hashnodePosts, mediumResult] = await Promise.all([
    fetchRss(HASHNODE_RSS_URL, "hashnode"),
    fetchMediumPosts(MEDIUM_USERNAME, {
      customRssUrl: MEDIUM_RSS_URL || undefined,
      rss2JsonApiKey: RSS2JSON_API_KEY || undefined,
    }),
  ]);

  const posts = sortPosts([...hashnodePosts, ...mediumResult.posts]).slice(0, limit);

  return {
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
  };
}

module.exports = {
  fetchBlogPosts,
  MEDIUM_USERNAME,
  HASHNODE_HOST,
};
