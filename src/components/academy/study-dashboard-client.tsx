"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  Code2,
  FileText,
  Target,
  Flame,
  Play,
  Clock,
  ChevronRight,
  CreditCard,
  Link2,
  Layers,
  Monitor,
  Bookmark,
  Grid2X2,
  Sparkles,
  Languages,
  Terminal,
  Check,
  Lock,
  Zap,
  Award,
  Trophy,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { loadTangoProgress } from "@/lib/tango-n3-storage";
import { loadStudyProgress } from "@/lib/fe-study-storage";
import { loadBunpouProgress } from "@/components/bunpou-n3/bunpou-storage";
import { loadDokkaiProgress } from "@/components/dokkai-n3/dokkai-storage";
import { loadUnifiedActivityHistory, getTodayDateStr } from "@/lib/unified-study-storage";
import {
  FOCUS_LIMITS,
  FocusTrack,
  FocusSession,
  loadFocusSession,
  getExerciseReviewIds,
} from "@/lib/study-focus";
import { BUNPOU_ITEMS } from "@/data/bunpou-n3/grammar-items";
import { DOKKAI_PASSAGES } from "@/data/dokkai-n3/passages";
import { TANGO_TOTAL_CARDS, FE_TOTAL_CARDS } from "@/data/learn-stats";
import { openSyncModal } from "@/lib/global-modals-store";
import { FeCandidateIdCard } from "@/components/fe-study/fe-candidate-id-card";
import { AuthOnboardingModal } from "@/components/auth/auth-onboarding-modal";
import { getStoredAuth, pullStudyProgress } from "@/lib/auth-sync-client";
import { N3_DAILY_JOURNEY_DAYS, N3JourneyDay } from "@/data/tango-n3/n3-daily-journey";
import { loadN3JourneyProgress, N3JourneyProgress } from "@/lib/n3-journey-storage";
import { N3DailyJourneyRunner } from "@/components/tango-n3/n3-daily-journey-runner";
import { FE_DAILY_QUESTS, FEDailyQuest } from "@/data/fe-daily-quest";
import { loadFEQuestProgress, FEQuestProgress } from "@/lib/fe-quest-storage";
import { FEDailyQuestRunner } from "@/components/fe-study/fe-daily-quest-runner";
import { StudyShell, StudyDialog } from "./study-shell";
import { studyCopy, TRACK_LABELS } from "./study-copy";

type TrackStat = { count: number; total: number; review: number };
export type StudyHub = "n3" | "fe";

const initialStats: Record<FocusTrack, TrackStat> = {
  tango: { count: 0, total: TANGO_TOTAL_CARDS, review: 0 },
  bunpou: { count: 0, total: 116, review: 0 },
  dokkai: { count: 0, total: 13, review: 0 },
  fe: { count: 0, total: FE_TOTAL_CARDS, review: 0 },
};

const modulePaths = {
  tango: "tango-n3",
  bunpou: "bunpou-n3",
  dokkai: "dokkai-n3",
  fe: "fe-study",
};

const icons = {
  tango: BookOpen,
  bunpou: BookOpen,
  dokkai: FileText,
  fe: Code2,
};

