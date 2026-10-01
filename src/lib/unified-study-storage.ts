"use client";

export interface UnifiedDayActivity {
  date: string; // YYYY-MM-DD
  dokkai: number;
  tango: number;
  fe: number;
  total: number;
}

export interface UnifiedStudyStats {
  globalStreak: number;
  lastActiveDate: string | null;
  totalMasteredTerms: number;
  totalCompletedPassages: number;
  activityHistory: Record<string, UnifiedDayActivity>;
}

const UNIFIED_STORAGE_KEY = "kaidevlab_unified_study_activity_v1";

export function getTodayDateStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function loadUnifiedActivityHistory(): Record<string, UnifiedDayActivity> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(UNIFIED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function recordUnifiedActivity(
  module: "dokkai" | "tango" | "fe",
  count = 1
): void {
  if (typeof window === "undefined") return;
  try {
    const today = getTodayDateStr();
    const history = loadUnifiedActivityHistory();
    const current = history[today] || {
      date: today,
      dokkai: 0,
      tango: 0,
      fe: 0,
      total: 0,
    };

    current[module] = (current[module] || 0) + count;
    current.total = (current.dokkai || 0) + (current.tango || 0) + (current.fe || 0);

    history[today] = current;
    localStorage.setItem(UNIFIED_STORAGE_KEY, JSON.stringify(history));

    window.dispatchEvent(new Event("kaidevlab:study_activity_recorded"));
  } catch (err) {
    console.error("Failed to record unified study activity", err);
  }
}

/**
 * Calculates unified global streak and gathers cross-module totals
 */
export function getUnifiedStudyStats(): UnifiedStudyStats {
  const history = loadUnifiedActivityHistory();
  const today = getTodayDateStr();

  // Also check existing module daily histories to backfill
  let dokkaiPassagesCount = 0;
  let tangoMasteredCount = 0;
  let feMasteredCount = 0;

  if (typeof window !== "undefined") {
    try {
      const dokkaiRaw = localStorage.getItem("kaidevlab_dokkai_n3_progress_v1");
      if (dokkaiRaw) {
        const parsed = JSON.parse(dokkaiRaw);
        dokkaiPassagesCount = parsed.completedPassageIds?.length || 0;
      }

      const tangoRaw = localStorage.getItem("kaidevlab_tango_n3_progress_v1");
      if (tangoRaw) {
        const parsed = JSON.parse(tangoRaw);
        tangoMasteredCount = parsed.masteredCardIds?.length || 0;
        // Merge tango daily reviews
        if (parsed.dailyReviews) {
          for (const [dateStr, reviewCount] of Object.entries(parsed.dailyReviews as Record<string, number>)) {
            if (!history[dateStr]) {
              history[dateStr] = { date: dateStr, dokkai: 0, tango: reviewCount, fe: 0, total: reviewCount };
            } else if (history[dateStr].tango === 0) {
              history[dateStr].tango = reviewCount;
              history[dateStr].total += reviewCount;
            }
          }
        }
      }

      const feRaw = localStorage.getItem("fe_study_progress_v1");
      if (feRaw) {
        const parsed = JSON.parse(feRaw);
        feMasteredCount = parsed.masteredCardIds?.length || 0;
        if (parsed.dailyReviews) {
          for (const [dateStr, reviewCount] of Object.entries(parsed.dailyReviews as Record<string, number>)) {
            if (!history[dateStr]) {
              history[dateStr] = { date: dateStr, dokkai: 0, tango: 0, fe: reviewCount, total: reviewCount };
            } else if (history[dateStr].fe === 0) {
              history[dateStr].fe = reviewCount;
              history[dateStr].total += reviewCount;
            }
          }
        }
      }
    } catch {}
  }

  // Calculate streak backwards from today or yesterday
  const activeDates = Object.keys(history)
    .filter((d) => (history[d]?.total || 0) > 0)
    .sort()
    .reverse();

  let streak = 0;
  let lastActiveDate: string | null = activeDates[0] || null;

  if (activeDates.length > 0) {
    const todayDate = new Date(today);
    const mostRecentDate = new Date(activeDates[0]);
    const diffDaysFromToday = Math.floor(
      (todayDate.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Active today or yesterday
    if (diffDaysFromToday <= 1) {
      streak = 1;
      let checkDate = new Date(activeDates[0]);

      for (let i = 1; i < activeDates.length; i++) {
        const prevDate = new Date(activeDates[i]);
        const dayDiff = Math.floor(
          (checkDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (dayDiff === 1) {
          streak++;
          checkDate = prevDate;
        } else if (dayDiff === 0) {
          continue;
        } else {
          break;
        }
      }
    }
  }

  return {
    globalStreak: streak,
    lastActiveDate,
    totalMasteredTerms: tangoMasteredCount + feMasteredCount,
    totalCompletedPassages: dokkaiPassagesCount,
    activityHistory: history,
  };
}

/**
 * Returns past N days (e.g. 30 days) of activity for the GitHub-style Matrix
 */
export function getRecentActivityMatrix(days = 30): UnifiedDayActivity[] {
  const stats = getUnifiedStudyStats();
  const matrix: UnifiedDayActivity[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const activity = stats.activityHistory[dateStr] || {
      date: dateStr,
      dokkai: 0,
      tango: 0,
      fe: 0,
      total: 0,
    };
    matrix.push(activity);
  }

  return matrix;
}

/**
 * Generates an all-in-one backup of all study databases
 */
export function generateFullBackup(): {
  exportedAt: string;
  version: string;
  payload: Record<string, unknown>;
} {
  if (typeof window === "undefined") {
    return { exportedAt: new Date().toISOString(), version: "1.0", payload: {} };
  }

  const keys = [
    "kaidevlab_dokkai_n3_progress_v1",
    "kaidevlab_tango_n3_progress_v1",
    "fe_study_progress_v1",
    UNIFIED_STORAGE_KEY,
  ];

  const payload: Record<string, unknown> = {};
  for (const k of keys) {
    try {
      const item = localStorage.getItem(k);
      if (item) payload[k] = JSON.parse(item);
    } catch {}
  }

  return {
    exportedAt: new Date().toISOString(),
    version: "1.0",
    payload,
  };
}

/**
 * Restores full backup into local storage
 */
export function restoreFullBackup(backupJson: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const parsed = JSON.parse(backupJson);
    const payload = parsed.payload || parsed;

    for (const [key, value] of Object.entries(payload)) {
      if (typeof key === "string" && value) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }

    window.dispatchEvent(new Event("kaidevlab:study_activity_recorded"));
    return true;
  } catch (err) {
    console.error("Failed to restore backup", err);
    return false;
  }
}
