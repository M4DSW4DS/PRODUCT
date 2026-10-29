'use client';

import { useEffect, useRef, useState } from 'react';

export interface CinematicHeroProps {
  id?: string;
  videoSrc?: string;
  posterSrc: string;
  eyebrow?: string;
  title: string;
  accentWord?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  overlayOpacity: number;
  height: number;
  autoplay: "true" | "false";
  loop: "true" | "false";
  parallaxStrength: number;
}

export function CinematicHero({
  videoSrc,
  posterSrc,
  eyebrow,
  title,
  accentWord,
  subtitle,
  ctaLabel,
  ctaHref,
  overlayOpacity = 0.5,
  height = 720,
  autoplay = "true",
  loop = "true",
  parallaxStrength = 20,
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || parallaxStrength === 0) return;
    const media = mediaRef.current;
    const container = containerRef.current;
    if (!media || !container) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - rect.top / viewportH));
        media.style.transform = `translate3d(0, ${progress * -parallaxStrength}%, 0) scale(1.08)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced, parallaxStrength]);

  const titleParts = accentWord
    ? title.split(new RegExp(`(${accentWord})`, 'i'))
    : [title];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: `${height}px` }}
    >
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        {videoSrc ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={videoSrc}
            poster={posterSrc}
            autoPlay={autoplay === "true" && !reduced}
            muted
            loop={loop === "true"}
            playsInline
          />
        ) : (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${posterSrc})` }}
          />
        )}
      </div>

      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          {eyebrow && (
            <p
              className={`mb-4 text-sm md:text-base uppercase tracking-[0.3em] text-white/70 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={`mb-6 text-4xl md:text-6xl lg:text-7xl font-light leading-tight transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {titleParts.map((part, i) =>
              accentWord && part.toLowerCase() === accentWord.toLowerCase() ? (
                <span
                  key={i}
                  className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500"
                >
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h1>
          {subtitle && (
            <p
              className={`mb-8 text-base md:text-lg text-white/80 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {subtitle}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              className={`inline-block px-8 py-3 border border-white/40 rounded-full text-white hover:bg-white hover:text-black transition-all duration-700 delay-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}