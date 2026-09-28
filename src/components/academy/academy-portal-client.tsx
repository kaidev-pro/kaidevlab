"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  BookOpen,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  Languages,
  Code2,
  Cpu,
  Brain,
  Terminal,
  FileQuestion,
  Search,
  CheckCircle2,
  Lock,
  RotateCcw,
  QrCode,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Layers,
  GraduationCap,
  Star,
  Copy,
  Check,
  Download,
  Upload,
  AlertCircle,
  X,
  RefreshCw,
} from "lucide-react";
import { loadTangoProgress } from "@/lib/tango-n3-storage";
import { loadStudyProgress } from "@/lib/fe-study-storage";
import { TANGO_N3_CARDS } from "@/data/tango-n3-data";
import { FE_CARDS } from "@/data/fe-study-data";
import {
  downloadFullBackupFile,
  restoreFullBackup,
  encodeCompactSyncToken,
  decodeCompactSyncToken,
  applyCompactSyncPayload,
  generateQrCodeDataUrl,
  CompactSyncPayload,
} from "@/lib/cross-device-sync";
import { motion, AnimatePresence } from "framer-motion";

type TrackFilter = "all" | "japanese" | "english" | "web" | "ai" | "library";

export function AcademyPortalClient() {
  const [filter, setFilter] = useState<TrackFilter>("all");
  const [tangoStats, setTangoStats] = useState({ mastered: 0, total: 1800, streak: 0 });
  const [feStats, setFeStats] = useState({ mastered: 0, total: 199, streak: 0 });
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncTab, setSyncTab] = useState<"qr" | "file">("qr");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [syncUrl, setSyncUrl] = useState<string>("");
  const [copiedSyncLink, setCopiedSyncLink] = useState(false);
  const [copiedSyncCode, setCopiedSyncCode] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [incomingSync, setIncomingSync] = useState<CompactSyncPayload | null>(null);
  const [appliedSyncSuccess, setAppliedSyncSuccess] = useState(false);
  const [cadetId, setCadetId] = useState("KAI-PASS-7829");

  // Reload live statistics
  const reloadStats = useCallback(() => {
    try {
      const tProg = loadTangoProgress();
      setTangoStats({
        mastered: tProg.masteredCardIds?.length || 0,
        total: TANGO_N3_CARDS.length,
        streak: tProg.streak || 0,
      });

      const feProg = loadStudyProgress();
      setFeStats({
        mastered: feProg.masteredCardIds?.length || 0,
        total: FE_CARDS.length,
        streak: feProg.streak || 0,
      });

      const savedId = localStorage.getItem("kaidevlab_cadet_id");
      if (savedId) {
        setCadetId(savedId);
      } else {
        const newId = `KAI-${Math.floor(1000 + Math.random() * 9000)}-PASS`;
        localStorage.setItem("kaidevlab_cadet_id", newId);
        setCadetId(newId);
      }
    } catch {}
  }, []);

  useEffect(() => {
    reloadStats();
    window.addEventListener("storage", reloadStats);
    return () => window.removeEventListener("storage", reloadStats);
  }, [reloadStats]);

  // Check for incoming sync in URL (?sync=...)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const syncParam = params.get("sync");
      if (syncParam) {
        const decoded = decodeCompactSyncToken(syncParam);
        if (decoded) {
          setIncomingSync(decoded);
        }
      }
    } catch {}
  }, []);

  // Generate QR code when modal opens
  useEffect(() => {
    if (syncModalOpen) {
      try {
        const token = encodeCompactSyncToken();
        const base = typeof window !== "undefined" ? window.location.origin : "https://kaidevlab.com";
        const full = `${base}/learn/?sync=${encodeURIComponent(token)}`;
        setSyncUrl(full);
        generateQrCodeDataUrl(full).then(setQrDataUrl);
      } catch (err) {
        console.error("Failed to generate QR sync URL", err);
      }
    }
  }, [syncModalOpen]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSyncModalOpen(false);
        setIncomingSync(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleApplyIncomingSync = () => {
    if (!incomingSync) return;
    applyCompactSyncPayload(incomingSync);
    setIncomingSync(null);
    setAppliedSyncSuccess(true);
    setTimeout(() => setAppliedSyncSuccess(false), 4000);

    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
    reloadStats();
  };

  const handleCopySyncLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && syncUrl) {
      navigator.clipboard.writeText(syncUrl);
      setCopiedSyncLink(true);
      setTimeout(() => setCopiedSyncLink(false), 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = restoreFullBackup(content);
        if (res.success) {
          setRestoreMessage({ text: res.message });
          reloadStats();
        } else {
          setRestoreMessage({ text: res.message, error: true });
        }
      }
    };
    reader.readAsText(file);
  };

  const totalMastered = tangoStats.mastered + feStats.mastered;
  const globalStreak = Math.max(tangoStats.streak, feStats.streak, 1);

  // Cadet Rank computation
  const cadetRank = useMemo(() => {
    if (totalMastered >= 1500) return { title: "Grand Scholar", tier: "Level 5" };
    if (totalMastered >= 800) return { title: "Cognitive Architect", tier: "Level 4" };
    if (totalMastered >= 300) return { title: "Systems Pioneer", tier: "Level 3" };
    if (totalMastered >= 50) return { title: "Lab Researcher", tier: "Level 2" };
    return { title: "Cadet Explorer", tier: "Level 1" };
  }, [totalMastered]);

  const handleCopySyncCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(cadetId);
      setCopiedSyncCode(true);
      setTimeout(() => setCopiedSyncCode(false), 2000);
    }
  };

  const tracks = [
    {
      id: "tango-n3",
      category: "japanese",
      status: "live",
      statusLabel: "LIVE · 46 Bab",
      badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      title: "Shin Kanzen Master Tango N3",
      titleJp: "新完全マスター単語N3 (重要1800語)",
      description:
        "Kurikulum kosakata resmi 46 Bab sesuai buku fisik Shinkanzen. Dilengkapi Kolokasi (連語), Audio Native TTS, Smart Card Queue, dan Ujian Full Bab.",
      stats: `${tangoStats.mastered} / ${tangoStats.total} Dikuasai`,
      percent: Math.round((tangoStats.mastered / (tangoStats.total || 1)) * 100),
      href: "/tools/tango-n3/",
      cta: "Masuk ke Ruang Belajar N3",
      icon: Languages,
      color: "from-blue-500/20 via-sky-500/10 to-transparent",
    },
    {
      id: "fe-study",
      category: "japanese",
      status: "live",
      statusLabel: "LIVE · 20 Hari",
      badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      title: "FE Study Hub (基本情報技術者試験)",
      titleJp: "基本情報技術者試験・午前＆午後対策",
      description:
        "Cognitive gym untuk ujian negara IT Jepang dan syarat alih visa 技人国. 199 Konsep IT, Tracer Algoritma 科目B, Kuis CBT, dan Progressive Deck Lock.",
      stats: `${feStats.mastered} / ${feStats.total} Dikuasai`,
      percent: Math.round((feStats.mastered / (feStats.total || 1)) * 100),
      href: "/tools/fe-study/",
      cta: "Masuk ke Ruang Belajar FE",
      icon: Terminal,
      color: "from-emerald-500/20 via-teal-500/10 to-transparent",
    },
    {
      id: "english-tech",
      category: "english",
      status: "research",
      statusLabel: "RISET LAB · SEGERA HADIR",
      badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      title: "English for Global Tech Engineers",
      titleJp: "エンジニアのためのグローバル英語",
      description:
        "Kosakata teknis sistem, frasa arsitektur cloud, kolokasi dokumentasi open-source, dan simulasi technical interview standar global.",
      stats: "20 Modul Terstruktur",
      percent: 0,
      href: "#",
      cta: "Silabus Dalam Riset",
      icon: BookOpen,
      color: "from-amber-500/20 via-orange-500/10 to-transparent",
    },
    {
      id: "web-dev",
      category: "web",
      status: "planned",
      statusLabel: "RENCANA LAB",
      badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      title: "Web Engineering Fundamentals (EN)",
      titleJp: "Webエンジニアリング・コア設計",
      description:
        "Konsep mendalam TypeScript, React rendering lifecycle, web performance budget, caching internals, dan arsitektur Next.js modern.",
      stats: "Core Curriculum",
      percent: 0,
      href: "#",
      cta: "Rencana Kurikulum",
      icon: Code2,
      color: "from-purple-500/20 via-indigo-500/10 to-transparent",
    },
    {
      id: "ai-engineer",
      category: "ai",
      status: "planned",
      statusLabel: "RENCANA LAB",
      badgeClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      title: "AI Engineering & Agentic Systems",
      titleJp: "AIエンジニアリング・エージェント基盤",
      description:
        "Membangun agen otonom, pipeline RAG produksi, tool-calling schema, prompt engineering terstruktur, dan evaluasi performa model LLM.",
      stats: "Lab Research",
      percent: 0,
      href: "#",
      cta: "Rencana Kurikulum",
      icon: Brain,
      color: "from-cyan-500/20 via-blue-500/10 to-transparent",
    },
    {
      id: "library-shelf",
      category: "library",
      status: "live",
      statusLabel: "PERPUSTAKAAN DIGITAL",
      badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      title: "Digital Library & Interactive Formulas",
      titleJp: "公式・計算・擬似言語トレーサー",
      description:
        "Rak contek cepat & alat simulasi interaktif: Pseudocode Tracer, Matrix Subnetting CIDR, Kriptografi PKI, dan rangkuman 20 wacana Dokkai.",
      stats: "Akses Cepat",
      percent: 100,
      href: "/tools/fe-study/",
      cta: "Buka Rak Perpustakaan",
      icon: Layers,
      color: "from-rose-500/20 via-pink-500/10 to-transparent",
    },
  ];

  const filteredTracks = useMemo(() => {
    if (filter === "all") return tracks;
    return tracks.filter((t) => t.category === filter);
  }, [filter, tracks]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-10">
      {/* ==================================================== */}
      {/* 1. HERO & LAB PASS ID CARD (ZEN & UNCLUTTERED)       */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Inspiring Headline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 text-[var(--brand-primary)] text-xs font-bold tracking-wide uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>Kaidevlab Cognitive Academy & Digital Library</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] font-serif leading-[1.15]">
            Ruang Belajar Mandiri & Perpustakaan Digital.
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
            Bukan sekadar portofolio. Ini adalah laboratorium hidup untuk menguasai bahasa dunia,
            rekayasa perangkat lunak, dan kecerdasan buatan dengan sistem kognitif modern.
          </p>
        </div>

        {/* Right: Digital Holographic Student ID Pass Card */}
        <div className="lg:col-span-5">
          <motion.div
            whileHover={{ y: -3 }}
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[var(--surface-primary)] via-[var(--surface-secondary)]/50 to-[var(--surface-primary)] border border-[var(--border-subtle)] shadow-xl relative overflow-hidden group"
          >
            {/* Top Pass Badges */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-wider text-[var(--text-secondary)]">
                  RESEARCH PASS
                </span>
              </div>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[var(--surface-secondary)] text-[var(--brand-primary)] font-bold">
                {cadetId}
              </span>
            </div>

            {/* Middle: Learner Profile & Rank */}
            <div className="py-4 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-[var(--text-tertiary)] font-bold">
                  {cadetRank.tier}
                </div>
                <div className="text-lg sm:text-xl font-black text-[var(--text-primary)] mt-0.5">
                  {cadetRank.title}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-1.5 text-amber-500 font-extrabold text-sm sm:text-base">
                  <Flame className="w-4 h-4 fill-amber-500" />
                  <span>{globalStreak} Hari Streak</span>
                </div>
                <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                  Total {totalMastered} Penguasaan
                </div>
              </div>
            </div>

            {/* Bottom Pass Bar */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[var(--text-tertiary)]">
                Cross-Device Sync Ready
              </span>
              <button
                type="button"
                onClick={() => setSyncModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--brand-primary)]/10 hover:bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] font-bold text-xs transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Hubungkan Device</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. CATEGORY SEGMENTED PILLS (BREATHABLE NAVIGATION)   */}
      {/* ==================================================== */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--surface-secondary)]/50 border border-[var(--border-subtle)] min-w-max">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === "all"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Semua Track ({tracks.length})
          </button>
          <button
            onClick={() => setFilter("japanese")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              filter === "japanese"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Bahasa Jepang (2)</span>
          </button>
          <button
            onClick={() => setFilter("english")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              filter === "english"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>English for Tech (1)</span>
          </button>
          <button
            onClick={() => setFilter("web")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              filter === "web"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Web Dev (1)</span>
          </button>
          <button
            onClick={() => setFilter("ai")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              filter === "ai"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>AI Engineering (1)</span>
          </button>
          <button
            onClick={() => setFilter("library")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              filter === "library"
                ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Perpustakaan (1)</span>
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. TRACK CARDS GRID (CLEAN, SPACIOUS, UNCLUTTERED)   */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTracks.map((track) => {
          const Icon = track.icon;
          const isLive = track.status === "live";

          return (
            <div
              key={track.id}
              className={`p-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] flex flex-col justify-between transition-all hover:border-[var(--brand-primary)]/40 hover:shadow-lg relative overflow-hidden group ${
                !isLive ? "opacity-85" : ""
              }`}
            >
              {/* Background Glow */}
              <div
                className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${track.color} rounded-bl-full pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity`}
              />

              <div className="space-y-4 relative z-10">
                {/* Top Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--brand-primary)] group-hover:scale-105 transition-transform shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${track.badgeClass}`}
                  >
                    {track.statusLabel}
                  </span>
                </div>

                {/* Title & Details */}
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
                    {track.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--text-tertiary)] mt-0.5">
                    {track.titleJp}
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                  {track.description}
                </p>
              </div>

              {/* Bottom Progress & Action Button */}
              <div className="pt-5 mt-4 border-t border-[var(--border-subtle)]/70 space-y-3 relative z-10">
                {isLive ? (
                  <>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[var(--text-tertiary)] font-medium">
                        Progress Belajar
                      </span>
                      <span className="font-mono font-bold text-[var(--text-primary)]">
                        {track.stats}
                      </span>
                    </div>

                    <a
                      href={track.href}
                      className="w-full py-2.5 px-4 rounded-2xl bg-[var(--brand-primary)] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                    >
                      <span>{track.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </>
                ) : (
                  <div className="py-2.5 px-4 rounded-2xl bg-[var(--surface-secondary)] text-[var(--text-tertiary)] text-xs font-medium text-center border border-[var(--border-subtle)]/60">
                    <span>{track.cta}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================================================== */}
      {/* 4. CROSS-DEVICE SYNC MODAL                           */}
      {/* ==================================================== */}
      <AnimatePresence>
        {syncModalOpen && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setSyncModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl relative text-[var(--text-primary)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] leading-tight">
                      Sinkronisasi Antar-Perangkat
                    </h3>
                    <p className="text-[11px] text-[var(--text-tertiary)]">
                      Hubungkan HP dan laptop tanpa login
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSyncModalOpen(false)}
                  className="p-1.5 rounded-xl text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Tabs: QR Code vs File Backup */}
              <div className="flex items-center p-1 rounded-2xl bg-[var(--surface-secondary)]/50 border border-[var(--border-subtle)] gap-1">
                <button
                  type="button"
                  onClick={() => setSyncTab("qr")}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    syncTab === "qr"
                      ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Pindai QR Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSyncTab("file")}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    syncTab === "file"
                      ? "bg-[var(--surface-primary)] text-[var(--brand-primary)] shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Berkas Cadangan (.JSON)</span>
                </button>
              </div>

              {/* Tab 1: QR Code Scanner */}
              {syncTab === "qr" && (
                <div className="space-y-3 text-center pt-1">
                  <div className="p-3 rounded-2xl bg-white inline-block shadow-sm border border-slate-200/80 mx-auto">
                    {qrDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={qrDataUrl}
                        alt="QR Code Sinkronisasi"
                        className="w-40 h-40 sm:w-44 sm:h-44 mx-auto block"
                      />
                    ) : (
                      <div className="w-40 h-40 flex items-center justify-center text-xs text-slate-400">
                        Membuat QR Code...
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
                    Arahkan kamera ponsel kamu ke kode di atas untuk membuka dan menerapkan progres belajar secara instan.
                  </p>

                  <div className="pt-1 flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={syncUrl}
                      className="flex-1 bg-[var(--surface-secondary)] text-[var(--text-tertiary)] text-[11px] font-mono px-3 py-2 rounded-xl border border-[var(--border-subtle)] truncate"
                    />
                    <button
                      type="button"
                      onClick={handleCopySyncLink}
                      className="px-3.5 py-2 rounded-xl bg-[var(--brand-primary)] hover:opacity-95 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-opacity active:scale-[0.98]"
                    >
                      {copiedSyncLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSyncLink ? "Tersalin" : "Salin Link"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: File Backup (.JSON) */}
              {syncTab === "file" && (
                <div className="space-y-3 pt-1">
                  {/* Export Card */}
                  <div className="p-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        Ekspor Data ke Berkas
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">
                        Cadangan Penuh
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      Unduh arsip lengkap kosakata N3 dan kartu FE yang dikuasai sebagai berkas `.json`.
                    </p>
                    <button
                      type="button"
                      onClick={downloadFullBackupFile}
                      className="w-full py-2 px-3.5 rounded-xl bg-[var(--brand-primary)]/10 hover:bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh File Cadangan (.json)</span>
                    </button>
                  </div>

                  {/* Import Card */}
                  <div className="p-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        Pulihkan dari Berkas
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">
                        Impor Data
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      Pilih berkas `.json` cadangan untuk memulihkan progres di perangkat ini.
                    </p>
                    <label className="w-full py-2 px-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 text-[var(--text-primary)] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Pilih File Cadangan (.json)</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {restoreMessage && (
                    <div
                      className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 border ${
                        restoreMessage.error
                          ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{restoreMessage.text}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Cadet Pass Footer */}
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
                <span>Pass ID: {cadetId}</span>
                <span>PWA Offline Ready</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* 5. INCOMING SYNC PROMPT MODAL (DETECTED FROM URL)    */}
      {/* ==================================================== */}
      <AnimatePresence>
        {incomingSync && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIncomingSync(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 animate-spin-slow" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Sinkronisasi Progres Terdeteksi
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Tautan ini berisi data progres belajar dari perangkat lain. Apakah kamu ingin menerapkan data ini ke perangkat sekarang?
                </p>
              </div>

              {/* Summary of incoming data */}
              <div className="p-4 rounded-2xl bg-[var(--surface-secondary)]/50 border border-[var(--border-subtle)] space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-tertiary)]">ID Cadet Asal:</span>
                  <span className="font-bold text-[var(--brand-primary)]">{incomingSync.cid}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-tertiary)]">Kosakata N3 Dikuasai:</span>
                  <span className="font-bold text-[var(--text-primary)]">{incomingSync.tm.length} Kata</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-tertiary)]">Konsep FE Dikuasai:</span>
                  <span className="font-bold text-[var(--text-primary)]">{incomingSync.fm.length} Konsep</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-tertiary)]">Streak Belajar:</span>
                  <span className="font-bold text-amber-500">{incomingSync.st} Hari</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIncomingSync(null)}
                  className="py-2.5 px-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-bold transition-colors"
                >
                  Abaikan
                </button>
                <button
                  type="button"
                  onClick={handleApplyIncomingSync}
                  className="py-2.5 px-4 rounded-xl bg-[var(--brand-primary)] hover:opacity-95 text-white text-xs font-bold transition-opacity"
                >
                  Terapkan Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Notification Banner */}
      <AnimatePresence>
        {appliedSyncSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Progres belajar berhasil disinkronkan ke perangkat ini.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
