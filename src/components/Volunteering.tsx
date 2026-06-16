import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Role {
  title: string;
  period: string;
  lead?: string;
  bullets?: string[];
  skills: string[];
}

interface VolunteerExperience {
  organization: string;
  roles: Role[];
}

const Volunteering = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();

  const volunteerExperiences: VolunteerExperience[] = [
    {
      organization: "AIESEC in Miami",
      roles: [
        {
          title: "Vice President — Outgoing Global Exchange (oGX)",
          period: "Jan 2025 – Dec 2025",
          lead: "Directed the Outgoing Global Exchange Program, scaling international internship operations and participant engagement.",
          bullets: [
            "Implemented a structured pipeline-management cadence that improved conversion follow-up efficiency by 20%.",
            "Led weekly performance reviews and partner sales calls — driving measurable team alignment and operational efficiency.",
            "Recognized with the \"Outgoing Talent Award\" for exceptional performance in outbound mobility.",
            "Built durable sales + pipeline-management skills directly transferable to security pre-sales / solutions-engineering roles.",
          ],
          skills: ["Leadership", "Sales", "Pipeline Management", "Strategy", "Cross-Cultural Comms"],
        },
      ],
    },
    {
      organization: "FIU Collegiate Cyber Defense Competition (CCDC)",
      roles: [
        {
          title: "Team Leader — Florida Regional CCDC",
          period: "2024 – 2025",
          lead: "Captained the FIU CCDC team through Florida regional defense competitions.",
          bullets: [
            "Coordinated 6+ teammates across blue-team specializations (network, AD, web, cloud, IR, scoring engine).",
            "Built the team's pre-competition lab playbook covering Wazuh tuning, AD hardening baselines, OPNsense + Suricata rule tuning, and incident-injection response patterns.",
            "Delivered post-competition debriefs and translated red-team findings into defensive playbook updates for the next year's cohort.",
          ],
          skills: ["Blue Team", "Team Leadership", "Active Directory", "Wazuh", "Incident Response"],
        },
      ],
    },
    {
      organization: "NCIIPC — National Critical Information Infrastructure Protection Centre (India)",
      roles: [
        {
          title: "Responsible Disclosure Program Contributor",
          period: "Jun 2023 – Nov 2023",
          lead: "Voluntary pro-bono contributions to India's national-critical-infrastructure protection mission.",
          bullets: [
            "Responsibly disclosed 100+ vulnerabilities affecting government and public-sector portals — SQLi, OTP bypass, web cache poisoning, broken authentication, and sensitive data exposure.",
            "Delivered CVSS-scored, MITRE ATT&CK-mapped reports with full PoCs and remediation guidance to NCIIPC analysts.",
            "Pro-bono security work for the national CERT ecosystem.",
          ],
          skills: ["Responsible Disclosure", "Public Sector", "CVSS", "MITRE ATT&CK", "Pro Bono"],
        },
      ],
    },
    {
      organization: "NOOBARMY Cyber Club — LPU",
      roles: [
        {
          title: "Active Member · CTF Player",
          period: "2020 – 2023",
          lead: "Active member of LPU's premier cybersecurity student collective.",
          bullets: [
            "Participated in 50+ CTFs across TryHackMe, HackTheBox, picoCTF, and intercollegiate events.",
            "Mentored junior members on web exploitation, reverse engineering, and OSINT challenge categories.",
            "Helped organize internal red-team / blue-team training events that seeded the next generation of FIU-bound + corporate-SOC-bound members.",
          ],
          skills: ["CTF", "Mentorship", "Web Exploitation", "OSINT", "Community Building"],
        },
      ],
    },
  ];

  const VolunteerCard = ({
    exp,
    expIndex,
  }: {
    exp: VolunteerExperience;
    expIndex: number;
  }) => {
    const { elementRef, isVisible } = useScrollAnimation();

    return (
      <div
        ref={elementRef}
        className={`relative animate-on-scroll ${isVisible ? "visible" : ""} stagger-${(expIndex % 6) + 1}`}
      >
        <div className="absolute left-4 md:left-6 top-7 w-3.5 h-3.5 -ml-[7px] rounded-full bg-primary ring-4 ring-background z-10">
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
        </div>

        <Card className="ml-10 md:ml-16 p-5 md:p-7 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary bg-card/60 backdrop-blur-sm group">
          <div className="flex items-start gap-3 md:gap-4 mb-5">
            <div className="p-2.5 md:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-2 break-words">
                {exp.organization}
              </h3>
              <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </div>
          </div>

          <div className="space-y-6">
            {exp.roles.map((role, roleIndex) => (
              <div
                key={roleIndex}
                className={roleIndex !== 0 ? "pt-6 border-t border-border/50" : ""}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-4 mb-3">
                  <h4 className="text-base md:text-lg font-semibold text-foreground leading-snug">
                    {role.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs md:text-sm shrink-0 whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>{role.period}</span>
                  </div>
                </div>

                {role.lead && (
                  <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-3">
                    {role.lead}
                  </p>
                )}

                {role.bullets && role.bullets.length > 0 && (
                  <ul className="space-y-2 mb-5 pl-0.5">
                    {role.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm md:text-[15px] text-muted-foreground leading-relaxed"
                      >
                        <span className="text-primary mt-1 shrink-0 text-[10px]">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {role.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2.5 py-1 text-[11px] md:text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
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
    <section className="py-16 md:py-24 bg-background/50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-12 md:mb-16 animate-on-scroll ${titleVisible ? "visible" : ""}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Volunteering</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Giving back through leadership and community impact
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          <div className="space-y-6 md:space-y-8">
            {volunteerExperiences.map((exp, expIndex) => (
              <VolunteerCard key={expIndex} exp={exp} expIndex={expIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteering;
