/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import Image from "next/image";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader() {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    [t.nav.work, "/#work"],
    [t.nav.learn, "/learn"],
    [t.nav.labNotes, "/#notes"],
    [t.nav.about, "/#about"],
    [t.nav.contact, "/contact/"],
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  return (
    <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
      <a className="brand-logo" href="/" aria-label="Kaidevlab home">
        <Image
          className="logo-light"
          src="/brand/kaidevlab-logo-light.webp"
          alt="Kaidevlab"
          fill
          sizes="220px"
          priority
        />
        <Image
          className="logo-dark"
          src="/brand/kaidevlab-logo-dark.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="220px"
          priority
        />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a href={href} key={href}>{label}</a>
        ))}
      </nav>

      <div className="header-actions">
        <LanguageSwitcher className="hidden sm:inline-flex" />

        <button
          className="icon-button theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to Daylight Lab" : "Switch to Midnight Hologram"}
          title={theme === "dark" ? "Daylight Lab" : "Midnight Hologram"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a className="talk desktop-talk" href="/contact/">{t.nav.letsTalk}</a>
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
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
        <a className="mobile-talk" href="/contact/" onClick={() => setMenuOpen(false)}>{t.nav.letsTalk}</a>
      </nav>
    </header>
  );
}
