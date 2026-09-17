"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress/use-progress";
import { tracks } from "@/lib/curriculum/tracks";
import Link from "next/link";

export default function NewLabNotePage() {
  const { addLabNote } = useProgress();
  const [title, setTitle] = useState("");
  const [track, setTrack] = useState("javascript");
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    addLabNote({
      id: `note-${Date.now()}`,
      title: title.trim(),
      track,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    });
    setSaved(true);
  };

  if (saved) {
    return (
      <>
        <Link href="/learn/notes" className="text-secondary" style={{ fontSize: "0.85rem", fontWeight: 700, display: "inline-block", marginBottom: "1rem" }}>
          ← Back to Lab Notes
        </Link>
        <div className="empty-state">
          <h3>✅ Note Saved!</h3>
          <p>Your lab note has been saved. Keep writing in English to practice your technical writing skills.</p>
          <Link href="/learn/notes" className="learn-btn is-primary" style={{ marginTop: "1rem" }}>
            View all notes →
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Link href="/learn/notes" className="text-secondary" style={{ fontSize: "0.85rem", fontWeight: 700, display: "inline-block", marginBottom: "1rem" }}>
        ← Back to Lab Notes
      </Link>

      <p className="eyebrow">New Lab Note</p>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "2rem" }}>Write a Note</h1>

      <div className="labnote-prompt" style={{ maxWidth: "700px" }}>
        <p className="text-secondary" style={{ fontSize: "0.88rem", marginBottom: "1rem" }}>
          Write in English to practice your technical writing. Even short notes help — 3-5 sentences is enough.
        </p>

        <div className="labnote-form">
          <input
            type="text"
            placeholder="Note title (e.g., 'Understanding async/await')"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select value={track} onChange={(e) => setTrack(e.target.value)}>
            {tracks.map((t) => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
          <textarea
            placeholder="Write your note in English here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ minHeight: "200px" }}
          />
          <button
            className="learn-btn is-primary"
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            style={{ opacity: !title.trim() || !content.trim() ? 0.5 : 1 }}
          >
            Save Note
          </button>
        </div>
      </div>
    </>
  );
}
