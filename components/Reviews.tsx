"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Arrow, Star } from "./Icons";
import { ease, Reveal, SectionHead } from "./motion";

export default function Reviews({ t }: { t: Dict }) {
  const [first, ...rest] = t.reviews.items;
  return (
    <section className="section" id="bewertungen">
      <div className="container">
        <SectionHead index={t.reviews.index} kicker={t.reviews.kicker} title={t.reviews.title} />

        <div className="reviews">
          <Reveal className="reviews__score">
            <span className="reviews__big">{site.rating.value}</span>
            <span className="stars stars--lg" role="img" aria-label={`${site.rating.value} / 5`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} />
              ))}
            </span>
            <p>{t.reviews.basis.replace("{count}", String(site.rating.count))}</p>
            <a className="link" href={site.reviewsUrl} target="_blank" rel="noopener">
              {t.reviews.all} <Arrow />
            </a>
          </Reveal>

          <motion.figure
            className="review review--feature"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            <span className="review__mark" aria-hidden="true">“</span>
            <blockquote>{first.text}</blockquote>
            <figcaption>
              <strong>{first.name}</strong> · Google
            </figcaption>
          </motion.figure>

          {rest.map((r, i) => (
            <motion.figure
              key={r.name}
              className="review"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.1 }}
            >
              <span className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} />
                ))}
              </span>
              <blockquote>{r.text}</blockquote>
              <figcaption>
                <strong>{r.name}</strong> · Google
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
