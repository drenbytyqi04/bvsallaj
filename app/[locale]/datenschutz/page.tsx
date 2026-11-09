import type { Metadata } from "next";
import { getDict, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import LegalShell from "@/components/LegalShell";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return { ...pageMetadata(locale, "datenschutz", t.meta.privacyTitle, t.meta.privacyTitle), robots: { index: false, follow: true } };
}

/*
 * Vorlage – vor Veröffentlichung bitte rechtlich prüfen lassen
 * (z. B. Datenschutz-Generator, Anwalt oder Handwerkskammer).
 */
export default async function Datenschutz({ params }: Params) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <LegalShell t={t} locale={locale} title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        {site.name}
        <br />
        Inhaber: [Vor- und Nachname]
        <br />
        {site.street}, {site.zip} {site.city}
        <br />
        Telefon: {site.phone}
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>2. Allgemeines</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website und unserer Leistungen
        erforderlich ist. Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a (Einwilligung), lit. b (Vertrag bzw.
        vorvertragliche Maßnahmen) und lit. f DSGVO (berechtigtes Interesse).
      </p>

      <h2>3. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird bei [Hosting-Anbieter, z. B. Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA]
        gehostet. Beim Aufruf der Website werden technisch notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit, aufgerufene
        Seite, Browsertyp) in Server-Logfiles verarbeitet, um die Website sicher und stabil bereitzustellen (Art. 6 Abs. 1 lit.
        f DSGVO). Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung; eine Übermittlung in die USA erfolgt auf
        Grundlage des EU-US Data Privacy Framework bzw. von Standardvertragsklauseln. [Bitte an den tatsächlichen Anbieter anpassen.]
      </p>

      <h2>4. Kontaktformular und Anfragen</h2>
      <p>
        Wenn Sie uns über das Kontaktformular, per Telefon oder E-Mail kontaktieren, verarbeiten wir Ihre Angaben (Name,
        Telefonnummer, ggf. E-Mail-Adresse und Nachricht), um Ihre Anfrage zu bearbeiten und Ihnen ein
        Angebot zu erstellen (Art. 6 Abs. 1 lit. b DSGVO). Die Formulardaten werden über den Dienst Web3Forms
        (https://web3forms.com) per E-Mail an uns weitergeleitet; dabei kann eine Verarbeitung außerhalb der EU erfolgen.
        [Bitte Angaben zum Anbieter und zur Datenübermittlung anhand der Web3Forms-Datenschutzerklärung prüfen.] Wir löschen die Daten, sobald sie für die Bearbeitung nicht mehr
        erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>5. Google Maps</h2>
      <p>
        Auf dieser Website können Sie eine Karte von Google Maps (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
        Irland) anzeigen lassen. Die Karte wird erst geladen, nachdem Sie auf „Karte anzeigen“ klicken. Erst dann werden Daten
        (u. a. Ihre IP-Adresse) an Google übertragen, ggf. auch in die USA. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs.
        1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Ihre Entscheidung speichern wir lokal in Ihrem Browser; Sie können sie jederzeit
        widerrufen, indem Sie die Website-Daten in Ihrem Browser löschen. Weitere Informationen:
        https://policies.google.com/privacy
      </p>

      <h2>6. Schriftarten</h2>
      <p>
        Die auf dieser Website verwendeten Schriftarten werden lokal von unserem Server ausgeliefert. Es findet keine
        Verbindung zu Servern von Google oder anderen Schriftanbietern statt.
      </p>

      <h2>7. Cookies und lokaler Speicher</h2>
      <p>
        Wir setzen keine Tracking- oder Marketing-Cookies ein. Im lokalen Speicher Ihres Browsers speichern wir lediglich Ihre
        Sprachauswahl und – falls erteilt – Ihre Einwilligung zur Anzeige der Karte. Diese Daten verlassen Ihr Gerät nicht.
      </p>

      <h2>8. Links zu Google-Bewertungen</h2>
      <p>
        Die Links zu unseren Google-Bewertungen führen zu externen Seiten von Google. Erst beim Anklicken werden Daten an Google
        übertragen.
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
        Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Eine erteilte Einwilligung
        können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem haben Sie das Recht, sich bei einer
        Datenschutz-Aufsichtsbehörde zu beschweren, z. B. bei der Landesbeauftragten für Datenschutz und
        Informationsfreiheit Nordrhein-Westfalen.
      </p>

      <p>
        <em>Stand: [Monat Jahr]</em>
      </p>
    </LegalShell>
  );
}
