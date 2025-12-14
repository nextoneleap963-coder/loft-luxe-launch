"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// export const metadata: Metadata = {
//   title: "Bespoke Loft — Premium Tailoring in Bengaluru",
//   description: "Custom suits, tuxedos, sherwanis, and wedding wear. Crafted-to-measure elegance with world-class Italian fabrics in the heart of Bengaluru.",
//   authors: [{ name: "Bespoke Loft" }],
//   openGraph: {
//     title: "Bespoke Loft — Premium Tailoring in Bengaluru",
//     description: "Custom suits, tuxedos, sherwanis, and wedding wear. Crafted-to-measure elegance.",
//     type: "website",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
