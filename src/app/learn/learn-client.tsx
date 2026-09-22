"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Sparkles,
  Flame,
  RotateCcw,
  Zap,
  Cpu,
  Kanban,
  TrendingUp,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  Layers,
  FileQuestion,
  Terminal,
  Bookmark,
  Check,
  X,
  Search,
  Download,
  Smartphone,
} from "lucide-react";
import { FE_CARDS, FECard } from "@/data/fe-study-data";
import {
  StudyProgress,
  loadStudyProgress,
  recordCardReview,
  CardRating,
  DEFAULT_PROGRESS,
} from "@/lib/fe-study-storage";
import { FlashcardView } from "@/components/fe-study/flashcard-view";
import { StudyProgressCard } from "@/components/fe-study/study-progress-card";
import { SessionSummaryModal } from "@/components/fe-study/session-summary-modal";
import { QuizView } from "@/components/fe-study/quiz-view";
import { TracerView } from "@/components/fe-study/tracer-view";
import { CheatsheetView } from "@/components/fe-study/cheatsheet-view";

type StudyMode = "all" | "quick10" | "technology" | "management" | "strategy" | "review";
type HubTab = "flashcards" | "quiz" | "tracer" | "cheatsheet";

interface RoadmapItem {
  id: HubTab;
  title: string;
  badge: string;
  desc: string;
  target: string;
  status: "active" | "planned";
}

const ROADMAP_MODULES: RoadmapItem[] = [
  {
    id: "flashcards",
    title: "Flashcard Drill (科目A)",
    badge: "Active",
    desc: "Active recall 100 istilah IT Jepang & Inggris, furigana toggle, audio TTS, dan analogi visual Kitami-shiki.",
    target: "Pondasi Terminologi Ujian FE (100 Kartu)",
    status: "active",
  },
  {
    id: "quiz",
    title: "Simulasi 過去問 (Kakomon)",
    badge: "Active",
    desc: "Simulator CBT 15 soal otentik dengan timer 22,5 menit, matriks navigator nomor, flag review, dan sertifikat kelulusan.",
    target: "Simulasi Ujian CBT Resmi",
    status: "active",
  },
  {
    id: "tracer",
    title: "Pseudocode Step-Tracer",
    badge: "Active",
    desc: "Interactive debugger baris demi baris untuk melatih trace table (トレース表) dan 4 algoritma khas ujian FE.",
    target: "Kunci Kelulusan 科目B",
    status: "active",
  },
  {
    id: "cheatsheet",
    title: "Formula & Architecture",
    badge: "Active",
    desc: "4 kalkulator interaktif (Ketersediaan, MTBF, Akses Memori, BEP) dan tabel subnetting IPv4.",
    target: "Kalkulator Rumus Hitungan",
    status: "active",
  },
];

