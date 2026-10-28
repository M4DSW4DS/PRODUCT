"use client";

import { useRef, useEffect } from "react";

export type Hero2Props = {
  imageProfile: string;
  imageFace: string;
  quoteText: string;
  sphereSize: number;
  sphereTop: number;
  sphereLeft: number;
};

export function Hero2(props: Hero2Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    const tick = () => {
      const rect = section.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const progress = totalScroll > 0 ? Math.max(0, Math.min(1, -rect.top / totalScroll)) : 0;

      if (textRef.current) {
        let textOp = 0;
        if (progress < 0.3) textOp = progress / 0.3;
        else if (progress < 0.6) textOp = 1;
        else if (progress < 0.8) textOp = 1 - (progress - 0.6) / 0.2;
        textRef.current.style.opacity = String(textOp);
      }

      if (sunRef.current) {
        const sunOp = progress > 0.3 ? (progress - 0.3) / 0.7 : 0;
        sunRef.current.style.opacity = String(sunOp);
        sunRef.current.style.boxShadow = `0 0 ${80 * sunOp}px rgba(0, 229, 255, ${0.8 * sunOp})`;
      }

      if (faceRef.current) {
        let radius = 0;
        if (progress > 0.4) {
          radius = ((progress - 0.4) / 0.5) * 150;
        }
        faceRef.current.style.clipPath = `circle(${radius}% at ${props.sphereLeft}% ${props.sphereTop}%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, [props.sphereLeft, props.sphereTop]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        
        <img 
          src={props.imageProfile} 
          alt="Profile" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        <img 
          ref={faceRef}
          src={props.imageFace} 
          alt="Face" 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `circle(0% at ${props.sphereLeft}% ${props.sphereTop}%)` }}
        />

        <div
          ref={sunRef}
          className="absolute rounded-full pointer-events-none mix-blend-screen opacity-0 z-10"
          style={{
            top: `${props.sphereTop}%`,
            left: `${props.sphereLeft}%`,
            width: props.sphereSize,
            height: props.sphereSize,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, #ffffff 0%, #00e5ff 40%, transparent 80%)",
          }}
        />

        <div 
          ref={textRef}
          className="absolute bottom-[25%] left-1/2 -translate-x-1/2 z-20 opacity-0 text-center pointer-events-none w-full px-4"
        >
          <h2 className="font-display text-4xl md:text-6xl text-white tracking-widest uppercase drop-shadow-[0_0_20px_rgba(0,229,255,0.8)]">
            {props.quoteText}
          </h2>
        </div>

      </div>
    </section>
  );
}