"use client";

export type CardRating = "forgot" | "unsure" | "mastered";

export interface TangoProgress {
  masteredCardIds: string[];
  reviewCardIds: string[];
  starredCardIds: string[];
  streak: number;
  lastStudyDate: string | null;
  totalCardsReviewed: number;
  chapterStats: Record<string, { mastered: number; review: number }>;
  dailyReviews?: Record<string, number>;
  // Spaced Repetition (SRS) & Weak Words Tracking
  cardMistakes: Record<string, number>;
  cardSuccessStreaks: Record<string, number>;
  cardLastReviewed: Record<string, string>;
  cardBox: Record<string, number>; // Leitner Box 1..5
  cardNextReview: Record<string, string>; // YYYY-MM-DD
}

const STORAGE_KEY = "kaidevlab_tango_n3_progress_v1";

export const DEFAULT_TANGO_PROGRESS: TangoProgress = {
  masteredCardIds: [],
  reviewCardIds: [],
  starredCardIds: [],
  streak: 0,
  lastStudyDate: null,
  totalCardsReviewed: 0,
  chapterStats: {},
  dailyReviews: {},
  cardMistakes: {},
  cardSuccessStreaks: {},
  cardLastReviewed: {},
  cardBox: {},
  cardNextReview: {},
};

export function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const SRS_BOX_INTERVALS: Record<number, number> = {
  1: 1,  // Harian (1 hari)
  2: 3,  // 3 hari
  3: 7,  // Mingguan (7 hari)
  4: 14, // 2 mingguan (14 hari)
  5: 30, // Bulanan (30 hari)
};

export function loadTangoProgress(): TangoProgress {
  if (typeof window === "undefined") return DEFAULT_TANGO_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TANGO_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_TANGO_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_TANGO_PROGRESS;
  }
}

export function saveTangoProgress(progress: TangoProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error("Failed to save tango progress to localStorage", err);
  }
}

export function toggleStarTangoCard(cardId: string): TangoProgress {
  const current = loadTangoProgress();
  const starred = new Set(current.starredCardIds || []);
  if (starred.has(cardId)) {
    starred.delete(cardId);
  } else {
    starred.add(cardId);
  }
  const updated: TangoProgress = {
    ...current,
    starredCardIds: Array.from(starred),
  };
  saveTangoProgress(updated);
  return updated;
}

export function recordTangoReview(
  cardId: string,
  chapterId: string,
  rating: CardRating
): TangoProgress {
  const current = loadTangoProgress();
  const today = getTodayString();

  const mastered = new Set(current.masteredCardIds);
  const review = new Set(current.reviewCardIds);

  // Update Spaced Repetition (SRS) data
  const cardMistakes = { ...(current.cardMistakes || {}) };
  const cardSuccessStreaks = { ...(current.cardSuccessStreaks || {}) };
  const cardLastReviewed = { ...(current.cardLastReviewed || {}) };
  const cardBox = { ...(current.cardBox || {}) };
  const cardNextReview = { ...(current.cardNextReview || {}) };

  cardLastReviewed[cardId] = today;

  if (rating === "mastered") {
    mastered.add(cardId);
    review.delete(cardId);
    const prevStreak = cardSuccessStreaks[cardId] || 0;
    cardSuccessStreaks[cardId] = prevStreak + 1;
    const currentBox = cardBox[cardId] || 1;
    const nextBox = Math.min(5, currentBox + 1);
    cardBox[cardId] = nextBox;
    const intervalDays = SRS_BOX_INTERVALS[nextBox] || 1;
    cardNextReview[cardId] = addDays(today, intervalDays);
  } else {
    // forgot or unsure
    review.add(cardId);
    mastered.delete(cardId);
    cardMistakes[cardId] = (cardMistakes[cardId] || 0) + 1;
    cardSuccessStreaks[cardId] = 0;
    cardBox[cardId] = 1;
    cardNextReview[cardId] = today; // needs review immediately
  }

  // Calculate Streak
  let streak = current.streak;
  if (!current.lastStudyDate) {
    streak = 1;
  } else if (current.lastStudyDate !== today) {
    const lastDate = new Date(current.lastStudyDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor(
      (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }
  }

  // Update Daily Reviews
  const dailyReviews = { ...(current.dailyReviews || {}) };
  dailyReviews[today] = (dailyReviews[today] || 0) + 1;

  // Update Chapter Stats
  const chapterStats = { ...current.chapterStats };
  if (!chapterStats[chapterId]) {
    chapterStats[chapterId] = { mastered: 0, review: 0 };
  }

  // Recalculate chapter counts
  let mCount = 0;
  let rCount = 0;
  for (const id of Array.from(mastered)) {
    if (id.startsWith(chapterId) || id.includes(chapterId)) mCount++;
  }
  for (const id of Array.from(review)) {
    if (id.startsWith(chapterId) || id.includes(chapterId)) rCount++;
  }
  chapterStats[chapterId] = { mastered: mCount, review: rCount };

  const updated: TangoProgress = {
    masteredCardIds: Array.from(mastered),
    reviewCardIds: Array.from(review),
    starredCardIds: current.starredCardIds || [],
    streak,
    lastStudyDate: today,
    totalCardsReviewed: current.totalCardsReviewed + 1,
    chapterStats,
    dailyReviews,
    cardMistakes,
    cardSuccessStreaks,
    cardLastReviewed,
    cardBox,
    cardNextReview,
  };

  saveTangoProgress(updated);
  return updated;
}

export function getWeakCards<T extends { id: string }>(
  progress: TangoProgress,
  allCards: T[]
): T[] {
  const mistakes = progress.cardMistakes || {};
  return allCards
    .filter((c) => (mistakes[c.id] || 0) > 0)
    .sort((a, b) => (mistakes[b.id] || 0) - (mistakes[a.id] || 0));
}

export function getSrsSchedules<T extends { id: string }>(
  progress: TangoProgress,
  allCards: T[]
) {
  const today = getTodayString();
  const nextReviews = progress.cardNextReview || {};
  const boxes = progress.cardBox || {};

  // Due today: scheduled for today or earlier
  const dueToday = allCards.filter((c) => {
    const next = nextReviews[c.id];
    return next && next <= today;
  });

  // Weekly target: cards currently in Box 3 (7-day interval) or Box 2
  const dueWeekly = allCards.filter((c) => {
    const box = boxes[c.id];
    return box === 2 || box === 3;
  });

  // Monthly target: cards in Box 4 or 5 (14 to 30 day consolidation)
  const dueMonthly = allCards.filter((c) => {
    const box = boxes[c.id];
    return box === 4 || box === 5;
  });

  return {
    dueToday,
    dueWeekly,
    dueMonthly,
  };
}
