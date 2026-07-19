import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import BlogsNavDropdown from "@/components/BlogsNavDropdown";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#whoami" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Blogs", href: "#blogs", isBlogs: true },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto max-w-5xl transition-all duration-500 rounded-2xl ${
          scrolled ? "glass-nav shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-14 px-4 md:px-6">
          {/* Logo */}
          <a
            href="#whoami"
            onClick={(e) => scrollToSection(e, "#whoami")}
            className="font-mono text-lg font-semibold text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary">{"<"}</span>
            Raja
            <span className="text-primary">{"/>"}</span>
          </a>

          {/* Desktop nav — centered pills */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) =>
              "isBlogs" in item && item.isBlogs ? (
                <BlogsNavDropdown key={item.href} />
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/60 transition-all"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <a href="/terminal" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="rounded-full gap-1.5 border-primary/30 hover:bg-primary/10">
                <Terminal className="h-3.5 w-3.5" />
                Terminal
              </Button>
            </a>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl">
                <nav className="flex flex-col gap-2 mt-10">
                  {navItems.map((item) =>
                    "isBlogs" in item && item.isBlogs ? (
                      <BlogsNavDropdown
                        key={item.href}
                        variant="mobile"
                        onNavigate={() => setMobileMenuOpen(false)}
                      />
                    ) : (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors"
                      >
                        {item.label}
                      </a>
                    )
                  )}
                  <a
                    href="/terminal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl border border-primary/30 hover:bg-primary/10 transition-colors"
                  >
                    <Terminal className="h-4 w-4" />
                    Open Terminal
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
