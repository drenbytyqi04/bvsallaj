"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { Plus } from "./Icons";
import { ease, fadeUp, SectionHead, stagger } from "./motion";

export default function Faq({ t }: { t: Dict }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section className="section" id="faq">
      <div className="container faq">
        <SectionHead index={t.faq.index} kicker={t.faq.kicker} title={t.faq.title} />
        <motion.div className="faq__list" variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={item.q} className={`faq__item${isOpen ? " is-open" : ""}`} variants={fadeUp}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-${i}`}
                    id={`${id}-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <motion.span className="faq__icon" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease }}>
                      <Plus />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${id}-${i}`}
                      role="region"
                      aria-labelledby={`${id}-q-${i}`}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
