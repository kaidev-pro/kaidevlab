"use client";

import { TANGO_N3_CARDS } from "@/data/tango-n3-data";
import { FE_CARDS } from "@/data/fe-study-data";
import { loadTangoProgress, TangoProgress, getTodayString } from "@/lib/tango-n3-storage";
import { loadStudyProgress, StudyProgress } from "@/lib/fe-study-storage";
import { loadN3JourneyProgress } from "@/lib/n3-journey-storage";
import { loadFEQuestProgress } from "@/lib/fe-quest-storage";

export type DailyWorkoutPhase = "review" | "learn" | "quiz" | "completed";

export interface LeitnerDistribution {
  box1: number; // 1 day interval (Baru / Rentan)
  box2: number; // 3 days interval (Mulai Ingat)
  box3: number; // 7 days interval (Memori Menengah)
  box4: number; // 14 days interval (Memori Kuat)
  box5: number; // 30 days interval (Memori Permanen)
  unstudied: number; // Belum pernah dipelajari
}

export interface SrsMetrics {
  hub: "n3" | "fe";
  todayStr: string;
  dueCardIds: string[];
  dueCount: number;
  distribution: LeitnerDistribution;
  recommendedNewBatchSize: number;
  currentPhase: DailyWorkoutPhase;
  phaseLabel: string;
  phaseDesc: string;
  journeyCompletedToday: boolean;
}

/**
 * Calculates adaptive new cards batch size based on cognitive load.
 * If user has too many reviews pending, scale down new cards to prevent burnout.
 */
export function calculateAdaptiveNewBatch(dueCount: number, defaultLimit = 15): number {
  if (dueCount >= 30) return Math.min(5, defaultLimit);
  if (dueCount >= 15) return Math.min(10, defaultLimit);
  return defaultLimit;
}

/**
 * Calculates complete SRS Leitner metrics for N3 Suite
 */
export function getN3SrsMetrics(): SrsMetrics {
  const today = getTodayString();
  const progress: TangoProgress = loadTangoProgress();
  const journeyProgress = loadN3JourneyProgress();

  const nextReviews = progress.cardNextReview || {};
  const boxes = progress.cardBox || {};
  const masteredSet = new Set(progress.masteredCardIds || []);
  const reviewSet = new Set(progress.reviewCardIds || []);
  const starredSet = new Set(progress.starredCardIds || []);

  const dueCardIds: string[] = [];
  const dist: LeitnerDistribution = {
    box1: 0,
    box2: 0,
    box3: 0,
    box4: 0,
    box5: 0,
    unstudied: 0,
  };

  for (const card of TANGO_N3_CARDS) {
    const nextDate = nextReviews[card.id];
    const box = boxes[card.id];

    // Due calculation
    const isScheduledDue = Boolean(nextDate && nextDate <= today);
    const isUnscheduledReview = Boolean(
      (reviewSet.has(card.id) || starredSet.has(card.id)) && (!nextDate || nextDate <= today)
    );

    if (isScheduledDue || isUnscheduledReview) {
      dueCardIds.push(card.id);
    }

    // Leitner distribution
    if (!box && !masteredSet.has(card.id)) {
      dist.unstudied++;
    } else if (box === 5) {
      dist.box5++;
    } else if (box === 4) {
      dist.box4++;
    } else if (box === 3) {
      dist.box3++;
    } else if (box === 2) {
      dist.box2++;
    } else {
      dist.box1++;
    }
  }

  const isTodayCompleted = journeyProgress.lastStudiedDate === today;
  const dueCount = dueCardIds.length;
  let currentPhase: DailyWorkoutPhase = "review";
  let phaseLabel = "Fase 1: Review Kartu Jatuh Tempo";
  let phaseDesc = `Ada ${dueCount} kartu yang mendekati batas lupa. Sikat dulu agar memori tetap utuh!`;

  if (dueCount === 0) {
    if (!isTodayCompleted) {
      currentPhase = "learn";
      phaseLabel = "Fase 2: Materi Baru Hari Ini";
      phaseDesc = `Review bersih! Waktunya menguasai silabus Day ${journeyProgress.currentDay || 1}.`;
    } else {
      currentPhase = "completed";
      phaseLabel = "Target Hari Ini Tuntas!";
      phaseDesc = "Memori harian telah diamankan. Istirahat sejenak untuk konsolidasi otak.";
    }
  }

  return {
    hub: "n3",
    todayStr: today,
    dueCardIds,
    dueCount,
    distribution: dist,
    recommendedNewBatchSize: calculateAdaptiveNewBatch(dueCount, 15),
    currentPhase,
    phaseLabel,
    phaseDesc,
    journeyCompletedToday: isTodayCompleted,
  };
}

/**
 * Calculates complete SRS Leitner metrics for FE Exam Academy
 */
export function getFeSrsMetrics(): SrsMetrics {
  const today = getTodayString();
  const progress: StudyProgress = loadStudyProgress();
  const feQuestProgress = loadFEQuestProgress();

  const nextReviews = progress.cardNextReview || {};
  const boxes = progress.cardBox || {};
  const masteredSet = new Set(progress.masteredCardIds || []);
  const reviewSet = new Set(progress.reviewCardIds || []);
  const starredSet = new Set(progress.starredCardIds || []);

  const dueCardIds: string[] = [];
  const dist: LeitnerDistribution = {
    box1: 0,
    box2: 0,
    box3: 0,
    box4: 0,
    box5: 0,
    unstudied: 0,
  };

  for (const card of FE_CARDS) {
    const nextDate = nextReviews[card.id];
    const box = boxes[card.id];

    const isScheduledDue = Boolean(nextDate && nextDate <= today);
    const isUnscheduledReview = Boolean(
      (reviewSet.has(card.id) || starredSet.has(card.id)) && (!nextDate || nextDate <= today)
    );

    if (isScheduledDue || isUnscheduledReview) {
      dueCardIds.push(card.id);
    }

    if (!box && !masteredSet.has(card.id)) {
      dist.unstudied++;
    } else if (box === 5) {
      dist.box5++;
    } else if (box === 4) {
      dist.box4++;
    } else if (box === 3) {
      dist.box3++;
    } else if (box === 2) {
      dist.box2++;
    } else {
      dist.box1++;
    }
  }

  const isTodayCompleted = feQuestProgress.lastStudiedDate === today;
  const dueCount = dueCardIds.length;
  let currentPhase: DailyWorkoutPhase = "review";
  let phaseLabel = "Fase 1: Review Konsep Jatuh Tempo";
  let phaseDesc = `Ada ${dueCount} istilah IT IPA Japan yang perlu di-refresh sebelum lupa.`;

  if (dueCount === 0) {
    if (!isTodayCompleted) {
      currentPhase = "learn";
      phaseLabel = "Fase 2: Quest IT Hari Ini";
      phaseDesc = `Review bersih! Lanjut pelajari materi & algoritma Sprint Day ${feQuestProgress.currentDay || 1}.`;
    } else {
      currentPhase = "completed";
      phaseLabel = "Quest IT Hari Ini Tuntas!";
      phaseDesc = "Pemahaman konsep & algoritma 科目B telah diperkuat hari ini.";
    }
  }

  return {
    hub: "fe",
    todayStr: today,
    dueCardIds,
    dueCount,
    distribution: dist,
    recommendedNewBatchSize: calculateAdaptiveNewBatch(dueCount, 6),
    currentPhase,
    phaseLabel,
    phaseDesc,
    journeyCompletedToday: isTodayCompleted,
  };
}
