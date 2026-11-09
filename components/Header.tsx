"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { LANGS, type Key } from "@/lib/i18n";
import { ease } from "./motion";

const LINKS: [string, Key][] = [
  ["#services", "nav.services"],
  ["#about", "nav.about"],
  ["#reviews", "nav.reviews"],
  ["#process", "nav.process"],
  ["#contact", "nav.contact"],
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`logo${light ? " logo--light" : ""}`} aria-label="BV-Sallaj Boden & Innenausbau">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="" width={40} height={40} />
      <span className="logo__text">
        <span>
          BV-<strong>Sallaj</strong>
        </span>
        <small>Boden &amp; Innenausbau</small>
      </span>
    </a>
  );
}

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 30));

  return (
    <motion.header
      className={`header${scrolled || open ? " is-scrolled" : ""}`}
      id="top"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="container header__inner">
        <Logo />

        <nav className="nav">
          {LINKS.map(([href, key]) => (
            <a key={href} href={href}>
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <div className="lang" role="group" aria-label="Sprache / Language / Gjuha">
            {LANGS.map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {lang === l && (
                  <motion.span
                    layoutId="lang-pill"
                    className="lang__pill"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="lang__label">{l.toUpperCase()}</span>
              </button>
            ))}
          </div>
          <button
            className="burger"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mnav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease }}
          >
            {LINKS.map(([href, key], i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.05 }}
              >
                {t(key)}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
    </motion.header>
  );
}
