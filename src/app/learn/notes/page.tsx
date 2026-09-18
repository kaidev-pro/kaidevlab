"use client";

import { useProgress } from "@/lib/progress/use-progress";
import Link from "next/link";

export default function LabNotesPage() {
  const { progress, mounted, deleteLabNote } = useProgress();

  if (!mounted) return <p className="text-secondary">Loading...</p>;

  return (
    <>
      <Link href="/learn" className="learn-back">
        Back to Dashboard
      </Link>

      <div className="learn-page-header">
        <div>
          <p className="eyebrow">Learning Journal</p>
          <h1 className="learn-page-title">Lab Notes</h1>
        </div>
        <Link href="/learn/notes/new" className="learn-btn is-primary">
          New Note
        </Link>
      </div>

      {progress.labNotes.length === 0 ? (
        <div className="empty-state">
          <h3>No lab notes yet</h3>
          <p>Start writing your learning journal in English. Every note you write helps you practice technical writing — a key skill for remote jobs.</p>
          <Link href="/learn/notes/new" className="learn-btn is-primary learn-empty-action">
            Write your first note
          </Link>
        </div>
      ) : (
        <div className="labnotes-grid">
          {progress.labNotes.map((note) => (
            <div key={note.id} className="labnote-card">
              <p className="note-track">{note.track}</p>
              <h3>{note.title}</h3>
              <p className="note-excerpt">{note.content}</p>
              <p className="note-date">{new Date(note.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
              <div className="labnote-actions">
                <Link href={`/learn/notes/view?id=${note.id}`} className="learn-btn">Read</Link>
                <button className="learn-btn is-danger" onClick={() => deleteLabNote(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
