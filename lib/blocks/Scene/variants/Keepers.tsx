"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, staggerWords, reveal } from "@/lib/anim/primitives";
import type { SceneProps } from "../index";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Keepers(props: SceneProps) {
  const colorMap: Record<string, string> = {
    gold: "text-egyptian-gold",
    cyan: "text-neon-cyan",
    orange: "text-eclipse-orange",
    white: "text-white",
  };

  const {
    index = 0,
    eyebrowPrefix,
    eyebrowSuffix,
    headingLine1,
    headingLead,
    headingAccent,
    lead,
    accent = "cyan",
    voices = [],
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
          gsap.set([...targets, ".keepers-voice"], {
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

          gsap.set([...targets, ".keepers-voice"], { opacity: 0, y: 20 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 80%",
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

          // 3. Voices stagger
          tl.to(".keepers-voice", {
            y: 0,
            opacity: 1,
            stagger: { each: 0.1 },
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
      data-anim="keepers"
      className="relative w-full min-h-screen flex flex-col justify-center py-24 px-6 overflow-hidden bg-cosmic-black"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">

      {/* Eyebrow */}
      {eyebrow ? (
        <div className="font-mono text-xs uppercase tracking-[0.28em] text-neon-cyan mb-6">
          {eyebrow}
        </div>
      ) : null}

      {/* Heading */}
      {props.headingLines?.length ? (
        <h2 className="font-display text-4xl md:text-6xl mb-6 flex flex-col items-center text-center scene-text">
          {props.headingLines.map((line, i) => (
            <span key={i} className={colorMap[line.color] || "text-white"}>{line.text}</span>
          ))}
        </h2>
      ) : (
        <h2
          ref={headingRef}
          data-anim="keepers"
          className="scene-text font-display font-bold text-white break-words leading-tight text-3xl md:text-4xl text-center max-w-2xl"
        >
          {headingLine1}
          {hasHeadingPart2 ? <br /> : null}
          {headingLead} {headingAccent ? (
            <span className="text-neon-cyan">{headingAccent}</span>
          ) : null}
        </h2>
      )}

      {/* Lead */}
      {props.textBlocks?.length ? (
        <div className="flex flex-col gap-4 mb-8">
          {props.textBlocks.map((block, i) => (
            <p key={i} className="text-lg text-white/80 scene-text">{block.text}</p>
          ))}
        </div>
      ) : (
        lead ? (
          <p
            ref={leadRef}
            data-anim="keepers"
            className="scene-text mt-6 text-base leading-relaxed text-zinc-300 md:text-lg text-center max-w-xl"
          >
            {lead}
          </p>
        ) : null
      )}

      {/* Voices: bottom third, centered */}
      <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
        {voices.map((voice, i) => (
          <div
            key={i}
            className="keepers-voice flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-white/5 text-neon-cyan/80 font-mono text-xs md:text-sm uppercase tracking-widest"
          >
            {voice.name}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
