"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  BookOpen,
  FileText,
  Cpu,
  ArrowRight,
  ExternalLink,
  QrCode,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Vibrate,
  VibrateOff,
  Flame,
  Sparkles,
  Languages,
} from "lucide-react";
import { TANGO_N3_CARDS } from "@/data/tango-n3-data";
import { DOKKAI_PASSAGES } from "@/data/dokkai-n3/passages";
import { FE_CARDS } from "@/data/fe-study-data";
import { triggerHaptic, getHapticEnabled, setHapticEnabled } from "@/lib/haptics";
import { playTapSound, playSuccessChime, getSoundEnabled, setSoundEnabled } from "@/lib/global-sound";
import { openSyncModal } from "@/lib/global-modals-store";

interface CommandItem {
  id: string;
  type: "nav" | "action" | "tango" | "dokkai" | "fe";
  title: string;
  subtitle: string;
  badge?: string;
  icon: React.ElementType;
  onSelect: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "tango" | "dokkai" | "fe" | "nav">("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [soundOn, setSoundOn] = useState(true);
  const [hapticOn, setHapticOn] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setSoundOn(getSoundEnabled());
      setHapticOn(getHapticEnabled());
      setTimeout(() => inputRef.current?.focus(), 50);
      triggerHaptic("light");
      playTapSound();
    }
  }, [isOpen]);

  // Quick Navigation & Actions definitions
  const systemItems: CommandItem[] = useMemo(() => {
    return [
      {
        id: "nav-suite",
        type: "nav",
        title: "JLPT N3 Suite Hub",
        subtitle: "Pusat modul belajar bahasa Jepang N3 (Tango, Dokkai, Grammar)",
        badge: "Hub",
        icon: Sparkles,
        onSelect: () => {
          router.push("/tools/n3-suite");
          onClose();
        },
      },
      {
        id: "nav-tango",
        type: "nav",
        title: "JLPT N3 Tango (単語 1800)",
        subtitle: "1.800 kartu kosakata interaktif dengan audio native & furigana",
        badge: "Tango",
        icon: BookOpen,
        onSelect: () => {
          router.push("/tools/tango-n3");
          onClose();
        },
      },
      {
        id: "nav-dokkai",
        type: "nav",
        title: "JLPT N3 Dokkai (読解)",
        subtitle: "13 bacaan intensif dengan bedah kalimat & kunci analisis",
        badge: "Dokkai",
        icon: FileText,
        onSelect: () => {
          router.push("/tools/dokkai-n3");
          onClose();
        },
      },
      {
        id: "nav-bunpou",
        type: "nav",
        title: "JLPT N3 Bunpou (文法)",
        subtitle: "Pembedah tata bahasa N3, rumus sambungan & susun kalimat bintang ★",
        badge: "Bunpou",
        icon: Languages,
        onSelect: () => {
          router.push("/tools/bunpou-n3");
          onClose();
        },
      },
      {
        id: "nav-fe",
        type: "nav",
        title: "Fundamental Engineer (FE) Exam",
        subtitle: "150+ istilah IT Jepang-Inggris-Indonesia ala Kitami-shiki",
        badge: "FE Exam",
        icon: Cpu,
        onSelect: () => {
          router.push("/tools/fe-study");
          onClose();
        },
      },
      {
        id: "nav-home",
        type: "nav",
        title: "Beranda Kaidevlab",
        subtitle: "Living creative technology lab & portfolio",
        badge: "Utama",
        icon: ArrowRight,
        onSelect: () => {
          router.push("/");
          onClose();
        },
      },
      {
        id: "action-sync",
        type: "action",
        title: "Sinkronisasi Perangkat & QR Code",
        subtitle: "Transfer kemajuan belajar antar HP dan Laptop via QR / JSON",
        badge: "Sync",
        icon: QrCode,
        onSelect: () => {
          onClose();
          setTimeout(() => openSyncModal(), 150);
        },
      },
      {
        id: "action-theme",
        type: "action",
        title: "Ganti Tema (Dark / Light Mode)",
        subtitle: "Beralih antara Daylight Lab dan Midnight Hologram",
        badge: "Tema",
        icon: Moon,
        onSelect: () => {
          const current = document.documentElement.dataset.theme;
          const next = current === "dark" ? "light" : "dark";
          document.documentElement.dataset.theme = next;
          localStorage.setItem("theme", next);
          triggerHaptic("medium");
          playTapSound();
          onClose();
        },
      },
      {
        id: "action-sound",
        type: "action",
        title: soundOn ? "Matikan Efek Suara (Mute Sound)" : "Nyalakan Efek Suara (Sound On)",
        subtitle: "Ubah pengaturan audio tactile synth kaidevlab",
        badge: "Audio",
        icon: soundOn ? VolumeX : Volume2,
        onSelect: () => {
          const next = !soundOn;
          setSoundEnabled(next);
          setSoundOn(next);
          triggerHaptic("light");
          if (next) playSuccessChime();
        },
      },
      {
        id: "action-haptic",
        type: "action",
        title: hapticOn ? "Nonaktifkan Haptic Feedback" : "Aktifkan Haptic Feedback",
        subtitle: "Getaran taktil saat mengetuk tombol di smartphone",
        badge: "Haptik",
        icon: hapticOn ? VibrateOff : Vibrate,
        onSelect: () => {
          const next = !hapticOn;
          setHapticEnabled(next);
          setHapticOn(next);
          if (next) triggerHaptic("success");
        },
      },
    ];
  }, [router, onClose, soundOn, hapticOn]);

  // Search Results filtering
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    // If query is empty, return system items
    if (!q) {
      if (activeTab === "tango") {
        return TANGO_N3_CARDS.slice(0, 15).map((card) => ({
          id: `tango-${card.id}`,
          type: "tango" as const,
          title: `${card.word} (${card.reading})`,
          subtitle: `${card.meaningId} · ${card.chapter}`,
          badge: "Tango N3",
          icon: BookOpen,
          onSelect: () => {
            router.push(`/tools/tango-n3?search=${encodeURIComponent(card.word)}`);
            onClose();
          },
        }));
      }
      if (activeTab === "dokkai") {
        return DOKKAI_PASSAGES.map((p) => ({
          id: `dokkai-${p.id}`,
          type: "dokkai" as const,
          title: `${p.titleJp}`,
          subtitle: `${p.titleId} · ${p.techniqueTag}`,
          badge: p.categoryLabel,
          icon: FileText,
          onSelect: () => {
            router.push(`/tools/dokkai-n3`);
            onClose();
          },
        }));
      }
      if (activeTab === "fe") {
        return FE_CARDS.slice(0, 15).map((card) => ({
          id: `fe-${card.id}`,
          type: "fe" as const,
          title: `${card.termJp} (${card.furigana})`,
          subtitle: `${card.termEn} · ${card.definitionId}`,
          badge: card.subCategory,
          icon: Cpu,
          onSelect: () => {
            router.push(`/tools/fe-study?search=${encodeURIComponent(card.termJp)}`);
            onClose();
          },
        }));
      }
      return systemItems;
    }

    const results: CommandItem[] = [];

    // Search System & Nav items
    if (activeTab === "all" || activeTab === "nav") {
      for (const item of systemItems) {
        if (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q))
        ) {
          results.push(item);
        }
      }
    }

    // Search Dokkai
    if (activeTab === "all" || activeTab === "dokkai") {
      for (const p of DOKKAI_PASSAGES) {
        if (
          p.titleJp.toLowerCase().includes(q) ||
          p.titleId.toLowerCase().includes(q) ||
          p.techniqueTag.toLowerCase().includes(q) ||
          p.sentences.some((s) => s.textJp.toLowerCase().includes(q) || s.textId.toLowerCase().includes(q))
        ) {
          results.push({
            id: `dokkai-${p.id}`,
            type: "dokkai",
            title: p.titleJp,
            subtitle: `${p.titleId} · ${p.techniqueTag}`,
            badge: p.categoryLabel,
            icon: FileText,
            onSelect: () => {
              router.push("/tools/dokkai-n3");
              onClose();
            },
          });
        }
      }
    }

    // Search FE Cards (up to 20 matches)
    if (activeTab === "all" || activeTab === "fe") {
      let feMatches = 0;
      for (const card of FE_CARDS) {
        if (
          card.termJp.toLowerCase().includes(q) ||
          card.furigana.toLowerCase().includes(q) ||
          card.termEn.toLowerCase().includes(q) ||
          card.definitionId.toLowerCase().includes(q) ||
          card.subCategory.toLowerCase().includes(q)
        ) {
          results.push({
            id: `fe-${card.id}`,
            type: "fe",
            title: `${card.termJp} (${card.furigana})`,
            subtitle: `${card.termEn} · ${card.definitionId}`,
            badge: "FE Exam",
            icon: Cpu,
            onSelect: () => {
              router.push(`/tools/fe-study?search=${encodeURIComponent(card.termJp)}`);
              onClose();
            },
          });
          feMatches++;
          if (feMatches >= 20) break;
        }
      }
    }

    // Search Tango N3 Cards (up to 30 matches)
    if (activeTab === "all" || activeTab === "tango") {
      let tangoMatches = 0;
      for (const card of TANGO_N3_CARDS) {
        if (
          card.word.toLowerCase().includes(q) ||
          card.reading.toLowerCase().includes(q) ||
          card.meaningId.toLowerCase().includes(q) ||
          card.meaningEn.toLowerCase().includes(q) ||
          card.chapter.toLowerCase().includes(q)
        ) {
          results.push({
            id: `tango-${card.id}`,
            type: "tango",
            title: `${card.word} (${card.reading})`,
            subtitle: `${card.meaningId} · ${card.chapter}`,
            badge: "Tango N3",
            icon: BookOpen,
            onSelect: () => {
              router.push(`/tools/tango-n3?search=${encodeURIComponent(card.word)}`);
              onClose();
            },
          });
          tangoMatches++;
          if (tangoMatches >= 30) break;
        }
      }
    }

    return results;
  }, [query, activeTab, systemItems, router, onClose]);

  // Adjust selection bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeTab]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
        triggerHaptic("light");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
        triggerHaptic("light");
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          triggerHaptic("medium");
          playTapSound();
          selected.onSelect();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [filteredItems, selectedIndex, onClose]
  );

  // Auto-scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_25px_60px_rgba(0,0,0,0.35)] rounded-2xl overflow-hidden flex flex-col max-h-[82vh]"
          onKeyDown={handleKeyDown}
        >
          {/* Top Search Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)] bg-[var(--surface-soft)]/30">
            <Search size={19} className="text-[var(--brand-primary)] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kosakata, bacaan Dokkai, istilah FE, atau aksi... (Cmd + K)"
              className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-sm sm:text-base outline-none font-medium"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
                title="Hapus pencarian"
              >
                <X size={16} />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[var(--surface-soft)] border border-[var(--border)] text-[10px] font-mono font-bold text-[var(--text-secondary)]">
              ESC
            </kbd>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[var(--border)] bg-[var(--surface-soft)]/10 overflow-x-auto no-scrollbar text-xs">
            {[
              { id: "all", label: "Semua" },
              { id: "tango", label: "Tango N3 (1.800)" },
              { id: "dokkai", label: "Dokkai N3 (13)" },
              { id: "fe", label: "FE IT Exam (150+)" },
              { id: "nav", label: "Navigasi & Aksi" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  triggerHaptic("light");
                }}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-[var(--brand-primary)] text-white font-bold shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-soft)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-transparent select-none"
          >
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-[var(--text-secondary)] text-sm">
                <p className="font-semibold mb-1">Tidak ada hasil yang cocok</p>
                <p className="text-xs">Coba cari dengan kanji, romaji, atau kata kunci bahasa Indonesia.</p>
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      triggerHaptic("medium");
                      playTapSound();
                      item.onSelect();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[var(--brand-primary)]/15 border border-[var(--brand-primary)]/30 text-[var(--text-primary)]"
                        : "hover:bg-[var(--surface-soft)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-[var(--brand-primary)] text-white shadow-xs"
                            : "bg-[var(--surface-soft)] text-[var(--text-secondary)]"
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate font-japanese">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--surface-soft)] text-[var(--text-secondary)] font-mono border border-[var(--border)] shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 text-xs">
                      {isSelected && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[var(--brand-primary)] font-bold">
                          <span>Enter</span>
                          <ArrowRight size={11} />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Hints */}
          <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface-soft)]/30 flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] font-mono text-[9px]">
                  ↑↓
                </kbd>
                <span>Navigasi</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] font-mono text-[9px]">
                  ↵
                </kbd>
                <span>Pilih</span>
              </span>
            </div>
            <span>
              Total {filteredItems.length} hasil ditemukan
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
