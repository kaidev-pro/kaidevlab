"use client";

import { Check } from "lucide-react";
import { TANGO_N3_CARDS } from "@/data/tango-n3-data";
import { FE_CARDS } from "@/data/fe-study-data";
import { BUNPOU_ITEMS } from "@/data/bunpou-n3/grammar-items";
import { DOKKAI_PASSAGES } from "@/data/dokkai-n3/passages";
import { recordFocusQuestion } from "@/lib/study-focus-data";
import { FocusFlashcard } from "./focus-flashcard";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { FocusSession, FocusRating, FocusQuestionAnswer, commitFocusQuestion } from "@/lib/study-focus";
import type { StudyCopy } from "./study-copy";
import { FocusQuestion } from "./focus-questions";
const FocusRuby=({text}:{text:string})=><RubyTerm rubyText={text} fallbackText={text} enableLookup={false}/>;

export function FocusExercise({session,c,onRate,onUpdate}:{session:FocusSession;c:StudyCopy;onRate:(rating:FocusRating)=>void;onUpdate:(session:FocusSession,saved?:boolean)=>void}) {

  const id=session.itemIds[session.cursor];
  if(session.track==="tango"||session.track==="fe"){
    const tango=session.track==="tango"?TANGO_N3_CARDS.find(item=>item.id===id):null;
    const fe=session.track==="fe"?FE_CARDS.find(item=>item.id===id):null;
    return <FocusFlashcard tango={tango||undefined} fe={fe||undefined} c={c} onRate={onRate}/>;
  }
  const pattern=session.track==="bunpou"?BUNPOU_ITEMS.find(item=>item.id===id):null;
  const passage=session.track==="dokkai"?DOKKAI_PASSAGES.find(item=>item.id===id):null;
  const questions=pattern?.questions||passage?.questions||[];
  const allAnswered=questions.length>0&&questions.every(question=>session.answers?.[question.id]);
  const recordAnswer=(questionId:string,answer:FocusQuestionAnswer)=>{
    if(session.answers?.[questionId])return true;
    const complete=questions.every(question=>question.id===questionId||session.answers?.[question.id]);
    const saved=recordFocusQuestion(session.track as "bunpou"|"dokkai",id,questionId,answer,complete);
    onUpdate(commitFocusQuestion(session,questionId,answer),saved);
    return true;
  };
  return <><article className="focus-reading study-panel">{pattern?<><span className="study-eyebrow">BUNPOU · {pattern.chapterTitle}</span><h2 lang="ja">{pattern.patternJp}</h2><p className="focus-meaning">{pattern.meaningId}</p><section className="focus-rule"><span className="study-eyebrow">{c.connection}</span><p lang="ja">{pattern.connection}</p></section><p>{pattern.coreConcept}</p><h3>{c.examples}</h3>{pattern.examples.slice(0,2).map(example=><div className="focus-example" key={example.id}><p lang="ja"><FocusRuby text={example.ruby}/></p><details className="focus-translation"><summary>{c.translate}</summary><p>{example.textId}</p></details></div>)}</>:passage?<><span className="study-eyebrow">DOKKAI · {passage.categoryLabel}</span><h2 lang="ja">{passage.titleJp}</h2><div className="focus-passage" lang="ja">{passage.sentences.map(sentence=><p key={sentence.id}><FocusRuby text={sentence.ruby||sentence.textJp}/></p>)}</div><details className="focus-translation"><summary>{c.translate}</summary><p>{passage.passageTranslation}</p></details></>:null}</article>
  <div className="focus-question-list">{questions.map(question=><FocusQuestion key={question.id} question={question} answer={session.answers?.[question.id]} c={c} onAnswer={answer=>recordAnswer(question.id,answer)}/>)}</div><button className="study-primary focus-reveal" disabled={!allAnswered} onClick={()=>onRate(questions.every(question=>session.answers?.[question.id]?.correct)?"mastered":"forgot")}><Check size={18}/>{c.next}</button></>;
}
