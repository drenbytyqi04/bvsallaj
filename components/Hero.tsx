"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import type { Img } from "@/lib/images";
import { site } from "@/lib/site";
import Photo from "./Photo";
import { Arrow, Phone, Star } from "./Icons";
import { ease } from "./motion";

function Line({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="hero__line">
      <span className="in-line" style={{ animationDelay: `${delay}s` }}>
        {text}
      </span>
    </span>
  );
}

export default function Hero({ t, locale, img }: { t: Dict; locale: Locale; img: Img }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  const fade = (delay: number) => ({ className: "in-fade", style: { animationDelay: `${delay}s` } });

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" {...fade(0.2)} className="kicker hero__h1 in-fade">
            <span className="kicker__dot" aria-hidden="true" />
            {t.hero.h1}
          </h1>

          <p className="hero__title">
            <Line text={t.hero.titleA} delay={0.3} />{" "}
            <Line text={t.hero.titleB} delay={0.42} />
          </p>

          <p {...fade(0.65)} className="hero__lead in-fade">
            {t.hero.lead}
          </p>

          <div {...fade(0.8)} className="hero__cta in-fade">
            <a href={site.phoneHref} className="btn btn--accent btn--lg">
              <Phone />
              {t.hero.ctaCall}
            </a>
            <a href={`/${locale}/#kontakt`} className="btn btn--line btn--lg">
              {t.hero.ctaQuote}
              <Arrow className="btn__arrow" />
            </a>
          </div>

          <a className="hero__rating in-fade" href={site.reviewsUrl} target="_blank" rel="noopener" style={{ animationDelay: "0.95s" }}>
            <span className="hero__score">{site.rating.value}</span>
            <span>
              <span className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} />
                ))}
              </span>
              <span className="hero__ratingText">
                {site.rating.count} {t.hero.reviews} {t.hero.rating}
              </span>
            </span>
          </a>
        </div>

        <div className="hero__media">
          <div className="hero__frame in-wipe" style={{ animationDelay: "0.25s" }}>
            <motion.div style={{ y: imgY, scale: imgScale }} className="hero__imgwrap">
              <Photo img={img} alt={t.hero.imgAlt} pendingLabel={t.photo.pending} priority />
            </motion.div>
          </div>
          <p {...fade(1.2)} className="hero__caption in-fade">
            <span className="hero__captionRule" aria-hidden="true" />
            {t.hero.caption}
          </p>
          <motion.div
            className="hero__pattern"
            aria-hidden="true"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.9 }}
          />
        </div>
      </div>
    </section>
  );
}
