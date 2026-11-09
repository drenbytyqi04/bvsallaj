# BV-Sallaj Boden & Innenausbau – Website

Dreisprachige Website (DE / EN / SQ) mit **Next.js 16** (App Router, TypeScript, statischer Export) und **Framer Motion**.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000  → leitet auf /de/ weiter
npm run build    # statischer Export nach ./out
```

## Struktur

| Pfad | Inhalt |
| --- | --- |
| `lib/site.ts` | Firmendaten (Telefon, Adresse, Öffnungszeiten, WhatsApp, Domain, Orte) |
| `lib/i18n/de.ts`, `en.ts`, `sq.ts` | **Alle Texte** – Deutsch ist die Vorlage, EN/SQ müssen dieselbe Struktur haben |
| `lib/images.ts` | Liste der Fotos und ihrer Formate |
| `app/[locale]/…` | Seiten: Startseite, `leistungen/[slug]`, `impressum`, `datenschutz` |
| `components/` | Sektionen (Hero, Services, WhyUs, Work, Process, Reviews, Area, Faq, Contact …) |
| `app/globals.css` | Design-System (Farben als CSS-Variablen ganz oben) |

## Fotos einfügen

Solange ein Foto fehlt, zeigt die Seite einen Platzhalter mit dem erwarteten Dateinamen.
Einfach die Datei unter genau diesem Namen ablegen und neu bauen – fertig. Am besten als JPG, ca. 200–400 KB.

| Datei (in `public/images/`) | Format | Wo |
| --- | --- | --- |
| `hero.jpg` | 1200×1500 (4:5) | Startseite oben |
| `team.jpg` | 1125×1406 (4:5) | „Warum wir“ |
| `leistungen/<slug>.jpg` | 1200×1500 (4:5) | Leistungen: `bodenbelaege`, `fliesen`, `malerarbeiten`, `trockenbau`, `renovierung` |
| `projekte/projekt-1.jpg` … `projekt-9.jpg` | 900×1200 (3:4) | Referenzen (Titel/Ort in `lib/i18n/*.ts` → `work.items`) |
| `vorher-nachher/vorher.jpg`, `nachher.jpg` | 1800×1200 (3:2) | Vorher/Nachher-Regler – erscheint erst, wenn **beide** Dateien vorhanden sind |

Andere Formate gehen auch – das Bild wird passend zugeschnitten.

## Veröffentlichen

Domain: **https://www.bv-sallajbodeninnenausbau.de** (Hauptadresse, in `lib/site.ts` hinterlegt – Canonical, Sitemap, hreflang, Open Graph). `bv-sallajbodeninnenausbau.de` leitet per 308 auf www weiter.

**Vercel** (aktuell): Repository importieren, Framework „Next.js“, Output wird automatisch erkannt.
Unter *Settings → Domains* sind `www.bv-sallajbodeninnenausbau.de` (Production) und
`bv-sallajbodeninnenausbau.de` (308 → www) eingerichtet und die angezeigten DNS-Einträge beim Domain-Anbieter (GoDaddy) setzen:

| Typ | Name | Wert |
| --- | --- | --- |
| A | `@` | `76.76.21.21` (oder der von Vercel angezeigte Wert) |
| CNAME | `www` | `cname.vercel-dns.com` (oder der von Vercel angezeigte Wert) |

**Kontaktformular:** läuft über [Web3Forms](https://web3forms.com) (funktioniert auf jedem Hosting). Die Anfragen gehen an die
E-Mail-Adresse, mit der der Access Key (`web3formsKey` in `lib/site.ts`) erstellt wurde. Fotos schicken Kunden per WhatsApp
(Datei-Anhänge sind im kostenlosen Web3Forms-Tarif nicht enthalten).

**Netlify** (alternativ): `netlify.toml` setzt Build-Befehl und `out`-Ordner.

Danach `https://www.bv-sallajbodeninnenausbau.de/sitemap.xml` in der Google Search Console einreichen und die Website im Google-Unternehmensprofil eintragen.

## Rechtliches

Impressum und Datenschutzerklärung sind ausgefüllt (Inhaber: Besart Sallaj und Valmir Sallaj).
Falls vorhanden, noch ergänzen: USt-IdNr., Handwerkskammer/Handwerksrolle, Rechtsform (z. B. GbR).
Offen in `lib/i18n/*.ts` → `work.items`: Projektorte `[Ort]`.
