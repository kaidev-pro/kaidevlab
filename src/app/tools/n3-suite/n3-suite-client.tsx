"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
  Award,
  ChevronRight,
  Check,
  Flame,
  FileText,
  Compass,
} from "lucide-react";
import { loadTangoProgress } from "@/lib/tango-n3-storage";
import { loadDokkaiProgress } from "@/components/dokkai-n3/dokkai-storage";
import { DOKKAI_PASSAGES } from "@/data/dokkai-n3/passages";

export function N3SuiteClient() {
  const [tangoStats, setTangoStats] = useState({ mastered: 0, total: 1800, chaptersUnlocked: 1 });
  const [dokkaiStats, setDokkaiStats] = useState({ completed: 0, total: DOKKAI_PASSAGES.length, accuracy: 0 });

  useEffect(() => {
    // Load Tango stats
    const tProg = loadTangoProgress();
    setTangoStats({
      mastered: tProg.masteredCardIds?.length || 0,
      total: 1800,
      chaptersUnlocked: tProg.unlockedChapterIds?.length || 1,
    });

    // Load Dokkai stats
    const dProg = loadDokkaiProgress();
    const acc = dProg.totalAttempts > 0 ? Math.round((dProg.totalCorrect / dProg.totalAttempts) * 100) : 0;
    setDokkaiStats({
      completed: dProg.completedPassageIds?.length || 0,
      total: DOKKAI_PASSAGES.length,
      accuracy: acc,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] pb-24 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/learn"
              className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
              title="Kembali ke Dashboard Learn"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                  JLPT N3 Mastery Suite
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold">
                  新完全マスター
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-tight">
                Pusat Pembelajaran Bahasa Jepang N3 Terpadu
              </h1>
            </div>
          </div>

          <Link
            href="/tools/fe-study"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand-primary)]/50 transition-all"
          >
            <span>Buka FE Study Hub</span>
            <ChevronRight size={13} />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-10">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface-soft)]/50 to-[var(--surface)] p-6 sm:p-10 shadow-lg">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              <Sparkles size={12} /> Kurikulum Resmi Shin Kanzen Master
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-japanese leading-tight">
              日本語能力試験 N3 総合学習
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Tingkatkan kemahiran bahasa Jepang N3 Anda dari level teori dasar menuju pemahaman wacana tingkat tinggi.
              Dirancang untuk mematangkan kosakata, analisis dekonstruksi kalimat majemuk, dan persiapan tata bahasa.
            </p>

            {/* Quick Readiness Summary Bar */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs">
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono">
                  語
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Kosakata (Tango)</div>
                  <div className="font-bold text-[var(--text-primary)]">
                    {tangoStats.mastered} <span className="opacity-60 font-normal">/ {tangoStats.total} kata</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono">
                  読
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Pemahaman (Dokkai)</div>
                  <div className="font-bold text-[var(--text-primary)]">
                    {dokkaiStats.completed} <span className="opacity-60 font-normal">/ {dokkaiStats.total} bab ({dokkaiStats.accuracy}% akurasi)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold font-mono">
                  文
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Tata Bahasa (Bunpou)</div>
                  <div className="font-bold text-[var(--text-secondary)]">Fase Berikutnya</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Modules Grid */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">
              Tiga Pilar Modul Pembelajaran N3
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Pilih pilar materi yang ingin Anda latih hari ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MODULE 1: TANGO N3 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-md flex flex-col justify-between gap-6 hover:border-[var(--brand-primary)]/50 transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center font-bold text-lg font-japanese">
                    単語
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                    Aktif · 46 Bab
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                    Shin Kanzen Tango N3
                  </h4>
                  <p className="text-xs text-[var(--brand-primary)] font-mono font-semibold">
                    重要1800語 · Flashcard & Quiz
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Kuasai 1.800 kata esensial lengkap dengan furigana, audio native TTS, kuis bab harian, sistem review
                  Spaced Repetition (SRS), dan 20 cerita bacaan pendek.
                </p>

                <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs text-[var(--text-secondary)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Kemajuan Hafalan:</span>
                    <b className="text-[var(--text-primary)]">
                      {Math.round((tangoStats.mastered / (tangoStats.total || 1)) * 100)}%
                    </b>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${Math.round((tangoStats.mastered / (tangoStats.total || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <Link
                href="/tools/tango-n3"
                className="w-full py-3 rounded-2xl bg-[var(--surface-soft)] hover:bg-[var(--brand-primary)] text-[var(--text-primary)] hover:text-white border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs group-hover:shadow-sm"
              >
                <span>Buka Modul Kosakata</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* MODULE 2: DOKKAI N3 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[var(--surface)] border-2 border-[var(--brand-primary)]/60 shadow-lg flex flex-col justify-between gap-6 relative">
              <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-[var(--brand-primary)] text-white text-[10px] font-bold uppercase tracking-wider">
                Fokus Baru
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center font-bold text-lg font-japanese">
                    読解
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold mr-16">
                    8 Bab Tersedia
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">
                    Shin Kanzen Dokkai N3
                  </h4>
                  <p className="text-xs text-[var(--brand-primary)] font-mono font-semibold">
                    文章読解 · Teknik Analisis Teks
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Latihan dekonstruksi kalimat majemuk: melacak rujukan kata tunjuk (指示語), menemukan subjek yang
                  dihilangkan, mengidentifikasi analogi, dan bedah opsi jebakan ala buku resmi Shin Kanzen.
                </p>

                <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs text-[var(--text-secondary)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Selesai Dibaca:</span>
                    <b className="text-[var(--text-primary)]">
                      {dokkaiStats.completed} / {dokkaiStats.total} Bab
                    </b>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${Math.round((dokkaiStats.completed / (dokkaiStats.total || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <Link
                href="/tools/dokkai-n3"
                className="w-full py-3 rounded-2xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
              >
                <span>Mulai Latihan Membaca</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* MODULE 3: BUNPOU N3 (NEXT PHASE) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[var(--surface-soft)]/50 border border-[var(--border)] opacity-85 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center font-bold text-lg font-japanese">
                    文法
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] text-[11px] font-bold">
                    Roadmap Fase Berikutnya
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">
                    Shin Kanzen Bunpou N3
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] font-mono font-semibold">
                    文法形式 · Tata Bahasa & Partikel
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Pembedahan nuansa pola kalimat yang sering mengecoh (seperti 〜わけだ vs 〜わけではない, 〜ことに
                  なっている vs 〜ことになった), latihan susun urutan kata (*seiretsu mondai*), dan partikel.
                </p>

                <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-secondary)]">
                  <span>Target: Dimulai segera setelah modul Dokkai dikuasai dengan stabil.</span>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="w-full py-3 rounded-2xl bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] text-xs font-bold cursor-not-allowed opacity-60"
              >
                Akan Hadir di Fase Berikutnya
              </button>
            </div>
          </div>
        </div>

        {/* Integration Callout with FE Study */}
        <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Jembatan ke Ujian Profesional
            </span>
            <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
              Hubungan Langsung dengan Ujian FE Jepang (基本情報技術者試験)
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Penguasaan membaca Dokkai N3 akan melipatgandakan kecepatan Anda dalam memahami soal-soal panjang di ujian FE,
              khususnya teks studi kasus manajemen sistem dan regulasi hukum kontrak.
            </p>
          </div>

          <Link
            href="/tools/fe-study"
            className="px-5 py-3 rounded-2xl bg-[var(--surface-soft)] hover:bg-[var(--border)] text-[var(--text-primary)] text-xs font-bold border border-[var(--border)] transition-all shrink-0 flex items-center gap-2"
          >
            <span>Buka FE Study Hub</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    </div>
  );
}
