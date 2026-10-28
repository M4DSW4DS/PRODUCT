"use client";
import { type ReactNode } from "react";

export type TextBlockProps = {
  text: ReactNode;
  size: "sm" | "md" | "lg" | "xl" | "2xl";
  color: "white" | "egyptian-gold" | "neon-cyan" | "eclipse-orange" | "zinc-400";
  align: "left" | "center" | "right";
  weight: "normal" | "semibold" | "bold";
};

const sizeMap: Record<string, string> = { sm: "text-sm", md: "text-base", lg: "text-lg md:text-xl", xl: "text-2xl md:text-3xl", "2xl": "text-4xl md:text-5xl" };
const colorMap: Record<string, string> = { white: "text-white", "egyptian-gold": "text-[#c9a96e]", "neon-cyan": "text-[#00e5ff]", "eclipse-orange": "text-[#ff6b35]", "zinc-400": "text-zinc-400" };
const alignMap: Record<string, string> = { left: "text-left", center: "text-center", right: "text-right" };
const weightMap: Record<string, string> = { normal: "font-normal", semibold: "font-semibold", bold: "font-bold" };

export function TextBlock({ text, size, color, align, weight }: TextBlockProps) {
  if (!text) return null;
  return (
    <div className={`w-full py-4 ${alignMap[align]} ${sizeMap[size]} ${colorMap[color]} ${weightMap[weight]}`}>
      {text}
    </div>
  );
}