import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={`group fixed bottom-32 left-8 z-50 rounded-full shadow-lg bg-foreground/10 hover:bg-foreground/20 backdrop-blur-md border border-foreground/20 transition-all duration-500 ease-out hover:scale-110 ${
        isVisible 
          ? "opacity-100 scale-100 translate-y-0" 
          : "opacity-0 scale-75 translate-y-10 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
};

export default ScrollToTop;
