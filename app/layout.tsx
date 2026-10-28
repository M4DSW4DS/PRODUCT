import type { Metadata } from "next";
import "./globals.css";
import { Unbounded, Space_Grotesk, Orbitron } from "next/font/google";

const unbounded = Unbounded({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-unbounded" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-orbitron" });

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
    <html lang="ru" className={`${unbounded.variable} ${grotesk.variable} ${orbitron.variable}`}>
      <head />
      <body>{children}</body>
    </html>
  );
}