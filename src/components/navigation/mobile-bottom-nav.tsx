"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  BookOpen,
  FileText,
  Cpu,
  Search,
  Flame,
  Languages,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound } from "@/lib/global-sound";
import { getUnifiedStudyStats } from "@/lib/unified-study-storage";
import { openCommandPalette, openSyncModal } from "@/lib/global-modals-store";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [streak, setStreak] = useState<number>(0);
  const [isLearnHost, setIsLearnHost] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLearnHost(window.location.hostname.startsWith("learn."));
    }
  }, []);

  const isStudySection = pathname.startsWith("/tools/") || pathname.startsWith("/learn") || isLearnHost;

  useEffect(() => {
    if (!isStudySection) return;
    const updateStats = () => {
      const stats = getUnifiedStudyStats();
      setStreak(stats.globalStreak);
    };

    updateStats();
    window.addEventListener("kaidevlab:study_activity_recorded", updateStats);
    return () => {
      window.removeEventListener("kaidevlab:study_activity_recorded", updateStats);
    };
  }, [isStudySection]);

  if (!isStudySection) {
    return null;
  }

  const navItems = [
    {
      name: "Hub",
      href: isLearnHost ? "/" : "/learn/",
      icon: Compass,
      isActive: pathname === "/learn" || pathname === "/learn/" || (isLearnHost && pathname === "/"),
    },
    {
      name: "Tango",
      href: "/tools/tango-n3/",
      icon: BookOpen,
      isActive: pathname.startsWith("/tools/tango"),
    },
    {
      name: "Bunpou",
      href: "/tools/bunpou-n3/",
      icon: Languages,
      isActive: pathname.startsWith("/tools/bunpou"),
    },
    {
      name: "Dokkai",
      href: "/tools/dokkai-n3/",
      icon: FileText,
      isActive: pathname.startsWith("/tools/dokkai"),
    },
    {
      name: "FE Study",
      href: "/tools/fe-study/",
      icon: Cpu,
      isActive: pathname.startsWith("/tools/fe-study"),
    },
  ];

  const handleNavClick = () => {
    triggerHaptic("light");
    playTapSound();
  };

  const handleOpenSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerHaptic("light");
    playTapSound();
    openCommandPalette();
  };

  const handleOpenSync = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerHaptic("medium");
    playTapSound();
    openSyncModal();
  };

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="md:hidden fixed bottom-3 inset-x-2.5 sm:inset-x-6 z-40 bg-[var(--surface)]/85 backdrop-blur-xl border border-[var(--border)] shadow-[0_14px_38px_rgba(0,0,0,0.18)] rounded-2xl px-1.5 py-1.5 flex items-center justify-around transition-all select-none"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            onClick={handleNavClick}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all relative ${
              item.isActive
                ? "text-[var(--brand-hover)] bg-[var(--brand-primary)]/10 font-extrabold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Icon size={18} className="mb-0.5" />
            <span className="tracking-tight">{item.name}</span>
            {item.isActive && (
              <span className="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
            )}
          </Link>
        );
      })}

      {/* Global Command Search Button */}
      <button
        type="button"
        onClick={handleOpenSearch}
        aria-label="Cari Cepat (Cmd + K)"
        className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-95"
      >
        <Search size={18} className="mb-0.5 text-[var(--interface-blue)]" />
        <span className="tracking-tight">Cari</span>
      </button>

      {/* Unified Streak & Sync Button */}
      <button
        type="button"
        onClick={handleOpenSync}
        aria-label="Streak & Sinkronisasi Perangkat"
        className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[10px] font-bold text-amber-500 bg-amber-500/10 hover:bg-amber-500/15 transition-all active:scale-95 relative border border-amber-500/25"
      >
        <div className="flex items-center gap-0.5">
          <Flame size={16} className="fill-amber-600 text-amber-600 animate-pulse" />
          <span className="font-extrabold text-[11px] font-mono text-amber-700 dark:text-amber-400">{streak}</span>
        </div>
        <span className="tracking-tight text-[9px] text-amber-700 dark:text-amber-400">Streak</span>
      </button>
    </nav>
  );
}
