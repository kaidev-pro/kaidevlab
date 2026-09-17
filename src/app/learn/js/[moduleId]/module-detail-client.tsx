"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress/use-progress";
import { getModuleById, getAllModules } from "@/lib/curriculum/tracks";
import type { QuizQuestion } from "@/lib/curriculum/types";
import Link from "next/link";

export default function ModuleDetailClient({ moduleId }: { moduleId: string }) {
  const module = getModuleById(moduleId);

  if (!module) {
    return (
      <div className="empty-state">
        <h3>Module not found</h3>
      </div>
    );
  }

  const { progress, mounted, completeModule, completeLesson, recordQuiz, addLabNote, isModuleUnlocked } = useProgress();
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [quizState, setQuizState] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [labNoteText, setLabNoteText] = useState("");
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  if (!mounted) return <p className="text-secondary">Loading...</p>;

  const isUnlocked = isModuleUnlocked(module.prerequisites);
  if (!isUnlocked) {
    return (
      <div className="empty-state">
        <h3>🔒 Module Locked</h3>
        <p>Complete the prerequisite modules first to unlock this one.</p>
        <Link href="/learn/js" className="learn-btn" style={{ marginTop: "1rem" }}>
          ← Back to Track
        </Link>
      </div>
    );
  }

  const activeLesson = module.lessons[activeLessonIdx];
  const isModuleDone = progress.completedModules.includes(moduleId);

  const allModules = getAllModules();
  const currentIdx = allModules.findIndex((m) => m.id === moduleId);
  const prevModule = currentIdx > 0 ? allModules[currentIdx - 1] : null;
  const nextModule = currentIdx < allModules.length - 1 ? allModules[currentIdx + 1] : null;

  const quizScore = quizSubmitted
    ? Math.round((module.quiz.filter((_, i) => quizState[i] === module.quiz[i].correctIndex).length / module.quiz.length) * 100)
    : 0;
  const quizPassed = quizScore >= 70;

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    recordQuiz(moduleId, quizScore);
  };

  const handleCompleteModule = () => {
    completeModule(moduleId);
  };

  const handleSaveLabNote = () => {
    if (!labNoteText.trim()) return;
    addLabNote({
      id: `note-${Date.now()}`,
      title: `Lab Note: ${module.title}`,
      track: module.track,
      content: labNoteText,
      createdAt: new Date().toISOString(),
      moduleRef: moduleId,
    });
    setLabNoteText("");
  };

  return (
    <>
      <Link href="/learn/js" className="text-secondary" style={{ fontSize: "0.85rem", fontWeight: 700, display: "inline-block", marginBottom: "1rem" }}>
        ← JavaScript Track
      </Link>

      <div className="module-detail-layout">
        <aside className="module-sidebar">
          <h4>Module Lessons</h4>
          <ul className="lesson-nav-list">
            {module.lessons.map((lesson, idx) => {
              const isDone = progress.completedLessons.includes(lesson.id);
              const isActive = idx === activeLessonIdx;
              return (
                <li key={lesson.id}>
                  <div
                    className={`lesson-nav-item ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}`}
                    onClick={() => {
                      setActiveLessonIdx(idx);
                      completeLesson(lesson.id);
                    }}
                  >
                    <span className="lesson-check">{isDone ? "✓" : isActive ? "▶" : "○"}</span>
                    <span>{idx + 1}. {lesson.title}</span>
                  </div>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
            <h4>Quick Jump</h4>
            <div style={{ display: "grid", gap: "0.4rem" }}>
              <a href="#quiz" className="learn-btn" style={{ justifyContent: "center" }}>Take Quiz</a>
              <a href="#mistakes" className="learn-btn" style={{ justifyContent: "center" }}>Common Mistakes</a>
              <a href="#interview" className="learn-btn" style={{ justifyContent: "center" }}>Interview Qs</a>
            </div>
          </div>
        </aside>

        <div className="module-content">
          <div className="module-header">
            <p className="eyebrow">Module {module.order} · {module.difficulty}</p>
            <h1>{module.title}</h1>
            <p className="module-subtitle">{module.subtitle}</p>
            <div className="module-meta-row">
              <span>⏱ {module.estimatedTime}</span>
              <span>📖 {module.lessons.length} lessons</span>
              <span>✍️ {module.lessons.length} key takeaways</span>
              <span>❓ {module.quiz.length} quiz questions</span>
            </div>
          </div>

          <div className="learn-section-block">
            <h2>🎯 Learning Objectives</h2>
            <p className="text-secondary" style={{ marginBottom: "1rem", fontSize: "0.92rem" }}>
              By the end of this module, you will be able to:
            </p>
            <ul className="objectives-list">
              {module.learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>

          <div className="analogy-box">
            <p className="label">💡 Real-World Analogy</p>
            <p>{module.realWorldAnalogy}</p>
          </div>

          <div className="learn-section-block" id={`lesson-${activeLessonIdx}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <h2 style={{ margin: 0 }}>Lesson {activeLessonIdx + 1}: {activeLesson.title}</h2>
              <span className="text-secondary" style={{ fontSize: "0.82rem", fontWeight: 700 }}>({activeLesson.estimatedTime})</span>
            </div>

            {activeLesson.sections.map((section) => (
              <div key={section.id} className="lesson-section">
                <span className={`section-label ${section.type}`}>{section.type}</span>
                <h3>{section.title}</h3>

                {section.content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {section.codeExample && (
                  <div className="code-block">
                    <span className="code-label">{section.codeExample.language}</span>
                    <pre><code>{section.codeExample.code}</code></pre>
                  </div>
                )}

                {section.practice && (
                  <div className="practice-block">
                    <p className="label">✏️ Practice</p>
                    <p className="instruction">{section.practice.instruction}</p>
                    <textarea
                      className="practice-editor"
                      defaultValue={section.practice.starterCode}
                      placeholder="Write your code here..."
                    />
                    <div className="practice-actions">
                      <button
                        className="learn-btn"
                        onClick={() => setShowHint((prev) => ({ ...prev, [section.id]: !prev[section.id] }))}
                      >
                        💡 Hint
                      </button>
                      <details>
                        <summary className="learn-btn">Show Solution</summary>
                        <div className="code-block" style={{ marginTop: "0.5rem" }}>
                          <pre><code>{section.practice.solution}</code></pre>
                        </div>
                      </details>
                    </div>
                    {showHint[section.id] && (
                      <div className="practice-hint is-visible">
                        💡 {section.practice.hint}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="takeaway-box">
              <p className="label">📌 Key Takeaway</p>
              <p>{activeLesson.keyTakeaway}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.6rem", marginTop: "1.5rem" }}>
              <button
                className="learn-btn"
                onClick={() => setActiveLessonIdx((prev) => Math.max(0, prev - 1))}
                disabled={activeLessonIdx === 0}
                style={{ opacity: activeLessonIdx === 0 ? 0.4 : 1 }}
              >
                ← Previous Lesson
              </button>
              <button
                className="learn-btn is-primary"
                onClick={() => {
                  completeLesson(activeLesson.id);
                  setActiveLessonIdx((prev) => Math.min(module.lessons.length - 1, prev + 1));
                }}
                disabled={activeLessonIdx === module.lessons.length - 1}
                style={{ opacity: activeLessonIdx === module.lessons.length - 1 ? 0.4 : 1 }}
              >
                Next Lesson →
              </button>
            </div>
          </div>

          <div className="learn-section-block">
            <div className="matters-box">
              <p className="label">💼 Why This Matters</p>
              <p>{module.whyThisMatters}</p>
            </div>
          </div>

          <div className="learn-section-block" id="mistakes">
            <h2>⚠️ Common Mistakes</h2>
            <p className="text-secondary" style={{ marginBottom: "1rem", fontSize: "0.92rem" }}>
              Avoid these traps that catch beginners and even experienced developers.
            </p>
            <div className="mistakes-list">
              {module.commonMistakes.map((mistake, i) => (
                <div key={i} className="mistake-card">
                  <h4>{mistake.title}</h4>
                  <div className="mistake-code">
                    <div className="wrong">{mistake.wrong}</div>
                    <div className="right">{mistake.right}</div>
                  </div>
                  <p className="explanation">{mistake.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="learn-section-block" id="interview">
            <h2>💬 Interview Questions</h2>
            <p className="text-secondary" style={{ marginBottom: "1rem", fontSize: "0.92rem" }}>
              These are real questions you might get asked in a job interview. Click to reveal the answer.
            </p>
            <div className="interview-list">
              {module.interviewQuestions.map((item, i) => (
                <InterviewItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          <div className="learn-section-block" id="quiz">
            <h2>📋 Quiz</h2>
            <p className="text-secondary" style={{ marginBottom: "1rem", fontSize: "0.92rem" }}>
              Test your understanding. You need 70% to pass. You can retake the quiz anytime.
            </p>
            <div className="quiz-container">
              {module.quiz.map((q, i) => (
                <QuizItem
                  key={i}
                  question={q}
                  index={i}
                  selected={quizState[i]}
                  submitted={quizSubmitted}
                  onSelect={(idx) => setQuizState((prev) => ({ ...prev, [i]: idx }))}
                />
              ))}
              {quizSubmitted && (
                <div className="quiz-score">
                  <span className={`score-text ${quizPassed ? "score-passed" : "score-failed"}`}>
                    {quizPassed ? "✅ " : "❌ "}Score: {quizScore}% ({quizPassed ? "Passed" : "Try again"})
                  </span>
                  <div className="quiz-actions">
                    <button className="learn-btn" onClick={() => { setQuizSubmitted(false); setQuizState({}); }}>
                      Retry
                    </button>
                  </div>
                </div>
              )}
              {!quizSubmitted && (
                <button
                  className="learn-btn is-primary"
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizState).length < module.quiz.length}
                  style={{ opacity: Object.keys(quizState).length < module.quiz.length ? 0.5 : 1, marginTop: "1rem" }}
                >
                  Submit Quiz →
                </button>
              )}
            </div>
          </div>

          <div className="learn-section-block">
            <div className="labnote-prompt">
              <p className="label">📝 Lab Note Prompt</p>
              <p>{module.labNotePrompt}</p>
              <textarea
                className="labnote-textarea"
                value={labNoteText}
                onChange={(e) => setLabNoteText(e.target.value)}
                placeholder="Write your lab note in English here..."
              />
              <button
                className="learn-btn is-primary"
                onClick={handleSaveLabNote}
                style={{ marginTop: "0.6rem" }}
                disabled={!labNoteText.trim()}
              >
                Save Lab Note
              </button>
            </div>
          </div>

          <div className="learn-section-block">
            <h2>📚 Additional Resources</h2>
            <ul className="resources-list">
              {module.resources.map((res, i) => (
                <li key={i}>
                  <a href={res.url} target="_blank" rel="noopener noreferrer">
                    → {res.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            {!isModuleDone ? (
              <button className="learn-btn is-primary" onClick={handleCompleteModule} style={{ fontSize: "1rem", padding: "0.8rem 1.5rem" }}>
                ✓ Mark Module as Complete
              </button>
            ) : (
              <p className="text-secondary" style={{ fontWeight: 800 }}>
                ✅ You&apos;ve completed this module!
              </p>
            )}
          </div>

          <div className="module-nav">
            {prevModule ? (
              <Link href={`/learn/js/${prevModule.id}`} className="learn-btn">
                ← {prevModule.title}
              </Link>
            ) : (
              <Link href="/learn/js" className="learn-btn">← Track Overview</Link>
            )}
            {nextModule && (
              <Link href={`/learn/js/${nextModule.id}`} className="learn-btn is-primary">
                {nextModule.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function QuizItem({ question, index, selected, submitted, onSelect }: {
  question: QuizQuestion;
  index: number;
  selected?: number;
  submitted: boolean;
  onSelect: (idx: number) => void;
}) {
  const letters = ["A", "B", "C", "D"];
  return (
    <div className="quiz-question">
      <h4>{index + 1}. {question.question}</h4>
      <div className="quiz-options">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          let cls = "quiz-option";
          if (submitted) {
            if (isCorrect) cls += " is-correct";
            else if (isSelected) cls += " is-wrong";
          } else if (isSelected) {
            cls += " is-selected";
          }
          return (
            <button key={i} className={cls} onClick={() => !submitted && onSelect(i)}>
              <span className="option-letter">{letters[i]}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {submitted && (
        <div className={`quiz-feedback ${selected === question.correctIndex ? "is-correct" : "is-wrong"}`}>
          {selected === question.correctIndex ? "✅ Correct! " : "❌ Not quite. "}
          {question.explanation}
        </div>
      )}
    </div>
  );
}

function InterviewItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`interview-item ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)}>
      <p className="question">
        {question}
        <span className="toggle">{open ? " ▲" : " ▼"}</span>
      </p>
      <p className="answer">{answer}</p>
    </div>
  );
}
