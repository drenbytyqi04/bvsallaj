"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import type { Dict } from "@/lib/i18n";
import { ease, SectionHead } from "./motion";

export default function Process({ t }: { t: Dict }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="section section--dark" id="ablauf">
      <div className="container">
        <SectionHead index={t.process.index} kicker={t.process.kicker} title={t.process.title} light align="split" />
        <ol className="steps" ref={ref}>
          <span className="steps__track" aria-hidden="true">
            <motion.span className="steps__fill" style={{ scaleX: line }} />
          </span>
          {t.process.steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease, delay: i * 0.12 }}
            >
              <span className="steps__dot" aria-hidden="true" />
              <span className="steps__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
