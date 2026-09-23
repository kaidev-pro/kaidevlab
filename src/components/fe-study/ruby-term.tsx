"use client";

import React from "react";

interface RubyTermProps {
  rubyText?: string;
  fallbackText: string;
  showFurigana?: boolean;
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
 */
export function RubyTerm({
  rubyText,
  fallbackText,
  showFurigana = true,
  className = "",
  rtClassName = "",
}: RubyTermProps) {
  const text = rubyText || fallbackText;

  if (!text || !text.includes("[") || !text.includes(":")) {
    return <span className={className}>{text}</span>;
  }

  const regex = /\[([^:]+):([^\]]+)\]/g;
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
      <ruby key={`ruby-${match.index}`} className="ruby-term mx-[1px]">
        {kanji}
        <rt
          className={`text-[0.44em] leading-none font-normal tracking-tight text-[var(--brand-primary)] select-none transition-opacity duration-200 ${
            showFurigana ? "opacity-100" : "opacity-0"
          } ${rtClassName}`}
          style={{ rubyPosition: "over" }}
        >
          {furigana}
        </rt>
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

  return <span className={`inline-block leading-relaxed ${className}`}>{nodes}</span>;
}
