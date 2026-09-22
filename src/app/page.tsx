/* eslint-disable @next/next/no-html-link-for-pages */
import { Code2, Cpu, Film, Palette, ScanLine, Sparkles } from "lucide-react";
import Image from "next/image";
import { KaiParallaxHero } from "@/components/kai-parallax-hero";
import { ProjectCard } from "@/components/project-card";
import { creativeProjects, featuredProjects } from "@/lib/site-data";
import { FeLiveWidget } from "@/components/fe-study/fe-live-widget";

const capabilities = [
  {
    icon: Code2,
    title: "Product Engineering",
    description: "From concept and architecture to interface, backend, deployment, and iteration.",
  },
  {
    icon: Cpu,
    title: "AI Systems",
    description: "AI agents, model routing, automation, prompt systems, and reliable generative workflows.",
  },
  {
    icon: Palette,
    title: "Creative Direction",
    description: "Brand identities, interface direction, digital characters, and content concepts.",
  },
  {
    icon: Film,
    title: "Visual Storytelling",
    description: "Video editing, cinematic pacing, sound direction, manhwa, and AI-assisted production.",
  },
];

const building = ["8Agents", "Kaidevlab redesign", "Rakusaku", "FE Study Hub"];
const exploring = ["FE Exam Prep (基本情報技術者試験) 🇯🇵", "Manhwa production", "Visual storytelling", "AI-assisted filmmaking", "Product storytelling", "Video editing"];

export default function Home() {
  const blueVengeance = creativeProjects.find((project) => project.slug === "blue-vengeance");

  return (
    <main>
      <section id="top" className="hero-section">
        <KaiParallaxHero />
      </section>

      <section id="work" className="section work-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2>Real products, honest status, clear direction.</h2>
          </div>
          <p>
            Products are shown with their current state—not a polished fiction of where they might be later.
          </p>
        </div>
        <div className="selected-work-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard project={project} featured={index === 0} key={project.slug} />
          ))}
        </div>
        <div className="section-action"><a className="secondary" href="/work/">Explore all work</a></div>
      </section>

      <section className="section capabilities-section">
        <div className="capabilities-intro">
          <p className="eyebrow">What I Do</p>
          <h2>Build · Code · Create</h2>
          <p>
            From product architecture and AI workflows to visual direction and motion, I work across disciplines to turn ideas into functioning experiences.
          </p>
          <div className="stack-line" aria-label="Selected tools">
            <span>Next.js</span><span>TypeScript</span><span>Python</span><span>PostgreSQL</span><span>Docker</span><span>CapCut</span>
          </div>
        </div>
        <div className="capabilities-grid">
          {capabilities.map(({ icon: Icon, title, description }) => (
            <article className="capability-card" key={title}>
              <div className="icon-wrap"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section now-section">
        <div className="now-intro">
          <p className="eyebrow">Now Building & Learning</p>
          <h2>Kaidevlab is not a museum of finished work.</h2>
          <p>It is a living record of what I’m building, learning, and improving.</p>
        </div>
        <div className="now-grid">
          <article className="now-card">
            <div className="now-card-title"><ScanLine size={20} /><h3>Building</h3></div>
            <ul>{building.map((item) => <li key={item}><span />{item}</li>)}</ul>
          </article>
          <article className="now-card">
            <div className="now-card-title"><Sparkles size={20} /><h3>Learning / Exploring</h3></div>
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
            <p className="eyebrow">Creative Lab</p>
            <h2>Stories begin as experiments, then find the right medium.</h2>
          </div>
          <p>
            Blue Vengeance is the current long-form creative focus—an original anime series shaped through character drama, cinematic direction, and visual storytelling.
          </p>
        </div>
        <div className="creative-grid">
          {blueVengeance ? <ProjectCard project={blueVengeance} featured /> : null}
        </div>
      </section>

      <section id="about" className="section about-preview">
        <div className="about-visual">
          <Image src="/about.webp" alt="Kai, an independent builder based in Japan" width={600} height={800} sizes="(max-width: 767px) 100vw, 34vw" />
          <div className="about-visual-label"><span>Based in Japan</span><strong>Independent builder</strong></div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">About Kai</p>
          <h2>I’m Kai, an independent builder based in Japan.</h2>
          <p className="lead">
            I create digital products and explore how AI, design, code, and storytelling can work together to turn ideas into useful and memorable experiences.
          </p>
          <p>
            I learn by building. Some projects become products, some become experiments, and others become stories—but each one becomes part of Kaidevlab.
          </p>
          <a className="secondary" href="/about/">More About Me</a>
        </div>
      </section>

      <section id="notes" className="section lab-notes-section">
        <div className="lab-transition" aria-hidden="true"><span>Entering the lab</span></div>
        <div className="section-heading notes-heading">
          <div>
            <p className="eyebrow">Lab Notes</p>
            <h2>Build logs, tutorials, and field notes from the lab.</h2>
          </div>
          <p>One published note, with future topics shown honestly as upcoming—not as finished articles.</p>
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
              <a className="entry-link" href="/lab-notes/behind-kaidevlab-redesign/">Read Article</a>
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
        <div className="section-action"><a className="notes-secondary" href="/lab-notes/">View Lab Notes</a></div>
      </section>

      <section id="contact" className="section closing-section">
        <div className="closing-card">
          <p className="eyebrow">Open to Collaboration</p>
          <h2>Have an idea, collaboration, or interesting problem?</h2>
          <p>Let’s explore what we can build together—from useful products and AI systems to creative worlds with a strong point of view.</p>
          <div className="cta-tags"><span>Product builds</span><span>AI systems</span><span>Creative worlds</span></div>
          <a className="primary" href="/contact/">Start a Conversation</a>
        </div>
      </section>
    </main>
  );
}
