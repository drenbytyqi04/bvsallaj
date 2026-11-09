"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { Logo } from "./Header";
import { PHONE, PHONE_HREF, PhoneIcon } from "./Icons";
import type { Key } from "@/lib/i18n";

const LINKS: [string, Key][] = [
  ["/#services", "nav.services"],
  ["/#about", "nav.about"],
  ["/#reviews", "nav.reviews"],
  ["/#contact", "nav.contact"],
  ["/impressum", "footer.imprint"],
];

export default function Footer() {
  const { t } = useLang();
  return (
    <>
      <footer className="footer">
        <div className="container footer__inner">
          <div>
            <Logo light />
            <p>
              Nickelstraße 20, 52249 Eschweiler
              <br />
              <a href={PHONE_HREF}>{PHONE}</a>
            </p>
          </div>
          <nav className="footer__nav">
            {LINKS.map(([href, k]) => (
              <a key={href} href={href}>
                {t(k)}
              </a>
            ))}
          </nav>
        </div>
        <div className="container footer__bottom">
          <p>
            © {new Date().getFullYear()} BV-Sallaj Boden &amp; Innenausbau. {t("footer.rights")}
          </p>
        </div>
      </footer>

      <motion.a
        className="fab"
        href={PHONE_HREF}
        aria-label={t("hero.cta1")}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.5 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          className="fab__ring"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <PhoneIcon />
      </motion.a>
    </>
  );
}
