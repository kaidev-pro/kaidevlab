import type { Badge, ProgressState } from "@/lib/curriculum/types";
import { getAllModules } from "@/lib/curriculum/tracks";

export const badges: Badge[] = [
  {
    id: "first-step",
    name: "First Step",
    description: "Complete your first module",
    icon: "🎯",
    condition: "completedModules.length >= 1",
  },
  {
    id: "js-basics",
    name: "JS Fundamentals",
    description: "Complete modules 1-4 (Variables, Functions, Arrays, Objects)",
    icon: "📘",
    condition: "js-01 to js-04 completed",
  },
  {
    id: "js-master",
    name: "JavaScript Master",
    description: "Complete all 8 JavaScript modules",
    icon: "🏆",
    condition: "All JS modules completed",
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Score 100% on all quizzes",
    icon: "🧠",
    condition: "All quiz scores === 100",
  },
  {
    id: "streak-7",
    name: "7-Day Streak",
    description: "Study 7 days in a row",
    icon: "🔥",
    condition: "streak >= 7",
  },
  {
    id: "streak-30",
    name: "30-Day Streak",
    description: "Study 30 days in a row",
    icon: "⚡",
    condition: "streak >= 30",
  },
  {
    id: "daily-challenger",
    name: "Daily Challenger",
    description: "Complete 10 daily challenges",
    icon: "💪",
    condition: "dailyChallengesCompleted.length >= 10",
  },
  {
    id: "lab-notes-writer",
    name: "Lab Notes Writer",
    description: "Write 5 lab notes",
    icon: "✍️",
    condition: "labNotes.length >= 5",
  },
  {
    id: "lesson-explorer",
    name: "Lesson Explorer",
    description: "Complete 20 lessons",
    icon: "🧭",
    condition: "completedLessons.length >= 20",
  },
  {
    id: "halfway-there",
    name: "Halfway There",
    description: "Complete 50% of all modules",
    icon: "🚀",
    condition: "overallProgress >= 50",
  },
];

export function checkBadges(state: ProgressState): string[] {
  const allModules = getAllModules();
  const earned: string[] = [];

  for (const badge of badges) {
    switch (badge.id) {
      case "first-step":
        if (state.completedModules.length >= 1) earned.push(badge.id);
        break;
      case "js-basics":
        if (["js-01-variables", "js-02-functions", "js-03-array-methods", "js-04-objects"].every((id) => state.completedModules.includes(id)))
          earned.push(badge.id);
        break;
      case "js-master":
        if (allModules.every((m) => state.completedModules.includes(m.id))) earned.push(badge.id);
        break;
      case "quiz-master":
        if (allModules.every((m) => state.quizScores[m.id] === 100)) earned.push(badge.id);
        break;
      case "streak-7":
        if (state.streak >= 7) earned.push(badge.id);
        break;
      case "streak-30":
        if (state.streak >= 30) earned.push(badge.id);
        break;
      case "daily-challenger":
        if (state.dailyChallengesCompleted.length >= 10) earned.push(badge.id);
        break;
      case "lab-notes-writer":
        if (state.labNotes.length >= 5) earned.push(badge.id);
        break;
      case "lesson-explorer":
        if (state.completedLessons.length >= 20) earned.push(badge.id);
        break;
      case "halfway-there":
        if (allModules.length > 0) {
          const completed = allModules.filter((m) => state.completedModules.includes(m.id)).length;
          if ((completed / allModules.length) * 100 >= 50) earned.push(badge.id);
        }
        break;
    }
  }

  return earned;
}

export function getNewBadges(state: ProgressState): string[] {
  const newlyEarned = checkBadges(state);
  return newlyEarned.filter((id) => !state.earnedBadges.includes(id));
}
