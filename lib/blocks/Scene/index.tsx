"use client";

import Image from "next/image";
import { Mystery } from "./variants/Mystery";
import { Truth } from "./variants/Truth";
import { Key } from "./variants/Key";
import { Elements } from "./variants/Elements";
import { Keepers } from "./variants/Keepers";
import { Darkness } from "./variants/Darkness";
import { Fifth } from "./variants/Fifth";

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
  variant?: "mystery" | "truth" | "key" | "elements" | "keepers" | "darkness" | "fifth";
  overlay?: "none" | "dusk" | "night";
  eyebrowPrefix?: string;
  eyebrowSuffix?: string;
  /** Устаревшее поле (до разделения заголовка на строки). Поддерживается для
   *  совместимости со старым контентом: используется, если новые поля пусты. */
  heading?: string;
  headingLine1?: string;
  headingLead?: string;
  headingAccent?: string;
  lead?: string;
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

const VARIANT_COMPONENTS: Record<string, React.ComponentType<SceneProps>> = {
  mystery: Mystery,
  truth: Truth,
  key: Key,
  elements: Elements,
  keepers: Keepers,
  darkness: Darkness,
  fifth: Fifth,
};

/**
 * Варианты с собственной вёрсткой: контент (eyebrow/заголовок/лид/цитата)
 * рендерит сам компонент варианта, а не оболочка. Остальные варианты
 * пока используют общий каркас и будут переведены на свою вёрстку в D.2–D.7.
 */
const CUSTOM_VARIANTS = new Set<string>(["mystery"]);

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
  variant = "mystery",
  overlay = "none",
  eyebrowPrefix,
  eyebrowSuffix,
  heading,
  headingLine1,
  headingLead,
  headingAccent,
  lead,
  accent = "gold",
  backgroundImage,
  quote,
  quoteAttribution,
  ctaLabel,
  ctaHref,
  svg_caption,
  microcopy,
  anchor,
  artifacts,
  plates,
  voices,
  additional_ctas,
}: SceneProps) {
  const prefix = eyebrowPrefix || `SCENE ${String(index + 1).padStart(2, "0")}`;
  const eyebrow = `${prefix} // ${eyebrowSuffix ?? ""}`.trim();
  const VariantComponent = VARIANT_COMPONENTS[variant] ?? Mystery;

  // Заголовок собирается из трёх частей: строка 1 + строка 2 (обычная + цветная).
  // Устаревшее поле `heading` используется как fallback для строки 1, если новые
  // поля пусты (контент, созданный до разделения заголовка на строки).
  const legacyHeading = (heading ?? "").trim();
  const resolvedLine1 = (headingLine1 ?? "").trim() || legacyHeading;
  const resolvedLead = (headingLead ?? "").trim();
  const resolvedAccent = (headingAccent ?? "").trim();
  const line2 = [resolvedLead, resolvedAccent].filter(Boolean).join(" ");
  const headingPlain = [resolvedLine1, line2].filter(Boolean).join(" / ");

  const anchorId = anchor || `scene-${variant}`;
  const overlayBackground = OVERLAY_BACKGROUNDS[overlay];
  const hasOverlay = overlay !== "none" && Boolean(overlayBackground);
  // Вариант с собственной вёрсткой рендерит контент сам — общий каркас не нужен.
  const isCustomVariant = CUSTOM_VARIANTS.has(variant);

  return (
    <section
      id={anchorId}
      data-accent={accent}
      className="relative min-h-screen w-full"
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
            fill
            sizes="100vw"
            className="object-cover"
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
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: overlayBackground }}
          aria-hidden="true"
        />
      ) : null}

      {/* Контент */}
      {isCustomVariant ? (
        <div className="relative z-10 flex w-full flex-col items-center">
          <VariantComponent
            index={index}
            variant={variant}
            overlay={overlay}
            eyebrowPrefix={eyebrowPrefix}
            eyebrowSuffix={eyebrowSuffix}
            headingLine1={resolvedLine1}
            headingLead={resolvedLead}
            headingAccent={resolvedAccent}
            lead={lead}
            accent={accent}
            backgroundImage={backgroundImage}
            quote={quote}
            quoteAttribution={quoteAttribution}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            svg_caption={svg_caption}
            microcopy={microcopy}
            anchor={anchor}
            artifacts={artifacts}
            plates={plates}
            voices={voices}
            additional_ctas={additional_ctas}
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
      ) : (
        <div className="grid grid-cols-12 gap-6 px-6 md:px-16 py-24 relative z-10">
          {eyebrow && (
            <div className="col-span-12 font-mono text-xs tracking-widest uppercase">
              {eyebrow}
            </div>
          )}
          {headingPlain && (
            <h1 className="col-span-12 text-4xl md:text-6xl font-display font-bold text-white">
              {headingPlain}
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
            headingLine1={headingLine1}
            headingLead={headingLead}
            headingAccent={headingAccent}
            lead={lead}
            accent={accent}
            backgroundImage={backgroundImage}
            quote={quote}
            quoteAttribution={quoteAttribution}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            svg_caption={svg_caption}
            microcopy={microcopy}
            anchor={anchor}
            artifacts={artifacts}
            plates={plates}
            voices={voices}
            additional_ctas={additional_ctas}
          />
        </div>
      )}
    </section>
  );
}
