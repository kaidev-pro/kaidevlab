"use client";

import Image from "next/image";
import type { ProjectPreview } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n/context";
import { localizedProjectDetails } from "@/lib/i18n/project-details";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: ProjectPreview;
  featured?: boolean;
}) {
  const { locale } = useLanguage();
  const overrides = localizedProjectDetails[locale]?.[project.slug] || {};

  const category = overrides.category || project.category;
  const status = overrides.status || project.status;
  const summary = overrides.summary || project.summary;
  const role = overrides.role || project.role;

  const roleLabel =
    locale === "id"
      ? "Peran Kai:"
      : locale === "ja"
      ? "Kaiの役割:"
      : "Kai’s role:";

  const overviewLabel =
    locale === "id"
      ? "Ringkasan"
      : locale === "ja"
      ? "概要"
      : "Overview";

  const liveSiteLabel =
    locale === "id"
      ? project.liveUrl?.startsWith("/")
        ? "Buka Hub"
        : "Situs Live"
      : locale === "ja"
      ? project.liveUrl?.startsWith("/")
        ? "ハブを開く"
        : "公式サイト"
      : project.liveUrl?.startsWith("/")
      ? "Launch Hub"
      : "Live Site";

  return (
    <article className={`project-card ${featured ? "project-featured" : ""} tone-${project.tone}`}>
      <div className={`project-cover ${project.coverImage ? "has-cover-image" : ""}`}>
        {project.coverImage ? (
          <Image
            className="project-cover-image"
            src={project.coverImage}
            alt={`${project.name} visual`}
            fill
            sizes={featured ? "(max-width: 767px) 100vw, 58vw" : "(max-width: 767px) 100vw, 36vw"}
            style={{ objectPosition: project.coverPosition ?? "center" }}
          />
        ) : (
          <>
            <div className="project-cover-grid" aria-hidden="true" />
            <Image
              className="project-mark"
              src={project.logo}
              alt=""
              aria-hidden="true"
              width={96}
              height={96}
              style={{ objectFit: "contain" }}
            />
            <div className="project-cover-wordmark" aria-hidden="true">
              {project.name}
            </div>
          </>
        )}
        <div className="project-cover-topline">
          <span>{category}</span>
          <span>{status}</span>
        </div>
        <div className="project-signals" aria-label={`${project.name} highlights`}>
          {project.signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      </div>

      <div className="project-copy">
        <div>
          <p className="project-category">{category}</p>
          <h3>{project.name}</h3>
        </div>
        <p>{summary}</p>
        <p className="project-role">
          {roleLabel} {role}
        </p>
        <div className="project-meta-row">
          <span className="status-pill">{status}</span>
          <div className="project-actions">
            <a href={`/work/${project.slug}/`}>{overviewLabel}</a>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.liveUrl.startsWith("http") ? "noreferrer" : undefined}
              >
                {liveSiteLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
