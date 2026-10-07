"use client";

export interface BunpouProgress {
  studiedPatternIds: string[];
  bookmarkedPatternIds: string[];
  answeredQuestions: Record<
    string,
    {
      selectedKey?: string;
      orderedItems?: string[];
      isCorrect: boolean;
      answeredAt: string;
    }
  >;
  totalCorrect: number;
  totalAttempts: number;
}

const STORAGE_KEY = "kaidevlab_bunpou_n3_progress_v1";

export const DEFAULT_BUNPOU_PROGRESS: BunpouProgress = {
  studiedPatternIds: [],
  bookmarkedPatternIds: [],
  answeredQuestions: {},
  totalCorrect: 0,
  totalAttempts: 0,
};

export function loadBunpouProgress(): BunpouProgress {
  if (typeof window === "undefined") return DEFAULT_BUNPOU_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BUNPOU_PROGRESS;
    return { ...DEFAULT_BUNPOU_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_BUNPOU_PROGRESS;
  }
}

export function saveBunpouProgress(progress: BunpouProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event("kaidevlab:study_activity_recorded"));
  } catch (err) {
    console.error("Failed to save bunpou progress:", err);
  }
}

export function markPatternAsStudied(patternId: string): BunpouProgress {
  const current = loadBunpouProgress();
  if (current.studiedPatternIds.includes(patternId)) return current;

  const updated: BunpouProgress = {
    ...current,
    studiedPatternIds: [...current.studiedPatternIds, patternId],
  };
  saveBunpouProgress(updated);
  return updated;
}

export function toggleBunpouBookmark(patternId: string): BunpouProgress {
  const current = loadBunpouProgress();
  const exists = current.bookmarkedPatternIds.includes(patternId);
  const updated: BunpouProgress = {
    ...current,
    bookmarkedPatternIds: exists
      ? current.bookmarkedPatternIds.filter((id) => id !== patternId)
      : [...current.bookmarkedPatternIds, patternId],
  };
  saveBunpouProgress(updated);
  return updated;
}

export function recordBunpouAnswer(
  patternId: string,
  questionId: string,
  isCorrect: boolean,
  answerDetails?: { selectedKey?: string; orderedItems?: string[] }
): BunpouProgress {
  const current = loadBunpouProgress();
  const alreadyAnswered = current.answeredQuestions[questionId];

  const updated: BunpouProgress = {
    ...current,
    answeredQuestions: {
      ...current.answeredQuestions,
      [questionId]: {
        selectedKey: answerDetails?.selectedKey,
        orderedItems: answerDetails?.orderedItems,
        isCorrect,
        answeredAt: new Date().toISOString(),
      },
    },
    totalAttempts: alreadyAnswered ? current.totalAttempts : current.totalAttempts + 1,
    totalCorrect: alreadyAnswered
      ? current.totalCorrect + (isCorrect && !alreadyAnswered.isCorrect ? 1 : !isCorrect && alreadyAnswered.isCorrect ? -1 : 0)
      : current.totalCorrect + (isCorrect ? 1 : 0),
    studiedPatternIds: current.studiedPatternIds.includes(patternId)
      ? current.studiedPatternIds
      : [...current.studiedPatternIds, patternId],
  };

  saveBunpouProgress(updated);
  return updated;
}
