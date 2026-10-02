import type { Metadata } from "next";
import { BunpouClient } from "@/components/bunpou-n3/bunpou-client";

export const metadata: Metadata = {
  title: "Shin Kanzen Master Bunpou N3 (新完全マスター文法N3) — Kaidevlab Tools",
  description:
    "Modul latihan tata bahasa Jepang Shin Kanzen Master N3 Bunpou lengkap dengan rumus sambungan (接続), pembedah nuansa pola mirip (〜わけだ/〜わけではない/〜わけがない), audio TTS per kalimat, kuis bentuk kata kerja, dan latihan susun kalimat bintang ★ (Seiretsu Mondai).",
  alternates: {
    canonical: "/tools/bunpou-n3/",
  },
  openGraph: {
    title: "Shin Kanzen Master Bunpou N3 (新完全マスター文法N3) — Kaidevlab",
    description:
      "Kuasai tata bahasa JLPT N3 dengan pembedahan rumus sambungan, nuansa pembeda, kuis pilihan ganda, dan latihan susun urutan kata bintang (並べ替え問題).",
    url: "https://kaidevlab.com/tools/bunpou-n3/",
    siteName: "Kaidevlab Tools",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shin Kanzen Master Bunpou N3 (新完全マスター文法N3)",
    description:
      "Modul interaktif tata bahasa JLPT N3: Rumus sambungan, komparasi nuansa, audio TTS, dan latihan susun kalimat bintang ★.",
  },
};

export default function BunpouN3Page() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[var(--background)]">
      <BunpouClient />
    </main>
  );
}
