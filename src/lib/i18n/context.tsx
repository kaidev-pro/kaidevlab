"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { en } from "./dictionaries/en";
import { id } from "./dictionaries/id";
import { ja } from "./dictionaries/ja";
import { Locale, Translations } from "./types";

interface LocaleOption {
  code: Locale;
  label: string;
  flag: string;
}

export const LOCALES: LocaleOption[] = [
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

const dictionaries: Record<Locale, Translations> = {
  id,
  en,
  ja,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Translations;
  locales: LocaleOption[];
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: en,
  locales: LOCALES,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kaidevlab_locale") as Locale | null;
      if (saved && (saved === "id" || saved === "en" || saved === "ja")) {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      } else {
        const browserLang = navigator.language.toLowerCase();
        let detected: Locale = "en";
        if (browserLang.startsWith("ja")) detected = "ja";
        else if (browserLang.startsWith("id")) detected = "id";
        setLocaleState(detected);
        document.documentElement.lang = detected;
      }
    } catch {
      // Fallback safe
    }
    setMounted(true);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem("kaidevlab_locale", next);
      document.documentElement.lang = next;
    } catch {
      // Ignore
    }
  };

  const t = dictionaries[locale] || dictionaries.en;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, locales: LOCALES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
