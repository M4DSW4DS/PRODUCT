import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Unbounded, Space_Grotesk, Orbitron } from "next/font/google";
const unbounded = Unbounded({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-unbounded" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-orbitron" });
import { LenisProvider } from "@/lib/core/providers/LenisProvider";
import { CustomCursor } from "@/lib/components/CustomCursor";

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
      className={`${unbounded.variable} ${grotesk.variable} ${orbitron.variable} grain-pending`}
    >
      <head>
      </head>
      <body>
        <Script id="js-marker" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js');`}
        </Script>
        {/* TODO: switch "grain-pending" to "grain" when public/textures/grain.png arrives */}
        <LenisProvider>
          <div className="grain-overlay" />
          {children}
        </LenisProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
