import type { Metadata } from "next";
import { Code, FileText, Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Kaidevlab",
  description: "Get in touch with Kai for product building, AI systems, creative technology, visual storytelling, or collaboration at Kaidevlab.",
};

const contactOptions = [
  {
    icon: Mail,
    title: "Email",
    description: "Best for project details, collaboration context, and longer conversations.",
    label: "Send an email",
    href: "mailto:baguswirantowicaksono@gmail.com",
  },
  {
    icon: MessageCircle,
    title: "X / @Kiminoheroo",
    description: "Best for quick introductions, public conversations, and following the build process.",
    label: "Open X profile",
    href: "https://x.com/Kiminoheroo",
  },
  {
    icon: Code,
    title: "GitHub / kaidev-pro",
    description: "Explore public repositories, experiments, and developer-tool work.",
    label: "Open GitHub",
    href: "https://github.com/kaidev-pro",
  },
  {
    icon: FileText,
    title: "Resume / CV",
    description: "Download verified engineering background, product milestones, and technical capabilities.",
    label: "Download Resume",
    href: "/resume.pdf",
  },
] as const;

export default function Contact() {
  return (
    <main className="page-shell contact-page">
      <header className="page-hero compact-page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Have an idea, collaboration, or interesting problem?</h1>
        <p className="lead">
          The best fit is product building, AI systems, creative technology, visual storytelling, or a project where engineering and creative direction need to work together.
        </p>
      </header>

      <section className="contact-options">
        {contactOptions.map(({ icon: Icon, title, description, label, href }) => (
          <a className="contact-card" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} key={title}>
            <div className="icon-wrap"><Icon size={22} /></div>
            <h2>{title}</h2>
            <p>{description}</p>
            <span>{label} →</span>
          </a>
        ))}
      </section>

      <section className="contact-fit">
        <p className="eyebrow">Helpful Context</p>
        <h2>A good first message can be simple.</h2>
        <p>Share what you are building, what stage it is in, what kind of help you need, and any deadline or constraint that matters. A polished brief is not required.</p>
      </section>
    </main>
  );
}
