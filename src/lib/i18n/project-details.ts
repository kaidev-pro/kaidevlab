import { Locale } from "./types";

export interface LocalizedProjectDetail {
  title: string;
  category: string;
  status: string;
  role: string;
  year: string;
  summary: string;
  problem: string;
  goals: string[];
  features: string[];
  approach: string;
  challenges: string[];
  limitations: string[];
  next: string[];
}

export const projectDetailLabels: Record<Locale, {
  backToWork: string;
  role: string;
  year: string;
  visitLive: string;
  moreWork: string;
  keepExploring: string;
  keepExploringCreative: string;
  previous: string;
  next: string;
  backToAll: string;
  exploreCreative: string;
  visitLiveBottom: string;
  standard: {
    problem: string;
    goals: string;
    features: string;
    approach: string;
    challenges: string;
    limitations: string;
    next: string;
  };
  creative: {
    problem: string;
    goals: string;
    features: string;
    approach: string;
    challenges: string;
    limitations: string;
    next: string;
  };
}> = {
  id: {
    backToWork: "← Kembali ke Karya",
    role: "Peran",
    year: "Tahun",
    visitLive: "Kunjungi Situs Live",
    moreWork: "KARYA LAINNYA",
    keepExploring: "Terus jelajahi karya yang sedang dibangun Kai.",
    keepExploringCreative: "Jelajahi dunia cerita dan eksperimen lainnya.",
    previous: "Sebelumnya",
    next: "Selanjutnya",
    backToAll: "Kembali ke semua karya",
    exploreCreative: "Jelajahi proyek kreatif",
    visitLiveBottom: "Kunjungi proyek live",
    standard: {
      problem: "Masalah & Peluang",
      goals: "Tujuan Produk",
      features: "Fitur Utama",
      approach: "Pendekatan Teknis & Kreatif",
      challenges: "Tantangan",
      limitations: "Batasan Saat Ini",
      next: "Langkah Selanjutnya",
    },
    creative: {
      problem: "Premis & Daya Tarik Cerita",
      goals: "Tujuan Kreatif",
      features: "Arahan Visual",
      approach: "Alur Kerja Produksi",
      challenges: "Tantangan Kreatif",
      limitations: "Progres Saat Ini",
      next: "Langkah Selanjutnya",
    },
  },
  en: {
    backToWork: "← Back to Work",
    role: "Role",
    year: "Year",
    visitLive: "Visit Live Site",
    moreWork: "MORE WORK",
    keepExploring: "Keep exploring what Kai is building.",
    keepExploringCreative: "Explore another story world or build.",
    previous: "Previous",
    next: "Next",
    backToAll: "Back to all work",
    exploreCreative: "Explore creative projects",
    visitLiveBottom: "Visit live project",
    standard: {
      problem: "Problem / opportunity",
      goals: "Product goals",
      features: "Key features",
      approach: "Technical / creative approach",
      challenges: "Challenges",
      limitations: "Current limitations",
      next: "Next steps",
    },
    creative: {
      problem: "Premise / story hook",
      goals: "Creative goals",
      features: "Visual direction",
      approach: "Production workflow",
      challenges: "Creative challenges",
      limitations: "Current progress",
      next: "Next steps",
    },
  },
  ja: {
    backToWork: "← 作品一覧に戻る",
    role: "役割",
    year: "制作年",
    visitLive: "公式サイトを開く",
    moreWork: "その他の作品",
    keepExploring: "Kaiが制作・開発しているプロジェクトを探索する。",
    keepExploringCreative: "別の世界観や制作物を探索する。",
    previous: "前へ",
    next: "次へ",
    backToAll: "すべての作品に戻る",
    exploreCreative: "クリエイティブ作品を見る",
    visitLiveBottom: "プロジェクトを開く",
    standard: {
      problem: "課題・機会",
      goals: "開発目標",
      features: "主要機能",
      approach: "技術・デザインアプローチ",
      challenges: "直面した課題",
      limitations: "現在の状況・制限",
      next: "今後の展開",
    },
    creative: {
      problem: "設定・物語の導入",
      goals: "クリエイティブ目標",
      features: "ビジュアル方針",
      approach: "制作ワークフロー",
      challenges: "制作上の課題",
      limitations: "現在の進捗",
      next: "今後の展開",
    },
  },
};

