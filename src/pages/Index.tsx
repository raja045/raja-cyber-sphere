import { Button } from "@/components/ui/button";
import { Terminal as TerminalIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Volunteering from "@/components/Volunteering";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CircularScrollProgress from "@/components/CircularScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import VisitorCounter from "@/components/VisitorCounter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AmbientBackground />
      <ScrollProgress />
      <CircularScrollProgress />
      <ScrollToTop />
      <Navigation />
      <AnnouncementBar />

      <main className="relative z-10">
        <section id="whoami" className="section-surface">
          <Hero />
        </section>

        <section id="projects" className="section-alt section-surface">
          <Projects />
        </section>

        <section id="skills" className="section-surface">
          <Skills />
        </section>

        <section id="experience" className="section-alt section-surface">
          <Experience />
        </section>

        <section id="education" className="section-surface">
          <Education />
        </section>

        <section id="volunteering" className="section-alt section-surface">
          <Volunteering />
        </section>

        <section id="blogs" className="section-surface">
          <Blogs />
        </section>

        <section id="contact" className="section-surface">
          <Contact />
        </section>
      </main>

      <VisitorCounter />

      <a
        href="/terminal"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 p-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90 animate-float accent-glow"
        >
          <TerminalIcon className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
        </Button>
      </a>
    </div>
  );
};

export default Index;
