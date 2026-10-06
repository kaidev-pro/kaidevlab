"use client";
import { useRef, useState } from "react";
import { Volume2, RotateCcw, Check, HelpCircle } from "lucide-react";
import type { TangoN3Card } from "@/data/tango-n3-data";
import type { FECard } from "@/data/fe-study-data";
import type { FocusRating } from "@/lib/study-focus";
import { useJapaneseTts } from "@/lib/use-japanese-tts";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import type { StudyCopy } from "./study-copy";
import "./focus-flashcard.css";

export function FocusFlashcard({ tango, fe, c, onRate }: {
  tango?: TangoN3Card; fe?: FECard; c: StudyCopy; onRate: (rating: FocusRating) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { speak, stop, isSpeaking } = useJapaneseTts();
  const word = tango?.word || fe?.termJp || "";
  const id = tango?.id || fe?.id || "";
  const flip = () => { stop(); setRevealed(value => !value); ref.current?.focus(); };
  const rate = (rating: FocusRating) => { stop(); onRate(rating); };
  return <>
    <article ref={ref} className={`focus-flashcard focus-flip-card ${revealed ? "is-revealed" : ""}`} role="group" aria-label={`${c.flashcard}: ${word}`} tabIndex={0} onKeyDown={event => {
      if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); flip(); }
    }} onClick={event => {
      if ((event.target as HTMLElement).closest("button,summary,a,input") || window.getSelection()?.toString()) return;
      flip();
    }}>
      <div className="focus-card-turn">
        <div className="focus-card-face focus-card-front" aria-hidden={revealed} inert={revealed}>
          <button className="focus-card-tap" onClick={flip} aria-label={`${c.flip}: ${word}`}>
            <span className="focus-card-topline"><span>{tango ? "N3 TANGO" : "FE IT"}</span><span>{c.flashcard}</span></span>
            <span className="focus-card-word" lang="ja">{word}</span>
            <span className="focus-card-hint"><RotateCcw size={16} />{c.tapFlip}<small>Enter / Space</small></span>
          </button>
        </div>
        <div className="focus-card-face focus-card-back" aria-hidden={!revealed} inert={!revealed}>
          <div className="focus-card-topline"><span>{c.answer}</span><button className="study-text-button" onClick={flip}><RotateCcw size={14} />{c.wordSide}</button></div>
          <div className="focus-card-meaning"><span lang="ja">{tango?.reading || fe?.furigana}</span><h2>{tango?.meaningId || fe?.termEn}</h2></div>
          {tango ? <div className="focus-example"><p lang="ja"><RubyTerm rubyText={tango.exampleSentence.jpRuby} fallbackText={tango.exampleSentence.jpRuby} enableLookup={false} /></p><p>{tango.exampleSentence.meaningId}</p>{tango.usageNote && <p>{tango.usageNote}</p>}</div>
            : <div className="focus-example"><p>{fe?.definitionId}</p><p><strong>{fe?.keyDifferentiator}</strong></p><details><summary>{c.examples}</summary><p>{fe?.analogy}</p></details></div>}
          <button className="study-text-button focus-card-audio" onClick={() => isSpeaking ? stop() : speak(word, id)}><Volume2 size={17} />{isSpeaking ? c.stop : c.pronounce}</button>
        </div>
      </div>
    </article>
    {!revealed ? <button className="study-primary focus-reveal" onClick={flip}><RotateCcw size={19} />{c.flip}</button>
      : <><p className="focus-rating-prompt">{c.rateRecall}</p><div className="focus-rating"><button onClick={() => rate("forgot")}><RotateCcw size={20} />{c.forgot}</button><button onClick={() => rate("unsure")}><HelpCircle size={20} />{c.unsure}</button><button onClick={() => rate("mastered")}><Check size={20} />{c.remember}</button></div></>}
  </>;
}
