"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { projectDetailLabels, localizedProjectDetails } from "@/lib/i18n/project-details";

interface ClientProjectProps {
  slug: string;
  initialProject: {
    title: string;
    category: string;
    status: string;
    role: string;
    logo?: string;
    coverImage?: string;
    liveUrl?: string;
    year: string;
    stack: readonly string[];
    summary: string;
    problem: string;
    goals: readonly string[];
    features: readonly string[];
    approach: string;
    challenges: readonly string[];
    limitations: readonly string[];
    next: readonly string[];
    kind?: string;
    poster?: string;
  };
  previousSlug: string;
  nextSlug: string;
  previousProject: {
    title: string;
    category: string;
  };
  nextProject: {
    title: string;
    category: string;
  };
}

export function ClientProject({
  slug,
  initialProject,
  previousSlug,
  nextSlug,
  previousProject,
  nextProject,
}: ClientProjectProps) {
  const { locale } = useLanguage();
  const creative = initialProject.kind === "creative";

  const labels = projectDetailLabels[locale] || projectDetailLabels.en;
  const sectionLabels = creative ? labels.creative : labels.standard;

  // Merge localized overrides for the current project
  const overrides = localizedProjectDetails[locale]?.[slug] || {};
  const prevOverrides = localizedProjectDetails[locale]?.[previousSlug] || {};
  const nextOverrides = localizedProjectDetails[locale]?.[nextSlug] || {};

  const p = {
    ...initialProject,
    ...overrides,
    goals: (overrides.goals as string[]) || initialProject.goals,
    features: (overrides.features as string[]) || initialProject.features,
    challenges: (overrides.challenges as string[]) || initialProject.challenges,
    limitations: (overrides.limitations as string[]) || initialProject.limitations,
    next: (overrides.next as string[]) || initialProject.next,
  };

  const prevTitle = prevOverrides.title || previousProject.title;
  const prevCategory = prevOverrides.category || previousProject.category;
  const nextTitle = nextOverrides.title || nextProject.title;
  const nextCategory = nextOverrides.category || nextProject.category;

  return (
    <main className="section detail-page">
      <a className="secondary" href="/work/">
        {labels.backToWork}
      </a>
      <section className="detail-hero">
        <div>
          <p className="eyebrow">{p.category}</p>
          <h1>{p.title}</h1>
          <p className="lead">{p.summary}</p>
          <div className="detail-actions">
            <span className="status">{p.status}</span>
            {p.liveUrl && (
              <a className="primary" href={p.liveUrl} target="_blank" rel="noreferrer">
                {labels.visitLive}
              </a>
            )}
          </div>
        </div>
        <div className="detail-card">
          {!creative && p.logo && (
            <Image
              src={p.logo}
              alt=""
              aria-hidden="true"
              width={88}
              height={88}
              style={{ objectFit: "contain" }}
            />
          )}
          <p>
            <b>{labels.role}</b>
            <br />
            {p.role}
          </p>
          <p>
            <b>{labels.year}</b>
            <br />
            {p.year}
          </p>
        </div>
      </section>

      {p.poster ? (
        <figure className="detail-poster">
          <Image
            src={p.poster}
            alt={`${p.title} poster`}
            width={900}
            height={1350}
            sizes="(max-width: 760px) 100vw, 720px"
          />
          <figcaption>{p.title} key visual / poster.</figcaption>
        </figure>
      ) : p.coverImage ? (
        <figure className="detail-showcase">
          <div className="detail-showcase-bar">
            <div className="detail-showcase-dots" aria-hidden="true">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="detail-showcase-url">
              <span>
                {p.liveUrl
                  ? p.liveUrl.startsWith("http")
                    ? p.liveUrl.replace(/^https?:\/\//, "")
                    : `kaidevlab.com${p.liveUrl}`
                  : p.title}
              </span>
            </div>
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target={p.liveUrl.startsWith("http") ? "_blank" : undefined}
                rel={p.liveUrl.startsWith("http") ? "noreferrer" : undefined}
                className="detail-showcase-link"
              >
                {labels.visitLive} ↗
              </a>
            )}
          </div>
          <div className="detail-showcase-viewport">
            <Image
              src={p.coverImage}
              alt={`${p.title} live interface preview`}
              width={1440}
              height={900}
              sizes="(max-width: 768px) 100vw, 1100px"
              priority
            />
          </div>
          <figcaption>
            {locale === "id"
              ? `Tangkapan layar antarmuka langsung ${p.title} — ${p.status}`
              : locale === "ja"
              ? `${p.title} のライブUIプレビュー — ${p.status}`
              : `Live interface preview of ${p.title} — ${p.status}`}
          </figcaption>
        </figure>
      ) : creative && p.logo ? (
        <section className="detail-concept-visual" aria-label={`${p.title} visual development status`}>
          <Image src={p.logo} alt="" aria-hidden="true" width={96} height={96} />
          <p className="eyebrow">Visual Development</p>
          <h2>{p.title}</h2>
          <span>
            {locale === "id"
              ? "Karya visual pra-produksi sedang dikembangkan. Belum ada bab yang dirilis."
              : locale === "ja"
              ? "プレプロダクションのアートワークを開発中です。公開チャプターはまだありません。"
              : "Pre-production artwork is being developed. No released chapter visual is claimed here."}
          </span>
        </section>
      ) : null}

      {creative && (
        <section className="creative-facts" aria-label="Production facts">
          <span>{locale === "id" ? `Status: ${p.status}` : `Status: ${p.status}`}</span>
          <span>
            {locale === "id"
              ? "Format: Eksperimen cerita / kreatif"
              : locale === "ja"
              ? "フォーマット: クリエイティブ・ストーリー実験"
              : "Format: Creative / story experiment"}
          </span>
          <span>
            {locale === "id"
              ? "Komitmen: Tidak menjanjikan bab atau episode yang belum rilis"
              : locale === "ja"
              ? "未公開のエピソードやチャプターの保証はありません"
              : "Claims: No unreleased chapters or episodes promised"}
          </span>
        </section>
      )}

      <section className="detail-grid">
        <article>
          <h2>{sectionLabels.problem}</h2>
          <p>{p.problem}</p>
        </article>
        <article>
          <h2>{sectionLabels.goals}</h2>
          <ul>
            {p.goals.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>{sectionLabels.features}</h2>
          <ul>
            {p.features.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>{sectionLabels.approach}</h2>
          <p>{p.approach}</p>
        </article>
        <article>
          <h2>{sectionLabels.challenges}</h2>
          <ul>
            {p.challenges.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>{sectionLabels.limitations}</h2>
          <ul>
            {p.limitations.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>{sectionLabels.next}</h2>
          <ul>
            {p.next.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="detail-next" aria-label="More projects">
        <div>
          <p className="eyebrow">{labels.moreWork}</p>
          <h2>{creative ? labels.keepExploringCreative : labels.keepExploring}</h2>
        </div>
        <div className="detail-next-grid">
          <a href={`/work/${previousSlug}/`}>
            <span>{labels.previous}</span>
            <strong>{prevTitle}</strong>
            <small>{prevCategory}</small>
          </a>
          <a href={`/work/${nextSlug}/`}>
            <span>{labels.next}</span>
            <strong>{nextTitle}</strong>
            <small>{nextCategory}</small>
          </a>
        </div>
        <div className="detail-bottom-actions">
          <a className="secondary" href="/work/">
            {labels.backToAll}
          </a>
          {creative ? (
            <a className="primary" href="/work/">
              {labels.exploreCreative}
            </a>
          ) : (
            p.liveUrl && (
              <a className="primary" href={p.liveUrl} target="_blank" rel="noreferrer">
                {labels.visitLiveBottom}
              </a>
            )
          )}
        </div>
      </section>
    </main>
  );
}
