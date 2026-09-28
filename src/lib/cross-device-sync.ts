"use client";

import QRCode from "qrcode";
import { loadTangoProgress, saveTangoProgress, TangoProgress } from "@/lib/tango-n3-storage";
import { loadStudyProgress, saveStudyProgress, StudyProgress } from "@/lib/fe-study-storage";
import { loadWrongQuestions, saveWrongQuestions, WrongQuestionsStore } from "@/lib/fe-wrong-questions-storage";

export interface UnifiedBackupPayload {
  version: 1;
  exportedAt: string;
  cadetId: string;
  tangoN3: TangoProgress;
  feStudy: StudyProgress;
  wrongQuestions?: WrongQuestionsStore;
}

export interface CompactSyncPayload {
  v: 1;
  cid: string;
  tm: string[]; // Tango mastered IDs
  tu: string[]; // Tango unlocked chapter IDs
  tq: Array<[string, number, number]>; // [chId, score, total]
  fm: string[]; // FE mastered IDs
  fu: number[]; // FE unlocked days
  fq: Array<[number, number, number]>; // [day, score, total]
  st: number;   // Max streak
  ts: number;   // Timestamp
}

/**
 * Creates a complete full backup of all learning data
 */
export function createFullBackupPayload(): UnifiedBackupPayload {
  const cadetId =
    typeof window !== "undefined"
      ? localStorage.getItem("kaidevlab_cadet_id") || "KAI-PASS-USER"
      : "KAI-PASS-USER";

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    cadetId,
    tangoN3: loadTangoProgress(),
    feStudy: loadStudyProgress(),
    wrongQuestions: loadWrongQuestions(),
  };
}

/**
 * Downloads a complete JSON backup file to the user's computer
 */
