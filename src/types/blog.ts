export type BlogPlatform = "medium" | "hashnode";

export interface BlogPost {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  excerpt: string;
  platform: BlogPlatform;
  imageUrl?: string;
}

export interface BlogFeedResponse {
  posts: BlogPost[];
  fetchedAt: string;
}
