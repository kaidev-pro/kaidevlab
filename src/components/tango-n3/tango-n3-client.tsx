"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Sparkles,
  Flame,
  RotateCcw,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Bookmark,
  Check,
  X,
  Search,
  Star,
  Languages,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  GraduationCap,
  Filter,
  Brain,
  Calendar,
  Clock,
  Target,
  ShieldAlert,
  Volume2,
  Lock,
  Unlock,
  Trophy,
  Award,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import {
  TANGO_N3_CARDS,
  TANGO_N3_CHAPTERS,
  TANGO_N3_READINGS,
  TangoN3Card,
  TangoChapter,
} from "@/data/tango-n3-data";
import {
  loadTangoProgress,
  recordTangoReview,
  toggleStarTangoCard,
  getWeakCards,
  getSrsSchedules,
  recordChapterQuizResult,
  setMasteryMode,
  CardRating,
  TangoProgress,
  DEFAULT_TANGO_PROGRESS,
} from "@/lib/tango-n3-storage";
import { TangoFlashcardView } from "@/components/tango-n3/tango-flashcard-view";
import { TangoQuizView } from "@/components/tango-n3/tango-quiz-view";
import { TangoReadingView } from "@/components/tango-n3/tango-reading-view";
import { TangoChapterQuizModal } from "@/components/tango-n3/tango-chapter-quiz-modal";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { useJapaneseTts } from "@/lib/use-japanese-tts";

