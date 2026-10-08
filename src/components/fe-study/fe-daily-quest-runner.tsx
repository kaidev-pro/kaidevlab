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

  // Step 2: Tracer state
  const [tracerStepIndex, setTracerStepIndex] = useState(0);

  // Step 3: Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizScore, setQuizScore] = useState(0);

  // Initialize quest data
  useEffect(() => {
    if (isOpen && quest) {
      setCurrentStep("cards");

      // Match card IDs to FE_CARDS
      const matchedCards = quest.cardIds
        .map((id) => FE_CARDS.find((c) => c.id === id))
        .filter((c): c is FECard => Boolean(c));
      setCardQueue(matchedCards.length > 0 ? matchedCards : FE_CARDS.slice(0, 5));
      setMasteredCards([]);
      setCardFlipped(false);

      // Match quiz questions to FE_QUIZ_QUESTIONS
      const matchedQuestions = quest.quizQuestionIds
        .map((id) => FE_QUIZ_QUESTIONS.find((q) => q.id === id))
        .filter((q): q is QuizQuestion => Boolean(q));
      setQuizQuestions(matchedQuestions.length > 0 ? matchedQuestions : FE_QUIZ_QUESTIONS.slice(0, 4));
      setQuizIndex(0);
      setSelectedAnswers({});
      setQuizScore(0);
      setTracerStepIndex(0);
    }
  }, [isOpen, quest]);

  if (!isOpen || !quest) return null;

  // Find linked algorithm
  const linkedAlgo: TracerAlgorithm =
    FE_TRACER_ALGORITHMS.find((a) => a.id === quest.tracerAlgoId) ||
    FE_TRACER_ALGORITHMS[0];

  const currentCard = cardQueue[0];

  // Handle Card Swipe Actions
  const handleCardMaster = () => {
    if (!currentCard) return;
    triggerHaptic("medium");
    playTapSound();

    setMasteredCards((prev) => [...prev, currentCard.id]);
    setCardQueue((prev) => prev.slice(1));
    setCardFlipped(false);
  };

  const handleCardRepeat = () => {
    if (!currentCard) return;
    triggerHaptic("light");
    playTapSound();

    setCardQueue((prev) => [...prev.slice(1), currentCard]);
    setCardFlipped(false);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_25px_80px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface-soft)]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-xs">
              Day {quest.day}
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-[var(--text-primary)] leading-tight">
                {quest.titleId}
              </h3>
              <p className="text-[11px] text-[var(--text-secondary)]">{quest.themeTag}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[var(--surface)] border-b border-[var(--border)] text-xs font-bold">
          <button
            type="button"
            onClick={() => setCurrentStep("cards")}
            className={`flex items-center gap-1.5 transition-all ${
              currentStep === "cards"
                ? "text-blue-600 font-black"
                : masteredCards.length >= quest.cardIds.length
                ? "text-emerald-500"
                : "text-[var(--text-secondary)]"
            }`}
          >
            <Layers size={14} />
            <span>1. Konsep IT ({masteredCards.length}/{quest.cardIds.length})</span>
          </button>

          <ChevronRight size={13} className="text-[var(--border)]" />

          <button
            type="button"
            onClick={() => setCurrentStep("tracer")}
            className={`flex items-center gap-1.5 transition-all ${
              currentStep === "tracer" ? "text-blue-600 font-black" : "text-[var(--text-secondary)]"
            }`}
          >
            <Code2 size={14} />
            <span>2. Tracer Lab</span>
          </button>

          <ChevronRight size={13} className="text-[var(--border)]" />

          <button
            type="button"
            onClick={() => setCurrentStep("quiz")}
            className={`flex items-center gap-1.5 transition-all ${
              currentStep === "quiz" ? "text-blue-600 font-black" : "text-[var(--text-secondary)]"
            }`}
          >
            <Award size={14} />
            <span>3. CBT Kakomon</span>
          </button>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {/* ========================================================================= */}
            {/* STEP 1: IT CONCEPT FLASHCARDS                                             */}
            {/* ========================================================================= */}
            {currentStep === "cards" && (
              <motion.div
                key="step-cards"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                {currentCard ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                      <span>
                        Kartu Aktif: <strong>{quest.cardIds.length - cardQueue.length + 1}</strong> dari{" "}
                        {quest.cardIds.length}
                      </span>
                      <span className="font-mono text-emerald-500 font-bold">
                        {masteredCards.length} Terhafal
                      </span>
                    </div>

                    {/* Interactive Flashcard */}
                    <div
                      onClick={() => setCardFlipped(!cardFlipped)}
                      className="min-h-[270px] p-6 rounded-3xl border-2 border-[var(--border)] bg-gradient-to-b from-[var(--surface-soft)]/50 to-[var(--surface)] shadow-md hover:border-blue-500/40 cursor-pointer transition-all flex flex-col justify-between select-none"
                    >
                      {/* Top Card Info */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[var(--surface)] border border-[var(--border)] text-blue-600">
                          {currentCard.subCategory}
                        </span>
                        <span className="text-xs font-mono text-amber-500 font-bold">
                          {"⭐".repeat(currentCard.importance)}
                        </span>
                      </div>

                      {/* Term Display */}
                      <div className="text-center py-3">
                        <p className="text-xs text-[var(--text-secondary)] font-mono mb-1">
                          {currentCard.furigana}
                        </p>
                        <h2 className="text-3xl font-black text-[var(--text-primary)]">
                          {currentCard.termJp}
                        </h2>
                        <p className="text-xs text-[var(--text-secondary)] font-semibold mt-1">
                          {currentCard.termEn}
                        </p>

                        {cardFlipped ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-4 pt-3 border-t border-[var(--border)] space-y-2 text-left"
                          >
                            <p className="text-sm font-bold text-blue-600">
                              {currentCard.definitionId}
                            </p>
                            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                              <strong>💡 Analogi Kitami:</strong> {currentCard.analogy}
                            </div>
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300">
                              <strong>🎯 Kata Kunci Ujian:</strong> {currentCard.keyDifferentiator}
                            </div>
                          </motion.div>
                        ) : (
                          <p className="text-xs text-[var(--text-secondary)] mt-4">
                            Ketuk kartu untuk melihat definisi, analogi & kunci ujian 👆
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCardRepeat}
                        className="py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-extrabold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all active:scale-98"
                      >
                        <RotateCcw size={15} />
                        <span>Ulangi Nanti</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCardMaster}
                        className="py-3.5 rounded-2xl bg-blue-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all active:scale-98"
                      >
                        <CheckCircle2 size={15} />
                        <span>Sudah Paham & Hafal</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* All Cards Completed */
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-[var(--text-primary)]">
                        Semua Konsep IT Hari Ini Telah Dikuasai!
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto mt-1">
                        Mantap! Sekarang kita uji pemahaman logika dengan melihat eksekusi algoritma di Tracer Lab.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic("medium");
                        playTapSound();
                        setCurrentStep("tracer");
                      }}
                      className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 mx-auto shadow-md hover:opacity-95"
                    >
                      <span>Lanjut ke Step 2: Tracer Lab</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: PSEUDOCODE TRACER LAB (IPA 科目B)                                 */}
            {/* ========================================================================= */}
            {currentStep === "tracer" && linkedAlgo && (
              <motion.div
                key="step-tracer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div>
                  <span className="text-[11px] font-bold text-blue-600">
                    IPA 科目B · Simulasi Algoritma
                  </span>
                  <h3 className="text-xl font-black text-[var(--text-primary)]">
                    {linkedAlgo.titleJp}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">{linkedAlgo.description}</p>
                </div>

                {/* Pseudocode Box */}
                <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto space-y-1 border border-slate-800">
                  {linkedAlgo.codeLines.map((line, idx) => {
                    const isCurrentLine = linkedAlgo.steps[tracerStepIndex]?.lineIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`px-2 py-0.5 rounded transition-all ${
                          isCurrentLine
                            ? "bg-blue-600/40 text-blue-300 font-bold border-l-2 border-blue-400"
                            : "opacity-80"
                        }`}
                      >
                        <span className="inline-block w-6 text-slate-500 text-[10px]">{idx + 1}</span>
                        <span>{line}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Tracer Step Explanation & Variables */}
                {linkedAlgo.steps[tracerStepIndex] && (
                  <div className="p-4 rounded-2xl bg-[var(--surface-soft)]/50 border border-[var(--border)] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[var(--text-primary)]">
                        Langkah {tracerStepIndex + 1} dari {linkedAlgo.steps.length}
                      </span>
                      <span className="text-[11px] text-[var(--text-secondary)]">
                        {linkedAlgo.steps[tracerStepIndex].variableState?.status as string || ""}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {linkedAlgo.steps[tracerStepIndex].explanation}
                    </p>

                    {/* Variable Snapshot */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {Object.entries(linkedAlgo.steps[tracerStepIndex].variableState).map(
                        ([key, val]) => (
                          <span
                            key={key}
                            className="px-2.5 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] font-mono text-[11px]"
                          >
                            <strong>{key}:</strong> {String(val)}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
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
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
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
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Lanjut ke Step 3: CBT Kakomon</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: CBT KAKOMON (PAST EXAM QUESTIONS WITH DISTRACTOR ANALYSIS)        */}
            {/* ========================================================================= */}
            {currentStep === "quiz" && (
              <motion.div
                key="step-quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span>
                    Soal Ujian <strong>{quizIndex + 1}</strong> dari {quizQuestions.length}
                  </span>
                  <span className="font-bold text-emerald-500">Skor: {quizScore}</span>
                </div>

                {quizQuestions[quizIndex] && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-[var(--surface-soft)]/50 border border-[var(--border)] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-600">
                          {quizQuestions[quizIndex].year} · {quizQuestions[quizIndex].subCategory}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] leading-relaxed">
                        {quizQuestions[quizIndex].questionJp}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {quizQuestions[quizIndex].questionTranslation}
                      </p>
                    </div>

                    {/* Options (ア, イ, ウ, エ) */}
                    <div className="space-y-2">
                      {quizQuestions[quizIndex].options.map((opt) => {
                        const isChosen = selectedAnswers[quizIndex] === opt.key;
                        const isCorrect = opt.key === quizQuestions[quizIndex].correctKey;
                        const answered = Boolean(selectedAnswers[quizIndex]);

                        let btnStyle = "border-[var(--border)] bg-[var(--surface)] hover:border-blue-500";
                        if (answered) {
                          if (isCorrect) {
                            btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold";
                          } else if (isChosen && !isCorrect) {
                            btnStyle = "border-red-500 bg-red-500/10 text-red-600";
                          }
                        }

                        return (
                          <div key={opt.key} className="space-y-1">
                            <button
                              type="button"
                              disabled={answered}
                              onClick={() => handleQuizAnswer(quizIndex, opt.key, isCorrect)}
                              className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <div>
                                <span className="font-bold text-sm block">{opt.key}. {opt.textJp}</span>
                                {opt.textEnId && (
                                  <span className="text-[11px] text-[var(--text-secondary)]">{opt.textEnId}</span>
                                )}
                              </div>
                            </button>

                            {/* Distractor Explanation (if answered) */}
                            {answered && (
                              <p className="text-[11px] text-[var(--text-secondary)] pl-2 italic">
                                ↳ {opt.explanation}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Next Question / Finish CTA */}
                    {selectedAnswers[quizIndex] && (
                      <div className="pt-2 text-right">
                        {quizIndex < quizQuestions.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => setQuizIndex((prev) => prev + 1)}
                            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                          >
                            Soal Ujian Berikutnya
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleFinishQuest}
                            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xs font-extrabold shadow-lg hover:opacity-95"
                          >
                            Selesaikan Quest Hari Ini 🎉
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 4: CELEBRATION MODAL                                                 */}
            {/* ========================================================================= */}
            {currentStep === "completed" && (
              <motion.div
                key="step-completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-5"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg animate-bounce">
                  <Award size={40} />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-600">
                    Day {quest.day} Selesai dengan Sukses!
                  </span>
                  <h2 className="text-2xl font-black text-[var(--text-primary)] mt-2">
                    FE Daily Quest Berhasil Dituntaskan! 🎉
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto mt-1">
                    Anda telah menguasai kartu konsep IT inti, menelusuri alur algoritma tracer, dan menyelesaikan soal CBT Kakomon asli IPA Japan.
                  </p>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  <div className="p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-xl font-black text-blue-600">
                      {quest.cardIds.length}
                    </span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Konsep IT</p>
                  </div>
                  <div className="p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-xl font-black text-amber-500">1</span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Tracer Lab</p>
                  </div>
                  <div className="p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-xl font-black text-emerald-500">
                      {quizScore}/{quizQuestions.length}
                    </span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Skor CBT</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3.5 rounded-2xl bg-blue-600 text-white font-extrabold text-xs shadow-md hover:opacity-95"
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
