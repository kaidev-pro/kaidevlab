"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Zap,
  Timer,
  Trophy,
  Flame,
  Volume2,
  VolumeX,
  CheckCircle2,
  Layers,
  Award,
} from "lucide-react";
import { FECard } from "@/data/fe-study-data";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { autoAnnotateRuby } from "@/lib/fe-furigana";
import { ConfettiBurst, playVictoryFanfare } from "@/components/fe-study/confetti-burst";

interface SpeedMatchViewProps {
  cards: FECard[];
  title: string;
  subtitle?: string;
  onBack: () => void;
  onRecordScore?: (score: number, maxCombo: number) => void;
}

interface MatchItem {
  id: string; // card.id
  type: "jp" | "meaning";
  text: string;
  rubyText?: string;
  matched: boolean;
}

// ==========================================
// Web Audio Synthesizer for Speed Match
// ==========================================
function createMatchAudio() {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  const ctx = new AudioCtx();

  return {
    playSelect: () => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch {}
    },
    playSuccess: (combo: number) => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const now = ctx.currentTime;
        // Pitch increases with combo level
        const baseFreq = 520 + Math.min(combo, 8) * 45;
        const notes = [baseFreq, baseFreq * 1.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          const start = now + idx * 0.06;
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.18, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.18);
        });
      } catch {}
    },
    playError: () => {
      try {
        if (ctx.state === "suspended") ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } catch {}
    },
  };
}

