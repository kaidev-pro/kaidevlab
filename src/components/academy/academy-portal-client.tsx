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
} from "lucide-react";
import { loadTangoProgress } from "@/lib/tango-n3-storage";
import { loadStudyProgress } from "@/lib/fe-study-storage";
import { TANGO_N3_CARDS } from "@/data/tango-n3-data";
import { FE_CARDS } from "@/data/fe-study-data";
import {
  downloadFullBackupFile,
  restoreFullBackup,
  encodeCompactSyncToken,
  decodeCompactSyncToken,
  applyCompactSyncPayload,
  generateQrCodeDataUrl,
  CompactSyncPayload,
} from "@/lib/cross-device-sync";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

type TrackFilter = "all" | "japanese" | "english" | "web" | "ai" | "library";

const PORTAL_I18N = {
  id: {
    eyebrow: "Ruang Belajar & Riset Kaidevlab",
    heroTitle: "Ruang Belajar Mandiri & Perpustakaan Digital.",
    heroDesc:
      "Tempat aku latihan serius — bahasa Jepang buat kerja & ujian, plus software engineering dan AI. Dicatat dan dipakai langsung, bukan sekadar teori.",
    syncBtn: "Hubungkan Device",
    streakSuffix: "Hari Streak",
    masteredSuffix: "Dikuasai",
    noProgressYet: "Belum mulai — mulai drill pertama",
    allTracks: "Semua Track",
    activeTracksTitle: "Track Pembelajaran Aktif",
    activeTracksDesc: "Kurikulum interaktif siap pakai dengan sistem kartu pintar dan kuis.",
    roadmapTitle: "Roadmap & Rencana Lab",
    roadmapDesc: "Kurikulum yang sedang dalam tahap riset dan perancangan materi.",
    statusActive: "Aktif",
    statusSoon: "Segera",
    statusPlanned: "Rencana",
    catJapanese: "Bahasa Jepang",
    catItExam: "Ujian IT Jepang",
    catEnglish: "Bahasa Inggris",
    catWeb: "Web Dev",
    catAi: "AI & Agen",
    catLibrary: "Perpustakaan",
    tangoDesc:
      "Kurikulum kosakata resmi sesuai buku fisik Shinkanzen. Dilengkapi kolokasi, audio native TTS, smart card queue, dan ujian per bab.",
    tangoNotStarted: "1800 Kosakata · Belum dimulai",
    tangoCta: "Buka Ruang Belajar N3",
    feDesc:
      "Persiapan ujian sertifikasi IT negara Jepang dan syarat visa kerja. Dilengkapi tracer algoritma, kuis CBT, dan penguncian materi harian adaptif.",
    feNotStarted: "199 Konsep · Belum dimulai",
    feCta: "Buka Ruang Belajar FE",
    libraryDesc:
      "Kumpulan rumus hitungan ujian IT dan kalkulator interaktif: ketersediaan sistem, MTBF/MTTR, waktu akses memori, kalkulator BEP, dan panduan subnetting CIDR.",
    libraryStats: "Akses Terbuka",
    libraryCta: "Buka Perpustakaan Digital",
    englishDesc:
      "Kosakata teknis sistem, frasa arsitektur cloud, kolokasi dokumentasi open-source, dan simulasi technical interview standar global.",
    englishPhase: "Tahap Riset Silabus",
    webDesc:
      "Konsep mendalam TypeScript, lifecycle rendering React, optimasi web performance, internal caching, dan arsitektur Next.js modern.",
    webPhase: "Rencana Kurikulum",
    aiDesc:
      "Rancang bangun agen otonom, pipeline RAG produksi, tool-calling berstandar schema, prompt engineering terstruktur, dan evaluasi model LLM.",
    aiPhase: "Rencana Kurikulum",
    progressLabel: "Progres Belajar",
  },
  en: {
    eyebrow: "Kaidevlab Learning & Research Hub",
    heroTitle: "Self-Study Academy & Digital Library.",
    heroDesc:
      "Where I practice seriously — Japanese for work and certification, plus software engineering and AI. Built and used daily, not just theory.",
    syncBtn: "Connect Device",
    streakSuffix: "Day Streak",
    masteredSuffix: "Mastered",
    noProgressYet: "Not started — start your first drill",
    allTracks: "All Tracks",
    activeTracksTitle: "Active Study Tracks",
    activeTracksDesc: "Interactive curricula ready for immediate practice with smart cards and quizzes.",
    roadmapTitle: "Lab Roadmap & Research",
    roadmapDesc: "Curricula currently under research and syllabus design.",
    statusActive: "Live",
    statusSoon: "Coming Soon",
    statusPlanned: "Planned",
    catJapanese: "Japanese",
    catItExam: "IT Exam",
    catEnglish: "Tech English",
    catWeb: "Web Dev",
    catAi: "AI & Agents",
    catLibrary: "Library",
    tangoDesc:
      "Official vocabulary curriculum following the physical Shinkanzen textbook. Equipped with collocations, native TTS audio, smart queue, and chapter quizzes.",
    tangoNotStarted: "1800 Vocabulary · Not started",
    tangoCta: "Open N3 Study Room",
    feDesc:
      "Preparation for Japan’s national IT certification and engineer visa requirements. Includes algorithm tracer, CBT quizzes, and adaptive daily locking.",
    feNotStarted: "199 Concepts · Not started",
    feCta: "Open FE Study Gym",
    libraryDesc:
      "Interactive formulas and calculators: system availability, MTBF/MTTR, memory access time, break-even point, and CIDR subnetting guide.",
    libraryStats: "Open Access",
    libraryCta: "Open Digital Library",
    englishDesc:
      "System vocabulary, cloud architecture phrases, open-source documentation collocations, and global technical interview simulations.",
    englishPhase: "Syllabus Research",
    webDesc:
      "Deep TypeScript patterns, React rendering lifecycle, web performance budgets, caching internals, and modern Next.js architecture.",
    webPhase: "Curriculum Planned",
    aiDesc:
      "Building autonomous agents, production RAG pipelines, schema-based tool calling, structured prompting, and LLM evaluation.",
    aiPhase: "Curriculum Planned",
    progressLabel: "Study Progress",
  },
  ja: {
    eyebrow: "学習＆リサーチポータル",
    heroTitle: "自習型アカデミー＆デジタルライブラリ。",
    heroDesc:
      "仕事や試験のための日本語、ソフトウェア工学、AIの実践学習道場。単なる理論ではなく、自ら構築し日々活用するスペース。",
    syncBtn: "端末同期",
    streakSuffix: "日連続",
    masteredSuffix: "習得",
    noProgressYet: "未開始 — 最初の演習を始めよう",
    allTracks: "すべてのトラック",
    activeTracksTitle: "公開中の学習トラック",
    activeTracksDesc: "スマートカードとクイズを備えた、すぐに学習可能な実践カリキュラム。",
    roadmapTitle: "ロードマップ・研究開発",
    roadmapDesc: "現在シラバス策定および教材研究中のカリキュラム。",
    statusActive: "公開中",
    statusSoon: "近日公開",
    statusPlanned: "計画中",
    catJapanese: "日本語",
    catItExam: "IT国家試験",
    catEnglish: "技術英語",
    catWeb: "Web開発",
    catAi: "AI・エージェント",
    catLibrary: "ライブラリ",
    tangoDesc:
      "新完全マスター単語に準拠した公式語彙カリキュラム。連語、ネイティブTTS音声、出題キュー、各章の修了テストを完備。",
    tangoNotStarted: "全1800語 · 未開始",
    tangoCta: "N3学習ルームを開く",
    feDesc:
      "日本のIT国家資格および技人国ビザ要件対策。アルゴリズムトレーサー、CBT模試、デイリーアンロック機能を搭載。",
    feNotStarted: "全199概念 · 未開始",
    feCta: "FE学習ジムを開く",
    libraryDesc:
      "稼働率、MTBF/MTTR、実効アクセス時間、損益分岐点計算機、およびCIDRサブネット表を備えたインタラクティブ公式集。",
    libraryStats: "常時利用可能",
    libraryCta: "デジタルライブラリを開く",
    englishDesc:
      "システム設計語彙、クラウド基盤フレーズ、OSSドキュメント連語、および技術面接シミュレーション。",
    englishPhase: "シラバス研究中",
    webDesc:
      "TypeScript深層、Reactレンダリングライフサイクル、Webパフォーマンス設計、キャッシュ構造、Next.jsアーキテクチャ。",
    webPhase: "カリキュラム計画中",
    aiDesc:
      "自律型エージェント開発、本番RAGパイプライン、Tool-calling、構造化プロンプト、LLMモデル評価。",
    aiPhase: "カリキュラム計画中",
    progressLabel: "学習進捗",
  },
};

