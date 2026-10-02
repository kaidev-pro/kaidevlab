"use client";

import { motion } from "framer-motion";
import { Award, Flame, RotateCcw, ArrowLeft, CheckCircle2, AlertCircle, ArrowRight, CheckCheck } from "lucide-react";
import { ConfettiBurst } from "@/components/fe-study/confetti-burst";

interface TangoSessionSummaryProps {
  totalReviewed: number;
  masteredCount: number;
  reviewCount: number;
  streak: number;
  onRestart: () => void;
  onReviewMistakes?: () => void;
  onBackToDashboard: () => void;
  onGraduateAll?: () => void;
  isWeakSession?: boolean;
}

export function TangoSessionSummary({
  totalReviewed,
  masteredCount,
  reviewCount,
  streak,
  onRestart,
  onReviewMistakes,
  onBackToDashboard,
  onGraduateAll,
  isWeakSession,
}: TangoSessionSummaryProps) {
  const scorePercent =
    totalReviewed > 0 ? Math.round((masteredCount / totalReviewed) * 100) : 0;

  return (
    <>
      <ConfettiBurst trigger={true} withSound={true} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-2xl text-center flex flex-col items-center gap-6"
      >
        {/* Glowing Trophy Icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-500 flex items-center justify-center shadow-lg">
            <Award className="w-10 h-10 animate-bounce" />
          </div>
          {streak > 0 && (
            <div className="absolute -bottom-2 -right-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[11px] shadow-md">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>{streak}d</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div>
          <span className="text-[11px] uppercase font-bold tracking-widest text-[var(--brand-primary)]">
            Sesi Belajar Selesai
          </span>
          <h3 className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">
            {scorePercent >= 80
              ? "Luar Biasa! (素晴らしい)"
              : scorePercent >= 50
              ? "Bagus Sekali! (よくできました)"
              : "Latihan yang Bagus! (お疲れ様)"}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed max-w-xs mx-auto">
            Kamu telah menyelesaikan <b>{totalReviewed} kosakata</b> JLPT N3 Tango.
          </p>
        </div>

        {/* Score Breakdown Cards */}
        <div className="w-full grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Sudah Ingat
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              {masteredCount}
            </div>
            <div className="text-[10px] text-emerald-600/75 dark:text-emerald-400/75">
              {scorePercent}% Penguasaan
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                Perlu Review
              </span>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
              {reviewCount}
            </div>
            <div className="text-[10px] text-amber-600/75 dark:text-amber-400/75">
              Siap dilatih lagi
            </div>
          </div>
        </div>

        {/* Streak Banner */}
        {streak > 0 && (
          <div className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>
              Streak aktif: <b>{streak} hari berturut-turut!</b>
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-2.5 pt-2">
          {onGraduateAll && (
            <button
              type="button"
              onClick={onGraduateAll}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Luluskan Semua {totalReviewed} Kata dari Daftar Sering Salah</span>
            </button>
          )}

          {reviewCount > 0 && onReviewMistakes && (
            <button
              type="button"
              onClick={onReviewMistakes}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Review {reviewCount} Kata yang Sulit Tadi</span>
            </button>
          )}

          <button
            type="button"
            onClick={onRestart}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[var(--brand-primary)] hover:opacity-95 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Seluruh Sesi</span>
          </button>

          <button
            type="button"
            onClick={onBackToDashboard}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] text-[var(--text-secondary)] text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Bab</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
