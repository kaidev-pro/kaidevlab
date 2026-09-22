/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import Image from "next/image";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    ["Work", "/#work"],
    ["Learn", "/learn"],
    ["Lab Notes", "/#notes"],
    ["About", "/#about"],
    ["Contact", "/contact/"],
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
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
        <button
          className="icon-button theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to Daylight Lab" : "Switch to Midnight Hologram"}
          title={theme === "dark" ? "Daylight Lab" : "Midnight Hologram"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a className="talk desktop-talk" href="/contact/">Let's Talk</a>
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
        {navItems.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a className="mobile-talk" href="/contact/" onClick={() => setMenuOpen(false)}>Let's Talk</a>
      </nav>
    </header>
  );
}