export function LearnClient() {
  const [progress, setProgress] = useState<StudyProgress>(DEFAULT_PROGRESS);
  const [activeTab, setActiveTab] = useState<HubTab>("flashcards");
  const [activeMode, setActiveMode] = useState<StudyMode | null>(null);
  const [singleCardDrill, setSingleCardDrill] = useState<FECard | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionReviewedCount, setSessionReviewedCount] = useState(0);
  const [roadmapModal, setRoadmapModal] = useState<RoadmapItem | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // PWA Install prompt listener
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  // Load progress from localStorage once mounted
  useEffect(() => {
    setProgress(loadStudyProgress());
  }, []);


  const refreshProgress = useCallback(() => {
    setProgress(loadStudyProgress());
  }, []);

  // Filter cards based on selected mode
  const activeCards = useMemo(() => {
    if (singleCardDrill) return [singleCardDrill];
    if (!activeMode) return [];

    let filtered: FECard[] = [];

    if (activeMode === "quick10") {
      filtered = [...FE_CARDS].sort(() => 0.5 - Math.random()).slice(0, 10);
    } else if (activeMode === "technology" || activeMode === "management" || activeMode === "strategy") {
      filtered = FE_CARDS.filter((c) => c.category === activeMode);
    } else if (activeMode === "review") {
      const reviewSet = new Set(progress?.reviewCardIds || []);
      filtered = FE_CARDS.filter((c) => reviewSet.has(c.id));
      if (filtered.length === 0) {
        filtered = FE_CARDS.slice(0, 5);
      }
    } else {
      filtered = FE_CARDS;
    }

    return filtered;
  }, [activeMode, singleCardDrill, progress?.reviewCardIds]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return FE_CARDS.filter(
      (c) =>
        c.termJp.toLowerCase().includes(q) ||
        c.furigana.toLowerCase().includes(q) ||
        c.termEn.toLowerCase().includes(q) ||
        c.definitionId.toLowerCase().includes(q) ||
        c.keyDifferentiator.toLowerCase().includes(q) ||
        c.subCategory.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleStartSession = (mode: StudyMode) => {
    setSingleCardDrill(null);
    setActiveMode(mode);
    setSessionCompleted(false);
    setSessionReviewedCount(0);
  };

  const handleStartSingleCard = (card: FECard) => {
    setSingleCardDrill(card);
    setActiveMode("all");
    setSessionCompleted(false);
    setSessionReviewedCount(0);
  };

  const handleRateCard = (cardId: string, category: string, rating: CardRating) => {
    const updated = recordCardReview(cardId, category, rating);
    setProgress(updated);
    setSessionReviewedCount((prev) => prev + 1);
  };

  const handleFinishSession = () => {
    setSessionCompleted(true);
  };

  const handleRestartCurrentSession = () => {
    setSessionCompleted(false);
    setSessionReviewedCount(0);
  };

  const handleBackToMenu = () => {
    setActiveMode(null);
    setSingleCardDrill(null);
    setSessionCompleted(false);
  };


  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-10">
      {/* Breadcrumb Navigation */}
      <nav
        className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]"
        aria-label="Breadcrumb"
      >
        <a href="/" className="hover:text-[var(--brand-primary)] transition-colors">
          Kaidevlab
        </a>
        <ChevronRight size={13} className="opacity-40" />
        <span className="text-[var(--text-primary)]">Learn</span>
        <ChevronRight size={13} className="opacity-40" />
        <span className="text-[var(--brand-primary)]">FE Cognitive Gym (基本情報)</span>
      </nav>

      {/* ==================================================== */}
      {/* MODE 1: ACTIVE DRILL SESSION                         */}
      {/* ==================================================== */}
      {activeMode && !sessionCompleted && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <button
              type="button"
              onClick={handleBackToMenu}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft size={14} /> Keluar Sesi
            </button>

            <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)]">
              {activeMode === "quick10" && "⚡ Quick 10 Drill (5 Menit)"}
              {activeMode === "technology" && "🛠️ テクノロジ系 (Technology)"}
              {activeMode === "management" && "📊 マネジメント系 (Management)"}
              {activeMode === "strategy" && "📈 ストラテジ系 (Strategy)"}
              {activeMode === "review" && "🔄 Review Soal Sulit"}
              {activeMode === "all" && "📚 Semua Kartu FE"}
            </span>
          </div>

          <FlashcardView
            cards={activeCards}
            onRateCard={handleRateCard}
            masteredIds={progress.masteredCardIds}
            reviewIds={progress.reviewCardIds}
            streak={progress.streak}
            onFinishSession={handleFinishSession}
          />
        </div>
      )}

      {/* ==================================================== */}
      {/* MODE 2: SESSION SUMMARY MODAL                        */}
      {/* ==================================================== */}
      {activeMode && sessionCompleted && (
        <SessionSummaryModal
          totalReviewed={sessionReviewedCount || activeCards.length}
          streak={progress.streak}
          onRestart={handleRestartCurrentSession}
          onBackToDashboard={handleBackToMenu}
        />
      )}

      {/* ==================================================== */}
      {/* MODE 3: MAIN HUB DASHBOARD                           */}
      {/* ==================================================== */}
      {!activeMode && (
        <div className="flex flex-col gap-10">
          {/* Hero Section */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="eyebrow inline-flex items-center gap-1.5">
                <GraduationCap size={15} />
                Japan IT Certification Drill · 基本情報技術者試験
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-serif">
              FE Cognitive Gym & Study Hub
            </h1>

            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
              Platform belajar mandiri untuk persiapan ujian nasional Jepang <b>FE (基本情報技術者試験)</b> dan syarat ganti visa <b>技人国</b>. 
              Dirancang berbasis ilmu psikologi kognitif: <i>Active Recall</i>, <i>Chunking</i>, audio sintetis, dan analogi visual ala Kitami-shiki.
            </p>

            {/* Offline & PWA Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Mode Kereta Offline Ready (電車モード) 🚅
              </span>

              {deferredPrompt && !isInstalled && (
                <button
                  type="button"
                  onClick={handleInstallPwa}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Download size={13} />
                  <span>Install App ke HP</span>
                </button>
              )}
            </div>
          </div>

          {/* Module Navigation Tabs (All 4 Live Modules) */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] max-w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("flashcards")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "flashcards"
                  ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Layers size={14} />
              <span>🗂️ Flashcards (Active)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("quiz")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "quiz"
                  ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <FileQuestion size={14} />
              <span>📝 過去問 (Kakomon Quiz)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                Active
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tracer")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "tracer"
                  ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Terminal size={14} />
              <span>💻 Pseudocode Tracer (科目B)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                Active
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("cheatsheet")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "cheatsheet"
                  ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Bookmark size={14} />
              <span>⚡ Formula Cheatsheet</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                Active
              </span>
            </button>
          </div>

          {activeTab === "flashcards" && (
            <>
          {/* Quick Search & Kamus Cepat IT FE (Prominent Top Search) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] flex items-center gap-1.5">
                <Search size={14} />
                Kamus Cepat & Pencarian Istilah FE
              </span>
              <span className="text-[11px] text-[var(--text-secondary)]">
                22 Istilah Tersedia (Cari Kanji, Katakana, Romaji, EN, ID)
              </span>
            </div>

            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--brand-primary)] pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik istilah untuk cari arti & rumus (contoh: SQL, 公開鍵, RAID, ACID, Lock, Subnet, OSI, Pipelining)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl border-2 border-[var(--border)] focus:border-[var(--brand-primary)] bg-[var(--surface)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none shadow-[var(--shadow)] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-[var(--surface-soft)] text-[var(--text-secondary)] transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Live Search Results Grid */}
            {searchQuery.trim().length > 0 && (
              <div className="p-5 rounded-2xl border border-[var(--brand-primary)]/40 bg-[var(--surface)] shadow-lg flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)] pb-2 border-b border-[var(--border)]">
                  <span>
                    Ditemukan <b className="text-[var(--brand-primary)]">{searchResults.length}</b> istilah untuk &ldquo;{searchQuery}&rdquo;
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-[var(--brand-primary)] hover:underline font-bold"
                  >
                    Tutup Hasil ×
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[var(--text-secondary)]">
                    Tidak ada istilah yang cocok. Coba kata kunci lain atau browse kategori di bawah.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {searchResults.map((card) => (
                      <div
                        key={card.id}
                        className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/60 hover:bg-[var(--surface-soft)] transition-colors flex flex-col justify-between gap-2.5"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] mb-1">
                            <span className="font-semibold text-[var(--brand-primary)]">{card.subCategory}</span>
                            <span className="opacity-70">{card.furigana}</span>
                          </div>
                          <h4 className="text-base font-bold text-[var(--text-primary)] font-sans">{card.termJp}</h4>
                          <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">{card.termEn}</p>
                          <p className="text-xs text-[var(--text-primary)]/85 mt-1.5 line-clamp-2 leading-relaxed">
                            {card.definitionId}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-[var(--border)]/60 flex items-center justify-between">
                          <span className="text-[10px] text-amber-500 font-medium">★ Prioritas {card.importance}/3</span>
                          <button
                            type="button"
                            onClick={() => handleStartSingleCard(card)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-primary)] hover:underline"
                          >
                            Drill Kartu Ini →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Action: Start 10-Cards Drill (Atomic Habits) */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--surface-soft)] border border-[var(--glass-border)] shadow-[var(--shadow)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1">
                  <Flame size={14} className="fill-amber-500 animate-pulse" />
                  Rekomendasi Harian (Zero Friction)
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] font-sans">
                Daily Quick Drill: 10 Kartu (5 Menit)
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Acak 10 istilah penting dari seluruh materi ujian. Dilengkapi efek suara empuk dan kontrol swipe jempol untuk belajar di kereta atau waktu santai.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleStartSession("quick10")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-98 whitespace-nowrap"
            >
              <Zap size={16} /> Mulai 10 Kartu Sekarang
            </button>
          </div>

          {/* Progress Tracker Card */}
          <StudyProgressCard progress={progress} onProgressUpdated={refreshProgress} />

          {/* Category Drills Grid */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase font-bold tracking-widest text-[var(--brand-primary)]">
                Kurikulum Resmi IPA
              </p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] font-sans mt-0.5">
                Pilih Modul Pembelajaran
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Technology */}
              <div
                onClick={() => handleStartSession("technology")}
                className="group cursor-pointer p-6 rounded-2xl border border-[var(--border)] hover:border-blue-500/50 bg-[var(--surface)] hover:bg-[var(--surface-soft)] transition-all flex flex-col justify-between gap-4 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Cpu size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] font-sans group-hover:text-blue-500 transition-colors">
                    テクノロジ系 (Technology)
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Arsitektur komputer, enkripsi (公開鍵), SQL Injection, Virtual Memory, Subnet Mask, dan basis data.
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-blue-500 pt-2 border-t border-[var(--border)]">
                  <span>Mulai Drill</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Management */}
              <div
                onClick={() => handleStartSession("management")}
                className="group cursor-pointer p-6 rounded-2xl border border-[var(--border)] hover:border-emerald-500/50 bg-[var(--surface)] hover:bg-[var(--surface-soft)] transition-all flex flex-col justify-between gap-4 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Kanban size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] font-sans group-hover:text-emerald-500 transition-colors">
                    マネジメント系 (Management)
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Manajemen proyek, Critical Path (PERT), WBS (Work Breakdown Structure), dan SLA / ITIL service.
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-500 pt-2 border-t border-[var(--border)]">
                  <span>Mulai Drill</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Strategy */}
              <div
                onClick={() => handleStartSession("strategy")}
                className="group cursor-pointer p-6 rounded-2xl border border-[var(--border)] hover:border-amber-500/50 bg-[var(--surface)] hover:bg-[var(--surface-soft)] transition-all flex flex-col justify-between gap-4 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] font-sans group-hover:text-amber-500 transition-colors">
                    ストラテジ系 (Strategy & Legal)
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Analisis SWOT, Balanced Scorecard (BSC), Hak Cipta IT Jepang, serta kontrak Haken vs Ukeoi.
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-amber-500 pt-2 border-t border-[var(--border)]">
                  <span>Mulai Drill</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Drills: Review Queue & All */}
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => handleStartSession("review")}
              disabled={progress.reviewCardIds.length === 0}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-500 font-semibold text-xs transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <RotateCcw size={15} /> Review Kartu Sulit ({progress.reviewCardIds.length})
            </button>

            <button
              type="button"
              onClick={() => handleStartSession("all")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold text-xs transition-all"
            >
              <BookOpen size={15} /> Drill Seluruh Materi ({FE_CARDS.length} Kartu)
            </button>
          </div>

          {/* Cognitive Science Footer Note */}
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs text-[var(--text-secondary)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
              <Sparkles size={16} className="text-[var(--brand-primary)] shrink-0" />
              <span>
                <b>Tips Belajar Efektif:</b> Otak mengingat 3x lebih kuat saat kamu berusaha menebak dulu sebelum membalik kartu (Active Recall).
              </span>
            </div>
            <span className="text-[11px] opacity-70">Rujukan: <i>Make It Stick</i> (Brown et al.)</span>
          </div>
          </>
          )}

          {/* TAB 2: KAKOMON QUIZ (科目A) */}
          {activeTab === "quiz" && (
            <QuizView onBackToMenu={() => setActiveTab("flashcards")} />
          )}

          {/* TAB 3: PSEUDOCODE TRACER (科目B) */}
          {activeTab === "tracer" && (
            <TracerView onBackToMenu={() => setActiveTab("flashcards")} />
          )}

          {/* TAB 4: FORMULA CHEATSHEET */}
          {activeTab === "cheatsheet" && (
            <CheatsheetView />
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* ROADMAP PREVIEW MODAL                                */}
      {/* ==================================================== */}
      {roadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)]">
                Product Roadmap
              </span>
              <button
                type="button"
                onClick={() => setRoadmapModal(null)}
                className="p-1 rounded-lg hover:bg-[var(--surface-soft)] text-[var(--text-secondary)]"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{roadmapModal.title}</h3>
              <p className="text-xs font-semibold text-[var(--brand-primary)] mt-0.5">
                Target: {roadmapModal.target}
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                {roadmapModal.desc}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs text-[var(--text-secondary)] flex flex-col gap-1.5">
              <div className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" />
                Status Pengembangan:
              </div>
              <p>
                Modul ini dijadwalkan dibangun pada fase berikutnya untuk melengkapi persiapan ujian FE secara menyeluruh di kaidevlab.com.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setRoadmapModal(null)}
              className="w-full py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
