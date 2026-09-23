"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Flame, ArrowRight, CheckCircle2 } from "lucide-react";
import { loadStudyProgress, StudyProgress } from "@/lib/fe-study-storage";
import { FE_CARDS } from "@/data/fe-study-data";
import { useLanguage } from "@/lib/i18n/context";

const widgetTranslations = {
  en: {
    tracker: "Live Study Tracker · Fundamental IT",
    streakSuffix: "Day Streak",
    ready: "Daily Drill Ready",
    title: "FE Exam Prep (基本情報技術者試験) 🇯🇵",
    subtitle: "Japan's National IT Certification prep & Engineer/Specialist Visa qualification.",
    masteredOf: (mastered: number, total: number) => (
      <>
        <b className="text-[var(--text-primary)]">{mastered}</b> of {total} Terms Mastered
      </>
    ),
    srs: "Spaced Repetition System",
    openHub: "Open Study Gym",
  },
  id: {
    tracker: "Live Study Tracker · 基本情報",
    streakSuffix: "Hari Streak",
    ready: "Drill Harian Siap",
    title: "FE Exam Prep (基本情報技術者試験) 🇯🇵",
    subtitle: "Target kelulusan sertifikasi IT negara Jepang & syarat visa 技人国.",
    masteredOf: (mastered: number, total: number) => (
      <>
        <b className="text-[var(--text-primary)]">{mastered}</b> dari {total} Istilah Dikuasai
      </>
    ),
    srs: "Metode Spaced Repetition",
    openHub: "Buka Study Gym",
  },
  ja: {
    tracker: "学習進捗トラッカー · 基本情報",
    streakSuffix: "日連続学習中",
    ready: "デイリー演習準備完了",
    title: "基本情報技術者試験 対策ジム 🇯🇵",
    subtitle: "国家試験合格＆IT高度人材・技人国ビザ要件対策のアクティブリコール道場。",
    masteredOf: (mastered: number, total: number) => (
      <>
        <b className="text-[var(--text-primary)]">{mastered}</b> / {total} 単語習得済み
      </>
    ),
    srs: "間隔反復学習システム (SRS)",
    openHub: "スタディジムを開く",
  },
};

export function FeLiveWidget() {
  const [progress, setProgress] = useState<StudyProgress | null>(null);
  const { locale } = useLanguage();

  useEffect(() => {
    setProgress(loadStudyProgress());
  }, []);

  const t = widgetTranslations[locale] || widgetTranslations.en;
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
            {t.tracker}
          </span>

          {streak > 0 ? (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-bold">
              <Flame size={13} className="fill-amber-500 animate-pulse" />
              {streak} {t.streakSuffix}
            </span>
          ) : (
            <span className="text-[11px] text-[var(--text-secondary)] font-medium">{t.ready}</span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] font-sans">
            {t.title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {t.subtitle}
          </p>
        </div>

        {/* Live Progress Bar */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--text-secondary)] flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-500" />
              {t.masteredOf(mastered, total)}
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
        <span className="text-[11px] text-[var(--text-secondary)]">{t.srs}</span>
        <a
          href="/learn"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-primary)] hover:text-[var(--brand-hover)] transition-colors group"
        >
          <span>{t.openHub}</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </article>
  );
}
