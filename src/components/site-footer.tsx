"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand-logo" href="/" aria-label="Kaidevlab home">
          <Image className="logo-light" src="/brand/kaidevlab-logo-light.webp" alt="Kaidevlab" fill sizes="220px" />
          <Image className="logo-dark" src="/brand/kaidevlab-logo-dark.webp" alt="" aria-hidden="true" fill sizes="220px" />
        </a>
        <p>{t.footer.tagline}</p>
      </div>
      <nav className="footer-links" aria-label="Footer links">
        <a href="https://x.com/Kiminoheroo" target="_blank" rel="noreferrer">X</a>
        <a href="https://github.com/kaidev-pro" target="_blank" rel="noreferrer">GitHub</a>
        <a href="mailto:baguswirantowicaksono@gmail.com">Email</a>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
      </nav>
      <small>{t.footer.rights}</small>
    </footer>
  );
}
