"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { site, SERVICE_SLUGS } from "@/lib/site";
import { Check, Clock, Phone, Pin, WhatsappLogo } from "./Icons";
import { ease, fadeUp, Reveal, SectionHead, stagger } from "./motion";

type Field = "name" | "phone" | "email" | "message" | "privacy";
type Status = "idle" | "sending" | "success" | "error";

export default function Contact({ t, locale, preselect }: { t: Dict; locale: Locale; preselect?: string }) {
  const f = t.contact.form;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(data: FormData) {
    const e: Partial<Record<Field, string>> = {};
    if (!String(data.get("name") || "").trim()) e.name = f.errors.name;
    if (String(data.get("phone") || "").replace(/\D/g, "").length < 6) e.phone = f.errors.phone;
    const email = String(data.get("email") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = f.errors.email;
    if (String(data.get("message") || "").trim().length < 5) e.message = f.errors.message;
    if (!data.get("privacy")) e.privacy = f.errors.privacy;
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      // Web3Forms: delivers the request by email to the address registered for this access key.
      const name = String(data.get("name")).trim();
      const payload = {
        ...Object.fromEntries(data.entries()),
        access_key: site.web3formsKey,
        subject: `Neue Anfrage über die Website – ${name}`,
        from_name: "BV-Sallaj Website",
        // lets the owner reply directly to the customer when an email was given
        ...(String(data.get("email") || "").trim() ? { replyto: String(data.get("email")).trim() } : {}),
      };
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const err = (k: Field) =>
    errors[k] ? (
      <motion.span className="field__err" id={`err-${k}`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
        {errors[k]}
      </motion.span>
    ) : null;
  const aria = (k: Field) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `err-${k}` } : {});

  const [privA, privB] = f.privacy.split("{link}");

  return (
    <section className="section section--dark contact" id="kontakt">
      <div className="container contact__grid">
        <div className="contact__info">
          <SectionHead index={t.contact.index} kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} light />
          <motion.ul className="contact__list" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.li variants={fadeUp}>
              <Phone />
              <span>
                <small>{t.contact.phoneLabel}</small>
                <a href={site.phoneHref} className="contact__phone">
                  {site.phone}
                </a>
                <a href={site.phone2Href} className="contact__phone contact__phone--2">
                  {site.phone2}
                </a>
              </span>
            </motion.li>
            <motion.li variants={fadeUp}>
              <Pin />
              <span>
                <small>{t.contact.addressLabel}</small>
                <a href={site.mapsUrl} target="_blank" rel="noopener">
                  {site.street}, {site.zip} {site.city}
                </a>
              </span>
            </motion.li>
            <motion.li variants={fadeUp}>
              <Clock />
              <span>
                <small>{t.contact.hoursLabel}</small>
                {t.contact.hours}
              </span>
            </motion.li>
          </motion.ul>
          {site.whatsapp && (
            <a className="btn btn--whatsapp" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.contact.waMessage)}`} target="_blank" rel="noopener">
              <WhatsappLogo />
              {t.contact.whatsapp}
            </a>
          )}
        </div>

        <Reveal delay={0.1}>
          <form ref={formRef} className="form" name="kontakt" onSubmit={onSubmit} noValidate>
            <input type="hidden" name="sprache" value={locale} />
            {/* Web3Forms spam honeypot – must stay empty */}
            <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="form__row">
              <label className="field">
                <span className="field__label">{f.name}</span>
                <input name="name" type="text" autoComplete="name" required {...aria("name")} />
                {err("name")}
              </label>
              <label className="field">
                <span className="field__label">{f.phone}</span>
                <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required {...aria("phone")} />
                {err("phone")}
              </label>
            </div>

            <div className="form__row">
              <label className="field">
                <span className="field__label">
                  {f.email} <em>({f.optional})</em>
                </span>
                <input name="email" type="email" autoComplete="email" {...aria("email")} />
                {err("email")}
              </label>
              <label className="field">
                <span className="field__label">{f.service}</span>
                <select name="service" defaultValue={preselect ?? ""}>
                  <option value="" disabled>
                    {f.servicePlaceholder}
                  </option>
                  {SERVICE_SLUGS.map((s) => (
                    <option key={s} value={t.services.items[s].title}>
                      {t.services.items[s].title}
                    </option>
                  ))}
                  <option value={f.other}>{f.other}</option>
                </select>
              </label>
            </div>

            <label className="field">
              <span className="field__label">{f.message}</span>
              <textarea name="message" rows={5} placeholder={f.messagePlaceholder} required {...aria("message")} />
              {err("message")}
            </label>

            {site.whatsapp && (
              <p className="form__hint">
                <WhatsappLogo />
                <span>
                  {f.photoHint}{" "}
                  <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.contact.waMessage)}`} target="_blank" rel="noopener" className="link">
                    WhatsApp
                  </a>
                </span>
              </p>
            )}

            <label className="check">
              <input type="checkbox" name="privacy" value="ja" {...aria("privacy")} />
              <span className="check__box" aria-hidden="true">
                <Check />
              </span>
              <span>
                {privA}
                <a href={`/${locale}/datenschutz/`} className="link" target="_blank">
                  {f.privacyLink}
                </a>
                {privB}
              </span>
            </label>
            {err("privacy")}

            <motion.button type="submit" className="btn btn--accent btn--lg btn--block" disabled={status === "sending"} whileTap={{ scale: 0.98 }}>
              {status === "sending" ? f.sending : f.submit}
            </motion.button>

            <div role="status" aria-live="polite" className="form__status">
              <AnimatePresence mode="wait">
                {(status === "success" || status === "error") && (
                  <motion.p
                    key={status}
                    className={`notice notice--${status}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    {status === "success" ? f.success : f.error}
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
