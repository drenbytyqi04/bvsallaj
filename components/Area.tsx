"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Pin } from "./Icons";
import { fadeUp, SectionHead, stagger } from "./motion";

export default function Area({ t }: { t: Dict }) {
  return (
    <section className="section section--linen section--tight" id="einsatzgebiet">
      <div className="container area">
        <SectionHead index={t.area.index} kicker={t.area.kicker} title={t.area.title} lead={t.area.lead} />
        <div className="area__places">
          <motion.ul className="cities" variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {site.cities.map((c) => (
              <motion.li key={c} variants={fadeUp} className={c === site.city ? "is-home" : ""}>
                <Pin />
                {c}
              </motion.li>
            ))}
          </motion.ul>
          <p className="area__more">{t.area.more}</p>
        </div>
      </div>
    </section>
  );
}
