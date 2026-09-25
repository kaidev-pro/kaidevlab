"use client";

import { motion } from "framer-motion";
import { Award, Flame, RotateCcw, ArrowRight } from "lucide-react";
import { ConfettiBurst } from "@/components/fe-study/confetti-burst";

interface SessionSummaryModalProps {
  totalReviewed: number;
  streak: number;
  onRestart: () => void;
  onBackToDashboard: () => void;
}

export function SessionSummaryModal({
  totalReviewed,
  streak,
  onRestart,
  onBackToDashboard,
}: SessionSummaryModalProps) {
  return (
    <>
      <ConfettiBurst trigger={true} withSound={true} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto p-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] text-center flex flex-col items-center gap-6 backdrop-blur-md"
      >
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shadow-inner">
        <Award size={32} />
      </div>

      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[var(--brand-primary)]">
          Sesi Selesai!
        </span>
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mt-1">
          Langkah Mantap Hari Ini
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
          Kamu baru saja menyelesaikan review <b>{totalReviewed} kartu</b> dengan metode Active Recall. Ingatanmu makin merekat!
        </p>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-sm">
        <Flame size={18} className="fill-amber-500" />
        <span>Streak Dipertahankan: {streak} Hari Berturut-turut!</span>
      </div>

      <div className="flex flex-col w-full gap-2.5 pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98"
        >
          <RotateCcw size={16} /> Ulangi Sesi Ini
        </button>

        <button
          type="button"
          onClick={onBackToDashboard}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
        >
          Kembali ke Menu Utama <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
    </>
  );
}
