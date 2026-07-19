import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePic from "@/assets/raja-photo.png";
import comptiaLogo from "@/assets/comptia-security-plus.svg";
import sc200Logo from "@/assets/sc200-logo.png";

const roles = [
  "SOC Analyst",
  "Security Engineer",
  "Penetration Tester",
  "LLM Security Researcher",
  "Threat Hunter",
  "CTF Player",
];

const stats = [
  { value: "150+", label: "CVEs Disclosed" },
  { value: "100+", label: "Incidents Resolved" },
  { value: "3.9", label: "GPA (M.S.)" },
];

const Hero = () => {
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
    }, 80);

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

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Top badge */}
          <div className="flex justify-center md:justify-start mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              <span>Cybersecurity Researcher · Miami, FL</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            {/* Left — Content */}
            <div className="order-2 lg:order-1 space-y-6 animate-fade-in-up text-center lg:text-left">
              <div className="font-mono text-sm md:text-base text-primary/80">
                {promptText}
                {!promptComplete && showCursor && (
                  <span className="animate-glow-pulse text-primary">|</span>
                )}
              </div>

              {promptComplete && (
                <div className="space-y-4">
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground">
                    Raja Shekar
                    <br />
                    <span className="gradient-text">Reddy Seelam</span>
                  </h1>

                  <div className="min-h-[2.5rem] flex items-center justify-center lg:justify-start">
                    <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground">
                      <span className="text-primary">{currentRole}</span>
                      {showCursor && (
                        <span className="animate-glow-pulse text-primary">|</span>
                      )}
                    </h2>
                  </div>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                    SOC analyst with an offensive backbone —{" "}
                    <strong className="text-foreground">150+ CVEs disclosed</strong>,{" "}
                    <strong className="text-foreground">100+ incidents resolved</strong>.
                    M.S. Cybersecurity, FIU.
                  </p>
                </div>
              )}

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-pill">
                    <span className="text-2xl font-bold text-primary font-display">
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA + Social */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={scrollToProjects}
                  className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
                >
                  View My Work
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>

                <div className="flex gap-4">
                  <a
                    href="https://github.com/raja045"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/raja045"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:rseelam456@gmail.com"
                    className="p-2.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Profile image */}
            <div className="order-1 lg:order-2 flex justify-center animate-fade-in">
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 blur-sm" />
                <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-border/60 shadow-2xl">
                  <img
                    src={profilePic}
                    alt="Raja Shekar — Cybersecurity Researcher"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>

                {/* Certification badges */}
                <a
                  href="https://www.credly.com/badges/90745a3d-f6eb-417d-8f2f-e36112983ce6/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -bottom-3 -left-3 w-16 h-16 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <img src={comptiaLogo} alt="CompTIA Security+" className="w-11 h-11 object-contain" />
                </a>
                <a
                  href="https://learn.microsoft.com/en-us/users/rajashekarreddyseelam-6577/credentials/706e401dd6e8a955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <img src={sc200Logo} alt="Microsoft SC-200" className="w-11 h-11 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
