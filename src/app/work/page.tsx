"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n/context";

const filters = ["All", "Products", "Systems & Automation", "Education", "Creative"] as const;
type Filter = "All" | (typeof filters)[number];

const filterLabels: Record<string, Record<Filter, string>> = {
  id: {
    All: "Semua",
    Products: "Produk",
    "Systems & Automation": "Sistem & Otomasi",
    Education: "Edukasi",
    Creative: "Kreatif & Visual",
  },
  en: {
    All: "All",
    Products: "Products",
    "Systems & Automation": "Systems & Automation",
    Education: "Education",
    Creative: "Creative & Visual",
  },
  ja: {
    All: "すべて",
    Products: "プロダクト",
    "Systems & Automation": "システム・自動化",
    Education: "教育・学習",
    Creative: "映像・クリエイティブ",
  },
};

export default function Work() {
  const { locale } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const filteredProjects = useMemo(
    () => (activeFilter === "All" ? projects : projects.filter((project) => project.group === activeFilter)),
    [activeFilter],
  );

  const labels = filterLabels[locale] || filterLabels.en;

  const eyebrow = locale === "id" ? "Katalog Karya" : locale === "ja" ? "作品・実績" : "Selected Work";
  const heading =
    locale === "id"
      ? "Produk web, arsitektur sistem, edukasi, dan karya visual."
      : locale === "ja"
      ? "Webプロダクト、システム自動化、学習ハブ、映像制作。"
      : "Web applications, systems automation, education, and visual media.";
  const lead =
    locale === "id"
      ? "Setiap proyek ditampilkan sesuai status aslinya—dari platform yang sudah beroperasi di production hingga karya video dan pilot kreatif."
      : locale === "ja"
      ? "本番稼働中のWebプラットフォームから業務システム、映像制作、アニメパイロットまで、実装ステータスを公開しています。"
      : "Every project keeps its verified production status visible—from live web platforms and backend automation to commercial UGC and creative pilots.";

  const countText =
    locale === "id"
      ? `Menampilkan ${filteredProjects.length} dari ${projects.length} karya.`
      : locale === "ja"
      ? `${projects.length}件中 ${filteredProjects.length}件を表示中。`
      : `Showing ${filteredProjects.length} of ${projects.length} projects.`;

  return (
    <main className="page-shell work-page">
      <header className="page-hero compact-page-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{heading}</h1>
        <p className="lead">{lead}</p>
      </header>

      <div className="work-filters" aria-label="Work filters">
        {filters.map((filter) => (
          <button
            className={activeFilter === filter ? "active" : ""}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {labels[filter]}
          </button>
        ))}
      </div>
      <p className="filter-count" aria-live="polite">
        {countText}
      </p>

      <div className="work-page-grid">
        {filteredProjects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>
    </main>
  );
}
