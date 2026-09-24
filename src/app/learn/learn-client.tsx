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
  Star,
  Languages,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { FE_CARDS, FECard } from "@/data/fe-study-data";
import {
  StudyProgress,
  loadStudyProgress,
  recordCardReview,
  toggleStarCard,
  CardRating,
  DEFAULT_PROGRESS,
} from "@/lib/fe-study-storage";
import { FlashcardView } from "@/components/fe-study/flashcard-view";
import { StudyProgressCard } from "@/components/fe-study/study-progress-card";
import { SessionSummaryModal } from "@/components/fe-study/session-summary-modal";
import { QuizView } from "@/components/fe-study/quiz-view";
import { TracerView } from "@/components/fe-study/tracer-view";
import { CheatsheetView } from "@/components/fe-study/cheatsheet-view";
import { WrongQuestionsView } from "@/components/fe-study/wrong-questions-view";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { FE_DAILY_DECKS, FEDailyDeck, getCardsForDay } from "@/data/fe-daily-decks";
import {
  loadWrongQuestions,
  getWrongNotebookStats,
  WrongQuestionsStore,
} from "@/lib/fe-wrong-questions-storage";
import { QuizQuestion } from "@/data/fe-quiz-data";
import { useLanguage } from "@/lib/i18n/context";

