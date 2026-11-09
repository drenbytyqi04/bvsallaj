# BV-Sallaj Boden & Innenausbau – Website

Dreisprachige Website (DE / EN / SQ) mit **Next.js** (App Router, TypeScript) und **Framer Motion**.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statischer Export nach ./out
```

## Struktur

- `app/` – Seiten (`page.tsx`, `impressum/page.tsx`), Layout und `globals.css`
- `components/` – Sektionen (Hero, Services, About, Process, Reviews, Contact, …) und Animations-Helfer (`motion.tsx`)
- `lib/i18n.ts` – alle Texte in Deutsch, Englisch und Albanisch
- `public/` – Logo und `__forms.html` (Formular-Definition für Netlify Forms)

## Hinweise

- Der Build ist ein statischer Export (`out/`) – läuft auf Netlify, Vercel, GitHub Pages usw.
- Das Kontaktformular funktioniert über **Netlify Forms** (nur nach Deployment auf Netlify).
- Im Impressum (`app/impressum/page.tsx`) müssen die Angaben in [Klammern] ergänzt werden.
