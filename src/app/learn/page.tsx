import type { Metadata } from "next";
import { AcademyPortalClient } from "@/components/academy/academy-portal-client";

export const metadata: Metadata = {
  title: "Kaidevlab Study — Portal Belajar & Riset Terpadu",
  description:
    "Portal pembelajaran terpadu Kaidevlab Study. Jelajahi jalur belajar JLPT N3 Suite (Tango, Dokkai, Bunpou), Fundamental FE Exam, English for Engineers, dan perpustakaan digital interaktif.",
  alternates: { canonical: "/learn/" },
  openGraph: {
    title: "Kaidevlab Study — Portal Belajar & Riset Terpadu",
    description:
      "Portal pembelajaran terpadu Kaidevlab Study: JLPT N3 Suite (Tango, Dokkai, Bunpou), Fundamental FE Exam, dan perpustakaan digital interaktif.",
    url: "https://study.kaidevlab.com/",
    siteName: "Kaidevlab Study",
    type: "website",
    images: [{ url: "/brand/kaidevlab-study-logo-light.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaidevlab Study — Portal Belajar & Riset Terpadu",
    description:
      "Portal pembelajaran terpadu Kaidevlab Study: JLPT N3 Suite, FE Exam, dan perpustakaan digital interaktif.",
    images: [{ url: "/brand/kaidevlab-study-logo-light.png" }],
  },
};

export default function LearnPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden">
      <AcademyPortalClient />
    </main>
  );
}
