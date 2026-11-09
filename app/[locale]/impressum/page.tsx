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
        Inhaber: [Vor- und Nachname des Inhabers / der Inhaber]
        <br />
        {site.street}
        <br />
        {site.zip} {site.city}
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={site.phoneHref}>{site.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [USt-IdNr.]</p>

      <h2>Berufsrechtliche Angaben</h2>
      <p>
        Zuständige Handwerkskammer: [z. B. Handwerkskammer Aachen, Sandkaulbach 21, 52062 Aachen]
        <br />
        Eintragung in der Handwerksrolle: [ja/nein, Nr.]
        <br />
        Berufsbezeichnung: [z. B. Bodenleger] – verliehen in der Bundesrepublik Deutschland
        <br />
        Berufsrechtliche Regelungen: Handwerksordnung (HwO), einsehbar unter www.gesetze-im-internet.de
      </p>

      <h2>Berufshaftpflichtversicherung</h2>
      <p>[Name und Sitz des Versicherers, Geltungsraum – nur falls vorhanden, sonst Abschnitt entfernen]</p>

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
