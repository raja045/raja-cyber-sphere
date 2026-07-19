import { format } from "date-fns";
import { ExternalLink, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { blogConfig } from "@/lib/blogConfig";
import type { BlogPost } from "@/types/blog";

const platformStyles = {
  medium: "bg-foreground/10 text-foreground border-foreground/20",
  hashnode: "bg-primary/10 text-primary border-primary/20",
};

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div
      ref={elementRef}
      className={`animate-on-scroll ${isVisible ? "visible" : ""} stagger-${(index % 6) + 1}`}
    >
      <a href={post.url} target="_blank" rel="noopener noreferrer" className="block group">
        <Card className="glass-card overflow-hidden hover-lift h-full">
          {post.imageUrl && (
            <div className="h-40 overflow-hidden">
              <img
                src={post.imageUrl}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Badge
                variant="outline"
                className={`text-xs ${platformStyles[post.platform]}`}
              >
                {post.platform === "medium" ? "Medium" : "Hashnode"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {format(new Date(post.publishedAt), "MMM d, yyyy")} · {post.readMin} min read
              </span>
            </div>
            <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
            )}
            <div className="flex items-center gap-1 text-sm text-primary font-medium pt-1">
              Read article
              <ExternalLink className="h-3.5 w-3.5" />
            </div>
          </div>
        </Card>
      </a>
    </div>
  );
};

const Blogs = () => {
  const { data, isLoading, isError } = useBlogPosts(blogConfig.maxPosts);
  const posts = data?.posts ?? [];

  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          number="07"
          title="Latest Writing"
          subtitle="Security research, AI red teaming, and offensive/defensive insights from Medium and Hashnode"
        />

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Fetching latest posts...
          </div>
        ) : isError || posts.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <p className="text-muted-foreground">
              Could not load posts automatically. Visit my blogs directly:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={blogConfig.medium.profileUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Medium</Button>
              </a>
              <a href={blogConfig.hashnode.profileUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Hashnode</Button>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <a href={blogConfig.medium.profileUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Follow on Medium
            </Button>
          </a>
          <a href={blogConfig.hashnode.profileUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Read on Hashnode
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
