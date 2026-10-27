"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  /** Показывать обратный отсчёт. */
  showTimer: boolean;
  /** Показывать календарный блок. */
  showCalendar: boolean;
  sunTop?: string;
  sunLeft?: string;
  sunSize?: string;
  sunGlowColor?: string;
  sunGlowSize?: number;
  sunGlowOpacity?: string;
  eclipsePercent?: number;
  eclipseColor?: string;
};

const glowColorMap: Record<string, string> = {
  "neon-cyan": "0, 229, 255",
  "egyptian-gold": "201, 169, 110",
  "eclipse-orange": "255, 107, 53",
  white: "255, 255, 255",
};

const eclipseColorMap: Record<string, string> = {
  "cosmic-black": "10, 10, 15",
  "egyptian-gold": "201, 169, 110",
  "eclipse-orange": "255, 107, 53",
};

/**
 * БЛОК — Hero (кинематографичная версия).
 *
 * Структура: круглое окно-прицел + фоновый шкаф Зорга + HUD-панель.
 * Пиннится на 150% высоты вьюпорта; окно «отъезжает» с zoom 14 → 1.
 */
export function Hero(props: HeroProps) {
  const showTimer = props.showTimer ?? true;
  const rootRef = useRef<HTMLElement>(null);
  const cabinetRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Intro animation
    gsap.fromTo(".hero-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      }
    });

    // Fade out text and HUD; keep Zorg background fully visible
    tl.to(".hero-text, .hero-desk-ui", { opacity: 0, duration: 1 }, 0);

    // Dark overlay 80% for transition
    tl.to(".hero-dark-overlay", { opacity: 0.8, duration: 1 }, 0);

    // Brighten the Sun (fade in to full brightness)
    tl.to(".sun-body", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 1);
  }, { scope: rootRef });

  return (
    <section
      ref={rootRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-cosmic-black"
    >
      {/* Фоновый слой — шкаф Зорга */}
      <ZorgCabinet ref={cabinetRef} />

      {/* Текстовый контент Hero (восстановлен для админки) */}
      <div className="hero-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full max-w-4xl px-6 pointer-events-auto">
        {props.eyebrow && <p className="font-mono text-sm tracking-widest text-egyptian-gold mb-4">{props.eyebrow}</p>}
        {props.title && <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">{props.title}</h1>}
        {props.subtitle && <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">{props.subtitle}</p>}
        {props.quote && (
          <div className="mb-8">
            <p className="font-display italic text-xl text-neon-cyan">«{props.quote}»</p>
            {props.quoteAttribution && <p className="font-mono text-xs text-white/50 mt-2">— {props.quoteAttribution}</p>}
          </div>
        )}
        {props.ctaLabel && (
          <a href={props.ctaHref} className="inline-block border-2 border-egyptian-gold text-egyptian-gold px-8 py-3 font-mono uppercase tracking-widest hover:bg-egyptian-gold hover:text-black transition-colors pointer-events-auto">
            {props.ctaLabel}
          </a>
        )}
      </div>

      {/* CSS Eclipse Sphere */}
      <div
        className="space-viewport absolute z-20 pointer-events-none mix-blend-mode-screen"
        style={{
          top: props.sunTop ?? "40%",
          left: props.sunLeft ?? "50%",
          width: props.sunSize ?? "400px",
          height: props.sunSize ?? "400px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="corona-flares" />
        <div className="sun-body relative absolute inset-0 rounded-full" style={{ boxShadow: `0 0 ${props.sunGlowSize ?? 100}px rgba(${glowColorMap[props.sunGlowColor ?? "neon-cyan"] ?? "0, 229, 255"}, ${props.sunGlowOpacity ?? "0.75"})` }} />
        {props.eclipsePercent && props.eclipsePercent > 0 && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              backgroundColor: `rgba(${eclipseColorMap[props.eclipseColor ?? "cosmic-black"] ?? "10, 10, 15"}, ${props.eclipsePercent / 100})`,
            }}
            aria-hidden="true"
          />
        )}
        <div className="moon-body" />
      </div>

      {/* HUD-панель */}
      <div className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-6 hero-desk-ui">
        <HeroHUD
          timerRef={timerRef}
          showTimer={showTimer}
        />
      </div>

      <div className="hero-dark-overlay absolute inset-0 z-20 bg-cosmic-black opacity-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent z-20 pointer-events-none" />

    </section>
  );
}
