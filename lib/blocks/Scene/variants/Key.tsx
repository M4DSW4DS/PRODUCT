"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, staggerWords, reveal } from "@/lib/anim/primitives";
import type { SceneProps } from "../index";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Key(props: SceneProps) {
  const {
    index = 0,
    eyebrowPrefix,
    eyebrowSuffix,
    headingLine1,
    headingLead,
    headingAccent,
    lead,
    accent = "gold",
  } = props;

  const prefix = eyebrowPrefix || `SCENE ${String(index + 1).padStart(2, "0")}`;
  const eyebrow = `${prefix} // ${eyebrowSuffix ?? ""}`.trim();

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);

  const hasHeadingPart2 = Boolean(headingLead || headingAccent);

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
          gsap.set([...targets, ".key-card"], {
            opacity: 1,
            y: 0,
            filter: "none",
          });
        }
      );

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)" },
        () => {
          // Hide elements before first render to prevent FOUC
          const targets: HTMLElement[] = [];
          if (headingEl) targets.push(headingEl);
          if (leadEl) targets.push(leadEl);
          gsap.set([...targets, ".key-card"], { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
            },
          });

          // 1. staggerWords(heading)
          if (headingEl) {
            tl.add(() => staggerWords(headingEl), 0);
          }

          // 2. reveal(lead)
          if (leadEl) {
            tl.add(() => reveal(leadEl), "+=0.2");
          }

          // 3. Cards stagger
          tl.to(".key-card", {
            y: 0,
            opacity: 1,
            stagger: { each: 0.1, from: [0, 1, 3, 2] as any },
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
      data-anim="key"
      className="relative w-full min-h-screen flex flex-col justify-center py-24 px-6 overflow-hidden bg-cosmic-black"
    >
      {/* Left: Text */}
      <div className="relative z-10 max-w-7xl mx-auto w-full md:col-span-5 flex flex-col justify-center">
        {eyebrow ? (
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-egyptian-gold mb-4">
            {eyebrow}
          </div>
        ) : null}
        <h2
          ref={headingRef}
          data-anim="key"
          className="font-display font-bold text-white break-words leading-tight"
        >
          {headingLine1}
          {hasHeadingPart2 ? <br /> : null}
          {headingLead}{" "}
          {headingAccent ? (
            <span className="text-egyptian-gold">{headingAccent}</span>
          ) : null}
        </h2>
        {lead ? (
          <p
            ref={leadRef}
            data-anim="key"
            className="mt-4 text-base leading-relaxed text-zinc-300 md:text-lg"
          >
            {lead}
          </p>
        ) : null}
      </div>

      {/* Right: Cards */}
      <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
        <div
          data-anim="key"
          className="key-card bg-cosmic-black/50 border border-egyptian-gold/30 p-6 flex flex-col items-center text-center"
        >
          <div className="text-2xl md:text-4xl font-display text-egyptian-gold font-bold">
            01
          </div>
          <div className="text-xs md:text-sm text-white/60 font-mono mt-2">
            Primary Key
          </div>
        </div>
        <div
          data-anim="key"
          className="key-card bg-cosmic-black/50 border border-egyptian-gold/30 p-6 flex flex-col items-center text-center"
        >
          <div className="text-2xl md:text-4xl font-display text-egyptian-gold font-bold">
            02
          </div>
          <div className="text-xs md:text-sm text-white/60 font-mono mt-2">
            Secondary Key
          </div>
        </div>
        <div
          data-anim="key"
          className="key-card bg-cosmic-black/50 border border-egyptian-gold/30 p-6 flex flex-col items-center text-center"
        >
          <div className="text-2xl md:text-4xl font-display text-egyptian-gold font-bold">
            03
          </div>
          <div className="text-xs md:text-sm text-white/60 font-mono mt-2">
            Tertiary Key
          </div>
        </div>
        <div
          data-anim="key"
          className="key-card bg-cosmic-black/50 border border-egyptian-gold/30 p-6 flex flex-col items-center text-center"
        >
          <div className="text-2xl md:text-4xl font-display text-egyptian-gold font-bold">
            04
          </div>
          <div className="text-xs md:text-sm text-white/60 font-mono mt-2">
            Quaternary Key
          </div>
        </div>
      </div>
    </div>
  );
}
