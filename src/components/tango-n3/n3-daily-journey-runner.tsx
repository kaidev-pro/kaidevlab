"use client";

import React, { useState, useEffect } from "react";
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

  // Step 1: Tango state
  const [tangoQueue, setTangoQueue] = useState<JourneyVocabItem[]>([]);
  const [tangoMastered, setTangoMastered] = useState<string[]>([]);
  const [tangoFlipped, setTangoFlipped] = useState(false);

  // Step 2: Bunpou state
  const [bunpouIndex, setBunpouIndex] = useState(0);

  // Step 3: Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizScore, setQuizScore] = useState(0);

  // Step 4: Dokkai state
  const [dokkaiTooltip, setDokkaiTooltip] = useState<{ word: string; meaning: string; ruby: string } | null>(null);
  const [dokkaiQuestionAnswer, setDokkaiQuestionAnswer] = useState<string | null>(null);

  // Initialize day data
  useEffect(() => {
    if (isOpen && day) {
      setCurrentStep("tango");
      setTangoQueue([...day.vocabItems]);
      setTangoMastered([]);
      setTangoFlipped(false);
      setBunpouIndex(0);
      setQuizIndex(0);
      setSelectedAnswers({});
      setQuizScore(0);
      setDokkaiTooltip(null);
      setDokkaiQuestionAnswer(null);
    }
  }, [isOpen, day]);

  if (!isOpen || !day) return null;

  // Find linked Dokkai passage
  const dokkaiPassage = DOKKAI_PASSAGES.find((p) => p.id === day.dokkaiPassageId) || DOKKAI_PASSAGES[0];

  // Text to speech helper
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

  // Current flashcard
  const currentCard = tangoQueue[0];

  // Handle Swipe/Action on Tango
  const handleTangoMaster = () => {
    if (!currentCard) return;
    triggerHaptic("medium");
    playTapSound();

    setTangoMastered((prev) => [...prev, currentCard.id]);
    setTangoQueue((prev) => prev.slice(1));
    setTangoFlipped(false);
  };

  const handleTangoRepeat = () => {
    if (!currentCard) return;
    triggerHaptic("light");
    playTapSound();

    // Move to end of queue
    setTangoQueue((prev) => [...prev.slice(1), currentCard]);
    setTangoFlipped(false);
  };

  // Handle Quiz Selection
  const handleQuizAnswer = (qIdx: number, optKey: string, isCorrect: boolean) => {
    if (selectedAnswers[qIdx]) return; // Already answered
    triggerHaptic(isCorrect ? "success" : "error");
    if (isCorrect) playSuccessChime();
    else playErrorBuzz();

    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optKey }));
    if (isCorrect) setQuizScore((prev) => prev + 1);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_25px_80px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface-soft)]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[var(--brand-primary)] text-white shadow-xs">
              Day {day.day}
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-[var(--text-primary)] leading-tight">
                {day.titleId}
              </h3>
              <p className="text-[11px] text-[var(--text-secondary)]">{day.themeTag}</p>
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
            onClick={() => setCurrentStep("tango")}
            className={`flex items-center gap-1.5 transition-all ${
              currentStep === "tango"
                ? "text-[var(--brand-primary)]"
                : tangoMastered.length >= day.vocabItems.length
                ? "text-emerald-500"
                : "text-[var(--text-secondary)]"
            }`}
          >
            <Layers size={14} />
            <span>1. Tango ({tangoMastered.length}/{day.vocabItems.length})</span>
          </button>

          <ChevronRight size={13} className="text-[var(--border)]" />

          <button
            type="button"
            onClick={() => setCurrentStep("bunpou")}
            className={`flex items-center gap-1.5 transition-all ${
              currentStep === "bunpou" ? "text-[var(--brand-primary)]" : "text-[var(--text-secondary)]"
            }`}
          >
            <BookOpen size={14} />
            <span>2. Bunpou</span>
          </button>

          <ChevronRight size={13} className="text-[var(--border)]" />

          <button
            type="button"
            onClick={() => setCurrentStep("quiz")}
            className={`flex items-center gap-1.5 transition-all ${
              currentStep === "quiz" ? "text-[var(--brand-primary)]" : "text-[var(--text-secondary)]"
            }`}
          >
            <Award size={14} />
            <span>3. Kuis</span>
          </button>

          <ChevronRight size={13} className="text-[var(--border)]" />

          <button
            type="button"
            onClick={() => setCurrentStep("dokkai")}
            className={`flex items-center gap-1.5 transition-all ${
              currentStep === "dokkai" ? "text-[var(--brand-primary)]" : "text-[var(--text-secondary)]"
            }`}
          >
            <FileText size={14} />
            <span>4. Dokkai</span>
          </button>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {/* ========================================================================= */}
            {/* STEP 1: TANGO DISCOVERY (FLASHCARD QUEUE)                                 */}
            {/* ========================================================================= */}
            {currentStep === "tango" && (
              <motion.div
                key="step-tango"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                {currentCard ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                      <span>
                        Kartu Aktif: <strong>{day.vocabItems.length - tangoQueue.length + 1}</strong> dari{" "}
                        {day.vocabItems.length}
                      </span>
                      <span className="font-mono text-emerald-500 font-bold">
                        {tangoMastered.length} Terhafal
                      </span>
                    </div>

                    {/* Interactive Flashcard */}
                    <div
                      onClick={() => setTangoFlipped(!tangoFlipped)}
                      className="min-h-[260px] p-6 rounded-3xl border-2 border-[var(--border)] bg-gradient-to-b from-[var(--surface-soft)]/50 to-[var(--surface)] shadow-md hover:border-[var(--brand-primary)]/40 cursor-pointer transition-all flex flex-col justify-between select-none"
                    >
                      {/* Top Card Info */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                          {currentCard.partOfSpeech}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(currentCard.word);
                          }}
                          className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--brand-primary)] hover:scale-105 transition-all"
                          title="Dengarkan Suara Pelafalan"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>

                      {/* Word Display */}
                      <div className="text-center py-4">
                        <p className="text-xs text-[var(--text-secondary)] font-mono mb-1">
                          {currentCard.reading}
                        </p>
                        <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-wide">
                          {currentCard.word}
                        </h2>

                        {tangoFlipped ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-4 pt-3 border-t border-[var(--border)] space-y-2"
                          >
                            <p className="text-lg font-bold text-[var(--brand-primary)]">
                              {currentCard.meaningId}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] italic">
                              "{currentCard.exampleJp}"
                            </p>
                            <p className="text-[11px] text-[var(--text-secondary)]">
                              {currentCard.exampleId}
                            </p>
                          </motion.div>
                        ) : (
                          <p className="text-xs text-[var(--text-secondary)] mt-4">
                            Ketuk kartu untuk melihat arti & contoh kalimat 👆
                          </p>
                        )}
                      </div>

                      {/* Workplace/IT Context Badge */}
                      {currentCard.itBusinessNote && (
                        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-400">
                          <strong>💼 Nuansa Kerja:</strong> {currentCard.itBusinessNote}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleTangoRepeat}
                        className="py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-extrabold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all active:scale-98"
                      >
                        <RotateCcw size={15} />
                        <span>Ulangi Nanti</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleTangoMaster}
                        className="py-3.5 rounded-2xl bg-[var(--brand-primary)] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all active:scale-98"
                      >
                        <CheckCircle2 size={15} />
                        <span>Sudah Paham & Hafal</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* All Tango Completed */
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-[var(--text-primary)]">
                        Semua 15 Kosakata Berhasil Dikuasai!
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto mt-1">
                        Hebat! Kosakata ini akan langsung kita pakai di sesi pola kalimat Bunpou dan bacaan Dokkai berikutnya.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic("medium");
                        playTapSound();
                        setCurrentStep("bunpou");
                      }}
                      className="px-6 py-3 rounded-2xl bg-[var(--brand-primary)] text-white font-extrabold text-xs flex items-center justify-center gap-2 mx-auto shadow-md hover:opacity-95"
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-secondary)]">
                    Pola {bunpouIndex + 1} dari {day.grammarItems.length}
                  </span>
                  <div className="flex gap-1.5">
                    {day.grammarItems.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-full ${
                          idx === bunpouIndex ? "bg-[var(--brand-primary)]" : "bg-[var(--border)]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {day.grammarItems[bunpouIndex] && (
                  <div className="p-5 rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)]/40 space-y-4">
                    <div>
                      <span className="text-xs text-[var(--text-secondary)] font-mono">
                        {day.grammarItems[bunpouIndex].patternKana}
                      </span>
                      <h3 className="text-2xl font-black text-[var(--text-primary)]">
                        {day.grammarItems[bunpouIndex].patternJp}
                      </h3>
                      <p className="text-sm font-bold text-[var(--brand-primary)] mt-1">
                        {day.grammarItems[bunpouIndex].meaningId}
                      </p>
                    </div>

                    {/* Connection Rule */}
                    <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs space-y-1">
                      <span className="font-extrabold text-[var(--text-secondary)]">
                        Sambungan (接続):
                      </span>
                      <p className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        {day.grammarItems[bunpouIndex].connection}
                      </p>
                    </div>

                    {/* Core Concept */}
                    <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <strong>Konsep Inti:</strong> {day.grammarItems[bunpouIndex].coreConcept}
                    </div>

                    {/* Example Sentence */}
                    <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[var(--text-secondary)]">
                          Contoh Kalimat Nyata:
                        </span>
                        <button
                          type="button"
                          onClick={() => speakJapanese(day.grammarItems[bunpouIndex].exampleJp)}
                          className="p-1.5 rounded-lg text-[var(--brand-primary)] hover:bg-[var(--surface-soft)]"
                        >
                          <Volume2 size={15} />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">
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
                      className="px-5 py-2.5 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold"
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
                      className="px-5 py-2.5 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Lanjut ke Step 3: Latihan Soal</span>
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span>
                    Soal <strong>{quizIndex + 1}</strong> dari {day.quizQuestions.length}
                  </span>
                  <span className="font-bold text-emerald-500">Skor: {quizScore}</span>
                </div>

                {day.quizQuestions[quizIndex] && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-[var(--surface-soft)]/50 border border-[var(--border)]">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] mb-2 inline-block">
                        {day.quizQuestions[quizIndex].relatedTag}
                      </span>
                      <h4 className="text-base font-bold text-[var(--text-primary)] leading-relaxed">
                        {day.quizQuestions[quizIndex].questionJp}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                        {day.quizQuestions[quizIndex].questionTranslation}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-2">
                      {day.quizQuestions[quizIndex].options.map((opt) => {
                        const isChosen = selectedAnswers[quizIndex] === opt.key;
                        const isCorrect = opt.key === day.quizQuestions[quizIndex].correctKey;
                        const answered = Boolean(selectedAnswers[quizIndex]);

                        let btnStyle = "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--brand-primary)]";
                        if (answered) {
                          if (isCorrect) {
                            btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold";
                          } else if (isChosen && !isCorrect) {
                            btnStyle = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400";
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            disabled={answered}
                            onClick={() => handleQuizAnswer(quizIndex, opt.key, isCorrect)}
                            className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <div>
                              <strong className="text-sm block">{opt.textJp}</strong>
                              <span className="text-[11px] text-[var(--text-secondary)]">{opt.textId}</span>
                            </div>
                            <span className="w-6 h-6 rounded-full border border-[var(--border)] flex items-center justify-center font-bold text-[11px]">
                              {opt.key}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if answered */}
                    {selectedAnswers[quizIndex] && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-400 space-y-1"
                      >
                        <strong>Penjelasan:</strong>
                        <p>{day.quizQuestions[quizIndex].explanation}</p>
                      </motion.div>
                    )}

                    {/* Next Question button */}
                    {selectedAnswers[quizIndex] && (
                      <div className="pt-2 text-right">
                        {quizIndex < day.quizQuestions.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => setQuizIndex((prev) => prev + 1)}
                            className="px-5 py-2.5 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold"
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
                            className="px-5 py-2.5 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold flex items-center gap-1.5 ml-auto"
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
            {/* STEP 4: DOKKAI SYNTHESIS (IN-TEXT VOCAB GLOW)                             */}
            {/* ========================================================================= */}
            {currentStep === "dokkai" && (
              <motion.div
                key="step-dokkai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div>
                  <span className="text-[11px] font-bold text-[var(--brand-primary)]">
                    {dokkaiPassage.categoryLabel}
                  </span>
                  <h3 className="text-lg font-black text-[var(--text-primary)]">
                    {dokkaiPassage.titleJp}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">{dokkaiPassage.titleId}</p>
                </div>

                {/* Info Note: In-Text Glow */}
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <Sparkles size={16} className="shrink-0" />
                  <span>
                    <strong>In-Text Vocab Glow:</strong> Kosakata yang baru saja Anda pelajari di Step 1 berpendar kuning. Sentuh kata tersebut untuk melihat artinya!
                  </span>
                </div>

                {/* Dokkai Passage Sentences with Word Highlighting */}
                <div className="p-5 rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)]/30 space-y-4">
                  {dokkaiPassage.sentences.map((sent, sIdx) => {
                    // Check if sentence contains glowing words
                    let renderedText = sent.textJp;

                    return (
                      <div key={sent.id || sIdx} className="space-y-1">
                        <p className="text-sm font-medium text-[var(--text-primary)] leading-loose">
                          {/* Highlight words */}
                          {day.inTextGlowWords.reduce(
                            (acc, glowWord) => {
                              // We split by glow words
                              return acc;
                            },
                            [renderedText]
                          )}
                          {/* Simple interactive parser for glow words */}
                          {sent.textJp.split(new RegExp(`(${day.inTextGlowWords.join("|")})`, "g")).map((segment, idx) => {
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
                                  className="mx-0.5 px-1.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold border border-amber-500/30 cursor-pointer hover:bg-amber-500/30 transition-all shadow-2xs"
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

                {/* Vocab Tooltip Modal if tapped */}
                {dokkaiTooltip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3.5 rounded-2xl bg-[var(--surface)] border-2 border-amber-500 shadow-md flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs text-[var(--text-secondary)] font-mono">
                        {dokkaiTooltip.ruby}
                      </span>
                      <h4 className="text-base font-extrabold text-[var(--text-primary)]">
                        {dokkaiTooltip.word}
                      </h4>
                      <p className="text-xs font-bold text-[var(--brand-primary)]">
                        {dokkaiTooltip.meaning}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDokkaiTooltip(null)}
                      className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                )}

                {/* Comprehension Question from Dokkai */}
                {dokkaiPassage.questions?.[0] && (
                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
                    <h4 className="text-xs font-extrabold text-[var(--text-primary)]">
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
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                            dokkaiQuestionAnswer === opt.key
                              ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] font-bold"
                              : "bg-[var(--surface-soft)] border-[var(--border)] text-[var(--text-primary)]"
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
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-emerald-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-98 transition-all"
                  >
                    <Sparkles size={18} />
                    <span>Selesaikan Day {day.day} & Rekam Pencapaian!</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 5: DAY COMPLETED CELEBRATION MODAL                                   */}
            {/* ========================================================================= */}
            {currentStep === "completed" && (
              <motion.div
                key="step-completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-5"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg animate-bounce">
                  <Award size={40} />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    Day {day.day} Selesai dengan Sukses!
                  </span>
                  <h2 className="text-2xl font-black text-[var(--text-primary)] mt-2">
                    Selamat, Target Belajar Hari Ini Tuntas! 🎉
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto mt-1">
                    Anda telah menguasai 15 kosakata tematik, 2 pola kalimat Bunpou, dan menyelesaikan sintesis wacana Dokkai.
                  </p>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  <div className="p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-xl font-black text-[var(--brand-primary)]">
                      {day.vocabItems.length}
                    </span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Kata Dihafal</p>
                  </div>
                  <div className="p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-xl font-black text-amber-500">
                      {day.grammarItems.length}
                    </span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Pola Grammar</p>
                  </div>
                  <div className="p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]">
                    <span className="text-xl font-black text-emerald-500">1</span>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold">Dokkai Tamat</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3.5 rounded-2xl bg-[var(--brand-primary)] text-white font-extrabold text-xs shadow-md hover:opacity-95"
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
