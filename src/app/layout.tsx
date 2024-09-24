import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Providers } from "@/store/Providers"; //импортим клиентский Providers

const manropeExtra = localFont({
  src: "../fonts/Manrope-ExtraBold.ttf",
  variable: "--font-manrope-extra",
  weight: "100 900",
});
const manropeBold = localFont({
  src: "../fonts/Manrope-Bold.ttf",
  variable: "--font-manrope-bold",
  weight: "100 900",
});
const manropeReg = localFont({
  src: "../fonts/Manrope-Regular.ttf",
  variable: "--font-manrope-reg",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Блокнот",
  description: "Индивидуальные для каждой страницы SEO-заманухи, например: Удобный блокнот, позволяющий добавлять, редактировать и удалять свои заметки",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manropeExtra.variable} ${manropeBold.variable} ${manropeReg.variable}`}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
