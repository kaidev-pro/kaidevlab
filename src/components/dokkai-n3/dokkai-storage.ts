"use client";

export interface DokkaiProgress {
  completedPassageIds: string[];
  answeredQuestions: Record<
    string,
    {
      selectedKey: string;
      isCorrect: boolean;
      answeredAt: string;
    }
  >;
  bookmarkedPassageIds: string[];
  totalCorrect: number;
  totalAttempts: number;
}

const STORAGE_KEY = "kaidevlab_dokkai_n3_progress_v1";

export const DEFAULT_DOKKAI_PROGRESS: DokkaiProgress = {
  completedPassageIds: [],
  answeredQuestions: {},
  bookmarkedPassageIds: [],
  totalCorrect: 0,
  totalAttempts: 0,
};

export function loadDokkaiProgress(): DokkaiProgress {
  if (typeof window === "undefined") return DEFAULT_DOKKAI_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DOKKAI_PROGRESS;
    return { ...DEFAULT_DOKKAI_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_DOKKAI_PROGRESS;
  }
}

export function saveDokkaiProgress(progress: DokkaiProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event("kaidevlab:study_activity_recorded"));
  } catch (err) {
    console.error("Failed to save dokkai progress:", err);
  }
}

export function recordDokkaiAnswer(
  passageId: string,
  questionId: string,
  selectedKey: string,
  isCorrect: boolean,
  isPassageComplete: boolean
): DokkaiProgress {
  const current = loadDokkaiProgress();
  const alreadyAnswered = current.answeredQuestions[questionId];

  const updated: DokkaiProgress = {
    ...current,
    answeredQuestions: {
      ...current.answeredQuestions,
      [questionId]: {
        selectedKey,
        isCorrect,
        answeredAt: new Date().toISOString(),
      },
    },
    totalAttempts: alreadyAnswered ? current.totalAttempts : current.totalAttempts + 1,
    totalCorrect: alreadyAnswered
      ? alreadyAnswered.isCorrect
        ? current.totalCorrect
        : isCorrect
        ? current.totalCorrect + 1
        : current.totalCorrect
      : isCorrect
      ? current.totalCorrect + 1
      : current.totalCorrect,
    completedPassageIds:
      isPassageComplete && !current.completedPassageIds.includes(passageId)
        ? [...current.completedPassageIds, passageId]
        : current.completedPassageIds,
  };

  saveDokkaiProgress(updated);
  return updated;
}

export function toggleDokkaiBookmark(passageId: string): DokkaiProgress {
  const current = loadDokkaiProgress();
  const exists = current.bookmarkedPassageIds.includes(passageId);
  const updated: DokkaiProgress = {
    ...current,
    bookmarkedPassageIds: exists
      ? current.bookmarkedPassageIds.filter((id) => id !== passageId)
      : [...current.bookmarkedPassageIds, passageId],
  };
  saveDokkaiProgress(updated);
  return updated;
}
