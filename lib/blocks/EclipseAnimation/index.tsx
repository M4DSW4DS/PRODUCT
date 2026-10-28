"use client";

import { useState, useEffect } from "react";

export type EclipseAnimationProps = {
  size: number;
  autoPlay: boolean;
  speed: number;
};

const PHASES = [
  { x: "120%", y: "-100%" }, // 0
  { x: "80%", y: "-65%" },   // 1
  { x: "55%", y: "-45%" },   // 2
  { x: "35%", y: "-25%" },   // 3
  { x: "20%", y: "-15%" },   // 4
  { x: "10%", y: "-7%" },    // 5
  { x: "0%", y: "0%" },      // 6 (Final)
];

export function EclipseAnimation({ size, autoPlay, speed }: EclipseAnimationProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setStep((s) => (s >= 6 ? 0 : s + 1));
    }, speed);
    return () => clearInterval(interval);
  }, [autoPlay, speed]);

  const phase = PHASES[step];
  const isFinal = step === 6;

  return (
    <div 
      className="relative overflow-hidden rounded-full flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Sun Body */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-1000 ease-in-out"
        style={{
          background: isFinal 
            ? "radial-gradient(circle, #ffffff 0%, #b3e5ff 25%, #0066ff 60%, transparent 100%)" 
            : "radial-gradient(circle at 35% 35%, #ffffff 0%, #ffbb00 20%, #ff3300 55%, #3a0000 90%, transparent 100%)",
          boxShadow: isFinal 
            ? "0 0 60px rgba(0, 229, 255, 0.8), 0 0 120px rgba(0, 229, 255, 0.4)" 
            : "0 0 40px rgba(255, 68, 0, 0.6), inset -10px -10px 30px rgba(0,0,0,0.7)",
        }}
      />

      {/* Moon Body */}
      <div
        className="absolute inset-[0.25%] rounded-full bg-[#020205] transition-transform duration-1000 ease-in-out z-10"
        style={{
          transform: `translate(${phase.x}, ${phase.y})`,
          boxShadow: "inset -15px -15px 40px rgba(255,255,255,0.03), 0 0 20px #000",
        }}
      />
    </div>
  );
}