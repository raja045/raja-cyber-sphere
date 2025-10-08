import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        background: `radial-gradient(circle 300px at ${position.x}px ${position.y}px, hsl(var(--primary) / 0.15), transparent 80%)`,
      }}
    />
  );
};

export default CursorGlow;
