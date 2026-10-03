"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  BookOpen,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  Languages,
  Code2,
  Cpu,
  Brain,
  Terminal,
  FileQuestion,
  Search,
  CheckCircle2,
  Lock,
  RotateCcw,
  QrCode,
  Smartphone,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Layers,
  GraduationCap,
  Star,
  Copy,
  Check,
  Download,
  Upload,
  AlertCircle,
  X,
  RefreshCw,
  Clock,
  Calendar,
  CreditCard,
  Play,
  Bookmark,
  FileText,
  User,
} from "lucide-react";
import { loadTangoProgress } from "@/lib/tango-n3-storage";
import { loadStudyProgress } from "@/lib/fe-study-storage";
import { TANGO_N3_CHAPTERS } from "@/data/tango-n3/chapters";
import { FE_TOTAL_CARDS, TANGO_TOTAL_CARDS, tangoCardIdByNumber } from "@/data/learn-stats";
import { FE_DAILY_DECKS } from "@/data/fe-daily-decks";
import { FeCandidateIdCard } from "@/components/fe-study/fe-candidate-id-card";
import {
  downloadFullBackupFile,
  restoreFullBackup,
  CompactSyncPayload,
} from "@/lib/cross-device-sync";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { loadDokkaiProgress } from "@/components/dokkai-n3/dokkai-storage";
import { DOKKAI_PASSAGES } from "@/data/dokkai-n3/passages";
import { loadBunpouProgress } from "@/components/bunpou-n3/bunpou-storage";
import { BUNPOU_ITEMS } from "@/data/bunpou-n3/grammar-items";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound } from "@/lib/global-sound";

const PORTAL_I18N = {
  id: {
    osBadge: "Personal Learning Operating System",
    welcomePrefix: "Selamat datang kembali,",
    heroSub: "Target harian: ±25 menit untuk menjaga konsistensi belajar bahasa Jepang & rekayasa sistem.",
    todayMissionTitle: "Misi Belajar Hari Ini",
    todayMissionBadge: "Daily Mission",
    estTime: "± 25 Menit",
    primaryCta: "Mulai Daily Session",
    reviewDueTitle: "Antrean Review Berkala",
    reviewDueAction: "Mulai Review Sekarang",
    noReviewDue: "Semua review selesai. Tidak ada materi yang jatuh tempo hari ini.",
    continueSectionTitle: "Lanjutkan Belajar Terakhir",
    continueSectionDesc: "Akses 1-klik langsung ke modul dan bab yang sedang kamu kerjakan.",
    continueBtn: "Lanjutkan",
    tracksTitle: "Jalur Pembelajaran Aktif",
    tracksDesc: "Kurikulum terstruktur dengan metode active recall dan penguncian materi adaptif.",
    roadmapTitle: "Rencana Riset & Lab",
    roadmapDesc: "Kurikulum dalam tahap perancangan materi.",
    studyToolsTitle: "Peralatan Belajar & Lab",
    studyToolsDesc: "Simulator ujian, kalkulator rumus, dan alat bantu analisis kode.",
    syncBtn: "Hubungkan Device",
    openPassBtn: "Buka KAI-PASS (ID Card)",
    streakSuffix: "Hari Beruntun",
    masteredSuffix: "Dikuasai",
    disclaimerN3: "Materi pembelajaran terstruktur untuk persiapan JLPT N3 (単語 · 読解 · 文法).",
    disclaimerFe: "Persiapan Fundamental IT Engineer Examination (FE) untuk mendukung pengembangan karier IT di Jepang.",
  },
  en: {
    osBadge: "Personal Learning Operating System",
    welcomePrefix: "Welcome back,",
    heroSub: "Daily target: ~25 minutes to maintain steady mastery in Japanese & systems engineering.",
    todayMissionTitle: "Today's Learning Mission",
    todayMissionBadge: "Daily Mission",
    estTime: "~25 Minutes",
    primaryCta: "Start Daily Session",
    reviewDueTitle: "Spaced Review Queue",
    reviewDueAction: "Start Due Reviews",
    noReviewDue: "All reviews up to date. No concepts due today.",
    continueSectionTitle: "Continue Learning",
    continueSectionDesc: "Jump straight back into your active module and chapter.",
    continueBtn: "Continue",
    tracksTitle: "Active Study Tracks",
    tracksDesc: "Structured curricula powered by active recall and adaptive mastery.",
    roadmapTitle: "Research & Lab Roadmap",
    roadmapDesc: "Curricula under active research and syllabus design.",
    studyToolsTitle: "Study Tools & Labs",
    studyToolsDesc: "Exam simulators, formula calculators, and code tracer utilities.",
    syncBtn: "Connect Device",
    openPassBtn: "View KAI-PASS (ID Card)",
    streakSuffix: "Day Streak",
    masteredSuffix: "Mastered",
    disclaimerN3: "Comprehensive study suite for JLPT N3 preparation (単語 · 読解 · 文法).",
    disclaimerFe: "Fundamental IT Engineer Examination (FE) preparation to advance your engineering career in Japan.",
  },
  ja: {
    osBadge: "パーソナル学習オペレーティングシステム",
    welcomePrefix: "おかえりなさい、",
    heroSub: "本日の目標: 約25分間の学習で確実な記憶定着とスキルアップを図ります。",
    todayMissionTitle: "本日の学習ミッション",
    todayMissionBadge: "デイリーミッション",
    estTime: "約25分",
    primaryCta: "デイリーセッションを開始",
    reviewDueTitle: "復習キュー",
    reviewDueAction: "今すぐ復習を開始",
    noReviewDue: "本日の復習はすべて完了しています。",
    continueSectionTitle: "前回の続きから学習",
    continueSectionDesc: "現在進行中のモジュールや章へ1クリックで再開できます。",
    continueBtn: "再開する",
    tracksTitle: "公開中の学習トラック",
    tracksDesc: "アクティブリコールと適応型定着度判定に基づく実践カリキュラム。",
    roadmapTitle: "研究開発ロードマップ",
    roadmapDesc: "現在シラバス研究・設計中の学習カリキュラム。",
    studyToolsTitle: "学習ツール・ラボ",
    studyToolsDesc: "CBT模試シミュレータ、公式計算ツール、擬似言語トレーサー。",
    syncBtn: "端末同期",
    openPassBtn: "KAI-PASS（受験者証）を表示",
    streakSuffix: "日連続",
    masteredSuffix: "習得",
    disclaimerN3: "JLPT N3合格を目指す総合学習スイート（単語・読解・文法）。",
    disclaimerFe: "日本でのITキャリア形成を支援する基本情報技術者試験（FE）対策カリキュラム。",
  },
};

