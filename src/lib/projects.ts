export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  context: string;
  outcomes: string[];
  stack: string[];
  github?: string;
  href?: string;
  featured: boolean;
  /** layout hint for the bento grid */
  span?: "default" | "wide" | "tall";
};

export const projects: Project[] = [
  {
    slug: "llm-adversarial-robustness",
    title: "LLM Adversarial Robustness Research",
    category: "AI Red-Teaming · FIU",
    summary:
      "Crypto-style jailbreaks against Stable Diffusion and aligned LLMs. Surfaced fail modes alignment filters miss.",
    context:
      "Graduate research at FIU's cybersecurity lab. Designed cryptographic-prompt attacks that bypass safety alignment in diffusion models and instruction-tuned LLMs, then automated red-teaming runs at scale with Garak.",
    outcomes: [
      "Built a reproducible jailbreak harness covering 6 attack families across 4 model providers.",
      "Automated thousands of probe runs nightly with Garak — surfacing failure modes traditional eval suites miss.",
      "Annotated 2,000+ adversarial prompts for downstream supervised fine-tuning datasets.",
      "Research feeds an ongoing publication track in adversarial ML.",
    ],
    stack: [
      "Python",
      "Garak",
      "PyTorch",
      "Stable Diffusion",
      "OpenAI API",
      "HuggingFace",
    ],
    featured: true,
    span: "wide",
  },
  {
    slug: "homelab-soc",
    title: "HomeLab SOC",
    category: "Detection Engineering",
    summary:
      "Full-stack SOC simulation: Splunk, Sysmon, Sigma, attack emulation, and tuned detections — built end to end.",
    context:
      "Self-hosted lab replicating an enterprise SOC: Windows AD + Linux endpoints, Sysmon telemetry pipeline, Splunk indexer, and a curated Sigma ruleset mapped to MITRE ATT&CK.",
    outcomes: [
      "Modeled 30+ ATT&CK techniques and tuned detections for high-fidelity alerts.",
      "Reduced false-positive rate on baseline rules by ~70% after iteration.",
      "Wrote runbooks for top 10 alert types — used as training material for junior analysts I onboarded at EduRun.",
    ],
    stack: ["Splunk", "Sysmon", "Sigma", "MITRE ATT&CK", "Windows AD", "Linux"],
    featured: true,
  },
  {
    slug: "threat-intel-pipeline",
    title: "Threat-Intel Pipeline",
    category: "Automation · Threat Intel",
    summary:
      "VirusTotal + OTX enrichment pipeline with deduplication, IOC scoring, and SIEM injection.",
    context:
      "Pipeline that pulls IOCs from open-source feeds and VirusTotal, enriches with reputation + first-seen data, deduplicates, scores, and pushes high-confidence indicators into Splunk lookups.",
    outcomes: [
      "Cut analyst triage time on commodity malware alerts by ~40%.",
      "Auto-enriched 5k+ IOCs/week without API quota exhaustion via rate-aware scheduling.",
      "Backed by a small Postgres store with retention rules for cold-storage IOCs.",
    ],
    stack: ["Python", "VirusTotal API", "OTX", "Postgres", "Splunk", "Docker"],
    featured: true,
  },
  {
    slug: "pci-dss-commerce",
    title: "PCI-DSS Commerce Platform",
    category: "AppSec · Compliance",
    summary:
      "Hardened a Node/Express commerce stack to PCI-DSS scope: tokenization, secrets, scoped logs, and IaC.",
    context:
      "Rebuilt a small commerce checkout to be PCI-DSS scope-aware: payment tokens never touch the app server, audit-grade logging with redaction, secrets in a vault, and infrastructure described in Terraform for repeatability.",
    outcomes: [
      "Brought the system into PCI-DSS scope-readiness ahead of an internal compliance review.",
      "Centralized secret rotation and removed 12 hard-coded creds discovered during audit.",
      "All infra as code — repeatable in <10 minutes for a staging env spin-up.",
    ],
    stack: ["Node.js", "Express", "Terraform", "Vault", "AWS", "Postgres"],
    featured: true,
    span: "tall",
  },
  {
    slug: "freelance-bug-bounty",
    title: "Freelance Bug Bounty — 150+ CVEs",
    category: "Offensive Security",
    summary:
      "Full-time stretch hunting on private programs: OWASP Top 10, business-logic, recon automation.",
    context:
      "Six months of focused private-program hunting on HackerOne and direct VDP scopes. Mix of manual depth and an opinionated recon stack for asset discovery and parameter mining.",
    outcomes: [
      "150+ CVEs / disclosures acknowledged across web and API targets.",
      "Custom Burp extensions + recon scripts for repeatable workflows.",
      "Strong reporting practice — accepted writeups cited as exemplars by program staff.",
    ],
    stack: ["Burp Suite", "Python", "Bash", "Recon-ng", "ffuf"],
    featured: false,
  },
  {
    slug: "image-forensics",
    title: "Image Forensics Toolkit",
    category: "Forensics",
    summary:
      "ELA + metadata + reverse-search batching for fast triage of dubious images during IR.",
    context:
      "Lightweight Python toolkit that batches error-level analysis, EXIF inspection, and reverse-image search calls — useful when an IR ticket arrives with screenshots and zero context.",
    outcomes: [
      "Cut early-stage triage on phishing-image cases from ~20 min to ~3 min.",
      "Used internally by SOC peers during EduRun incident handling.",
    ],
    stack: ["Python", "Pillow", "ExifTool", "TinEye API"],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
