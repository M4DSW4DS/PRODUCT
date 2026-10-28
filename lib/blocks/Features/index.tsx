"use client";

import { useRef, useEffect, useState } from "react";

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  modalText?: string;
};

export type FeaturesProps = {
  title: string;
  items: FeatureItem[];
  speed: number;
};

function MagneticCard({ item, onClick }: { item: FeatureItem; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    cardRef.current.style.transform = `translate(${distanceX * 0.15}px, ${distanceY * 0.15}px)`;
    cardRef.current.style.transition = "none";
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `translate(0px, 0px)`;
    cardRef.current.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="w-[300px] md:w-[350px] flex-shrink-0 cursor-pointer select-none"
    >
      <div className="group flex h-full flex-col items-center p-8 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-neon-cyan/60 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(0,229,255,0.25)] active:scale-95 active:shadow-[0_0_20px_rgba(0,229,255,0.4)]">
        <div className="text-5xl mb-6 text-neon-cyan transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">
          {item.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 text-center">{item.title}</h3>
        <p className="text-center text-sm text-zinc-400 leading-relaxed line-clamp-3">{item.description}</p>
        <span className="mt-4 text-xs text-egyptian-gold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          Подробнее →
        </span>
      </div>
    </div>
  );
}

export function Features({ title, items, speed = 1.5 }: FeaturesProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeatureItem | null>(null);
  const offsetRef = useRef(0);
  
  const touchStart = useRef(0);
  const isDragging = useRef(false);

  const displayItems = items.length > 0 ? [...items, ...items, ...items] : [];

  useEffect(() => {
    if (items.length === 0) return;

    let rafId: number;
    const tick = () => {
      const track = trackRef.current;
      if (!track) return;

      if (!isHovered && !isDragging.current) {
        offsetRef.current -= speed;
        
        const singleSetWidth = track.scrollWidth / 3;
        
        if (singleSetWidth > 0 && Math.abs(offsetRef.current) >= singleSetWidth) {
          offsetRef.current += singleSetWidth;
        }
      }

      track.style.transform = `translateX(${offsetRef.current}px)`;
      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, [isHovered, items, speed]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - touchStart.current;
    touchStart.current = e.touches[0].clientX;
    offsetRef.current += delta;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#0a0a0f]">
      
      <div className="text-center mb-16 px-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white uppercase tracking-widest">
          {title}
        </h2>
        <div className="w-24 h-1 bg-neon-cyan mx-auto mt-6 shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
      </div>

      <div 
        className="w-full overflow-hidden touch-pan-y"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={trackRef}
          className="flex gap-8 w-max will-change-transform px-4"
        >
          {displayItems.map((item, index) => (
            <MagneticCard key={index} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />

      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative w-full max-w-lg p-8 bg-[#0a0a0f] border border-neon-cyan/40 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.2)] transform scale-100 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </button>
            <div className="text-6xl mb-6 text-center text-neon-cyan drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">
              {selectedItem.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">{selectedItem.title}</h3>
            <p className="text-zinc-300 leading-relaxed text-center">
              {selectedItem.modalText || selectedItem.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}