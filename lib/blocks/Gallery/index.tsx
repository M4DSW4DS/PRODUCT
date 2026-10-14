import { pollinationsImageUrl } from "../../core/pollinations";

export type GalleryImage = {
  /** Источник картинки: "url" — своя ссылка, "ai" — генерация Pollinations по промпту */
  mode: "url" | "ai";
  /** URL картинки в режиме "url" */
  src: string;
  /** Текстовый промпт в режиме "ai" */
  prompt: string;
  /** seed для воспроизводимой генерации (одинаковый seed → одна и та же картинка) */
  seed: number;
  alt: string;
};

export type GalleryProps = {
  title: string;
  columns: "2" | "3";
  images: GalleryImage[];
};

/**
 * БЛОК — Gallery. Адаптивная сетка изображений.
 * src может быть ссылкой или результатом Pollinations (Этап 4).
 */
export function GalleryBlock({ title, columns, images }: GalleryProps) {
  const gridCols = columns === "2" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-section-title font-bold text-egyptian-gold mb-10 text-center">
          {title}
        </h2>
        <div className={`grid gap-4 ${gridCols}`}>
          {(images ?? []).map((img, i) => {
            const src =
              img.mode === "ai"
                ? pollinationsImageUrl(img.prompt, {
                    width: 768,
                    height: 576,
                    seed: img.seed,
                  })
                : img.src;
            return src ? (
              <figure
                key={i}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                <img
                  src={src}
                  alt={img.alt || `Изображение ${i + 1}`}
                  className="w-full h-full object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </figure>
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
}
