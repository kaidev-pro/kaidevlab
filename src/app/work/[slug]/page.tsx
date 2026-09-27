/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

const projects = {
  "8agents": {
    title: "8Agents", category: "UMKM Digital Transformation", status: "Live · Client Engine", role: "Product architecture, brand strategy, digital asset vault, web engineering", logo: "/logos/8agents-mark.webp", coverImage: "/project-screenshots/8agents.webp", liveUrl: "https://8agents.id", year: "2026", stack: ["Next.js", "Brand Systems", "Digital Vault Architecture", "Intake Queue (BullMQ/Redis)", "WhatsApp Automated Funnel", "Content Studio Pipeline"],
    summary: "An end-to-end digital partner transforming Indonesian MSMEs (UMKM) into modern, credible brands with professional brand kits, high-converting websites, UGC video content, and a zero-loss Digital Asset Vault.",
    problem: "Over 66 million Indonesian MSMEs generate 61% of national GDP, yet the vast majority lack modern visual branding and websites. Brand assets routinely get lost in unstructured WhatsApp chats, and conventional agencies charge prohibitive fees with slow turnarounds.",
    goals: [
      "Bridge the digital divide for local MSMEs with transparent, modular 3-tier pricing (Starter, Growth, Care)",
      "Eliminate asset loss and dependency with the proprietary Brankas Aset Digital (zero-loss credential and file custody)",
      "Provide complete brand-to-web transformation: from logo mark design to fast, mobile-first websites with direct WhatsApp conversions",
      "Power creative growth with an integrated Content Studio producing TikTok/Reels UGC and short-form video ads"
    ],
    features: [
      "Modular 3-Tier service architecture: Starter (Brand Kit), Growth (Brand + Website), Digital Care (Monthly Maintenance)",
      "Brankas Aset Digital: complete client custody of domain, brand-kit.zip, vector source files, and update documentation",
      "Interactive Before-After transformation story showcasing real local business upgrades",
      "Content Studio pipeline producing UGC beauty/product videos and short-form video ads for TikTok & Reels",
      "Mobile-first Next.js websites optimized for sub-second load times, local SEO, and WhatsApp lead funnels",
      "Standardized quality assurance covering security, Lighthouse performance, accessibility, and client handoff"
    ],
    approach: "Built to provide enterprise-grade agency output at accessible pricing for local business owners. Every engagement couples clean brand design with self-hosted digital independence: clients own 100% of their domain, source files, and administrative credentials through the Brankas Aset Digital.",
    challenges: [
      "Educating non-technical business owners on the compounding value of brand identity and website ownership",
      "Designing a transparent client onboarding flow that minimizes back-and-forth while capturing core business character",
      "Maintaining high design standards across varied business sectors (F&B, retail, beauty, services) within streamlined sprint timelines"
    ],
    limitations: [
      "Intake and creative direction remain founder-reviewed to ensure quality before scaling automated templates",
      "Content Studio production schedules are currently batch-processed"
    ],
    next: [
      "Deploy self-service client dashboard for real-time progress tracking",
      "Expand Content Studio templates for additional viral video formats",
      "Integrate automated invoice and service renewal workflows"
    ]
  },
  "fe-study-hub": {
    title: "FE Cognitive Gym", category: "Interactive Education Hub", status: "Live · Interactive System", role: "Full-stack engineering, learning system, CBT simulator, active recall engine", logo: "/brand/kaidevlab-logo-dark.webp", coverImage: "/project-screenshots/fe-study-hub.webp", liveUrl: "/learn", year: "2026", stack: ["Next.js", "React 19", "Tailwind CSS", "Web Audio API", "Web Speech TTS", "Offline PWA", "Service Worker"],
    summary: "A cognitive study gym for Japan’s Fundamental Information Technology Engineer Examination (基本情報技術者試験) featuring 199 high-yield flashcards with native furigana & TTS, 20-day structured plan, 75-question CBT simulator, pseudocode tracer, and offline PWA mode.",
    problem: "Preparing for Japan's national FE certification typically involves 600+ page textbooks dense with technical kanji and abstract pseudocode, leading to cognitive overload, slow recall, and study burnout during daily transit.",
    goals: ["Create an active recall drill with native Japanese TTS and furigana toggles", "Simulate the authentic CBT exam (15/30/60/75 question flexible sessions) with live scoring and digital certificates", "Build an interactive pseudocode tracer to demystify trace tables for 科目B (8 core algorithms)", "Deliver an installable offline PWA (電車モード) for studying inside commuter trains without signal"],
    features: ["199 High-Yield Flashcards (113 Technology, 22 Management, 34 Strategy, 30 Exam Vocabulary & Kanji)", "Active recall drill with Kitami-shiki visual analogies & differentiator keywords", "Native Kanji <ruby> furigana toggle and native Japanese Text-to-Speech audio pronunciation", "CBT Mock Exam simulator with 75 authentic IPA questions (including 30 calculation drills) and flexible session options (15/30/60/75 questions)", "Automated scoring, category breakdown, and printable Digital Passing Certificate (合格証明書)", "Interactive Pseudocode Step-Tracer with real-time trace tables for 8 FE algorithms", "4 Interactive calculators (Availability, MTBF/MTTR, Effective Memory Access Time, BEP)", "PWA with Service Worker offline caching (電車モード) and install prompt"],
    approach: "Built with Next.js and React 19 as a high-performance, distraction-free study gym. All audio synthesis and state management run client-side for zero latency and complete offline capability.",
    challenges: ["Balancing authentic past-exam rigor with accessible visual analogies", "Designing a responsive, distraction-free CBT simulator on mobile viewports", "Reliable offline caching of audio and assets in crowded transit environments"],
    limitations: ["Currently curated to 199 high-yield terminology cards and 75 past-exam questions", "Additional past exam question banks will be expanded iteratively"],
    next: ["Expand question bank for subsequent exam seasons", "Add custom user-created flashcard decks", "Implement spaced repetition interval algorithms based on review history"]
  },
  "rakusaku": {
    title: "Rakusaku", category: "Fast Top-Up Commerce", status: "Live · Payment Active (<60s Fulfillment)", role: "Founder, full-stack commerce engineering, brand architecture, anime-tech UX", logo: "/logos/rakusaku-128.webp", coverImage: "/project-screenshots/rakusaku.webp", liveUrl: "https://rakusaku.com", year: "2026", stack: ["DOKU Payment Gateway", "Pakasir Engine", "QRIS & E-Wallet Webhooks", "Real-Time Callback Reconciliation", "Anime-Tech Design System", "Interactive Duo Mascots"],
    summary: "A fast, pocket-sized game & digital voucher top-up platform fusing Japanese-Indonesian naming philosophy (楽 + Saku), vibrant pink anime-tech aesthetics, and automated sub-minute fulfillment via DOKU and Pakasir.",
    problem: "Most gaming top-up sites in Indonesia suffer from cluttered dark-mode clone layouts, confusing navigation, hidden processing surcharges, and sluggish manual payment verification. Gamers need an ultra-fast, trustworthy, and delightful checkout experience that fits right in their pocket.",
    goals: [
      "Deliver instant automated fulfillment within 1–3 minutes (empirically tested under 60 seconds end-to-end)",
      "Disrupt saturated dark-mode gaming sites with a distinctive hot-pink (`#FF3F8E`) and cyber-sakura aesthetic",
      "Create an emotionally engaging customer journey through duo mascots: Saku-chan (The Guide) & Raku (The Companion)",
      "Integrate dual production payment gateways (DOKU & Pakasir) supporting instant QRIS, Virtual Accounts, and E-Wallets",
      "Build a native retention ecosystem with Saldo RakuSaku (Rp1 = Rp1) and Saku Point cashback"
    ],
    features: [
      "3-step frictionless checkout (Select Product → Input Player ID → Instant QRIS Scan)",
      "Dual gateway engine (DOKU & Pakasir) with automated webhook reconciliation and instant order routing",
      "Real-world tested sub-minute (<60s) automated top-up fulfillment across games and PPOB vouchers",
      "Interactive Duo Mascots: Saku-chan guiding product selection and Raku monitoring live order completion",
      "Animated Raku sprite loader ('Raku lagi ambil produknya...') and real-time invoice status tracker",
      "Saldo RakuSaku wallet for 1-click checkout alongside Saku Point loyalty rewards",
      "Full digital catalog: Mobile Legends, Free Fire, PUBG, Valorant, Genshin Impact, PLN, and data packages"
    ],
    approach: "Designed mobile-first with an unapologetically bold anime-tech identity. The naming bridges Japanese 'Raku' (楽 - effortless, lighthearted) and Indonesian 'Saku' (pocket) — delivering lightning-fast top-ups directly from your pocket. The backend pairs dual payment gateways to eliminate single points of failure, automatically triggering distributor API fulfillment within seconds of webhook confirmation.",
    challenges: [
      "Reconciling asynchronous webhook callbacks from dual payment gateways (DOKU and Pakasir) with idempotency guarantees",
      "Balancing high-saturation playful pink aesthetics with clean, conversion-focused checkout UX",
      "Ensuring instant sub-second asset delivery for character sprites and animations on mobile cellular connections"
    ],
    limitations: [
      "Active distributor API failover is continuously monitored for third-party publisher maintenance windows",
      "Automated edge-case handling for user-inputted invalid player IDs continues to be refined"
    ],
    next: [
      "Launch personalized flash sales and member-tier pricing perks",
      "Introduce optional celebratory chiptune/anime audio feedback upon order completion",
      "Expand international gaming card inventory and gift card selections"
    ]
  },
  "blue-vengeance": {
    kind: "creative", title: "Blue Vengeance", category: "Original Anime Series", status: "Episode 0 Released · Creative Pilot", role: "Creator, story direction, visual development", logo: "/logos/kai-revengers-64.svg", poster: "/blue-vengeance-poster.webp", year: "2026", stack: ["Anime Pilot", "CapCut Multi-track", "ElevenLabs Audio", "Character Arcs", "Cinematic Direction"],
    summary: "An original anime series following Kai and Rin through a story of gentle bonds, fading scars, and promises that become vengeance.",
    problem: "A long-form original IP needs disciplined story architecture, distinct character motivations, and production verification before expanding chapter claims.",
    goals: ["Release Episode 0 pilot showcase", "Establish Kai and Rin's emotional bond and tragic turning point", "Demonstrate multi-track video editing and voiceover direction", "Prepare sustainable pipeline for subsequent episodes"],
    features: ["Episode 0 pilot release", "School delinquent action period transition", "Rin tragedy and amnesia narrative thread", "Multi-layered sound design and dialogue sync", "Original character visual sheets"],
    approach: "Blue Vengeance Episode 0 serves as the primary creative pilot: story architecture, character arcs, tone, and production workflow with CapCut timeline cutting and ElevenLabs sound engineering.",
    challenges: ["Balancing emotional pacing with action beats", "Maintaining visual continuity across episodic sequences", "Syncing multi-track voice acting with background score"],
    limitations: ["Episode 0 pilot completed", "Next episodes in storyboarding stage"],
    next: ["Lock episode-one storyboard outline", "Refine key action sequences", "Expand voice direction stem library"]
  },
  "kai-in-summer": {
    kind: "creative", title: "Kai in Summer · Pocari Sweat UGC", category: "Commercial UGC & Storytelling", status: "Completed · Spec Commercial Reel", role: "Creator, multi-track editing (CapCut), audio sync, sound direction", logo: "/logos/kai-revengers-64.svg", poster: "/pocari-summer-poster.webp", year: "2026", stack: ["CapCut Multi-track", "Pocari Sweat Spec", "Summer Beach UGC", "Suikawari Scene", "Audio Waveform Sync"],
    summary: "A vibrant Japanese summer UGC narrative combining anime visual aesthetics, seaside suikawari traditions, English dialogue subtitles, and upbeat sound editing.",
    problem: "Commercial UGC and spec reels need authentic cultural texture, immediate hook, tight multi-track audio sync, and verified editing execution.",
    goals: ["Build a cheerful Japanese summer beach atmosphere", "Incorporate authentic suikawari and seaside motifs", "Synchronize dialogue subtitles with audio waveforms", "Demonstrate end-to-end CapCut multi-track timeline editing"],
    features: ["Summer beach setting with coastal aesthetic", "Anime character interaction & dialogue subtitles", "Suikawari (watermelon splitting) sequence", "Audio-matched cuts and BGM pacing", "Production timeline verification via CapCut screenshots"],
    approach: "Produced as a spec UGC commercial demonstrating brand storytelling, color grading for high-saturation summer vibes, and precise dialogue subtitle timing in CapCut.",
    challenges: ["Balancing bright summer color grading with character legibility", "Timing dialogue cuts tightly against upbeat summer BGM", "Maintaining high visual energy without jarring cuts"],
    limitations: ["Spec commercial project created for portfolio demonstration"],
    next: ["Expand UGC concept to beverage and lifestyle brand collaborations", "Explore vertical 9:16 short-form cutdowns"]
  }
} as const;

