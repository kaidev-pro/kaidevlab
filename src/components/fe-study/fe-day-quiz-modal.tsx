"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  Award,
  ArrowRight,
  RotateCcw,
  Volume2,
  X,
  HelpCircle,
  BookOpen,
  Lock,
  Unlock,
  Check,
  AlertCircle,
  FileQuestion,
  Lightbulb,
} from "lucide-react";
import { FEDailyDeck } from "@/data/fe-daily-decks";
import { FECard, FE_CARDS } from "@/data/fe-study-data";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { ConfettiBurst, playVictoryFanfare } from "@/components/fe-study/confetti-burst";
import { useJapaneseTts } from "@/lib/use-japanese-tts";

interface FeDayQuizModalProps {
  deck: FEDailyDeck;
  deckCards: FECard[];
  nextDeck?: FEDailyDeck;
  onClose: () => void;
  onPassQuiz: (score: number, total: number, nextDay?: number) => void;
}

interface FeQuizQuestion {
  id: string;
  type: "term-to-definition" | "clue-to-term";
  card: FECard;
  prompt: React.ReactNode;
  promptText: string;
  correctAnswer: string;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function playTone(freq: number, type: OscillatorType = "sine", duration: number = 0.15) {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

export function FeDayQuizModal({
  deck,
  deckCards,
  nextDeck,
  onClose,
  onPassQuiz,
}: FeDayQuizModalProps) {
  const { speak } = useJapaneseTts();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    Array<{ question: FeQuizQuestion; selected: string; isCorrect: boolean }>
  >([]);
  const [isFinished, setIsFinished] = useState(false);

  // Generate test questions from all cards in the deck
  const questions: FeQuizQuestion[] = useMemo(() => {
    if (deckCards.length === 0) return [];

    const pool = shuffle([...deckCards]);

    return pool.map((card, idx) => {
      // Alternate between term-to-definition and clue-to-term
      const isClue = idx % 2 === 1 && card.keyDifferentiator;

      if (isClue) {
        // Clue -> Term
        const correct = `${card.termJp} (${card.termEn})`;
        const otherCards = shuffle(
          FE_CARDS.filter((c) => c.id !== card.id && c.category === card.category)
        ).slice(0, 3);

        const distractorOptions = otherCards.map((c) => `${c.termJp} (${c.termEn})`);
        const options = shuffle([correct, ...distractorOptions]);

        return {
          id: `quiz-clue-${card.id}`,
          type: "clue-to-term" as const,
          card,
          promptText: card.keyDifferentiator,
          prompt: (
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-500 font-bold block">
                Kata Kunci Penentu Jawaban Ujian FE
              </span>
              <p className="text-base sm:text-lg font-medium text-[var(--text-primary)] leading-relaxed bg-[var(--surface-secondary)]/50 p-4 rounded-2xl border border-[var(--border-subtle)]">
                &ldquo;{card.keyDifferentiator}&rdquo;
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Konsep atau teknologi manakah yang paling tepat dengan ciri di atas?
              </p>
            </div>
          ),
          correctAnswer: correct,
          options,
        };
      } else {
        // Term -> Definition
        const correct = card.definitionId;
        const otherCards = shuffle(
          FE_CARDS.filter((c) => c.id !== card.id)
        ).slice(0, 3);

        const distractorOptions = otherCards.map((c) => c.definitionId);
        const options = shuffle([correct, ...distractorOptions]);

        return {
          id: `quiz-term-${card.id}`,
          type: "term-to-definition" as const,
          card,
          promptText: `${card.termJp} - ${card.termEn}`,
          prompt: (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-wide font-japanese">
                  <RubyTerm
                    rubyText={card.ruby}
                    fallbackText={card.termJp}
                    showFurigana={true}
                  />
                </span>
                <button
                  type="button"
                  onClick={() => speak(card.termJp)}
                  className="p-1.5 rounded-lg bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  title="Dengarkan pengucapan Jepang"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm font-semibold text-[var(--brand-primary)]">
                {card.termEn}
              </div>

              <p className="text-xs text-[var(--text-secondary)]">
                Manakah definisi atau prinsip kerja yang paling tepat untuk istilah di atas?
              </p>
            </div>
          ),
          correctAnswer: correct,
          options,
        };
      }
    });
  }, [deckCards, speak]);

  const [activeQuestions, setActiveQuestions] = useState<FeQuizQuestion[]>([]);

  useEffect(() => {
    setActiveQuestions(questions);
    setCurrentIdx(0);
    setScore(0);
    setUserAnswers([]);
    setIsFinished(false);
  }, [questions]);

  const currentQ = activeQuestions[currentIdx];

  const handleSelectOption = (opt: string) => {
    if (isAnswerChecked || !currentQ) return;
    setSelectedOpt(opt);
    setIsAnswerChecked(true);

    const isCorrect = opt === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
      playTone(587.33, "sine", 0.12); // D5
    } else {
      playTone(220, "triangle", 0.18); // A3 error thud
    }

    setUserAnswers((prev) => [
      ...prev,
      { question: currentQ, selected: opt, isCorrect },
    ]);

    // Auto advance after short feedback window
    setTimeout(() => {
      if (currentIdx + 1 < activeQuestions.length) {
        setCurrentIdx((idx) => idx + 1);
        setSelectedOpt(null);
        setIsAnswerChecked(false);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        setIsFinished(true);

        const totalQ = activeQuestions.length;
        const passed = totalQ > 0 ? finalScore / totalQ >= 0.8 : false;
        if (passed) {
          playVictoryFanfare();
          onPassQuiz(finalScore, totalQ, nextDeck?.day);
        }
      }
    }, 280);
  };

  const handleRestartQuiz = () => {
    setActiveQuestions(shuffle(questions));
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswerChecked(false);
    setScore(0);
    setUserAnswers([]);
    setIsFinished(false);
  };

  const handleRetestMistakesOnly = () => {
    const wrongQuestions = userAnswers
      .filter((a) => !a.isCorrect)
      .map((a) => a.question);
    if (wrongQuestions.length === 0) return;

    setActiveQuestions(shuffle(wrongQuestions));
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswerChecked(false);
    setScore(0);
    setUserAnswers([]);
    setIsFinished(false);
  };

  if (!currentQ && !isFinished) return null;

  const totalQuestions = activeQuestions.length;
  const progressPercent = totalQuestions > 0 ? (currentIdx / totalQuestions) * 100 : 0;
  const scorePercent = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const isPassed = scorePercent >= 80;
  const wrongAnswers = userAnswers.filter((a) => !a.isCorrect);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-2xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden relative text-[var(--text-primary)]"
      >
        {/* ==================================================== */}
        {/* HEADER                                               */}
        {/* ==================================================== */}
        <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0 bg-[var(--surface-secondary)]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[var(--brand-primary)] uppercase">
                DAY {deck.day.toString().padStart(2, "0")}
              </span>
              <span className="text-xs font-mono text-[var(--text-tertiary)]">
                · {totalQuestions} Soal Ujian
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] truncate max-w-md">
              {deck.titleId}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (during quiz) */}
        {!isFinished && (
          <div className="w-full h-1 bg-[var(--surface-secondary)]">
            <div
              className="h-full bg-[var(--brand-primary)] transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* ==================================================== */}
        {/* QUIZ ACTIVE VIEW                                     */}
        {/* ==================================================== */}
        {!isFinished ? (
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
            {/* Question Counter */}
            <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-mono">
              <span>
                Soal {currentIdx + 1} dari {totalQuestions}
              </span>
              <span className="font-bold text-emerald-500">
                Skor Saat Ini: {score}
              </span>
            </div>

            {/* Prompt Box */}
            <div className="py-2">{currentQ.prompt}</div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentQ.correctAnswer;

                let stateClass = "border-[var(--border-subtle)] bg-[var(--surface-secondary)]/40 hover:bg-[var(--surface-secondary)] hover:border-[var(--brand-primary)]/40";
                if (isAnswerChecked) {
                  if (isCorrect) {
                    stateClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold";
                  } else if (isSelected) {
                    stateClass = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold";
                  } else {
                    stateClass = "border-[var(--border-subtle)] opacity-40";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    disabled={isAnswerChecked}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 active:scale-[0.99] ${stateClass}`}
                  >
                    <span className="leading-relaxed flex-1">{opt}</span>
                    {isAnswerChecked && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    )}
                    {isAnswerChecked && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ==================================================== */
          /* RESULTS & POST-EXAM MISTAKE REVIEW                   */
          /* ==================================================== */
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {isPassed && <ConfettiBurst />}

            {/* Score Banner */}
            <div className="text-center space-y-3">
              <div
                className={`w-16 h-16 mx-auto rounded-3xl flex items-center justify-center ${
                  isPassed
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                }`}
              >
                {isPassed ? <Trophy className="w-8 h-8" /> : <Award className="w-8 h-8" />}
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  {score} / {totalQuestions} Soal ({scorePercent}%)
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  {isPassed
                    ? "Kelulusan Terpenuhi (Ambang batas min. 80%)"
                    : "Belum Memenuhi Ambang Batas 80% Kelulusan"}
                </p>
              </div>

              {isPassed && nextDeck && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <Unlock className="w-4 h-4" />
                  <span>Day {nextDeck.day.toString().padStart(2, "0")} Telah Terbuka</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Ujian Lengkap</span>
              </button>

              {wrongAnswers.length > 0 && (
                <button
                  type="button"
                  onClick={handleRetestMistakesOnly}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[var(--brand-primary)] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Uji Ulang {wrongAnswers.length} Soal Keliru</span>
                </button>
              )}
            </div>

            {/* ==================================================== */}
            {/* BEDAH SOAL YANG BELUM TEPAT                          */}
            {/* ==================================================== */}
            {wrongAnswers.length > 0 && (
              <div className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileQuestion className="w-4 h-4 text-rose-500" />
                    <h5 className="text-sm font-bold text-[var(--text-primary)]">
                      Bedah Soal yang Belum Tepat ({wrongAnswers.length})
                    </h5>
                  </div>
                  <span className="text-[11px] text-[var(--text-tertiary)] font-mono">
                    Analisis Kunci Ujian FE
                  </span>
                </div>

                <div className="space-y-4">
                  {wrongAnswers.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 space-y-3"
                    >
                      {/* Concept Term Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                        <div className="flex items-center gap-2">
                          <span className="font-japanese font-bold text-base text-[var(--text-primary)]">
                            <RubyTerm
                              rubyText={item.question.card.ruby}
                              fallbackText={item.question.card.termJp}
                              showFurigana={true}
                            />
                          </span>
                          <span className="text-xs font-semibold text-[var(--brand-primary)]">
                            {item.question.card.termEn}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => speak(item.question.card.termJp)}
                          className="p-1 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Promp Reference */}
                      <div className="text-xs text-[var(--text-secondary)]">
                        <b>Soal:</b> &ldquo;{item.question.promptText}&rdquo;
                      </div>

                      {/* User's Choice vs Correct Answer */}
                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          <span className="font-bold block uppercase text-[10px]">Jawaban Anda:</span>
                          <span className="text-xs">{item.selected}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <span className="font-bold block uppercase text-[10px]">Kunci Jawaban Benar:</span>
                          <span className="text-xs">{item.question.correctAnswer}</span>
                        </div>
                      </div>

                      {/* Key Takeaway & Analogy */}
                      <div className="space-y-1.5 text-xs pt-1">
                        {item.question.card.keyDifferentiator && (
                          <div className="text-[11px] text-[var(--text-secondary)] bg-[var(--surface-primary)] p-2.5 rounded-xl border border-[var(--border-subtle)]">
                            <span className="font-bold text-amber-500 block uppercase text-[10px]">
                              Kata Kunci Penentu Jawaban Ujian:
                            </span>
                            {item.question.card.keyDifferentiator}
                          </div>
                        )}
                        {item.question.card.analogy && (
                          <div className="text-[11px] text-[var(--text-tertiary)] flex items-start gap-1.5 pt-1">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>
                              <b>Analogi:</b> {item.question.card.analogy}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 text-[var(--text-primary)] text-xs font-bold transition-colors"
            >
              Selesai & Tutup Jendela
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
