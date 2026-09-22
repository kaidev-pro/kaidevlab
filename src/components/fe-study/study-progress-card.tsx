"use client";

import { useState } from "react";
import { Flame, CheckCircle2, RotateCw, Download, Upload, Cpu, Kanban, TrendingUp } from "lucide-react";
import { StudyProgress, exportProgressJson, importProgressJson } from "@/lib/fe-study-storage";
import { FE_CARDS, FECategory } from "@/data/fe-study-data";

interface StudyProgressCardProps {
  progress: StudyProgress;
  onProgressUpdated: () => void;
}

export function StudyProgressCard({ progress, onProgressUpdated }: StudyProgressCardProps) {
  const [importMessage, setImportMessage] = useState<string | null>(null);

  const totalCards = FE_CARDS.length;
  const masteredCount = progress.masteredCardIds.length;
  const reviewCount = progress.reviewCardIds.length;
  const masteredPercentage = Math.round((masteredCount / totalCards) * 100);

  // Category counts
  const categoryCount = (cat: FECategory) => {
    const cardsInCat = FE_CARDS.filter((c) => c.category === cat);
    const masteredInCat = cardsInCat.filter((c) => progress.masteredCardIds.includes(c.id)).length;
    return {
      total: cardsInCat.length,
      mastered: masteredInCat,
      pct: cardsInCat.length > 0 ? Math.round((masteredInCat / cardsInCat.length) * 100) : 0,
    };
  };

  const techStats = categoryCount("technology");
  const mgmtStats = categoryCount("management");
  const stratStats = categoryCount("strategy");

  const handleExport = () => {
    const jsonStr = exportProgressJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fe-study-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importProgressJson(content)) {
        setImportMessage("Progress berhasil diimpor!");
        onProgressUpdated();
        setTimeout(() => setImportMessage(null), 3000);
      } else {
        setImportMessage("Gagal membaca file backup.");
        setTimeout(() => setImportMessage(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] p-6 md:p-8 shadow-[var(--shadow)] backdrop-blur-md flex flex-col gap-6">
      {/* Top Banner: Streak & Overall Progress */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--brand-primary)]">
            FE Exam Mastery Dashboard
          </span>
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mt-1 font-sans">
            Status Persiapan Ujian
          </h3>
        </div>

        {/* Streak Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-semibold text-sm">
            <Flame size={18} className="fill-amber-500 animate-bounce" />
            <span>{progress.streak} Hari Streak</span>
          </div>
        </div>
      </div>

      {/* Main Stats 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] font-medium">Telah Dikuasai</p>
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {masteredCount} <span className="text-xs font-normal text-[var(--text-secondary)]">/ {totalCards}</span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <RotateCw size={20} />
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] font-medium">Antrean Review</p>
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {reviewCount} <span className="text-xs font-normal text-[var(--text-secondary)]">kartu</span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center font-bold text-sm">
            %
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between text-xs font-medium text-[var(--text-secondary)] mb-1">
              <span>Kelengkapan</span>
              <span className="font-bold text-[var(--brand-primary)]">{masteredPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--brand-primary)] transition-all duration-500"
                style={{ width: `${masteredPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="flex flex-col gap-3 pt-2">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
          Progres per Bidang Ujian (IPA)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Technology */}
          <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-500 flex items-center gap-1.5">
                <Cpu size={14} /> テクノロジ系 (Tech)
              </span>
              <span className="font-mono text-[var(--text-secondary)]">
                {techStats.mastered}/{techStats.total}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[var(--surface-soft)] rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${techStats.pct}%` }} />
            </div>
          </div>

          {/* Management */}
          <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-500 flex items-center gap-1.5">
                <Kanban size={14} /> マネジメント系 (Mgmt)
              </span>
              <span className="font-mono text-[var(--text-secondary)]">
                {mgmtStats.mastered}/{mgmtStats.total}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[var(--surface-soft)] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${mgmtStats.pct}%` }} />
            </div>
          </div>

          {/* Strategy */}
          <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-500 flex items-center gap-1.5">
                <TrendingUp size={14} /> ストラテジ系 (Strategy)
              </span>
              <span className="font-mono text-[var(--text-secondary)]">
                {stratStats.mastered}/{stratStats.total}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[var(--surface-soft)] rounded-full overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: `${stratStats.pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Backup & Import Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
        <span className="opacity-70">
          Data belajar tersimpan otomatis di browser ini.
        </span>

        <div className="flex items-center gap-2">
          {importMessage && (
            <span className="text-emerald-500 font-medium mr-2 animate-pulse">{importMessage}</span>
          )}

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[var(--brand-primary)] hover:text-[var(--text-primary)] transition-colors"
            title="Download cadangan data belajar"
          >
            <Download size={13} /> Export JSON
          </button>

          <label className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[var(--brand-primary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
            <Upload size={13} /> Import JSON
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
