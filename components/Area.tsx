"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Arrow, Pin } from "./Icons";
import { ease, fadeUp, SectionHead, stagger } from "./motion";

const CONSENT_KEY = "bvsallaj-maps-consent";

/** Google Maps is only loaded after explicit consent (DSGVO). */
export default function Area({ t, locale }: { t: Dict; locale: Locale }) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) === "1") setConsent(true);
    } catch {
      /* ignore */
    }
  }, []);

  const allow = () => {
    setConsent(true);
    try {
      localStorage.setItem(CONSENT_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="section section--linen" id="einsatzgebiet">
      <div className="container area">
        <div>
          <SectionHead index={t.area.index} kicker={t.area.kicker} title={t.area.title} lead={t.area.lead} />
          <motion.ul className="cities" variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {site.cities.map((c) => (
              <motion.li key={c} variants={fadeUp} className={c === site.city ? "is-home" : ""}>
                <Pin />
                {c}
              </motion.li>
            ))}
          </motion.ul>
          <p className="area__more">{t.area.more}</p>
        </div>

        <motion.div
          className="map"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
        >
          <AnimatePresence mode="wait">
            {consent ? (
              <motion.iframe
                key="map"
                title={t.area.kicker}
                src={site.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ) : (
              <motion.div key="gate" className="map__gate" exit={{ opacity: 0 }}>
                <div className="map__pin" aria-hidden="true">
                  <Pin />
                </div>
                <p className="map__title">{t.area.mapTitle}</p>
                <p className="map__text">
                  {t.area.mapText}{" "}
                  <a href={`/${locale}/datenschutz/`} className="link">
                    {t.contact.form.privacyLink}
                  </a>
                  .
                </p>
                <div className="map__actions">
                  <button type="button" className="btn btn--dark" onClick={allow}>
                    {t.area.mapButton}
                  </button>
                  <a className="link" href={site.mapsUrl} target="_blank" rel="noopener">
                    {t.area.mapOpen} <Arrow />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
