import type { ReactNode } from "react";
import { Fraunces, JetBrains_Mono, Inter } from "next/font/google";
import "./quiz.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function QuizLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${jetbrains.variable} ${inter.variable}`}
    >
      {children}
    </div>
  );
}
