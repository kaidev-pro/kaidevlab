import type { Metadata } from "next";
import { AcademyPortalClient } from "@/components/academy/academy-portal-client";

export const metadata: Metadata = {
  title: "Kaidevlab Academy & Research Hub — Portal Belajar & Perpustakaan",
  description:
    "Portal pembelajaran terpadu Kaidevlab. Jelajahi jalur belajar Shin Kanzen Master Tango N3, Fundamental FE Exam, English for Engineers, dan perpustakaan digital interaktif.",
};

export default function LearnPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden">
      <AcademyPortalClient />
    </main>
  );
}
