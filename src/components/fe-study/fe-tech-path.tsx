"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  CheckCircle2,
  Sparkles,
  Layers,
  Zap,
  Award,
  ChevronRight,
  Shield,
  Cpu,
  Kanban,
  TrendingUp,
  X,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { FEDailyDeck, FE_DAILY_DECKS } from "@/data/fe-daily-decks";
import { FECard, FE_CARDS } from "@/data/fe-study-data";
import { StudyProgress } from "@/lib/fe-study-storage";

interface FeTechPathProps {
  progress: StudyProgress | null;
  onStartDeck: (deck: FEDailyDeck, forceReviewAll?: boolean) => void;
  onStartSpeedMatch: (deck: FEDailyDeck) => void;
  onStartDayQuiz: (deck: FEDailyDeck) => void;
  onStartTierQuiz?: (tierNumber: number, title: string) => void;
}

interface TierDefinition {
  tier: number;
  titleId: string;
  titleJp: string;
  badge: string;
  category: "technology" | "management" | "strategy" | "vocab";
  startDay: number;
  endDay: number;
  bossTitle: string;
}

const TIERS: TierDefinition[] = [
  {
    tier: 1,
    titleId: "Tier 1: Keamanan Informasi, Jaringan & Database",
    titleJp: "第1段階：情報セキュリティ・ネットワーク・データベース",
    badge: "Fondasi Utama",
    category: "technology",
    startDay: 1,
    endDay: 5,
    bossTitle: "Boss Checkpoint 1: Evaluasi Fondasi Sistem & Keamanan",
  },
  {
    tier: 2,
    titleId: "Tier 2: Arsitektur Komputer, Algoritma & Logika",
    titleJp: "第2段階：コンピュータ構成・アルゴリズム・離散数学",
    badge: "Komputasi Inti",
    category: "technology",
    startDay: 6,
    endDay: 10,
    bossTitle: "Boss Checkpoint 2: Evaluasi Arsitektur & Logika Digital",
  },
  {
    tier: 3,
    titleId: "Tier 3: Rekayasa Software, Kualitas & Manajemen Proyek",
    titleJp: "第3段階：ソフトウェア開発・品質管理・プロジェクトマネジメント",
    badge: "Rekayasa & Mutu",
    category: "management",
    startDay: 11,
    endDay: 15,
    bossTitle: "Boss Checkpoint 3: Evaluasi Rekayasa & Manajemen Proyek",
  },
  {
    tier: 4,
    titleId: "Tier 4: Layanan IT, Strategi Bisnis, Hukum & Kanji Sakti",
    titleJp: "第4段階：ITサービス・経営戦略・法務・重要漢字",
    badge: "Kelulusan Ujian",
    category: "strategy",
    startDay: 16,
    endDay: 20,
    bossTitle: "Final Boss: Simulasi CBT Kelulusan Ujian FE",
  },
];

