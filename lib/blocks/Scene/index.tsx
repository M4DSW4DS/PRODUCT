"use client";

import Image from "next/image";
import { Mystery } from "./variants/Mystery";
import { Truth } from "./variants/Truth";
import { Key } from "./variants/Key";
import { Elements } from "./variants/Elements";
import { Keepers } from "./variants/Keepers";
import { Darkness } from "./variants/Darkness";
import { Fifth } from "./variants/Fifth";

export interface SceneProps {
  index?: number;
  variant?: "mystery" | "truth" | "key" | "elements" | "keepers" | "darkness" | "fifth";
  overlay?: "none" | "dusk" | "night";
  eyebrowPrefix?: string;
  eyebrowSuffix?: string;
  heading?: string;
  lead?: string;
  accent?: "gold" | "cyan" | "orange" | "white";
  backgroundImage?: string;
  quote?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const VARIANT_COMPONENTS: Record<string, React.ComponentType<SceneProps>> = {
  mystery: Mystery,
  truth: Truth,
  key: Key,
  elements: Elements,
  keepers: Keepers,
  darkness: Darkness,
  fifth: Fifth,
};

const OVERLAY_STYLES: Record<string, React.CSSProperties> = {
  none: { opacity: 0 },
  dusk: { opacity: 0.35 },
  night: { opacity: 0.6 },
};

export function Scene({
  index = 0,
  variant = "mystery",
  overlay = "none",
  eyebrowPrefix,
  eyebrowSuffix,
  heading,
  lead,
  accent = "gold",
  backgroundImage,
  quote,
  ctaLabel,
  ctaHref,
}: SceneProps) {
  const prefix = eyebrowPrefix || `SCENE ${String(index + 1).padStart(2, "0")}`;
  const eyebrow = `${prefix} // ${eyebrowSuffix ?? ""}`.trim();
  const VariantComponent = VARIANT_COMPONENTS[variant] ?? Mystery;

  return (
    <section
      id={`scene-${variant}`}
      data-accent={accent}
      className="relative min-h-screen w-full"
    >
      {/* Фон */}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, var(--color-cosmic-black) 0%, #1a1a2e 100%)",
          }}
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--color-cosmic-black)",
          ...OVERLAY_STYLES[overlay],
        }}
        aria-hidden="true"
      />

      {/* Контент */}
      <div className="grid grid-cols-12 gap-6 px-6 md:px-16 py-24 relative z-10">
        {eyebrow && (
          <div className="col-span-12 font-mono text-xs tracking-widest uppercase">
            {eyebrow}
          </div>
        )}
        {heading && (
          <h1 className="col-span-12 text-4xl md:text-6xl font-display font-bold text-white">
            {heading}
          </h1>
        )}
        {lead && (
          <p className="col-span-12 text-base md:text-lg text-gray-300 leading-relaxed">
            {lead}
          </p>
        )}
        {quote && (
          <blockquote className="col-span-12 border-l-4 pl-4 italic text-gray-400">
            {quote}
          </blockquote>
        )}
        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className="mt-8 inline-block px-8 py-4 rounded-full font-mono text-sm uppercase tracking-widest font-semibold"
            style={{
              backgroundColor: accent === "gold" ? "var(--color-egyptian-gold)" : accent === "cyan" ? "var(--color-neon-cyan)" : accent === "orange" ? "var(--color-eclipse-orange)" : "#ffffff",
              color: accent === "white" ? "#0a0a0f" : "#0a0a0f",
            }}
          >
            {ctaLabel}
          </a>
        )}

        {/* Вариант сцены (раскрывается в следующих тасках) */}
        <VariantComponent
          index={index}
          variant={variant}
          overlay={overlay}
          eyebrowPrefix={eyebrowPrefix}
          eyebrowSuffix={eyebrowSuffix}
          heading={heading}
          lead={lead}
          accent={accent}
          backgroundImage={backgroundImage}
          quote={quote}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      </div>
    </section>
  );
}
