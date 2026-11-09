"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { site, SERVICE_SLUGS } from "@/lib/site";
import { Check, Clock, Phone, Pin, Upload, WhatsappLogo } from "./Icons";
import { ease, fadeUp, Reveal, SectionHead, stagger } from "./motion";

type Field = "name" | "phone" | "email" | "message" | "privacy" | "file";
type Status = "idle" | "sending" | "success" | "error";
const MAX_FILE = 8 * 1024 * 1024;

export default function Contact({ t, locale, preselect }: { t: Dict; locale: Locale; preselect?: string }) {
  const f = t.contact.form;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState("");

  function validate(data: FormData) {
    const e: Partial<Record<Field, string>> = {};
    if (!String(data.get("name") || "").trim()) e.name = f.errors.name;
    if (String(data.get("phone") || "").replace(/\D/g, "").length < 6) e.phone = f.errors.phone;
    const email = String(data.get("email") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = f.errors.email;
    if (String(data.get("message") || "").trim().length < 5) e.message = f.errors.message;
    if (!data.get("privacy")) e.privacy = f.errors.privacy;
    const file = data.get("foto");
    if (file instanceof File && file.size > MAX_FILE) e.file = f.errors.file;
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0] === "file" ? "foto" : Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    const file = data.get("foto");
    if (file instanceof File && file.size === 0) data.delete("foto");
    setStatus("sending");
    try {
      // Netlify Forms (definition in /public/__forms.html). multipart because of the optional photo.
      const res = await fetch("/__forms.html", { method: "POST", body: data });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setFileName("");
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
          <form ref={formRef} className="form" name="kontakt" onSubmit={onSubmit} noValidate encType="multipart/form-data">
            <input type="hidden" name="form-name" value="kontakt" />
            <input type="hidden" name="sprache" value={locale} />
            <p className="hp" aria-hidden="true">
              <label>
                Bot <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

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

            <label className="file">
              <input
                type="file"
                name="foto"
                accept="image/jpeg,image/png,image/webp,image/heic"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                {...aria("file")}
              />
              <span className="file__box">
                <Upload />
                <span>
                  <strong>{fileName || f.file}</strong>
                  <small>
                    {f.fileHint} · {f.optional}
                  </small>
                </span>
              </span>
              {err("file")}
            </label>

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
