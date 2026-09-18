"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useProgress } from "@/lib/progress/use-progress";
import Link from "next/link";

function NoteDetailContent() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");
  const { progress, mounted } = useProgress();

  if (!mounted) return <p className="text-secondary">Loading...</p>;

  const note = progress.labNotes.find((n) => n.id === noteId);

  if (!note) {
    return (
      <>
        <Link href="/learn/notes" className="learn-back">
          Back to Lab Notes
        </Link>
        <div className="empty-state">
          <h3>Note not found</h3>
          <p>This note may have been deleted.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Link href="/learn/notes" className="learn-back">
        Back to Lab Notes
      </Link>

      <p className="note-track">{note.track}</p>
      <h1 className="note-view-title">{note.title}</h1>
      <p className="note-view-date">
        {new Date(note.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="note-view-content">
        {note.content.split("\n").map((line, i) => (
          <p key={i} className="text-secondary note-view-line">
            {line || "\u00A0"}
          </p>
        ))}
      </div>
    </>
  );
}

export default function LabNoteViewPage() {
  return (
    <Suspense fallback={<p className="text-secondary">Loading...</p>}>
      <NoteDetailContent />
    </Suspense>
  );
}
