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
  CheckCheck,
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
  graduateAllWeakCards,
  graduateSingleWeakCard,
  CardRating,
  TangoProgress,
  DEFAULT_TANGO_PROGRESS,
} from "@/lib/tango-n3-storage";
import { TangoFlashcardView } from "@/components/tango-n3/tango-flashcard-view";
import { openSyncModal } from "@/lib/global-modals-store";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound } from "@/lib/global-sound";
import { TangoQuizView } from "@/components/tango-n3/tango-quiz-view";
import { TangoReadingView } from "@/components/tango-n3/tango-reading-view";
import { TangoChapterQuizModal } from "@/components/tango-n3/tango-chapter-quiz-modal";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { KanjiLookupModal } from "@/components/fe-study/kanji-lookup-modal";
import { useJapaneseTts } from "@/lib/use-japanese-tts";
import { N3TopBar, N3ContinueCard, N3MoreSection, N3SecondaryAction } from "@/components/n3/n3-shell";

function shuffleCards<T>(arr: T[]): T[] {
  const clone = [...arr];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

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
  const [interleavingEnabled, setInterleavingEnabled] = useState(true);

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

  const handleGraduateAllWeak = useCallback(() => {
    const updated = graduateAllWeakCards();
    setProgress(updated);
    if (activeMode?.includes("Sering Salah")) {
      setActiveMode(null);
    }
  }, [activeMode]);

  const handleGraduateSingleWeak = useCallback((cardId: string) => {
    const updated = graduateSingleWeakCard(cardId);
    setProgress(updated);
  }, []);

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

  // Smart Chapter Queue: Studies unmastered cards with optional 25% Interleaving Review from previous chapters
  function startChapterStudy(ch: TangoChapter, forceAll = false, type: "flashcard" | "quiz" = selectedStudyTab) {
    const chapterCards = TANGO_N3_CARDS.filter((c) => c.chapterId === ch.id);
    const unmastered = chapterCards.filter((c) => !progress.masteredCardIds.includes(c.id));

    // If not forcing all and there are unmastered cards, only load unmastered
    const baseCards = !forceAll && unmastered.length > 0 ? [...unmastered] : [...chapterCards];

    const chIndex = TANGO_N3_CHAPTERS.findIndex((item) => item.id === ch.id);
    let interleavedCards: TangoN3Card[] = [];

    // Interleaving 25%: If studying chapter 2 or higher and interleaving is enabled
    if (interleavingEnabled && chIndex > 0) {
      const prevChapterIds = new Set(TANGO_N3_CHAPTERS.slice(0, chIndex).map((c) => c.id));
      const prevCards = TANGO_N3_CARDS.filter((c) => prevChapterIds.has(c.chapterId));

      if (prevCards.length > 0) {
        // Target ~25% of current chapter batch (between 3 and 8 cards)
        const targetCount = Math.min(8, Math.max(3, Math.round(baseCards.length * 0.25)));

        const reviewCandidates = prevCards.filter((c) => progress.reviewCardIds.includes(c.id));
        const unmasteredCandidates = prevCards.filter(
          (c) => !progress.masteredCardIds.includes(c.id) && !progress.reviewCardIds.includes(c.id)
        );
        const masteredCandidates = prevCards.filter((c) => progress.masteredCardIds.includes(c.id));

        const pool = [
          ...shuffleCards(reviewCandidates),
          ...shuffleCards(unmasteredCandidates),
          ...shuffleCards(masteredCandidates),
        ];

        interleavedCards = pool.slice(0, targetCount);
      }
    }

    // Interleave evenly so the learner experiences regular retrieval spikes
    let finalDeck: TangoN3Card[] = [];
    if (interleavedCards.length > 0) {
      const step = Math.max(2, Math.floor(baseCards.length / (interleavedCards.length + 1)));
      let intIdx = 0;
      baseCards.forEach((c, idx) => {
        finalDeck.push(c);
        if ((idx + 1) % step === 0 && intIdx < interleavedCards.length) {
          finalDeck.push(interleavedCards[intIdx++]);
        }
      });
      while (intIdx < interleavedCards.length) {
        finalDeck.push(interleavedCards[intIdx++]);
      }
    } else {
      finalDeck = baseCards;
    }

    const baseTitle =
      unmastered.length === 0 || forceAll
        ? `Bab ${ch.badge}: ${ch.title} (${baseCards.length} Kata)`
        : `Bab ${ch.badge}: ${ch.title} (Sisa ${unmastered.length} dari ${chapterCards.length} Kata)`;

    const title =
      interleavedCards.length > 0
        ? `${baseTitle} · +${interleavedCards.length} Interleaving Review`
        : baseTitle;

    startSession(title, finalDeck, type);
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

  const chapterCards = useMemo(
    () => TANGO_N3_CARDS.filter((c) => c.chapterId === activeChapter.id),
    [activeChapter.id]
  );
  const chapterMastered = useMemo(
    () => chapterCards.filter((c) => progress.masteredCardIds.includes(c.id)).length,
    [chapterCards, progress.masteredCardIds]
  );
  const chapterTotal = chapterCards.length;
  const isAllMastered = chapterMastered === chapterTotal;
  const unmasteredCount = chapterTotal - chapterMastered;
  const chapterPercent = Math.round((chapterMastered / (chapterTotal || 1)) * 100);
  const chIndex = TANGO_N3_CHAPTERS.findIndex((item) => item.id === activeChapter.id);
  const nextCh = chIndex < TANGO_N3_CHAPTERS.length - 1 ? TANGO_N3_CHAPTERS[chIndex + 1] : undefined;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] pb-24 font-sans">
      {/* Main Study Screen (Active Session) */}
      {activeMode ? (
        <div className="w-full max-w-5xl mx-auto px-2.5 sm:px-4 py-2 sm:py-6 space-y-3 sm:space-y-6">
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
            <div className="text-right shrink-0 flex items-center gap-2">
              {activeMode?.includes("Sering Salah") && (
                <button
                  onClick={handleGraduateAllWeak}
                  className="hidden xs:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all shadow-xs"
                  title="Tandai semua kata sering salah ini sudah hafal & hapus dari daftar"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Luluskan Semua</span>
                </button>
              )}
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
              onGraduateAll={activeMode?.includes("Sering Salah") ? handleGraduateAllWeak : undefined}
              isWeakSession={activeMode?.includes("Sering Salah")}
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
              onGraduateAll={activeMode?.includes("Sering Salah") ? handleGraduateAllWeak : undefined}
              isWeakSession={activeMode?.includes("Sering Salah")}
            />
          )}
        </div>
      ) : (
        /* Hub Home Screen */
        <>
          <N3TopBar active="tango" title="JLPT N3 Tango (単語 1800)" />

          <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8 space-y-5">
            {/* Single Focused Target Card */}
            <N3ContinueCard
              eyebrow={`Bab Aktif Hari Ini · Bab ${activeChapter.badge} (${activeChapter.partTitle})`}
              title={`${activeChapter.title}`}
              subtitle={activeChapter.desc}
              progress={chapterPercent}
              progressLabel={`${chapterMastered}/${chapterTotal} kosakata dikuasai (${chapterPercent}%) · ${unmasteredCount} sisa`}
              primary={{
                id: "tango-primary-study-btn",
                label: isAllMastered
                  ? `Pelajari Ulang Bab ${activeChapter.badge} →`
                  : `Lanjut Belajar Bab ${activeChapter.badge} (${unmasteredCount} Sisa) →`,
                onClick: () => startChapterStudy(activeChapter, false, "flashcard"),
              }}
              secondary={
                <>
                  <N3SecondaryAction
                    id="tango-quiz-btn"
                    onClick={() => startChapterStudy(activeChapter, false, "quiz")}
                  >
                    Kuis 3 Arah
                  </N3SecondaryAction>
                  <N3SecondaryAction
                    id="tango-exam-btn"
                    onClick={() =>
                      setQuizChapterModal({
                        chapter: activeChapter,
                        cards: chapterCards,
                        nextChapter: nextCh,
                      })
                    }
                  >
                    Tes Kelulusan Bab
                  </N3SecondaryAction>
                  {srs.dueToday.length > 0 && (
                    <N3SecondaryAction
                      id="tango-srs-btn"
                      onClick={() => startSession("Review Hari Ini (SRS)", srs.dueToday, selectedStudyTab)}
                    >
                      Review SRS ({srs.dueToday.length})
                    </N3SecondaryAction>
                  )}
                  {weakCards.length > 0 && (
                    <N3SecondaryAction
                      id="tango-weak-btn"
                      onClick={() => startSession("Drill Kata Sering Salah", weakCards, "quiz")}
                    >
                      Sering Salah ({weakCards.length})
                    </N3SecondaryAction>
                  )}
                  <N3SecondaryAction
                    id="tango-quick10-btn"
                    onClick={() => startQuick10("quiz")}
                  >
                    Quick 10 CBT
                  </N3SecondaryAction>
                </>
              }
            />

            {/* Folded Secondary Tools, All 46 Chapters, SRS, Dictionary, and Stories */}
            <N3MoreSection
              id="tango-more-tabs"
              label="Daftar 46 bab, jadwal review (SRS), kamus & cerita bacaan"
            >
              {/* Section Navigation Tabs */}
              <div className="flex border-b border-[var(--border-subtle)] gap-2 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveViewTab("chapters")}
                  className={`flex items-center gap-2 py-2.5 px-3.5 border-b-2 font-bold text-xs transition-colors whitespace-nowrap ${
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
                  type="button"
                  onClick={() => setActiveViewTab("srs")}
                  className={`flex items-center gap-2 py-2.5 px-3.5 border-b-2 font-bold text-xs transition-colors whitespace-nowrap ${
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
                  type="button"
                  onClick={() => setActiveViewTab("vocab")}
                  className={`flex items-center gap-2 py-2.5 px-3.5 border-b-2 font-bold text-xs transition-colors whitespace-nowrap ${
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
                  type="button"
                  onClick={() => setActiveViewTab("reading")}
                  className={`flex items-center gap-2 py-2.5 px-3.5 border-b-2 font-bold text-xs transition-colors whitespace-nowrap ${
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
                <div className="space-y-4">
                  {/* Compact Curriculum Settings Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[var(--surface-secondary)]/50 border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[var(--text-primary)]">⚙️ Pengaturan:</span>
                      <button
                        type="button"
                        onClick={handleToggleMasteryMode}
                        className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
                          progress.masteryModeEnabled
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : "bg-[var(--surface-primary)] border-[var(--border-subtle)] text-[var(--text-tertiary)]"
                        }`}
                        title="Buka bab bertahap dengan lulus tes min. 80%"
                      >
                        {progress.masteryModeEnabled ? <Lock className="w-3 h-3 text-emerald-500" /> : <Unlock className="w-3 h-3" />}
                        <span>{progress.masteryModeEnabled ? "Buka Bertahap ON" : "Mode Bebas ON"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic("light");
                          setInterleavingEnabled((p) => !p);
                        }}
                        className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
                          interleavingEnabled
                            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30"
                            : "bg-[var(--surface-primary)] border-[var(--border-subtle)] text-[var(--text-tertiary)]"
                        }`}
                        title="Metode Dokter Cakra: Menyisipkan 20-25% kata bab sebelumnya ke bab baru agar tidak lupa"
                      >
                        <Sparkles className="w-3 h-3 text-purple-500" />
                        <span>{interleavingEnabled ? "25% Interleave ON" : "Interleave OFF"}</span>
                      </button>
                    </div>
                    <div className="text-[11px] font-mono text-[var(--text-tertiary)]">
                      {(progress.unlockedChapterIds || ["ch-01"]).length} / 46 Bab Terbuka
                    </div>
                  </div>

                  {/* Part Filter Switcher */}
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
                      名詞 (Benda)
                    </button>
                    <button
                      onClick={() => setSelectedPart("verb")}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                        selectedPart === "verb"
                          ? "bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      動詞 (Kerja)
                    </button>
                    <button
                      onClick={() => setSelectedPart("adj")}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                        selectedPart === "adj"
                          ? "bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      形容詞 (Sifat)
                    </button>
                    <button
                      onClick={() => setSelectedPart("idiom")}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                        selectedPart === "idiom"
                          ? "bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      慣用句 (Ungkapan)
                    </button>
                    <button
                      onClick={() => setSelectedPart("affix")}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                        selectedPart === "affix"
                          ? "bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      接辞 (Imbuhan)
                    </button>
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">
                          Bank Kata Sering Salah ({weakCards.length} Kosakata)
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)]">
                          Kosakata yang pernah keliru. Latih ulang atau luluskan jika sudah hafal.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={handleGraduateAllWeak}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold transition-colors shadow-xs"
                        title="Tandai semua kata ini sudah hafal & hapus dari daftar sering salah"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Luluskan Semua</span>
                      </button>
                      <button
                        onClick={() => startSession(selectedStudyTab === "quiz" ? "Kuis Kata Sering Salah" : "Drill Kata Sering Salah", weakCards, selectedStudyTab)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        Latih Semua ({weakCards.length})
                      </button>
                    </div>
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
                            {mistakeCount > 0 && (
                              <button
                                onClick={() => handleGraduateSingleWeak(card.id)}
                                className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors"
                                title="Tandai kata ini sudah hafal & hapus dari daftar Sering Salah"
                              >
                                ✓ Lulus
                              </button>
                            )}

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
            </N3MoreSection>
          </main>
        </>
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

      {/* Kanji & Vocabulary Quick Lookup Modal */}
      <KanjiLookupModal />
    </div>
  );
}
