"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/types";

export function LanguageSwitcher({
  className = "",
  mobile = false,
}: {
  className?: string;
  mobile?: boolean;
}) {
  const { locale, setLocale, locales } = useLanguage();

  if (mobile) {
    return (
      <div
        className={`w-full grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] ${className}`}
        role="group"
        aria-label="Language selection"
      >
        {locales.map((item) => {
          const active = item.code === locale;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLocale(item.code as Locale)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                active
                  ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)] font-extrabold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span>{item.flag}</span>
              <span className="tracking-wide uppercase">{item.code}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`language-pill-group items-center p-0.5 rounded-full border border-[var(--glass-border)] bg-[var(--surface-soft)] backdrop-blur-md shadow-xs transition-all ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {locales.map((item) => {
        const active = item.code === locale;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code as Locale)}
            className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
              active
                ? "bg-[var(--brand-primary)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]/60"
            }`}
            title={item.label}
          >
            {item.code}
          </button>
        );
      })}
    </div>
  );
}
