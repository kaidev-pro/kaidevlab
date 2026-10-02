"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Target,
  Calendar,
  Zap,
  Brain,
  TrendingUp,
  Star,
  RotateCcw,
  Play,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { loadTangoProgress } from "@/lib/tango-n3-storage";
import { loadDokkaiProgress } from "@/components/dokkai-n3/dokkai-storage";
import { DOKKAI_PASSAGES } from "@/data/dokkai-n3/passages";
import { loadBunpouProgress } from "@/components/bunpou-n3/bunpou-storage";
import { BUNPOU_ITEMS } from "@/data/bunpou-n3/grammar-items";

// ───────── Study Plan Logic ─────────
const DAYS_JP = ["日", "月", "火", "水", "木", "金", "土"];
const DAYS_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

interface DailyPlan {
  dayIndex: number; // 0=Sun..6=Sat
  tangoTask: string;
  tangoIcon: React.ReactNode;
  dokkaiTask: string;
  dokkaiIcon: React.ReactNode;
  focusLabel: string;
  isLightDay: boolean; // review-only day
}

function getWeeklyPlan(): DailyPlan[] {
  return [
    {
      dayIndex: 0,
      tangoTask: "🔄 Weak Cards marathon — perbaiki kelemahan",
      tangoIcon: <RotateCcw size={14} />,
      dokkaiTask: "Review passage yang di-bookmark",
      dokkaiIcon: <Star size={14} />,
      focusLabel: "Hari Perbaikan",
      isLightDay: true,
    },
    {
      dayIndex: 1,
      tangoTask: "1 bab baru + SRS review",
      tangoIcon: <Zap size={14} />,
      dokkaiTask: "1 passage teknik dasar",
      dokkaiIcon: <Brain size={14} />,
      focusLabel: "Materi Fresh",
      isLightDay: false,
    },
    {
      dayIndex: 2,
      tangoTask: "SRS review only — konsolidasi",
      tangoIcon: <RotateCcw size={14} />,
      dokkaiTask: "1 passage teknik dasar",
      dokkaiIcon: <Brain size={14} />,
      focusLabel: "Konsolidasi",
      isLightDay: true,
    },
    {
      dayIndex: 3,
      tangoTask: "1 bab baru + SRS review",
      tangoIcon: <Zap size={14} />,
      dokkaiTask: "1 passage latihan format ujian",
      dokkaiIcon: <Target size={14} />,
      focusLabel: "Combo Vocab + Latihan",
      isLightDay: false,
    },
    {
      dayIndex: 4,
      tangoTask: "SRS review only — konsolidasi",
      tangoIcon: <RotateCcw size={14} />,
      dokkaiTask: "1 cerita bacaan (読んでみよう)",
      dokkaiIcon: <BookOpen size={14} />,
      focusLabel: "Relaksasi + Immersion",
      isLightDay: true,
    },
    {
      dayIndex: 5,
      tangoTask: "1 bab baru + SRS review",
      tangoIcon: <Zap size={14} />,
      dokkaiTask: "1 passage latihan format ujian",
      dokkaiIcon: <Target size={14} />,
      focusLabel: "Sprint Akhir Minggu",
      isLightDay: false,
    },
    {
      dayIndex: 6,
      tangoTask: "📝 Kuis bab — unlock chapter berikutnya",
      tangoIcon: <Award size={14} />,
      dokkaiTask: "1-2 cerita bacaan santai",
      dokkaiIcon: <BookOpen size={14} />,
      focusLabel: "Validasi Penguasaan",
      isLightDay: false,
    },
  ];
}

type StudyPhase = {
  phase: number;
  label: string;
  weekRange: string;
  tangoTarget: string;
  dokkaiTarget: string;
  checkpoint: string;
  color: string;
};

