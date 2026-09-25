"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Flame,
  Filter,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
  BrainCircuit,
  Trophy,
  ExternalLink,
  Volume2,
  VolumeX,
  Languages,
  Cpu,
  Kanban,
  TrendingUp,
  X,
} from "lucide-react";
import { QuizQuestion, FE_QUIZ_QUESTIONS } from "@/data/fe-quiz-data";
import {
  loadWrongQuestions,
  toggleMastered,
  deleteWrongRecord,
  clearMasteredRecords,
  resetWrongRecords,
  getPopulatedWrongQuestions,
  getWrongNotebookStats,
  PopulatedWrongQuestion,
  WrongQuestionsStore,
} from "@/lib/fe-wrong-questions-storage";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { autoAnnotateRuby } from "@/lib/fe-furigana";
import { useJapaneseTts } from "@/lib/use-japanese-tts";

interface WrongQuestionsViewProps {
  onBackToMenu: () => void;
  onStartDrill: (questions: QuizQuestion[]) => void;
}

export function WrongQuestionsView({
  onBackToMenu,
  onStartDrill,
}: WrongQuestionsViewProps) {
  const [store, setStore] = useState<WrongQuestionsStore>({
    records: {},
    lastUpdated: 0,
  });
  const [activeFilter, setActiveFilter] = useState<"all" | "unmastered" | "mastered">("unmastered");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [confirmResetModal, setConfirmResetModal] = useState(false);
  const [showFurigana, setShowFurigana] = useState(false);
  const { speak, stop, isSpeaking, activeSpeechId } = useJapaneseTts();

  // Stop audio on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  // Load from localStorage on mount
  useEffect(() => {
    setStore(loadWrongQuestions());
  }, []);

  const populatedList = useMemo(() => {
    return getPopulatedWrongQuestions(store);
  }, [store]);

  const stats = useMemo(() => {
    return getWrongNotebookStats(store);
  }, [store]);

  // Filter items
  const filteredItems = useMemo(() => {
    return populatedList.filter(({ record, question }) => {
      // Status filter
      if (activeFilter === "unmastered" && record.mastered) return false;
      if (activeFilter === "mastered" && !record.mastered) return false;

      // Category filter
      if (categoryFilter !== "all" && question.category !== categoryFilter) return false;

      return true;
    });
  }, [populatedList, activeFilter, categoryFilter]);

  // Toggle accordion card
  const toggleCardExpand = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Toggle mastered status
  const handleToggleMastered = (id: string) => {
    const updated = toggleMastered(id);
    setStore({ ...updated });
  };

  // Delete single record
  const handleDeleteRecord = (id: string) => {
    const updated = deleteWrongRecord(id);
    setStore({ ...updated });
  };

  // Clear mastered records
  const handleClearMastered = () => {
    const updated = clearMasteredRecords();
    setStore({ ...updated });
  };

  // Reset all
  const handleResetAll = () => {
    const updated = resetWrongRecords();
    setStore({ ...updated });
    setConfirmResetModal(false);
  };

  // Drill questions that match current unmastered or filtered
  const handleLaunchDrill = (customSet?: PopulatedWrongQuestion[]) => {
    const targetSet = customSet || (filteredItems.length > 0 ? filteredItems : populatedList);
    const questionsToDrill = targetSet.map((item) => item.question);
    if (questionsToDrill.length > 0) {
      onStartDrill(questionsToDrill);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "technology":
        return "テクノロジ系";
      case "management":
        return "マネジメント系";
      case "strategy":
        return "ストラテジ系";
      default:
        return category;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-5 sm:gap-8 pb-16 select-none animate-fade-in min-w-0 max-w-full">
      {/* ==================================================== */}
      {/* 1. TOP HEADER & NAVIGATION                           */}
      {/* ==================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-[var(--border)] min-w-0 max-w-full">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onBackToMenu}
            className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shrink-0"
          >
            ← Kembali ke Menu
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold truncate">
            <BookOpen size={13} />
            <span>間違え直しノート</span>
          </div>
        </div>

        {populatedList.length > 0 && (
          <div className="flex items-center gap-2">
            {stats.mastered > 0 && (
              <button
                type="button"
                onClick={handleClearMastered}
                className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
                title="Hapus soal yang sudah berstatus dikuasai dari daftar"
              >
                Bersihkan Dikuasai ({stats.mastered})
              </button>
            )}
            <button
              type="button"
              onClick={() => setConfirmResetModal(true)}
              className="p-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-rose-500/10 text-[var(--text-secondary)] hover:text-rose-500 transition-all"
              title="Reset seluruh catatan soal salah"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* 2. OVERVIEW BANNER & STATS CARDS                     */}
      {/* ==================================================== */}
      <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col gap-4 sm:gap-6 min-w-0 max-w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
              <BrainCircuit size={28} />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-rose-500">
                Cognitive Weakness Radar
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] font-serif mt-0.5">
                間違え直しノート (Buku Soal Salah)
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-2xl leading-relaxed">
                Soal yang pernah kamu jawab keliru di latihan maupun simulasi ujian CBT Prometric tersimpan otomatis di sini.
                Latih berulang kali sampai ambang batas <b>習得済み (Mastered - 2x Benar Beruntun)</b>.
              </p>
            </div>
          </div>

          {stats.unmastered > 0 && (
            <button
              type="button"
              onClick={() => handleLaunchDrill()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
            >
              <Flame size={16} />
              <span>Drill Soal Salah ({stats.unmastered} Soal)</span>
            </button>
          )}
        </div>

        {/* Quick Numbers Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-2 border-t border-[var(--border)]">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-center flex sm:flex-col items-center justify-between sm:justify-center">
            <p className="text-xs text-[var(--text-secondary)] font-medium">Total Tercatat</p>
            <p className="text-lg sm:text-2xl font-bold font-mono text-[var(--text-primary)] sm:mt-0.5">
              {stats.total} <span className="text-xs font-sans opacity-50">問</span>
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-500/5 border border-rose-500/20 text-center flex sm:flex-col items-center justify-between sm:justify-center">
            <p className="text-xs text-rose-500 font-semibold">Perlu Latihan (未習得)</p>
            <p className="text-lg sm:text-2xl font-bold font-mono text-rose-500 sm:mt-0.5">
              {stats.unmastered} <span className="text-xs font-sans opacity-50">問</span>
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center flex sm:flex-col items-center justify-between sm:justify-center">
            <p className="text-xs text-emerald-500 font-semibold">Sudah Dikuasai (習得済)</p>
            <p className="text-lg sm:text-2xl font-bold font-mono text-emerald-500 sm:mt-0.5">
              {stats.mastered} <span className="text-xs font-sans opacity-50">問</span>
            </p>
          </div>
        </div>

        {/* Domain Weakness Breakdown Bars */}
        {stats.total > 0 && (
          <div className="flex flex-col gap-3 pt-2">
            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Peta Kelemahan Berdasarkan 3 Domain Resmi IPA
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Tech */}
              <div className="p-3.5 rounded-xl bg-[var(--surface-soft)]/60 border border-[var(--border)] flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--brand-primary)] flex items-center gap-1.5">
                    <Cpu size={14} className="shrink-0" /> テクノロジ系
                  </span>
                  <span className="font-mono text-[var(--text-secondary)]">
                    {stats.categoryBreakdown.technology.unmastered} belum dikuasai
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--brand-primary)] rounded-full transition-all"
                    style={{
                      width: `${
                        stats.categoryBreakdown.technology.total > 0
                          ? ((stats.categoryBreakdown.technology.total - stats.categoryBreakdown.technology.unmastered) /
                              stats.categoryBreakdown.technology.total) *
                            100
                          : 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Mgmt */}
              <div className="p-3.5 rounded-xl bg-[var(--surface-soft)]/60 border border-[var(--border)] flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-500 flex items-center gap-1.5">
                    <Kanban size={14} className="shrink-0" /> マネジメント系
                  </span>
                  <span className="font-mono text-[var(--text-secondary)]">
                    {stats.categoryBreakdown.management.unmastered} belum dikuasai
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all"
                    style={{
                      width: `${
                        stats.categoryBreakdown.management.total > 0
                          ? ((stats.categoryBreakdown.management.total - stats.categoryBreakdown.management.unmastered) /
                              stats.categoryBreakdown.management.total) *
                            100
                          : 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Strategy */}
              <div className="p-3.5 rounded-xl bg-[var(--surface-soft)]/60 border border-[var(--border)] flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-500 flex items-center gap-1.5">
                    <TrendingUp size={14} className="shrink-0" /> ストラテジ系
                  </span>
                  <span className="font-mono text-[var(--text-secondary)]">
                    {stats.categoryBreakdown.strategy.unmastered} belum dikuasai
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{
                      width: `${
                        stats.categoryBreakdown.strategy.total > 0
                          ? ((stats.categoryBreakdown.strategy.total - stats.categoryBreakdown.strategy.unmastered) /
                              stats.categoryBreakdown.strategy.total) *
                            100
                          : 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* 3. FILTER CONTROLS & PILLS                           */}
      {/* ==================================================== */}
      {populatedList.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)]">
            <button
              type="button"
              onClick={() => setActiveFilter("unmastered")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "unmastered"
                  ? "bg-[var(--surface)] text-rose-500 shadow-sm border border-[var(--border)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Perlu Review ({stats.unmastered})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("mastered")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "mastered"
                  ? "bg-[var(--surface)] text-emerald-500 shadow-sm border border-[var(--border)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Sudah Dikuasai ({stats.mastered})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "all"
                  ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm border border-[var(--border)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Semua ({stats.total})
            </button>
          </div>

          {/* Category Filter & Furigana Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFurigana((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                showFurigana
                  ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-sm"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-soft)]"
              }`}
              title="Tampilkan / Sembunyikan Furigana (ルビ)"
            >
              <Languages size={13} />
              <span>ルビ {showFurigana ? "ON" : "OFF"}</span>
            </button>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1">
                <Filter size={12} />
                Filter:
              </span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--text-primary)] focus:outline-none"
              >
                <option value="all">Semua Kategori</option>
                <option value="technology">テクノロジ系 (Tech)</option>
                <option value="management">マネジメント系 (Mgmt)</option>
                <option value="strategy">ストラテジ系 (Strategy)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 4. LIST OF WRONG QUESTIONS CARDS                     */}
      {/* ==================================================== */}
      {populatedList.length === 0 ? (
        /* Empty State: Completely Clean! */
        <div className="p-10 sm:p-14 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Trophy size={32} />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif">
              Buku Catatan Soal Salah Bersih! (清潔)
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto mt-1 leading-relaxed">
              Kamu belum memiliki catatan soal yang salah, atau semua soal yang pernah salah sudah berhasil kamu kuasai (100% Mastered).
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={onBackToMenu}
              className="px-5 py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold shadow-sm transition-all"
            >
              Kerjakan Latihan Soal Sekarang →
            </button>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        /* Empty by filter */
        <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-center text-xs text-[var(--text-secondary)]">
          Tidak ada soal yang sesuai dengan filter ini. Coba pilih filter &ldquo;Semua&rdquo;.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredItems.map(({ record, question }, idx) => {
            const isExpanded = expandedCards.has(question.id);

            return (
              <div
                key={question.id}
                className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                  record.mastered
                    ? "bg-[var(--surface)]/70 border-emerald-500/30"
                    : "bg-[var(--surface)] border-rose-500/30 shadow-[var(--shadow)]"
                }`}
              >
                {/* Header Row of Card */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)] text-[11px] font-bold text-[var(--brand-primary)]">
                      {getCategoryLabel(question.category)} · {question.subCategory}
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)] font-medium">
                      {question.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[11px] font-bold">
                      <XCircle size={12} />
                      {record.wrongCount}x Pernah Salah
                    </span>

                    {record.mastered ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-bold">
                        <CheckCircle2 size={12} />
                        習得済み (Mastered)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[11px] font-bold">
                        <AlertTriangle size={12} />
                        Perlu Review ({record.consecutiveCorrect}/2)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Body (Authentic Japanese - Spacious Typography) */}
                <div className="py-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                      【問題文】
                    </span>
                    <button
                      type="button"
                      onClick={() => speak(question.questionJp, `wrong-q-${question.id}`)}
                      className="text-xs text-[var(--brand-primary)] hover:underline flex items-center gap-1 font-bold"
                    >
                      {activeSpeechId === `wrong-q-${question.id}` ? <VolumeX size={13} /> : <Volume2 size={13} />}
                      <span>{activeSpeechId === `wrong-q-${question.id}` ? "Stop" : "Dengarkan Soal"}</span>
                    </button>
                  </div>
                  <h4 className="text-base sm:text-[18px] md:text-[19px] font-bold text-[var(--text-primary)] leading-[2.1] tracking-[0.03em]">
                    <RubyTerm
                      rubyText={autoAnnotateRuby(question.questionJp)}
                      fallbackText={question.questionJp}
                      showFurigana={showFurigana}
                    />
                  </h4>

                  {/* Quick Answer Key Comparison Box */}
                  <div className="mt-4 p-4 rounded-2xl bg-[var(--surface-soft)]/70 border border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      {record.lastSelectedKey && (
                        <div className="flex items-center gap-1.5 text-rose-500 font-bold">
                          <span>Jawaban Terakhir Kamu:</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 font-mono">
                            <span>【 {record.lastSelectedKey} 】</span>
                            <X size={12} className="stroke-[3]" />
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                        <span>Kunci Jawaban Resmi:</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 font-mono">
                          <span>【 {question.correctKey} 】</span>
                          <Check size={12} className="stroke-[3]" />
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCardExpand(question.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-primary)] hover:underline"
                    >
                      {isExpanded ? "Tutup Pembahasan" : "Buka Terjemahan & Pembahasan (解説)"}
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Kaisetsu & Indonesian Translation Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-2 pb-4 border-t border-[var(--border)] flex flex-col gap-5 text-sm"
                    >
                      {/* Indonesian Translation */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col gap-1.5">
                        <span className="text-xs font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider">
                          <Languages size={13} className="shrink-0" /> Terjemahan Soal (Bahasa Indonesia)
                        </span>
                        <p className="text-sm sm:text-[15.5px] text-[var(--text-primary)] leading-[1.85] font-medium">
                          {question.questionTranslation}
                        </p>
                      </div>

                      {/* Official Explanation / Kaisetsu */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex flex-col gap-2">
                        <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen size={14} className="shrink-0" /> Inti Pembahasan Resmi (解説 - Kaisetsu)
                        </span>
                        <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.85]">
                          {question.summaryExplanation}
                        </p>

                        <div className="mt-2 pt-2 border-t border-[var(--border)] flex items-start gap-2">
                          <Sparkles size={15} className="text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                            <span className="text-amber-500">Kunci Ujian:</span> {question.keyTakeaway}
                          </p>
                        </div>
                      </div>

                      {/* Options Analysis Grid */}
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                          Analisis Tiap Opsi Jawaban:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {question.options.map((opt) => (
                            <div
                              key={opt.key}
                              className={`p-3 rounded-xl border text-xs flex flex-col gap-1 ${
                                opt.key === question.correctKey
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                                  : "bg-[var(--surface-soft)]/50 border-[var(--border)] text-[var(--text-secondary)]"
                              }`}
                            >
                              <div className="flex items-center justify-between font-bold">
                                <span>
                                  【 {opt.key} 】{" "}
                                  <RubyTerm
                                    rubyText={autoAnnotateRuby(opt.textJp)}
                                    fallbackText={opt.textJp}
                                    showFurigana={showFurigana}
                                  />
                                </span>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => speak(opt.textJp, `wrong-opt-${opt.key}-${question.id}`)}
                                    className="p-1 rounded hover:bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
                                    title="Dengarkan pelafalan opsi"
                                  >
                                    <Volume2 size={12} />
                                  </button>
                                  {opt.key === question.correctKey && (
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-white">
                                      正解
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-[11px] opacity-80 leading-relaxed mt-0.5">
                                {opt.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Action Buttons */}
                <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleMastered(question.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        record.mastered
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20"
                          : "bg-[var(--surface-soft)] border-[var(--border)] text-[var(--text-secondary)] hover:text-emerald-500"
                      }`}
                    >
                      <Check size={14} />
                      <span>{record.mastered ? "Batalkan Dikuasai" : "Tandai Sudah Dikuasai"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteRecord(question.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-rose-500/10 text-xs font-medium text-[var(--text-secondary)] hover:text-rose-500 transition-all"
                    >
                      <Trash2 size={13} />
                      <span>Hapus</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLaunchDrill([{ record, question }])}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <span>Latih Soal Ini Saja</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ==================================================== */}
      {/* 5. CONFIRM RESET MODAL                               */}
      {/* ==================================================== */}
      {confirmResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Trash2 size={24} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Reset Seluruh Buku Soal Salah?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
                Tindakan ini akan mengosongkan seluruh riwayat soal salah di perangkat ini. Data yang dihapus tidak dapat dipulihkan.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={() => setConfirmResetModal(false)}
                className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--text-secondary)]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleResetAll}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold"
              >
                Ya, Reset Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
