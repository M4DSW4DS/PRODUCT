"use client";

import { useEffect, useMemo, useState } from "react";

/** Пояс вкладки: подпись + IANA-идентификатор. */
export type CountdownTimezone = {
  label: string;
  tz: string;
};

export type CountdownTimerProps = {
  /** Целевая точка в UTC (ISO 8601), например "2027-08-02T08:40:00Z". */
  target_utc: string;
  /** Горизонтальные табы поясов (время события в каждом поясе). */
  timezones: CountdownTimezone[];
  /** Подсказка, если пояс пользователя = целевой (UTC+3, зона Луксора). */
  hint_text: string;
  /** Акцентный цвет: разделители «:», подсказка, активный таб, финал. */
  accent_color: string;
  /** Текст после наступления события. */
  post_countdown_text: string;
};

/** Дефолтный набор поясов — fallback, если пропс пуст (старые данные). */
export const DEFAULT_COUNTDOWN_TIMEZONES: CountdownTimezone[] = [
  { label: "Москва", tz: "Europe/Moscow" },
  { label: "Луксор", tz: "Africa/Cairo" },
  { label: "Лондон", tz: "Europe/London" },
  { label: "Нью-Йорк", tz: "America/New_York" },
  { label: "Дубай", tz: "Asia/Dubai" },
];

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };

/** Локальные стили движка (flip цифр + пульсация разделителей). */
const STYLES = `
@keyframes cdt-flip { from { transform: translateY(-4px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.cdt-digit { display: inline-block; animation: cdt-flip 0.15s ease-out; }
@keyframes cdt-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
.cdt-sep { animation: cdt-pulse 1s ease-in-out infinite; }
`;

/** Смещение пояса от UTC в минутах на указанную дату (с учётом DST). */
function tzOffsetMinutes(tz: string, at: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts: Record<string, string> = {};
  for (const p of dtf.formatToParts(at)) parts[p.type] = p.value;
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second)
  );
  return Math.round((asUtc - at.getTime()) / 60000);
}

/** Локальное время события (чч:мм) в заданном поясе. */
function eventTimeInTz(targetMs: number, tz: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(targetMs));
}

function calcRemaining(targetMs: number, nowMs: number) {
  const diff = targetMs - nowMs;
  if (Number.isNaN(targetMs) || diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

/** Одна цифра: смена значения меняет key → элемент пересоздаётся → flip. */
function Digit({ char }: { char: string }) {
  return <span className="cdt-digit">{char}</span>;
}

/** Группа цифр одной единицы (дни/часы/минуты/секунды) с подписью. */
function Unit({
  value,
  width,
  label,
}: {
  value: number;
  width: number;
  label: string;
}) {
  const chars = String(value).padStart(width, "0").split("");
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex text-4xl md:text-5xl font-mono font-bold text-egyptian-gold">
        {chars.map((c, i) => (
          <Digit key={`${i}-${c}`} char={c} />
        ))}
      </div>
      <span className="text-[11px] text-zinc-500 uppercase tracking-[0.25em]">
        {label}
      </span>
    </div>
  );
}

/** Разделитель «:» — акцентный цвет + пульсация раз в секунду. */
function Sep({ accent }: { accent: string }) {
  return (
    <span
      className="cdt-sep self-center pt-1 text-3xl md:text-4xl font-mono font-bold"
      style={{ color: accent }}
      aria-hidden="true"
    >
      :
    </span>
  );
}

/**
 * COMPONENT — CountdownTimer. Переиспользуемый клиентский таймер.
 * Определяет пояс пользователя через Intl, показывает горизонтальные
 * табы поясов (переключение без перезагрузки), моноширинные цифры
 * с flip-анимацией, пульсирующие разделители и текст после события.
 */
export function CountdownTimer({
  target_utc,
  timezones,
  hint_text,
  accent_color,
  post_countdown_text,
}: CountdownTimerProps) {
  const zones =
    timezones && timezones.length > 0 ? timezones : timezones === undefined ? DEFAULT_COUNTDOWN_TIMEZONES : [];
  const accent = accent_color || "#00e5ff";
  const targetMs = useMemo(() => new Date(target_utc).getTime(), [target_utc]);

  // null до монтирования — SSR-HTML и первый клиентский рендер совпадают.
  const [nowMs, setNowMs] = useState<number | null>(null);
  const [userTz, setUserTz] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Тик раз в секунду.
  useEffect(() => {
    setNowMs(Date.now());
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Пояс пользователя + авто-выбор таба, если он есть в списке.
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTz(tz);
      const idx = zones.findIndex((z) => z.tz === tz);
      if (idx >= 0) setActiveIdx(idx);
    } catch {
      /* Intl недоступен — остаёмся на дефолтном табе */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Хинт показываем, если пояс пользователя — UTC+3 (зона Луксора).
  const isUtc3 = useMemo(
    () => (userTz ? tzOffsetMinutes(userTz, new Date()) === 180 : false),
    [userTz]
  );

  const remaining = nowMs === null ? ZERO : calcRemaining(targetMs, nowMs);
  const finished = nowMs !== null && remaining === null;
  const view = remaining ?? ZERO;

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 text-center">
      <style>{STYLES}</style>

      {/* Горизонтальные табы поясов — переключение без перезагрузки */}
      <div
        className="flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Часовые пояса"
      >
        {zones.map((z, i) => (
          <button
            key={z.tz}
            type="button"
            role="tab"
            aria-selected={i === activeIdx}
            onClick={() => setActiveIdx(i)}
            className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
              i === activeIdx
                ? "bg-white/10"
                : "border-white/10 text-zinc-400 hover:text-zinc-200"
            }`}
            style={
              i === activeIdx
                ? { borderColor: accent, color: accent }
                : undefined
            }
          >
            {z.label} · {eventTimeInTz(targetMs, z.tz)}
          </button>
        ))}
      </div>

      {/* Подсказка для пояса UTC+3 */}
      {isUtc3 && hint_text ? (
        <p className="text-sm font-medium" style={{ color: accent }}>
          {hint_text}
        </p>
      ) : null}

      {finished ? (
        <p
          className="text-xl md:text-2xl font-semibold"
          style={{ color: accent }}
        >
          {post_countdown_text}
        </p>
      ) : (
        <div className="flex items-start justify-center gap-1 sm:gap-2 md:gap-3">
          <Unit value={view.days} width={3} label="дн" />
          <Sep accent={accent} />
          <Unit value={view.hours} width={2} label="чч" />
          <Sep accent={accent} />
          <Unit value={view.minutes} width={2} label="мм" />
          <Sep accent={accent} />
          <Unit value={view.seconds} width={2} label="сс" />
        </div>
      )}
    </section>
  );
}

