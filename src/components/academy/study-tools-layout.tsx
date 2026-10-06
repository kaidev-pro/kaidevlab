"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getStudyRoute } from "@/lib/study-routes";
import { loadTangoProgress } from "@/lib/tango-n3-storage";
import { loadStudyProgress } from "@/lib/fe-study-storage";
import { loadBunpouProgress } from "@/components/bunpou-n3/bunpou-storage";
import { loadDokkaiProgress } from "@/components/dokkai-n3/dokkai-storage";
import { useLanguage } from "@/lib/i18n/context";
import { FeCandidateIdCard } from "@/components/fe-study/fe-candidate-id-card";
import { StudyShell, StudyDialog } from "./study-shell";
import { studyCopy } from "./study-copy";
import "./study-modules.css";

export function StudyToolsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const route = getStudyRoute(pathname);
  const { locale } = useLanguage();
  const [user, setUser] = useState("Kai");
  const [candidateId, setCandidateId] = useState("KAI-PASS");
  const [profile, setProfile] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    try {
      setUser(localStorage.getItem("kaidevlab_candidate_name") || "Kai");
      setCandidateId(localStorage.getItem("kaidevlab_cadet_id") || "KAI-PASS");
    } catch {}
    setProfile(false);
  }, [pathname]);
  if (!route) return children;
  const openProfile = () => {
    setScore(loadTangoProgress().masteredCardIds.length + loadStudyProgress().masteredCardIds.length + loadBunpouProgress().studiedPatternIds.length + loadDokkaiProgress().completedPassageIds.length);
    setProfile(true);
  };
  return <StudyShell route={route} userName={user} onProfile={openProfile}>
    <div id="study-main" data-module={route.href.split("/")[2]} className={`study-module-content study-module-${route.group}`} tabIndex={-1}>{children}</div>
    {profile && <StudyDialog title={studyCopy(locale).profile} onClose={() => setProfile(false)}><FeCandidateIdCard candidateName={user} candidateId={candidateId} examMode="hub" score={score} total={2128} percentage={Math.round(score / 2128 * 100)} isPassed={false} onNameChange={name => { setUser(name); try { localStorage.setItem("kaidevlab_candidate_name", name); } catch {} }} /></StudyDialog>}
  </StudyShell>;
}
