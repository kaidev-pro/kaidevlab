"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type Variants,
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
  Volume1,
  Hand,
  Bookmark,
  Zap,
} from "lucide-react";
import { TangoN3Card } from "@/data/tango-n3-data";
import { CardRating } from "@/lib/tango-n3-storage";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { TangoSessionSummary } from "@/components/tango-n3/tango-session-summary";
import { triggerHaptic } from "@/lib/haptics";
import { recordUnifiedActivity } from "@/lib/unified-study-storage";

interface TangoFlashcardViewProps {
  cards: TangoN3Card[];
  onRateCard: (cardId: string, chapterId: string, rating: CardRating) => void;
  masteredIds: string[];
  reviewIds: string[];
  starredIds?: string[];
  onToggleStar?: (cardId: string) => void;
  streak: number;
  onFinishSession?: () => void;
  onGraduateAll?: () => void;
  isWeakSession?: boolean;
}

// ==========================================
// Web Audio API Synthesizer (Exact match with FE Study)
// ==========================================
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
        osc.frequency.setValueAtTime(260, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(560, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch {}
    },
    playMastered: () => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const now = ctx.currentTime;
        // Bright 3-note ascending dopamine arpeggio: D5, F#5, A5
        [587.33, 739.99, 880].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          const startTime = now + i * 0.07;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.24, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.38);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.38);
        });
      } catch {}
    },
    playUnsure: () => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const now = ctx.currentTime;
        [440, 493.88].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          const startTime = now + i * 0.07;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.18, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.18);
        });
      } catch {}
    },
    playForgot: () => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(280, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(170, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
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
  onGraduateAll,
  isWeakSession,
}: TangoFlashcardViewProps) {
  const [activeDeck, setActiveDeck] = useState<TangoN3Card[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  const [sessionStats, setSessionStats] = useState({
    mastered: 0,
    review: 0,
    mistakeCards: [] as TangoN3Card[],
  });

  const audioRef = useRef<ReturnType<typeof createAudioFeedback> | null>(null);

  useEffect(() => {
    audioRef.current = createAudioFeedback();
  }, []);

  // Update deck if props change
  useEffect(() => {
    setActiveDeck(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  }, [cards]);

  // Check Web Speech API availability
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechAvailable(true);
    }
  }, []);

  const safeIndex = activeDeck.length > 0 ? Math.min(currentIndex, activeDeck.length - 1) : 0;
  const currentCard = activeDeck[safeIndex];
  const isMastered = currentCard ? masteredIds.includes(currentCard.id) : false;
  const isReview = currentCard ? reviewIds.includes(currentCard.id) : false;
  const isStarred = currentCard ? starredIds.includes(currentCard.id) : false;
  const isLastCard = activeDeck.length > 0 && safeIndex === activeDeck.length - 1;

  // Swipe motion tracking (Exact values from FE Study)
  const x = useMotionValue(0);
  const rotateCard = useTransform(x, [-220, 220], [-14, 14]);
  const rightBadgeOpacity = useTransform(x, [35, 110], [0, 1]);
  const leftBadgeOpacity = useTransform(x, [-35, -110], [0, 1]);

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
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentCard, autoSpeakEnabled, isSessionFinished, speakJapanese]);

  const handleFlip = useCallback(() => {
    triggerHaptic("light");
    if (soundEffects && audioRef.current) {
      audioRef.current.playFlip();
    }
    setIsFlipped((prev) => !prev);
  }, [soundEffects]);

  const handleRate = useCallback(
    (rating: CardRating) => {
      if (!currentCard) return;

      if (rating === "mastered") triggerHaptic("success");
      else if (rating === "unsure") triggerHaptic("warning");
      else triggerHaptic("error");

      recordUnifiedActivity("tango", 1);

      if (soundEffects && audioRef.current) {
        if (rating === "mastered") audioRef.current.playMastered();
        else if (rating === "unsure") audioRef.current.playUnsure();
        else audioRef.current.playForgot();
      }

      onRateCard(currentCard.id, currentCard.chapterId, rating);

      setSessionStats((prev) => ({
        mastered: prev.mastered + (rating === "mastered" ? 1 : 0),
        review: prev.review + (rating === "mastered" ? 0 : 1),
        mistakeCards:
          rating === "mastered"
            ? prev.mistakeCards
            : [...prev.mistakeCards, currentCard],
      }));

      const willRequeue = rating === "forgot";
      if (willRequeue) {
        setActiveDeck((prev) => [...prev, currentCard]);
      }

      if (isLastCard && !willRequeue) {
        setIsSessionFinished(true);
      } else {
        setDirection(1);
        setIsFlipped(false);
        setCurrentIndex((prev) => prev + 1);
      }
      x.set(0);
    },
    [currentCard, isLastCard, onRateCard, onFinishSession, soundEffects, x]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < activeDeck.length - 1) {
      if (soundEffects && audioRef.current) audioRef.current.playFlip();
      setDirection(1);
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
      x.set(0);
    }
  }, [currentIndex, activeDeck.length, soundEffects, x]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      if (soundEffects && audioRef.current) audioRef.current.playFlip();
      setDirection(-1);
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
      x.set(0);
    }
  }, [currentIndex, soundEffects, x]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        setShowFurigana((prev) => !prev);
      } else if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        if (currentCard) speakJapanese(currentCard.word);
      } else if (isFlipped) {
        if (e.key === "1") handleRate("forgot");
        if (e.key === "2") handleRate("unsure");
        if (e.key === "3") handleRate("mastered");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleFlip, handleNext, handlePrev, isFlipped, handleRate, currentCard, speakJapanese]);

  if (isSessionFinished) {
    return (
      <TangoSessionSummary
        totalReviewed={activeDeck.length}
        masteredCount={sessionStats.mastered}
        reviewCount={sessionStats.review}
        streak={streak}
        onGraduateAll={onGraduateAll}
        isWeakSession={isWeakSession}
        onRestart={() => {
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
        onBackToDashboard={() => {
          if (onFinishSession) onFinishSession();
        }}
      />
    );
  }

  if (!currentCard) {
    return (
      <div className="p-12 text-center text-[var(--text-secondary)]">
        <p>Belum ada kartu di modul ini.</p>
      </div>
    );
  }

  // Apple-grade spring transitions for card deck sliding (Exact from FE Study)
  const deckVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.94,
      rotate: dir > 0 ? 3 : -3,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 340,
        damping: 28,
        mass: 0.8,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -110 : 110,
      opacity: 0,
      scale: 0.94,
      rotate: dir > 0 ? -4 : 4,
      transition: {
        duration: 0.22,
        ease: "easeIn",
      },
    }),
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 sm:gap-6 select-none min-w-0 max-w-full">
      {/* Top Controls & Mini Bar */}
      <div className="flex items-center justify-between gap-2 text-xs font-medium text-[var(--text-secondary)]">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-mono text-sm font-semibold text-[var(--text-primary)]">
            {currentIndex + 1} <span className="opacity-40">/ {activeDeck.length}</span>
          </span>
          {streak > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-medium text-[11px] sm:text-xs">
              <Flame size={13} className="fill-amber-500 animate-pulse" />
              <span>{streak}<span className="hidden sm:inline"> Hari</span></span>
            </span>
          )}
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Auto-Speech Toggle */}
          <button
            type="button"
            onClick={() => setAutoSpeakEnabled(!autoSpeakEnabled)}
            className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg border text-[11px] transition-all ${
              autoSpeakEnabled
                ? "border-sky-500 text-sky-500 bg-sky-500/10 font-semibold"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            title="Auto putar audio saat kartu baru muncul"
          >
            <Zap size={13} className={autoSpeakEnabled ? "text-sky-500 fill-sky-500" : ""} />
            <span className="hidden xs:inline">Auto</span>
            <span className="font-bold">{autoSpeakEnabled ? "ON" : "OFF"}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={() => setSoundEffects(!soundEffects)}
            className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg border text-[11px] transition-all ${
              soundEffects
                ? "border-[var(--brand-primary)] text-[var(--brand-primary)] bg-[var(--brand-primary)]/5"
                : "border-[var(--border)] text-[var(--text-secondary)]"
            }`}
            title={soundEffects ? "Efek Suara Aktif (Dopamine SFX)" : "Efek Suara Mati"}
          >
            {soundEffects ? <Volume1 size={13} /> : <VolumeX size={13} />}
            <span className="hidden sm:inline">SFX</span>
          </button>

          {/* Furigana Toggle */}
          <button
            type="button"
            onClick={() => setShowFurigana(!showFurigana)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] hover:border-[var(--brand-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-[11px]"
            title="Toggle Furigana (Cara Baca)"
          >
            {showFurigana ? <Eye size={13} /> : <EyeOff size={13} />}
            <span className="hidden sm:inline">Furigana</span>
          </button>

          {/* Native Japanese Speech Audio */}
          {speechAvailable && (
            <button
              type="button"
              onClick={(e) => speakJapanese(currentCard.word, e)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] hover:border-[var(--brand-primary)] transition-colors text-[11px] ${
                isSpeaking
                  ? "text-[var(--brand-primary)] border-[var(--brand-primary)] animate-pulse"
                  : "text-[var(--text-secondary)]"
              }`}
              title="Dengarkan Pengucapan Asli"
            >
              <Volume2 size={13} />
              <span className="hidden sm:inline">Audio</span>
            </button>
          )}

          {/* Favorite Star */}
          {onToggleStar && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(currentCard.id);
              }}
              className={`p-1.5 rounded-lg border text-[11px] transition-all active:scale-90 ${
                isStarred
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-500 shadow-sm"
                  : "bg-[var(--surface-soft)]/60 border-[var(--border)] text-[var(--text-secondary)] hover:text-amber-500"
              }`}
              title={isStarred ? "Hapus dari Favorit" : "Tandai sebagai Favorit"}
            >
              <Bookmark size={13} className={isStarred ? "fill-amber-500 text-amber-500" : ""} />
            </button>
          )}
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1.5 bg-[var(--surface-soft)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-glow)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / activeDeck.length) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      {/* 3D Flip Card Container with Slide-in Deck Transition */}
      <div
        className="relative w-full h-[350px] sm:h-[395px] md:h-[420px] overflow-x-clip"
        style={{ perspective: "1400px" }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentCard.id}
            custom={direction}
            variants={deckVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full relative"
            style={{ perspective: "1400px" }}
          >
            {/* Swipe Feedback Badges */}
            <motion.div
              style={{ opacity: rightBadgeOpacity }}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 z-40 pointer-events-none px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-lg flex items-center gap-1 rotate-6"
            >
              <CheckCircle2 size={14} /> HAFAL
            </motion.div>

            <motion.div
              style={{ opacity: leftBadgeOpacity }}
              className="absolute top-4 sm:top-5 left-4 sm:left-5 z-40 pointer-events-none px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-lg flex items-center gap-1 -rotate-6"
            >
              <AlertCircle size={14} /> LUPA
            </motion.div>

            {/* Draggable Swiping Container */}
            <motion.div
              className="w-full h-full relative cursor-grab active:cursor-grabbing"
              style={{
                x,
                rotate: rotateCard,
                transformStyle: "preserve-3d",
                touchAction: "pan-y",
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.65}
              onDragEnd={(e, info) => {
                if (info.offset.x > 110) {
                  handleRate("mastered");
                } else if (info.offset.x < -110) {
                  handleRate("forgot");
                }
              }}
              onClick={() => {
                if (Math.abs(x.get()) < 8) {
                  handleFlip();
                }
              }}
            >
              {/* Card 3D Flip Layer with Clean GPU Rotation */}
              <motion.div
                className="w-full h-full relative rounded-2xl"
                animate={{
                  rotateY: isFlipped ? 180 : 0,
                }}
                transition={{
                  duration: 0.44,
                  ease: [0.23, 1, 0.32, 1],
                }}
                style={{
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                }}
              >
                {/* ================= CARD FRONT ================= */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-7 md:p-8 flex flex-col justify-between border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] select-none"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Header: Book Number + Part of Speech + Mastered Tag */}
                  <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                        #{String(currentCard.bookNumber).padStart(4, "0")}
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--surface-soft)] text-[var(--text-secondary)] border border-[var(--border)]">
                        {currentCard.partOfSpeech}
                      </span>
                      {isMastered && (
                        <span className="hidden xs:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium shrink-0">
                          <CheckCircle2 size={11} /> Hafal
                        </span>
                      )}
                      {isReview && !isMastered && (
                        <span className="hidden xs:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-medium shrink-0">
                          <AlertCircle size={11} /> Review
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] font-medium text-[var(--text-secondary)] truncate max-w-[140px] sm:max-w-none">
                      {currentCard.section}
                    </div>
                  </div>

                  {/* Center Content: Term & Furigana (Exact typography from FE Study) */}
                  <div className="flex flex-col items-center justify-center text-center my-auto py-2 sm:py-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-sans leading-normal">
                      <RubyTerm
                        rubyText={currentCard.ruby}
                        fallbackText={currentCard.word}
                        showFurigana={showFurigana}
                      />
                    </h2>

                    {/* Pronunciation Pill */}
                    {speechAvailable && (
                      <button
                        type="button"
                        onClick={(e) => speakJapanese(currentCard.word, e)}
                        className={`mt-2 sm:mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs transition-colors ${
                          isSpeaking
                            ? "text-[var(--brand-primary)] border-[var(--brand-primary)] animate-pulse"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                        title="Dengarkan Pengucapan Asli (A)"
                      >
                        <Volume2 size={13} />
                        <span>Dengar Lafal</span>
                      </button>
                    )}

                    {/* Collocation Teaser (連語) */}
                    {currentCard.collocation && (
                      <div className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] max-w-md w-full text-center">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-[var(--brand-primary)] mb-0.5">
                          連語・コロケーション (Pasangan Kata)
                        </div>
                        <div className="text-xs sm:text-sm font-sans font-medium text-[var(--text-primary)]">
                          <RubyTerm
                            rubyText={currentCard.collocation.jpRuby}
                            fallbackText={currentCard.collocation.jpRuby}
                            showFurigana={showFurigana}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Prompt */}
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-[var(--text-secondary)] pt-3 sm:pt-4 border-t border-[var(--border)]">
                    <span className="inline-flex items-center gap-1.5 opacity-70">
                      <Sparkles size={12} className="text-[var(--brand-primary)]" />
                      Active Recall
                    </span>
                    <span className="opacity-70 flex items-center gap-1">
                      <Hand size={12} className="md:hidden" />
                      <span className="md:hidden">Tap kartu atau swipe ↻</span>
                      <span className="hidden md:inline">Swipe atau Spasi untuk balik ↵</span>
                    </span>
                  </div>
                </div>

                {/* ================= CARD BACK ================= */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-7 md:p-8 flex flex-col justify-between border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] select-none"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Header: Term Info & Audio */}
                  <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b border-[var(--border)] gap-2">
                    <div className="truncate flex items-center gap-1.5 min-w-0">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                        #{String(currentCard.bookNumber).padStart(4, "0")}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-soft)] text-[var(--text-secondary)]">
                        {currentCard.partOfSpeech}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => speakJapanese(currentCard.word, e)}
                        className={`p-1 rounded-md transition-colors shrink-0 ${
                          isSpeaking
                            ? "text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 animate-pulse"
                            : "text-[var(--text-secondary)] hover:text-[var(--brand-primary)] hover:bg-[var(--surface-soft)]"
                        }`}
                        title="Dengarkan Pengucapan Asli"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>

                    <div className="text-[10px] sm:text-xs text-[var(--text-secondary)] font-medium">
                      Penjelasan & Contoh
                    </div>
                  </div>

                  {/* Center Content: Meaning + Collocation + Example */}
                  <div className="flex flex-col gap-2.5 sm:gap-3 my-auto overflow-y-auto pr-1 py-1 max-h-[230px] sm:max-h-none">
                    {/* Indonesian Meaning */}
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold text-[var(--brand-primary)] font-sans leading-snug">
                        {currentCard.meaningId}
                      </h3>
                      {currentCard.meaningEn && (
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5 italic">
                          {currentCard.meaningEn}
                        </p>
                      )}
                    </div>

                    {/* Collocation Box (連語) */}
                    {currentCard.collocation && (
                      <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] shadow-xs text-left">
                        <p className="text-[10px] sm:text-[11px] font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Sparkles size={12} />
                          Pasangan Kata Wajib (連語):
                        </p>
                        <div className="text-xs sm:text-sm font-sans font-semibold text-[var(--text-primary)]">
                          <RubyTerm
                            rubyText={currentCard.collocation.jpRuby}
                            fallbackText={currentCard.collocation.jpRuby}
                            showFurigana={true}
                          />
                        </div>
                        <div className="text-[11px] sm:text-xs text-[var(--text-secondary)] mt-0.5">
                          → {currentCard.collocation.meaningId}
                        </div>
                      </div>
                    )}

                    {/* Example Sentence (例文) */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] shadow-xs text-left">
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-[var(--brand-primary)] mb-1">
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          <span>例文 (Contoh Kalimat Resmi):</span>
                        </span>
                        {speechAvailable && (
                          <button
                            type="button"
                            onClick={(e) => speakJapanese(currentCard.exampleSentence.jpRuby, e)}
                            title="Dengarkan kalimat"
                            className="text-xs text-[var(--text-secondary)] hover:text-[var(--brand-primary)] p-0.5"
                          >
                            <Volume2 size={12} />
                          </button>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm font-sans text-[var(--text-primary)] leading-relaxed">
                        <RubyTerm
                          rubyText={currentCard.exampleSentence.jpRuby}
                          fallbackText={currentCard.exampleSentence.jpRuby}
                          showFurigana={true}
                        />
                      </div>
                      <div className="text-[11px] sm:text-xs text-[var(--text-secondary)] mt-1 pt-1 border-t border-[var(--border)]">
                        {currentCard.exampleSentence.meaningId}
                      </div>
                    </div>

                    {/* References (類 / 対 / 関 / 派) */}
                    {currentCard.references && currentCard.references.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {currentCard.references.map((ref, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)]"
                          >
                            <span
                              className={`font-bold px-1 rounded text-[9px] ${
                                ref.label === "対"
                                  ? "bg-rose-500/10 text-rose-500"
                                  : ref.label === "類"
                                  ? "bg-emerald-500/10 text-emerald-500"
                                  : "bg-sky-500/10 text-sky-500"
                              }`}
                            >
                              {ref.label}
                            </span>
                            <span className="font-sans font-medium text-[var(--text-primary)]">
                              {ref.word}
                            </span>
                            <span className="text-[var(--text-secondary)] opacity-75">
                              ({ref.meaningId})
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Usage Note */}
                    {currentCard.usageNote && (
                      <div className="text-[10px] sm:text-[11px] text-[var(--text-secondary)] bg-blue-500/5 border-l-2 border-blue-500 pl-2.5 py-1">
                        <span className="font-semibold text-blue-500 mr-1.5">Catatan:</span>
                        {currentCard.usageNote}
                      </div>
                    )}
                  </div>

                  {/* Footer Notice */}
                  <div className="text-center text-[10px] sm:text-[11px] text-[var(--text-secondary)] opacity-60 pt-2 border-t border-[var(--border)]">
                    <span className="md:hidden">Pilih rating di bawah atau swipe</span>
                    <span className="hidden md:inline">Beri penilaian (1: Lupa, 2: Ragu, 3: Kuasai)</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rating & Navigation Control Bar (Exact match with FE Study) */}
      <div className="flex flex-col gap-3">
        {isFlipped ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-2 sm:gap-3"
          >
            <button
              type="button"
              onClick={() => handleRate("forgot")}
              className="group flex flex-col items-center justify-center min-h-[50px] p-2.5 sm:p-3 rounded-xl border border-rose-500/30 hover:border-rose-500 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <div className="flex items-center gap-1 font-bold text-xs sm:text-sm">
                <AlertCircle size={15} /> Lupa
              </div>
              <span className="text-[10px] opacity-75 mt-0.5">Ulangi <span className="hidden md:inline">(1)</span></span>
            </button>

            <button
              type="button"
              onClick={() => handleRate("unsure")}
              className="group flex flex-col items-center justify-center min-h-[50px] p-2.5 sm:p-3 rounded-xl border border-amber-500/30 hover:border-amber-500 bg-amber-500/5 hover:bg-amber-500/10 text-amber-500 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <div className="flex items-center gap-1 font-bold text-xs sm:text-sm">
                <HelpCircle size={15} /> Ragu
              </div>
              <span className="text-[10px] opacity-75 mt-0.5">Belum yakin <span className="hidden md:inline">(2)</span></span>
            </button>

            <button
              type="button"
              onClick={() => handleRate("mastered")}
              className="group flex flex-col items-center justify-center min-h-[50px] p-2.5 sm:p-3 rounded-xl border border-emerald-500/30 hover:border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-500 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <div className="flex items-center gap-1 font-bold text-xs sm:text-sm">
                <CheckCircle2 size={15} /> Kuasai!
              </div>
              <span className="text-[10px] opacity-75 mt-0.5">Sudah hafal <span className="hidden md:inline">(3)</span></span>
            </button>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shrink-0 cursor-pointer"
              title="Kartu Sebelumnya"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            <button
              type="button"
              onClick={handleFlip}
              className="flex-1 max-w-[240px] inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Balik Kartu</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white/90">Space</kbd>
            </button>

            <button
              type="button"
              onClick={isLastCard ? () => setIsSessionFinished(true) : handleNext}
              className={`inline-flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 shrink-0 cursor-pointer ${
                isLastCard
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                  : "border-[var(--border)] hover:border-[var(--brand-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              title={isLastCard ? "Selesaikan Sesi" : "Kartu Berikutnya"}
            >
              <span className="hidden sm:inline">{isLastCard ? "Selesai" : "Berikutnya"}</span>
              {isLastCard ? <CheckCircle2 size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
