import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
