"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";

interface AboutDictionary {
  eyebrow: string;
  heading: string;
  lead: string;
  actions: {
    contact: string;
    work: string;
    cv: string;
  };
  howIWork: {
    eyebrow: string;
    title: string;
    description: string;
  };
  focus: {
    eyebrow: string;
    items: Array<{
      title: string;
      desc: string;
      link?: string;
    }>;
  };
  principles: {
    eyebrow: string;
    heading: string;
    description: string;
    cards: Array<{
      title: string;
      desc: string;
    }>;
  };
}

const contentByLocale: Record<string, AboutDictionary> = {
  en: {
    eyebrow: "About Kai",
    heading: "I’m Kai, an independent builder based in Japan.",
    lead: "Kaidevlab is my personal creative technology lab—a place to build products, code systems, and shape stories with honest status and clear direction.",
    actions: {
      contact: "Start a Conversation",
      work: "Explore My Work",
      cv: "Download CV / Resume",
    },
    howIWork: {
      eyebrow: "How I Work",
      title: "I learn by building.",
      description:
        "Some projects become products, some become experiments, and others become story worlds. Each one teaches the next—about product decisions, technical trade-offs, visual taste, and how to keep improving without pretending everything is already finished.",
    },
    focus: {
      eyebrow: "Current Focus",
      items: [
        {
          title: "8Agents",
          desc: "AI-assisted business transformation and zero-loss digital asset vault for Indonesian MSMEs (UMKM).",
          link: "/work/8agents/",
        },
        {
          title: "Rakusaku",
          desc: "Fast game & digital voucher top-up platform with DOKU & Pakasir (<60s fulfillment) and anime-tech UX.",
          link: "/work/rakusaku/",
        },
        {
          title: "FE Cognitive Gym",
          desc: "Interactive study gym & CBT simulator for Japan’s FE certification (基本情報技術者試験).",
          link: "/learn",
        },
        {
          title: "Kaidevlab",
          desc: "Personal brand and living creative technology lab.",
          link: "/",
        },
        {
          title: "Blue Vengeance",
          desc: "Original long-form anime/manhwa series in pre-production.",
          link: "/work/blue-vengeance/",
        },
        {
          title: "Visual production",
          desc: "Editing, motion graphics, and AI-assisted filmmaking workflows.",
        },
      ],
    },
    principles: {
      eyebrow: "Build · Code · Create",
      heading: "One identity, three connected practices.",
      description:
        "I do not separate engineering from storytelling. Product clarity, technical execution, and creative direction make each other stronger.",
      cards: [
        {
          title: "Build",
          desc: "Turning ideas into useful products, systems, and working prototypes.",
        },
        {
          title: "Code",
          desc: "Learning architecture, AI workflows, reliability, and deployment through real projects.",
        },
        {
          title: "Create",
          desc: "Developing visual direction, editing, character worlds, and long-form storytelling.",
        },
      ],
    },
  },
  id: {
    eyebrow: "Tentang Kai",
    heading: "Saya Kai, independent builder berbasis di Jepang.",
    lead: "Kaidevlab adalah laboratorium teknologi kreatif pribadi saya—tempat membangun produk, sistem perangkat lunak, dan merangkai cerita dengan status jujur dan arah yang terarah.",
    actions: {
      contact: "Mulai Percakapan",
      work: "Jelajahi Karya Saya",
      cv: "Unduh CV / Resume",
    },
    howIWork: {
      eyebrow: "Cara Kerja Saya",
      title: "Saya belajar dengan membangun secara nyata.",
      description:
        "Sebagian proyek berkembang menjadi produk komersial, sebagian menjadi eksperimen teknis, dan lainnya menjadi dunia cerita. Masing-masing proyek memberi pelajaran berharga—tentang keputusan produk, trade-off arsitektur, selera visual, dan cara terus berkembang tanpa berpura-pura semuanya telah sempurna.",
    },
    focus: {
      eyebrow: "Fokus Saat Ini",
      items: [
        {
          title: "8Agents",
          desc: "Transformasi bisnis digital & brankas aset tanpa risiko hilang untuk UMKM Indonesia.",
          link: "/work/8agents/",
        },
        {
          title: "Rakusaku",
          desc: "Platform top-up game & voucher kilat (<60 detik) dengan gateway DOKU & Pakasir berestetika anime-tech.",
          link: "/work/rakusaku/",
        },
        {
          title: "FE Cognitive Gym",
          desc: "Study gym interaktif & simulator CBT untuk ujian sertifikasi IT negara Jepang (基本情報技術者試験).",
          link: "/learn",
        },
        {
          title: "Kaidevlab",
          desc: "Laboratorium teknologi kreatif dan portofolio hidup.",
          link: "/",
        },
        {
          title: "Blue Vengeance",
          desc: "Serial anime/manhwa original dalam tahap pra-produksi.",
          link: "/work/blue-vengeance/",
        },
        {
          title: "Visual production",
          desc: "Editing video, motion graphics, dan alur pembuatan film berbantuan AI.",
        },
      ],
    },
    principles: {
      eyebrow: "Build · Code · Create",
      heading: "Satu identitas, tiga disiplin yang saling terhubung.",
      description:
        "Saya tidak memisahkan rekayasa perangkat lunak dari seni bercerita. Kejelasan produk, eksekusi teknis, dan arahan visual saling melengkapi dan memperkuat.",
      cards: [
        {
          title: "Bangun (Build)",
          desc: "Mengubah ide menjadi produk bermanfaat, sistem beroperasi, dan prototipe kerja fungsional.",
        },
        {
          title: "Rekayasa (Code)",
          desc: "Mempelajari arsitektur sistem, alur kerja AI, reliabilitas, dan deployment melalui proyek nyata.",
        },
        {
          title: "Kreasi (Create)",
          desc: "Mengembangkan arahan visual, editing, dunia karakter, dan narasi mendalam.",
        },
      ],
    },
  },
  ja: {
    eyebrow: "Kai について",
    heading: "日本を拠点に活動するインディペンデント・ビルダー、Kai です。",
    lead: "Kaidevlab は私の個人クリエイティブ・テクノロジー・ラボです。誠実な開発ステータスと明確なビジョンを持ち、プロダクト開発、システム設計、ストーリー制作を行っています。",
    actions: {
      contact: "問い合わせる",
      work: "プロジェクトを見る",
      cv: "履歴書 / CV をダウンロード",
    },
    howIWork: {
      eyebrow: "ワークスタイル",
      title: "創りながら学ぶ。",
      description:
        "プロダクトとして成長するもの、技術実験にとどまるもの、そして物語の世界となるもの。すべてのプロジェクトが次の学びにつながります。プロダクトの意思決定、技術的トレードオフ、視覚的センス、そして完成を偽らずに進化し続ける姿勢を培っています。",
    },
    focus: {
      eyebrow: "現在の注力分野",
      items: [
        {
          title: "8Agents",
          desc: "インドネシア中小企業（UMKM）向けAI・デジタルブランディング支援および資産保管庫。",
          link: "/work/8agents/",
        },
        {
          title: "Rakusaku",
          desc: "DOKU・Pakasir決済連携による1分以内の高速ゲーム課金・バウチャープラットフォーム。",
          link: "/work/rakusaku/",
        },
        {
          title: "FE Cognitive Gym",
          desc: "日本の基本情報技術者試験（FE）対策のためのアクティブリコール＆CBTシミュレータ。",
          link: "/learn",
        },
        {
          title: "Kaidevlab",
          desc: "個人のクリエイティブ・テクノロジー・ラボおよび実験プラットフォーム。",
          link: "/",
        },
        {
          title: "Blue Vengeance",
          desc: "オリジナル長編アニメ・ウェブトゥーン作品（プレプロダクション中）。",
          link: "/work/blue-vengeance/",
        },
        {
          title: "Visual production",
          desc: "映像編集、モーショングラフィックス、AI映画制作ワークフロー。",
        },
      ],
    },
    principles: {
      eyebrow: "Build · Code · Create",
      heading: "ひとつのアイデンティティ、3つの探求。",
      description:
        "エンジニアリングとストーリーテリングを切り離しません。プロダクトの明確さ、技術的実行力、そしてクリエイティブディレクションはお互いを高め合います。",
      cards: [
        {
          title: "構築 (Build)",
          desc: "アイデアを実用的なプロダクト、稼働するシステム、プロトタイプへと具現化。",
        },
        {
          title: "実装 (Code)",
          desc: "実際のプロジェクトを通じてアーキテクチャ、AIワークフロー、堅牢性、デプロイを習得。",
        },
        {
          title: "創作 (Create)",
          desc: "ビジュアルディレクション、映像編集、キャラクター設計、長編ストーリーの構築。",
        },
      ],
    },
  },
};

