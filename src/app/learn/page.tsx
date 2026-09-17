"use client";

import { useProgress } from "@/lib/progress/use-progress";
import { tracks, getAllModules, getTotalLessons } from "@/lib/curriculum/tracks";
import { badges } from "@/lib/badges/badge-system";
import Link from "next/link";

export default function LearnDashboard() {
  const { progress, mounted, overallProgress } = useProgress();

  if (!mounted) {
    return <div className="learn-hero"><p className="text-secondary">Loading...</p></div>;
  }

  const allModules = getAllModules();
  const totalModules = allModules.length;
  const completedModules = progress.completedModules.length;
  const totalLessons = getTotalLessons();
  const completedLessons = progress.completedLessons.length;
  const jsTrack = tracks[0];
  const jsModules = jsTrack.modules;
  const jsCompleted = jsModules.filter((m) => progress.completedModules.includes(m.id)).length;

  // Find next incomplete module
  const nextModule = jsModules.find((m) => !progress.completedModules.includes(m.id));

  // Recent lab notes
  const recentNotes = progress.labNotes.slice(0, 3);

  // Roadmap progress
  const roadmapNodes = [
    { label: "Start", status: "done", icon: "✓" },
    { label: "JS Basics", status: jsCompleted >= 4 ? "done" : jsCompleted > 0 ? "active" : "pending", icon: jsCompleted >= 4 ? "✓" : "JS" },
    { label: "Full JS", status: jsCompleted === 8 ? "done" : jsCompleted >= 5 ? "active" : "pending", icon: jsCompleted === 8 ? "✓" : "⚡" },
    { label: "Remote Ready", status: "pending", icon: "🚀" },
  ];

  return (
    <>
      {/* Hero */}
      <div className="learn-hero">
        <p className="eyebrow">Kai&apos;s Learning Hub</p>
        <h1>From beginner to remote-ready web developer.</h1>
        <p className="lead text-secondary">
          A structured, self-paced curriculum covering JavaScript fundamentals, technical English, and interview prep — designed to get you job-ready.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="learn-overview">
        <div className="learn-stat-card">
          <span className="stat-label">Overall Progress</span>
          <span className="stat-value">{overallProgress}%</span>
          <span className="stat-sub">{completedModules} of {totalModules} modules</span>
        </div>
        <div className="learn-stat-card">
          <span className="stat-label">Lessons Done</span>
          <span className="stat-value">{completedLessons}</span>
          <span className="stat-sub">of {totalLessons} lessons</span>
        </div>
        <div className="learn-stat-card">
          <span className="stat-label">Study Streak</span>
          <span className="stat-value">{progress.streak} days</span>
          <span className="stat-sub">Keep it going!</span>
        </div>
        <div className="learn-stat-card">
          <span className="stat-label">Badges Earned</span>
          <span className="stat-value">{progress.earnedBadges.length}</span>
          <span className="stat-sub">of {badges.length} available</span>
        </div>
      </div>

      {/* Continue Learning */}
      {nextModule && (
        <div className="learn-continue">
          <div className="learn-continue-info">
            <span className="label">Continue Learning</span>
            <h3>{nextModule.title}</h3>
            <p className="text-secondary" style={{ fontSize: "0.88rem" }}>
              {nextModule.subtitle} · {nextModule.estimatedTime} · {nextModule.lessons.length} lessons
            </p>
          </div>
          <Link href={`/learn/js/${nextModule.id}`} className="learn-continue-cta">
            Continue →
          </Link>
        </div>
      )}

      {/* Career Roadmap */}
      <div className="learn-roadmap">
        <p className="eyebrow">Your Career Path</p>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: "0.5rem" }}>
          The road to remote web developer
        </h2>
        <div className="roadmap-track">
          <div className="roadmap-line" />
          {roadmapNodes.map((node, i) => (
            <div key={i} className={`roadmap-node ${node.status === "done" ? "is-done" : node.status === "active" ? "is-active" : ""}`}>
              <div className="roadmap-dot">{node.icon}</div>
              <h4>{node.label}</h4>
              <span>{node.status === "done" ? "Completed" : node.status === "active" ? "In Progress" : "Upcoming"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Tracks */}
      <div>
        <p className="eyebrow">Learning Tracks</p>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: "1rem" }}>
          Choose your path
        </h2>
        <div className="learn-tracks">
          {tracks.map((track) => {
            const trackCompleted = track.modules.filter((m) => progress.completedModules.includes(m.id)).length;
            const trackPercent = track.modules.length > 0 ? Math.round((trackCompleted / track.modules.length) * 100) : 0;
            const isLocked = track.status === "coming-soon";
            const link = isLocked ? "#" : `/learn/${track.id}`;

            return (
              <Link key={track.id} href={link} className={`track-card ${isLocked ? "is-locked" : ""}`}>
                <div className="track-icon" style={{ background: track.color }}>
                  {track.icon}
                </div>
                <h3>{track.title}</h3>
                <p className="track-subtitle">{track.subtitle}</p>
                <p className="track-desc">{track.description}</p>
                {track.status === "active" ? (
                  <div className="track-progress-row">
                    <div className="progress-bar-wrap">
                      <div className={`progress-bar-fill ${trackPercent === 100 ? "is-complete" : ""}`} style={{ width: `${trackPercent}%` }} />
                    </div>
                    <span>{trackCompleted}/{track.modules.length} modules</span>
                  </div>
                ) : (
                  <div className="track-progress-row">
                    <span style={{ color: "var(--text-secondary)" }}>Coming soon</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Lab Notes */}
      {recentNotes.length > 0 && (
        <div style={{ marginTop: "2.5rem" }}>
          <p className="eyebrow">Recent Lab Notes</p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: "1rem" }}>
            Your learning journal
          </h2>
          <div className="labnotes-grid">
            {recentNotes.map((note) => (
              <Link key={note.id} href={`/learn/notes/${note.id}`} className="labnote-card">
                <p className="note-track">{note.track}</p>
                <h3>{note.title}</h3>
                <p className="note-excerpt">{note.content.slice(0, 100)}{note.content.length > 100 ? "..." : ""}</p>
                <p className="note-date">{new Date(note.createdAt).toLocaleDateString()}</p>
              </Link>
            ))}
          </div>
          <Link href="/learn/notes" className="learn-btn" style={{ marginTop: "1rem" }}>
            View all notes →
          </Link>
        </div>
      )}

      {/* Badges */}
      <div style={{ marginTop: "2.5rem" }}>
        <p className="eyebrow">Achievements</p>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: "1rem" }}>
          Badges earned
        </h2>
        <div className="badges-grid">
          {badges.map((badge) => {
            const earned = progress.earnedBadges.includes(badge.id);
            return (
              <div key={badge.id} className={`badge-item ${earned ? "" : "is-locked"}`}>
                <span className="badge-icon">{badge.icon}</span>
                <span>{badge.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
