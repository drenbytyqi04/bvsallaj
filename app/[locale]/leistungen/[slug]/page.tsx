import type { Metadata } from "next";
import { getDict, LOCALES, type Locale } from "@/lib/i18n";
import { images } from "@/lib/images";
import { businessJsonLd, pageMetadata } from "@/lib/seo";
import { site, SERVICE_SLUGS, type ServiceSlug } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import ServiceDetail from "@/components/ServiceDetail";
import Contact from "@/components/Contact";

type Params = { params: Promise<{ locale: Locale; slug: ServiceSlug }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => SERVICE_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getDict(locale).services.items[slug];
  return pageMetadata(locale, `leistungen/${slug}`, s.metaTitle, s.metaDesc);
}

export default async function ServicePage({ params }: Params) {
  const { locale, slug } = await params;
  const t = getDict(locale);
  const s = t.services.items[slug];
  const others = SERVICE_SLUGS.filter((x) => x !== slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.metaDesc,
    serviceType: s.title,
    provider: businessJsonLd(locale, t.meta.homeDesc),
    areaServed: site.cities.map((c) => ({ "@type": "City", name: c })),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.shortName, item: `${site.url}/${locale}/` },
      { "@type": "ListItem", position: 2, name: t.nav.services, item: `${site.url}/${locale}/#leistungen` },
      { "@type": "ListItem", position: 3, name: s.title, item: `${site.url}/${locale}/leistungen/${slug}/` },
    ],
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={crumbs} />
      <ServiceDetail
        t={t}
        locale={locale}
        slug={slug}
        index={SERVICE_SLUGS.indexOf(slug) + 1}
        img={images.service(slug)}
        others={others.map((o) => ({ slug: o, title: t.services.items[o].title, short: t.services.items[o].short, img: images.service(o) }))}
      />
      <Contact t={t} locale={locale} preselect={s.title} />
    </>
  );
}