export const localizedProjectDetails: Record<Locale, Record<string, Partial<LocalizedProjectDetail>>> = {
  id: {
    "8agents": {
      category: "Transformasi Digital UMKM",
      status: "Live · Sistem Klien",
      role: "Arsitektur produk, strategi brand, brankas aset digital, rekayasa web",
      summary: "Partner digital menyeluruh untuk UMKM Indonesia, mengubah usaha lokal menjadi brand modern dan terpercaya melalui brand kit, website berkecepatan tinggi, konten video UGC, dan Brankas Aset Digital.",
      problem: "Lebih dari 66 juta UMKM Indonesia menyumbang 61% PDB nasional, tetapi sebagian besar belum memiliki identitas visual modern dan website resmi. Aset bisnis sering kali tercecer di obrolan WhatsApp, dan biaya agensi konvensional sangat mahal dengan proses yang lambat.",
      goals: [
        "Menjembatani kesenjangan digital UMKM lokal dengan paket harga 3-tier yang transparan (Starter, Growth, Care)",
        "Menghilangkan risiko kehilangan file dengan Brankas Aset Digital (penyerahan 100% hak akses, domain, dan file sumber ke klien)",
        "Memberikan transformasi tuntas: dari desain logo hingga website cepat yang mobile-friendly dengan tombol WhatsApp langsung",
        "Mendukung pemasaran kreatif melalui Content Studio terintegrasi untuk video UGC dan iklan pendek di TikTok/Reels"
      ],
      features: [
        "Arsitektur layanan modular 3-tier: Starter (Brand Kit), Growth (Brand + Website), Digital Care (Perawatan Rutin)",
        "Brankas Aset Digital: kepemilikan penuh klien atas domain, brand-kit.zip, file vektor sumber, dan panduan update",
        "Kisah transformasi interaktif Before-After yang menampilkan peningkatan nyata bisnis lokal",
        "Pipeline Content Studio untuk pembuatan video produk/beauty UGC dan short-form video ads",
        "Website Next.js responsif berkecepatan tinggi yang dioptimalkan untuk SEO lokal dan konversi WhatsApp",
        "Standar uji mutu menyeluruh mencakup keamanan, performa seluler, aksesibilitas, dan serah terima aset"
      ],
      approach: "Dirancang untuk memberikan standar kerja agensi profesional dengan biaya yang terjangkau bagi pemilik usaha lokal. Setiap proyek menggabungkan desain identitas berkarakter dengan kemandirian digital: klien memegang kendali penuh atas domain dan aset mereka.",
      challenges: [
        "Mengedukasi pemilik usaha non-teknis tentang nilai jangka panjang dari kepemilikan website dan identitas brand",
        "Merancang alur onboarding yang ringkas tanpa mengurangi kedalaman penggalian karakter usaha",
        "Menjaga standar kualitas visual tinggi di berbagai sektor industri (kuliner, retail, kecantikan, jasa) dalam waktu pengerjaan yang efisien"
      ],
      limitations: [
        "Arahan kreatif dan intake masih ditinjau langsung oleh founder guna memastikan standar kualitas sebelum otomatisasi diperluas",
        "Jadwal produksi Content Studio saat ini diproses secara sistematis per gelombang (batch)"
      ],
      next: [
        "Meluncurkan portal dashboard klien untuk memantau progres pengerjaan secara real-time",
        "Menambah template video kreatif baru untuk format tren media sosial",
        "Mengintegrasikan alur perpanjangan layanan dan faktur otomatis"
      ]
    },
    "rakusaku": {
      category: "Top Up Game & Voucher Kilat",
      status: "Live · Pembayaran Aktif (Fulfillment <60s)",
      role: "Founder, rekayasa commerce full-stack, arsitektur brand, UX anime-tech",
      summary: "Platform top-up game & voucher digital secepat genggaman saku, memadukan filosofi bahasa Jepang-Indonesia (楽 + Saku), estetika pink anime-cyber yang memikat, dan pemrosesan otomatis di bawah 1 menit via DOKU & Pakasir.",
      problem: "Sebagian besar platform top-up game di Indonesia memiliki tata letak bertema gelap yang monoton, alur navigasi membingungkan, biaya admin tersembunyi, dan verifikasi manual yang lambat. Gamer membutuhkan pengalaman top-up yang secepat kilat, terpercaya, dan praktis dalam genggaman saku.",
      goals: [
        "Menghadirkan pemrosesan transaksi otomatis dalam 1–3 menit (teruji nyata rata-rata di bawah 60 detik langsung masuk)",
        "Mendobrak pasar gaming yang monoton gelap dengan estetika Hot Pink (#FF3F8E) dan cyber-sakura anime-tech",
        "Menciptakan perjalanan transaksi yang ramah melalui duo maskot: Saku-chan (Pemandu) & Raku (Pengawal Pesanan)",
        "Mengintegrasikan dual payment gateway produksi (DOKU & Pakasir) mendukung QRIS kilat, Virtual Account, dan E-Wallet",
        "Membangun ekosistem loyalitas Saldo RakuSaku (Rp1 = Rp1) dan reward Saku Point"
      ],
      features: [
        "Alur order 3 langkah tanpa hambatan (Pilih Produk → Masukkan User ID → Scan QRIS Instan)",
        "Dual engine gateway pembayaran (DOKU & Pakasir) dengan sinkronisasi webhook otomatis dan routing pesanan instan",
        "Fulfillment otomatis teruji di bawah 1 menit (<60s) untuk top-up game dan tagihan PPOB",
        "Duo Maskot Interaktif: Saku-chan memandu pilihan produk dan Raku mengawal pesanan hingga tuntas",
        "Animasi loader sprite Raku ('Raku lagi ambil produknya...') dan pelacak status invoice real-time",
        "Dompet digital Saldo RakuSaku untuk pembayaran 1-klik beserta cashback Saku Point",
        "Katalog digital lengkap: Mobile Legends, Free Fire, PUBG, Valorant, Genshin Impact, token PLN, dan paket data"
      ],
      approach: "Dibangun dengan pendekatan mobile-first beridentitas anime-tech yang berani. Nama Rakusaku menjembatani bahasa Jepang 'Raku' (楽 - ringkas, santai, mudah) dan bahasa Indonesia 'Saku' (kantong saku). Sistem backend menggandeng dua payment gateway untuk redundansi keandalan, langsung memicu API distributor dalam hitungan detik setelah webhook terkonfirmasi.",
      challenges: [
        "Menyelaraskan webhook callback asinkron dari dual payment gateway (DOKU dan Pakasir) dengan jaminan idempotensi",
        "Menyeimbangkan palet warna pink cerah yang playful dengan kenyamanan navigasi dan konversi checkout",
        "Mengoptimalkan aset sprite dan animasi karakter agar tetap memuat instan di jaringan seluler pengguna"
      ],
      limitations: [
        "Pemantauan aktif failover API distributor terus diperbarui untuk mengantisipasi masa pemeliharaan server game",
        "Penyempurnaan penanganan kesalahan otomatis saat pengguna salah menginput User ID game"
      ],
      next: [
        "Meluncurkan promo flash sale harian dan tingkatan keanggotaan loyalitas",
        "Menambahkan efek audio chiptune/anime opsional saat transaksi berhasil",
        "Memperluas varian gift card internasional dan voucher hiburan digital"
      ]
    },
    "fe-study-hub": {
      category: "Hub Belajar Interaktif",
      status: "Live · Sistem Interaktif",
      role: "Full-stack engineering, sistem pembelajaran, simulator CBT, active recall",
      summary: "Gym kognitif untuk persiapan ujian Fundamental Information Technology Engineer (FE) Jepang (基本情報技術者試験), menghadirkan 129 flashcard sakti dengan audio furigana TTS, simulasi ujian CBT resmi, pelacak pseudocode, dan mode PWA offline.",
      problem: "Mempersiapkan ujian sertifikasi nasional Jepang (FE) biasanya harus membaca buku tebal lebih dari 600 halaman dengan kanji teknis yang padat dan pseudocode abstrak, menyebabkan kelelahan kognitif dan lambatnya daya ingat saat belajar di tengah perjalanan kereta komuter.",
      goals: [
        "Membuat drill active recall dengan audio native Text-to-Speech Jepang dan tombol saklar furigana",
        "Mensimulasikan ujian CBT 22,5 menit autentik lengkap dengan penilaian langsung dan sertifikat kelulusan digital (合格証明書)",
        "Membangun visualisasi pelacak pseudocode langkah-demi-langkah dengan tabel trace interaktif untuk 科目B",
        "Menyediakan aplikasi PWA yang dapat diinstal (Mode Kereta) untuk belajar di dalam kereta tanpa sinyal internet"
      ],
      features: [
        "129 Flashcard Sakti (64 Teknologi, 16 Manajemen, 19 Strategi, 30 Kosakata Ujian & Kanji)",
        "Drill active recall dengan analogi visual Kitami-shiki dan kata kunci pembeda ujian",
        "Furigana Kanji bawaan berbasis tag <ruby> dan pengucapan audio Text-to-Speech native Jepang",
        "Simulator Mock Exam CBT dengan timer 22,5 menit dan navigasi matriks soal",
        "Penilaian otomatis, rincian skor per kategori, dan Sertifikat Kelulusan Digital (合格証明書) siap cetak",
        "Step-Tracer pseudocode interaktif dengan visualisasi tabel trace real-time untuk 4 algoritma FE",
        "4 kalkulator rumus interaktif (Availability, MTBF/MTTR, Effective Memory Access Time, BEP)",
        "Dukungan offline PWA dengan Service Worker (Mode Kereta) dan prompt instalasi"
      ],
      approach: "Dibangun dengan Next.js dan React 19 sebagai sarana belajar yang cepat dan bebas distraksi. Semua pemrosesan audio dan manajemen status berjalan di sisi klien (client-side) demi latensi nol dan fungsionalitas offline penuh.",
      challenges: [
        "Menyeimbangkan keaslian standar soal ujian nasional Jepang dengan analogi visual yang mudah dipahami",
        "Merancang antarmuka simulator CBT yang responsif dan nyaman digunakan di layar smartphone",
        "Pengelolaan caching aset dan audio offline yang andal di lingkungan transit yang minim koneksi"
      ],
      limitations: [
        "Saat ini difokuskan pada kurasi 129 kartu istilah sakti dan bank soal ujian esensial",
        "Bank soal dan skenario ujian akan terus diperluas secara bertahap"
      ],
      next: [
        "Menambah bank soal untuk periode ujian semester berikutnya",
        "Menghadirkan fitur deck flashcard kustom oleh pengguna",
        "Menerapkan algoritma interval pengulangan berjarak (spaced repetition) berdasarkan riwayat belajar"
      ]
    },
    "blue-vengeance": {
      category: "Serial Anime & Manhwa Orisinal",
      status: "Pra-Produksi",
      role: "Kreator, arahan cerita, pembangunan dunia, pengembangan visual",
      summary: "Serial anime & manhwa orisinal yang mengikuti perjalanan Kai dan Rin melintasi ikatan hangat, luka masa lalu, dan janji yang berubah menjadi pembalasan dendam.",
      problem: "Karya kekayaan intelektual (IP) orisinal jangka panjang membutuhkan landasan yang matang sebelum perilisan bab: premis, alur cerita, dan visi produksi perlu dirancang jelas tanpa klaim yang berlebihan.",
      goals: [
        "Menyusun perkembangan karakter Kai dari usia 17 hingga 27 tahun",
        "Membangun konflik keluarga Tachibana dan misteri tragedi Rin",
        "Merancang alur cerita sindikat kriminal bawah tanah",
        "Mempersiapkan pipeline produksi manhwa sebelum rilis bab publik"
      ],
      features: [
        "Era aksi masa muda dan perselisihan jalanan",
        "Evolusi menjadi penyelidik independen di usia dewasa",
        "Misteri hilangnya ingatan dan luka masa lalu Rin",
        "Konflik internal dinasti keluarga Tachibana",
        "Konspirasi jaringan kejahatan kota metropolitan"
      ],
      approach: "Blue Vengeance dirancang sebagai IP cerita utama masa depan: fondasi naskah, ritme emosional karakter, dan gaya visual dikembangkan lebih dulu sebelum komitmen publikasi.",
      challenges: [
        "Menjaga keseimbangan antara intensitas aksi dan kedalaman misteri jangka panjang",
        "Mempertahankan konsistensi karakter selama rentang waktu satu dekade",
        "Menjaga fokus produksi naskah sebelum bab pertama dirilis"
      ],
      limitations: [
        "Masih dalam tahap pra-produksi",
        "Belum ada bab yang dirilis untuk publik"
      ],
      next: [
        "Menuntaskan garis besar skrip bab pertama",
        "Mengembangkan lembar desain karakter (character sheet) utama",
        "Menyusun jadwal produksi serial setelah visual siap"
      ]
    },
    "dragon-kings-last-contract": {
      category: "Eksperimen Film Sinematik AI",
      status: "Episode 1 Selesai · Eksperimen Kreatif",
      role: "Kreator, arahan cerita, konsep poster, alur kerja film AI",
      summary: "Eksperimen film fantasi gelap tentang monster kuno, perjanjian terkutuk, dan gadis yang dikirim untuk membunuhnya.",
      problem: "Eksperimen pembuatan film berbasis AI memerlukan motivasi karakter yang kuat, atmosfer konsisten, dan kejelasan status karya yang telah diselesaikan.",
      goals: [
        "Menampilkan Episode 1 yang telah selesai diproduksi",
        "Menjaga nuansa gothic dark fantasy yang kental",
        "Menggunakan eksperimen ini untuk menyempurnakan alur kerja penyuntingan film AI"
      ],
      features: [
        "Premis romansa gotik bernuansa misterius",
        "Identitas visual sang Raja Naga yang memikat",
        "Suasana malam berkabut dengan pencahayaan sinematik",
        "Plot pengkhianatan dan perjanjian kontrak kuno",
        "Produksi eksperimen episode perdana berdurasi penuh"
      ],
      approach: "Proyek ini dipresentasikan sebagai eksperimen kreatif yang telah selesai, mendokumentasikan nilai eksplorasi alur kerja visual modern.",
      challenges: [
        "Menjaga konsistensi wajah dan proporsi karakter di seluruh adegan generatif AI",
        "Mempertahankan atmosfer gotik tanpa mengaburkan kejelasan alur adegan",
        "Membuat ritme sinematik yang menyatu dengan musik dan tata suara"
      ],
      limitations: [
        "Episode 1 diproduksi sebagai studi eksperimental independen",
        "Format kelanjutan musim belum dijadwalkan secara publik"
      ],
      next: [
        "Mendokumentasikan pelajaran teknik penyuntingan video",
        "Menerapkan metodologi AI film pada proyek kreatif berikutnya",
        "Mempertahankan catatan transparansi proses produksi"
      ]
    }
  },
  ja: {
    "8agents": {
      category: "中小企業デジタルトランスフォーメーション",
      status: "運用中 · クライアントエンジン",
      role: "製品アーキテクチャ、ブランド戦略、デジタル資産保管庫、Webエンジニアリング",
      summary: "インドネシアの6600万の中小企業（UMKM）を対象に、ブランドキット、高速Webサイト、UGC動画、およびデジタル資産保管庫を提供し、信頼されるモダンブランドへと成長させるパートナー。",
      problem: "インドネシアのGDPの61%を担う中小企業ですが、大半は公式Webサイトやブランドアイデンティティを持たず、素材ファイルがチャット上で散乱しています。",
      goals: [
        "透明性のある3段階パッケージ（Starter、Growth、Care）でデジタル格差を解消",
        "「デジタル資産保管庫」により、ドメイン・ファイル・アクセス権を100%クライアントへ安全に引き渡し",
        "ロゴデザインからスマホ特化の高速Webサイト、直接WhatsAppへの問い合わせ導線までを一気通貫で提供"
      ],
      features: [
        "Starter（ブランドキット）、Growth（ブランド＋Web）、Digital Care（月額保守）のモジュール構成",
        "デジタル資産保管庫：ドメイン、ZIP、ベクター元データ、更新手順書の完全納品",
        "実際の地域店舗のアップグレードを示すBefore/Afterビジュアル",
        "TikTok/Reels向けUGC動画およびショート動画広告の制作スタジオ"
      ],
      approach: "地域事業者のために、エンタープライズ品質を身近な価格で提供。すべての案件で洗練されたデザインと自立したデジタル運用を両立します。",
      challenges: [
        "非技術系の事業者に対し、Webサイトとブランド価値の重要性をわかりやすく説明すること",
        "効率的なヒアリングで事業の個性と魅力を引き出すこと"
      ],
      limitations: [
        "品質を保つため、案件のヒアリングとディレクションは創業者が直接レビューしています"
      ],
      next: [
        "制作進捗をリアルタイムに確認できるクライアントポータルの構築",
        "SNSショート動画テンプレートの拡充"
      ]
    },
    "rakusaku": {
      category: "高速ゲーム課金コマース",
      status: "運用中 · 決済稼働中 (60秒以内納品)",
      role: "創業者、フルスタックコマースエンジニアリング、ブランド設計、アニメテックUI",
      summary: "日本語「楽（らく）」とインドネシア語「Saku（ポケット）」を融合し、鮮やかなピンクのアニメテックデザインとDOKU＆Pakasirによる1分以内の自動納品を実現したポケットサイズのゲーム課金プラットフォーム。",
      problem: "既存の課金サイトは暗く無機質なデザインが多く、手数料が不透明で反映も遅いという課題がありました。ゲーマーはポケットから取り出すように迅速で楽しく、信頼できる課金体験を求めています。",
      goals: [
        "1〜3分以内（実測60秒未満）の超高速自動納品を実現",
        "既存のダーク調サイトと一線を画すホットピンク（#FF3F8E）とアニメテックデザイン",
        "サクちゃん（案内ガイド）とラク（見守りコンパニオン）のデュオマスコットによる楽しい購買体験",
        "DOKUおよびPakasir決済ゲートウェイによるQRIS・各種Eウォレットの即時処理"
      ],
      features: [
        "3ステップの軽快な注文フロー（商品選択 → ID入力 → QRISスキャン）",
        "二重決済ゲートウェイによる冗長性と即時Webhook自動連携",
        "実測1分未満（<60秒）のゲーム課金・公共料金バウチャー即時付与",
        "デュオマスコット：商品選びを導くサクちゃん＆状況を見守るラク",
        "ラクのアニメーションローダー（「ラクが商品をお届け中...」）とリアルタイム追跡",
        "1クリック決済対応のRakuSaku残高とポイント還元エコシステム"
      ],
      approach: "モバイルファーストで設計されたアニメテックUI。二重決済ゲートウェイを組み合わせることで単一障害点を排除し、決済完了Webhookと同時に自動でディストリビューターAPIを発注します。",
      challenges: [
        "複数の決済ゲートウェイからの非同期Webhookを冪等性を担保して整合させること",
        "高彩度なピンクの世界観と購買意欲を高めるクリーンなUIの両立"
      ],
      limitations: [
        "各ゲームパブリッシャー側の臨時メンテナンスに応じたAPI監視の継続的最適化"
      ],
      next: [
        "会員ランク割引やデイリーフラッシュセールの導入",
        "決済完了時のレトロゲーム風効果音の追加",
        "海外ギフトカードのラインナップ拡充"
      ]
    }
  },
  en: {}
};
