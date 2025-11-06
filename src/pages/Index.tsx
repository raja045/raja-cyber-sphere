import { Button } from "@/components/ui/button";
import { Terminal as TerminalIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import WriteUps from "@/components/WriteUps";
import Contact from "@/components/Contact";
import CursorGlow from "@/components/CursorGlow";
import MatrixRain from "@/components/MatrixRain";
import ScrollProgress from "@/components/ScrollProgress";
import CircularScrollProgress from "@/components/CircularScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import VisitorCounter from "@/components/VisitorCounter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <MatrixRain />
      <ScrollProgress />
      <CircularScrollProgress />
      <CursorGlow />
      <ScrollToTop />
      <VisitorCounter />
      <Navigation />
      <section id="whoami">
        <Hero />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="writeups">
        <WriteUps />
      </section>
      <section id="contact">
        <Contact />
      </section>
      
      <a
        href="/terminal"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 p-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90 animate-float cyber-glow"
        >
          <TerminalIcon className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
        </Button>
      </a>
    </div>
  );
};

export default Index;
