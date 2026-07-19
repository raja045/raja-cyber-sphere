import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { blogConfig } from "@/lib/blogConfig";
import type { BlogFeedResponse } from "@/types/blog";

const API_BASE = import.meta.env.VITE_API_BASE || "";

async function fetchBlogPosts(limit: number): Promise<BlogFeedResponse> {
  // Try Supabase edge function first (production)
  try {
    const { data, error } = await supabase.functions.invoke("fetch-blogs", {
      body: { limit },
    });

    if (!error && data?.posts?.length) {
      return data as BlogFeedResponse;
    }
  } catch {
    // Fall through to API proxy
  }

  const endpoints = [
    `${API_BASE}/api/blogs?limit=${limit}`,
    `http://localhost:4000/api/blogs?limit=${limit}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        if (data?.posts?.length) {
          return data;
        }
      }
    } catch {
      // Try next endpoint
    }
  }

  throw new Error("Failed to fetch blog posts");
}

export function useBlogPosts(limit = blogConfig.maxPosts) {
  return useQuery({
    queryKey: ["blog-posts", limit],
    queryFn: () => fetchBlogPosts(limit),
    staleTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
