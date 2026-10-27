"use client";

import { useRef, useLayoutEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ZorgCabinet } from "./internal/ZorgCabinet";
import { HeroHUD } from "./internal/HeroHUD";

gsap.registerPlugin(ScrollTrigger);

function useGSAP(callback: () => void, config?: { scope?: any }) {
  useLayoutEffect(() => {
    const ctx = gsap.context(callback, config?.scope?.current ?? undefined);
    return () => ctx.revert();
  }, []);
}

export type HeroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  quote: { text?: ReactNode; author?: ReactNode } | string;
  cta: { label?: ReactNode; href?: string } | string;
  accentWord?: ReactNode;
  accentColor?: string;
  showTimer?: boolean;
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

const ACCENT_MAP: Record<string, string> = {
  "egyptian-gold": "text-[#c9a96e]",
  "neon-cyan": "text-[#00e5ff]",
  "eclipse-orange": "text-[#ff6b35]",
  white: "text-white",
};

export function Hero(props: HeroProps) {
  const showTimer = props.showTimer ?? true;
  const rootRef = useRef<HTMLElement>(null);
  const cabinetRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  const quoteText = typeof props.quote === "object" && props.quote !== null ? props.quote.text : "";
  const quoteAuthor = typeof props.quote === "object" && props.quote !== null ? props.quote.author : "";
  const ctaLabel = typeof props.cta === "object" && props.cta !== null ? props.cta.label : "";
  const ctaHref = typeof props.cta === "object" && props.cta !== null ? props.cta.href : "";

  useGSAP(() => {
    gsap.fromTo(".hero-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      },
    });

    tl.to(".hero-text, .hero-desk-ui", { opacity: 0, duration: 1 }, 0);
    tl.to(".hero-dark-overlay", { opacity: 0.8, duration: 1 }, 0);
    tl.to(".sun-body", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 1);
  }, { scope: rootRef });

  return (
    <section ref={rootRef} className="relative h-[100dvh] w-full overflow-hidden bg-cosmic-black">
      <ZorgCabinet ref={cabinetRef} />

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

      <div className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-6 hero-desk-ui">
        <HeroHUD timerRef={timerRef} showTimer={showTimer} />
      </div>

      <div className="hero-dark-overlay absolute inset-0 z-20 bg-cosmic-black opacity-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent z-20 pointer-events-none" />
    </section>
  );
}