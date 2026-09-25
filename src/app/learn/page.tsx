import type { Metadata } from "next";
import { LearnClient } from "./learn-client";

export const metadata: Metadata = {
  title: "FE Study Hub (基本情報技術者試験) — Kaidevlab",
  description:
    "Cognitive study gym for Japan's Fundamental Information Technology Engineer Examination (FE / 基本情報技術者試験) with Active Recall, Spaced Repetition, and visual analogies.",
};

export default function LearnPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden">
      <LearnClient />
    </main>
  );
}
