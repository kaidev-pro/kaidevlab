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
        <Link href="/learn/notes" className="learn-back">
          Back to Lab Notes
        </Link>
        <div className="empty-state">
          <h3>Note Saved</h3>
          <p>Your lab note has been saved. Keep writing in English to practice your technical writing skills.</p>
          <Link href="/learn/notes" className="learn-btn is-primary learn-empty-action">
            View all notes
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Link href="/learn/notes" className="learn-back">
        Back to Lab Notes
      </Link>

      <p className="eyebrow">New Lab Note</p>
      <h1 className="learn-page-title">Write a Note</h1>

      <div className="labnote-form labnote-form-wide">
        <p className="text-secondary labnote-hint">
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
            className="labnote-textarea-lg"
            placeholder="Write your note in English here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="learn-btn is-primary"
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
          >
            Save Note
          </button>
        </div>
      </div>
    </>
  );
}
