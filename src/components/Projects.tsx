import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Video, ChevronRight } from "lucide-react";
import { useCardTilt } from "@/hooks/useCardTilt";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const projects = [
  {
    id: 0,
    title: "Image Data Forensic Using Metadata",
    description: "Advanced forensic analysis tool for extracting and analyzing image metadata to detect manipulation and verify authenticity.",
    tags: ["Python", "EXIF", "Forensics", "Machine Learning"],
    gradient: "from-primary/20 to-secondary/20",
    fullDescription: "This project focuses on developing advanced forensic analysis capabilities for digital images. By extracting and analyzing EXIF metadata, GPS coordinates, camera settings, and modification history, the tool can detect image manipulation, verify authenticity, and provide detailed forensic reports. The system uses machine learning algorithms to identify patterns and anomalies in metadata that may indicate tampering or forgery.",
    demoVideo: "",
    githubRepo: "",
    projectLink: "",
  },
  {
    id: 1,
    title: "Home Lab Security Operations Center",
    description: "Built a comprehensive SOC environment for threat detection, monitoring, and incident response using industry-standard tools.",
    tags: ["SIEM", "Splunk", "Network Security", "Incident Response"],
    gradient: "from-secondary/20 to-accent/20",
    fullDescription: "A fully functional Security Operations Center built in a home lab environment. This project includes deployment of SIEM solutions, log aggregation and analysis, real-time threat detection, automated incident response workflows, and comprehensive security monitoring. The SOC utilizes Splunk for log management, implements network traffic analysis, and includes custom detection rules for identifying suspicious activities and potential security breaches.",
    demoVideo: "",
    githubRepo: "",
    projectLink: "",
  },
  {
    id: 2,
    title: "PCI Compliance on Secure PAW",
    description: "Implemented PCI DSS compliance framework on Privileged Access Workstations with enhanced security controls.",
    tags: ["PCI DSS", "Compliance", "Windows Security", "Hardening"],
    gradient: "from-accent/20 to-primary/20",
    fullDescription: "Implementation of Payment Card Industry Data Security Standard (PCI DSS) compliance on Privileged Access Workstations. This project includes system hardening, access control implementation, audit logging configuration, secure authentication mechanisms, network segmentation, and continuous compliance monitoring. The solution ensures that sensitive payment data is protected according to industry standards and regulatory requirements.",
    demoVideo: "",
    githubRepo: "",
    projectLink: "",
  },
  {
    id: 3,
    title: "Web Application Penetration Testing",
    description: "Comprehensive security assessment of web applications identifying vulnerabilities using OWASP Top 10 methodology.",
    tags: ["OWASP", "Burp Suite", "SQL Injection", "XSS"],
    gradient: "from-primary/20 to-accent/20",
    fullDescription: "A comprehensive web application penetration testing project following OWASP Top 10 methodology. This includes vulnerability assessment, security testing for SQL injection, cross-site scripting (XSS), authentication bypass, session management issues, and other common web vulnerabilities. The project utilizes industry-standard tools like Burp Suite, OWASP ZAP, and custom scripts to identify and document security weaknesses with detailed remediation recommendations.",
    demoVideo: "",
    githubRepo: "",
    projectLink: "",
  },
  {
    id: 4,
    title: "Anomaly Detection from Image Metadata",
    description: "ML-powered system to detect anomalies in image metadata patterns for enhanced digital forensics capabilities.",
    tags: ["Machine Learning", "Python", "TensorFlow", "Forensics"],
    gradient: "from-secondary/20 to-primary/20",
    fullDescription: "An advanced machine learning system designed to detect anomalies in image metadata patterns. Using TensorFlow and Python, this project analyzes EXIF data, file headers, and metadata inconsistencies to identify potentially manipulated or suspicious images. The system employs neural networks trained on large datasets of authentic and tampered images to provide accurate anomaly detection for digital forensics investigations and image verification workflows.",
    demoVideo: "",
    githubRepo: "",
    projectLink: "",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
    const { cardRef, handleMouseMove, handleMouseLeave } = useCardTilt();
    const { elementRef, isVisible } = useScrollAnimation();

    return (
      <div ref={elementRef} className={`animate-on-scroll ${isVisible ? 'visible' : ''} stagger-${(index % 6) + 1}`}>
        <Card
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="glass-card group hover-tilt transition-all duration-300 overflow-hidden cursor-pointer"
          onClick={() => handleProjectClick(project.id)}
        >
          <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 glitch-effect">
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
                  className="text-xs hover:scale-110 transition-transform duration-200 cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="pt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:border-primary transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectClick(project.id);
                }}
              >
                Show More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectedProjectData = selectedProject !== null ? projects.find(p => p.id === selectedProject) : null;

  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <div ref={titleRef} className={`text-center mb-12 animate-on-scroll ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of security, technology, and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent 
            className="max-w-4xl max-h-[80vh] overflow-y-auto"
            aria-describedby="project-description"
          >
            {selectedProjectData && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold gradient-text">
                    {selectedProjectData.title}
                  </DialogTitle>
                  <DialogDescription id="project-description" className="sr-only">
                    Detailed information about {selectedProjectData.title}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">Project Overview</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProjectData.fullDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedProjectData.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary"
                        className="text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="text-lg font-semibold mb-4 text-primary">Project Links</h4>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        disabled={!selectedProjectData.demoVideo}
                      >
                        <Video className="h-4 w-4" />
                        Demo Video
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        disabled={!selectedProjectData.githubRepo}
                      >
                        <Github className="h-4 w-4" />
                        GitHub Repository
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        disabled={!selectedProjectData.projectLink}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Project
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;
