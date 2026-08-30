import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LocalLens - Discover a place like a local",
  description: "Authentic local recommendations, Trust Score verified dishes, and AI trip planning across India.",
  icons: {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsxH96K6EZxGSCyWiKU1OhJKwcydNVtpgKXE0C94HWBQ&s=10",
    shortcut: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsxH96K6EZxGSCyWiKU1OhJKwcydNVtpgKXE0C94HWBQ&s=10",
    apple: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsxH96K6EZxGSCyWiKU1OhJKwcydNVtpgKXE0C94HWBQ&s=10",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#FAF8F5] text-[#1C1310] font-sans antialiased selection:bg-[#FF6A4D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
