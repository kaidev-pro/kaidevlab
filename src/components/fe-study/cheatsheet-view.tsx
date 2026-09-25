"use client";

import { useState } from "react";
import { Bookmark, Calculator, Cpu, Network, CheckCircle2, RefreshCw } from "lucide-react";

export function CheatsheetView() {
  // Calculator 1: System Availability (Serial vs Parallel)
  const [r1, setR1] = useState(0.9);
  const [r2, setR2] = useState(0.9);

  const serialAvailability = Number((r1 * r2).toFixed(4));
  const parallelAvailability = Number((1 - (1 - r1) * (1 - r2)).toFixed(4));

  // Calculator 2: MTBF / MTTR
  const [mtbf, setMtbf] = useState(900);
  const [mttr, setMttr] = useState(100);
  const calculatedAvailability = Number(((mtbf / (mtbf + mttr)) * 100).toFixed(2));

  // Calculator 3: Effective Access Time (実効アクセス時間)
  const [hitRatio, setHitRatio] = useState(0.8);
  const [cacheTime, setCacheTime] = useState(10);
  const [mainMemTime, setMainMemTime] = useState(60);
  const effectiveAccessTime = Number(
    (hitRatio * cacheTime + (1 - hitRatio) * mainMemTime).toFixed(2)
  );

  // Calculator 4: Break-Even Point (損益分岐点売上高)
  const [fixedCost, setFixedCost] = useState(400); // 400 万円
  const [salesRevenue, setSalesRevenue] = useState(1000); // 1,000 万円
  const [variableCost, setVariableCost] = useState(600); // 600 万円

  const varRatio = salesRevenue > 0 ? variableCost / salesRevenue : 0;
  const bepRevenue =
    varRatio < 1 ? Number((fixedCost / (1 - varRatio)).toFixed(1)) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8 select-none min-w-0 max-w-full">
      {/* Top Banner */}
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[var(--brand-primary)] flex items-center gap-1.5">
          <Bookmark size={14} />
          Formula & Architecture Cheatsheet · 基本情報
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] font-serif mt-1">
          Kamus Rumus & Kalkulator Ujian FE
        </h2>
        <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1">
          Kumpulan formula hitungan yang paling sering keluar di soal hitungan 科目A lengkap dengan kalkulator interaktif.
        </p>
      </div>

      {/* Grid: 4 Interactive Calculators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 min-w-0 max-w-full">
        {/* Calculator 1: Ketersediaan Sistem (稼働率) */}
        <div className="p-4 sm:p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col justify-between gap-4 sm:gap-5 min-w-0 max-w-full">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-1">
              <Calculator size={15} />
              1. Rumus Ketersediaan Sistem (稼働率)
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-sans">
              Serial (直列) vs Paralel (並列)
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Jika dua perangkat memiliki keandalan R1 dan R2:
            </p>
          </div>

          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)]">
            <div className="flex items-center justify-between text-xs">
              <span>Keandalan Komponen A (R1):</span>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="1"
                value={r1}
                onChange={(e) => setR1(parseFloat(e.target.value) || 0)}
                className="w-20 p-1.5 text-right font-mono rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span>Keandalan Komponen B (R2):</span>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="1"
                value={r2}
                onChange={(e) => setR2(parseFloat(e.target.value) || 0)}
                className="w-20 p-1.5 text-right font-mono rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
              />
            </div>
          </div>

          {/* Results Comparison */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <p className="text-[11px] text-[var(--text-secondary)]">直列 (Serial: R1 × R2)</p>
              <p className="text-xl font-bold font-mono text-[var(--brand-primary)] mt-0.5">
                {serialAvailability}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
              <p className="text-[11px] text-emerald-500 font-semibold">並列 (Paralel: 1-(1-R1)(1-R2))</p>
              <p className="text-xl font-bold font-mono text-emerald-500 mt-0.5">
                {parallelAvailability}
              </p>
            </div>
          </div>
        </div>

        {/* Calculator 2: MTBF & MTTR */}
        <div className="p-4 sm:p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col justify-between gap-4 sm:gap-5 min-w-0 max-w-full">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-1">
              <RefreshCw size={15} />
              2. Rumus MTBF & MTTR (稼働率)
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-sans">
              Mean Time Between Failures & Repair
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Persentase waktu sistem beroperasi normal tanpa henti:
            </p>
          </div>

          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)]">
            <div className="flex items-center justify-between text-xs">
              <span>MTBF (Rata-rata Waktu Operasi):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={mtbf}
                  onChange={(e) => setMtbf(parseInt(e.target.value) || 0)}
                  className="w-20 p-1.5 text-right font-mono rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
                />
                <span className="text-[11px] text-[var(--text-secondary)]">jam</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span>MTTR (Rata-rata Waktu Perbaikan):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={mttr}
                  onChange={(e) => setMttr(parseInt(e.target.value) || 0)}
                  className="w-20 p-1.5 text-right font-mono rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
                />
                <span className="text-[11px] text-[var(--text-secondary)]">jam</span>
              </div>
            </div>
          </div>

          {/* Result Box */}
          <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
            <p className="text-xs text-[var(--text-secondary)]">
              Ketersediaan = MTBF / (MTBF + MTTR)
            </p>
            <p className="text-2xl font-bold font-mono text-[var(--brand-primary)] mt-1">
              {calculatedAvailability}%
            </p>
          </div>
        </div>

        {/* Calculator 3: Effective Memory Access Time (実効アクセス時間) */}
        <div className="p-4 sm:p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col justify-between gap-4 sm:gap-5 min-w-0 max-w-full">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-1">
              <Cpu size={15} />
              3. 実効アクセス時間 (Effective Access Time)
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-sans">
              Cache Memory & Main Memory
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Waktu akses rata-rata CPU mempertimbangkan Cache Hit Ratio:
            </p>
          </div>

          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)]">
            <div className="flex items-center justify-between text-xs">
              <span>Hit Ratio Cache (0.0 ~ 1.0):</span>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="1"
                value={hitRatio}
                onChange={(e) => setHitRatio(parseFloat(e.target.value) || 0)}
                className="w-20 p-1.5 text-right font-mono rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span>Akses Cache (T_cache):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={cacheTime}
                  onChange={(e) => setCacheTime(parseFloat(e.target.value) || 0)}
                  className="w-20 p-1.5 text-right font-mono rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
                />
                <span className="text-[11px] text-[var(--text-secondary)]">ns</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span>Akses Main Memory (T_main):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={mainMemTime}
                  onChange={(e) => setMainMemTime(parseFloat(e.target.value) || 0)}
                  className="w-20 p-1.5 text-right font-mono rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
                />
                <span className="text-[11px] text-[var(--text-secondary)]">ns</span>
              </div>
            </div>
          </div>

          {/* Result Box */}
          <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
            <p className="text-xs text-[var(--text-secondary)]">
              T = (h × T_cache) + ((1 - h) × T_main)
            </p>
            <p className="text-2xl font-bold font-mono text-cyan-500 mt-1">
              {effectiveAccessTime} <span className="text-sm font-sans">ns</span>
            </p>
          </div>
        </div>

        {/* Calculator 4: Break-Even Point (損益分岐点) */}
        <div className="p-4 sm:p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col justify-between gap-4 sm:gap-5 min-w-0 max-w-full">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-1">
              <Calculator size={15} />
              4. 損益分岐点売上高 (Break-Even Point)
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-sans">
              Analisis Biaya Tetap & Variabel
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Titik penjualan minimum agar perusahaan tidak menderita rugi:
            </p>
          </div>

          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)]">
            <div className="flex items-center justify-between text-xs">
              <span>Biaya Tetap (固定費):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={fixedCost}
                  onChange={(e) => setFixedCost(parseFloat(e.target.value) || 0)}
                  className="w-20 p-1.5 text-right font-mono rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
                />
                <span className="text-[11px] text-[var(--text-secondary)]">万円</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span>Penjualan Aktual (売上高):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={salesRevenue}
                  onChange={(e) => setSalesRevenue(parseFloat(e.target.value) || 0)}
                  className="w-20 p-1.5 text-right font-mono rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
                />
                <span className="text-[11px] text-[var(--text-secondary)]">万円</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span>Biaya Variabel (変動費):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={variableCost}
                  onChange={(e) => setVariableCost(parseFloat(e.target.value) || 0)}
                  className="w-20 p-1.5 text-right font-mono rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]"
                />
                <span className="text-[11px] text-[var(--text-secondary)]">万円</span>
              </div>
            </div>
          </div>

          {/* Result Box */}
          <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
            <p className="text-xs text-[var(--text-secondary)]">
              BEP = 固定費 ÷ (1 - (変動費 ÷ 売上高))
            </p>
            <p className="text-2xl font-bold font-mono text-emerald-500 mt-1">
              {bepRevenue} <span className="text-sm font-sans">万円</span>
            </p>
          </div>
        </div>
      </div>

      {/* Static Quick Reference: Subnetting Table */}
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Network size={18} className="text-[var(--brand-primary)]" />
          <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">
            Tabel Cepat Subnet Mask IPv4 (/24 sampai /30)
          </h3>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--surface-soft)] text-[var(--text-secondary)] border-b border-[var(--border)] font-bold">
              <tr>
                <th className="p-3">CIDR Prefix</th>
                <th className="p-3">Subnet Mask</th>
                <th className="p-3">Total Alamat (2^n)</th>
                <th className="p-3">Alamat Host Tersedia (2^n - 2)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] font-mono">
              <tr className="hover:bg-[var(--surface-soft)]/50">
                <td className="p-3 text-[var(--brand-primary)] font-bold">/24</td>
                <td className="p-3">255.255.255.0</td>
                <td className="p-3">256</td>
                <td className="p-3 font-bold text-emerald-500">254 host</td>
              </tr>
              <tr className="hover:bg-[var(--surface-soft)]/50">
                <td className="p-3 text-[var(--brand-primary)] font-bold">/25</td>
                <td className="p-3">255.255.255.128</td>
                <td className="p-3">128</td>
                <td className="p-3 font-bold text-emerald-500">126 host</td>
              </tr>
              <tr className="hover:bg-[var(--surface-soft)]/50">
                <td className="p-3 text-[var(--brand-primary)] font-bold">/26</td>
                <td className="p-3">255.255.255.192</td>
                <td className="p-3">64</td>
                <td className="p-3 font-bold text-emerald-500">62 host</td>
              </tr>
              <tr className="hover:bg-[var(--surface-soft)]/50">
                <td className="p-3 text-[var(--brand-primary)] font-bold">/27</td>
                <td className="p-3">255.255.255.224</td>
                <td className="p-3">32</td>
                <td className="p-3 font-bold text-emerald-500">30 host</td>
              </tr>
              <tr className="hover:bg-[var(--surface-soft)]/50">
                <td className="p-3 text-[var(--brand-primary)] font-bold">/28</td>
                <td className="p-3">255.255.255.240</td>
                <td className="p-3">16</td>
                <td className="p-3 font-bold text-emerald-500">14 host</td>
              </tr>
              <tr className="hover:bg-[var(--surface-soft)]/50">
                <td className="p-3 text-[var(--brand-primary)] font-bold">/29</td>
                <td className="p-3">255.255.255.248</td>
                <td className="p-3">8</td>
                <td className="p-3 font-bold text-emerald-500">6 host</td>
              </tr>
              <tr className="hover:bg-[var(--surface-soft)]/50">
                <td className="p-3 text-[var(--brand-primary)] font-bold">/30</td>
                <td className="p-3">255.255.255.252</td>
                <td className="p-3">4</td>
                <td className="p-3 font-bold text-emerald-500">2 host (Point-to-Point)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
