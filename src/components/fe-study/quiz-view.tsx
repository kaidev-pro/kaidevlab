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
} from "lucide-react";
import { QuizQuestion, FE_QUIZ_QUESTIONS } from "@/data/fe-quiz-data";

interface QuizViewProps {
  onBackToMenu: () => void;
}

type ExamMode = "practice" | "mock";

export function QuizView({ onBackToMenu }: QuizViewProps) {
  const [examMode, setExamMode] = useState<ExamMode>("practice");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Practice mode states
  const [practiceSelectedKey, setPracticeSelectedKey] = useState<string | null>(null);
  const [practiceAnswerSubmitted, setPracticeAnswerSubmitted] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceTimeLeft, setPracticeTimeLeft] = useState(90);

  // Mock Exam states
  // Total exam time: 15 questions × 90 seconds = 1350 seconds (22.5 mins)
  const TOTAL_MOCK_TIME = 1350;
  const [mockTimeLeft, setMockTimeLeft] = useState(TOTAL_MOCK_TIME);
  const [mockAnswers, setMockAnswers] = useState<Record<string, "ア" | "イ" | "ウ" | "エ">>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [candidateName, setCandidateName] = useState("Kai");
  const [certificateId, setCertificateId] = useState("");

  const questions = FE_QUIZ_QUESTIONS;
  const currentQ = questions[currentIndex];

  // Generate certificate serial on finish
  useEffect(() => {
    if (isExamFinished && !certificateId) {
      const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
      setCertificateId(`FE-CBT-2026-${randomCode}`);
    }
  }, [isExamFinished, certificateId]);

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

  // Practice Mode: Handle selection
  const handlePracticeSelect = (key: "ア" | "イ" | "ウ" | "エ") => {
    if (practiceAnswerSubmitted) return;
    setPracticeSelectedKey(key);
    setPracticeAnswerSubmitted(true);

    if (key === currentQ.correctKey) {
      setPracticeScore((prev) => prev + 1);
    }
  };

  const handlePracticeNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setPracticeSelectedKey(null);
      setPracticeAnswerSubmitted(false);
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
  const handleReset = (mode: ExamMode = examMode) => {
    setExamMode(mode);
    setCurrentIndex(0);
    setPracticeSelectedKey(null);
    setPracticeAnswerSubmitted(false);
    setPracticeScore(0);
    setPracticeTimeLeft(90);
    setMockTimeLeft(TOTAL_MOCK_TIME);
    setMockAnswers({});
    setFlaggedIds(new Set());
    setIsSubmitModalOpen(false);
    setIsExamFinished(false);
    setIsReviewMode(false);
    setCertificateId("");
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (examMode === "practice") {
        if (!practiceAnswerSubmitted) {
          if (e.key === "1" || e.key.toLowerCase() === "a") handlePracticeSelect("ア");
          if (e.key === "2" || e.key.toLowerCase() === "b") handlePracticeSelect("イ");
          if (e.key === "3" || e.key.toLowerCase() === "c") handlePracticeSelect("ウ");
          if (e.key === "4" || e.key.toLowerCase() === "d") handlePracticeSelect("エ");
        } else if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          handlePracticeNext();
        }
      } else if (examMode === "mock" && !isExamFinished) {
        if (e.key === "1" || e.key.toLowerCase() === "a") handleMockSelect("ア");
        if (e.key === "2" || e.key.toLowerCase() === "b") handleMockSelect("イ");
        if (e.key === "3" || e.key.toLowerCase() === "c") handleMockSelect("ウ");
        if (e.key === "4" || e.key.toLowerCase() === "d") handleMockSelect("エ");
        if (e.key.toLowerCase() === "f") toggleFlag(currentQ.id);
        if (e.key === "ArrowRight" && currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
        if (e.key === "ArrowLeft" && currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [examMode, practiceAnswerSubmitted, isExamFinished, currentIndex, currentQ?.id]);

  // Scoring analysis for Mock Exam
  const examStats = useMemo(() => {
    let correctCount = 0;
    const catStats = {
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
      } else {
        // practice mode
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

  // Render Result & Certificate Screen
  if (isExamFinished && !isReviewMode) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-12 select-none"
      >
        {/* Top Result Banner */}
        <div className="p-8 rounded-3xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                examStats.isPassed
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
                  : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
              }`}
            >
              <Trophy size={34} />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[var(--brand-primary)] flex items-center gap-1.5">
                <Sparkles size={13} />
                {examMode === "mock" ? "Hasil Ujian CBT Resmi" : "Hasil Latihan Soal"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] font-serif mt-0.5">
                {examStats.isPassed ? "合格！Lulus Ambang Batas Resmi" : "不合格 · Perlu Penguatan Materi"}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Passing line standar IPA Jepang: <b>60% (600 / 1000 poin)</b>. Skor kamu: <b>{examStats.percentage}%</b>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] shrink-0">
            <div className="text-center px-3">
              <p className="text-[11px] text-[var(--text-secondary)]">Skor Benar</p>
              <p className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                {examStats.finalScore} <span className="text-xs font-sans opacity-50">/ {examStats.total}</span>
              </p>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center px-3">
              <p className="text-[11px] text-[var(--text-secondary)]">Akurasi (正答率)</p>
              <p
                className={`text-2xl font-bold font-mono ${
                  examStats.isPassed ? "text-emerald-500" : "text-amber-500"
                }`}
              >
                {examStats.percentage}%
              </p>
            </div>
          </div>
        </div>

        {/* 3 Domain Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Technology */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-[var(--brand-primary)] uppercase tracking-wider">
                テクノロジ系 (Technology)
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <h4 className="text-lg font-bold text-[var(--text-primary)]">
                  {examStats.catStats.technology.correct} / {examStats.catStats.technology.total} Benar
                </h4>
                <span className="text-xs font-mono font-bold text-[var(--text-secondary)]">
                  {Math.round((examStats.catStats.technology.correct / (examStats.catStats.technology.total || 1)) * 100)}%
                </span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-[var(--surface-soft)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--brand-primary)]"
                style={{
                  width: `${(examStats.catStats.technology.correct / (examStats.catStats.technology.total || 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Management */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-cyan-500 uppercase tracking-wider">
                マネジメント系 (Management)
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <h4 className="text-lg font-bold text-[var(--text-primary)]">
                  {examStats.catStats.management.correct} / {examStats.catStats.management.total} Benar
                </h4>
                <span className="text-xs font-mono font-bold text-[var(--text-secondary)]">
                  {Math.round((examStats.catStats.management.correct / (examStats.catStats.management.total || 1)) * 100)}%
                </span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-[var(--surface-soft)] rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500"
                style={{
                  width: `${(examStats.catStats.management.correct / (examStats.catStats.management.total || 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Strategy */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                ストラテジ系 (Strategy)
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <h4 className="text-lg font-bold text-[var(--text-primary)]">
                  {examStats.catStats.strategy.correct} / {examStats.catStats.strategy.total} Benar
                </h4>
                <span className="text-xs font-mono font-bold text-[var(--text-secondary)]">
                  {Math.round((examStats.catStats.strategy.correct / (examStats.catStats.strategy.total || 1)) * 100)}%
                </span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-[var(--surface-soft)] rounded-full overflow-hidden">
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
          <div className="relative p-8 md:p-12 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-[var(--surface)] via-[var(--surface-soft)] to-[var(--surface)] shadow-2xl overflow-hidden print:border-black print:bg-white text-center flex flex-col items-center gap-6">
            {/* Watermark badge */}
            <div className="absolute top-4 right-4 text-emerald-500/10 font-serif font-black text-8xl pointer-events-none select-none">
              合格
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase tracking-widest">
                <Award size={15} />
                CERTIFICATE OF READINESS · 模擬試験 合格証明書
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-[var(--text-primary)] font-serif mt-2 tracking-tight">
                基本情報技術者試験 (FE CBT)
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)]">
                Fundamental Information Technology Engineer Examination · Simulation Readiness
              </p>
            </div>

            {/* Candidate Name */}
            <div className="my-2">
              <p className="text-xs text-[var(--text-secondary)]">Diberikan kepada:</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="text-2xl md:text-3xl font-bold font-serif text-[var(--brand-primary)] bg-transparent border-b border-[var(--brand-primary)]/40 text-center px-2 py-0.5 focus:outline-none focus:border-[var(--brand-primary)]"
                  placeholder="Nama Kandidat"
                />
              </div>
            </div>

            <p className="text-xs md:text-sm text-[var(--text-secondary)] max-w-lg leading-relaxed">
              Telah berhasil menyelesaikan simulasi ujian CBT resmi dengan skor akurasi{" "}
              <b className="text-[var(--text-primary)]">{examStats.percentage}%</b>, memenuhi ambang batas kelulusan standar
              IPA Jepang untuk kualifikasi visa 技人国 (Engineer / Specialist in Humanities).
            </p>

            {/* Certificate Meta Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-4 border-t border-[var(--border)] text-xs">
              <div>
                <p className="text-[11px] text-[var(--text-secondary)]">Tanggal Tes</p>
                <p className="font-mono font-bold text-[var(--text-primary)] mt-0.5">2026.09.22</p>
              </div>
              <div>
                <p className="text-[11px] text-[var(--text-secondary)]">Skor Akhir</p>
                <p className="font-mono font-bold text-emerald-500 mt-0.5">
                  {examStats.finalScore} / {examStats.total} ({examStats.percentage}%)
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[var(--text-secondary)]">Status IPA</p>
                <p className="font-bold text-emerald-500 mt-0.5">合格 (PASSED)</p>
              </div>
              <div>
                <p className="text-[11px] text-[var(--text-secondary)]">No. Verifikasi</p>
                <p className="font-mono font-bold text-[var(--text-primary)] mt-0.5">{certificateId}</p>
              </div>
            </div>

            {/* Print Button */}
            <div className="pt-2 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-soft)] border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-sm"
              >
                <Printer size={14} /> Cetak / Simpan Sertifikat (PDF)
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full print:hidden">
          <button
            type="button"
            onClick={() => {
              setIsReviewMode(true);
              setCurrentIndex(0);
            }}
            className="w-full sm:flex-1 py-3.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
          >
            <BookOpen size={16} /> Tinjau Seluruh Jawaban & Pembahasan (解説)
          </button>

          <button
            type="button"
            onClick={() => handleReset(examMode)}
            className="w-full sm:flex-1 py-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={15} /> Ulangi Simulasi Ini
          </button>
        </div>
      </motion.div>
    );
  }

  // Render Review Mode Screen (Review all answers post-exam)
  if (isReviewMode) {
    const userAns = examMode === "mock" ? mockAnswers[currentQ.id] : practiceSelectedKey;
    const isCorrect = userAns === currentQ.correctKey;

    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 select-none">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold">
              Review Mode · Soal {currentIndex + 1} / {questions.length}
            </span>
            <span
              className={`text-xs font-bold ${
                isCorrect ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {isCorrect ? "Jawaban Benar" : "Jawaban Keliru / Kosong"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsReviewMode(false)}
            className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline"
          >
            Kembali ke Sertifikat / Ringkasan
          </button>
        </div>

        {/* Question Matrix for Review */}
        <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)]">
          {questions.map((q, idx) => {
            const ans = examMode === "mock" ? mockAnswers[q.id] : null;
            const correct = ans === q.correctKey;
            const isCurrent = currentIndex === idx;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center ${
                  isCurrent ? "ring-2 ring-[var(--brand-primary)] ring-offset-1" : ""
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

        {/* Question Details */}
        <div className="p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col gap-5">
          <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] leading-relaxed">
            {currentQ.questionJp}
          </h3>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] italic border-l-2 border-[var(--brand-primary)]/40 pl-3">
            &ldquo;{currentQ.questionTranslation}&rdquo;
          </p>

          <div className="grid grid-cols-1 gap-2.5 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = userAns === opt.key;
              const isRightKey = opt.key === currentQ.correctKey;

              let style = "border-[var(--border)] bg-[var(--surface-soft)]/40 text-[var(--text-secondary)]";
              if (isRightKey) {
                style = "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold";
              } else if (isSelected && !isRightKey) {
                style = "border-rose-500 bg-rose-500/10 text-rose-500 line-through";
              }

              return (
                <div key={opt.key} className={`p-4 rounded-xl border flex items-start gap-3 ${style}`}>
                  <span className="w-6 h-6 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center font-bold text-xs shrink-0">
                    {opt.key}
                  </span>
                  <div>
                    <p className="text-sm">{opt.textJp}</p>
                    {opt.textEnId && <p className="text-xs opacity-75 mt-0.5">{opt.textEnId}</p>}
                    <p className="text-xs opacity-90 mt-1 italic">{opt.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Explanation Box */}
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] flex flex-col gap-2.5 mt-2">
            <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={14} /> Ringkasan Pembahasan (解説)
            </span>
            <p className="text-xs md:text-sm text-[var(--text-primary)] leading-relaxed">
              {currentQ.summaryExplanation}
            </p>
            <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-secondary)]">
              <b className="text-[var(--brand-primary)]">Kunci Ujian:</b> {currentQ.keyTakeaway}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="px-4 py-2 rounded-xl border border-[var(--border)] disabled:opacity-30 text-xs font-bold"
            >
              ← Sebelumnya
            </button>
            <button
              type="button"
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="px-4 py-2 rounded-xl bg-[var(--brand-primary)] text-white disabled:opacity-30 text-xs font-bold"
            >
              Berikutnya →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Quiz View (Practice or Mock)
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 select-none">
      {/* Mode Switch Tabs & Meta Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        {/* Mode Selector */}
        <div className="flex items-center p-1 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs font-bold">
          <button
            type="button"
            onClick={() => handleReset("practice")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              examMode === "practice"
                ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Mode Latihan (Instant)
          </button>
          <button
            type="button"
            onClick={() => handleReset("mock")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              examMode === "mock"
                ? "bg-[var(--surface)] text-[var(--brand-primary)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Simulasi CBT (模擬試験)
          </button>
        </div>

        {/* Timer Display */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {examMode === "mock" ? (
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold ${
                mockTimeLeft < 300
                  ? "border-rose-500 text-rose-500 bg-rose-500/10 animate-pulse"
                  : "border-[var(--border)] text-[var(--text-secondary)] bg-[var(--surface-soft)]"
              }`}
              title="Waktu sisa ujian CBT (Total 22,5 menit)"
            >
              <Timer size={14} />
              <span>Sisa Waktu: {formatTime(mockTimeLeft)}</span>
            </div>
          ) : (
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
          )}

          {examMode === "mock" && (
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
            >
              Kumpulkan Ujian
            </button>
          )}
        </div>
      </div>

      {/* Mock Exam Question Matrix Navigator */}
      {examMode === "mock" && (
        <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
              <Layers size={13} />
              Matriks Nomor Soal (Question Navigator)
            </span>
            <span>
              Terjawab: <b className="text-[var(--text-primary)]">{answeredCount}</b> / {questions.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {questions.map((q, idx) => {
              const isCurrent = currentIndex === idx;
              const isAnswered = Boolean(mockAnswers[q.id]);
              const isFlagged = flaggedIds.has(q.id);

              let btnClass = "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-secondary)]";

              if (isCurrent) {
                btnClass = "ring-2 ring-[var(--brand-primary)] border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold";
              } else if (isAnswered) {
                btnClass = "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 font-semibold";
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono transition-all relative flex items-center justify-center border ${btnClass}`}
                >
                  {idx + 1}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-[var(--surface)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Bar (Practice Mode) */}
      {examMode === "practice" && (
        <div className="w-full h-1.5 bg-[var(--surface-soft)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-glow)] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      )}

      {/* Question Card */}
      <div className="p-6 md:p-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col gap-5">
        {/* Category & Flag Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[var(--text-primary)] font-mono">
              Soal {currentIndex + 1} <span className="opacity-40">/ {questions.length}</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-[11px] font-medium">
              {currentQ.year} · {currentQ.subCategory}
            </span>
          </div>

          {examMode === "mock" && (
            <button
              type="button"
              onClick={() => toggleFlag(currentQ.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                flaggedIds.has(currentQ.id)
                  ? "border-amber-500 text-amber-500 bg-amber-500/10 font-bold"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Flag size={13} />
              {flaggedIds.has(currentQ.id) ? "Ditandai (Ragu)" : "Tandai Soal (F)"}
            </button>
          )}
        </div>

        {/* Japanese Question Text */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] leading-relaxed font-sans">
            {currentQ.questionJp}
          </h3>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-[var(--brand-primary)]/40 pl-3 mt-1">
            &ldquo;{currentQ.questionTranslation}&rdquo;
          </p>
        </div>

        {/* 4 Options Grid (ア, イ, ウ, エ) */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {currentQ.options.map((opt) => {
            const isMock = examMode === "mock";
            const mockSelected = mockAnswers[currentQ.id] === opt.key;
            const practiceSelected = practiceSelectedKey === opt.key;
            const isCorrect = opt.key === currentQ.correctKey;

            let btnStyle =
              "border-[var(--border)] bg-[var(--surface-soft)]/50 hover:bg-[var(--surface-soft)] hover:border-[var(--brand-primary)]/50 text-[var(--text-primary)]";

            if (isMock) {
              if (mockSelected) {
                btnStyle =
                  "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold ring-1 ring-[var(--brand-primary)]";
              }
            } else {
              // Practice mode styling
              if (practiceAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold";
                } else if (practiceSelected && !isCorrect) {
                  btnStyle = "border-rose-500 bg-rose-500/10 text-rose-500";
                } else {
                  btnStyle = "opacity-40 border-[var(--border)] bg-transparent text-[var(--text-secondary)]";
                }
              }
            }

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => (isMock ? handleMockSelect(opt.key) : handlePracticeSelect(opt.key))}
                disabled={!isMock && practiceAnswerSubmitted}
                className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${btnStyle}`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {opt.key}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{opt.textJp}</p>
                    {opt.textEnId && (
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{opt.textEnId}</p>
                    )}
                  </div>
                </div>

                {/* Status Indicator */}
                {isMock ? (
                  mockSelected && <Check size={18} className="text-[var(--brand-primary)] shrink-0" />
                ) : (
                  practiceAnswerSubmitted && (
                    <div>
                      {isCorrect && <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />}
                      {practiceSelected && !isCorrect && <XCircle size={18} className="text-rose-500 shrink-0" />}
                    </div>
                  )
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation Bar for Mock Mode */}
        {examMode === "mock" && (
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--brand-primary)] disabled:opacity-30 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            >
              <ChevronLeft size={16} /> Sebelumnya
            </button>

            <span className="text-xs text-[var(--text-secondary)] font-mono">
              {currentIndex + 1} / {questions.length}
            </span>

            <button
              type="button"
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--surface-soft)] hover:bg-[var(--border)] disabled:opacity-30 text-xs font-bold text-[var(--text-primary)] transition-all border border-[var(--border)]"
            >
              Berikutnya <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Practice Mode Detailed Answer Drawer */}
        {examMode === "practice" && practiceAnswerSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] flex flex-col gap-3 mt-2"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] flex items-center gap-1.5">
                <BookOpen size={14} />
                Pembahasan Resmi (解説 - Kaisetsu)
              </span>
              <span className="text-xs font-bold text-emerald-500">
                Jawaban Benar: 【 {currentQ.correctKey} 】
              </span>
            </div>

            <p className="text-xs md:text-sm text-[var(--text-primary)] leading-relaxed">
              {currentQ.summaryExplanation}
            </p>

            <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-secondary)]">
              <b className="text-[var(--brand-primary)]">Kunci Ringkas:</b> {currentQ.keyTakeaway}
            </div>

            <button
              type="button"
              onClick={handlePracticeNext}
              className="mt-2 w-full py-3 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white text-xs font-bold tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>{currentIndex === questions.length - 1 ? "Lihat Skor Akhir" : "Lanjut ke Soal Berikutnya"}</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </div>

      {/* Confirmation Modal Before Submit (Mock Mode) */}
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
                  Konfirmasi Pengumpulan Ujian
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  Apakah kamu yakin ingin menyelesaikan ujian CBT ini sekarang?
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs flex justify-around">
                <div>
                  <p className="text-[11px] text-[var(--text-secondary)]">Sudah Dijawab</p>
                  <p className="text-lg font-bold text-emerald-500">{answeredCount}</p>
                </div>
                <div className="w-px h-8 bg-[var(--border)]" />
                <div>
                  <p className="text-[11px] text-[var(--text-secondary)]">Belum Dijawab</p>
                  <p className="text-lg font-bold text-amber-500">{unansweredCount}</p>
                </div>
                <div className="w-px h-8 bg-[var(--border)]" />
                <div>
                  <p className="text-[11px] text-[var(--text-secondary)]">Ditandai 🚩</p>
                  <p className="text-lg font-bold text-cyan-500">{flaggedIds.size}</p>
                </div>
              </div>

              {unansweredCount > 0 && (
                <p className="text-[11px] text-amber-500 font-semibold">
                  ⚠️ Peringatan: Masih ada {unansweredCount} soal kosong yang akan dihitung salah.
                </p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-soft)] text-xs font-semibold text-[var(--text-secondary)]"
                >
                  Lanjut Mengerjakan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitModalOpen(false);
                    setIsExamFinished(true);
                  }}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
                >
                  Ya, Kumpulkan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
