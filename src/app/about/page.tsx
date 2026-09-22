/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Kai — Kaidevlab",
  description: "Kai is an independent builder in Japan creating AI products, developer tools, learning platforms, and creative experiments under Kaidevlab.",
};

const timeline = [
  ["Build", "Turning ideas into useful products, systems, and working prototypes."],
  ["Code", "Learning architecture, AI workflows, reliability, and deployment through real projects."],
  ["Create", "Developing visual direction, editing, character worlds, and long-form storytelling."],
] as const;

export default function About() {
  return (
    <main className="page-shell about-page">
      <section className="about-page-hero">
        <div className="about-page-image">
          <Image src="/about.webp" alt="Kai, an independent builder based in Japan" width={600} height={800} priority />
        </div>
        <div>
          <p className="eyebrow">About Kai</p>
          <h1>I’m Kai, an independent builder based in Japan.</h1>
          <p className="lead">
            Kaidevlab is my personal creative technology lab—a place to build products, code systems, and shape stories with honest status and clear direction.
          </p>
          <div className="actions">
            <a className="primary" href="/contact/">Start a Conversation</a>
            <a className="secondary" href="/work/">Explore My Work</a>
            <a className="secondary" href="/resume.pdf" target="_blank" rel="noreferrer">Download CV / Resume</a>
          </div>
        </div>
      </section>

      <section className="about-story-grid">
        <article>
          <p className="eyebrow">How I Work</p>
          <h2>I learn by building.</h2>
          <p>
            Some projects become products, some become experiments, and others become story worlds. Each one teaches the next—about product decisions, technical trade-offs, visual taste, and how to keep improving without pretending everything is already finished.
          </p>
        </article>
        <article>
          <p className="eyebrow">Current Focus</p>
          <ul className="focus-list">
            <li><strong>8Agents</strong><span>AI-assisted business transformation for UMKM.</span></li>
            <li><strong>FE Cognitive Gym</strong><span>Interactive study hub &amp; CBT simulator for Japan’s FE certification (基本情報).</span></li>
            <li><strong>Kaidevlab</strong><span>Personal brand and living creative technology lab.</span></li>
            <li><strong>Blue Vengeance</strong><span>Original long-form anime/manhwa in pre-production.</span></li>
            <li><strong>Visual production</strong><span>Editing, motion, and AI-assisted filmmaking.</span></li>
          </ul>
        </article>
      </section>

      <section className="principles-section">
        <div className="section-heading">
          <div><p className="eyebrow">Build · Code · Create</p><h2>One identity, three connected practices.</h2></div>
          <p>I do not separate engineering from storytelling. Product clarity, technical execution, and creative direction make each other stronger.</p>
        </div>
        <div className="principles-grid">
          {timeline.map(([title, description], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>
    </main>
  );
}