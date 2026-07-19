const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Primary emerald orb */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-15 animate-ambient-drift"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
      />
      {/* Secondary violet orb */}
      <div
        className="absolute top-1/2 -left-48 w-[400px] h-[400px] rounded-full opacity-15 dark:opacity-10 animate-ambient-drift"
        style={{
          background: "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)",
          animationDelay: "-7s",
        }}
      />
      {/* Accent amber orb */}
      <div
        className="absolute -bottom-24 right-1/4 w-[350px] h-[350px] rounded-full opacity-10 dark:opacity-8 animate-ambient-drift"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
          animationDelay: "-14s",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
};

export default AmbientBackground;
