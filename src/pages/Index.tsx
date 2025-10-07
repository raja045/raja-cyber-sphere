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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AnnouncementBar />
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
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90"
        >
          <TerminalIcon className="h-6 w-6" />
        </Button>
      </a>
    </div>
  );
};

export default Index;
