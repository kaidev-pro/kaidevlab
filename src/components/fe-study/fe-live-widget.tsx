"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Flame, ArrowRight, CheckCircle2 } from "lucide-react";
import { loadStudyProgress, StudyProgress } from "@/lib/fe-study-storage";
import { FE_CARDS } from "@/data/fe-study-data";

export function FeLiveWidget() {
  const [progress, setProgress] = useState<StudyProgress | null>(null);

  useEffect(() => {
    setProgress(loadStudyProgress());
  }, []);

  const total = FE_CARDS.length;
  const mastered = progress?.masteredCardIds.length || 0;
  const streak = progress?.streak || 0;
  const percentage = Math.round((mastered / total) * 100);

  return (
    <article className="p-5 md:p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col justify-between gap-4 backdrop-blur-md transition-all hover:border-[var(--brand-primary)]/40">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="eyebrow inline-flex items-center gap-1.5 !mb-0 text-[11px]">
            <GraduationCap size={14} />
            Live Study Tracker · 基本情報
          </span>

          {streak > 0 ? (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-bold">
              <Flame size={13} className="fill-amber-500 animate-pulse" />
              {streak} Hari Streak
            </span>
          ) : (
            <span className="text-[11px] text-[var(--text-secondary)] font-medium">Daily Drill Ready</span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] font-sans">
            FE Exam Prep (基本情報技術者試験) 🇯🇵
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Target kelulusan sertifikasi IT negara Jepang & syarat visa 技人国.
          </p>
        </div>

        {/* Live Progress Bar */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--text-secondary)] flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-500" />
              <b className="text-[var(--text-primary)]">{mastered}</b> dari {total} Istilah Dikuasai
            </span>
            <span className="font-bold text-[var(--brand-primary)]">{percentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--surface-soft)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-glow)] transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Link */}
      <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
        <span className="text-[11px] text-[var(--text-secondary)]">Spaced Repetition System</span>
        <a
          href="/learn"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-primary)] hover:text-[var(--brand-hover)] transition-colors group"
        >
          <span>Buka Study Hub</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </article>
  );
}
