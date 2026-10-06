import type { Metadata } from "next";
import { TangoN3Client } from "@/components/tango-n3/tango-n3-client";

export const metadata: Metadata = {
  title: "JLPT N3 Tango (単語 1800) — 1,800 Kosakata & Latihan Membaca",
  description:
    "Aplikasi web interaktif JLPT N3 Tango (重要1800語) lengkap 46 Bab dengan Flashcards, Furigana toggle, Audio native TTS, dan 20 Cerita Bacaan Dokkai (読んでみよう).",
  alternates: {
    canonical: "/tools/tango-n3/",
  },
  openGraph: {
    title: "JLPT N3 Tango (単語 1800) — Kaidevlab",
    description:
      "Aplikasi web interaktif 1,800 kosakata penting & 20 cerita latihan membaca (読んでみよう) lengkap dengan Audio Native TTS, Furigana Toggle, dan Kuis Dokkai.",
    url: "https://kaidevlab.com/tools/tango-n3/",
    siteName: "Kaidevlab Tools",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://kaidevlab.com/project-screenshots/tango-n3-og.png",
        width: 1200,
        height: 630,
        alt: "JLPT N3 Tango (単語 1800) — Kaidevlab",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JLPT N3 Tango (単語 1800)",
    description:
      "Aplikasi web interaktif 1,800 kosakata penting & 20 cerita latihan membaca (読んでみよう) dengan Audio Native TTS dan Kuis Dokkai.",
    images: ["https://kaidevlab.com/project-screenshots/tango-n3-og.png"],
  },
};

export default function TangoN3Page() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      <TangoN3Client />
    </div>
  );
}
