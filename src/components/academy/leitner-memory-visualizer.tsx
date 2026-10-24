"use client";

import React from "react";
import { LeitnerDistribution } from "@/lib/daily-learning-engine";
import { Layers, ShieldCheck, Zap, Info } from "lucide-react";

interface LeitnerMemoryVisualizerProps {
  distribution: LeitnerDistribution;
  totalCards: number;
  hub: "n3" | "fe";
}

export function LeitnerMemoryVisualizer({
  distribution,
  totalCards,
  hub,
}: LeitnerMemoryVisualizerProps) {
  const { box1, box2, box3, box4, box5, unstudied } = distribution;
  const studiedTotal = box1 + box2 + box3 + box4 + box5;
  const permanentPercent = totalCards > 0 ? Math.round((box5 / totalCards) * 100) : 0;

  const boxes = [
    {
      num: 1,
      name: "Box 1",
      interval: "1 Hari",
      count: box1,
      color: "from-red-500 to-amber-500",
      desc: "Baru / Masih rentan lupa",
    },
    {
      num: 2,
      name: "Box 2",
      interval: "3 Hari",
      count: box2,
      color: "from-amber-500 to-yellow-500",
      desc: "Mulai diingat dengan baik",
    },
    {
      num: 3,
      name: "Box 3",
      interval: "7 Hari",
      count: box3,
      color: "from-yellow-500 to-lime-500",
      desc: "Konsolidasi memori mingguan",
    },
    {
      num: 4,
      name: "Box 4",
      interval: "14 Hari",
      count: box4,
      color: "from-lime-500 to-emerald-500",
      desc: "Memori kuat 2 mingguan",
    },
    {
      num: 5,
      name: "Box 5",
      interval: "30 Hari",
      count: box5,
      color: "from-emerald-500 to-teal-500",
      desc: "Memori Permanen (Long-Term)",
    },
  ];

  return (
    <div className="study-panel p-5 rounded-3xl border border-[var(--study-line)] bg-[var(--study-paper)] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Layers size={16} />
          </span>
          <div>
            <h3 className="text-sm font-black text-[var(--text-primary)]">
              Distribusi Memori Jangka Panjang (SRS Leitner)
            </h3>
            <p className="text-[11px] text-[var(--text-secondary)]">
              {hub === "n3" ? "1.800 Kosakata Tango N3" : "60 Konsep IT & Analogi FE"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {box5} Permanen ({permanentPercent}%)
          </span>
        </div>
      </div>

      {/* Stacked Progress Bar */}
      <div className="w-full h-3 rounded-full bg-[var(--study-soft)] overflow-hidden flex shadow-inner">
        {box5 > 0 && (
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${(box5 / totalCards) * 100}%` }}
            title={`Box 5 (Permanen): ${box5} kartu`}
          />
        )}
        {box4 > 0 && (
          <div
            className="h-full bg-lime-500 transition-all duration-500"
            style={{ width: `${(box4 / totalCards) * 100}%` }}
            title={`Box 4 (14 Hari): ${box4} kartu`}
          />
        )}
        {box3 > 0 && (
          <div
            className="h-full bg-yellow-500 transition-all duration-500"
            style={{ width: `${(box3 / totalCards) * 100}%` }}
            title={`Box 3 (7 Hari): ${box3} kartu`}
          />
        )}
        {box2 > 0 && (
          <div
            className="h-full bg-amber-500 transition-all duration-500"
            style={{ width: `${(box2 / totalCards) * 100}%` }}
            title={`Box 2 (3 Hari): ${box2} kartu`}
          />
        )}
        {box1 > 0 && (
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${(box1 / totalCards) * 100}%` }}
            title={`Box 1 (1 Hari): ${box1} kartu`}
          />
        )}
      </div>

      {/* Grid of 5 Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
        {boxes.map((b) => (
          <div
            key={b.num}
            className={`p-2.5 rounded-2xl border border-[var(--study-line)] bg-[var(--study-soft)]/50 flex flex-col justify-between ${
              b.num === 5 ? "border-emerald-500/30 bg-emerald-500/5" : ""
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-[var(--text-secondary)]">
              <span>{b.name}</span>
              <span className="font-mono text-[10px] opacity-75">{b.interval}</span>
            </div>
            <div className="my-1.5 flex items-baseline gap-1">
              <span className="text-lg font-black text-[var(--text-primary)] font-mono">
                {b.count}
              </span>
              <span className="text-[10px] text-[var(--text-secondary)]">kartu</span>
            </div>
            <span className="text-[10px] text-[var(--text-secondary)] truncate">
              {b.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Efficiency Note */}
      <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-2.5 text-xs text-blue-800 dark:text-blue-300">
        <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Prinsip Efisiensi:</strong> Kartu di Box 5 hanya diuji 1x per bulan. Sistem otomatis menjadwalkan review tepat sebelum kurva lupa (<em>forgetting curve</em>) anjlok, menghemat 80% waktu belajar tanpa mengurangi daya ingat.
        </p>
      </div>
    </div>
  );
}
