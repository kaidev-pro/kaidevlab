"use client";

import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LOCALES, useLanguage } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/types";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = LOCALES.find((l) => l.code === locale) || LOCALES[1];

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="icon-button language-toggle inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] hover:bg-[var(--surface)] hover:border-[var(--brand-primary)] text-xs font-bold text-[var(--text-primary)] transition-all cursor-pointer"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe size={15} className="text-[var(--brand-primary)]" />
        <span className="uppercase tracking-wider">{currentOption.code}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] shadow-[var(--shadow)] backdrop-blur-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
          role="menu"
        >
          {LOCALES.map((option) => {
            const active = option.code === locale;
            return (
              <button
                key={option.code}
                type="button"
                onClick={() => {
                  setLocale(option.code as Locale);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-[var(--brand-primary)] text-white shadow-sm"
                    : "text-[var(--text-primary)] hover:bg-[var(--surface-soft)]"
                }`}
                role="menuitem"
              >
                <span className="flex items-center gap-2">
                  <span>{option.flag}</span>
                  <span>{option.label}</span>
                </span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
