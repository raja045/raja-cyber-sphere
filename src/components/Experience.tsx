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
      company: "FIU College of Engineering & Computing",
      roles: [
        {
          title: "Graduate Research Assistant – Under Professor Ruimin Sun",
          period: "Jan 2025 – Apr 2025",
          description: "Engineered reproducible adversarial attacks on Stable Diffusion models improving attack success rate by 35%. Pioneered a novel cryptographic prompt injection methodology as a new LLM jailbreak attack direction. Automated AI red teaming pipelines increasing jailbreak detection efficiency by 45%.",
          skills: ["AI Security", "Adversarial ML", "LLM Jailbreaking", "Red Teaming"]
        }
      ]
    },
    {
      company: "FIU Cyber Security and Privacy Lab",
      roles: [
        {
          title: "Graduate Research Assistant",
          period: "Feb 2024 – Aug 2024",
          description: "Engineered a 10,000+ entry dataset boosting ML model accuracy by 18%. Conducted user interviews to derive behavioral features enhancing model prediction accuracy. Visualized research findings accelerating team decision-making by 25%.",
          skills: ["Digital Forensics", "Privacy Tech", "Research", "ML", "Data Visualization"]
        }
      ]
    },
    {
      company: "EduRun Group",
      roles: [
        {
          title: "Junior Cyber Security Engineer",
          period: "Jan 2022 – Dec 2023",
          description: "Proactively identified and neutralized a critical SQL Injection vulnerability in a customer-facing web application, preventing a catastrophic data breach impacting tens of thousands of customers. Conducted comprehensive security audits, vulnerability assessments, and penetration testing aligned with NIST CSF, ISO/IEC 27001, and OWASP Top 10 — achieving a 45% reduction in undetected threat vectors and 50% decrease in high-severity risk exposure. Automated 600+ monthly PKI certificate operations, reduced secrets mismanagement by 80% via Azure Key Vault, and improved SOC incident MTTR by 40% while resolving 100+ security incidents. Administered Active Directory, MFA, and RBAC policies, and built security automation frameworks using Java, Python, Bash, Splunk, Nessus, Burp Suite, Docker, and Azure.",
          skills: ["Penetration Testing", "OWASP", "NIST CSF", "Azure", "PKI", "Splunk", "Python", "Docker"]
        }
      ]
    },
    {
      company: "HackerOne, Bugcrowd",
      roles: [
        {
          title: "White-hat Security Researcher",
          period: "Jul 2023 – Feb 2024",
          description: "Performed 50+ security assessments and penetration tests, reporting 80+ critical vulnerabilities. Documented vulnerabilities across OWASP Top 10 categories. Used Burp Suite, Nmap, OWASP ZAP, Metasploit for manual and automated testing. Coordinated with dev teams for vulnerability remediation.",
          skills: ["Security Testing", "OWASP", "Penetration Testing", "Bug Bounty"]
        }
      ]
    }
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