export function SpeedMatchView({
  cards,
  title,
  subtitle,
  onBack,
  onRecordScore,
}: SpeedMatchViewProps) {
  // Sound synthesizer
  const audioRef = useRef<ReturnType<typeof createMatchAudio> | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    audioRef.current = createMatchAudio();
  }, []);

  // Shuffle input cards
  const totalDeckCards = useMemo(() => {
    return [...cards].sort(() => 0.5 - Math.random());
  }, [cards]);

  // Game state
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctMatchesCount, setCorrectMatchesCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Active items currently on the board (up to 5 pairs = 10 chips)
  const [activeCardPool, setActiveCardPool] = useState<FECard[]>([]);
  const [remainingPool, setRemainingPool] = useState<FECard[]>([]);

  // Selection state
  const [selectedJpId, setSelectedJpId] = useState<string | null>(null);
  const [selectedMeaningId, setSelectedMeaningId] = useState<string | null>(null);
  const [errorIds, setErrorIds] = useState<{ jp: string | null; meaning: string | null }>({
    jp: null,
    meaning: null,
  });
  const [successId, setSuccessId] = useState<string | null>(null);

  // Initialize pool
  const initBoard = useCallback(() => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    const initial5 = shuffled.slice(0, 5);
    const rest = shuffled.slice(5);

    setActiveCardPool(initial5);
    setRemainingPool(rest);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCorrectMatchesCount(0);
    setTotalAttempts(0);
    setTimeLeft(60);
    setTimerActive(true);
    setIsGameOver(false);
    setShowConfetti(false);
    setSelectedJpId(null);
    setSelectedMeaningId(null);
    setErrorIds({ jp: null, meaning: null });
    setSuccessId(null);
  }, [cards]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  // Countdown timer
  useEffect(() => {
    if (!timerActive || isGameOver) return;
    if (timeLeft <= 0) {
      setIsGameOver(true);
      setTimerActive(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft, isGameOver]);

  // Shuffled items for Left (Japanese) and Right (Meaning)
  const [shuffledJp, setShuffledJp] = useState<FECard[]>([]);
  const [shuffledMeaning, setShuffledMeaning] = useState<FECard[]>([]);

  // Reshuffle active items when pool changes
  useEffect(() => {
    setShuffledJp([...activeCardPool].sort(() => 0.5 - Math.random()));
    setShuffledMeaning([...activeCardPool].sort(() => 0.5 - Math.random()));
  }, [activeCardPool]);

  // Helper to extract a crisp, high-signal meaning chip label
  const getMeaningLabel = (card: FECard) => {
    // If definition has a short clear Indonesian title, extract it
    const def = card.definitionId;
    if (card.termEn) {
      return `${card.termEn} (${def.slice(0, 36)}${def.length > 36 ? "..." : ""})`;
    }
    return def.slice(0, 55) + (def.length > 55 ? "..." : "");
  };

  // Evaluate match
  const handleEvaluate = useCallback(
    (jpCardId: string, meaningCardId: string) => {
      setTotalAttempts((prev) => prev + 1);

      if (jpCardId === meaningCardId) {
        // MATCH SUCCESS
        const newCombo = combo + 1;
        setCombo(newCombo);
        setMaxCombo((prev) => Math.max(prev, newCombo));

        const basePoints = 100;
        const comboBonus = Math.min(newCombo, 5) * 25;
        const earned = basePoints + comboBonus;
        setScore((prev) => prev + earned);
        setCorrectMatchesCount((prev) => prev + 1);

        if (soundEnabled && audioRef.current) {
          audioRef.current.playSuccess(newCombo);
        }

        setSuccessId(jpCardId);

        // Remove matched card from active board and pull 1 new from remaining pool
        setTimeout(() => {
          setActiveCardPool((prevActive) => {
            const remainingActive = prevActive.filter((c) => c.id !== jpCardId);
            if (remainingPool.length > 0) {
              const nextCard = remainingPool[0];
              setRemainingPool((prevRemaining) => prevRemaining.slice(1));
              return [...remainingActive, nextCard];
            }
            // If all cards in deck are matched
            if (remainingActive.length === 0) {
              setIsGameOver(true);
              setTimerActive(false);
              setShowConfetti(true);
              if (soundEnabled) {
                playVictoryFanfare();
              }
            }
            return remainingActive;
          });

          setSelectedJpId(null);
          setSelectedMeaningId(null);
          setSuccessId(null);
        }, 220);
      } else {
        // MATCH ERROR
        setCombo(0);
        setErrorIds({ jp: jpCardId, meaning: meaningCardId });

        if (soundEnabled && audioRef.current) {
          audioRef.current.playError();
        }

        setTimeout(() => {
          setSelectedJpId(null);
          setSelectedMeaningId(null);
          setErrorIds({ jp: null, meaning: null });
        }, 450);
      }
    },
    [combo, soundEnabled, remainingPool]
  );

  const handleSelectJp = (cardId: string) => {
    if (successId || errorIds.jp) return;
    if (soundEnabled && audioRef.current) {
      audioRef.current.playSelect();
    }
    setSelectedJpId(cardId);
    if (selectedMeaningId) {
      handleEvaluate(cardId, selectedMeaningId);
    }
  };

  const handleSelectMeaning = (cardId: string) => {
    if (successId || errorIds.meaning) return;
    if (soundEnabled && audioRef.current) {
      audioRef.current.playSelect();
    }
    setSelectedMeaningId(cardId);
    if (selectedJpId) {
      handleEvaluate(selectedJpId, cardId);
    }
  };

  // Record score when game over
  useEffect(() => {
    if (isGameOver && onRecordScore) {
      onRecordScore(score, maxCombo);
    }
  }, [isGameOver, score, maxCombo, onRecordScore]);

  const accuracy =
    totalAttempts > 0 ? Math.round((correctMatchesCount / totalAttempts) * 100) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 sm:gap-6 min-w-0">
      {/* Confetti celebration on victory */}
      {showConfetti && <ConfettiBurst trigger={true} withSound={false} />}

      {/* Top Header & HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all bg-[var(--surface)] active:scale-95"
            title="Kembali ke menu"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20">
                Speed Match (Match Madness)
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-medium">
                {correctMatchesCount} / {cards.length} Selesai
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-tight mt-0.5">
              {title}
            </h2>
          </div>
        </div>

        {/* HUD: Timer, Combo, Score */}
        <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            title={soundEnabled ? "Mute Suara" : "Nyalakan Suara"}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Countdown Clock */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm ${
              timeLeft <= 10
                ? "bg-rose-500/10 border-rose-500/30 text-rose-500 animate-pulse"
                : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-primary)]"
            }`}
          >
            <Timer size={14} className={timeLeft <= 10 ? "text-rose-500" : "text-[var(--brand-primary)]"} />
            <span>{timeLeft}s</span>
          </div>

          {/* Combo Multiplier Pill */}
          <div
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border font-mono text-xs font-black transition-all ${
              combo >= 2
                ? "bg-amber-500/15 border-amber-500/40 text-amber-500 shadow-sm"
                : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)]"
            }`}
          >
            <Flame size={14} className={combo >= 2 ? "text-amber-500 animate-bounce" : "opacity-40"} />
            <span>x{combo}</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30 text-[var(--brand-primary)] font-mono font-black text-xs sm:text-sm">
            <Zap size={14} />
            <span>{score} PTS</span>
          </div>
        </div>
      </div>

      {/* Main Playing Field */}
      {!isGameOver ? (
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-xs text-[var(--text-secondary)] font-medium">
              Pasangkan istilah kanji di kolom kiri dengan definisi yang tepat di kolom kanan secepat mungkin.
            </p>
          </div>

          {/* 2-Column Bento Grid of Chips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
            {/* Left Column: Japanese Terms with Ruby Furigana */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-primary)] px-1 flex items-center gap-1">
                <Sparkles size={12} />
                <span>Istilah Kanji IT (Term)</span>
              </span>
              <div className="flex flex-col gap-2">
                {shuffledJp.map((card) => {
                  const isSelected = selectedJpId === card.id;
                  const isError = errorIds.jp === card.id;
                  const isSuccess = successId === card.id;

                  return (
                    <motion.button
                      key={`jp-${card.id}`}
                      type="button"
                      onClick={() => handleSelectJp(card.id)}
                      animate={isError ? { x: [-6, 6, -4, 4, 0] } : {}}
                      transition={{ duration: 0.3 }}
                      className={`w-full min-h-[62px] p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer select-none active:scale-[0.98] ${
                        isSuccess
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold scale-[1.02] shadow-md"
                          : isError
                          ? "bg-rose-500/15 border-rose-500 text-rose-500 shadow-sm"
                          : isSelected
                          ? "bg-[var(--brand-primary)]/15 border-[var(--brand-primary)] text-[var(--brand-primary)] shadow-md ring-2 ring-[var(--brand-primary)]/30 font-bold"
                          : "bg-[var(--surface)] hover:bg-[var(--surface-soft)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--brand-primary)]/40 shadow-xs"
                      }`}
                    >
                      <div className="flex flex-col leading-snug">
                        <div className="text-base sm:text-lg font-bold font-japanese tracking-wide">
                          <RubyTerm
                            rubyText={card.ruby || autoAnnotateRuby(card.termJp)}
                            fallbackText={card.termJp}
                            showFurigana={true}
                            className="inline leading-[2.1]"
                          />
                        </div>
                        <span className="text-[11px] text-[var(--text-secondary)] font-mono font-medium">
                          {card.subCategory}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-primary)] animate-ping shrink-0" />
                      )}
                      {isSuccess && (
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Definitions & Meanings */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] px-1 flex items-center gap-1">
                <Layers size={12} />
                <span>Definisi & Konsep (Meaning)</span>
              </span>
              <div className="flex flex-col gap-2">
                {shuffledMeaning.map((card) => {
                  const isSelected = selectedMeaningId === card.id;
                  const isError = errorIds.meaning === card.id;
                  const isSuccess = successId === card.id;

                  return (
                    <motion.button
                      key={`meaning-${card.id}`}
                      type="button"
                      onClick={() => handleSelectMeaning(card.id)}
                      animate={isError ? { x: [-6, 6, -4, 4, 0] } : {}}
                      transition={{ duration: 0.3 }}
                      className={`w-full min-h-[62px] p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer select-none active:scale-[0.98] ${
                        isSuccess
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold scale-[1.02] shadow-md"
                          : isError
                          ? "bg-rose-500/15 border-rose-500 text-rose-500 shadow-sm"
                          : isSelected
                          ? "bg-[var(--brand-primary)]/15 border-[var(--brand-primary)] text-[var(--brand-primary)] shadow-md ring-2 ring-[var(--brand-primary)]/30 font-bold"
                          : "bg-[var(--surface)] hover:bg-[var(--surface-soft)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--brand-primary)]/40 shadow-xs"
                      }`}
                    >
                      <div className="flex flex-col leading-snug pr-2">
                        <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                          {card.termEn}
                        </span>
                        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 mt-0.5 leading-relaxed">
                          {card.definitionId}
                        </p>
                      </div>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-primary)] animate-ping shrink-0" />
                      )}
                      {isSuccess && (
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Game Over / Victory Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-soft)] border border-[var(--border)] shadow-xl flex flex-col items-center text-center gap-5 my-auto"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center shadow-md">
            <Trophy size={32} />
          </div>

          <div>
            <h3 className="text-2xl font-black text-[var(--text-primary)] font-serif">
              {correctMatchesCount === cards.length ? "Luar Biasa! Semua Kartu Terpasang!" : "Sesi Selesai!"}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-md">
              Latihan pencocokan cepat memperkuat pengenalan otomatis istilah kanji IT untuk kecepatan membaca soal ujian FE.
            </p>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
            <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">
                Total Skor
              </span>
              <span className="text-xl font-black font-mono text-[var(--brand-primary)] mt-0.5">
                {score}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">
                Max Combo
              </span>
              <span className="text-xl font-black font-mono text-amber-500 mt-0.5">
                x{maxCombo}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">
                Pasangan Benar
              </span>
              <span className="text-xl font-black font-mono text-emerald-500 mt-0.5">
                {correctMatchesCount}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">
                Akurasi
              </span>
              <span className="text-xl font-black font-mono text-[var(--text-primary)] mt-0.5">
                {accuracy}%
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm pt-2">
            <button
              type="button"
              onClick={initBoard}
              className="w-full py-3 px-5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <RotateCcw size={15} />
              <span>Mainkan Lagi</span>
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3 px-5 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-soft)] text-[var(--text-primary)] border border-[var(--border)] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <ArrowLeft size={15} />
              <span>Kembali ke Hub</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
