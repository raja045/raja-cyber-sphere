import { site } from "@/lib/site";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Security Engineer",
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miami",
      addressRegion: "FL",
      addressCountry: "US",
    },
    sameAs: [site.social.github, site.social.linkedin].filter(Boolean),
    knowsAbout: [
      "LLM Security",
      "AI Red-Teaming",
      "SOC Operations",
      "Cloud Security",
      "Penetration Testing",
      "Threat Intelligence",
      "Incident Response",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Florida International University",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Lovely Professional University",
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: site.url,
    name: site.shortName,
    description: site.description,
    inLanguage: "en-US",
    author: { "@type": "Person", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
