import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Role {
  title: string;
  period: string;
  description: string;
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
          title: "Vice President of Outgoing Global Exchange (oGX)",
          period: "Jan 2025 – Present",
          description:
            "Directed the Outgoing Global Exchange Program, enhancing international internship operations and participant engagement. Implemented strategies that improved conversion follow-up efficiency by 20%, optimizing the customer experience. Facilitated weekly performance meetings to boost team alignment, resulting in a significant increase in operational efficiency. Recognized with the \"Outgoing Talent Award\" for exceptional performance in outbound mobility.",
          skills: ["Leadership", "Global Exchange", "Strategy", "Team Management"],
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
        <div className="absolute left-8 top-8 w-4 h-4 -ml-[7px] rounded-full bg-primary ring-4 ring-background z-10">
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
        </div>

        <Card className="ml-20 p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary bg-card/50 backdrop-blur-sm group">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-1">{exp.organization}</h3>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </div>
          </div>

          <div className="space-y-6">
            {exp.roles.map((role, roleIndex) => (
              <div
                key={roleIndex}
                className={`${roleIndex !== 0 ? "pt-6 border-t border-border/50" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h4 className="text-lg font-semibold text-foreground">{role.title}</h4>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{role.period}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">{role.description}</p>

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
    <section id="volunteering" className="py-20 bg-background/50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-16 animate-on-scroll ${titleVisible ? "visible" : ""}`}
        >
          <h2 className="text-4xl font-bold mb-4">Volunteering</h2>
          <p className="text-muted-foreground text-lg">
            Giving back through leadership and community impact
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          <div className="space-y-4">
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
