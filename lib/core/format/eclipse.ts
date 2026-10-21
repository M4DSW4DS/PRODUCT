/**
 * Pure formatters for eclipse data. No React dependencies, no side effects.
 */

/**
 * Format ISO date string to Russian locale (DD.MM.YYYY).
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Format ISO time string in given IANA timezone (HH:mm).
 */
export function formatTime(iso: string, tz: string): string {
  return new Date(iso).toLocaleTimeString("ru-RU", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Format duration in seconds.
 * mode "hud" → "06:23"
 * mode "human" → "6 мин 23 сек"
 */
export function formatDuration(sec: number, mode: "hud" | "human" = "hud"): string {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  if (mode === "human") {
    return `${minutes} мин ${seconds} сек`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Format geographic coordinates to decimal degrees with hemisphere (4 decimals).
 */
export function formatCoords(lat: number, lng: number): string {
  const latHem = lat >= 0 ? "N" : "S";
  const lngHem = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latHem}, ${Math.abs(lng).toFixed(4)}° ${lngHem}`;
}
