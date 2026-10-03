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
  Clock,
  Zap,
  Ear,
  FileText,
  Layers,
} from "lucide-react";
import { TangoN3Card, TANGO_N3_CARDS, TANGO_N3_CHAPTERS } from "@/data/tango-n3-data";
import { CardRating } from "@/lib/tango-n3-storage";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { TangoSessionSummary } from "@/components/tango-n3/tango-session-summary";

export type QuizDirection = "all" | "moji_goi" | "dokkai" | "chokai" | "cloze";

interface TangoQuizViewProps {
  cards: TangoN3Card[];
  onFinishQuiz?: () => void;
  streak: number;
  onRateCard?: (cardId: string, chapterId: string, rating: CardRating) => void;
  onGraduateAll?: () => void;
  isWeakSession?: boolean;
}

interface QuizItem {
  id: string;
  type: "moji_goi" | "dokkai" | "chokai" | "cloze";
  card: TangoN3Card;
  directionBadge: {
    label: string;
    sublabel: string;
    color: string;
  };
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
  onGraduateAll,
  isWeakSession,
}: TangoQuizViewProps) {
  const [quizDirection, setQuizDirection] = useState<QuizDirection>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Anti-Ego Automated Timer State
  const questionStartTimeRef = useRef<number>(Date.now());
  const [autoRatingInfo, setAutoRatingInfo] = useState<{
    rating: CardRating;
    responseTimeSec: number;
    label: string;
  } | null>(null);

  const audioRef = useRef<ReturnType<typeof createQuizAudio>>(null);

  useEffect(() => {
    audioRef.current = createQuizAudio();
  }, []);

  // Generate 3-Directional Quiz Items dynamically from cards
  const quizItems: QuizItem[] = useMemo(() => {
    const pool = TANGO_N3_CARDS.length >= 4 ? TANGO_N3_CARDS : cards;

    return cards.map((card, idx) => {
      // Determine direction type
      let itemType: "moji_goi" | "dokkai" | "chokai" | "cloze";

      const hasKanji = card.word !== card.reading;

      if (quizDirection === "all") {
        const step = idx % 4;
        if (step === 0) itemType = hasKanji ? "moji_goi" : "dokkai";
        else if (step === 1) itemType = "dokkai";
        else if (step === 2) itemType = "chokai";
        else itemType = "cloze";
      } else if (quizDirection === "moji_goi") {
        itemType = hasKanji ? "moji_goi" : "dokkai";
      } else {
        itemType = quizDirection;
      }

      // Pick 3 distractors from the general pool
      const otherCards = pool.filter((c) => c.id !== card.id);

      // ─────────────────────────────────────────────────────────────
      // 1. ARAH 1: MOJI-GOI (Kanji ➔ Pilihan Hiragana)
      // ─────────────────────────────────────────────────────────────
      if (itemType === "moji_goi") {
        // Collect distinct reading distractors
        const distinctReadingOthers = shuffleArray(
          otherCards.filter((o) => o.reading !== card.reading)
        ).slice(0, 3);

        const options = shuffleArray([
          { id: card.id, text: card.reading },
          ...distinctReadingOthers.map((o) => ({ id: o.id, text: o.reading })),
        ]);

        return {
          id: `quiz-mojigoi-${card.id}`,
          type: "moji_goi",
          card,
          directionBadge: {
            label: "Moji-Goi · 文字語彙",
            sublabel: "Format Mondai 1 JLPT",
            color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
          },
          questionText: "Pilihlah cara baca (Hiragana) yang tepat untuk kanji berikut:",
          questionDisplay: (
            <div className="space-y-2 text-center">
              <div className="text-3xl sm:text-4xl font-japanese font-bold text-[var(--text-primary)] tracking-wider">
                {card.word}
              </div>
              <p className="text-[11px] text-[var(--text-tertiary)]">
                Kanji murni tanpa furigana · Tebak bacaan yang benar
              </p>
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

      // ─────────────────────────────────────────────────────────────
      // 2. ARAH 2: CHOKAI / AUDIO-FIRST (Bunyi / Hiragana ➔ Arti ID)
      // ─────────────────────────────────────────────────────────────
      if (itemType === "chokai") {
        const distinctMeaningOthers = shuffleArray(
          otherCards.filter((o) => o.meaningId !== card.meaningId)
        ).slice(0, 3);

        const options = shuffleArray([
          { id: card.id, text: card.meaningId },
          ...distinctMeaningOthers.map((o) => ({ id: o.id, text: o.meaningId })),
        ]);

        return {
          id: `quiz-chokai-${card.id}`,
          type: "chokai",
          card,
          directionBadge: {
            label: "Chokai · 聴解",
            sublabel: "Target Tangkap Bunyi Spontan",
            color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
          },
          questionText: "Dengarkan suara & pilih arti bahasa Indonesia yang tepat (Chokai):",
          questionDisplay: (
            <div className="space-y-2.5 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center shadow-inner">
                <Volume2 className="w-7 h-7 animate-pulse" />
              </div>
              <div className="text-2xl sm:text-3xl font-japanese font-bold text-amber-500 font-mono tracking-wider">
                {card.reading}
              </div>
              <p className="text-[11px] text-[var(--text-tertiary)] italic">
                Kanji disembunyikan agar telinga terlatih menangkap bunyi langsung ke makna
              </p>
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

      // ─────────────────────────────────────────────────────────────
      // 3. ARAH 3: CLOZE (Kalimat Kontekstual Ujian)
      // ─────────────────────────────────────────────────────────────
      if (itemType === "cloze") {
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

        const distinctWordOthers = shuffleArray(otherCards).slice(0, 3);

        const options = shuffleArray([
          { id: card.id, text: card.word, subText: card.reading },
          ...distinctWordOthers.map((o) => ({ id: o.id, text: o.word, subText: o.reading })),
        ]);

        return {
          id: `quiz-cloze-${card.id}`,
          type: "cloze",
          card,
          directionBadge: {
            label: "Kontekstual · 文脈規定",
            sublabel: "Pemahaman Kalimat Contoh",
            color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          },
          questionText: "Pilih kosakata yang tepat untuk melengkapi kalimat berikut:",
          questionDisplay: (
            <div className="space-y-3 text-center">
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
      }

      // ─────────────────────────────────────────────────────────────
      // 4. ARAH 4: DOKKAI / KOSAKATA (Kanji ➔ Arti Bahasa Indonesia)
      // ─────────────────────────────────────────────────────────────
      const distinctMeaningOthers = shuffleArray(
        otherCards.filter((o) => o.meaningId !== card.meaningId)
      ).slice(0, 3);

      const options = shuffleArray([
        { id: card.id, text: card.meaningId },
        ...distinctMeaningOthers.map((o) => ({ id: o.id, text: o.meaningId })),
      ]);

      return {
        id: `quiz-dokkai-${card.id}`,
        type: "dokkai",
        card,
        directionBadge: {
          label: "Dokkai · 読解",
          sublabel: "Makna Kanji & Bacaan Cepat",
          color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
        },
        questionText: "Pilihlah arti bahasa Indonesia yang paling tepat:",
        questionDisplay: (
          <div className="space-y-2 text-center">
            <div className="text-3xl sm:text-4xl font-japanese font-bold text-[var(--text-primary)]">
              {card.word}
            </div>
            {hasKanji && (
              <div className="text-xs font-japanese text-[var(--text-secondary)]">
                〔 {card.reading} 〕
              </div>
            )}
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
    });
  }, [cards, quizDirection]);

  // Reset indices on cards/direction change
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setWrongCount(0);
    setIsFinished(false);
    setAutoRatingInfo(null);
    questionStartTimeRef.current = Date.now();
  }, [cards, quizDirection]);

  const chapterBadgeMap = useMemo(() => {
    const map = new Map<string, string>();
    TANGO_N3_CHAPTERS.forEach((ch) => map.set(ch.id, ch.badge));
    return map;
  }, []);

  const majorityChapterId = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of cards) {
      counts[c.chapterId] = (counts[c.chapterId] || 0) + 1;
    }
    let topId = "";
    let maxCount = 0;
    for (const [id, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        topId = id;
      }
    }
    return topId;
  }, [cards]);

  const safeIndex = quizItems.length > 0 ? Math.min(currentIndex, quizItems.length - 1) : 0;
  const currentItem = quizItems[safeIndex];
  const isInterleaved = Boolean(
    cards.length > 5 && currentItem && majorityChapterId && currentItem.card.chapterId !== majorityChapterId
  );

  // Track start time for each question
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
    setAutoRatingInfo(null);
  }, [safeIndex]);

  // Chokai Auto-TTS on question presentation
  useEffect(() => {
    if (currentItem && currentItem.type === "chokai" && !isAnswered) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const textToSpeak = currentItem.card.reading || currentItem.card.word;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = "ja-JP";
        utterance.rate = 0.88;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [safeIndex, currentItem, isAnswered]);

  // Anti-Ego Automated Option Selection
  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (isAnswered || !currentItem) return;

      const elapsedMs = Date.now() - questionStartTimeRef.current;
      const responseTimeSec = Math.max(0.1, elapsedMs / 1000);

      setSelectedOptionId(optionId);
      setIsAnswered(true);

      const isCorrect = optionId === currentItem.correctAnswer;

      // Objective Rating Computation (Anti-Ego SRS)
      let rating: CardRating = "forgot";
      let label = "";

      if (isCorrect) {
        if (responseTimeSec <= 3.5) {
          rating = "mastered";
          label = `⚡ Refleks Cepat (${responseTimeSec.toFixed(1)}s) · Menguasai`;
        } else {
          rating = "unsure";
          label = `⏳ Cukup Ingat (${responseTimeSec.toFixed(1)}s) · Masuk Antrean Review`;
        }
      } else {
        rating = "forgot";
        label = `🚨 Belum Tepat (${responseTimeSec.toFixed(1)}s) · Dijadwalkan Ulang Besok`;
      }

      setAutoRatingInfo({ rating, responseTimeSec, label });

      if (onRateCard) {
        onRateCard(currentItem.card.id, currentItem.card.chapterId, rating);
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
      setAutoRatingInfo(null);
      questionStartTimeRef.current = Date.now();
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
        : currentItem.card.reading || currentItem.card.word;
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
        onGraduateAll={onGraduateAll}
        isWeakSession={isWeakSession}
        onRestart={() => {
          setCurrentIndex(0);
          setSelectedOptionId(null);
          setIsAnswered(false);
          setCorrectCount(0);
          setWrongCount(0);
          setIsFinished(false);
          setAutoRatingInfo(null);
          questionStartTimeRef.current = Date.now();
        }}
        onBackToDashboard={onFinishQuiz || (() => {})}
      />
    );
  }

  if (!currentItem) return null;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* 3-Directional Mode Switcher Tabs */}
      <div className="w-full flex items-center justify-start sm:justify-center gap-1.5 p-1 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border-subtle)] mb-4 text-xs font-bold overflow-x-auto no-scrollbar">
        {[
          { id: "all", label: "🎯 3 Arah JLPT" },
          { id: "moji_goi", label: "🈸 Moji-Goi (Baca)" },
          { id: "dokkai", label: "📖 Dokkai (Arti)" },
          { id: "chokai", label: "🎧 Chokai (Audio)" },
          { id: "cloze", label: "📝 Kalimat" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setQuizDirection(tab.id as QuizDirection);
            }}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap active:scale-95 touch-manipulation ${
              quizDirection === tab.id
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm font-extrabold border border-[var(--border-subtle)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top Header & Progress */}
      <div className="w-full flex items-center justify-between text-xs text-[var(--text-secondary)] mb-3 px-2">
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
      <div className="w-full h-1.5 bg-[var(--surface-secondary)] rounded-full overflow-hidden mb-5">
        <motion.div
          className="h-full bg-[var(--brand-primary)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / quizItems.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Card Box */}
      <div className="w-full p-5 sm:p-7 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-xl mb-5 text-center relative overflow-hidden">
        {/* Direction Badge & Book Number */}
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${currentItem.directionBadge.color}`}>
              <span>{currentItem.directionBadge.label}</span>
            </span>
            {isInterleaved && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 shadow-xs">
                <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />
                <span>Interleave Bab {chapterBadgeMap.get(currentItem.card.chapterId) || currentItem.card.chapterId}</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] font-medium">
              {currentItem.card.partOfSpeech}
            </span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
              #{String(currentItem.card.bookNumber).padStart(4, "0")}
            </span>
          </div>
        </div>

        {/* Question Prompt */}
        <p className="text-xs uppercase font-bold tracking-wider text-[var(--text-tertiary)] mb-3">
          {currentItem.questionText}
        </p>

        {/* Question Display (Word or Cloze Sentence) */}
        <div className="my-2 py-1 flex flex-col items-center justify-center">
          {currentItem.questionDisplay}

          <button
            type="button"
            onClick={speakCurrentWord}
            title="Dengarkan pelafalan audio"
            className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-[var(--text-secondary)] hover:text-[var(--brand-primary)] border border-[var(--border-subtle)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 transition-all active:scale-95"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Putar Suara (TTS)</span>
          </button>
        </div>
      </div>

      {/* 4 Multiple-Choice Options */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
        {currentItem.options.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;
          const isCorrect = opt.id === currentItem.correctAnswer;

          let btnStyle =
            "border-[var(--border-subtle)] bg-[var(--surface-primary)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] hover:shadow-md";

          if (isAnswered) {
            if (isCorrect) {
              btnStyle =
                "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30 font-bold";
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
              className={`p-3.5 sm:p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all active:scale-98 touch-manipulation cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 h-7 rounded-xl bg-[var(--surface-secondary)] flex items-center justify-center font-mono font-bold text-xs text-[var(--text-secondary)] shrink-0">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-snug truncate">{opt.text}</div>
                  {opt.subText && (
                    <div className="text-xs text-[var(--text-tertiary)] font-japanese truncate">
                      {opt.subText}
                    </div>
                  )}
                </div>
              </div>

              {isAnswered && (
                <div className="shrink-0">
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

      {/* Answer Feedback & Anti-Ego SRS Drawer */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className={`w-full p-4 sm:p-5 rounded-3xl border mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg ${
              selectedOptionId === currentItem.correctAnswer
                ? "bg-emerald-500/5 border-emerald-500/30"
                : "bg-rose-500/5 border-rose-500/30"
            }`}
          >
            <div className="space-y-1.5 text-center sm:text-left min-w-0">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                {selectedOptionId === currentItem.correctAnswer ? (
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Jawaban Tepat! (正解)
                  </span>
                ) : (
                  <span className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Belum Tepat (不正解)
                  </span>
                )}

                {/* Anti-Ego Automated Rating Pill */}
                {autoRatingInfo && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      autoRatingInfo.rating === "mastered"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : autoRatingInfo.rating === "unsure"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                    }`}
                  >
                    <span>{autoRatingInfo.label}</span>
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
              className="px-6 py-2.5 rounded-2xl bg-[var(--brand-primary)] hover:opacity-95 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
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
