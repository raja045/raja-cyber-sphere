import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const education = [
  {
    degree: "M.S. in Cybersecurity",
    institution: "Florida International University (FIU)",
    period: "Jan2024 – Dec2025",
    gpa: "3.8/4.0",
    achievements: [
      "Graduate Research Assistant",
      "CCDC, Team Leader for FIU Team",
    ],
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    degree: "B.Tech in Computer Science",
    institution: "Lovely Professional University (LPU)",
    period: "2019 – 2023",
    gpa: "3.6/4.0",
    achievements: [
      "Undergraduate Academic Researcher",
      "Member of NOOBARMY Cyber Club",
      "Participated in 50+ CTF's",
    ],
    gradient: "from-secondary/20 to-accent/20",
  },
];

const Education = () => {
  const EducationCard = ({ edu, index }: { edu: typeof education[0]; index: number }) => {
    const { elementRef, isVisible } = useScrollAnimation();

    return (
      <div ref={elementRef} className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
        <Card className="glass-card overflow-hidden hover-lift">
          <div className={`h-2 bg-gradient-to-r ${edu.gradient}`} />
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 cyber-glow">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 glitch-effect">{edu.degree}</h3>
                <p className="text-primary font-medium mb-1">{edu.institution}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{edu.period}</span>
                  <Badge variant="outline" className="font-mono">
                    GPA: {edu.gpa}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <Award className="h-4 w-4 text-accent" />
                <span>Key Achievements</span>
              </div>
              <ul className="space-y-2">
                {edu.achievements.map((achievement, achIndex) => (
                  <li
                    key={achIndex}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Academic Foundation</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Building expertise through rigorous academic training
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
