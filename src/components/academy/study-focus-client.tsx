"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Target, Check, BookOpen, RotateCcw, LogOut } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { FocusSession, FocusRating, FocusTrack, loadFocusSession, saveFocusSession, commitFocusAnswer, isFocusTrack, isSessionAvailable } from "@/lib/study-focus";
import { getFocusCatalog, getFocusUnlockedGroups, planFocusSession, recordFocusCard } from "@/lib/study-focus-data";
import { StudyBrand } from "./study-shell";
import { studyCopy, TRACK_LABELS } from "./study-copy";
import { FocusExercise } from "./focus-exercise";

export function StudyFocusClient(){
  const {locale}=useLanguage(),c=studyCopy(locale);
  const [session,setSession]=useState<FocusSession|null>(null),[warning,setWarning]=useState(false),[error,setError]=useState(false),[proposed,setProposed]=useState<FocusTrack|null>(null);
  const currentRef=useRef<FocusSession|null>(null);
  const progressPersisted=useRef(true);
  const update=useCallback((next:FocusSession,saved=true)=>{currentRef.current=next;setSession(next);if(!saved){progressPersisted.current=false;setWarning(true);}if(progressPersisted.current&&!saveFocusSession(next))setWarning(true);},[]);
  useEffect(()=>{
    try{
      const params=new URLSearchParams(window.location.search);const requested=params.get("track");const track=isFocusTrack(requested)?requested:"tango";
      const saved=loadFocusSession();
      if(saved&&!saved.completed&&isSessionAvailable(saved,getFocusCatalog(saved.track),getFocusUnlockedGroups(saved.track))){currentRef.current=saved;setSession(saved);if(saved.track!==track&&!params.has("resume"))setProposed(track);}
      else update(planFocusSession(track));
    }catch{setError(true);}
  },[update]);
  const rate=(expectedId:string,rating:FocusRating)=>{
    const active=currentRef.current;if(!active||active.completed)return;
    const id=active.itemIds[active.cursor];
    if(id!==expectedId)return;
    const saved=active.track==="tango"||active.track==="fe"?recordFocusCard(active.track,id,rating):true;
    update(commitFocusAnswer(active,id,rating),saved);
  };
  const newSession=(track:FocusTrack)=>{setProposed(null);update(planFocusSession(track));};
  const remembered=session?.results.filter(item=>item.rating==="mastered").length||0;
  const reviewed=(session?.results.length||0)-remembered;
  return <div className="study-surface study-focus-surface"><header className="focus-toolbar"><StudyBrand/><span className="study-eyebrow"><Target size={15}/>{c.session}</span><a className="study-outline-button" href="/learn/"><LogOut size={16}/>{c.exit}</a></header><main className="focus-main">
    {warning&&<p className="focus-storage-warning" role="status">{c.storage}</p>}
    {error?<section className="study-panel focus-empty"><h1>{c.error}</h1><a className="study-primary" href="/learn/">{c.back}</a></section>:!session?<p className="focus-loading" role="status">{c.loading}</p>:proposed?<section className="study-panel focus-empty"><span className="study-eyebrow">{c.resume}</span><h1>{TRACK_LABELS[session.track]}</h1><p>{c.saved} · {session.cursor} / {session.itemIds.length} {c.answered}</p><button className="study-primary" onClick={()=>setProposed(null)}>{c.resume}</button><a className="study-text-link" href="/learn/">{c.back}</a><hr/><p>{locale==="id"?"Mulai jalur lain akan mengganti posisi sesi ini. Jawaban yang sudah masuk ke progres tetap tersimpan.":locale==="ja"?"別コースを開始すると学習位置は置き換わります。回答済みの進捗は保存されます。":"Starting another track replaces this session's position. Your recorded learning progress is kept."}</p><button className="study-outline-button" onClick={()=>newSession(proposed)}>{c.start} · {TRACK_LABELS[proposed]}</button></section>:!session.itemIds.length?<section className="study-panel focus-empty"><Check className="focus-summary-icon" size={38}/><h1>{c.empty}</h1><p>{c.emptySub}</p><a className="study-primary" href="/learn/">{c.back}</a><a className="study-text-link" href={`/tools/${session.track==="fe"?"fe-study":`${session.track}-n3`}/`}>{c.full}</a></section>:session.completed?<section className="focus-summary study-panel"><span className="focus-done-icon"><Check size={28}/></span><span className="study-eyebrow">{TRACK_LABELS[session.track]}</span><h1>{c.done}</h1><p>{c.summary}</p><div className="focus-summary-stats"><div><strong>{session.results.length}</strong><span>{c.answered}</span></div><div><strong>{remembered}</strong><span>{c.remember}</span></div><div><strong>{reviewed}</strong><span>{c.queue}</span></div></div>{reviewed>0&&<div className="focus-summary-review"><RotateCcw size={18}/><span>{reviewed} {c.queue}</span></div>}<div className="focus-summary-actions"><a className="study-primary" href="/learn/">{c.stop}</a><button className="study-outline-button" onClick={()=>newSession(session.track)}>{c.again}</button></div></section>:<>
      <div className="focus-heading"><div><span className="study-eyebrow">{c.focus}</span><h1>{TRACK_LABELS[session.track]}</h1></div><span className="focus-counter" aria-live="polite">{session.cursor+1}<small> / {session.itemIds.length}</small></span></div><div className="focus-session-progress" role="progressbar" aria-label={c.session} aria-valuemin={0} aria-valuemax={session.itemIds.length} aria-valuenow={session.cursor}><span style={{width:`${session.cursor/session.itemIds.length*100}%`}}/></div>
      <FocusExercise key={`${session.startedAt}-${session.itemIds[session.cursor]}`} session={session} c={c} onRate={rating=>rate(session.itemIds[session.cursor],rating)} onUpdate={update}/><p className="focus-saving-note"><BookOpen size={14}/>{warning?c.storage:c.saved}</p>
    </>}
  </main></div>;
}
