"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { ease, SectionHead } from "./motion";
import type { Key } from "@/lib/i18n";

export default function Process() {
  const { t } = useLang();
  return (
    <section className="section section--dark" id="process">
      <div className="container">
        <SectionHead eyebrow={t("process.eyebrow")} title={t("process.title")} />

        <div className="steps-wrap">
          <motion.div
            className="steps__line"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease }}
          />
          <ol className="steps">
            {[1, 2, 3, 4].map((n, i) => (
              <motion.li
                key={n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease, delay: i * 0.18 }}
                whileHover={{ y: -6, borderColor: "rgba(194,135,59,.6)" }}
              >
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.2 + i * 0.18 }}
                >
                  0{n}
                </motion.span>
                <h3>{t(`process.s${n}.t` as Key)}</h3>
                <p>{t(`process.s${n}.d` as Key)}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
