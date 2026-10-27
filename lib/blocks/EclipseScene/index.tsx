"use client";
import { useEffect, useRef, useState } from "react";

type EclipsePhase = {
  moonX: string;
  moonY: string;
  moonScale: number;
  corona: number;
  coronaScale: number;
  coronaRotate: number;
  darkness: number;
  sunBg: string;
  sunShadow: string;
};

const BASE_SUN_BG =
  "radial-gradient(circle at 35% 35%, #ffffff 0%, #ffdd66 18%, #ff8800 48%, #7a2000 82%, transparent 100%)";
const BASE_SUN_SHADOW =
  "0 0 90px rgba(255,120,20,0.7), 0 0 200px rgba(255,80,0,0.3), inset -12px -12px 40px rgba(0,0,0,0.7)";
const FINAL_SUN_BG =
  "radial-gradient(circle, #ffffff 0%, #b3e5ff 25%, #0066ff 60%, transparent 100%)";
const FINAL_SUN_SHADOW =
  "0 0 120px #fff, 0 0 250px #0077ff, inset 0 0 60px rgba(0,100,255,0.5)";

const PHASES: EclipsePhase[] = [
  { moonX: "120%", moonY: "-100%", moonScale: 0.40, corona: 0, coronaScale: 1, coronaRotate: 0, darkness: 0.00, sunBg: BASE_SUN_BG, sunShadow: BASE_SUN_SHADOW },
  { moonX: "80%", moonY: "-65%", moonScale: 0.55, corona: 0, coronaScale: 1, coronaRotate: 30, darkness: 0.12, sunBg: BASE_SUN_BG, sunShadow: BASE_SUN_SHADOW },
  { moonX: "55%", moonY: "-45%", moonScale: 0.70, corona: 0, coronaScale: 1, coronaRotate: 60, darkness: 0.26, sunBg: BASE_SUN_BG, sunShadow: BASE_SUN_SHADOW },
  { moonX: "35%", moonY: "-25%", moonScale: 0.85, corona: 0, coronaScale: 1, coronaRotate: 90, darkness: 0.40, sunBg: BASE_SUN_BG, sunShadow: BASE_SUN_SHADOW },
  { moonX: "20%", moonY: "-15%", moonScale: 0.95, corona: 0, coronaScale: 1, coronaRotate: 120, darkness: 0.52, sunBg: BASE_SUN_BG, sunShadow: BASE_SUN_SHADOW },
  { moonX: "10%", moonY: "-7%", moonScale: 1.00, corona: 0, coronaScale: 1, coronaRotate: 150, darkness: 0.62, sunBg: BASE_SUN_BG, sunShadow: BASE_SUN_SHADOW },
  { moonX: "0%", moonY: "0%", moonScale: 1.05, corona: 1, coronaScale: 1.05, coronaRotate: 180, darkness: 0.72, sunBg: FINAL_SUN_BG, sunShadow: FINAL_SUN_SHADOW },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export type EclipseSceneProps = {
  size: number;
  top: number;
  left: number;
  progress: number;
  autoPlay: boolean;
  playDuration: number;
  showCorona: boolean;
  darkenScene: boolean;
};

export function EclipseScene({
  size,
  top,
  left,
  progress,
  autoPlay,
  playDuration,
  showCorona,
  darkenScene,
}: EclipseSceneProps) {
  const [live, setLive] = useState(progress);

  useEffect(() => {
    setLive(progress);
  }, [progress]);

  useEffect(() => {
    if (!autoPlay) return;
    let raf = 0;
    const start = performance.now();
    const durationMs = Math.max(500, playDuration * 1000);
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / durationMs) * 100);
      setLive(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoPlay, playDuration]);

  const safe = Math.max(0, Math.min(100, live));
  const raw = (safe / 100) * 6;
  const i0 = Math.min(5, Math.floor(raw));
  const i1 = Math.min(6, i0 + 1);
  const t = raw - i0;
  const a = PHASES[i0];
  const b = PHASES[i1];

  const moonX = t < 0.5 ? a.moonX : b.moonX;
  const moonY = t < 0.5 ? a.moonY : b.moonY;
  const moonScale = lerp(a.moonScale, b.moonScale, t);
  const corona = lerp(a.corona, b.corona, t);
  const coronaScale = lerp(a.coronaScale, b.coronaScale, t);
  const coronaRotate = lerp(a.coronaRotate, b.coronaRotate, t);
  const darkness = lerp(a.darkness, b.darkness, t);
  const sunBg = t < 0.5 ? a.sunBg : b.sunBg;
  const sunShadow = t < 0.5 ? a.sunShadow : b.sunShadow;

  return (
    <>
      {darkenScene && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            opacity: darkness,
            pointerEvents: "none",
            zIndex: 1,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            width: size,
            height: size,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-18%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,140,20,0.4) 0%, rgba(255,60,0,0.08) 55%, transparent 75%)",
              animation: "eclipse-orbit 25s linear infinite",
            }}
          />
          {showCorona && (
            <div
              style={{
                position: "absolute",
                inset: "-55%",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, rgba(255,255,255,0.85) 0deg, transparent 8deg, rgba(0,245,255,0.60) 14deg, transparent 22deg, rgba(255,255,255,0.75) 28deg, transparent 36deg, rgba(0,245,255,0.50) 42deg, transparent 52deg, rgba(255,255,255,0.80) 58deg, transparent 68deg, rgba(0,245,255,0.55) 74deg, transparent 84deg, rgba(255,255,255,0.70) 90deg, transparent 100deg, rgba(0,245,255,0.50) 106deg, transparent 118deg, rgba(255,255,255,0.80) 124deg, transparent 136deg, rgba(0,245,255,0.55) 142deg, transparent 154deg, rgba(255,255,255,0.75) 160deg, transparent 172deg, rgba(0,245,255,0.55) 178deg, transparent 190deg, rgba(255,255,255,0.85) 196deg, transparent 208deg, rgba(0,245,255,0.60) 214deg, transparent 226deg, rgba(255,255,255,0.70) 232deg, transparent 244deg, rgba(0,245,255,0.50) 250deg, transparent 262deg, rgba(255,255,255,0.80) 268deg, transparent 280deg, rgba(0,245,255,0.55) 286deg, transparent 298deg, rgba(255,255,255,0.75) 304deg, transparent 316deg, rgba(0,245,255,0.55) 322deg, transparent 334deg, rgba(255,255,255,0.85) 340deg, transparent 352deg, rgba(0,245,255,0.45) 358deg, transparent 360deg), radial-gradient(circle, #fff 15%, rgba(0,245,255,0.5) 42%, transparent 78%)",
                opacity: corona,
                transform: `scale(${coronaScale}) rotate(${coronaRotate}deg)`,
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 26%, #000 42%, #000 68%, transparent 84%)",
                maskImage:
                  "radial-gradient(circle, transparent 26%, #000 42%, #000 68%, transparent 84%)",
                mixBlendMode: "screen",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              zIndex: 2,
              background: sunBg,
              boxShadow: sunShadow,
              transition: "background 0.5s ease, box-shadow 0.5s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "0.25%",
              borderRadius: "50%",
              zIndex: 4,
              background:
                "radial-gradient(circle at 30% 30%, #1a1a20 0%, #050508 65%, #000 100%)",
              boxShadow:
                "inset -18px -18px 45px rgba(255,255,255,0.025), 0 0 45px #000",
              transform: `translate(${moonX}, ${moonY}) scale(${moonScale})`,
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes eclipse-orbit {
          0%   { transform: scale(1) rotate(0deg); }
          50%  { transform: scale(1.04); }
          100% { transform: scale(1) rotate(360deg); }
        }
      `}</style>
    </>
  );
}
