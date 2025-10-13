import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  // AIESEC in Miami
  {
    role: "Vice President of Outgoing Global Exchange (oGX)",
    organization: "AIESEC in Miami",
    period: "Jan 2025 – Present",
    description: [
      "Led 50+ international exchange programs, connecting students and professionals with global internships and volunteering.",
      "Directed strategy, planning, and execution of global exchange projects, ensuring alignment with AIESEC’s mission.",
      "Implemented weekly meetings for team members, improving efficiency and collaboration by 25%.",
      "Built relationships with partners and sponsors, expanding opportunities by 20% year-over-year.",
    ],
    technologies: ["Leadership", "Global Exchange", "Strategy", "Team Management"],
  },
  {
    role: "Team Member - Outgoing Global Exchange (oGX)",
    organization: "AIESEC in Miami",
    period: "Jan 2024 – Dec 2024",
    description: [
      "Guided exchange program participants through the process.",
      "Participated in consultancy, marketing, social events, and conferences.",
      "Assisted with partnerships and explored global opportunities, building cross-cultural connections.",
    ],
    technologies: ["Consultancy", "Marketing", "Event Management", "Collaboration"],
  },
  // FIU College of Engineering & Computing
  {
    role: "Graduate Student Assistant",
    organization: "FIU College of Engineering & Computing",
    period: "Aug 2024 – Present",
    description: [
      "Provided support to students across cloud computing, HCI, and microcomputers, helping 50+ students complete assignments.",
      "Assisted in labs/projects, including AWS, Wix, Microsoft Office, improving performance by 15%.",
      "Supported faculty by clarifying concepts, troubleshooting, and reducing query resolution time by 20%.",
      "Evaluated and graded coursework, maintaining 100% on-time grading compliance.",
    ],
    technologies: ["Student Support", "Cloud Computing", "Teaching", "Grading"],
  },
  {
    role: "Graduate Research Assistant",
    organization: "FIU College of Engineering & Computing",
    period: "Jan 2025 – Apr 2025",
    description: [
      "Analyzed vulnerabilities in LLMs, VLMs, and diffusion models, identifying 30+ critical weaknesses.",
      "Developed adversarial attacks, including prompt concealment and MMA-Diffusion extensions.",
      "Investigated jailbreaking techniques, uncovering security gaps and proposing novel defenses.",
    ],
    technologies: ["AI Security", "Adversarial ML", "Research", "Prompt Injection"],
  },
  {
    role: "Graduate Research Assistant",
    organization: "FIU Cyber Security and Privacy Lab",
    period: "Feb 2024 – Aug 2024",
    description: [
      "Labeled custom dataset of 10,000+ entries for ML behavioral pattern detection, improving accuracy by 18%.",
      "Interviewed users on misinformation perception, providing qualitative insights.",
      "Documented findings in Jupyter Notebooks and MS Office, enabling faster decision-making.",
    ],
    technologies: ["Digital Forensics", "Privacy Tech", "Research Papers", "ML"],
  },
  // HackerOne, Bugcrowd
  {
    role: "White-hat Security Researcher",
    organization: "HackerOne, Bugcrowd",
    period: "Jul 2023 – Feb 2024",
    description: [
      "Performed 50+ security assessments and penetration tests, reporting 80+ critical vulnerabilities.",
      "Documented vulnerabilities across OWASP Top 10 categories.",
      "Used Burp Suite, Nmap, OWASP ZAP, Metasploit for manual and automated testing.",
      "Coordinated with dev teams for vulnerability remediation.",
    ],
    technologies: ["Security Testing", "OWASP", "Penetration Testing", "Bug Bounty"],
  },
  // Lovely Professional University
  {
    role: "Undergraduate Academic Researcher",
    organization: "Lovely Professional University",
    period: "Jan 2023 – Jul 2023",
    description: [
      "Reviewed privacy challenges and anonymity tools (TOR, I2P, browser extensions).",
      "Analyzed effectiveness and usability of anonymity technologies.",
      "Evaluated privacy-enhancing tech and their role in data protection.",
      "Concluded robust solutions for user privacy, with future improvements needed.",
    ],
    technologies: ["Privacy", "Anonymity", "Research", "TOR"],
  },
  // Verzeo
  {
    role: "Cyber Security Intern",
    organization: "Verzeo",
    period: "May 2021 – Jul 2021",
    description: [
      "Supported Product Security Incident Response Team (PSIRT) in incident analysis, improving response efficiency by 20%.",
      "Assisted integration of security tools into management systems, enhancing threat visibility.",
      "Validated vulnerability submissions using Burp Suite and OWASP ZAP.",
      "Performed access control assessments, contributing to improved product security.",
    ],
    technologies: ["Incident Response", "Security Tools", "Vulnerability Assessment", "Access Control"],
  },
];

// Helper: Group experiences by organization
const grouped = experiences.reduce<Record<string, typeof experiences>>((acc, exp) => {
  acc[exp.organization] = acc[exp.organization] || [];
  acc[exp.organization].push(exp);
  return acc;
}, {});

const ExperienceCard = ({ exp }: { exp: typeof experiences[0] }) => (
  <Card className="glass-card p-6 hover-lift mb-6">
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
    <ul className="text-muted-foreground mb-4 leading-relaxed list-disc pl-6">
      {exp.description.map((desc, i) => (
        <li key={i}>{desc}</li>
      ))}
    </ul>
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
);

const ExperienceBlock = ({
  organization,
  experiences,
}: {
  organization: string;
  experiences: typeof experiences;
}) => (
  <div className="flex-1 min-w-[300px]">
    <h2 className="text-2xl font-bold mb-6 gradient-text">{organization}</h2>
    {experiences.map((exp, idx) => (
      <ExperienceCard key={idx} exp={exp} />
    ))}
  </div>
);

const Experience = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Professional Journey</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Building expertise through hands-on experience
        </p>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-12">
        {Object.entries(grouped).map(([organization, experiences]) => (
          <ExperienceBlock
            key={organization}
            organization={organization}
            experiences={experiences}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
