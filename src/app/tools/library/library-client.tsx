"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Layers, Calculator, Terminal, ArrowLeft } from "lucide-react";
import { CheatsheetView } from "@/components/fe-study/cheatsheet-view";
import { TracerView } from "@/components/fe-study/tracer-view";
import { useLanguage } from "@/lib/i18n/context";

type LibraryTab = "formulas" | "tracer";

const libraryI18n = {
  id: {
    backToLearn: "Kembali ke Portal Belajar",
    eyebrow: "Rak Digital & Alat Interaktif",
    title: "Digital Library & Interactive Formulas",
    desc: "Koleksi rumus hitungan ujian IT, kalkulator ketersediaan sistem, dan alat simulasi penelusuran algoritma.",
    tabFormulas: "Kalkulator & Rumus",
    tabTracer: "Pseudocode Step-Tracer",
  },
  en: {
    backToLearn: "Back to Learning Portal",
    eyebrow: "Digital Shelf & Interactive Tools",
    title: "Digital Library & Interactive Formulas",
    desc: "Collection of IT exam formulas, system availability calculators, and algorithm trace simulation tools.",
    tabFormulas: "Calculators & Formulas",
    tabTracer: "Pseudocode Step-Tracer",
  },
  ja: {
    backToLearn: "学習ポータルに戻る",
    eyebrow: "デジタルシェルフ＆演習ツール",
    title: "公式集＆インタラクティブ・トレーサー",
    desc: "国家試験の頻出計算公式、稼働率シミュレーター、およびアルゴリズムのトレース表演習ツール。",
    tabFormulas: "計算公式＆ツール",
    tabTracer: "疑似言語トレーサー",
  },
};

export function LibraryClient() {
  const [activeTab, setActiveTab] = useState<LibraryTab>("formulas");
  const { locale } = useLanguage();
  const t = libraryI18n[locale] || libraryI18n.id;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Navigation Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)]">
        <Link href="/" className="inline-flex items-center min-h-6 hover:text-[var(--text-primary)] transition-colors">
          Home
        </Link>
        <ChevronRight size={12} className="opacity-40" />
        <Link href="/learn/" className="inline-flex items-center min-h-6 hover:text-[var(--text-primary)] transition-colors">
          Learn
        </Link>
        <ChevronRight size={12} className="opacity-40" />
        <span className="text-[var(--brand-primary)]">Digital Library</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.eyebrow}</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-[var(--text-primary)] font-sans tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {t.desc}
          </p>
        </div>

        <Link
          href="/learn/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-[var(--brand-primary)]/40 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shrink-0 self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.backToLearn}</span>
        </Link>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center p-1 rounded-2xl bg-[var(--surface-secondary)]/50 border border-[var(--border-subtle)] w-fit gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("formulas")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 ${
            activeTab === "formulas"
              ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{t.tabFormulas}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tracer")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 ${
            activeTab === "tracer"
              ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>{t.tabTracer}</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="pt-2">
        {activeTab === "formulas" && <CheatsheetView />}
        {activeTab === "tracer" && (
          <TracerView onBackToMenu={() => setActiveTab("formulas")} />
        )}
      </div>
    </div>
  );
}
