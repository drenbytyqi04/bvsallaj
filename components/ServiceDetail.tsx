"use client";

import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import type { Img } from "@/lib/images";
import { site, type ServiceSlug } from "@/lib/site";
import Photo from "./Photo";
import { Arrow, Check, Phone } from "./Icons";
import { ease, fadeUp, Reveal, stagger } from "./motion";

type Other = { slug: ServiceSlug; title: string; short: string; img: Img };

export default function ServiceDetail({
  t,
  locale,
  slug,
  index,
  img,
  others,
}: {
  t: Dict;
  locale: Locale;
  slug: ServiceSlug;
  index: number;
  img: Img;
  others: Other[];
}) {
  const s = t.services.items[slug];
  const fade = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

  return (
    <>
      <section className="sd-hero">
        <div className="container sd-hero__grid">
          <div>
            <nav className="crumbs in-fade" aria-label="Breadcrumb" {...fade(0.1)}>
              <a href={`/${locale}/`}>{site.shortName}</a>
              <span aria-hidden="true">/</span>
              <a href={`/${locale}/#leistungen`}>{t.nav.services}</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{s.title}</span>
            </nav>
            <p className="kicker in-fade" {...fade(0.2)}>
              <span className="kicker__num">{String(index).padStart(2, "0")}</span>
              <span className="kicker__rule" />
              <span>{t.nav.services}</span>
            </p>
            <h1 className="sd-hero__title">
              <span className="hero__line">
                <span className="in-line" style={{ animationDelay: "0.3s" }}>
                  {s.title}
                </span>
              </span>{" "}
              <span className="sd-hero__region in-fade" style={{ animationDelay: "0.45s" }}>
                {t.servicePage.inRegion}
              </span>
            </h1>
            <p className="sd-hero__lead in-fade" {...fade(0.55)}>
              {s.intro}
            </p>
            <div className="hero__cta in-fade" {...fade(0.7)}>
              <a href={site.phoneHref} className="btn btn--accent btn--lg">
                <Phone />
                {t.hero.ctaCall}
              </a>
              <a href="#kontakt" className="btn btn--line btn--lg">
                {t.hero.ctaQuote}
                <Arrow className="btn__arrow" />
              </a>
            </div>
          </div>
          <div className="sd-hero__media in-wipe" style={{ animationDelay: "0.3s" }}>
            <Photo img={img} alt={s.imgAlt} pendingLabel={t.photo.pending} priority />
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container sd-body">
          <Reveal>
            <h2 className="h2">{t.servicePage.includesTitle}</h2>
          </Reveal>
          <motion.ul className="includes" variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {s.includes.map((item) => (
              <motion.li key={item} variants={fadeUp}>
                <span className="includes__check" aria-hidden="true">
                  <Check />
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="section section--linen section--tight">
        <div className="container sd-body">
          <Reveal>
            <h2 className="h2">{t.servicePage.whyTitle}</h2>
          </Reveal>
          <motion.ul className="mini-points" variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {t.why.points.slice(0, 4).map((p, i) => (
              <motion.li key={p.title} variants={fadeUp}>
                <span className="why__n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="others__head">
            <h2 className="h2">{t.servicePage.otherTitle}</h2>
            <a className="link" href={`/${locale}/#leistungen`}>
              {t.servicePage.back} <Arrow />
            </a>
          </div>
          <motion.ul className="others" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {others.map((o) => (
              <motion.li key={o.slug} variants={fadeUp}>
                <a href={`/${locale}/leistungen/${o.slug}/`} className="other">
                  <span className="other__img">
                    <Photo img={o.img} alt="" pendingLabel={t.photo.pending} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  </span>
                  <span className="other__title">
                    {o.title} <Arrow />
                  </span>
                  <span className="other__short">{o.short}</span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
