"use client";

import { useState, useEffect } from "react";

export type Timer2Props = {
  targetDate: string;
  size: "sm" | "md" | "lg";
  glow: boolean;
  labelDays: string;
  labelHours: string;
  labelMinutes: string;
  labelSeconds: string;
  cardBg: boolean;
};

export function Timer2({ targetDate, size, glow, labelDays, labelHours, labelMinutes, labelSeconds, cardBg }: Timer2Props) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    if (isNaN(target)) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const sizeMap = {
    sm: "text-2xl md:text-3xl",
    md: "text-4xl md:text-5xl",
    lg: "text-6xl md:text-7xl",
  };
  
  const glowClass = glow ? "drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]" : "";
  const bgClass = cardBg ? "bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8" : "";

  const units = [
    { val: pad(timeLeft.d), label: labelDays },
    { val: pad(timeLeft.h), label: labelHours },
    { val: pad(timeLeft.m), label: labelMinutes },
    { val: pad(timeLeft.s), label: labelSeconds },
  ];

  return (
    <div className={`flex justify-center items-center ${bgClass}`}>
      <div className={`flex gap-4 md:gap-8 font-mono text-white ${glowClass}`}>
        {units.map((u, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className={`${sizeMap[size]} font-black tracking-tighter`}>{u.val}</span>
            {u.label && <span className="text-xs md:text-sm text-zinc-400 uppercase tracking-widest mt-2">{u.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}