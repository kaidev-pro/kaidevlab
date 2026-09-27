"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Volume2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Flame,
} from "lucide-react";
import { TangoN3Card, TANGO_N3_CARDS } from "@/data/tango-n3-data";
import { CardRating } from "@/lib/tango-n3-storage";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { TangoSessionSummary } from "@/components/tango-n3/tango-session-summary";

interface TangoQuizViewProps {
  cards: TangoN3Card[];
  onFinishQuiz?: () => void;
  streak: number;
  onRateCard?: (cardId: string, chapterId: string, rating: CardRating) => void;
}

interface QuizItem {
  id: string;
  type: "meaning" | "cloze";
  card: TangoN3Card;
  questionText: string;
  questionDisplay: React.ReactNode;
  correctAnswer: string;
  options: Array<{
    id: string;
    text: string;
    subText?: string;
  }>;
  explanation: {
    ruby: string;
    meaning: string;
    collocation?: string;
  };
}

function shuffleArray<T>(arr: T[]): T[] {
  const clone = [...arr];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function createQuizAudio() {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  const ctx = new AudioCtx();

  return {
    playCorrect: () => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.05);
          gain.gain.setValueAtTime(0.18, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.3);
        });
      } catch {}
    },
    playWrong: () => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } catch {}
    },
  };
}

