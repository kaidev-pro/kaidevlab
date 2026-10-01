"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X, BookOpen, Lightbulb, Layers } from "lucide-react";
import { useKanjiLookup } from "@/lib/fe-kanji-lookup-store";
import { useJapaneseTts } from "@/lib/use-japanese-tts";

export function KanjiLookupModal() {
  const { isOpen, term, close } = useKanjiLookup();
  const { speak, isSpeaking, stop } = useJapaneseTts();

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen || !term) return null;

  const levelColor =
    term.level === "N1"
      ? "bg-rose-500/15 text-rose-500 border-rose-500/30"
      : term.level === "N2"
      ? "bg-amber-500/15 text-amber-500 border-amber-500/30"
      : term.level === "N3"
      ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
      : term.level === "N4" || term.level === "N5"
      ? "bg-teal-500/15 text-teal-500 border-teal-500/30"
      : "bg-blue-500/15 text-blue-500 border-blue-500/30";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="absolute inset-0"
        />

        {/* Modal / Bottom Sheet Card */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative z-10 w-full sm:max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 flex flex-col gap-4 text-[var(--text-primary)] max-h-[85vh] overflow-y-auto"
        >
          {/* Mobile Drag Indicator */}
          <div className="w-12 h-1.5 bg-[var(--border)] rounded-full mx-auto sm:hidden -mt-1 mb-1 shrink-0" />

          {/* Top Header: Badge + Close Button */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-[var(--border)]/70">
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${levelColor}`}
              >
                {term.level === "FE-IT" ? "IT-Term" : `JLPT ${term.level}`}
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1">
                <BookOpen size={12} />
                {term.contextLabel || (term.level === "FE-IT" ? "Glosarium Kosakata FE" : "Kamus Kosakata & Kanji")}
              </span>
            </div>

            <button
              type="button"
              onClick={close}
              className="p-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand-primary)]/50 transition-all active:scale-95"
              title="Tutup (Esc)"
            >
              <X size={15} />
            </button>
          </div>

          {/* Term Display (Big Kanji + Reading + Audio) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-soft)]/60 border border-[var(--border)] flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-wide font-japanese truncate">
                  {term.termJp}
                </h3>
                {term.partOfSpeech && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--brand-primary)] shrink-0">
                    {term.partOfSpeech}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[var(--brand-primary)] font-mono font-semibold">
                【{term.reading}】 · <span className="opacity-80 italic">{term.romaji}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (isSpeaking) {
                  stop();
                } else {
                  speak(term.termJp, `vocab-${term.termJp}`);
                }
              }}
              className={`p-3 rounded-2xl border transition-all shrink-0 active:scale-95 ${
                isSpeaking
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md animate-pulse"
                  : "bg-[var(--surface)] text-[var(--brand-primary)] border-[var(--border)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10"
              }`}
              title="Dengarkan pengucapan Jepang"
            >
              {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Indonesian Meaning */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] block">
              Arti Kosakata (Bahasa Indonesia):
            </span>
            <div className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-sm sm:text-[15px] leading-relaxed text-[var(--text-primary)] font-medium">
              {term.meaningId}
              {term.meaningEn && (
                <div className="mt-2 pt-2 border-t border-[var(--border)]/60 text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-[var(--brand-primary)]">EN:</span>
                  <span>{term.meaningEn}</span>
                </div>
              )}
            </div>
          </div>

          {/* Collocation (If available) */}
          {term.collocation && (
            <div className="p-3.5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs text-[var(--text-primary)] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)] block">
                Pasangan Kata / Kolokasi (連語):
              </span>
              <p className="font-semibold text-sm font-japanese">
                {term.collocation.jpRuby.replace(/\[([^:\]]+):([^\]]+)\]/g, "$1 ($2)")}
              </p>
              <p className="text-[var(--text-secondary)] italic">{term.collocation.meaningId}</p>
            </div>
          )}

          {/* Exam / Study Tip */}
          {term.examTip && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <b className="block text-amber-600 dark:text-amber-400 mb-0.5 uppercase tracking-wide text-[10px]">
                  {term.level === "FE-IT" ? "Tips Ujian FE:" : "Tips Pemahaman & JLPT:"}
                </b>
                {term.examTip}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <button
            type="button"
            onClick={close}
            className="w-full py-3 rounded-2xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all active:scale-98"
          >
            Mengerti (Tutup)
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
