import type { Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { display, sans } from "@/lib/fonts";
import { getDict, isLocale, LOCALES } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallFab from "@/components/CallFab";
import Providers from "@/components/Providers";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#0F1E36", width: "device-width", initialScale: 1 };

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <Header locale={locale} t={t} />
          <main id="main">{children}</main>
          <Footer locale={locale} t={t} />
          <CallFab label={t.a11y.call} />
        </Providers>
      </body>
    </html>
  );
}
