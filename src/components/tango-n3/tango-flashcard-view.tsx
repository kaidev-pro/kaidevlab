"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  RotateCcw,
  Sparkles,
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Flame,
  Star,
  BookOpen,
  VolumeX,
  Zap,
} from "lucide-react";
import { TangoN3Card } from "@/data/tango-n3-data";
import { CardRating } from "@/lib/tango-n3-storage";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { TangoSessionSummary } from "@/components/tango-n3/tango-session-summary";

interface TangoFlashcardViewProps {
  cards: TangoN3Card[];
  onRateCard: (cardId: string, chapterId: string, rating: CardRating) => void;
  masteredIds: string[];
  reviewIds: string[];
  starredIds?: string[];
  onToggleStar?: (cardId: string) => void;
  streak: number;
  onFinishSession?: () => void;
}

function createAudioFeedback() {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  const ctx = new AudioCtx();

  return {
    playFlip: () => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      } catch {}
    },
    playSwoosh: (pitch: number = 300) => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(pitch, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } catch {}
    },
    playMastered: () => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + i * 0.04);
          gain.gain.setValueAtTime(0.14, now + i * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.04);
          osc.stop(now + i * 0.04 + 0.22);
        });
      } catch {}
    },
    playReview: () => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.16, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } catch {}
    },
  };
}

