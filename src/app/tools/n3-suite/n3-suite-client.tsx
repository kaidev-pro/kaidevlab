"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Layers,
  Award,
  Check,
  Target,
  Calendar,
  Zap,
  Brain,
  TrendingUp,
  Star,
  RotateCcw,
} from "lucide-react";
import { loadTangoProgress, getTodayString } from "@/lib/tango-n3-storage";
import { loadDokkaiProgress } from "@/components/dokkai-n3/dokkai-storage";
import { DOKKAI_PASSAGES } from "@/data/dokkai-n3/passages";
import { loadBunpouProgress } from "@/components/bunpou-n3/bunpou-storage";
import { BUNPOU_ITEMS } from "@/data/bunpou-n3/grammar-items";
import { loadUnifiedActivityHistory } from "@/lib/unified-study-storage";
import { N3TopBar, N3ContinueCard, N3MoreSection } from "@/components/n3/n3-shell";

// ───────── Study Plan Logic ─────────
const DAYS_JP = ["日", "月", "火", "水", "木", "金", "土"];
const DAYS_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

/** Minimum Tango cards reviewed today to count the vocab step as done. */
const TANGO_DAILY_TARGET = 10;

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

interface TodayState {
  tangoReviewedToday: number;
  tangoDue: number;
  tangoMastered: number;
  bunpouToday: number;
  bunpouStudied: number;
  nextPatternLabel: string | null;
  dokkaiToday: number;
  dokkaiCompleted: number;
  nextPassageLabel: string | null;
}

const EMPTY_TODAY: TodayState = {
  tangoReviewedToday: 0,
  tangoDue: 0,
  tangoMastered: 0,
  bunpouToday: 0,
  bunpouStudied: 0,
  nextPatternLabel: null,
  dokkaiToday: 0,
  dokkaiCompleted: 0,
  nextPassageLabel: null,
};

