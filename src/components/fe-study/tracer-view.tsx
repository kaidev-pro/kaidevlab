"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Table,
  CheckCircle2,
  XCircle,
  Code2,
  HelpCircle,
  Target,
  ArrowRight,
  Layers,
} from "lucide-react";
import {
  FE_TRACER_ALGORITHMS,
  TracerAlgorithm,
  TracerChallenge,
} from "@/data/fe-tracer-data";

interface TracerViewProps {
  onBackToMenu: () => void;
}

type TracerTab = "debugger" | "challenges";

export function TracerView({ onBackToMenu }: TracerViewProps) {
  const [activeTab, setActiveTab] = useState<TracerTab>("debugger");
  const [selectedAlgoIndex, setSelectedAlgoIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileView, setMobileView] = useState<"code" | "table" | "split">("code");

  // Challenge mode states
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const algorithms = FE_TRACER_ALGORITHMS;
  const currentAlgo: TracerAlgorithm = algorithms[selectedAlgoIndex];
  const steps = currentAlgo.steps;
  const currentStep = steps[currentStepIndex] || steps[0];

  // Flatten all challenges across algorithms for the challenge tab
  const allChallenges: { algo: TracerAlgorithm; challenge: TracerChallenge }[] = useMemo(() => {
    const list: { algo: TracerAlgorithm; challenge: TracerChallenge }[] = [];
    algorithms.forEach((algo) => {
      algo.challenges.forEach((ch) => {
        list.push({ algo, challenge: ch });
      });
    });
    return list;
  }, [algorithms]);

  const currentChallengeItem = allChallenges[activeChallengeIndex] || allChallenges[0];

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleSelectAlgo = (idx: number) => {
    setSelectedAlgoIndex(idx);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Jump from challenge to debugger step
  const handleJumpToDebugger = (algoId: string, stepIndex?: number) => {
    const targetAlgoIdx = algorithms.findIndex((a) => a.id === algoId);
    if (targetAlgoIdx !== -1) {
      setSelectedAlgoIndex(targetAlgoIdx);
      setCurrentStepIndex(stepIndex ?? 0);
      setActiveTab("debugger");
    }
  };

  const isCompleted = currentStepIndex === steps.length - 1;

  // Category badge colors
  const getCatBadge = (cat: TracerAlgorithm["category"]) => {
    switch (cat) {
      case "search":
        return "bg-blue-500/10 text-blue-500 border-blue-500/25";
      case "sort":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/25";
      case "structure":
        return "bg-purple-500/10 text-purple-500 border-purple-500/25";
      case "math":
        return "bg-amber-500/10 text-amber-500 border-amber-500/25";
      default:
        return "bg-[var(--surface-soft)] text-[var(--text-secondary)] border-[var(--border)]";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 select-none font-sans pb-12">
      {/* Top Navigation & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
            <Terminal size={20} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
              科目B アルゴリズム・擬似言語道場
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Penelusuran Trace Table (トレース表) & Latihan Soal Isian Rumpang (穴埋め問題)
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("debugger")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "debugger"
                ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Code2 size={14} />
            <span>Visual Step Tracer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("challenges")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "challenges"
                ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Target size={14} />
            <span>Soal 科目B ({allChallenges.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================== */}
      {/* TAB 1: VISUAL STEP TRACER (DEBUGGER)                       */}
      {/* ========================================================== */}
      {activeTab === "debugger" && (
        <div className="flex flex-col gap-6 pb-24 lg:pb-0">
          {/* Algorithm Selection Pills Bar */}
          <div className="w-full overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] min-w-max shadow-sm">
              {algorithms.map((algo, idx) => (
                <button
                  key={algo.id}
                  type="button"
                  onClick={() => handleSelectAlgo(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 active:scale-95 ${
                    selectedAlgoIndex === idx
                      ? "bg-[var(--surface-soft)] text-[var(--text-primary)] shadow-sm border border-[var(--border)] font-bold ring-1 ring-[var(--brand-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getCatBadge(algo.category)}`}>
                    {algo.category.toUpperCase()}
                  </span>
                  <span>{algo.titleJp.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Algorithm Header Banner */}
          <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getCatBadge(currentAlgo.category)}`}>
                  {currentAlgo.category}
                </span>
                <span className="text-xs text-[var(--text-secondary)] font-medium">
                  {currentAlgo.titleEn}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mt-1">
                {currentAlgo.titleJp}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-2xl leading-relaxed">
                {currentAlgo.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const chIdx = allChallenges.findIndex((c) => c.algo.id === currentAlgo.id);
                if (chIdx !== -1) {
                  setActiveChallengeIndex(chIdx);
                  setSelectedOptionKey(null);
                  setIsAnswerSubmitted(false);
                  setActiveTab("challenges");
                }
              }}
              className="px-4 py-2 rounded-xl border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
            >
              <Target size={14} />
              <span>Tes Soal 科目B Ini →</span>
            </button>
          </div>

          {/* Mobile View Switcher (lg:hidden) */}
          <div className="lg:hidden flex items-center p-1 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMobileView("code")}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mobileView === "code"
                  ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm font-bold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Code2 size={13} />
              <span>Kode IPA</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileView("table")}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mobileView === "table"
                  ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm font-bold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Table size={13} />
              <span>Tabel Variabel</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileView("split")}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mobileView === "split"
                  ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm font-bold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Layers size={13} />
              <span>Keduanya</span>
            </button>
          </div>

          {/* Main Grid: Code Editor (Left) & Live Trace Table (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Code Pane (7 cols) */}
            <div
              className={`p-5 rounded-3xl border border-[#2d4268] bg-[#0c1628] text-slate-100 font-mono text-xs sm:text-sm flex-col justify-between shadow-2xl overflow-hidden lg:col-span-7 ${
                mobileView === "table" ? "hidden lg:flex" : "flex"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/10 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-mono text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      IPA 公式擬似言語 (科目B 準拠)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">
                    Langkah {currentStepIndex + 1} / {steps.length}
                  </span>
                </div>

                <div className="flex flex-col gap-1 overflow-x-auto py-2 pr-1">
                  {currentAlgo.codeLines.map((line, idx) => {
                    const isActive = idx === currentStep.lineIndex;
                    return (
                      <div
                        key={idx}
                        className={`flex items-start gap-4 px-3 py-1.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-600/30 text-white font-bold border-l-4 border-blue-400 shadow-sm"
                            : "text-slate-400 hover:text-slate-300"
                        }`}
                      >
                        <span className="w-6 text-right opacity-30 select-none text-xs mt-0.5">{idx + 1}</span>
                        <span className="whitespace-pre leading-relaxed">{line}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Compact Variable Snapshot (Visible only on mobile in Code view) */}
              <div className="lg:hidden mt-3 p-3 rounded-2xl bg-blue-950/60 border border-blue-500/30 text-xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-blue-300 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Sparkles size={11} className="text-amber-400" />
                    Status Langkah {currentStepIndex + 1}:
                  </span>
                  <span className="font-mono opacity-70">
                    {currentStepIndex + 1}/{steps.length}
                  </span>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed mb-2 font-sans font-medium">
                  {currentStep.explanation}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(currentStep.variableState).map(([k, v]) => (
                    <span
                      key={k}
                      className="px-2 py-0.5 rounded-lg bg-blue-900/50 border border-blue-400/25 text-[11px] font-mono"
                    >
                      <span className="text-blue-300 font-bold">{k}: </span>
                      <span className="text-white font-semibold">{String(v)}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* IPA Syntax Cheat Helper */}
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-amber-300/90 font-semibold flex items-center gap-1">
                  <Code2 size={13} className="shrink-0 text-amber-300" /> Sintaks IPA:
                </span>
                <span><code className="text-emerald-300 font-bold">←</code> 代入 (Assignment)</span>
                <span><code className="text-sky-300 font-bold">＝ / ≠ / ≦</code> 比較 (Comparison)</span>
                <span><code className="text-purple-300 font-bold">data[1..n]</code> 配列添字 1始まり</span>
              </div>
            </div>

            {/* Right: Live Trace Table & Step Explanation (5 cols) */}
            <div
              className={`p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-md flex-col justify-between gap-5 lg:col-span-5 ${
                mobileView === "code" ? "hidden lg:flex" : "flex"
              }`}
            >
              <div className="flex flex-col gap-5">
                {/* Mobile Active Line Badge */}
                <div className="lg:hidden p-3 rounded-2xl bg-[#0c1628] border border-[#2d4268] text-xs font-mono text-slate-100 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-600/40 text-blue-300 font-bold text-[10px] shrink-0">
                    Baris {currentStep.lineIndex + 1}
                  </span>
                  <span className="truncate text-slate-200 text-[11px]">
                    {currentAlgo.codeLines[currentStep.lineIndex]}
                  </span>
                </div>

                {/* Step Explanation Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider">
                    <span>Langkah ke-{currentStepIndex + 1}</span>
                    {isCompleted && (
                      <span className="text-emerald-500 flex items-center gap-1 font-bold">
                        <CheckCircle2 size={13} /> Selesai!
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-[15px] text-[var(--text-primary)] leading-[1.8] font-medium">
                    {currentStep.explanation}
                  </p>
                </div>

                {/* Trace Table (トレース表) */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1.5">
                      <Table size={14} />
                      Tabel Variabel (トレース表)
                    </span>
                    <span className="text-[11px] opacity-60 font-mono">Real-time State</span>
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
                    <table className="w-full text-xs sm:text-sm text-left">
                      <thead className="bg-[var(--surface-soft)] text-[var(--text-secondary)] border-b border-[var(--border)]">
                        <tr>
                          <th className="p-3 font-bold">Variabel</th>
                          <th className="p-3 font-bold">Nilai Sekarang</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]">
                        {Object.entries(currentStep.variableState).map(([key, val]) => (
                          <tr key={key} className="hover:bg-[var(--surface-soft)]/50 transition-colors">
                            <td className="p-3 font-mono font-bold text-[var(--brand-primary)]">{key}</td>
                            <td className="p-3 font-mono text-[var(--text-primary)] font-semibold">
                              {String(val)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Stepper Controls Bar (Desktop & Inline) */}
              <div className="flex items-center justify-between pt-5 border-t border-[var(--border)] gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-95"
                    title="Reset ke Langkah Awal"
                  >
                    <RotateCcw size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                      isPlaying
                        ? "border-amber-500 bg-amber-500/10 text-amber-500"
                        : "border-[var(--border)] hover:border-[var(--brand-primary)] text-[var(--text-primary)]"
                    }`}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isPlaying ? "Jeda" : "Auto"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStepIndex === 0}
                    className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isCompleted}
                    className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold shadow-md disabled:opacity-40 transition-all active:scale-95"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Floating Stepper Navigation Bar */}
          <div className="lg:hidden fixed bottom-4 left-3 right-3 z-40 p-2.5 rounded-2xl bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] shadow-2xl flex items-center justify-between gap-2 ring-1 ring-black/5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-95 bg-[var(--surface)]"
                title="Reset"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 rounded-xl border text-xs font-bold active:scale-95 flex items-center gap-1 ${
                  isPlaying
                    ? "border-amber-500 bg-amber-500/10 text-amber-500"
                    : "border-[var(--border)] text-[var(--text-primary)] bg-[var(--surface)]"
                }`}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span className="text-[11px] font-medium">{isPlaying ? "Jeda" : "Auto"}</span>
              </button>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[9px] font-bold text-[var(--brand-primary)] uppercase tracking-wider">
                Langkah
              </span>
              <span className="text-xs font-bold text-[var(--text-primary)] font-mono">
                {currentStepIndex + 1} / {steps.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-bold disabled:opacity-30 active:scale-95 flex items-center gap-0.5 text-[var(--text-secondary)]"
              >
                <ChevronLeft size={15} /> Prev
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={isCompleted}
                className="px-3.5 py-2 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold disabled:opacity-40 active:scale-95 shadow-md flex items-center gap-0.5"
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 2: LATIHAN SOAL 科目B (CHALLENGES / 穴埋め問題)         */}
      {/* ========================================================== */}
      {activeTab === "challenges" && currentChallengeItem && (
        <div className="flex flex-col gap-6">
          {/* Question Selector Strip */}
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
            <span className="text-xs font-bold text-[var(--text-secondary)] px-2">
              Daftar Soal:
            </span>
            {allChallenges.map((item, idx) => {
              const isCurrent = activeChallengeIndex === idx;
              return (
                <button
                  key={item.challenge.id}
                  type="button"
                  onClick={() => {
                    setActiveChallengeIndex(idx);
                    setSelectedOptionKey(null);
                    setIsAnswerSubmitted(false);
                  }}
                  className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center ${
                    isCurrent
                      ? "ring-2 ring-[var(--brand-primary)] bg-[var(--brand-primary)] text-white shadow-sm"
                      : "border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Main Challenge Card */}
          <div className="p-6 sm:p-8 md:p-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-md flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-mono">
                  【問 {activeChallengeIndex + 1}】 {currentChallengeItem.algo.titleJp.split(" ")[0]}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">
                  {currentChallengeItem.challenge.type === "fill_blank" ? "穴埋め (Isian Rumpang)" : "出力予測 (Trace)"}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleJumpToDebugger(
                    currentChallengeItem.algo.id,
                    currentChallengeItem.challenge.hintStepIndex
                  )
                }
                className="text-xs font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1"
              >
                <span>Buka di Step Tracer</span>
                <Code2 size={13} />
              </button>
            </div>

            {/* Question Text */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base sm:text-[18px] md:text-[19px] font-bold text-[var(--text-primary)] leading-[2] tracking-[0.02em]">
                {currentChallengeItem.challenge.questionJp}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic leading-relaxed border-l-2 border-[var(--brand-primary)]/40 pl-3">
                &ldquo;{currentChallengeItem.challenge.questionId}&rdquo;
              </p>
            </div>

            {/* Code Snippet with Highlighted Blank [ a ] */}
            {currentChallengeItem.challenge.codeSnippet && (
              <div className="p-5 rounded-2xl bg-[#0c1628] border border-[#2d4268] text-slate-100 font-mono text-xs sm:text-sm shadow-inner">
                <div className="text-[11px] text-slate-400 mb-2 font-bold font-mono">
                  [ 擬似言語抜粋 / Pseudocode Snippet ]
                </div>
                <div className="flex flex-col gap-1.5">
                  {currentChallengeItem.challenge.codeSnippet.map((line, lIdx) => (
                    <div key={lIdx} className="leading-relaxed">
                      {line.includes("[  a  ]") ? (
                        <span>
                          {line.split("[  a  ]")[0]}
                          <span className="inline-block px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400 font-bold mx-1 animate-pulse">
                            [  a  ]
                          </span>
                          {line.split("[  a  ]")[1]}
                        </span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4 Choices */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="text-xs font-bold text-[var(--text-secondary)] px-1 mb-1">
                【選択肢】 正しいものを1つ選択してください：
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
                {currentChallengeItem.challenge.options.map((opt) => {
                  const isSelected = selectedOptionKey === opt.key;
                  const isRight = opt.isCorrect;

                  let style =
                    "border-[var(--border)] bg-[var(--surface-soft)]/50 hover:bg-[var(--surface-soft)] hover:border-[var(--brand-primary)]/50 text-[var(--text-primary)]";

                  if (isAnswerSubmitted) {
                    if (isRight) {
                      style = "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold shadow-md";
                    } else if (isSelected && !isRight) {
                      style = "border-rose-500 bg-rose-500/10 text-rose-500 line-through";
                    } else {
                      style = "opacity-40 border-[var(--border)] bg-transparent text-[var(--text-secondary)]";
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        if (!isAnswerSubmitted) {
                          setSelectedOptionKey(opt.key);
                          setIsAnswerSubmitted(true);
                        }
                      }}
                      disabled={isAnswerSubmitted}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-start gap-4 active:scale-[0.99] min-h-[58px] ${style}`}
                    >
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                        {opt.key}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base font-medium leading-[1.8] pt-0.5 font-mono">
                          {opt.text}
                        </p>
                      </div>

                      {isAnswerSubmitted && (
                        <div className="mt-1 shrink-0">
                          {isRight && <CheckCircle2 size={18} className="text-emerald-500" />}
                          {isSelected && !isRight && <XCircle size={18} className="text-rose-500" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Feedback & Kaisetsu Drawer */}
            <AnimatePresence>
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] flex flex-col gap-4 mt-2"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                    <span
                      className={`text-xs sm:text-sm uppercase font-bold tracking-wider flex items-center gap-2 ${
                        currentChallengeItem.challenge.options.find((o) => o.key === selectedOptionKey)?.isCorrect
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }`}
                    >
                      {currentChallengeItem.challenge.options.find((o) => o.key === selectedOptionKey)?.isCorrect ? (
                        <>
                          <CheckCircle2 size={16} /> 正解！ Jawaban Kamu Benar!
                        </>
                      ) : (
                        <>
                          <XCircle size={16} /> 不正解 · Jawaban Kurang Tepat
                        </>
                      )}
                    </span>

                    <span className="text-xs sm:text-sm font-bold text-emerald-500">
                      正解: 【 {currentChallengeItem.challenge.options.find((o) => o.isCorrect)?.key} 】
                    </span>
                  </div>

                  {/* Option Explanation */}
                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text-primary)] leading-[1.8]">
                    <span className="font-bold text-[var(--brand-primary)] block mb-1">
                      Ulasan Jawaban:
                    </span>
                    {currentChallengeItem.challenge.options.find((o) => o.key === selectedOptionKey)?.explanation}
                  </div>

                  {/* Key Takeaway */}
                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    <b className="text-[var(--brand-primary)]">Kunci Ujian 科目B:</b>{" "}
                    {currentChallengeItem.challenge.keyTakeaway}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleJumpToDebugger(
                          currentChallengeItem.algo.id,
                          currentChallengeItem.challenge.hintStepIndex
                        )
                      }
                      className="w-full sm:flex-1 py-3 rounded-xl border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Code2 size={15} />
                      <span>Pelajari Trace Table di Debugger</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const nextIdx = (activeChallengeIndex + 1) % allChallenges.length;
                        setActiveChallengeIndex(nextIdx);
                        setSelectedOptionKey(null);
                        setIsAnswerSubmitted(false);
                      }}
                      className="w-full sm:flex-1 py-3 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Lanjut ke Soal Berikutnya</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