export function TangoFlashcardView({
  cards,
  onRateCard,
  masteredIds,
  reviewIds,
  starredIds = [],
  onToggleStar,
  streak,
  onFinishSession,
}: TangoFlashcardViewProps) {
  const [activeDeck, setActiveDeck] = useState<TangoN3Card[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | "prev" | "next" | null>(null);

  const [sessionStats, setSessionStats] = useState<{
    mastered: number;
    review: number;
    mistakeCards: TangoN3Card[];
  }>({ mastered: 0, review: 0, mistakeCards: [] });
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  useEffect(() => {
    setActiveDeck(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
    setSessionStats({ mastered: 0, review: 0, mistakeCards: [] });
    setExitDirection(null);
  }, [cards]);

  const audioRef = useRef<ReturnType<typeof createAudioFeedback> | null>(null);

  useEffect(() => {
    audioRef.current = createAudioFeedback();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechAvailable(true);
    }
  }, []);

  const currentCard = activeDeck[currentIndex];
  const nextCard = currentIndex < activeDeck.length - 1 ? activeDeck[currentIndex + 1] : null;
  const isMastered = currentCard ? masteredIds.includes(currentCard.id) : false;
  const isNeedsReview = currentCard ? reviewIds.includes(currentCard.id) : false;
  const isStarred = currentCard ? starredIds.includes(currentCard.id) : false;

  const dragX = useMotionValue(0);
  const rotateCard = useTransform(dragX, [-220, 0, 220], [-14, 0, 14]);
  const opacityRight = useTransform(dragX, [20, 100], [0, 1]);
  const opacityLeft = useTransform(dragX, [-100, -20], [1, 0]);

  // Speech TTS Function
  const speakJapanese = useCallback(
    (text: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!speechAvailable || typeof window === "undefined") return;

      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\[([^:]+):[^\]]+\]/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;

      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find((v) => v.lang === "ja-JP" || v.lang.startsWith("ja"));
      if (jaVoice) utterance.voice = jaVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [speechAvailable]
  );

  // Auto-speak when new card appears if enabled
  useEffect(() => {
    if (autoSpeakEnabled && currentCard && !isSessionFinished) {
      const timer = setTimeout(() => {
        speakJapanese(currentCard.word);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentCard, autoSpeakEnabled, isSessionFinished, speakJapanese]);

  const handleFlip = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.playFlip();
    }
    setIsFlipped((prev) => !prev);
  }, [soundEnabled]);

  const handleRate = useCallback(
    (rating: CardRating) => {
      if (!currentCard) return;

      const isMasteredRating = rating === "mastered";
      const dir: "left" | "right" = isMasteredRating ? "right" : "left";
      setExitDirection(dir);

      if (soundEnabled && audioRef.current) {
        if (isMasteredRating) audioRef.current.playMastered();
        else audioRef.current.playReview();
      }

      onRateCard(currentCard.id, currentCard.chapterId, rating);

      setSessionStats((prev) => ({
        mastered: prev.mastered + (isMasteredRating ? 1 : 0),
        review: prev.review + (isMasteredRating ? 0 : 1),
        mistakeCards: isMasteredRating
          ? prev.mistakeCards
          : [...prev.mistakeCards, currentCard],
      }));

      // Smooth exit delay before switching to next card
      setTimeout(() => {
        setIsFlipped(false);
        setExitDirection(null);
        if (currentIndex < activeDeck.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setIsSessionFinished(true);
        }
      }, 160);
    },
    [currentCard, currentIndex, activeDeck.length, onRateCard, soundEnabled]
  );

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setExitDirection("prev");
      if (soundEnabled && audioRef.current) audioRef.current.playSwoosh(260);
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setExitDirection(null);
      }, 140);
    }
  }, [currentIndex, soundEnabled]);

  const handleNext = useCallback(() => {
    if (currentIndex < activeDeck.length - 1) {
      setExitDirection("next");
      if (soundEnabled && audioRef.current) audioRef.current.playSwoosh(360);
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setExitDirection(null);
      }, 140);
    }
  }, [currentIndex, activeDeck.length, soundEnabled]);

  // Keyboard Shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        handleFlip();
      } else if (e.key === "1") {
        e.preventDefault();
        handleRate("forgot");
      } else if (e.key === "2") {
        e.preventDefault();
        handleRate("unsure");
      } else if (e.key === "3") {
        e.preventDefault();
        handleRate("mastered");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        setShowFurigana((prev) => !prev);
      } else if (e.key.toLowerCase() === "a" && currentCard) {
        e.preventDefault();
        speakJapanese(currentCard.word);
      } else if (e.key.toLowerCase() === "s" && currentCard && onToggleStar) {
        e.preventDefault();
        onToggleStar(currentCard.id);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleFlip, handleRate, handlePrev, handleNext, currentCard, onToggleStar, speakJapanese]);

  if (isSessionFinished || !currentCard) {
    return (
      <TangoSessionSummary
        totalReviewed={activeDeck.length}
        masteredCount={sessionStats.mastered}
        reviewCount={sessionStats.review}
        streak={streak}
        onRestart={() => {
          setActiveDeck(cards);
          setCurrentIndex(0);
          setIsFlipped(false);
          setIsSessionFinished(false);
          setSessionStats({ mastered: 0, review: 0, mistakeCards: [] });
        }}
        onReviewMistakes={
          sessionStats.mistakeCards.length > 0
            ? () => {
                setActiveDeck(sessionStats.mistakeCards);
                setCurrentIndex(0);
                setIsFlipped(false);
                setIsSessionFinished(false);
                setSessionStats({ mastered: 0, review: 0, mistakeCards: [] });
              }
            : undefined
        }
        onBackToDashboard={onFinishSession || (() => {})}
      />
    );
  }

  // Animation variants for smooth card transition
  const cardMotionVariants = {
    initial: (dir: string | null) => ({
      x: dir === "prev" ? -280 : 0,
      scale: 0.94,
      y: 12,
      opacity: 0,
    }),
    animate: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 340,
        damping: 26,
      },
    },
    exit: (dir: string | null) => ({
      x: dir === "right" ? 400 : dir === "left" ? -400 : dir === "prev" ? 280 : -280,
      rotate: dir === "right" ? 18 : dir === "left" ? -18 : 0,
      opacity: 0,
      scale: 0.92,
      transition: {
        duration: 0.22,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Top Utility Bar */}
      <div className="w-full flex items-center justify-between gap-3 mb-4 px-2 text-xs text-[var(--text-secondary)]">
        {/* Progress Counter & Streak */}
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[var(--text-primary)] text-sm">
            {currentIndex + 1}
          </span>
          <span>/</span>
          <span>{activeDeck.length}</span>

          {streak > 0 && (
            <span className="flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{streak} Hari</span>
            </span>
          )}
        </div>

        {/* Action Toggles: Auto-Audio, Furigana, Star, Sound */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Auto-Speech Toggle */}
          <button
            onClick={() => setAutoSpeakEnabled(!autoSpeakEnabled)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
              autoSpeakEnabled
                ? "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400"
                : "border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            }`}
            title="Otomatis putar audio saat kartu baru muncul"
          >
            <Zap className="w-3 h-3" />
            <span>Auto-Lafal {autoSpeakEnabled ? "ON" : "OFF"}</span>
          </button>

          {/* Furigana Toggle */}
          <button
            onClick={() => setShowFurigana((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
              showFurigana
                ? "bg-[var(--brand-primary)]/10 border-[var(--brand-primary)]/30 text-[var(--brand-primary)]"
                : "border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            }`}
            title="Aktif/Nonaktifkan Furigana (F)"
          >
            {showFurigana ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>Furigana</span>
          </button>

          {/* Favorite Star */}
          {onToggleStar && (
            <button
              onClick={() => onToggleStar(currentCard.id)}
              className={`p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] transition-colors ${
                isStarred ? "text-yellow-500 bg-yellow-500/10" : "text-[var(--text-tertiary)]"
              }`}
              title="Tandai Favorit (S)"
            >
              <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-yellow-500" : ""}`} />
            </button>
          )}

          {/* Sound FX Toggle */}
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            title={soundEnabled ? "Nonaktifkan Efek Suara" : "Aktifkan Efek Suara"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[var(--surface-secondary)] rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-[var(--brand-primary)] transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / activeDeck.length) * 100}%` }}
        />
      </div>

      {/* FLASHCARD CONTAINER WITH 3D DECK STACK & SWIPE */}
      <div
        className="w-full relative h-[480px] sm:h-[510px] select-none"
        style={{ perspective: "1400px" }}
      >
        {/* Background Deck Stack: Card Underneath */}
        {nextCard && (
          <div className="absolute inset-0 w-full h-full rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-primary)]/80 scale-[0.95] translate-y-3.5 -z-10 shadow-lg pointer-events-none opacity-60 flex flex-col justify-between p-6 sm:p-8 transition-transform">
            <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] opacity-40">
              <span className="font-mono">#{String(nextCard.bookNumber).padStart(4, "0")}</span>
              <span>{nextCard.partOfSpeech}</span>
            </div>
            <div className="text-center font-bold text-3xl sm:text-4xl text-[var(--text-tertiary)] opacity-30 font-japanese">
              {nextCard.word}
            </div>
            <div className="text-center text-[11px] text-[var(--text-tertiary)] opacity-35 font-mono">
              Berikutnya di dek →
            </div>
          </div>
        )}

        {/* Active Animated Flashcard */}
        <AnimatePresence mode="popLayout" custom={exitDirection}>
          <motion.div
            key={currentCard.id}
            custom={exitDirection}
            variants={cardMotionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full relative cursor-grab active:cursor-grabbing"
            style={{
              x: dragX,
              rotate: rotateCard,
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              touchAction: "pan-y",
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.65}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) {
                handleRate("mastered");
              } else if (info.offset.x < -100) {
                handleRate("forgot");
              }
            }}
            onClick={() => {
              if (Math.abs(dragX.get()) < 8) {
                handleFlip();
              }
            }}
          >
            {/* Swipe Indicators on Drag */}
            <motion.div
              style={{ opacity: opacityRight }}
              className="absolute top-6 left-6 z-40 pointer-events-none px-4 py-2 rounded-2xl bg-emerald-500 text-white font-bold text-sm shadow-xl flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>✓ SUDAH HAFAL</span>
            </motion.div>
            <motion.div
              style={{ opacity: opacityLeft }}
              className="absolute top-6 right-6 z-40 pointer-events-none px-4 py-2 rounded-2xl bg-rose-500 text-white font-bold text-sm shadow-xl flex items-center gap-1.5"
            >
              <AlertCircle className="w-5 h-5" />
              <span>↺ ULANGI (LUPA)</span>
            </motion.div>

            {/* 3D Flip Layer */}
            <motion.div
              className="w-full h-full relative rounded-3xl"
              animate={{
                rotateY: isFlipped ? 180 : 0,
              }}
              transition={{
                duration: 0.38,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
            >
              {/* FRONT OF CARD */}
              <div
                className={`absolute inset-0 w-full h-full p-6 sm:p-8 rounded-3xl flex flex-col justify-between border shadow-2xl bg-[var(--surface-primary)] select-none ${
                  isMastered
                    ? "border-emerald-500/40 ring-1 ring-emerald-500/20"
                    : isNeedsReview
                    ? "border-amber-500/40 ring-1 ring-amber-500/20"
                    : "border-[var(--border-subtle)]"
                }`}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {/* Header: Book No, Part of Speech, Chapter */}
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                      #{String(currentCard.bookNumber).padStart(4, "0")}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                      {currentCard.partOfSpeech}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[var(--text-tertiary)] truncate max-w-[200px]">
                    {currentCard.section}
                  </span>
                </div>

                {/* Center: Main Word & Audio Button */}
                <div className="my-auto py-4 text-center flex flex-col items-center justify-center">
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
                    <RubyTerm
                      rubyText={currentCard.ruby}
                      fallbackText={currentCard.word}
                      showFurigana={showFurigana}
                      className="font-japanese"
                    />
                  </div>

                  {/* Japanese Native Pronounce Button */}
                  {speechAvailable && (
                    <button
                      onClick={(e) => speakJapanese(currentCard.word, e)}
                      title="Dengarkan pelafalan asli (A)"
                      className={`mt-2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        isSpeaking
                          ? "border-sky-500 text-sky-500 bg-sky-50 dark:bg-sky-950/30 animate-pulse"
                          : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] bg-[var(--surface-secondary)]"
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengar Pelafalan (音声)</span>
                    </button>
                  )}

                  {/* Collocation Teaser */}
                  {currentCard.collocation && (
                    <div className="mt-6 px-4 py-2.5 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-subtle)] max-w-md w-full">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-[var(--brand-primary)] mb-1">
                        連語・コロケーション (Pasangan Kata)
                      </div>
                      <div className="text-sm font-japanese text-[var(--text-primary)] font-medium">
                        <RubyTerm
                          rubyText={currentCard.collocation.jpRuby}
                          fallbackText={currentCard.collocation.jpRuby}
                          showFurigana={showFurigana}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom: Hint to Flip */}
                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                  <span>Swipe kanan: Hafal / kiri: Lupa</span>
                  <span className="flex items-center gap-1 text-[var(--brand-primary)] font-semibold">
                    Ketuk kartu untuk melihat arti →
                  </span>
                </div>
              </div>

              {/* BACK OF CARD */}
              <div
                className="absolute inset-0 w-full h-full p-6 sm:p-8 rounded-3xl flex flex-col justify-between border shadow-2xl bg-[var(--surface-primary)] border-[var(--brand-primary)]/40 ring-1 ring-[var(--brand-primary)]/20 select-none overflow-y-auto"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  WebkitTransform: "rotateY(180deg)",
                }}
              >
                {/* Header Back */}
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                      #{String(currentCard.bookNumber).padStart(4, "0")}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
                      {currentCard.partOfSpeech}
                    </span>
                  </div>
                  <button
                    onClick={(e) => speakJapanese(currentCard.word, e)}
                    className="flex items-center gap-1 text-xs text-[var(--brand-primary)] hover:underline font-medium"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Lafal Audio</span>
                  </button>
                </div>

                {/* Content Details */}
                <div className="my-auto py-2 space-y-3.5">
                  {/* Word & Indonesian Meaning */}
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-japanese mb-1">
                      <RubyTerm
                        rubyText={currentCard.ruby}
                        fallbackText={currentCard.word}
                        showFurigana={true}
                      />
                    </div>
                    <div className="text-lg font-bold text-[var(--brand-primary)] leading-snug">
                      {currentCard.meaningId}
                    </div>
                    <div className="text-xs text-[var(--text-tertiary)] italic">
                      {currentCard.meaningEn}
                    </div>
                  </div>

                  {/* Collocation Box (連語) */}
                  {currentCard.collocation && (
                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-left">
                      <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-[10px]">連語</span>
                        <span>Pasangan Kata Wajib (Collocation):</span>
                      </div>
                      <div className="text-sm font-japanese font-semibold text-[var(--text-primary)]">
                        <RubyTerm
                          rubyText={currentCard.collocation.jpRuby}
                          fallbackText={currentCard.collocation.jpRuby}
                          showFurigana={true}
                        />
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                        → {currentCard.collocation.meaningId}
                      </div>
                    </div>
                  )}

                  {/* Example Sentence (例文) */}
                  <div className="p-3 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-left">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[var(--brand-primary)] mb-1">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>例文 (Contoh Kalimat Resmi):</span>
                      </span>
                      {speechAvailable && (
                        <button
                          onClick={(e) => speakJapanese(currentCard.exampleSentence.jpRuby, e)}
                          title="Dengarkan kalimat"
                          className="text-xs text-[var(--text-secondary)] hover:text-[var(--brand-primary)] p-0.5"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="text-sm font-japanese text-[var(--text-primary)] leading-relaxed">
                      <RubyTerm
                        rubyText={currentCard.exampleSentence.jpRuby}
                        fallbackText={currentCard.exampleSentence.jpRuby}
                        showFurigana={true}
                      />
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] mt-1 pt-1 border-t border-[var(--border-subtle)]">
                      {currentCard.exampleSentence.meaningId}
                    </div>
                  </div>

                  {/* References (類 / 対 / 関 / 派) */}
                  {currentCard.references && currentCard.references.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {currentCard.references.map((ref, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)]"
                        >
                          <span
                            className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                              ref.label === "対"
                                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                : ref.label === "類"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                            }`}
                          >
                            {ref.label}
                          </span>
                          <span className="font-japanese font-medium text-[var(--text-primary)]">
                            {ref.word}
                          </span>
                          <span className="text-[var(--text-tertiary)]">({ref.meaningId})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Usage Note */}
                  {currentCard.usageNote && (
                    <div className="text-[11px] text-[var(--text-secondary)] bg-blue-500/5 border-l-2 border-blue-500 pl-2.5 py-1">
                      💡 {currentCard.usageNote}
                    </div>
                  )}
                </div>

                {/* Bottom info */}
                <div className="pt-2 text-center text-xs text-[var(--text-tertiary)]">
                  Pilih tingkat pemahamanmu di bawah untuk lanjut ke kartu berikutnya
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rating Response Buttons */}
      <div className="w-full grid grid-cols-3 gap-2.5 sm:gap-3 mt-5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRate("forgot");
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-semibold transition-all active:scale-95 shadow-2xs"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div className="text-center sm:text-left">
            <div className="text-xs sm:text-sm font-bold">Lupa / Belum</div>
            <div className="text-[10px] opacity-75 font-normal">Tekan [1] · Review</div>
          </div>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRate("unsure");
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-semibold transition-all active:scale-95 shadow-2xs"
        >
          <HelpCircle className="w-5 h-5 shrink-0" />
          <div className="text-center sm:text-left">
            <div className="text-xs sm:text-sm font-bold">Ragu-ragu</div>
            <div className="text-[10px] opacity-75 font-normal">Tekan [2] · Ulangi</div>
          </div>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRate("mastered");
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold transition-all active:scale-95 shadow-2xs"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div className="text-center sm:text-left">
            <div className="text-xs sm:text-sm font-bold">Sudah Hafal!</div>
            <div className="text-[10px] opacity-75 font-normal">Tekan [3] · Paham</div>
          </div>
        </button>
      </div>

      {/* Prev / Next Bottom Controls */}
      <div className="w-full flex items-center justify-between mt-4 px-2 text-xs text-[var(--text-secondary)]">
        <button
          disabled={currentIndex === 0}
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-[var(--text-tertiary)]">
          <span>Shortcuts:</span>
          <kbd className="px-1.5 py-0.5 bg-[var(--surface-secondary)] border border-[var(--border-subtle)] rounded text-[10px]">
            Space
          </kbd>
          <span>Balik</span>
          <kbd className="px-1.5 py-0.5 bg-[var(--surface-secondary)] border border-[var(--border-subtle)] rounded text-[10px]">
            1 / 2 / 3
          </kbd>
          <span>Nilai</span>
          <kbd className="px-1.5 py-0.5 bg-[var(--surface-secondary)] border border-[var(--border-subtle)] rounded text-[10px]">
            A
          </kbd>
          <span>Audio</span>
        </div>

        <button
          disabled={currentIndex === activeDeck.length - 1}
          onClick={handleNext}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <span>Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
