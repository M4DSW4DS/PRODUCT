import type { Viewports } from "@puckeditor/core";

/**
 * ДВИЖОК (ENGINE) — дизайн-токены.
 * Единый источник правды для всех блоков.
 * Не менять при добавлении новых блоков.
 */

export const designTokens = {
  colors: {
    cosmicBlack: "#0a0a0f",
    egyptianGold: "#c9a96e",
    neonCyan: "#00e5ff",
    // Дополнительные производные токены
    surface: "#14141c",
    surfaceElevated: "#1c1c28",
    textPrimary: "#f5f5f7",
    textSecondary: "#a1a1aa",
    border: "#27272a",
  },
  fonts: {
    sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    display: 'ui-sans-serif, system-ui, sans-serif',
    mono: 'ui-monospace, "SF Mono", Menlo, monospace',
  },
  radii: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
} as const;

export type DesignTokens = typeof designTokens;

/**
 * Брейкпоинты редактора Puck (desktop / tablet / mobile).
 */
export const editorViewports: Viewports = [
  {
    width: 1280,
    label: "Desktop",
    icon: "Monitor",
  },
  {
    width: 768,
    label: "Tablet",
    icon: "Tablet",
  },
  {
    width: 375,
    label: "Mobile",
    icon: "Smartphone",
  },
];

/**
 * Права доступа по умолчанию для редактора.
 */
export const editorPermissions = {
  drag: true,
  duplicate: true,
  delete: true,
  edit: true,
  insert: true,
} as const;