const LEARN_I18N = {
  id: {
    back: "Keluar Sesi",
    backShort: "Keluar",
    modeQuick10: "⚡ Quick 10 Drill (5 Menit)",
    modeTech: "🛠️ テクノロジ系",
    modeMgmt: "📊 マネジメント系",
    modeStrat: "📈 ストラテジ系",
    modeVocab: "設問・重要用語 (Vocab & Kanji)",
    modeReview: "🔄 Review Soal Sulit",
    modeStarred: "⭐ Drill Kartu Favorit",
    modeAll: "📚 Semua Kartu FE",
    eyebrow: "Japan IT Certification Drill · 基本情報技術者試験",
    title: "FE Cognitive Gym & Study Hub",
    trainMode: "Mode Kereta Offline Ready (電車モード) 🚅",
    installApp: "Install App ke HP",
    tabFlashcards: "🗂️ Flashcards",
    tabQuiz: "📝 過去問 (Kakomon Quiz)",
    tabTracer: "💻 Pseudocode Tracer (科目B)",
    tabCheatsheet: "⚡ Formula Cheatsheet",
    tabMistakes: "📕 Soal Salah",
    searchTitle: "Kamus Cepat & Pencarian Istilah FE",
    searchSubtitle: "159 Istilah Tersedia (129 Konsep IT + 30 Kosakata Sakti Soal)",
    searchPlaceholder: "Cari arti & istilah FE (contoh: SQL, 公開鍵, RAID, ACID, Lock, Subnet, OSI)...",
    searchFound: "Ditemukan",
    searchTermsFor: "istilah untuk",
    searchClose: "Tutup Hasil ×",
    searchEmpty: "Tidak ada istilah yang cocok. Coba kata kunci lain atau browse kategori di bawah.",
    drillThisCard: "Drill Kartu Ini →",
    dailyEyebrow: "Rekomendasi Harian (Zero Friction)",
    dailyTitle: "Daily Quick Drill: 10 Kartu (5 Menit)",
    dailyDesc: "Acak 10 istilah penting dari seluruh materi ujian. Dilengkapi efek suara empuk dan kontrol swipe jempol untuk belajar di kereta atau waktu santai.",
    dailyBtn: "Mulai 10 Kartu Sekarang",
    modulesEyebrow: "Kurikulum Resmi IPA",
    modulesTitle: "Pilih Modul Pembelajaran",
    techDesc: "Arsitektur komputer, enkripsi (公開鍵), SQL Injection, Virtual Memory, Subnet Mask, dan basis data.",
    mgmtDesc: "Manajemen proyek, Critical Path (PERT), WBS (Work Breakdown Structure), dan SLA / ITIL service.",
    stratDesc: "Analisis SWOT, Balanced Scorecard (BSC), Hak Cipta IT Jepang, serta kontrak Haken vs Ukeoi.",
    vocabDesc: "30 kosakata kunci & kanji penentu soal ujian FE (改ざん, 否認防止, 脆弱性, 適切でない, 整合性, 冗長化, 閾値).",
    startDrill: "Mulai Drill",
    startDrillVocab: "Mulai Drill (30 Kartu)",
    drillStarred: "Drill Kartu Favorit",
    reviewDifficult: "Review Kartu Sulit",
    drillAll: "Drill Seluruh Materi (159 Kartu)",
    tipTitle: "Tips Belajar Efektif:",
    tipDesc: "Otak mengingat 3x lebih kuat saat kamu berusaha menebak dulu sebelum membalik kartu (Active Recall).",
    tipRef: "Rujukan: Make It Stick (Brown et al.)",
    dailyDecksEyebrow: "Porsi Belajar Terstruktur (Bite-Sized)",
    dailyDecksTitle: "📅 Kurikulum Harian 16 Hari (10 Kosakata / Hari)",
    dailyDecksDesc: "Bukan kartu acak. 159 materi dikelompokkan tematik 10 kartu per hari agar hafalan melekat kuat, bertahap, dan tidak bikin jenuh.",
    startDayDeck: "Mulai Hari Ini →",
    dayUnit: "Hari",
    cardUnit: "Kartu",
    deckMastered: "Dikuasai",
  },
  ja: {
    back: "セッション終了",
    backShort: "終了",
    modeQuick10: "⚡ Quick 10 ドリル (5分)",
    modeTech: "🛠️ テクノロジ系",
    modeMgmt: "📊 マネジメント系",
    modeStrat: "📈 ストラテジ系",
    modeVocab: "設問・重要用語 (Vocab & Kanji)",
    modeReview: "🔄 復習・苦手カード",
    modeStarred: "⭐ お気に入りカード",
    modeAll: "📚 全FEカード",
    eyebrow: "国家試験・基本情報技術者試験 学習ドリル",
    title: "FE Cognitive Gym & 学習ハブ",
    trainMode: "オフライン電車モード対応 (電車モード) 🚅",
    installApp: "ホーム画面に追加",
    tabFlashcards: "🗂️ フラッシュカード",
    tabQuiz: "📝 過去問 (CBT模試)",
    tabTracer: "💻 擬似言語トレーサー (科目B)",
    tabCheatsheet: "⚡ 公式＆計算ツール",
    tabMistakes: "📕 間違え直しノート",
    searchTitle: "FE用語クイック検索・辞書",
    searchSubtitle: "159用語収録（IT専門概念129 + 頻出試験用語30）",
    searchPlaceholder: "FE用語を検索（例: SQL, 公開鍵, RAID, ACID, Lock, Subnet, OSI）...",
    searchFound: "検索結果",
    searchTermsFor: "件該当：",
    searchClose: "検索を閉じる ×",
    searchEmpty: "該当する用語がありません。別のキーワードまたはカテゴリ一覧から選択してください。",
    drillThisCard: "この単語をドリル →",
    dailyEyebrow: "毎日の学習習慣（ゼロフリクション）",
    dailyTitle: "デイリークイックドリル: 10枚 (5分)",
    dailyDesc: "全試験範囲から重要10用語をランダム出題。音声フィードバックと快適なスワイプ操作で通勤電車でもサクサク学習。",
    dailyBtn: "今すぐ10枚ドリルを開始",
    modulesEyebrow: "IPA公式シラバス準拠",
    modulesTitle: "学習モジュールを選択",
    techDesc: "コンピュータ構成、暗号化（公開鍵）、SQLインジェクション、仮想メモリ、サブネット、データベース。",
    mgmtDesc: "プロジェクト管理、クリティカルパス（PERT法）、WBS、ITILサービスマネジメント。",
    stratDesc: "SWOT分析、バランススコアカード（BSC）、著作権・知的財産法、派遣と請負の違い。",
    vocabDesc: "試験で合否を分ける重要漢字・出題用語30選（改ざん、否認防止、脆弱性、適切でない、整合性、冗長化、閾値）。",
    startDrill: "ドリル開始",
    startDrillVocab: "ドリル開始 (30枚)",
    drillStarred: "お気に入りカード",
    reviewDifficult: "苦手カード復習",
    drillAll: "全出題範囲ドリル (159枚)",
    tipTitle: "効果的な学習のコツ:",
    tipDesc: "答えを見る前に自力で思い出す練習（アクティブリコール）を行うことで、記憶の定着率は3倍向上します。",
    tipRef: "参考文献: 『Make It Stick（学び方の科学）』",
    dailyDecksEyebrow: "構造化学習プラン（スモールステップ）",
    dailyDecksTitle: "📅 16日間デイリープラン（1日10用語）",
    dailyDecksDesc: "全159用語をテーマ別に10語ずつ分割。ランダム学習の散漫さを防ぎ、体系的な記憶定着を実現します。",
    startDayDeck: "この日のドリルを開始 →",
    dayUnit: "日目",
    cardUnit: "枚",
    deckMastered: "習得済み",
  },
  en: {
    back: "Exit Session",
    backShort: "Exit",
    modeQuick10: "⚡ Quick 10 Drill (5 Min)",
    modeTech: "🛠️ Technology",
    modeMgmt: "📊 Management",
    modeStrat: "📈 Strategy & Legal",
    modeVocab: "設問・重要用語 (Vocab & Kanji)",
    modeReview: "🔄 Review Weak Cards",
    modeStarred: "⭐ Starred Cards Drill",
    modeAll: "📚 All FE Cards",
    eyebrow: "Japan IT Certification Drill · Fundamental IT Engineer Examination",
    title: "FE Cognitive Gym & Study Hub",
    trainMode: "Offline Commuter Mode Ready (電車モード) 🚅",
    installApp: "Install App to Device",
    tabFlashcards: "🗂️ Flashcards",
    tabQuiz: "📝 Past Exams (Kakomon CBT)",
    tabTracer: "💻 Pseudocode Tracer (Section B)",
    tabCheatsheet: "⚡ Formula Cheatsheet",
    tabMistakes: "📕 Mistake Notebook",
    searchTitle: "Quick Search & FE IT Dictionary",
    searchSubtitle: "159 Terms Available (129 IT Concepts + 30 Exam Vocabulary)",
    searchPlaceholder: "Search FE terms (e.g. SQL, Public Key, RAID, ACID, Lock, Subnet, OSI)...",
    searchFound: "Found",
    searchTermsFor: "terms for",
    searchClose: "Close Results ×",
    searchEmpty: "No matching terms found. Try another keyword or browse the categories below.",
    drillThisCard: "Drill This Card →",
    dailyEyebrow: "Daily Habit (Zero Friction)",
    dailyTitle: "Daily Quick Drill: 10 Cards (5 Min)",
    dailyDesc: "Random 10 high-yield exam terms. Features sound effects and smooth thumb swipe controls for quick transit study.",
    dailyBtn: "Start 10 Cards Now",
    modulesEyebrow: "Official IPA Syllabus",
    modulesTitle: "Select Study Module",
    techDesc: "Computer architecture, cryptography (Public Key), SQL Injection, Virtual Memory, Subnet Mask, and databases.",
    mgmtDesc: "Project management, Critical Path (PERT), WBS, and SLA / ITIL service management.",
    stratDesc: "SWOT analysis, Balanced Scorecard (BSC), Japanese IT copyright law, and Haken vs Ukeoi contracts.",
    vocabDesc: "30 high-yield exam indicator terms & kanji (改ざん, 否認防止, 脆弱性, 適切でない, 整合性, 冗長化, 閾値).",
    startDrill: "Start Drill",
    startDrillVocab: "Start Drill (30 Cards)",
    drillStarred: "Starred Cards",
    reviewDifficult: "Review Difficult Cards",
    drillAll: "Drill All Cards (159 Cards)",
    tipTitle: "Effective Study Tip:",
    tipDesc: "Your brain retains concepts 3x longer when you force yourself to recall before flipping the card (Active Recall).",
    tipRef: "Reference: Make It Stick (Brown et al.)",
    dailyDecksEyebrow: "Structured Daily Plan (Bite-Sized Learning)",
    dailyDecksTitle: "📅 16-Day Daily Plan (10 Terms / Day)",
    dailyDecksDesc: "Master 159 FE exam terms without cognitive overload. Grouped thematically at 10 cards per day for structured retention.",
    startDayDeck: "Start Today's Deck →",
    dayUnit: "Day",
    cardUnit: "Cards",
    deckMastered: "Mastered",
  }
};

