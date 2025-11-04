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
  const { elementRef: ref, isVisible } = useScrollAnimation();

  const experiences: Experience[] = [
    {
      company: "AIESEC in Miami",
      roles: [
        {
          title: "Vice President of Outgoing Global Exchange (oGX)",
          period: "Jan 2025 – Present",
          description: "Led 50+ international exchange programs, connecting students and professionals with global internships and volunteering. Directed strategy, planning, and execution of global exchange projects, ensuring alignment with AIESEC's mission. Implemented weekly meetings for team members, improving efficiency and collaboration by 25%. Built relationships with partners and sponsors, expanding opportunities by 20% year-over-year.",
          skills: ["Leadership", "Global Exchange", "Strategy", "Team Management"]
        },
        {
          title: "Team Member - Outgoing Global Exchange (oGX)",
          period: "Jan 2024 – Dec 2024",
          description: "Guided exchange program participants through the process. Participated in consultancy, marketing, social events, and conferences. Assisted with partnerships and explored global opportunities, building cross-cultural connections.",
          skills: ["Consultancy", "Marketing", "Event Management", "Collaboration"]
        }
      ]
    },
    {
      company: "FIU College of Engineering & Computing",
      roles: [
        {
          title: "Graduate Student Assistant",
          period: "Aug 2024 – Present",
          description: "Provided support to students across cloud computing, HCI, and microcomputers, helping 50+ students complete assignments. Assisted in labs/projects, including AWS, Wix, Microsoft Office, improving performance by 15%. Supported faculty by clarifying concepts, troubleshooting, and reducing query resolution time by 20%. Evaluated and graded coursework, maintaining 100% on-time grading compliance.",
          skills: ["Student Support", "Cloud Computing", "Teaching", "Grading"]
        },
        {
          title: "Graduate Research Assistant",
          period: "Jan 2025 – Apr 2025",
          description: "Analyzed vulnerabilities in LLMs, VLMs, and diffusion models, identifying 30+ critical weaknesses. Developed adversarial attacks, including prompt concealment and MMA-Diffusion extensions. Investigated jailbreaking techniques, uncovering security gaps and proposing novel defenses.",
          skills: ["AI Security", "Adversarial ML"]
        }
      ]
    },
    {
      company: "FIU Cyber Security and Privacy Lab",
      roles: [
        {
          title: "Graduate Research Assistant",
          period: "Feb 2024 – Aug 2024",
          description: "Labeled custom dataset of 10,000+ entries for ML behavioral pattern detection, improving accuracy by 18%. Interviewed users on misinformation perception, providing qualitative insights. Documented findings in Jupyter Notebooks and MS Office, enabling faster decision-making.",
          skills: ["Digital Forensics", "Privacy Tech", "Research Papers", "ML"]
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
    },
    {
      company: "Lovely Professional University",
      roles: [
        {
          title: "Undergraduate Academic Researcher",
          period: "Jan 2023 – Jul 2023",
          description: "Reviewed privacy challenges and anonymity tools (TOR, I2P, browser extensions). Analyzed effectiveness and usability of anonymity technologies. Evaluated privacy-enhancing tech and their role in data protection. Concluded robust solutions for user privacy, with future improvements needed.",
          skills: ["Privacy", "Anonymity", "Research", "TOR"]
        }
      ]
    },
    {
      company: "Verzeo",
      roles: [
        {
          title: "Cyber Security Intern",
          period: "May 2021 – Jul 2021",
          description: "Supported Product Security Incident Response Team (PSIRT) in incident analysis, improving response efficiency by 20%. Assisted integration of security tools into management systems, enhancing threat visibility. Validated vulnerability submissions using Burp Suite and OWASP ZAP. Performed access control assessments, contributing to improved product security.",
          skills: ["Incident Response", "Security Tools", "Vulnerability Assessment", "Access Control"]
        }
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background/50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
              <div
                key={expIndex}
                className={`relative transition-all duration-1000 delay-${expIndex * 100} ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