export function AcademyPortalClient() {
  const { locale } = useLanguage();
  const t = PORTAL_I18N[locale] || PORTAL_I18N.id;

  const [filter, setFilter] = useState<TrackFilter>("all");
  const [tangoStats, setTangoStats] = useState({ mastered: 0, total: 1800, streak: 0 });
  const [feStats, setFeStats] = useState({ mastered: 0, total: 199, streak: 0 });
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncTab, setSyncTab] = useState<"qr" | "file">("qr");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [syncUrl, setSyncUrl] = useState<string>("");
  const [copiedSyncLink, setCopiedSyncLink] = useState(false);
  const [copiedSyncCode, setCopiedSyncCode] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [incomingSync, setIncomingSync] = useState<CompactSyncPayload | null>(null);
  const [appliedSyncSuccess, setAppliedSyncSuccess] = useState(false);
  const [cadetId, setCadetId] = useState("KAI-PASS-7829");

  // Reload live statistics
  const reloadStats = useCallback(() => {
    try {
      const tProg = loadTangoProgress();
      setTangoStats({
        mastered: tProg.masteredCardIds?.length || 0,
        total: TANGO_N3_CARDS.length,
        streak: tProg.streak || 0,
      });

      const feProg = loadStudyProgress();
      setFeStats({
        mastered: feProg.masteredCardIds?.length || 0,
        total: FE_CARDS.length,
        streak: feProg.streak || 0,
      });

      const savedId = localStorage.getItem("kaidevlab_cadet_id");
      if (savedId) {
        setCadetId(savedId);
      } else {
        const newId = `KAI-${Math.floor(1000 + Math.random() * 9000)}-PASS`;
        localStorage.setItem("kaidevlab_cadet_id", newId);
        setCadetId(newId);
      }
    } catch {}
  }, []);

  useEffect(() => {
    reloadStats();
    window.addEventListener("storage", reloadStats);
    return () => window.removeEventListener("storage", reloadStats);
  }, [reloadStats]);

  // Check for incoming sync in URL (?sync=...)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const syncParam = params.get("sync");
      if (syncParam) {
        const decoded = decodeCompactSyncToken(syncParam);
        if (decoded) {
          setIncomingSync(decoded);
        }
      }
    } catch {}
  }, []);

  // Generate QR code when modal opens
  useEffect(() => {
    if (syncModalOpen) {
      try {
        const token = encodeCompactSyncToken();
        const base = typeof window !== "undefined" ? window.location.origin : "https://kaidevlab.com";
        const full = `${base}/learn/?sync=${encodeURIComponent(token)}`;
        setSyncUrl(full);
        generateQrCodeDataUrl(full).then(setQrDataUrl);
      } catch (err) {
        console.error("Failed to generate QR sync URL", err);
      }
    }
  }, [syncModalOpen]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSyncModalOpen(false);
        setIncomingSync(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleApplyIncomingSync = () => {
    if (!incomingSync) return;
    applyCompactSyncPayload(incomingSync);
    setIncomingSync(null);
    setAppliedSyncSuccess(true);
    setTimeout(() => setAppliedSyncSuccess(false), 4000);

    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
    reloadStats();
  };

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

  const totalMastered = tangoStats.mastered + feStats.mastered;
  const globalStreak = Math.max(tangoStats.streak, feStats.streak, 1);

  // Cadet Rank computation
  const cadetRank = useMemo(() => {
    if (totalMastered >= 1500) return { title: "Grand Scholar", tier: "Level 5" };
    if (totalMastered >= 800) return { title: "Cognitive Architect", tier: "Level 4" };
    if (totalMastered >= 300) return { title: "Systems Pioneer", tier: "Level 3" };
    if (totalMastered >= 50) return { title: "Lab Researcher", tier: "Level 2" };
    return { title: "Cadet Explorer", tier: "Level 1" };
  }, [totalMastered]);

  // Active study tracks (Ready for immediate drill)
  const activeTracks = [
    {
      id: "tango-n3",
      category: "japanese" as const,
      statusLabel: t.statusActive,
      categoryLabel: t.catJapanese,
      title: "Shin Kanzen Master Tango N3",
      description: t.tangoDesc,
      stats:
        tangoStats.mastered === 0
          ? t.tangoNotStarted
          : `${tangoStats.mastered} / ${tangoStats.total} ${t.masteredSuffix}`,
      percent: Math.round((tangoStats.mastered / (tangoStats.total || 1)) * 100),
      href: "/tools/tango-n3/",
      cta: t.tangoCta,
      icon: Languages,
      color: "from-blue-500/20 via-sky-500/10 to-transparent",
    },
    {
      id: "fe-study",
      category: "japanese" as const,
      statusLabel: t.statusActive,
      categoryLabel: t.catItExam,
      title: "FE Study Hub",
      description: t.feDesc,
      stats:
        feStats.mastered === 0
          ? t.feNotStarted
          : `${feStats.mastered} / ${feStats.total} ${t.masteredSuffix}`,
      percent: Math.round((feStats.mastered / (feStats.total || 1)) * 100),
      href: "/tools/fe-study/",
      cta: t.feCta,
      icon: Terminal,
      color: "from-emerald-500/20 via-teal-500/10 to-transparent",
    },
    {
      id: "library-shelf",
      category: "library" as const,
      statusLabel: t.statusActive,
      categoryLabel: t.catLibrary,
      title: "Digital Library & Formulas",
      description: t.libraryDesc,
      stats: t.libraryStats,
      percent: 100,
      href: "/tools/library/",
      cta: t.libraryCta,
      icon: Layers,
      color: "from-rose-500/20 via-pink-500/10 to-transparent",
    },
  ];

  // Roadmap tracks (Under research / upcoming)
  const roadmapTracks = [
    {
      id: "english-tech",
      category: "english" as const,
      statusLabel: t.statusSoon,
      categoryLabel: t.catEnglish,
      title: "English for Tech Engineers",
      description: t.englishDesc,
      phase: t.englishPhase,
      icon: BookOpen,
      color: "from-amber-500/20 via-orange-500/10 to-transparent",
    },
    {
      id: "web-dev",
      category: "web" as const,
      statusLabel: t.statusPlanned,
      categoryLabel: t.catWeb,
      title: "Web Engineering Fundamentals",
      description: t.webDesc,
      phase: t.webPhase,
      icon: Code2,
      color: "from-purple-500/20 via-indigo-500/10 to-transparent",
    },
    {
      id: "ai-engineer",
      category: "ai" as const,
      statusLabel: t.statusPlanned,
      categoryLabel: t.catAi,
      title: "AI Engineering & Agents",
      description: t.aiDesc,
      phase: t.aiPhase,
      icon: Brain,
      color: "from-cyan-500/20 via-blue-500/10 to-transparent",
    },
  ];

  const filteredActiveTracks = useMemo(() => {
    if (filter === "all") return activeTracks;
    return activeTracks.filter((t) => t.category === filter);
  }, [filter, activeTracks]);

  const filteredRoadmapTracks = useMemo(() => {
    if (filter === "all") return roadmapTracks;
    return roadmapTracks.filter((t) => t.category === filter);
  }, [filter, roadmapTracks]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-10">
      {/* ==================================================== */}
      {/* 1. HERO (UNCLUTTERED, HONEST TONE)                   */}
      {/* ==================================================== */}
      <div className="space-y-3 sm:space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{t.eyebrow}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] font-serif leading-[1.18]">
          {t.heroTitle}
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          {t.heroDesc}
        </p>
      </div>

      {/* ==================================================== */}
      {/* 2. COMPACT GAMIFICATION & SYNC STATUS BAR (ONE ROW)  */}
      {/* ==================================================== */}
      <div className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        {/* Left: ID & Rank */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono font-bold text-[var(--text-primary)] tracking-wide">
              {cadetId}
            </span>
          </div>
          <span className="text-[var(--border-subtle)]">|</span>
          <span className="text-[var(--text-secondary)] font-medium">
            {cadetRank.tier} · <b className="text-[var(--text-primary)]">{cadetRank.title}</b>
          </span>
        </div>

        {/* Right: Progress Summary & Sync Button */}
        <div className="flex items-center gap-3.5 flex-wrap">
          {totalMastered > 0 ? (
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 text-amber-500 font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                <span>
                  {globalStreak} {t.streakSuffix}
                </span>
              </span>
              <span className="text-[var(--text-tertiary)] font-mono">
                {totalMastered} {t.masteredSuffix}
              </span>
            </div>
          ) : (
            <span className="text-[var(--text-tertiary)] text-xs">
              {t.noProgressYet}
            </span>
          )}

          <button
            type="button"
            onClick={() => setSyncModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--brand-primary)]/10 hover:bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] font-bold text-xs transition-colors shrink-0"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{t.syncBtn}</span>
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. CATEGORY SEGMENTED PILLS                           */}
      {/* ==================================================== */}
      <div className="flex items-center border-b border-[var(--border-subtle)] pb-3 overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--surface-secondary)]/50 border border-[var(--border-subtle)] min-w-max">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === "all"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {t.allTracks} (6)
          </button>
          <button
            onClick={() => setFilter("japanese")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              filter === "japanese"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{t.catJapanese} (2)</span>
          </button>
          <button
            onClick={() => setFilter("library")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              filter === "library"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.catLibrary} (1)</span>
          </button>
          <button
            onClick={() => setFilter("english")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              filter === "english"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.catEnglish} (1)</span>
          </button>
          <button
            onClick={() => setFilter("web")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              filter === "web"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{t.catWeb} (1)</span>
          </button>
          <button
            onClick={() => setFilter("ai")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              filter === "ai"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>{t.catAi} (1)</span>
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 4. ACTIVE STUDY TRACKS GRID                          */}
      {/* ==================================================== */}
      {filteredActiveTracks.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif">
                {t.activeTracksTitle}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {t.activeTracksDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredActiveTracks.map((track) => {
              const Icon = track.icon;

              return (
                <div
                  key={track.id}
                  className="p-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] flex flex-col justify-between transition-all hover:border-[var(--brand-primary)]/40 hover:shadow-lg relative overflow-hidden group"
                >
                  {/* Subtle Background Accent */}
                  <div
                    className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${track.color} rounded-bl-full pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity`}
                  />

                  <div className="space-y-4 relative z-10">
                    {/* Standardized Dual Badges: Status + Category */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--brand-primary)] group-hover:scale-105 transition-transform shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          {track.statusLabel}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-[var(--text-tertiary)] uppercase tracking-wider">
                          {track.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
                        {track.title}
                      </h3>
                    </div>

                    {/* Description (No number duplication) */}
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  {/* Bottom Progress & Action Button */}
                  <div className="pt-5 mt-4 border-t border-[var(--border-subtle)]/70 space-y-3 relative z-10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[var(--text-tertiary)] font-medium">
                        {t.progressLabel}
                      </span>
                      <span className="font-mono font-bold text-[var(--text-primary)]">
                        {track.stats}
                      </span>
                    </div>

                    <a
                      href={track.href}
                      className="w-full py-2.5 px-4 rounded-2xl bg-[var(--brand-primary)] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                    >
                      <span>{track.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ==================================================== */}
      {/* 5. ROADMAP SECTION (SEPARATE FROM ACTIVE TRACKS)     */}
      {/* ==================================================== */}
      {filteredRoadmapTracks.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] font-serif">
              {t.roadmapTitle}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {t.roadmapDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredRoadmapTracks.map((track) => {
              const Icon = track.icon;

              return (
                <div
                  key={track.id}
                  className="p-5 rounded-3xl border border-[var(--border-subtle)]/70 bg-[var(--surface-primary)]/70 flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-[var(--border-subtle)] transition-colors"
                >
                  <div className="space-y-3 relative z-10">
                    {/* Header: Icon & Dual Badges */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          {track.statusLabel}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-[var(--text-tertiary)] uppercase tracking-wider">
                          {track.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">
                      {track.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  {/* Phase Status Strip (No fake CTA) */}
                  <div className="pt-3 border-t border-[var(--border-subtle)]/60 flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      <span>{track.phase}</span>
                    </span>
                    <span>Lab Research</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ==================================================== */}
      {/* 4. CROSS-DEVICE SYNC MODAL                           */}
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
                      Hubungkan HP dan laptop tanpa login
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
                      // eslint-disable-next-line @next/next/no-img-element
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

      {/* ==================================================== */}
      {/* 5. INCOMING SYNC PROMPT MODAL (DETECTED FROM URL)    */}
      {/* ==================================================== */}
      <AnimatePresence>
        {incomingSync && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIncomingSync(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 animate-spin-slow" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Sinkronisasi Progres Terdeteksi
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Tautan ini berisi data progres belajar dari perangkat lain. Apakah kamu ingin menerapkan data ini ke perangkat sekarang?
                </p>
              </div>

              {/* Summary of incoming data */}
              <div className="p-4 rounded-2xl bg-[var(--surface-secondary)]/50 border border-[var(--border-subtle)] space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-tertiary)]">ID Cadet Asal:</span>
                  <span className="font-bold text-[var(--brand-primary)]">{incomingSync.cid}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-tertiary)]">Kosakata N3 Dikuasai:</span>
                  <span className="font-bold text-[var(--text-primary)]">{incomingSync.tm.length} Kata</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-tertiary)]">Konsep FE Dikuasai:</span>
                  <span className="font-bold text-[var(--text-primary)]">{incomingSync.fm.length} Konsep</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-tertiary)]">Streak Belajar:</span>
                  <span className="font-bold text-amber-500">{incomingSync.st} Hari</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIncomingSync(null)}
                  className="py-2.5 px-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-bold transition-colors"
                >
                  Abaikan
                </button>
                <button
                  type="button"
                  onClick={handleApplyIncomingSync}
                  className="py-2.5 px-4 rounded-xl bg-[var(--brand-primary)] hover:opacity-95 text-white text-xs font-bold transition-opacity"
                >
                  Terapkan Data
                </button>
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
