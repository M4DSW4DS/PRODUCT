"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, staggerWords, reveal } from "@/lib/anim/primitives";
import type { SceneProps } from "../index";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const PLATE_COLOR_CLASS: Record<string, string> = {
  orange: "bg-eclipse-orange/20 border-eclipse-orange/40 text-eclipse-orange",
  cyan: "bg-neon-cyan/20 border-neon-cyan/40 text-neon-cyan",
  gold: "bg-egyptian-gold/20 border-egyptian-gold/40 text-egyptian-gold",
  white: "bg-white/20 border-white/40 text-white",
};

export function Elements(props: SceneProps) {
  const {
    index = 0,
    eyebrowPrefix,
    eyebrowSuffix,
    headingLine1,
    headingLead,
    headingAccent,
    lead,
    accent = "gold",
    plates = [],
  } = props;

  const prefix = eyebrowPrefix || `SCENE ${String(index + 1).padStart(2, "0")}`;
  const eyebrow = `${prefix} // ${eyebrowSuffix ?? ""}`.trim();

  const hasHeadingPart2 = Boolean(headingLead || headingAccent);

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const headingEl = headingRef.current;
    const leadEl = leadRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // prefers-reduced-motion: reduce — content visible immediately, no tweens.
      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)" },
        () => {
          const targets: HTMLElement[] = [];
          if (headingEl) targets.push(headingEl);
          if (leadEl) targets.push(leadEl);
          gsap.set([...targets, ".elements-plate"], {
            opacity: 1,
            y: 0,
            filter: "none",
          });
        }
      );

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)" },
        () => {
          const targets: HTMLElement[] = [];
          if (headingEl) targets.push(headingEl);
          if (leadEl) targets.push(leadEl);

          gsap.set([...targets, ".elements-plate"], { opacity: 0, y: 30 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
              pin: true,
              pinSpacing: false,
              end: "+=200%",
              scrub: 1,
            },
          });

          // 1. Heading staggerWords
          if (headingEl) {
            tl.add(() => staggerWords(headingEl), 0);
          }

          // 2. Lead reveal
          if (leadEl) {
            tl.add(() => reveal(leadEl), "+=0.2");
          }

          // 3. Plates slide up with stagger
          tl.to(".elements-plate", {
            y: 0,
            opacity: 1,
            stagger: { each: 0.15 },
          });

           gsap.from(".scene-text", {
             y: 30,
             opacity: 0,
             duration: 1,
             stagger: 0.1,
             scrollTrigger: { trigger: root, start: "top 80%" },
           });
        }
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-anim="elements"
      className="relative w-full min-h-screen flex flex-col justify-center py-24 px-6 overflow-hidden bg-cosmic-black"
    >
      {/* Left column: eyebrow + heading + lead */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-center items-start md:max-w-[45rem]">
        {eyebrow ? (
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-egyptian-gold mb-4">
            {eyebrow}
          </div>
        ) : null}
        <h2
          ref={headingRef}
          data-anim="elements"
          className="scene-text font-display font-bold text-white break-words leading-tight text-4xl md:text-5xl"
        >
          {headingLine1}
          {hasHeadingPart2 ? <br /> : null}
          {headingLead} {headingAccent ? (
            <span className="text-eclipse-orange">{headingAccent}</span>
          ) : null}
        </h2>
        {lead ? (
          <p
            ref={leadRef}
            data-anim="elements"
            className="scene-text mt-4 text-base leading-relaxed text-zinc-300 md:text-lg max-w-lg"
          >
            {lead}
          </p>
        ) : null}
      </div>

      {/* 3D Pillars */}
      <div className="pillars-container mt-12">
        {plates.map((plate, i) => (
          <div key={i} className="pillar">
            <div className="pillar-3d">
              <div className="face face-front">
                <span className="hieroglyph">𓂀</span>
                <span className="hieroglyph small">𓆣</span>
                <span className="hieroglyph">𓊪</span>
              </div>
              <div className="face face-left">
                <span className="hieroglyph small">𓊹</span>
                <span className="hieroglyph small">𓉐</span>
              </div>
              <div className="face face-right">
                <span className="hieroglyph small">𓋹</span>
                <span className="hieroglyph small">𓌀</span>
              </div>
            </div>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono text-sm tracking-widest text-egyptian-gold uppercase">
              {plate.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
