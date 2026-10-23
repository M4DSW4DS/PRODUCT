export type PartnerWidgetProps = {
  title: string;
  subtitle: string;
  /** URL iframe-виджета TimePad (display: "iframe"). Пусто — заглушка до вставки кода. */
  src: string;
  /** Высота iframe в пикселях (число без единиц). */
  height: string;
  /** Резервная ссылка на событие TimePad (если iframe не загрузился). */
  fallbackUrl: string;
  fallbackText: string;
};

/**
 * БЛОК — PartnerWidget. Контейнер iframe-виджета TimePad.
 *
 * Мы — витрина, не оператор ПД: форма регистрации, оплата и обработка
 * данных участников живут внутри виджета TimePad (сторонний сервис).
 * Сайт не собирает и не хранит персональные данные.
 * Код виджета вставляется позже — пока рендерится заглушка.
 */
export function PartnerWidgetBlock({
  title,
  subtitle,
  src,
  height,
  fallbackUrl,
  fallbackText,
}: PartnerWidgetProps) {
  const safeSrc = (src ?? "").trim();
  const heightValue = /^\d+$/.test((height ?? "").trim())
    ? `${height.trim()}px`
    : (height ?? "").trim() || "620px";
  const safeFallback = (fallbackUrl ?? "").trim() || "https://timepad.ru/";

  return (
    <section id="register" className="relative w-full py-24 px-6 md:py-32 bg-cosmic-black flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="font-display text-3xl md:text-5xl text-white mb-12 text-center">Регистрация на событие</h2>
        <p className="text-zinc-400 mt-3 text-center mb-8">{subtitle}</p>

        <div className="w-full max-w-4xl mx-auto border border-neon-cyan/30 bg-cosmic-black/50 p-2 shadow-[0_0_40px_rgba(0,229,255,0.1)]">
          {safeSrc ? (
            <iframe
              src={safeSrc}
              title={title}
              loading="lazy"
              className="w-full border-0 block"
              style={{ height: heightValue }}
            />
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-3 text-center px-6 py-12"
              style={{ minHeight: heightValue }}
            >
              <p className="text-zinc-300 font-medium">Виджет TimePad ещё не подключён</p>
              <p className="text-zinc-500 text-sm max-w-md">
                Вставь ссылку iframe-виджета в поле «URL виджета» в редакторе —
                форма регистрации появится здесь.
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-zinc-500">
          Регистрация и обработка персональных данных — на стороне TimePad.{" "}
          <a
            href={safeFallback}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-egyptian-gold hover:text-neon-cyan transition-colors"
          >
            {fallbackText}
          </a>
        </p>
      </div>
    </section>
  );
}