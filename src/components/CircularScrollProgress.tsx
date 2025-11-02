import { useEffect, useState } from "react";

const CircularScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div className="relative w-22 h-22 flex items-center justify-center">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-background/80 backdrop-blur-sm border border-border/50" />
        
        {/* SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="4"
            opacity="0.3"
          />
          {/* Progress ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
            style={{
              filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))"
            }}
          />
        </svg>
        
        {/* Percentage text */}
        <div className="relative text-center">
          <span className="text-lg font-bold gradient-text">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircularScrollProgress;