type ProjectSlug = keyof typeof projects;
type ProjectPageProps = { params: Promise<{ slug: string }> };

function getProject(slug: string) {
  return projects[slug as ProjectSlug];
}

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);

  if (!p) {
    return { title: "Project not found — Kaidevlab" };
  }

  const title = `${p.title} — Kaidevlab Project`;
  const description = p.summary;
  const url = `/work/${slug}`;
  const images =
    "poster" in p && p.poster
      ? [p.poster]
      : "coverImage" in p && p.coverImage
      ? [p.coverImage as string]
      : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Kaidevlab",
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

import { ClientProject } from "./client-project";

export default async function Project({ params }: ProjectPageProps) {
  const { slug } = await params;
  const p = getProject(slug);

  if (!p) notFound();

  const projectSlugs = Object.keys(projects) as ProjectSlug[];
  const currentIndex = projectSlugs.indexOf(slug as ProjectSlug);
  const previousSlug = projectSlugs[(currentIndex - 1 + projectSlugs.length) % projectSlugs.length];
  const nextSlug = projectSlugs[(currentIndex + 1) % projectSlugs.length];
  const previousProject = projects[previousSlug];
  const nextProject = projects[nextSlug];

  return (
    <ClientProject
      slug={slug}
      initialProject={p}
      previousSlug={previousSlug}
      nextSlug={nextSlug}
      previousProject={{ title: previousProject.title, category: previousProject.category }}
      nextProject={{ title: nextProject.title, category: nextProject.category }}
    />
  );
}