const MILESTONES: StudyPhase[] = [
  {
    phase: 1,
    label: "Fondasi Kosakata",
    weekRange: "Minggu 1-6",
    tangoTarget: "Hafal 1.000+ kata (Bab 1-25)",
    dokkaiTarget: "Selesai 6 teknik dasar",
    checkpoint: "Kuis bab rata-rata ≥80%",
    color: "#3b82f6",
  },
  {
    phase: 2,
    label: "Ekspansi & Praktik",
    weekRange: "Minggu 7-10",
    tangoTarget: "1.500+ kata (Bab 26-40)",
    dokkaiTarget: "Semua format Dokkai dikerjakan",
    checkpoint: "Akurasi Dokkai ≥70%",
    color: "#f59e0b",
  },
  {
    phase: 3,
    label: "Penguatan & Bunpou",
    weekRange: "Minggu 11-14",
    tangoTarget: "1.800 kata tuntas (Bab 41-46)",
    dokkaiTarget: "Bunpou dimulai + review total",
    checkpoint: "Semua SRS ≥ Box 3",
    color: "#10b981",
  },
  {
    phase: 4,
    label: "Simulasi Ujian",
    weekRange: "Minggu 15-16",
    tangoTarget: "Review final Box 1-2",
    dokkaiTarget: "Full mock test",
    checkpoint: "Simulasi 60 menit → selesai 50 menit",
    color: "#8b5cf6",
  },
];

function determineCurrentPhase(masteredCount: number, dokkaiCompleted: number): number {
  if (masteredCount >= 1500 && dokkaiCompleted >= 8) return 3;
  if (masteredCount >= 1000 && dokkaiCompleted >= 6) return 2;
  if (masteredCount >= 500) return 1;
  return 0;
}

