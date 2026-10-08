"use client";

import { recordUnifiedActivity } from "./unified-study-storage";
import { syncStudyProgressBackground } from "./auth-sync-client";

export interface FEQuestProgress {
  currentDay: number;
  completedDays: number[];
  dayScores: Record<
    number,
    {
      score: number;
      total: number;
      passed: boolean;
      completedAt: string;
    }
  >;
  weaknessCardIds: string[];
  lastStudiedDate: string;
}

const STORAGE_KEY = "kaidevlab_fe_quest_progress_v1";

const DEFAULT_PROGRESS: FEQuestProgress = {
  currentDay: 1,
  completedDays: [],
  dayScores: {},
  weaknessCardIds: [],
  lastStudiedDate: "",
};

export function loadFEQuestProgress(): FEQuestProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      currentDay: parsed.currentDay || 1,
      completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
      dayScores: parsed.dayScores || {},
      weaknessCardIds: Array.isArray(parsed.weaknessCardIds) ? parsed.weaknessCardIds : [],
      lastStudiedDate: parsed.lastStudiedDate || "",
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveFEQuestProgress(progress: FEQuestProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event("kaidevlab:fe_quest_updated"));
    window.dispatchEvent(new Event("kaidevlab:study_activity_recorded"));
    syncStudyProgressBackground();
  } catch (err) {
    console.error("Failed to save FE quest progress:", err);
  }
}

export function completeFEQuestDay(
  dayNumber: number,
  score: number,
  total: number
): FEQuestProgress {
  const current = loadFEQuestProgress();
  const completed = new Set(current.completedDays);
  completed.add(dayNumber);

  const passed = total > 0 ? score / total >= 0.6 : true; // IPA standard: 60% passing mark
  const nextDay = Math.max(current.currentDay, dayNumber + 1);
  const todayStr = new Date().toISOString().split("T")[0];

  const updated: FEQuestProgress = {
    ...current,
    currentDay: nextDay,
    completedDays: Array.from(completed).sort((a, b) => a - b),
    dayScores: {
      ...current.dayScores,
      [dayNumber]: {
        score,
        total,
        passed,
        completedAt: new Date().toISOString(),
      },
    },
    lastStudiedDate: todayStr,
  };

  saveFEQuestProgress(updated);

  // Record into unified study activity for streak
  recordUnifiedActivity("fe", 6);

  return updated;
}
