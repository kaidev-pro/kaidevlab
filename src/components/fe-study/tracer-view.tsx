"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Play,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Table,
  CheckCircle2
} from "lucide-react";
import { FE_TRACER_ALGORITHMS, TracerAlgorithm } from "@/data/fe-tracer-data";

interface TracerViewProps {
  onBackToMenu: () => void;
}

export function TracerView({ onBackToMenu }: TracerViewProps) {
  const [selectedAlgoIndex, setSelectedAlgoIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentAlgo: TracerAlgorithm = FE_TRACER_ALGORITHMS[selectedAlgoIndex];
  const steps = currentAlgo.steps;
  const currentStep = steps[currentStepIndex] || steps[0];

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
  };

  const handleSelectAlgo = (idx: number) => {
    setSelectedAlgoIndex(idx);
    setCurrentStepIndex(0);
  };

  const isCompleted = currentStepIndex === steps.length - 1;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 select-none">
      {/* Top Header & Algo Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--brand-primary)] flex items-center gap-1.5">
            <Terminal size={14} />
            Interactive Pseudocode Debugger · 科目B
          </span>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] font-serif mt-1">
            {currentAlgo.titleJp}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {currentAlgo.description}
          </p>
        </div>

        {/* Algo Toggle Pills */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)]">
          {FE_TRACER_ALGORITHMS.map((algo, idx) => (
            <button
              key={algo.id}
              type="button"
              onClick={() => handleSelectAlgo(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedAlgoIndex === idx
                  ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-sm border border-[var(--border)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {algo.titleJp.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Code Editor (Left) & Trace Table (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Code Pane (7 cols) */}
        <div className="md:col-span-7 p-4 rounded-2xl border border-[var(--border)] bg-[var(--midnight)] text-slate-200 font-mono text-xs flex flex-col shadow-inner overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-[11px] text-slate-400">
            <span>pseudocode.fe</span>
            <span>Step {currentStepIndex + 1} / {steps.length}</span>
          </div>

          <div className="flex flex-col gap-1 overflow-x-auto py-2">
            {currentAlgo.codeLines.map((line, idx) => {
              const isActive = idx === currentStep.lineIndex;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 px-2.5 py-1 rounded transition-colors ${
                    isActive
                      ? "bg-blue-500/25 text-white font-bold border-l-2 border-blue-400"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <span className="w-5 text-right opacity-30 select-none">{idx + 1}</span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Live Trace Table & Step Explanation (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4 p-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)]">
          <div className="flex flex-col gap-4">
            {/* Step Explanation Card */}
            <div className="p-3.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-[var(--brand-primary)] uppercase tracking-wider">
                <span>Langkah ke-{currentStepIndex + 1}</span>
                {isCompleted && (
                  <span className="text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Selesai!
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-[var(--text-primary)] leading-relaxed font-medium">
                {currentStep.explanation}
              </p>
            </div>

            {/* Trace Table (トレース表) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                <Table size={13} />
                Tabel Penelusuran Variabel (トレース表)
              </span>

              <div className="rounded-xl border border-[var(--border)] overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[var(--surface-soft)] text-[var(--text-secondary)] border-b border-[var(--border)]">
                    <tr>
                      <th className="p-2.5 font-bold">Variabel</th>
                      <th className="p-2.5 font-bold">Nilai Sekarang</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {Object.entries(currentStep.variableState).map(([key, val]) => (
                      <tr key={key} className="hover:bg-[var(--surface-soft)]/40 transition-colors">
                        <td className="p-2.5 font-mono font-semibold text-[var(--brand-primary)]">{key}</td>
                        <td className="p-2.5 font-mono text-[var(--text-primary)]">
                          {String(val)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Stepper Controls Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title="Reset ke Langkah Awal"
            >
              <RotateCcw size={16} />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft size={15} /> Prev
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={isCompleted}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold shadow-md disabled:opacity-40 transition-all active:scale-95"
              >
                Next Step <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
