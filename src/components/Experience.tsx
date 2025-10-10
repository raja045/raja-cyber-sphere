import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    role: "Graduate Student Assistant",
    organization: "FIU School of Engineering & Computing",
    period: "Aug 2024 – Present",
    description: "Supporting advanced research initiatives in cybersecurity and assisting faculty with technical projects and student mentorship.",
    technologies: ["Research", "Technical Support", "Mentorship"],
  },
  {
    role: "Graduate Research Assistant",
    organization: "FIU Cyber Security and Privacy Lab",
    period: "Feb 2024 – Aug 2024",
    description: "Conducted cutting-edge research in digital forensics and privacy-preserving technologies, contributing to multiple research papers and projects.",
    technologies: ["Digital Forensics", "Privacy Tech", "Research Papers", "ML"],
  },
];

const Experience = () => {
  const ExperienceCard = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
    const { elementRef, isVisible } = useScrollAnimation();

    return (
      <div
        ref={elementRef}
        className={`relative pl-20 animate-on-scroll ${isVisible ? 'visible' : ''}`}
      >
        {/* Timeline dot */}
        <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-primary cyber-glow ring-4 ring-background" />

        <Card className="glass-card p-6 hover-lift">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1 glitch-effect">{exp.role}</h3>
              <p className="text-primary font-medium mb-1">{exp.organization}</p>
              <p className="text-sm text-muted-foreground">{exp.period}</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {exp.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech, techIndex) => (
              <Badge 
                key={techIndex} 
                variant="secondary" 
                className="text-xs hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Professional Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Building expertise through hands-on experience
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
