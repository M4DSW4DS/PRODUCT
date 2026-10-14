"use client";

import { pollinationsImageUrl } from "../../core/pollinations";

export type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  align: "left" | "center";
  /** Фон hero: "none" — без картинки, "url" — своя ссылка, "ai" — Pollinations по промпту */
  imageMode: "none" | "url" | "ai";
  imageUrl: string;
  imagePrompt: string;
  imageSeed: number;
};

/**
 * БЛОК — Hero. Первый экран промо-страницы.
 * Надзаголовок + заголовок + подзаголовок + CTA-кнопка.
 */
export function HeroBlock({
  eyebrow,
  title,
  subtitle,
  ctaText,
  ctaHref,
  align,
  imageMode,
  imageUrl,
  imagePrompt,
  imageSeed,
}: HeroProps) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  const bgSrc =
    imageMode === "ai"
      ? pollinationsImageUrl(imagePrompt, { width: 768, height: 432, seed: imageSeed })
      : imageMode === "url"
        ? imageUrl
        : "";

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-32">
      {bgSrc ? (
        <>
          <img
            src={bgSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-cosmic-black/80" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-b from-cosmic-black/30 via-transparent to-cosmic-black"
            aria-hidden="true"
          />
        </>
      ) : null}
      <div className={`relative z-10 flex flex-col gap-6 ${alignCls}`}>
        <span className="text-neon-cyan uppercase tracking-[0.2em] text-sm font-semibold">
          {eyebrow}
        </span>
        <h1 className="text-hero font-bold text-egyptian-gold max-w-4xl">
          {title}
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
        {ctaText ? (
          <a
            href={ctaHref || "#"}
            className="mt-2 inline-flex w-fit bg-egyptian-gold text-cosmic-black font-semibold px-6 py-3 rounded-lg transition-colors hover:bg-neon-cyan"
          >
            {ctaText}
          </a>
        ) : null}
      </div>
    </section>
  );
}