export function downloadFullBackupFile(): void {
  if (typeof window === "undefined") return;

  const payload = createFullBackupPayload();
  const jsonStr = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const dateStr = new Date().toISOString().split("T")[0];
  const a = document.createElement("a");
  a.href = url;
  a.download = `kaidevlab-academy-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Restores full backup JSON file content
 */
export function restoreFullBackup(jsonContent: string): { success: boolean; message: string } {
  try {
    const data = JSON.parse(jsonContent);
    if (!data || data.version !== 1) {
      return { success: false, message: "Format berkas cadangan tidak valid atau versi tidak didukung." };
    }

    if (data.tangoN3) {
      saveTangoProgress(data.tangoN3);
    }
    if (data.feStudy) {
      saveStudyProgress(data.feStudy);
    }
    if (data.wrongQuestions) {
      saveWrongQuestions(data.wrongQuestions);
    }
    if (data.cadetId && typeof window !== "undefined") {
      localStorage.setItem("kaidevlab_cadet_id", data.cadetId);
    }

    // Trigger local storage event for reactive components
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }

    return { success: true, message: "Progres belajar berhasil dipulihkan secara menyeluruh." };
  } catch (err) {
    return { success: false, message: "Gagal membaca berkas JSON: " + (err instanceof Error ? err.message : String(err)) };
  }
}

/**
 * Encodes critical progress into a compact base64 string for QR Code & URL sync
 */
export function encodeCompactSyncToken(): string {
  const cadetId =
    typeof window !== "undefined"
      ? localStorage.getItem("kaidevlab_cadet_id") || "KAI-PASS-USER"
      : "KAI-PASS-USER";

  const tango = loadTangoProgress();
  const fe = loadStudyProgress();

  const tq: Array<[string, number, number]> = Object.entries(tango.chapterQuizScores || {}).map(
    ([ch, val]) => [ch, val.score, val.total]
  );

  const fq: Array<[number, number, number]> = Object.entries(fe.dayQuizScores || {}).map(
    ([day, val]) => [Number(day), val.score, val.total]
  );

  const compact: CompactSyncPayload = {
    v: 1,
    cid: cadetId,
    tm: tango.masteredCardIds || [],
    tu: tango.unlockedChapterIds || ["ch-01"],
    tq,
    fm: fe.masteredCardIds || [],
    fu: fe.unlockedDeckDays || [1],
    fq,
    st: Math.max(tango.streak || 0, fe.streak || 0, 1),
    ts: Date.now(),
  };

  const jsonStr = JSON.stringify(compact);
  // Base64 encode safe for URL
  if (typeof window !== "undefined") {
    return btoa(unescape(encodeURIComponent(jsonStr)));
  }
  return Buffer.from(jsonStr).toString("base64");
}

/**
 * Decodes a compact sync token from a URL or QR code
 */
export function decodeCompactSyncToken(token: string): CompactSyncPayload | null {
  try {
    let jsonStr = "";
    if (typeof window !== "undefined") {
      jsonStr = decodeURIComponent(escape(atob(token)));
    } else {
      jsonStr = Buffer.from(token, "base64").toString("utf-8");
    }

    const payload = JSON.parse(jsonStr) as CompactSyncPayload;
    if (payload && payload.v === 1 && Array.isArray(payload.tm) && Array.isArray(payload.fm)) {
      return payload;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Applies compact sync data into current device's localStorage
 */
export function applyCompactSyncPayload(compact: CompactSyncPayload): void {
  if (typeof window === "undefined") return;

  // 1. Update Tango
  const currentTango = loadTangoProgress();
  const mergedTangoMastered = Array.from(new Set([...currentTango.masteredCardIds, ...compact.tm]));
  const mergedTangoUnlocked = Array.from(new Set([...currentTango.unlockedChapterIds, ...compact.tu]));
  const mergedTangoScores = { ...(currentTango.chapterQuizScores || {}) };

  compact.tq.forEach(([ch, score, total]) => {
    const existing = mergedTangoScores[ch];
    mergedTangoScores[ch] = {
      score: Math.max(score, existing?.score || 0),
      total,
      passed: total > 0 ? score / total >= 0.8 : false,
      completedAt: new Date().toISOString().split("T")[0],
      attempts: (existing?.attempts || 0) + 1,
    };
  });

  const updatedTango: TangoProgress = {
    ...currentTango,
    masteredCardIds: mergedTangoMastered,
    unlockedChapterIds: mergedTangoUnlocked,
    chapterQuizScores: mergedTangoScores,
    streak: Math.max(currentTango.streak, compact.st),
  };
  saveTangoProgress(updatedTango);

  // 2. Update FE Study
  const currentFe = loadStudyProgress();
  const mergedFeMastered = Array.from(new Set([...currentFe.masteredCardIds, ...compact.fm]));
  const mergedFeUnlocked = Array.from(new Set([...currentFe.unlockedDeckDays, ...compact.fu]));
  const mergedFeScores = { ...(currentFe.dayQuizScores || {}) };

  compact.fq.forEach(([day, score, total]) => {
    const existing = mergedFeScores[day];
    mergedFeScores[day] = {
      score: Math.max(score, existing?.score || 0),
      total,
      passed: total > 0 ? score / total >= 0.8 : false,
      completedAt: new Date().toISOString().split("T")[0],
      attempts: (existing?.attempts || 0) + 1,
    };
  });

  const updatedFe: StudyProgress = {
    ...currentFe,
    masteredCardIds: mergedFeMastered,
    unlockedDeckDays: mergedFeUnlocked,
    dayQuizScores: mergedFeScores,
    streak: Math.max(currentFe.streak, compact.st),
  };
  saveStudyProgress(updatedFe);

  // 3. Update Cadet ID if present
  if (compact.cid) {
    localStorage.setItem("kaidevlab_cadet_id", compact.cid);
  }

  // 4. Trigger storage event
  window.dispatchEvent(new Event("storage"));
}

/**
 * Generates an SVG or PNG data URL for displaying a QR code
 */
export async function generateQrCodeDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    width: 280,
    margin: 1.5,
    errorCorrectionLevel: "L", // Low error correction to keep matrix simpler for data capacity
    color: {
      dark: "#061126",
      light: "#FFFFFF",
    },
  });
}
