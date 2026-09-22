"use client";

export type CardRating = "forgot" | "unsure" | "mastered";

export interface StudyProgress {
  masteredCardIds: string[];
  reviewCardIds: string[];
  streak: number;
  lastStudyDate: string | null;
  totalCardsReviewed: number;
  categoryStats: Record<string, { mastered: number; review: number }>;
}

const STORAGE_KEY = "kaidevlab_fe_study_progress_v1";

const DEFAULT_PROGRESS: StudyProgress = {
  masteredCardIds: [],
  reviewCardIds: [],
  streak: 0,
  lastStudyDate: null,
  totalCardsReviewed: 0,
  categoryStats: {
    technology: { mastered: 0, review: 0 },
    management: { mastered: 0, review: 0 },
    strategy: { mastered: 0, review: 0 },
  },
};

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function loadStudyProgress(): StudyProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveStudyProgress(progress: StudyProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error("Failed to save study progress to localStorage", err);
  }
}

export function recordCardReview(
  cardId: string,
  category: string,
  rating: CardRating
): StudyProgress {
  const current = loadStudyProgress();
  const today = getTodayString();

  // Hitung streak harian (Atomic Habits)
  let newStreak = current.streak;
  if (!current.lastStudyDate) {
    newStreak = 1;
  } else if (current.lastStudyDate !== today) {
    const lastDate = new Date(current.lastStudyDate);
    const currDate = new Date(today);
    const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1; // Streak reset jika bolong lebih dari 1 hari
    }
  }

  const masteredSet = new Set(current.masteredCardIds);
  const reviewSet = new Set(current.reviewCardIds);

  if (rating === "mastered") {
    masteredSet.add(cardId);
    reviewSet.delete(cardId);
  } else {
    // forgot atau unsure masuk ke antrean review
    reviewSet.add(cardId);
    masteredSet.delete(cardId);
  }

  const updated: StudyProgress = {
    ...current,
    masteredCardIds: Array.from(masteredSet),
    reviewCardIds: Array.from(reviewSet),
    streak: newStreak,
    lastStudyDate: today,
    totalCardsReviewed: current.totalCardsReviewed + 1,
  };

  saveStudyProgress(updated);
  return updated;
}

export function exportProgressJson(): string {
  const current = loadStudyProgress();
  return JSON.stringify(current, null, 2);
}

export function importProgressJson(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed.masteredCardIds)) {
      saveStudyProgress(parsed);
      return true;
    }
  } catch (err) {
    console.error("Invalid progress JSON file", err);
  }
  return false;
}
