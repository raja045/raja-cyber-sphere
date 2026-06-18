export type Role = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  tags?: string[];
};

export const experience: Role[] = [
  {
    company: "Florida International University",
    title: "Graduate Research Assistant",
    location: "Miami, FL",
    start: "Feb 2024",
    end: "Dec 2025",
    bullets: [
      "Designed cryptographic-prompt attacks against Stable Diffusion and aligned LLMs; reproducible harness covers 6 attack families, 4 providers.",
      "Automated nightly red-team probe runs with Garak — surfacing alignment failures missed by standard eval suites.",
      "Annotated 2,000+ adversarial prompts for downstream supervised-fine-tuning datasets feeding the lab's robustness work.",
    ],
    tags: ["LLM Security", "Garak", "PyTorch", "Adversarial ML"],
  },
  {
    company: "EduRun",
    title: "SOC Analyst",
    location: "Remote",
    start: "Jan 2022",
    end: "Dec 2023",
    bullets: [
      "Owned tier-1/2 detection in Splunk; reduced mean detection time by 35% by re-baselining noisy correlation searches.",
      "Handled 100+ live incidents — phishing, credential abuse, lateral movement — with NIST CSF runbooks I authored.",
      "Automated PKI rotation and AD hygiene checks; ran quarterly phishing simulations with measurable click-rate drops.",
    ],
    tags: ["Splunk", "NIST CSF", "Active Directory", "Phishing", "Incident Response"],
  },
  {
    company: "Freelance · HackerOne",
    title: "Bug Bounty Hunter",
    location: "Remote",
    start: "Jun 2023",
    end: "Nov 2023",
    bullets: [
      "150+ CVEs / disclosures acknowledged across web and API targets on private programs.",
      "Authored Burp extensions + recon scripts for repeatable workflows; reports flagged as exemplars by program staff.",
      "Specialized in OWASP Top 10 — IDORs, auth bypass, SSRF — and business-logic vulnerabilities.",
    ],
    tags: ["OWASP", "Burp Suite", "Recon", "Web AppSec"],
  },
];

export const education = [
  {
    school: "Florida International University",
    degree: "M.S. Cybersecurity",
    detail: "GPA 3.9 · CCDC Team Lead · Published research",
    start: "Jan 2024",
    end: "Dec 2025",
  },
  {
    school: "Lovely Professional University",
    degree: "B.Tech, Computer Science",
    detail: "GPA 3.6 · CTF Player · ML undergrad work",
    start: "2019",
    end: "2023",
  },
];

export const volunteering = [
  {
    org: "NCIIPC",
    title: "Responsible Disclosure Researcher",
    detail: "100+ CVEs disclosed pro bono to Indian critical-infra owners.",
  },
  {
    org: "FIU CCDC",
    title: "Team Lead",
    detail: "Captained the Collegiate Cyber Defense team across regional events.",
  },
  {
    org: "AIESEC",
    title: "VP, oGX",
    detail:
      "Ran pipeline & sales for global exchange — leadership + ops outside security.",
  },
  {
    org: "NOOBARMY",
    title: "CTF Player",
    detail: "Recurring competitor; specialized in web and forensics challenges.",
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "SOC & Detection",
    items: ["Splunk", "Sigma", "Sysmon", "MITRE ATT&CK", "Wazuh", "ELK"],
  },
  {
    label: "Offensive",
    items: ["Burp Suite", "Metasploit", "Nmap", "BloodHound", "ffuf", "Recon-ng"],
  },
  {
    label: "AI & LLM Security",
    items: ["Garak", "Prompt Injection", "Adversarial ML", "PyTorch", "HuggingFace"],
  },
  {
    label: "Cloud & Infra",
    items: ["AWS", "Azure", "GCP", "Terraform", "Docker", "Kubernetes"],
  },
  {
    label: "Network & Forensics",
    items: ["Wireshark", "Zeek", "Volatility", "Autopsy", "Nessus", "OpenVAS"],
  },
  {
    label: "Programming",
    items: ["Python", "Bash", "Go", "TypeScript", "SQL"],
  },
];

export const certifications = [
  "CompTIA Security+",
  "Microsoft SC-200 (in progress)",
  "AWS Cloud Practitioner",
];
