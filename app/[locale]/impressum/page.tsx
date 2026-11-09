import type { Metadata } from "next";
import { getDict, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import LegalShell from "@/components/LegalShell";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return { ...pageMetadata(locale, "impressum", t.meta.imprintTitle, t.meta.imprintTitle), robots: { index: false, follow: true } };
}

export default async function Impressum({ params }: Params) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <LegalShell t={t} locale={locale} title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {site.name}
        <br />
        Inhaber: {site.owners}
        <br />
        {site.street}
        <br />
        {site.zip} {site.city}
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={site.phoneHref}>{site.phone}</a> · <a href={site.phone2Href}>{site.phone2}</a>
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {site.owners}
        <br />
        {site.street}, {site.zip} {site.city}
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

      <h2>Bildnachweis</h2>
      <p>
        Projektfotos: {site.name}. Symbolbilder Leistungen „Fliesen“ und „Maler- &amp; Tapezierarbeiten“: Unsplash –
        charlesdeluvio (unsplash.com/@charlesdeluvio) und Callum Hill (unsplash.com/@inkyhills), Unsplash-Lizenz.
      </p>

      <h2>Haftung für Inhalte und Links</h2>
      <p>
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
        der Inhalte können wir jedoch keine Gewähr übernehmen. Für Inhalte externer Links sind ausschließlich deren Betreiber
        verantwortlich.
      </p>
    </LegalShell>
  );
}
