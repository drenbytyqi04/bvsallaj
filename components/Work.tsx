"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import type { Dict } from "@/lib/i18n";
import type { Img } from "@/lib/images";
import BeforeAfter from "./BeforeAfter";
import Photo from "./Photo";
import { ease, Reveal, SectionHead } from "./motion";

type Cat = keyof Dict["work"]["filters"];

export default function Work({ t, imgs, before, after }: { t: Dict; imgs: Img[]; before: Img; after: Img }) {
  const [filter, setFilter] = useState<Cat | "all">("all");
  const items = t.work.items.map((it, i) => ({ ...it, cat: it.cat as Cat, img: imgs[i], n: i }));
  const visible = items.filter((it) => filter === "all" || it.cat === filter);
  const cats = (Object.keys(t.work.filters) as Cat[]).filter((c) => items.some((it) => it.cat === c));

  return (
    <section className="section" id="referenzen">
      <div className="container">
        <SectionHead index={t.work.index} kicker={t.work.kicker} title={t.work.title} lead={t.work.lead} align="split" />

        <Reveal className="filters">
          <div role="group" aria-label={t.work.kicker}>
            <LayoutGroup id="filters">
              {(["all", ...cats] as const).map((c) => (
                <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                  {filter === c && <motion.span layoutId="filter-pill" className="filters__pill" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                  <span>{c === "all" ? t.work.all : t.work.filters[c]}</span>
                </button>
              ))}
            </LayoutGroup>
          </div>
        </Reveal>

        <motion.ul className="work" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((it, i) => (
              <motion.li
                key={it.n}
                layout
                className={`work__item work__item--${(it.n % 3) + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease, delay: (i % 3) * 0.08 }}
              >
                <figure>
                  <div className="work__img">
                    <Photo img={it.img} alt={it.title} pendingLabel={t.photo.pending} />
                  </div>
                  <figcaption>
                    <span className="work__cat">{t.work.filters[it.cat]}</span>
                    <span className="work__title">{it.title}</span>
                    <span className="work__place">{it.place}</span>
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* Before/after only appears once both real photos exist in /public/images/vorher-nachher/ */}
        {before.exists && after.exists && (
        <div className="ba-wrap">
          <Reveal className="ba-wrap__copy">
            <h3 className="h3">{t.work.baTitle}</h3>
            <p>{t.work.baText}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfter
              before={before}
              after={after}
              labels={{ before: t.work.before, after: t.work.after, slider: t.work.baLabel, pending: t.photo.pending }}
            />
          </Reveal>
        </div>
        )}
      </div>
    </section>
  );
}
