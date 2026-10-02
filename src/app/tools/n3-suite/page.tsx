import type { Metadata } from "next";
import { N3SuiteClient } from "./n3-suite-client";

export const metadata: Metadata = {
  title: "JLPT N3 Suite (単語・読解・文法 総合学習) — Kaidevlab Tools",
  description:
    "Pusat pembelajaran bahasa Jepang JLPT N3 terpadu: 単語 (Tango 1800 Kosakata), 読解 (Dokkai Pemahaman Teks), dan 文法 (Bunpou Tata Bahasa).",
  alternates: {
    canonical: "/tools/n3-suite/",
  },
  openGraph: {
    title: "JLPT N3 Suite (単語・読解・文法 総合学習) — Kaidevlab",
    description:
      "Portal pembelajaran terpadu JLPT N3: Kosakata 1.800 kata, Analisis Teks Dokkai, dan Tata Bahasa Bunpou.",
    url: "https://kaidevlab.com/tools/n3-suite/",
    siteName: "Kaidevlab Tools",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JLPT N3 Suite (単語・読解・文法 総合学習)",
    description:
      "Portal pembelajaran terpadu JLPT N3: Tango, Dokkai, dan Bunpou.",
  },
};

export default function N3SuitePage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[var(--background)]">
      <N3SuiteClient />
    </main>
  );
}
