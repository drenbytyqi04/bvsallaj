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
| `hero.jpg` | 1200×1500 (4:5) | Startseite oben |
| `team.jpg` | 1125×1406 (4:5) | „Warum wir“ |
| `leistungen/<slug>.jpg` | 1200×1500 (4:5) | Leistungen: `bodenbelaege`, `fliesen`, `malerarbeiten`, `trockenbau`, `renovierung` |
| `projekte/projekt-1.jpg` … `projekt-9.jpg` | 900×1200 (3:4) | Referenzen (Titel/Ort in `lib/i18n/*.ts` → `work.items`) |
| `vorher-nachher/vorher.jpg`, `nachher.jpg` | 1800×1200 (3:2) | Vorher/Nachher-Regler – erscheint erst, wenn **beide** Dateien vorhanden sind |

Andere Formate gehen auch – das Bild wird passend zugeschnitten.

## Veröffentlichen

Domain: **https://bv-sallajbodeninnenausbau.de** (in `lib/site.ts` hinterlegt – Canonical, Sitemap, hreflang, Open Graph).

**Vercel** (aktuell): Repository importieren, Framework „Next.js“, Output wird automatisch erkannt.
Unter *Settings → Domains* `bv-sallajbodeninnenausbau.de` und `www.bv-sallajbodeninnenausbau.de` hinzufügen
(www → Weiterleitung auf die Hauptdomain) und die angezeigten DNS-Einträge beim Domain-Anbieter (GoDaddy) setzen:

| Typ | Name | Wert |
| --- | --- | --- |
| A | `@` | `76.76.21.21` (oder der von Vercel angezeigte Wert) |
| CNAME | `www` | `cname.vercel-dns.com` (oder der von Vercel angezeigte Wert) |

**Netlify** (alternativ): `netlify.toml` setzt Build-Befehl und `out`-Ordner; Formular „kontakt“ unter *Forms* aktivieren.

Danach `https://bv-sallajbodeninnenausbau.de/sitemap.xml` in der Google Search Console einreichen und die Website im Google-Unternehmensprofil eintragen.

## Vor dem Livegang ergänzen

Alle Stellen in `[eckigen Klammern]` – siehe Impressum, Datenschutz und `work.items` (Projektorte).
Die Datenschutzerklärung ist eine Vorlage und sollte rechtlich geprüft werden.
