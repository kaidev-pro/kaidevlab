"use client";

import { useLanguage } from "@/lib/i18n/context";

interface LegalSection {
  title: string;
  desc: string;
}

interface LegalDictionary {
  eyebrow: string;
  heading: string;
  lead: string;
  sections: LegalSection[];
}

const termsByLocale: Record<string, LegalDictionary> = {
  id: {
    eyebrow: "KETENTUAN PENGGUNAAN",
    heading: "Ketentuan Penggunaan",
    lead: "Kaidevlab membagikan proyek pribadi, eksperimen teknologi, tulisan, dan karya visual. Silakan jelajahi situs ini dengan bijak dan perhatikan status proyek yang tercantum secara transparan.",
    sections: [
      {
        title: "Hak Kepemilikan Konten",
        desc: "Teks, visual, logo, poster, dan arahan kreatif yang ditampilkan di Kaidevlab adalah milik kreator atau pemilik hak cipta masing-masing. Mohon tidak menggunakan aset visual tanpa izin tertulis.",
      },
      {
        title: "Status Proyek",
        desc: "Sebagian proyek berstatus beta, prototipe, eksperimen arsip, atau konsep pra-produksi. Halaman ini adalah representasi portofolio rekayasa dan bukan jaminan ketersediaan komersial selamanya.",
      },
      {
        title: "Tautan Eksternal",
        desc: "Tautan proyek eksternal dan media sosial dapat mengalami perubahan atau dikelola di luar kendali langsung Kaidevlab.",
      },
      {
        title: "Sifat Eksperimental",
        desc: "Eksperimen kreatif, prototipe produk, dan demo pengembang dapat diperbarui, disesuaikan, atau mengalami perubahan seiring waktu.",
      },
      {
        title: "Batasan Tanggung Jawab",
        desc: "Kaidevlab disediakan sebagai situs portofolio dan informasi. Penggunaan proyek atau tautan eksternal dilakukan atas kebijaksanaan dan pertimbangan Anda sendiri.",
      },
    ],
  },
  en: {
    eyebrow: "TERMS OF USE",
    heading: "Terms of Use",
    lead: "Kaidevlab shares personal projects, experiments, engineering notes, and visual work. Use the site responsibly and treat project status labels as part of the authentic content.",
    sections: [
      {
        title: "Content ownership",
        desc: "Text, visuals, logos, posters, and creative direction shown on Kaidevlab belong to their respective creators or owners. Please do not reuse visual assets without permission.",
      },
      {
        title: "Project status",
        desc: "Some projects are beta releases, prototypes, archived experiments, or pre-production concepts. These pages represent real engineering milestones, not commercial guarantees.",
      },
      {
        title: "External links",
        desc: "External project and social links may change, update, or point to services outside of Kaidevlab’s direct control.",
      },
      {
        title: "Experimental availability",
        desc: "Creative experiments, developer tools, and product prototypes may be updated, refined, or revised over time as the lab evolves.",
      },
      {
        title: "Limitation of liability",
        desc: "Kaidevlab is provided as a living portfolio and informational platform. Exploration of linked services and external apps is done at your own discretion.",
      },
    ],
  },
  ja: {
    eyebrow: "利用規約",
    heading: "利用規約",
    lead: "Kaidevlab は個人プロジェクト、技術実験、開発ノート、および映像表現を発信するプラットフォームです。誠実な開発ステータスをご確認の上、適切にご利用ください。",
    sections: [
      {
        title: "コンテンツの権利帰属",
        desc: "当サイトに掲載されているテキスト、ビジュアル、ロゴ、ポスター、およびクリエイティブ表現の著作権は、各制作者および権利者に帰属します。無断転載・無断使用はご遠慮ください。",
      },
      {
        title: "プロジェクトの稼働ステータス",
        desc: "掲載プロジェクトにはベータ版、試作プロトタイプ、アーカイブ、または企画段階のものが含まれます。これらは技術的成果の記録であり、将来にわたる商業提供を保証するものではありません。",
      },
      {
        title: "外部リンクについて",
        desc: "外部プロジェクトやSNSへのリンクは予告なく変更される場合があり、当ラボの管理外のサービスに遷移することがあります。",
      },
      {
        title: "実験的機能・プロトタイプ",
        desc: "クリエイティブ実験や開発ツールは、継続的な改善およびラボの進化に伴い仕様変更や調整が行われる場合があります。",
      },
      {
        title: "免責事項",
        desc: "当サイトはポートフォリオおよび情報提供を目的として公開されています。リンク先サービスのご利用はお客様ご自身の判断と責任において行っていただけますようお願いいたします。",
      },
    ],
  },
};

export function TermsClient() {
  const { locale } = useLanguage();
  const t = termsByLocale[locale] || termsByLocale.en;

  return (
    <main className="section legal-page">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1>{t.heading}</h1>
      <p className="lead">{t.lead}</p>
      <section className="detail-grid">
        {t.sections.map((item) => (
          <article key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
