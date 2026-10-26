"use client";

import { CountdownTimer } from "@/lib/components/CountdownTimer";
import { ECLIPSE } from "@/lib/core/constants/eclipse";
import { formatDate, formatDuration, formatTime } from "@/lib/core/format/eclipse";

/** Props HUD-панели Hero. */
export type HeroHUDProps = {
  /** Ref на обёртку таймера — родитель анимирует её смещение. */
  timerRef?: React.Ref<HTMLDivElement>;
  /** Надзаголовок. */
  eyebrow: string;
  /** Цитата (подпись Зорга). */
  quote: string;
  /** Автор цитаты. */
  quoteAttribution: string;
  /** Подпись HUD-строки состояния. */
  hudLabel: string;
  /** Подпись HUD-подвала. */
  hudFooter: string;
  /** Показывать обратный отсчёт. */
  showTimer: boolean;
  /** Показывать календарный блок. */
  showCalendar: boolean;
};

/**
 * HUD-панель: надзаголовок, цитата, таймер и календарь.
 * Мобильный-first: на малых экранах — стопкой под окном,
 * на md+ — абсолютная колонка справа.
 */
export function HeroHUD({
  timerRef,
  eyebrow,
  quote,
  quoteAttribution,
  hudLabel,
  hudFooter,
  showTimer,
  showCalendar,
}: HeroHUDProps) {
  return (
    <div className="relative z-20 flex w-full flex-col gap-5 md:absolute md:right-6 md:top-1/2 md:w-[22rem] md:-translate-y-1/2 lg:right-10 lg:w-[26rem]">
      <div className="flex flex-col gap-2 border-l border-[var(--color-neon-cyan)]/40 pl-4">
        {eyebrow ? (
          <span className="text-[length:var(--font-size-hud)] uppercase tracking-[0.28em] text-[var(--color-neon-cyan)]">
            {eyebrow}
          </span>
        ) : null}
        {quote ? (
          <blockquote className="text-sm leading-relaxed text-zinc-200 md:text-base">
            {quote}
          </blockquote>
        ) : null}
        {quoteAttribution ? (
          <cite className="not-italic text-[length:var(--font-size-hud)] uppercase tracking-[0.22em] text-zinc-500">
            {quoteAttribution}
          </cite>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        {hudLabel ? (
          <div className="flex items-center gap-2 text-[length:var(--font-size-hud)] uppercase tracking-[0.22em] text-[var(--color-neon-cyan)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-neon-cyan)] animate-hud" />
            {hudLabel}
          </div>
        ) : null}

        {showTimer ? (
          <div ref={timerRef} className="w-full text-neon-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.9)]">
            <CountdownTimer
              target_utc={ECLIPSE.targetDateISO}
              timezones={[{ label: "Луксор", tz: "Africa/Cairo" }]}
              hint_text=""
              accent_color="#00e5ff"
              post_countdown_text=""
            />
          </div>
        ) : null}

        {showCalendar ? (
          <div className="flex flex-col gap-2 text-[length:var(--font-size-hud)] uppercase tracking-[0.18em]">
            <div className="text-zinc-100">
              {formatDate(ECLIPSE.targetDateISO)} · {formatTime(ECLIPSE.targetDateISO, ECLIPSE.timezone)}{" "}
              {ECLIPSE.timezoneLabel}
            </div>
            <div className="text-zinc-400">
              {ECLIPSE.location.label} · {formatDuration(ECLIPSE.totalityDurationSec, "hud")}
            </div>
          </div>
        ) : null}

        {hudFooter ? (
          <div className="border-t border-white/10 pt-3 text-[length:var(--font-size-hud)] uppercase tracking-[0.28em] text-zinc-600">
            {hudFooter}
          </div>
        ) : null}
      </div>
    </div>
  );
}
