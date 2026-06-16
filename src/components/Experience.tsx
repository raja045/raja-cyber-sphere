import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Role {
  title: string;
  period: string;
  description: string;
  skills: string[];
}

interface Experience {
  company: string;
  roles: Role[];
  logo?: string;
}

const Experience = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();

  const experiences: Experience[] = [
    {
      company: "Florida International University — Cybersecurity & Privacy Lab",
      roles: [
        {
          title: "Graduate Student Assistant · Prof. Ruimin Sun / Prof. Bogdan Carbunar",
          period: "Aug 2024 – Dec 2025",
          description:
            "Led adversarial AI red-teaming research and student–faculty coordination across the M.S. Cybersecurity program. (1) Engineered reproducible adversarial attack pipelines against Stable Diffusion T2I models — 35% improvement in attack success rate; pioneered cryptographic prompt injection as a novel LLM jailbreak class with cryptography-aware defensive frameworks. (2) Automated LLM red teaming with Garak, PAIR, GCG, and JailbreakBench against AdvBench — 45% increase in jailbreak detection efficiency, 60% reduction in manual testing time. (3) Engineered and annotated a 10,000+ entry social-media dataset for ML behavior analysis — 18% model accuracy improvement; built Python + Jupyter analytical pipelines that accelerated team decision-making by ~25%. (4) Served as student–faculty liaison: ran weekly doubt-clearing sessions to debug lab assignments and reinforce lecture material; maintained lecture slides between cohorts and graded student assignments / lab submissions with structured rubric-based feedback.",
          skills: [
            "LLM Security",
            "Adversarial ML",
            "Stable Diffusion",
            "Garak",
            "PAIR",
            "GCG",
            "PyTorch",
            "Research",
            "Teaching",
            "Python",
          ],
        },
      ],
    },
    {
      company: "EduRun Group",
      roles: [
        {
          title: "Junior Cyber Security Engineer",
          period: "Jan 2022 – Dec 2023",
          description:
            "SOC operations, threat modeling, and PKI automation for a multi-product education-tech platform. Built Splunk dashboards and correlation alerts — 35% faster detection, 100+ security incidents resolved with 40% MTTR reduction. Authored incident-response playbooks and SOPs aligned to NIST CSF + ISO/IEC 27001 (closed audit gap pre-certification). Threat modeling and security audits reduced undetected threat vectors by 45% and high-severity exposures by 50% within the first year. Administered Active Directory (RBAC, MFA, GPO) — 55% drop in unauthorized-access incidents. Ran phishing simulations across 300+ employees — susceptibility fell 45% in six months. Automated PKI certificate issuance (600+ certs/month) via Azure Key Vault + REST APIs — 65% faster turnaround. Discovered and remediated a critical SQL Injection in a customer-facing app, preventing potential breach of tens of thousands of records.",
          skills: [
            "SOC Operations",
            "Splunk",
            "Incident Response",
            "Active Directory",
            "NIST CSF",
            "ISO 27001",
            "Nessus",
            "Azure Key Vault",
            "PKI Automation",
            "Threat Modeling",
          ],
        },
      ],
    },
    {
      company: "White-Hat Security Researcher — Freelance",
      roles: [
        {
          title: "HackerOne · Bugcrowd · OpenBugBounty · NCIIPC",
          period: "Jun 2023 – Present",
          description:
            "Executed 50+ penetration tests across web applications, APIs, and mobile platforms; surfaced 80+ critical and high-severity vulnerabilities across private VDPs — preventing potential breaches affecting 500,000+ users. Responsibly disclosed 150+ vulnerabilities across HackerOne, Bugcrowd, and NCIIPC (India's national critical-infrastructure protection body): SQLi, OTP bypass, web cache poisoning, broken authentication, sensitive data exposure, and 50+ XSS / data-leak findings via OpenBugBounty. Earned Hall of Fame credit from Inflectra Corp. for a critical-severity disclosure. Built automated recon pipelines (Python + Bash) chaining Subfinder, Amass, Shodan, and ffuf — 40% faster assessments at 95%+ detection accuracy. Delivered CVSS-scored, MITRE ATT&CK-mapped reports with full PoCs and developer-friendly remediation guidance.",
          skills: [
            "Penetration Testing",
            "OWASP Top 10",
            "Burp Suite",
            "Metasploit",
            "SQLmap",
            "MobSF",
            "MITRE ATT&CK",
            "CVSS",
            "Python",
            "Bash",
          ],
        },
      ],
    },
  ];

  const ExperienceCard = ({ exp, expIndex }: { exp: Experience; expIndex: number }) => {
    const { elementRef, isVisible } = useScrollAnimation();
    
    return (
      <div
        ref={elementRef}
        className={`relative animate-on-scroll ${isVisible ? 'visible' : ''} stagger-${(expIndex % 6) + 1}`}
      >
        {/* Timeline Dot */}
        <div className="absolute left-8 top-8 w-4 h-4 -ml-[7px] rounded-full bg-primary ring-4 ring-background z-10">
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
        </div>

        {/* Company Card */}
        <Card className="ml-20 p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary bg-card/50 backdrop-blur-sm group">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-1">{exp.company}</h3>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </div>
          </div>

          {/* Roles within the company */}
          <div className="space-y-6">
            {exp.roles.map((role, roleIndex) => (
              <div
                key={roleIndex}
                className={`${roleIndex !== 0 ? 'pt-6 border-t border-border/50' : ''}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h4 className="text-lg font-semibold text-foreground">{role.title}</h4>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{role.period}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {role.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <section id="experience" className="py-20 bg-background/50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className={`text-center mb-16 animate-on-scroll ${titleVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg">
            My professional journey and contributions
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          <div className="space-y-4">
            {experiences.map((exp, expIndex) => (
              <ExperienceCard key={expIndex} exp={exp} expIndex={expIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
