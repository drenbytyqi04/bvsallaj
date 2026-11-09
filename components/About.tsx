"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "./LanguageProvider";
import { ease, fadeUp, stagger } from "./motion";
import type { Key } from "@/lib/i18n";

const CHECKS: Key[] = ["about.c1", "about.c2", "about.c3", "about.c4"];

export default function About() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section className="section section--alt" id="about">
      <div className="container about" ref={ref}>
        <motion.div
          className="about__visual"
          aria-hidden="true"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.div className="about__img" style={{ y: imgY }} />
          <motion.div
            className="about__badge"
            style={{ y: badgeY }}
            initial={{ scale: 0, rotate: -12 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.4 }}
          >
            <strong>5,0 ★</strong>
            <span>{t("about.badge")}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="about__text"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="eyebrow" variants={fadeUp}>{t("about.eyebrow")}</motion.p>
          <motion.h2 variants={fadeUp}>{t("about.title")}</motion.h2>
          <motion.p variants={fadeUp}>{t("about.p1")}</motion.p>
          <motion.p variants={fadeUp}>{t("about.p2")}</motion.p>
          <motion.ul className="checks" variants={stagger(0.1)}>
            {CHECKS.map((k) => (
              <motion.li
                key={k}
                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
              >
                {t(k)}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
