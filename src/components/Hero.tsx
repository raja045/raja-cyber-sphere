import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";

const roles = [
  "Cyber Security",
  "Penetration Tester",
  "LLM Security",
    "CTF Player",
  "Trouble Shooter"
];

const Hero = () => {
  const [promptText, setPromptText] = useState("");
  const fullPromptText = "root@raja:~$ whoami ";
  const [showCursor, setShowCursor] = useState(true);
  const [promptComplete, setPromptComplete] = useState(false);
  
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Animate the prompt text first
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullPromptText.length) {
        setPromptText(fullPromptText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setPromptComplete(true);
        clearInterval(interval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Animate the rotating roles after prompt is complete
  useEffect(() => {
    if (!promptComplete) return;

    const currentText = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 100 : 1500;

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
  }, [currentRole, roleIndex, isDeleting, promptComplete]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-50 animate-pulse-glow" />
      
      {/* Cyber grid overlay with animation */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,219,222,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,219,222,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-fade-in" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image (4:3 aspect ratio) */}
          <div className="animate-fade-in-up flex justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3] overflow-hidden rounded-lg border-2 border-primary/50 shadow-2xl cyber-glow">
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=640&h=480&fit=crop"
                alt="Raja - Cybersecurity Researcher"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Text with animations */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Terminal prompt with typing animation */}
            <div className="font-mono text-lg md:text-xl text-primary">
              {promptText}
              {!promptComplete && showCursor && <span className="animate-glow-pulse">|</span>}
            </div>

            {/* Rotating roles with typing animation */}
            {promptComplete && (
              <div className="space-y-4">
                <div className="min-h-[3rem] flex items-center">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    <span className="gradient-text">
                      {currentRole}
                      {showCursor && <span className="animate-glow-pulse">|</span>}
                    </span>
                  </h1>
                </div>
                
                {/* Description */}
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Cybersecurity professional with expertise in penetration testing, LLM Security research, and secure cloud architecture. Developed secure systems through projects in VPN deployment, IAM, and ML-based threat detection. Passionate about advancing AI safety, ethical hacking, and next-generation cloud and system defense.
                </p>
              </div>
            )}

            {/* Social Links */}
            <div className="flex gap-6 pt-8">
              <a 
                href="https://github.com/raja045" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                <Github className="h-7 w-7" />
              </a>
              <a 
                href="https://linkedin.com/in/raja045" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                <Linkedin className="h-7 w-7" />
              </a>
              <a 
                href="mailto:sraja456@outlook.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                <Mail className="h-7 w-7" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect with varied animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float cyber-glow" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full animate-float cyber-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent rounded-full animate-float cyber-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
    </section>
  );
};

export default Hero;
