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

  // =========================================================================
  // PILAR 2: 実践編 追加ユニット (短文・中文・長文・情報検索)
  // =========================================================================
  {
    "id": "drill-short-02",
    "chapterNumber": 9,
    "category": "short",
    "categoryLabel": "実践編 · 短文読解 (Teks Pendek)",
    "titleJp": "業務打ち合わせの日程変更について",
    "titleId": "Pemberitahuan Perubahan Jadwal Rapat Kerja",
    "techniqueTag": "ビジネス連絡・要件の把握",
    "techniqueDescription": "Pada memo atau email bisnis (短文), fokus utama selalu ada pada 3 hal: 1) Alasan perubahan (変更の理由), 2) Kapan dan apa jadwal barunya (新しい日程), dan 3) Apa tindakan yang diminta dari penerima (返信や連絡の依頼). Kalimat instruksi/permohonan biasanya berada di akhir wacana.",
    "sentences": [
      {
        "id": "s1",
        "textJp": "営業部員各位：来週火曜日（10月15日）14時より予定しておりました新商品に関する業務打ち合わせですが、担当役員の出張日程が急遽変更となったため、以下の通り日時を延期させていただきます。",
        "textId": "Kepada seluruh staf bagian sales: Mengenai rapat koordinasi produk baru yang dijadwalkan Selasa depan (15 Okt) pukul 14.00, karena jadwal dinas luar direktur terkait mendadak berubah, maka waktu rapat ditunda sebagai berikut."
      },
      {
        "id": "s2",
        "textJp": "変更後の日時は【10月17日（木）10:30〜12:00】、場所は第2会議室（変更なし）となります。",
        "textId": "Waktu setelah perubahan adalah 【Kamis, 17 Oktober 10.30 - 12.00】, bertempat di Ruang Rapat 2 (tidak ada perubahan ruangan)."
      },
      {
        "id": "s3",
        "textJp": "なお、新しい日程でご都合が合わない方は、本日17時までに調整担当の田中までメールにてご連絡ください。",
        "textId": "Adapun bagi yang berhalangan hadir pada jadwal baru tersebut, mohon hubungi Tanaka (penanggung jawab penyesuaian jadwal) melalui email paling lambat hari ini pukul 17.00.",
        "isKeySentence": true
      },
      {
        "id": "s4",
        "textJp": "特にご連絡がない場合は、上記の日程でご出席いただけるものとして進行いたしますのでご了承ください。",
        "textId": "Jika tidak ada kabar, kami anggap Anda dapat menghadiri rapat sesuai jadwal di atas."
      }
    ],
    "passageTranslation": "Kepada seluruh staf bagian sales: Mengenai rapat koordinasi produk baru yang dijadwalkan Selasa depan (15 Okt) pukul 14.00, karena jadwal dinas luar direktur terkait mendadak berubah, maka waktu rapat ditunda sebagai berikut.\nWaktu setelah perubahan adalah 【Kamis, 17 Oktober 10.30 - 12.00】, bertempat di Ruang Rapat 2 (tidak ada perubahan ruangan).\nAdapun bagi yang berhalangan hadir pada jadwal baru tersebut, mohon hubungi Tanaka (penanggung jawab penyesuaian jadwal) melalui email paling lambat hari ini pukul 17.00.\nJika tidak ada kabar, kami anggap Anda dapat menghadiri rapat sesuai jadwal di atas.",
    "vocabulary": [
      {
        "termJp": "延期",
        "furigana": "えんき",
        "meaningId": "Penundaan jadwal ke tanggal lain",
        "level": "N3"
      },
      {
        "termJp": "急遽",
        "furigana": "きゅうきょ",
        "meaningId": "Mendadak / tergesa-gesa tanpa diduga",
        "level": "N1"
      },
      {
        "termJp": "役員",
        "furigana": "やくいん",
        "meaningId": "Pejabat eksekutif / dewan direksi perusahaan",
        "level": "N2"
      },
      {
        "termJp": "出張",
        "furigana": "しゅっちょう",
        "meaningId": "Perjalanan dinas bisnis luar kota",
        "level": "N4"
      }
    ],
    "questions": [
      {
        "id": "q-drill-short-02-1",
        "questionNumber": 1,
        "questionJp": "このメールを受け取った営業部員は、まず何をしなければなりませんか。",
        "questionTranslation": "Apa yang harus dilakukan pertama kali oleh staf sales setelah menerima email ini?",
        "clueSentenceIndex": 2,
        "techniqueTip": "Perhatikan syarat di kalimat 3: 'ご都合が合わない方は...田中までメールにてご連絡ください'. Artinya hanya yang tidak bisa hadir yang wajib kirim email sebelum jam 17:00.",
        "options": [
          {
            "key": "1",
            "textJp": "新しい日程（17日木曜）で参加できない場合のみ、本日17時までに田中に連絡する。",
            "textId": "Hanya jika tidak bisa hadir di jadwal baru (Kamis 17 Okt), menghubungi Tanaka sebelum jam 17.00 hari ini.",
            "explanation": "Benar! Surat tersebut menyatakan '新しい日程でご都合が合わない方は、本日17時までに...ご連絡ください' dan jika tidak ada kabar dianggap bisa hadir.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "出席できるかどうかにかかわらず、部員全員が本日17時までに田中へ返信メールを送る。",
            "textId": "Terlepas bisa hadir atau tidak, seluruh staf wajib mengirim email balasan ke Tanaka sebelum jam 17.00 hari ini.",
            "explanation": "Salah (Jebakan '全員'). Email menyatakan jika tidak ada kabar dianggap hadir, jadi yang bisa hadir tidak perlu membalas.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "役員の出張日程を確認してから、第2会議室の予約手続きを変更する。",
            "textId": "Memeriksa jadwal dinas direktur terlebih dahulu lalu mengubah reservasi Ruang Rapat 2.",
            "explanation": "Salah. Ruang rapat sudah dipastikan tidak berubah (第2会議室・変更なし).",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "10月15日の14時に第2会議室に集まり、日程の再調整について相談する。",
            "textId": "Berkumpul di Ruang Rapat 2 pada 15 Oktober pukul 14.00 untuk membicarakan penyesuaian ulang.",
            "explanation": "Salah. Rapat tanggal 15 Oktober tersebut sudah resmi dibatalkan dan ditunda ke tanggal 17 Oktober.",
            "isCorrect": false
          }
        ]
      }
    ]
  },

  {
    "id": "drill-medium-01",
    "chapterNumber": 10,
    "category": "medium",
    "categoryLabel": "実践編 · 中文読解 (Teks Menengah)",
    "titleJp": "職場における「あいさつ」の力",
    "titleId": "Kekuatan Salam di Lingkungan Kerja",
    "techniqueTag": "段落展開と結論の把握",
    "techniqueDescription": "Teks 中文 (350~450 karakter) memiliki alur runtut: Paragraf 1 membuka topik, Paragraf 2 memberi bukti empiris/analisis perbandingan, dan Paragraf 3 menarik kesimpulan opini. Kerjakan soal nomor demi nomor sesuai letak paragrafnya.",
    "sentences": [
      {
        "id": "s1",
        "textJp": "あいさつは、人が社会で生活していく上で最も基本的で、当たり前のマナーだと考えられている。",
        "textId": "Salam dianggap sebagai tata krama paling mendasar dan lumrah bagi manusia dalam menjalani kehidupan bermasyarakat."
      },
      {
        "id": "s2",
        "textJp": "しかし、職場でのあいさつには、単に礼儀正しさを示すこと以上の大きな効果が存在している。",
        "textId": "Namun, salam di tempat kerja memiliki manfaat besar yang jauh melampaui sekadar menunjukkan kesopanan.",
        "isKeySentence": true
      },
      {
        "id": "s3",
        "textJp": "毎朝明るい声で「おはようございます」と言葉を交わすだけで、職場の緊張感が和らぎ、お互いの心理的な距離が自然と縮まるのだ。",
        "textId": "Hanya dengan saling menyapa 'selamat pagi' dengan ceria setiap hari, ketegangan di kantor mereda dan jarak psikologis antarpegawai menyusut alami."
      },
      {
        "id": "s4",
        "textJp": "実際に、あいさつが活発に行われているチームでは、仕事の連絡や相談がスムーズに進みやすいという調査結果もある。",
        "textId": "Faktanya, ada hasil survei yang menunjukkan bahwa pada tim yang aktif bertukar salam, komunikasi dan koordinasi kerja berjalan jauh lebih lancar."
      },
      {
        "id": "s5",
        "textJp": "声をかけやすい雰囲気が日常的に作られているため、ミスやトラブルが発生した際にも、一人で抱え込まずに素早く周囲に共有できるからである。",
        "textId": "Hal ini karena suasana yang mudah diajak bicara tercipta secara rutin, sehingga ketika terjadi kesalahan atau masalah, mereka tidak memendamnya sendirian melainkan cepat berbagi ke sekitarnya.",
        "isKeySentence": true
      },
      {
        "id": "s6",
        "textJp": "反対に、互いに無言で過ごす職場では、小さな疑問があっても質問することをためらってしまい、結果として重大な失敗につながる恐れがある。",
        "textId": "Sebaliknya, di tempat kerja yang saling hening tanpa tegur sapa, orang akan ragu bertanya meski ada keraguan kecil, yang berisiko berujung pada kegagalan fatal."
      },
      {
        "id": "s7",
        "textJp": "つまり、あいさつとは形式的な規則ではなく、円滑なチームワークと安全な業務を支えるための最も手軽で強力なコミュニケーション手段なのである。",
        "textId": "Dengan kata lain, salam bukanlah aturan formalitas belaka, melainkan sarana komunikasi paling praktis dan ampuh untuk menopang kerja tim yang harmonis dan kelancaran operasional kerja yang aman.",
        "isKeySentence": true
      }
    ],
    "passageTranslation": "Salam dianggap sebagai tata krama paling mendasar bagi manusia dalam bermasyarakat. Namun, salam di tempat kerja memiliki manfaat besar yang melampaui sekadar kesopanan.\nHanya dengan saling menyapa 'selamat pagi' secara ceria setiap hari, ketegangan di kantor mereda dan jarak psikologis antarpegawai menyusut alami.\nFaktanya, penelitian membuktikan bahwa pada tim yang aktif bertukar salam, koordinasi kerja berjalan jauh lebih lancar. Karena suasana yang ramah tercipta rutin, saat terjadi masalah pegawai tidak memendamnya sendirian melainkan lekas melapor.\nSebaliknya di kantor yang sunyi tanpa tegur sapa, orang ragu bertanya meski ada keraguan kecil sehingga berisiko menjadi kegagalan fatal.\nDengan kata lain, salam bukan aturan formalitas kaku, melainkan sarana komunikasi paling praktis dan ampuh untuk menjaga keselamatan dan keharmonisan kerja tim.",
    "vocabulary": [
      {
        "termJp": "礼儀",
        "furigana": "れいぎ",
        "meaningId": "Tata krama / kesopanan etika",
        "level": "N3"
      },
      {
        "termJp": "緊張感",
        "furigana": "きんちょうかん",
        "meaningId": "Rasa tegang / atmosfer kaku",
        "level": "N2"
      },
      {
        "termJp": "和らぐ",
        "furigana": "やわらぐ",
        "meaningId": "Mereda / menjadi rileks tenang",
        "level": "N2"
      },
      {
        "termJp": "抱え込む",
        "furigana": "かかえこむ",
        "meaningId": "Memendam / menanggung masalah sendirian",
        "level": "N2"
      },
      {
        "termJp": "ためらう",
        "furigana": "ためらう",
        "meaningId": "Ragu-ragu / bimbang untuk melangkah",
        "level": "N2"
      },
      {
        "termJp": "形式的",
        "furigana": "けいしきてき",
        "meaningId": "Hanya bersifat formalitas luaran belaka",
        "level": "N2"
      }
    ],
    "questions": [
      {
        "id": "q-drill-med-01-1",
        "questionNumber": 1,
        "questionJp": "文中の「単に礼儀正しさを示すこと以上の大きな効果」とは、具体的にどのようなことですか。",
        "questionTranslation": "Apa hal konkret yang dimaksud dengan 'manfaat besar yang melampaui sekadar kesopanan' pada teks?",
        "clueSentenceIndex": 2,
        "techniqueTip": "Lihat kalimat tepat setelah kata '大きな効果': '職場の緊張感が和らぎ、お互いの心理的な距離が自然と縮まるのだ'.",
        "options": [
          {
            "key": "1",
            "textJp": "毎朝あいさつを交わすことで職場の緊張がほぐれ、社員同士の心理的な距離が近くなること。",
            "textId": "Saling bertegur sapa setiap pagi meredakan ketegangan kantor dan mendekatkan jarak psikologis antarkaryawan.",
            "explanation": "Benar! Kalimat ke-3 secara gamblang menjelaskan efek tersebut: ketegangan mereda dan jarak psikologis mencair.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "礼儀正しく大きな声であいさつすることで、上司からの評価や給料が上がること。",
            "textId": "Menyapa dengan suara keras dan sopan akan menaikkan penilaian dan gaji dari atasan.",
            "explanation": "Salah. Penulis tidak pernah membahas tentang kenaikan gaji atau penilaian atasan.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "形式的な規則を厳格に守ることで、職場の厳しい規律を維持できること。",
            "textId": "Mempertahankan kedisiplinan kantor yang ketat dengan menaati aturan formalitas secara tegas.",
            "explanation": "Salah. Paragraf terakhir justru menegaskan bahwa salam 'bukanlah aturan formalitas belaka' (形式的な規則ではない).",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "無言で仕事に専念する環境を作り、個人の作業効率を限界まで高められること。",
            "textId": "Menciptakan lingkungan kerja tanpa suara agar efisiensi kerja individu meningkat maksimal.",
            "explanation": "Salah. Penulis justru mengkritik lingkungan tanpa tegur sapa (無言で過ごす職場) karena berbahaya memicu kesalahan.",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "q-drill-med-01-2",
        "questionNumber": 2,
        "questionJp": "あいさつが活発なチームでミスやトラブルへの対応が素早いのはなぜですか。",
        "questionTranslation": "Mengapa tim yang aktif bertukar salam cepat dalam menangani kesalahan dan masalah?",
        "clueSentenceIndex": 4,
        "techniqueTip": "Cari kalimat penjelas sebab di kalimat 5: perhatikan kata penghubung '〜からである'.",
        "options": [
          {
            "key": "1",
            "textJp": "普段から気軽に話し合える雰囲気があり、問題を一人で悩まず周囲へすぐ共有できるから。",
            "textId": "Karena terbiasa dengan suasana yang mudah diajak bicara, sehingga tidak memendam masalah sendirian melainkan lekas membaginya.",
            "explanation": "Benar! Kalimat 5 menyebutkan: 声をかけやすい雰囲気が日常的に作られているため、ミスやトラブルが発生した際にも一人で抱え込まずに素早く周囲に共有できるからである.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "毎朝のあいさつの際に、その日の業務計画やミス防止策をすべて話し合うから。",
            "textId": "Karena saat salam pagi, seluruh rencana kerja dan pencegahan kesalahan didiskusikan lengkap.",
            "explanation": "Salah. Teks hanya menyebut salam mencairkan suasana agar mudah diajak bicara, bukan rapat perencanaan penuh.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "互いに明るくあいさつを交わしていれば、業務上のミスが全く発生しなくなるから。",
            "textId": "Karena jika saling menyapa dengan ceria, kesalahan operasional tidak akan terjadi sama sekali.",
            "explanation": "Salah (Ekstrem). Teks menyatakan saat terjadi kesalahan (ミスが発生した際にも) penanganannya lebih cepat, bukan tidak ada kesalahan sama sekali.",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "チーム内にどんな重大なトラブルでも一人で解決できる責任者がいるから。",
            "textId": "Karena di dalam tim selalu ada satu penanggung jawab yang bisa menyelesaikan segala masalah sendiri.",
            "explanation": "Salah. Teks menekankan pentingnya kerja tim dan berbagi ke orang sekitar, bukan memikul sendirian.",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "q-drill-med-01-3",
        "questionNumber": 3,
        "questionJp": "筆者がこの文章で最も伝えたい主張はどれですか。",
        "questionTranslation": "Pesan utama manakah yang paling ingin disampaikan penulis melalui wacana ini?",
        "clueSentenceIndex": 6,
        "techniqueTip": "Cek kalimat kesimpulan terakhir yang diawali kata 'つまり' (dengan kata lain).",
        "options": [
          {
            "key": "1",
            "textJp": "あいさつは単なる形式ではなく、円滑な連携と安全な業務を支える強力な手段である。",
            "textId": "Salam bukan sekadar formalitas, melainkan sarana ampuh yang menopang kerja tim harmonis dan keamanan operasional kerja.",
            "explanation": "Benar! Kalimat pamungkas teks (kalimat 7): あいさつとは形式的な規則ではなく、円滑なチームワークと安全な業務を支えるための最も手軽で強力なコミュニケーション手段なのである.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "仕事で重大なミスをしてしまったときは、何よりもまず朝一番のあいさつで謝罪すべきだ。",
            "textId": "Saat membuat kesalahan besar, hal pertama yang harus dilakukan adalah meminta maaf saat salam pagi.",
            "explanation": "Salah. Teks tidak membahas tata cara minta maaf saat berbuat salah.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "職場の秩序を守るためには、社員全員にあいさつの作法を厳しく教育することが不可欠だ。",
            "textId": "Untuk menjaga ketertiban, mutlak diperlukan pelatihan etika salam yang tegas kepada seluruh karyawan.",
            "explanation": "Salah. Penulis justru menekankan salam yang alami untuk mencairkan ketegangan, bukan aturan kaku yang dipaksakan.",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "人間関係を深めるためには、あいさつよりも仕事後の飲み会などの場を優先すべきだ。",
            "textId": "Untuk mempererat hubungan, pertemuan santai/minum setelah jam kerja lebih diutamakan daripada sekadar salam.",
            "explanation": "Salah. Teks sama sekali tidak menyebutkan acara minum atau kegiatan di luar jam kerja.",
            "isCorrect": false
          }
        ]
      }
    ]
  },

  {
    "id": "drill-medium-02",
    "chapterNumber": 11,
    "category": "medium",
    "categoryLabel": "実践編 · 中文読解 (Teks Menengah)",
    "titleJp": "睡眠と学習のメカニズム",
    "titleId": "Mekanisme Tidur dan Proses Belajar",
    "techniqueTag": "実験データと対比の分析",
    "techniqueDescription": "Pada wacana berbasis penelitian/eksperimen, kenali dua kutub yang dibandingkan (対比): kelompok perlakuan cukup tidur (グループA) vs kelompok kurang tidur (グループB). Cari hubungan sebab-akibat antara waktu tidur dan daya ingat jangka panjang.",
    "sentences": [
      {
        "id": "s1",
        "textJp": "試験の前夜、少しでも長く勉強しようと睡眠時間を削って徹夜をした経験を持つ人は少なくないだろう。",
        "textId": "Banyak orang mungkin pernah punya pengalaman begadang semalaman memangkas waktu tidur demi belajar lebih lama menjelang ujian."
      },
      {
        "id": "s2",
        "textJp": "しかし近年の脳科学の研究によれば、このような「睡眠を削る学習法」は、記憶の定着という観点から見ると極めて非効率的であることが分かってきた。",
        "textId": "Namun menurut riset neurosains beberapa tahun terakhir, metode belajar dengan mengorbankan tidur ini terbukti sangat tidak efisien ditinjau dari sisi pengendapan ingatan.",
        "isKeySentence": true
      },
      {
        "id": "s3",
        "textJp": "ある大学の研究チームが行った実験では、同じ新しい知識を学んだ後、「すぐに8時間の十分な睡眠をとったグループA」と、「夜遅くまで復習を続け、4時間しか眠らなかったグループB」の翌日のテスト成績を比較した。",
        "textId": "Dalam eksperimen salah satu universitas, setelah mempelajari materi baru yang sama, peneliti membandingkan nilai tes keesokan harinya antara 'Kelompok A yang langsung tidur cukup 8 jam' dan 'Kelompok B yang terus mengulang materi hingga larut malam dan hanya tidur 4 jam'."
      },
      {
        "id": "s4",
        "textJp": "その結果、学習時間が短かったにもかかわらず、しっかり睡眠をとったグループAの方が、圧倒的に高い正答率を記録したのである。",
        "textId": "Hasilnya, meskipun waktu belajarnya lebih sedikit, Kelompok A yang tidur nyenyak justru mencatatkan persentase jawaban benar yang jauh lebih tinggi secara telak.",
        "isKeySentence": true
      },
      {
        "id": "s5",
        "textJp": "人間の脳は、眠っている間にその日取り入れた情報を整理し、短期的な記憶から長期間残る記憶へと変換・固定する働きを持っている。",
        "textId": "Otak manusia memiliki fungsi menata informasi yang masuk hari itu selama tidur, lalu mengonversi dan menguncinya dari memori jangka pendek menjadi memori jangka panjang."
      },
      {
        "id": "s6",
        "textJp": "つまり、十分な睡眠をとらないということは、せっかく詰め込んだ知識を脳の引き出しにしっかりと仕舞わないまま放置するようなものなのだ。",
        "textId": "Dengan kata lain, kurang tidur sama halnya dengan menjejalkan pengetahuan ke dalam kepala tetapi membiarkannya berserakan tanpa menyimpannya rapi di laci memori."
      },
      {
        "id": "s7",
        "textJp": "高い学習成果を継続して出したいのであれば、起きている時間の長さだけにとらわれず、良質な睡眠を学習計画の重要な一部として組み込む賢さが必要である。",
        "textId": "Jika ingin mempertahankan prestasi belajar yang tinggi secara berkesinambungan, kita dituntut bijak untuk tidak terpaku hanya pada durasi saat terjaga, melainkan memasukkan tidur berkualitas sebagai bagian krusial dari jadwal belajar.",
        "isKeySentence": true
      }
    ],
    "passageTranslation": "Banyak orang pernah begadang memangkas waktu tidur demi belajar menjelang ujian. Namun menurut riset sains otak, metode ini terbukti sangat tidak efisien untuk mengingat materi.\nDalam sebuah eksperimen, setelah mempelajari materi yang sama, Kelompok A tidur cukup 8 jam, sedangkan Kelompok B terus belajar larut malam dan hanya tidur 4 jam. Hasilnya, Kelompok A yang belajarnya lebih singkat justru mencatat skor jauh lebih unggul.\nSaat kita terlelap, otak menyortir dan mengunci informasi dari memori jangka pendek ke jangka panjang. Tidak tidur sama saja menaruh barang tanpa menyimpannya ke dalam laci.\nJika ingin hasil belajar maksimal, jangan hanya terpaku pada lamanya jam belajar, melainkan jadikanlah tidur berkualitas sebagai pilar rencana belajar Anda.",
    "vocabulary": [
      {
        "termJp": "削る",
        "furigana": "けずる",
        "meaningId": "Memangkas / mengurangi porsi",
        "level": "N2"
      },
      {
        "termJp": "徹夜",
        "furigana": "てつや",
        "meaningId": "Begadang semalaman tanpa tidur",
        "level": "N3"
      },
      {
        "termJp": "極めて",
        "furigana": "きわめて",
        "meaningId": "Amat sangat / luar biasa",
        "level": "N2"
      },
      {
        "termJp": "圧倒的",
        "furigana": "あっとうてき",
        "meaningId": "Secara telak / luar biasa unggul",
        "level": "N2"
      },
      {
        "termJp": "変換",
        "furigana": "へんかん",
        "meaningId": "Konversi wujud / alih bentuk",
        "level": "N2"
      },
      {
        "termJp": "組み込む",
        "furigana": "くみこむ",
        "meaningId": "Memasukkan ke dalam komponen/agenda",
        "level": "N2"
      }
    ],
    "questions": [
      {
        "id": "q-drill-med-02-1",
        "questionNumber": 1,
        "questionJp": "実験の結果について、本文の説明と合致しているものはどれですか。",
        "questionTranslation": "Pernyataan manakah yang paling sesuai dengan hasil eksperimen pada teks?",
        "clueSentenceIndex": 3,
        "techniqueTip": "Cek perbandingan di kalimat 4: '学習時間が短かったにもかかわらず、しっかり睡眠をとったグループAの方が、圧倒的に高い正答率を記録した'.",
        "options": [
          {
            "key": "1",
            "textJp": "睡眠時間をしっかり確保したグループAの方が、勉強時間は短くてもテストの正答率が高かった。",
            "textId": "Kelompok A yang mengamankan waktu tidur cukup, mencatat akurasi tes lebih tinggi meski durasi belajarnya lebih singkat.",
            "explanation": "Benar! Kalimat 4 menyatakan secara gamblang bahwa Kelompok A (tidur 8 jam) meraih nilai jauh lebih tinggi daripada Kelompok B yang memaksakan belajar sampai larut malam.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "夜遅くまで復習を続けたグループBの方が、覚えた情報量が多かったため成績が優れていた。",
            "textId": "Kelompok B yang mengulang materi hingga larut malam memiliki nilai lebih unggul karena volume materi yang dihafal lebih banyak.",
            "explanation": "Salah. Hasil eksperimen justru menunjukkan kebalikannya: Kelompok B kalah telak.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "8時間眠ったグループAと4時間しか眠らなかったグループBの間で、テスト成績に差は出なかった。",
            "textId": "Antara Kelompok A (tidur 8 jam) dan Kelompok B (tidur 4 jam) tidak ditemukan perbedaan hasil tes.",
            "explanation": "Salah. Ada perbedaan telak (圧倒的に高い正答率).",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "試験の前夜に徹夜をして勉強時間を最大まで増やすことが、最も高い学習効果をもたらした。",
            "textId": "Begadang semalaman demi memaksimalkan jam belajar menjelang ujian terbukti memberi dampak belajar paling maksimal.",
            "explanation": "Salah. Penulis menyatakan begadang adalah cara yang 'amat sangat tidak efisien' (極めて非効率的).",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "q-drill-med-02-2",
        "questionNumber": 2,
        "questionJp": "文中の「脳の引き出しにしっかりと仕舞わないまま放置するようなもの」とはどういう意味ですか。",
        "questionTranslation": "Apa arti dari kiasan 'membiarkan pengetahuan tanpa menyimpannya ke dalam laci otak'?",
        "clueSentenceIndex": 5,
        "techniqueTip": "Kiasan ini menjelaskan kalimat 5: otak mengubah ingatan jangka pendek ke jangka panjang saat tidur. Jika tidak tidur, maka ingatan tidak tersimpan permanen.",
        "options": [
          {
            "key": "1",
            "textJp": "睡眠不足によって、せっかく学んだ情報が長期的な記憶として脳内に定着しない状態のこと。",
            "textId": "Kondisi di mana informasi yang sudah dipelajari gagal mengendap sebagai memori jangka panjang di otak akibat kurang tidur.",
            "explanation": "Benar! Kalimat sebelumnya menjelaskan bahwa tidur berfungsi mengubah memori jangka pendek menjadi memori permanen. Jika tidak tidur, ilmu tidak tersimpan di 'laci ingatan'.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "勉強が終わった後に使ったノートや参考書を机の上に散らかしたまま片付けないこと。",
            "textId": "Kebiasaan malas membereskan buku catatan atau modul di atas meja belajar setelah selesai.",
            "explanation": "Salah. Ungkapan tersebut adalah analogi proses biologis otak (比喩), bukan tentang kebiasaan merapikan meja fisik.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "覚えた知識をすぐにテストで思い出せなくなり、脳が容量オーバーを起こすこと。",
            "textId": "Kondisi otak mengalami kelebihan kapasitas sehingga mendadak blank saat tes.",
            "explanation": "Salah. Fokus kiasan ini bukan kapasitas otak meledak, melainkan kegagalan penyimpanan informasi ke ingatan jangka panjang.",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "睡眠中に過去の不要な記憶がすべて自動的に消去されてなくなってしまう現象のこと。",
            "textId": "Fenomena di mana seluruh memori lama yang tidak berguna terhapus otomatis saat tidur.",
            "explanation": "Salah. Teks membahas penguncian materi baru yang dipelajari, bukan penghapusan memori lama.",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "q-drill-med-02-3",
        "questionNumber": 3,
        "questionJp": "筆者が効果的な学習のために読者に提案していることはどれですか。",
        "questionTranslation": "Saran apakah yang diajukan oleh penulis untuk pembelajaran yang efektif?",
        "clueSentenceIndex": 6,
        "techniqueTip": "Perhatikan kalimat penutup: '良質な睡眠を学習計画の重要な一部として組み込む賢さが必要である'.",
        "options": [
          {
            "key": "1",
            "textJp": "勉強時間の長さだけにこだわらず、質の高い睡眠を学習計画の大切な要素として取り入れること。",
            "textId": "Tidak hanya terpaku pada lamanya jam belajar, melainkan menyertakan tidur berkualitas sebagai elemen krusial rencana belajar.",
            "explanation": "Benar! Paragraf penutup menegaskan: '起きている時間の長さだけにとらわれず、良質な睡眠を学習計画の重要な一部として組み込む賢さが必要である'.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "試験の直前には新しい知識の学習を一切やめて、昼間の時間帯だけに睡眠をとること。",
            "textId": "Menghentikan total mempelajari hal baru sebelum ujian dan hanya tidur di siang hari.",
            "explanation": "Salah. Penulis tidak menyuruh berhenti belajar hal baru atau hanya tidur di siang hari.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "毎日必ず10時間以上の睡眠をとるために、毎日の勉強時間を半分に削ること。",
            "textId": "Memangkas separuh jam belajar agar setiap hari bisa tidur lebih dari 10 jam.",
            "explanation": "Salah. Tidak ada saran untuk mengurangi belajar hingga separuh atau tidur 10 jam.",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "試験の直前に徹夜を繰り返して脳に刺激を与え、短期間で暗記を仕上げること。",
            "textId": "Berulang kali begadang menjelang ujian untuk merangsang otak menghafal kilat.",
            "explanation": "Salah. Justru cara inilah yang ditentang keras oleh penulis sepanjang artikel.",
            "isCorrect": false
          }
        ]
      }
    ]
  },

  {
    "id": "drill-long-01",
    "chapterNumber": 12,
    "category": "long",
    "categoryLabel": "実践編 · 長文読解 (Teks Panjang)",
    "titleJp": "「便利さ」の追求と失われたゆとり",
    "titleId": "Mengejar 'Kemudahan' dan Hilangnya Ketenangan Waktu",
    "techniqueTag": "長文読解・全体の論理構造",
    "techniqueDescription": "Teks 長文 (600~800 karakter) menguji stamina membaca wacana utuh. Jangan membaca seluruh teks baru melihat pertanyaan. Kerjakan pertanyaan secara bertahap: Soal 1 untuk Paragraf 1-2, Soal 2 untuk Paragraf 3, Soal 3 untuk Paragraf 4, dan Soal 4 untuk kesimpulan di akhir teks.",
    "sentences": [
      {
        "id": "s1",
        "textJp": "現代社会は、あらゆる面において「効率」と「スピード」を重視し、科学技術の進歩によって生活は以前と比べて格段に便利になった。",
        "textId": "Masyarakat modern sangat mengagungkan 'efisiensi' dan 'kecepatan' dalam segala aspek, dan berkat kemajuan ilmu pengetahuan dan teknologi, hidup menjadi jauh lebih praktis dibanding masa lalu."
      },
      {
        "id": "s2",
        "textJp": "スマートフォンを操作すれば瞬時に世界中の情報にアクセスでき、買い物も自宅にいながらボタン一つで完了する。",
        "textId": "Cukup mengoperasikan ponsel pintar, kita bisa mengakses informasi dari seluruh dunia dalam sekejap mata, dan berbelanja pun selesai hanya dengan satu sentuhan tombol dari rumah."
      },
      {
        "id": "s3",
        "textJp": "移動手段の発達や業務の自動化によって、かつて何時間もかかっていた作業がほんの数分で片付く時代になったのだ。",
        "textId": "Dengan kemajuan sarana transportasi dan otomatisasi pekerjaan, kita telah tiba di era di mana pekerjaan yang dulu memakan waktu berjam-jam kini tuntas hanya dalam hitungan menit."
      },
      {
        "id": "s4",
        "textJp": "これほどまでに時間を節約できるようになったのだから、私たちは昔の人々と比べて、より多くの自由な時間や心の「ゆとり」を手に入れているはずである。",
        "textId": "Karena kita telah mampu menghemat waktu sedemikian banyaknya, seharusnya kita memiliki lebih banyak waktu luang dan ketenangan hati dibanding generasi terdahulu.",
        "isKeySentence": true
      },
      {
        "id": "s5",
        "textJp": "ところが現実はどうだろうか。多くの現代人は「毎日忙しくて時間がない」「常に何かに追われているようだ」と感じながら生きている。",
        "textId": "Namun bagaimana dengan kenyataannya? Sebagian besar manusia modern justru menjalani hidup dengan perasaan 'setiap hari sibuk tak punya waktu' atau 'seakan terus-menerus dikejar sesuatu'.",
        "isKeySentence": true
      },
      {
        "id": "s6",
        "textJp": "便利になればなるほど、浮いた時間でゆっくり休むのではなく、空いた隙間にさらに別の仕事や予定を詰め込んでしまうからだ。",
        "textId": "Sebab semakin praktis hidup ini, alih-alih beristirahat dengan waktu yang berhasil dihemat, orang malah menjejali celah waktu yang kosong dengan pekerjaan atau agenda baru lainnya."
      },
      {
        "id": "s7",
        "textJp": "通信技術の向上によって連絡がすぐに届くようになったことで、深夜や休日であっても仕事の返信を求められ、かえって休む暇を失っている人も少なくない。",
        "textId": "Dengan pesatnya teknologi komunikasi membuat pesan sampai seketika, banyak orang dituntut membalas urusan kerja bahkan di larut malam atau hari libur, sehingga ironisnya justru kehilangan waktu untuk istirahat."
      },
      {
        "id": "s8",
        "textJp": "つまり、技術がもたらした「効率化」は私たちを自由にするどころか、より速い生活のペースを強いられるという逆の結果を生み出しているのである。",
        "textId": "Dengan kata lain, efisiensi yang dihadirkan oleh teknologi bukannya membebaskan kita, melainkan justru membuahkan hasil berkebalikan: memaksa kita tunduk pada ritme hidup yang kian lekas.",
        "isKeySentence": true
      },
      {
        "id": "s9",
        "textJp": "本当に豊かな人生を送るために今私たちが考え直すべきなのは、これ以上生活のスピードを上げることではない。",
        "textId": "Demi meraih kehidupan yang sungguh bermakna dan kaya, hal yang perlu kita renungkan kembali saat ini bukanlah menambah laju kecepatan hidup lebih kencang lagi."
      },
      {
        "id": "s10",
        "textJp": "むしろ、あえて立ち止まり、効率や損得とは関係のない静かな時間を意図的に確保する勇気を持つことではないだろうか。",
        "textId": "Melainkan, bukankah kita justru membutuhkan keberanian untuk berani berhenti sejenak, dan sengaja menyisihkan waktu yang hening tanpa terikat pada efisiensi atau untung-rugi?",
        "isKeySentence": true
      }
    ],
    "passageTranslation": "Masyarakat modern sangat mengagungkan efisiensi dan kecepatan. Berkat teknologi, belanja dan informasi selesai dalam sekejap, dan pekerjaan berjam-jam tuntas dalam hitungan menit.\nDengan waktu yang begitu banyak dihemat, seharusnya manusia modern punya lebih banyak waktu luang dan ketenangan batin dibanding orang zaman dahulu.\nNamun kenyataannya berbanding terbalik: banyak orang merasa selalu sibuk dan dikejar-kejar waktu. Pasalnya, waktu luang yang didapat tidak dipakai istirahat, melainkan dijejali tugas baru.\nPesan instan membuat orang dituntut membalas email bahkan di hari libur. Efisiensi bukan memerdekakan kita, melainkan memaksa kita hidup dalam tempo yang kian tergesa-gesa.\nAgar hidup sungguh bermakna, solusinya bukan mempercepat laju hidup lagi, melainkan berani berhenti sejenak dan sengaja meluangkan waktu tenang tanpa hitungan untung rugi.",
    "vocabulary": [
      {
        "termJp": "ゆとり",
        "furigana": "ゆとり",
        "meaningId": "Ketenangan / kelonggaran waktu dan batin",
        "level": "N3"
      },
      {
        "termJp": "格段",
        "furigana": "かくだん",
        "meaningId": "Jauh lebih luar biasa / perbedaannya mencolok",
        "level": "N2"
      },
      {
        "termJp": "節約",
        "furigana": "せつやく",
        "meaningId": "Penghematan pengeluaran/waktu",
        "level": "N3"
      },
      {
        "termJp": "追われる",
        "furigana": "おわれる",
        "meaningId": "Dikejar-kejar waktu / tugas menumpuk",
        "level": "N2"
      },
      {
        "termJp": "強いられる",
        "furigana": "しいられる",
        "meaningId": "Dipaksa / terpaksa harus menerima",
        "level": "N2"
      },
      {
        "termJp": "意図的",
        "furigana": "いとてき",
        "meaningId": "Secara sengaja / berkesadaran penuh",
        "level": "N2"
      }
    ],
    "questions": [
      {
        "id": "q-drill-long-01-1",
        "questionNumber": 1,
        "questionJp": "第1段落において、筆者が述べている現代社会の現状として最も適切なものはどれですか。",
        "questionTranslation": "Pada paragraf pertama, manakah yang paling tepat menggambarkan situasi masyarakat modern menurut penulis?",
        "clueSentenceIndex": 0,
        "techniqueTip": "Cek kalimat 1-3: fokus pada '技術の進歩によって生活は以前と比べて格段に便利になった'.",
        "options": [
          {
            "key": "1",
            "textJp": "科学技術や移動手段の進歩によって様々な作業が素早く完了し、生活が非常に便利になった。",
            "textId": "Berkat kemajuan teknologi dan sarana transportasi, beragam pekerjaan tuntas cepat dan hidup jadi amat praktis.",
            "explanation": "Benar! Kalimat 1 sampai 3 menjabarkan kemajuan teknologi ponsel, otomatisasi, dan belanja yang membuat hidup jauh lebih praktis dan cepat.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "スマートフォンの普及によって、世界中の人々と直接対面して会話する機会が増加した。",
            "textId": "Dengan ponsel pintar, kesempatan bertemu dan mengobrol tatap muka langsung dengan orang sedunia meningkat.",
            "explanation": "Salah. Teks menyebutkan akses informasi dan belanja dari rumah, bukan bertemu tatap muka fisik.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "業務の自動化が進んだ結果、多くの人々が仕事を失って深刻な社会問題になっている。",
            "textId": "Akibat otomatisasi pekerjaan, banyak orang kehilangan pekerjaan dan memicu masalah sosial serius.",
            "explanation": "Salah. Teks membahas pekerjaan selesai lebih cepat, bukan tentang pemutusan hubungan kerja.",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "現代社会ではスピードを追うことよりも、昔ながらの伝統的なやり方が再評価されている。",
            "textId": "Di masyarakat modern, cara tradisional masa lalu dinilai kembali melebihi kecepatan.",
            "explanation": "Salah. Kalimat 1 menegaskan bahwa saat ini efisiensi dan kecepatan justru sangat diutamakan (効率とスピードを重視).",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "q-drill-long-01-2",
        "questionNumber": 2,
        "questionJp": "「ところが現実はどうだろうか」とあるが、筆者は何が予想と異なっていると述べていますか。",
        "questionTranslation": "Mengenai kalimat 'Namun bagaimana dengan kenyataannya?', apa yang dinilai penulis berbeda dari perkiraan?",
        "clueSentenceIndex": 4,
        "techniqueTip": "Bandingkan kalimat 4 (perkiraan: harusnya punya waktu luang) dengan kalimat 5 (kenyataan: justru merasa sibuk dikejar waktu).",
        "options": [
          {
            "key": "1",
            "textJp": "時間を大幅に節約できるようになったはずなのに、多くの人が昔よりも時間に追われて忙しく感じていること。",
            "textId": "Seharusnya bisa menghemat banyak waktu, namun banyak orang justru merasa semakin dikejar waktu dan sibuk dibanding masa lalu.",
            "explanation": "Benar! Penulis mengontraskan harapan 'harusnya punya waktu luang' (心のゆとりを手に入れているはず) dengan kenyataan 'merasa terus dikejar waktu' (常に何かに追われているようだ).",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "自宅にいながら買い物ができるようになったのに、実際には店舗へ足を運ぶ人が急増したこと。",
            "textId": "Meski belanja dari rumah sudah bisa, nyatanya orang yang pergi ke toko fisik justru melonjak drastis.",
            "explanation": "Salah. Teks tidak pernah menyinggung tentang lonjakan pengunjung toko fisik.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "休日が増えたことによって、かえって退屈でやるべきことを見つけられない若者が増えたこと。",
            "textId": "Karena hari libur bertambah, banyak pemuda yang merasa bosan dan tak tahu harus berbuat apa.",
            "explanation": "Salah. Teks menyatakan orang justru tidak punya waktu istirahat (休む暇を失っている), bukan kelebihan waktu luang.",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "最新の通信技術が発達しても、スマートフォンを使いこなせない高齢者が取り残されていること。",
            "textId": "Kendati teknologi maju, lansia yang tak mahir ponsel pintar justru tersisihkan.",
            "explanation": "Salah. Isu kesulitan penggunaan ponsel bagi lansia tidak dibahas sama sekali dalam teks.",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "q-drill-long-01-3",
        "questionNumber": 3,
        "questionJp": "文中の「逆の結果を生み出している」とは、具体的にどのような現象を指していますか。",
        "questionTranslation": "Fenomena apakah yang secara konkret dimaksud dengan 'membuahkan hasil yang berkebalikan' pada teks?",
        "clueSentenceIndex": 7,
        "techniqueTip": "Cek kalimat 8: perhatikan kontras antara '私たちを自由にする' (membebaskan kita) vs 'より速い生活のペースを強いられる' (dipaksa ritme yang lebih cepat).",
        "options": [
          {
            "key": "1",
            "textJp": "効率化によって自由な時間が増えるはずが、生活のテンポがさらに加速して休む暇がなくなっていること。",
            "textId": "Efisiensi yang seharusnya memperbanyak waktu santai justru mempercepat tempo hidup hingga kehilangan kesempatan istirahat.",
            "explanation": "Benar! Kalimat 8 menjelaskan: '技術がもたらした効率化は私たちを自由にするどころか、より速い生活のペースを強いられるという逆の結果を生み出している'.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "深夜に仕事のメッセージをやり取りすることで、同僚との人間関係が著しく悪化してしまうこと。",
            "textId": "Saling berbalas pesan kerja larut malam merusak hubungan antarrekan kerja secara drastis.",
            "explanation": "Salah. Teks menyebutkan terganggunya waktu istirahat, bukan permusuhan dengan rekan kerja.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "電卓や機械に頼りすぎたせいで、人間の記憶力や計算能力が以前よりも著しく退化したこと。",
            "textId": "Terlalu bergantung pada mesin kalkulator menyebabkan daya ingat dan hitung manusia menurun tajam.",
            "explanation": "Salah. Penulis tidak membahas penurunan kemampuan kognitif otak.",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "予定をたくさん詰め込みすぎた結果、どの仕事も中途半端になって成果が出せなくなること。",
            "textId": "Terlalu banyak memasukkan agenda kerja menyebabkan pekerjaan menjadi setengah matang dan tanpa hasil.",
            "explanation": "Salah. Teks berfokus pada hilangnya ketenangan batin dan istirahat, bukan kualitas teknis hasil pekerjaan.",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "q-drill-long-01-4",
        "questionNumber": 4,
        "questionJp": "筆者がこの文章全体を通じて最も訴えたいメッセージはどれですか。",
        "questionTranslation": "Pesan utama apakah yang paling ingin disuarakan penulis lewat keseluruhan wacana ini?",
        "clueSentenceIndex": 9,
        "techniqueTip": "Lihat dua kalimat terakhir di akhir esai: '生活のスピードを上げることではない...あえて立ち止まり、効率や損得とは関係のない静かな時間を意図的に確保する勇気を持つことではないだろうか'.",
        "options": [
          {
            "key": "1",
            "textJp": "これ以上便利さやスピードを追うのではなく、意識して立ち止まり静かな時間を確保する勇気を持つべきだ。",
            "textId": "Alih-alih terus mengejar kepraktisan dan kecepatan, kita harus punya keberanian untuk berhenti sejenak dan menyisihkan waktu yang tenang.",
            "explanation": "Benar! Paragraf penutup adalah klimaks opini penulis: keberanian untuk berhenti sejenak dan menyisihkan waktu tenang tanpa terikat untung rugi efisiensi.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "スマートフォンやインターネットの利用を直ちにやめて、昔のような自然な暮らしに戻るべきだ。",
            "textId": "Kita harus segera berhenti memakai ponsel pintar dan internet untuk kembali ke cara hidup alami masa lalu.",
            "explanation": "Salah (Ekstrem). Penulis tidak menyuruh membuang teknologi secara radikal.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "浮いた隙間時間を最大限に活用して勉強に励むことこそが、人生を豊かにする最善の方法である。",
            "textId": "Memanfaatkan waktu luang semaksimal mungkin untuk terus belajar adalah kunci terbaik memperkaya hidup.",
            "explanation": "Salah. Justru menjejali setiap detik kosong dengan aktivitas tanpa istirahat adalah hal yang dikritik oleh penulis.",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "休日に仕事の連絡を送ってくる取引先や会社に対しては、厳重に抗議して拒否すべきである。",
            "textId": "Karyawan harus melayangkan protes keras dan menolak perusahaan yang mengirim kontak kerja di hari libur.",
            "explanation": "Salah. Penulis tidak memberikan anjuran protes hukum atau pembangkangan terhadap perusahaan.",
            "isCorrect": false
          }
        ]
      }
    ]
  },

  {
    "id": "drill-info-02",
    "chapterNumber": 13,
    "category": "info_search",
    "categoryLabel": "実践編 · 情報検索 (Pencarian Informasi)",
    "titleJp": "宅配便サービスと荷物補償のご案内",
    "titleId": "Layanan Pengiriman Paket & Ketentuan Kompensasi",
    "techniqueTag": "複数条件と注釈の照合",
    "techniqueDescription": "Pada teks 情報検索, lakukan pencocokan cepat: 1) Dimensi & berat barang, 2) Kategori layanan (Normal / Dingin / Hari yang sama), 3) Ketentuan khusus barang berharga atau barang pecah belah pada catatan kaki bertanda bintang (※).",
    "sentences": [
      {
        "id": "s1",
        "textJp": "【ヤマト急送 宅配便ご利用規定および料金表】",
        "textId": "【Ketentuan Penggunaan & Tabel Tarif Ekspedisi Pengiriman Yamato Express】"
      },
      {
        "id": "s2",
        "textJp": "① 普通便（スタンダード）：荷物の3辺合計120cm以内、重量15kgまで。全国一律 900円（翌日〜翌々日配達）。",
        "textId": "① Paket Reguler (Standard): Total 3 sisi paket maksimal 120 cm, berat maksimal 15 kg. Tarif seragam nasional 900 yen (Pengantaran esok hari s.d. lusa)."
      },
      {
        "id": "s3",
        "textJp": "② クール冷凍・冷蔵便：生鮮食品や生ケーキ専用。普通便料金に【追加料金 400円】（最大サイズ100cm・重量10kgまで対応）。",
        "textId": "② Paket Dingin (Kulkas / Freezer): Khusus makanan segar atau kue tart basah. Tarif reguler ditambah 【Biaya tambahan 400 yen】 (Ukuran maksimal 100 cm, berat maksimal 10 kg).",
        "isKeySentence": true
      },
      {
        "id": "s4",
        "textJp": "③ スピード当日便：午前10時までの受付完了で、当日夜18時〜21時に配達。普通便料金に【追加料金 600円】（主要都市エリア限定）。",
        "textId": "③ Paket Kilat Hari yang Sama: Pendaftaran selesai sebelum pukul 10.00, diantar malam hari itu juga jam 18.00 - 21.00. Tarif reguler ditambah 【Biaya tambahan 600 yen】 (Khusus area kota besar)."
      },
      {
        "id": "s5",
        "textJp": "※割れ物および精密機器をお送りの際は、窓口にて無料の専用衝撃吸収緩衝材をご利用いただけます。",
        "textId": "※Untuk barang pecah belah dan perangkat presisi, bahan peredam benturan khusus gratis tersedia di loket pengiriman."
      },
      {
        "id": "s6",
        "textJp": "※パソコン・タブレット等の精密機器および貴重品は、伝票への事前申告により最高30万円まで全額補償されます。ただし、これらをクール便で送ることはできません。",
        "textId": "※Perangkat presisi seperti komputer/laptop/tablet serta barang berharga akan diganti rugi penuh hingga maksimal 300.000 yen jika dilaporkan terlebih dahulu pada resi. Namun demikian, barang-barang ini TIDAK DAPAT dikirim menggunakan paket Dingin (Cool).",
        "isKeySentence": true
      }
    ],
    "passageTranslation": "【Ketentuan Penggunaan & Tabel Tarif Yamato Express】\n① Reguler: 3 sisi maksimal 120cm, berat max 15kg. Tarif 900 yen (sampai esok s.d. lusa).\n② Paket Dingin (Kulkas/Freezer): Khusus makanan segar & kue. Tarif reguler + tambahan 400 yen (max 100cm, 10kg).\n③ Paket Hari yang Sama: Daftar sebelum jam 10 pagi, sampai malam itu juga (18.00-21.00). Tarif reguler + tambahan 600 yen.\n※Tersedia kardus dan busa pelindung gratis untuk barang rapuh di loket.\n※Laptop dan barang berharga dijamin kompensasi sampai 300.000 yen jika dideklarasikan di resi, namun dilarang dikirim lewat paket Dingin.",
    "vocabulary": [
      {
        "termJp": "生鮮食品",
        "furigana": "せいせんしょくひん",
        "meaningId": "Makanan segar (daging/ikan/sayuran basah)",
        "level": "N2"
      },
      {
        "termJp": "精密機器",
        "furigana": "せいみつきき",
        "meaningId": "Perangkat elektronik presisi (komputer/kamera)",
        "level": "N2"
      },
      {
        "termJp": "補償",
        "furigana": "ほしょう",
        "meaningId": "Ganti rugi / santunan kompensasi finansial",
        "level": "N2"
      },
      {
        "termJp": "貴重品",
        "furigana": "きちょうひん",
        "meaningId": "Barang berharga tinggi",
        "level": "N3"
      },
      {
        "termJp": "引き受け",
        "furigana": "ひきうけ",
        "meaningId": "Penerimaan / pemrosesan barang titipan",
        "level": "N2"
      }
    ],
    "questions": [
      {
        "id": "q-drill-info-02-1",
        "questionNumber": 1,
        "questionJp": "高橋さんは、実家の母親に手作りの生ケーキ（サイズ：30cm×25cm×20cm、重さ2.5kg）を冷たい状態のまま送りたいと考えています。利用すべきサービスと合計料金の組合せはどれですか。",
        "questionTranslation": "Takahashi ingin mengirim kue basah buatan sendiri (ukuran 30x25x20cm, berat 2.5kg) dalam keadaan dingin ke ibunya di kampung. Kombinasi paket dan biaya total yang tepat adalah?",
        "clueSentenceIndex": 2,
        "techniqueTip": "Cek 3 hal: 1) Dimensi kue: 30+25+20 = 75cm (di bawah batas 100cm). 2) Berat: 2.5kg (di bawah batas 10kg). 3) Tarif: Butuh pendingin -> Paket ② クール便 = Reguler 900 yen + Biaya Dingin 400 yen = 1.300 yen.",
        "options": [
          {
            "key": "1",
            "textJp": "クール便を利用し、合計料金は 1,300円",
            "textId": "Menggunakan Paket Dingin (Cool), dengan biaya total 1.300 yen.",
            "explanation": "Benar! Ukuran 75cm dan berat 2.5kg memenuhi batas maksimal paket dingin (100cm・10kg). Biaya: 900 yen (dasar) + 400 yen (tambahan dingin) = 1.300 yen.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "普通便（スタンダード）を利用し、合計料金は 900円",
            "textId": "Menggunakan Paket Reguler, dengan total biaya 900 yen.",
            "explanation": "Salah. Paket reguler tidak memiliki fasilitas pendingin sehingga kue segar bisa rusak mencair.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "クール便を利用し、追加料金のみの 400円",
            "textId": "Menggunakan Paket Dingin, hanya membayar biaya tambahannya saja 400 yen.",
            "explanation": "Salah. Biaya 400 yen adalah tarif tambahan yang harus digabung dengan tarif dasar paket reguler (900 yen).",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "スピード当日便とクール便を併用し、合計料金は 1,900円",
            "textId": "Menggabungkan Paket Hari yang Sama dan Paket Dingin seharga 1.900 yen.",
            "explanation": "Salah. Pengirim hanya meminta dikirim dingin dalam keadaan segar ke kampung (実家), tidak meminta layanan kilat hari yang sama yang terbatas di kota besar.",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "q-drill-info-02-2",
        "questionNumber": 2,
        "questionJp": "修理のために自分のノートパソコン（時価15万円）を郵送したい場合、規定に従って正しく説明しているものはどれですか。",
        "questionTranslation": "Jika ingin mengirim laptop pribadi (senilai 150.000 yen) untuk diservis, manakah penjelasan yang benar menurut aturan?",
        "clueSentenceIndex": 5,
        "techniqueTip": "Cek catatan kaki terakhir (※): Laptop adalah精密機器 (perangkat presisi), dapat kompensasi s.d 300.000 yen jika dilaporkan di resi, tetapi 'クール便での引き受けはできません'.",
        "options": [
          {
            "key": "1",
            "textJp": "伝票に事前申告すれば最高30万円まで補償の対象となるが、クール便で送ることはできない。",
            "textId": "Jika dideklarasikan di awal pada resi, dijamin kompensasi s.d. 300.000 yen, namun tidak dapat dikirim dengan Paket Dingin.",
            "explanation": "Benar! Sesuai catatan kaki: laptop bernilai 15万円 berada di bawah batas kompensasi 30万円, dan ada larangan tegas 'クール便での引き受けはできません'.",
            "isCorrect": true
          },
          {
            "key": "2",
            "textJp": "ノートパソコンなどの精密機器は衝撃に弱いため、ヤマト急送では一切引き受けを断っている。",
            "textId": "Perangkat presisi seperti laptop rentan benturan sehingga Yamato Express menolak pengirimannya sama sekali.",
            "explanation": "Salah. Yamato Express menerima pengiriman dan bahkan menyediakan bahan peredam benturan gratis di loket.",
            "isCorrect": false
          },
          {
            "key": "3",
            "textJp": "パソコンの輸送には必ずスピード当日便の追加料金（600円）を支払わなければならない。",
            "textId": "Untuk pengiriman komputer, wajib membayar biaya tambahan Paket Kilat Hari yang Sama (600 yen).",
            "explanation": "Salah. Pengiriman komputer dapat menggunakan paket reguler 900 yen tanpa harus memilih paket当日便.",
            "isCorrect": false
          },
          {
            "key": "4",
            "textJp": "精密機器は申告をしなくても自動的に最高30万円まで全額補償される。",
            "textId": "Perangkat presisi otomatis dijamin ganti rugi s.d. 300.000 yen tanpa perlu pelaporan di muka.",
            "explanation": "Salah. Catatan kaki mewajibkan pelaporan terlebih dahulu pada resi (伝票への事前申告により).",
            "isCorrect": false
          }
        ]
      }
    ]
  }
];