export function AboutClient() {
  const { locale } = useLanguage();
  const c = contentByLocale[locale] || contentByLocale.en;

  return (
    <main className="page-shell about-page">
      <section className="about-page-hero">
        <div className="about-page-image">
          <Image
            src="/about.webp"
            alt="Kai, an independent builder based in Japan"
            width={600}
            height={800}
            priority
          />
        </div>
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>{c.heading}</h1>
          <p className="lead">{c.lead}</p>
          <div className="actions">
            <a className="primary" href="/contact/">
              {c.actions.contact}
            </a>
            <a className="secondary" href="/work/">
              {c.actions.work}
            </a>
            <a className="secondary" href="/resume.pdf" target="_blank" rel="noreferrer">
              {c.actions.cv}
            </a>
          </div>
        </div>
      </section>

      <section className="about-story-grid">
        <article>
          <p className="eyebrow">{c.howIWork.eyebrow}</p>
          <h2>{c.howIWork.title}</h2>
          <p>{c.howIWork.description}</p>
        </article>
        <article>
          <p className="eyebrow">{c.focus.eyebrow}</p>
          <ul className="focus-list">
            {c.focus.items.map((item) => (
              <li key={item.title}>
                <strong>
                  {item.link ? (
                    <a href={item.link} className="hover:text-[var(--brand-primary)] transition-colors">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </strong>
                <span>{item.desc}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="principles-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{c.principles.eyebrow}</p>
            <h2>{c.principles.heading}</h2>
          </div>
          <p>{c.principles.description}</p>
        </div>
        <div className="principles-grid">
          {c.principles.cards.map((card, index) => (
            <article key={card.title}>
              <span>0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
