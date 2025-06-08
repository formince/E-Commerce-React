"use client";

import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  color?: string;
}

export const CardSpotlight = ({
  children,
  className,
  radius = 600,
  color = "rgba(var(--primary-rgb), 0.15)",
  ...props
}: CardSpotlightProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      className={cn(
        "group relative rounded-2xl",
        "border border-border/50",
        "bg-card/80 dark:bg-black/50",
        "backdrop-blur-sm p-8",
        "transition-all duration-300",
        "hover:border-primary/50",
        "overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity,
          background: `
            radial-gradient(
              ${radius}px circle at ${position.x}px ${position.y}px,
              ${color},
              transparent 40%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}; 