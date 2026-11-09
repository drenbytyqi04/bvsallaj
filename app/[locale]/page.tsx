import type { Metadata } from "next";
import { getDict, type Locale } from "@/lib/i18n";
import { images, type Tone } from "@/lib/images";
import { businessJsonLd, pageMetadata } from "@/lib/seo";
import { SERVICE_SLUGS, type ServiceSlug } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Area from "@/components/Area";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMetadata(locale, "", t.meta.homeTitle, t.meta.homeDesc);
}

const CAT_TONE: Record<string, Tone> = { boden: "oak", fliesen: "tile", wand: "dry", renovierung: "linen", fassade: "dry" };

export default async function Home({ params }: Params) {
  const { locale } = await params;
  const t = getDict(locale);
  const serviceImgs = Object.fromEntries(SERVICE_SLUGS.map((s) => [s, images.service(s)])) as Record<ServiceSlug, ReturnType<typeof images.service>>;
  const projectImgs = t.work.items.map((it, i) => images.project(i + 1, CAT_TONE[it.cat]));

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={businessJsonLd(locale, t.meta.homeDesc)} />
      <JsonLd data={faqLd} />
      <Hero t={t} locale={locale} img={images.hero()} />
      <Services t={t} locale={locale} slugs={SERVICE_SLUGS} imgs={serviceImgs} />
      <WhyUs t={t} img={images.team()} />
      <Work t={t} imgs={projectImgs} before={images.before()} after={images.after()} />
      <Process t={t} />
      <Reviews t={t} />
      <Area t={t} />
      <Faq t={t} />
      <Contact t={t} locale={locale} />
    </>
  );
}