export function StudyDashboardClient() {
  const { locale } = useLanguage();
  const c = studyCopy(locale);

  const [activeHub, setActiveHub] = useState<StudyHub>("n3");
  const [stats, setStats] = useState(initialStats);
  const [session, setSession] = useState<FocusSession | null>(null);
  const [selected, setSelected] = useState<FocusTrack>("tango");
  const [user, setUser] = useState("Kai");
  const [cadetId, setCadetId] = useState("KAI-PASS");
  const [profile, setProfile] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register" | "profile">("register");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const [days, setDays] = useState<{ date: string; count: number }[]>([]);
  const [streak, setStreak] = useState(0);

  // N3 Integrated Daily Journey state
  const [journeyProgress, setJourneyProgress] = useState<N3JourneyProgress>({
    currentDay: 1,
    completedDays: [],
    dayScores: {},
    weaknessVocabIds: [],
    lastStudiedDate: "",
  });
  const [activeJourneyDay, setActiveJourneyDay] = useState<N3JourneyDay | null>(null);
  const [journeyModalOpen, setJourneyModalOpen] = useState(false);
  const [syllabusModalOpen, setSyllabusModalOpen] = useState(false);

  // FE Daily Quest state
  const [feQuestProgress, setFeQuestProgress] = useState<FEQuestProgress>({
    currentDay: 1,
    completedDays: [],
    dayScores: {},
    weaknessCardIds: [],
    lastStudiedDate: "",
  });
  const [activeFEQuest, setActiveFEQuest] = useState<FEDailyQuest | null>(null);
  const [feQuestModalOpen, setFeQuestModalOpen] = useState(false);
  const [feSyllabusModalOpen, setFeSyllabusModalOpen] = useState(false);

  const refresh = useCallback(() => {
    const t = loadTangoProgress();
    const f = loadStudyProgress();
    const b = loadBunpouProgress();
    const d = loadDokkaiProgress();
    const today = getTodayDateStr();

    setJourneyProgress(loadN3JourneyProgress());
    setFeQuestProgress(loadFEQuestProgress());

    const dueTango = new Set(
      [...t.reviewCardIds, ...t.starredCardIds]
        .filter((id) => !t.cardNextReview[id] || t.cardNextReview[id] <= today)
        .concat(Object.entries(t.cardNextReview).filter(([, date]) => date <= today).map(([id]) => id))
    );

    setStats({
      tango: {
        count: t.masteredCardIds.length,
        total: TANGO_TOTAL_CARDS,
        review: dueTango.size,
      },
      bunpou: {
        count: b.studiedPatternIds.length,
        total: 116,
        review: getExerciseReviewIds(BUNPOU_ITEMS, b.answeredQuestions, b.bookmarkedPatternIds).length,
      },
      dokkai: {
        count: d.completedPassageIds.length,
        total: 13,
        review: getExerciseReviewIds(DOKKAI_PASSAGES, d.answeredQuestions, d.bookmarkedPassageIds).length,
      },
      fe: {
        count: f.masteredCardIds.length,
        total: FE_TOTAL_CARDS,
        review: new Set([...f.reviewCardIds, ...f.starredCardIds]).size,
      },
    });

    setSession(loadFocusSession());

    const history = loadUnifiedActivityHistory();
    const recent = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}`;
      recent.push({
        date: key,
        count:
          history[key]?.total ??
          ((t.dailyReviews?.[key] || 0) + (f.dailyReviews?.[key] || 0)),
      });
    }
    setDays(recent);

    const cursor = new Date();
    let currentStreak = 0;
    const activity = (key: string) =>
      history[key]?.total ??
      ((t.dailyReviews?.[key] || 0) + (f.dailyReviews?.[key] || 0));
    const dateKey = () =>
      `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(
        cursor.getDate()
      ).padStart(2, "0")}`;

    if (!activity(dateKey())) cursor.setDate(cursor.getDate() - 1);
    while (activity(dateKey()) > 0 && currentStreak < 36500) {
      currentStreak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    setStreak(currentStreak);

    try {
      const auth = getStoredAuth();
      if (auth.isLoggedIn && auth.user) {
        setIsLoggedIn(true);
        setUser(auth.user.name);
        setCadetId(auth.user.cadetId);
      } else {
        setIsLoggedIn(false);
        setUser(localStorage.getItem("kaidevlab_candidate_name") || "Kai");
        let id = localStorage.getItem("kaidevlab_cadet_id");
        if (!id) {
          id = `KAI-PASS-${Math.floor(1000 + Math.random() * 9000)}`;
          localStorage.setItem("kaidevlab_cadet_id", id);
        }
        setCadetId(id);
      }

      // Check URL query param or localStorage for active hub
      const urlParams =
        typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const paramHub = urlParams?.get("hub");
      if (paramHub === "fe" || paramHub === "n3") {
        setActiveHub(paramHub);
        if (paramHub === "fe") setSelected("fe");
      } else {
        const savedHub = localStorage.getItem("kaidevlab_study_active_hub");
        if (savedHub === "fe" || savedHub === "n3") {
          setActiveHub(savedHub);
          if (savedHub === "fe") setSelected("fe");
        }
      }
    } catch {}

    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
    // Pull latest cloud study progress on mount if user is logged in
    if (getStoredAuth().isLoggedIn) {
      pullStudyProgress().then(() => {
        refresh();
      });
    }

    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("kaidevlab:study_activity_recorded", refresh);
    window.addEventListener("kaidevlab:auth_change", refresh);
    window.addEventListener("kaidevlab:sync_status", refresh);
    window.addEventListener("kaidevlab:n3_journey_updated", refresh);
    window.addEventListener("kaidevlab:fe_quest_updated", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("kaidevlab:study_activity_recorded", refresh);
      window.removeEventListener("kaidevlab:auth_change", refresh);
      window.removeEventListener("kaidevlab:sync_status", refresh);
      window.removeEventListener("kaidevlab:n3_journey_updated", refresh);
      window.removeEventListener("kaidevlab:fe_quest_updated", refresh);
    };
  }, [refresh]);

  const switchHub = (hub: StudyHub) => {
    setActiveHub(hub);
    if (hub === "n3" && selected === "fe") {
      setSelected("tango");
    } else if (hub === "fe") {
      setSelected("fe");
    }
    try {
      localStorage.setItem("kaidevlab_study_active_hub", hub);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("hub", hub);
        window.history.replaceState({}, "", url.toString());
      }
    } catch {}
  };

  const n3Tracks: FocusTrack[] = ["tango", "bunpou", "dokkai"];
  const feTracks: FocusTrack[] = ["fe"];
  const currentTracks = activeHub === "n3" ? n3Tracks : feTracks;

  const unfinished = session && !session.completed;
  const primaryTrack = unfinished ? session.track : selected;
  const units = {
    tango: c.words,
    bunpou: c.patterns,
    dokkai: c.passages,
    fe: c.concepts,
  };

  // Dedicated Mastered count and total per Hub
  const hubMastered =
    activeHub === "n3"
      ? stats.tango.count + stats.bunpou.count + stats.dokkai.count
      : stats.fe.count;
  const hubTotal =
    activeHub === "n3"
      ? stats.tango.total + stats.bunpou.total + stats.dokkai.total
      : stats.fe.total;

  const n3Tools = [
    {
      name: "Flashcard SRS",
      desc:
        locale === "id"
          ? "Sistem antrean Quizlet (Hafal vs Belum)"
          : "Quizlet-style spaced repetition queue",
      path: "tango-n3/?tab=flashcards",
      icon: Layers,
    },
    {
      name: "Bunpou Quiz",
      desc:
        locale === "id"
          ? "Latihan partikel & susun bintang Shin Kanzen"
          : "Particles & sentence ordering practice",
      path: "bunpou-n3/?tab=quiz",
      icon: BookOpen,
    },
    {
      name: "Dokkai Reader",
      desc:
        locale === "id"
          ? "Bacaan Shin Kanzen dengan furigana interaktif"
          : "Shin Kanzen reading with furigana",
      path: "dokkai-n3/",
      icon: FileText,
    },
    {
      name: "N3 Suite Hub",
      desc:
        locale === "id"
          ? "Portal terpadu Tango, Dokkai, dan Bunpou"
          : "All-in-one JLPT N3 learning suite",
      path: "n3-suite/",
      icon: Grid2X2,
    },
  ];

  const feTools = [
    {
      name: "Kakomon CBT Simulator",
      desc:
        locale === "id"
          ? "Simulasi ujian FE format CBT resmi IPA Japan"
          : "Official IPA Japan CBT exam simulation",
      path: "fe-study/?tab=quiz",
      icon: Monitor,
    },
    {
      name: "Pseudocode Tracer",
      desc:
        locale === "id"
          ? "Telusuri eksekusi algoritma 科目B interaktif"
          : "Interactive 科目B algorithm tracer",
      path: "fe-study/?tab=tracer",
      icon: Code2,
    },
    {
      name: "Flashcard SRS Konsep IT",
      desc:
        locale === "id"
          ? "Review istilah teknologi & analogi Kitami-shiki"
          : "IT concepts flashcards & Kitami analogies",
      path: "fe-study/?tab=flashcards",
      icon: Layers,
    },
    {
      name: locale === "id" ? "Catatan Salah" : "Mistakes Log",
      desc:
        locale === "id"
          ? "Pelajari kembali soal CBT yang pernah salah"
          : "Revisit past incorrect exam questions",
      path: "fe-study/?tab=mistakes",
      icon: Bookmark,
    },
  ];

  const currentTools = activeHub === "n3" ? n3Tools : feTools;

  const currentJourneyDayNumber = journeyProgress.currentDay || 1;
  const currentJourneyDayData =
    N3_DAILY_JOURNEY_DAYS.find((d) => d.day === currentJourneyDayNumber) ||
    N3_DAILY_JOURNEY_DAYS[0];

  const currentFEQuestNumber = feQuestProgress.currentDay || 1;
  const currentFEQuestData =
    FE_DAILY_QUESTS.find((q) => q.day === currentFEQuestNumber) ||
    FE_DAILY_QUESTS[0];

  return (
    <StudyShell userName={user} onProfile={() => setProfile(true)}>
      <main id="study-main" className="study-main">
        {/* Welcome Section */}
        <section className="study-welcome">
          <div>
            <span className="study-eyebrow">{c.eyebrow}</span>
            <h1>
              {c.welcome}, <em>{user}.</em>
            </h1>
            <p>{c.greeting}</p>
          </div>
          <div className="study-welcome-meta">
            <span>
              {ready
                ? new Intl.DateTimeFormat(locale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date())
                : "…"}
            </span>
            <div className="study-inline-actions">
              {isLoggedIn ? (
                <button
                  type="button"
                  className="study-cloud-sync-pill"
                  onClick={() => {
                    setAuthModalTab("profile");
                    setAuthModalOpen(true);
                  }}
                  title="Profil Kadet & Cloud Sync Aktif"
                >
                  <span className="study-cloud-dot" />
                  <strong>{user}</strong>
                  <small>Synced</small>
                </button>
              ) : (
                <button
                  type="button"
                  className="study-login-cta-button"
                  onClick={() => {
                    setAuthModalTab("register");
                    setAuthModalOpen(true);
                  }}
                  title="Daftar Akun / Masuk untuk Sinkronisasi Lintas Perangkat"
                >
                  <Sparkles size={14} />
                  <span>Masuk / Daftar</span>
                </button>
              )}
              <button
                className="study-icon-button"
                onClick={() => setProfile(true)}
                aria-label={c.profile}
                title="Buka Kartu Ujian (KAI-PASS)"
              >
                <CreditCard size={19} />
              </button>
              <button
                className="study-icon-button"
                onClick={() => {
                  if (isLoggedIn) {
                    setAuthModalTab("profile");
                    setAuthModalOpen(true);
                  } else {
                    openSyncModal();
                  }
                }}
                aria-label={c.sync}
                title="Sinkronisasi Perangkat"
              >
                <Link2 size={19} />
              </button>
            </div>
          </div>
        </section>

        {/* Guest Multi-Device Sync Banner (if not logged in) */}
        {!isLoggedIn && (
          <div className="study-guest-sync-banner">
            <div className="study-guest-banner-icon">
              <Sparkles size={20} />
            </div>
            <div className="study-guest-banner-body">
              <strong>Simpan & Sinkronkan Progres Lintas Perangkat</strong>
              <p>
                Belajar di smartphone dan lanjutkan di laptop tanpa kehilangan kartu yang telah dihafal, streak harian, dan skor CBT.
              </p>
            </div>
            <div className="study-guest-banner-actions">
              <button
                type="button"
                className="study-guest-banner-primary"
                onClick={() => {
                  setAuthModalTab("register");
                  setAuthModalOpen(true);
                }}
              >
                Buat Akun Kadet
              </button>
              <button
                type="button"
                className="study-guest-banner-secondary"
                onClick={() => {
                  setAuthModalTab("login");
                  setAuthModalOpen(true);
                }}
              >
                Sudah Punya Akun? Masuk
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DEDICATED TRACK HUB SWITCHER (Option 1: JLPT N3 vs FE Exam) */}
        {/* ========================================================= */}
        <div className="study-hub-switcher" role="tablist" aria-label="Pilih Jalur Belajar">
          <button
            type="button"
            role="tab"
            aria-selected={activeHub === "n3"}
            className={`study-hub-btn ${activeHub === "n3" ? "is-active" : ""}`}
            onClick={() => switchHub("n3")}
          >
            <span className="study-hub-icon-box is-n3" aria-hidden="true">
              <Languages size={20} strokeWidth={2.2} />
            </span>
            <div className="study-hub-btn-content">
              <strong>JLPT N3 Suite</strong>
              <small>
                {locale === "id"
                  ? "Tango · Bunpou · Dokkai (1.929 Materi)"
                  : "Vocabulary, Grammar & Reading (1,929 Items)"}
              </small>
            </div>
            {activeHub === "n3" && (
              <span className="study-hub-active-badge">
                {locale === "id" ? "Aktif" : "Active"}
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeHub === "fe"}
            className={`study-hub-btn ${activeHub === "fe" ? "is-active" : ""}`}
            onClick={() => switchHub("fe")}
          >
            <span className="study-hub-icon-box is-fe" aria-hidden="true">
              <Terminal size={20} strokeWidth={2.2} />
            </span>
            <div className="study-hub-btn-content">
              <strong>FE Exam Academy</strong>
              <small>
                {locale === "id"
                  ? "IPA Japan · CBT Kakomon · Tracer (60 Konsep)"
                  : "IPA Japan · CBT Kakomon · Tracer (60 Concepts)"}
              </small>
            </div>
            {activeHub === "fe" && (
              <span className="study-hub-active-badge">
                {locale === "id" ? "Aktif" : "Active"}
              </span>
            )}
          </button>
        </div>

        {/* ========================================================= */}
        {/* N3 INTEGRATED DAILY JOURNEY HERO CARD (If activeHub === 'n3') */}
        {/* ========================================================= */}
        {activeHub === "n3" && (
          <div className="study-journey-hero">
            <div className="study-journey-top">
              <span className="study-journey-tag">
                <Sparkles size={14} />
                <span>N3 Daily Journey · Day {currentJourneyDayData.day}</span>
              </span>
              <div className="study-journey-pills">
                <span className="study-journey-pill inline-flex items-center gap-1.5">
                  <Zap size={11} className="text-amber-500 fill-amber-500" />
                  <span>25 Menit</span>
                </span>
                <span className="study-journey-pill">15 Tango</span>
                <span className="study-journey-pill">2 Bunpou</span>
                <span className="study-journey-pill">4 Kuis</span>
                <span className="study-journey-pill">1 Dokkai</span>
              </div>
            </div>

            <div className="study-journey-body">
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--study-blue)", fontFamily: "monospace", letterSpacing: "0.04em" }}>
                {currentJourneyDayData.themeTag}
              </span>
              <h3>{currentJourneyDayData.titleId}</h3>
              <p>{currentJourneyDayData.desc}</p>
            </div>

            {/* Track Progress Mini Bar */}
            <div className="mt-4 pt-3 border-t border-[var(--study-line)]/60 max-w-lg">
              <div className="flex items-center justify-between text-[11px] font-bold text-[var(--study-muted)] mb-1.5">
                <span>Progres Silabus 30 Hari</span>
                <span className="font-mono text-[var(--study-text)]">
                  {journeyProgress.completedDays.length}/30 Hari ({Math.round((journeyProgress.completedDays.length / 30) * 100)}%)
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[var(--study-soft)] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(4, (journeyProgress.completedDays.length / 30) * 100)}%` }}
                />
              </div>
            </div>

            <div className="study-journey-actions">
              <button
                type="button"
                className="study-journey-btn-primary"
                onClick={() => {
                  setActiveJourneyDay(currentJourneyDayData);
                  setJourneyModalOpen(true);
                }}
              >
                <Play size={16} fill="currentColor" />
                <span>Mulai Belajar Day {currentJourneyDayData.day}</span>
              </button>

              <button
                type="button"
                className="study-journey-btn-secondary"
                onClick={() => setSyllabusModalOpen(true)}
              >
                <BookOpen size={15} />
                <span>Silabus 30 Hari</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* FE INTEGRATED DAILY QUEST HERO CARD (If activeHub === 'fe') */}
        {/* ========================================================= */}
        {activeHub === "fe" && (
          <div className="study-journey-hero" style={{ borderColor: "rgba(37, 99, 235, 0.35)", background: "radial-gradient(130% 130% at 0% 0%, rgba(37, 99, 235, 0.12) 0%, rgba(16, 185, 129, 0.05) 55%, transparent 100%), var(--study-paper)" }}>
            <div className="study-journey-top">
              <span className="study-journey-tag" style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}>
                <Sparkles size={14} />
                <span>FE Daily Quest · Day {currentFEQuestData.day}</span>
              </span>
              <div className="study-journey-pills">
                <span className="study-journey-pill inline-flex items-center gap-1.5">
                  <Zap size={11} className="text-amber-500 fill-amber-500" />
                  <span>20 Menit</span>
                </span>
                <span className="study-journey-pill">{currentFEQuestData.cardIds.length} Konsep IT</span>
                <span className="study-journey-pill">1 Tracer Lab</span>
                <span className="study-journey-pill">{currentFEQuestData.quizQuestionIds.length} CBT Kakomon</span>
              </div>
            </div>

            <div className="study-journey-body">
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#2563eb", fontFamily: "monospace", letterSpacing: "0.04em" }}>
                {currentFEQuestData.themeTag}
              </span>
              <h3>{currentFEQuestData.titleId}</h3>
              <p>{currentFEQuestData.descriptionId}</p>
            </div>

            {/* Track Progress Mini Bar */}
            <div className="mt-4 pt-3 border-t border-[var(--study-line)]/60 max-w-lg">
              <div className="flex items-center justify-between text-[11px] font-bold text-[var(--study-muted)] mb-1.5">
                <span>Progres Sprint 7 Hari</span>
                <span className="font-mono text-[var(--study-text)]">
                  {feQuestProgress.completedDays.length}/{FE_DAILY_QUESTS.length} Hari ({Math.round((feQuestProgress.completedDays.length / FE_DAILY_QUESTS.length) * 100)}%)
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[var(--study-soft)] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(4, (feQuestProgress.completedDays.length / FE_DAILY_QUESTS.length) * 100)}%` }}
                />
              </div>
            </div>

            <div className="study-journey-actions">
              <button
                type="button"
                className="study-journey-btn-primary"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
                onClick={() => {
                  setActiveFEQuest(currentFEQuestData);
                  setFeQuestModalOpen(true);
                }}
              >
                <Play size={16} fill="currentColor" />
                <span>Mulai Quest Day {currentFEQuestData.day}</span>
              </button>

              <button
                type="button"
                className="study-journey-btn-secondary"
                onClick={() => setFeSyllabusModalOpen(true)}
              >
                <BookOpen size={15} />
                <span>Silabus FE Sprint</span>
              </button>
            </div>
          </div>
        )}

        {/* Daily Mission & Progress Grid */}
        <div className="study-daily-grid">
          {/* Mission Panel */}
          <section className="study-mission study-panel">
            <div className="study-panel-title">
              <span className={`study-subject-icon ${activeHub === "n3" ? "tango" : "fe"}`}>
                <Target size={23} />
              </span>
              <div>
                <span className="study-eyebrow">
                  {activeHub === "n3" ? "JLPT N3 ACADEMY" : "IPA JAPAN IT EXAM"}
                </span>
                <h2>
                  {activeHub === "n3"
                    ? locale === "id"
                      ? "Misi Belajar N3 Hari Ini"
                      : "Today's N3 Mission"
                    : locale === "id"
                    ? "Misi Belajar FE Exam Hari Ini"
                    : "Today's FE Exam Mission"}
                </h2>
              </div>
              <span className="study-review-badge">{c.review}</span>
            </div>

            <div className="study-recommended">
              <div>
                <span className="study-eyebrow">{unfinished ? c.resume : c.target}</span>
                <h3>{TRACK_LABELS[primaryTrack]}</h3>
                <p>
                  {unfinished
                    ? c.saved
                    : activeHub === "n3"
                    ? "Satu sesi kecil untuk menguasai kanji, tata bahasa & teks."
                    : "Latihan konsep dasar & soal ujian standar IPA Japan."}
                </p>
              </div>
              <span className="study-goal-number">
                {unfinished
                  ? session.itemIds.length - session.cursor
                  : FOCUS_LIMITS[primaryTrack]}
                <small>{units[primaryTrack]}</small>
              </span>
            </div>

            <a
              className="study-primary"
              aria-disabled={!ready}
              href={
                ready
                  ? `/learn/focus/?track=${primaryTrack}${unfinished ? "&resume=1" : ""}`
                  : undefined
              }
            >
              <Play size={16} />
              {unfinished ? c.resume : c.start}
            </a>

            <div className="study-mission-meta">
              <Clock size={14} />
              <span>
                {c.target}:{" "}
                {unfinished
                  ? `${session.cursor} / ${session.itemIds.length} ${c.answered}`
                  : `${FOCUS_LIMITS[primaryTrack]} ${units[primaryTrack]}`}
              </span>
              {stats[primaryTrack].review > 0 && (
                <span className="study-review-count">
                  {stats[primaryTrack].review} {c.queue}
                </span>
              )}
            </div>

            {/* Quick Track Picker inside Hub */}
            <div className="study-goal-list" role="group" aria-label={c.choose}>
              {currentTracks.map((track) => {
                const Icon = icons[track];
                return (
                  <button
                    key={track}
                    aria-pressed={selected === track}
                    onClick={() => setSelected(track)}
                  >
                    <span className={`study-subject-icon ${track}`}>
                      {track === "tango" ? <span lang="ja">あ</span> : <Icon size={19} />}
                    </span>
                    <span>
                      <strong>{TRACK_LABELS[track]}</strong>
                      <small>
                        {FOCUS_LIMITS[track]} {units[track]}
                      </small>
                    </span>
                    {selected === track && <span className="study-selected-dot" />}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Consistency & Progress Panel */}
          <section className="study-consistency study-panel" id="study-progress">
            <div className="study-panel-title">
              <Flame size={20} />
              <h2>{c.rhythm}</h2>
              <span className="study-eyebrow">7 DAYS</span>
            </div>
            <div className="study-streak">
              <strong>{streak}</strong>
              <div>
                <b>{c.streak}</b>
                <p>
                  {locale === "id"
                    ? "Belajar N3 atau FE hari ini tetap menambah streak!"
                    : "Studying N3 or FE keeps your streak alive!"}
                </p>
              </div>
            </div>
            <div className="study-week">
              {days.map((day) => (
                <div key={day.date}>
                  <span
                    className={day.count ? "is-studied" : ""}
                    title={`${day.count} ${c.answered}`}
                  >
                    {day.count ? "✓" : ""}
                  </span>
                  <small>
                    {new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
                      new Date(`${day.date}T12:00:00`)
                    )}
                  </small>
                </div>
              ))}
            </div>

            <div className="study-rhythm-note">
              <Target size={21} />
              <p>
                {activeHub === "n3" ? "Target JLPT N3" : "Target FE Examination"}
                <br />
                <strong>
                  {activeHub === "n3"
                    ? "1.800 Kata + 116 Pola + 13 Teks"
                    : "Target Skor Kelulusan: 600 / 1000 Poin"}
                </strong>
              </p>
            </div>

            <div className="study-progress-label">
              <span>
                {activeHub === "n3"
                  ? locale === "id"
                    ? "Materi N3 Dikuasai"
                    : "N3 Mastered"
                  : locale === "id"
                  ? "Konsep FE Dikuasai"
                  : "FE Concepts Mastered"}
              </span>
              <strong>
                {hubMastered.toLocaleString(locale)}{" "}
                <small>/ {hubTotal.toLocaleString(locale)}</small>
              </strong>
            </div>
            <div
              className="study-progress-bar"
              role="progressbar"
              aria-label={c.mastered}
              aria-valuemin={0}
              aria-valuemax={hubTotal}
              aria-valuenow={hubMastered}
            >
              <span
                style={{
                  width: `${Math.min(100, hubTotal > 0 ? (hubMastered / hubTotal) * 100 : 0)}%`,
                }}
              />
            </div>

            {activeHub === "fe" && (
              <button
                type="button"
                className="study-outline-button"
                style={{ width: "100%", marginTop: "16px", minHeight: "40px" }}
                onClick={() => setProfile(true)}
              >
                <CreditCard size={15} />
                <span>Lihat Kartu Peserta Ujian (KAI-PASS)</span>
              </button>
            )}
          </section>
        </div>

        {/* Tracks Section (Jalur Belajar Khusus Hub Aktif) */}
        <section id="study-tracks" className="study-section">
          <div className="study-section-title">
            <div>
              <h2>
                {activeHub === "n3"
                  ? locale === "id"
                    ? "Jalur Belajar JLPT N3 Suite"
                    : "JLPT N3 Study Tracks"
                  : locale === "id"
                  ? "Jalur Belajar Fundamental IT Engineer (FE)"
                  : "FE Exam Study Tracks"}
              </h2>
              <p>
                {activeHub === "n3"
                  ? locale === "id"
                    ? "Kuasai kosakata, tata bahasa, dan pemahaman bacaan N3 secara terstruktur."
                    : "Master vocabulary, grammar, and reading comprehension."
                  : locale === "id"
                  ? "Kurikulum resmi IPA Japan: Algoritma, Arsitektur Sistem, dan Manajemen Proyek IT."
                  : "Official IPA Japan syllabus: Algorithms, System Architecture & IT Management."}
              </p>
            </div>
            <a
              className="study-text-link"
              href={activeHub === "n3" ? "/tools/n3-suite/" : "/tools/fe-study/"}
            >
              {activeHub === "n3" ? "Buka N3 Suite Lengkap" : "Buka FE Study Hub"}
              <ChevronRight size={14} />
            </a>
          </div>

          <div className="study-track-grid">
            {activeHub === "n3" ? (
              (["tango", "bunpou", "dokkai"] as FocusTrack[]).map((track) => {
                const Icon = icons[track];
                const stat = stats[track];
                return (
                  <article className="study-track study-panel" key={track}>
                    <div className="study-track-top">
                      <span className={`study-subject-icon ${track}`}>
                        {track === "tango" ? <span lang="ja">あ</span> : <Icon size={23} />}
                      </span>
                      <span className="study-mini-tag">JLPT N3</span>
                    </div>
                    <h3>
                      <a href={`/tools/${modulePaths[track]}/`}>{TRACK_LABELS[track]}</a>
                    </h3>
                    <p>
                      {stat.total.toLocaleString(locale)} {units[track]}
                    </p>
                    <div
                      className="study-progress-bar"
                      role="progressbar"
                      aria-label={TRACK_LABELS[track]}
                      aria-valuemin={0}
                      aria-valuemax={stat.total}
                      aria-valuenow={stat.count}
                    >
                      <span
                        style={{
                          width: `${Math.min(100, (stat.count / stat.total) * 100)}%`,
                        }}
                      />
                    </div>
                    <div className="study-track-bottom">
                      <span>
                        <strong>{stat.count}</strong> / {stat.total.toLocaleString(locale)}
                      </span>
                      <a className="study-text-link" href={`/learn/focus/?track=${track}`}>
                        {c.study}
                        <ChevronRight size={13} />
                      </a>
                    </div>
                  </article>
                );
              })
            ) : (
              <>
                <article className="study-track study-panel">
                  <div className="study-track-top">
                    <span className="study-subject-icon fe">
                      <Code2 size={23} />
                    </span>
                    <span className="study-mini-tag">IPA JAPAN</span>
                  </div>
                  <h3>
                    <a href="/tools/fe-study/?tab=flashcards">Fundamental IT Knowledge</a>
                  </h3>
                  <p>60 Konsep Inti (Teknologi, Manajemen, Strategi)</p>
                  <div className="study-progress-bar" role="progressbar">
                    <span
                      style={{
                        width: `${Math.min(100, (stats.fe.count / stats.fe.total) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="study-track-bottom">
                    <span>
                      <strong>{stats.fe.count}</strong> / 60
                    </span>
                    <a className="study-text-link" href="/tools/fe-study/?tab=flashcards">
                      Latihan <ChevronRight size={13} />
                    </a>
                  </div>
                </article>

                <article className="study-track study-panel">
                  <div className="study-track-top">
                    <span className="study-subject-icon fe">
                      <Monitor size={23} />
                    </span>
                    <span className="study-mini-tag">CBT EXAM</span>
                  </div>
                  <h3>
                    <a href="/tools/fe-study/?tab=quiz">Kakomon CBT Simulator</a>
                  </h3>
                  <p>Simulasi Ujian Pilihan Ganda Resmi IPA (科目A)</p>
                  <div className="study-track-bottom" style={{ marginTop: "24px" }}>
                    <span className="text-xs text-[var(--text-secondary)]">Simulasi Realistis</span>
                    <a className="study-text-link" href="/tools/fe-study/?tab=quiz">
                      Mulai CBT <ChevronRight size={13} />
                    </a>
                  </div>
                </article>

                <article className="study-track study-panel">
                  <div className="study-track-top">
                    <span className="study-subject-icon fe">
                      <Code2 size={23} />
                    </span>
                    <span className="study-mini-tag">科目B</span>
                  </div>
                  <h3>
                    <a href="/tools/fe-study/?tab=tracer">Pseudocode Tracer</a>
                  </h3>
                  <p>Eksekusi Algoritma & Penelusuran Variabel</p>
                  <div className="study-track-bottom" style={{ marginTop: "24px" }}>
                    <span className="text-xs text-[var(--text-secondary)]">Step-by-Step</span>
                    <a className="study-text-link" href="/tools/fe-study/?tab=tracer">
                      Buka Tracer <ChevronRight size={13} />
                    </a>
                  </div>
                </article>
              </>
            )}
          </div>
        </section>

        {/* Tools Section */}
        <section id="study-tools" className="study-section">
          <div className="study-section-title">
            <div>
              <h2>{c.tools}</h2>
              <p>
                {activeHub === "n3"
                  ? locale === "id"
                    ? "Alat bantu belajar kosakata, tata bahasa, dan membaca."
                    : "Tools for vocabulary, grammar, and reading."
                  : locale === "id"
                  ? "Alat simulasi ujian CBT, tracer algoritma, dan catatan salah."
                  : "CBT exam simulators, pseudocode tracers, and mistake review."}
              </p>
            </div>
          </div>
          <div className="study-tool-grid">
            {currentTools.map((tool) => (
              <a className="study-tool" href={`/tools/${tool.path}`} key={tool.name}>
                <tool.icon size={24} />
                <span>
                  <strong>{tool.name}</strong>
                  <small>{tool.desc}</small>
                </span>
                <ChevronRight size={16} />
              </a>
            ))}
          </div>
        </section>

        {/* Roadmap & Footer */}
        <details className="study-roadmap study-panel">
          <summary>
            <Grid2X2 size={21} />
            <strong>{c.roadmap}</strong>
            <ChevronRight size={16} />
          </summary>
          <div>
            <span>Tech English for Engineers</span>
            <span>Web Systems Architecture</span>
            <span>AI Agents Engineering</span>
            <a className="study-text-link" href="https://kaidevlab.com/">
              Kaidevlab Lab
            </a>
          </div>
        </details>

        <footer className="study-footer">
          <span>© 2026 Kaidevlab Study · {c.foot}</span>
          <div>
            <button onClick={openSyncModal}>{c.sync}</button>
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <a href="https://github.com/kaidev-pro">GitHub</a>
          </div>
        </footer>
      </main>

      {profile && (
        <StudyDialog title={c.profile} onClose={() => setProfile(false)}>
          <FeCandidateIdCard
            candidateName={user}
            candidateId={cadetId}
            examMode="hub"
            score={stats.fe.count}
            total={FE_TOTAL_CARDS}
            percentage={Math.round((stats.fe.count / FE_TOTAL_CARDS) * 100)}
            isPassed={stats.fe.count >= 40}
            onNameChange={(name) => {
              setUser(name);
              try {
                localStorage.setItem("kaidevlab_candidate_name", name);
              } catch {}
            }}
          />
        </StudyDialog>
      )}

      <AuthOnboardingModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
        onTrackChanged={(track) => {
          if (track === "fe") switchHub("fe");
          else if (track === "n3") switchHub("n3");
        }}
      />

      {/* N3 Daily Journey Runner Modal */}
      {activeJourneyDay && (
        <N3DailyJourneyRunner
          day={activeJourneyDay}
          isOpen={journeyModalOpen}
          onClose={() => setJourneyModalOpen(false)}
          onDayCompleted={() => {
            refresh();
          }}
        />
      )}

      {/* 30-Day Syllabus Modal */}
      {syllabusModalOpen && (
        <StudyDialog
          title="Silabus 30 Hari · JLPT N3 Integrated Journey"
          onClose={() => setSyllabusModalOpen(false)}
        >
          <div className="space-y-4 max-h-[72vh] overflow-y-auto p-1">
            <p className="text-xs text-[var(--study-muted)] leading-relaxed">
              Roadmap kurikulum terpadu 30 Hari JLPT N3: Setiap hari mengombinasikan 15 Kosakata Tematik, 2 Pola Tata Bahasa Bunpou, Latihan Kuis, dan Sintesis Wacana Dokkai.
            </p>
            <div className="study-roadmap-timeline space-y-3 my-2">
              {N3_DAILY_JOURNEY_DAYS.map((jd) => {
                const isCompleted = journeyProgress.completedDays.includes(jd.day);
                const isCurrent = journeyProgress.currentDay === jd.day;
                const isLocked = jd.day > journeyProgress.currentDay;
                const isMilestone = jd.day % 7 === 0 || jd.day === 30;

                return (
                  <div
                    key={jd.day}
                    onClick={() => {
                      if (!isLocked) {
                        setActiveJourneyDay(jd);
                        setSyllabusModalOpen(false);
                        setJourneyModalOpen(true);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between relative ${
                      isLocked
                        ? "opacity-45 border-[var(--study-line)] bg-[var(--study-soft)] cursor-not-allowed"
                        : isCurrent
                        ? "border-[var(--study-blue)] bg-[var(--study-paper)] shadow-md ring-2 ring-[var(--study-blue)]/20 cursor-pointer hover:border-[var(--study-blue)]"
                        : "border-[var(--study-line)] bg-[var(--study-paper)] cursor-pointer hover:border-[var(--study-blue)] hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-transform ${
                          isCompleted
                            ? "bg-emerald-500 text-white shadow-xs"
                            : isCurrent
                            ? "bg-[var(--study-blue)] text-white shadow-sm scale-105"
                            : "bg-[var(--study-soft)] text-[var(--study-muted)]"
                        }`}
                      >
                        {isCompleted ? <Check size={14} strokeWidth={3} /> : jd.day}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs block text-[var(--study-text)]">
                            Day {jd.day}: {jd.titleId}
                          </strong>
                          {isMilestone && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 inline-flex items-center gap-1">
                              <Award size={10} />
                              <span>Milestone</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[var(--study-muted)] font-mono">
                          {jd.themeTag} · {jd.durationMinutes} Menit · 15 Tango + Dokkai
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                          <Check size={11} strokeWidth={2.5} />
                          <span>Selesai</span>
                        </span>
                      ) : isCurrent ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-500/15 text-blue-600 dark:text-blue-400 animate-pulse">
                          Hari Ini
                        </span>
                      ) : isLocked ? (
                        <span className="text-[11px] text-[var(--study-muted)] inline-flex items-center gap-1">
                          <Lock size={11} />
                          <span>Terkunci</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-[var(--study-blue)] font-black">Mulai →</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </StudyDialog>
      )}

      {/* FE Daily Quest Runner Modal */}
      {activeFEQuest && (
        <FEDailyQuestRunner
          quest={activeFEQuest}
          isOpen={feQuestModalOpen}
          onClose={() => setFeQuestModalOpen(false)}
          onQuestCompleted={() => {
            refresh();
          }}
        />
      )}

      {/* FE Syllabus Modal */}
      {feSyllabusModalOpen && (
        <StudyDialog
          title="Silabus FE Exam · 7-Day Sprint & CBT Simulator"
          onClose={() => setFeSyllabusModalOpen(false)}
        >
          <div className="space-y-4 max-h-[72vh] overflow-y-auto p-1">
            <p className="text-xs text-[var(--study-muted)] leading-relaxed">
              Sprint kurikulum terpadu IPA FE Exam: Setiap hari mengombinasikan Kartu Konsep IT Dasar, Simulasi Pseudocode 科目B, dan Soal Ujian Asli Kakomon.
            </p>
            <div className="study-roadmap-timeline space-y-3 my-2">
              {FE_DAILY_QUESTS.map((fq) => {
                const isCompleted = feQuestProgress.completedDays.includes(fq.day);
                const isCurrent = feQuestProgress.currentDay === fq.day;
                const isLocked = fq.day > feQuestProgress.currentDay;
                const isBossFight = fq.day === 7;

                return (
                  <div
                    key={fq.day}
                    onClick={() => {
                      if (!isLocked) {
                        setActiveFEQuest(fq);
                        setFeSyllabusModalOpen(false);
                        setFeQuestModalOpen(true);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between relative ${
                      isLocked
                        ? "opacity-45 border-[var(--study-line)] bg-[var(--study-soft)] cursor-not-allowed"
                        : isCurrent
                        ? "border-blue-600 bg-[var(--study-paper)] shadow-md ring-2 ring-blue-500/20 cursor-pointer hover:border-blue-600"
                        : "border-[var(--study-line)] bg-[var(--study-paper)] cursor-pointer hover:border-blue-600 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-transform ${
                          isCompleted
                            ? "bg-emerald-500 text-white shadow-xs"
                            : isCurrent
                            ? "bg-blue-600 text-white shadow-sm scale-105"
                            : "bg-[var(--study-soft)] text-[var(--study-muted)]"
                        }`}
                      >
                        {isCompleted ? <Check size={14} strokeWidth={3} /> : fq.day}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs block text-[var(--study-text)]">
                            {fq.titleId}
                          </strong>
                          {isBossFight && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border border-indigo-500/30 inline-flex items-center gap-1">
                              <Trophy size={10} />
                              <span>Boss Fight</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[var(--study-muted)] font-mono">
                          {fq.themeTag} · {fq.durationMinutes} Menit · {fq.cardIds.length} IT Cards + CBT
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                          <Check size={11} strokeWidth={2.5} />
                          <span>Selesai</span>
                        </span>
                      ) : isCurrent ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-500/15 text-blue-600 dark:text-blue-400 animate-pulse">
                          Hari Ini
                        </span>
                      ) : isLocked ? (
                        <span className="text-[11px] text-[var(--study-muted)] inline-flex items-center gap-1">
                          <Lock size={11} />
                          <span>Terkunci</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-blue-600 font-black">Mulai →</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </StudyDialog>
      )}
    </StudyShell>
  );
}
