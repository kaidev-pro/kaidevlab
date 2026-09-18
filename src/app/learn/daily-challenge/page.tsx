"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress/use-progress";
import { dailyChallenges } from "@/lib/challenges/daily-challenges";
import Link from "next/link";

export default function DailyChallengePage() {
  const { progress, mounted, completeDailyChallenge } = useProgress();
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  if (!mounted) return <p className="text-secondary">Loading...</p>;

  const completedCount = progress.dailyChallengesCompleted.length;
  const todayIdx = completedCount < dailyChallenges.length ? completedCount : 0;
  const challenge = dailyChallenges[todayIdx];
  const isCompleted = progress.dailyChallengesCompleted.includes(challenge.id);

  return (
    <>
      <Link href="/learn" className="learn-back">
        Back to Dashboard
      </Link>

      <div className="challenge-box">
        <p className="challenge-day">Day {challenge.day} — {challenge.difficulty}</p>
        <h2>{challenge.title}</h2>
        <p className="challenge-desc">{challenge.description}</p>

        <div className="challenge-streak">
          Daily streak: {progress.dailyStreak} days — Solved: {progress.dailyChallengesCompleted.length}/{dailyChallenges.length}
        </div>

        {!isCompleted ? (
          <>
            <div className="code-block">
              <span className="code-label">starter</span>
              <pre><code>{challenge.starterCode}</code></pre>
            </div>

            <div className="practice-actions">
              <button className="learn-btn" onClick={() => setShowHint(!showHint)}>
                Hint
              </button>
              <button className="learn-btn" onClick={() => setShowSolution(!showSolution)}>
                {showSolution ? "Hide Solution" : "Show Solution"}
              </button>
            </div>

            {showHint && (
              <div className="practice-hint is-visible">
                {challenge.hint}
              </div>
            )}

            {showSolution && (
              <div className="code-block challenge-solution-block">
                <span className="code-label">solution</span>
                <pre><code>{challenge.solution}</code></pre>
              </div>
            )}

            <div className="challenge-actions">
              <button
                className="learn-btn is-primary"
                onClick={() => completeDailyChallenge(challenge.id)}
              >
                Mark as Solved
              </button>
            </div>
          </>
        ) : (
          <p className="challenge-solved-text">
            You solved today&apos;s challenge. Come back tomorrow for the next one.
          </p>
        )}
      </div>

      <div className="learn-section">
        <p className="eyebrow">All Challenges</p>
        <h2 className="learn-section-title">Challenge history</h2>
        <div className="module-list">
          {dailyChallenges.map((ch, i) => {
            const done = progress.dailyChallengesCompleted.includes(ch.id);
            const isToday = i === todayIdx;
            const status = done ? "is-done" : isToday ? "is-active" : "is-locked";
            const statusIcon = done ? "Done" : isToday ? "Now" : String(i + 1).padStart(2, "0");
            return (
              <div key={ch.id} className={`module-item ${status} is-static`}>
                <div className={`module-status ${status}`}>{statusIcon}</div>
                <div className="module-info">
                  <h3>Day {ch.day}: {ch.title}</h3>
                  <div className="module-meta">
                    <span>{ch.difficulty}</span>
                    <span>{ch.relatedModule}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
