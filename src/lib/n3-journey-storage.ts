"use client";

import { recordUnifiedActivity } from "./unified-study-storage";
import { syncStudyProgressBackground } from "./auth-sync-client";

export interface N3JourneyProgress {
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
  weaknessVocabIds: string[]; // Weakness Vault: vocab that needs more reinforcement
  lastStudiedDate: string;
}

const STORAGE_KEY = "kaidevlab_n3_journey_progress_v1";

const DEFAULT_PROGRESS: N3JourneyProgress = {
  currentDay: 1,
  completedDays: [],
  dayScores: {},
  weaknessVocabIds: [],
  lastStudiedDate: "",
};

export function loadN3JourneyProgress(): N3JourneyProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      currentDay: parsed.currentDay || 1,
      completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
      dayScores: parsed.dayScores || {},
      weaknessVocabIds: Array.isArray(parsed.weaknessVocabIds) ? parsed.weaknessVocabIds : [],
      lastStudiedDate: parsed.lastStudiedDate || "",
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveN3JourneyProgress(progress: N3JourneyProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event("kaidevlab:n3_journey_updated"));
    window.dispatchEvent(new Event("kaidevlab:study_activity_recorded"));
    syncStudyProgressBackground();
  } catch (err) {
    console.error("Failed to save N3 journey progress:", err);
  }
}

/**
 * Mark a day as successfully completed
 */
export function completeJourneyDay(
  dayNumber: number,
  score: number,
  total: number
): N3JourneyProgress {
  const current = loadN3JourneyProgress();
  const completed = new Set(current.completedDays);
  completed.add(dayNumber);

  const passed = total > 0 ? score / total >= 0.7 : true;

  const nextDay = Math.max(current.currentDay, dayNumber + 1);

  const todayStr = new Date().toISOString().split("T")[0];

  const updated: N3JourneyProgress = {
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

  saveN3JourneyProgress(updated);

  // Record into unified study activity for daily streak
  recordUnifiedActivity("tango", 15);
  recordUnifiedActivity("bunpou", 2);
  recordUnifiedActivity("dokkai", 1);

  return updated;
}

/**
 * Add or remove word from Weakness Vault
 */
export function recordWeaknessVocab(vocabId: string, isWeak: boolean): void {
  const current = loadN3JourneyProgress();
  const set = new Set(current.weaknessVocabIds);
  if (isWeak) {
    set.add(vocabId);
  } else {
    set.delete(vocabId);
  }
  const updated: N3JourneyProgress = {
    ...current,
    weaknessVocabIds: Array.from(set),
  };
  saveN3JourneyProgress(updated);
}
