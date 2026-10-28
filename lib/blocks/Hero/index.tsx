"use client";

import { useRef, useEffect, useState } from "react";
import { EclipseScene } from "../EclipseScene";

export type HeroProps = {
  imageProfile: string;
  imageFace: string;
  quoteText: string;
  sunSize: number;
  sunTop: number;
  sunLeft: number;
};

export function Hero(props: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    const tick = () => {
      const rect = section.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const p = totalScroll > 0 ? Math.max(0, Math.min(1, -rect.top / totalScroll)) : 0;
      
      setProgress(p);

      // 1. Text: rises up (0-0.3), holds (0.3-0.6), flies into depth and fades (0.6-0.9)
      if (textRef.current) {
        let textOp = 0;
        let textY = 100; // Start below
        let textScale = 1;
        
        if (p < 0.3) {
          textOp = p / 0.3;
          textY = 100 - (textOp * 100);
        } else if (p < 0.6) {
          textOp = 1;
          textY = 0;
        } else if (p < 0.9) {
          const depthP = (p - 0.6) / 0.3;
          textOp = 1 - depthP;
          textY = depthP * -150; // Fly up
          textScale = 1 + (depthP * 1.5); // Fly towards camera
        } else {
          textOp = 0;
        }
        
        textRef.current.style.opacity = String(Math.max(0, textOp));
        textRef.current.style.transform = `translate(-50%, calc(-50% + ${textY}px)) scale(${textScale})`;
      }

      // 2. Image 1 (Profile): slides up and fades out (0.2 - 0.6)
      if (img1Ref.current) {
        const op = p > 0.2 ? 1 - (p - 0.2) / 0.4 : 1;
        const y = p > 0.2 ? -(p - 0.2) * 20 : 0; // Slide up by 20%
        img1Ref.current.style.opacity = String(Math.max(0, op));
        img1Ref.current.style.transform = `translateY(${y}%) scale(1.05)`;
      }

      // 3. Image 2 (Face): slides up from bottom and fades in (0.3 - 0.7)
      if (img2Ref.current) {
        const op = p > 0.3 ? (p - 0.3) / 0.4 : 0;
        const y = p > 0.3 ? 20 - ((p - 0.3) / 0.4) * 20 : 20; // Slide from 20% to 0%
        img2Ref.current.style.opacity = String(Math.min(1, op));
        img2Ref.current.style.transform = `translateY(${y}%) scale(1.05)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        
        {/* Image 2 (Face) - Base layer */}
        <img 
          ref={img2Ref}
          src={props.imageFace} 
          alt="Face" 
          className="absolute inset-0 w-full h-full object-cover opacity-0 origin-bottom"
        />

        {/* Image 1 (Profile) - Top layer, slides up */}
        <img 
          ref={img1Ref}
          src={props.imageProfile} 
          alt="Profile" 
          className="absolute inset-0 w-full h-full object-cover origin-top"
        />

        {/* Eclipse Scene - Parallax layer */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${progress * -15}%) scale(${1 + progress * 0.2})` }}
        >
          <EclipseScene
            size={props.sunSize}
            height={props.sunSize}
            top={props.sunTop}
            left={props.sunLeft}
            progress={progress * 100}
            autoPlay={false}
            playDuration={1}
            showCorona={true}
            darkenScene={false}
          />
        </div>

        {/* Text */}
        <div 
          ref={textRef}
          className="absolute top-1/2 left-1/2 z-20 opacity-0 text-center pointer-events-none w-full px-4 mix-blend-screen"
        >
          <h2 className="font-display text-5xl md:text-7xl text-white tracking-[0.15em] uppercase drop-shadow-[0_0_30px_rgba(0,229,255,0.8)]">
            {props.quoteText}
          </h2>
        </div>

      </div>
    </section>
  );
}