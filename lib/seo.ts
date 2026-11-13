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
    ...(site.email ? { email: site.email } : {}),
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
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    founder: site.owners.split(" und ").map((n) => ({ "@type": "Person", name: n })),
    areaServed: site.cities.map((c) => ({ "@type": "City", name: c })),
    makesOffer: [
      "Bodenbeläge verlegen",
      "Vinylboden verlegen",
      "Laminat verlegen",
      "Parkett verlegen",
      "Fliesenarbeiten",
      "Malerarbeiten",
      "Trockenbau",
      "Renovierung",
    ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
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

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}/${locale}/`,
    name: site.name,
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#business` },
  };
}
