"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Lock,
  Mail,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  LogOut,
  ShieldCheck,
  CloudCheck,
  Languages,
  Binary,
  Layers,
  AlertCircle,
  Flame,
} from "lucide-react";
import {
  getStoredAuth,
  registerCadet,
  loginCadet,
  logoutCadet,
  syncStudyProgress,
  updateCadetProfile,
  UserProfile,
} from "@/lib/auth-sync-client";
import { triggerHaptic } from "@/lib/haptics";
import { playTapSound, playSuccessChime, playErrorBuzz } from "@/lib/global-sound";

interface AuthOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register" | "profile";
  onTrackChanged?: (track: "n3" | "fe" | "both") => void;
}

export function AuthOnboardingModal({
  isOpen,
  onClose,
  defaultTab,
  onTrackChanged,
}: AuthOnboardingModalProps) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  // View state: 'login' | 'register' | 'profile'
  const [view, setView] = useState<"login" | "register" | "profile">("register");

  // Registration multi-step wizard: 1 (Credentials) -> 2 (Identity/Name) -> 3 (Track Selection)
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);

  // Form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [learningTrack, setLearningTrack] = useState<"n3" | "fe" | "both">("both");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successNotice, setSuccessNotice] = useState("");

  // Refresh auth state when modal opens
  useEffect(() => {
    if (isOpen) {
      const auth = getStoredAuth();
      setCurrentUser(auth.user);
      setIsLoggedIn(auth.isLoggedIn);
      setLastSynced(auth.lastSyncedAt);
      setErrorMessage("");
      setSuccessNotice("");

      if (auth.isLoggedIn) {
        setView("profile");
      } else if (defaultTab) {
        setView(defaultTab);
        setRegStep(1);
      } else {
        setView("register");
        setRegStep(1);
      }
    }
  }, [isOpen, defaultTab]);

  // Handle Register Flow
  const handleNextStep = () => {
    setErrorMessage("");
    if (regStep === 1) {
      if (!username.trim() || username.trim().length < 3) {
        setErrorMessage("Username harus terdiri dari minimal 3 karakter.");
        triggerHaptic("error");
        playErrorBuzz();
        return;
      }
      if (!password || password.length < 6) {
        setErrorMessage("Kata sandi harus terdiri dari minimal 6 karakter.");
        triggerHaptic("error");
        playErrorBuzz();
        return;
      }
      triggerHaptic("light");
      playTapSound();
      setRegStep(2);
    } else if (regStep === 2) {
      if (!name.trim()) {
        setErrorMessage("Harap masukkan nama panggilan atau nama lengkapmu.");
        triggerHaptic("error");
        playErrorBuzz();
        return;
      }
      triggerHaptic("light");
      playTapSound();
      setRegStep(3);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    triggerHaptic("medium");

    const res = await registerCadet({
      username: username.trim(),
      password,
      name: name.trim(),
      learningTrack,
    });

    setIsLoading(false);

    if (res.success && res.user) {
      setCurrentUser(res.user);
      setIsLoggedIn(true);
      triggerHaptic("success");
      playSuccessChime();
      setSuccessNotice(`Selamat datang, ${res.user.name}! Akun Kadet berhasil dibuat.`);
      if (onTrackChanged) {
        onTrackChanged(res.user.learningTrack);
      }
      setTimeout(() => {
        setView("profile");
        setSuccessNotice("");
      }, 1500);
    } else {
      setErrorMessage(res.message || "Gagal membuat akun.");
      triggerHaptic("error");
      playErrorBuzz();
    }
  };

  // Handle Login Flow
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    triggerHaptic("medium");

    const res = await loginCadet({
      username: username.trim(),
      password,
    });

    setIsLoading(false);

    if (res.success && res.user) {
      setCurrentUser(res.user);
      setIsLoggedIn(true);
      triggerHaptic("success");
      playSuccessChime();
      if (onTrackChanged) {
        onTrackChanged(res.user.learningTrack);
      }
      setView("profile");
    } else {
      setErrorMessage(res.message || "Username atau password salah.");
      triggerHaptic("error");
      playErrorBuzz();
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    triggerHaptic("light");
    playTapSound();
    await logoutCadet();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setView("login");
    setUsername("");
    setPassword("");
  };

  // Handle Manual Sync
  const handleManualSync = async () => {
    setIsLoading(true);
    triggerHaptic("medium");
    const res = await syncStudyProgress();
    setIsLoading(false);
    if (res.success) {
      setLastSynced(res.lastSyncedAt || new Date().toISOString());
      triggerHaptic("success");
      playSuccessChime();
      setSuccessNotice("Progres berhasil disinkronkan ke server cloud!");
      setTimeout(() => setSuccessNotice(""), 2500);
    } else {
      setErrorMessage(res.message || "Gagal menyinkronkan.");
      triggerHaptic("error");
      playErrorBuzz();
    }
  };

  // Handle Track Update
  const handleTrackChange = async (newTrack: "n3" | "fe" | "both") => {
    triggerHaptic("light");
    playTapSound();
    const res = await updateCadetProfile({ learningTrack: newTrack });
    if (res.success && res.user) {
      setCurrentUser(res.user);
      if (onTrackChanged) onTrackChanged(newTrack);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] shadow-[0_25px_70px_rgba(0,0,0,0.4)] rounded-3xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--surface-soft)]/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--brand-primary)] to-blue-500 flex items-center justify-center text-white shadow-sm">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[var(--text-primary)]">
                  {view === "profile"
                    ? "KAI-PASS Cadet Profile"
                    : view === "login"
                    ? "Masuk ke Akun Kaidevlab"
                    : "Pendaftaran Kadet Baru"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  {view === "profile"
                    ? "Sinkronisasi otomatis aktif di semua perangkat"
                    : "Simpan progres & lanjutkan belajar di HP atau laptop"}
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
              className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {/* ALERT NOTICES */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successNotice && (
              <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* 1. REGISTER WIZARD */}
            {view === "register" && !isLoggedIn && (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                {/* Stepper Indicator */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        regStep >= 1
                          ? "bg-[var(--brand-primary)] text-white"
                          : "bg-[var(--surface-soft)] text-[var(--text-secondary)]"
                      }`}
                    >
                      1
                    </span>
                    <span className="text-xs font-bold text-[var(--text-primary)]">Akun</span>
                  </div>
                  <div className="h-0.5 flex-1 mx-3 bg-[var(--border)]" />
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        regStep >= 2
                          ? "bg-[var(--brand-primary)] text-white"
                          : "bg-[var(--surface-soft)] text-[var(--text-secondary)]"
                      }`}
                    >
                      2
                    </span>
                    <span className="text-xs font-bold text-[var(--text-primary)]">Nama</span>
                  </div>
                  <div className="h-0.5 flex-1 mx-3 bg-[var(--border)]" />
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        regStep === 3
                          ? "bg-[var(--brand-primary)] text-white"
                          : "bg-[var(--surface-soft)] text-[var(--text-secondary)]"
                      }`}
                    >
                      3
                    </span>
                    <span className="text-xs font-bold text-[var(--text-primary)]">Materi</span>
                  </div>
                </div>

                {/* STEP 1: CREDENTIALS */}
                {regStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                        <User size={14} className="text-[var(--brand-primary)]" />
                        Username atau Email
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Contoh: bagus_kai atau bagus@email.com"
                        autoFocus
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/50 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all font-medium"
                      />
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        Digunakan untuk masuk ke akun di perangkat lain.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                        <Lock size={14} className="text-[var(--brand-primary)]" />
                        Kata Sandi
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/50 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all font-medium"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full py-3 rounded-2xl bg-[var(--brand-primary)] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-98 transition-all"
                    >
                      <span>Lanjut: Masukkan Nama</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {/* STEP 2: USER IDENTITY / NAME */}
                {regStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--text-primary)] block">
                        Siapa nama panggilan atau nama lengkapmu?
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Bagus / Bagus Pratama"
                        autoFocus
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/50 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all font-medium"
                      />
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        Nama ini akan tertera pada kartu identitas KAI-PASS dan sapaan belajar harian.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setRegStep(1)}
                        className="px-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5"
                      >
                        <ArrowLeft size={14} />
                        <span>Kembali</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 py-3 rounded-2xl bg-[var(--brand-primary)] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-98 transition-all"
                      >
                        <span>Lanjut: Pilih Materi Belajar</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: TRACK SELECTION */}
                {regStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">
                        Pilih materi pembelajaran yang ingin kamu fokuskan:
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        Kamu tetap bisa mengakses semua materi kapan saja di dalam dashboard.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {/* OPTION 1: JLPT N3 */}
                      <div
                        onClick={() => {
                          setLearningTrack("n3");
                          triggerHaptic("light");
                        }}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          learningTrack === "n3"
                            ? "bg-amber-500/10 border-amber-500 shadow-xs"
                            : "bg-[var(--surface-soft)]/30 border-[var(--border)] hover:border-[var(--brand-primary)]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">🇯🇵</span>
                            <span className="text-sm font-bold text-[var(--text-primary)]">
                              JLPT N3 Japanese Suite
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            1.929 Materi
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)]">
                          Tango 1.800 Kosakata · Tata Bahasa Bunpou · Membaca Dokkai.
                        </p>
                      </div>

                      {/* OPTION 2: FE IT EXAM */}
                      <div
                        onClick={() => {
                          setLearningTrack("fe");
                          triggerHaptic("light");
                        }}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          learningTrack === "fe"
                            ? "bg-blue-500/10 border-blue-500 shadow-xs"
                            : "bg-[var(--surface-soft)]/30 border-[var(--border)] hover:border-[var(--brand-primary)]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">💻</span>
                            <span className="text-sm font-bold text-[var(--text-primary)]">
                              Fundamental IT Engineer (FE)
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-600 dark:text-blue-400">
                            Sertifikasi IPA
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)]">
                          60 Kartu Konsep IT · CBT Simulator Kakomon · Pseudocode Trace Lab.
                        </p>
                      </div>

                      {/* OPTION 3: BOTH (FULL TRACK) */}
                      <div
                        onClick={() => {
                          setLearningTrack("both");
                          triggerHaptic("light");
                        }}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          learningTrack === "both"
                            ? "bg-emerald-500/10 border-emerald-500 shadow-xs"
                            : "bg-[var(--surface-soft)]/30 border-[var(--border)] hover:border-[var(--brand-primary)]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">🚀</span>
                            <span className="text-sm font-bold text-[var(--text-primary)]">
                              Keduanya (Full Track: Jepang & IT)
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                            Rekomendasi
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)]">
                          Persiapan lengkap untuk bekerja & berkarir sebagai software engineer di Jepang.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setRegStep(2)}
                        className="px-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5"
                      >
                        <ArrowLeft size={14} />
                        <span>Kembali</span>
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-blue-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-98 transition-all disabled:opacity-50"
                      >
                        {isLoading ? (
                          <RefreshCw size={16} className="animate-spin" />
                        ) : (
                          <Sparkles size={16} />
                        )}
                        <span>Selesaikan & Mulai Belajar</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Footer Switch to Login */}
                <div className="pt-2 text-center text-xs text-[var(--text-secondary)]">
                  Sudah punya akun sebelumnya?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setView("login");
                      setErrorMessage("");
                    }}
                    className="font-bold text-[var(--brand-primary)] hover:underline"
                  >
                    Masuk di sini
                  </button>
                </div>
              </form>
            )}

            {/* 2. LOGIN FORM */}
            {view === "login" && !isLoggedIn && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                    <User size={14} className="text-[var(--brand-primary)]" />
                    Username atau Email
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username atau email"
                    autoFocus
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/50 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                    <Lock size={14} className="text-[var(--brand-primary)]" />
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/50 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-2xl bg-[var(--brand-primary)] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-98 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                  <span>Masuk & Sinkronkan Progres</span>
                </button>

                <div className="pt-2 text-center text-xs text-[var(--text-secondary)]">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setView("register");
                      setRegStep(1);
                      setErrorMessage("");
                    }}
                    className="font-bold text-[var(--brand-primary)] hover:underline"
                  >
                    Daftar akun baru
                  </button>
                </div>
              </form>
            )}

            {/* 3. PROFILE & SYNC STATUS (LOGGED IN) */}
            {view === "profile" && currentUser && (
              <div className="space-y-5">
                {/* Cadet ID Badge */}
                <div className="p-4 rounded-3xl bg-gradient-to-br from-[var(--surface-soft)] to-[var(--surface)] border border-[var(--border)] relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--brand-primary)] text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-[var(--text-primary)]">
                          {currentUser.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                          <span className="font-mono font-bold text-[var(--brand-primary)]">
                            {currentUser.cadetId}
                          </span>
                          <span>•</span>
                          <span>@{currentUser.username}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Cloud Synced</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                    <span>Terakhir sinkron:</span>
                    <span className="font-mono font-semibold text-[var(--text-primary)]">
                      {lastSynced
                        ? new Date(lastSynced).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Baru saja"}
                    </span>
                  </div>
                </div>

                {/* Focus Track Preference */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--text-secondary)] block">
                    Fokus Materi Pembelajaran Utama:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleTrackChange("n3")}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        currentUser.learningTrack === "n3"
                          ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                          : "bg-[var(--surface-soft)] text-[var(--text-primary)] border-[var(--border)] hover:border-amber-500"
                      }`}
                    >
                      🇯🇵 JLPT N3
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTrackChange("fe")}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        currentUser.learningTrack === "fe"
                          ? "bg-blue-600 text-white border-blue-700 shadow-xs"
                          : "bg-[var(--surface-soft)] text-[var(--text-primary)] border-[var(--border)] hover:border-blue-500"
                      }`}
                    >
                      💻 FE IT Exam
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTrackChange("both")}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        currentUser.learningTrack === "both"
                          ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                          : "bg-[var(--surface-soft)] text-[var(--text-primary)] border-[var(--border)] hover:border-emerald-500"
                      }`}
                    >
                      🚀 Keduanya
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                  <button
                    type="button"
                    onClick={handleManualSync}
                    disabled={isLoading}
                    className="w-full py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
                  >
                    <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                    <span>Sinkronkan Manual Sekarang</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 text-xs font-bold text-red-600 dark:text-red-400 flex items-center justify-center gap-2 active:scale-98 transition-all"
                  >
                    <LogOut size={14} />
                    <span>Keluar Akun di Perangkat Ini</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
