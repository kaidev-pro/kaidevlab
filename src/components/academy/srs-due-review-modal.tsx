"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  RotateCcw,
  Undo2,
  Sparkles,
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Flame,
  Check,
  Zap,
  ArrowRight,
  Award,
  Layers,
  Lightbulb,
  Target,
} from "lucide-react";
import { TANGO_N3_CARDS, TangoN3Card } from "@/data/tango-n3-data";
import { FE_CARDS, FECard } from "@/data/fe-study-data";
import { recordTangoReview, CardRating, loadTangoProgress } from "@/lib/tango-n3-storage";
import { recordCardReview, loadStudyProgress } from "@/lib/fe-study-storage";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound, playSuccessChime, playErrorBuzz } from "@/lib/global-sound";
import { recordUnifiedActivity } from "@/lib/unified-study-storage";
import { RubyTerm } from "@/components/fe-study/ruby-term";

export interface SrsDueReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  hub: "n3" | "fe";
  dueCardIds: string[];
  onFinishSession?: () => void;
  onContinueToNewMaterial?: () => void;
}

type GenericCard =
  | { type: "tango"; card: TangoN3Card }
  | { type: "fe"; card: FECard };

export function SrsDueReviewModal({
  isOpen,
  onClose,
  hub,
  dueCardIds,
  onFinishSession,
  onContinueToNewMaterial,
}: SrsDueReviewModalProps) {
  const [queue, setQueue] = useState<GenericCard[]>([]);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [undoHistory, setUndoHistory] = useState<
    { cardItem: GenericCard; wasMastered: boolean }[]
  >([]);
  const [showFurigana, setShowFurigana] = useState(true);

  // Initialize queue when opened
  useEffect(() => {
    if (!isOpen) return;

    let items: GenericCard[] = [];
    if (hub === "n3") {
      const cardMap = new Map(TANGO_N3_CARDS.map((c) => [c.id, c]));
      items = dueCardIds
        .map((id) => cardMap.get(id))
        .filter((c): c is TangoN3Card => Boolean(c))
        .map((card) => ({ type: "tango" as const, card }));
    } else {
      const cardMap = new Map(FE_CARDS.map((c) => [c.id, c]));
      items = dueCardIds
        .map((id) => cardMap.get(id))
        .filter((c): c is FECard => Boolean(c))
        .map((card) => ({ type: "fe" as const, card }));
    }

    setQueue(items);
    setMasteredIds([]);
    setIsFlipped(false);
    setIsFinished(false);
    setUndoHistory([]);
    setDragOffset(0);
  }, [isOpen, hub, dueCardIds]);

  const currentItem = queue[0];
  const totalCards = queue.length + masteredIds.length;
  const progressPercent =
    totalCards > 0 ? Math.round((masteredIds.length / totalCards) * 100) : 0;

  // Speak Japanese audio using Web Speech API
  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\[([^:]+):[^\]]+\]/g, "$1");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
    playTapSound();
    triggerHaptic("light");
  };

  const handleRate = useCallback(
    (rating: CardRating) => {
      if (!currentItem) return;

      const cardId = currentItem.card.id;
      const wasMastered = rating === "mastered";

      // Save to storage
      if (currentItem.type === "tango") {
        recordTangoReview(cardId, currentItem.card.chapterId, rating);
      } else {
        recordCardReview(cardId, currentItem.card.category, rating);
      }
      recordUnifiedActivity(hub === "n3" ? "tango" : "fe", 1);

      // Record undo
      setUndoHistory((prev) => [{ cardItem: currentItem, wasMastered }, ...prev]);

      if (wasMastered) {
        playSuccessChime();
        triggerHaptic("success");
        setMasteredIds((prev) => [...prev, cardId]);
        const nextQueue = queue.slice(1);
        setQueue(nextQueue);
        setIsFlipped(false);
        setDragOffset(0);

        if (nextQueue.length === 0) {
          setIsFinished(true);
          if (onFinishSession) onFinishSession();
        }
      } else {
        playErrorBuzz();
        triggerHaptic("warning");
        // Re-queue to back of array
        const reOrdered = [...queue.slice(1), currentItem];
        setQueue(reOrdered);
        setIsFlipped(false);
        setDragOffset(0);
      }
    },
    [currentItem, queue, hub, onFinishSession]
  );

  const handleUndo = useCallback(() => {
    if (undoHistory.length === 0) return;
    const [lastAction, ...rest] = undoHistory;
    setUndoHistory(rest);

    playTapSound();
    triggerHaptic("medium");

    if (lastAction.wasMastered) {
      setMasteredIds((prev) => prev.filter((id) => id !== lastAction.cardItem.card.id));
      setQueue((prev) => [lastAction.cardItem, ...prev]);
    } else {
      setQueue((prev) => {
        const without = prev.filter((item) => item.card.id !== lastAction.cardItem.card.id);
        return [lastAction.cardItem, ...without];
      });
    }
    setIsFlipped(false);
    setIsFinished(false);
    setDragOffset(0);
  }, [undoHistory]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isOpen || isFinished) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleRate("mastered");
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleRate("forgot");
      } else if (e.key === "z" || e.key === "Z" || e.key === "u" || e.key === "U") {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFinished, handleRate, handleUndo]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-[var(--study-paper)] border border-[var(--study-line)] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--study-line)] bg-[var(--study-soft)]/50">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Zap size={16} fill="currentColor" />
            </span>
            <div>
              <h2 className="text-sm font-black text-[var(--text-primary)]">
                Review SRS Jatuh Tempo ({hub === "n3" ? "JLPT N3" : "FE IT Exam"})
              </h2>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Spaced Repetition: Memperkuat memori tepat sebelum lupa
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[var(--study-soft)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress & Counter Bar */}
        <div className="px-5 py-2.5 border-b border-[var(--study-line)] bg-[var(--study-paper)] flex items-center justify-between text-xs font-mono font-bold text-[var(--text-secondary)]">
          <div className="flex items-center gap-3">
            <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <RotateCcw size={12} />
              <span>{queue.length} Butuh Ulang</span>
            </span>
            <span>·</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={12} />
              <span>{masteredIds.length} Lulus Hari Ini</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={undoHistory.length === 0}
              onClick={handleUndo}
              className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border border-[var(--study-line)] hover:bg-[var(--study-soft)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Urungkan aksi terakhir (Z)"
            >
              <Undo2 size={11} />
              <span>Undo</span>
            </button>
          </div>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="w-full h-1 bg-[var(--study-line)]">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col items-center justify-center min-h-[380px]">
          <AnimatePresence mode="wait">
            {!isFinished && currentItem ? (
              <motion.div
                key={currentItem.card.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.2 }}
                className="w-full flex flex-col items-center"
              >
                {/* Flashcard container */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleFlip}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleFlip();
                    }
                  }}
                  className="w-full min-h-[290px] rounded-3xl p-6 border border-[var(--study-line)] bg-gradient-to-b from-[var(--study-paper)] to-[var(--study-soft)] shadow-lg cursor-pointer flex flex-col justify-between select-none hover:border-[var(--study-blue)]/50 transition-all duration-300 relative group"
                >
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                    <span className="px-2.5 py-0.5 rounded-full font-mono font-bold bg-[var(--study-soft)] border border-[var(--study-line)]">
                      {currentItem.type === "tango"
                        ? `Tango N3 · ${currentItem.card.partOfSpeech}`
                        : `FE · ${currentItem.card.category}`}
                    </span>

                    <span className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      Klik / Spasi untuk Membalik
                    </span>
                  </div>

                  {/* Card Front vs Back Content */}
                  {!isFlipped ? (
                    /* Front: Japanese Term */
                    <div className="my-auto py-6 text-center space-y-3">
                      {currentItem.type === "tango" ? (
                        <>
                          <div className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] font-japanese tracking-wide">
                            <RubyTerm
                              rubyText={currentItem.card.ruby}
                              fallbackText={currentItem.card.word}
                              showFurigana={showFurigana}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] font-mono tracking-tight">
                            {currentItem.card.termEn}
                          </div>
                          <div className="text-base font-japanese text-[var(--brand-primary)] font-bold">
                            <RubyTerm
                              rubyText={currentItem.card.ruby}
                              fallbackText={currentItem.card.termJp}
                              showFurigana={showFurigana}
                            />
                          </div>
                        </>
                      )}

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(
                              currentItem.type === "tango"
                                ? currentItem.card.word
                                : currentItem.card.termJp
                            );
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[var(--study-soft)] text-[var(--text-primary)] hover:bg-[var(--study-line)] transition-colors"
                          title="Putar Audio Native"
                        >
                          <Volume2 size={13} />
                          <span>Dengar Audio</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Back: Meaning & Explanation */
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="my-auto py-4 text-left space-y-3"
                    >
                      {currentItem.type === "tango" ? (
                        <>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--study-blue)]">
                              Arti Bahasa Indonesia
                            </span>
                            <h3 className="text-xl font-black text-[var(--text-primary)] mt-0.5">
                              {currentItem.card.meaningId}
                            </h3>
                            {currentItem.card.meaningEn && (
                              <p className="text-xs text-[var(--text-secondary)] italic mt-0.5">
                                {currentItem.card.meaningEn}
                              </p>
                            )}
                          </div>

                          {currentItem.card.exampleSentence && (
                            <div className="p-3 rounded-2xl bg-[var(--study-soft)] border border-[var(--study-line)] space-y-1 text-xs">
                              <p className="font-japanese text-[var(--text-primary)] font-bold">
                                <RubyTerm
                                  rubyText={currentItem.card.exampleSentence.jpRuby}
                                  fallbackText={currentItem.card.exampleSentence.jpRuby}
                                  showFurigana={true}
                                />
                              </p>
                              <p className="text-[var(--text-secondary)]">
                                {currentItem.card.exampleSentence.meaningId}
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--study-blue)]">
                              Definisi Konsep IT
                            </span>
                            <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] mt-0.5 leading-relaxed">
                              {currentItem.card.definitionId}
                            </h3>
                          </div>

                          {currentItem.card.analogy && (
                            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                              <strong className="inline-flex items-center gap-1 font-bold">
                                <Lightbulb size={12} className="text-amber-600 dark:text-amber-400" />
                                <span>Analogi Kitami:</span>
                              </strong>{" "}
                              {currentItem.card.analogy}
                            </div>
                          )}

                          {currentItem.card.keyDifferentiator && (
                            <div className="p-2.5 rounded-xl bg-[var(--study-soft)] border border-[var(--study-line)] text-xs text-[var(--text-primary)]">
                              <span className="font-bold text-[var(--study-blue)]">Pembeda Ujian:</span>{" "}
                              {currentItem.card.keyDifferentiator}
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* Card Bottom status */}
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] border-t border-[var(--study-line)] pt-3">
                    <span>
                      Sisa antrean: <strong>{queue.length} kartu</strong>
                    </span>
                    <span className="font-mono text-[10px]">
                      [←] Masih Lupa &nbsp; [→] Hafal
                    </span>
                  </div>
                </div>

                {/* Rating Action Buttons */}
                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                  <button
                    type="button"
                    onClick={() => handleRate("forgot")}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-500/20 transition-all active:scale-[0.98]"
                  >
                    <RotateCcw size={15} />
                    <span>Belum Hafal (Ulangi)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRate("mastered")}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98]"
                  >
                    <Check size={16} strokeWidth={2.5} />
                    <span>Sudah Hafal (Lulus)</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Session Finished Victory Banner */
              <motion.div
                key="victory"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4 max-w-md mx-auto"
              >
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-white mx-auto flex items-center justify-center shadow-xl animate-bounce">
                  <Award size={32} />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 tracking-wide">
                    Review Jatuh Tempo Tuntas!
                  </span>
                  <h3 className="text-xl font-black text-[var(--text-primary)] mt-2">
                    Luar Biasa! Memori Anda Tetap Terjaga
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Anda telah menyelesaikan {masteredIds.length} kartu jatuh tempo. Kartu-kartu ini telah dinaikkan ke interval Leitner yang lebih panjang.
                  </p>
                </div>

                <div className="pt-3 space-y-2">
                  {onContinueToNewMaterial && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onContinueToNewMaterial();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[var(--study-blue)] hover:opacity-90 text-white font-black text-xs shadow-lg shadow-blue-500/20 transition-all"
                    >
                      <Sparkles size={15} />
                      <span>Lanjut ke Materi Baru Hari Ini →</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 px-4 rounded-xl border border-[var(--study-line)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--study-soft)] transition-colors"
                  >
                    Kembali ke Dashboard
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