export function AcademyPortalClient() {
  const { locale } = useLanguage();
  const t = PORTAL_I18N[locale] || PORTAL_I18N.id;

  const [userName, setUserName] = useState("Kai");
  const [cadetId, setCadetId] = useState("KAI-PASS-7829");
  const [focusTrack, setFocusTrack] = useState<"n3" | "all">("n3");
  const [tangoStats, setTangoStats] = useState({ mastered: 0, total: 1800, streak: 0, reviewCount: 0 });
  const [bunpouStats, setBunpouStats] = useState({ mastered: 0, total: 116, reviewCount: 0 });
  const [dokkaiStats, setDokkaiStats] = useState({ completed: 0, total: 13, reviewCount: 0 });
  const [feStats, setFeStats] = useState({ mastered: 0, total: 199, streak: 0, reviewCount: 0 });
  const [activeFeDayNumber, setActiveFeDayNumber] = useState(1);
  const [activeTangoChapterId, setActiveTangoChapterId] = useState("noun-general-1");
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const [feProgress, setFeProgress] = useState<any>(null);
  const [tangoProgress, setTangoProgress] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  // Modals
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [idCardModalOpen, setIdCardModalOpen] = useState(false);
  const [dailySessionModalOpen, setDailySessionModalOpen] = useState(false);

  // Sync state
  const [syncTab, setSyncTab] = useState<"qr" | "file">("qr");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [syncUrl, setSyncUrl] = useState<string>("");
  const [copiedSyncLink, setCopiedSyncLink] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [incomingSync, setIncomingSync] = useState<CompactSyncPayload | null>(null);
  const [appliedSyncSuccess, setAppliedSyncSuccess] = useState(false);

  // Load and refresh statistics
  const reloadStats = useCallback(() => {
    try {
      const tProg = loadTangoProgress();
      const feProg = loadStudyProgress();
      const dokkaiProg = loadDokkaiProgress();
      const bunpouProg = loadBunpouProgress();

      setTangoProgress(tProg);
      setFeProgress(feProg);

      setTangoStats({
        mastered: tProg.masteredCardIds?.length || 0,
        total: TANGO_TOTAL_CARDS,
        streak: tProg.streak || 0,
        reviewCount: tProg.reviewCardIds?.length || 0,
      });

      setBunpouStats({
        mastered: bunpouProg.studiedPatternIds?.length || 0,
        total: BUNPOU_ITEMS.length,
        reviewCount: bunpouProg.bookmarkedPatternIds?.length || 0,
      });

      setDokkaiStats({
        completed: dokkaiProg.completedPassageIds?.length || 0,
        total: DOKKAI_PASSAGES.length,
        reviewCount: dokkaiProg.bookmarkedPassageIds?.length || 0,
      });

      setFeStats({
        mastered: feProg.masteredCardIds?.length || 0,
        total: FE_TOTAL_CARDS,
        streak: feProg.streak || 0,
        reviewCount: feProg.reviewCardIds?.length || 0,
      });

      // Active FE Day
      const unlockedDays = feProg.unlockedDeckDays?.length ? feProg.unlockedDeckDays : [1];
      setActiveFeDayNumber(Math.max(...unlockedDays));

      // Active Tango Chapter
      const unlockedChs = tProg.unlockedChapterIds?.length ? tProg.unlockedChapterIds : ["noun-general-1"];
      const lastUnlockedCh = unlockedChs[unlockedChs.length - 1] || "noun-general-1";
      setActiveTangoChapterId(lastUnlockedCh);

      // User & Cadet ID
      if (typeof window !== "undefined") {
        const savedName = localStorage.getItem("kaidevlab_candidate_name");
        if (savedName) setUserName(savedName);

        const savedFocus = localStorage.getItem("kaidevlab_study_focus_track");
        if (savedFocus === "n3" || savedFocus === "all") {
          setFocusTrack(savedFocus);
        }

        const savedId = localStorage.getItem("kaidevlab_cadet_id");
        if (savedId) {
          setCadetId(savedId);
        } else {
          const newId = `KAI-PASS-${Math.floor(1000 + Math.random() * 9000)}`;
          localStorage.setItem("kaidevlab_cadet_id", newId);
          setCadetId(newId);
        }
      }
    } catch (err) {
      console.error("Failed to load learning stats", err);
    }
  }, []);

  const handleToggleFocusTrack = (mode: "n3" | "all") => {
    triggerHaptic("light");
    playTapSound();
    setFocusTrack(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("kaidevlab_study_focus_track", mode);
    }
  };

  useEffect(() => {
    reloadStats();
  }, [reloadStats]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Active FE Deck metadata
  const activeFeDeck = useMemo(() => {
    return FE_DAILY_DECKS.find((d) => d.day === activeFeDayNumber) || FE_DAILY_DECKS[0];
  }, [activeFeDayNumber]);

  // Mastered count in current FE deck
  const activeFeDeckMasteredCount = useMemo(() => {
    if (!activeFeDeck || !feProgress) return 0;
    return activeFeDeck.cardIds.filter((id) => feProgress.masteredCardIds?.includes(id)).length;
  }, [activeFeDeck, feProgress]);

  // Active Tango Chapter metadata
  const activeTangoChapter = useMemo(() => {
    return (
      TANGO_N3_CHAPTERS.find((c) => c.id === activeTangoChapterId) ||
      TANGO_N3_CHAPTERS.find((c) => c.id === "noun-general-1") ||
      TANGO_N3_CHAPTERS[0]
    );
  }, [activeTangoChapterId]);

  // Mastered count in current Tango chapter
  const activeTangoChapterMasteredCount = useMemo(() => {
    if (!activeTangoChapter || !tangoProgress) return 0;
    const mastered = new Set<string>(tangoProgress.masteredCardIds || []);
    let count = 0;
    for (let n = activeTangoChapter.startNum; n <= activeTangoChapter.endNum; n++) {
      if (mastered.has(tangoCardIdByNumber(n))) count++;
    }
    return count;
  }, [activeTangoChapter, tangoProgress]);

  const totalMastered =
    tangoStats.mastered + bunpouStats.mastered + dokkaiStats.completed + feStats.mastered;
  const globalStreak = Math.max(tangoStats.streak, feStats.streak, 1);
  const totalDueReview = tangoStats.reviewCount + bunpouStats.reviewCount + dokkaiStats.reviewCount + feStats.reviewCount;

  // Cadet Rank computation
  const cadetRank = useMemo(() => {
    if (totalMastered >= 1500) return { title: "Grand Scholar", tier: "Level 5" };
    if (totalMastered >= 800) return { title: "Cognitive Architect", tier: "Level 4" };
    if (totalMastered >= 300) return { title: "Systems Pioneer", tier: "Level 3" };
    if (totalMastered >= 50) return { title: "Lab Researcher", tier: "Level 2" };
    return { title: "Cadet Explorer", tier: "Level 1" };
  }, [totalMastered]);

  // Weak items needing attention (Section 21) — data kartu penuh dimuat lazy
  const [weakCards, setWeakCards] = useState<{ feWeak: any[]; tangoWeak: any[] }>({
    feWeak: [],
    tangoWeak: [],
  });

  useEffect(() => {
    const feIds: string[] = feProgress?.reviewCardIds || [];
    const tangoIds: string[] = tangoProgress?.reviewCardIds || [];
    if (!feIds.length && !tangoIds.length) {
      setWeakCards({ feWeak: [], tangoWeak: [] });
      return;
    }
    let cancelled = false;
    (async () => {
      const [{ FE_CARDS }, { TANGO_N3_CARDS }] = await Promise.all([
        import("@/data/fe-study-data"),
        import("@/data/tango-n3-data"),
      ]);
      if (cancelled) return;
      setWeakCards({
        feWeak: feIds
          .map((id) => FE_CARDS.find((c) => c.id === id))
          .filter(Boolean)
          .slice(0, 4),
        tangoWeak: tangoIds
          .map((id) => TANGO_N3_CARDS.find((c) => c.id === id))
          .filter(Boolean)
          .slice(0, 4),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [feProgress?.reviewCardIds, tangoProgress?.reviewCardIds]);

  // Activity 7-Day Calendar (Section 24)
  const activityPast7Days = useMemo(() => {
    if (!mounted) return [];
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];
      const feCount = feProgress?.dailyReviews?.[dateKey] || 0;
      const tangoCount = tangoProgress?.dailyReviews?.[dateKey] || 0;
      const count = feCount + tangoCount;
      const dayName = d.toLocaleDateString(locale === "ja" ? "ja-JP" : locale === "en" ? "en-US" : "id-ID", {
        weekday: "short",
      });
      days.push({ dateKey, dayName, count });
    }
    return days;
  }, [mounted, feProgress?.dailyReviews, tangoProgress?.dailyReviews, locale]);

  const handleCopySyncLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && syncUrl) {
      navigator.clipboard.writeText(syncUrl);
      setCopiedSyncLink(true);
      setTimeout(() => setCopiedSyncLink(false), 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = restoreFullBackup(content);
        if (res.success) {
          setRestoreMessage({ text: res.message });
          reloadStats();
        } else {
          setRestoreMessage({ text: res.message, error: true });
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-10 md:py-12 min-w-0">
      {/* ==================================================== */}
      {/* 1. COMPACT STRIP: GREETING, DATE, STREAK, ACTIONS    */}
      {/* ==================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]/70">
        <div className="space-y-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.osBadge}</span>
          </div>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] font-sans">
            {t.welcomePrefix} <span className="text-[var(--brand-primary)]">{userName}</span>.
          </h1>
          <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] leading-relaxed max-w-xl">
            {t.heroSub}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-tertiary)]">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {mounted
                ? new Date().toLocaleDateString(locale === "ja" ? "ja-JP" : locale === "en" ? "en-US" : "id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "…"}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-500 font-extrabold text-xs">
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>{globalStreak}</span>
          </span>
          <button
            type="button"
            onClick={() => setIdCardModalOpen(true)}
            aria-label={t.openPassBtn}
            title={t.openPassBtn}
            className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setSyncModalOpen(true)}
            aria-label={t.syncBtn}
            title={t.syncBtn}
            className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. MAIN GRID: TODAY-FIRST                            */}
      {/* ==================================================== */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* ---------- LEFT: HARI INI (sticky di desktop) ---------- */}
        <section className="lg:col-span-2 lg:sticky lg:top-24 p-5 sm:p-7 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-[var(--surface-primary)] via-[var(--surface-primary)] to-[#06241a]/20 shadow-md flex flex-col gap-5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.todayMissionBadge}</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[var(--text-primary)] font-sans">
                {t.todayMissionTitle}
              </h2>
            </div>
            
            {/* Mode Focus Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-secondary)]/90 border border-[var(--border-subtle)] text-xs font-bold">
              <button
                type="button"
                onClick={() => handleToggleFocusTrack("n3")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  focusTrack === "n3"
                    ? "bg-sky-500 text-white font-extrabold shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                🎌 Fokus N3 Suite
              </button>
              <button
                type="button"
                onClick={() => handleToggleFocusTrack("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  focusTrack === "all"
                    ? "bg-emerald-500 text-slate-950 font-extrabold shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                ⚡ N3 + FE IT
              </button>
            </div>
          </div>

          {/* Mission Steps */}
          <div className="flex flex-col gap-2.5">
            {focusTrack === "n3" ? (
              <>
                {/* ① Tango N3 */}
                <a
                  href="/tools/tango-n3/"
                  className="group p-4 rounded-2xl bg-[var(--surface-secondary)]/60 border border-[var(--border-subtle)] hover:border-sky-500/50 transition-all flex items-center gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-sky-500 uppercase tracking-wider block">
                      ① Track N3 Tango · Bab {activeTangoChapter.badge}
                    </span>
                    <h3 className="font-bold text-[var(--text-primary)] text-sm leading-snug line-clamp-1">
                      {activeTangoChapter.title}
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                      {activeTangoChapterMasteredCount}/40 Kata · Total {tangoStats.mastered}/1.800 dikuasai
                    </p>
                  </div>
                  <span className={`shrink-0 text-[11px] font-extrabold flex items-center gap-1 ${activeTangoChapterMasteredCount >= 40 ? "text-emerald-500" : "text-sky-500"}`}>
                    {activeTangoChapterMasteredCount >= 40 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selesai</span>
                      </>
                    ) : (
                      <>
                        <span>Lanjut</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </span>
                </a>

                {/* ② Bunpou N3 */}
                <a
                  href="/tools/bunpou-n3/"
                  className="group p-4 rounded-2xl bg-[var(--surface-secondary)]/60 border border-[var(--border-subtle)] hover:border-indigo-500/50 transition-all flex items-center gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <Languages className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-wider block">
                      ② Track N3 Bunpou · 24 Bab (116 Pola)
                    </span>
                    <h3 className="font-bold text-[var(--text-primary)] text-sm leading-snug line-clamp-1">
                      Rumus Sambungan 接続 & Kuis Susun Bintang (★)
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                      {bunpouStats.mastered}/{bunpouStats.total} Pola Dipelajari · {bunpouStats.reviewCount} Ditandai
                    </p>
                  </div>
                  <span className={`shrink-0 text-[11px] font-extrabold flex items-center gap-1 ${bunpouStats.mastered >= bunpouStats.total ? "text-emerald-500" : "text-indigo-500"}`}>
                    {bunpouStats.mastered >= bunpouStats.total ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Lengkap</span>
                      </>
                    ) : (
                      <>
                        <span>Buka Bunpou</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </span>
                </a>

                {/* ③ Dokkai N3 */}
                <a
                  href="/tools/dokkai-n3/"
                  className="group p-4 rounded-2xl bg-[var(--surface-secondary)]/60 border border-[var(--border-subtle)] hover:border-amber-500/50 transition-all flex items-center gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider block">
                      ③ Track N3 Dokkai · 13 Teks Asli Ujian
                    </span>
                    <h3 className="font-bold text-[var(--text-primary)] text-sm leading-snug line-clamp-1">
                      Analisis Paragraf & Latihan Pemahaman Soal
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                      {dokkaiStats.completed}/{dokkaiStats.total} Teks Selesai · Format Asli JLPT
                    </p>
                  </div>
                  <span className={`shrink-0 text-[11px] font-extrabold flex items-center gap-1 ${dokkaiStats.completed >= dokkaiStats.total ? "text-emerald-500" : "text-amber-500"}`}>
                    {dokkaiStats.completed >= dokkaiStats.total ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selesai</span>
                      </>
                    ) : (
                      <>
                        <span>Baca Teks</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </span>
                </a>
              </>
            ) : (
              <>
                {/* ① Tango N3 */}
                <a
                  href="/tools/tango-n3/"
                  className="group p-4 rounded-2xl bg-[var(--surface-secondary)]/60 border border-[var(--border-subtle)] hover:border-sky-500/50 transition-all flex items-center gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-sky-500 uppercase tracking-wider block">
                      ① Track JLPT N3 · Bab {activeTangoChapter.badge}
                    </span>
                    <h3 className="font-bold text-[var(--text-primary)] text-sm leading-snug line-clamp-1">
                      {activeTangoChapter.title}
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                      {activeTangoChapterMasteredCount}/40 Kata · ±10 mnt
                    </p>
                  </div>
                  <span className={`shrink-0 text-[11px] font-extrabold flex items-center gap-1 ${activeTangoChapterMasteredCount >= 40 ? "text-emerald-500" : "text-sky-500"}`}>
                    {activeTangoChapterMasteredCount >= 40 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selesai</span>
                      </>
                    ) : (
                      <>
                        <span>Lanjut</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </span>
                </a>

                {/* ② Review SRS */}
                <a
                  href={
                    totalDueReview > 0
                      ? tangoStats.reviewCount >= feStats.reviewCount
                        ? "/tools/tango-n3/?tab=srs"
                        : "/tools/fe-study/?tab=flashcards&mode=review"
                      : "/tools/tango-n3/?tab=srs"
                  }
                  className="group p-4 rounded-2xl bg-[var(--surface-secondary)]/60 border border-[var(--border-subtle)] hover:border-amber-500/50 transition-all flex items-center gap-3.5"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${totalDueReview > 0 ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"}`}>
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider block">
                      ② Spaced Repetition
                    </span>
                    <h3 className="font-bold text-[var(--text-primary)] text-sm leading-snug">
                      Antrean Review Harian
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                      {totalDueReview > 0
                        ? `${totalDueReview} item jatuh tempo · ±5 mnt`
                        : "Memori prima — tidak ada yang jatuh tempo"}
                    </p>
                  </div>
                  <span className={`shrink-0 text-[11px] font-extrabold flex items-center gap-1 ${totalDueReview > 0 ? "text-amber-500" : "text-emerald-500"}`}>
                    {totalDueReview > 0 ? (
                      <>
                        <span>{totalDueReview} Review</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Bersih</span>
                      </>
                    )}
                  </span>
                </a>

                {/* ③ FE Exam */}
                <a
                  href="/tools/fe-study/"
                  className="group p-4 rounded-2xl bg-[var(--surface-secondary)]/60 border border-[var(--border-subtle)] hover:border-emerald-500/50 transition-all flex items-center gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-wider block">
                      ③ Track FE · Hari {activeFeDayNumber}
                    </span>
                    <h3 className="font-bold text-[var(--text-primary)] text-sm leading-snug line-clamp-1">
                      {activeFeDeck.titleId.replace(/^Hari \d+:\s*/, "")}
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                      {activeFeDeckMasteredCount}/10 Konsep · ±10 mnt
                    </p>
                  </div>
                  <span className={`shrink-0 text-[11px] font-extrabold flex items-center gap-1 ${activeFeDeckMasteredCount >= 10 ? "text-emerald-500" : "text-emerald-500"}`}>
                    {activeFeDeckMasteredCount >= 10 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selesai</span>
                      </>
                    ) : (
                      <>
                        <span>Lanjut</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </span>
                </a>
              </>
            )}
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => setDailySessionModalOpen(true)}
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.99]"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{focusTrack === "n3" ? "Mulai Belajar N3 Hari Ini" : t.primaryCta}</span>
            <span className="text-[11px] font-bold opacity-70">
              {focusTrack === "n3"
                ? `${(activeTangoChapterMasteredCount >= 40 ? 1 : 0) + (bunpouStats.mastered > 0 ? 1 : 0) + (dokkaiStats.completed > 0 ? 1 : 0)}/3 selesai`
                : `${(activeTangoChapterMasteredCount >= 40 ? 1 : 0) + (totalDueReview === 0 ? 1 : 0) + (activeFeDeckMasteredCount >= 10 ? 1 : 0)}/3 selesai`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* ---------- RIGHT: PROGRES + WEAK + TRACKS + TOOLS ---------- */}
        <div className="space-y-5 min-w-0">
          {/* 3. PROGRESS STRIP */}
          <section className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
                7 Hari
              </span>
              <span className="inline-flex items-center gap-1 text-amber-500 font-extrabold text-xs">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                <span>
                  {globalStreak} {t.streakSuffix}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              {mounted
                ? activityPast7Days.map((day) => (
                    <div
                      key={day.dateKey}
                      title={`${day.dateKey} (${day.dayName}): ${day.count} item dipelajari`}
                      className={`w-3.5 h-3.5 rounded-xs transition-colors ${
                        day.count >= 20
                          ? "bg-sky-500"
                          : day.count >= 10
                          ? "bg-sky-600/80"
                          : day.count > 0
                          ? "bg-sky-500/40"
                          : "bg-[var(--border-subtle)]/40"
                      }`}
                    />
                  ))
                : Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="w-3.5 h-3.5 rounded-xs bg-[var(--border-subtle)]/40" />
                  ))}
            </div>
            <div className="space-y-2.5 pt-2 border-t border-[var(--border-subtle)]/60">
              {/* N3 Tango */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                    <span>N3 Kosakata (Tango)</span>
                  </span>
                  <span className="font-mono font-bold text-[var(--text-primary)]">
                    {tangoStats.mastered} / {tangoStats.total}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface-secondary)] overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (tangoStats.mastered / (tangoStats.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              {/* N3 Bunpou */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                    <span>N3 Tata Bahasa (116 Pola)</span>
                  </span>
                  <span className="font-mono font-bold text-[var(--text-primary)]">
                    {bunpouStats.mastered} / {bunpouStats.total}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface-secondary)] overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (bunpouStats.mastered / (bunpouStats.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              {/* N3 Dokkai */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span>N3 Dokkai (13 Teks)</span>
                  </span>
                  <span className="font-mono font-bold text-[var(--text-primary)]">
                    {dokkaiStats.completed} / {dokkaiStats.total}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface-secondary)] overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (dokkaiStats.completed / (dokkaiStats.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              {/* FE IT Fundamental */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>FE IT Fundamental</span>
                  </span>
                  <span className="font-mono font-bold text-[var(--text-primary)]">
                    {feStats.mastered} / {feStats.total}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface-secondary)] overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (feStats.mastered / (feStats.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)]/60 flex items-center justify-between text-[10px] text-[var(--text-tertiary)] font-mono">
                <span>{cadetRank.tier} · {cadetRank.title}</span>
                <span className="text-[var(--text-secondary)] font-bold">{totalMastered} dikuasai</span>
              </div>
            </div>
          </section>

          {/* 4. WEAK SPOTS (kondisional) */}
          {(weakCards.feWeak.length > 0 || weakCards.tangoWeak.length > 0) && (
            <section className="p-4 rounded-2xl border border-amber-500/30 bg-[var(--surface-primary)] space-y-3">
              <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Perlu Perhatian Khusus</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {weakCards.feWeak.map((card: any) => (
                  <a
                    key={card.id}
                    href={`/tools/fe-study/?card=${card.id}`}
                    className="p-3 rounded-xl bg-[var(--surface-secondary)]/70 hover:bg-[var(--surface-secondary)] border border-[var(--border-subtle)] hover:border-amber-500/40 transition-all flex flex-col justify-between gap-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
                        FE IT
                      </span>
                      <span className="text-[10px] font-mono text-amber-500 font-bold">
                        Review
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-[var(--text-primary)] group-hover:text-amber-500 transition-colors line-clamp-1">
                        {card.termEn}
                      </h5>
                      <p className="text-[11px] font-mono text-[var(--text-secondary)] line-clamp-1">
                        {card.termJp}
                      </p>
                    </div>
                  </a>
                ))}
                {weakCards.tangoWeak.map((card: any) => (
                  <a
                    key={card.id}
                    href={`/tools/tango-n3/?search=${encodeURIComponent(card.word)}`}
                    className="p-3 rounded-xl bg-[var(--surface-secondary)]/70 hover:bg-[var(--surface-secondary)] border border-[var(--border-subtle)] hover:border-amber-500/40 transition-all flex flex-col justify-between gap-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-500 font-bold">
                        N3 Vocab
                      </span>
                      <span className="text-[10px] font-mono text-amber-500 font-bold">
                        Review
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-[var(--text-primary)] group-hover:text-amber-500 transition-colors line-clamp-1">
                        {card.word} ({card.reading})
                      </h5>
                      <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                        {card.meaningId}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 5. TRACKS RINGKAS */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-sans">
                {t.tracksTitle}
              </h2>
              <a
                href="/tools/n3-suite/"
                className="text-xs font-bold text-sky-500 hover:text-sky-400 flex items-center gap-1 transition-colors"
              >
                <span>Portal N3 Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Master JLPT N3 Suite Banner */}
            <a
              href="/tools/n3-suite/"
              className="p-3.5 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-500/10 via-[var(--surface-primary)] to-indigo-500/10 hover:border-sky-500/50 transition-all flex items-center gap-3.5 group shadow-xs"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                <Languages className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-[var(--text-primary)] group-hover:text-sky-400 transition-colors">
                      JLPT N3 Suite
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-sky-500/20 text-sky-400 uppercase tracking-wider font-mono">
                      Kurikulum Penuh
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-sky-400 shrink-0">
                    {tangoStats.mastered + bunpouStats.mastered + dokkaiStats.completed} / {tangoStats.total + bunpouStats.total + dokkaiStats.total}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 mt-0.5">
                  1.800 Kosakata · 116 Pola Tata Bahasa · 13 Teks Dokkai Format Ujian
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-sky-400 transition-colors shrink-0" />
            </a>

            {/* Sub-Track: N3 Tango */}
            <a
              href="/tools/tango-n3/"
              className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-sky-500/40 transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] group-hover:text-sky-500 transition-colors line-clamp-1">
                    N3 Tango (Kosakata)
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] shrink-0">
                    {tangoStats.mastered}/{tangoStats.total}
                  </span>
                </div>
                <div className="w-full h-1 mt-1.5 rounded-full bg-[var(--surface-secondary)] overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (tangoStats.mastered / (tangoStats.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-sky-500 transition-colors shrink-0" />
            </a>

            {/* Sub-Track: N3 Bunpou */}
            <a
              href="/tools/bunpou-n3/"
              className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-indigo-500/40 transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                <Languages className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors line-clamp-1">
                    N3 Bunpou (Tata Bahasa)
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] shrink-0">
                    {bunpouStats.mastered}/{bunpouStats.total}
                  </span>
                </div>
                <div className="w-full h-1 mt-1.5 rounded-full bg-[var(--surface-secondary)] overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (bunpouStats.mastered / (bunpouStats.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-indigo-500 transition-colors shrink-0" />
            </a>

            {/* Sub-Track: N3 Dokkai */}
            <a
              href="/tools/dokkai-n3/"
              className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-amber-500/40 transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] group-hover:text-amber-500 transition-colors line-clamp-1">
                    N3 Dokkai (Pemahaman Bacaan)
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] shrink-0">
                    {dokkaiStats.completed}/{dokkaiStats.total}
                  </span>
                </div>
                <div className="w-full h-1 mt-1.5 rounded-full bg-[var(--surface-secondary)] overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (dokkaiStats.completed / (dokkaiStats.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-amber-500 transition-colors shrink-0" />
            </a>

            {/* Track FE */}
            <a
              href="/tools/fe-study/"
              className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-emerald-500/40 transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors line-clamp-1">
                    FE Study Hub (Fundamental IT)
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] shrink-0">
                    {feStats.mastered}/{feStats.total}
                  </span>
                </div>
                <div className="w-full h-1 mt-1.5 rounded-full bg-[var(--surface-secondary)] overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (feStats.mastered / (feStats.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-emerald-500 transition-colors shrink-0" />
            </a>

            {/* Collapsible Research Roadmap */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setRoadmapOpen(!roadmapOpen)}
                className="w-full p-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/40 hover:bg-[var(--surface-secondary)]/70 flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="font-bold text-[var(--text-primary)]">{t.roadmapTitle}</span>
                  <span className="text-[11px] text-[var(--text-tertiary)] hidden sm:inline">
                    (Tech English, Web Engineering, AI & Agents)
                  </span>
                </div>
                {roadmapOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {roadmapOpen && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3 pt-1">
                  <div className="p-4 rounded-2xl border border-[var(--border-subtle)]/60 bg-[var(--surface-primary)] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-primary)]">English for Tech</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold">Riset Silabus</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      Kosakata arsitektur cloud, dokumentasi open-source, dan simulasi technical interview global.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-[var(--border-subtle)]/60 bg-[var(--surface-primary)] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-primary)]">Web Engineering</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 font-bold">Rencana</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      TypeScript mendalam, React rendering lifecycle, web performance budget, dan arsitektur Next.js.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-[var(--border-subtle)]/60 bg-[var(--surface-primary)] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-primary)]">AI Engineering</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 font-bold">Rencana</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      Rancang bangun agen otonom, pipeline RAG produksi, schema-based tool calling, dan evaluasi model.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 6. STUDY TOOLS & LABS GRID */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-sans">
              {t.studyToolsTitle}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {/* Tool 1: Tango Flashcards SRS */}
              <a
                href="/tools/tango-n3/?tab=flashcards"
                className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-sky-500/40 hover:shadow-sm transition-all flex flex-col justify-between gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] group-hover:text-sky-500 transition-colors">
                    Flashcard SRS N3
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                    Hafalan kosakata SM-2 berspasi.
                  </p>
                </div>
              </a>

              {/* Tool 2: Bunpou Quiz Master */}
              <a
                href="/tools/bunpou-n3/?tab=quiz"
                className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-indigo-500/40 hover:shadow-sm transition-all flex flex-col justify-between gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors">
                    Bunpou Quiz
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                    Kuis susun bintang ★ & partikel.
                  </p>
                </div>
              </a>

              {/* Tool 3: Dokkai Reader */}
              <a
                href="/tools/dokkai-n3/"
                className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-amber-500/40 hover:shadow-sm transition-all flex flex-col justify-between gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors">
                    Dokkai Reader
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                    Baca teks furigana interaktif.
                  </p>
                </div>
              </a>

              {/* Tool 4: Kakomon CBT */}
              <a
                href="/tools/fe-study/?tab=quiz"
                className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-emerald-500/40 hover:shadow-sm transition-all flex flex-col justify-between gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors">
                    Kakomon CBT
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                    Simulasi ujian CBT resmi FE.
                  </p>
                </div>
              </a>

              {/* Tool 5: Pseudocode Tracer */}
              <a
                href="/tools/fe-study/?tab=tracer"
                className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-cyan-500/40 hover:shadow-sm transition-all flex flex-col justify-between gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] group-hover:text-cyan-500 transition-colors">
                    Pseudocode Tracer
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                    Simulator eksekusi 科目B.
                  </p>
                </div>
              </a>

              {/* Tool 6: Mistake Notebook */}
              <a
                href="/tools/fe-study/?tab=mistakes"
                className="p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-rose-500/40 hover:shadow-sm transition-all flex flex-col justify-between gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <Bookmark className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] group-hover:text-rose-500 transition-colors">
                    Catatan Salah
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                    Kompilasi soal keliru & review.
                  </p>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MODAL 1: DAILY SESSION LAUNCHER                      */}
      {/* ==================================================== */}
      <AnimatePresence>
        {dailySessionModalOpen && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setDailySessionModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-3xl p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {focusTrack === "n3" ? "Pilih Sesi Belajar N3 Hari Ini" : "Pilih Sesi Belajar Hari Ini"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDailySessionModalOpen(false)}
                  className="p-1 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {focusTrack === "n3" ? (
                  <>
                    {/* Option 1: Tango N3 */}
                    <a
                      href="/tools/tango-n3/"
                      className="p-4 rounded-2xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 flex items-center justify-between gap-3 transition-colors block"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-sky-500 uppercase block">
                          ① Target Kosakata
                        </span>
                        <h3 className="font-bold text-[var(--text-primary)] text-sm">
                          JLPT N3 Tango: Bab {activeTangoChapter.badge}
                        </h3>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                          {activeTangoChapter.title} (40 Kosakata · ±10 mnt)
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-sky-500 shrink-0" />
                    </a>

                    {/* Option 2: Bunpou N3 */}
                    <a
                      href="/tools/bunpou-n3/"
                      className="p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 flex items-center justify-between gap-3 transition-colors block"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase block">
                          ② Target Tata Bahasa
                        </span>
                        <h3 className="font-bold text-[var(--text-primary)] text-sm">
                          JLPT N3 Bunpou: 116 Pola (24 Bab)
                        </h3>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                          Rumus Sambungan & Drill Soal Susun Bintang (★)
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0" />
                    </a>

                    {/* Option 3: Dokkai N3 */}
                    <a
                      href="/tools/dokkai-n3/"
                      className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-between gap-3 transition-colors block"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber-500 uppercase block">
                          ③ Target Membaca
                        </span>
                        <h3 className="font-bold text-[var(--text-primary)] text-sm">
                          JLPT N3 Dokkai: 13 Teks Asli Ujian
                        </h3>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                          Analisis Paragraf & Latihan Pemahaman Dokkai
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
                    </a>
                  </>
                ) : (
                  <>
                    {/* Option 1: FE Day */}
                    <a
                      href="/tools/fe-study/"
                      className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 flex items-center justify-between gap-3 transition-colors block"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase block">
                          Rekomendasi Utama
                        </span>
                        <h3 className="font-bold text-[var(--text-primary)] text-sm">
                          FE Cognitive Gym: Hari {activeFeDayNumber}
                        </h3>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                          {activeFeDeck.titleId.replace(/^Hari \d+:\s*/, "")} (10 Konsep)
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
                    </a>

                    {/* Option 2: Tango N3 */}
                    <a
                      href="/tools/tango-n3/"
                      className="p-4 rounded-2xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 flex items-center justify-between gap-3 transition-colors block"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-sky-500 uppercase block">
                          Target Kosakata
                        </span>
                        <h3 className="font-bold text-[var(--text-primary)] text-sm">
                          JLPT N3 Tango: Bab {activeTangoChapter.badge}
                        </h3>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                          {activeTangoChapter.title} (40 Kosakata)
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-sky-500 shrink-0" />
                    </a>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* MODAL 2: KAI-PASS CANDIDATE ID CARD MODAL            */}
      {/* ==================================================== */}
      {idCardModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto print:p-0 print:bg-white">
          <div className="relative w-full max-w-2xl my-auto rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-5 sm:p-7 shadow-2xl flex flex-col items-center gap-6 print:border-none print:shadow-none print:p-0">
            {/* Modal Header */}
            <div className="flex items-center justify-between w-full border-b border-[var(--border-subtle)] pb-3 print:hidden">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-sky-400" />
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  KAI-PASS · Paspor Belajar & Identitas Resmi (受験者証)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIdCardModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ID Card Component */}
            <FeCandidateIdCard
              candidateName={userName}
              candidateId={cadetId}
              examMode="hub"
              score={totalMastered}
              total={feStats.total + tangoStats.total}
              percentage={Math.round((totalMastered / ((feStats.total + tangoStats.total) || 1)) * 100)}
              isPassed={totalMastered >= 50}
              className="w-full"
            />

            {/* KAI-PASS Passport Detailed Metrics (Section 25) */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 print:hidden">
              <div className="p-3 rounded-2xl bg-[var(--surface-secondary)]/70 border border-[var(--border-subtle)] flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">FE Dikuasai</span>
                <span className="text-sm font-mono font-extrabold text-[var(--text-primary)] mt-1">
                  <b className="text-emerald-500">{feStats.mastered}</b> / {feStats.total}
                </span>
                <span className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                  {Math.round((feStats.mastered / (feStats.total || 1)) * 100)}% Selesai
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--surface-secondary)]/70 border border-[var(--border-subtle)] flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">N3 Dikuasai</span>
                <span className="text-sm font-mono font-extrabold text-[var(--text-primary)] mt-1">
                  <b className="text-sky-500">{tangoStats.mastered}</b> / {tangoStats.total}
                </span>
                <span className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                  {Math.round((tangoStats.mastered / (tangoStats.total || 1)) * 100)}% Selesai
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--surface-secondary)]/70 border border-[var(--border-subtle)] flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Streak Belajar</span>
                <span className="text-sm font-mono font-extrabold text-amber-500 mt-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{globalStreak} Hari</span>
                </span>
                <span className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Konsistensi Harian</span>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--surface-secondary)]/70 border border-[var(--border-subtle)] flex flex-col justify-between">
                <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Jatuh Tempo</span>
                <span className={`text-sm font-mono font-extrabold mt-1 ${totalDueReview > 0 ? "text-amber-500" : "text-emerald-500"}`}>
                  {totalDueReview} Item
                </span>
                <span className="text-[10px] text-[var(--text-tertiary)] mt-0.5">SRS Review Queue</span>
              </div>
            </div>

            {/* Close button */}
            <div className="w-full flex justify-end pt-2 border-t border-[var(--border-subtle)] print:hidden">
              <button
                type="button"
                onClick={() => setIdCardModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[var(--surface-secondary)] hover:bg-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 3: CROSS-DEVICE SYNC MODAL                     */}
      {/* ==================================================== */}
      <AnimatePresence>
        {syncModalOpen && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setSyncModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl relative text-[var(--text-primary)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] leading-tight">
                      Sinkronisasi Antar-Perangkat
                    </h3>
                    <p className="text-[11px] text-[var(--text-tertiary)]">
                      Hubungkan HP dan laptop tanpa login akun
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSyncModalOpen(false)}
                  className="p-1.5 rounded-xl text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Tabs: QR Code vs File Backup */}
              <div className="flex items-center p-1 rounded-2xl bg-[var(--surface-secondary)]/50 border border-[var(--border-subtle)] gap-1">
                <button
                  type="button"
                  onClick={() => setSyncTab("qr")}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    syncTab === "qr"
                      ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Pindai QR Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSyncTab("file")}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    syncTab === "file"
                      ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Berkas Cadangan (.JSON)</span>
                </button>
              </div>

              {/* Tab 1: QR Code Scanner */}
              {syncTab === "qr" && (
                <div className="space-y-3 text-center pt-1">
                  <div className="p-3 rounded-2xl bg-white inline-block shadow-sm border border-slate-200/80 mx-auto">
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="QR Code Sinkronisasi"
                        className="w-40 h-40 sm:w-44 sm:h-44 mx-auto block"
                      />
                    ) : (
                      <div className="w-40 h-40 flex items-center justify-center text-xs text-slate-400">
                        Membuat QR Code...
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
                    Arahkan kamera ponsel kamu ke kode di atas untuk membuka dan menerapkan progres belajar secara instan.
                  </p>

                  <div className="pt-1 flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={syncUrl}
                      className="flex-1 bg-[var(--surface-secondary)] text-[var(--text-tertiary)] text-[11px] font-mono px-3 py-2 rounded-xl border border-[var(--border-subtle)] truncate"
                    />
                    <button
                      type="button"
                      onClick={handleCopySyncLink}
                      className="px-3.5 py-2 rounded-xl bg-[var(--brand-primary)] hover:opacity-95 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-opacity active:scale-[0.98]"
                    >
                      {copiedSyncLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSyncLink ? "Tersalin" : "Salin Link"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: File Backup (.JSON) */}
              {syncTab === "file" && (
                <div className="space-y-3 pt-1">
                  {/* Export Card */}
                  <div className="p-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        Ekspor Data ke Berkas
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">
                        Cadangan Penuh
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      Unduh arsip lengkap kosakata N3 dan kartu FE yang dikuasai sebagai berkas `.json`.
                    </p>
                    <button
                      type="button"
                      onClick={downloadFullBackupFile}
                      className="w-full py-2 px-3.5 rounded-xl bg-[var(--brand-primary)]/10 hover:bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh File Cadangan (.json)</span>
                    </button>
                  </div>

                  {/* Import Card */}
                  <div className="p-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        Pulihkan dari Berkas
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">
                        Impor Data
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      Pilih berkas `.json` cadangan untuk memulihkan progres di perangkat ini.
                    </p>
                    <label className="w-full py-2 px-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 text-[var(--text-primary)] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Pilih File Cadangan (.json)</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {restoreMessage && (
                    <div
                      className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 border ${
                        restoreMessage.error
                          ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{restoreMessage.text}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Cadet Pass Footer */}
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
                <span>Pass ID: {cadetId}</span>
                <span>PWA Offline Ready</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Notification Banner */}
      <AnimatePresence>
        {appliedSyncSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Progres belajar berhasil disinkronkan ke perangkat ini.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
