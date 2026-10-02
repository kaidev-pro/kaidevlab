import type { Metadata } from "next";
import { LibraryClient } from "./library-client";

export const metadata: Metadata = {
  title: "Digital Library & Interactive Formulas — Kaidevlab Tools",
  description:
    "Perpustakaan digital interaktif Kaidevlab: kalkulator rumus ujian FE, simulasi ketersediaan sistem, dan pseudocode step-tracer.",
  alternates: { canonical: "/tools/library/" },
};

export default function LibraryPage() {
  return (
    <main className="min-h-screen">
      <LibraryClient />
    </main>
  );
}
