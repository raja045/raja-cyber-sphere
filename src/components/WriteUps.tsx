import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const writeUps = [
  {
    title: "Deep Dive into Ransomware Attack Vectors",
    description: "Comprehensive analysis of modern ransomware techniques and mitigation strategies",
    date: "2024-12-15",
    tags: ["Malware Analysis", "Security Research", "Forensics"],
    link: "#",
  },
  {
    title: "Zero-Day Vulnerability Discovery Process",
    description: "Step-by-step guide to identifying and reporting zero-day vulnerabilities",
    date: "2024-11-20",
    tags: ["Vulnerability Research", "Exploit Development"],
    link: "#",
  },
  {
    title: "Building a SOC from Scratch",
    description: "Complete guide to setting up a Security Operations Center for enterprise environments",
    date: "2024-10-05",
    tags: ["SOC", "SIEM", "Incident Response"],
    link: "#",
  },
  {
    title: "Advanced Web Application Penetration Testing",
    description: "Modern techniques for identifying security flaws in web applications",
    date: "2024-09-12",
    tags: ["Web Security", "Penetration Testing", "OWASP"],
    link: "#",
  },
];

const WriteUps = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  
  const WriteUpCard = ({ writeUp, index }: { writeUp: typeof writeUps[0]; index: number }) => {
    const { elementRef, isVisible } = useScrollAnimation();
    
    return (
      <div ref={elementRef} className={`animate-on-scroll ${isVisible ? 'visible' : ''} stagger-${(index % 6) + 1}`}>
        <Card className="glass-card p-6 space-y-4 hover-lift group">
          <div className="flex items-start justify-between">
            <FileText className="h-8 w-8 text-primary" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(writeUp.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
              {writeUp.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {writeUp.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {writeUp.tags.map((tag, tagIndex) => (
              <Badge key={tagIndex} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full justify-between group-hover:bg-primary/10 transition-all duration-300"
          >
            Read Full Article
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    );
  };

  return (
    <section id="writeups" className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto">
        <div ref={titleRef} className={`text-center mb-12 animate-on-scroll ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Technical Write-ups</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep dives into cybersecurity research, analysis, and best practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {writeUps.map((writeUp, index) => (
            <WriteUpCard key={index} writeUp={writeUp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WriteUps;
