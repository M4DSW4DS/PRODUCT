"use client";

import Image from "next/image";
import { Mystery } from "./variants/Mystery";

export interface SceneArtifact {
  title: string;
  sub: string;
}

export interface ScenePlate {
  name: string;
  text: string;
  color: "gold" | "cyan" | "orange" | "white";
}

export interface SceneVoice {
  name: string;
}

export interface SceneCta {
  label: string;
  href: string;
}

export interface SceneProps {
  index?: number;
  overlay?: "none" | "dusk" | "night";
  eyebrowPrefix?: string;
  eyebrowSuffix?: string;
  /** Устаревшее поле (до разделения заголовка на строки). Поддерживается для
   *  совместимости со старым контентом: используется, если новые поля пусты. */
  headingLine1?: string;
  headingLead?: string;
  headingAccent?: string;
  lead?: string;
  headingLines?: { text: string; color: "white" | "gold" | "cyan" | "orange" }[];
  textBlocks?: { text: string }[];
  accent?: "gold" | "cyan" | "orange" | "white";
  backgroundImage?: string;
  quote?: string;
  quoteAttribution?: string;
  ctaLabel?: string;
  ctaHref?: string;
  svg_caption?: string;
  microcopy?: string;
  anchor?: string;
  artifacts?: SceneArtifact[];
  plates?: ScenePlate[];
  voices?: SceneVoice[];
  additional_ctas?: SceneCta[];
}

/**
 * Фоновые слои-оверлеи. Значение — CSS background, применяемое к слою
 * между фоновым изображением и контентом (z-order: bg < overlay < content).
 */
const OVERLAY_BACKGROUNDS: Record<string, string | undefined> = {
  none: undefined,
  dusk: "linear-gradient(180deg, rgba(255,107,53,0.15) 0%, rgba(10,10,15,0.7) 100%)",
  night: "rgba(10,10,15,0.85)",
};

export function Scene({
  index = 0,
  overlay = "none",
  eyebrowPrefix,
  eyebrowSuffix,
  headingLine1,
  headingLead,
  headingAccent,
  lead,
  headingLines,
  textBlocks,
  accent = "gold",
  backgroundImage,
  quote,
  quoteAttribution,
  ctaLabel,
  ctaHref,
}: SceneProps) {
  const anchorId = `scene-${index}`;
  const overlayBackground = OVERLAY_BACKGROUNDS[overlay];
  const hasOverlay = overlay !== "none" && Boolean(overlayBackground);

  return (
    <section
      id={anchorId}
      data-accent={accent}
      className="w-full relative flex flex-col justify-center overflow-hidden h-[100dvh] bg-cosmic-black"
    >
      {/* Фон */}
      {backgroundImage ? (
        <>
          {/* Базовая подложка: остаётся видимой, если картинка не загрузилась */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, var(--color-cosmic-black) 0%, #1a1a2e 100%)",
            }}
          />
          <Image
            src={backgroundImage}
            alt=""
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-contain object-center z-0"
            priority={false}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, var(--color-cosmic-black) 0%, #1a1a2e 100%)",
          }}
        />
      )}
      {/* Overlay — между фоном и контентом (bg < overlay < content) */}
      {hasOverlay ? (
        overlay === "night" ? (
          <div
            className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(10,10,15,0.95)_100%)]"
            aria-hidden="true"
          />
        ) : (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: overlayBackground }}
            aria-hidden="true"
          />
        )
      ) : null}

      {/* Extra dark layer at bottom for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-cosmic-black/80 to-transparent"
        aria-hidden="true"
      />

      {/* Контент */}
      <div className="relative z-10 flex w-full flex-col items-center">
        <Mystery
          index={index}
          eyebrowPrefix={eyebrowPrefix}
          eyebrowSuffix={eyebrowSuffix}
          headingLine1={headingLine1}
          headingLead={headingLead}
          headingAccent={headingAccent}
          lead={lead}
          accent={accent}
          backgroundImage={backgroundImage}
          quote={quote}
          quoteAttribution={quoteAttribution}
        />

        {ctaLabel && ctaHref ? (
          <a
            href={ctaHref}
            className="mt-8 inline-block rounded-full px-8 py-4 font-mono text-sm font-semibold uppercase tracking-widest"
            style={{
              backgroundColor:
                accent === "gold"
                  ? "var(--color-egyptian-gold)"
                  : accent === "cyan"
                    ? "var(--color-neon-cyan)"
                    : accent === "orange"
                      ? "var(--color-eclipse-orange)"
                      : "#ffffff",
              color: "#0a0a0f",
            }}
          >
            {ctaLabel}
          </a>
        ) : null}
      </div>
    </section>
  );
}
