import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, Network, Cloud, Code, Wrench } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skillCategories = [
  {
    title: "Cybersecurity",
    icon: Shield,
    skills: ["Penetration Testing", "SIEM", "Incident Response", "Threat Analysis", "Digital Forensics"],
    color: "text-primary",
  },
  {
    title: "Network Security",
    icon: Network,
    skills: ["Firewall Configuration", "IDS/IPS", "VPN", "Network Monitoring", "Packet Analysis"],
    color: "text-secondary",
  },
  {
    title: "Cloud & AI",
    icon: Cloud,
    skills: ["AWS Security", "Azure", "Machine Learning", "TensorFlow", "Cloud Architecture"],
    color: "text-accent",
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "JavaScript", "Bash", "PowerShell", "SQL"],
    color: "text-primary",
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Burp Suite", "Metasploit", "Wireshark", "Nmap", "Splunk"],
    color: "text-secondary",
  },
];

const Skills = () => {
  const SkillCard = ({ category, index }: { category: typeof skillCategories[0]; index: number }) => {
    const { elementRef, isVisible } = useScrollAnimation();
    const Icon = category.icon;

    return (
      <div ref={elementRef} className={`animate-on-scroll ${isVisible ? 'visible' : ''} stagger-${(index % 6) + 1}`}>
        <Card className="glass-card p-6 hover-lift">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg bg-background/50 ${category.color} cyber-glow`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold glitch-effect">{category.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, skillIndex) => (
              <Badge
                key={skillIndex}
                variant="secondary"
                className="text-xs hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Technical Arsenal</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for modern cybersecurity challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold mb-6">Certifications</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="outline" className="text-lg py-2 px-4 border-primary/50">
              CEH (Certified Ethical Hacker)
            </Badge>
            <Badge variant="outline" className="text-lg py-2 px-4 border-secondary/50">
              CPTE (Certified Penetration Testing Engineer)
            </Badge>
          </div>
        </div>

        {/* TryHackMe Badge */}
        <div className="mt-8 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <iframe 
            src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=866810" 
            className="border-none w-full max-w-md h-auto"
            title="TryHackMe Profile Badge"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