export function N3SuiteClient() {
  const [state, setState] = useState<TodayState>(EMPTY_TODAY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const today = getTodayString();

    const tProg = loadTangoProgress();
    const tangoDue = Object.values(tProg.cardNextReview || {}).filter((d) => d && d <= today).length;

    const bProg = loadBunpouProgress();
    const studiedSet = new Set(bProg.studiedPatternIds || []);
    const nextPattern = BUNPOU_ITEMS.find((it) => !studiedSet.has(it.id));

    const dProg = loadDokkaiProgress();
    const completedSet = new Set(dProg.completedPassageIds || []);
    const nextPassage = DOKKAI_PASSAGES.find((p) => !completedSet.has(p.id));

    const todayActivity = loadUnifiedActivityHistory()[today];

    setState({
      tangoReviewedToday: tProg.dailyReviews?.[today] || 0,
      tangoDue,
      tangoMastered: tProg.masteredCardIds?.length || 0,
      bunpouToday: todayActivity?.bunpou || 0,
      bunpouStudied: studiedSet.size,
      nextPatternLabel: nextPattern ? nextPattern.patternJp : null,
      dokkaiToday: todayActivity?.dokkai || 0,
      dokkaiCompleted: completedSet.size,
      nextPassageLabel: nextPassage ? `Bab ${nextPassage.chapterNumber} · ${nextPassage.techniqueTag}` : null,
    });
    setLoaded(true);
  }, []);

  const today = new Date();
  const dayIndex = today.getDay();
  const weeklyPlan = useMemo(() => getWeeklyPlan(), []);
  const currentPhase = determineCurrentPhase(state.tangoMastered, state.dokkaiCompleted);

  // ── Today's 3 steps: Tango → Bunpou → Dokkai (vocab → grammar → reading) ──
  const steps = [
    {
      id: "tango",
      jp: "単語",
      label: "Kosakata",
      href: "/tools/tango-n3/",
      done: state.tangoReviewedToday >= TANGO_DAILY_TARGET,
      task:
        state.tangoDue > 0
          ? `Review ${state.tangoDue} kartu jatuh tempo`
          : `Hafalkan ${TANGO_DAILY_TARGET} kata di bab aktif`,
      meta: `${Math.min(state.tangoReviewedToday, TANGO_DAILY_TARGET)}/${TANGO_DAILY_TARGET} kartu hari ini`,
      percent: Math.round((state.tangoMastered / 1800) * 100),
    },
    {
      id: "bunpou",
      jp: "文法",
      label: "Tata Bahasa",
      href: "/tools/bunpou-n3/",
      done: state.bunpouToday > 0,
      task: state.nextPatternLabel ? `Pelajari pola ${state.nextPatternLabel}` : "Ulangi pola favorit",
      meta: `${state.bunpouStudied}/${BUNPOU_ITEMS.length} pola dikuasai`,
      percent: Math.round((state.bunpouStudied / (BUNPOU_ITEMS.length || 1)) * 100),
    },
    {
      id: "dokkai",
      jp: "読解",
      label: "Membaca",
      href: "/tools/dokkai-n3/",
      done: state.dokkaiToday > 0,
      task: state.nextPassageLabel ? `Kerjakan ${state.nextPassageLabel}` : "Ulangi teks tersimpan",
      meta: `${state.dokkaiCompleted}/${DOKKAI_PASSAGES.length} teks selesai`,
      percent: Math.round((state.dokkaiCompleted / (DOKKAI_PASSAGES.length || 1)) * 100),
    },
  ];

  const doneCount = steps.filter((s) => s.done).length;
  const nextIndex = steps.findIndex((s) => !s.done);
  const nextStep = nextIndex >= 0 ? steps[nextIndex] : null;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] pb-24 font-sans">
      <N3TopBar active="suite" title="JLPT N3 Suite — Rencana Belajar Hari Ini" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8 space-y-5">
        <N3ContinueCard
          eyebrow={
            nextStep
              ? `${DAYS_ID[dayIndex]} · Langkah ${nextIndex + 1} dari 3`
              : `${DAYS_ID[dayIndex]} · Target hari ini tercapai`
          }
          title={nextStep ? `${nextStep.label}: ${nextStep.task}` : "Semua langkah hari ini selesai 🎉"}
          subtitle={
            nextStep
              ? "Urutannya kosakata → tata bahasa → membaca, supaya kata & pola yang baru dipelajari langsung kamu temui lagi di teks."
              : "Kalau masih semangat, review kartu jatuh tempo atau baca satu teks lagi. Kalau tidak, istirahat juga bagian dari belajar."
          }
          progress={loaded ? (doneCount / 3) * 100 : 0}
          progressLabel={`${doneCount}/3 langkah selesai hari ini`}
          primary={{
            id: "suite-continue-button",
            label: nextStep ? `Lanjut ${nextStep.label} →` : "Latihan tambahan →",
            href: nextStep ? nextStep.href : "/tools/tango-n3/",
          }}
        >
          <ol className="space-y-1.5">
            {steps.map((s, i) => {
              const isNext = i === nextIndex;
              return (
                <li key={s.id}>
                  <Link
                    id={`suite-step-${s.id}`}
                    href={s.href}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-colors ${
                      isNext
                        ? "border-[var(--brand-primary)]/40 bg-[var(--brand-primary)]/5"
                        : "border-[var(--border)] hover:bg-[var(--surface-soft)]"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        s.done
                          ? "bg-emerald-500 text-white"
                          : isNext
                          ? "bg-[var(--brand-primary)] text-white"
                          : "bg-[var(--surface-soft)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {s.done ? <Check size={14} /> : i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-bold truncate ${
                          s.done ? "text-[var(--text-secondary)] line-through decoration-1" : "text-[var(--text-primary)]"
                        }`}
                      >
                        <span className="font-japanese mr-1.5">{s.jp}</span>
                        {s.task}
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)] truncate">{s.meta}</p>
                    </div>
                    <span className="text-[11px] font-mono text-[var(--text-secondary)] shrink-0">{s.percent}%</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </N3ContinueCard>

        <N3MoreSection id="suite-guide-toggle" label="Panduan belajar: rotasi mingguan, milestone & tips">
          {/* Weekly rotation */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Calendar size={16} className="text-[var(--brand-primary)]" />
              Rotasi Mingguan
            </h3>
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[var(--surface-soft)] border-b border-[var(--border)]">
                      <th className="px-4 py-3 text-left font-bold text-[var(--text-secondary)]">Hari</th>
                      <th className="px-4 py-3 text-left font-bold text-blue-500">Tango</th>
                      <th className="px-4 py-3 text-left font-bold text-amber-500">Dokkai / Reading</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6, 0].map((idx) => {
                      const p = weeklyPlan[idx];
                      const isToday = idx === dayIndex;
                      return (
                        <tr
                          key={idx}
                          className={`border-b border-[var(--border)] last:border-0 ${
                            isToday ? "bg-[var(--brand-primary)]/5" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-bold text-[var(--text-primary)] whitespace-nowrap">
                            <span className="font-japanese mr-1.5 text-[var(--text-secondary)]">{DAYS_JP[idx]}</span>
                            {DAYS_ID[idx]}
                            {isToday && (
                              <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-[var(--brand-primary)] text-white text-[9px] font-bold">
                                HARI INI
                              </span>
                            )}
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <TrendingUp size={16} className="text-[var(--brand-primary)]" />
              Milestone 16 Minggu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MILESTONES.map((ms) => {
                const isActive = ms.phase - 1 === currentPhase;
                const isDone = ms.phase - 1 < currentPhase;
                return (
                  <div
                    key={ms.phase}
                    className={`p-4 rounded-2xl border bg-[var(--surface)] ${
                      isActive ? "border-2 shadow-sm" : "border-[var(--border)]"
                    } ${!isActive && !isDone ? "opacity-60" : ""}`}
                    style={{ borderColor: isActive ? ms.color : undefined }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: ms.color }}
                      >
                        {isDone ? <Check size={12} /> : ms.phase}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[var(--text-primary)]">
                          {ms.label}
                          {isActive && <span className="ml-1.5 text-[10px] font-bold" style={{ color: ms.color }}>· Sekarang</span>}
                        </div>
                        <div className="text-[10px] text-[var(--text-secondary)] font-mono">{ms.weekRange}</div>
                      </div>
                    </div>
                    <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                      <li>語 {ms.tangoTarget}</li>
                      <li>読 {ms.dokkaiTarget}</li>
                      <li className="flex items-center gap-1 pt-1 border-t border-[var(--border)]">
                        <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                        {ms.checkpoint}
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Principles & tips */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Brain size={16} className="text-[var(--brand-primary)]" />
              Prinsip Belajar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-[var(--text-secondary)] leading-relaxed">
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <p className="text-xs font-bold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
                  <RotateCcw size={12} className="text-blue-500" /> Review dulu, baru materi baru
                </p>
                Kerjakan kartu yang jatuh tempo hari ini sebelum membuka bab baru.
              </div>
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <p className="text-xs font-bold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
                  <Layers size={12} className="text-amber-500" /> Campur ketiga modul
                </p>
                Kosakata baru &ldquo;hidup&rdquo; saat muncul lagi di pola Bunpou dan teks Dokkai.
              </div>
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <p className="text-xs font-bold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
                  <Target size={12} className="text-emerald-500" /> Jawab dulu, baru lihat
                </p>
                Ingat arti sebelum membalik kartu; jawab soal sebelum membuka pembahasan.
              </div>
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <p className="text-xs font-bold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
                  <Zap size={12} className="text-violet-500" /> Konsisten &gt; lama
                </p>
                30 menit setiap hari lebih efektif daripada 3 jam sekali seminggu.
              </div>
            </div>
          </div>

          {/* FE bridge */}
          <Link
            id="suite-fe-study-link"
            href="/tools/fe-study/"
            className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)] transition-colors"
          >
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Persiapan ujian FE (基本情報技術者試験)</p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Kemampuan Dokkai N3 mempercepat membaca soal studi kasus FE.
              </p>
            </div>
            <ArrowRight size={14} className="text-[var(--text-secondary)] shrink-0" />
          </Link>
        </N3MoreSection>
      </div>
    </div>
  );
}
