"use client";
import { useRef, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import type { BunpouQuestion } from "@/data/bunpou-n3/types";
import type { DokkaiQuestion } from "@/data/dokkai-n3/types";
import type { FocusQuestionAnswer } from "@/lib/study-focus";
import type { StudyCopy } from "./study-copy";
import { RubyTerm } from "@/components/fe-study/ruby-term";
const FocusRuby=({text}:{text:string})=><RubyTerm rubyText={text} fallbackText={text} enableLookup={false}/>;

export function FocusQuestion({question,answer,onAnswer,c}:{question:BunpouQuestion|DokkaiQuestion;answer?:FocusQuestionAnswer;onAnswer:(answer:FocusQuestionAnswer)=>boolean;c:StudyCopy}) {
  const [choice,setChoice]=useState("");const [order,setOrder]=useState<number[]>([]);
  const submitted=useRef(false);
  const sorting="type" in question&&question.type==="seiretsu";
  const items=sorting?question.items||[]:[];
  const selected=answer?.choice||choice;
  const checked=Boolean(answer);
  const submittedOrder=answer?.order||order;
  const check=()=>{
    if(checked||submitted.current)return;
    if(sorting){if(order.length!==items.length)return;submitted.current=true;if(!onAnswer({order,correct:JSON.stringify(order)===JSON.stringify(question.correctOrder)}))submitted.current=false;}
    else{if(!choice)return;submitted.current=true;const correct="correctKey" in question?question.correctKey===choice:question.options?.find(item=>item.key===choice&&"isCorrect" in item&&item.isCorrect)!==undefined;if(!onAnswer({choice,correct}))submitted.current=false;}
  };
  const explanation="explanation" in question?question.explanation:question.options.find(option=>option.key===selected)?.explanation||question.techniqueTip;
  return <section className="focus-question"><span className="study-eyebrow">{c.questions} · {question.questionNumber}</span><h3 lang="ja">{"questionRuby" in question&&question.questionRuby?<FocusRuby text={question.questionRuby}/>:question.questionJp}</h3><details className="focus-translation"><summary>{c.translate}</summary><p>{question.questionTranslation}</p></details>
  {sorting?<><p className="focus-sort-hint">{c.chooseOrder}</p><div className="focus-sort-result" aria-live="polite">{submittedOrder.length?submittedOrder.map((index,slot)=><span key={slot}>{items[index]}</span>):<span>1 · 2 · ★ · 4</span>}</div><div className="focus-sort-pool">{items.map((item,index)=><button key={index} disabled={checked||order.includes(index)} onClick={()=>setOrder([...order,index])} lang="ja">{item}</button>)}</div>{!checked&&order.length>0&&<button className="study-text-button" onClick={()=>setOrder([])}><RotateCcw size={14}/>{c.clear}</button>}</>
  :<div className="focus-options" role="group" aria-label={question.questionJp}>{question.options?.map(option=><button key={option.key} aria-pressed={selected===option.key} disabled={checked} onClick={()=>setChoice(option.key)}><span>{option.key}</span><span lang="ja">{option.textJp}</span>{selected===option.key&&<Check size={17}/>}</button>)}</div>}
  {!checked?<button className="study-outline-button" disabled={sorting?order.length!==items.length:!choice} onClick={check}>{c.check}</button>:<div className={`focus-answer-feedback ${answer?.correct?"is-correct":"is-incorrect"}`} role="status"><strong>{answer?.correct?c.correct:c.incorrect}</strong><p>{explanation}</p></div>}
  </section>;
}
