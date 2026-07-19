import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeader = ({ number, title, subtitle, align = "left" }: SectionHeaderProps) => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div
      ref={elementRef}
      className={`mb-12 md:mb-16 animate-on-scroll ${isVisible ? "visible" : ""} ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <span className={`section-label ${align === "center" ? "justify-center" : ""}`}>
        <span className="text-accent">//</span> {number}
      </span>
      <h2 className="section-title">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
