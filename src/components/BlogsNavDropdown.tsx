import { formatDistanceToNow } from "date-fns";
import { ExternalLink, BookOpen, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { blogConfig } from "@/lib/blogConfig";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import type { BlogPost } from "@/types/blog";

interface BlogsNavDropdownProps {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}

const platformStyles = {
  medium: "bg-foreground/10 text-foreground",
  hashnode: "bg-primary/10 text-primary",
};

const PlatformBadge = ({ platform }: { platform: BlogPost["platform"] }) => (
  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${platformStyles[platform]}`}>
    {platform === "medium" ? "Medium" : "Hashnode"}
  </Badge>
);

const BlogsNavDropdown = ({ onNavigate, variant = "desktop" }: BlogsNavDropdownProps) => {
  const { data, isLoading } = useBlogPosts(blogConfig.navPreviewCount);
  const posts = data?.posts ?? [];

  const scrollToBlogs = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector("#blogs");
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    onNavigate?.();
  };

  const triggerClass =
    variant === "desktop"
      ? "px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/60 transition-all inline-flex items-center gap-1"
      : "px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors w-full text-left";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={triggerClass}>
          <BookOpen className="h-3.5 w-3.5" />
          Blogs
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={variant === "desktop" ? "center" : "end"}
        className="w-80 bg-background/95 backdrop-blur-xl border-border/60"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Latest from Medium & Hashnode
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading posts...
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <DropdownMenuItem key={post.id} asChild className="cursor-pointer p-0">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1.5 px-3 py-2.5 w-full"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium leading-snug line-clamp-2">
                    {post.title}
                  </span>
                  <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground mt-0.5" />
                </div>
                <div className="flex items-center gap-2">
                  <PlatformBadge platform={post.platform} />
                  <span className="text-[11px] text-muted-foreground">
                    {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
                  </span>
                </div>
              </a>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="px-3 py-4 text-sm text-muted-foreground text-center">
            No posts available right now.
          </div>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <a
            href="#blogs"
            onClick={scrollToBlogs}
            className="w-full text-center text-sm font-medium text-primary"
          >
            View all blogs
          </a>
        </DropdownMenuItem>
        <div className="flex gap-2 px-2 pb-2">
          <a
            href={blogConfig.medium.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs py-1.5 rounded-md border border-border/60 hover:bg-muted/50 transition-colors"
          >
            Medium
          </a>
          <a
            href={blogConfig.hashnode.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs py-1.5 rounded-md border border-border/60 hover:bg-muted/50 transition-colors"
          >
            Hashnode
          </a>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BlogsNavDropdown;