export function FeTechPath({
  progress,
  onStartDeck,
  onStartSpeedMatch,
  onStartDayQuiz,
  onStartTierQuiz,
}: FeTechPathProps) {
  const [selectedDeck, setSelectedDeck] = useState<FEDailyDeck | null>(null);

  // Determine which horizontal offset to give each day (0: center-left, 1: center, 2: center-right)
  const getOffsetClass = (dayIndex: number) => {
    const mod = dayIndex % 4;
    if (mod === 0) return "sm:-translate-x-12";
    if (mod === 1) return "sm:translate-x-0";
    if (mod === 2) return "sm:translate-x-12";
    return "sm:translate-x-0";
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4 relative min-w-0">
      {/* Circuit background traces (subtle cyber aesthetic) */}
      <div className="absolute inset-0 pointer-events-none flex justify-center">
        <div className="w-[3px] h-full bg-gradient-to-b from-[var(--brand-primary)]/20 via-[var(--brand-primary)]/40 to-emerald-500/20 rounded-full" />
      </div>

      {TIERS.map((tier) => {
        const tierDecks = FE_DAILY_DECKS.filter(
          (d) => d.day >= tier.startDay && d.day <= tier.endDay
        );

        // Check tier stats
        const tierCardIds = tierDecks.flatMap((d) => d.cardIds);
        const tierMasteredCount = tierCardIds.filter((id) =>
          progress?.masteredCardIds?.includes(id)
        ).length;
        const tierPassedDays = tierDecks.filter(
          (d) => progress?.dayQuizScores?.[d.day]?.passed
        ).length;
        const isTierAllMastered = tierMasteredCount === tierCardIds.length;

        return (
          <div
            key={tier.tier}
            className="w-full max-w-xl flex flex-col items-center gap-6 relative z-10"
          >
            {/* Tier Header Badge */}
            <div className="w-full p-4 rounded-2xl bg-[var(--surface-soft)]/90 backdrop-blur-md border border-[var(--border)] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex flex-col">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-primary)]/15 border border-[var(--brand-primary)]/30 text-[var(--brand-primary)] text-[10px] font-black uppercase tracking-wider">
                    {tier.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--text-secondary)]">
                    Day {tier.startDay} - {tier.endDay}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-serif leading-tight">
                  {tier.titleId}
                </h4>
                <span className="text-[11px] font-mono text-[var(--text-tertiary)] mt-0.5">
                  {tier.titleJp}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] shrink-0">
                <CheckCircle2 size={13} className="text-emerald-500" />
                <span>
                  {tierPassedDays}/{tierDecks.length} Lulus CBT
                </span>
              </div>
            </div>

            {/* Path Nodes for each Day in Tier */}
            <div className="w-full flex flex-col items-center gap-7 sm:gap-9 py-2">
              {tierDecks.map((deck, idx) => {
                const masteredCount = deck.cardIds.filter((id) =>
                  progress?.masteredCardIds?.includes(id)
                ).length;
                const isAllMastered = masteredCount === deck.cardIds.length;
                const isUnlocked =
                  !progress?.masteryModeEnabled ||
                  (progress?.unlockedDeckDays || [1]).includes(deck.day) ||
                  deck.day === 1;
                const quizRecord = progress?.dayQuizScores?.[deck.day];
                const isCurrentTarget =
                  isUnlocked &&
                  (!quizRecord?.passed || !isAllMastered) &&
                  (deck.day === 1 ||
                    progress?.dayQuizScores?.[deck.day - 1]?.passed ||
                    !progress?.masteryModeEnabled);

                const offsetClass = getOffsetClass(deck.day);

                return (
                  <div
                    key={deck.day}
                    className={`flex flex-col items-center gap-2 transition-transform duration-300 ${offsetClass}`}
                  >
                    {/* Interactive Node Button */}
                    <div className="relative group">
                      {/* Active target pulse ring */}
                      {isCurrentTarget && (
                        <div className="absolute -inset-2 rounded-full bg-[var(--brand-primary)]/20 animate-ping pointer-events-none" />
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedDeck(deck)}
                        className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full border-3 flex flex-col items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 relative overflow-hidden select-none ${
                          !isUnlocked
                            ? "bg-[var(--surface-soft)]/60 border-[var(--border)] opacity-60 text-[var(--text-tertiary)]"
                            : isAllMastered || quizRecord?.passed
                            ? "bg-emerald-500/15 border-emerald-500 text-emerald-500 hover:scale-105 shadow-emerald-500/20"
                            : isCurrentTarget
                            ? "bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white hover:scale-105 shadow-[var(--brand-primary)]/30 ring-4 ring-[var(--brand-primary)]/20"
                            : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--brand-primary)] text-[var(--text-primary)] hover:scale-105"
                        }`}
                      >
                        {!isUnlocked ? (
                          <Lock size={20} className="text-[var(--text-tertiary)]" />
                        ) : isAllMastered && quizRecord?.passed ? (
                          <CheckCircle2 size={24} className="text-emerald-500" />
                        ) : (
                          <>
                            <span className="text-[9px] font-mono font-bold tracking-wider uppercase opacity-80">
                              DAY
                            </span>
                            <span className="text-lg sm:text-xl font-mono font-black leading-none">
                              {deck.day.toString().padStart(2, "0")}
                            </span>
                          </>
                        )}

                        {/* Mini progress arc or percentage dot */}
                        {isUnlocked && (
                          <div className="absolute bottom-1.5 flex items-center gap-0.5">
                            <span className="text-[9px] font-mono font-bold">
                              {masteredCount}/{deck.cardIds.length}
                            </span>
                          </div>
                        )}
                      </button>
                    </div>

                    {/* Node Title Pill below circle */}
                    <button
                      type="button"
                      onClick={() => setSelectedDeck(deck)}
                      className="px-3 py-1 rounded-xl bg-[var(--surface-soft)] hover:bg-[var(--surface)] border border-[var(--border)] text-[11px] font-bold text-[var(--text-primary)] max-w-[200px] truncate text-center transition-all shadow-xs cursor-pointer hover:border-[var(--brand-primary)]/40"
                    >
                      {deck.titleId.split(":")[1]?.trim() || deck.titleId}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Boss Checkpoint Node at the end of Tier */}
            <div className="w-full p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Award size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                    Checkpoint Ujian
                  </span>
                  <h5 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-tight">
                    {tier.bossTitle}
                  </h5>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onStartTierQuiz) {
                    onStartTierQuiz(tier.tier, tier.bossTitle);
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
              >
                <span>Uji Tier {tier.tier}</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        );
      })}

      {/* Cyber Mission Modal / Sheet for Selected Deck */}
      <AnimatePresence>
        {selectedDeck && (() => {
          const masteredCount = selectedDeck.cardIds.filter((id) =>
            progress?.masteredCardIds?.includes(id)
          ).length;
          const isAllMastered = masteredCount === selectedDeck.cardIds.length;
          const unmasteredCount = selectedDeck.cardIds.length - masteredCount;
          const isUnlocked =
            !progress?.masteryModeEnabled ||
            (progress?.unlockedDeckDays || [1]).includes(selectedDeck.day) ||
            selectedDeck.day === 1;
          const quizRecord = progress?.dayQuizScores?.[selectedDeck.day];
          const deckCards = FE_CARDS.filter((c) => selectedDeck.cardIds.includes(c.id));

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedDeck(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className="w-full max-w-md p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl flex flex-col gap-5 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedDeck(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-soft)] transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Deck Header */}
                <div className="flex flex-col gap-1 pr-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30">
                      DAY {selectedDeck.day.toString().padStart(2, "0")}
                    </span>
                    {quizRecord?.passed ? (
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-500/20">
                        <CheckCircle2 size={11} />
                        <span>Lulus CBT ({quizRecord.score}/{quizRecord.total})</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-500/20">
                        <span>Belum Ujian CBT</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif mt-1">
                    {selectedDeck.titleId}
                  </h3>
                  <p className="text-xs font-mono text-[var(--brand-primary)]">
                    {selectedDeck.titleJp}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
                    {selectedDeck.descriptionId}
                  </p>
                </div>

                {/* Mastery Bar */}
                <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-medium">Penguasaan Istilah:</span>
                    <span className="font-mono font-bold text-[var(--text-primary)]">
                      {masteredCount} / {selectedDeck.cardIds.length} Dikuasai
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[var(--surface)] overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{
                        width: `${Math.round((masteredCount / selectedDeck.cardIds.length) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* 3 Core Action Buttons ala Duolingo */}
                <div className="flex flex-col gap-2.5 pt-1">
                  {/* Mode 1: Flashcard SRS */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDeck(null);
                      onStartDeck(selectedDeck, false);
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-between active:scale-98"
                  >
                    <span className="flex items-center gap-2">
                      <Layers size={16} />
                      <span>{isAllMastered ? "Pelajari Ulang Flashcard" : "Pelajari 10 Istilah (Flashcards)"}</span>
                    </span>
                    <ChevronRight size={15} />
                  </button>

                  {/* Mode 2: Speed Match (Duolingo Style) */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDeck(null);
                      onStartSpeedMatch(selectedDeck);
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[var(--surface-soft)] hover:bg-[var(--surface-soft)]/80 text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--brand-primary)]/50 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-between active:scale-98"
                  >
                    <span className="flex items-center gap-2">
                      <Zap size={16} className="text-amber-500" />
                      <span>Speed Match (Pencocokan Cepat)</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 font-black">
                      60s Blitz
                    </span>
                  </button>

                  {/* Mode 3: Day CBT Quiz */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDeck(null);
                      onStartDayQuiz(selectedDeck);
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[var(--surface)] hover:bg-[var(--surface-soft)] text-[var(--text-primary)] border border-[var(--border)] font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-between active:scale-98"
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <span>{quizRecord?.passed ? "Uji Ulang CBT Kelulusan" : "Mulai Ujian CBT (Syarat Buka Hari)"}</span>
                    </span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
