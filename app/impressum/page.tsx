import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum – BV-Sallaj Boden & Innenausbau",
  robots: { index: false },
};

export default function Impressum() {
  return (
    <>
      <header className="header is-scrolled">
        <div className="container header__inner">
          <Link href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={40} height={40} />
            <span className="logo__text">
              <span>
                BV-<strong>Sallaj</strong>
              </span>
              <small>Boden &amp; Innenausbau</small>
            </span>
          </Link>
          <Link href="/" className="btn btn--outline">
            ← Zurück
          </Link>
        </div>
      </header>

      <main className="container legal">
        <h1>Impressum</h1>

        {/* TODO: Bitte die Angaben in [eckigen Klammern] durch die echten Daten ersetzen. */}
        <p className="note">
          <strong>Hinweis:</strong> Die Angaben in [eckigen Klammern] müssen vom Inhaber ergänzt werden, bevor die
          Seite online geht.
        </p>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          BV-Sallaj Boden &amp; Innenausbau
          <br />
          Inhaber: [Vor- und Nachname]
          <br />
          Nickelstraße 20
          <br />
          52249 Eschweiler
          <br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href="tel:+4917684504026">+49 176 84504026</a>
          <br />
          E-Mail: [E-Mail-Adresse]
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]</p>

        <h2>Handwerkskammer</h2>
        <p>
          Zuständige Kammer: [z. B. Handwerkskammer Aachen]
          <br />
          Eintragung in die Handwerksrolle: [Nr.]
        </p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </main>

      <footer className="footer">
        <div className="container footer__bottom">
          <p>© BV-Sallaj Boden &amp; Innenausbau</p>
        </div>
      </footer>
    </>
  );
}
