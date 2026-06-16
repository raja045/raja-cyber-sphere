import { ExternalLink } from "lucide-react";

const latestProjects = [
  { name: "OSCP Certification Prep — HTB + PWK Labs", status: "In Progress" },
  { name: "First CVE Acquisition — moving from disclosure to authority", status: "Active" },
  { name: "Kubernetes Security Lab — Falco + OPA Gatekeeper", status: "In Progress" },
  { name: "Terraform / IaC Security — tfsec + Checkov pipelines", status: "Planning" },
  { name: "CrowdStrike Falcon Engineering — EDR + RTR workflows", status: "Learning" },
  { name: "Intune + ServiceNow at Enterprise Scale", status: "Learning" },
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
