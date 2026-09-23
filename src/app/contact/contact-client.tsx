"use client";

import { Code, FileText, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface ContactDictionary {
  eyebrow: string;
  heading: string;
  lead: string;
  options: Array<{
    title: string;
    description: string;
    label: string;
    href: string;
  }>;
  context: {
    eyebrow: string;
    heading: string;
    description: string;
  };
}

const contactIcons = [Mail, MessageCircle, Code, FileText];

const contactByLocale: Record<string, ContactDictionary> = {
  en: {
    eyebrow: "Contact",
    heading: "Have an idea, collaboration, or interesting problem?",
    lead: "The best fit is product building, AI systems, creative technology, visual storytelling, or a project where engineering and creative direction need to work together.",
    options: [
      {
        title: "Email",
        description: "Best for project details, collaboration context, and longer conversations.",
        label: "Send an email",
        href: "mailto:baguswirantowicaksono@gmail.com",
      },
      {
        title: "X / @Kiminoheroo",
        description: "Best for quick introductions, public conversations, and following the build process.",
        label: "Open X profile",
        href: "https://x.com/Kiminoheroo",
      },
      {
        title: "GitHub / kaidev-pro",
        description: "Explore public repositories, experiments, and developer-tool work.",
        label: "Open GitHub",
        href: "https://github.com/kaidev-pro",
      },
      {
        title: "Resume / CV",
        description: "Download verified engineering background, product milestones, and technical capabilities.",
        label: "Download Resume",
        href: "/resume.pdf",
      },
    ],
    context: {
      eyebrow: "Helpful Context",
      heading: "A good first message can be simple.",
      description:
        "Share what you are building, what stage it is in, what kind of help you need, and any deadline or constraint that matters. A polished brief is not required.",
    },
  },
  id: {
    eyebrow: "Kontak",
    heading: "Punya ide, peluang kolaborasi, atau tantangan menarik?",
    lead: "Sangat terbuka untuk pengembangan produk digital, sistem AI, teknologi kreatif, visual storytelling, atau proyek di mana rekayasa teknis dan arahan desain berpadu harmonis.",
    options: [
      {
        title: "Email",
        description: "Pilihan terbaik untuk detail proyek, konteks kolaborasi, dan diskusi terstruktur.",
        label: "Kirim email",
        href: "mailto:baguswirantowicaksono@gmail.com",
      },
      {
        title: "X / @Kiminoheroo",
        description: "Terbaik untuk sapaan singkat, percakapan terbuka, dan mengikuti proses pembangunan langsung.",
        label: "Buka profil X",
        href: "https://x.com/Kiminoheroo",
      },
      {
        title: "GitHub / kaidev-pro",
        description: "Jelajahi repositori publik, eksperimen kode, dan perangkat rekayasa pengembang.",
        label: "Buka GitHub",
        href: "https://github.com/kaidev-pro",
      },
      {
        title: "Resume / CV",
        description: "Unduh latar belakang rekayasa terverifikasi, rekam jejak produk, dan kapabilitas teknis.",
        label: "Unduh Resume",
        href: "/resume.pdf",
      },
    ],
    context: {
      eyebrow: "Konteks Awal",
      heading: "Pesan pertama yang baik cukup sederhana.",
      description:
        "Cukup ceritakan apa yang sedang Anda bangun, di tahap apa sekarang, bantuan seperti apa yang dibutuhkan, serta tenggat waktu atau batasan yang ada. Tidak perlu brief formal yang kaku.",
    },
  },
  ja: {
    eyebrow: "お問い合わせ",
    heading: "アイデア、協業のご相談、または興味深い課題をお持ちですか？",
    lead: "プロダクト開発、AIシステム、クリエイティブ・テクノロジー、ビジュアルストーリーテリング、エンジニアリングとクリエイティブが交差するプロジェクトを歓迎します。",
    options: [
      {
        title: "メール (Email)",
        description: "プロジェクトの詳細、協業のご相談、詳細なやり取りに最適です。",
        label: "メールを送信",
        href: "mailto:baguswirantowicaksono@gmail.com",
      },
      {
        title: "X / @Kiminoheroo",
        description: "簡単な挨拶、オープンな会話、日々の開発プロセスの確認に適しています。",
        label: "X プロフィールを開く",
        href: "https://x.com/Kiminoheroo",
      },
      {
        title: "GitHub / kaidev-pro",
        description: "公開リポジトリ、技術実験、開発ツールのソースコードをご覧ください。",
        label: "GitHub を開く",
        href: "https://github.com/kaidev-pro",
      },
      {
        title: "履歴書 / CV",
        description: "エンジニアリング経歴、開発実績、技術スタックの概要をダウンロード。",
        label: "履歴書をダウンロード",
        href: "/resume.pdf",
      },
    ],
    context: {
      eyebrow: "メッセージのヒント",
      heading: "最初のメッセージはシンプルで構いません。",
      description:
        "開発しているもの、現在のフェーズ、必要なサポート、希望納期や制約などを気軽にお知らせください。完璧な仕様書は不要です。",
    },
  },
};

export function ContactClient() {
  const { locale } = useLanguage();
  const c = contactByLocale[locale] || contactByLocale.en;

  return (
    <main className="page-shell contact-page">
      <header className="page-hero compact-page-hero">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.heading}</h1>
        <p className="lead">{c.lead}</p>
      </header>

      <section className="contact-options">
        {c.options.map((opt, index) => {
          const Icon = contactIcons[index % contactIcons.length];
          return (
            <a
              className="contact-card"
              href={opt.href}
              target={opt.href.startsWith("http") ? "_blank" : undefined}
              rel={opt.href.startsWith("http") ? "noreferrer" : undefined}
              key={opt.title}
            >
              <div className="icon-wrap">
                <Icon size={22} />
              </div>
              <h2>{opt.title}</h2>
              <p>{opt.description}</p>
              <span>{opt.label} →</span>
            </a>
          );
        })}
      </section>

      <section className="contact-fit">
        <p className="eyebrow">{c.context.eyebrow}</p>
        <h2>{c.context.heading}</h2>
        <p>{c.context.description}</p>
      </section>
    </main>
  );
}
