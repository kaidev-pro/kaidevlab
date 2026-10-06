"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/types";

interface KaiGreeting {
  greeting: string;
  romaji?: string;
  note: string;
}

const KAI_GREETINGS: Record<Locale, KaiGreeting> = {
  ja: {
    greeting: "ようこそ！Kaidevlabへ。",
    romaji: "Yokoso! Kaidevlab e.",
    note: "東京からお届けするクリエイティブ・ラボ",
  },
  en: {
    greeting: "Welcome to Kaidevlab!",
    note: "Exploring code, systems & visual arts",
  },
  id: {
    greeting: "Halo! Selamat datang di Kaidevlab.",
    note: "Eksplorasi web, automasi & karya kreatif",
  },
};

export function LanguageSwitcher({
  className = "",
  mobile = false,
}: {
  className?: string;
  mobile?: boolean;
}) {
  const { locale, setLocale, locales } = useLanguage();
  const [showGreeting, setShowGreeting] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState<{
    locale: Locale;
    greeting: string;
    romaji?: string;
    note: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setCurrentGreeting({
      locale: code,
      ...KAI_GREETINGS[code],
    });
    setShowGreeting(true);
  };

  useEffect(() => {
    if (!showGreeting) return;
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, [showGreeting, currentGreeting]);

  useEffect(() => {
    if (!showGreeting) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowGreeting(false);
      }
    };
    window.addEventListener("pointerdown", handleClickOutside);
    return () => window.removeEventListener("pointerdown", handleClickOutside);
  }, [showGreeting]);

  if (mobile) {
    return (
      <div ref={containerRef} className="w-full">
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
                onClick={() => handleSelect(item.code as Locale)}
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

        {/* Mobile Kai Greeting Box */}
        {showGreeting && currentGreeting && (
          <div
            role="status"
            aria-live="polite"
            className="mt-2.5 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-md animate-in fade-in slide-in-from-top-1 duration-200"
          >
            <div className="flex items-start gap-3 relative">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--brand-primary)]/50 shadow-sm bg-[var(--surface-soft)]">
                  <Image
                    src="/media/kai-cinematic/kai-avatar.webp"
                    alt="Kai"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--surface)]" />
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[11px] font-bold text-[var(--brand-primary)]">
                    Kai
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--surface-soft)] text-[var(--text-secondary)] font-medium">
                    Studio Lead
                  </span>
                </div>
                <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight">
                  {currentGreeting.greeting}
                </p>
                {currentGreeting.romaji && (
                  <p className="text-[10px] italic text-[var(--brand-primary)]/80 mt-0.5 font-medium">
                    {currentGreeting.romaji}
                  </p>
                )}
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
                  {currentGreeting.note}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGreeting(false)}
                className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                aria-label="Dismiss greeting"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative inline-flex items-center ${className || ""}`}>
      <div
        className="flex items-center gap-0.5 p-0.5 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] backdrop-blur-md shadow-xs transition-all h-[36px]"
        role="group"
        aria-label="Language selection"
      >
        {locales.map((item) => {
          const active = item.code === locale;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelect(item.code as Locale)}
              className={`h-[28px] px-2.5 flex items-center justify-center rounded-full text-[10.5px] font-extrabold tracking-wider uppercase transition-all cursor-pointer ${
                active
                  ? "bg-[var(--brand-primary)] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]/70"
              }`}
              title={item.label}
            >
              {item.code}
            </button>
          );
        })}
      </div>

      {/* Desktop Kai Greeting Speech Bubble */}
      {showGreeting && currentGreeting && (
        <div
          role="status"
          aria-live="polite"
          className="absolute top-[calc(100%+10px)] right-0 w-[290px] p-3 rounded-2xl bg-[var(--surface)]/95 backdrop-blur-xl border border-[var(--border)] shadow-[0_16px_36px_rgba(7,22,47,0.18)] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Arrow notch */}
          <div className="absolute -top-1.5 right-6 w-3 h-3 rotate-45 bg-[var(--surface)] border-l border-t border-[var(--border)]" />

          <div className="relative flex items-start gap-3">
            {/* Kai Avatar with sapphire status ring */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--brand-primary)]/50 shadow-sm bg-[var(--surface-soft)]">
                <Image
                  src="/media/kai-cinematic/kai-avatar.webp"
                  alt="Kai"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover object-center"
                  priority
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--surface)] ring-1 ring-emerald-400/40" />
            </div>

            {/* Speech details */}
            <div className="flex-1 min-w-0 pr-3">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[11px] font-bold text-[var(--brand-primary)] tracking-wide">
                  Kai
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[var(--surface-soft)] text-[var(--text-secondary)] font-medium">
                  Studio Lead
                </span>
              </div>
              <p className="text-xs font-semibold text-[var(--text-primary)] leading-snug">
                {currentGreeting.greeting}
              </p>
              {currentGreeting.romaji && (
                <p className="text-[10px] italic text-[var(--brand-primary)]/80 mt-0.5 font-medium">
                  {currentGreeting.romaji}
                </p>
              )}
              <p className="text-[10px] text-[var(--text-secondary)] mt-1 line-clamp-1">
                {currentGreeting.note}
              </p>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowGreeting(false)}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--surface-soft)] transition-colors"
              aria-label="Dismiss greeting"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
