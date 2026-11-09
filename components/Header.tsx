"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n";
import { site } from "@/lib/site";
import Logo from "./Logo";
import { Phone } from "./Icons";
import { ease } from "./motion";

export default function Header({ locale, t }: { locale: Locale; t: Dict }) {
  const pathname = usePathname() || `/${locale}/`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const home = `/${locale}/`;
  const links: [string, string][] = [
    [`${home}#leistungen`, t.nav.services],
    [`${home}#warum`, t.nav.why],
    [`${home}#referenzen`, t.nav.work],
    [`${home}#ablauf`, t.nav.process],
    [`${home}#faq`, t.nav.faq],
    [`${home}#kontakt`, t.nav.contact],
  ];

  const swap = (l: Locale) => pathname.replace(/^\/(de|en|sq)(?=\/|$)/, `/${l}`);
  const remember = (l: Locale) => {
    try {
      localStorage.setItem("bvsallaj-lang", l);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <a href="#main" className="skip">
        {t.a11y.skip}
      </a>
      <motion.header
        className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="container header__inner">
          <Logo href={home} label={t.a11y.home} />

          <nav className="nav" aria-label="Hauptnavigation">
            {links.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <nav className="lang" aria-label={t.a11y.lang}>
              {LOCALES.map((l) => (
                <a
                  key={l}
                  href={swap(l)}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? "true" : undefined}
                  onClick={() => remember(l)}
                >
                  {l === locale && (
                    <motion.span layoutId="lang-pill" className="lang__pill" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
                  )}
                  <span className="lang__label">{l.toUpperCase()}</span>
                </a>
              ))}
            </nav>
            <a href={site.phoneHref} className="btn btn--dark btn--sm header__call">
              <Phone />
              <span>{site.phone}</span>
            </a>
            <button
              className="burger"
              aria-label={open ? t.a11y.close : t.a11y.menu}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <motion.div className="header__progress" style={{ scaleX: progress }} aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="mnav"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease }}
          >
            <nav className="container mnav__inner" aria-label="Mobile">
              {links.map(([href, label], i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.05 }}
                >
                  <span className="mnav__num">0{i + 1}</span>
                  {label}
                </motion.a>
              ))}
              <motion.a
                href={site.phoneHref}
                className="btn btn--accent mnav__call"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Phone />
                {site.phone}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
