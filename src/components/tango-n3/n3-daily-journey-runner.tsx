"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Volume2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  Flame,
  Award,
  AlertCircle,
  HelpCircle,
  FileText,
  RotateCcw,
  Undo2,
  Check,
  Zap,
} from "lucide-react";
import { N3JourneyDay, JourneyVocabItem, JourneyGrammarItem } from "@/data/tango-n3/n3-daily-journey";
import { DOKKAI_PASSAGES } from "@/data/dokkai-n3/passages";
import { completeJourneyDay } from "@/lib/n3-journey-storage";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound, playSuccessChime, playErrorBuzz } from "@/lib/global-sound";

interface N3DailyJourneyRunnerProps {
  day: N3JourneyDay;
  isOpen: boolean;
  onClose: () => void;
  onDayCompleted?: (dayNumber: number) => void;
}

type RunnerStep = "tango" | "bunpou" | "quiz" | "dokkai" | "completed";

export function N3DailyJourneyRunner({
  day,
  isOpen,
  onClose,
  onDayCompleted,
}: N3DailyJourneyRunnerProps) {
  const [currentStep, setCurrentStep] = useState<RunnerStep>("tango");

  // Step 1: Tango Flashcard Queue state
  const [tangoQueue, setTangoQueue] = useState<JourneyVocabItem[]>([]);
  const [tangoMastered, setTangoMastered] = useState<string[]>([]);
  const [tangoFlipped, setTangoFlipped] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [undoHistory, setUndoHistory] = useState<
    { item: JourneyVocabItem; wasMastered: boolean }[]
  >([]);

  // Step 2: Bunpou state
  const [bunpouIndex, setBunpouIndex] = useState(0);

  // Step 3: Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizScore, setQuizScore] = useState(0);

  // Step 4: Dokkai state
  const [dokkaiTooltip, setDokkaiTooltip] = useState<{
    word: string;
    meaning: string;
    ruby: string;
  } | null>(null);
  const [dokkaiQuestionAnswer, setDokkaiQuestionAnswer] = useState<string | null>(null);

  // Audio helper
  const speakJapanese = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  // Initialize day data
  useEffect(() => {
    if (isOpen && day) {
      setCurrentStep("tango");
      setTangoQueue([...day.vocabItems]);
      setTangoMastered([]);
      setTangoFlipped(false);
      setUndoHistory([]);
      setBunpouIndex(0);
      setQuizIndex(0);
      setSelectedAnswers({});
      setQuizScore(0);
      setDokkaiTooltip(null);
      setDokkaiQuestionAnswer(null);
    }
  }, [isOpen, day]);

  // Current Card
  const currentCard = tangoQueue[0];

  // Actions for Flashcards
  const handleTangoMaster = () => {
    if (!currentCard) return;
    triggerHaptic("success");
    playSuccessChime();

    setUndoHistory((prev) => [{ item: currentCard, wasMastered: true }, ...prev]);
    setTangoMastered((prev) => [...prev, currentCard.word]);
    setTangoQueue((prev) => prev.slice(1));
    setTangoFlipped(false);
    setDragOffset(0);
  };

  const handleTangoRepeat = () => {
    if (!currentCard) return;
    triggerHaptic("light");
    playTapSound();

    setUndoHistory((prev) => [{ item: currentCard, wasMastered: false }, ...prev]);
    setTangoQueue((prev) => [...prev.slice(1), currentCard]);
    setTangoFlipped(false);
    setDragOffset(0);
  };

  const handleTangoUndo = () => {
    if (undoHistory.length === 0) return;
    triggerHaptic("medium");
    playTapSound();

    const last = undoHistory[0];
    setUndoHistory((prev) => prev.slice(1));

    if (last.wasMastered) {
      setTangoMastered((prev) => prev.filter((w) => w !== last.item.word));
      setTangoQueue((prev) => [last.item, ...prev]);
    } else {
      setTangoQueue((prev) => {
        const withoutLast = prev.filter((c, idx) => idx !== prev.length - 1);
        return [last.item, ...withoutLast];
      });
    }
    setTangoFlipped(false);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (currentStep === "tango" && currentCard) {
        if (e.code === "Space") {
          e.preventDefault();
          setTangoFlipped((prev) => !prev);
          triggerHaptic("light");
          playTapSound();
        } else if (e.code === "ArrowRight" || e.key.toLowerCase() === "d") {
          e.preventDefault();
          handleTangoMaster();
        } else if (e.code === "ArrowLeft" || e.key.toLowerCase() === "a") {
          e.preventDefault();
          handleTangoRepeat();
        } else if (e.key.toLowerCase() === "r") {
          e.preventDefault();
          speakJapanese(currentCard.word);
        } else if (e.key.toLowerCase() === "z" || e.key.toLowerCase() === "u") {
          e.preventDefault();
          handleTangoUndo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep, currentCard, undoHistory]);

  if (!isOpen || !day) return null;

  const dokkaiPassage =
    DOKKAI_PASSAGES.find((p) => p.id === day.dokkaiPassageId) || DOKKAI_PASSAGES[0];

  // Calculate Progress Percent across 4 steps
  const getOverallProgress = () => {
    const totalVocab = day.vocabItems.length;
    const vocabProgress = totalVocab > 0 ? (tangoMastered.length / totalVocab) * 25 : 0;
    const bunpouProgress = ((bunpouIndex + 1) / day.grammarItems.length) * 25;
    const quizProgress = (Object.keys(selectedAnswers).length / day.quizQuestions.length) * 25;
    const dokkaiProgress = dokkaiQuestionAnswer ? 25 : 10;

    if (currentStep === "tango") return Math.min(25, vocabProgress);
    if (currentStep === "bunpou") return 25 + bunpouProgress;
    if (currentStep === "quiz") return 50 + quizProgress;
    if (currentStep === "dokkai") return 75 + dokkaiProgress;
    return 100;
  };

  // Handle Finish Day
  const handleFinishDay = () => {
    triggerHaptic("success");
    playSuccessChime();

    const totalQuestions = day.quizQuestions.length + 1;
    const finalScore = quizScore + (dokkaiQuestionAnswer ? 1 : 0);

    completeJourneyDay(day.day, finalScore, totalQuestions);
    if (onDayCompleted) onDayCompleted(day.day);
    setCurrentStep("completed");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xl">
      <div className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_32px_90px_rgba(0,0,0,0.6)] rounded-[32px] overflow-hidden flex flex-col max-h-[94vh] relative">
        {/* Apple-style Linear Gradient Progress Bar */}
        <div className="w-full h-1.5 bg-slate-200/50 dark:bg-slate-800/80 overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500"
            initial={{ width: "0%" }}
            animate={{ width: `${getOverallProgress()}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>

        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--surface-soft)]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm tracking-wide">
              Day {day.day}
            </span>
            <div>
              <h3 className="text-sm font-black text-[var(--text-primary)] leading-tight tracking-tight">
                {day.titleId}
              </h3>
              <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                {day.themeTag} · {day.durationMinutes} Menit
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-slate-400 transition-all active:scale-95"
          >
            <X size={16} />
          </button>
        </div>

        {/* Apple/Linear Stepper Navigation */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[var(--surface)]/90 border-b border-[var(--border)] text-xs font-bold gap-2 overflow-x-auto">
          {[
            { id: "tango", label: `1. Tango (${tangoMastered.length}/${day.vocabItems.length})`, icon: Layers, isDone: tangoMastered.length >= day.vocabItems.length },
            { id: "bunpou", label: "2. Bunpou", icon: BookOpen, isDone: currentStep === "quiz" || currentStep === "dokkai" || currentStep === "completed" },
            { id: "quiz", label: "3. Kuis", icon: Award, isDone: currentStep === "dokkai" || currentStep === "completed" },
            { id: "dokkai", label: "4. Dokkai", icon: FileText, isDone: currentStep === "completed" },
          ].map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(step.id as RunnerStep)}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap text-xs font-bold ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : step.isDone
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]"
                }`}
              >
                {step.isDone && !isActive ? <Check size={13} className="text-emerald-500 font-black" /> : <Icon size={13} />}
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {/* ========================================================================= */}
            {/* STEP 1: TANGO DISCOVERY (3D FLIP + DRAG GESTURE QUEUE)                    */}
            {/* ========================================================================= */}
            {currentStep === "tango" && (
              <motion.div
                key="step-tango"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                {currentCard ? (
                  <div className="space-y-4">
                    {/* Header metrics & Undo */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-extrabold font-mono text-[11px]">
                          {tangoQueue.length} Antrean
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-extrabold font-mono text-[11px]">
                          {tangoMastered.length} Dikuasai
                        </span>
                      </div>

                      {undoHistory.length > 0 && (
                        <button
                          type="button"
                          onClick={handleTangoUndo}
                          className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-all"
                          title="Undo kartu sebelumnya [Z]"
                        >
                          <Undo2 size={13} />
                          <span>Undo [Z]</span>
                        </button>
                      )}
                    </div>

                    {/* 3D DRAGGABLE FLASHCARD */}
                    <div className="study-card-perspective min-h-[300px] relative select-none">
                      <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDrag={(_, info) => setDragOffset(info.offset.x)}
                        onDragEnd={(_, info) => {
                          if (info.offset.x > 90) {
                            handleTangoMaster();
                          } else if (info.offset.x < -90) {
                            handleTangoRepeat();
                          }
                          setDragOffset(0);
                        }}
                        style={{
                          rotate: dragOffset / 18,
                          x: dragOffset,
                        }}
                        className="w-full h-full cursor-grab active:cursor-grabbing relative"
                      >
                        {/* Drag Rubber Stamp Badges */}
                        {dragOffset > 35 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: Math.min(1, dragOffset / 80), scale: 1 }}
                            className="study-stamp-badge study-stamp-master"
                          >
                            PAHAM & HAFAL ✓
                          </motion.div>
                        )}
                        {dragOffset < -35 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: Math.min(1, Math.abs(dragOffset) / 80), scale: 1 }}
                            className="study-stamp-badge study-stamp-repeat"
                          >
                            ULANGI NANTI ↺
                          </motion.div>
                        )}

                        {/* Interactive Card Box */}
                        <div
                          onClick={() => {
                            setTangoFlipped(!tangoFlipped);
                            triggerHaptic("light");
                            playTapSound();
                          }}
                          className={`min-h-[290px] p-7 rounded-[28px] border-2 transition-all flex flex-col justify-between ${
                            tangoFlipped
                              ? "bg-gradient-to-b from-blue-500/5 via-[var(--surface)] to-[var(--surface-soft)] border-blue-500/40 shadow-lg"
                              : "bg-[var(--surface)] border-[var(--border)] hover:border-blue-500/40 shadow-md"
                          }`}
                        >
                          {/* Card Top: Part of Speech & Audio */}
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-[var(--surface-soft)] border border-[var(--border)] text-blue-600 dark:text-blue-400">
                              {currentCard.partOfSpeech}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese(currentCard.word);
                              }}
                              className="p-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-blue-600 hover:scale-105 active:scale-95 transition-all shadow-xs"
                              title="Dengarkan Suara [R]"
                            >
                              <Volume2 size={17} />
                            </button>
                          </div>

                          {/* Card Center: Word & Reading */}
                          <div className="text-center py-4">
                            <p className="text-sm font-semibold text-[var(--text-secondary)] font-mono mb-1">
                              {currentCard.reading}
                            </p>
                            <h2 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] tracking-wide">
                              {currentCard.word}
                            </h2>

                            {tangoFlipped ? (
                              <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 pt-4 border-t border-[var(--border)] space-y-2 text-left"
                              >
                                <p className="text-xl font-black text-blue-600 dark:text-blue-400 text-center">
                                  {currentCard.meaningId}
                                </p>
                                <div className="p-3 rounded-2xl bg-[var(--surface-soft)]/60 border border-[var(--border)] space-y-1">
                                  <p className="text-xs font-bold text-[var(--text-primary)]">
                                    "{currentCard.exampleJp}"
                                  </p>
                                  <p className="text-[11px] text-[var(--text-secondary)]">
                                    {currentCard.exampleId}
                                  </p>
                                </div>
                              </motion.div>
                            ) : (
                              <p className="text-xs text-[var(--text-secondary)] mt-4 font-medium flex items-center justify-center gap-1.5 opacity-80">
                                <span>Ketuk kartu atau tekan [Space] untuk melihat arti</span>
                              </p>
                            )}
                          </div>

                          {/* Card Bottom: Workplace Nuance Note */}
                          {currentCard.itBusinessNote && (
                            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300">
                              <strong>💼 Nuansa Kerja:</strong> {currentCard.itBusinessNote}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Action Buttons & Shortcut Legend */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <button
                          type="button"
                          onClick={handleTangoRepeat}
                          className="py-3.5 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-black text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-amber-500/40 flex items-center justify-center gap-2 transition-all active:scale-98"
                        >
                          <RotateCcw size={15} />
                          <span>Ulangi Nanti [← / A]</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleTangoMaster}
                          className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all active:scale-98"
                        >
                          <CheckCircle2 size={16} />
                          <span>Sudah Hafal [→ / D]</span>
                        </button>
                      </div>

                      <p className="text-center text-[11px] text-[var(--text-secondary)] opacity-70">
                        Tip: Swipe kanan/kiri di layar HP, atau pakai tombol panah di keyboard.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Tango Step Completed */
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                      <CheckCircle2 size={34} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-[var(--text-primary)]">
                        Semua 15 Kosakata Berhasil Dikuasai!
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto mt-1">
                        Mantap! Sekarang kita lihat bagaimana kosakata ini digunakan dalam pola tata bahasa Bunpou.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic("medium");
                        playTapSound();
                        setCurrentStep("bunpou");
                      }}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center gap-2 mx-auto shadow-md hover:opacity-95"
                    >
                      <span>Lanjut ke Step 2: Bunpou Anchor</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: BUNPOU ANCHOR (GRAMMAR HIGHLIGHTS)                                */}
            {/* ========================================================================= */}
            {currentStep === "bunpou" && (
              <motion.div
                key="step-bunpou"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-secondary)]">
                    Pola Tata Bahasa {bunpouIndex + 1} dari {day.grammarItems.length}
                  </span>
                  <div className="flex gap-1.5">
                    {day.grammarItems.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === bunpouIndex ? "bg-blue-600 w-5" : "bg-[var(--border)]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {day.grammarItems[bunpouIndex] && (
                  <div className="p-6 rounded-[28px] border border-[var(--border)] bg-gradient-to-b from-[var(--surface-soft)]/50 to-[var(--surface)] space-y-4 shadow-sm">
                    <div>
                      <span className="text-xs text-[var(--text-secondary)] font-mono">
                        {day.grammarItems[bunpouIndex].patternKana}
                      </span>
                      <h3 className="text-3xl font-black text-[var(--text-primary)]">
                        {day.grammarItems[bunpouIndex].patternJp}
                      </h3>
                      <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                        {day.grammarItems[bunpouIndex].meaningId}
                      </p>
                    </div>

                    {/* Connection Rule */}
                    <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-xs space-y-1">
                      <span className="font-extrabold text-[var(--text-secondary)]">
                        Sambungan Kata (接続):
                      </span>
                      <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {day.grammarItems[bunpouIndex].connection}
                      </p>
                    </div>

                    {/* Core Concept */}
                    <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <strong>Konsep Inti:</strong> {day.grammarItems[bunpouIndex].coreConcept}
                    </div>

                    {/* Real Workplace Example */}
                    <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[var(--text-secondary)]">
                          Contoh Nyata di Tempat Kerja:
                        </span>
                        <button
                          type="button"
                          onClick={() => speakJapanese(day.grammarItems[bunpouIndex].exampleJp)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-[var(--surface-soft)] transition-all"
                          title="Dengarkan Suara"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm font-black text-[var(--text-primary)] leading-relaxed">
                        {day.grammarItems[bunpouIndex].exampleJp}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {day.grammarItems[bunpouIndex].exampleId}
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer Navigation */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={bunpouIndex === 0}
                    onClick={() => setBunpouIndex((prev) => prev - 1)}
                    className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-xs font-bold disabled:opacity-40"
                  >
                    Pola Sebelumnya
                  </button>

                  {bunpouIndex < day.grammarItems.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setBunpouIndex((prev) => prev + 1)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-black shadow-sm"
                    >
                      Pola Berikutnya
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic("medium");
                        playTapSound();
                        setCurrentStep("quiz");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md"
                    >
                      <span>Lanjut ke Step 3: Latihan Kuis</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: OUTPUT PRACTICE QUIZ                                              */}
            {/* ========================================================================= */}
            {currentStep === "quiz" && (
              <motion.div
                key="step-quiz"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span>
                    Soal <strong>{quizIndex + 1}</strong> dari {day.quizQuestions.length}
                  </span>
                  <span className="font-black text-emerald-500 font-mono">
                    Skor: {quizScore}/{day.quizQuestions.length}
                  </span>
                </div>

                {day.quizQuestions[quizIndex] && (
                  <div className="space-y-4">
                    <div className="p-5 rounded-[24px] bg-[var(--surface-soft)]/60 border border-[var(--border)]">
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-400 mb-2 inline-block">
                        {day.quizQuestions[quizIndex].relatedTag}
                      </span>
                      <h4 className="text-base font-black text-[var(--text-primary)] leading-relaxed">
                        {day.quizQuestions[quizIndex].questionJp}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                        {day.quizQuestions[quizIndex].questionTranslation}
                      </p>
                    </div>

                    {/* Tactile Options */}
                    <div className="space-y-2">
                      {day.quizQuestions[quizIndex].options.map((opt) => {
                        const isChosen = selectedAnswers[quizIndex] === opt.key;
                        const isCorrect = opt.key === day.quizQuestions[quizIndex].correctKey;
                        const answered = Boolean(selectedAnswers[quizIndex]);

                        let btnStyle =
                          "border-[var(--border)] bg-[var(--surface)] hover:border-blue-500";
                        if (answered) {
                          if (isCorrect) {
                            btnStyle =
                              "border-emerald-500 bg-emerald-500/10 text-emerald-600 font-black shadow-xs";
                          } else if (isChosen && !isCorrect) {
                            btnStyle = "border-red-500 bg-red-500/10 text-red-600 font-bold";
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            disabled={answered}
                            onClick={() => {
                              if (answered) return;
                              const correct = opt.key === day.quizQuestions[quizIndex].correctKey;
                              triggerHaptic(correct ? "success" : "error");
                              if (correct) {
                                playSuccessChime();
                                setQuizScore((prev) => prev + 1);
                              } else {
                                playErrorBuzz();
                              }
                              setSelectedAnswers((prev) => ({ ...prev, [quizIndex]: opt.key }));
                            }}
                            className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <div>
                              <span className="font-extrabold text-sm block">
                                {opt.key}. {opt.textJp}
                              </span>
                              <span className="text-[11px] text-[var(--text-secondary)]">
                                {opt.textId}
                              </span>
                            </div>
                            {answered && isCorrect && (
                              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if Answered */}
                    {selectedAnswers[quizIndex] && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 space-y-1"
                      >
                        <strong>Penjelasan Soal:</strong>
                        <p>{day.quizQuestions[quizIndex].explanation}</p>
                      </motion.div>
                    )}

                    {/* Next Quiz Button */}
                    {selectedAnswers[quizIndex] && (
                      <div className="pt-2 text-right">
                        {quizIndex < day.quizQuestions.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => setQuizIndex((prev) => prev + 1)}
                            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-black shadow-sm"
                          >
                            Soal Berikutnya
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              triggerHaptic("medium");
                              playTapSound();
                              setCurrentStep("dokkai");
                            }}
                            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black flex items-center gap-1.5 ml-auto shadow-md"
                          >
                            <span>Lanjut ke Step 4: Dokkai Synthesis</span>
                            <ArrowRight size={14} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 4: DOKKAI SYNTHESIS (IN-TEXT VOCAB GLOW & FLOATING POPOVER)          */}
            {/* ========================================================================= */}
            {currentStep === "dokkai" && (
              <motion.div
                key="step-dokkai"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                <div>
                  <span className="text-[11px] font-black text-blue-600 dark:text-blue-400">
                    {dokkaiPassage.categoryLabel} · N3 Reading
                  </span>
                  <h3 className="text-xl font-black text-[var(--text-primary)]">
                    {dokkaiPassage.titleJp}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">{dokkaiPassage.titleId}</p>
                </div>

                {/* In-Text Vocab Glow Legend */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2">
                  <Sparkles size={16} className="shrink-0 text-amber-500 animate-pulse" />
                  <span>
                    <strong>In-Text Vocab Glow:</strong> Kosakata yang baru saja Anda pelajari di Step 1 berpendar kuning di dalam wacana. Sentuh kata tersebut untuk melihat artinya!
                  </span>
                </div>

                {/* Dokkai Passage Sentences with Word Highlighting */}
                <div className="p-6 rounded-[28px] border border-[var(--border)] bg-[var(--surface-soft)]/40 space-y-4">
                  {dokkaiPassage.sentences.map((sent, sIdx) => {
                    return (
                      <div key={sent.id || sIdx} className="space-y-1">
                        <p className="text-base font-normal text-[var(--text-primary)] leading-loose font-serif">
                          {sent.textJp
                            .split(new RegExp(`(${day.inTextGlowWords.join("|")})`, "g"))
                            .map((segment, idx) => {
                              if (day.inTextGlowWords.includes(segment)) {
                                const matchingVocab = day.vocabItems.find((v) => v.word === segment);
                                return (
                                  <span
                                    key={idx}
                                    onClick={() => {
                                      triggerHaptic("light");
                                      playTapSound();
                                      setDokkaiTooltip({
                                        word: segment,
                                        meaning: matchingVocab?.meaningId || "Kosakata target hari ini",
                                        ruby: matchingVocab?.reading || segment,
                                      });
                                    }}
                                    className="mx-0.5 px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-200 font-extrabold border border-amber-500/40 cursor-pointer hover:bg-amber-500/30 transition-all shadow-xs"
                                    title="Sentuh untuk melihat arti"
                                  >
                                    {segment}
                                  </span>
                                );
                              }
                              return <span key={idx}>{segment}</span>;
                            })}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Floating Vocab Popover */}
                {dokkaiTooltip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-[var(--surface)] border-2 border-amber-500 shadow-xl flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs text-[var(--text-secondary)] font-mono">
                        {dokkaiTooltip.ruby}
                      </span>
                      <h4 className="text-lg font-black text-[var(--text-primary)]">
                        {dokkaiTooltip.word}
                      </h4>
                      <p className="text-xs font-extrabold text-blue-600 dark:text-blue-400">
                        {dokkaiTooltip.meaning}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakJapanese(dokkaiTooltip.word)}
                        className="p-2 rounded-xl bg-[var(--surface-soft)] text-blue-600 hover:scale-105"
                      >
                        <Volume2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDokkaiTooltip(null)}
                        className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Comprehension Question from Dokkai */}
                {dokkaiPassage.questions?.[0] && (
                  <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
                    <h4 className="text-xs font-black text-[var(--text-primary)]">
                      Pertanyaan Pemahaman: {dokkaiPassage.questions[0].questionJp}
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      {dokkaiPassage.questions[0].questionTranslation}
                    </p>

                    <div className="space-y-1.5">
                      {dokkaiPassage.questions[0].options.map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => {
                            setDokkaiQuestionAnswer(opt.key);
                            triggerHaptic("light");
                          }}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                            dokkaiQuestionAnswer === opt.key
                              ? "bg-blue-600 text-white border-blue-600 font-bold"
                              : "bg-[var(--surface-soft)] border-[var(--border)] text-[var(--text-primary)] hover:border-slate-400"
                          }`}
                        >
                          {opt.key}. {opt.textJp} ({opt.textId})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Finish Day CTA */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={handleFinishDay}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-98 transition-all"
                  >
                    <Sparkles size={18} />
                    <span>Selesaikan Day {day.day} & Rekam Pencapaian!</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 5: DAY COMPLETED CELEBRATION (APPLE FITNESS/LINEAR STYLE)             */}
            {/* ========================================================================= */}
            {currentStep === "completed" && (
              <motion.div
                key="step-completed"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-5"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-white mx-auto flex items-center justify-center shadow-xl animate-bounce">
                  <Award size={40} />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 tracking-wide">
                    Day {day.day} Tuntas dengan Sukses!
                  </span>
                  <h2 className="text-2xl font-black text-[var(--text-primary)] mt-2">
                    Selamat, Target Harian Anda Tercapai! 🎉
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto mt-1">
                    Anda telah menguasai 15 kosakata tematik, 2 pola kalimat Bunpou, dan menyelesaikan sintesis wacana Dokkai.
                  </p>
                </div>

                {/* Metric Badges */}
                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-2xl font-black text-blue-600">
                      {day.vocabItems.length}
                    </span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Kata Dihafal</p>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-2xl font-black text-amber-500">
                      {day.grammarItems.length}
                    </span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Pola Grammar</p>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-2xl font-black text-emerald-500">1</span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Dokkai Tamat</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs shadow-md hover:opacity-95"
                  >
                    Kembali ke Dashboard Belajar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
