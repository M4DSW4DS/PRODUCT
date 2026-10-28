"use client";
import { type ReactNode } from "react";

export type GridItem = {
  id: string;
  image: string;
  title: ReactNode;
  description: ReactNode;
};

export type GridBlockProps = {
  columns: "2" | "3" | "4";
  items: GridItem[];
};

export function GridBlock({ columns, items }: GridBlockProps) {
  if (!items || items.length === 0) return null;

  const colMap: Record<string, string> = { "2": "grid-cols-1 md:grid-cols-2", "3": "grid-cols-1 md:grid-cols-3", "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" };

  return (
    <div className={`grid ${colMap[columns]} gap-6 py-8 w-full`}>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col rounded-2xl overflow-hidden bg-white/5 border border-white/10 group transition-all hover:border-neon-cyan/50">
          {item.image && (
            <div className="relative aspect-video overflow-hidden">
              <img src={item.image} alt="Grid item" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
            </div>
          )}
          <div className="p-6 flex flex-col gap-3">
            {item.title && <h3 className="text-xl font-bold text-white">{item.title}</h3>}
            {item.description && <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}