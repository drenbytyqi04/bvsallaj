"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "./LanguageProvider";
import { PhoneIcon, PHONE_HREF } from "./Icons";
import { ease, fadeUp, stagger } from "./motion";
import type { Key } from "@/lib/i18n";

const HIGHLIGHTS: [Key, Key][] = [
  ["hl.1.t", "hl.1.d"],
  ["hl.2.t", "hl.2.d"],
  ["hl.3.t", "hl.3.d"],
  ["hl.4.t", "hl.4.d"],
];

export default function Hero() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Split the headline into words for a staggered entrance.
  const words = t("hero.title").split(" ");

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__bg" aria-hidden="true" style={{ y: bgY, scale: bgScale }} />
      <motion.div className="hero__glow" aria-hidden="true"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="container hero__content"
        style={{ y: contentY, opacity: contentOpacity }}
        variants={stagger(0.12, 0.3)}
        initial="hidden"
        animate="show"
      >
        <motion.a className="rating-pill" href="#reviews" variants={fadeUp} whileHover={{ scale: 1.04 }}>
          <span className="stars" aria-hidden="true">★★★★★</span>
          <span>
            <strong>5,0</strong> · {t("hero.rating")}
          </span>
        </motion.a>

        <h1 key={lang} aria-label={t("hero.title")}>
          {words.map((w, i) => (
            <span key={i}>
              <span className="word" aria-hidden="true">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.4 + i * 0.07 }}
                >
                  {w}
                </motion.span>
              </span>{" "}
            </span>
          ))}
        </h1>

        <motion.p className="hero__lead" variants={fadeUp}>
          {t("hero.lead")}
        </motion.p>

        <motion.div className="hero__cta" variants={fadeUp}>
          <motion.a href={PHONE_HREF} className="btn btn--primary" whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
            <PhoneIcon />
            <span>{t("hero.cta1")}</span>
          </motion.a>
          <motion.a href="#contact" className="btn btn--ghost" whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
            {t("hero.cta2")}
          </motion.a>
        </motion.div>

        <motion.ul className="highlights" variants={stagger(0.1)}>
          {HIGHLIGHTS.map(([title, desc]) => (
            <motion.li key={title} variants={fadeUp}>
              <strong>{t(title)}</strong>
              <span>{t(desc)}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.a
        href="#services"
        className="scroll-hint"
        aria-label="Scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
      >
        <span />
      </motion.a>
    </section>
  );
}
