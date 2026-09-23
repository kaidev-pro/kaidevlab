/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

const projects = {
  "8agents": {
    title: "8Agents", category: "UMKM Digital Transformation", status: "Live · Client Engine", role: "Product architecture, brand strategy, digital asset vault, web engineering", logo: "/logos/8agents-128.webp", liveUrl: "https://8agents.id", year: "2026", stack: ["Next.js", "Brand Systems", "Digital Vault Architecture", "Intake Queue (BullMQ/Redis)", "WhatsApp Automated Funnel", "Content Studio Pipeline"],
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
    title: "FE Cognitive Gym", category: "Interactive Education Hub", status: "Live · Interactive System", role: "Full-stack engineering, learning system, CBT simulator, active recall engine", logo: "/brand/kaidevlab-logo-dark.webp", liveUrl: "/learn", year: "2026", stack: ["Next.js", "React 19", "Tailwind CSS", "Web Audio API", "Web Speech TTS", "Offline PWA", "Service Worker"],
    summary: "A cognitive study gym for Japan’s Fundamental Information Technology Engineer Examination (基本情報技術者試験) featuring 129 high-yield flashcards with native furigana & TTS, CBT simulator with digital certificates, pseudocode tracer, and offline PWA mode.",
    problem: "Preparing for Japan's national FE certification typically involves 600+ page textbooks dense with technical kanji and abstract pseudocode, leading to cognitive overload, slow recall, and study burnout during daily transit.",
    goals: ["Create an active recall drill with native Japanese TTS and furigana toggles", "Simulate the authentic 22.5-minute CBT exam with live scoring and digital certificates", "Build an interactive pseudocode tracer to demystify trace tables for 科目B", "Deliver an installable offline PWA (電車モード) for studying inside commuter trains without signal"],
    features: ["129 High-Yield Flashcards (64 Technology, 16 Management, 19 Strategy, 30 Exam Vocabulary & Kanji)", "Active recall drill with Kitami-shiki visual analogies & differentiator keywords", "Native Kanji <ruby> furigana toggle and native Japanese Text-to-Speech audio pronunciation", "CBT Mock Exam simulator with 22.5-minute countdown and question navigation matrix", "Automated scoring, category breakdown, and printable Digital Passing Certificate (合格証明書)", "Interactive Pseudocode Step-Tracer with real-time trace tables for 4 FE algorithms", "4 Interactive calculators (Availability, MTBF/MTTR, Effective Memory Access Time, BEP)", "PWA with Service Worker offline caching (電車モード) and install prompt"],
    approach: "Built with Next.js and React 19 as a high-performance, distraction-free study gym. All audio synthesis and state management run client-side for zero latency and complete offline capability.",
    challenges: ["Balancing authentic past-exam rigor with accessible visual analogies", "Designing a responsive, distraction-free CBT simulator on mobile viewports", "Reliable offline caching of audio and assets in crowded transit environments"],
    limitations: ["Currently curated to 129 high-yield terminology cards and 15 past-exam questions", "Additional past exam question banks will be expanded iteratively"],
    next: ["Expand question bank for subsequent exam seasons", "Add custom user-created flashcard decks", "Implement spaced repetition interval algorithms based on review history"]
  },
  "rakusaku": {
    title: "Rakusaku", category: "Fast Top-Up Commerce", status: "Live · Payment Active (<60s Fulfillment)", role: "Founder, full-stack commerce engineering, brand architecture, anime-tech UX", logo: "/logos/rakusaku-128.webp", liveUrl: "https://rakusaku.com", year: "2026", stack: ["DOKU Payment Gateway", "Pakasir Engine", "QRIS & E-Wallet Webhooks", "Real-Time Callback Reconciliation", "Anime-Tech Design System", "Interactive Duo Mascots"],
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
    kind: "creative", title: "Blue Vengeance", category: "Original Anime Series", status: "Pre-Production", role: "Creator, story direction, worldbuilding, visual development", logo: "/logos/kai-revengers-64.svg", poster: "/blue-vengeance-poster.webp", year: "2026", stack: ["Manhwa production", "Long-form story", "Character arcs", "Visual development", "Action direction"],
    summary: "An original anime series following Kai and Rin through a story of gentle bonds, fading scars, and promises that become vengeance.",
    problem: "A long-form original IP needs honest positioning before chapters are released: premise, arcs, and production direction can be public without claiming a launched series.",
    goals: ["Define Kai’s 17-to-27 arc", "Build the Tachibana family and Rin storyline", "Shape the criminal network mystery", "Prepare a production pipeline before chapter release"],
    features: ["School delinquent action period", "Adult investigator evolution", "Rin tragedy and amnesia thread", "Tachibana family conflict", "Wider criminal-network mystery"],
    approach: "Blue Vengeance is treated as the future primary creative IP: story architecture, character arcs, tone, and production workflow come first before public chapter claims.",
    challenges: ["Balancing action with long-term mystery", "Maintaining character continuity across a decade", "Avoiding release claims before chapters exist"],
    limitations: ["Pre-production only", "No chapters publicly released yet"],
    next: ["Lock chapter-one outline", "Develop key character sheets", "Plan production cadence after assets are ready"]
  },
  "dragon-kings-last-contract": {
    kind: "creative", title: "The Dragon King’s Last Contract", category: "AI Film Experiment", status: "Episode 1 Completed · Creative Experiment", role: "Creator, story direction, poster concept, AI film workflow", logo: "/logos/kai-revengers-64.svg", poster: "/dragon-kings-last-contract-poster.webp", year: "2026", stack: ["AI filmmaking", "Dark fantasy", "Episode 1", "Poster direction", "Cinematic workflow"],
    summary: "A completed Episode 1 dark fantasy creative experiment about a monster, a contract, and the girl sent to kill him.",
    problem: "AI film experiments need coherent character motivation, repeatable mood, scene continuity, and honest status around what has actually been completed.",
    goals: ["Present Episode 1 as completed", "Keep dark fantasy tone clear", "Use the experiment to refine AI filmmaking workflow"],
    features: ["Gothic romance premise", "Dragon King visual identity", "Moonlit dark-fantasy mood", "Contract and betrayal story hook", "Completed first episode experiment"],
    approach: "The project is presented as a completed creative experiment rather than an active production promise. The page documents its premise, visual direction, and workflow value.",
    challenges: ["Maintaining character consistency across AI-generated scenes", "Preserving gothic tone without losing story clarity", "Avoiding stale future-production language"],
    limitations: ["Episode 1 is completed as an experiment", "Future format is not committed publicly"],
    next: ["Archive learnings", "Use workflow lessons in future creative production", "Keep page status accurate"]
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
  const images = "poster" in p && p.poster ? [p.poster] : undefined;

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

export default async function Project({ params }: ProjectPageProps) {
  const { slug } = await params;
  const p = getProject(slug);

  if (!p) notFound();

  const creative = "kind" in p && p.kind === "creative";
  const projectSlugs = Object.keys(projects) as ProjectSlug[];
  const currentIndex = projectSlugs.indexOf(slug as ProjectSlug);
  const previousSlug = projectSlugs[(currentIndex - 1 + projectSlugs.length) % projectSlugs.length];
  const nextSlug = projectSlugs[(currentIndex + 1) % projectSlugs.length];
  const previousProject = projects[previousSlug];
  const nextProject = projects[nextSlug];
  const labels = creative
    ? {
      problem: "Premise / story hook",
      goals: "Creative goals",
      features: "Visual direction",
      approach: "Production workflow",
      challenges: "Creative challenges",
      limitations: "Current progress",
      next: "Next steps",
    }
    : {
      problem: "Problem / opportunity",
      goals: "Product goals",
      features: "Key features",
      approach: "Technical / creative approach",
      challenges: "Challenges",
      limitations: "Current limitations",
      next: "Next steps",
    };

  return <main className="section detail-page">
    <a className="secondary" href="/work/">← Back to Work</a>
    <section className="detail-hero">
      <div><p className="eyebrow">{p.category}</p><h1>{p.title}</h1><p className="lead">{p.summary}</p><div className="detail-actions"><span className="status">{p.status}</span>{"liveUrl" in p && p.liveUrl && <a className="primary" href={p.liveUrl} target="_blank" rel="noreferrer">Visit Live Site</a>}</div></div>
      <div className="detail-card">{!creative && <Image src={p.logo} alt="" aria-hidden="true" width={88} height={88} />}<p><b>Role</b><br/>{p.role}</p><p><b>Year</b><br/>{p.year}</p></div>
    </section>
    {"poster" in p && p.poster ? <figure className="detail-poster"><Image src={p.poster} alt={`${p.title} poster`} width={900} height={1350} sizes="(max-width: 760px) 100vw, 720px" /><figcaption>{p.title} key visual / poster.</figcaption></figure> : creative ? <section className="detail-concept-visual" aria-label={`${p.title} visual development status`}><Image src={p.logo} alt="" aria-hidden="true" width={96} height={96} /><p className="eyebrow">Visual Development</p><h2>{p.title}</h2><span>Pre-production artwork is being developed. No released chapter visual is claimed here.</span></section> : null}
    {creative && <section className="creative-facts" aria-label="Production facts"><span>Status: {p.status}</span><span>Format: Creative / story experiment</span><span>Claims: No unreleased chapters or episodes promised</span></section>}
    <section className="detail-grid">
      <article><h2>{labels.problem}</h2><p>{p.problem}</p></article>
      <article><h2>{labels.goals}</h2><ul>{p.goals.map(x=><li key={x}>{x}</li>)}</ul></article>
      <article><h2>{labels.features}</h2><ul>{p.features.map(x=><li key={x}>{x}</li>)}</ul></article>
      <article><h2>{labels.approach}</h2><p>{p.approach}</p></article>
      <article><h2>{labels.challenges}</h2><ul>{p.challenges.map(x=><li key={x}>{x}</li>)}</ul></article>
      <article><h2>{labels.limitations}</h2><ul>{p.limitations.map(x=><li key={x}>{x}</li>)}</ul></article>
      <article><h2>{labels.next}</h2><ul>{p.next.map(x=><li key={x}>{x}</li>)}</ul></article>
    </section>
    <section className="detail-next" aria-label="More projects">
      <div>
        <p className="eyebrow">MORE WORK</p>
        <h2>{creative ? "Explore another story world or build." : "Keep exploring what Kai is building."}</h2>
      </div>
      <div className="detail-next-grid">
        <a href={`/work/${previousSlug}`}>
          <span>Previous</span>
          <strong>{previousProject.title}</strong>
          <small>{previousProject.category}</small>
        </a>
        <a href={`/work/${nextSlug}`}>
          <span>Next</span>
          <strong>{nextProject.title}</strong>
          <small>{nextProject.category}</small>
        </a>
      </div>
      <div className="detail-bottom-actions">
        <a className="secondary" href="/work/">Back to all work</a>
        {creative ? <a className="primary" href="/work/">Explore creative projects</a> : "liveUrl" in p && p.liveUrl && <a className="primary" href={p.liveUrl} target="_blank" rel="noreferrer">Visit live project</a>}
      </div>
    </section>
  </main>
}