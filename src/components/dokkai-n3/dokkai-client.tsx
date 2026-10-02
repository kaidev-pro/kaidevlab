"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Volume2,
  VolumeX,
  Languages,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Sparkles,
  Lightbulb,
  ArrowLeft,
  Check,
  Flame,
} from "lucide-react";
import { DOKKAI_PASSAGES } from "@/data/dokkai-n3/passages";
import { DokkaiPassage, DokkaiCategory } from "@/data/dokkai-n3/types";
import {
  DokkaiProgress,
  loadDokkaiProgress,
  recordDokkaiAnswer,
  toggleDokkaiBookmark,
} from "./dokkai-storage";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { autoAnnotateRuby } from "@/lib/fe-furigana";
import { useJapaneseTts } from "@/lib/use-japanese-tts";
import { KanjiLookupModal } from "@/components/fe-study/kanji-lookup-modal";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound, playSuccessChime, playErrorBuzz } from "@/lib/global-sound";
import { recordUnifiedActivity } from "@/lib/unified-study-storage";
import { openSyncModal } from "@/lib/global-modals-store";

export function DokkaiClient() {
  const [passages] = useState<DokkaiPassage[]>(DOKKAI_PASSAGES);
  const [selectedPassageId, setSelectedPassageId] = useState<string>(passages[0]?.id || "");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<"all" | DokkaiCategory | "bookmarks">("all");
  const [showFurigana, setShowFurigana] = useState(true);
  const [showVocabList, setShowVocabList] = useState(false);

  // Selected question answers for active passage
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [highlightedClueIndex, setHighlightedClueIndex] = useState<number | null>(null);

  // Progress
  const [progress, setProgress] = useState<DokkaiProgress>(loadDokkaiProgress);

  // TTS
  const { speak, stop, isSpeaking, activeSpeechId } = useJapaneseTts();

  // Load progress on mount
  useEffect(() => {
    setProgress(loadDokkaiProgress());
  }, []);

  // Stop speech when changing passage
  useEffect(() => {
    stop();
    setHighlightedClueIndex(null);
  }, [selectedPassageId, stop]);

  // Active Passage
  const activePassage = useMemo(() => {
    return passages.find((p) => p.id === selectedPassageId) || passages[0];
  }, [passages, selectedPassageId]);

  // Filtered Passages
  const filteredPassages = useMemo(() => {
    if (activeCategoryFilter === "all") return passages;
    if (activeCategoryFilter === "bookmarks") {
      return passages.filter((p) => progress.bookmarkedPassageIds.includes(p.id));
    }
    return passages.filter((p) => p.category === activeCategoryFilter);
  }, [passages, activeCategoryFilter, progress.bookmarkedPassageIds]);

  const currentPassageIndex = useMemo(() => {
    return passages.findIndex((p) => p.id === activePassage.id);
  }, [passages, activePassage.id]);

  const isBookmarked = progress.bookmarkedPassageIds.includes(activePassage.id);
  const isPassageCompleted = progress.completedPassageIds.includes(activePassage.id);

  // Handle Option Select
  const handleSelectOption = useCallback(
    (questionId: string, optionKey: "1" | "2" | "3" | "4", isCorrect: boolean, clueIndex?: number) => {
      // If already answered, do nothing
      if (selectedAnswers[questionId]) return;

      setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionKey }));

      if (isCorrect) {
        triggerHaptic("success");
        playSuccessChime();
      } else {
        triggerHaptic("error");
        playErrorBuzz();
      }

      recordUnifiedActivity("dokkai", 1);

      if (clueIndex !== undefined) {
        setHighlightedClueIndex(clueIndex);
        setTimeout(() => {
          const el = document.getElementById(`dokkai-sentence-${clueIndex}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 120);
      }

      // Check if all questions in passage are answered
      const updatedAnswers = { ...selectedAnswers, [questionId]: optionKey };
      const allAnswered = activePassage.questions.every((q) => updatedAnswers[q.id]);

      const updatedProgress = recordDokkaiAnswer(
        activePassage.id,
        questionId,
        optionKey,
        isCorrect,
        allAnswered
      );
      setProgress(updatedProgress);
    },
    [selectedAnswers, activePassage]
  );

  const handleToggleBookmark = useCallback(() => {
    triggerHaptic("light");
    playTapSound();
    const updated = toggleDokkaiBookmark(activePassage.id);
    setProgress(updated);
  }, [activePassage.id]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] pb-28 sm:pb-24 font-sans">
      {/* Top Header & Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <a
              href="/tools/n3-suite"
              className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5 text-xs font-bold shrink-0"
              title="Kembali ke JLPT N3 Suite Hub"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">N3 Suite</span>
            </a>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)] truncate">
                  新完全マスター N3
                </span>
                <span className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold shrink-0">
                  読解
                </span>
              </div>
              <h1 className="text-xs sm:text-base font-bold text-[var(--text-primary)] tracking-tight truncate">
                Reading Comprehension
              </h1>
            </div>
          </div>

          {/* Quick Actions & Toggles */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="/tools/tango-n3"
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand-primary)]/50 transition-all mr-1"
              title="Buka Modul Kosakata Shin Kanzen Tango N3"
            >
              <BookOpen size={13} />
              <span>Tango (単語)</span>
            </a>
            <a
              href="/tools/bunpou-n3"
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] hover:text-emerald-600 hover:border-emerald-500/50 transition-all mr-1"
              title="Buka Modul Tata Bahasa Shin Kanzen Bunpou N3"
            >
              <Sparkles size={13} className="text-emerald-500" />
              <span>Bunpou (文法)</span>
            </a>
            {/* Furigana Toggle */}
            <button
              type="button"
              onClick={() => setShowFurigana((prev) => !prev)}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-1.5 rounded-xl border text-[11px] sm:text-xs font-bold transition-all active:scale-95 ${
                showFurigana
                  ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-sm"
                  : "bg-[var(--surface-soft)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]"
              }`}
              title="Tampilkan / Sembunyikan Furigana (ルビ)"
            >
              <Languages size={13} />
              <span className="hidden sm:inline">ルビ {showFurigana ? "ON" : "OFF"}</span>
              <span className="sm:hidden">{showFurigana ? "ルビ" : "OFF"}</span>
            </button>


            {/* Sync & Streak Button */}
            <button
              type="button"
              onClick={() => {
                triggerHaptic("medium");
                playTapSound();
                openSyncModal();
              }}
              className="p-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 text-xs font-bold transition-all active:scale-95 flex items-center gap-1"
              title="Habit Tracker & Sinkronisasi Perangkat"
            >
              <Flame size={15} className="fill-amber-500 animate-pulse" />
            </button>

            {/* Bookmark Button */}
            <button
              type="button"
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                isBookmarked
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-500"
                  : "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:text-amber-500"
              }`}
              title={isBookmarked ? "Hapus dari Favorit" : "Simpan ke Favorit"}
            >
              <Bookmark size={15} className={isBookmarked ? "fill-amber-500" : ""} />
            </button>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-2.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar text-[11px] sm:text-xs">
          <button
            type="button"
            onClick={() => setActiveCategoryFilter("all")}
            className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition-all ${
              activeCategoryFilter === "all"
                ? "bg-[var(--text-primary)] text-[var(--surface)] border-[var(--text-primary)] font-bold shadow-xs"
                : "border-[var(--border)] bg-[var(--surface-soft)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Semua Bab ({passages.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveCategoryFilter("technique")}
            className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition-all ${
              activeCategoryFilter === "technique"
                ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] font-bold shadow-xs"
                : "border-[var(--border)] bg-[var(--surface-soft)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Pilar 1: Teknik Dasar (基礎編)
          </button>

          <button
            type="button"
            onClick={() => setActiveCategoryFilter("short")}
            className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition-all ${
              activeCategoryFilter === "short"
                ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] font-bold shadow-xs"
                : "border-[var(--border)] bg-[var(--surface-soft)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            短文 (Teks Pendek)
          </button>

          <button
            type="button"
            onClick={() => setActiveCategoryFilter("medium")}
            className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition-all ${
              activeCategoryFilter === "medium"
                ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] font-bold shadow-xs"
                : "border-[var(--border)] bg-[var(--surface-soft)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            中文 (Teks Sedang)
          </button>

          <button
            type="button"
            onClick={() => setActiveCategoryFilter("long")}
            className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition-all ${
              activeCategoryFilter === "long"
                ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] font-bold shadow-xs"
                : "border-[var(--border)] bg-[var(--surface-soft)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            長文 (Teks Panjang)
          </button>

          <button
            type="button"
            onClick={() => setActiveCategoryFilter("info_search")}
            className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition-all ${
              activeCategoryFilter === "info_search"
                ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] font-bold shadow-xs"
                : "border-[var(--border)] bg-[var(--surface-soft)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            情報検索 (Pencarian Info)
          </button>

          <button
            type="button"
            onClick={() => setActiveCategoryFilter("bookmarks")}
            className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition-all ${
              activeCategoryFilter === "bookmarks"
                ? "bg-amber-500 text-white border-amber-500 font-bold shadow-xs"
                : "border-[var(--border)] bg-[var(--surface-soft)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Tersimpan ({progress.bookmarkedPassageIds.length})
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        {/* Passages Carousel Selector */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2 sm:gap-3 bg-[var(--surface)] p-2 sm:p-3 rounded-2xl border border-[var(--border)]">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-0.5 px-0.5">
            {filteredPassages.map((p, idx) => {
              const isSelected = p.id === activePassage.id;
              const isCompleted = progress.completedPassageIds.includes(p.id);

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPassageId(p.id)}
                  className={`px-3 sm:px-3.5 py-2 sm:py-1.5 rounded-xl border text-[11px] sm:text-xs whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] font-bold shadow-sm"
                      : "bg-[var(--surface-soft)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand-primary)]/50"
                  }`}
                >
                  {isCompleted && <Check size={12} className={isSelected ? "text-white" : "text-emerald-500"} />}
                  <span>Bab {p.chapterNumber}</span>
                  <span className="opacity-70 text-[10px] hidden sm:inline">({p.techniqueTag})</span>
                </button>
              );
            })}
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden md:flex items-center gap-3 shrink-0 pl-3 border-l border-[var(--border)] text-xs text-[var(--text-secondary)]">
            <div>
              <span>Selesai: </span>
              <b className="text-[var(--text-primary)]">
                {progress.completedPassageIds.length} / {passages.length}
              </b>
            </div>
            <div>
              <span>Akurasi: </span>
              <b className="text-emerald-500">
                {progress.totalAttempts > 0
                  ? Math.round((progress.totalCorrect / progress.totalAttempts) * 100)
                  : 0}
                %
              </b>
            </div>
          </div>
        </div>

        {/* 2-Column Split Layout: Passage (Left) & Questions (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: PASSAGE CANVAS (7 Cols on LG)               */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
            {/* Passage Card Container */}
            <div className="p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-md flex flex-col gap-4 sm:gap-5">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 pb-2.5 sm:pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-[10px] sm:text-xs font-bold font-mono">
                    {activePassage.categoryLabel}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[var(--text-secondary)] font-medium">
                    {activePassage.techniqueTag}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* TTS Whole Passage Audio Speaker */}
                  <button
                    type="button"
                    onClick={() => {
                      const fullText = activePassage.sentences.map((s) => s.textJp).join(" ");
                      if (activeSpeechId === `dokkai-passage-${activePassage.id}`) {
                        stop();
                      } else {
                        speak(fullText, `dokkai-passage-${activePassage.id}`);
                      }
                    }}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-[11px] sm:text-xs font-bold transition-all active:scale-95 ${
                      activeSpeechId === `dokkai-passage-${activePassage.id}`
                        ? "bg-emerald-500 text-white border-emerald-500 shadow-sm animate-pulse"
                        : "bg-[var(--surface-soft)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]"
                    }`}
                    title="Dengarkan seluruh teks dibacakan"
                  >
                    {activeSpeechId === `dokkai-passage-${activePassage.id}` ? (
                      <VolumeX size={14} />
                    ) : (
                      <Volume2 size={14} />
                    )}
                    <span className="hidden sm:inline">{activeSpeechId === `dokkai-passage-${activePassage.id}` ? "Stop" : "Audio Teks"}</span>
                    <span className="sm:hidden">{activeSpeechId === `dokkai-passage-${activePassage.id}` ? "■" : "▶"}</span>
                  </button>

                  {/* Vocabulary Drawer Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowVocabList((prev) => !prev)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 active:scale-95 ${
                      showVocabList
                        ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]"
                        : "bg-[var(--surface-soft)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]"
                    }`}
                    title="Buka daftar kosakata teks ini"
                  >
                    <BookOpen size={13} />
                    <span className="hidden sm:inline">Kosakata ({activePassage.vocabulary.length})</span>
                    <span className="sm:hidden">{activePassage.vocabulary.length}</span>
                  </button>
                </div>
              </div>

              {/* Title & Methodological Tip Box */}
              <div>
                <h2 className="text-base sm:text-xl font-extrabold text-[var(--text-primary)] tracking-tight mb-0.5 sm:mb-1 font-japanese leading-snug">
                  {activePassage.titleJp}
                </h2>
                <p className="text-[11px] sm:text-sm text-[var(--text-secondary)] font-medium mb-2.5 sm:mb-3">
                  {activePassage.titleId}
                </p>

                {/* Shin Kanzen Master Technique Callout Box */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                  <Lightbulb size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <b className="block text-blue-600 dark:text-blue-400 mb-0.5 uppercase tracking-wide text-[10px]">
                      Kunci Teknik Shin Kanzen ({activePassage.techniqueTag}):
                    </b>
                    {activePassage.techniqueDescription}
                  </div>
                </div>
              </div>

              {/* Japanese Passage Content (Sentence by Sentence) */}
              <div className="p-3.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[var(--surface-soft)]/50 border border-[var(--border)] space-y-3 sm:space-y-3.5 select-text">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)] block mb-0.5 sm:mb-1">
                  【本文 - Teks Bacaan】
                </span>

                <div className="text-[14px] sm:text-[17px] md:text-[18px] text-[var(--text-primary)] leading-[2.1] sm:leading-[2.5] tracking-[0.02em] font-japanese">
                  {activePassage.sentences.map((sentence, idx) => {
                    const isClue = highlightedClueIndex === idx;

                    return (
                      <span
                        key={sentence.id}
                        id={`dokkai-sentence-${idx}`}
                        className={`inline transition-all rounded px-1 py-0.5 ${
                          isClue
                            ? "bg-amber-500/20 text-[var(--text-primary)] border-b-2 border-amber-500 font-bold scroll-mt-24"
                            : ""
                        }`}
                      >
                        <RubyTerm
                          rubyText={sentence.ruby || autoAnnotateRuby(sentence.textJp)}
                          fallbackText={sentence.textJp}
                          showFurigana={showFurigana}
                          context="dokkai"
                          className="inline leading-[2.3] sm:leading-[2.5]"
                        />
                        {/* Sentence TTS trigger button */}
                        <button
                          type="button"
                          onClick={() => speak(sentence.textJp, `sentence-${sentence.id}`)}
                          className={`inline-flex items-center justify-center w-6 h-6 sm:w-5 sm:h-5 ml-1 rounded-full align-middle transition-colors text-[var(--text-secondary)] hover:text-[var(--brand-primary)] hover:bg-[var(--surface)] active:scale-90 ${
                            activeSpeechId === `sentence-${sentence.id}`
                              ? "bg-emerald-500 text-white animate-pulse"
                              : ""
                          }`}
                          title="Dengarkan kalimat ini"
                        >
                          <Volume2 size={11} />
                        </button>{" "}
                      </span>
                    );
                  })}
                </div>
              </div>



              {/* Collapsible Vocabulary List */}
              <AnimatePresence>
                {showVocabList && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                        <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen size={13} /> Daftar Kosakata Penting Bab Ini:
                        </span>
                        <span className="text-[11px] text-[var(--text-secondary)] opacity-70">
                          (Ketuk kata di teks untuk melihat arti instan)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {activePassage.vocabulary.map((vocab, vIdx) => (
                          <div
                            key={vIdx}
                            className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-start justify-between gap-2"
                          >
                            <div>
                              <div className="font-japanese font-bold text-[var(--text-primary)] text-sm">
                                {vocab.termJp}{" "}
                                <span className="text-xs font-normal text-[var(--brand-primary)]">
                                  ({vocab.furigana})
                                </span>
                              </div>
                              <div className="text-[var(--text-secondary)] mt-0.5">{vocab.meaningId}</div>
                            </div>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-soft)] text-[var(--text-secondary)] font-bold shrink-0">
                              {vocab.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: QUESTIONS & ANALYSIS (5 Cols on LG)         */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {activePassage.questions.map((q) => {
              const userSelectedKey = selectedAnswers[q.id];
              const isAnswered = !!userSelectedKey;
              const correctOpt = q.options.find((o) => o.isCorrect);
              const isUserCorrect = userSelectedKey === correctOpt?.key;

              return (
                <div
                  key={q.id}
                  className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-md flex flex-col gap-3 sm:gap-4"
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[var(--border)]">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                      【設問 {q.questionNumber}】
                    </span>
                    {isAnswered && (
                      <span
                        className={`text-xs font-bold flex items-center gap-1 ${
                          isUserCorrect ? "text-emerald-500" : "text-rose-500"
                        }`}
                      >
                        {isUserCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        <span>{isUserCorrect ? "正解 (Benar)" : "不正解 (Salah)"}</span>
                      </span>
                    )}
                  </div>

                  {/* Japanese Question Prompt */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-[1.8] font-japanese mb-1">
                      <RubyTerm
                        rubyText={autoAnnotateRuby(q.questionJp)}
                        fallbackText={q.questionJp}
                        showFurigana={showFurigana}
                        context="dokkai"
                      />
                    </h3>
                  </div>

                  {/* 4 Interactive Options */}
                  <div className="flex flex-col gap-2.5 mt-1">
                    {q.options.map((opt) => {
                      const isSelected = userSelectedKey === opt.key;

                      let style =
                        "border-[var(--border)] bg-[var(--surface-soft)]/50 hover:bg-[var(--surface-soft)] hover:border-[var(--brand-primary)]/40 text-[var(--text-primary)]";

                      if (isAnswered) {
                        if (opt.isCorrect) {
                          style = "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-semibold shadow-xs";
                        } else if (isSelected && !opt.isCorrect) {
                          style = "border-rose-500 bg-rose-500/10 text-rose-500";
                        } else {
                          style = "opacity-40 border-[var(--border)] bg-transparent text-[var(--text-secondary)]";
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.key, opt.isCorrect, q.clueSentenceIndex)}
                          disabled={isAnswered}
                          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all flex items-start gap-2.5 sm:gap-3 active:scale-[0.99] ${style}`}
                        >
                          <span
                            className={`w-7 h-7 sm:w-6 sm:h-6 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                              isAnswered && opt.isCorrect
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : isSelected && !opt.isCorrect
                                ? "border-rose-500 bg-rose-500 text-white"
                                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
                            }`}
                          >
                            {opt.key}
                          </span>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium leading-[1.8] font-japanese">
                              <RubyTerm
                                rubyText={autoAnnotateRuby(opt.textJp)}
                                fallbackText={opt.textJp}
                                showFurigana={showFurigana}
                                context="dokkai"
                              />
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Result: Correct → brief celebration | Wrong → full explanation */}
                  {isAnswered && isUserCorrect && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 mt-2"
                    >
                      <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                      <div className="text-xs">
                        <b className="text-emerald-600 dark:text-emerald-400">正解！よくできました！</b>
                        <span className="text-[var(--text-secondary)] ml-1.5">
                          Jawaban benar. Lanjut ke soal berikutnya!
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {isAnswered && !isUserCorrect && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex flex-col gap-3 mt-2 text-xs"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]/70">
                        <span className="font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles size={13} /> Bedah Jawaban & Analisis Jebakan:
                        </span>
                        <span className="font-bold text-emerald-500">
                          Kunci Benar: 【 Pilihan {correctOpt?.key} 】
                        </span>
                      </div>

                      {/* Explanation per option */}
                      <div className="space-y-2">
                        {q.options.map((opt) => (
                          <div
                            key={opt.key}
                            className={`p-2.5 rounded-xl border leading-relaxed ${
                              opt.isCorrect
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                                : userSelectedKey === opt.key
                                ? "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"
                                : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)]"
                            }`}
                          >
                            <b className="font-mono mr-1.5">【{opt.key}】</b>
                            {opt.explanation}
                          </div>
                        ))}
                      </div>

                      {/* Technique Tip */}
                      {q.techniqueTip && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 leading-relaxed">
                          <b>Tips Shin Kanzen:</b> {q.techniqueTip}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Bottom Passage Navigation — Sticky on mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--border)] p-3 sm:p-4 flex items-center justify-between gap-3 sm:static sm:bg-transparent sm:backdrop-blur-none sm:border-0 sm:pt-2 sm:pb-0">
              <button
                type="button"
                disabled={currentPassageIndex === 0}
                onClick={() => {
                  if (currentPassageIndex > 0) {
                    setSelectedPassageId(passages[currentPassageIndex - 1].id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="px-3.5 sm:px-4 py-2.5 sm:py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)] disabled:opacity-30 text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 flex-1 sm:flex-none justify-center sm:justify-start"
              >
                <ChevronLeft size={15} />
                <span>Sebelumnya</span>
              </button>

              {/* Mobile-only progress indicator */}
              <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] sm:hidden shrink-0">
                {currentPassageIndex + 1}/{filteredPassages.length}
              </span>

              <button
                type="button"
                disabled={currentPassageIndex === passages.length - 1}
                onClick={() => {
                  if (currentPassageIndex < passages.length - 1) {
                    setSelectedPassageId(passages[currentPassageIndex + 1].id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white disabled:opacity-30 text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 flex-1 sm:flex-none justify-center sm:justify-start"
              >
                <span>Berikutnya</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Global Interactive Kanji Tap-to-Define Popover */}
      <KanjiLookupModal />
    </div>
  );
}
