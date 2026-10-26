'use client';

import { useState } from "react";

const MEDIA_IMAGES = [
  "/scenes/scene-01..png",
  "/scenes/scene-02..png",
  "/scenes/scene-03..jpg",
  "/scenes/scene-04.jpg",
  "/scenes/scene-05..jpg",
  "/scenes/scene-06.jpg",
  "/scenes/scene-07.jpg",
  "/scenes/1.jpg.jpg",
  "/scenes/2.jpg.jpg",
  "/scenes/3.jpg.jpg",
  "/scenes/5.jpg.jpg",
  "/hero/egypt-orbit.jpg",
  "/hero/zorg-cabinet.png",
];

export type MediaPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function MediaPicker({ value, onChange }: MediaPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-3 py-2 rounded-md border border-white/20 bg-white/5 text-sm text-white hover:border-egyptian-gold/60"
      >
        Выбрать изображение
      </button>
      {value ? (
        <div className="text-xs text-zinc-400 break-all">{value}</div>
      ) : null}
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[80vh] w-full max-w-4xl overflow-auto rounded-xl border border-white/10 bg-cosmic-black p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">
                Медиатека
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-zinc-400 hover:text-white"
              >
                Закрыть
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {MEDIA_IMAGES.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    onChange?.(src);
                    setOpen(false);
                  }}
                  className="overflow-hidden rounded-lg border border-white/10 bg-white/5 hover:border-egyptian-gold/60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={src}
                    className="h-24 w-full object-cover"
                  />
                  <div className="truncate px-2 py-1 text-[10px] text-zinc-400">
                    {src}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}