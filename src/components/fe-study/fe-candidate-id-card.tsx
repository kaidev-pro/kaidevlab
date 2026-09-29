"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
  CreditCard,
  Award,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Download,
  RotateCw,
  User,
  Copy,
  Check,
  Camera,
  Layers,
  Sparkles,
  Calendar,
  Building2,
  BadgeCheck,
  Eye,
  RefreshCw,
  Edit3,
} from "lucide-react";

export interface FeCandidateIdCardProps {
  candidateName?: string;
  candidateId?: string;
  examDate?: string;
  examMode?: "mock" | "practice" | "hub";
  score?: number;
  total?: number;
  percentage?: number;
  isPassed?: boolean;
  categoryStats?: Record<string, { correct: number; total: number }>;
  onNameChange?: (newName: string) => void;
  className?: string;
}

export function FeCandidateIdCard({
  candidateName = "Kai",
  candidateId = "FE-CBT-2026-X8K92",
  examDate,
  examMode = "hub",
  score = 850,
  total = 1000,
  percentage = 85,
  isPassed = true,
  categoryStats,
  onNameChange,
  className = "",
}: FeCandidateIdCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentName, setCurrentName] = useState(candidateName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Sync external candidateName
  useEffect(() => {
    if (candidateName) {
      setCurrentName(candidateName);
    }
  }, [candidateName]);

  // Load custom avatar from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAvatar = localStorage.getItem("kaidevlab_fe_card_avatar");
      if (savedAvatar) {
        setAvatarImage(savedAvatar);
      }
      const savedName = localStorage.getItem("kaidevlab_candidate_name");
      if (savedName && !candidateName) {
        setCurrentName(savedName);
      }
    }
  }, [candidateName]);

  // Formatted exam date
  const displayDate =
    examDate ||
    new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  // Verification URL encoded into QR Code
  const verificationPayload = `https://kaidevlab.com/tools/fe-study?cid=${encodeURIComponent(
    candidateId
  )}&cadet=${encodeURIComponent(currentName)}&score=${percentage}`;

  // Generate QR code
  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(verificationPayload, {
      width: 160,
      margin: 1,
      color: {
        dark: "#0c1b33",
        light: "#ffffff",
      },
    })
      .then((url: string) => {
        if (isMounted) setQrCodeDataUrl(url);
      })
      .catch((err: unknown) => {
        console.error("QR Code generation error:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [verificationPayload]);

  const handleCopyId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(candidateId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setAvatarImage(dataUrl);
        if (typeof window !== "undefined") {
          localStorage.setItem("kaidevlab_fe_card_avatar", dataUrl);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveName = () => {
    setIsEditingName(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("kaidevlab_candidate_name", currentName);
    }
    if (onNameChange) {
      onNameChange(currentName);
    }
  };

  // High-Resolution 2X Canvas Exporter for Downloading Image
  const handleDownloadCardPng = async () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create canvas context");

      // 1200 x 760 retina 2x ID card
      const width = 1200;
      const height = 760;
      canvas.width = width;
      canvas.height = height;

      // Draw background - Midnight Navy
      ctx.fillStyle = "#070b14";
      ctx.fillRect(0, 0, width, height);

      // Load background guilloche image
      const bgImg = new Image();
      bgImg.crossOrigin = "anonymous";
      await new Promise<void>((resolve) => {
        bgImg.onload = () => resolve();
        bgImg.onerror = () => resolve();
        bgImg.src = "/fe-study/card-guilloche-bg.jpg";
      });

      if (bgImg.width) {
        ctx.globalAlpha = 0.55;
        ctx.drawImage(bgImg, 0, 0, width, height);
        ctx.globalAlpha = 1.0;
      }

      // Rounded border & metallic gradient frame - Cyber Cobalt / Sky
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 4;
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(16, 16, width - 32, height - 32, 28);
      } else {
        (ctx as unknown as CanvasRenderingContext2D).rect(16, 16, width - 32, height - 32);
      }
      ctx.stroke();

      // Top Header bar
      ctx.fillStyle = "rgba(12, 27, 51, 0.7)";
      ctx.fillRect(20, 20, width - 40, 100);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("独立行政法人 情報処理推進機構 (IPA 準拠) · 日本国家IT資格", 46, 58);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px serif";
      ctx.fillText("基本情報技術者試験 (FE CBT) 受験者証 · CANDIDATE PASS", 46, 98);

      // Gold Seal Badge image
      const sealImg = new Image();
      sealImg.crossOrigin = "anonymous";
      await new Promise<void>((resolve) => {
        sealImg.onload = () => resolve();
        sealImg.onerror = () => resolve();
        sealImg.src = "/fe-study/gold-seal.jpg";
      });

      if (sealImg.width) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(width - 96, 70, 44, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(sealImg, width - 140, 26, 88, 88);
        ctx.restore();

        // Gold ring around seal
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(width - 96, 70, 44, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Candidate Avatar / Portrait
      const photoX = 56;
      const photoY = 160;
      const photoW = 210;
      const photoH = 260;

      ctx.fillStyle = "#0a1020";
      ctx.fillRect(photoX, photoY, photoW, photoH);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 3;
      ctx.strokeRect(photoX, photoY, photoW, photoH);

      if (avatarImage) {
        const userImg = new Image();
        userImg.crossOrigin = "anonymous";
        await new Promise<void>((resolve) => {
          userImg.onload = () => resolve();
          userImg.onerror = () => resolve();
          userImg.src = avatarImage;
        });
        if (userImg.width) {
          ctx.drawImage(userImg, photoX + 2, photoY + 2, photoW - 4, photoH - 4);
        }
      } else {
        // Default silhouette avatar
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(photoX + 2, photoY + 2, photoW - 4, photoH - 4);
        ctx.fillStyle = "#64748b";
        ctx.font = "bold 24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("KAI CADET", photoX + photoW / 2, photoY + photoH / 2);
        ctx.textAlign = "start";
      }

      // Smart Card IC Chip (drawn vector chip)
      const chipX = photoX;
      const chipY = photoY + photoH + 24;
      ctx.fillStyle = "#d97706";
      ctx.fillRect(chipX, chipY, 84, 60);
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2;
      ctx.strokeRect(chipX, chipY, 84, 60);
      // Chip inner circuits
      ctx.strokeRect(chipX + 16, chipY + 14, 52, 32);
      ctx.beginPath();
      ctx.moveTo(chipX + 42, chipY);
      ctx.lineTo(chipX + 42, chipY + 60);
      ctx.moveTo(chipX, chipY + 30);
      ctx.lineTo(chipX + 84, chipY + 30);
      ctx.stroke();

      // Candidate Information Section
      const infoX = 306;
      ctx.fillStyle = "#94a3b8";
      ctx.font = "16px sans-serif";
      ctx.fillText("CANDIDATE NAME · 氏名", infoX, 175);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px serif";
      ctx.fillText(currentName.toUpperCase(), infoX, 220);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "16px sans-serif";
      ctx.fillText("REGISTRATION NO · 受験者番号", infoX, 270);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 26px monospace";
      ctx.fillText(candidateId, infoX, 305);

      // Grid stats
      ctx.fillStyle = "#94a3b8";
      ctx.font = "15px sans-serif";
      ctx.fillText("EXAM DIVISION · 受験区分", infoX, 355);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("科目A · 午前CBT試験 (60問)", infoX, 385);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "15px sans-serif";
      ctx.fillText("TARGET TRACK · 認定区分", infoX + 320, 355);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("技人国 VISA Fast-Track", infoX + 320, 385);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "15px sans-serif";
      ctx.fillText("ISSUE DATE · 発効日", infoX, 435);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 20px monospace";
      ctx.fillText(displayDate, infoX, 465);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "15px sans-serif";
      ctx.fillText("READINESS STATUS · 判定", infoX + 320, 435);
      ctx.fillStyle = isPassed ? "#38bdf8" : "#f59e0b";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(isPassed ? "合格認定 · PASSED" : "受講中 · IN PROGRESS", infoX + 320, 465);

      // Barcode element (vector bars)
      const barX = infoX;
      const barY = 515;
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 48; i++) {
        const w = (i % 3 === 0 ? 4 : i % 5 === 0 ? 6 : 2) * 1.6;
        ctx.fillRect(barX + i * 8.5, barY, w, 44);
      }
      ctx.fillStyle = "#64748b";
      ctx.font = "14px monospace";
      ctx.fillText(`* ${candidateId} *`, barX + 90, barY + 62);

      // QR Code
      if (qrCodeDataUrl) {
        const qrImg = new Image();
        await new Promise<void>((resolve) => {
          qrImg.onload = () => resolve();
          qrImg.onerror = () => resolve();
          qrImg.src = qrCodeDataUrl;
        });
        if (qrImg.width) {
          ctx.drawImage(qrImg, width - 200, 470, 140, 140);
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2;
          ctx.strokeRect(width - 202, 468, 144, 144);
        }
      }

      // Red Hanko / Stamp (印)
      const hankoX = width - 290;
      const hankoY = 320;
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 3;
      ctx.strokeRect(hankoX, hankoY, 70, 70);
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 22px serif";
      ctx.textAlign = "center";
      ctx.fillText("合格", hankoX + 35, hankoY + 32);
      ctx.fillText("之印", hankoX + 35, hankoY + 58);
      ctx.textAlign = "start";

      // Download trigger
      const link = document.createElement("a");
      link.download = `FE-Candidate-Pass-${currentName.replace(/\s+/g, "_")}-${candidateId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export canvas error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-6 w-full ${className}`}>
      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-[620px] px-2 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
            <CreditCard size={14} className="text-sky-400" />
            Kartu Peserta Ujian Resmi (受験者証)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-primary)] transition-all shadow-sm"
          >
            <RotateCw size={13} className="text-sky-400" />
            {isFlipped ? "Lihat Bagian Depan" : "Balik Kartu (Belakang)"}
          </button>

          <button
            type="button"
            onClick={handleDownloadCardPng}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-xs font-bold text-sky-400 transition-all shadow-sm disabled:opacity-50"
          >
            <Download size={13} />
            {isDownloading ? "Menyiapkan File..." : "Unduh Kartu (PNG)"}
          </button>
        </div>
      </div>

      {/* Hidden File Input for Custom Avatar */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarUpload}
        accept="image/*"
        className="hidden"
      />

      {/* 3D Perspective Card Container */}
      <div
        className="w-full max-w-[620px] select-none"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={cardRef}
          className="relative w-full rounded-3xl transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ============================================================== */}
          {/* FRONT SIDE - Midnight Navy & Cyber Cobalt */}
          {/* ============================================================== */}
          <div
            className="w-full relative rounded-3xl border-2 border-sky-400/40 bg-[#070b14] text-white shadow-[0_0_35px_rgba(14,165,233,0.18)] overflow-hidden p-5 sm:p-7 md:p-8 flex flex-col justify-between gap-5"
            style={{
              backfaceVisibility: "hidden",
              backgroundImage: "url('/fe-study/card-guilloche-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark glassmorphic navy overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#070b14]/78 via-[#0b1329]/72 to-[#0e1e3e]/78 backdrop-blur-[0.5px] pointer-events-none" />

            {/* Subtle holographic foil cobalt shine */}
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

            {/* Top Lanyard Slot Graphic */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-inner flex items-center justify-center">
              <div className="w-10 h-0.5 rounded-full bg-slate-950/90" />
            </div>

            {/* CARD HEADER */}
            <div className="relative z-10 flex items-start justify-between gap-4 pt-1 border-b border-sky-500/25 pb-4">
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
                  独立行政法人 情報処理推進機構 (IPA 準拠) · 国家IT資格
                </span>
                <div
                  role="heading"
                  aria-level={3}
                  style={{ color: "#ffffff" }}
                  className="text-base sm:text-lg md:text-xl font-extrabold font-serif tracking-tight text-white mt-0.5 flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
                >
                  <span style={{ color: "#ffffff" }}>基本情報技術者試験 (FE CBT)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-200 font-mono font-semibold border border-sky-400/40">
                    CANDIDATE PASS
                  </span>
                </div>
              </div>

              {/* Official Gold Seal Badge Asset */}
              <div className="relative group shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.35)] overflow-hidden bg-slate-900 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/fe-study/gold-seal.jpg"
                    alt="Official Japanese IT Certification Seal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-sky-500 border border-slate-900 flex items-center justify-center shadow">
                  <BadgeCheck size={10} className="text-white" />
                </div>
              </div>
            </div>

            {/* CARD BODY */}
            <div className="relative z-10 grid grid-cols-12 gap-4 items-center">
              {/* Photo & IC Smart Chip Column (Cols 1-4) */}
              <div className="col-span-4 sm:col-span-3 flex flex-col items-center gap-2.5">
                {/* Photo Frame */}
                <div className="relative group w-24 h-28 sm:w-28 sm:h-32 rounded-xl border-2 border-sky-400/70 bg-slate-950 overflow-hidden shadow-[0_0_15px_rgba(56,189,248,0.2)] flex items-center justify-center">
                  {avatarImage ? (
                    <img
                      src={avatarImage}
                      alt="Candidate Portrait"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-2 text-slate-400">
                      <User size={36} className="text-slate-500" />
                      <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase">
                        KAI CADET
                      </span>
                    </div>
                  )}

                  {/* Photo upload overlay */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Ganti Foto Paspor / Foto Profil"
                    className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity text-[10px] font-semibold text-sky-300 cursor-pointer print:hidden"
                  >
                    <Camera size={16} />
                    <span>Ubah Foto</span>
                  </button>
                </div>

                {/* Vector Smart Card IC Chip */}
                <div className="w-12 h-9 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-200 shadow-md p-1 flex flex-col justify-between relative overflow-hidden">
                  <div className="w-full h-0.5 bg-amber-700/50" />
                  <div className="flex items-center justify-between">
                    <div className="w-2.5 h-3 rounded-sm border border-amber-700/60" />
                    <div className="w-3.5 h-3.5 rounded-full border border-amber-700/60 flex items-center justify-center text-[7px] font-bold text-amber-950">
                      IC
                    </div>
                    <div className="w-2.5 h-3 rounded-sm border border-amber-700/60" />
                  </div>
                  <div className="w-full h-0.5 bg-amber-700/50" />
                </div>
              </div>

              {/* Candidate Info Details Column (Cols 5-12) */}
              <div className="col-span-8 sm:col-span-9 flex flex-col justify-between gap-3 pl-1">
                {/* Name */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                      CANDIDATE NAME · 氏名
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingName(!isEditingName)}
                      style={{ fontSize: "11px" }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-300 hover:text-white font-mono text-[11px] font-semibold transition-all shadow-xs cursor-pointer print:hidden"
                    >
                      <Edit3 size={11} className="text-sky-400" />
                      <span>{isEditingName ? "Batal" : "Edit Nama"}</span>
                    </button>
                  </div>

                  {isEditingName ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                        className="bg-slate-900 border border-sky-400/60 rounded px-2 py-0.5 text-sm sm:text-base font-bold text-white focus:outline-none focus:border-sky-300 w-full"
                        placeholder="Nama Lengkap"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleSaveName}
                        className="px-2.5 py-1 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                      >
                        Simpan
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{ color: "#ffffff" }}
                      className="text-lg sm:text-2xl font-bold font-serif text-white tracking-wide mt-0.5 flex items-center gap-2"
                    >
                      <span style={{ color: "#ffffff" }}>{currentName.toUpperCase()}</span>
                      <span className="text-xs font-mono font-normal text-sky-400">
                        (認証済)
                      </span>
                    </div>
                  )}
                </div>

                {/* Candidate Serial & Copy */}
                <div>
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                    REGISTRATION NUMBER · 受験者番号
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm sm:text-base font-mono font-extrabold text-sky-300 tracking-wider">
                      {candidateId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      title="Salin Nomor Ujian"
                      className="text-slate-400 hover:text-sky-400 transition-colors p-1 print:hidden"
                    >
                      {copiedId ? <Check size={13} className="text-sky-400" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                {/* Meta details grid */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800/80">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">
                      EXAM DIVISION · 区分
                    </span>
                    <span className="font-semibold text-slate-200 text-[11px] sm:text-xs">
                      科目A · 午前CBT (60問)
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">
                      TARGET TRACK · 認定
                    </span>
                    <span className="font-semibold text-slate-200 text-[11px] sm:text-xs">
                      技人国 Visa Fast-Track
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">
                      ISSUE DATE · 発効日
                    </span>
                    <span className="font-mono text-slate-200 text-[11px] sm:text-xs">
                      {displayDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">
                      READINESS STATUS · 判定
                    </span>
                    <span
                      className={`font-bold text-[11px] sm:text-xs flex items-center gap-1 ${
                        isPassed ? "text-sky-400" : "text-amber-400"
                      }`}
                    >
                      <CheckCircle2 size={12} />
                      {isPassed ? "合格認定 (PASSED)" : "受講中 (READY)"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD FOOTER (Barcode, Hanko & QR) */}
            <div className="relative z-10 flex items-end justify-between pt-3 border-t border-sky-500/20">
              {/* Barcode representation */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-[2.5px] h-8 opacity-85">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-slate-200 h-full"
                      style={{
                        width: i % 4 === 0 ? "3px" : i % 2 === 0 ? "1.5px" : "1px",
                      }}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-slate-400 tracking-widest">
                  {candidateId}
                </span>
              </div>

              {/* Japanese Official Hanko Seal Stamp (印: 合格之印) */}
              <div className="flex items-center justify-center w-11 h-11 border-2 border-red-500 rounded-lg text-red-500 font-serif font-black text-[10px] leading-tight text-center rotate-[-4deg] opacity-90 select-none shadow-sm bg-red-500/5">
                <div>
                  <div>合格</div>
                  <div>之印</div>
                </div>
              </div>

              {/* Dynamic QR Code */}
              <div className="relative">
                {qrCodeDataUrl ? (
                  <div className="w-14 h-14 bg-white p-1 rounded-lg border border-sky-400/50 shadow-[0_0_10px_rgba(56,189,248,0.15)] flex items-center justify-center">
                    <img
                      src={qrCodeDataUrl}
                      alt="Verification QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center">
                    <span className="text-[8px] font-mono text-slate-500">QR CODE</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BACK SIDE - Midnight Navy & Cyber Cobalt */}
          {/* ============================================================== */}
          <div
            className="w-full absolute inset-0 rounded-3xl border-2 border-sky-400/40 bg-[#070b14] text-white shadow-[0_0_35px_rgba(14,165,233,0.18)] overflow-hidden p-5 sm:p-7 md:p-8 flex flex-col justify-between gap-4"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              backgroundImage: "url('/fe-study/card-guilloche-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark glassmorphic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#070b14]/80 via-[#091124]/75 to-[#0e1e3e]/80 backdrop-blur-[0.5px] pointer-events-none" />

            {/* Magnetic Stripe */}
            <div className="relative z-10 -mx-8 -mt-2 bg-gradient-to-r from-black via-slate-900 to-black h-9 border-y border-zinc-800 shadow-inner flex items-center px-6">
              <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase">
                IPA JAPAN IT EXAMINATION SYSTEM · CBT CONTACTLESS CREDENTIAL
              </span>
            </div>

            {/* Signature & Security Seal strip */}
            <div className="relative z-10 flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
              <div className="flex-1 bg-slate-100 text-slate-900 px-3 py-1.5 rounded font-serif italic text-base sm:text-lg font-bold shadow-inner">
                {currentName}
              </div>
              <div className="text-right font-mono text-[10px] text-slate-400">
                <span className="block text-[8px] uppercase">SEC CODE</span>
                <span className="font-bold text-sky-400">IPA-824</span>
              </div>
            </div>

            {/* Competency Domain Progress (From actual exam stats or syllabus) */}
            <div className="relative z-10 flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
                3 PILAR KOMPETENSI IPA JAPAN (シラバス達成度)
              </span>

              {/* Technology */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">テクノロジ系 (Technology)</span>
                  <span className="font-mono text-sky-400 font-bold">
                    {categoryStats?.technology
                      ? `${Math.round(
                          (categoryStats.technology.correct / (categoryStats.technology.total || 1)) * 100
                        )}%`
                      : "85%"}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                    style={{
                      width: categoryStats?.technology
                        ? `${(categoryStats.technology.correct / (categoryStats.technology.total || 1)) * 100}%`
                        : "85%",
                    }}
                  />
                </div>
              </div>

              {/* Management */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">マネジメント系 (Management)</span>
                  <span className="font-mono text-cyan-400 font-bold">
                    {categoryStats?.management
                      ? `${Math.round(
                          (categoryStats.management.correct / (categoryStats.management.total || 1)) * 100
                        )}%`
                      : "82%"}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                    style={{
                      width: categoryStats?.management
                        ? `${(categoryStats.management.correct / (categoryStats.management.total || 1)) * 100}%`
                        : "82%",
                    }}
                  />
                </div>
              </div>

              {/* Strategy */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">ストラテジ系 (Strategy)</span>
                  <span className="font-mono text-indigo-400 font-bold">
                    {categoryStats?.strategy
                      ? `${Math.round(
                          (categoryStats.strategy.correct / (categoryStats.strategy.total || 1)) * 100
                        )}%`
                      : "80%"}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                    style={{
                      width: categoryStats?.strategy
                        ? `${(categoryStats.strategy.correct / (categoryStats.strategy.total || 1)) * 100}%`
                        : "80%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Official Legal Notice & Disclaimer */}
            <div className="relative z-10 text-[9px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2.5">
              <p className="font-mono">
                【注意事項】本証は独立行政法人情報処理推進機構（IPA）策定基準の基本情報技術者試験（FE）CBTシミュレーション修了証です。
                技人国（技術・人文知識・国際業務）ビザ取得基準に対応した実践的IT知識水準を証明します。
              </p>
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 mt-1">
                <span>DIGITAL VERIFICATION HASH: SHA256:{candidateId.replace(/-/g, "")}</span>
                <span>KAIDEVLAB IT ACADEMY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Guide */}
      <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-secondary)] print:hidden">
        <span className="inline-flex items-center gap-1">
          <Eye size={13} className="text-sky-400" /> Klik "Balik Kartu" untuk melihat silabus & kompetensi
        </span>
        <span className="inline-flex items-center gap-1">
          <Camera size={13} className="text-sky-400" /> Arahkan kursor ke foto untuk mengganti foto
        </span>
      </div>
    </div>
  );
}
