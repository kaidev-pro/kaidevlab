"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Flame } from "lucide-react";
import { openSyncModal } from "@/lib/global-modals-store";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound } from "@/lib/global-sound";

/**
 * Shared layout primitives for the JLPT N3 pages (Suite, Tango, Bunpou, Dokkai).
 * Every page follows the same pattern:
 *   N3TopBar  ->  N3ContinueCard (one primary action)  ->  N3MoreSection (everything else, folded)
 */

export type N3Module = "suite" | "tango" | "bunpou" | "dokkai";

const NAV_ITEMS: { id: N3Module; href: string; jp: string; label: string }[] = [
  { id: "suite", href: "/tools/n3-suite/", jp: "今日", label: "Hari Ini" },
  { id: "tango", href: "/tools/tango-n3/", jp: "単語", label: "Tango" },
  { id: "bunpou", href: "/tools/bunpou-n3/", jp: "文法", label: "Bunpou" },
  { id: "dokkai", href: "/tools/dokkai-n3/", jp: "読解", label: "Dokkai" },
];

interface N3TopBarProps {
  active: N3Module;
  /** Page title, rendered as the (visually hidden) h1 for SEO / screen readers. */
  title: string;
  /** Page-specific tools on the right side (furigana toggle, bookmark, ...). */
  tools?: ReactNode;
}

export function N3TopBar({ active, title, tools }: N3TopBarProps) {
  const backHref = active === "suite" ? "/learn/" : "/tools/n3-suite/";

  return (
    <header className="n3-topbar sticky top-0 z-40 bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--border)]">
      <h1 className="sr-only">{title}</h1>
      <div className="max-w-6xl mx-auto px-2.5 sm:px-6 py-2 flex items-center gap-1.5 sm:gap-3">
        <Link
          id="n3-back-link"
          href={backHref}
          className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-soft)] transition-colors shrink-0"
          title={active === "suite" ? "Kembali ke Learn" : "Kembali ke Hari Ini"}
        >
          <ArrowLeft size={16} />
        </Link>

        <nav
          aria-label="Modul JLPT N3"
          className="flex-1 min-w-0 flex items-center gap-0.5 p-0.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] overflow-x-auto no-scrollbar"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === active;
            return (
              <Link
                key={item.id}
                id={`n3-nav-${item.id}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex-1 min-w-fit px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold text-center whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span className="font-japanese sm:hidden">{item.jp}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {tools}
          <button
            id="n3-sync-button"
            type="button"
            onClick={() => {
              triggerHaptic("medium");
              playTapSound();
              openSyncModal();
            }}
            className="p-2 rounded-xl text-amber-500 hover:bg-amber-500/10 transition-colors"
            title="Streak & Sinkronisasi"
          >
            <Flame size={16} className="fill-amber-500" />
          </button>
        </div>
      </div>
    </header>
  );
}

interface N3ContinueCardProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** 0..100. Omit to hide the progress bar. */
  progress?: number;
  progressLabel?: string;
  primary: { label: string; onClick?: () => void; href?: string; id: string };
  /** Small secondary actions under the primary button. */
  secondary?: ReactNode;
  accent?: "brand" | "emerald" | "amber";
  children?: ReactNode;
}

const ACCENTS = {
  brand: { bar: "bg-[var(--brand-primary)]", btn: "bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)]", text: "text-[var(--brand-primary)]", ring: "border-[var(--brand-primary)]/30" },
  emerald: { bar: "bg-emerald-600", btn: "bg-emerald-700 hover:bg-emerald-800", text: "text-emerald-700 dark:text-emerald-400", ring: "border-emerald-500/30" },
  amber: { bar: "bg-amber-500", btn: "bg-amber-600 hover:bg-amber-700", text: "text-amber-700 dark:text-amber-400", ring: "border-amber-500/30" },
};

export function N3ContinueCard({
  eyebrow,
  title,
  subtitle,
  progress,
  progressLabel,
  primary,
  secondary,
  accent = "brand",
  children,
}: N3ContinueCardProps) {
  const a = ACCENTS[accent];
  const btnClass = `n3-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] ${a.btn}`;

  return (
    <section className={`n3-continue-card p-5 sm:p-7 rounded-3xl bg-[var(--surface)] border-2 ${a.ring} shadow-sm space-y-4`}>
      <div className="space-y-1.5">
        <p className={`text-[11px] font-bold uppercase tracking-wider ${a.text}`}>{eyebrow}</p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] leading-snug">{title}</h2>
        {subtitle && <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{subtitle}</p>}
      </div>

      {typeof progress === "number" && (
        <div className="space-y-1">
          <div className="w-full h-2 rounded-full bg-[var(--surface-soft)] overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${a.bar}`} style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
          </div>
          {progressLabel && <p className="text-[11px] font-mono text-[var(--text-secondary)]">{progressLabel}</p>}
        </div>
      )}

      {children}

      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4">
        {primary.href ? (
          <Link id={primary.id} href={primary.href} className={btnClass}>
            {primary.label}
          </Link>
        ) : (
          <button id={primary.id} type="button" onClick={primary.onClick} className={btnClass}>
            {primary.label}
          </button>
        )}
        {secondary && <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs">{secondary}</div>}
      </div>
    </section>
  );
}

/** Text-style secondary action used inside N3ContinueCard. */
export function N3SecondaryAction({ onClick, children, id }: { onClick: () => void; children: ReactNode; id: string }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className="font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline-offset-4 hover:underline transition-colors"
    >
      {children}
    </button>
  );
}

interface N3MoreSectionProps {
  label?: string;
  id: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/** Folded container for everything that isn't the primary action. */
export function N3MoreSection({ label = "Opsi & materi lainnya", id, children, defaultOpen = false }: N3MoreSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="n3-more-section space-y-4">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      >
        <span>{label}</span>
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="space-y-6 animate-in fade-in slide-in-from-top-1 duration-200">{children}</div>}
    </section>
  );
}
