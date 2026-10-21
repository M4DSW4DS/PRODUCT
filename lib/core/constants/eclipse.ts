/**
 * Eclipse 2027 — Luxor, Egypt.
 * Constants shared across engine and content layer. Pure data, no side effects.
 */
export const ECLIPSE = {
  targetDateISO: "2027-08-02T08:40:00Z",
  totalityDurationSec: 383, // 6 min 23 sec
  location: {
    lat: 25.6972,
    lng: 32.6396,
    label: "Луксор, Египет",
  },
  timezone: "Africa/Cairo",
  timezoneLabel: "UTC+3 (Луксор)",
} as const;
