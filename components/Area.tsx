"use client";

import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import { CITIES, site } from "@/lib/site";
import { Pin } from "./Icons";
import { fadeUp, SectionHead, stagger } from "./motion";

export default function Area({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <section className="section section--linen section--tight" id="einsatzgebiet">
      <div className="container area">
        <SectionHead index={t.area.index} kicker={t.area.kicker} title={t.area.title} lead={t.area.lead} />
        <div className="area__places">
          <motion.ul className="cities" variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {CITIES.map((c) => (
              <motion.li key={c.slug} variants={fadeUp} className={c.name === site.city ? "is-home" : ""}>
                <a href={`/${locale}/bodenleger/${c.slug}/`} title={t.cityPage.linkLabel.replaceAll("{city}", c.name)}>
                  <Pin />
                  {c.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <p className="area__more">{t.area.more}</p>
        </div>
      </div>
    </section>
  );
}
