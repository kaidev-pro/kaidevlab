import type { Metadata } from "next";
import { DokkaiClient } from "@/components/dokkai-n3/dokkai-client";

export const metadata: Metadata = {
  title: "JLPT N3 Dokkai (読解 · Pemahaman Teks) — Kaidevlab Tools",
  description:
    "Modul latihan membaca bahasa Jepang JLPT N3 Dokkai lengkap dengan Furigana toggle, Audio native TTS per kalimat, dekonstruksi struktur kalimat, dan analisis jebakan pilihan ganda JLPT.",
  alternates: {
    canonical: "/tools/dokkai-n3/",
  },
  openGraph: {
    title: "JLPT N3 Dokkai (読解 · Pemahaman Teks) — Kaidevlab",
    description:
      "Latihan pemahaman bacaan bahasa Jepang JLPT N3 interaktif dengan Furigana toggle, audio kalimat, penyorot kalimat bukti, dan bedah opsi jebakan.",
    url: "https://kaidevlab.com/tools/dokkai-n3/",
    siteName: "Kaidevlab Tools",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JLPT N3 Dokkai (読解 · Pemahaman Teks)",
    description:
      "Latihan pemahaman bacaan bahasa Jepang JLPT N3 interaktif dengan Furigana toggle, audio kalimat, dan bedah opsi jebakan.",
  },
};

export default function DokkaiN3Page() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden">
      <DokkaiClient />
    </main>
  );
}
