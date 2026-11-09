import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  title: "BV-Sallaj Boden & Innenausbau – Eschweiler",
  description:
    "BV-Sallaj Boden & Innenausbau in Eschweiler: Bodenbeläge verlegen, Fliesen, Malerarbeiten, Trockenbau und Komplettrenovierung. 5,0 ★ auf Google.",
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = { themeColor: "#1c1917" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "BV-Sallaj Boden & Innenausbau",
  telephone: "+4917684504026",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nickelstraße 20",
    postalCode: "52249",
    addressLocality: "Eschweiler",
    addressCountry: "DE",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "6" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
