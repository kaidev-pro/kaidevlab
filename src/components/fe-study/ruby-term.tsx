"use client";

import React from "react";
import { openKanjiLookup } from "@/lib/fe-kanji-lookup-store";

interface RubyTermProps {
  rubyText?: string;
  fallbackText: string;
  showFurigana?: boolean;
  enableLookup?: boolean;
  context?: "dokkai" | "tango" | "fe" | "auto";
  className?: string;
  rtClassName?: string;
}

/**
 * Parses bracket ruby syntax like: "ディジタル[署名:しょめい]"
 * into native typographic HTML <ruby> and <rt> tags.
 *
 * - Non-kanji terms (e.g. "SQLインジェクション") render as clean plain text.
 * - Kanji terms render with native ruby furigana centered precisely over the kanji.
 * - When showFurigana is false, the furigana is hidden cleanly without layout shifting.
 * - Tap / click any kanji compound to trigger the instant Kanji Lookup Popover.
 */
export function RubyTerm({
  rubyText,
  fallbackText,
  showFurigana = true,
  enableLookup = true,
  context = "auto",
  className = "",
  rtClassName = "",
}: RubyTermProps) {
  const text = rubyText || fallbackText;

  if (!text || !text.includes("[") || !text.includes(":")) {
    return <span className={className}>{text}</span>;
  }

  const regex = /\[([^:\]]+):([^\]]+)\]/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Preceding plain text (Katakana, Romaji, punctuation, or spaces)
    if (match.index > lastIndex) {
      nodes.push(
        <span key={`plain-${lastIndex}`}>
          {text.slice(lastIndex, match.index)}
        </span>
      );
    }

    const kanji = match[1];
    const furigana = match[2];

    nodes.push(
      <ruby
        key={`ruby-${match.index}`}
        onClick={
          enableLookup
            ? (e) => {
                e.stopPropagation();
                openKanjiLookup(kanji, furigana, context);
              }
            : undefined
        }
        className={`ruby-term mx-[0.5px] ${
          enableLookup
            ? "cursor-pointer border-b border-dashed border-[var(--brand-primary)]/40 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all rounded-xs px-0.5 active:scale-95"
            : ""
        }`}
        title={enableLookup ? `${kanji} (${furigana}) · Ketuk untuk melihat arti` : undefined}
      >
        {kanji}
        {showFurigana && (
          <rt
            className={`text-[0.48em] leading-none font-normal tracking-tight text-[var(--brand-primary)] select-none pointer-events-none ${rtClassName}`}
            style={{ rubyPosition: "over" }}
          >
            {furigana}
          </rt>
        )}
      </ruby>
    );

    lastIndex = regex.lastIndex;
  }

  // Trailing plain text
  if (lastIndex < text.length) {
    nodes.push(
      <span key={`plain-${lastIndex}`}>{text.slice(lastIndex)}</span>
    );
  }

  return <span className={className ? className : "inline leading-relaxed"}>{nodes}</span>;
}
