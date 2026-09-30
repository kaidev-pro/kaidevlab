import { DokkaiPassage } from "./types";

export const DOKKAI_PASSAGES: DokkaiPassage[] = [
  // =========================================================================
  // PILAR 1: 基礎編 (Teknik Dasar & Analisis Struktur Kalimat)
  // =========================================================================
  {
    id: "tech-01-shishigo",
    chapterNumber: 1,
    category: "technique",
    categoryLabel: "基礎編 · 第1課",
    titleJp: "指示語の指す内容をつかむ (Kata Tunjuk)",
    titleId: "Menemukan Rujukan Kata Tunjuk (これ・それ・その)",
    techniqueTag: "指示語の把握",
    techniqueDescription:
      "Kata tunjuk seperti これ (ini), それ (itu), その (tersebut) hampir selalu merujuk pada kalimat atau frasa tepat sebelum kata tunjuk tersebut berada. Jangan melompat terlalu jauh sebelum memeriksa kalimat terdekat.",
    sentences: [
      {
        id: "s1",
        textJp: "日本人は日常会話の中で、感謝の気持ちを伝える際にも「すみません」という言葉をよく使います。",
        textId: "Orang Jepang dalam percakapan sehari-hari sering menggunakan kata 'sumimasen' bahkan saat menyampaikan rasa terima kasih.",
      },
      {
        id: "s2",
        textJp: "本来「すみません」は謝罪の言葉ですが、相手に余計な手間や時間をかけさせてしまったことに対する恐縮の念が含まれています。",
        textId: "Pada asalnya 'sumimasen' adalah kata permohonan maaf, namun di dalamnya terkandung rasa sungkan karena telah membuat lawan bicara repot atau menyita waktunya.",
      },
      {
        id: "s3",
        textJp: "相手への配慮から自然に出てくるこの習慣は、人間関係を円滑にする知恵の一つと言えるでしょう。",
        textId: "Kebiasaan ini yang muncul secara alami dari kepedulian terhadap lawan bicara dapat dikatakan sebagai salah satu kearifan untuk memperlancar hubungan antarmanusia.",
        isKeySentence: true,
      },
    ],
    passageTranslation:
      "Orang Jepang dalam percakapan sehari-hari sering menggunakan kata 'sumimasen' bahkan saat menyampaikan rasa terima kasih. Pada asalnya 'sumimasen' adalah kata permohonan maaf, namun di dalamnya terkandung rasa sungkan karena telah membuat lawan bicara repot atau menyita waktunya. Kebiasaan ini yang muncul secara alami dari kepedulian terhadap lawan bicara dapat dikatakan sebagai salah satu kearifan untuk memperlancar hubungan antarmanusia.",
    vocabulary: [
      { termJp: "謝罪", furigana: "しゃざい", meaningId: "Permohonan maaf resmi", level: "N2" },
      { termJp: "恐縮", furigana: "きょうしゅく", meaningId: "Rasa sungkan / merasa tidak enak hati", level: "N2" },
      { termJp: "配慮", furigana: "はいりょ", meaningId: "Perhatian dan kepedulian terhadap orang lain", level: "N2" },
      { termJp: "円滑", furigana: "えんかつ", meaningId: "Lancar dan harmonis tanpa hambatan", level: "N1" },
    ],
    questions: [
      {
        id: "q-tech-01-1",
        questionNumber: 1,
        questionJp: "文中の「この習慣」とは何を指していますか。",
        questionTranslation: "Apa yang dimaksud dengan 'kebiasaan ini' pada teks di atas?",
        clueSentenceIndex: 1,
        techniqueTip:
          "Perhatikan kata tepat sebelum 'この習慣'. Kata 'この' mengikat kembali tindakan yang dibahas di kalimat 1 dan 2, yaitu menggunakan kata maaf untuk berterima kasih karena rasa sungkan.",
        options: [
          {
            key: "1",
            textJp: "感謝を伝えるときにも「すみません」と言うこと",
            textId: "Mengucapkan 'sumimasen' bahkan saat menyampaikan rasa terima kasih.",
            explanation:
              "Benar! Penulis membahas kebiasaan orang Jepang menggunakan kata maaf 'sumimasen' untuk berterima kasih karena ada rasa sungkan telah merepotkan orang lain.",
            isCorrect: true,
          },
          {
            key: "2",
            textJp: "失敗したときにすぐに謝罪すること",
            textId: "Langsung meminta maaf ketika melakukan kesalahan.",
            explanation:
              "Salah. Teks menegaskan konteks penggunaannya pada saat berterima kasih (感謝の際), bukan sekadar meminta maaf biasa saat berbuat salah.",
            isCorrect: false,
          },
          {
            key: "3",
            textJp: "相手に余計な手間をかけさせないようにすること",
            textId: "Berusaha agar tidak merepotkan lawan bicara.",
            explanation:
              "Salah. Teks menyebutkan bahwa repot itu sudah terjadi (かけさせてしまったこと), dan yang menjadi kebiasaan adalah cara meresponsnya dengan ucapan.",
            isCorrect: false,
          },
          {
            key: "4",
            textJp: "日常会話でできるだけ言葉を省略すること",
            textId: "Menyingkat kata sebanyak mungkin dalam percakapan sehari-hari.",
            explanation:
              "Salah. Tidak ada pembahasan mengenai penyingkatan kata dalam teks.",
            isCorrect: false,
          },
        ],
      },
    ],
  },

  {
    id: "tech-02-shouryaku",
    chapterNumber: 2,
    category: "technique",
    categoryLabel: "基礎編 · 第2課",
    titleJp: "省略された主語を見極める (Subjek yang Dihilangkan)",
    titleId: "Menebak Pelaku Kalimat Tanpa Subjek Tertulis",
    techniqueTag: "省略された主語の把握",
    techniqueDescription:
      "Dalam bahasa Jepang, subjek kalimat sangat sering dihilangkan. Kunci untuk menemukan siapa yang melakukan tindakan adalah memperhatikan akhiran kata kerja: 〜てくれた (orang lain yang melakukan untuk saya), 〜てもらった (saya meminta/menerima bantuan orang lain), dan bentuk pasif 〜られた.",
    sentences: [
      {
        id: "s1",
        textJp: "都会に引っ越してきたばかりの頃、道に迷って困っていた私に、通りすがりのご老人が親切に声をかけてくれました。",
        textId: "Saat baru saja pindah ke kota besar, ketika saya tersesat dan kebingungan di jalan, seorang kakek tua yang lewat menyapa saya dengan ramah.",
      },
      {
        id: "s2",
        textJp: "スマートフォンの地図を見せても、細かい文字が読みにくそうだったので、駅の名前だけを伝えました。",
        textId: "Meskipun saya memperlihatkan peta di ponsel cerdas, karena beliau tampak kesulitan membaca tulisan kecil, saya hanya menyebutkan nama stasiunnya.",
      },
      {
        id: "s3",
        textJp: "すると、わざわざ遠回りをして改札口の前まで案内してもらったのです。",
        textId: "Lalu, saya diantarkan sampai ke depan gerbang tiket meskipun beliau harus sengaja memutar jalan jauh.",
        isKeySentence: true,
      },
      {
        id: "s4",
        textJp: "大都会の人は冷たいと聞いていましたが、その温かい親切は今でも忘れられません。",
        textId: "Saya sempat mendengar orang kota besar itu dingin, namun kebaikan hangat tersebut masih tidak bisa saya lupakan hingga sekarang.",
      },
    ],
    passageTranslation:
      "Saat baru saja pindah ke kota besar, ketika saya tersesat dan kebingungan di jalan, seorang kakek tua yang lewat menyapa saya dengan ramah. Meskipun saya memperlihatkan peta di ponsel cerdas, karena beliau tampak kesulitan membaca tulisan kecil, saya hanya menyebutkan nama stasiunnya. Lalu, saya diantarkan sampai ke depan gerbang tiket meskipun beliau harus sengaja memutar jalan jauh. Saya sempat mendengar orang kota besar itu dingin, namun kebaikan hangat tersebut masih tidak bisa saya lupakan hingga sekarang.",
    vocabulary: [
      { termJp: "通りすがり", furigana: "とおりすがり", meaningId: "Orang yang kebetulan lewat di jalan", level: "N2" },
      { termJp: "遠回り", furigana: "とおまわり", meaningId: "Mengambil jalan memutar lebih jauh", level: "N3" },
      { termJp: "改札口", furigana: "かいさつぐち", meaningId: "Pintu gerbang pemeriksaan tiket stasiun", level: "N3" },
    ],
    questions: [
      {
        id: "q-tech-02-1",
        questionNumber: 1,
        questionJp: "「案内してもらった」のは誰が誰を案内したのですか。",
        questionTranslation: "Pada frasa 'annai shite moratta', siapa yang mengantar siapa?",
        clueSentenceIndex: 2,
        techniqueTip:
          "Bentuk '〜てもらった' berarti 'subjek menerima bantuan dari pelaku'. Subjek cerita adalah '私' (penulis), dan orang yang memberi kebaikan adalah 'ご老人' (kakek tua). Jadi, kakek yang mengantar penulis.",
        options: [
          {
            key: "1",
            textJp: "ご老人が「私」を駅まで案内した",
            textId: "Kakek tua yang mengantarkan 'Saya' sampai ke stasiun.",
            explanation:
              "Benar! Bentuk '案内してもらった' berarti si penulis (私) menerima perlakuan diantar oleh kakek tua (ご老人).",
            isCorrect: true,
          },
          {
            key: "2",
            textJp: "「私」がご老人を駅まで案内した",
            textId: "'Saya' yang mengantarkan kakek tua sampai ke stasiun.",
            explanation:
              "Salah. Jika penulis yang mengantar kakek, bentuk kata kerjanya adalah '案内してあげた'.",
            isCorrect: false,
          },
          {
            key: "3",
            textJp: "駅員が「私」とご老人を案内した",
            textId: "Petugas stasiun yang mengantarkan 'Saya' dan kakek tua.",
            explanation:
              "Salah. Tidak ada petugas stasiun yang terlibat dalam mengantar.",
            isCorrect: false,
          },
          {
            key: "4",
            textJp: "ご老人がスマートフォンの使い方を「私」に教えた",
            textId: "Kakek tua yang mengajarkan cara pakai smartphone kepada 'Saya'.",
            explanation:
              "Salah. Kakek justru kesulitan membaca tulisan di smartphone penulis.",
            isCorrect: false,
          },
        ],
      },
    ],
  },

  {
    id: "tech-03-iikae",
    chapterNumber: 3,
    category: "technique",
    categoryLabel: "基礎編 · 第3課",
    titleJp: "言い換えと比喩を見抜く (Parafrase & Analogi)",
    titleId: "Mengenali Penjelasan Ulang & Perumpamaan",
    techniqueTag: "言い換え・比喩の把握",
    techniqueDescription:
      "Penulis sering kali menjelaskan ide abstrak menggunakan perumpamaan (比喩) dengan kata まるで (seperti halnya) atau つまり (dengan kata lain). Jangan terjebak arti harfiah perumpamaannya; cari makna konseptual di baliknya.",
    sentences: [
      {
        id: "s1",
        textJp: "人間の脳のワーキングメモリ（作業記憶）は、まるで小さな机のようなものです。",
        textId: "Memori kerja (working memory) pada otak manusia itu persis seperti sebuah meja kerja kecil.",
      },
      {
        id: "s2",
        textJp: "机の上に本や書類を一度にたくさん広げすぎると、作業スペースがなくなり、効率が一気に落ちてしまいます。",
        textId: "Jika Anda membuka terlalu banyak buku dan dokumen sekaligus di atas meja, ruang kerja akan habis dan efisiensi akan langsung anjlok.",
      },
      {
        id: "s3",
        textJp: "同様に、一度に多くの情報を同時に処理しようとすると、脳は容量オーバーになり、判断ミスを起こしやすくなります。",
        textId: "Demikian pula, jika kita mencoba memproses banyak informasi sekaligus pada waktu yang bersamaan, kapasitas otak akan kelebihan beban dan mudah membuat kesalahan keputusan.",
        isKeySentence: true,
      },
      {
        id: "s4",
        textJp: "集中して高い成果を出すためには、目の前の課題を一つずつ片付けていくことが不可欠です。",
        textId: "Untuk fokus dan menghasilkan hasil maksimal, menyelesaikan tugas di depan mata satu per satu adalah hal yang mutlak.",
      },
    ],
    passageTranslation:
      "Memori kerja (working memory) pada otak manusia itu persis seperti sebuah meja kerja kecil. Jika Anda membuka terlalu banyak buku dan dokumen sekaligus di atas meja, ruang kerja akan habis dan efisiensi akan langsung anjlok. Demikian pula, jika kita mencoba memproses banyak informasi sekaligus pada waktu yang bersamaan, kapasitas otak akan kelebihan beban dan mudah membuat kesalahan keputusan. Untuk fokus dan menghasilkan hasil maksimal, menyelesaikan tugas di depan mata satu per satu adalah hal yang mutlak.",
    vocabulary: [
      { termJp: "容量", furigana: "ようりょう", meaningId: "Kapasitas muatan", level: "N2" },
      { termJp: "不可欠", furigana: "ふかけつ", meaningId: "Mutlak / tidak dapat ditiadakan", level: "N2" },
      { termJp: "片付ける", furigana: "かたづける", meaningId: "Membereskan / menyelesaikan", level: "N3" },
    ],
    questions: [
      {
        id: "q-tech-03-1",
        questionNumber: 1,
        questionJp: "「まるで小さな机のようなもの」とありますが、筆者は何が言いたいのですか。",
        questionTranslation: "Tertulis 'persis seperti sebuah meja kerja kecil', apa yang sebenarnya ingin disampaikan oleh penulis?",
        clueSentenceIndex: 2,
        techniqueTip:
          "Perhatikan kata penghubung '同様に' (demikian pula). Kalimat setelahnya menjelaskan makna analogi: otak manusia memiliki batas kapasitas dalam memproses informasi bersamaan.",
        options: [
          {
            key: "1",
            textJp: "人間の脳が一度に処理できる情報の量には限界があるということ",
            textId: "Jumlah informasi yang dapat diproses otak manusia dalam satu waktu memiliki batasan.",
            explanation:
              "Benar! Analogi meja kecil menggambarkan kapasitas kerja memori otak yang terbatas jika dibebani informasi terlalu banyak.",
            isCorrect: true,
          },
          {
            key: "2",
            textJp: "広い机を用意すれば仕事の効率が格段に上がるということ",
            textId: "Jika menyiapkan meja yang lebar, efisiensi kerja akan meningkat drastis.",
            explanation:
              "Salah. Ini menafsirkan perumpamaan secara fisik harfiah, bukan makna memori otak.",
            isCorrect: false,
          },
          {
            key: "3",
            textJp: "勉強するときは机の上の書類を片付けてはいけないということ",
            textId: "Saat belajar tidak boleh membereskan dokumen di meja.",
            explanation:
              "Salah. Berlawanan dengan nasihat penulis di kalimat terakhir.",
            isCorrect: false,
          },
          {
            key: "4",
            textJp: "人間の脳は本を読むことで記憶容量が無限に広がるということ",
            textId: "Otak manusia kapasitas memorinya melebar tak terbatas dengan membaca buku.",
            explanation:
              "Salah. Teks justru menekankan adanya batas kapasitas muatan (容量オーバー).",
            isCorrect: false,
          },
        ],
      },
    ],
  },

  {
    id: "tech-04-riyuu",
    chapterNumber: 4,
    category: "technique",
    categoryLabel: "基礎編 · 第4課",
    titleJp: "理由と原因の論理を追う (Logika Sebab-Akibat)",
    titleId: "Menelusuri Alasan dan Penyebab (なぜ・から・ため)",
    techniqueTag: "理由・原因の把握",
    techniqueDescription:
      "Soal 'なぜですか' (Mengapa?) dijawab dengan mencari kata kunci sebab-akibat seperti 〜から (karena), 〜ため (akibat/karena), atau 〜によって (disebabkan oleh). Pastikan memeriksa alasan mendasar, bukan sekadar gejala luar.",
    sentences: [
      {
        id: "s1",
        textJp: "深夜のコンビニエンスストアは客数が少なく、電気代や人件費などのコストがかさみます。",
        textId: "Toko swalayan (konbini) di larut malam jumlah pelanggannya sedikit, sementara biaya listrik dan gaji karyawan membengkak.",
      },
      {
        id: "s2",
        textJp: "それにもかかわらず24時間営業を続ける店舗が多いのはなぜでしょうか。",
        textId: "Meskipun demikian, mengapa banyak gerai yang tetap mempertahankan operasional 24 jam?",
      },
      {
        id: "s3",
        textJp: "その最大の理由は、夜間のうちに商品の搬入や陳列、清掃を一斉に行えるためです。",
        textId: "Alasan terbesarnya adalah karena pada malam hari pengiriman barang, penataan rak display, dan pembersihan dapat dilakukan secara serempak.",
        isKeySentence: true,
      },
      {
        id: "s4",
        textJp: "もし夜間に店を閉めてしまうと、昼間の混雑時に入荷作業をしなければならず、かえって昼間の販売機会を逃すことにつながるからです。",
        textId: "Sebab jika toko tutup di malam hari, bongkar muat barang terpaksa dilakukan di siang hari yang ramai pelanggan, yang justru berakibat hilangnya peluang penjualan siang hari.",
      },
    ],
    passageTranslation:
      "Toko swalayan (konbini) di larut malam jumlah pelanggannya sedikit, sementara biaya listrik dan gaji karyawan membengkak. Meskipun demikian, mengapa banyak gerai yang tetap mempertahankan operasional 24 jam? Alasan terbesarnya adalah karena pada malam hari pengiriman barang, penataan rak display, dan pembersihan dapat dilakukan secara serempak. Sebab jika toko tutup di malam hari, bongkar muat barang terpaksa dilakukan di siang hari yang ramai pelanggan, yang justru berakibat hilangnya peluang penjualan siang hari.",
    vocabulary: [
      { termJp: "人件費", furigana: "じんけんひ", meaningId: "Biaya tenaga kerja / gaji karyawan", level: "N2" },
      { termJp: "搬入", furigana: "はんにゅう", meaningId: "Memasukkan / membongkar muat barang", level: "N2" },
      { termJp: "陳列", furigana: "ちんれつ", meaningId: "Memajang / menata produk di etalase", level: "N2" },
    ],
    questions: [
      {
        id: "q-tech-04-1",
        questionNumber: 1,
        questionJp: "多くのコンビニが深夜営業を続ける理由として、最も適切なものはどれか。",
        questionTranslation: "Pilihan mana yang paling tepat sebagai alasan banyak konbini tetap buka larut malam?",
        clueSentenceIndex: 2,
        techniqueTip:
          "Cari kalimat dengan 'その最大の理由は〜ためです'. Alasan utamanya adalah efisiensi logistik: menata barang saat toko sepi agar tidak mengganggu penjualan siang.",
        options: [
          {
            key: "1",
            textJp: "夜間に商品の補充や陳列を済ませ、昼間の売上低下を防ぐため",
            textId: "Untuk menyelesaikan pengisian dan penataan barang di malam hari demi mencegah penurunan penjualan siang hari.",
            explanation:
              "Benar! Kalimat ke-3 dan ke-4 menjelaskan bahwa menata barang di malam hari menjaga efisiensi penjualan siang saat toko ramai pelanggan.",
            isCorrect: true,
          },
          {
            key: "2",
            textJp: "深夜に来る大勢の客から高い利益を得られるから",
            textId: "Karena bisa meraup keuntungan tinggi dari banyaknya pelanggan di larut malam.",
            explanation:
              "Salah. Kalimat pertama justru menyatakan pelanggan larut malam itu sedikit (客数が少なく).",
            isCorrect: false,
          },
          {
            key: "3",
            textJp: "深夜の時間帯は電気代や人件費が安くなるから",
            textId: "Karena pada larut malam biaya listrik dan gaji karyawan menjadi murah.",
            explanation:
              "Salah. Kalimat pertama menyatakan biaya malam justru membengkak (コストがかさみます).",
            isCorrect: false,
          },
          {
            key: "4",
            textJp: "昼間に店を清掃することが法律で禁止されているから",
            textId: "Karena membersihkan toko di siang hari dilarang oleh hukum.",
            explanation:
              "Salah. Tidak ada aturan hukum yang disebutkan dalam teks.",
            isCorrect: false,
          },
        ],
      },
    ],
  },

  {
    id: "tech-05-gyakusetsu",
    chapterNumber: 5,
    category: "technique",
    categoryLabel: "基礎編 · 第5課",
    titleJp: "逆接と対比の後のメッセージ (Logika Kontras & Pembalik)",
    titleId: "Menangkap Titik Balik Argumen (しかし・だが・一方)",
    techniqueTag: "逆接・対比の把握",
    techniqueDescription:
      "Kalimat sebelum kata sambung pembalik seperti しかし (tetapi) atau だが biasanya hanya merupakan pengantar atau pandangan umum orang kebanyakan. Opini sejati penulis hampir selalu berada TEPAT SETELAH kata sambung pembalik tersebut.",
    sentences: [
      {
        id: "s1",
        textJp: "電子書籍やオンライン学習は、いつでもどこでも手軽に情報に触れられる点で非常に便利です。",
        textId: "E-book dan pembelajaran daring sangat praktis karena kita dapat mengakses informasi dengan mudah kapan pun dan di mana pun.",
      },
      {
        id: "s2",
        textJp: "重い本を持ち運ぶ必要もなく、検索機能を使えば知りたい箇所を瞬時に見つけることができます。",
        textId: "Kita tidak perlu membawa buku fisik yang berat, dan dengan fitur pencarian kita dapat menemukan bagian yang ingin diketahui seketika.",
      },
      {
        id: "s3",
        textJp: "しかし、深く思考し、知識を自分の中に定着させるという点においては、依然として紙の書籍に軍配が上がります。",
        textId: "Namun demikian, dalam hal berpikir mendalam dan mengendapkan ilmu ke dalam diri, buku cetak kertas tetap lebih unggul.",
        isKeySentence: true,
      },
      {
        id: "s4",
        textJp: "ページを手でめくる感触や空間的な位置関係の把握が、長期的な記憶の定着を助けるからです。",
        textId: "Sebab sensasi membalik halaman dengan jari dan pemahaman letak spasial membantu perekaman memori jangka panjang.",
      },
    ],
    passageTranslation:
      "E-book dan pembelajaran daring sangat praktis karena kita dapat mengakses informasi dengan mudah kapan pun dan di mana pun. Kita tidak perlu membawa buku fisik yang berat, dan dengan fitur pencarian kita dapat menemukan bagian yang ingin diketahui seketika. Namun demikian, dalam hal berpikir mendalam dan mengendapkan ilmu ke dalam diri, buku cetak kertas tetap lebih unggul. Sebab sensasi membalik halaman dengan jari dan pemahaman letak spasial membantu perekaman memori jangka panjang.",
    vocabulary: [
      { termJp: "手軽", furigana: "てがる", meaningId: "Praktis / mudah tanpa repot", level: "N2" },
      { termJp: "定着", furigana: "ていちゃく", meaningId: "Mengendap / melekat kuat", level: "N2" },
      { termJp: "軍配が上がる", furigana: "ぐんばいがあがる", meaningId: "Dinyatakan lebih unggul / menang (istilah sumo)", level: "N1" },
    ],
    questions: [
      {
        id: "q-tech-05-1",
        questionNumber: 1,
        questionJp: "紙の書籍について、筆者はどのように考えていますか。",
        questionTranslation: "Mengenai buku cetak kertas, bagaimana pandangan penulis?",
        clueSentenceIndex: 2,
        techniqueTip:
          "Cari kalimat setelah 'しかし' (Namun). Penulis mengakui kepraktisan digital di awal, tetapi berargumen bahwa untuk berpikir mendalam dan mengingat lama, buku cetak lebih unggul.",
        options: [
          {
            key: "1",
            textJp: "知識を深く定着させるには、電子書籍よりも紙の書籍の方が優れている",
            textId: "Untuk mengendapkan ilmu secara mendalam, buku kertas lebih unggul dibandingkan e-book.",
            explanation:
              "Benar! Ini adalah poin utama tepat setelah kata 'しかし' (紙の書籍に軍配が上がる).",
            isCorrect: true,
          },
          {
            key: "2",
            textJp: "重くて持ち運びに不便なので、今後はすべて電子書籍に代わるべきだ",
            textId: "Karena berat dan merepotkan untuk dibawa, ke depan sebaiknya seluruhnya digantikan e-book.",
            explanation:
              "Salah. Penulis tidak mendukung penggantian seluruhnya ke e-book.",
            isCorrect: false,
          },
          {
            key: "3",
            textJp: "検索機能がついていないため、学習用としては役に立たない",
            textId: "Karena tidak memiliki fitur pencarian, tidak berguna untuk keperluan belajar.",
            explanation:
              "Salah. Penulis justru memuji efektivitas buku kertas dalam membantu ingatan jangka panjang.",
            isCorrect: false,
          },
          {
            key: "4",
            textJp: "電子書籍と比べて空間的な位置関係が把握しにくい",
            textId: "Dibandingkan e-book, letak spasialnya lebih sulit dipahami.",
            explanation:
              "Salah. Kalimat terakhir menyatakan buku kertas justru mempermudah pemahaman posisi spasial.",
            isCorrect: false,
          },
        ],
      },
    ],
  },

  {
    id: "tech-06-shuchou",
    chapterNumber: 6,
    category: "technique",
    categoryLabel: "基礎編 · 第6課",
    titleJp: "筆者の主張を見つけ出す (Menemukan Opini Utama)",
    titleId: "Mengisolasi Pesan Utama Penulis (〜べきだ・〜ではないか)",
    techniqueTag: "筆者の意見・主張の把握",
    techniqueDescription:
      "Dalam soal Dokkai, pilihan ganda sering menjebak dengan menuliskan fakta yang memang benar ada di teks, padahal yang ditanyakan adalah 'opini inti penulis'. Opini penulis biasanya berada di paragraf akhir dan diakhiri ungkapan 〜べきだ (seharusnya), 〜ではないだろうか (bukankah), atau 〜に違いない.",
    sentences: [
      {
        id: "s1",
        textJp: "多くの人は失敗を恐れ、できるだけ間違いを犯さないように安全な道を選びがちです。",
        textId: "Banyak orang cenderung takut akan kegagalan dan memilih jalan yang aman agar sebisa mungkin tidak melakukan kesalahan.",
      },
      {
        id: "s2",
        textJp: "確かに失敗すれば、一時的に時間を失ったり周囲から批判されたりすることもあるでしょう。",
        textId: "Memang benar jika gagal, kita mungkin kehilangan waktu untuk sementara atau mendapat kritik dari sekitar.",
      },
      {
        id: "s3",
        textJp: "しかし、完璧な準備ができるまで行動を起こさないことこそが、最も深刻な機会損失ではないでしょうか。",
        textId: "Akan tetapi, tidak mengambil tindakan sampai persiapan sempurna selesai, bukankah justru merupakan kehilangan peluang yang paling fatal?",
        isKeySentence: true,
      },
      {
        id: "s4",
        textJp: "失敗から得られる教訓は座学の何倍もの価値があるのですから、私たちはもっと挑戦を恐れない姿勢を持つべきです。",
        textId: "Karena pelajaran dari kegagalan nilainya berlipat ganda dibanding belajar teori, kita seharusnya memiliki sikap yang lebih berani mencoba tanpa takut.",
        isKeySentence: true,
      },
    ],
    passageTranslation:
      "Banyak orang cenderung takut akan kegagalan dan memilih jalan yang aman agar sebisa mungkin tidak melakukan kesalahan. Memang benar jika gagal, kita mungkin kehilangan waktu untuk sementara atau mendapat kritik dari sekitar. Akan tetapi, tidak mengambil tindakan sampai persiapan sempurna selesai, bukankah justru merupakan kehilangan peluang yang paling fatal? Karena pelajaran dari kegagalan nilainya berlipat ganda dibanding belajar teori, kita seharusnya memiliki sikap yang lebih berani mencoba tanpa takut.",
    vocabulary: [
      { termJp: "機会損失", furigana: "きかいそんしつ", meaningId: "Kehilangan peluang / opportunity loss", level: "N2" },
      { termJp: "教訓", furigana: "きょうくん", meaningId: "Pelajaran berharga / hikmah", level: "N2" },
      { termJp: "座学", furigana: "ざがく", meaningId: "Belajar teori di dalam kelas", level: "N1" },
    ],
    questions: [
      {
        id: "q-tech-06-1",
        questionNumber: 1,
        questionJp: "この文章で筆者が最も主張したいことは何か。",
        questionTranslation: "Apa hal yang paling ingin disampaikan/ditegaskan oleh penulis dalam teks ini?",
        clueSentenceIndex: 3,
        techniqueTip:
          "Cari kalimat penutup dengan modalitas opini: '〜を持つべきです' (seharusnya memiliki). Penulis mengajak untuk tidak takut gagal dan berani mengambil langkah aksi.",
        options: [
          {
            key: "1",
            textJp: "失敗を恐れずに行動を起こし、経験から学ぶ姿勢が大切だということ",
            textId: "Pentingnya mengambil tindakan tanpa takut gagal dan memiliki sikap belajar dari pengalaman.",
            explanation:
              "Benar! Ini merangkum kalimat ke-3 dan ke-4 yang menjadi kesimpulan penulis (挑戦を恐れない姿勢を持つべき).",
            isCorrect: true,
          },
          {
            key: "2",
            textJp: "批判されないために、完璧な準備が整うまで行動を控えるべきだということ",
            textId: "Agar tidak dikritik, sebaiknya menahan diri bertindak sampai persiapan sempurna selesai.",
            explanation:
              "Salah. Ini bertolak belakang dengan argumen penulis yang menganggap menunggu persiapan sempurna sebagai kerugian peluang terbesar.",
            isCorrect: false,
          },
          {
            key: "3",
            textJp: "座学で理論を完璧にマスターすれば失敗は完全に防げるということ",
            textId: "Jika menguasai teori di kelas dengan sempurna, kegagalan bisa dicegah secara mutlak.",
            explanation:
              "Salah. Penulis menyatakan pelajaran dari pengalaman gagal jauh lebih bernilai dari sekadar teori kelas.",
            isCorrect: false,
          },
          {
            key: "4",
            textJp: "失敗による時間や費用の損失は取り戻すことができないということ",
            textId: "Kerugian waktu dan biaya akibat kegagalan tidak akan pernah bisa dipulihkan kembali.",
            explanation:
              "Salah. Penulis menyebut kehilangan waktu hanya sementara (一時的に時間を失ったり).",
            isCorrect: false,
          },
        ],
      },
    ],
  },

  // =========================================================================
  // PILAR 2: 実践編 (Latihan Membaca Sesuai Format Ujian Asli JLPT N3)
  // =========================================================================
  {
    id: "drill-short-01",
    chapterNumber: 7,
    category: "short",
    categoryLabel: "実践編 · 短文読解 (Teks Pendek)",
    titleJp: "社内研修の受講案内 (Pengumuman Pelatihan Internal)",
    titleId: "Pemberitahuan Pelatihan Karyawan Perusahaan",
    techniqueTag: "短文の実践",
    techniqueDescription:
      "Teks pendek ujian JLPT N3 biasanya berupa email bisnis, memo internal, atau pemberitahuan fasilitas. Kunci utamanya adalah membaca pertanyaan terlebih dahulu, lalu memindai syarat waktu dan instruksi wajib.",
    sentences: [
      {
        id: "s1",
        textJp: "社員各位：来月より全社員を対象とした「情報セキュリティ基礎研修」をオンラインにて実施いたします。",
        textId: "Kepada seluruh staf: Mulai bulan depan, 'Pelatihan Dasar Keamanan Informasi' untuk seluruh karyawan akan dilaksanakan secara daring.",
      },
      {
        id: "s2",
        textJp: "受講期間は10月1日から10月20日までとなっておりますので、各自都合の良い時間に社内ポータルサイトから動画を視聴してください。",
        textId: "Periode pelatihan adalah dari tanggal 1 Oktober hingga 20 Oktober, jadi harap tonton video materi melalui portal intranet perusahaan pada waktu luang masing-masing.",
      },
      {
        id: "s3",
        textJp: "なお、動画視聴後に確認テスト（全10問）を受け、80点以上を取得した時点で修了とみなされます。",
        textId: "Sebagai catatan, Anda dianggap lulus setelah mengikuti kuis konfirmasi (total 10 soal) seusai menonton video dan mendapatkan nilai 80 poin ke atas.",
        isKeySentence: true,
      },
      {
        id: "s4",
        textJp: "期限までに修了が確認できない場合は、個別再研修の対象となりますのでご注意ください。",
        textId: "Harap diperhatikan bahwa jika kelulusan belum terkonfirmasi hingga batas waktu, Anda akan diwajibkan mengikuti pelatihan ulang perorangan.",
      },
    ],
    passageTranslation:
      "Kepada seluruh staf: Mulai bulan depan, 'Pelatihan Dasar Keamanan Informasi' untuk seluruh karyawan akan dilaksanakan secara daring. Periode pelatihan adalah dari tanggal 1 Oktober hingga 20 Oktober, jadi harap tonton video materi melalui portal intranet perusahaan pada waktu luang masing-masing. Sebagai catatan, Anda dianggap lulus setelah mengikuti kuis konfirmasi (total 10 soal) seusai menonton video dan mendapatkan nilai 80 poin ke atas. Harap diperhatikan bahwa jika kelulusan belum terkonfirmasi hingga batas waktu, Anda akan diwajibkan mengikuti pelatihan ulang perorangan.",
    vocabulary: [
      { termJp: "各位", furigana: "かくい", meaningId: "Kepada yang terhormat seluruh hadirin/staf", level: "N2" },
      { termJp: "受講", furigana: "じゅこう", meaningId: "Mengikuti kursus / kelas pelatihan", level: "N2" },
      { termJp: "修了", furigana: "しゅうりょう", meaningId: "Menyelesaikan program pelatihan secara sah", level: "N2" },
    ],
    questions: [
      {
        id: "q-drill-short-1",
        questionNumber: 1,
        questionJp: "この研修を修了するために必要なことは何か。",
        questionTranslation: "Apa yang dibutuhkan agar dinyatakan lulus dalam pelatihan ini?",
        clueSentenceIndex: 2,
        techniqueTip:
          "Cari kata '修了とみなされます' (dianggap lulus). Syaratnya ada dua: menonton video dan meraih nilai minimal 80 pada tes konfirmasi.",
        options: [
          {
            key: "1",
            textJp: "期間内に動画を視聴し、確認テストで80点以上を取ること",
            textId: "Menonton video dalam batas periode dan meraih nilai 80 ke atas pada kuis konfirmasi.",
            explanation:
              "Benar! Sesuai kalimat ke-2 dan ke-3: harus selesai sebelum 20 Oktober dengan skor minimal 80.",
            isCorrect: true,
          },
          {
            key: "2",
            textJp: "10月1日の午前中に指定された会場に集まること",
            textId: "Berkumpul di lokasi acara yang ditentukan pada 1 Oktober pagi hari.",
            explanation:
              "Salah. Pelatihan dilakukan online fleksibel dari portal intranet, bukan tatap muka di tempat.",
            isCorrect: false,
          },
          {
            key: "3",
            textJp: "確認テストで10問すべて正解すること",
            textId: "Menjawab benar seluruh 10 soal pada kuis konfirmasi.",
            explanation:
              "Salah. Syaratnya adalah nilai 80 poin ke atas, tidak harus benar 100% sempurna.",
            isCorrect: false,
          },
          {
            key: "4",
            textJp: "個別に上司の承認サインをもらうこと",
            textId: "Meminta tanda tangan persetujuan atasan secara perorangan.",
            explanation:
              "Salah. Tidak ada syarat meminta tanda tangan atasan.",
            isCorrect: false,
          },
        ],
      },
    ],
  },

  {
    id: "drill-info-01",
    chapterNumber: 8,
    category: "info_search",
    categoryLabel: "実践編 · 情報検索 (Pencarian Informasi)",
    titleJp: "コワーキングスペース利用案内 (Informasi Coworking Space)",
    titleId: "Aturan Penggunaan Ruang Kerja Bersama (Coworking)",
    techniqueTag: "情報検索の技術",
    techniqueDescription:
      "Pada soal 情報検索, jangan membaca seluruh teks dari atas sampai bawah. Baca pertanyaannya dulu, identifikasi profil orang yang mencari fasilitas, lalu cari baris yang sesuai di tabel dan periksa tanda bintang (*) atau syarat khusus di bagian bawah.",
    sentences: [
      {
        id: "s1",
        textJp: "【コワーキングスペース「サクラ」利用プラン一覧】",
        textId: "【Daftar Paket Penggunaan Ruang Kerja Coworking 'Sakura'】",
      },
      {
        id: "s2",
        textJp: "① ドロップイン（一時利用）：1時間 500円／1日最大 2,000円（事前予約不要・平日9時〜18時のみ）",
        textId: "① Drop-in (Sekali pakai): 500 yen per jam / Maksimal 2.000 yen per hari (Tanpa reservasi, hanya hari kerja jam 09.00 - 18.00).",
      },
      {
        id: "s3",
        textJp: "② ナイト＆ホリデープラン：月額 8,000円（平日18時〜23時および土日祝日の終日利用可能）",
        textId: "② Paket Malam & Hari Libur: 8.000 yen per bulan (Dapat digunakan hari kerja jam 18.00 - 23.00 serta seharian penuh di hari Sabtu, Minggu, dan tanggal merah).",
        isKeySentence: true,
      },
      {
        id: "s4",
        textJp: "③ フルタイムプラン：月額 15,000円（年中無休 24時間利用可能・個室ロッカー無料）",
        textId: "③ Paket Full-time: 15.000 yen per bulan (Tersedia 24 jam nonstop sepanjang tahun, loker pribadi gratis).",
      },
      {
        id: "s5",
        textJp: "※学生の方は学生証の提示により、上記すべての月額プランが20％割引となります（一時利用は割引対象外）。",
        textId: "※Bagi pelajar/mahasiswa, dengan menunjukkan kartu pelajar, seluruh paket bulanan di atas mendapat diskon 20% (Penggunaan sekali pakai Drop-in tidak termasuk diskon).",
        isKeySentence: true,
      },
    ],
    passageTranslation:
      "【Daftar Paket Penggunaan Ruang Kerja Coworking 'Sakura'】\n① Drop-in (Sekali pakai): 500 yen per jam / Maksimal 2.000 yen per hari (Tanpa reservasi, hanya hari kerja jam 09.00 - 18.00).\n② Paket Malam & Hari Libur: 8.000 yen per bulan (Dapat digunakan hari kerja jam 18.00 - 23.00 serta seharian penuh di hari Sabtu, Minggu, dan tanggal merah).\n③ Paket Full-time: 15.000 yen per bulan (Tersedia 24 jam nonstop sepanjang tahun, loker pribadi gratis).\n※Bagi pelajar/mahasiswa, dengan menunjukkan kartu pelajar, seluruh paket bulanan di atas mendapat diskon 20% (Penggunaan sekali pakai Drop-in tidak termasuk diskon).",
    vocabulary: [
      { termJp: "一時利用", furigana: "いちじりよう", meaningId: "Penggunaan sementara / sekali datang", level: "N2" },
      { termJp: "祝日", furigana: "しゅくじつ", meaningId: "Hari libur nasional / tanggal merah", level: "N3" },
      { termJp: "提示", furigana: "ていじ", meaningId: "Menunjukkan dokumen untuk diverifikasi", level: "N2" },
    ],
    questions: [
      {
        id: "q-drill-info-1",
        questionNumber: 1,
        questionJp: "大学生のスミスさんは、平日の夜（19時〜22時）と土曜日の午後に利用したいと考えています。最も安く利用できるプランと月額料金の組合せはどれですか。",
        questionTranslation:
          "Smith, seorang mahasiswa, ingin menggunakan ruang kerja pada malam hari kerja (19.00 - 22.00) dan Sabtu siang. Kombinasi paket paling hemat dan biaya bulanan yang tepat adalah?",
        clueSentenceIndex: 2,
        techniqueTip:
          "Cek dua syarat: 1) Waktu pakai: Malam hari kerja + Sabtu -> Cocok dengan Paket ② ナイト＆ホリデー (8.000 yen). 2) Status: Mahasiswa (学生) -> Diskon 20% dari 8.000 yen = 8.000 - 1.600 = 6.400 yen.",
        options: [
          {
            key: "1",
            textJp: "ナイト＆ホリデープランで、月額 6,400円",
            textId: "Paket Night & Holiday, dengan biaya 6.400 yen per bulan.",
            explanation:
              "Benar! Waktu Smith sesuai dengan Paket ② (8.000 yen). Sebagai mahasiswa, ia berhak mendapat diskon 20% (8.000 × 0.8 = 6.400 yen).",
            isCorrect: true,
          },
          {
            key: "2",
            textJp: "ナイト＆ホリデープランで、月額 8,000円",
            textId: "Paket Night & Holiday, dengan biaya 8.000 yen per bulan.",
            explanation:
              "Salah. Ini harga normal belum dipotong diskon mahasiswa 20%.",
            isCorrect: false,
          },
          {
            key: "3",
            textJp: "ドロップイン（一時利用）で、毎回 2,000円",
            textId: "Drop-in sekali pakai, setiap kali datang 2.000 yen.",
            explanation:
              "Salah. Drop-in hanya berlaku hari kerja sampai jam 18.00, padahal Smith butuh malam dan hari Sabtu.",
            isCorrect: false,
          },
          {
            key: "4",
            textJp: "フルタイムプランで、月額 12,000円",
            textId: "Paket Full-time, dengan biaya 12.000 yen per bulan.",
            explanation:
              "Salah. Meskipun bisa dipakai 24 jam dan diskon menjadi 12.000 yen, biayanya jauh lebih mahal daripada paket Night & Holiday (6.400 yen).",
            isCorrect: false,
          },
        ],
      },
    ],
  },
];
