"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
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
  Star,
  RotateCcw,
  CheckCheck,
  AlertTriangle,
  GitCompare,
  Layers,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { BUNPOU_ITEMS } from "@/data/bunpou-n3/grammar-items";
import { BunpouItem, BunpouCategory, BunpouQuestion } from "@/data/bunpou-n3/types";
import {
  BunpouProgress,
  DEFAULT_BUNPOU_PROGRESS,
  loadBunpouProgress,
  markPatternAsStudied,
  toggleBunpouBookmark,
  recordBunpouAnswer,
} from "./bunpou-storage";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { useJapaneseTts } from "@/lib/use-japanese-tts";
import { KanjiLookupModal } from "@/components/fe-study/kanji-lookup-modal";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound, playSuccessChime, playErrorBuzz } from "@/lib/global-sound";
import { recordUnifiedActivity } from "@/lib/unified-study-storage";
import { openSyncModal } from "@/lib/global-modals-store";
import { N3TopBar, N3ContinueCard, N3MoreSection, N3SecondaryAction } from "@/components/n3/n3-shell";

export function BunpouClient() {
  const [items] = useState<BunpouItem[]>(BUNPOU_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState<string>(items[0]?.id || "");
  const [activeChapterFilter, setActiveChapterFilter] = useState<number | "all" | "bookmarks">("all");
  const [showFurigana, setShowFurigana] = useState(true);
  const [activeTab, setActiveTab] = useState<"learn" | "quiz">("learn");

  // Progress
  const [progress, setProgress] = useState<BunpouProgress>(DEFAULT_BUNPOU_PROGRESS);

  // Seiretsu interactive state: questionId -> array of chosen item indices
  const [seiretsuSlots, setSeiretsuSlots] = useState<Record<string, number[]>>({});
  // Cloze answers: questionId -> selectedKey
  const [clozeAnswers, setClozeAnswers] = useState<Record<string, string>>({});

  // Chapter list computed from items
  const chapters = useMemo(() => {
    const map = new Map<number, { chapterNumber: number; chapterTitle: string; count: number }>();
    for (const it of items) {
      if (!map.has(it.chapterNumber)) {
        map.set(it.chapterNumber, {
          chapterNumber: it.chapterNumber,
          chapterTitle: it.chapterTitle,
          count: 0,
        });
      }
      map.get(it.chapterNumber)!.count++;
    }
    return Array.from(map.values()).sort((a, b) => a.chapterNumber - b.chapterNumber);
  }, [items]);

  // Filtered items by chapter or bookmarks
  const filteredItems = useMemo(() => {
    if (activeChapterFilter === "bookmarks") {
      return items.filter((it) => progress.bookmarkedPatternIds.includes(it.id));
    }
    if (activeChapterFilter === "all") {
      return items;
    }
    return items.filter((it) => it.chapterNumber === activeChapterFilter);
  }, [items, activeChapterFilter, progress.bookmarkedPatternIds]);

  // Handle switching chapter filter & auto-select first item if needed
  const handleSelectChapter = useCallback(
    (ch: number | "all" | "bookmarks") => {
      triggerHaptic("light");
      playTapSound();
      setActiveChapterFilter(ch);
      let targetList: BunpouItem[];
      if (ch === "bookmarks") {
        targetList = items.filter((it) => progress.bookmarkedPatternIds.includes(it.id));
      } else if (ch === "all") {
        targetList = items;
      } else {
        targetList = items.filter((it) => it.chapterNumber === ch);
      }
      if (targetList.length > 0 && !targetList.some((it) => it.id === selectedItemId)) {
        setSelectedItemId(targetList[0].id);
      }
    },
    [items, progress.bookmarkedPatternIds, selectedItemId]
  );

  // Active item
  const activeItem = useMemo(() => {
    return items.find((it) => it.id === selectedItemId) || items[0];
  }, [items, selectedItemId]);

  const isBookmarked = progress.bookmarkedPatternIds.includes(activeItem.id);
  const isStudied = progress.studiedPatternIds.includes(activeItem.id);

  // TTS
  const { speak, stop, isSpeaking, activeSpeechId } = useJapaneseTts();

  // Load progress on mount
  useEffect(() => {
    setProgress(loadBunpouProgress());
  }, []);

  // Stop speech when changing item
  useEffect(() => {
    stop();
  }, [selectedItemId, stop]);

  // Prev / Next Navigation
  const currentIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
  const prevPattern = currentIndex > 0 ? filteredItems[currentIndex - 1] : null;
  const nextPattern = currentIndex < filteredItems.length - 1 ? filteredItems[currentIndex + 1] : null;

  const goToPattern = useCallback((id: string) => {
    triggerHaptic("light");
    playTapSound();
    setSelectedItemId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Navigation handlers
  const handleToggleBookmark = useCallback(() => {
    triggerHaptic("light");
    playTapSound();
    const updated = toggleBunpouBookmark(activeItem.id);
    setProgress(updated);
  }, [activeItem.id]);

  const handleMarkAsStudied = useCallback(() => {
    triggerHaptic("medium");
    playSuccessChime();
    const updated = markPatternAsStudied(activeItem.id);
    setProgress(updated);
    recordUnifiedActivity("bunpou", 1);
  }, [activeItem.id]);

  const handleSelectClozeOption = useCallback(
    (question: BunpouQuestion, selectedKey: "1" | "2" | "3" | "4") => {
      triggerHaptic("light");
      const isCorrect = selectedKey === question.correctKey;
      if (isCorrect) {
        playSuccessChime();
      } else {
        playErrorBuzz();
      }

      setClozeAnswers((prev) => ({ ...prev, [question.id]: selectedKey }));
      const updated = recordBunpouAnswer(activeItem.id, question.id, isCorrect, { selectedKey });
      setProgress(updated);
      recordUnifiedActivity("bunpou", 1);
    },
    [activeItem.id]
  );

  // Seiretsu item tap from pool (add to next slot)
  const handleTapSeiretsuItem = useCallback(
    (questionId: string, itemIdx: number) => {
      triggerHaptic("light");
      playTapSound();
      setSeiretsuSlots((prev) => {
        const current = prev[questionId] || [];
        if (current.includes(itemIdx)) {
          // If already in slot, remove it
          return { ...prev, [questionId]: current.filter((idx) => idx !== itemIdx) };
        } else {
          // Add if not yet placed (max 4)
          if (current.length >= 4) return prev;
          return { ...prev, [questionId]: [...current, itemIdx] };
        }
      });
    },
    []
  );

  // Seiretsu remove directly by tapping the slot
  const handleRemoveSeiretsuSlot = useCallback(
    (questionId: string, slotIndex: number) => {
      triggerHaptic("light");
      playTapSound();
      setSeiretsuSlots((prev) => {
        const current = prev[questionId] || [];
        if (slotIndex >= current.length) return prev;
        const next = [...current];
        next.splice(slotIndex, 1);
        return { ...prev, [questionId]: next };
      });
    },
    []
  );

  const handleCheckSeiretsu = useCallback(
    (question: BunpouQuestion) => {
      const current = seiretsuSlots[question.id] || [];
      if (current.length !== 4) return;

      const isCorrect = JSON.stringify(current) === JSON.stringify(question.correctOrder);
      if (isCorrect) {
        triggerHaptic("heavy");
        playSuccessChime();
      } else {
        triggerHaptic("medium");
        playErrorBuzz();
      }

      const updated = recordBunpouAnswer(activeItem.id, question.id, isCorrect, {
        orderedItems: current.map((i) => question.items?.[i] || ""),
      });
      setProgress(updated);
      recordUnifiedActivity("bunpou", 1);
    },
    [activeItem.id, seiretsuSlots]
  );

  const handleResetSeiretsu = useCallback((questionId: string) => {
    triggerHaptic("light");
    playTapSound();
    setSeiretsuSlots((prev) => ({ ...prev, [questionId]: [] }));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] pb-28 sm:pb-16 font-sans">
      <N3TopBar
        active="bunpou"
        title="JLPT N3 Bunpou (文法)"
        tools={
          <>
            <button
              type="button"
              onClick={() => setShowFurigana((prev) => !prev)}
              className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl border text-[11px] sm:text-xs font-bold transition-all active:scale-95 touch-manipulation ${
                showFurigana
                  ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
                  : "bg-[var(--surface-soft)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]"
              }`}
              title="Tampilkan / Sembunyikan Furigana"
            >
              <Languages size={13} />
              <span className="hidden sm:inline">ルビ {showFurigana ? "ON" : "OFF"}</span>
              <span className="sm:hidden">{showFurigana ? "ルビ" : "OFF"}</span>
            </button>
            <button
              type="button"
              onClick={handleToggleBookmark}
              className={`p-1.5 sm:p-2 rounded-xl border text-xs font-bold transition-all active:scale-95 touch-manipulation ${
                isBookmarked
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-500"
                  : "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:text-amber-500"
              }`}
              title={isBookmarked ? "Hapus dari Favorit" : "Simpan ke Favorit"}
            >
              <Bookmark size={15} className={isBookmarked ? "fill-amber-500" : ""} />
            </button>
          </>
        }
      />

      <main className="max-w-4xl mx-auto px-3 sm:px-6 pt-5 sm:pt-8 space-y-6">
        {/* Single Focused Target Card */}
        <N3ContinueCard
          accent="emerald"
          eyebrow={`Bab ${activeItem.chapterNumber} · ${activeItem.categoryLabel}`}
          title={`${activeItem.patternJp} — ${activeItem.meaningId}`}
          subtitle={activeItem.coreConcept}
          progress={Math.round((progress.studiedPatternIds.length / (items.length || 1)) * 100)}
          progressLabel={`${progress.studiedPatternIds.length}/${items.length} pola dikuasai (${Math.round((progress.studiedPatternIds.length / (items.length || 1)) * 100)}%) · ${progress.totalAttempts > 0 ? Math.round((progress.totalCorrect / progress.totalAttempts) * 100) : 0}% akurasi kuis`}
          primary={{
            id: "bunpou-primary-action-btn",
            label: activeTab === "learn" ? "Lanjut Kuis & Bintang →" : "Kembali ke Materi & Rumus →",
            onClick: () => setActiveTab(activeTab === "learn" ? "quiz" : "learn"),
          }}
          secondary={
            <>
              <N3SecondaryAction id="bunpou-mark-btn" onClick={handleMarkAsStudied}>
                {isStudied ? "✓ Sudah Dikuasai" : "Tandai Dikuasai"}
              </N3SecondaryAction>
              {prevPattern && (
                <N3SecondaryAction id="bunpou-prev-btn" onClick={() => goToPattern(prevPattern.id)}>
                  ← {prevPattern.patternJp}
                </N3SecondaryAction>
              )}
              {nextPattern && (
                <N3SecondaryAction id="bunpou-next-btn" onClick={() => goToPattern(nextPattern.id)}>
                  {nextPattern.patternJp} →
                </N3SecondaryAction>
              )}
            </>
          }
        />

        {/* View Toggle Tabs (Mobile/Desktop friendly segmented control) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-[var(--border)] pb-3">
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                triggerHaptic("light");
                setActiveTab("learn");
              }}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98 touch-manipulation ${
                activeTab === "learn"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <BookOpen size={14} />
              <span>1. Materi & Rumus</span>
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("light");
                setActiveTab("quiz");
              }}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98 touch-manipulation ${
                activeTab === "quiz"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Star size={14} />
              <span>2. Kuis & Bintang ({activeItem.questions.length})</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={handleMarkAsStudied}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 touch-manipulation ${
                isStudied
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-400"
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500"
              }`}
            >
              <CheckCheck size={14} />
              <span>{isStudied ? "Sudah Dipelajari" : "Tandai Selesai"}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Learn View */}
        {activeTab === "learn" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Main Grammar Card (Col span 2) */}
            <div className="lg:col-span-2 space-y-5 sm:space-y-6">
              {/* Pattern Banner Card */}
              <div className="p-4 sm:p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xs sm:shadow-sm space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold font-mono">
                    {activeItem.categoryLabel} · {activeItem.patternKana}
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)]">JLPT N3 Grammar</span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] font-japanese tracking-wide">
                    {activeItem.patternJp}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {activeItem.meaningId}
                  </p>
                </div>

                {/* Connection Box (接続 - Mobile Optimized with structured badges) */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider font-mono">
                    <Layers size={13} />
                    <span>Rumus Sambungan (接続 / Setsuzoku):</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeItem.connection.split("\n").map((line, lIdx) => (
                      <div
                        key={lIdx}
                        className="px-3 py-1.5 rounded-xl bg-[var(--surface)]/90 border border-emerald-500/15 text-xs sm:text-sm font-japanese font-medium text-[var(--text-primary)] flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                        <span className="leading-relaxed">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Concept */}
                <div className="space-y-1">
                  <h3 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider font-mono">
                    Konsep & Kapan Digunakan:
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                    {activeItem.coreConcept}
                  </p>
                </div>

                {/* Caution Note */}
                {activeItem.cautionNote && (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 sm:gap-3">
                    <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-xs sm:text-sm">
                      <b className="text-amber-700 dark:text-amber-300">Peringatan & Jebakan Ujian:</b>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {activeItem.cautionNote}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Authentic Example Sentences (例文) */}
              <div className="p-4 sm:p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xs sm:shadow-sm space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5 sm:pb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Sparkles size={16} className="text-emerald-600" />
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                      Contoh Kalimat Otentik (例文)
                    </h3>
                  </div>
                  <span className="text-[10px] sm:text-xs text-[var(--text-secondary)]">Tap kanji untuk info</span>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {activeItem.examples.map((ex, idx) => {
                    const isExSpeaking = isSpeaking && activeSpeechId === ex.id;

                    return (
                      <div
                        key={ex.id}
                        className="p-3.5 sm:p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] hover:border-emerald-500/40 transition-all space-y-2 group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-bold font-mono">
                              0{idx + 1}
                            </span>
                            {ex.contextNote && (
                              <span className="text-[10px] sm:text-[11px] font-medium text-[var(--text-secondary)] bg-[var(--surface)] px-2 py-0.5 rounded-lg border border-[var(--border)] truncate max-w-[200px] xs:max-w-none">
                                {ex.contextNote}
                              </span>
                            )}
                          </div>

                          {/* TTS Audio Button with larger mobile touch area */}
                          <button
                            type="button"
                            onClick={() => {
                              if (isExSpeaking) {
                                stop();
                              } else {
                                triggerHaptic("light");
                                speak(ex.textJp, ex.id);
                              }
                            }}
                            className={`p-2 rounded-xl border text-xs transition-all active:scale-90 touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center ${
                              isExSpeaking
                                ? "bg-emerald-700 text-white border-emerald-700 shadow-sm animate-pulse"
                                : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:text-emerald-700 hover:border-emerald-500"
                            }`}
                            title="Dengarkan pelafalan kalimat"
                          >
                            {isExSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                          </button>
                        </div>

                        {/* Japanese Sentence with Ruby & increased mobile line-height */}
                        <div className="text-base sm:text-lg font-japanese font-medium leading-[2.2] text-[var(--text-primary)] pt-1">
                          <RubyTerm
                            rubyText={ex.ruby}
                            fallbackText={ex.textJp}
                            showFurigana={showFurigana}
                            enableLookup={true}
                            context="dokkai"
                          />
                        </div>

                        {/* Indonesian Translation */}
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-1.5 border-t border-[var(--border)]/60">
                          {ex.textId}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Nuance Comparison Sidebar (Col span 1) */}
            <div className="space-y-4 sm:space-y-6">
              {activeItem.comparisons && activeItem.comparisons.length > 0 && (
                <div className="p-4 sm:p-5 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xs sm:shadow-sm space-y-3.5 sm:space-y-4">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-sm border-b border-[var(--border)] pb-2.5">
                    <GitCompare size={16} />
                    <span>Pembeda Nuansa yang Sering Mengecoh</span>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {activeItem.comparisons.map((cmp, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3 sm:p-3.5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] space-y-1.5 text-xs"
                      >
                        <div className="font-bold text-[var(--text-primary)] font-japanese text-sm">
                          vs {cmp.targetPattern}
                        </div>
                        <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
                          {cmp.summary}
                        </p>
                        <div className="pt-1.5 border-t border-[var(--border)]/60 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                          💡 <b>Kuncinya:</b> {cmp.distinctionId}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Study Tip / Action Box */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/25 space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-mono">
                  <Lightbulb size={14} />
                  <span>Tips Belajar Bunpou:</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Setelah membaca rumus dan contoh kalimat, segera uji pemahamanmu dengan latihan soal di tab{" "}
                  <b>&ldquo;Kuis & Bintang&rdquo;</b>. Susunan urutan kata (Seiretsu) adalah soal wajib di
                  lembar ujian JLPT N3!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic("medium");
                    playTapSound();
                    setActiveTab("quiz");
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 touch-manipulation"
                >
                  <span>Mulai Latihan Soal Bab Ini</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Quiz View (Cloze + Seiretsu Mondai ★) */}
        {activeTab === "quiz" && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {activeItem.questions.map((q) => {
              const answered = progress.answeredQuestions[q.id];
              const isSeiretsu = q.type === "seiretsu";

              return (
                <div
                  key={q.id}
                  className="p-4 sm:p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xs sm:shadow-sm space-y-4 sm:space-y-5"
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5 sm:pb-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 flex items-center justify-center text-xs font-bold font-mono">
                        Q{q.questionNumber}
                      </span>
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[var(--surface-soft)] text-[var(--text-secondary)] text-[10px] sm:text-xs font-bold border border-[var(--border)]">
                        {isSeiretsu ? "★ Soal Susun Urutan (並べ替え)" : "Pilihan Ganda Sambungan"}
                      </span>
                    </div>

                    {answered && (
                      <span
                        className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center gap-1 ${
                          answered.isCorrect
                            ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30"
                            : "bg-rose-500/10 text-rose-500 border border-rose-500/30"
                        }`}
                      >
                        {answered.isCorrect ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {answered.isCorrect ? "Benar" : "Belum Tepat"}
                      </span>
                    )}
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-1">
                    <div className="text-base sm:text-xl font-japanese font-bold text-[var(--text-primary)] leading-[2.2]">
                      <RubyTerm
                        rubyText={q.questionRuby}
                        fallbackText={q.questionJp}
                        showFurigana={showFurigana}
                        enableLookup={true}
                        context="dokkai"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] pt-1">
                      Artinya: {q.questionTranslation}
                    </p>
                  </div>

                  {/* Cloze Options */}
                  {!isSeiretsu && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                      {q.options.map((opt) => {
                        const isChosen = clozeAnswers[q.id] === opt.key || answered?.selectedKey === opt.key;
                        const isCorrectKey = opt.key === q.correctKey;
                        const showResult = answered !== undefined;

                        let btnStyle =
                          "bg-[var(--surface-soft)] border-[var(--border)] text-[var(--text-primary)] hover:border-emerald-500/50";
                        if (showResult) {
                          if (isCorrectKey) {
                            btnStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold";
                          } else if (isChosen && !isCorrectKey) {
                            btnStyle = "bg-rose-500/15 border-rose-500 text-rose-600 font-bold";
                          } else {
                            btnStyle = "opacity-60 bg-[var(--surface-soft)] border-[var(--border)]";
                          }
                        } else if (isChosen) {
                          btnStyle = "bg-emerald-700 text-white border-emerald-700 font-bold";
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => handleSelectClozeOption(q, opt.key)}
                            className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-start gap-2.5 active:scale-98 touch-manipulation ${btnStyle}`}
                          >
                            <span className="w-6 h-6 rounded-lg bg-[var(--surface)] text-[var(--text-secondary)] flex items-center justify-center text-xs font-bold shrink-0 border border-[var(--border)]">
                              {opt.key}
                            </span>
                            <div className="space-y-0.5">
                              <div className="text-sm font-japanese font-bold">{opt.textJp}</div>
                              <div className="text-[11px] text-[var(--text-secondary)]">{opt.textId}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Seiretsu Interactive Slots */}
                  {isSeiretsu && q.items && (
                    <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                      {/* Slots Visualizer */}
                      <div className="p-3 sm:p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] space-y-2">
                        <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-[var(--text-secondary)]">
                          <span>Susunan Kalimat (Tap slot terisi untuk hapus):</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                          {[0, 1, 2, 3].map((slotIdx) => {
                            const chosenIdx = (seiretsuSlots[q.id] || [])[slotIdx];
                            const itemText = chosenIdx !== undefined ? q.items?.[chosenIdx] : null;
                            const isStar = slotIdx + 1 === (q.starPosition || 3);

                            return (
                              <button
                                key={slotIdx}
                                type="button"
                                onClick={() => itemText && handleRemoveSeiretsuSlot(q.id, slotIdx)}
                                disabled={!itemText}
                                className={`p-2 sm:p-2.5 rounded-xl border text-center relative transition-all min-h-[58px] sm:min-h-[52px] flex flex-col items-center justify-center active:scale-95 touch-manipulation ${
                                  itemText
                                    ? "bg-[var(--surface)] border-emerald-500 shadow-xs font-bold text-emerald-700 dark:text-emerald-300 cursor-pointer hover:border-rose-400"
                                    : "bg-transparent border-dashed border-[var(--border)] text-[var(--text-secondary)] cursor-default"
                                }`}
                              >
                                {isStar && (
                                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[8px] sm:text-[9px] font-bold flex items-center gap-0.5 shadow-xs whitespace-nowrap">
                                    <Star size={8} className="fill-white" />
                                    <span>★ Bintang</span>
                                  </span>
                                )}
                                <span className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] opacity-60">
                                  Slot {slotIdx + 1}
                                </span>
                                <span className="text-[11px] sm:text-sm font-japanese font-bold break-words w-full text-center leading-tight">
                                  {itemText || "—"}
                                </span>
                                {itemText && (
                                  <span className="text-[8px] text-[var(--text-secondary)] opacity-60 mt-0.5 sm:hidden">
                                    tap hapus
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Items pool */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {q.items.map((item, itemIdx) => {
                          const isPlaced = (seiretsuSlots[q.id] || []).includes(itemIdx);

                          return (
                            <button
                              key={itemIdx}
                              type="button"
                              disabled={isPlaced}
                              onClick={() => handleTapSeiretsuItem(q.id, itemIdx)}
                              className={`px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-japanese transition-all active:scale-95 touch-manipulation ${
                                isPlaced
                                  ? "opacity-30 bg-[var(--surface-soft)] border-dashed border-[var(--border)] text-[var(--text-secondary)] cursor-not-allowed"
                                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-primary)] hover:border-emerald-500 hover:text-emerald-700 font-bold shadow-xs active:bg-emerald-50 dark:active:bg-emerald-950/20"
                              }`}
                            >
                              <span>{item}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleCheckSeiretsu(q)}
                          disabled={(seiretsuSlots[q.id] || []).length !== 4}
                          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 touch-manipulation"
                        >
                          <Check size={14} />
                          <span>Periksa Urutan</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResetSeiretsu(q.id)}
                          className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1 active:scale-95 touch-manipulation"
                        >
                          <RotateCcw size={13} />
                          <span>Reset</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Explanation card after answering */}
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5 text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                        <Lightbulb size={14} />
                        <span>Pembahasan Soal:</span>
                      </div>
                      <p className="text-[var(--text-primary)] leading-relaxed">
                        {q.explanation}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Folded Chapter and Pattern Switcher */}
        <N3MoreSection
          id="bunpou-more-chapters"
          label={`Ganti bab & cari dari 24 bab (${items.length} pola) lainnya`}
        >
          <div className="space-y-4 p-4 rounded-3xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-[var(--text-primary)]">
                Pilih Bab:
              </span>
              <div className="relative">
                <select
                  aria-label="Pilih Bab Bunpou N3"
                  value={activeChapterFilter}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "all" || val === "bookmarks") {
                      handleSelectChapter(val);
                    } else {
                      handleSelectChapter(Number(val));
                    }
                  }}
                  className="py-1.5 px-3 pr-8 rounded-xl border border-emerald-500/30 bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-primary)] hover:border-emerald-500/60 focus:outline-hidden cursor-pointer appearance-none w-full sm:w-auto"
                >
                  <option value="all">Semua Bab ({items.length} Pola)</option>
                  <option value="bookmarks">Favorit ({progress.bookmarkedPatternIds.length})</option>
                  <optgroup label="24 Bab Bunpou N3">
                    {chapters.map((ch) => (
                      <option key={ch.chapterNumber} value={ch.chapterNumber}>
                        Bab {ch.chapterNumber}: {ch.chapterTitle.replace(/^第\d+課:\s*/, "")} ({ch.count})
                      </option>
                    ))}
                  </optgroup>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--text-secondary)] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Pattern Carousel Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {filteredItems.map((p) => {
                const isSelected = p.id === activeItem.id;
                const isDone = progress.studiedPatternIds.includes(p.id);

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => goToPattern(p.id)}
                    className={`px-3 py-1.5 rounded-xl border text-xs whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 touch-manipulation ${
                      isSelected
                        ? "bg-emerald-700 text-white border-emerald-700 font-bold shadow-sm"
                        : "bg-[var(--surface-soft)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/50"
                    }`}
                  >
                    {isDone && <Check size={12} className={isSelected ? "text-white" : "text-emerald-600"} />}
                    <span>{p.patternJp}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </N3MoreSection>
      </main>

      {/* Mobile Bottom Sticky Navigation Toolbar */}
      <nav className="study-module-controls fixed bottom-0 left-0 right-0 z-30 bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--border)] px-3 py-2 sm:hidden pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-lg">
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          <button
            type="button"
            disabled={!prevPattern}
            onClick={() => prevPattern && goToPattern(prevPattern.id)}
            className="flex-1 py-2 px-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] disabled:opacity-30 text-[11px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center gap-1 active:scale-95 touch-manipulation"
          >
            <ChevronLeft size={14} />
            <span className="truncate">{prevPattern ? prevPattern.patternJp : "Awal"}</span>
          </button>

          <button
            type="button"
            onClick={handleMarkAsStudied}
            className={`py-2 px-3 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1 active:scale-95 touch-manipulation shrink-0 ${
              isStudied
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-400"
                : "bg-emerald-700 text-white border-emerald-700 shadow-sm"
            }`}
          >
            <CheckCheck size={13} />
            <span>{isStudied ? "Dikuasai" : "Tandai"}</span>
          </button>

          <button
            type="button"
            disabled={!nextPattern}
            onClick={() => nextPattern && goToPattern(nextPattern.id)}
            className="flex-1 py-2 px-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] disabled:opacity-30 text-[11px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center gap-1 active:scale-95 touch-manipulation"
          >
            <span className="truncate">{nextPattern ? nextPattern.patternJp : "Akhir"}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </nav>

      {/* Shared Kanji Lookup Modal */}
      <KanjiLookupModal />
    </div>
  );
}
