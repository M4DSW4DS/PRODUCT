"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { pollinationsImageUrl } from "../../core/pollinations";
import { CountdownTimer } from "@/lib/components/CountdownTimer";
import type { CountdownTimezone } from "@/lib/components/CountdownTimer";

/** Встраиваемый таймер в Hero. */
export type HeroTimerConfig = {
  /** Вкл/выкл. "yes"/"no" — из Puck-радио; boolean — из контента. */
  enabled: boolean | "yes" | "no";
  /** Целевая точка UTC (ISO 8601). */
  target_utc: string;
  /** Позиция: "below_lead" — между лидом и CTA. */
  position: string;
  timezones: CountdownTimezone[];
  hint_text: string;
  accent_color: string;
  post_countdown_text: string;
};

export type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  align: "left" | "center";
  /** Фон hero: "none" — градиент-плейсхолдер, "url" — своя ссылка, "ai" — Pollinations по промпту */
  imageMode: "none" | "url" | "ai";
  imageUrl: string;
  imagePrompt: string;
  imageSeed: number;
  /** Таймер поверх движка CountdownTimer (undefined у старых данных — не показывается). */
  timer: HeroTimerConfig;
};

/** Локальные стили Hero (пульсация CTA неоновым цианом). */
const STYLES = `
@keyframes hero-cta-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.45); } 50% { box-shadow: 0 0 22px 4px rgba(0, 229, 255, 0.30); } }
.hero-cta-glow { animation: hero-cta-glow 2.4s ease-in-out infinite; }
`;

/**
 * БЛОК — Hero. Первый экран промо-страницы.
 * GSAP-анимации: параллакс фона 0.5x при скролле;
 * fade-in по этапам: eyebrow (0.2s) → H1 (0.4s) → lead (0.6s) → timer (0.8s) → CTA (1.0s).
 */
export function HeroBlock({
  eyebrow,
  title,
  subtitle,
  ctaText,
  ctaHref,
  align,
  imageMode,
  imageUrl,
  imagePrompt,
  imageSeed,
  timer,
}: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(eyebrowRef.current, {
        y: -16, opacity: 0, duration: 0.6, delay: 0.2, ease: "power2.out",
      });
      gsap.from(titleRef.current, {
        y: 28, opacity: 0, duration: 0.8, delay: 0.4, ease: "power2.out",
      });
      gsap.from(leadRef.current, {
        y: 20, opacity: 0, duration: 0.8, delay: 0.6, ease: "power2.out",
      });
      if (timerRef.current) {
        gsap.from(timerRef.current, {
          y: 16, opacity: 0, duration: 0.8, delay: 0.8, ease: "power2.out",
        });
      }
      gsap.from(ctaRef.current, {
        y: 16, opacity: 0, duration: 0.6, delay: 1.0, ease: "power2.out",
      });
    }, rootRef);

    // Параллакс фона 0.5x при скролле.
    const toY = bgRef.current
      ? gsap.quickTo(bgRef.current, "y", { duration: 0.35, ease: "power2.out" })
      : null;
    const onScroll = () => toY?.(window.scrollY * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  const alignCls =
    align === "center" ? "text-center items-center" : "text-left items-start";
  const bgSrc =
    imageMode === "ai"
      ? pollinationsImageUrl(imagePrompt, { width: 768, height: 432, seed: imageSeed })
      : imageMode === "url"
        ? imageUrl
        : "";
  const timerOn =
    timer?.enabled === true ||
    timer?.enabled === "yes";
  const showTimer =
    timerOn &&
    timer?.position === "below_lead" &&
    Boolean(timer?.target_utc);

  return (
    <section ref={rootRef} className="relative overflow-hidden px-6 py-20 md:py-32">
      <style>{STYLES}</style>

      {/* Фон (параллакс 0.5x): картинка или градиент-плейсхолдер cosmic-black → egyptian-gold */}
      <div ref={bgRef} className="absolute inset-0 h-[125%]" aria-hidden="true">
        {bgSrc ? (
          <>
            <img
              src={bgSrc}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-cosmic-black/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black/30 via-transparent to-cosmic-black" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-cosmic-black via-cosmic-black to-egyptian-gold/15" />
        )}
      </div>

      <div className={`relative z-10 flex flex-col gap-6 ${alignCls}`}>
        <span
          ref={eyebrowRef}
          className="text-neon-cyan uppercase tracking-[0.2em] text-sm font-semibold"
        >
          {eyebrow}
        </span>
        <h1 ref={titleRef} className="text-hero font-bold text-egyptian-gold max-w-4xl">
          {title}
        </h1>
        <p ref={leadRef} className="text-lg text-neon-cyan max-w-2xl leading-relaxed">
          {subtitle}
        </p>
        {showTimer ? (
          <div ref={timerRef} className="w-full flex justify-center">
            <CountdownTimer
              target_utc={timer.target_utc}
              timezones={timer.timezones}
              hint_text={timer.hint_text}
              accent_color={timer.accent_color}
              post_countdown_text={timer.post_countdown_text}
            />
          </div>
        ) : null}
        {ctaText ? (
          <a
            ref={ctaRef}
            href={ctaHref || "#"}
            className="hero-cta-glow mt-2 inline-flex w-fit bg-egyptian-gold text-cosmic-black font-semibold px-6 py-3 rounded-lg transition-colors hover:bg-[#ff6b35]"
          >
            {ctaText}
          </a>
        ) : null}
      </div>
    </section>
  );
}

