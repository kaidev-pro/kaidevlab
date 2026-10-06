"use client";
import { useEffect, useId, useRef, useState } from "react";
import { BookOpen, Code2, BarChart3, Grid2X2, House, Search, Moon, Sun, MoreHorizontal, X, Link2, CreditCard, Library } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { openCommandPalette, openSyncModal } from "@/lib/global-modals-store";
import { studyCopy } from "./study-copy";
import "./study.css";
import { STUDY_TOOL_ROUTES, type StudyRoute } from "@/lib/study-routes";

export function StudyDialog({title,onClose,children}:{title:string;onClose:()=>void;children:React.ReactNode}) {
  const ref = useRef<HTMLDialogElement>(null); const titleId = useId();
  const {locale}=useLanguage(); const c=studyCopy(locale);
  useEffect(()=>{const dialog=ref.current;dialog?.showModal();return()=>dialog?.close();},[]);
  return <dialog className="study-dialog" ref={ref} aria-labelledby={titleId} onCancel={onClose} onClick={event=>{if(event.target===event.currentTarget){const rect=event.currentTarget.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)onClose();}}}>
    <div className="study-dialog-heading"><h2 id={titleId}>{title}</h2><button className="study-icon-button" onClick={onClose} aria-label={c.close}><X size={20}/></button></div>{children}
  </dialog>;
}
export function StudyBrand() {
  return (
    <a className="study-brand" href="/learn/" aria-label="Kaidevlab Study">
      <img
        className="study-brand-light"
        src="/brand/kaidevlab-study-logo-light.webp"
        width={1914}
        height={412}
        alt="Kaidevlab Study"
      />
      <img
        className="study-brand-dark"
        src="/brand/kaidevlab-study-logo-dark.webp"
        width={1914}
        height={412}
        alt="Kaidevlab Study"
      />
    </a>
  );
}
export function StudyShell({children,userName,onProfile,route}:{children:React.ReactNode;userName:string;onProfile:()=>void;route?:StudyRoute}) {
  const {locale,setLocale,locales}=useLanguage(); const c=studyCopy(locale);
  const [dark,setDark]=useState(false),[more,setMore]=useState(false);
  useEffect(()=>{setDark(document.documentElement.dataset.theme==="dark");},[]);
  const toggleTheme=()=>{const next=!dark;setDark(next);document.documentElement.dataset.theme=next?"dark":"light";try{localStorage.setItem("theme",next?"dark":"light");}catch{}};
  const progressHref=route?"/learn/#study-progress":"#study-progress", toolsHref=route?"/learn/#study-tools":"#study-tools";
  return <div className={`study-surface ${route?"study-module-surface":"study-dashboard-surface"}`}>
    <a className="study-skip" href="#study-main">{c.study}</a>
    <aside className="study-sidebar"><StudyBrand/><span className="study-eyebrow">KAIDEVLAB / STUDY</span><nav aria-label={c.study}>
      <a className={!route?"is-active":""} aria-current={!route?"page":undefined} href="/learn/"><House size={20}/>{c.home}</a><a className={route?.group==="n3"?"is-active":""} href="/tools/n3-suite/"><BookOpen size={20}/>N3 Suite <span className="study-mini-tag">JLPT</span></a>{route?.group==="n3"&&<div className="study-subnav">{STUDY_TOOL_ROUTES.filter(item=>item.group==="n3"&&item.href!=="/tools/n3-suite/").map(item=><a key={item.href} href={item.href} aria-current={item.href===route.href?"page":undefined}>{item.label.replace("N3 ","")}</a>)}</div>}<a className={route?.group==="fe"?"is-active":""} aria-current={route?.group==="fe"?"page":undefined} href="/tools/fe-study/"><Code2 size={20}/>FE Study</a><a className={route?.group==="tools"?"is-active":""} aria-current={route?.group==="tools"?"page":undefined} href="/tools/library/"><Library size={20}/>Library</a><a href={progressHref}><BarChart3 size={20}/>{c.progress}</a><a href={toolsHref}><Grid2X2 size={20}/>{c.tools}</a>
    </nav><div className="study-sidebar-bottom"><p className="study-sidebar-note">{c.focus}<br/>{c.small}</p><a className="study-text-link" href="https://kaidevlab.com/">Kaidevlab Lab</a><button className="study-profile-button" onClick={onProfile}><span className="study-avatar">{userName.slice(0,1).toUpperCase()}</span><span><strong>{userName}</strong><small>KAI-PASS</small></span></button></div></aside>
    <div className="study-workspace"><header className="study-toolbar"><div className="study-mobile-brand"><StudyBrand/></div><div className="study-breadcrumb"><a href="/learn/">Kaidevlab Study</a><span>/</span><strong>{route?.label||c.home}</strong></div><div className="study-toolbar-actions"><button className="study-search-button" onClick={openCommandPalette} aria-label={c.search}><Search size={18}/><span>{c.search}</span><kbd>Ctrl K</kbd></button><div className="study-languages" role="group" aria-label="Language">{locales.map(item=><button key={item.code} onClick={()=>setLocale(item.code)} aria-pressed={locale===item.code}>{item.code.toUpperCase()}</button>)}</div><button className="study-icon-button" aria-label={c.theme} onClick={toggleTheme}>{dark?<Sun size={20}/>:<Moon size={20}/>}</button><button className="study-avatar study-top-avatar" onClick={onProfile} aria-label={c.profile}>{userName.slice(0,1).toUpperCase()}</button></div></header>{children}</div>
    <nav className="study-mobile-nav" aria-label="Study navigation"><a href="/learn/" className={!route?"is-active":""}><House size={20}/>{c.home}</a><a href={route?route.href:"#study-tracks"} className={route?"is-active":""}><BookOpen size={20}/>{c.study}</a><a href={progressHref}><BarChart3 size={20}/>{c.progress}</a><button onClick={()=>setMore(true)}><MoreHorizontal size={20}/>{c.more}</button></nav>
    {more&&<StudyDialog title={c.more} onClose={()=>setMore(false)}>{route&&<nav className="study-more-modules" aria-label={c.tracks}>{STUDY_TOOL_ROUTES.map(item=><a key={item.href} href={item.href} aria-current={item.href===route.href?"page":undefined}>{item.label}</a>)}</nav>}<div className="study-more-links"><a href={toolsHref} onClick={()=>setMore(false)}><Grid2X2 size={18}/>{c.tools}</a><button onClick={()=>{setMore(false);openCommandPalette();}}><Search size={18}/>{c.search}</button><button onClick={()=>{setMore(false);openSyncModal();}}><Link2 size={18}/>{c.sync}</button><button onClick={()=>{setMore(false);onProfile();}}><CreditCard size={18}/>{c.profile}</button></div><div className="study-languages" role="group" aria-label="Language">{locales.map(item=><button key={item.code} onClick={()=>setLocale(item.code)} aria-pressed={locale===item.code}>{item.label}</button>)}</div></StudyDialog>}
  </div>;
}
