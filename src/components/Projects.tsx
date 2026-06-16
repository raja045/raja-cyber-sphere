import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Video, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
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
    title: "HomeLab Security Operations Center",
    description:
      "Production-grade enterprise SOC built from scratch — OPNsense + Suricata IDS/IPS + Wazuh SIEM + Active Directory with full red/blue exercise loop.",
    tags: ["Wazuh", "Suricata", "OPNsense", "Active Directory", "MITRE ATT&CK"],
    gradient: "from-secondary/20 to-accent/20",
    fullDescription:
      "End-to-end SOC environment with segmented VLANs (DMZ / LAN / Management), OPNsense firewall, Suricata IDS/IPS running the Emerging Threats ruleset, Wazuh SIEM with custom correlation rules for failed-auth, privilege escalation, and anomalous process detection, and an Active Directory domain controller with GPO and RBAC. Every week I launch attacks from an isolated Kali VM and reconstruct the full Cyber Kill Chain in under 4 minutes from telemetry alone — the exact attack-detect-respond loop a Tier-1 / Tier-2 SOC analyst runs daily. Demonstrates 40% improved real-time threat visibility, 30% false-positive reduction via tuned correlation rules, and 60% faster IR through SOAR-style automation workflows.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/HomeLab-Security-Operations-Center",
    projectLink: "",
  },
  {
    id: 1,
    title: "Cryptographic Adversarial Attacks on Stable Diffusion",
    description:
      "Novel offensive AI research — introduced cryptographic prompt injection as a new jailbreak class against text-to-image diffusion models.",
    tags: ["LLM Security", "Stable Diffusion", "Garak", "PAIR", "GCG", "PyTorch"],
    gradient: "from-primary/20 to-secondary/20",
    fullDescription:
      "Adversarial ML research conducted at FIU's Cybersecurity & Privacy Lab. Designed cryptographically obfuscated prompts that bypass Stable Diffusion's content safety filters by exploiting the semantic gap between human-readable filter rules and the model's text-encoding space — 35% improvement in attack success rate. Automated LLM red teaming using Garak, PAIR, GCG, and JailbreakBench evaluated against AdvBench — 45% increase in jailbreak detection efficiency and 60% reduction in manual vulnerability testing time. Proposed cryptography-aware input sanitization frameworks and prompt-obfuscation detection strategies applicable across any aligned generative AI system.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/cryptographic-adversarial-attacks-T2I",
    projectLink: "",
  },
  {
    id: 2,
    title: "CyberWatch — Threat Intelligence & IoC Pipeline",
    description:
      "SOAR-adjacent threat-intel aggregator — RSS scraping, VirusTotal IoC enrichment (hashes, IPs, domains, URLs), MongoDB persistence, scheduled weekly digest.",
    tags: ["Node.js", "MongoDB", "VirusTotal API", "Threat Intelligence", "SOAR"],
    gradient: "from-accent/20 to-secondary/20",
    fullDescription:
      "Full-stack threat intelligence platform delivering analyst-grade threat hunting at scale. Aggregates threat intel via web scraping and RSS parsing, enriches IoCs through the VirusTotal API across file hashes, IPs, domains, and URLs, persists findings to MongoDB, and dispatches scheduled weekly security digests via Nodemailer + Handlebars templates. Hardened with Helmet.js, CORS, rate-limiting, RBAC, and HTTPS — production-ready security posture. Direct application of the IoC-identification and threat-intelligence-consumption workflow a SOC analyst executes every shift.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/CyberWatch",
    projectLink: "",
  },
  {
    id: 3,
    title: "SecurePaw — PCI DSS Compliant Platform",
    description:
      "Full PCI DSS SAQ D compliance implementation on a pet-adoption commerce platform with Azure Key Vault, GitHub Actions CI/CD, and enforced HTTPS.",
    tags: ["PCI DSS", "Azure Key Vault", "GitHub Actions", "React", "TypeScript"],
    gradient: "from-accent/20 to-primary/20",
    fullDescription:
      "Engineered a secure web platform demonstrating PCI DSS SAQ D compliance — Azure Key Vault for secrets management (40% reduction in data exposure risk), PaySafe payment processing, enforced HTTPS, firewall rules scoped to the cardholder data environment, and a GitHub Actions CI/CD pipeline with secret scanning (50% faster deployments). Maintains full PCI DSS compliance while preserving developer velocity. Demonstrates operating under structured regulatory compliance frameworks and audit-documentation discipline.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/SecurePaw",
    projectLink: "",
  },
  {
    id: 4,
    title: "Web Application Penetration Testing",
    description:
      "50+ web/API assessments mapped to OWASP Top 10 — methodology behind 150+ CVEs disclosed across HackerOne, Bugcrowd, and NCIIPC.",
    tags: ["OWASP Top 10", "Burp Suite", "SQLmap", "OWASP ZAP", "MITRE ATT&CK"],
    gradient: "from-primary/20 to-accent/20",
    fullDescription:
      "Comprehensive web-application pentesting program following OWASP Top 10 methodology. Across 50+ engagements, surfaced SQL injection, XSS, authentication bypass, session-management flaws, broken access control, sensitive-data exposure, and SSRF using Burp Suite, OWASP ZAP, SQLmap, and custom Python recon scripts. Delivered CVSS-scored, MITRE ATT&CK-mapped reports with PoCs, reproduction steps, and developer-friendly remediation guidance. This is the methodology behind the 150+ vulnerabilities I've responsibly disclosed across HackerOne, Bugcrowd, OpenBugBounty, and NCIIPC.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/WebApplicationPenetrationProject",
    projectLink: "",
  },
  {
    id: 5,
    title: "Image Forensics Using Metadata",
    description:
      "Digital forensics tooling — EXIF metadata extraction + Isolation Forest anomaly detection to surface tampered or AI-generated imagery.",
    tags: ["Python", "EXIF", "Isolation Forest", "Forensics", "ML"],
    gradient: "from-primary/20 to-secondary/20",
    fullDescription:
      "Forensic analysis tool that extracts EXIF metadata, GPS coordinates, camera-settings fingerprints, and modification history from digital images, then runs Isolation Forest anomaly detection across the metadata distribution to flag tampering, forgery, or AI-generated content. Bridges classical metadata forensics with ML-driven anomaly detection — produces analyst-ready forensic reports with evidence chain documentation.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/ImageForensicsUsingMetaData",
    projectLink: "",
  },
  {
    id: 6,
    title: "NetSecScan Pro — Network Security Scanner",
    description:
      "Full-featured network security scanner with professional UI/UX, real-time port + service detection, and vulnerability assessment.",
    tags: ["Python", "Nmap", "Network Security", "Vulnerability Scanning"],
    gradient: "from-secondary/20 to-primary/20",
    fullDescription:
      "NetSecScan Pro is a network security scanner built from scratch with a professional UI/UX for security teams. Real-time network monitoring, port scanning, service detection, banner grabbing, and vulnerability assessment against known CVE databases. Generates detailed audit reports with CVSS-prioritized findings.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/NetworkSecurityScanner",
    projectLink: "https://raja045.github.io/NetworkSecurityScanner/",
  },
  {
    id: 7,
    title: "Password Strength Analyzer",
    description:
      "Real-time password strength analyzer with entropy calculations, NIST-aligned guidance, and instant visual scoring.",
    tags: ["JavaScript", "HTML/CSS", "NIST SP 800-63B", "Security"],
    gradient: "from-primary/20 to-secondary/20",
    fullDescription:
      "Real-time password strength analyzer built with HTML, CSS, and JavaScript — instant feedback, visual strength scoring, entropy calculations, and security recommendations aligned to NIST SP 800-63B guidelines. Checks against common patterns and dictionary attacks, surfaces actionable improvement suggestions, and demonstrates the modern authentication-policy thinking expected in SOC and IAM roles.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/Password_Strength_Analyzer_Project",
    projectLink: "https://raja045.github.io/Password_Strength_Analyzer_Project/",
  },
  {
    id: 8,
    title: "Custom VPN Server Setup",
    description:
      "Complete guide + implementation for self-hosted secure VPN — server setup, encryption, client authentication, and tunnel hardening.",
    tags: ["OpenVPN", "WireGuard", "Linux", "Network Security"],
    gradient: "from-accent/20 to-secondary/20",
    fullDescription:
      "Hands-on project covering self-hosted VPN server creation: OpenVPN + WireGuard configuration, certificate-based client authentication, secure tunnel establishment, kill-switch policies, and DNS leak prevention. Demonstrates real-world understanding of network privacy, secure remote access, and the cryptographic primitives behind modern VPN protocols.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/Network-Related-Projects/tree/main/Create_An_Own_VPN_Server",
    projectLink: "",
  },
  {
    id: 9,
    title: "ML-Powered Intrusion Detection System",
    description:
      "ML-powered IDS using Logistic Regression to classify network traffic as benign or malicious in real time.",
    tags: ["Python", "Scikit-learn", "Logistic Regression", "IDS"],
    gradient: "from-secondary/20 to-accent/20",
    fullDescription:
      "Built an intrusion detection system using Logistic Regression trained on NSL-KDD / CICIDS feature sets. Analyzes packet-level features in real time, classifies traffic as normal or anomalous, and surfaces alerts with confidence scores. Demonstrates the bridge between statistical ML and traditional signature-based IDS — the foundation for the modern UEBA detection layer in a SOC.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/Machine-Learning/tree/main/IDS_Using_LogisticRegression",
    projectLink: "",
  },
  {
    id: 10,
    title: "Email Spam Detection",
    description:
      "High-accuracy email spam classifier using Logistic Regression + NLTK feature engineering on tokenized message content.",
    tags: ["Python", "NLTK", "Logistic Regression", "NLP"],
    gradient: "from-primary/20 to-accent/20",
    fullDescription:
      "Email spam detection system combining Logistic Regression with engineered NLP features — tokenization, stemming, TF-IDF vectorization, and stop-word filtering via NLTK. Achieves high precision on benchmark datasets and demonstrates the NLP-driven content-analysis stack used in modern email security gateways and phishing-detection pipelines.",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/Email-Spam-Detection-Using-Logistic-Regression",
    projectLink: "",
  },
  {
    id: 11,
    title: "Cloud Security with AWS IAM",
    description:
      "AWS IAM blueprint demonstrating secure access management across development + production environments with least-privilege roles.",
    tags: ["AWS", "IAM", "Cloud Security", "Least Privilege"],
    gradient: "from-secondary/20 to-primary/20",
    fullDescription:
      "AWS Identity and Access Management blueprint with separated dev + production accounts, scoped IAM roles, policy-as-code guardrails, MFA enforcement, and environment isolation. Demonstrates least-privilege principles, secret rotation discipline, and the access-control thinking required for cloud security engineering and SOC cloud-log analysis (CloudTrail).",
    demoVideo: "",
    githubRepo: "https://github.com/raja045/Cloud_Security_with_IAM",
    projectLink: "",
  },
];

const INITIAL_PROJECTS_COUNT = 6;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_PROJECTS_COUNT);
  const hasMoreProjects = projects.length > INITIAL_PROJECTS_COUNT;

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
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <div ref={titleRef} className={`text-center mb-12 md:mb-16 animate-on-scroll ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of security, technology, and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {hasMoreProjects && (
          <div className="flex justify-end mt-8 max-w-6xl mx-auto">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 hover:border-primary transition-colors duration-300"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show More ({projects.length - INITIAL_PROJECTS_COUNT} more)
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

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
