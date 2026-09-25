"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Timer,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Flag,
  RotateCcw,
  Trophy,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Printer,
  Sparkles,
  Award,
  Layers,
  Check,
  X,
  Volume2,
  VolumeX,
  Languages,
} from "lucide-react";
import { FE_QUIZ_QUESTIONS, QuizQuestion } from "@/data/fe-quiz-data";
import {
  recordQuestionAttempt,
  recordBatchExamResults,
} from "@/lib/fe-wrong-questions-storage";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { autoAnnotateRuby } from "@/lib/fe-furigana";
import { useJapaneseTts } from "@/lib/use-japanese-tts";
import { ConfettiBurst } from "@/components/fe-study/confetti-burst";

interface QuizViewProps {
  onBackToMenu: () => void;
  customQuestions?: QuizQuestion[];
  customTitle?: string;
  initialMode?: "practice" | "mock";
  onOpenMistakeNotebook?: () => void;
}

type ExamMode = "practice" | "mock";

export function QuizView({
  onBackToMenu,
  customQuestions,
  customTitle,
  initialMode = "practice",
  onOpenMistakeNotebook,
}: QuizViewProps) {
  const [examMode, setExamMode] = useState<ExamMode>(initialMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFurigana, setShowFurigana] = useState(false);
  const { speak, stop, isSpeaking, activeSpeechId } = useJapaneseTts();

  // Stop audio speech when question changes or mode changes
  useEffect(() => {
    stop();
  }, [currentIndex, examMode, stop]);

  // Practice mode states
  const [practiceSelectedKey, setPracticeSelectedKey] = useState<string | null>(null);
  const [practiceAnswerSubmitted, setPracticeAnswerSubmitted] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceTimeLeft, setPracticeTimeLeft] = useState(90);
  const [showManualExplanation, setShowManualExplanation] = useState(false);

  // Practice Filter state
  const [practiceCategory, setPracticeCategory] = useState<"all" | "technology" | "management" | "strategy">("all");

  // CBT Mock settings
  const [cbtQuestionCount, setCbtQuestionCount] = useState<number>(15);
  const [cbtRandomSeed, setCbtRandomSeed] = useState<number>(() => Date.now());

  // Filtered practice questions
  const filteredPracticeQuestions = useMemo(() => {
    if (customQuestions && customQuestions.length > 0) return customQuestions;
    if (practiceCategory === "all") return FE_QUIZ_QUESTIONS;
    return FE_QUIZ_QUESTIONS.filter((q) => q.category === practiceCategory);
  }, [customQuestions, practiceCategory]);

  // Balanced randomized CBT questions
  const cbtQuestions = useMemo(() => {
    if (customQuestions && customQuestions.length > 0) return customQuestions;
    if (cbtQuestionCount >= FE_QUIZ_QUESTIONS.length) return FE_QUIZ_QUESTIONS;

    const tech = FE_QUIZ_QUESTIONS.filter((q) => q.category === "technology");
    const mgmt = FE_QUIZ_QUESTIONS.filter((q) => q.category === "management");
    const strat = FE_QUIZ_QUESTIONS.filter((q) => q.category === "strategy");

    const shuffle = <T,>(arr: T[], seed: number): T[] => {
      const a = [...arr];
      let m = a.length, t, i;
      let s = seed;
      while (m) {
        s = (s * 9301 + 49297) % 233280;
        i = Math.floor((s / 233280) * m--);
        t = a[m];
        a[m] = a[i];
        a[i] = t;
      }
      return a;
    };

    const targetTech = Math.round(cbtQuestionCount * 0.6);
    const targetMgmt = Math.round(cbtQuestionCount * 0.2);
    const targetStrat = Math.max(0, cbtQuestionCount - targetTech - targetMgmt);

    const sTech = shuffle(tech, cbtRandomSeed).slice(0, targetTech);
    const sMgmt = shuffle(mgmt, cbtRandomSeed + 1).slice(0, targetMgmt);
    const sStrat = shuffle(strat, cbtRandomSeed + 2).slice(0, targetStrat);

    return [...sTech, ...sMgmt, ...sStrat];
  }, [customQuestions, cbtQuestionCount, cbtRandomSeed]);

  // Active question set
  const questions = useMemo(() => {
    if (examMode === "mock") return cbtQuestions;
    return filteredPracticeQuestions;
  }, [examMode, cbtQuestions, filteredPracticeQuestions]);

  // Total exam time: questions count × 90 seconds
  const TOTAL_MOCK_TIME = questions.length * 90;
  const [mockTimeLeft, setMockTimeLeft] = useState(TOTAL_MOCK_TIME);
  const [mockAnswers, setMockAnswers] = useState<Record<string, "ア" | "イ" | "ウ" | "エ">>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isQuestionListModalOpen, setIsQuestionListModalOpen] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [candidateName, setCandidateName] = useState("Kai");
  const [certificateId, setCertificateId] = useState("");

  const currentQ = questions[currentIndex] || questions[0];

  // Generate certificate serial & record mock exam results on finish
  useEffect(() => {
    if (isExamFinished) {
      if (!certificateId) {
        const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        setCertificateId(`FE-CBT-2026-${randomCode}`);
      }

      if (examMode === "mock") {
        const batch = questions.map((q) => {
          const ans = mockAnswers[q.id];
          return {
            questionId: q.id,
            selectedKey: ans,
            isCorrect: ans === q.correctKey,
          };
        });
        recordBatchExamResults(batch);
      }
    }
  }, [isExamFinished, certificateId, examMode, mockAnswers, questions]);

  // Timer for Practice Mode
  useEffect(() => {
    if (examMode !== "practice" || practiceAnswerSubmitted || isExamFinished) return;

    if (practiceTimeLeft <= 0) {
      setPracticeAnswerSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setPracticeTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [practiceTimeLeft, examMode, practiceAnswerSubmitted, isExamFinished]);

  // Timer for Mock Exam Mode
  useEffect(() => {
    if (examMode !== "mock" || isExamFinished) return;

    if (mockTimeLeft <= 0) {
      // Time is up -> force finish exam
      setIsExamFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setMockTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [mockTimeLeft, examMode, isExamFinished]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (isSubmitModalOpen || isQuestionListModalOpen || isExamFinished) return;

      const key = e.key.toLowerCase();
      if (examMode === "practice") {
        if (!practiceAnswerSubmitted) {
          if (key === "1" || key === "a") handlePracticeSelect("ア");
          if (key === "2" || key === "i") handlePracticeSelect("イ");
          if (key === "3" || key === "u") handlePracticeSelect("ウ");
          if (key === "4" || key === "e") handlePracticeSelect("エ");
        } else {
          if (key === "enter" || key === " ") {
            e.preventDefault();
            handlePracticeNext();
          }
        }
      } else if (examMode === "mock") {
        if (key === "1" || key === "a") handleMockSelect("ア");
        if (key === "2" || key === "i") handleMockSelect("イ");
        if (key === "3" || key === "u") handleMockSelect("ウ");
        if (key === "4" || key === "e") handleMockSelect("エ");
        if (key === "f") toggleFlag(currentQ.id);
        if (key === "arrowleft" && currentIndex > 0) setCurrentIndex((prev) => prev - 1);
        if (key === "arrowright" && currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    examMode,
    practiceAnswerSubmitted,
    isSubmitModalOpen,
    isQuestionListModalOpen,
    isExamFinished,
    currentIndex,
    currentQ.id,
    questions.length,
  ]);

  // Practice Mode: Handle selection
  const handlePracticeSelect = (key: "ア" | "イ" | "ウ" | "エ") => {
    if (practiceAnswerSubmitted) return;
    setPracticeSelectedKey(key);
    setPracticeAnswerSubmitted(true);
    setShowManualExplanation(false);

    const isCorrect = key === currentQ.correctKey;
    if (isCorrect) {
      setPracticeScore((prev) => prev + 1);
    }
    recordQuestionAttempt(currentQ.id, key, isCorrect);
  };

  const handlePracticeNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setPracticeSelectedKey(null);
      setPracticeAnswerSubmitted(false);
      setShowManualExplanation(false);
      setPracticeTimeLeft(90);
    } else {
      setIsExamFinished(true);
    }
  };

  // Mock Exam Mode: Handle selection
  const handleMockSelect = (key: "ア" | "イ" | "ウ" | "エ") => {
    if (isExamFinished) return;
    setMockAnswers((prev) => ({
      ...prev,
      [currentQ.id]: key,
    }));
  };

  // Toggle Flag for Review
  const toggleFlag = (id: string) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Restart everything
  const handleReset = (mode: ExamMode = examMode, newCount?: number) => {
    setExamMode(mode);
    setCurrentIndex(0);
    setPracticeSelectedKey(null);
    setPracticeAnswerSubmitted(false);
    setShowManualExplanation(false);
    setPracticeScore(0);
    setPracticeTimeLeft(90);
    if (mode === "mock") {
      setCbtRandomSeed(Date.now());
      const count = newCount || cbtQuestionCount;
      setMockTimeLeft(count * 90);
    } else {
      setMockTimeLeft(TOTAL_MOCK_TIME);
    }
    setMockAnswers({});
    setFlaggedIds(new Set());
    setIsSubmitModalOpen(false);
    setIsQuestionListModalOpen(false);
    setIsExamFinished(false);
    setIsReviewMode(false);
    setCertificateId("");
  };

  // Statistics Calculation
  const examStats = useMemo(() => {
    let correctCount = 0;
    const catStats: Record<string, { total: number; correct: number }> = {
      technology: { total: 0, correct: 0 },
      management: { total: 0, correct: 0 },
      strategy: { total: 0, correct: 0 },
    };

    questions.forEach((q) => {
      catStats[q.category].total += 1;
      const userAns = examMode === "mock" ? mockAnswers[q.id] : null;
      if (examMode === "mock") {
        if (userAns === q.correctKey) {
          correctCount += 1;
          catStats[q.category].correct += 1;
        }
      }
    });

    const finalScore = examMode === "mock" ? correctCount : practiceScore;
    const percentage = Math.round((finalScore / questions.length) * 100);
    const isPassed = percentage >= 60; // IPA FE Standard: 60% passing score

    return {
      finalScore,
      total: questions.length,
      percentage,
      isPassed,
      catStats,
    };
  }, [examMode, mockAnswers, practiceScore, questions]);

  const answeredCount = Object.keys(mockAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  // ==========================================================
  // VIEW 1: RESULTS & READINESS CERTIFICATE SCREEN
  // ==========================================================
  if (isExamFinished && !isReviewMode) {
    return (
      <>
        {examStats.isPassed && <ConfettiBurst trigger={true} withSound={true} />}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12 select-none"
        >
        {/* Top Result Banner */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 ${
                examStats.isPassed
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
                  : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
              }`}
            >
              <Trophy size={36} />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[var(--brand-primary)] flex items-center gap-1.5">
                <Sparkles size={13} />
                {examMode === "mock" ? "Hasil Ujian CBT Resmi IPA" : "Hasil Sesi Latihan Soal"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-serif mt-1">
                {examStats.isPassed ? "合格！Lulus Standar IPA Jepang" : "不合格 · Perlu Penguatan Materi"}
              </h2>
              {examStats.isPassed && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 text-xs font-bold mt-2">
                  <span>🎉 合格おめでとうございます！ (Lolos Ambang Batas Resmi 60%)</span>
                </div>
              )}
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                Ambang batas kelulusan resmi: <b>60% (600 / 1000 poin)</b>. Skor kamu: <b>{examStats.percentage}%</b>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] shrink-0">
            <div className="text-center px-3 sm:px-4">
              <p className="text-xs text-[var(--text-secondary)]">Skor Benar</p>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-[var(--text-primary)] mt-0.5">
                {examStats.finalScore} <span className="text-xs font-sans opacity-50">/ {examStats.total}</span>
              </p>
            </div>
            <div className="w-px h-10 bg-[var(--border)]" />
            <div className="text-center px-3 sm:px-4">
              <p className="text-xs text-[var(--text-secondary)]">Akurasi (正答率)</p>
              <p
                className={`text-2xl sm:text-3xl font-bold font-mono mt-0.5 ${
                  examStats.isPassed ? "text-emerald-500" : "text-amber-500"
                }`}
              >
                {examStats.percentage}%
              </p>
            </div>
          </div>
        </div>

        {/* 3 Domain Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Technology */}
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider">
                テクノロジ系 (Technology)
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <h4 className="text-xl font-bold text-[var(--text-primary)]">
                  {examStats.catStats.technology.correct} / {examStats.catStats.technology.total} Benar
                </h4>
                <span className="text-sm font-mono font-bold text-[var(--text-secondary)]">
                  {Math.round((examStats.catStats.technology.correct / (examStats.catStats.technology.total || 1)) * 100)}%
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-[var(--surface-soft)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--brand-primary)]"
                style={{
                  width: `${(examStats.catStats.technology.correct / (examStats.catStats.technology.total || 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Management */}
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">
                マネジメント系 (Management)
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <h4 className="text-xl font-bold text-[var(--text-primary)]">
                  {examStats.catStats.management.correct} / {examStats.catStats.management.total} Benar
                </h4>
                <span className="text-sm font-mono font-bold text-[var(--text-secondary)]">
                  {Math.round((examStats.catStats.management.correct / (examStats.catStats.management.total || 1)) * 100)}%
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-[var(--surface-soft)] rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500"
                style={{
                  width: `${(examStats.catStats.management.correct / (examStats.catStats.management.total || 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Strategy */}
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                ストラテジ系 (Strategy)
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <h4 className="text-xl font-bold text-[var(--text-primary)]">
                  {examStats.catStats.strategy.correct} / {examStats.catStats.strategy.total} Benar
                </h4>
                <span className="text-sm font-mono font-bold text-[var(--text-secondary)]">
                  {Math.round((examStats.catStats.strategy.correct / (examStats.catStats.strategy.total || 1)) * 100)}%
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-[var(--surface-soft)] rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-400"
                style={{
                  width: `${(examStats.catStats.strategy.correct / (examStats.catStats.strategy.total || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Visual Certificate (Rendered if Passed) */}
        {examStats.isPassed && (
          <div className="relative p-8 md:p-14 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-[var(--surface)] via-[var(--surface-soft)] to-[var(--surface)] shadow-2xl overflow-hidden print:border-black print:bg-white text-center flex flex-col items-center gap-6">
            <div className="absolute top-4 right-4 text-emerald-500/10 font-serif font-black text-8xl md:text-9xl pointer-events-none select-none">
              合格
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase tracking-widest">
                <Award size={15} />
                CERTIFICATE OF READINESS · 模擬試験 合格証明書
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] font-serif mt-2 tracking-tight">
                基本情報技術者試験 (FE CBT)
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Fundamental Information Technology Engineer Examination · Simulation Readiness
              </p>
            </div>

            <div className="my-2">
              <p className="text-xs text-[var(--text-secondary)]">Diberikan kepada:</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="text-2xl md:text-3xl font-bold font-serif text-[var(--brand-primary)] bg-transparent border-b border-[var(--brand-primary)]/40 text-center px-3 py-1 focus:outline-none focus:border-[var(--brand-primary)]"
                  placeholder="Nama Kandidat"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Telah berhasil menyelesaikan simulasi ujian CBT resmi dengan skor akurasi{" "}
              <b className="text-[var(--text-primary)]">{examStats.percentage}%</b>, memenuhi ambang batas kelulusan standar
              IPA Jepang untuk kualifikasi visa 技人国 (Engineer / Specialist in Humanities).
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-5 border-t border-[var(--border)] text-xs sm:text-sm">
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Metode Ujian</p>
                <p className="font-mono font-bold text-[var(--text-primary)] mt-0.5">
                  {examMode === "mock" ? "PROMETRIC CBT" : "PRACTICE DRILL"}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Skor Akhir</p>
                <p className="font-mono font-bold text-emerald-500 mt-0.5">
                  {examStats.finalScore} / {examStats.total} ({examStats.percentage}%)
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Status Kelulusan</p>
                <p className="font-bold text-emerald-500 mt-0.5">合格 (PASSED)</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)]">No. Sertifikat</p>
                <p className="font-mono font-bold text-[var(--text-primary)] mt-0.5">{certificateId}</p>
              </div>
            </div>

            <div className="pt-2 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-soft)] border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-sm"
              >
                <Printer size={15} /> Cetak / Simpan Sertifikat (PDF)
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full print:hidden">
          {onOpenMistakeNotebook && (
            <button
              type="button"
              onClick={onOpenMistakeNotebook}
              className="w-full sm:flex-1 py-4 rounded-2xl border border-rose-500/30 hover:border-rose-500 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <BookOpen size={16} /> Buka Buku Soal Salah (ノート)
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsReviewMode(true);
              setCurrentIndex(0);
            }}
            className="w-full sm:flex-1 py-4 rounded-2xl border border-[var(--border)] hover:border-[var(--brand-primary)] bg-[var(--surface)] text-[var(--text-primary)] text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <BookOpen size={16} /> Tinjau Seluruh Pembahasan & Terjemahan (見直し)
          </button>

          <button
            type="button"
            onClick={() => handleReset(examMode)}
            className="w-full sm:flex-1 py-4 rounded-2xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} /> Ulangi Simulasi (Coba Lagi)
          </button>
        </div>
      </motion.div>
    </>
  );
  }

  // ==========================================================
  // VIEW 2: POST-EXAM REVIEW MODE (見直しモード)
  // ==========================================================
  if (isExamFinished && isReviewMode) {
    const userAns = examMode === "mock" ? mockAnswers[currentQ.id] : null;

    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 select-none pb-12 font-sans">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
          <button
            type="button"
            onClick={() => setIsReviewMode(false)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--brand-primary)] hover:underline"
          >
            ← Kembali ke Sertifikat & Hasil
          </button>
          <span className="text-xs sm:text-sm font-bold text-[var(--text-secondary)]">
            Review Soal {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Question Selector Strip */}
        <div className="flex flex-wrap gap-2 p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          {questions.map((q, idx) => {
            const ans = examMode === "mock" ? mockAnswers[q.id] : null;
            const correct = ans === q.correctKey;
            const isCurrent = currentIndex === idx;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center ${
                  isCurrent ? "ring-2 ring-[var(--brand-primary)] ring-offset-2" : ""
                } ${
                  ans
                    ? correct
                      ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                      : "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question Details in Review Mode */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-md flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-[var(--text-primary)] text-sm sm:text-base">
                【問 {currentIndex + 1}】 {currentQ.year}
              </span>
              <span className="px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-semibold text-xs">
                {currentQ.subCategory}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFurigana((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  showFurigana
                    ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-sm"
                    : "bg-[var(--surface-soft)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]"
                }`}
                title="Tampilkan / Sembunyikan Furigana (ルビ)"
              >
                <Languages size={13} />
                <span>ルビ {showFurigana ? "ON" : "OFF"}</span>
              </button>

              <button
                type="button"
                onClick={() => speak(currentQ.questionJp, `review-q-${currentQ.id}`)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  activeSpeechId === `review-q-${currentQ.id}`
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm animate-pulse"
                    : "bg-[var(--surface-soft)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]"
                }`}
                title="Dengarkan pelafalan soal"
              >
                {activeSpeechId === `review-q-${currentQ.id}` ? <VolumeX size={13} /> : <Volume2 size={13} />}
                <span>{activeSpeechId === `review-q-${currentQ.id}` ? "Stop" : "音声"}</span>
              </button>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-soft)]/60 border border-[var(--border)]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)] block mb-2">
              【問題文】
            </span>
            <h3 className="text-base sm:text-[18px] md:text-[20px] font-bold text-[var(--text-primary)] leading-[2.1] tracking-[0.03em]">
              <RubyTerm
                rubyText={autoAnnotateRuby(currentQ.questionJp)}
                fallbackText={currentQ.questionJp}
                showFurigana={showFurigana}
              />
            </h3>
          </div>

          {/* Indonesian Translation */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-soft)] border-l-4 border-[var(--brand-primary)] text-sm sm:text-base text-[var(--text-secondary)] leading-[1.85]">
            <b className="text-[var(--brand-primary)] block mb-1">Terjemahan Indonesia:</b>
            &ldquo;{currentQ.questionTranslation}&rdquo;
          </div>

          {/* Options Breakdown */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider px-1">
              【各選択肢の解説】
            </span>
            <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
              {currentQ.options.map((opt) => {
                const isSelected = userAns === opt.key;
                const isRightKey = opt.key === currentQ.correctKey;

                let style = "border-[var(--border)] bg-[var(--surface-soft)]/40 text-[var(--text-secondary)]";
                if (isRightKey) {
                  style = "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold shadow-sm";
                } else if (isSelected && !isRightKey) {
                  style = "border-rose-500 bg-rose-500/10 text-rose-500 line-through";
                }

                return (
                  <div key={opt.key} className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-4 ${style}`}>
                    <span className="w-8 h-8 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      {opt.key}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm sm:text-base leading-[1.8]">
                          <RubyTerm
                            rubyText={autoAnnotateRuby(opt.textJp)}
                            fallbackText={opt.textJp}
                            showFurigana={showFurigana}
                          />
                        </p>
                        <button
                          type="button"
                          onClick={() => speak(opt.textJp, `review-opt-${opt.key}-${currentQ.id}`)}
                          className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                            activeSpeechId === `review-opt-${opt.key}-${currentQ.id}`
                              ? "bg-emerald-500 text-white"
                              : "hover:bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
                          }`}
                          title="Dengarkan pelafalan opsi ini"
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                      {opt.textEnId && <p className="text-xs sm:text-sm opacity-80 mt-1">{opt.textEnId}</p>}
                      <p className="text-xs sm:text-sm opacity-90 mt-1.5 italic leading-relaxed">{opt.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Official Kaisetsu Explanation Box */}
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] flex flex-col gap-3 mt-2">
            <span className="text-xs sm:text-sm font-bold text-[var(--brand-primary)] uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={16} /> Ringkasan Pembahasan Resmi (解説 - Kaisetsu)
            </span>
            <p className="text-sm sm:text-base text-[var(--text-primary)] leading-[1.85]">
              {currentQ.summaryExplanation}
            </p>
            <div className="p-3.5 sm:p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              <b className="text-[var(--brand-primary)]">Kunci Ujian FE:</b> {currentQ.keyTakeaway}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="px-5 py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] disabled:opacity-30 text-xs sm:text-sm font-bold transition-all"
            >
              ← Sebelumnya
            </button>
            <button
              type="button"
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-[var(--brand-primary)] text-white disabled:opacity-30 text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              Berikutnya →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // VIEW 3A: AUTHENTIC PROMETRIC / IPA CBT SIMULATOR
  // ==========================================================
  if (examMode === "mock") {
    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 select-none pb-12 font-sans">
        {/* Authentic Prometric CBT Top Bar (Theme adaptive) */}
        <div className="w-full bg-[var(--surface)] dark:bg-[#131f34] text-[var(--text-primary)] dark:text-white p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-[var(--border)] dark:border-[#2d4268] shadow-sm dark:shadow-lg">
          <div className="flex items-center gap-3.5">
            <span className="px-3 py-1 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/25 dark:border-blue-400/30 text-blue-600 dark:text-blue-300 text-xs font-mono font-bold tracking-wider">
              IPA CBT
            </span>
            <div>
              <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-wide !text-[var(--text-primary)] dark:!text-white">
                基本情報技術者試験（科目A試験）CBT
              </h2>
              <p className="text-xs text-[var(--text-secondary)] dark:text-blue-200/80 font-mono mt-0.5">
                受験者: {candidateName} 殿 ｜ 制限時間: {Math.floor(TOTAL_MOCK_TIME / 60)}分{TOTAL_MOCK_TIME % 60 > 0 ? (TOTAL_MOCK_TIME % 60) + "秒" : ""} (全{questions.length}問)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`px-3.5 py-1.5 rounded-xl border font-mono text-xs sm:text-sm font-bold flex items-center gap-2 ${
                mockTimeLeft < 300
                  ? "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:border-rose-400 dark:bg-rose-500/20 dark:text-rose-300 animate-pulse"
                  : "border-[var(--border)] dark:border-blue-400/40 bg-[var(--surface-soft)] dark:bg-blue-950/70 text-[var(--text-primary)] dark:text-white"
              }`}
              title="残り時間 (Time Remaining)"
            >
              <Timer size={15} className="text-blue-600 dark:text-blue-300" />
              <span>残り {formatTime(mockTimeLeft)}</span>
            </div>

            <button
              type="button"
              onClick={() => setIsQuestionListModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-soft)] hover:bg-[var(--surface)] dark:bg-blue-900/70 dark:hover:bg-blue-800 border border-[var(--border)] dark:border-blue-500/40 text-xs font-bold text-[var(--text-primary)] dark:text-white transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Layers size={14} />
              <span>問題一覧</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              試験終了
            </button>
          </div>
        </div>

        {/* Mode switcher tab & CBT Session Length Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--text-secondary)] px-1">
          <button
            type="button"
            onClick={() => handleReset("practice")}
            className="text-[var(--brand-primary)] hover:underline font-semibold"
          >
            ← Beralih ke Mode Latihan Santai
          </button>

          {!customQuestions && (
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] overflow-x-auto no-scrollbar max-w-full">
              <span className="text-[11px] font-bold text-[var(--text-secondary)] px-1.5 shrink-0">Sesi:</span>
              {[
                { count: 15, label: "15 問 (22分30秒)" },
                { count: 30, label: "30 問 (45分)" },
                { count: 60, label: "60 問 (90分 - 本番)" },
                { count: 75, label: "全75問 (全問マラソン)" },
              ].map((s) => (
                <button
                  key={s.count}
                  type="button"
                  onClick={() => {
                    setCbtQuestionCount(s.count);
                    handleReset("mock", s.count);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
                    cbtQuestionCount === s.count
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  title={`Mulai sesi ujian CBT dengan ${s.label}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <span className="text-[11px] opacity-75 font-mono hidden md:inline">
            Pintasan: 1〜4 (選択肢), F (チェック), ← / → (前へ/次へ)
          </span>
        </div>

        {/* CBT Question Display Card */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-md flex flex-col gap-6">
          {/* Question Header & Review Checkbox */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2.5">
              <span className="text-base sm:text-lg font-bold text-[var(--text-primary)] font-mono">
                【問 {currentIndex + 1}】
              </span>
              <span className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                ({currentQ.year} · {currentQ.subCategory})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFurigana((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  showFurigana
                    ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-sm"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-soft)]"
                }`}
                title="Tampilkan / Sembunyikan Furigana (ルビ)"
              >
                <Languages size={13} />
                <span>ルビ {showFurigana ? "ON" : "OFF"}</span>
              </button>

              <button
                type="button"
                onClick={() => speak(currentQ.questionJp, `cbt-q-${currentQ.id}`)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  activeSpeechId === `cbt-q-${currentQ.id}`
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm animate-pulse"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-soft)]"
                }`}
                title="Dengarkan pelafalan soal"
              >
                {activeSpeechId === `cbt-q-${currentQ.id}` ? <VolumeX size={13} /> : <Volume2 size={13} />}
                <span>{activeSpeechId === `cbt-q-${currentQ.id}` ? "Stop" : "音声"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleFlag(currentQ.id)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 ${
                  flaggedIds.has(currentQ.id)
                    ? "border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-soft)]"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    flaggedIds.has(currentQ.id)
                      ? "border-amber-500 bg-amber-500 text-white"
                      : "border-[var(--border)]"
                  }`}
                >
                  {flaggedIds.has(currentQ.id) && <Check size={12} />}
                </span>
                <span>後で見直す</span>
              </button>
            </div>
          </div>

          {/* Authentic Japanese Question Text (In dedicated readable card, Zero translations) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-soft)]/60 border border-[var(--border)] shadow-inner">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)] block mb-2.5">
              【問題文】
            </span>
            <h3 className="text-base sm:text-[18px] md:text-[20px] font-bold text-[var(--text-primary)] leading-[2.1] tracking-[0.03em] select-text">
              <RubyTerm
                rubyText={autoAnnotateRuby(currentQ.questionJp)}
                fallbackText={currentQ.questionJp}
                showFurigana={showFurigana}
              />
            </h3>
          </div>

          {/* 4 Authentic Japanese Katakana Choices (ア, イ, ウ, エ) */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)] px-1 mb-1">
              <span>【解答群】 適切な選択肢を1つ選んでください：</span>
              <span className="hidden sm:inline font-mono opacity-60">キー: 1〜4</span>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:gap-4.5">
              {currentQ.options.map((opt) => {
                const isSelected = mockAnswers[currentQ.id] === opt.key;

                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleMockSelect(opt.key)}
                    className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-start gap-4 active:scale-[0.99] min-h-[58px] ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10 text-[var(--text-primary)] ring-2 ring-blue-500 font-semibold shadow-md"
                        : "border-[var(--border)] bg-[var(--surface-soft)]/50 hover:bg-[var(--surface-soft)] hover:border-blue-400/60 text-[var(--text-primary)]"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 ${
                        isSelected
                          ? "border-blue-500 bg-blue-500 text-white shadow-sm"
                          : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {opt.key}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm sm:text-base md:text-[16.5px] leading-[1.85] tracking-[0.02em] font-medium pt-0.5 text-[var(--text-primary)]">
                          <RubyTerm
                            rubyText={autoAnnotateRuby(opt.textJp)}
                            fallbackText={opt.textJp}
                            showFurigana={showFurigana}
                          />
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speak(opt.textJp, `cbt-opt-${opt.key}-${currentQ.id}`);
                          }}
                          className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                            activeSpeechId === `cbt-opt-${opt.key}-${currentQ.id}`
                              ? "bg-emerald-500 text-white"
                              : "hover:bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
                          }`}
                          title="Dengarkan pelafalan opsi"
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Prometric Navigation Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-[var(--border)] gap-2 sm:gap-3">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] disabled:opacity-30 text-xs sm:text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-95 shrink-0"
            >
              <ChevronLeft size={16} /> <span>＜ 前へ</span>
            </button>

            <button
              type="button"
              onClick={() => setIsQuestionListModalOpen(true)}
              className="px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[var(--surface-soft)] hover:bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm font-semibold text-[var(--text-secondary)] transition-all shadow-sm truncate text-center"
            >
              <span>問 {currentIndex + 1} / {questions.length}</span>
              <span className="hidden sm:inline"> ｜ 問題一覧</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all active:scale-95 shrink-0 shadow-sm"
              >
                <span>次へ ＞</span> <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold transition-all active:scale-95 shrink-0 shadow-sm"
              >
                <span>試験終了確認</span> <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Modal 1: Prometric Question List Navigator (問題一覧画面) */}
        <AnimatePresence>
          {isQuestionListModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="p-6 md:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl max-w-2xl w-full flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      問題一覧（解答状況）
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      クリックすると該当の問題へジャンプします。
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsQuestionListModalOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-[var(--surface-soft)] text-[var(--text-secondary)]"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  {questions.map((q, idx) => {
                    const isAnswered = Boolean(mockAnswers[q.id]);
                    const userChoice = mockAnswers[q.id];
                    const isFlagged = flaggedIds.has(q.id);
                    const isCurrent = currentIndex === idx;

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setCurrentIndex(idx);
                          setIsQuestionListModalOpen(false);
                        }}
                        className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 relative ${
                          isCurrent
                            ? "ring-2 ring-blue-500 border-blue-500 bg-blue-500/10 font-bold"
                            : isAnswered
                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:border-blue-400"
                        }`}
                      >
                        {isFlagged && (
                          <span className="absolute top-1 right-1 text-amber-500 text-[10px] font-bold">
                            🚩
                          </span>
                        )}
                        <span className="text-xs font-mono font-bold">問 {idx + 1}</span>
                        <span className="text-[11px] font-semibold">
                          {isAnswered ? `【 ${userChoice} 】` : "未解答"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span>
                    解答済: <b className="text-emerald-500">{answeredCount}</b> ｜ 未解答:{" "}
                    <b className="text-amber-500">{unansweredCount}</b> ｜ チェック:{" "}
                    <b className="text-cyan-500">{flaggedIds.size}</b>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsQuestionListModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[var(--surface-soft)] hover:bg-[var(--surface)] border border-[var(--border)] font-bold text-[var(--text-primary)]"
                  >
                    閉じる
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal 2: Submit Confirmation Modal */}
        <AnimatePresence>
          {isSubmitModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="p-6 md:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl max-w-md w-full flex flex-col gap-5 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mx-auto">
                  <AlertCircle size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    試験終了の確認
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                    試験を終了して採点結果を表示しますか？
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs flex justify-around">
                  <div>
                    <p className="text-[11px] text-[var(--text-secondary)]">解答済</p>
                    <p className="text-lg font-bold text-emerald-500">{answeredCount}</p>
                  </div>
                  <div className="w-px h-8 bg-[var(--border)]" />
                  <div>
                    <p className="text-[11px] text-[var(--text-secondary)]">未解答</p>
                    <p className="text-lg font-bold text-amber-500">{unansweredCount}</p>
                  </div>
                  <div className="w-px h-8 bg-[var(--border)]" />
                  <div>
                    <p className="text-[11px] text-[var(--text-secondary)]">チェック 🚩</p>
                    <p className="text-lg font-bold text-cyan-500">{flaggedIds.size}</p>
                  </div>
                </div>

                {unansweredCount > 0 && (
                  <p className="text-[11px] text-amber-500 font-semibold">
                    ⚠️ 未解答の問題が {unansweredCount} 問あります（無回答は不正解となります）。
                  </p>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-soft)] text-xs font-semibold text-[var(--text-secondary)]"
                  >
                    試験に戻る
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitModalOpen(false);
                      setIsExamFinished(true);
                    }}
                    className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-all"
                  >
                    試験を終了して採点
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ==========================================================
  // VIEW 3B: PRACTICE MODE (NO UPFRONT TRANSLATION; REMEDIAL ON WRONG)
  // ==========================================================
  const isPracticeCorrect = practiceSelectedKey === currentQ.correctKey;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 select-none font-sans">
      {/* Mode Switch Tabs & Meta Bar */}
      <div className="flex flex-col gap-3 p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Mode Selector or Custom Drill Title */}
          {customTitle ? (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onBackToMenu}
                className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
              >
                ← Keluar Drill
              </button>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold">
                <BookOpen size={13} />
                <span>{customTitle}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center p-1 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs font-bold w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleReset("practice")}
                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-center transition-all bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm"
              >
                Latihan Soal (Jepang Asli)
              </button>
              <button
                type="button"
                onClick={() => handleReset("mock")}
                className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-center transition-all text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Simulasi CBT (模擬試験)
              </button>
            </div>
          )}

          {/* Timer Display & Score */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-xs sm:text-sm font-mono font-bold text-[var(--text-secondary)]">
              Skor: <b className="text-emerald-500">{practiceScore}</b> / {questions.length}
            </div>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs ${
                practiceTimeLeft < 20
                  ? "border-rose-500 text-rose-500 bg-rose-500/10 animate-pulse font-bold"
                  : "border-[var(--border)] text-[var(--text-secondary)] bg-[var(--surface-soft)]"
              }`}
              title="90 detik per nomor latihan"
            >
              <Timer size={14} />
              <span>{practiceTimeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Practice Domain Filter Chips */}
        {!customTitle && (
          <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-[var(--border)]/70">
            <span className="text-xs font-bold text-[var(--text-secondary)] mr-1">Filter Domain:</span>
            {[
              { id: "all", label: "Semua Domain (75 Soal)" },
              { id: "technology", label: "テクノロジ系 (40)" },
              { id: "management", label: "マネジメント系 (17)" },
              { id: "strategy", label: "ストラテジ系 (18)" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setPracticeCategory(cat.id as any);
                  setCurrentIndex(0);
                  setPracticeSelectedKey(null);
                  setPracticeAnswerSubmitted(false);
                  setShowManualExplanation(false);
                  setPracticeTimeLeft(90);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  practiceCategory === cat.id
                    ? "bg-[var(--brand-primary)] text-white shadow-sm"
                    : "bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-[var(--surface-soft)] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-glow)] transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 md:p-10 rounded-3xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col gap-6">
        {/* Category & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border)]/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-mono shrink-0">
              Soal {currentIndex + 1} <span className="opacity-40">/ {questions.length}</span>
            </span>
            <span className="px-3 py-0.5 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-semibold truncate">
              {currentQ.year} · {currentQ.subCategory}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Furigana Toggle */}
            <button
              type="button"
              onClick={() => setShowFurigana((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                showFurigana
                  ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-sm"
                  : "bg-[var(--surface-soft)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]"
              }`}
              title="Tampilkan / Sembunyikan Furigana (ルビ)"
            >
              <Languages size={13} />
              <span>ルビ {showFurigana ? "ON" : "OFF"}</span>
            </button>

            {/* Audio Question Speaker */}
            <button
              type="button"
              onClick={() => speak(currentQ.questionJp, `practice-q-${currentQ.id}`)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                activeSpeechId === `practice-q-${currentQ.id}`
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-sm animate-pulse"
                  : "bg-[var(--surface-soft)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]"
              }`}
              title="Dengarkan pelafalan bahasa Jepang asli"
            >
              {activeSpeechId === `practice-q-${currentQ.id}` ? <VolumeX size={13} /> : <Volume2 size={13} />}
              <span>{activeSpeechId === `practice-q-${currentQ.id}` ? "Stop" : "音声"}</span>
            </button>
          </div>
        </div>

        {/* Japanese Question Text (In dedicated readable card, NO Indonesian translation upfront!) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-soft)]/60 border border-[var(--border)] shadow-inner">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              【問題文】
            </span>
            <button
              type="button"
              onClick={() => speak(currentQ.questionJp, `practice-q-${currentQ.id}`)}
              className="text-xs text-[var(--brand-primary)] hover:underline flex items-center gap-1 font-bold"
            >
              <Volume2 size={13} />
              <span>Dengarkan Soal</span>
            </button>
          </div>
          <h3 className="text-base sm:text-[18px] md:text-[20px] font-bold text-[var(--text-primary)] leading-[2.1] tracking-[0.03em] select-text">
            <RubyTerm
              rubyText={autoAnnotateRuby(currentQ.questionJp)}
              fallbackText={currentQ.questionJp}
              showFurigana={showFurigana}
            />
          </h3>
        </div>

        {/* 4 Options Grid (ア, イ, ウ, エ) */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)] px-1 mb-1">
            <span>【解答群】 適切な選択肢を1つ選んでください：</span>
            <span className="hidden sm:inline font-mono opacity-60">ショートカット: 1〜4</span>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:gap-4.5">
            {currentQ.options.map((opt) => {
              const practiceSelected = practiceSelectedKey === opt.key;
              const isCorrect = opt.key === currentQ.correctKey;

              let btnStyle =
                "border-[var(--border)] bg-[var(--surface-soft)]/50 hover:bg-[var(--surface-soft)] hover:border-[var(--brand-primary)]/50 text-[var(--text-primary)]";

              if (practiceAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold shadow-md";
                } else if (practiceSelected && !isCorrect) {
                  btnStyle = "border-rose-500 bg-rose-500/10 text-rose-500";
                } else {
                  btnStyle = "opacity-40 border-[var(--border)] bg-transparent text-[var(--text-secondary)]";
                }
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handlePracticeSelect(opt.key)}
                  disabled={practiceAnswerSubmitted}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 active:scale-[0.99] min-h-[58px] ${btnStyle}`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      {opt.key}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm sm:text-base md:text-[16.5px] font-medium leading-[1.85] tracking-[0.02em] pt-0.5">
                          <RubyTerm
                            rubyText={autoAnnotateRuby(opt.textJp)}
                            fallbackText={opt.textJp}
                            showFurigana={showFurigana}
                          />
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speak(opt.textJp, `practice-opt-${opt.key}-${currentQ.id}`);
                          }}
                          className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                            activeSpeechId === `practice-opt-${opt.key}-${currentQ.id}`
                              ? "bg-emerald-500 text-white"
                              : "hover:bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
                          }`}
                          title="Dengarkan pelafalan opsi"
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  {practiceAnswerSubmitted && (
                    <div className="mt-1 shrink-0">
                      {isCorrect && <CheckCircle2 size={18} className="text-emerald-500" />}
                      {practiceSelected && !isCorrect && <XCircle size={18} className="text-rose-500" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* FEEDBACK A: USER ANSWERED CORRECTLY */}
        {practiceAnswerSubmitted && isPracticeCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 sm:p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-3"
          >
            <div className="flex items-center gap-2.5 text-emerald-500 font-bold text-sm sm:text-base">
              <CheckCircle2 size={20} />
              <span>正解！ (Jawaban Kamu Benar!)</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!showManualExplanation && (
                <button
                  type="button"
                  onClick={() => setShowManualExplanation(true)}
                  className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline px-2 py-1"
                >
                  Lihat Pembahasan & Terjemahan (Opsional)
                </button>
              )}
              <button
                type="button"
                onClick={handlePracticeNext}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              >
                <span>{currentIndex === questions.length - 1 ? "Lihat Skor" : "Soal Berikutnya"}</span>
                {currentIndex < questions.length - 1 && (
                  <span className="hidden md:inline font-mono opacity-80 text-xs ml-1">(Enter / Space)</span>
                )}
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        )}

        {/* FEEDBACK B: USER ANSWERED WRONG (OR CHOSE TO VIEW EXPLANATION) -> REVEAL FULL REMEDIAL */}
        {practiceAnswerSubmitted && (!isPracticeCorrect || showManualExplanation) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl border-2 border-rose-500/20 bg-[var(--surface)] shadow-lg flex flex-col gap-5 mt-4"
          >
            {/* Top Remedial Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <span
                className={`text-xs sm:text-sm uppercase font-bold tracking-wider flex items-center gap-2 ${
                  isPracticeCorrect ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {isPracticeCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {isPracticeCorrect
                  ? "正解解説 (Pembahasan Jawaban)"
                  : "不正解 · Pembahasan & Terjemahan Remedial"}
              </span>
              <span className="text-xs sm:text-sm font-bold text-emerald-500">
                Jawaban Benar: 【 {currentQ.correctKey} 】
              </span>
            </div>

            {/* Question Translation (Only Revealed When Needed) */}
            <div className="p-5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-sm sm:text-[15.5px] text-[var(--text-secondary)] leading-[1.85]">
              <span className="font-bold text-[var(--brand-primary)] block mb-1.5 text-xs uppercase tracking-wider">
                Terjemahan Soal (Bahasa Indonesia):
              </span>
              &ldquo;{currentQ.questionTranslation}&rdquo;
            </div>

            {/* Official Summary Explanation */}
            <div className="p-5 rounded-2xl bg-[var(--surface-soft)]/60 border border-[var(--border)]/70">
              <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block mb-2">
                Inti Penjelasan (解説 - Kaisetsu):
              </span>
              <p className="text-sm sm:text-[15.5px] text-[var(--text-primary)]/90 leading-[1.85] tracking-[0.01em]">
                {currentQ.summaryExplanation}
              </p>
            </div>

            {/* Analysis of User's Selection if Wrong */}
            {!isPracticeCorrect && practiceSelectedKey && (
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-xs sm:text-sm text-rose-600 dark:text-rose-300 leading-[1.8]">
                <b>Mengapa Pilihan 【 {practiceSelectedKey} 】 Salah:</b>{" "}
                {currentQ.options.find((o) => o.key === practiceSelectedKey)?.explanation}
              </div>
            )}

            {/* Key Takeaway Pill */}
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              <b className="text-[var(--brand-primary)]">Kunci Ujian (Active Recall):</b> {currentQ.keyTakeaway}
            </div>

            <button
              type="button"
              onClick={handlePracticeNext}
              className="mt-2 w-full py-3.5 rounded-2xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{currentIndex === questions.length - 1 ? "Lihat Skor Akhir" : "Lanjut ke Soal Berikutnya"}</span>
              {currentIndex < questions.length - 1 && (
                <span className="hidden md:inline font-mono opacity-80 text-xs ml-1">(Enter / Space)</span>
              )}
              <ArrowRight size={15} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
