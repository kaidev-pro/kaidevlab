export type ProjectGroup =
  | "Products"
  | "Systems & Automation"
  | "Developer Tools"
  | "Education"
  | "Creative"
  | "Experiments";

export type ProjectPreview = {
  slug: string;
  name: string;
  category: string;
  group: ProjectGroup;
  status: string;
  role: string;
  summary: string;
  logo: string;
  tone: "agent" | "router" | "education" | "commerce" | "creative" | "fantasy";
  signals: string[];
  liveUrl?: string;
  coverImage?: string;
  coverPosition?: string;
};

export const projects: ProjectPreview[] = [
  {
    slug: "8agents",
    name: "8Agents",
    category: "UMKM Digital Transformation",
    group: "Systems & Automation",
    status: "Live · Client Engine",
    role: "Product architecture, brand strategy, digital asset vault",
    summary:
      "An end-to-end digital partner transforming Indonesian MSMEs into modern brands through brand kits, high-converting websites, UGC content, and a zero-loss Digital Asset Vault.",
    logo: "/logos/8agents-mark.webp",
    tone: "agent",
    signals: ["Before/After Transform", "Brankas Aset Digital", "3-Tier Packages", "Content Studio"],
    liveUrl: "https://8agents.id",
    coverImage: "/project-screenshots/8agents.webp",
    coverPosition: "center top",
  },
  {
    slug: "rakusaku",
    name: "Rakusaku",
    category: "Fast Top-Up Commerce",
    group: "Products",
    status: "Live · Payment Active (<60s Fulfillment)",
    role: "Founder, full-stack commerce engineering, brand architecture, anime-tech UX",
    summary:
      "A fast, pocket-sized game & digital voucher top-up platform fusing Japanese-Indonesian naming philosophy (楽 + Saku), vibrant pink anime-tech aesthetics, and automated sub-minute fulfillment via DOKU and Pakasir.",
    logo: "/logos/rakusaku-128.webp",
    tone: "commerce",
    signals: ["DOKU & Pakasir QRIS", "<60s Auto Fulfillment", "Duo Mascots", "Hot-Pink Disruption"],
    liveUrl: "https://rakusaku.com",
    coverImage: "/project-screenshots/rakusaku.webp",
    coverPosition: "center top",
  },
  {
    slug: "blue-vengeance",
    name: "Blue Vengeance",
    category: "Original Anime Series",
    group: "Creative",
    status: "Episode 0 Released · Creative Pilot",
    role: "Creator, story direction, visual development",
    summary:
      "An original anime series following Kai and Rin through a story of gentle bonds, fading scars, and promises that become vengeance.",
    logo: "/logos/kai-revengers-64.svg",
    tone: "creative",
    signals: ["Episode 0 Released", "CapCut & Audio Sync", "Character Arcs"],
    coverImage: "/blue-vengeance-poster.webp",
    coverPosition: "center 24%",
  },
  {
    slug: "fe-study-hub",
    name: "FE Cognitive Gym",
    category: "Interactive Education Hub",
    group: "Education",
    status: "Live · Interactive System",
    role: "Full-stack engineering, learning system, CBT simulator",
    summary:
      "A cognitive study gym for Japan’s Fundamental Information Technology Engineer Examination (基本情報技術者試験) featuring 199 high-yield flashcards, 20-day plan, 75-question CBT simulator, pseudocode tracer, and offline PWA mode.",
    logo: "/brand/kaidevlab-logo-dark.webp",
    tone: "education",
    signals: ["199 Flashcards", "75 CBT Soal", "20-Day Plan"],
    liveUrl: "/learn",
    coverImage: "/project-screenshots/fe-study-hub.webp",
    coverPosition: "center 30%",
  },
  {
    slug: "kai-in-summer",
    name: "Kai in Summer · Pocari Sweat UGC",
    category: "Commercial UGC & Storytelling",
    group: "Creative",
    status: "Completed · Spec Commercial Reel",
    role: "Creator, multi-track editing (CapCut), audio sync, sound direction",
    summary:
      "A vibrant Japanese summer UGC narrative combining anime visual aesthetics, seaside suikawari traditions, English dialogue subtitles, and upbeat sound editing.",
    logo: "/logos/kai-revengers-64.svg",
    tone: "creative",
    signals: ["CapCut Multi-track", "Pocari Sweat Spec", "Summer Beach UGC", "Suikawari Scene"],
    coverImage: "/pocari-summer-poster.webp",
    coverPosition: "center center",
  },
];

export const featuredProjects = projects.filter(
  (project) => project.group === "Products" || project.group === "Systems & Automation" || project.group === "Education"
);
export const creativeProjects = projects.filter((project) => project.group === "Creative");