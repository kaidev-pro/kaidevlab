/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import Image from "next/image";
import { Menu, Moon, Sun, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { LanguageSwitcher } from "./language-switcher";
import { openCommandPalette } from "@/lib/global-modals-store";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound } from "@/lib/global-sound";

export function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isStudySubdomain, setIsStudySubdomain] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      setIsStudySubdomain(host.startsWith("study.") || host.startsWith("learn."));
    }
  }, []);

  const navItems = isStudySubdomain
    ? ([
        ["Home", "/"],
        ["N3 Suite", "/tools/n3-suite/"],
        ["Tango", "/tools/tango-n3/"],
        ["Bunpou", "/tools/bunpou-n3/"],
        ["Dokkai", "/tools/dokkai-n3/"],
        ["FE Study", "/tools/fe-study/"],
      ] as const)
    : ([
        [t.nav.work, "/#work"],
        [t.nav.learn, "https://study.kaidevlab.com/"],
        [t.nav.labNotes, "/#notes"],
        [t.nav.about, "/#about"],
        [t.nav.contact, "/contact/"],
      ] as const);

  const isLinkActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    if (href.startsWith("http") || href.startsWith("/#")) return false;
    const cleanHref = href.replace(/\/$/, "");
    const cleanPath = pathname.replace(/\/$/, "");
    return cleanPath === cleanHref || cleanPath.startsWith(cleanHref + "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Sync theme on mount
    const saved = localStorage.getItem("theme");
    const activeTheme = saved === "dark" ? "dark" : "light";
    setTheme(activeTheme);
    document.documentElement.dataset.theme = activeTheme;

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="flex items-center gap-2">
        <a className="brand-logo" href="/" aria-label={isStudySubdomain ? "Kaidevlab Study home" : "Kaidevlab home"}>
          {isStudySubdomain ? (
            <>
              <Image
                className="logo-light"
                src="/brand/kaidevlab-study-logo-light.webp"
                alt="Kaidevlab Study"
                fill
                sizes="180px"
                priority
              />
              <Image
                className="logo-dark"
                src="/brand/kaidevlab-study-logo-dark.webp"
                alt=""
                aria-hidden="true"
                fill
                sizes="180px"
                loading="lazy"
              />
            </>
          ) : (
            <>
              <Image
                className="logo-light"
                src="/brand/kaidevlab-logo-light.webp"
                alt="Kaidevlab"
                fill
                sizes="180px"
                priority
              />
              <Image
                className="logo-dark"
                src="/brand/kaidevlab-logo-dark.webp"
                alt=""
                aria-hidden="true"
                fill
                sizes="180px"
                loading="lazy"
              />
            </>
          )}
        </a>
      </div>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => {
          const active = isLinkActive(href);
          return (
            <a
              href={href}
              key={href}
              className={active ? "is-active" : undefined}
            >
              {label}
            </a>
          );
        })}
      </nav>

      <div className="header-actions">
        <button
          className="icon-button command-search-toggle"
          type="button"
          onClick={() => {
            triggerHaptic("light");
            playTapSound();
            openCommandPalette();
          }}
          aria-label="Cari Cepat (Cmd + K)"
          title="Cari Cepat (Ctrl + K / Cmd + K)"
        >
          <Search size={16} />
        </button>

        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>

        <button
          className="icon-button theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to Daylight Lab" : "Switch to Midnight Hologram"}
          title={theme === "dark" ? "Daylight Lab" : "Midnight Hologram"}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <a className="talk desktop-talk" href={isStudySubdomain ? "https://kaidevlab.com" : "/contact/"}>
          {isStudySubdomain ? "Portofolio ↗" : t.nav.letsTalk}
        </a>
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
        <div className="px-1 py-1 mb-2 border-b border-[var(--border)] pb-2.5">
          <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2 px-1">Language</p>
          <LanguageSwitcher mobile />
        </div>
        {navItems.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a className="mobile-talk" href={isStudySubdomain ? "https://kaidevlab.com" : "/contact/"} onClick={() => setMenuOpen(false)}>
          {isStudySubdomain ? "Kembali ke Portofolio Utama ↗" : t.nav.letsTalk}
        </a>
      </nav>
    </header>
  );
}
