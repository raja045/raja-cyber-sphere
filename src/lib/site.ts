export const site = {
  name: "Raja Shekar Reddy Seelam",
  shortName: "Raja Shekar",
  initials: "RS",
  role: "Security Engineer · AI Red-Teaming · Cloud",
  tagline: "Building secure systems that scale.",
  description:
    "Security engineer with a focus on LLM red-teaming, cloud hardening, and SOC operations. 150+ CVEs disclosed, 100+ incidents resolved. M.S. Cybersecurity, FIU.",
  url: "https://rajareddy.site",
  location: "Miami, FL",
  email: "rajacollegeevents@gmail.com",
  resumeUrl: "/raja-shekar-reddy-seelam-resume.pdf",
  calUrl: "", // user will provide; falls back gracefully when empty
  social: {
    github: "https://github.com/raja045",
    linkedin: "https://www.linkedin.com/in/rajashekarreddyseelam/",
    twitter: "",
  },
  nav: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  proof: [
    { value: "150+", label: "CVEs disclosed" },
    { value: "100+", label: "Incidents resolved" },
    { value: "3.9", label: "M.S. GPA · FIU" },
    { value: "4+", label: "Years in security" },
  ],
};

export type SiteConfig = typeof site;
