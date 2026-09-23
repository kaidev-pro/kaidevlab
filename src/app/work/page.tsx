"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n/context";

const filters = ["All", "Products", "AI Systems", "Education", "Creative", "Experiments"] as const;
type Filter = "All" | (typeof filters)[number];

const filterLabels: Record<string, Record<Filter, string>> = {
  id: {
    All: "Semua",
    Products: "Produk",
    "AI Systems": "Sistem AI",
    Education: "Edukasi",
    Creative: "Kreatif",
    Experiments: "Eksperimen",
  },
  en: {
    All: "All",
    Products: "Products",
    "AI Systems": "AI Systems",
    Education: "Education",
    Creative: "Creative",
    Experiments: "Experiments",
  },
  ja: {
    All: "すべて",
    Products: "プロダクト",
    "AI Systems": "AIシステム",
    Education: "教育・学習",
    Creative: "クリエイティブ",
    Experiments: "実験",
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

  const eyebrow = locale === "id" ? "Karya" : locale === "ja" ? "作品一覧" : "Work";
  const heading =
    locale === "id"
      ? "Produk, sistem, edukasi, dan eksperimen kreatif."
      : locale === "ja"
      ? "プロダクト、AIシステム、学習ハブ、クリエイティブ実験。"
      : "Products, systems, education, and creative experiments.";
  const lead =
    locale === "id"
      ? "Setiap karya menampilkan status aslinya secara transparan—dari platform yang sudah live dan sistem bisnis hingga prototipe dan dunia cerita."
      : locale === "ja"
      ? "運用中のプラットフォームからビジネスシステム、試作モデル、プレプロダクションまで、すべてのプロジェクトの現在地を公開しています。"
      : "Every project keeps its current status visible—from live platforms and business systems to commerce prototypes and pre-production worlds.";

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
