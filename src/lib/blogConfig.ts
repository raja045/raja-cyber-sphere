const mediumUsername = import.meta.env.VITE_MEDIUM_USERNAME || "nakamotosecurity";

export const blogConfig = {
  medium: {
    username: mediumUsername,
    profileUrl: `https://medium.com/@${mediumUsername.replace(/^@/, "")}`,
    rssUrl:
      import.meta.env.VITE_MEDIUM_RSS_URL ||
      `https://medium.com/feed/@${mediumUsername.replace(/^@/, "")}`,
  },
  hashnode: {
    host: import.meta.env.VITE_HASHNODE_HOST || "toxsec.hashnode.dev",
    profileUrl: "https://toxsec.hashnode.dev",
    rssUrl: "https://toxsec.hashnode.dev/rss.xml",
  },
  maxPosts: 6,
  navPreviewCount: 4,
} as const;
