"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { useLanguage } from "@/lib/i18n/context";

interface LabNotesDictionary {
  eyebrow: string;
  heading: string;
  lead: string;
  note01: {
    id: string;
    category: string;
    title: string;
    desc: string;
    date: string;
    readLink: string;
  };
  upcomingEyebrow: string;
  comingSoon: string;
  upcomingList: string[];
}

const notesByLocale: Record<string, LabNotesDictionary> = {
  id: {
    eyebrow: "Catatan Lab",
    heading: "Catatan proses bangun, tutorial, dan wawasan langsung dari lab.",
    lead: "Tulisan yang dipublikasikan disajikan secara mendalam dan lengkap. Topik mendatang ditandai dengan transparan.",
    note01: {
      id: "Catatan Lab 01",
      category: "Telah Terbit",
      title: "Di Balik Redesain Kaidevlab: Mengubah Portofolio Menjadi Laboratorium Teknologi Kreatif",
      desc: "Bagaimana bukti produk nyata, status jujur, dan sistem brand bernuansa laboratorium futuristik berpadu menjadi satu ekosistem hidup.",
      date: "Juli 2026",
      readLink: "Baca Artikel →",
    },
    upcomingEyebrow: "Catatan Mendatang",
    comingSoon: "Segera Hadir",
    upcomingList: [
      "Membangun pipeline data & sistem intake UMKM yang andal",
      "Dari eksperimen anime hingga manhwa Blue Vengeance",
    ],
  },
  en: {
    eyebrow: "Lab Notes",
    heading: "Build logs, tutorials, and field notes from the lab.",
    lead: "Published writing stays readable and complete. Future topics remain clearly labeled as upcoming.",
    note01: {
      id: "Lab Note 01",
      category: "Published",
      title: "Behind the Kaidevlab Redesign: Turning a Portfolio into a Creative Technology Lab",
      desc: "How product proof, honest status, and a bright futuristic lab system turn a personal portfolio into a living creative technology space.",
      date: "July 2026",
      readLink: "Read Article →",
    },
    upcomingEyebrow: "Upcoming Notes",
    comingSoon: "Coming Soon",
    upcomingList: [
      "Building a reliable automation workflow for UMKM intake",
      "From anime experiment to Blue Vengeance manhwa",
    ],
  },
  ja: {
    eyebrow: "開発ノート",
    heading: "開発ログ、チュートリアル、現場からの実践知見。",
    lead: "公開記事は率直かつ体系的に記録。今後の執筆予定もステータスを明示しています。",
    note01: {
      id: "開発ノート 01",
      category: "公開中",
      title: "Kaidevlabリニューアルの舞台裏：ポートフォリオを『生きたクリエイティブ・ラボ』へ",
      desc: "実動プロダクトの証明、率直な開発ステータス、そして近未来ラボの世界観がどのように融合したのか。",
      date: "2026年7月",
      readLink: "記事を読む →",
    },
    upcomingEyebrow: "次回公開予定",
    comingSoon: "近日公開",
    upcomingList: [
      "中小企業向けデータインテーク自動化システムの構築",
      "アニメ実験からBlue Vengeanceマンガ制作への展開",
    ],
  },
};

export function NotesClient() {
  const { locale } = useLanguage();
  const n = notesByLocale[locale] || notesByLocale.en;

  return (
    <main className="page-shell lab-notes-page">
      <header className="page-hero compact-page-hero">
        <p className="eyebrow">{n.eyebrow}</p>
        <h1>{n.heading}</h1>
        <p className="lead">{n.lead}</p>
      </header>

      <div className="notes-feature-layout notes-page-layout">
        <article className="journal-entry featured-note">
          <div className="entry-meta">
            <span className="entry-id">{n.note01.id}</span>
            <span className="entry-category">{n.note01.category}</span>
          </div>
          <div className="entry-content">
            <h2>{n.note01.title}</h2>
            <p>{n.note01.desc}</p>
          </div>
          <div className="entry-footer">
            <span className="entry-date">{n.note01.date}</span>
            <a className="entry-link" href="/lab-notes/behind-kaidevlab-redesign/">
              {n.note01.readLink}
            </a>
          </div>
        </article>
        <aside className="upcoming-notes" aria-label={n.upcomingEyebrow}>
          <p className="eyebrow">{n.upcomingEyebrow}</p>
          <ul>
            {n.upcomingList.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <small>{n.comingSoon}</small>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
