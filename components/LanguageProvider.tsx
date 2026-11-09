"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { dict, LANGS, type Key, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "bvsallaj-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  // Pick saved language, else browser language, else German.
  useEffect(() => {
    let initial: Lang = "de";
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && LANGS.includes(saved)) initial = saved;
      else {
        const nav = navigator.language.slice(0, 2).toLowerCase() as Lang;
        if (LANGS.includes(nav)) initial = nav;
      }
    } catch {
      /* storage unavailable */
    }
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dict[lang]["meta.title"];
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback((k: Key) => dict[lang][k] ?? dict.de[k], [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
