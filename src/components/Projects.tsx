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
    githubRepo: "https://github.com/raja045/ImageForensicsUsingMetaData",
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
    githubRepo: "https://github.com/raja045/HomeLab-Security-Operations-Center",
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
    githubRepo: "https://github.com/raja045/SecurePaw",
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
    githubRepo: "https://github.com/raja045/WebApplicationPenetrationProject",
    projectLink: "",
  },
  {
    id: 4,
    title: "Network Security Scanner",
    description: "NetSecScan Pro - a full-featured network security scanner with professional UI/UX, real-time monitoring, and complete documentation.",
    tags: ["Python", "Network Security", "Nmap", "Vulnerability Scanning"],
    gradient: "from-secondary/20 to-primary/20",
    fullDescription: "NetSecScan Pro is a comprehensive network security scanner built from scratch with professional UI/UX design. It provides real-time network monitoring, port scanning, service detection, and vulnerability assessment capabilities. The tool features an intuitive interface for security professionals to conduct thorough network security audits and generate detailed reports.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/NetworkSecurityScanner",
    projectLink: "https://raja045.github.io/NetworkSecurityScanner/",
  },
  {
    id: 5,
    title: "Password Strength Analyzer",
    description: "A real-time password strength analyzer with instant feedback, visual scoring, entropy calculations, and NIST-based security recommendations.",
    tags: ["JavaScript", "HTML/CSS", "Security", "NIST Guidelines"],
    gradient: "from-primary/20 to-secondary/20",
    fullDescription: "A real-time password strength analyzer built with HTML, CSS, and JavaScript. It helps users create secure passwords by providing instant feedback, visual strength scoring, entropy calculations, and security recommendations based on NIST guidelines. The tool analyzes password complexity, checks against common patterns, and provides actionable suggestions for improving password security.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/Password_Strength_Analyzer_Project",
    projectLink: "https://raja045.github.io/Password_Strength_Analyzer_Project/",
  },
  {
    id: 6,
    title: "Custom VPN Server Setup",
    description: "Complete guide and implementation for setting up your own secure VPN server for enhanced privacy and network security.",
    tags: ["VPN", "OpenVPN", "Network Security", "Linux"],
    gradient: "from-accent/20 to-secondary/20",
    fullDescription: "A comprehensive project demonstrating how to create and configure your own VPN server from scratch. This includes server setup, encryption configuration, client authentication, and secure tunnel establishment. The project provides enhanced privacy protection, secure remote access capabilities, and bypasses network restrictions while maintaining data confidentiality.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/Network-Related-Projects/tree/main/Create_An_Own_VPN_Server",
    projectLink: "",
  },
  {
    id: 7,
    title: "Intrusion Detection System",
    description: "ML-powered intrusion detection system using Logistic Regression to identify and classify network threats in real-time.",
    tags: ["Machine Learning", "Python", "Logistic Regression", "IDS"],
    gradient: "from-secondary/20 to-accent/20",
    fullDescription: "An intrusion detection system built using Logistic Regression machine learning algorithm. The system analyzes network traffic patterns and packet data to identify potential security threats and malicious activities. It classifies network behavior as normal or anomalous, providing real-time alerts for security teams to investigate and respond to potential intrusions.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/Machine-Learning/tree/main/IDS_Using_LogisticRegression",
    projectLink: "",
  },
  {
    id: 8,
    title: "Email Spam Detection",
    description: "High-accuracy email spam detection system using Logistic Regression with feature engineering and NLTK for text processing.",
    tags: ["Machine Learning", "Python", "NLTK", "Logistic Regression"],
    gradient: "from-primary/20 to-accent/20",
    fullDescription: "This project demonstrates the effective use of logistic regression combined with feature engineering and NLTK to build a high-accuracy email spam detection system. The system processes email content, extracts meaningful features, and classifies messages as spam or legitimate. It uses natural language processing techniques to analyze text patterns and achieve reliable spam filtering.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/Email-Spam-Detection-Using-Logistic-Regression",
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
