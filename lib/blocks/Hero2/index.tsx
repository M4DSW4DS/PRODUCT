"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { ZorgCabinet } from "../Hero/internal/ZorgCabinet";
import { HeroHUD } from "../Hero/internal/HeroHUD";

export type Hero2Props = {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  quote: { text?: ReactNode; author?: ReactNode } | string;
  cta: { label?: ReactNode; href?: string } | string;
  accentWord?: ReactNode;
  accentColor?: string;
  showTimer?: boolean;
  pinScreens?: number;
};

const ACCENT_MAP: Record<string, string> = {
  "egyptian-gold": "text-[#c9a96e]",
  "neon-cyan": "text-[#00e5ff]",
  "eclipse-orange": "text-[#ff6b35]",
  white: "text-white",
};

export function Hero2(props: Hero2Props) {
  const showTimer = props.showTimer ?? true;
  const pinScreens = props.pinScreens ?? 3;
  const sectionRef = useRef<HTMLElement>(null);
  const cabinetRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  const quoteText = typeof props.quote === "object" && props.quote !== null ? props.quote.text : "";
  const quoteAuthor = typeof props.quote === "object" && props.quote !== null ? props.quote.author : "";
  const ctaLabel = typeof props.cta === "object" && props.cta !== null ? props.cta.label : "";
  const ctaHref = typeof props.cta === "object" && props.cta !== null ? props.cta.href : "";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const overlay = section.querySelector<HTMLDivElement>(".hero-dark-overlay");
    const sun = section.querySelector<HTMLDivElement>(".sun-body");
    const text = section.querySelector<HTMLDivElement>(".hero-text");
    const hud = section.querySelector<HTMLDivElement>(".hero-desk-ui");

    let rafId = 0;
    const tick = () => {
      const rect = section.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const progress = totalScroll > 0 ? Math.max(0, Math.min(1, -rect.top / totalScroll)) : 0;

      if (overlay) overlay.style.opacity = String(progress * 0.8);
      if (sun) sun.style.opacity = String(progress);

      const textProgress = progress > 0.5 ? (progress - 0.5) * 2 : 0;
      if (text) text.style.opacity = String(1 - textProgress);
      if (hud) hud.style.opacity = String(1 - textProgress);

      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, [pinScreens]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-cosmic-black"
      style={{ height: `${pinScreens * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <ZorgCabinet ref={cabinetRef} />

        <div className="space-viewport absolute z-20 pointer-events-none mix-blend-screen"
          style={{ top: "40%", left: "50%", width: "400px", height: "400px", transform: "translate(-50%, -50%)" }}
        >
          <div className="corona-flares" />
          <div className="sun-body absolute inset-0 rounded-full" style={{ boxShadow: "0 0 100px rgba(0, 229, 255, 0.75)", opacity: 0 }} />
          <div className="moon-body" />
        </div>

        <div className="hero-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full max-w-4xl px-6 pointer-events-auto">
          {props.eyebrow && <p className="font-mono text-sm tracking-widest text-egyptian-gold mb-4">{props.eyebrow}</p>}
          {props.title && (
            <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
              {props.title}
              {props.accentWord && (
                <span className={ACCENT_MAP[props.accentColor ?? "egyptian-gold"] ?? ""}> {props.accentWord}</span>
              )}
            </h1>
          )}
          {props.subtitle && <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">{props.subtitle}</p>}
          {quoteText && (
            <div className="mb-8">
              <p className="font-display italic text-xl text-neon-cyan">{quoteText}</p>
              {quoteAuthor && <p className="font-mono text-xs text-white/50 mt-2">{quoteAuthor}</p>}
            </div>
          )}
          {ctaLabel && (
            <a href={ctaHref || "#"} className="inline-block border-2 border-egyptian-gold text-egyptian-gold px-8 py-3 font-mono uppercase tracking-widest hover:bg-egyptian-gold hover:text-black transition-colors pointer-events-auto">
              {ctaLabel}
            </a>
          )}
        </div>

        <div className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-6 hero-desk-ui">
          <HeroHUD timerRef={timerRef} showTimer={showTimer} />
        </div>

        <div className="hero-dark-overlay absolute inset-0 z-20 bg-cosmic-black opacity-0 pointer-events-none" />
      </div>
    </section>
  );
}