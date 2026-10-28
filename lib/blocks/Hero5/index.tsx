"use client";

import { useRef, useEffect, useState } from "react";
import { EclipseScene } from "../EclipseScene";

export type Hero5Props = {
  imageProfile: string;
  imageFace: string;
  quoteText: string;
  sunSize: number;
  sunTop: number;
  sunLeft: number;
};

export function Hero5(props: Hero5Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const topShutterRef = useRef<HTMLDivElement>(null);
  const bottomShutterRef = useRef<HTMLDivElement>(null);
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

      // Text: fade in 0.2-0.4, hold 0.4-0.7, fade out 0.7-1.0
      if (textRef.current) {
        let textOp = 0;
        let textY = 50;
        if (p > 0.2 && p < 0.7) {
          textOp = p < 0.4 ? (p - 0.2) / 0.2 : 1;
          textY = 50 - (textOp * 50);
        } else if (p >= 0.7) {
          textOp = 1 - (p - 0.7) / 0.3;
          textY = 0;
        }
        textRef.current.style.opacity = String(Math.max(0, textOp));
        textRef.current.style.transform = `translate(-50%, ${textY}px)`;
      }

      // Shutters: Open between 0.1 and 0.6
      const shutterP = p > 0.1 ? Math.min(1, (p - 0.1) / 0.5) : 0;
      
      if (topShutterRef.current) {
        topShutterRef.current.style.transform = `translateY(-${shutterP * 100}%)`;
      }
      if (bottomShutterRef.current) {
        bottomShutterRef.current.style.transform = `translateY(${shutterP * 100}%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        
        {/* Background Image (Face) */}
        <img 
          src={props.imageFace} 
          alt="Face" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Eclipse Scene (Scales up as shutters open) */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-transform duration-75 ease-out"
          style={{ transform: `scale(${1 + progress * 0.5})` }}
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

        {/* Top Shutter (Profile image top half) */}
        <div 
          ref={topShutterRef}
          className="absolute top-0 left-0 w-full h-1/2 overflow-hidden z-20"
          style={{ clipPath: 'inset(0 0 0 0)' }}
        >
          <img 
            src={props.imageProfile} 
            alt="Profile Top" 
            className="absolute top-0 left-0 w-full h-[100dvh] object-cover"
          />
          {/* Cinematic shadow on the split line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/50 shadow-[0_0_10px_rgba(0,0,0,1)]" />
        </div>

        {/* Bottom Shutter (Profile image bottom half) */}
        <div 
          ref={bottomShutterRef}
          className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden z-20"
          style={{ clipPath: 'inset(0 0 0 0)' }}
        >
          <img 
            src={props.imageProfile} 
            alt="Profile Bottom" 
            className="absolute bottom-0 left-0 w-full h-[100dvh] object-cover"
            style={{ top: '-100%' }}
          />
          {/* Cinematic shadow on the split line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-black/50 shadow-[0_0_10px_rgba(0,0,0,1)]" />
        </div>

        {/* Text */}
        <div 
          ref={textRef}
          className="absolute top-1/2 left-1/2 z-30 opacity-0 text-center pointer-events-none w-full px-4 mix-blend-screen"
        >
          <h2 className="font-display text-4xl md:text-6xl text-white tracking-[0.2em] uppercase drop-shadow-[0_0_30px_rgba(0,229,255,1)]">
            {props.quoteText}
          </h2>
        </div>

      </div>
    </section>
  );
}