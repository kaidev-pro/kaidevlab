/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { Code2, Cpu, Film, Palette, ScanLine, Sparkles } from "lucide-react";
import Image from "next/image";
import { KaiParallaxHero } from "@/components/kai-parallax-hero";
import { ProjectCard } from "@/components/project-card";
import { creativeProjects, featuredProjects } from "@/lib/site-data";
import { FeLiveWidget } from "@/components/fe-study/fe-live-widget";
import { useLanguage } from "@/lib/i18n/context";

const capabilityIcons = [Code2, Cpu, Palette, Film];

const building = ["8Agents", "Kaidevlab redesign", "Rakusaku", "FE Study Hub"];
const exploring = ["FE Exam Prep (基本情報技術者試験) 🇯🇵", "Manhwa production", "Visual storytelling", "AI-assisted filmmaking", "Product storytelling", "Video editing"];

export default function Home() {
  const { t } = useLanguage();
  const blueVengeance = creativeProjects.find((project) => project.slug === "blue-vengeance");

  return (
    <main>
      <section id="top" className="hero-section">
        <KaiParallaxHero />
      </section>

      <section id="work" className="section work-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.work.eyebrow}</p>
            <h2>{t.work.heading}</h2>
          </div>
          <p>{t.work.description}</p>
        </div>
        <div className="selected-work-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard project={project} featured={index === 0} key={project.slug} />
          ))}
        </div>
        <div className="section-action"><a className="secondary" href="/work/">{t.work.exploreAll}</a></div>
      </section>

      <section className="section capabilities-section">
        <div className="capabilities-intro">
          <p className="eyebrow">{t.capabilities.eyebrow}</p>
          <h2>{t.capabilities.heading}</h2>
          <p>{t.capabilities.description}</p>
          <div className="stack-line" aria-label="Selected tools">
            <span>Next.js</span><span>TypeScript</span><span>Python</span><span>PostgreSQL</span><span>Docker</span><span>CapCut</span>
          </div>
        </div>
        <div className="capabilities-grid">
          {t.capabilities.items.map((item, index) => {
            const Icon = capabilityIcons[index % capabilityIcons.length];
            return (
              <article className="capability-card" key={item.title}>
                <div className="icon-wrap"><Icon size={22} /></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section now-section">
        <div className="now-intro">
          <p className="eyebrow">{t.now.eyebrow}</p>
          <h2>{t.now.heading}</h2>
          <p>{t.now.description}</p>
        </div>
        <div className="now-grid">
          <article className="now-card">
            <div className="now-card-title"><ScanLine size={20} /><h3>{t.now.buildingTitle}</h3></div>
            <ul>{building.map((item) => <li key={item}><span />{item}</li>)}</ul>
          </article>
          <article className="now-card">
            <div className="now-card-title"><Sparkles size={20} /><h3>{t.now.exploringTitle}</h3></div>
            <ul>
              {exploring.map((item) => (
                <li key={item}>
                  <span />
                  {item.includes("FE Exam") ? (
                    <a href="/learn" className="hover:text-[var(--brand-primary)] underline decoration-[var(--border)] transition-colors font-medium">
                      {item} →
                    </a>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          </article>
          <FeLiveWidget />
        </div>
      </section>

      <section id="creative" className="section creative-section">
        <div className="section-heading creative-heading">
          <div>
            <p className="eyebrow">{t.creative.eyebrow}</p>
            <h2>{t.creative.heading}</h2>
          </div>
          <p>{t.creative.description}</p>
        </div>
        <div className="creative-grid">
          {blueVengeance ? <ProjectCard project={blueVengeance} featured /> : null}
        </div>
      </section>

      <section id="about" className="section about-preview">
        <div className="about-visual">
          <Image src="/about.webp" alt="Kai, an independent builder based in Japan" width={600} height={800} sizes="(max-width: 767px) 100vw, 34vw" />
          <div className="about-visual-label"><span>{t.hero.basedIn}</span><strong>{t.hero.buildingIndependently}</strong></div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">{t.nav.about} Kai</p>
          <h2>{t.hero.headlinePrefix} {t.hero.headlineHighlight}</h2>
          <p className="lead">{t.hero.lead}</p>
          <p>{t.capabilities.description}</p>
          <a className="secondary" href="/about/">{t.hero.meetKai}</a>
        </div>
      </section>

      <section id="notes" className="section lab-notes-section">
        <div className="lab-transition" aria-hidden="true"><span>Entering the lab</span></div>
        <div className="section-heading notes-heading">
          <div>
            <p className="eyebrow">{t.notes.eyebrow}</p>
            <h2>{t.notes.heading}</h2>
          </div>
          <p>{t.notes.description}</p>
        </div>
        <div className="notes-feature-layout">
          <article className="journal-entry featured-note">
            <div className="entry-meta"><span className="entry-id">Lab Note 01</span><span className="entry-category">Published</span></div>
            <div className="entry-content">
              <h3>Behind the Kaidevlab Redesign: Turning a Portfolio into a Creative Technology Lab</h3>
              <p>How product proof, honest status, and a brighter lab-style brand system come together.</p>
            </div>
            <div className="entry-footer">
              <span className="entry-date">July 2026</span>
              <a className="entry-link" href="/lab-notes/behind-kaidevlab-redesign/">{t.notes.readNote}</a>
            </div>
          </article>
          <aside className="upcoming-notes" aria-label="Upcoming notes">
            <p className="eyebrow">Upcoming Notes</p>
            <ul>
              <li><span>Building a reliable AI workflow for UMKM intake</span><small>Coming Soon</small></li>
              <li><span>Building the visual direction for Blue Vengeance</span><small>Coming Soon</small></li>
            </ul>
          </aside>
        </div>
        <div className="section-action"><a className="notes-secondary" href="/lab-notes/">{t.nav.labNotes}</a></div>
      </section>

      <section id="contact" className="section closing-section">
        <div className="closing-card">
          <p className="eyebrow">{t.cta.eyebrow}</p>
          <h2>{t.cta.heading}</h2>
          <p>{t.cta.description}</p>
          <div className="cta-tags"><span>Product builds</span><span>AI systems</span><span>Creative worlds</span></div>
          <a className="primary" href="/contact/">{t.cta.button}</a>
        </div>
      </section>
    </main>
  );
}
