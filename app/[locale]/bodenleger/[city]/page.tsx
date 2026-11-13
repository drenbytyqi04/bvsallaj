import type { Metadata } from "next";
import { getDict, LOCALES, type Locale } from "@/lib/i18n";
import { images } from "@/lib/images";
import { businessJsonLd, pageMetadata } from "@/lib/seo";
import { CITIES, site, SERVICE_SLUGS, type CitySlug } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import CityPage from "@/components/CityPage";
import Contact from "@/components/Contact";

type Params = { params: Promise<{ locale: Locale; city: CitySlug }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => CITIES.map((c) => ({ locale, city: c.slug })));
}

const cityName = (slug: CitySlug) => CITIES.find((c) => c.slug === slug)!.name;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, city } = await params;
  const t = getDict(locale);
  const name = cityName(city);
  return pageMetadata(
    locale,
    `bodenleger/${city}`,
    t.cityPage.metaTitle.replaceAll("{city}", name),
    t.cityPage.metaDesc.replaceAll("{city}", name),
  );
}

export default async function CityRoute({ params }: Params) {
  const { locale, city } = await params;
  const t = getDict(locale);
  const name = cityName(city);
  const url = `${site.url}/${locale}/bodenleger/${city}/`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.cityPage.title.replaceAll("{city}", name),
    description: t.cityPage.metaDesc.replaceAll("{city}", name),
    serviceType: t.cityPage.title.replaceAll("{city}", name),
    url,
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "City", name, containedInPlace: { "@type": "State", name: "Nordrhein-Westfalen" } },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.nav.services,
      itemListElement: SERVICE_SLUGS.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: t.services.items[s].title, url: `${site.url}/${locale}/leistungen/${s}/` },
      })),
    },
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.shortName, item: `${site.url}/${locale}/` },
      { "@type": "ListItem", position: 2, name: t.cityPage.kicker, item: `${site.url}/${locale}/#einsatzgebiet` },
      { "@type": "ListItem", position: 3, name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={businessJsonLd(locale, t.meta.homeDesc)} />
      <JsonLd data={serviceLd} />
      <JsonLd data={crumbs} />
      <CityPage
        t={t}
        locale={locale}
        city={city}
        img={images.hero()}
        services={SERVICE_SLUGS.map((s) => ({ slug: s, title: t.services.items[s].title, short: t.services.items[s].short, img: images.service(s) }))}
      />
      <Contact t={t} locale={locale} />
    </>
  );
}
