"use client";

import { useProgress } from "@/lib/progress/use-progress";
import { getTrackById } from "@/lib/curriculum/tracks";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

export default function TrackContent({ params }: { params: Promise<{ trackId: string }> }) {
  const { progress, mounted, isModuleUnlocked } = useProgress();

  const resolved = use(params);
  const trackId = resolved.trackId;
  const track = getTrackById(trackId);

  if (!track) return notFound();
  if (track.status === "coming-soon") {
    return (
      <div className="empty-state">
        <h3>Coming Soon</h3>
        <p>The {track.title} track is not available yet.</p>
        <Link href="/learn" className="learn-btn" style={{ marginTop: "1rem" }}>
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!mounted) return <p className="text-secondary">Loading...</p>;

  const completedCount = track.modules.filter((m) => progress.completedModules.includes(m.id)).length;
  const trackPercent = track.modules.length > 0 ? Math.round((completedCount / track.modules.length) * 100) : 0;

  return (
    <>
      {/* Breadcrumb */}
      <Link href="/learn" className="text-secondary" style={{ fontSize: "0.85rem", fontWeight: 700, display: "inline-block", marginBottom: "1rem" }}>
        ← Back to Dashboard
      </Link>

      {/* Track Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="track-icon" style={{ background: track.color, marginBottom: "1rem" }}>
          {track.icon}
        </div>
        <p className="eyebrow">{track.subtitle}</p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{track.title} Track</h1>
        <p className="lead text-secondary" style={{ marginTop: "0.5rem" }}>{track.description}</p>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="track-progress-row" style={{ marginBottom: "0.5rem" }}>
          <div className="progress-bar-wrap">
            <div className={`progress-bar-fill ${trackPercent === 100 ? "is-complete" : ""}`} style={{ width: `${trackPercent}%` }} />
          </div>
          <span>{completedCount}/{track.modules.length} modules · {trackPercent}%</span>
        </div>
      </div>

      {/* Module List */}
      <div className="module-list">
        {track.modules.map((module, index) => {
          const isDone = progress.completedModules.includes(module.id);
          const isUnlocked = isModuleUnlocked(module.prerequisites);
          const isActive = !isDone && isUnlocked;
          const status = isDone ? "is-done" : isUnlocked ? "is-active" : "is-locked";
          const statusIcon = isDone ? "✓" : isUnlocked ? `${index + 1}` : "🔒";

          return (
            <Link
              key={module.id}
              href={isUnlocked ? `/learn/js/${module.id}` : "#"}
              className={`module-item ${status}`}
            >
              <div className={`module-status ${status}`}>{statusIcon}</div>
              <div className="module-info">
                <h3>Module {index + 1}: {module.title}</h3>
                <div className="module-meta">
                  <span>⏱ {module.estimatedTime}</span>
                  <span>📖 {module.lessons.length} lessons</span>
                  <span>⭐ {module.difficulty}</span>
                  {isDone && progress.quizScores[module.id] !== undefined && (
                    <span>Quiz: {progress.quizScores[module.id]}%</span>
                  )}
                </div>
              </div>
              {isUnlocked && <span className="module-arrow">→</span>}
            </Link>
          );
        })}
      </div>
    </>
  );
}
