"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EclipseSun() {
  const rootRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const anchor = rootRef.current;
      const mask = maskRef.current;
      const sun = sunRef.current;
      if (!anchor || !mask || !sun) return;

      // Sun visibility is controlled by Hero timeline (starts hidden, opacity 0).

      // 2. Progress mask from Scene 1 to Scene 7
      gsap.to(mask, {
        "--eclipse": "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "#scene-mystery",
          start: "top center",
          endTrigger: "#scene-fifth",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            // 1. Fade in corona at the end (last 10% of the scroll)
            const corona = rootRef.current?.querySelector(".corona");
            if (corona) {
              const opacity = self.progress > 0.9 ? (self.progress - 0.9) * 10 : 0;
              gsap.set(corona, { opacity });
            }

            // 2. Update the percentage text
            const readout = rootRef.current?.querySelector("#eclipse-readout");
            if (readout) {
              readout.textContent = `${Math.round(self.progress * 100)}%`;
            }
          },
        },
      });

      // 3. Flash on Scene 7
      const sceneFifth = document.querySelector("#scene-fifth");
      if (sceneFifth) {
        gsap.to(sun, {
          scrollTrigger: {
            trigger: sceneFifth,
            start: "top center",
            onEnter: () => {
              gsap.to(sun, {
                filter: "drop-shadow(0 0 60px #fff) brightness(2)",
                duration: 0.6,
                yoyo: true,
                repeat: 1,
              });
            },
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="eclipse-anchor fixed top-[8vh] right-[6vw] z-30 pointer-events-none opacity-0 invisible"
      style={{ opacity: 0, visibility: "hidden" }}
      aria-hidden="true"
    >
      <div
        ref={sunRef}
        className="sun-core relative w-[140px] h-[140px] rounded-full overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#fffdf0,#ffcc33_40%,#e87a00_80%,#7a2a00_100%)] shadow-[0_0_80px_rgba(255,180,50,0.8)] border border-yellow-300/30"
      >
        <div ref={maskRef} className="eclipse-mask absolute inset-0 rounded-full" />
        <div className="corona absolute inset-0 rounded-full pointer-events-none opacity-0 shadow-[0_0_40px_10px_rgba(255,255,255,0.8),inset_0_0_20px_rgba(255,255,255,0.9)] transition-opacity duration-300" />
      </div>
      <div className="font-mono text-[9px] tracking-[0.3em] text-neon-cyan/60 mt-2 text-right">
        OBSCURATION <span className="text-neon-cyan" id="eclipse-readout">0%</span>
      </div>
    </div>
  );
}