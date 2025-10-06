import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Image Data Forensic Using Metadata",
    description: "Advanced forensic analysis tool for extracting and analyzing image metadata to detect manipulation and verify authenticity.",
    tags: ["Python", "EXIF", "Forensics", "Machine Learning"],
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    title: "Home Lab Security Operations Center",
    description: "Built a comprehensive SOC environment for threat detection, monitoring, and incident response using industry-standard tools.",
    tags: ["SIEM", "Splunk", "Network Security", "Incident Response"],
    gradient: "from-secondary/20 to-accent/20",
  },
  {
    title: "PCI Compliance on Secure PAW",
    description: "Implemented PCI DSS compliance framework on Privileged Access Workstations with enhanced security controls.",
    tags: ["PCI DSS", "Compliance", "Windows Security", "Hardening"],
    gradient: "from-accent/20 to-primary/20",
  },
  {
    title: "Web Application Penetration Testing",
    description: "Comprehensive security assessment of web applications identifying vulnerabilities using OWASP Top 10 methodology.",
    tags: ["OWASP", "Burp Suite", "SQL Injection", "XSS"],
    gradient: "from-primary/20 to-accent/20",
  },
  {
    title: "Anomaly Detection from Image Metadata",
    description: "ML-powered system to detect anomalies in image metadata patterns for enhanced digital forensics capabilities.",
    tags: ["Machine Learning", "Python", "TensorFlow", "Forensics"],
    gradient: "from-secondary/20 to-primary/20",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of security, technology, and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass-card group hover-lift cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-2 bg-gradient-to-r ${project.gradient} rounded-t-lg`} />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <button className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    <Github className="h-5 w-5" />
                  </button>
                  <button className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    <ExternalLink className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