export function N3SuiteClient() {
  const [tangoStats, setTangoStats] = useState({ mastered: 0, total: 1800, chaptersUnlocked: 1, streak: 0, weakCount: 0 });
  const [dokkaiStats, setDokkaiStats] = useState({ completed: 0, total: DOKKAI_PASSAGES.length, accuracy: 0, bookmarked: 0 });
  const [bunpouStats, setBunpouStats] = useState({ studied: 0, total: BUNPOU_ITEMS.length, accuracy: 0, bookmarked: 0 });
  const [showWeeklyDetail, setShowWeeklyDetail] = useState(false);

  useEffect(() => {
    // Load Tango stats
    const tProg = loadTangoProgress();
    const reviewSet = new Set(tProg.reviewCardIds || []);
    const masteredSet = new Set(tProg.masteredCardIds || []);
    const weakCount = Object.keys(tProg.cardMistakes || {}).filter(
      (id) => (tProg.cardMistakes[id] || 0) > 0 && (!masteredSet.has(id) || reviewSet.has(id))
    ).length;
    setTangoStats({
      mastered: tProg.masteredCardIds?.length || 0,
      total: 1800,
      chaptersUnlocked: tProg.unlockedChapterIds?.length || 1,
      streak: tProg.streak || 0,
      weakCount,
    });

    // Load Dokkai stats
    const dProg = loadDokkaiProgress();
    const acc = dProg.totalAttempts > 0 ? Math.round((dProg.totalCorrect / dProg.totalAttempts) * 100) : 0;
    setDokkaiStats({
      completed: dProg.completedPassageIds?.length || 0,
      total: DOKKAI_PASSAGES.length,
      accuracy: acc,
      bookmarked: dProg.bookmarkedPassageIds?.length || 0,
    });

    // Load Bunpou stats
    const bProg = loadBunpouProgress();
    const bAcc = bProg.totalAttempts > 0 ? Math.round((bProg.totalCorrect / bProg.totalAttempts) * 100) : 0;
    setBunpouStats({
      studied: bProg.studiedPatternIds?.length || 0,
      total: BUNPOU_ITEMS.length,
      accuracy: bAcc,
      bookmarked: bProg.bookmarkedPatternIds?.length || 0,
    });
  }, []);

  const today = new Date();
  const dayIndex = today.getDay(); // 0=Sun..6=Sat
  const weeklyPlan = useMemo(() => getWeeklyPlan(), []);
  const todayPlan = weeklyPlan[dayIndex];
  const currentPhase = determineCurrentPhase(tangoStats.mastered, dokkaiStats.completed);

  // Calculate daily cycle progress estimate across all 3 pillars
  const tangoPercent = Math.round((tangoStats.mastered / (tangoStats.total || 1)) * 100);
  const dokkaiPercent = Math.round((dokkaiStats.completed / (dokkaiStats.total || 1)) * 100);
  const bunpouPercent = Math.round((bunpouStats.studied / (bunpouStats.total || 1)) * 100);
  const overallPercent = Math.round((tangoPercent * 0.4 + dokkaiPercent * 0.3 + bunpouPercent * 0.3));

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

        {/* ══════════════════════════════════════════════════════════════════
            📅 TODAY'S STUDY PLAN — The Core Feature
            ══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
                <Calendar size={20} className="text-[var(--brand-primary)]" />
                Rencana Belajar Hari Ini
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {DAYS_ID[dayIndex]}, {today.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                {" · "}
                <span className="font-bold text-[var(--brand-primary)]">{todayPlan.focusLabel}</span>
              </p>
            </div>
            {tangoStats.streak > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                <Flame size={14} className="text-orange-500" />
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                  {tangoStats.streak} hari streak
                </span>
              </div>
            )}
          </div>

          {/* Daily 3-Phase Cycle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phase 1: Tango SRS + New */}
            <div className="group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-blue-500/40 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-bold">
                    01
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-500">Fase 1</div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">Tango · 10 menit</div>
                  </div>
                </div>
                <Clock size={14} className="text-[var(--text-secondary)]" />
              </div>
              <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 mb-3">
                <div className="flex items-center gap-2 text-xs text-[var(--text-primary)] font-medium">
                  {todayPlan.tangoIcon}
                  <span>{todayPlan.tangoTask}</span>
                </div>
              </div>
              <Link
                href="/tools/tango-n3"
                className="w-full py-2.5 rounded-xl bg-[var(--surface-soft)] hover:bg-blue-500 text-[var(--text-primary)] hover:text-white border border-[var(--border)] hover:border-blue-500 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Play size={12} />
                Mulai Tango
              </Link>
            </div>

            {/* Phase 2: Dokkai */}
            <div className="group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-amber-500/40 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-bold">
                    02
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">Fase 2</div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">Dokkai · 15 menit</div>
                  </div>
                </div>
                <Clock size={14} className="text-[var(--text-secondary)]" />
              </div>
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 mb-3">
                <div className="flex items-center gap-2 text-xs text-[var(--text-primary)] font-medium">
                  {todayPlan.dokkaiIcon}
                  <span>{todayPlan.dokkaiTask}</span>
                </div>
              </div>
              <Link
                href="/tools/dokkai-n3"
                className="w-full py-2.5 rounded-xl bg-[var(--surface-soft)] hover:bg-amber-500 text-[var(--text-primary)] hover:text-white border border-[var(--border)] hover:border-amber-500 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Play size={12} />
                Mulai Dokkai
              </Link>
            </div>

            {/* Phase 3: Weak Cards */}
            <div className="group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-rose-500/40 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-xs font-bold">
                    03
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-500">Fase 3</div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">Review · 5 menit</div>
                  </div>
                </div>
                <Clock size={14} className="text-[var(--text-secondary)]" />
              </div>
              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 mb-3">
                <div className="flex items-center gap-2 text-xs text-[var(--text-primary)] font-medium">
                  <RotateCcw size={14} />
                  <span>
                    {tangoStats.weakCount > 0
                      ? `Perbaiki ${tangoStats.weakCount} kata lemah`
                      : "Belum ada weak cards — lanjut review SRS!"}
                  </span>
                </div>
              </div>
              <Link
                href="/tools/tango-n3"
                className="w-full py-2.5 rounded-xl bg-[var(--surface-soft)] hover:bg-rose-500 text-[var(--text-primary)] hover:text-white border border-[var(--border)] hover:border-rose-500 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Play size={12} />
                Weak Cards
              </Link>
            </div>
          </div>

          {/* Weekly Rotation Expander */}
          <button
            type="button"
            onClick={() => setShowWeeklyDetail(!showWeeklyDetail)}
            className="w-full py-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--brand-primary)]/40 transition-all flex items-center justify-center gap-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <Calendar size={14} />
            <span>Lihat Rotasi Mingguan Lengkap</span>
            {showWeeklyDetail ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showWeeklyDetail && (
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[var(--surface-soft)] border-b border-[var(--border)]">
                      <th className="px-4 py-3 text-left font-bold text-[var(--text-secondary)] uppercase tracking-wider">Hari</th>
                      <th className="px-4 py-3 text-left font-bold text-blue-500 uppercase tracking-wider">Tango</th>
                      <th className="px-4 py-3 text-left font-bold text-amber-500 uppercase tracking-wider">Dokkai / Reading</th>
                      <th className="px-4 py-3 text-center font-bold text-[var(--text-secondary)] uppercase tracking-wider">Fokus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyPlan.map((plan, i) => {
                      // Reorder to Mon-Sun
                      const reordered = [1, 2, 3, 4, 5, 6, 0];
                      const idx = reordered[i];
                      const p = weeklyPlan[idx];
                      const isToday = idx === dayIndex;
                      return (
                        <tr
                          key={idx}
                          className={`border-b border-[var(--border)] last:border-0 transition-colors ${
                            isToday
                              ? "bg-[var(--brand-primary)]/5 border-l-2 border-l-[var(--brand-primary)]"
                              : "hover:bg-[var(--surface-soft)]/50"
                          }`}
                        >
                          <td className="px-4 py-3 font-bold text-[var(--text-primary)]">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center text-[10px] font-mono font-bold">
                                {DAYS_JP[idx]}
                              </span>
                              <span>{DAYS_ID[idx]}</span>
                              {isToday && (
                                <span className="px-1.5 py-0.5 rounded-md bg-[var(--brand-primary)] text-white text-[9px] font-bold">
                                  HARI INI
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[var(--text-secondary)]">
                            <div className="flex items-center gap-1.5">
                              {p.tangoIcon}
                              <span>{p.tangoTask}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[var(--text-secondary)]">
                            <div className="flex items-center gap-1.5">
                              {p.dokkaiIcon}
                              <span>{p.dokkaiTask}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.isLightDay
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            }`}>
                              {p.focusLabel}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            🏁 MILESTONE TRACKER
            ══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
            <TrendingUp size={20} className="text-[var(--brand-primary)]" />
            Milestone & Target 16 Minggu
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MILESTONES.map((ms) => {
              const isActive = ms.phase - 1 === currentPhase;
              const isDone = ms.phase - 1 < currentPhase;
              const isFuture = ms.phase - 1 > currentPhase;
              return (
                <div
                  key={ms.phase}
                  className={`relative p-5 rounded-2xl border transition-all ${
                    isActive
                      ? "bg-[var(--surface)] border-2 shadow-md"
                      : isDone
                      ? "bg-[var(--surface)] border-[var(--border)] opacity-80"
                      : "bg-[var(--surface-soft)]/50 border-[var(--border)] opacity-60"
                  }`}
                  style={{
                    borderColor: isActive ? ms.color : undefined,
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: ms.color }}
                    >
                      Fase Saat Ini
                    </div>
                  )}
                  {isDone && (
                    <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Check size={10} />
                      Selesai
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-3 mt-1">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: ms.color }}
                    >
                      {ms.phase}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">{ms.label}</div>
                      <div className="text-[10px] text-[var(--text-secondary)] font-mono">{ms.weekRange}</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-[11px] text-[var(--text-secondary)]">
                    <div className="flex items-start gap-1.5">
                      <span className="text-blue-500 mt-0.5 shrink-0">語</span>
                      <span>{ms.tangoTarget}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-500 mt-0.5 shrink-0">読</span>
                      <span>{ms.dokkaiTarget}</span>
                    </div>
                    <div className="pt-1 border-t border-[var(--border)]">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                        <span className="font-medium">{ms.checkpoint}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            🧠 STUDY PRINCIPLES (Compact)
            ══════════════════════════════════════════════════════════════════ */}
        <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Brain size={18} className="text-[var(--brand-primary)]" />
            4 Prinsip Efisiensi Belajar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <RotateCcw size={12} />
                </div>
                <span className="text-xs font-bold text-[var(--text-primary)]">Spaced Repetition (SRS)</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Jangan skip review Box 1-2! Kerjakan kartu yang jatuh tempo hari ini <b>pertama</b> sebelum bab baru.
                Leitner system sudah built-in di Tango.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Layers size={12} />
                </div>
                <span className="text-xs font-bold text-[var(--text-primary)]">Interleaving (Campur)</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Jangan belajar Tango saja tanpa Dokkai. Kosakata dari Tango akan <b>&ldquo;hidup&rdquo;</b> saat muncul di konteks passage Dokkai.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Target size={12} />
                </div>
                <span className="text-xs font-bold text-[var(--text-primary)]">Active Recall (Ingat Aktif)</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Selalu jawab soal <b>sebelum</b> lihat penjelasan. Di flashcard, ingat arti <b>sebelum</b> flip kartu. Kanji Popover hanya untuk verifikasi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center">
                  <BookOpen size={12} />
                </div>
                <span className="text-xs font-bold text-[var(--text-primary)]">Extensive → Intensive</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Cerita bacaan (読んでみよう) = baca santai untuk feel. Dokkai passage = bedah mendalam setiap kalimat dan jebakan soal.
              </p>
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
                      {tangoPercent}%
                    </b>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${tangoPercent}%` }}
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
                    {dokkaiStats.total} Bab Tersedia
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
                      style={{ width: `${dokkaiPercent}%` }}
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

            {/* MODULE 3: BUNPOU N3 (ACTIVE) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-md flex flex-col justify-between gap-6 hover:border-emerald-500/50 transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center font-bold text-lg font-japanese">
                    文法
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                    {bunpouStats.total} Pola Tersedia
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-emerald-600 transition-colors">
                    Shin Kanzen Bunpou N3
                  </h4>
                  <p className="text-xs text-emerald-600 font-mono font-semibold">
                    文法形式 · Tata Bahasa & Partikel
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Pembedahan nuansa pola kalimat yang sering mengecoh (seperti 〜わけだ vs 〜わけではない, 〜ことに
                  なっている vs 〜ことになった), latihan susun urutan kata (*seiretsu mondai* ★), dan kuis sambungan.
                </p>

                <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs text-[var(--text-secondary)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Dikuasai:</span>
                    <b className="text-[var(--text-primary)]">
                      {bunpouStats.studied} / {bunpouStats.total} Pola ({bunpouPercent}%)
                    </b>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${bunpouPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <Link
                href="/tools/bunpou-n3"
                className="w-full py-3 rounded-2xl bg-[var(--surface-soft)] hover:bg-emerald-600 text-[var(--text-primary)] hover:text-white border border-[var(--border)] hover:border-emerald-600 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs group-hover:shadow-sm"
              >
                <span>Mulai Latihan Tata Bahasa</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            💡 STUDY TIPS — Time-Based Recommendations
            ══════════════════════════════════════════════════════════════════ */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[var(--surface)] to-[var(--surface-soft)]/30 border border-[var(--border)] shadow-sm space-y-5">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            Tips: Kapan Waktu Belajar Paling Efektif?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🌅</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">Pagi (Sebelum Kerja)</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                <b>SRS Review + Tango baru</b> — Otak segar, memori jangka panjang optimal untuk hafal kata baru.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">☀️</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">Siang (Istirahat)</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                <b>1 cerita bacaan santai</b> — Immersion ringan tanpa tekanan, jaga ritme belajar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🌙</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">Malam (Sebelum Tidur)</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                <b>Dokkai 1 passage</b> — Konsolidasi memori saat tidur. Otak memproses info terakhir sebelum istirahat.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
            <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed">
              <b className="text-amber-600 dark:text-amber-400">💡 Kunci Utama:</b> Konsistensi &gt; Durasi.
              <b> 30 menit setiap hari</b> jauh lebih efektif daripada 3 jam sekali seminggu.
              Pertahankan streak Tango sebagai motivasi! 🔥
            </p>
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
