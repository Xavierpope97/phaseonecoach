import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Phase One Coaching — Business Consulting for Startups & Founders",
  description:
    "Business consulting for aspiring entrepreneurs and early-stage companies. We help you go from idea to a business that works.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-text font-body">
        {children}
      </body>
    </html>
  );
}
