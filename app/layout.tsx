import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/lib/core/providers/LenisProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-cormorant",
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
  title: "Дизайн-лаборатория",
  description: "Сайт-конструктор промо-кампаний",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${inter.variable} ${mono.variable} grain-pending`}
    >
      <body>
        {/* TODO: switch "grain-pending" to "grain" when public/textures/grain.png arrives */}
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
