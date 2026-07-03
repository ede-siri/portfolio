import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import CursorIllumination from "@/components/CursorIllumination";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Edesiri Ohwomado | Software Engineer & Builder",
  description:
    "Personal site of Edesiri Ohwomado. Software engineer, builder, writer, and music lover exploring thoughtful software, ideas, and creative work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${hanken.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body className="relative bg-background text-on-surface font-body text-base leading-relaxed antialiased">
        <CursorIllumination />
        <div className="relative z-[1]">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
