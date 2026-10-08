"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Code2,
  Layers,
  ArrowRight,
  Award,
  AlertCircle,
  RotateCcw,
  Play,
  Bookmark,
  ShieldCheck,
  Cpu,
  Undo2,
  Check,
  Volume2,
} from "lucide-react";
import { FEDailyQuest } from "@/data/fe-daily-quest";
import { FE_CARDS, FECard } from "@/data/fe-study-data";
import { FE_TRACER_ALGORITHMS, TracerAlgorithm } from "@/data/fe-tracer-data";
import { FE_QUIZ_QUESTIONS, QuizQuestion } from "@/data/fe-quiz-data";
import { completeFEQuestDay } from "@/lib/fe-quest-storage";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound, playSuccessChime, playErrorBuzz } from "@/lib/global-sound";

interface FEDailyQuestRunnerProps {
  quest: FEDailyQuest;
  isOpen: boolean;
  onClose: () => void;
  onQuestCompleted?: (dayNumber: number) => void;
}

type QuestStep = "cards" | "tracer" | "quiz" | "completed";

export function FEDailyQuestRunner({
  quest,
  isOpen,
  onClose,
  onQuestCompleted,
}: FEDailyQuestRunnerProps) {
  const [currentStep, setCurrentStep] = useState<QuestStep>("cards");

  // Step 1: Concept Cards state
  const [cardQueue, setCardQueue] = useState<FECard[]>([]);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [undoHistory, setUndoHistory] = useState<{ item: FECard; wasMastered: boolean }[]>([]);

  // Step 2: Tracer state
  const [tracerStepIndex, setTracerStepIndex] = useState(0);

  // Step 3: Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizScore, setQuizScore] = useState(0);

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

  // Initialize quest data
  useEffect(() => {
    if (isOpen && quest) {
      setCurrentStep("cards");

      const matchedCards = quest.cardIds
        .map((id) => FE_CARDS.find((c) => c.id === id))
        .filter((c): c is FECard => Boolean(c));
      setCardQueue(matchedCards.length > 0 ? matchedCards : FE_CARDS.slice(0, 5));
      setMasteredCards([]);
      setCardFlipped(false);
      setDragOffset(0);
      setUndoHistory([]);

      const matchedQuestions = quest.quizQuestionIds
        .map((id) => FE_QUIZ_QUESTIONS.find((q) => q.id === id))
        .filter((q): q is QuizQuestion => Boolean(q));
      setQuizQuestions(
        matchedQuestions.length > 0 ? matchedQuestions : FE_QUIZ_QUESTIONS.slice(0, 4)
      );
      setQuizIndex(0);
      setSelectedAnswers({});
      setQuizScore(0);
      setTracerStepIndex(0);
    }
  }, [isOpen, quest]);

  const currentCard = cardQueue[0];

  // Actions for Flashcards
  const handleCardMaster = () => {
    if (!currentCard) return;
    triggerHaptic("success");
    playSuccessChime();

    setUndoHistory((prev) => [{ item: currentCard, wasMastered: true }, ...prev]);
    setMasteredCards((prev) => [...prev, currentCard.id]);
    setCardQueue((prev) => prev.slice(1));
    setCardFlipped(false);
    setDragOffset(0);
  };

  const handleCardRepeat = () => {
    if (!currentCard) return;
    triggerHaptic("light");
    playTapSound();

    setUndoHistory((prev) => [{ item: currentCard, wasMastered: false }, ...prev]);
    setCardQueue((prev) => [...prev.slice(1), currentCard]);
    setCardFlipped(false);
    setDragOffset(0);
  };

  const handleCardUndo = () => {
    if (undoHistory.length === 0) return;
    triggerHaptic("medium");
    playTapSound();

    const last = undoHistory[0];
    setUndoHistory((prev) => prev.slice(1));

    if (last.wasMastered) {
      setMasteredCards((prev) => prev.filter((id) => id !== last.item.id));
      setCardQueue((prev) => [last.item, ...prev]);
    } else {
      setCardQueue((prev) => {
        const withoutLast = prev.filter((c, idx) => idx !== prev.length - 1);
        return [last.item, ...withoutLast];
      });
    }
    setCardFlipped(false);
  };

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (currentStep === "cards" && currentCard) {
        if (e.code === "Space") {
          e.preventDefault();
          setCardFlipped((prev) => !prev);
          triggerHaptic("light");
          playTapSound();
        } else if (e.code === "ArrowRight" || e.key.toLowerCase() === "d") {
          e.preventDefault();
          handleCardMaster();
        } else if (e.code === "ArrowLeft" || e.key.toLowerCase() === "a") {
          e.preventDefault();
          handleCardRepeat();
        } else if (e.key.toLowerCase() === "r") {
          e.preventDefault();
          speakJapanese(currentCard.termJp);
        } else if (e.key.toLowerCase() === "z" || e.key.toLowerCase() === "u") {
          e.preventDefault();
          handleCardUndo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep, currentCard, undoHistory]);

  if (!isOpen || !quest) return null;

  const linkedAlgo: TracerAlgorithm =
    FE_TRACER_ALGORITHMS.find((a) => a.id === quest.tracerAlgoId) ||
    FE_TRACER_ALGORITHMS[0];

  // Overall Progress
  const getOverallProgress = () => {
    const totalCards = quest.cardIds.length;
    const cardProgress = totalCards > 0 ? (masteredCards.length / totalCards) * 33.3 : 0;
    const tracerProgress = ((tracerStepIndex + 1) / linkedAlgo.steps.length) * 33.3;
    const quizProgress = (Object.keys(selectedAnswers).length / quizQuestions.length) * 33.3;

    if (currentStep === "cards") return Math.min(33.3, cardProgress);
    if (currentStep === "tracer") return 33.3 + tracerProgress;
    if (currentStep === "quiz") return 66.6 + quizProgress;
    return 100;
  };

  // Handle Quiz selection
  const handleQuizAnswer = (qIdx: number, optKey: string, isCorrect: boolean) => {
    if (selectedAnswers[qIdx]) return;
    triggerHaptic(isCorrect ? "success" : "error");
    if (isCorrect) playSuccessChime();
    else playErrorBuzz();

    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optKey }));
    if (isCorrect) setQuizScore((prev) => prev + 1);
  };

  // Handle Finish Quest
  const handleFinishQuest = () => {
    triggerHaptic("success");
    playSuccessChime();

    completeFEQuestDay(quest.day, quizScore, quizQuestions.length);
    if (onQuestCompleted) onQuestCompleted(quest.day);
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
              Day {quest.day}
            </span>
            <div>
              <h3 className="text-sm font-black text-[var(--text-primary)] leading-tight tracking-tight">
                {quest.titleId}
              </h3>
              <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                {quest.themeTag} · {quest.durationMinutes} Menit
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
            {
              id: "cards",
              label: `1. Konsep IT (${masteredCards.length}/${quest.cardIds.length})`,
              icon: Layers,
              isDone: masteredCards.length >= quest.cardIds.length,
            },
            {
              id: "tracer",
              label: "2. Tracer Lab 科目B",
              icon: Code2,
              isDone: currentStep === "quiz" || currentStep === "completed",
            },
            {
              id: "quiz",
              label: "3. CBT Kakomon",
              icon: Award,
              isDone: currentStep === "completed",
            },
          ].map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(step.id as QuestStep)}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap text-xs font-bold ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : step.isDone
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]"
                }`}
              >
                {step.isDone && !isActive ? (
                  <Check size={13} className="text-emerald-500 font-black" />
                ) : (
                  <Icon size={13} />
                )}
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {/* ========================================================================= */}
            {/* STEP 1: IT CONCEPT FLASHCARDS (3D FLIP + DRAG QUEUE)                      */}
            {/* ========================================================================= */}
            {currentStep === "cards" && (
              <motion.div
                key="step-cards"
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
                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-400 font-extrabold font-mono text-[11px]">
                          {cardQueue.length} Antrean
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-extrabold font-mono text-[11px]">
                          {masteredCards.length} Dikuasai
                        </span>
                      </div>

                      {undoHistory.length > 0 && (
                        <button
                          type="button"
                          onClick={handleCardUndo}
                          className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-all"
                          title="Undo kartu [Z]"
                        >
                          <Undo2 size={13} />
                          <span>Undo [Z]</span>
                        </button>
                      )}
                    </div>

                    {/* 3D DRAGGABLE FLASHCARD */}
                    <div className="study-card-perspective min-h-[310px] relative select-none">
                      <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDrag={(_, info) => setDragOffset(info.offset.x)}
                        onDragEnd={(_, info) => {
                          if (info.offset.x > 90) handleCardMaster();
                          else if (info.offset.x < -90) handleCardRepeat();
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
                            setCardFlipped(!cardFlipped);
                            triggerHaptic("light");
                            playTapSound();
                          }}
                          className={`min-h-[300px] p-7 rounded-[28px] border-2 transition-all flex flex-col justify-between ${
                            cardFlipped
                              ? "bg-gradient-to-b from-blue-500/5 via-[var(--surface)] to-[var(--surface-soft)] border-blue-500/40 shadow-lg"
                              : "bg-[var(--surface)] border-[var(--border)] hover:border-blue-500/40 shadow-md"
                          }`}
                        >
                          {/* Top: Category & Audio */}
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
                              {currentCard.subCategory}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese(currentCard.termJp);
                              }}
                              className="p-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-blue-600 hover:scale-105 active:scale-95 transition-all shadow-xs"
                              title="Dengarkan Pelafalan [R]"
                            >
                              <Volume2 size={16} />
                            </button>
                          </div>

                          {/* Center: Terms & Definition */}
                          <div className="text-center py-4">
                            <p className="text-xs text-[var(--text-secondary)] font-mono mb-1">
                              {currentCard.furigana} · {currentCard.termEn}
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)]">
                              {currentCard.termJp}
                            </h2>

                            {cardFlipped ? (
                              <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 pt-4 border-t border-[var(--border)] space-y-3 text-left"
                              >
                                <p className="text-sm font-bold text-[var(--text-primary)] leading-relaxed">
                                  {currentCard.definitionId}
                                </p>

                                {/* Kitami Visual Analogy */}
                                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                                  <strong>💡 Analogi Kitami-shiki:</strong>{" "}
                                  {currentCard.analogy}
                                </div>

                                {/* Exam Keywords */}
                                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300">
                                  <strong>🎯 Kata Kunci Ujian:</strong>{" "}
                                  {currentCard.keyDifferentiator}
                                </div>
                              </motion.div>
                            ) : (
                              <p className="text-xs text-[var(--text-secondary)] mt-4 font-medium flex items-center justify-center gap-1.5 opacity-80">
                                <span>Ketuk kartu atau tekan [Space] untuk melihat penjelasan & analogi</span>
                              </p>
                            )}
                          </div>

                          <div className="text-center text-[11px] text-[var(--text-secondary)] opacity-60">
                            ID: {currentCard.id}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <button
                          type="button"
                          onClick={handleCardRepeat}
                          className="py-3.5 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-black text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-amber-500/40 flex items-center justify-center gap-2 transition-all active:scale-98"
                        >
                          <RotateCcw size={15} />
                          <span>Ulangi Nanti [← / A]</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCardMaster}
                          className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all active:scale-98"
                        >
                          <CheckCircle2 size={16} />
                          <span>Sudah Paham [→ / D]</span>
                        </button>
                      </div>

                      <p className="text-center text-[11px] text-[var(--text-secondary)] opacity-70">
                        Tip: Geser kartu ke kanan bila sudah hafal, ke kiri untuk mengulang.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Cards Step Completed */
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                      <CheckCircle2 size={34} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-[var(--text-primary)]">
                        Konsep IT Hari Ini Berhasil Dikuasai!
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto mt-1">
                        Sempurna! Sekarang kita latih pemikiran logis dengan melakukan simulasi tracing kode resmi 科目B.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic("medium");
                        playTapSound();
                        setCurrentStep("tracer");
                      }}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center gap-2 mx-auto shadow-md hover:opacity-95"
                    >
                      <span>Lanjut ke Step 2: Tracer Lab 科目B</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: PSEUDOCODE TRACER LAB (科目B ALGORITHM EXECUTION)                 */}
            {/* ========================================================================= */}
            {currentStep === "tracer" && (
              <motion.div
                key="step-tracer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                <div>
                  <span className="text-[11px] font-black text-blue-600 dark:text-blue-400">
                    {linkedAlgo.category.toUpperCase()} · 科目B Pseudocode Simulator
                  </span>
                  <h3 className="text-xl font-black text-[var(--text-primary)]">
                    {linkedAlgo.titleJp} ({linkedAlgo.titleEn})
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {linkedAlgo.description}
                  </p>
                </div>

                {/* Monospace Code Display */}
                <div className="p-4 rounded-[24px] bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                    <span>IPA Standard Pseudocode Format</span>
                    <span className="text-amber-400 font-bold">1-based Indexing</span>
                  </div>
                  <pre className="leading-relaxed">
                    {linkedAlgo.codeLines.map((line: string, idx: number) => {
                      const isHighlighted =
                        linkedAlgo.steps[tracerStepIndex]?.lineIndex === idx + 1;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center py-0.5 px-2 rounded-md ${
                            isHighlighted ? "bg-blue-600/30 text-blue-300 font-bold" : ""
                          }`}
                        >
                          <span className="w-6 text-slate-600 select-none text-[10px]">
                            {idx + 1}
                          </span>
                          <span>{line}</span>
                        </div>
                      );
                    })}
                  </pre>
                </div>

                {/* Step Explanations & State Inspector */}
                <div className="p-5 rounded-[24px] bg-[var(--surface-soft)]/60 border border-[var(--border)] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">
                      Langkah {tracerStepIndex + 1} dari {linkedAlgo.steps.length}
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                      Line: {linkedAlgo.steps[tracerStepIndex]?.lineIndex || "-"}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[var(--text-primary)] leading-relaxed">
                    {linkedAlgo.steps[tracerStepIndex]?.explanation}
                  </p>

                  {/* Variables State Badges */}
                  <div className="pt-2 border-t border-[var(--border)] flex flex-wrap gap-2">
                    {Object.entries(
                      linkedAlgo.steps[tracerStepIndex]?.variableState || {}
                    ).map(([key, val]) => (
                      <span
                        key={key}
                        className="px-2.5 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold"
                      >
                        {key} = {JSON.stringify(val)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stepper Controls */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={tracerStepIndex === 0}
                    onClick={() => setTracerStepIndex((prev) => prev - 1)}
                    className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-xs font-bold disabled:opacity-40"
                  >
                    Langkah Sebelumnya
                  </button>

                  {tracerStepIndex < linkedAlgo.steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setTracerStepIndex((prev) => prev + 1)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-black shadow-sm"
                    >
                      Langkah Berikutnya
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
                      <span>Lanjut ke Step 3: CBT Kakomon</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: CBT KAKOMON SIMULATOR                                             */}
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
                    Soal <strong>{quizIndex + 1}</strong> dari {quizQuestions.length}
                  </span>
                  <span className="font-black text-emerald-500 font-mono">
                    Skor: {quizScore}/{quizQuestions.length}
                  </span>
                </div>

                {quizQuestions[quizIndex] && (
                  <div className="space-y-4">
                    <div className="p-5 rounded-[24px] bg-[var(--surface-soft)]/60 border border-[var(--border)]">
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-400 mb-2 inline-block">
                        {quizQuestions[quizIndex].subCategory} · {quizQuestions[quizIndex].year}
                      </span>
                      <h4 className="text-base font-black text-[var(--text-primary)] leading-relaxed">
                        {quizQuestions[quizIndex].questionJp}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                        {quizQuestions[quizIndex].questionTranslation}
                      </p>
                    </div>

                    {/* Options (ア, イ, ウ, エ) */}
                    <div className="space-y-2">
                      {quizQuestions[quizIndex].options.map((opt) => {
                        const isChosen = selectedAnswers[quizIndex] === opt.key;
                        const isCorrect = opt.key === quizQuestions[quizIndex].correctKey;
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
                            onClick={() =>
                              handleQuizAnswer(quizIndex, opt.key, isCorrect)
                            }
                            className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <div>
                              <span className="font-extrabold text-sm block">
                                {opt.key}. {opt.textJp}
                              </span>
                              {opt.textEnId && (
                                <span className="text-[11px] text-[var(--text-secondary)] mt-0.5 block">
                                  {opt.textEnId}
                                </span>
                              )}
                              {answered && opt.explanation && (
                                <span className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 block">
                                  {opt.explanation}
                                </span>
                              )}
                            </div>
                            {answered && isCorrect && (
                              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Overall Explanation */}
                    {selectedAnswers[quizIndex] && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 space-y-1"
                      >
                        <strong>Analisis Soal & Jebakan Ujian:</strong>
                        <p>{quizQuestions[quizIndex].summaryExplanation}</p>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                          Key Takeaway: {quizQuestions[quizIndex].keyTakeaway}
                        </p>
                      </motion.div>
                    )}

                    {/* Next Button */}
                    {selectedAnswers[quizIndex] && (
                      <div className="pt-2 text-right">
                        {quizIndex < quizQuestions.length - 1 ? (
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
                            onClick={handleFinishQuest}
                            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white text-xs font-black flex items-center gap-1.5 ml-auto shadow-md"
                          >
                            <Sparkles size={16} />
                            <span>Selesaikan Quest & Simpan Hasil!</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 4: QUEST COMPLETED CELEBRATION                                       */}
            {/* ========================================================================= */}
            {currentStep === "completed" && (
              <motion.div
                key="step-completed"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-5"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-white mx-auto flex items-center justify-center shadow-xl animate-bounce">
                  <Award size={40} />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 tracking-wide">
                    FE Quest Day {quest.day} Selesai!
                  </span>
                  <h2 className="text-2xl font-black text-[var(--text-primary)] mt-2">
                    Hebat! Misi IT Exam Hari Ini Tuntas! 🚀
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto mt-1">
                    Anda telah menguasai {quest.cardIds.length} konsep IT, menuntaskan algoritma 科目B, dan menyelesaikan simulasi CBT Kakomon.
                  </p>
                </div>

                {/* Score Summary */}
                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-2xl font-black text-blue-600">
                      {quest.cardIds.length}
                    </span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Konsep IT</p>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-2xl font-black text-amber-500">1</span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Tracer Lab</p>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-2xl font-black text-emerald-500">
                      {quizScore}/{quizQuestions.length}
                    </span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Skor CBT</p>
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
