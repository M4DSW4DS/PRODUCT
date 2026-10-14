export type GalleryImage = {
  src: string;
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
          {(images ?? []).map((img, i) =>
            img.src ? (
              <figure
                key={i}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                <img
                  src={img.src}
                  alt={img.alt || `Изображение ${i + 1}`}
                  className="w-full h-full object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </figure>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
