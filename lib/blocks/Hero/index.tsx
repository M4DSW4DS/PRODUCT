"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircularWindow } from "./internal/CircularWindow";
import { ZorgCabinet } from "./internal/ZorgCabinet";
import { HeroHUD } from "./internal/HeroHUD";

gsap.registerPlugin(ScrollTrigger);

// Local shim for @gsap/react useGSAP (keeps dependency footprint empty)
function useGSAP(callback: () => void, config?: { scope?: any }) {
  useLayoutEffect(() => {
    const ctx = gsap.context(callback, config?.scope?.current ?? undefined);
    return () => ctx.revert();
  }, []);
}

/** Пропсы блока Hero (кинематографичная версия). */
export type HeroProps = {
  /** Надзаголовок. */
  eyebrow: string;
  /** Главный заголовок. */
  title: string;
  /** Подзаголовок. */
  subtitle: string;
  /** Цитата Зорга. */
  quote: string;
  /** Автор цитаты. */
  quoteAttribution: string;
  /** Текст CTA-кнопки. */
  ctaLabel: string;
  /** Ссылка CTA. */
  ctaHref: string;
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
 * БЛОК — Hero (кинематографичная версия).
 *
 * Структура: круглое окно-прицел + фоновый шкаф Зорга + HUD-панель.
 * Пиннится на 150% высоты вьюпорта; окно «отъезжает» с zoom 14 → 1.
 */
export function Hero({
  eyebrow = "",
  title = "",
  subtitle = "",
  quote = "",
  quoteAttribution = "MISTER ZORG",
  ctaLabel = "",
  ctaHref = "",
  hudLabel = "System Ready // Countdown",
  hudFooter = "ORBIT · EARTH · EGYPT",
  showTimer = true,
  showCalendar = true,
}: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const cabinetRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Intro animation
    gsap.fromTo(".hero-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top top",
        end: "+=133%",
        pin: true,
        scrub: 1,
      }
    });

    // 1. Fade out text and cabinet
    tl.to(".hero-text", { opacity: 0, y: -50, duration: 1 }, 0);
    tl.to(".zorg-cabinet", { opacity: 0, scale: 1.1, duration: 1 }, 0);

    // 2. Morph window to top-right
    const windowEl = windowRef.current;
    if (windowEl) {
      // Reset any previous transforms to measure correctly
      gsap.set(windowEl, { clearProps: "transform" });
      
      const rect = windowEl.getBoundingClientRect();
      
      // Start X is based on its actual left position
      const startCenterX = rect.left + rect.width / 2;
      // Start Y is ALWAYS center of screen because the window is vertically centered in the pinned Hero (top-1/2 -translate-y-1/2)
      const startCenterY = window.innerHeight / 2; 
      
      // Target: Top Center (window size 140px, 10vh from top)
      const targetCenterX = window.innerWidth / 2;
      const targetCenterY = (window.innerHeight * 0.10) + 70; // 10vh from top + 70px (half of 140px) 
      
      const targetX = targetCenterX - startCenterX;
      const targetY = targetCenterY - startCenterY;
      const scale = 140 / rect.width;

      tl.to(windowEl, { 
        x: targetX, 
        y: targetY, 
        scale: scale, 
        transformOrigin: "center center",
        duration: 1.5, 
        ease: "power2.inOut" 
      }, 0.5);
      
      tl.to(".hero-circular-window img", { opacity: 0, duration: 0.5 }, 1.5);
      tl.to(windowEl, { 
        backgroundColor: "#e87a00", 
        borderColor: "rgba(253, 224, 71, 0.3)", 
        boxShadow: "0 0 80px rgba(255,180,50,0.8)",
        duration: 0.5 
      }, 1.5);
    }

    // 3. Handoff
    const eclipseAnchor = document.querySelector(".eclipse-anchor");
    if (eclipseAnchor && windowEl) {
      tl.set(windowEl, { visibility: "hidden" }, 2);
      tl.set(eclipseAnchor, { visibility: "visible", opacity: 1 }, 2);
    }
  }, { scope: rootRef });

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden bg-cosmic-black px-6 py-24 md:flex-row md:gap-12 md:py-32"
    >
      {/* Фоновый слой — шкаф Зорга */}
      <ZorgCabinet ref={cabinetRef} />

      {/* Круглое окно-прицел */}
      <div className="flex flex-col items-center justify-center w-full">
        <CircularWindow ref={windowRef} imageSrc="/hero/zorg-window.webp" />
      </div>

      {/* Левый столбец: заголовок, подзаголовок, CTA */}
      <div className="relative z-20 flex w-full flex-col items-center gap-5 text-center md:absolute md:left-8 md:top-1/2 md:w-[24rem] md:-translate-y-1/2 md:items-start md:text-left lg:left-16 lg:w-[30rem]">
        {title ? (
          <h1 className="hero-title hero-text font-display text-hero font-bold text-egyptian-gold">
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <p className="hero-subtitle hero-text max-w-xl text-[length:var(--font-size-body)] leading-relaxed text-zinc-300">
            {subtitle}
          </p>
        ) : null}
        {ctaLabel ? (
          <a
            href={ctaHref || "#"}
            className="hero-cta inline-flex w-fit items-center border border-[var(--color-neon-cyan)]/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-neon-cyan)] transition-colors hover:bg-[var(--color-neon-cyan)]/10"
          >
            {ctaLabel}
          </a>
        ) : null}
      </div>

      {/* HUD-панель */}
      <div className="hero-text">
        <HeroHUD
          timerRef={timerRef}
          eyebrow={eyebrow}
          quote={quote}
          quoteAttribution={quoteAttribution}
          hudLabel={hudLabel}
          hudFooter={hudFooter}
          showTimer={showTimer}
          showCalendar={showCalendar}
        />
      </div>

      {/* Декоративная подсказка прокрутки */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[length:var(--font-size-hud)] uppercase tracking-[0.4em] text-zinc-600">
        Scroll
      </div>
    </section>
  );
}
