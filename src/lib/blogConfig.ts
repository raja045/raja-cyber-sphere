const mediumUsername = (import.meta.env.VITE_MEDIUM_USERNAME || "seeurity").replace(/^@/, "");
const hashnodeHost = import.meta.env.VITE_HASHNODE_HOST || "seeurity.hashnode.dev";

export const blogConfig = {
  medium: {
    username: mediumUsername,
    profileUrl: `https://medium.com/@${mediumUsername}`,
    rssUrl:
      import.meta.env.VITE_MEDIUM_RSS_URL ||
      `https://medium.com/feed/@${mediumUsername}`,
  },
  hashnode: {
    host: hashnodeHost,
    profileUrl: `https://${hashnodeHost}`,
    rssUrl: `https://${hashnodeHost}/rss.xml`,
  },
  maxPosts: 6,
  navPreviewCount: 4,
} as const;
