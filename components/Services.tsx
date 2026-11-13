"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import type { Img } from "@/lib/images";
import type { ServiceSlug } from "@/lib/site";
import Photo from "./Photo";
import { Arrow } from "./Icons";
import { ease, fadeUp, SectionHead, stagger } from "./motion";

export default function Services({
  t,
  locale,
  slugs,
  imgs,
}: {
  t: Dict;
  locale: Locale;
  slugs: readonly ServiceSlug[];
  imgs: Record<ServiceSlug, Img>;
}) {
  const [active, setActive] = useState<ServiceSlug>(slugs[0]);

  return (
    <section className="section" id="leistungen">
      <div className="container">
        <SectionHead index={t.services.index} kicker={t.services.kicker} title={t.services.title} lead={t.services.lead} align="split" />

        <div className="svc">
          <motion.ol
            className="svc__list"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {slugs.map((slug, i) => {
              const s = t.services.items[slug];
              return (
                <motion.li key={slug} variants={fadeUp}>
                  <a
                    href={`/${locale}/leistungen/${slug}/`}
                    className={`svc__row${active === slug ? " is-active" : ""}`}
                    onMouseEnter={() => setActive(slug)}
                    onFocus={() => setActive(slug)}
                  >
                    <span className="svc__num">0{i + 1}</span>
                    <span className="svc__body">
                      <span className="svc__title">{s.title}</span>
                      <span className="svc__short">{s.short}</span>
                    </span>
                    <span className="svc__go" aria-hidden="true">
                      <Arrow />
                    </span>
                    <span className="svc__thumb" aria-hidden="true">
                      <Photo img={imgs[slug]} alt="" pendingLabel={t.photo.pending} sizes="(max-width: 959px) 90vw, 1px" />
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ol>

          <div className="svc__preview" aria-hidden="true">
            <div className="svc__sticky">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  className="svc__previewImg"
                  initial={{ opacity: 0, scale: 1.04, clipPath: "inset(0 0 0 100%)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <Photo img={imgs[active]} alt="" pendingLabel={t.photo.pending} />
                </motion.div>
              </AnimatePresence>
              <p className="svc__previewLabel">
                <span>{String(slugs.indexOf(active) + 1).padStart(2, "0")}</span> {t.services.items[active].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
