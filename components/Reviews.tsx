"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { REVIEWS_URL } from "./Icons";
import { ease, Reveal, SectionHead } from "./motion";
import type { Key } from "@/lib/i18n";

const REVIEWS: { k: Key; name: string }[] = [
  { k: "reviews.q1", name: "Lea Wertz" },
  { k: "reviews.q2", name: "Edison Xani" },
  { k: "reviews.q3", name: "Ardian Nuredini" },
];

export default function Reviews() {
  const { t } = useLang();
  return (
    <section className="section" id="reviews">
      <div className="container">
        <SectionHead eyebrow={t("reviews.eyebrow")} title={t("reviews.title")}>
          <p className="score">
            <span className="stars" aria-hidden="true">★★★★★</span> <strong>5,0</strong> {t("reviews.basis")}
          </p>
        </SectionHead>

        <div className="grid grid--3">
          {REVIEWS.map(({ k, name }, i) => (
            <motion.blockquote
              key={k}
              className="quote"
              initial={{ opacity: 0, y: 40, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
            >
              <div className="stars" aria-label="5/5">
                {[0, 1, 2, 3, 4].map((s) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.4 + i * 0.15 + s * 0.08 }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              <p>{t(k)}</p>
              <footer>
                {name} <span>· Google</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <Reveal className="center" delay={0.2}>
          <motion.a
            className="btn btn--outline"
            href={REVIEWS_URL}
            target="_blank"
            rel="noopener"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            {t("reviews.all")}
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
