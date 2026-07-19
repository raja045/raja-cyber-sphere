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
    <div className="relative z-40 mt-[4.5rem] bg-muted/40 border-y border-border/40 overflow-hidden backdrop-blur-sm">
      <div className="animate-marquee whitespace-nowrap py-2.5">
        <span className="inline-flex items-center gap-8">
          {[...latestProjects, ...latestProjects].map((project, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 text-sm font-medium px-4"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">{project.status}:</span>
              <span className="text-foreground/80">{project.name}</span>
              <ExternalLink className="h-3 w-3 text-primary/40" />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
