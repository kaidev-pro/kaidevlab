import type { Metadata } from "next";
import { AcademyPortalClient } from "@/components/academy/academy-portal-client";

export const metadata: Metadata = {
  title: "Kaidevlab Academy & Research Hub — Portal Belajar & Perpustakaan",
  description:
    "Portal pembelajaran terpadu Kaidevlab. Jelajahi jalur belajar JLPT N3 Suite (Tango, Dokkai, Bunpou), Fundamental FE Exam, English for Engineers, dan perpustakaan digital interaktif.",
  alternates: { canonical: "/learn/" },
  openGraph: {
    title: "Kaidevlab Academy & Research Hub — Portal Belajar & Perpustakaan",
    description:
      "Portal pembelajaran terpadu Kaidevlab: JLPT N3 Suite (Tango, Dokkai, Bunpou), Fundamental FE Exam, dan perpustakaan digital interaktif.",
    url: "https://kaidevlab.com/learn/",
    siteName: "Kaidevlab",
    type: "website",
    images: [{ url: "/media/kai-hero/kai-hero-poster.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaidevlab Academy & Research Hub — Portal Belajar & Perpustakaan",
    description:
      "Portal pembelajaran terpadu Kaidevlab: JLPT N3 Suite, FE Exam, dan perpustakaan digital interaktif.",
    images: [{ url: "/media/kai-hero/kai-hero-poster.webp" }],
  },
};

export default function LearnPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden">
      <AcademyPortalClient />
    </main>
  );
}
