import type { ProgressState, LabNote } from "@/lib/curriculum/types";

const STORAGE_KEY = "kaidevlab-learn-progress";

const defaultState: ProgressState = {
  completedModules: [],
  completedLessons: [],
  quizScores: {},
  streak: 0,
  lastActiveDate: "",
  dailyStreak: 0,
  lastDailyChallengeDate: "",
  dailyChallengesCompleted: [],
  earnedBadges: [],
  labNotes: [],
};

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return { ...defaultState };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch {
    return { ...defaultState };
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage might be full or unavailable
  }
}

export function resetProgress(): ProgressState {
  const fresh = { ...defaultState };
  saveProgress(fresh);
  return fresh;
}

// Streak logic — call when user visits any learn page
export function updateStreak(state: ProgressState): ProgressState {
  const today = new Date().toDateString();
  if (state.lastActiveDate === today) return state; // already counted today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  const newStreak = state.lastActiveDate === yesterdayStr ? state.streak + 1 : 1;

  const newState = {
    ...state,
    streak: newStreak,
    lastActiveDate: today,
  };
  saveProgress(newState);
  return newState;
}

// Module completion
export function completeModule(state: ProgressState, moduleId: string): ProgressState {
  if (state.completedModules.includes(moduleId)) return state;
  const newState = {
    ...state,
    completedModules: [...state.completedModules, moduleId],
  };
  saveProgress(newState);
  return newState;
}

// Lesson completion
export function completeLesson(state: ProgressState, lessonId: string): ProgressState {
  if (state.completedLessons.includes(lessonId)) return state;
  const newState = {
    ...state,
    completedLessons: [...state.completedLessons, lessonId],
  };
  saveProgress(newState);
  return newState;
}

// Quiz score
export function recordQuizScore(state: ProgressState, moduleId: string, score: number): ProgressState {
  const previousScore = state.quizScores[moduleId] || 0;
  if (score <= previousScore) return state; // keep best score
  const newState = {
    ...state,
    quizScores: { ...state.quizScores, [moduleId]: score },
  };
  saveProgress(newState);
  return newState;
}

// Daily challenge
export function completeDailyChallenge(state: ProgressState, challengeId: string): ProgressState {
  if (state.dailyChallengesCompleted.includes(challengeId)) return state;
  const today = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const newDailyStreak =
    state.lastDailyChallengeDate === yesterday.toDateString()
      ? state.dailyStreak + 1
      : state.lastDailyChallengeDate === today
        ? state.dailyStreak
        : 1;

  const newState = {
    ...state,
    dailyChallengesCompleted: [...state.dailyChallengesCompleted, challengeId],
    dailyStreak: newDailyStreak,
    lastDailyChallengeDate: today,
  };
  saveProgress(newState);
  return newState;
}

// Lab notes
export function addLabNote(state: ProgressState, note: LabNote): ProgressState {
  const newState = {
    ...state,
    labNotes: [note, ...state.labNotes],
  };
  saveProgress(newState);
  return newState;
}

export function deleteLabNote(state: ProgressState, noteId: string): ProgressState {
  const newState = {
    ...state,
    labNotes: state.labNotes.filter((n) => n.id !== noteId),
  };
  saveProgress(newState);
  return newState;
}

// Check if module is unlocked (prerequisites met)
export function isModuleUnlocked(state: ProgressState, prerequisites: string[]): boolean {
  if (prerequisites.length === 0) return true;
  return prerequisites.every((prereq) => state.completedModules.includes(prereq));
}

// Calculate track progress percentage
export function getTrackProgress(state: ProgressState, modules: { id: string }[]): number {
  if (modules.length === 0) return 0;
  const completed = modules.filter((m) => state.completedModules.includes(m.id)).length;
  return Math.round((completed / modules.length) * 100);
}

// Calculate overall progress
export function getOverallProgress(state: ProgressState, allModuleIds: string[]): number {
  if (allModuleIds.length === 0) return 0;
  const completed = allModuleIds.filter((id) => state.completedModules.includes(id)).length;
  return Math.round((completed / allModuleIds.length) * 100);
}
