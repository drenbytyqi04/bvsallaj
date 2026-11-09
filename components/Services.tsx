"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { fadeUp, SectionHead, stagger } from "./motion";
import type { Key } from "@/lib/i18n";

const SERVICES: { n: number; visual: string }[] = [
  { n: 1, visual: "v-floor" },
  { n: 2, visual: "v-tile" },
  { n: 3, visual: "v-paint" },
  { n: 4, visual: "v-dry" },
  { n: 5, visual: "v-reno" },
  { n: 6, visual: "v-detail" },
];

export default function Services() {
  const { t } = useLang();
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead eyebrow={t("services.eyebrow")} title={t("services.title")}>
          <p>{t("services.lead")}</p>
        </SectionHead>

        <motion.div
          className="grid grid--3"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SERVICES.map(({ n, visual }) => (
            <motion.article
              key={n}
              className="card"
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: "0 24px 40px -18px rgba(28,25,23,.35)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div className="card__visual-wrap">
                <motion.div
                  className={`card__visual ${visual}`}
                  aria-hidden="true"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <h3>{t(`services.s${n}.t` as Key)}</h3>
              <p>{t(`services.s${n}.d` as Key)}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
