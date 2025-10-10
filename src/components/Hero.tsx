import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "Hi, I'm Raja — Cybersecurity Researcher & Designer.";
  const [showCursor, setShowCursor] = useState(true);
  
  const roles = ["Cybersecurity Enthusiast", "CTF Player", "Troubleshooter"];
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    const currentText = roles[roleIndex];
    
    const typingSpeed = isDeleting ? 30 : 60;
    const pauseTime = isDeleting ? 200 : 1000;

    if (!isDeleting && currentRole === currentText) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && currentRole === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentRole((prev) =>
        isDeleting
          ? currentText.slice(0, prev.length - 1)
          : currentText.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentRole, roleIndex, isDeleting, roles]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-50" />
      
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,219,222,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,219,222,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 shadow-lg cyber-glow">
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
                alt="Raja - Cybersecurity Researcher"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Main heading with typewriter effect */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="gradient-text inline-block">
              {text}
              {showCursor && <span className="animate-glow-pulse">|</span>}
            </span>
          </h1>

          {/* Tagline with typing animation */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto min-h-[2em] flex items-center justify-center">
            <span className="text-primary font-semibold">
              {currentRole}
              {showCursor && <span className="animate-glow-pulse">|</span>}
            </span>
          </p>

          {/* Social Links */}
          <div className="flex gap-6 justify-center pt-8">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="mailto:raja@example.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};

export default Hero;
