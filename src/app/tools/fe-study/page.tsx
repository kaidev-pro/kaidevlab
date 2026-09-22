import type { Metadata } from "next";
import { LearnClient } from "@/app/learn/learn-client";

export const metadata: Metadata = {
  title: "FE Study Hub (基本情報技術者試験) — Kaidevlab Tools",
  description:
    "Interactive IT certification study tool for Japan's FE exam (基本情報技術者試験).",
};

export default function FeStudyToolPage() {
  return (
    <main className="min-h-screen">
      <LearnClient />
    </main>
  );
}
