import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchBlogPosts } from "./lib/fetchPosts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const limit = Math.min(Number(req.query.limit) || 6, 12);
    const data = await fetchBlogPosts(limit);

    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");
    return res.status(200).json(data);
  } catch (error) {
    console.error("api/blogs error:", error);
    return res.status(500).json({ error: "Failed to fetch blog posts", posts: [] });
  }
}
