import type { Metadata } from "next";
import { TangoN3Client } from "@/components/tango-n3/tango-n3-client";

export const metadata: Metadata = {
  title: "Shin Kanzen Master Tango N3 (新完全マスター単語N3) — Kaidevlab Tools",
  description:
    "Interactive JLPT N3 vocabulary flashcards & study hub based on Shin Kanzen Master Tango N3 (重要2200語) with official collocations (連語), example sentences, and native Japanese audio.",
};

export default function TangoN3Page() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden">
      <TangoN3Client />
    </main>
  );
}
