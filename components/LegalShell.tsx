import type { ReactNode } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { Arrow } from "./Icons";

export default function LegalShell({ t, locale, title, children }: { t: Dict; locale: Locale; title: string; children: ReactNode }) {
  return (
    <section className="legal">
      <div className="container legal__inner">
        <a href={`/${locale}/`} className="link link--back">
          <Arrow /> {t.legal.back}
        </a>
        <h1 className="legal__title" lang="de">
          {title}
        </h1>
        {t.legal.germanOnly && <p className="legal__lang">{t.legal.germanOnly}</p>}
        <div className="legal__body" lang="de">
          {children}
        </div>
      </div>
    </section>
  );
}
