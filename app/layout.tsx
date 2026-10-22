import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/lib/core/providers/LenisProvider";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Luxor 2027 — Солнце над Египтом угаснет",
  description: "2 августа 2027. Полное солнечное затмение. Луксор, Египет. 6 минут 23 секунды полной фазы.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${mono.variable} grain-pending`}
    >
      <head>
        {/*
          Маркер «JS доступен»: скрытие анимируемого контента до старта GSAP
          (globals.css, [data-anim]) применяется только при .js — иначе при
          отключённом JS контент сцены остался бы невидимым.
          Инлайн-скрипт выполняется до отрисовки body.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body>
        {/* TODO: switch "grain-pending" to "grain" when public/textures/grain.png arrives */}
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
