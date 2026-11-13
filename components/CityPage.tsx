"use client";

import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import type { Img } from "@/lib/images";
import { CITIES, site, type CitySlug, type ServiceSlug } from "@/lib/site";
import Photo from "./Photo";
import { Arrow, Phone, Pin, Star } from "./Icons";
import { fadeUp, Reveal, stagger } from "./motion";

type Service = { slug: ServiceSlug; title: string; short: string; img: Img };

const fill = (tpl: string, city: string) => tpl.replaceAll("{city}", city);

export default function CityPage({
  t,
  locale,
  city,
  img,
  services,
}: {
  t: Dict;
  locale: Locale;
  city: CitySlug;
  img: Img;
  services: Service[];
}) {
  const c = t.cityPage;
  const name = CITIES.find((x) => x.slug === city)!.name;
  const fade = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

  return (
    <>
      <section className="sd-hero">
        <div className="container sd-hero__grid">
          <div>
            <nav className="crumbs in-fade" aria-label="Breadcrumb" {...fade(0.1)}>
              <a href={`/${locale}/`}>{site.shortName}</a>
              <span aria-hidden="true">/</span>
              <a href={`/${locale}/#einsatzgebiet`}>{c.kicker}</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{name}</span>
            </nav>
            <p className="kicker in-fade" {...fade(0.2)}>
              <Pin className="kicker__pin" />
              <span>{c.kicker}</span>
            </p>
            <h1 className="sd-hero__title">
              <span className="hero__line">
                <span className="in-line" style={{ animationDelay: "0.3s" }}>
                  {fill(c.title, name)}
                </span>
              </span>
            </h1>
            <p className="sd-hero__lead in-fade" {...fade(0.5)}>
              {c.intros[city]}
            </p>
            <div className="hero__cta in-fade" {...fade(0.65)}>
              <a href={site.phoneHref} className="btn btn--accent btn--lg">
                <Phone />
                {t.hero.ctaCall}
              </a>
              <a href="#kontakt" className="btn btn--line btn--lg">
                {t.hero.ctaQuote}
                <Arrow className="btn__arrow" />
              </a>
            </div>
            <a className="hero__rating in-fade" href={site.reviewsUrl} target="_blank" rel="noopener" {...fade(0.8)}>
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
          <div className="sd-hero__media in-wipe" style={{ animationDelay: "0.3s" }}>
            <Photo img={img} alt={t.hero.imgAlt} pendingLabel={t.photo.pending} priority />
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Reveal>
            <h2 className="h2 city__h2">{fill(c.servicesTitle, name)}</h2>
            <p className="city__lead">{fill(c.lead, name)}</p>
          </Reveal>
          <motion.ul className="others others--5" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
            {services.map((o) => (
              <motion.li key={o.slug} variants={fadeUp}>
                <a href={`/${locale}/leistungen/${o.slug}/`} className="other">
                  <span className="other__img">
                    <Photo img={o.img} alt="" pendingLabel={t.photo.pending} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" />
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

      <section className="section section--linen section--tight">
        <div className="container sd-body">
          <Reveal>
            <h2 className="h2">{fill(c.whyTitle, name)}</h2>
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
          <div className="reviews-mini">
            {t.reviews.items.map((r) => (
              <Reveal key={r.name} className="review">
                <span className="stars" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} />
                  ))}
                </span>
                <blockquote>{r.text}</blockquote>
                <p className="review__by">
                  <strong>{r.name}</strong> · Google
                </p>
              </Reveal>
            ))}
          </div>

          <nav className="city-links" aria-label={c.otherTitle}>
            <p className="city-links__title">{c.otherTitle}</p>
            <ul>
              {CITIES.filter((x) => x.slug !== city).map((x) => (
                <li key={x.slug}>
                  <a href={`/${locale}/bodenleger/${x.slug}/`}>
                    <Pin />
                    {fill(c.linkLabel, x.name)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
