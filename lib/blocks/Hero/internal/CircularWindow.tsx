"use client";

import Image from "next/image";

/** Props круглого окна (HUD-прицел). */
export type CircularWindowProps = {
  /** Ref на корневой узел — родитель анимирует масштаб. */
  ref?: React.Ref<HTMLDivElement>;
  /** Источник изображения (путь из public/). */
  imageSrc?: string;
};

/**
 * Круглое окно с HUD-прицелом: пунктирная окружность, перекрестия,
 * голубая рамка со свечением. Декоративно — без текста.
 */
export function CircularWindow({ ref, imageSrc }: CircularWindowProps) {
  return (
    <div
      ref={ref}
      className="relative aspect-square w-full max-w-[min(78vw,38rem)] rounded-full border border-[var(--color-neon-cyan)]/60 shadow-[0_0_60px_-10px_var(--color-neon-cyan)]"
      aria-hidden="true"
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 78vw, 38rem"
          className="rounded-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.18),transparent_70%)]" />
      )}

      {/* HUD-прицел: пунктирная окружность + перекрестия */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full text-[var(--color-neon-cyan)]"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.7" />
        <circle cx="50" cy="50" r="43" stroke="currentColor" strokeWidth="0.15" opacity="0.35" />
        <line x1="50" y1="0" x2="50" y2="12" stroke="currentColor" strokeWidth="0.3" opacity="0.8" />
        <line x1="50" y1="88" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" opacity="0.8" />
        <line x1="0" y1="50" x2="12" y2="50" stroke="currentColor" strokeWidth="0.3" opacity="0.8" />
        <line x1="88" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.3" opacity="0.8" />
        <rect x="38" y="38" width="24" height="24" stroke="currentColor" strokeWidth="0.25" opacity="0.45" />
      </svg>
    </div>
  );
}
