import { Fraunces, Inter } from "next/font/google";

// Self-hosted at build time by next/font – no requests to Google from the visitor's browser (DSGVO).
export const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

export const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
