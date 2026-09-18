"use client";

import { useState, useMemo } from "react";
import { glossaryTerms } from "@/lib/glossary/terms";
import type { GlossaryTerm } from "@/lib/curriculum/types";
import Link from "next/link";

export default function GlossaryPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return glossaryTerms
      .filter((t) => t.term.toLowerCase().includes(lower) || t.definitionEn.toLowerCase().includes(lower))
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [search]);

  const grouped = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    }
    return groups;
  }, [filtered]);

  return (
    <>
      <Link href="/learn" className="learn-back">
        Back to Dashboard
      </Link>

      <p className="eyebrow">Dev Glossary</p>
      <h1 className="learn-page-title">Developer Dictionary</h1>
      <p className="lead text-secondary glossary-intro">
        Every technical term you need to know. English definition first, Indonesian translation for understanding.
      </p>

      <input
        type="text"
        className="glossary-search"
        placeholder="Search terms..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No results</h3>
          <p>No terms match &quot;{search}&quot;. Try a different search.</p>
        </div>
      ) : (
        <div className="glossary-list">
          {Object.entries(grouped).map(([letter, terms]) => (
            <div key={letter}>
              <h2 className="glossary-letter">{letter}</h2>
              {terms.map((t) => (
                <div key={t.term} className="glossary-item">
                  <span className="term">{t.term}<span className="term-cat">{t.category}</span></span>
                  <p className="def-en">{t.definitionEn}</p>
                  <p className="def-id">{t.definitionId}</p>
                  {t.example && <p className="example">Example: {t.example}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
