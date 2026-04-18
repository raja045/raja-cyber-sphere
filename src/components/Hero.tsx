import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import profilePic from "@/assets/raja-photo.png";
import comptiaLogo from "@/assets/comptia-security-plus.svg";
import sc200Logo from "@/assets/sc200-logo.png";

const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
};

const roles = [
  "SOC Analyst",
  "Penetration Tester",
  "LLM Security",
  "CTF Player",
  "Trouble Shooter"
];

const Hero = () => {
  const scrollY = useParallax();
  const [promptText, setPromptText] = useState("");
  const fullPromptText = "root@raja:~$ whoami ";
  const [showCursor, setShowCursor] = useState(true);
  const [promptComplete, setPromptComplete] = useState(false);
  
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] animate-fade-in"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Circular profile image */}
          <div 
            className="flex justify-center"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full border-2 border-primary/30 p-2">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/50">
                  <img
                    src={profilePic}
                    alt="Raja Shekar — Cybersecurity Researcher"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Certification badges around the photo */}
              <a
                href="https://www.credly.com/badges/90745a3d-f6eb-417d-8f2f-e36112983ce6/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-2 -left-4 w-20 h-20 rounded-full bg-card border-2 border-border shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <img src={comptiaLogo} alt="CompTIA Security+" className="w-14 h-14 object-contain" />
              </a>
              <a
                href="https://learn.microsoft.com/en-us/users/rajashekarreddyseelam-6577/credentials/706e401dd6e8a955"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-2 -right-4 w-20 h-20 rounded-full bg-card border-2 border-border shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <img src={sc200Logo} alt="Microsoft SC-200" className="w-14 h-14 object-contain" />
              </a>
            </div>
          </div>

          {/* Right side - Text */}
          <div 
            className="space-y-6 animate-fade-in-up" 
            style={{ 
              animationDelay: '0.2s',
              transform: `translateY(${scrollY * 0.1}px)` 
            }}
          >
            {/* Terminal prompt */}
            <div className="font-mono text-lg md:text-xl text-primary">
              {promptText}
              {!promptComplete && showCursor && <span className="animate-glow-pulse">|</span>}
            </div>

            {promptComplete && (
              <div className="space-y-4">
                <div className="min-h-[3rem] flex items-center">
                  <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground whitespace-nowrap tracking-tight">
                    Raja Shekar Reddy Seelam
                    <span className="sr-only"> — Trouble Shooter</span>
                  </h1>
                </div>

                <div className="min-h-[2.5rem] flex items-center">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary">
                    {currentRole}
                    {showCursor && <span className="animate-glow-pulse">|</span>}
                  </h2>
                </div>

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

      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-primary/30 rounded-full animate-float"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float" 
          style={{ animationDelay: '1s', transform: `translateY(${scrollY * 0.25}px)` }}
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent/20 rounded-full animate-float" 
          style={{ animationDelay: '2s', transform: `translateY(${scrollY * 0.18}px)` }}
        />
      </div>
    </section>
  );
};

export default Hero;
