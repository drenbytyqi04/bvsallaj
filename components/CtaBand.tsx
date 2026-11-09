"use client";

import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Arrow, Phone } from "./Icons";
import { ease } from "./motion";

export default function CtaBand({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <section className="cta-band">
      <motion.div
        className="container cta-band__inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease }}
      >
        <div>
          <h2>{t.servicePage.ctaTitle}</h2>
          <p>{t.servicePage.ctaText}</p>
        </div>
        <div className="cta-band__actions">
          <a href={site.phoneHref} className="btn btn--accent btn--lg">
            <Phone />
            {site.phone}
          </a>
          <a href={`/${locale}/#kontakt`} className="btn btn--line-light btn--lg">
            {t.nav.cta} <Arrow className="btn__arrow" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
