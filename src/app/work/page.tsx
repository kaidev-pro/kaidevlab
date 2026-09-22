"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { projects, type ProjectGroup } from "@/lib/site-data";

const filters = ["All", "Products", "AI Systems", "Education", "Creative", "Experiments"] as const;
type Filter = "All" | (typeof filters)[number];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const filteredProjects = useMemo(
    () => activeFilter === "All" ? projects : projects.filter((project) => project.group === activeFilter),
    [activeFilter],
  );

  return (
    <main className="page-shell work-page">
      <header className="page-hero compact-page-hero">
        <p className="eyebrow">Work</p>
        <h1>Products, systems, education, and creative experiments.</h1>
        <p className="lead">
          Every project keeps its current status visible—from live platforms and business systems to commerce prototypes and pre-production worlds.
        </p>
      </header>

      <div className="work-filters" aria-label="Work filters">
        {filters.map((filter) => (
          <button
            className={activeFilter === filter ? "active" : ""}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      <p className="filter-count" aria-live="polite">Showing {filteredProjects.length} of {projects.length} projects.</p>

      <div className="work-page-grid">
        {filteredProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}
      </div>
    </main>
  );
}
