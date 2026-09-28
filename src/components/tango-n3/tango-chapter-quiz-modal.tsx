"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Volume2,
  X,
  HelpCircle,
  BookOpen,
  Lock,
  Unlock,
} from "lucide-react";
import { TangoChapter, TangoN3Card, TANGO_N3_CARDS } from "@/data/tango-n3-data";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { ConfettiBurst, playVictoryFanfare } from "@/components/fe-study/confetti-burst";
import { useJapaneseTts } from "@/lib/use-japanese-tts";

interface TangoChapterQuizModalProps {
  chapter: TangoChapter;
  chapterCards: TangoN3Card[];
  nextChapter?: TangoChapter;
  onClose: () => void;
  onPassQuiz: (score: number, total: number, nextChapterId?: string) => void;
}

interface QuizQuestion {
  id: string;
  type: "kanji-to-meaning" | "meaning-to-kanji" | "collocation";
  prompt: React.ReactNode;
  promptText: string;
  correctAnswer: string;
  options: string[];
  explanation: {
    word: string;
    reading: string;
    meaning: string;
    collocation?: string;
  };
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

export function TangoChapterQuizModal({
  chapter,
  chapterCards,
  nextChapter,
  onClose,
  onPassQuiz,
}: TangoChapterQuizModalProps) {
  const { speak } = useJapaneseTts();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    Array<{ question: QuizQuestion; selected: string; isCorrect: boolean }>
  >([]);
  const [isFinished, setIsFinished] = useState(false);

  // Test ALL cards in the chapter for complete mastery
  const questions: QuizQuestion[] = useMemo(() => {
    if (chapterCards.length === 0) return [];

    // Test all cards in the chapter (shuffled)
    const shuffledCards = shuffle(chapterCards);
    const allDistractorPool = TANGO_N3_CARDS.length > 50 ? TANGO_N3_CARDS : chapterCards;

    return shuffledCards.map((card, i) => {
      // Rotate question types: kanji-to-meaning (50%), meaning-to-kanji (25%), collocation (25%)
      const qTypeNum = i % 4;

      if (qTypeNum === 0 || qTypeNum === 2) {
        // Type 1: Kanji -> Indonesian Meaning
        const correct = card.meaningId;
        const distractors = shuffle(
          allDistractorPool
            .filter((c) => c.id !== card.id && c.meaningId !== card.meaningId)
            .map((c) => c.meaningId)
        ).slice(0, 3);

        return {
          id: `q-${card.id}-${i}`,
          type: "kanji-to-meaning",
          promptText: card.word,
          prompt: (
            <div className="space-y-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-tertiary)]">
                Pilih Arti yang Tepat:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] font-japanese pt-1">
                <RubyTerm rubyText={card.ruby} fallbackText={card.word} showFurigana={true} />
              </div>
            </div>
          ),
          correctAnswer: correct,
          options: shuffle([correct, ...distractors]),
          explanation: {
            word: card.word,
            reading: card.reading,
            meaning: card.meaningId,
            collocation: card.collocation?.meaningId,
          },
        };
      } else if (qTypeNum === 1) {
        // Type 2: Meaning -> Kanji (Active Production)
        const correct = `${card.word} (${card.reading})`;
        const distractors = shuffle(
          allDistractorPool
            .filter((c) => c.id !== card.id && c.word !== card.word)
            .map((c) => `${c.word} (${c.reading})`)
        ).slice(0, 3);

        return {
          id: `q-${card.id}-${i}`,
          type: "meaning-to-kanji",
          promptText: card.meaningId,
          prompt: (
            <div className="space-y-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-tertiary)]">
                Pilih Kanji / Kosakata Jepang untuk:
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-primary)] pt-1">
                "{card.meaningId}"
              </div>
            </div>
          ),
          correctAnswer: correct,
          options: shuffle([correct, ...distractors]),
          explanation: {
            word: card.word,
            reading: card.reading,
            meaning: card.meaningId,
            collocation: card.collocation?.meaningId,
          },
        };
      } else {
        // Type 3: Collocation cloze or Sentence
        const colloc = card.collocation;
        if (colloc && colloc.jpRuby) {
          const cleanColloc = colloc.jpRuby.replace(/\[([^:]+):[^\]]+\]/g, "$1");
          const blanked = cleanColloc.replace(card.word, "【 ___ 】");
          const correct = card.word;
          const distractors = shuffle(
            allDistractorPool
              .filter((c) => c.id !== card.id && c.word !== card.word && c.partOfSpeech === card.partOfSpeech)
              .map((c) => c.word)
          ).slice(0, 3);

          return {
            id: `q-${card.id}-${i}`,
            type: "collocation",
            promptText: blanked,
            prompt: (
              <div className="space-y-1">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                  Lengkapi Pasangan Kata (連語):
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-japanese pt-1">
                  {blanked}
                </div>
                <div className="text-xs text-[var(--text-secondary)] italic">
                  Arti: {colloc.meaningId}
                </div>
              </div>
            ),
            correctAnswer: correct,
            options: shuffle([correct, ...distractors]),
            explanation: {
              word: card.word,
              reading: card.reading,
              meaning: card.meaningId,
              collocation: colloc.meaningId,
            },
          };
        } else {
          // Fallback to Kanji-to-meaning
          const correct = card.meaningId;
          const distractors = shuffle(
            allDistractorPool
              .filter((c) => c.id !== card.id && c.meaningId !== card.meaningId)
              .map((c) => c.meaningId)
          ).slice(0, 3);

          return {
            id: `q-${card.id}-${i}`,
            type: "kanji-to-meaning",
            promptText: card.word,
            prompt: (
              <div className="space-y-1">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-tertiary)]">
                  Pilih Arti yang Tepat:
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] font-japanese pt-1">
                  <RubyTerm rubyText={card.ruby} fallbackText={card.word} showFurigana={true} />
                </div>
              </div>
            ),
            correctAnswer: correct,
            options: shuffle([correct, ...distractors]),
            explanation: {
              word: card.word,
              reading: card.reading,
              meaning: card.meaningId,
            },
          };
        }
      }
    });
  }, [chapterCards]);

  // Quiz items list (can be swapped when re-testing wrong answers)
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setActiveQuestions(questions);
  }, [questions]);

  const currentQ = activeQuestions[currentIdx];
  const totalQuestions = activeQuestions.length;
  const isPassed = totalQuestions > 0 ? score / totalQuestions >= 0.8 : false;

  // Fast-paced option selection (Opsi 2: Smooth auto-advance without mid-quiz interruption)
  function handleSelectOption(opt: string) {
    if (isAnswerChecked || !currentQ) return;
    setSelectedOpt(opt);
    setIsAnswerChecked(true);

    const isCorrect = opt === currentQ.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) {
      setScore(newScore);
      playTone(659, "triangle", 0.16);
    } else {
      playTone(180, "sawtooth", 0.22);
    }

    const updatedAnswers = [
      ...userAnswers,
      { question: currentQ, selected: opt, isCorrect },
    ];
    setUserAnswers(updatedAnswers);

    // Advance to next question after 280ms tactile delay
    setTimeout(() => {
      setSelectedOpt(null);
      setIsAnswerChecked(false);

      if (currentIdx < totalQuestions - 1) {
        setCurrentIdx((i) => i + 1);
      } else {
        setIsFinished(true);
        const passed = totalQuestions > 0 ? newScore / totalQuestions >= 0.8 : false;
        if (passed) {
          onPassQuiz(newScore, totalQuestions, nextChapter?.id);
        }
      }
    }, 280);
  }

  function handleRestartAll() {
    setActiveQuestions(questions);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswerChecked(false);
    setScore(0);
    setUserAnswers([]);
    setIsFinished(false);
  }

  // Re-test ONLY wrong questions
  function handleRetestWrongOnly() {
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
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      {/* Confetti Celebration on Pass */}
      {isFinished && isPassed && <ConfettiBurst trigger={true} withSound={true} />}

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="w-full max-w-xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
      >
        {/* Modal Top Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--surface-secondary)]/40">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--brand-primary)] text-white shadow-2xs">
              BAB {chapter.badge}
            </span>
            <span className="text-xs font-bold text-[var(--text-primary)] truncate max-w-[260px]">
              Uji Kelulusan: {chapter.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!isFinished && (
              <span className="text-xs font-mono font-bold text-[var(--text-tertiary)]">
                {currentIdx + 1} / {totalQuestions} Soal
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition-colors"
              title="Tutup Tes"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {!isFinished && (
          <div className="w-full h-1.5 bg-[var(--surface-secondary)] overflow-hidden">
            <div
              className="h-full bg-[var(--brand-primary)] transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        {!isFinished ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Prompt Box */}
            <div className="p-5 rounded-2xl bg-[var(--surface-secondary)]/40 border border-[var(--border-subtle)] text-center min-h-[120px] flex flex-col items-center justify-center relative">
              {currentQ.prompt}
              <button
                onClick={() => speak(currentQ.explanation.word)}
                className="absolute top-3 right-3 p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-primary)] text-[var(--text-tertiary)] hover:text-[var(--brand-primary)]"
                title="Dengarkan pelafalan kata"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIndex) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentQ.correctAnswer;

                let optClass =
                  "border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-[var(--brand-primary)]/50 hover:bg-[var(--surface-secondary)]/40";
                if (isAnswerChecked) {
                  if (isCorrect) {
                    optClass =
                      "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/20";
                  } else if (isSelected && !isCorrect) {
                    optClass =
                      "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold";
                  } else {
                    optClass = "opacity-40 border-[var(--border-subtle)]";
                  }
                }

                return (
                  <button
                    key={optIndex}
                    disabled={isAnswerChecked}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm text-left flex items-center justify-between gap-3 transition-all ${optClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className="font-medium">{opt}</span>
                    </div>

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
          /* Result Screen */
          <div className="p-6 sm:p-8 text-center space-y-6">
            {isPassed ? (
              <div className="space-y-3">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-lg">
                  <Trophy className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    合格 · LULUS UJI KELULUSAN!
                  </span>
                  <h3 className="text-2xl font-black text-[var(--text-primary)]">
                    Selamat! Bab {chapter.badge} Dikuasai
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                    Kamu berhasil menjawab benar {score} dari {totalQuestions} soal (Akurasi: {Math.round((score / totalQuestions) * 100)}%).
                  </p>
                </div>

                {nextChapter && (
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-left flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Unlock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-[var(--text-primary)]">
                        Bab {nextChapter.badge}: {nextChapter.title} Telah Terbuka!
                      </div>
                      <div className="text-[var(--text-tertiary)] text-[11px]">
                        Lanjutkan petualangan belajarmu ke bab berikutnya.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-lg">
                  <RotateCcw className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Belum Mencapai Nilai Kelulusan
                  </span>
                  <h3 className="text-2xl font-black text-[var(--text-primary)]">
                    Skor: {score} / {totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                    Syarat kelulusan untuk membuka bab berikutnya adalah minimal <strong>80% (Benar {Math.ceil(totalQuestions * 0.8)} dari {totalQuestions} soal)</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Wrong Answers Review (Opsi 2: Bedah Soal yang Salah di Akhir) */}
            {userAnswers.filter((a) => !a.isCorrect).length > 0 && (
              <div className="text-left space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-rose-500 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    <span>Bedah Soal yang Belum Tepat ({userAnswers.filter((a) => !a.isCorrect).length} Soal):</span>
                  </div>
                  <button
                    onClick={handleRetestWrongOnly}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Uji Ulang {userAnswers.filter((a) => !a.isCorrect).length} Soal Ini</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {userAnswers
                    .filter((a) => !a.isCorrect)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-bold text-[var(--text-primary)]">
                          <span className="font-japanese text-sm">
                            {item.question.explanation.word} 【{item.question.explanation.reading}】
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                            ✓ {item.question.correctAnswer}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[var(--text-tertiary)]">
                          <span>
                            Jawabanmu: <strong className="text-rose-500 line-through">{item.selected}</strong>
                          </span>
                          <span className="text-[var(--text-secondary)] font-medium">
                            Arti: {item.question.explanation.meaning}
                          </span>
                        </div>
                        {item.question.explanation.collocation && (
                          <div className="text-[11px] font-japanese text-[var(--text-secondary)] bg-[var(--surface-secondary)]/50 px-2 py-1 rounded-md">
                            連語: {item.question.explanation.collocation}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Actions Bottom */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              {isPassed ? (
                <>
                  <button
                    onClick={onClose}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-[var(--border-subtle)] text-xs font-bold hover:bg-[var(--surface-secondary)] text-[var(--text-primary)] transition-colors"
                  >
                    Tutup & Kembali
                  </button>
                  {userAnswers.filter((a) => !a.isCorrect).length > 0 && (
                    <button
                      onClick={handleRetestWrongOnly}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Uji {userAnswers.filter((a) => !a.isCorrect).length} Soal Salah</span>
                    </button>
                  )}
                  {nextChapter && (
                    <button
                      onClick={onClose}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>Lanjut Bab {nextChapter.badge}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={onClose}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-[var(--border-subtle)] text-xs font-bold hover:bg-[var(--surface-secondary)] text-[var(--text-primary)] transition-colors"
                  >
                    Pelajari Kartu Lagi
                  </button>
                  {userAnswers.filter((a) => !a.isCorrect).length > 0 && (
                    <button
                      onClick={handleRetestWrongOnly}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Uji {userAnswers.filter((a) => !a.isCorrect).length} Soal Salah</span>
                    </button>
                  )}
                  <button
                    onClick={handleRestartAll}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulangi Semua Soal</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
