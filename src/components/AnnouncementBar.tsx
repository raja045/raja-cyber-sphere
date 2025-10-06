import { ExternalLink } from "lucide-react";

const latestProjects = [
  { name: "AI-Powered Threat Detection System", status: "In Progress" },
  { name: "Zero Trust Network Architecture", status: "Research Phase" },
  { name: "Blockchain Security Audit Framework", status: "Planning" },
  { name: "Advanced Malware Analysis Lab", status: "In Progress" },
];

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border/50 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-3">
        <span className="inline-flex items-center gap-8">
          {[...latestProjects, ...latestProjects].map((project, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 text-sm font-medium px-4"
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">{project.status}:</span>
              <span className="gradient-text">{project.name}</span>
              <ExternalLink className="h-3 w-3 text-primary/50" />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