export function TangoN3Client() {
  const { speak, activeSpeechId } = useJapaneseTts();
  const [progress, setProgress] = useState<TangoProgress>(DEFAULT_TANGO_PROGRESS);
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [activeCards, setActiveCards] = useState<TangoN3Card[]>([]);
  const [sessionType, setSessionType] = useState<"flashcard" | "quiz">("flashcard");
  const [selectedStudyTab, setSelectedStudyTab] = useState<"flashcard" | "quiz">("flashcard");
  const [activeViewTab, setActiveViewTab] = useState<"chapters" | "srs" | "vocab" | "reading">("chapters");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPart, setSelectedPart] = useState<"all" | "noun" | "verb" | "adj" | "idiom" | "affix">("all");
  const [quizChapterModal, setQuizChapterModal] = useState<{
    chapter: TangoChapter;
    cards: TangoN3Card[];
    nextChapter?: TangoChapter;
  } | null>(null);
  const [isChaptersAccordionExpanded, setIsChaptersAccordionExpanded] = useState(false);

  useEffect(() => {
    setProgress(loadTangoProgress());
  }, []);

  const weakCards = useMemo(() => getWeakCards(progress, TANGO_N3_CARDS), [progress]);
  const srs = useMemo(() => getSrsSchedules(progress, TANGO_N3_CARDS), [progress]);

  // Active Chapter: first unlocked chapter that is not fully mastered, or last unlocked
  const activeChapter = useMemo(() => {
    const unlocked = progress.unlockedChapterIds || ["ch-01"];
    for (const chId of unlocked) {
      const ch = TANGO_N3_CHAPTERS.find((c) => c.id === chId);
      if (!ch) continue;
      const chCards = TANGO_N3_CARDS.filter((c) => c.chapterId === ch.id);
      const chMastered = chCards.filter((c) => progress.masteredCardIds.includes(c.id)).length;
      if (chMastered < chCards.length) {
        return ch;
      }
    }
    const lastUnlockedId = unlocked[unlocked.length - 1] || "ch-01";
    return TANGO_N3_CHAPTERS.find((c) => c.id === lastUnlockedId) || TANGO_N3_CHAPTERS[0];
  }, [progress.unlockedChapterIds, progress.masteredCardIds]);

  const handleRateCard = useCallback(
    (cardId: string, chapterId: string, rating: CardRating) => {
      const updated = recordTangoReview(cardId, chapterId, rating);
      setProgress(updated);
    },
    []
  );

  const handleToggleStar = useCallback((cardId: string) => {
    const updated = toggleStarTangoCard(cardId);
    setProgress(updated);
  }, []);

  const handlePassChapterQuiz = useCallback(
    (score: number, total: number, nextChapterId?: string) => {
      if (!quizChapterModal) return;
      const { progress: updated } = recordChapterQuizResult(
        quizChapterModal.chapter.id,
        score,
        total,
        nextChapterId
      );
      setProgress(updated);
    },
    [quizChapterModal]
  );

  const handleToggleMasteryMode = useCallback(() => {
    const nextMode = !progress.masteryModeEnabled;
    const updated = setMasteryMode(nextMode);
    setProgress(updated);
  }, [progress.masteryModeEnabled]);

  const isChapterUnlocked = useCallback(
    (chapterId: string) => {
      if (!progress.masteryModeEnabled) return true;
      if (chapterId === "ch-01" || chapterId === TANGO_N3_CHAPTERS[0]?.id) return true;
      return (progress.unlockedChapterIds || ["ch-01"]).includes(chapterId);
    },
    [progress.masteryModeEnabled, progress.unlockedChapterIds]
  );

  // Filtered Cards for Search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return TANGO_N3_CARDS.filter(
      (c) =>
        c.word.toLowerCase().includes(q) ||
        c.reading.toLowerCase().includes(q) ||
        c.meaningId.toLowerCase().includes(q) ||
        c.meaningEn.toLowerCase().includes(q) ||
        (c.collocation && c.collocation.meaningId.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const displayedCards = useMemo(() => {
    if (searchQuery.trim()) {
      return searchResults;
    }
    return TANGO_N3_CARDS;
  }, [searchQuery, searchResults]);

  // Start study session with filtered cards
  function startSession(mode: string, cards: TangoN3Card[], type: "flashcard" | "quiz" = selectedStudyTab) {
    if (cards.length === 0) return;
    setActiveMode(mode);
    setActiveCards(cards);
    setSessionType(type);
  }

  // Smart Chapter Queue: Only studies unmastered cards unless explicitly restarting from beginning
  function startChapterStudy(ch: TangoChapter, forceAll = false, type: "flashcard" | "quiz" = selectedStudyTab) {
    const chapterCards = TANGO_N3_CARDS.filter((c) => c.chapterId === ch.id);
    const unmastered = chapterCards.filter((c) => !progress.masteredCardIds.includes(c.id));

    // If not forcing all and there are unmastered cards, only load unmastered
    const cardsToStudy = !forceAll && unmastered.length > 0 ? unmastered : chapterCards;

    const title =
      unmastered.length === 0 || forceAll
        ? `Bab ${ch.badge}: ${ch.title} (Semua ${chapterCards.length} Kata)`
        : `Bab ${ch.badge}: ${ch.title} (Sisa ${unmastered.length} dari ${chapterCards.length} Kata)`;

    startSession(title, cardsToStudy, type);
  }

  function startQuick10(type: "flashcard" | "quiz" = selectedStudyTab) {
    // Pick 10 prioritizing review cards, then unmastered cards
    const reviewCards = TANGO_N3_CARDS.filter((c) =>
      progress.reviewCardIds.includes(c.id)
    );
    const unmastered = TANGO_N3_CARDS.filter(
      (c) =>
        !progress.masteredCardIds.includes(c.id) &&
        !progress.reviewCardIds.includes(c.id)
    );
    const combined = [...reviewCards, ...unmastered].slice(0, 10);
    const finalSelection =
      combined.length > 0 ? combined : TANGO_N3_CARDS.slice(0, 10);
    startSession(
      type === "quiz" ? "Kuis CBT Kilat (10 Soal)" : "Quick 10 Drill",
      finalSelection,
      type
    );
  }

  const masteredCount = progress.masteredCardIds.length;
  const reviewCount = progress.reviewCardIds.length;
  const totalAvailable = TANGO_N3_CARDS.length;
  const masteredPercent =
    totalAvailable > 0 ? Math.round((masteredCount / totalAvailable) * 100) : 0;

  return (
    <div className={`w-full max-w-5xl mx-auto ${activeMode ? "px-2.5 sm:px-4 py-2 sm:py-6" : "px-4 py-6 sm:py-12"}`}>
      {/* Top Breadcrumb & Status */}
      {!activeMode && (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <a
            href="/tools/fe-study/"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kaidevlab Tools</span>
          </a>

          {/* Streak indicator */}
          {progress.streak > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>Streak {progress.streak} Hari</span>
            </div>
          )}
        </div>
      )}

      {/* Main Study Screen (Active Session) */}
      {activeMode ? (
        <div className="space-y-3 sm:space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5 sm:pb-3">
            <button
              onClick={() => setActiveMode(null)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] text-xs font-medium text-[var(--text-secondary)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
            <div className="text-center truncate px-2">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)] truncate max-w-[130px] sm:max-w-none">
                  {activeMode}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                  sessionType === "quiz"
                    ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                }`}>
                  {sessionType === "quiz" ? "Kuis" : "Flashcard"}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-mono font-bold text-[var(--text-secondary)]">
                {activeCards.length} Kartu
              </span>
            </div>
          </div>

          {sessionType === "quiz" ? (
            <TangoQuizView
              cards={activeCards}
              streak={progress.streak}
              onRateCard={handleRateCard}
              onFinishQuiz={() => setActiveMode(null)}
            />
          ) : (
            <TangoFlashcardView
              cards={activeCards}
              onRateCard={handleRateCard}
              masteredIds={progress.masteredCardIds}
              reviewIds={progress.reviewCardIds}
              starredIds={progress.starredCardIds}
              onToggleStar={handleToggleStar}
              streak={progress.streak}
              onFinishSession={() => setActiveMode(null)}
            />
          )}
        </div>
      ) : (
        /* Hub Home Screen */
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>改訂版 新完全マスター単語 N3 (2021年 重要1800語)</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  Shin Kanzen Master Tango Hub
                </h1>
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed">
                  Latihan resmi kosakata N3 sesuai buku fisik: dilengkapi kolokasi (連語), furigana, audio native, kuis CBT, dan review berkala.
                </p>
              </div>

              {/* Progress Summary Card */}
              <div className="w-full md:w-72 p-4 rounded-2xl bg-[var(--surface-secondary)]/60 border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-secondary)] font-medium">Penguasaan Kosakata</span>
                  <span className="font-mono font-bold text-[var(--brand-primary)] text-sm">{masteredPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[var(--surface-primary)] rounded-full overflow-hidden border border-[var(--border-subtle)]/50">
                  <div
                    className="h-full bg-[var(--brand-primary)] rounded-full transition-all duration-500"
                    style={{ width: `${masteredPercent}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[11px]">
                  <div>
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{masteredCount}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">Paham</div>
                  </div>
                  <div>
                    <div className="font-mono font-bold text-amber-600 dark:text-amber-400">{reviewCount}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">Review</div>
                  </div>
                  <div>
                    <div className="font-mono font-bold text-[var(--text-primary)]">{totalAvailable}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Study Launcher Console (Pusat Aksi Belajar) */}
          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Mode Switcher */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-[var(--text-tertiary)] shrink-0 hidden sm:inline">Mode:</span>
              <div className="flex p-1 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-subtle)] w-full sm:w-auto">
                <button
                  onClick={() => setSelectedStudyTab("flashcard")}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedStudyTab === "flashcard"
                      ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Flashcard</span>
                </button>
                <button
                  onClick={() => setSelectedStudyTab("quiz")}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedStudyTab === "quiz"
                      ? "bg-[var(--surface-primary)] text-purple-600 dark:text-purple-400 shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Kuis CBT</span>
                </button>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={() => startQuick10(selectedStudyTab)}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all ${
                  selectedStudyTab === "quiz" ? "bg-purple-600 hover:bg-purple-700" : "bg-[var(--brand-primary)]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick 10 Drill</span>
              </button>

              <button
                onClick={() => startSession("Semua Kosakata", TANGO_N3_CARDS, selectedStudyTab)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] text-xs font-medium text-[var(--text-primary)] transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                <span>Semua ({totalAvailable})</span>
              </button>

              {weakCards.length > 0 && (
                <button
                  onClick={() => startSession(selectedStudyTab === "quiz" ? "Kuis Kata Sering Salah" : "Drill Kata Sering Salah", weakCards, selectedStudyTab)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold hover:bg-rose-500/20 transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sering Salah ({weakCards.length})</span>
                </button>
              )}

              {reviewCount > 0 && (
                <button
                  onClick={() => {
                    const toReview = TANGO_N3_CARDS.filter((c) => progress.reviewCardIds.includes(c.id));
                    startSession(selectedStudyTab === "quiz" ? "Kuis Review Soal Sulit" : "Review Soal Sulit", toReview, selectedStudyTab);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold hover:bg-amber-500/20 transition-colors"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Review Sulit ({reviewCount})</span>
                </button>
              )}

              {progress.starredCardIds && progress.starredCardIds.length > 0 && (
                <button
                  onClick={() => {
                    const starred = TANGO_N3_CARDS.filter((c) => progress.starredCardIds.includes(c.id));
                    startSession(selectedStudyTab === "quiz" ? "Kuis Kartu Favorit" : "Kartu Favorit (⭐)", starred, selectedStudyTab);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 text-xs font-bold hover:bg-yellow-500/20 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-yellow-500" />
                  <span>Favorit ({progress.starredCardIds.length})</span>
                </button>
              )}

              <button
                onClick={() => setActiveViewTab("reading")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors ${
                  activeViewTab === "reading"
                    ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-xs"
                    : "border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/5 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bacaan (20 Cerita)</span>
              </button>
            </div>
          </div>

          {/* Section Navigation Tabs (Tab Navigasi Rapi) */}
          <div className="flex border-b border-[var(--border-subtle)] gap-2">
            <button
              onClick={() => setActiveViewTab("chapters")}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 font-bold text-xs transition-colors ${
                activeViewTab === "chapters"
                  ? "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                  : "border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Daftar Bab & Topik</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] font-normal">
                {TANGO_N3_CHAPTERS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveViewTab("srs")}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 font-bold text-xs transition-colors ${
                activeViewTab === "srs"
                  ? "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                  : "border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>Jadwal Review (SRS)</span>
              {srs.dueToday.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-white font-bold">
                  {srs.dueToday.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveViewTab("vocab")}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 font-bold text-xs transition-colors ${
                activeViewTab === "vocab"
                  ? "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                  : "border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Kamus Kosakata</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] font-normal">
                {totalAvailable}
              </span>
            </button>

            <button
              onClick={() => setActiveViewTab("reading")}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 font-bold text-xs transition-colors ${
                activeViewTab === "reading"
                  ? "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                  : "border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Bacaan (読んでみよう)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold">
                {TANGO_N3_READINGS.length}
              </span>
            </button>
          </div>

          {/* TAB 1: DAFTAR BAB & TOPIK */}
          {activeViewTab === "chapters" && (
            <div className="space-y-6">
              {/* Non-Affiliation Disclaimer Banner */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--surface-secondary)]/70 border border-[var(--border-subtle)] flex items-start gap-3 text-xs text-[var(--text-secondary)]">
                <Info className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-[var(--text-primary)]">
                    Pemberitahuan Pendamping Belajar Mandiri
                  </p>
                  <p className="leading-relaxed">
                    KaidevLab tidak berafiliasi resmi dengan penerbit 新完全マスター. Materi dirancang secara independen sebagai pendamping belajar mandiri untuk akselerasi persiapan ujian JLPT N3.
                  </p>
                </div>
              </div>

              {/* Active Chapter Focus Mission (Dominant Card at Top) */}
              {activeChapter && (() => {
                const chapterCards = TANGO_N3_CARDS.filter((c) => c.chapterId === activeChapter.id);
                const chapterMastered = chapterCards.filter((c) => progress.masteredCardIds.includes(c.id)).length;
                const chapterTotal = chapterCards.length;
                const isAllMastered = chapterMastered === chapterTotal;
                const unmasteredCount = chapterTotal - chapterMastered;
                const quizRecord = progress.chapterQuizScores?.[activeChapter.id];
                const pct = Math.round((chapterMastered / (chapterTotal || 1)) * 100);
                const chIndex = TANGO_N3_CHAPTERS.findIndex((item) => item.id === activeChapter.id);
                const nextCh = chIndex < TANGO_N3_CHAPTERS.length - 1 ? TANGO_N3_CHAPTERS[chIndex + 1] : undefined;

                return (
                  <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[var(--surface-primary)] border-2 border-[var(--brand-primary)]/40 shadow-lg relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-primary)] text-white text-xs font-black tracking-wider uppercase shadow-sm">
                          <Sparkles size={13} />
                          <span>Bab Aktif Hari Ini</span>
                        </span>
                        <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
                          {activeChapter.badge}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] font-medium">
                          {activeChapter.partTitle}
                        </span>
                      </div>
                      {quizRecord?.passed && (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 w-fit">
                          Lulus Tes ({quizRecord.score}/{quizRecord.total})
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
                      <div className="lg:col-span-2 flex flex-col gap-2">
                        <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] font-serif leading-tight">
                          {activeChapter.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono text-[var(--brand-primary)] font-medium">
                          No. {activeChapter.startNum} — {activeChapter.endNum} ({chapterTotal} Kosakata)
                        </p>
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                          {activeChapter.desc}
                        </p>

                        {/* Progress bar */}
                        <div className="pt-2 flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-[var(--text-secondary)]">Progres Penguasaan Bab</span>
                            <span className="font-mono font-bold text-[var(--text-primary)]">
                              {chapterMastered} / {chapterTotal} Kosakata ({pct}%)
                            </span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-subtle)] overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 ${
                                isAllMastered ? "bg-emerald-500" : "bg-[var(--brand-primary)]"
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5 justify-center">
                        <button
                          type="button"
                          onClick={() => startChapterStudy(activeChapter, false, "flashcard")}
                          className="w-full py-3 px-5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                          <Layers className="w-4 h-4" />
                          <span>{isAllMastered ? `Pelajari Ulang ${activeChapter.badge}` : `Mulai Belajar ${activeChapter.badge} (${unmasteredCount} Sisa) →`}</span>
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => startChapterStudy(activeChapter, false, "quiz")}
                            className="py-2 px-3 rounded-xl bg-[var(--surface-secondary)] hover:bg-[var(--surface-primary)] text-[var(--text-primary)] border border-[var(--border-subtle)] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                            <span>Kuis Bab</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setQuizChapterModal({
                                chapter: activeChapter,
                                cards: chapterCards,
                                nextChapter: nextCh,
                              })
                            }
                            className="py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                          >
                            <Trophy className="w-3.5 h-3.5 text-amber-500" />
                            <span>Tes Kelulusan</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Mastery Progression Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Sistem Pembelajaran Bertahap (Mastery Gate)</span>
                    </span>
                    {progress.masteryModeEnabled ? (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                        Aktif
                      </span>
                    ) : (
                      <span className="text-[11px] text-[var(--text-tertiary)] font-medium">
                        Mode Bebas
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {progress.masteryModeEnabled
                      ? "Selesaikan bab dan lulus tes pemahaman (min. 80%) untuk membuka bab berikutnya."
                      : "Semua bab terbuka bebas tanpa syarat tes kelulusan."}
                  </p>
                  <div className="text-[11px] font-mono text-[var(--text-tertiary)] pt-0.5">
                    Progres:{" "}
                    <strong className="text-[var(--text-primary)]">
                      {(progress.unlockedChapterIds || ["ch-01"]).length} / {TANGO_N3_CHAPTERS.length} Bab Terbuka
                    </strong>{" "}
                    ·{" "}
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      {Object.values(progress.chapterQuizScores || {}).filter((s) => s.passed).length} Bab Lulus Ujian
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleToggleMasteryMode}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                      progress.masteryModeEnabled
                        ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-xs"
                        : "bg-[var(--surface-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {progress.masteryModeEnabled ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    <span>{progress.masteryModeEnabled ? "Mode Bertahap ON" : "Mode Bebas ON"}</span>
                  </button>
                </div>
              </div>

              {/* Accordion Toggle Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    Daftar Kurikulum 46 Bab
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] font-medium">
                    · {(progress.unlockedChapterIds || ["ch-01"]).length} / {TANGO_N3_CHAPTERS.length} Bab Terbuka
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChaptersAccordionExpanded((prev) => !prev)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] text-xs font-bold text-[var(--text-primary)] transition-all shadow-xs active:scale-95"
                >
                  <span>{isChaptersAccordionExpanded ? "Sembunyikan Daftar 46 Bab" : "Lihat Seluruh 46 Bab"}</span>
                  {isChaptersAccordionExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Collapsible Chapters Directory */}
              {isChaptersAccordionExpanded && (
                <div className="space-y-6 pt-2">
                  {/* Part Filter Switcher */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
                    <div>
                      <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[var(--brand-primary)]" />
                        <span>Filter Berdasarkan Jenis Kata (品詞)</span>
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        Pilih kategori untuk memfokuskan daftar bab yang ingin dipelajari.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-xs">
                      <button
                        onClick={() => setSelectedPart("all")}
                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                          selectedPart === "all"
                            ? "bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-xs"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        Semua ({TANGO_N3_CHAPTERS.length})
                      </button>
                      <button
                        onClick={() => setSelectedPart("noun")}
                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                          selectedPart === "noun"
                            ? "bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-xs"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        名詞 (Kata Benda)
                      </button>
                      <button
                        onClick={() => setSelectedPart("verb")}
                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                          selectedPart === "verb"
                            ? "bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-xs"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        動詞 (Kata Kerja)
                      </button>
                      <button
                        onClick={() => setSelectedPart("adj")}
                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                          selectedPart === "adj"
                            ? "bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-xs"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        形容詞・副詞 (Sifat & Ket.)
                      </button>
                      <button
                        onClick={() => setSelectedPart("idiom")}
                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                          selectedPart === "idiom"
                            ? "bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-xs"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        慣用句・カタカナ (Ungkapan)
                      </button>
                      <button
                        onClick={() => setSelectedPart("affix")}
                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                          selectedPart === "affix"
                            ? "bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-xs"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        接辞・接続詞 (Imbuhan)
                      </button>
                    </div>
                  </div>

                  {/* Chapter Decks Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TANGO_N3_CHAPTERS.filter(
                  (ch) => selectedPart === "all" || ch.partId === selectedPart
                ).map((ch, idx) => {
                  const chapterCards = TANGO_N3_CARDS.filter(
                    (c) => c.chapterId === ch.id
                  );
                  const chapterMastered = chapterCards.filter((c) =>
                    progress.masteredCardIds.includes(c.id)
                  ).length;
                  const chapterPercent =
                    chapterCards.length > 0
                      ? Math.round((chapterMastered / chapterCards.length) * 100)
                      : 0;

                  const isUnlocked = isChapterUnlocked(ch.id);
                  const quizRecord = progress.chapterQuizScores?.[ch.id];
                  const chIndex = TANGO_N3_CHAPTERS.findIndex((item) => item.id === ch.id);
                  const nextCh = chIndex < TANGO_N3_CHAPTERS.length - 1 ? TANGO_N3_CHAPTERS[chIndex + 1] : undefined;

                  if (!isUnlocked) {
                    return (
                      <div
                        key={ch.id}
                        className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 opacity-70 flex flex-col justify-between select-none relative overflow-hidden"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--surface-secondary)] text-[var(--text-tertiary)]">
                              BAB {ch.badge}
                            </span>
                            <span className="text-xs font-bold text-amber-500 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md">
                              <Lock className="w-3.5 h-3.5" />
                              <span>Terkunci</span>
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-[var(--text-tertiary)] mb-1">
                            {ch.title}
                          </h3>
                          <p className="text-xs text-[var(--text-tertiary)] leading-relaxed mb-4">
                            {ch.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[var(--border-subtle)]/60 text-xs text-amber-600 dark:text-amber-400 flex items-center justify-between">
                          <span className="text-[11px]">
                            Luluskan Bab {chIndex > 0 ? TANGO_N3_CHAPTERS[chIndex - 1].badge : ""} untuk membuka bab ini.
                          </span>
                          <button
                            onClick={handleToggleMasteryMode}
                            className="text-[10px] underline text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                          >
                            Buka Bebas
                          </button>
                        </div>
                      </div>
                    );
                  }

                  const unmasteredCount = chapterCards.length - chapterMastered;

                  return (
                    <div
                      key={ch.id}
                      onClick={() => startChapterStudy(ch, false, selectedStudyTab)}
                      className={`group relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        quizRecord?.passed
                          ? "bg-[var(--surface-primary)] border-emerald-500/40 hover:border-emerald-500 shadow-sm"
                          : "bg-[var(--surface-primary)] border-[var(--border-subtle)] hover:border-[var(--brand-primary)]/50 hover:shadow-md"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
                            BAB {ch.badge}
                          </span>
                          {quizRecord?.passed ? (
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Award className="w-3.5 h-3.5" />
                              <span>Lulus ({quizRecord.score}/{quizRecord.total})</span>
                            </span>
                          ) : (
                            <span className="text-xs font-mono font-medium text-[var(--text-tertiary)]">
                              {unmasteredCount > 0 ? `${unmasteredCount} Sisa / ${chapterCards.length}` : "40 Dikuasai ✓"}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors mb-1">
                          {ch.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                          {ch.desc}
                        </p>
                      </div>

                      {/* Chapter Progress Bar & Action Buttons */}
                      <div className="pt-3 border-t border-[var(--border-subtle)] space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-[11px] text-[var(--text-tertiary)]">
                              {chapterMastered} Dikuasai · {unmasteredCount} Sisa
                            </span>
                            <span className="font-mono font-semibold text-[var(--text-primary)]">
                              {chapterPercent}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[var(--surface-secondary)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[var(--brand-primary)] rounded-full transition-all duration-300"
                              style={{ width: `${chapterPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startChapterStudy(ch, false, "flashcard")}
                              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                unmasteredCount > 0
                                  ? "bg-[var(--brand-primary)] text-white shadow-2xs hover:opacity-95"
                                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20"
                              }`}
                            >
                              <Layers className="w-3.5 h-3.5" />
                              <span>
                                {unmasteredCount > 0
                                  ? `Lanjut (${unmasteredCount} Sisa)`
                                  : "Semua Dikuasai (40)"}
                              </span>
                            </button>

                            {chapterMastered > 0 && (
                              <button
                                onClick={() => startChapterStudy(ch, true, "flashcard")}
                                title="Ulangi semua kata dari nomor 1"
                                className="py-2 px-2.5 rounded-xl text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] border border-[var(--border-subtle)] transition-colors flex items-center justify-center gap-1"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span className="text-[10px] hidden sm:inline">Ulangi</span>
                              </button>
                            )}

                            <button
                              onClick={() => startChapterStudy(ch, false, "quiz")}
                              className="py-2 px-3 rounded-xl text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 transition-colors flex items-center justify-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Kuis</span>
                            </button>
                          </div>

                          {/* Milestone Gate Quiz Button */}
                          <button
                            onClick={() =>
                              setQuizChapterModal({
                                chapter: ch,
                                cards: chapterCards,
                                nextChapter: nextCh,
                              })
                            }
                            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs ${
                              quizRecord?.passed
                                ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                                : "bg-gradient-to-r from-amber-500/15 to-emerald-500/15 hover:from-amber-500/25 hover:to-emerald-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            <Trophy className="w-3.5 h-3.5 text-amber-500" />
                            <span>
                              {quizRecord?.passed
                                ? `Uji Ulang Kelulusan (Lulus ${quizRecord.score}/${quizRecord.total})`
                                : `Uji Kelulusan Bab (Full ${chapterCards.length} Soal)`}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

          {/* TAB 2: JADWAL REVIEW (SRS) */}
          {activeViewTab === "srs" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[var(--text-primary)]">
                        Jadwal Review Cerdas (Spaced Repetition System)
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Berdasarkan kurva lupa Ebbinghaus & sistem Leitner Box untuk retensi ingatan jangka panjang.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {/* Due Today */}
                  <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/40 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                          <Clock className="w-4 h-4" />
                          <span>Hari Ini (Daily)</span>
                        </span>
                        <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                          {srs.dueToday.length} Kata
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                        Kata yang dijadwalkan diulang hari ini agar ingatan baru tidak memudar.
                      </p>
                    </div>
                    <button
                      disabled={srs.dueToday.length === 0}
                      onClick={() => startSession("Review Hari Ini (SRS)", srs.dueToday, selectedStudyTab)}
                      className="w-full py-2 px-3 rounded-xl bg-[var(--brand-primary)] hover:opacity-95 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-bold transition-all shadow-xs"
                    >
                      {srs.dueToday.length > 0 ? "Mulai Review Hari Ini" : "Semua Selesai ✓"}
                    </button>
                  </div>

                  {/* Weekly Review */}
                  <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/40 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                          <Calendar className="w-4 h-4" />
                          <span>Mingguan (7 Hari)</span>
                        </span>
                        <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                          {srs.dueWeekly.length} Kata
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                        Konsolidasi memori 1 minggu (Box 2 & 3) untuk memperkuat koneksi sinapsis otak.
                      </p>
                    </div>
                    <button
                      disabled={srs.dueWeekly.length === 0}
                      onClick={() => startSession("Review Mingguan (7 Hari)", srs.dueWeekly, selectedStudyTab)}
                      className="w-full py-2 px-3 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none text-[var(--text-primary)] text-xs font-bold transition-all"
                    >
                      {srs.dueWeekly.length > 0 ? "Review Mingguan" : "Belum Ada Jadwal"}
                    </button>
                  </div>

                  {/* Monthly Review */}
                  <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/40 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <Target className="w-4 h-4" />
                          <span>Bulanan (30 Hari)</span>
                        </span>
                        <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                          {srs.dueMonthly.length} Kata
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                        Pemantapan memori jangka panjang (Box 4 & 5) menjelang hari ujian JLPT.
                      </p>
                    </div>
                    <button
                      disabled={srs.dueMonthly.length === 0}
                      onClick={() => startSession("Review Bulanan (30 Hari)", srs.dueMonthly, selectedStudyTab)}
                      className="w-full py-2 px-3 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none text-[var(--text-primary)] text-xs font-bold transition-all"
                    >
                      {srs.dueMonthly.length > 0 ? "Review Bulanan" : "Belum Ada Jadwal"}
                    </button>
                  </div>
                </div>

                {/* Leitner Box explanation info */}
                <div className="p-4 rounded-2xl bg-[var(--surface-secondary)]/30 border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-[var(--text-primary)]">Cara Kerja Sistem Leitner Box:</span>
                    <p>
                      Setiap kata yang Anda kuasai naik ke box berikutnya (Box 1 ➔ 2 ➔ 3 ➔ 4 ➔ 5) dan jadwal reviewnya semakin berjarak. Jika keliru saat kuis atau flashcard, kata otomatis kembali ke Box 1 agar segera diulang.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank Kata Sering Salah (if any) */}
              {weakCards.length > 0 && (
                <div className="p-5 rounded-3xl border border-rose-500/30 bg-rose-500/5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">
                          Bank Kata Sering Salah ({weakCards.length} Kosakata)
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)]">
                          Kosakata yang tercatat pernah keliru saat kuis atau flashcard.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => startSession("Drill Kata Sering Salah", weakCards, selectedStudyTab)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      Latih Semua ({weakCards.length})
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: KAMUS KOSAKATA & INSTANT SEARCH */}
          {activeViewTab === "vocab" && (
            <div className="space-y-4">
              {/* Instant Search Bar */}
              <div className="relative">
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-sm focus-within:border-[var(--brand-primary)] transition-colors">
                  <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kanji, hiragana, atau arti bahasa Indonesia (contoh: 友人, おごる, 引き受ける, teman)..."
                    className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1 rounded-full hover:bg-[var(--surface-secondary)] text-[var(--text-tertiary)]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Vocabulary Table / Card List */}
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] overflow-hidden shadow-sm">
                <div className="p-3.5 bg-[var(--surface-secondary)]/50 border-b border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-secondary)]">
                    {searchQuery ? `Hasil Pencarian (${displayedCards.length} kata)` : `Semua Kosakata (${displayedCards.length} kata)`}
                  </span>
                  <span className="text-[11px] text-[var(--text-tertiary)]">
                    Klik ikon audio untuk mendengarkan lafal native
                  </span>
                </div>

                <div className="divide-y divide-[var(--border-subtle)] max-h-[600px] overflow-y-auto">
                  {displayedCards.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[var(--text-tertiary)]">
                      Tidak ada kosakata yang cocok dengan pencarian &quot;{searchQuery}&quot;.
                    </div>
                  ) : (
                    displayedCards.map((card) => {
                      const isMastered = progress.masteredCardIds.includes(card.id);
                      const isStarred = progress.starredCardIds.includes(card.id);
                      const mistakeCount = progress.cardMistakes[card.id] || 0;
                      const box = progress.cardBox[card.id] || 1;

                      return (
                        <div
                          key={card.id}
                          className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--surface-secondary)]/40 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => speak(card.word, card.id)}
                              className={`p-2 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors shrink-0 mt-0.5 ${
                                activeSpeechId === card.id ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/30" : ""
                              }`}
                              title="Dengarkan Audio"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>

                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                                  #{String(card.bookNumber).padStart(4, "0")}
                                </span>
                                <span className="text-base font-bold font-japanese text-[var(--text-primary)]">
                                  <RubyTerm
                                    rubyText={card.ruby}
                                    fallbackText={card.word}
                                    showFurigana={true}
                                  />
                                </span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--surface-secondary)] text-[var(--text-tertiary)] font-medium">
                                  {card.partOfSpeech}
                                </span>
                                {mistakeCount > 0 && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                                    {mistakeCount}x salah
                                  </span>
                                )}
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono">
                                  Box {box}
                                </span>
                                {isMastered && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                                    ✓ Hafal
                                  </span>
                                )}
                              </div>

                              <div className="text-xs text-[var(--text-secondary)] font-medium">
                                {card.meaningId}
                              </div>

                              {card.collocation && (
                                <div className="text-[11px] text-[var(--text-tertiary)] font-japanese pt-0.5 flex items-center gap-1.5 flex-wrap">
                                  <span className="font-sans text-[10px] text-[var(--text-tertiary)] font-medium">Contoh:</span>
                                  <RubyTerm
                                    rubyText={card.collocation.jpRuby}
                                    fallbackText={card.collocation.jpRuby}
                                    showFurigana={true}
                                  />
                                  <span className="font-sans text-[var(--text-tertiary)]">({card.collocation.meaningId})</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => handleToggleStar(card.id)}
                              className={`p-2 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] transition-colors ${
                                isStarred ? "text-yellow-500 bg-yellow-500/10" : "text-[var(--text-tertiary)]"
                              }`}
                              title={isStarred ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                            >
                              <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-yellow-500" : ""}`} />
                            </button>

                            <button
                              onClick={() => startSession(`Drill: ${card.word}`, [card], selectedStudyTab)}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
                            >
                              Latih Kata Ini →
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LATIHAN BACAAN (読解・読んでみよう) */}
          {activeViewTab === "reading" && (
            <TangoReadingView
              onSelectCardDetail={(card) => startSession(`Drill: ${card.word}`, [card], selectedStudyTab)}
            />
          )}
        </div>
      )}

      {/* Chapter Milestone Gate Quiz Modal */}
      {quizChapterModal && (
        <TangoChapterQuizModal
          chapter={quizChapterModal.chapter}
          chapterCards={quizChapterModal.cards}
          nextChapter={quizChapterModal.nextChapter}
          onClose={() => setQuizChapterModal(null)}
          onPassQuiz={handlePassChapterQuiz}
          onStartNextChapter={(nextCh) => {
            const nextCards = TANGO_N3_CARDS.filter((c) => c.chapterId === nextCh.id);
            const nextChIdx = TANGO_N3_CHAPTERS.findIndex((c) => c.id === nextCh.id);
            const nextNextCh =
              nextChIdx >= 0 && nextChIdx < TANGO_N3_CHAPTERS.length - 1
                ? TANGO_N3_CHAPTERS[nextChIdx + 1]
                : undefined;
            setQuizChapterModal({
              chapter: nextCh,
              cards: nextCards,
              nextChapter: nextNextCh,
            });
          }}
        />
      )}
    </div>
  );
}
