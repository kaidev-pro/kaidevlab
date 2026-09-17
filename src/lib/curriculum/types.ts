// Core types for the Kaidevlab Learning Hub curriculum

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type TrackId = "javascript" | "css" | "typescript" | "english" | "nextjs";

export interface Track {
  id: TrackId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  status: "active" | "coming-soon";
  color: string;
  modules: Module[];
}

export type SectionType = "concept" | "code" | "practice" | "summary";

export interface LessonSection {
  id: string;
  title: string;
  type: SectionType;
  content: string;
  codeExample?: {
    code: string;
    language: string;
    runnable: boolean;
  };
  practice?: {
    instruction: string;
    starterCode: string;
    solution: string;
    hint: string;
  };
}

export interface MicroLesson {
  id: string;
  order: number;
  title: string;
  estimatedTime: string; // "5 min"
  sections: LessonSection[];
  keyTakeaway: string;
}

export interface CommonMistake {
  title: string;
  wrong: string;
  right: string;
  explanation: string;
}

export interface InterviewQuestion {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Resource {
  label: string;
  url: string;
}

export interface Module {
  id: string;
  track: TrackId;
  order: number;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  estimatedTime: string;
  prerequisites: string[];
  learningObjectives: string[];
  realWorldAnalogy: string;
  lessons: MicroLesson[];
  commonMistakes: CommonMistake[];
  interviewQuestions: InterviewQuestion[];
  quiz: QuizQuestion[];
  labNotePrompt: string;
  resources: Resource[];
  whyThisMatters: string;
}

export interface DailyChallenge {
  id: string;
  day: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  relatedModule: string;
  starterCode: string;
  solution: string;
  hint: string;
}

export interface GlossaryTerm {
  term: string;
  category: string;
  definitionEn: string;
  definitionId: string;
  example?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export interface ProgressState {
  completedModules: string[];
  completedLessons: string[];
  quizScores: Record<string, number>;
  streak: number;
  lastActiveDate: string;
  dailyStreak: number;
  lastDailyChallengeDate: string;
  dailyChallengesCompleted: string[];
  earnedBadges: string[];
  labNotes: LabNote[];
}

export interface LabNote {
  id: string;
  title: string;
  track: string;
  content: string;
  createdAt: string;
  moduleRef?: string;
}
