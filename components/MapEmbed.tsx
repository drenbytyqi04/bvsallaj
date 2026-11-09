"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Arrow, Pin } from "./Icons";
import { ease } from "./motion";

const CONSENT_KEY = "bvsallaj-maps-consent";

/** Google Maps – loaded only after one click of consent (DSGVO), remembered per visitor. */
export default function MapEmbed({ t, locale, className = "" }: { t: Dict; locale: Locale; className?: string }) {
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
    <motion.div
      className={`map ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease }}
    >
      <AnimatePresence mode="wait">
        {consent ? (
          <motion.iframe
            key="map"
            title={`${site.name} – ${site.street}, ${site.zip} ${site.city}`}
            src={site.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          <motion.div key="gate" className="map__gate" exit={{ opacity: 0 }}>
            <div className="map__pin" aria-hidden="true">
              <Pin />
            </div>
            <p className="map__title">
              {site.street}, {site.zip} {site.city}
            </p>
            <p className="map__text">
              {t.area.mapText}{" "}
              <a href={`/${locale}/datenschutz/`} className="link">
                {t.contact.form.privacyLink}
              </a>
              .
            </p>
            <div className="map__actions">
              <button type="button" className="btn btn--accent" onClick={allow}>
                <Pin />
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
  );
}
