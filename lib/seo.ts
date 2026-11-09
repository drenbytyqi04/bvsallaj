import type { Metadata } from "next";
import { HREFLANG, LOCALES, OG_LOCALE, type Locale } from "./i18n";
import { site } from "./site";

/** path without locale, e.g. "" or "leistungen/fliesen/" */
export function pageMetadata(locale: Locale, pathNoLocale: string, title: string, description: string): Metadata {
  const p = pathNoLocale ? `${pathNoLocale.replace(/^\/|\/$/g, "")}/` : "";
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HREFLANG[l]] = `${site.url}/${l}/${p}`;
  languages["x-default"] = `${site.url}/de/${p}`;
  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical: `${site.url}/${locale}/${p}`, languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: `${site.url}/${locale}/${p}`,
      locale: OG_LOCALE[locale],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export function businessJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description,
    url: `${site.url}/${locale}/`,
    telephone: ["+4917684504026", "+4917684525401"],
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    image: `${site.url}/og.png`,
    logo: `${site.url}/logo.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.zip,
      addressLocality: site.city,
      addressCountry: site.country,
    },
    areaServed: site.cities.map((c) => ({ "@type": "City", name: c })),
    knowsLanguage: ["de", "sq", "en"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.valueNum,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    sameAs: [site.reviewsUrl],
  };
}
