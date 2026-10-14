export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

export type FeaturesProps = {
  title: string;
  items: FeatureItem[];
};

/**
 * БЛОК — Features. Адаптивная сетка преимуществ.
 * Использует утилиту .auto-grid из globals.css.
 */
export function FeaturesBlock({ title, items }: FeaturesProps) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-section-title font-bold text-egyptian-gold mb-10 text-center">
          {title}
        </h2>
        <div className="auto-grid">
          {(items ?? []).map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 bg-white/5 border border-egyptian-gold/20 rounded-xl p-6"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-semibold text-lg text-neon-cyan">
                {item.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
