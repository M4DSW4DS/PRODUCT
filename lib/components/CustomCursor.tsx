"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveCursor = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ring.animate({ transform: `translate(${e.clientX}px, ${e.clientY}px)` }, { duration: 400, fill: "forwards", easing: "ease-out" });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[10000] mix-blend-difference">
      <div ref={dotRef} className="absolute w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div ref={ringRef} className="absolute w-8 h-8 border border-white/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}