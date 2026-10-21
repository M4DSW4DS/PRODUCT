/**
 * Eclipse 2027 — Luxor, Egypt.
 * Constants shared across engine and content layer. Pure data, no side effects.
 */
export const ECLIPSE = {
  targetDateISO: "2027-08-02T10:05:07Z",
  totalityDurationSec: 383, // 6 min 23 sec
  location: {
    lat: 25.699,
    lng: 32.642,
    label: "LUXOR",
  },
  timezone: "Africa/Cairo",
  timezoneLabel: "UTC+3 (EEST)",
} as const;
