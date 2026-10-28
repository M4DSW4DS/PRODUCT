"use client";

import { useState, useEffect } from "react";

export type Timer1Props = {
  targetDate: string;
  title: string;
  accentColor: string;
  showLabels: boolean;
};

const COLORS: Record<string, string> = {
  "egyptian-gold": "text-[#c9a96e]",
  "neon-cyan": "text-[#00e5ff]",
  "eclipse-orange": "text-[#ff6b35]",
  white: "text-white",
};

export function Timer1({ targetDate, title, accentColor, showLabels }: Timer1Props) {
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
  const colorClass = COLORS[accentColor] ?? COLORS["egyptian-gold"];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black/50">
      {title && <h3 className="text-white mb-6 text-xl font-mono uppercase tracking-widest">{title}</h3>}
      <div className={`flex gap-8 font-mono font-bold ${colorClass}`}>
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl">{pad(timeLeft.d)}</span>
          {showLabels && <span className="text-xs md:text-sm mt-2 opacity-70 uppercase tracking-wider">Дней</span>}
        </div>
        <span className="text-4xl md:text-6xl opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl">{pad(timeLeft.h)}</span>
          {showLabels && <span className="text-xs md:text-sm mt-2 opacity-70 uppercase tracking-wider">Часов</span>}
        </div>
        <span className="text-4xl md:text-6xl opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl">{pad(timeLeft.m)}</span>
          {showLabels && <span className="text-xs md:text-sm mt-2 opacity-70 uppercase tracking-wider">Минут</span>}
        </div>
        <span className="text-4xl md:text-6xl opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl">{pad(timeLeft.s)}</span>
          {showLabels && <span className="text-xs md:text-sm mt-2 opacity-70 uppercase tracking-wider">Секунд</span>}
        </div>
      </div>
    </div>
  );
}