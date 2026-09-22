import Image from "next/image";
import type { ProjectPreview } from "@/lib/site-data";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: ProjectPreview;
  featured?: boolean;
}) {
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
            <Image className="project-mark" src={project.logo} alt="" aria-hidden="true" width={96} height={96} />
            <div className="project-cover-wordmark" aria-hidden="true">{project.name}</div>
          </>
        )}
        <div className="project-cover-topline">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        <div className="project-signals" aria-label={`${project.name} highlights`}>
          {project.signals.map((signal) => <span key={signal}>{signal}</span>)}
        </div>
      </div>

      <div className="project-copy">
        <div>
          <p className="project-category">{project.category}</p>
          <h3>{project.name}</h3>
        </div>
        <p>{project.summary}</p>
        <p className="project-role">Kai’s role: {project.role}</p>
        <div className="project-meta-row">
          <span className="status-pill">{project.status}</span>
          <div className="project-actions">
            <a href={`/work/${project.slug}/`}>Overview</a>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.liveUrl.startsWith("http") ? "noreferrer" : undefined}
              >
                {project.liveUrl.startsWith("/") ? "Launch Hub" : "Live Site"}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
