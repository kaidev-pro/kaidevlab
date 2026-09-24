"use client";

import { QuizQuestion, FE_QUIZ_QUESTIONS } from "@/data/fe-quiz-data";

export interface WrongQuestionRecord {
  id: string;
  wrongCount: number;
  consecutiveCorrect: number;
  lastAttempted: number;
  lastSelectedKey?: "ア" | "イ" | "ウ" | "エ";
  mastered: boolean;
  notes?: string;
}

export interface WrongQuestionsStore {
  records: Record<string, WrongQuestionRecord>;
  lastUpdated: number;
}

const STORAGE_KEY = "fe_wrong_questions_v1";

const DEFAULT_STORE: WrongQuestionsStore = {
  records: {},
  lastUpdated: Date.now(),
};

/**
 * Safely load wrong questions from localStorage
 */
export function loadWrongQuestions(): WrongQuestionsStore {
  if (typeof window === "undefined") return DEFAULT_STORE;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STORE;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.records === "object") {
      return parsed;
    }
    return DEFAULT_STORE;
  } catch (e) {
    console.warn("Failed to load wrong questions from localStorage:", e);
    return DEFAULT_STORE;
  }
}

/**
 * Save wrong questions store to localStorage
 */
export function saveWrongQuestions(store: WrongQuestionsStore): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn("Failed to save wrong questions to localStorage:", e);
  }
}

/**
 * Record a single quiz attempt (from practice or review)
 */
export function recordQuestionAttempt(
  questionId: string,
  selectedKey: "ア" | "イ" | "ウ" | "エ",
  isCorrect: boolean
): WrongQuestionsStore {
  const store = loadWrongQuestions();
  const existing = store.records[questionId];

  if (!isCorrect) {
    // Answered incorrectly -> add or update wrong record
    store.records[questionId] = {
      id: questionId,
      wrongCount: (existing?.wrongCount || 0) + 1,
      consecutiveCorrect: 0,
      lastAttempted: Date.now(),
      lastSelectedKey: selectedKey,
      mastered: false,
      notes: existing?.notes,
    };
  } else {
    // Answered correctly
    if (existing) {
      const newConsecutive = existing.consecutiveCorrect + 1;
      store.records[questionId] = {
        ...existing,
        consecutiveCorrect: newConsecutive,
        lastAttempted: Date.now(),
        // If answered correctly 2 times consecutively, auto-mark as mastered
        mastered: newConsecutive >= 2 ? true : existing.mastered,
      };
    }
  }

  store.lastUpdated = Date.now();
  saveWrongQuestions(store);
  return store;
}

/**
 * Record batch exam results (e.g. from CBT Mock Exam completion)
 */
export function recordBatchExamResults(
  results: { questionId: string; selectedKey?: "ア" | "イ" | "ウ" | "エ"; isCorrect: boolean }[]
): WrongQuestionsStore {
  const store = loadWrongQuestions();

  results.forEach(({ questionId, selectedKey, isCorrect }) => {
    const existing = store.records[questionId];
    if (!isCorrect) {
      store.records[questionId] = {
        id: questionId,
        wrongCount: (existing?.wrongCount || 0) + 1,
        consecutiveCorrect: 0,
        lastAttempted: Date.now(),
        lastSelectedKey: selectedKey,
        mastered: false,
        notes: existing?.notes,
      };
    } else if (existing) {
      const newConsecutive = existing.consecutiveCorrect + 1;
      store.records[questionId] = {
        ...existing,
        consecutiveCorrect: newConsecutive,
        lastAttempted: Date.now(),
        mastered: newConsecutive >= 2 ? true : existing.mastered,
      };
    }
  });

  store.lastUpdated = Date.now();
  saveWrongQuestions(store);
  return store;
}

/**
 * Toggle mastered state manually
 */
export function toggleMastered(questionId: string): WrongQuestionsStore {
  const store = loadWrongQuestions();
  const existing = store.records[questionId];
  if (!existing) return store;

  store.records[questionId] = {
    ...existing,
    mastered: !existing.mastered,
    consecutiveCorrect: !existing.mastered ? 2 : 0,
    lastAttempted: Date.now(),
  };

  store.lastUpdated = Date.now();
  saveWrongQuestions(store);
  return store;
}

/**
 * Delete a specific record from the notebook
 */
export function deleteWrongRecord(questionId: string): WrongQuestionsStore {
  const store = loadWrongQuestions();
  delete store.records[questionId];
  store.lastUpdated = Date.now();
  saveWrongQuestions(store);
  return store;
}

/**
 * Remove all mastered questions
 */
export function clearMasteredRecords(): WrongQuestionsStore {
  const store = loadWrongQuestions();
  const nextRecords: Record<string, WrongQuestionRecord> = {};

  Object.entries(store.records).forEach(([id, record]) => {
    if (!record.mastered) {
      nextRecords[id] = record;
    }
  });

  store.records = nextRecords;
  store.lastUpdated = Date.now();
  saveWrongQuestions(store);
  return store;
}

/**
 * Reset entire wrong questions storage
 */
export function resetWrongRecords(): WrongQuestionsStore {
  const store = { records: {}, lastUpdated: Date.now() };
  saveWrongQuestions(store);
  return store;
}

/**
 * Get populated wrong questions joined with question content
 */
export interface PopulatedWrongQuestion {
  record: WrongQuestionRecord;
  question: QuizQuestion;
}

export function getPopulatedWrongQuestions(store: WrongQuestionsStore): PopulatedWrongQuestion[] {
  const questionMap = new Map<string, QuizQuestion>();
  FE_QUIZ_QUESTIONS.forEach((q) => questionMap.set(q.id, q));

  const list: PopulatedWrongQuestion[] = [];
  Object.values(store.records).forEach((record) => {
    const question = questionMap.get(record.id);
    if (question) {
      list.push({ record, question });
    }
  });

  // Sort: unmastered first, then highest wrongCount, then most recent
  list.sort((a, b) => {
    if (a.record.mastered !== b.record.mastered) {
      return a.record.mastered ? 1 : -1;
    }
    if (b.record.wrongCount !== a.record.wrongCount) {
      return b.record.wrongCount - a.record.wrongCount;
    }
    return b.record.lastAttempted - a.record.lastAttempted;
  });

  return list;
}

/**
 * Get statistical summary for the wrong notebook
 */
export function getWrongNotebookStats(store: WrongQuestionsStore) {
  const populated = getPopulatedWrongQuestions(store);
  const total = populated.length;
  const unmastered = populated.filter((item) => !item.record.mastered).length;
  const mastered = total - unmastered;

  const categoryBreakdown = {
    technology: { total: 0, unmastered: 0 },
    management: { total: 0, unmastered: 0 },
    strategy: { total: 0, unmastered: 0 },
  };

  populated.forEach(({ record, question }) => {
    if (categoryBreakdown[question.category]) {
      categoryBreakdown[question.category].total += 1;
      if (!record.mastered) {
        categoryBreakdown[question.category].unmastered += 1;
      }
    }
  });

  return {
    total,
    unmastered,
    mastered,
    categoryBreakdown,
  };
}
