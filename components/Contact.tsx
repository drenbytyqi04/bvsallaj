"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";
import { ADDRESS, ClockIcon, MAPS_URL, PHONE, PHONE_HREF, PhoneIcon, PinIcon } from "./Icons";
import { ease, fadeUp, Reveal, stagger } from "./motion";
import type { Key } from "@/lib/i18n";

type Status = { kind: "idle" | "sending" | "ok" | "err"; key?: Key };

const SERVICE_KEYS: Key[] = ["services.s1.t", "services.s2.t", "services.s3.t", "services.s4.t", "services.s5.t", "form.other"];

export default function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!String(data.get("name")).trim() || !String(data.get("phone")).trim() || !String(data.get("message")).trim()) {
      setStatus({ kind: "err", key: "form.invalid" });
      return;
    }
    setStatus({ kind: "sending", key: "form.sending" });
    try {
      // Netlify Forms: posts to the static form definition in /public/__forms.html
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ kind: "ok", key: "form.ok" });
    } catch {
      setStatus({ kind: "err", key: "form.err" });
    }
  }

  const info = [
    { icon: <PhoneIcon />, content: <a href={PHONE_HREF}>{PHONE}</a> },
    { icon: <PinIcon />, content: <a href={MAPS_URL} target="_blank" rel="noopener">{ADDRESS}</a> },
    { icon: <ClockIcon />, content: <span>{t("contact.hours")}</span> },
  ];

  return (
    <section className="section section--alt" id="contact">
      <div className="container contact">
        <motion.div
          className="contact__info"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p className="eyebrow" variants={fadeUp}>{t("contact.eyebrow")}</motion.p>
          <motion.h2 variants={fadeUp}>{t("contact.title")}</motion.h2>
          <motion.p variants={fadeUp}>{t("contact.lead")}</motion.p>
          <motion.ul className="contact__list" variants={stagger(0.1)}>
            {info.map((item, i) => (
              <motion.li key={i} variants={fadeUp} whileHover={{ x: 6 }}>
                {item.icon}
                {item.content}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div className="map" variants={fadeUp}>
            <iframe
              title="Map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Nickelstra%C3%9Fe+20,+52249+Eschweiler&output=embed"
            />
          </motion.div>
        </motion.div>

        <Reveal x={60}>
          <form className="form" name="kontakt" onSubmit={onSubmit} noValidate>
            <input type="hidden" name="form-name" value="kontakt" />
            <p hidden>
              <label>
                Bot <input name="bot-field" />
              </label>
            </p>
            <div className="form__row">
              <label>
                <span>{t("form.name")}</span>
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label>
                <span>{t("form.phone")}</span>
                <input type="tel" name="phone" required autoComplete="tel" />
              </label>
            </div>
            <label>
              <span>{t("form.email")}</span>
              <input type="email" name="email" autoComplete="email" />
            </label>
            <label>
              <span>{t("form.service")}</span>
              <select name="service">
                {SERVICE_KEYS.map((k) => (
                  <option key={k}>{t(k)}</option>
                ))}
              </select>
            </label>
            <label>
              <span>{t("form.message")}</span>
              <textarea name="message" rows={5} required />
            </label>
            <motion.button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={status.kind === "sending"}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("form.submit")}
            </motion.button>
            <div className="form__status-wrap" role="status" aria-live="polite">
              <AnimatePresence mode="wait">
                {status.key && (
                  <motion.p
                    key={status.kind + status.key}
                    className={`form__status ${status.kind === "ok" ? "ok" : status.kind === "err" ? "err" : ""}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    {t(status.key)}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
