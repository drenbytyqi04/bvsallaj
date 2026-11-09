import de, { type Dict } from "./de";
import en from "./en";
import sq from "./sq";

export const LOCALES = ["de", "en", "sq"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";
export type { Dict };

const dicts: Record<Locale, Dict> = { de, en, sq };

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export function getDict(locale: string): Dict {
  return dicts[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

/** BCP-47 tags used for hreflang / og:locale */
export const HREFLANG: Record<Locale, string> = { de: "de-DE", en: "en", sq: "sq" };
export const OG_LOCALE: Record<Locale, string> = { de: "de_DE", en: "en_US", sq: "sq_AL" };
