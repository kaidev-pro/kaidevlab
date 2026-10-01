"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  QrCode,
  Copy,
  Check,
  Download,
  Upload,
  RefreshCw,
  Flame,
  CheckCircle2,
  Calendar,
  Volume2,
  VolumeX,
  Vibrate,
  VibrateOff,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import {
  getUnifiedStudyStats,
  getRecentActivityMatrix,
  generateFullBackup,
  restoreFullBackup,
  UnifiedStudyStats,
  UnifiedDayActivity,
} from "@/lib/unified-study-storage";
import { triggerHaptic, getHapticEnabled, setHapticEnabled } from "@/lib/haptics";
import {
  playTapSound,
  playSuccessChime,
  playErrorBuzz,
  getSoundEnabled,
  setSoundEnabled,
} from "@/lib/global-sound";

interface DeviceSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeviceSyncModal({ isOpen, onClose }: DeviceSyncModalProps) {
  const [stats, setStats] = useState<UnifiedStudyStats | null>(null);
  const [activityMatrix, setActivityMatrix] = useState<UnifiedDayActivity[]>([]);
  const [activeTab, setActiveTab] = useState<"stats" | "qr" | "json" | "settings">("stats");

  // QR & JSON state
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrTooLarge, setQrTooLarge] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>("");
  const [restoreStatus, setRestoreStatus] = useState<"idle" | "success" | "error">("idle");
  const [restoreMessage, setRestoreMessage] = useState<string>("");

  // Settings
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [hapticOn, setHapticOn] = useState<boolean>(true);

  // Load stats and settings on open
  useEffect(() => {
    if (isOpen) {
      const currentStats = getUnifiedStudyStats();
      setStats(currentStats);
      setActivityMatrix(getRecentActivityMatrix(28)); // 4 weeks of activity
      setSoundOn(getSoundEnabled());
      setHapticOn(getHapticEnabled());
      setRestoreStatus("idle");
      setRestoreMessage("");
      setCopied(false);

      // Generate QR payload
      const backup = generateFullBackup();
      const jsonStr = JSON.stringify(backup);

      if (jsonStr.length > 2400) {
        // Too big for reliable mobile camera scanning, advise JSON copy
        setQrTooLarge(true);
        setQrDataUrl(null);
      } else {
        setQrTooLarge(false);
        QRCode.toDataURL(jsonStr, {
          width: 320,
          margin: 1.5,
          color: {
            dark: "#0b1b38",
            light: "#ffffff",
          },
        })
          .then((url) => setQrDataUrl(url))
          .catch(() => setQrTooLarge(true));
      }
    }
  }, [isOpen]);

  const handleCopyJson = () => {
    try {
      const backup = generateFullBackup();
      navigator.clipboard.writeText(JSON.stringify(backup, null, 2));
      setCopied(true);
      triggerHaptic("success");
      playSuccessChime();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      triggerHaptic("error");
      playErrorBuzz();
    }
  };

  const handleDownloadBackup = () => {
    try {
      const backup = generateFullBackup();
      const blob = new Blob([JSON.stringify(backup, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kaidevlab-study-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      triggerHaptic("success");
      playSuccessChime();
    } catch {
      triggerHaptic("error");
      playErrorBuzz();
    }
  };

  const handleRestore = () => {
    if (!importJsonText.trim()) {
      setRestoreStatus("error");
      setRestoreMessage("Silakan tempel kode JSON backup terlebih dahulu.");
      triggerHaptic("warning");
      playErrorBuzz();
      return;
    }

    const success = restoreFullBackup(importJsonText.trim());
    if (success) {
      setRestoreStatus("success");
      setRestoreMessage("Kemajuan belajar berhasil dipulihkan! Statistik telah disinkronkan.");
      triggerHaptic("success");
      playSuccessChime();
      // Reload stats
      const currentStats = getUnifiedStudyStats();
      setStats(currentStats);
      setActivityMatrix(getRecentActivityMatrix(28));
      setImportJsonText("");
    } else {
      setRestoreStatus("error");
      setRestoreMessage("Format JSON tidak valid. Pastikan Anda menyalin seluruh teks backup.");
      triggerHaptic("error");
      playErrorBuzz();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportJsonText(content);
        const success = restoreFullBackup(content);
        if (success) {
          setRestoreStatus("success");
          setRestoreMessage(`File ${file.name} berhasil dimuat dan disinkronkan!`);
          triggerHaptic("success");
          playSuccessChime();
          const currentStats = getUnifiedStudyStats();
          setStats(currentStats);
          setActivityMatrix(getRecentActivityMatrix(28));
        } else {
          setRestoreStatus("error");
          setRestoreMessage("Gagal membaca struktur file backup.");
          triggerHaptic("error");
          playErrorBuzz();
        }
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="w-full max-w-xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_25px_65px_rgba(0,0,0,0.35)] rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--surface-soft)]/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Flame size={18} className="fill-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Habit Tracker & Sinkronisasi
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Simpan, pindahkan, dan pantau kemajuan lintas perangkat
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                triggerHaptic("light");
                playTapSound();
                onClose();
              }}
              className="p-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-[var(--border)] bg-[var(--surface-soft)]/15 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab("stats");
                triggerHaptic("light");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === "stats"
                  ? "bg-[var(--brand-primary)] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Statistik & Matriks
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("qr");
                triggerHaptic("light");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === "qr"
                  ? "bg-[var(--brand-primary)] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              QR Code Transfer
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("json");
                triggerHaptic("light");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === "json"
                  ? "bg-[var(--brand-primary)] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Ekspor / Impor JSON
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("settings");
                triggerHaptic("light");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === "settings"
                  ? "bg-[var(--brand-primary)] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Haptik & Audio
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* TAB: STATS & MATRIX */}
            {activeTab === "stats" && stats && (
              <div className="space-y-5">
                {/* 3 Overview Stat Badges */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                      <Flame size={18} className="fill-amber-500 animate-pulse" />
                      <span className="text-xl font-extrabold font-mono">{stats.globalStreak}</span>
                    </div>
                    <span className="text-[11px] text-[var(--text-secondary)] font-medium">Hari Beruntun</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold font-mono text-blue-500 mb-0.5">
                      {stats.totalMasteredTerms}
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)] font-medium">Kosakata Hafal</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold font-mono text-emerald-500 mb-0.5">
                      {stats.totalCompletedPassages}
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)] font-medium">Dokkai Tamat</span>
                  </div>
                </div>

                {/* 28-Day Activity Heatmap (GitHub Style) */}
                <div className="p-4 rounded-2xl bg-[var(--surface-soft)]/50 border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <Calendar size={14} className="text-[var(--brand-primary)]" />
                      Matriks Aktivitas Belajar (4 Minggu Terakhir)
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)]">Dokkai + Tango + FE</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 justify-center">
                    {activityMatrix.map((day) => {
                      const total = day.total;
                      let bgClass = "bg-[var(--surface)] border-[var(--border)]";
                      if (total > 0 && total <= 5) bgClass = "bg-emerald-400/40 border-emerald-500/50";
                      else if (total > 5 && total <= 15) bgClass = "bg-emerald-500/70 border-emerald-500";
                      else if (total > 15) bgClass = "bg-emerald-500 text-white font-bold border-emerald-600";

                      return (
                        <div
                          key={day.date}
                          title={`${day.date}: ${day.total} aktivitas (Dokkai: ${day.dokkai}, Tango: ${day.tango}, FE: ${day.fe})`}
                          className={`aspect-square rounded-lg border flex flex-col items-center justify-center text-[10px] font-mono transition-transform hover:scale-110 cursor-pointer ${bgClass}`}
                        >
                          <span className="text-[9px] opacity-75">{day.date.slice(8)}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between mt-3 text-[10px] text-[var(--text-secondary)]">
                    <span>Sedikit</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded bg-[var(--surface)] border border-[var(--border)]" />
                      <div className="w-2.5 h-2.5 rounded bg-emerald-400/40" />
                      <div className="w-2.5 h-2.5 rounded bg-emerald-500/70" />
                      <div className="w-2.5 h-2.5 rounded bg-emerald-500" />
                    </div>
                    <span>Banyak</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("qr")}
                    className="w-full py-2.5 rounded-xl bg-[var(--brand-primary)] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
                  >
                    <QrCode size={15} />
                    <span>Sinkronkan ke HP / Laptop Lain Sekarang</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB: QR CODE */}
            {activeTab === "qr" && (
              <div className="flex flex-col items-center text-center space-y-4">
                {qrTooLarge ? (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-600 dark:text-amber-300 text-left space-y-2">
                    <p className="font-bold flex items-center gap-1.5 text-sm">
                      <AlertCircle size={16} />
                      Data Kemajuan Sangat Luas
                    </p>
                    <p>
                      Karena Anda telah menghafal ratusan kartu, ukuran data melebihi kapasitas kamera QR code standar (2.4 KB).
                    </p>
                    <p>
                      Silakan gunakan tab <b>Ekspor / Impor JSON</b> dengan fitur 1-Klik Salin untuk transfer instan tanpa batas!
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab("json")}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-white font-bold text-xs"
                    >
                      Buka Ekspor JSON
                    </button>
                  </div>
                ) : qrDataUrl ? (
                  <>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Buka kamera HP atau scanner QR di perangkat tujuan untuk menyinkronkan progress seketika:
                    </p>
                    <div className="p-3 bg-white rounded-2xl border-2 border-[var(--border)] shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={qrDataUrl} alt="Sync QR Code" className="w-56 h-56 object-contain" />
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      Berisi data streak, rekor bab Dokkai, dan kosakata terhafal.
                    </p>
                  </>
                ) : (
                  <div className="py-12 flex flex-col items-center gap-2">
                    <RefreshCw size={24} className="animate-spin text-[var(--brand-primary)]" />
                    <span className="text-xs text-[var(--text-secondary)]">Membuat QR Code...</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB: JSON EXPORT & IMPORT */}
            {activeTab === "json" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[var(--text-primary)] block">
                    1. Salin atau Unduh Cadangan (Export)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCopyJson}
                      className="py-2.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] hover:bg-[var(--surface-tint)] text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-[var(--text-primary)] active:scale-95"
                    >
                      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      <span>{copied ? "Tersalin ke Clipboard!" : "Salin Kode JSON"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadBackup}
                      className="py-2.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] hover:bg-[var(--surface-tint)] text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-[var(--text-primary)] active:scale-95"
                    >
                      <Download size={14} />
                      <span>Unduh File .json</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-[var(--border)] pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      2. Pulihkan di Perangkat Baru (Import)
                    </span>
                    <label className="cursor-pointer text-[11px] font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1">
                      <Upload size={12} />
                      <span>Pilih File .json</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="Tempel kode JSON backup di sini..."
                    className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/40 text-xs font-mono text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)]"
                  />

                  {restoreStatus !== "idle" && (
                    <div
                      className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                        restoreStatus === "success"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30"
                      }`}
                    >
                      {restoreStatus === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      <span>{restoreMessage}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleRestore}
                    className="w-full py-2.5 rounded-xl bg-[var(--brand-primary)] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
                  >
                    <RefreshCw size={14} />
                    <span>Terapkan & Pulihkan Sekarang</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB: SETTINGS & HAPTICS */}
            {activeTab === "settings" && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-[var(--surface-soft)]/50 border border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
                      {hapticOn ? <Vibrate size={18} /> : <VibrateOff size={18} />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">
                        Haptic Feedback (Getaran Sentuh)
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        Sensasi taktil tombol pada smartphone & browser modern
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const next = !hapticOn;
                      setHapticEnabled(next);
                      setHapticOn(next);
                      if (next) triggerHaptic("success");
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      hapticOn
                        ? "bg-emerald-500 text-white shadow-xs"
                        : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]"
                    }`}
                  >
                    {hapticOn ? "Aktif" : "Nonaktif"}
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--surface-soft)]/50 border border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center">
                      {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">
                        Synthesizer Sound FX
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        Efek audio flip kartu, notifikasi benar, dan ketukan
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const next = !soundOn;
                      setSoundEnabled(next);
                      setSoundOn(next);
                      triggerHaptic("light");
                      if (next) playSuccessChime();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      soundOn
                        ? "bg-purple-600 text-white shadow-xs"
                        : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]"
                    }`}
                  >
                    {soundOn ? "Aktif" : "Mute"}
                  </button>
                </div>

                {/* Test Tactile Buttons */}
                <div className="pt-2 border-t border-[var(--border)]">
                  <span className="text-xs font-bold text-[var(--text-secondary)] block mb-2">
                    Uji Coba Sensasi Taktil & Suara:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic("light");
                        playTapSound();
                      }}
                      className="py-2 px-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[11px] font-bold text-[var(--text-primary)] hover:border-[var(--brand-primary)] active:scale-95 transition-all"
                    >
                      Light Tap
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic("success");
                        playSuccessChime();
                      }}
                      className="py-2 px-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 active:scale-95 transition-all"
                    >
                      Success Chime
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic("error");
                        playErrorBuzz();
                      }}
                      className="py-2 px-2 rounded-xl border border-red-500/30 bg-red-500/10 text-[11px] font-bold text-red-600 dark:text-red-400 hover:bg-red-500/20 active:scale-95 transition-all"
                    >
                      Error Buzz
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
