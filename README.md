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
| `public/__forms.html` | Formular-Definition für Netlify Forms – nicht löschen |

## Fotos einfügen

Solange ein Foto fehlt, zeigt die Seite einen Platzhalter mit dem erwarteten Dateinamen.
Einfach die Datei unter genau diesem Namen ablegen und neu bauen – fertig. Am besten als JPG, ca. 200–400 KB.

| Datei (in `public/images/`) | Format | Wo |
| --- | --- | --- |
| `hero.jpg` | 1600×2000 (4:5) | Startseite oben |
| `team.jpg` | 1200×1500 (4:5) | „Warum wir“ – Foto von Ihnen |
| `leistungen/bodenbelaege.jpg` | 1800×1200 (3:2) | Leistung Bodenbeläge |
| `leistungen/fliesen.jpg` | 1800×1200 | Leistung Fliesen |
| `leistungen/malerarbeiten.jpg` | 1800×1200 | Leistung Maler |
| `leistungen/trockenbau.jpg` | 1800×1200 | Leistung Trockenbau |
| `leistungen/renovierung.jpg` | 1800×1200 | Leistung Renovierung |
| `projekte/projekt-1.jpg` … `projekt-6.jpg` | 1200×900 (4:3) | Referenzen (Titel/Ort in `lib/i18n/*.ts` → `work.items`) |
| `vorher-nachher/vorher.jpg`, `nachher.jpg` | 1800×1200 | Vorher/Nachher-Regler (gleicher Blickwinkel!) |

## Veröffentlichen (Netlify)

1. Repository in Netlify importieren – `netlify.toml` setzt Build-Befehl und `out`-Ordner automatisch.
2. Unter *Site configuration → Environment variables* `NEXT_PUBLIC_SITE_URL` auf die echte Domain setzen (z. B. `https://www.bv-sallaj.de`) – wichtig für SEO (Canonical, Sitemap, hreflang).
3. Unter *Forms* die Benachrichtigung per E-Mail für das Formular „kontakt“ einschalten.
4. Domain verbinden, dann `https://<domain>/sitemap.xml` in der Google Search Console einreichen und das Google-Unternehmensprofil auf die Website verlinken.

## Vor dem Livegang ergänzen

Alle Stellen in `[eckigen Klammern]` – siehe Impressum, Datenschutz und `work.items` (Projektorte).
Die Datenschutzerklärung ist eine Vorlage und sollte rechtlich geprüft werden.
