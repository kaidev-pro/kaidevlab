"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, type Variants } from "framer-motion";
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
  ChevronDown,
  Flame,
  Star,
  BookOpen,
  VolumeX,
  Volume1,
  Hand,
  Bookmark,
} from "lucide-react";
import { FECard, CATEGORY_LABELS } from "@/data/fe-study-data";
import { CardRating } from "@/lib/fe-study-storage";
import { RubyTerm } from "@/components/fe-study/ruby-term";

interface FlashcardViewProps {
  cards: FECard[];
  onRateCard: (cardId: string, category: string, rating: CardRating) => void;
  masteredIds: string[];
  reviewIds: string[];
  starredIds?: string[];
  onToggleStar?: (cardId: string) => void;
  streak: number;
  onFinishSession?: () => void;
}

// ==========================================
// Web Audio API Synthesizer (Zero asset dependency)
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
        gain.gain.setValueAtTime(0.20, ctx.currentTime);
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
        gain.gain.setValueAtTime(0.20, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } catch {}
    },
  };
}

export function FlashcardView({
  cards,
  onRateCard,
  masteredIds,
  reviewIds,
  starredIds = [],
  onToggleStar,
  streak,
  onFinishSession,
}: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [showAnalogy, setShowAnalogy] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Reset analogy state whenever card changes
  useEffect(() => {
    setShowAnalogy(false);
  }, [currentIndex]);

  const audioRef = useRef<ReturnType<typeof createAudioFeedback> | null>(null);

  useEffect(() => {
    audioRef.current = createAudioFeedback();
  }, []);

  const currentCard = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;

  // Swipe motion tracking
  const x = useMotionValue(0);
  const rotateCard = useTransform(x, [-220, 220], [-14, 14]);
  const rightBadgeOpacity = useTransform(x, [35, 110], [0, 1]);
  const leftBadgeOpacity = useTransform(x, [-35, -110], [0, 1]);
  const handleFlip = useCallback(() => {
    if (soundEffects && audioRef.current) {
      audioRef.current.playFlip();
    }
    setIsFlipped((prev) => !prev);
  }, [soundEffects]);

  const handleRate = useCallback(
    (rating: CardRating) => {
      if (!currentCard) return;

      if (soundEffects && audioRef.current) {
        if (rating === "mastered") audioRef.current.playMastered();
        else if (rating === "unsure") audioRef.current.playUnsure();
        else audioRef.current.playForgot();
      }

      onRateCard(currentCard.id, currentCard.category, rating);

      if (isLastCard) {
        if (onFinishSession) onFinishSession();
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
    if (currentIndex < cards.length - 1) {
      if (soundEffects && audioRef.current) audioRef.current.playFlip();
      setDirection(1);
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
      x.set(0);
    }
  }, [currentIndex, cards.length, soundEffects, x]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      if (soundEffects && audioRef.current) audioRef.current.playFlip();
      setDirection(-1);
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
      x.set(0);
    }
  }, [currentIndex, soundEffects, x]);

  // Audio pronunciation via Web Speech API
  const speakJapanese = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

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
      } else if (isFlipped) {
        if (e.key === "1") handleRate("forgot");
        if (e.key === "2") handleRate("unsure");
        if (e.key === "3") handleRate("mastered");
        if (e.key === "a" || e.key === "A") {
          e.preventDefault();
          setShowAnalogy((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleFlip, handleNext, handlePrev, isFlipped, handleRate]);

  if (!currentCard) {
    return (
      <div className="p-12 text-center">
        <p>Belum ada kartu di modul ini.</p>
      </div>
    );
  }

  const categoryMeta = CATEGORY_LABELS[currentCard.category];
  const isMastered = masteredIds.includes(currentCard.id);
  const isReview = reviewIds.includes(currentCard.id);
  const isStarred = starredIds?.includes(currentCard.id) ?? false;

  // Apple-grade spring transitions for card deck sliding
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
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 select-none">
      {/* Top Controls & Mini Bar */}
      <div className="flex items-center justify-between gap-4 text-xs font-medium text-[var(--text-secondary)]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-[var(--text-primary)]">
            {currentIndex + 1} <span className="opacity-40">/ {cards.length}</span>
          </span>
          {streak > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-medium">
              <Flame size={13} className="fill-amber-500 animate-pulse" />
              {streak} Hari
            </span>
          )}
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2">
          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={() => setSoundEffects(!soundEffects)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
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
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] hover:border-[var(--brand-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            title="Toggle Furigana (Cara Baca)"
          >
            {showFurigana ? <Eye size={13} /> : <EyeOff size={13} />}
            <span className="hidden sm:inline">Furigana</span>
          </button>

          {/* Japanese Speech Audio */}
          <button
            type="button"
            onClick={() => speakJapanese(currentCard.termJp)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] hover:border-[var(--brand-primary)] transition-colors ${
              isSpeaking
                ? "text-[var(--brand-primary)] border-[var(--brand-primary)] animate-pulse"
                : "text-[var(--text-secondary)]"
            }`}
            title="Dengarkan Pengucapan Jepang (Native AI TTS)"
          >
            <Volume2 size={13} />
            <span className="hidden sm:inline">Audio</span>
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1.5 bg-[var(--surface-soft)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-glow)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      {/* 3D Flip Card Container with Slide-in Deck Transition */}
      <div
        className="relative w-full h-[365px] sm:h-[410px] overflow-visible"
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
              <CheckCircle2 size={14} /> KUASAI
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
                  className="absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-7 md:p-9 flex flex-col justify-between border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)]"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Header: Category + Importance */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <span
                        className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-medium truncate max-w-[190px] sm:max-w-none"
                        style={{
                          backgroundColor: `${categoryMeta.color}18`,
                          color: categoryMeta.color,
                        }}
                      >
                        {categoryMeta.nameJp} · {currentCard.subCategory}
                      </span>
                      {isMastered && (
                        <span className="hidden xs:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium shrink-0">
                          <CheckCircle2 size={11} /> Mastered
                        </span>
                      )}
                      {isReview && !isMastered && (
                        <span className="hidden xs:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-medium shrink-0">
                          <AlertCircle size={11} /> Review
                        </span>
                      )}
                    </div>

                    {/* Action & Priority Stars */}
                    <div className="flex items-center gap-2 shrink-0">
                      {onToggleStar && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleStar(currentCard.id);
                          }}
                          className={`p-1.5 rounded-lg border transition-all active:scale-90 flex items-center justify-center ${
                            isStarred
                              ? "bg-amber-500/15 border-amber-500/40 text-amber-500 shadow-sm"
                              : "bg-[var(--surface-soft)]/60 border-[var(--border)] text-[var(--text-secondary)] hover:text-amber-500"
                          }`}
                          title={isStarred ? "Hapus dari Kartu Favorit" : "Tandai sebagai Kartu Favorit"}
                        >
                          <Bookmark size={13} className={isStarred ? "fill-amber-500 text-amber-500" : ""} />
                        </button>
                      )}

                      {/* Priority Stars */}
                      <div
                        className="flex items-center gap-0.5 text-amber-400 shrink-0"
                        title={`Prioritas: ${currentCard.importance} / 3`}
                      >
                        {Array.from({ length: currentCard.importance }).map((_, i) => (
                          <Star key={i} size={12} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Content: Term & Furigana */}
                  <div className="flex flex-col items-center justify-center text-center my-auto py-2 sm:py-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans leading-normal">
                      <RubyTerm
                        rubyText={currentCard.ruby}
                        fallbackText={currentCard.termJp}
                        showFurigana={showFurigana}
                      />
                    </h2>

                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[var(--text-secondary)] font-medium">
                      {currentCard.termEn}
                    </p>
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
                  className="absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-7 md:p-9 flex flex-col justify-between border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)]"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Header: Term Info */}
                  <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-[var(--border)] gap-2">
                    <div className="truncate flex items-center gap-1.5 min-w-0">
                      <span className="text-xs font-semibold text-[var(--brand-primary)] truncate">
                        {currentCard.termJp}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] truncate">
                        ({currentCard.termEn})
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakJapanese(currentCard.termJp);
                        }}
                        className={`p-1 rounded-md transition-colors shrink-0 ${
                          isSpeaking
                            ? "text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 animate-pulse"
                            : "text-[var(--text-secondary)] hover:text-[var(--brand-primary)] hover:bg-[var(--surface-soft)]"
                        }`}
                        title="Dengarkan Pengucapan Jepang"
                      >
                        <Volume2 size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {onToggleStar && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleStar(currentCard.id);
                          }}
                          className={`p-1 rounded-lg border text-[11px] transition-all active:scale-90 ${
                            isStarred
                              ? "bg-amber-500/15 border-amber-500/40 text-amber-500"
                              : "border-[var(--border)] text-[var(--text-secondary)] hover:text-amber-500"
                          }`}
                          title={isStarred ? "Kartu Favorit" : "Tandai Favorit"}
                        >
                          <Bookmark size={12} className={isStarred ? "fill-amber-500 text-amber-500" : ""} />
                        </button>
                      )}
                      <span className="text-[10px] sm:text-xs text-[var(--text-secondary)]">Penjelasan</span>
                    </div>
                  </div>

                  {/* Center Back: Explanation + Key Diff + Collapsible Analogy */}
                  <div className="flex flex-col gap-2.5 sm:gap-3 my-auto overflow-y-auto pr-1 py-1 max-h-[240px] sm:max-h-none">
                    <div>
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-secondary)] font-bold mb-1">
                        Definisi Inti
                      </p>
                      <p className="text-xs sm:text-sm md:text-[15px] text-[var(--text-primary)] leading-relaxed font-sans">
                        {currentCard.definitionId}
                      </p>
                    </div>

                    {/* Kata Kunci Ujian FE */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] shadow-xs">
                      <p className="text-[10px] sm:text-[11px] font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <BookOpen size={12} />
                        Kata Kunci Ujian FE (キーワード)
                      </p>
                      <p className="text-xs md:text-sm text-[var(--text-primary)] font-medium leading-relaxed">
                        {currentCard.keyDifferentiator}
                      </p>
                    </div>

                    {/* Analogi Visual ala Kitami-shiki (Collapsible Accordion) */}
                    <div className="pt-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAnalogy((prev) => !prev);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-xs font-semibold cursor-pointer active:scale-[0.99] ${
                          showAnalogy
                            ? "bg-amber-500/12 border-amber-500/35 text-amber-500"
                            : "bg-amber-500/6 border-amber-500/20 text-amber-500/90 hover:bg-amber-500/10 hover:text-amber-500"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={13} className="text-amber-500" />
                          {showAnalogy ? "Tutup Analogi Kitami-shiki" : "Lihat Analogi (Kitami-shiki)"}
                        </span>
                        <motion.div animate={{ rotate: showAnalogy ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={14} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {showAnalogy && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] sm:text-xs text-[var(--text-secondary)] italic leading-relaxed shadow-xs">
                              &ldquo;{currentCard.analogy}&rdquo;
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Footer Notice */}
                  <div className="text-center text-[10px] sm:text-[11px] text-[var(--text-secondary)] opacity-60 pt-2 border-t border-[var(--border)]">
                    <span className="md:hidden">Pilih rating di bawah atau swipe</span>
                    <span className="hidden md:inline">Beri penilaian (1: Lupa, 2: Ragu, 3: Kuasai) · [A] Toggle Analogi</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rating & Navigation Control Bar */}
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
              className="group flex flex-col items-center justify-center min-h-[50px] p-2.5 sm:p-3 rounded-xl border border-rose-500/30 hover:border-rose-500 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 transition-all shadow-sm active:scale-95"
            >
              <div className="flex items-center gap-1 font-bold text-xs sm:text-sm">
                <AlertCircle size={15} /> Lupa
              </div>
              <span className="text-[10px] opacity-75 mt-0.5">Ulangi <span className="hidden md:inline">(1)</span></span>
            </button>

            <button
              type="button"
              onClick={() => handleRate("unsure")}
              className="group flex flex-col items-center justify-center min-h-[50px] p-2.5 sm:p-3 rounded-xl border border-amber-500/30 hover:border-amber-500 bg-amber-500/5 hover:bg-amber-500/10 text-amber-500 transition-all shadow-sm active:scale-95"
            >
              <div className="flex items-center gap-1 font-bold text-xs sm:text-sm">
                <HelpCircle size={15} /> Ragu
              </div>
              <span className="text-[10px] opacity-75 mt-0.5">Belum yakin <span className="hidden md:inline">(2)</span></span>
            </button>

            <button
              type="button"
              onClick={() => handleRate("mastered")}
              className="group flex flex-col items-center justify-center min-h-[50px] p-2.5 sm:p-3 rounded-xl border border-emerald-500/30 hover:border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-500 transition-all shadow-sm active:scale-95"
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
              className="inline-flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shrink-0"
              title="Kartu Sebelumnya"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            <button
              type="button"
              onClick={handleFlip}
              className="flex-1 max-w-[240px] inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <RotateCcw size={14} />
              <span>Balik Kartu</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white/90">Space</kbd>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
              className="inline-flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 shrink-0"
              title="Kartu Berikutnya"
            >
              <span className="hidden sm:inline">Berikutnya</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