export function TangoQuizView({
  cards,
  onFinishQuiz,
  streak,
  onRateCard,
}: TangoQuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const audioRef = useRef<ReturnType<typeof createQuizAudio>>(null);

  useEffect(() => {
    audioRef.current = createQuizAudio();
  }, []);

  // Generate Quiz Items dynamically from cards
  const quizItems: QuizItem[] = useMemo(() => {
    const pool = TANGO_N3_CARDS.length >= 4 ? TANGO_N3_CARDS : cards;

    return cards.map((card, idx) => {
      // Alternate question type
      const isCloze = idx % 2 === 1;

      // Pick 3 distractors from the pool
      const otherCards = pool.filter((c) => c.id !== card.id);
      const shuffledOthers = shuffleArray(otherCards).slice(0, 3);

      if (isCloze) {
        // Question: Cloze fill-in from example sentence
        const rawSentence = card.exampleSentence.jpRuby;
        let prefix = "";
        let suffix = "";
        let found = false;

        if (card.ruby && rawSentence.includes(card.ruby)) {
          const parts = rawSentence.split(card.ruby);
          prefix = parts[0];
          suffix = parts.slice(1).join(card.ruby);
          found = true;
        } else if (card.word && rawSentence.includes(card.word)) {
          const parts = rawSentence.split(card.word);
          prefix = parts[0];
          suffix = parts.slice(1).join(card.word);
          found = true;
        }

        const options = shuffleArray([
          { id: card.id, text: card.word, subText: card.reading },
          ...shuffledOthers.map((o) => ({ id: o.id, text: o.word, subText: o.reading })),
        ]);

        return {
          id: `quiz-cloze-${card.id}`,
          type: "cloze",
          card,
          questionText: "Pilih kosakata yang tepat untuk melengkapi kalimat berikut:",
          questionDisplay: (
            <div className="space-y-3">
              <div className="text-lg sm:text-xl font-japanese font-semibold leading-relaxed text-[var(--text-primary)] flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
                {found ? (
                  <>
                    {prefix && <RubyTerm rubyText={prefix} fallbackText={prefix} />}
                    <span className="inline-flex items-center justify-center px-4 py-1 mx-1 min-w-[76px] border-b-2 border-dashed border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold rounded-xl text-sm select-none tracking-widest shadow-inner">
                      （　？　）
                    </span>
                    {suffix && <RubyTerm rubyText={suffix} fallbackText={suffix} />}
                  </>
                ) : (
                  <RubyTerm rubyText={rawSentence} fallbackText={rawSentence} />
                )}
              </div>
              <div className="text-xs text-[var(--text-tertiary)] italic">
                {card.exampleSentence.meaningId}
              </div>
            </div>
          ),
          correctAnswer: card.id,
          options,
          explanation: {
            ruby: card.ruby,
            meaning: card.meaningId,
            collocation: card.collocation?.meaningId,
          },
        };
      } else {
        // Question: Meaning drill
        const options = shuffleArray([
          { id: card.id, text: card.meaningId },
          ...shuffledOthers.map((o) => ({ id: o.id, text: o.meaningId })),
        ]);

        return {
          id: `quiz-meaning-${card.id}`,
          type: "meaning",
          card,
          questionText: "Apa arti yang paling tepat untuk kosakata berikut?",
          questionDisplay: (
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-japanese font-bold text-[var(--text-primary)]">
                <RubyTerm rubyText={card.ruby} fallbackText={card.word} showFurigana={true} />
              </div>
              {card.collocation && (
                <div className="text-xs font-japanese text-[var(--text-secondary)]">
                  連語: <RubyTerm rubyText={card.collocation.jpRuby} fallbackText={card.collocation.jpRuby} />
                </div>
              )}
            </div>
          ),
          correctAnswer: card.id,
          options,
          explanation: {
            ruby: card.ruby,
            meaning: card.meaningId,
            collocation: card.collocation?.meaningId,
          },
        };
      }
    });
  }, [cards]);

  const currentItem = quizItems[currentIndex];

  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (isAnswered || !currentItem) return;

      setSelectedOptionId(optionId);
      setIsAnswered(true);

      const isCorrect = optionId === currentItem.correctAnswer;
      if (onRateCard) {
        onRateCard(currentItem.card.id, currentItem.card.chapterId, isCorrect ? "mastered" : "forgot");
      }
      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
        if (audioRef.current) audioRef.current.playCorrect();
      } else {
        setWrongCount((prev) => prev + 1);
        if (audioRef.current) audioRef.current.playWrong();
      }
    },
    [isAnswered, currentItem, onRateCard]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < quizItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, quizItems.length]);

  // Keyboard navigation 1, 2, 3, 4 and Space/Enter to proceed
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (!isAnswered && currentItem) {
        if (["1", "2", "3", "4"].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          if (currentItem.options[idx]) {
            e.preventDefault();
            handleSelectOption(currentItem.options[idx].id);
          }
        }
      } else if (isAnswered) {
        if (e.key === "Enter" || e.code === "Space") {
          e.preventDefault();
          handleNext();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnswered, currentItem, handleSelectOption, handleNext]);

  // Audio speech synthesis helper
  const speakCurrentWord = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !currentItem) return;
    window.speechSynthesis.cancel();
    const textToSpeak =
      currentItem.type === "cloze"
        ? currentItem.card.exampleSentence.jpRuby.replace(/\[([^:]+):[^\]]+\]/g, "$1")
        : currentItem.card.word;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, [currentItem]);

  if (isFinished) {
    return (
      <TangoSessionSummary
        totalReviewed={quizItems.length}
        masteredCount={correctCount}
        reviewCount={wrongCount}
        streak={streak}
        onRestart={() => {
          setCurrentIndex(0);
          setSelectedOptionId(null);
          setIsAnswered(false);
          setCorrectCount(0);
          setWrongCount(0);
          setIsFinished(false);
        }}
        onBackToDashboard={onFinishQuiz || (() => {})}
      />
    );
  }

  if (!currentItem) return null;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Top Header & Progress */}
      <div className="w-full flex items-center justify-between text-xs text-[var(--text-secondary)] mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm text-[var(--text-primary)]">
            Soal {currentIndex + 1}
          </span>
          <span>/</span>
          <span>{quizItems.length}</span>

          <span className="ml-2 font-mono font-bold text-emerald-600 dark:text-emerald-400">
            ✓ {correctCount}
          </span>
          {wrongCount > 0 && (
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
              ✗ {wrongCount}
            </span>
          )}
        </div>

        {streak > 0 && (
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>{streak}d</span>
          </div>
        )}
      </div>

      {/* Progress Line */}
      <div className="w-full h-1.5 bg-[var(--surface-secondary)] rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-[var(--brand-primary)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / quizItems.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Card Box */}
      <div className="w-full p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-xl mb-6 text-center relative overflow-hidden">
        {/* Top Badges */}
        <div className="flex items-center justify-between text-xs mb-4">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
            #{String(currentItem.card.bookNumber).padStart(4, "0")}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] font-medium">
            {currentItem.card.partOfSpeech}
          </span>
        </div>

        {/* Question Prompt */}
        <p className="text-xs uppercase font-bold tracking-wider text-[var(--text-tertiary)] mb-4">
          {currentItem.questionText}
        </p>

        {/* Question Display (Word or Cloze Sentence) */}
        <div className="my-3 py-2 flex flex-col items-center justify-center">
          {currentItem.questionDisplay}

          {(currentItem.type === "meaning" || isAnswered) && (
            <button
              onClick={speakCurrentWord}
              title="Dengarkan pelafalan"
              className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-[var(--text-secondary)] hover:text-[var(--brand-primary)] border border-[var(--border-subtle)] bg-[var(--surface-secondary)] transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Audio {currentItem.type === "cloze" ? "Kalimat Lengkap" : "Kata"}</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Multiple-Choice Options */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {currentItem.options.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;
          const isCorrect = opt.id === currentItem.correctAnswer;

          let btnStyle =
            "border-[var(--border-subtle)] bg-[var(--surface-primary)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] hover:shadow-md";

          if (isAnswered) {
            if (isCorrect) {
              btnStyle =
                "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30";
            } else if (isSelected) {
              btnStyle =
                "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/30";
            } else {
              btnStyle = "opacity-40 border-[var(--border-subtle)] bg-[var(--surface-secondary)]";
            }
          }

          return (
            <button
              key={opt.id}
              disabled={isAnswered}
              onClick={() => handleSelectOption(opt.id)}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all active:scale-98 ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-[var(--surface-secondary)] flex items-center justify-center font-mono font-bold text-xs text-[var(--text-secondary)] shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <div className="text-sm font-semibold leading-snug">{opt.text}</div>
                  {opt.subText && (
                    <div className="text-xs text-[var(--text-tertiary)] font-japanese">
                      {opt.subText}
                    </div>
                  )}
                </div>
              </div>

              {isAnswered && (
                <div>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback Drawer */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className={`w-full p-5 rounded-3xl border mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg ${
              selectedOptionId === currentItem.correctAnswer
                ? "bg-emerald-500/5 border-emerald-500/30"
                : "bg-rose-500/5 border-rose-500/30"
            }`}
          >
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                {selectedOptionId === currentItem.correctAnswer ? (
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Jawaban Tepat! (正解)
                  </span>
                ) : (
                  <span className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Belum Tepat (不正解)
                  </span>
                )}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                <b>{currentItem.card.word}</b> ({currentItem.card.reading}):{" "}
                <span className="text-[var(--text-primary)] font-medium">
                  {currentItem.card.meaningId}
                </span>
              </div>
              {currentItem.card.collocation && (
                <div className="text-[11px] text-[var(--text-tertiary)] font-japanese">
                  連語: {currentItem.card.collocation.jpRuby.replace(/\[([^:]+):[^\]]+\]/g, "$1")} (
                  {currentItem.card.collocation.meaningId})
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-2xl bg-[var(--brand-primary)] hover:opacity-95 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0"
            >
              <span>{currentIndex < quizItems.length - 1 ? "Soal Berikutnya" : "Lihat Hasil"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
