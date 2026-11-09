"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Dict } from "@/lib/i18n";
import type { Img } from "@/lib/images";
import Photo from "./Photo";
import { ease, fadeUp, SectionHead, stagger } from "./motion";

export default function WhyUs({ t, img }: { t: Dict; img: Img }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);
  const yQuote = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -60]);

  return (
    <section className="section section--linen" id="warum">
      <div className="container why" ref={ref}>
        <motion.div className="why__media" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.div
            className="why__frame"
            style={{ y }}
            variants={{
              hidden: { clipPath: "inset(0 0 100% 0)" },
              show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.2, ease } },
            }}
          >
            <Photo img={img} alt={t.why.imgAlt} pendingLabel={t.photo.pending} />
          </motion.div>
          <motion.figure className="why__quote" style={{ y: yQuote }}>
            <blockquote>{t.why.quote}</blockquote>
            <figcaption>— {t.why.quoteBy}</figcaption>
          </motion.figure>
        </motion.div>

        <div className="why__copy">
          <SectionHead index={t.why.index} kicker={t.why.kicker} title={t.why.title} lead={t.why.lead} />
          <motion.ul
            className="why__points"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t.why.points.map((p, i) => (
              <motion.li key={p.title} variants={fadeUp}>
                <span className="why__n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
