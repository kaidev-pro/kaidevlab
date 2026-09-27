"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { useLanguage } from "@/lib/i18n/context";

const articleChromeByLocale = {
  id: {
    eyebrow: "Catatan Lab 01 · Juli 2026",
    title: "Di Balik Redesain Kaidevlab: Mengubah Portofolio Menjadi Laboratorium Teknologi Kreatif",
    lead: "Portofolio seharusnya tidak hanya memajang karya selesai. Ia harus memperlihatkan arah, standar kualitas, dan proses tumbuh sang kreator secara nyata.",
    backLink: "← Kembali ke Catatan Lab",
    exploreWork: "Jelajahi Karya",
  },
  en: {
    eyebrow: "Lab Note 01 · July 2026",
    title: "Behind the Kaidevlab Redesign: Turning a Portfolio into a Creative Technology Lab",
    lead: "A portfolio should not only show finished work. It should make the builder’s direction, standards, and growth visible.",
    backLink: "← Back to Lab Notes",
    exploreWork: "Explore the Work",
  },
  ja: {
    eyebrow: "開発ノート 01 · 2026年7月",
    title: "Kaidevlabリニューアルの舞台裏：ポートフォリオを『生きたクリエイティブ・ラボ』へ",
    lead: "ポートフォリオは単なる完成品の陳列棚ではなく、開発者の明確な方向性、品質基準、そして成長の軌跡を可視化する場所であるべきです。",
    backLink: "← 開発ノート一覧に戻る",
    exploreWork: "実績・作品を見る",
  },
};

export function NoteArticleClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useLanguage();
  const c = articleChromeByLocale[locale] || articleChromeByLocale.en;

  return (
    <main className="page-shell article-page">
      <header className="article-header">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p className="lead">{c.lead}</p>
      </header>

      {children}

      <div className="article-actions">
        <a className="secondary" href="/lab-notes/">
          {c.backLink}
        </a>
        <a className="primary" href="/work/">
          {c.exploreWork}
        </a>
      </div>
    </main>
  );
}
