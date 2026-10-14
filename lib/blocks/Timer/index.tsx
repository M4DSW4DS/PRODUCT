"use client";

import { useEffect, useState } from "react";

export type TimerProps = {
  title: string;
  /** Целевая дата/время в формате ISO или "YYYY-MM-DDTHH:MM". */
  targetDate: string;
  endMessage: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calcTimeLeft(target: string): TimeLeft | null {
  const diff = new Date(target).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * БЛОК — Timer. Обратный отсчёт до целевой даты.
 * Клиентский компонент: использует состояние и интервал.
 */
export function TimerBlock({ title, targetDate, endMessage }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    calcTimeLeft(targetDate)
  );

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units: Array<[number, string]> = timeLeft
    ? [
        [timeLeft.days, "дней"],
        [timeLeft.hours, "часов"],
        [timeLeft.minutes, "минут"],
        [timeLeft.seconds, "секунд"],
      ]
    : [];

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        <h2 className="text-section-title font-bold text-egyptian-gold">{title}</h2>
        {timeLeft ? (
          <div className="flex flex-wrap justify-center gap-4">
            {units.map(([value, label]) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center w-24 h-24 rounded-xl border border-neon-cyan/30 bg-white/5"
              >
                <span className="text-3xl font-bold text-neon-cyan">{value}</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-zinc-300">{endMessage}</p>
        )}
      </div>
    </section>
  );
}
