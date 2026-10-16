"use client";

import { CountdownTimer } from "@/lib/components/CountdownTimer";
import type { CountdownTimezone } from "@/lib/components/CountdownTimer";

export type TimerProps = {
  title: string;
  /** Целевая дата/время в формате ISO или "YYYY-MM-DDTHH:MM". */
  targetDate: string;
  endMessage: string;
  timezones: CountdownTimezone[];
  hint_text: string;
  accent_color: string;
  post_countdown_text: string;
};

/**
 * БЛОК — Timer. Обратный отсчёт до целевой даты.
 * Обёртка над переиспользуемым движком CountdownTimer.
 */
export function TimerBlock({
  title,
  targetDate,
  endMessage,
  timezones,
  hint_text,
  accent_color,
  post_countdown_text,
}: TimerProps) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-section-title font-bold text-egyptian-gold">
          {title}
        </h2>
        <CountdownTimer
          target_utc={targetDate}
          timezones={timezones}
          hint_text={hint_text}
          accent_color={accent_color}
          post_countdown_text={post_countdown_text || endMessage}
        />
      </div>
    </section>
  );
}
