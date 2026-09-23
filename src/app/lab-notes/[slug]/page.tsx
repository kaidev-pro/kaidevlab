/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const slug = "behind-kaidevlab-redesign";

export function generateStaticParams() {
  return [{ slug }];
}

export const metadata: Metadata = {
  title: "Behind the Kaidevlab Redesign — Lab Notes",
  description: "How Kaidevlab evolved from a conventional portfolio into a living creative technology lab.",
  alternates: { canonical: `/lab-notes/${slug}/` },
};

export default async function Note({ params }: { params: Promise<{ slug: string }> }) {
  const current = await params;
  if (current.slug !== slug) notFound();

  return (
    <main className="page-shell article-page">
      <header className="article-header">
        <p className="eyebrow">Lab Note 01 · July 2026</p>
        <h1>Behind the Kaidevlab Redesign: Turning a Portfolio into a Creative Technology Lab</h1>
        <p className="lead">A portfolio should not only show finished work. It should make the builder’s direction, standards, and growth visible.</p>
      </header>

      <article className="article-body">
        <p className="article-intro">
          The first version of Kaidevlab worked as a developer portfolio, but it did not fully represent the work behind it. Products, AI systems, visual experiments, editing, and original stories appeared as separate interests instead of one connected practice.
        </p>

        <h2>The positioning had to come first</h2>
        <p>
          The redesign began with a simpler question: what is Kaidevlab actually for? The answer was not “a software agency” and not “an online résumé.” Kaidevlab became the personal creative technology lab of Kai—a place where products, systems, experiments, and stories can coexist under one clear identity.
        </p>
        <blockquote>Build · Code · Create became more than a tagline. It became the structure for deciding what belongs on the site.</blockquote>

        <h2>Honest status is part of the design</h2>
        <p>
          A portfolio becomes less trustworthy when every project is presented as complete. 8Agents is live serving UMKM clients, 8Router is in active beta, Rakusaku is live with DOKU &amp; Pakasir payment gateways (&lt;60s fulfillment), and Blue Vengeance is in pre-production. Those labels are not weaknesses to hide; they help visitors understand the real state of the work.
        </p>

        <h2>The hero needed a signature</h2>
        <p>
          Kai’s holographic coding video became the visual foundation. The website palette follows the same ice-white, electric-blue, cyan, and deep-navy environment. Instead of forcing the video into a dark card, the page is designed to feel like the same laboratory continuing beyond the frame.
        </p>

        <h2>Product proof matters more than decoration</h2>
        <p>
          Strong typography and futuristic details can create atmosphere, but they cannot replace evidence. The next asset pass focuses on real interface captures for 8Agents, 8Router, NihongoGate, and Rakusaku. Until those captures are ready, the site keeps the project state and live links explicit rather than inventing fake dashboards.
        </p>

        <h2>A living portfolio can change direction</h2>
        <p>
          Kai Revengers began as an AI-assisted anime experiment. The production lessons remain valuable, but the long-form story now has a better path: Blue Vengeance will begin as a manhwa. That makes the story, character arcs, and visual continuity easier to develop before any future animation adaptation.
        </p>

        <h2>What comes next</h2>
        <p>
          Kaidevlab will keep evolving through real project screenshots, deeper case studies, published build logs, and the gradual development of Blue Vengeance. The goal is not to make the site look permanently finished. The goal is to make every update more truthful, useful, and recognizably Kaidevlab.
        </p>
      </article>

      <div className="article-actions"><a className="secondary" href="/lab-notes/">Back to Lab Notes</a><a className="primary" href="/work/">Explore the Work</a></div>
    </main>
  );
}
