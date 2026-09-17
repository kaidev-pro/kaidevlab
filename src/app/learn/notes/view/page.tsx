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
        <Link href="/learn/notes" className="text-secondary" style={{ fontSize: "0.85rem", fontWeight: 700, display: "inline-block", marginBottom: "1rem" }}>
          ← Back to Lab Notes
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
      <Link href="/learn/notes" className="text-secondary" style={{ fontSize: "0.85rem", fontWeight: 700, display: "inline-block", marginBottom: "1rem" }}>
        ← Back to Lab Notes
      </Link>

      <p className="note-track" style={{ color: "var(--interface-blue)", fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {note.track}
      </p>
      <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "0.5rem" }}>{note.title}</h1>
      <p className="text-secondary" style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "2rem" }}>
        {new Date(note.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div style={{ maxWidth: "700px" }}>
        {note.content.split("\n").map((line, i) => (
          <p key={i} className="text-secondary" style={{ lineHeight: 1.72, fontSize: "0.98rem", marginBottom: "0.8rem" }}>
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
