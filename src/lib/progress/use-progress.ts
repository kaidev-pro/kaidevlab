"use client";

import { useState, useEffect, useCallback } from "react";
import type { ProgressState, LabNote } from "@/lib/curriculum/types";
import {
  loadProgress,
  saveProgress,
  resetProgress,
  updateStreak,
  completeModule,
  completeLesson,
  recordQuizScore,
  completeDailyChallenge,
  addLabNote,
  deleteLabNote,
  isModuleUnlocked,
  getTrackProgress,
  getOverallProgress,
} from "./storage";
import { getNewBadges } from "@/lib/badges/badge-system";
import { getAllModules } from "@/lib/curriculum/tracks";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Update streak on mount
    setProgress((prev) => {
      const updated = updateStreak(prev);
      // Check for new badges
      const newBadges = getNewBadges(updated);
      if (newBadges.length > 0) {
        const withBadges = {
          ...updated,
          earnedBadges: [...updated.earnedBadges, ...newBadges],
        };
        saveProgress(withBadges);
        return withBadges;
      }
      return updated;
    });
  }, []);

  const handleCompleteModule = useCallback((moduleId: string) => {
    setProgress((prev) => {
      const updated = completeModule(prev, moduleId);
      const newBadges = getNewBadges(updated);
      if (newBadges.length > 0) {
        const withBadges = {
          ...updated,
          earnedBadges: [...updated.earnedBadges, ...newBadges],
        };
        saveProgress(withBadges);
        return withBadges;
      }
      return updated;
    });
  }, []);

  const handleCompleteLesson = useCallback((lessonId: string) => {
    setProgress((prev) => completeLesson(prev, lessonId));
  }, []);

  const handleRecordQuiz = useCallback((moduleId: string, score: number) => {
    setProgress((prev) => {
      const updated = recordQuizScore(prev, moduleId, score);
      const newBadges = getNewBadges(updated);
      if (newBadges.length > 0) {
        const withBadges = {
          ...updated,
          earnedBadges: [...updated.earnedBadges, ...newBadges],
        };
        saveProgress(withBadges);
        return withBadges;
      }
      return updated;
    });
  }, []);

  const handleCompleteDailyChallenge = useCallback((challengeId: string) => {
    setProgress((prev) => {
      const updated = completeDailyChallenge(prev, challengeId);
      const newBadges = getNewBadges(updated);
      if (newBadges.length > 0) {
        const withBadges = {
          ...updated,
          earnedBadges: [...updated.earnedBadges, ...newBadges],
        };
        saveProgress(withBadges);
        return withBadges;
      }
      return updated;
    });
  }, []);

  const handleAddLabNote = useCallback((note: LabNote) => {
    setProgress((prev) => {
      const updated = addLabNote(prev, note);
      const newBadges = getNewBadges(updated);
      if (newBadges.length > 0) {
        const withBadges = {
          ...updated,
          earnedBadges: [...updated.earnedBadges, ...newBadges],
        };
        saveProgress(withBadges);
        return withBadges;
      }
      return updated;
    });
  }, []);

  const handleDeleteLabNote = useCallback((noteId: string) => {
    setProgress((prev) => deleteLabNote(prev, noteId));
  }, []);

  const handleReset = useCallback(() => {
    const fresh = resetProgress();
    setProgress(fresh);
  }, []);

  const checkUnlocked = useCallback(
    (prerequisites: string[]) => isModuleUnlocked(progress, prerequisites),
    [progress]
  );

  const trackProgress = useCallback(
    (modules: { id: string }[]) => getTrackProgress(progress, modules),
    [progress]
  );

  const allModuleIds = getAllModules().map((m) => m.id);
  const overallProgress = getOverallProgress(progress, allModuleIds);

  return {
    progress,
    mounted,
    completeModule: handleCompleteModule,
    completeLesson: handleCompleteLesson,
    recordQuiz: handleRecordQuiz,
    completeDailyChallenge: handleCompleteDailyChallenge,
    addLabNote: handleAddLabNote,
    deleteLabNote: handleDeleteLabNote,
    reset: handleReset,
    isModuleUnlocked: checkUnlocked,
    getTrackProgress: trackProgress,
    overallProgress,
  };
}
