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
    group: "AIESEC",
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
    group: "AIESEC",
  },
  // FIU roles
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
    group: "FIU",
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
    group: "FIU",
  },
  // ...other experiences (if needed, can be grouped as "Other")
];

// Helper: Group experiences by 'group'
const grouped = experiences.reduce<Record<string, typeof experiences>>((acc, exp) => {
  acc[exp.group] = acc[exp.group] || [];
  acc[exp.group].push(exp);
  return acc;
}, {});

const ExperienceCard = ({ exp }: { exp: typeof experiences[0] }) => {
  return (
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
};

const ExperienceBlock = ({
  group,
  experiences,
}: {
  group: string;
  experiences: typeof experiences;
}) => (
  <div className="flex-1">
    <h2 className="text-2xl font-bold mb-6 gradient-text">
      {group === "AIESEC"
        ? "AIESEC in Miami"
        : group === "FIU"
        ? "FIU College of Engineering & Computing"
        : group}
    </h2>
    {experiences.map((exp, idx) => (
      <ExperienceCard key={idx} exp={exp} />
    ))}
  </div>
);

const Experience = () => {
  return (
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
        <div className="flex flex-col md:flex-row gap-12">
          {grouped["AIESEC"] && (
            <ExperienceBlock group="AIESEC" experiences={grouped["AIESEC"]} />
          )}
          {grouped["FIU"] && (
            <ExperienceBlock group="FIU" experiences={grouped["FIU"]} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
