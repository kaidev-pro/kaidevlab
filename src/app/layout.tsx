import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PwaRegister } from "@/components/pwa-register";
import { LanguageProvider } from "@/lib/i18n/context";
import "./globals.css";

const inter = Inter({ variable: "--font-body", subsets: ["latin"] });
const cinzel = Cinzel({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kaidevlab.com"),
  title: "Kaidevlab — Kai’s Creative Technology Lab",
  description:
    "Kaidevlab is the personal creative technology lab of Kai, featuring AI products, developer tools, learning platforms, original stories, and visual experiments.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand/kaidevlab-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/kaidevlab-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kaidevlab",
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kaidevlab — Kai’s Creative Technology Lab",
    description:
      "AI products, developer tools, learning platforms, original stories, and visual experiments by Kai.",
    url: "https://kaidevlab.com",
    siteName: "Kaidevlab",
    type: "website",
    images: [{ url: "/media/kai-hero/kai-hero-poster.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaidevlab — Kai’s Creative Technology Lab",
    description:
      "Kai’s living creative technology lab for products, systems, experiments, and stories.",
    images: [{ url: "/media/kai-hero/kai-hero-poster.webp" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kaidevlab",
  url: "https://kaidevlab.com",
  description: "The personal creative technology lab of Kai.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cinzel.variable}`}>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#061126" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {try {const saved = localStorage.getItem('theme'); const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; document.documentElement.dataset.theme = saved || system || 'light';} catch (_) {document.documentElement.dataset.theme = 'light';}})();`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <LanguageProvider>
          <PwaRegister />
          <div className="noise-overlay" aria-hidden="true" />
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}