type StudyMode = "all" | "quick10" | "technology" | "management" | "strategy" | "vocab" | "review" | "starred";
type HubTab = "flashcards" | "quiz" | "tracer" | "cheatsheet" | "mistakes";

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
    desc: "Active recall 159 istilah IT Jepang & Inggris, furigana kanji toggle, audio TTS, dan analogi visual Kitami-shiki.",
    target: "Pondasi Terminologi & Kosakata Ujian FE (159 Kartu)",
    status: "active",
  },
  {
    id: "quiz",
    title: "Simulasi 過去問 (Kakomon)",
    badge: "Active",
    desc: "Simulator CBT 45 soal otentik dengan timer, seleksi sesi 15/30/45 soal, matriks navigator nomor, flag review, dan sertifikat kelulusan.",
    target: "Simulasi Ujian CBT Resmi",
    status: "active",
  },
  {
    id: "tracer",
    title: "Pseudocode Step-Tracer",
    badge: "Active",
    desc: "Interactive debugger baris demi baris untuk melatih trace table (トレース表) dan 8 algoritma resmi ujian FE.",
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
  {
    id: "mistakes",
    title: "間違え直しノート (Buku Soal Salah)",
    badge: "Active",
    desc: "Koleksi otomatis soal-soal yang pernah kamu jawab keliru di latihan maupun CBT dengan analisis domain kelemahan.",
    target: "Penguatan Remedial Kognitif",
    status: "active",
  },
];

