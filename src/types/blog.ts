export type BlogPlatform = "medium" | "hashnode";

export interface BlogPost {
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

export interface BlogFeedResponse {
  posts: BlogPost[];
  fetchedAt: string;
  sources?: {
    medium?: { count: number; error?: string };
    hashnode?: { count: number; via?: string; error?: string };
  };
}
