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

  // Prevent body scroll when modal is open (mobile)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
          className="relative z-10 w-full sm:max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-t-2xl sm:rounded-3xl shadow-2xl flex flex-col text-[var(--text-primary)] max-h-[80vh] sm:max-h-[85vh]"
        >
          {/* Fixed Top Section (non-scrollable) */}
          <div className="px-4 sm:px-7 pt-3 sm:pt-6 pb-0 shrink-0">
            {/* Mobile Drag Indicator */}
            <div className="w-10 h-1 bg-[var(--border)] rounded-full mx-auto sm:hidden mb-3" />

            {/* Top Header: Badge + Close Button */}
            <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-[var(--border)]/70">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span
                  className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full border shrink-0 ${levelColor}`}
                >
                  {term.level === "FE-IT" ? "IT-Term" : `JLPT ${term.level}`}
                </span>
                <span className="text-[10px] sm:text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1 truncate">
                  <BookOpen size={11} className="shrink-0" />
                  <span className="truncate">
                    {term.contextLabel || (term.level === "FE-IT" ? "Glosarium FE" : "Kamus Kosakata")}
                  </span>
                </span>
              </div>

              <button
                type="button"
                onClick={close}
                className="p-2 sm:p-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand-primary)]/50 transition-all active:scale-90 shrink-0 -mr-0.5"
                title="Tutup (Esc)"
              >
                <X size={16} className="sm:w-[15px] sm:h-[15px]" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-7 py-3 sm:py-4 flex flex-col gap-3 sm:gap-4">
            {/* Term Display (Big Kanji + Reading + Audio) */}
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[var(--surface-soft)]/60 border border-[var(--border)] flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-wide font-japanese truncate">
                    {term.termJp}
                  </h3>
                  {term.partOfSpeech && (
                    <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--brand-primary)] shrink-0 whitespace-nowrap">
                      {term.partOfSpeech}
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-sm text-[var(--brand-primary)] font-mono font-semibold">
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
                className={`p-3 sm:p-3 rounded-xl sm:rounded-2xl border transition-all shrink-0 active:scale-90 ${
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
            <div className="space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] block">
                Arti Kosakata (Bahasa Indonesia):
              </span>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-[13px] sm:text-[15px] leading-relaxed text-[var(--text-primary)] font-medium">
                {term.meaningId}
                {term.meaningEn && (
                  <div className="mt-2 pt-2 border-t border-[var(--border)]/60 text-[11px] sm:text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-[var(--brand-primary)]">EN:</span>
                    <span>{term.meaningEn}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Collocation (If available) */}
            {term.collocation && (
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-[11px] sm:text-xs text-[var(--text-primary)] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)] block">
                  Pasangan Kata / Kolokasi (連語):
                </span>
                <p className="font-semibold text-[13px] sm:text-sm font-japanese leading-relaxed">
                  {term.collocation.jpRuby.replace(/\[([^:\]]+):([^\]]+)\]/g, "$1 ($2)")}
                </p>
                <p className="text-[var(--text-secondary)] italic">{term.collocation.meaningId}</p>
              </div>
            )}

            {/* Exam / Study Tip */}
            {term.examTip && (
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                <Lightbulb size={15} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <b className="block text-amber-600 dark:text-amber-400 mb-0.5 uppercase tracking-wide text-[10px]">
                    {term.level === "FE-IT" ? "Tips Ujian FE:" : "Tips Pemahaman & JLPT:"}
                  </b>
                  {term.examTip}
                </div>
              </div>
            )}
          </div>

          {/* Fixed Bottom Action (safe-area aware) */}
          <div className="px-4 sm:px-7 pb-4 sm:pb-6 pt-2 shrink-0" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
            <button
              type="button"
              onClick={close}
              className="w-full py-3 sm:py-3 rounded-xl sm:rounded-2xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-[13px] sm:text-sm font-bold tracking-wide shadow-md transition-all active:scale-[0.98]"
            >
              Mengerti (Tutup)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