export function LearnClient() {
  const { locale } = useLanguage();
  const txt = LEARN_I18N[locale] || LEARN_I18N.id;
  const [progress, setProgress] = useState<StudyProgress>(DEFAULT_PROGRESS);
  const [activeTab, setActiveTab] = useState<HubTab>("flashcards");
  const [activeMode, setActiveMode] = useState<StudyMode | null>(null);
  const [selectedDayDeck, setSelectedDayDeck] = useState<FEDailyDeck | null>(null);
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

  const [wrongStore, setWrongStore] = useState<WrongQuestionsStore>({ records: {}, lastUpdated: 0 });
  const [mistakeDrillQuestions, setMistakeDrillQuestions] = useState<QuizQuestion[] | null>(null);

  // Load progress and wrong questions from localStorage once mounted or tab changes
  useEffect(() => {
    setProgress(loadStudyProgress());
    setWrongStore(loadWrongQuestions());
  }, [activeTab]);

  const wrongStats = useMemo(() => {
    return getWrongNotebookStats(wrongStore);
  }, [wrongStore]);

  const refreshProgress = useCallback(() => {
    setProgress(loadStudyProgress());
    setWrongStore(loadWrongQuestions());
  }, []);

  // Filter cards based on selected mode
  const activeCards = useMemo(() => {
    if (singleCardDrill) return [singleCardDrill];
    if (selectedDayDeck) return getCardsForDay(selectedDayDeck.day);
    if (!activeMode) return [];

    let filtered: FECard[] = [];

    if (activeMode === "quick10") {
      filtered = [...FE_CARDS].sort(() => 0.5 - Math.random()).slice(0, 10);
    } else if (
      activeMode === "technology" ||
      activeMode === "management" ||
      activeMode === "strategy" ||
      activeMode === "vocab"
    ) {
      filtered = FE_CARDS.filter((c) => c.category === activeMode);
    } else if (activeMode === "review") {
      const reviewSet = new Set(progress?.reviewCardIds || []);
      filtered = FE_CARDS.filter((c) => reviewSet.has(c.id));
      if (filtered.length === 0) {
        filtered = FE_CARDS.slice(0, 5);
      }
    } else if (activeMode === "starred") {
      const starredSet = new Set(progress?.starredCardIds || []);
      filtered = FE_CARDS.filter((c) => starredSet.has(c.id));
      if (filtered.length === 0) {
        filtered = FE_CARDS.slice(0, 5);
      }
    } else {
      filtered = FE_CARDS;
    }

    return filtered;
  }, [activeMode, selectedDayDeck, singleCardDrill, progress?.reviewCardIds, progress?.starredCardIds]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return FE_CARDS.filter(
      (c) =>
        c.termJp.toLowerCase().includes(q) ||
        (c.furigana && c.furigana.toLowerCase().includes(q)) ||
        (c.ruby && c.ruby.toLowerCase().includes(q)) ||
        c.termEn.toLowerCase().includes(q) ||
        c.definitionId.toLowerCase().includes(q) ||
        c.keyDifferentiator.toLowerCase().includes(q) ||
        c.subCategory.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleStartSession = (mode: StudyMode) => {
    setSingleCardDrill(null);
    setSelectedDayDeck(null);
    setActiveMode(mode);
    setSessionCompleted(false);
    setSessionReviewedCount(0);
  };

  const handleStartDailyDeck = (deck: FEDailyDeck) => {
    setSingleCardDrill(null);
    setSelectedDayDeck(deck);
    setActiveMode(null);
    setSessionCompleted(false);
    setSessionReviewedCount(0);
  };

  const handleStartSingleCard = (card: FECard) => {
    setSelectedDayDeck(null);
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

  const handleToggleStar = (cardId: string) => {
    const updated = toggleStarCard(cardId);
    setProgress(updated);
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
    setSelectedDayDeck(null);
    setSingleCardDrill(null);
    setSessionCompleted(false);
  };

  const isDrillActive = Boolean(activeMode || selectedDayDeck);

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
      {/* ACTIVE DRILL SESSION (CATEGORY, DAILY DECK, QUICK10) */}
      {/* ==================================================== */}
      {isDrillActive && !sessionCompleted && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] gap-2">
            <button
              type="button"
              onClick={handleBackToMenu}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
            >
              <ArrowLeft size={14} /> <span className="hidden sm:inline">{txt.back}</span><span className="sm:hidden">{txt.backShort}</span>
            </button>

            <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] truncate text-right">
              {selectedDayDeck ? (
                <>📅 {selectedDayDeck.titleId} ({activeCards.length} {txt.cardUnit})</>
              ) : (
                <>
                  {activeMode === "quick10" && txt.modeQuick10}
                  {activeMode === "technology" && txt.modeTech}
                  {activeMode === "management" && txt.modeMgmt}
                  {activeMode === "strategy" && txt.modeStrat}
                  {activeMode === "vocab" && txt.modeVocab}
                  {activeMode === "review" && txt.modeReview}
                  {activeMode === "starred" && txt.modeStarred}
                  {activeMode === "all" && txt.modeAll}
                </>
              )}
            </span>
          </div>

          <FlashcardView
            cards={activeCards}
            onRateCard={handleRateCard}
            masteredIds={progress.masteredCardIds}
            reviewIds={progress.reviewCardIds}
            starredIds={progress.starredCardIds}
            onToggleStar={handleToggleStar}
            streak={progress.streak}
            onFinishSession={handleFinishSession}
          />
        </div>
      )}

      {/* ==================================================== */}
      {/* MODE 2: SESSION SUMMARY MODAL                        */}
      {/* ==================================================== */}
      {isDrillActive && sessionCompleted && (
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
      {!isDrillActive && (
        <div className="flex flex-col gap-10">
          {/* Hero Section */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="eyebrow inline-flex items-center gap-1.5">
                <GraduationCap size={15} />
                {txt.eyebrow}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-serif">
              {txt.title}
            </h1>

            {locale === "ja" ? (
              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                国家試験<b>「基本情報技術者試験（FE）」</b>および<b>技人国ビザ</b>取得のための自習型認知学習ジム。
                認知科学（<i>アクティブリコール</i>、<i>チャンキング</i>、キタミ式直感アナロジー、Web Speech音声合成）に基づき設計されています。
              </p>
            ) : locale === "en" ? (
              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                Self-study cognitive gym for Japan’s national <b>Fundamental IT Engineer Examination (FE)</b> and <b>Engineer visa</b> qualification. 
                Engineered with cognitive science: <i>Active Recall</i>, <i>Chunking</i>, Japanese TTS audio, and Kitami-style intuitive visual analogies.
              </p>
            ) : (
              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                Platform belajar mandiri untuk persiapan ujian nasional Jepang <b>FE (基本情報技術者試験)</b> dan syarat ganti visa <b>技人国</b>. 
                Dirancang berbasis ilmu psikologi kognitif: <i>Active Recall</i>, <i>Chunking</i>, audio sintetis, dan analogi visual ala Kitami-shiki.
              </p>
            )}

            {/* Offline & PWA Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {txt.trainMode}
              </span>

              {deferredPrompt && !isInstalled && (
                <button
                  type="button"
                  onClick={handleInstallPwa}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Download size={13} />
                  <span>{txt.installApp}</span>
                </button>
              )}
            </div>
          </div>

          {/* Module Navigation Tabs (All 4 Live Modules - Horizontal Scroll on Mobile) */}
          <div className="w-full overflow-x-auto no-scrollbar pb-1">
            <div className="inline-flex items-center gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] min-w-max">
              <button
                type="button"
                onClick={() => setActiveTab("flashcards")}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === "flashcards"
                    ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Layers size={14} />
                <span>{txt.tabFlashcards}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("quiz")}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === "quiz"
                    ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <FileQuestion size={14} />
                <span>{txt.tabQuiz}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("tracer")}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === "tracer"
                    ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Terminal size={14} />
                <span>{txt.tabTracer}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("cheatsheet")}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === "cheatsheet"
                    ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Bookmark size={14} />
                <span>{txt.tabCheatsheet}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMistakeDrillQuestions(null);
                  setActiveTab("mistakes");
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === "mistakes"
                    ? "bg-[var(--surface)] text-rose-500 shadow-sm border border-rose-500/30"
                    : "text-[var(--text-secondary)] hover:text-rose-500"
                }`}
              >
                <BookOpen size={14} />
                <span>{txt.tabMistakes}</span>
                {wrongStats.unmastered > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-mono font-bold">
                    {wrongStats.unmastered}
                  </span>
                )}
              </button>
            </div>
          </div>

          {activeTab === "flashcards" && (
            <>
          {/* Quick Search & Kamus Cepat IT FE (Prominent Top Search) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] flex items-center gap-1.5">
                <Search size={14} />
                {txt.searchTitle}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)]">
                {txt.searchSubtitle}
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
                placeholder={txt.searchPlaceholder}
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
                    {txt.searchFound} <b className="text-[var(--brand-primary)]">{searchResults.length}</b> {txt.searchTermsFor} &ldquo;{searchQuery}&rdquo;
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-[var(--brand-primary)] hover:underline font-bold"
                  >
                    {txt.searchClose}
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[var(--text-secondary)]">
                    {txt.searchEmpty}
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
                          </div>
                          <h4 className="text-base font-bold text-[var(--text-primary)] font-sans">
                            <RubyTerm rubyText={card.ruby} fallbackText={card.termJp} />
                          </h4>
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
                            {txt.drillThisCard}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ==================================================== */}
          {/* FEATURE: 13-DAY STRUCTURED DAILY PLAN (10 CARDS/DAY) */}
          {/* ==================================================== */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[var(--surface)] via-[var(--surface-soft)] to-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow)] flex flex-col gap-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/25 text-[var(--brand-primary)] text-xs font-bold uppercase tracking-wider">
                    <Calendar size={13} className="text-[var(--brand-primary)]" />
                    <span>{txt.dailyDecksEyebrow}</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>{FE_CARDS.length} {txt.cardUnit} · {FE_DAILY_DECKS.length} {txt.dayUnit}</span>
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] font-serif">
                  {txt.dailyDecksTitle}
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {txt.dailyDecksDesc}
                </p>
              </div>

              {/* Overall Deck Mastery Counter */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm shrink-0">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">
                    Total Dikuasai
                  </span>
                  <span className="text-sm font-bold font-mono text-[var(--text-primary)]">
                    <b className="text-emerald-500">{progress?.masteredCardIds?.length || 0}</b> / {FE_CARDS.length}
                  </span>
                </div>
                <div className="w-16 h-2 rounded-full bg-[var(--surface-soft)] overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{
                      width: `${Math.min(100, Math.round(((progress?.masteredCardIds?.length || 0) / (FE_CARDS.length || 1)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Daily Decks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
              {FE_DAILY_DECKS.map((deck) => {
                const masteredCount = deck.cardIds.filter((id) =>
                  progress?.masteredCardIds?.includes(id)
                ).length;
                const isAllMastered = masteredCount === deck.cardIds.length;

                // Category theme styles
                let catBadge = "bg-blue-500/10 text-blue-500 border-blue-500/20";
                let catLabel = "テクノロジ";
                if (deck.category === "management") {
                  catBadge = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                  catLabel = "マネジメント";
                } else if (deck.category === "strategy") {
                  catBadge = "bg-amber-500/10 text-amber-500 border-amber-500/20";
                  catLabel = "ストラテジ";
                } else if (deck.category === "vocab") {
                  catBadge = "bg-purple-500/10 text-purple-500 border-purple-500/20";
                  catLabel = "設問・語彙";
                }

                return (
                  <div
                    key={deck.day}
                    onClick={() => handleStartDailyDeck(deck)}
                    className="cursor-pointer p-4 sm:p-5 rounded-2xl border border-[var(--border)] hover:border-[var(--brand-primary)] bg-[var(--surface)] hover:bg-[var(--surface-soft)] transition-all flex flex-col justify-between gap-3 shadow-sm hover:shadow-md group active:scale-[0.99]"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--text-primary)]">
                          DAY {deck.day.toString().padStart(2, "0")}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${catBadge}`}>
                            {catLabel}
                          </span>
                          <span className="text-[11px] font-mono text-[var(--text-secondary)] font-medium">
                            {deck.cardIds.length} {txt.cardUnit}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
                          {deck.titleId}
                        </h4>
                        <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">
                          {deck.titleJp}
                        </p>
                      </div>

                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                        {deck.descriptionId}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[var(--border)]/70 flex items-center justify-between text-xs">
                      {/* Mini Progress */}
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-[var(--surface-soft)] overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              isAllMastered ? "bg-emerald-500" : "bg-[var(--brand-primary)]"
                            }`}
                            style={{
                              width: `${Math.round((masteredCount / deck.cardIds.length) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                          {masteredCount}/{deck.cardIds.length}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 font-bold text-[var(--brand-primary)] group-hover:underline">
                        <span>{isAllMastered ? "Review" : "Drill"}</span>
                        <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Action: Start 10-Cards Drill (Atomic Habits) */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--surface-soft)] border border-[var(--glass-border)] shadow-[var(--shadow)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1">
                  <Flame size={14} className="fill-amber-500 animate-pulse" />
                  {txt.dailyEyebrow}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] font-sans">
                {txt.dailyTitle}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {txt.dailyDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleStartSession("quick10")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-98 whitespace-nowrap"
            >
              <Zap size={16} /> {txt.dailyBtn}
            </button>
          </div>

          {/* Progress Tracker Card */}
          <StudyProgressCard progress={progress} onProgressUpdated={refreshProgress} />

          {/* Category Drills Grid */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase font-bold tracking-widest text-[var(--brand-primary)]">
                {txt.modulesEyebrow}
              </p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] font-sans mt-0.5">
                {txt.modulesTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    {txt.techDesc}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-blue-500 pt-2 border-t border-[var(--border)]">
                  <span>{txt.startDrill}</span>
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
                    {txt.mgmtDesc}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-500 pt-2 border-t border-[var(--border)]">
                  <span>{txt.startDrill}</span>
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
                    {txt.stratDesc}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-amber-500 pt-2 border-t border-[var(--border)]">
                  <span>{txt.startDrill}</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Exam Vocabulary & Kanji */}
              <div
                onClick={() => handleStartSession("vocab")}
                className="group cursor-pointer p-6 rounded-2xl border border-[var(--border)] hover:border-purple-500/50 bg-[var(--surface)] hover:bg-[var(--surface-soft)] transition-all flex flex-col justify-between gap-4 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Languages size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] font-sans group-hover:text-purple-500 transition-colors">
                    設問・重要用語 (Vocab & Kanji)
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {txt.vocabDesc}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-purple-500 pt-2 border-t border-[var(--border)]">
                  <span>{txt.startDrillVocab}</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Drills: Starred, Review Queue & All */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleStartSession("starred")}
              disabled={!progress.starredCardIds || progress.starredCardIds.length === 0}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-semibold text-xs transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <Star size={15} className="fill-amber-500" /> {txt.drillStarred} ({progress.starredCardIds?.length || 0})
            </button>

            <button
              type="button"
              onClick={() => handleStartSession("review")}
              disabled={progress.reviewCardIds.length === 0}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-semibold text-xs transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <RotateCcw size={15} /> {txt.reviewDifficult} ({progress.reviewCardIds.length})
            </button>

            <button
              type="button"
              onClick={() => handleStartSession("all")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold text-xs transition-all"
            >
              <BookOpen size={15} /> {txt.drillAll}
            </button>
          </div>

          {/* Cognitive Science Footer Note */}
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs text-[var(--text-secondary)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
              <Sparkles size={16} className="text-[var(--brand-primary)] shrink-0" />
              <span>
                <b>{txt.tipTitle}</b> {txt.tipDesc}
              </span>
            </div>
            <span className="text-[11px] opacity-70">{txt.tipRef}</span>
          </div>
          </>
          )}

          {/* TAB 2: KAKOMON QUIZ (科目A) */}
          {activeTab === "quiz" && (
            <QuizView
              onBackToMenu={() => {
                setMistakeDrillQuestions(null);
                setActiveTab("flashcards");
              }}
              customQuestions={mistakeDrillQuestions || undefined}
              customTitle={mistakeDrillQuestions ? `Drill Soal Salah (${mistakeDrillQuestions.length} Soal)` : undefined}
              onOpenMistakeNotebook={() => {
                setMistakeDrillQuestions(null);
                setActiveTab("mistakes");
              }}
            />
          )}

          {/* TAB 3: PSEUDOCODE TRACER (科目B) */}
          {activeTab === "tracer" && (
            <TracerView onBackToMenu={() => setActiveTab("flashcards")} />
          )}

          {/* TAB 4: FORMULA CHEATSHEET */}
          {activeTab === "cheatsheet" && (
            <CheatsheetView />
          )}

          {/* TAB 5: MISTAKE NOTEBOOK (間違え直しノート) */}
          {activeTab === "mistakes" && (
            <WrongQuestionsView
              onBackToMenu={() => setActiveTab("flashcards")}
              onStartDrill={(questions) => {
                setMistakeDrillQuestions(questions);
                setActiveTab("quiz");
              }}
            />
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
