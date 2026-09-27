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

const privacyByLocale: Record<string, LegalDictionary> = {
  id: {
    eyebrow: "KEBIJAKAN PRIVASI",
    heading: "Kebijakan Privasi",
    lead: "Kaidevlab adalah laboratorium teknologi kreatif dan portofolio pribadi. Kami menghindari pengumpulan data yang tidak perlu dan menjaga interaksi pengunjung tetap sederhana dan aman.",
    sections: [
      {
        title: "Analitik",
        desc: "Saat ini situs ini tidak menggunakan pelacak analitik pihak ketiga yang invasif. Jika analitik kinerja ditambahkan di masa depan, halaman ini akan mencantumkan penyedia dan tujuannya secara transparan.",
      },
      {
        title: "Kontak & Pesan",
        desc: "Jika Anda menghubungi Kai melalui email atau media sosial, informasi yang Anda kirimkan hanya digunakan untuk merespons pertanyaan atau keperluan diskusi kolaborasi Anda.",
      },
      {
        title: "Preferensi Tema & Bahasa",
        desc: "Situs ini menyimpan pilihan tema (Terang / Gelap) dan pilihan bahasa Anda di penyimpanan lokal peramban (localStorage) agar antarmuka mengingat preferensi Anda saat berkunjung kembali.",
      },
      {
        title: "Tautan Eksternal",
        desc: "Tautan proyek dan media sosial dapat mengarahkan Anda ke situs web eksternal (seperti GitHub, X, YouTube). Kebijakan privasi pada situs tersebut dikelola oleh masing-masing penyedia layanan, bukan oleh Kaidevlab.",
      },
      {
        title: "Penyimpanan Data",
        desc: "Pesan atau korespondensi langsung hanya disimpan selama relevan untuk komunikasi, kerja sama profesional, atau pencatatan arsip.",
      },
      {
        title: "Pertanyaan Privasi",
        desc: "Untuk pertanyaan seputar privasi data, Anda dapat menggunakan halaman Kontak atau mengirim email langsung ke baguswirantowicaksono@gmail.com.",
      },
    ],
  },
  en: {
    eyebrow: "PRIVACY",
    heading: "Privacy Policy",
    lead: "Kaidevlab is a personal creative technology lab and portfolio. It avoids unnecessary data collection and keeps visitor-facing behavior simple and secure.",
    sections: [
      {
        title: "Analytics",
        desc: "No invasive third-party analytics trackers are currently active on this site. If performance metrics are added in the future, this page will clearly state the provider and purpose.",
      },
      {
        title: "Contact & Inquiries",
        desc: "If you contact Kai via email or social links, the information you provide is used solely to respond to your inquiry or discuss potential collaboration.",
      },
      {
        title: "Theme & Language Preferences",
        desc: "The site stores your chosen theme (Light / Dark) and language preference in local storage so the interface remembers your choices on subsequent visits.",
      },
      {
        title: "External Links",
        desc: "Project and social links may open external websites (e.g., GitHub, X, YouTube). Their privacy practices are governed by their respective platforms, not Kaidevlab.",
      },
      {
        title: "Data Retention",
        desc: "Direct messages or email correspondence are retained only as long as useful for communication, collaboration, or record keeping.",
      },
      {
        title: "Privacy Inquiries",
        desc: "For any privacy questions or requests, please visit the Contact page or email baguswirantowicaksono@gmail.com directly.",
      },
    ],
  },
  ja: {
    eyebrow: "プライバシーポリシー",
    heading: "プライバシーポリシー",
    lead: "Kaidevlab は個人のクリエイティブ・テクノロジー・ラボおよびポートフォリオです。不要なデータ収集を行わず、訪問者にとってシンプルで安全な体験を提供します。",
    sections: [
      {
        title: "アクセス解析について",
        desc: "当サイトでは侵襲的なサードパーティ解析ツールは使用していません。今後パフォーマンス測定などのツールを導入する場合は、提供元と利用目的を本ページにて明記します。",
      },
      {
        title: "お問い合わせ・連絡先",
        desc: "メールやSNSリンクを通じてKaiへお問い合わせいただいた際の個人情報は、ご質問への返信および協業のご相談の目的にのみ使用されます。",
      },
      {
        title: "テーマ・言語設定の保存",
        desc: "当サイトでは、快適な閲覧体験のために選択されたテーマ（ライト/ダーク）および言語設定をブラウザのローカルストレージ（localStorage）に保存しています。",
      },
      {
        title: "外部リンクについて",
        desc: "プロジェクトリンクやSNSリンクから外部サイト（GitHub、X、YouTube等）へ移動する場合、移動先サイトのプライバシーポリシーは各プラットフォームの基準に従います。",
      },
      {
        title: "情報の保管期間",
        desc: "受領したメッセージやメールは、業務連絡、協業案件の遂行、または記録管理に必要な期間に限り適切に保管されます。",
      },
      {
        title: "お問い合わせ窓口",
        desc: "プライバシーに関するご質問やご要望は、お問い合わせページまたはメール（baguswirantowicaksono@gmail.com）までご連絡ください。",
      },
    ],
  },
};

export function PrivacyClient() {
  const { locale } = useLanguage();
  const p = privacyByLocale[locale] || privacyByLocale.en;

  return (
    <main className="section legal-page">
      <p className="eyebrow">{p.eyebrow}</p>
      <h1>{p.heading}</h1>
      <p className="lead">{p.lead}</p>
      <section className="detail-grid">
        {p.sections.map((item) => (
          <article key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
