import { BunpouItem } from "./types";

export const BUNPOU_ITEMS: BunpouItem[] = [
  // ─────────────────────────────────────────────────────────────
  // BAB 1: 時間・時の関係 (Waktu & Hubungan Waktu Kejadian)
  // ─────────────────────────────────────────────────────────────
  {
    id: "n3-b01-uchi-ni-1",
    chapterNumber: 1,
    chapterTitle: "第1課: 時間・時の関係 (Waktu & Urutan Kejadian)",
    category: "time",
    categoryLabel: "時間・時",
    patternJp: "〜うちに（１）",
    patternKana: "うちに",
    meaningId: "Selagi / Mumpung... (sebelum kondisi saat ini berubah)",
    connection: "動詞辞書形 / V-ている / V-ない形 ＋ うちに\nイ形容詞 ＋ うちに\nナ形容詞＋な ＋ うちに\n名詞＋の ＋ うちに",
    coreConcept:
      "Dipakai ketika pembicara ingin melakukan sesuatu dengan kemauan sendiri (keinginan/aksi) mumpung situasi atau kondisi tertentu masih berlangsung, sebelum situasinya berubah dan kesempatan tersebut hilang.",
    cautionNote:
      "Kalimat belakang berisi kalimat berkehendak (ajakan, niat, atau perintah: 〜たい、〜てください、〜よう). Berbeda dengan 〜うちに (2) yang kejadian belakangnya di luar kendali.",
    examples: [
      {
        id: "ex-uchi-1-1",
        textJp: "スープが[冷:つめ]たくならないうちに、どうぞ[召:め]し上がってください。",
        ruby: "スープが[冷:つめ]たくならないうちに、どうぞ[召:め]し[上:あ]がってください。",
        textId: "Silakan dimakan selagi supnya belum dingin.",
        contextNote: "Aksi yang disarankan sebelum suhu sup berubah dingin.",
      },
      {
        id: "ex-uchi-1-2",
        textJp: "日本にいるうちに、一度富士山に登ってみたいです。",
        ruby: "[日本:にほん]にいるうちに、[一度:いちど][富士山:ふじさん]に[登:のぼ]ってみたいです。",
        textId: "Mumpung masih tinggal di Jepang, saya ingin mencoba mendaki Gunung Fuji sekali saja.",
        contextNote: "Keinginan pribadi selagi kesempatan masih terbuka.",
      },
      {
        id: "ex-uchi-1-3",
        textJp: "若いうちに、いろいろな国を旅したほうがいいですよ。",
        ruby: "[若:わか]いうちに、いろいろな[国:くに]を[旅:たび]したほうがいいですよ。",
        textId: "Selagi masih muda, sebaiknya kamu bepergian keliling berbagai negara.",
        contextNote: "Saran mumpung masih punya tenaga dan kebebasan waktu.",
      },
    ],
    comparisons: [
      {
        targetPattern: "〜あいだに (間に)",
        summary: "あいだに = menunjukkan rentang waktu objektif, tidak ada penekanan 'mumpung sebelum berubah'.",
        distinctionId:
          "「うちに」 ada nuansa keterdesakan bahwa jika kondisi berubah nanti tidak bisa lagi. Sedangkan 「間に」 murni menyatakan aksi terjadi di tengah jangka waktu tertentu.",
      },
    ],
    questions: [
      {
        id: "q-b01-01",
        type: "cloze",
        questionNumber: 1,
        questionJp: "明るい（　　）、急いで山を下りましょう。",
        questionRuby: "[明:あか]るい（　　）、[急:いそ]いで[山:やま]を[下:お]りましょう。",
        questionTranslation: "Selagi masih terang, ayo kita lekas turun gunung.",
        options: [
          { key: "1", textJp: "うちに", textId: "Selagi / Mumpung" },
          { key: "2", textJp: "あいだ", textId: "Selama terus menerus" },
          { key: "3", textJp: "ついでに", textId: "Sekalian" },
          { key: "4", textJp: "最中に", textId: "Tepat di tengah-tengah" },
        ],
        correctKey: "1",
        explanation:
          "Kondisi 'terang' akan segera berubah menjadi gelap jika waktu berlalu. Maka ekspresi mumpung/sebelum kondisi berubah yang tepat adalah 『うちに』.",
      },
      {
        id: "q-b01-02",
        type: "seiretsu",
        questionNumber: 2,
        questionJp: "雨が　＿＿　＿＿　★　＿＿　帰りましょう。",
        questionRuby: "[雨:あめ]が　＿＿　＿＿　★　＿＿　[帰:かえ]りましょう。",
        questionTranslation: "Sebelum hujan turun, ayo lekas kita pulang ke rumah.",
        items: ["うちに", "急いで", "降らない", "家へ"],
        correctOrder: [2, 0, 1, 3], // 降らない うちに 急いで 家へ
        starPosition: 3, // Opsi ke-3 di urutan adalah '急いで' (indeks 1)
        explanation:
          "Struktur urutan yang tepat: 『雨が [降らない] [うちに] [急いで] [家へ] 帰りましょう』. Kata yang berada di posisi bintang (★) adalah 『急いで』.",
      },
    ],
  },

  {
    id: "n3-b01-uchi-ni-2",
    chapterNumber: 1,
    chapterTitle: "第1課: 時間・時の関係 (Waktu & Urutan Kejadian)",
    category: "time",
    categoryLabel: "時間・時",
    patternJp: "〜うちに（２）",
    patternKana: "うちに",
    meaningId: "Tanpa disadari / Perlahan berubah menjadi... (di tengah kondisi A)",
    connection: "動詞辞書形 / V-ている / V-ない形 ＋ うちに",
    coreConcept:
      "Menyatakan bahwa di tengah-tengah suatu keadaan atau saat sedang melakukan suatu aktivitas berkesinambungan, tiba-tiba atau tanpa disadari terjadi perubahan keadaan alamiah yang tidak disengaja oleh pembicara.",
    cautionNote:
      "Kalimat belakang TIDAK BOLEH mengandung kehendak (niat, ajakan, perintah). Kalimat belakang selalu berupa perubahan spontan atau di luar kendali.",
    examples: [
      {
        id: "ex-uchi-2-1",
        textJp: "何度も音楽を聴いているうちに、自然に歌詞を覚えてしまった。",
        ruby: "[何:なん][度:ど]も[音楽:おんがく]を[聴:き]いているうちに、[自然:しぜん]に[歌詞:かし]を[覚:おぼ]えてしまった。",
        textId: "Saking seringnya mendengarkan lagu itu, tanpa sadar liriknya terhafal dengan sendirinya.",
        contextNote: "Perubahan alami yang terjadi tanpa niat menghafal secara sengaja.",
      },
      {
        id: "ex-uchi-2-2",
        textJp: "知らないうちに、外はすっかり暗くなっていた。",
        ruby: "[知:し]らないうちに、[外:そと]はすっかり[暗:くら]くなっていた。",
        textId: "Tanpa saya sadari, di luar sudah benar-benar gelap gulita.",
        contextNote: "Kondisi waktu berubah perlahan di luar perhatian pembicara.",
      },
    ],
    questions: [
      {
        id: "q-b01-03",
        type: "cloze",
        questionNumber: 3,
        questionJp: "毎日話している（　　）、いつの間にか日本語が上手になった。",
        questionRuby: "[毎日:まいにち][話:はな]している（　　）、いつの[間:ま]にか[日本語:にほんご]が[上手:じょうず]になった。",
        questionTranslation: "Selama mengobrol setiap hari, tanpa sadar bahasa Jepang saya menjadi lancar.",
        options: [
          { key: "1", textJp: "うちに", textId: "Seiring berjalannya waktu / tanpa sadar" },
          { key: "2", textJp: "ついでに", textId: "Sekalian memanfaatkan jalan" },
          { key: "3", textJp: "かわりに", textId: "Sebagai pengganti" },
          { key: "4", textJp: "反面", textId: "Di sisi lain" },
        ],
        correctKey: "1",
        explanation:
          "Kalimat belakang menyatakan perubahan alami tanpa disadari (いつの間にか〜になった), sehingga pola yang tepat adalah 『うちに』.",
      },
    ],
  },

  {
    id: "n3-b01-saichuu-ni",
    chapterNumber: 1,
    chapterTitle: "第1課: 時間・時の関係 (Waktu & Urutan Kejadian)",
    category: "time",
    categoryLabel: "時間・時",
    patternJp: "〜最中に / 〜最中だ",
    patternKana: "さいちゅうに",
    meaningId: "Tepat di puncak kesibukan / Pas lagi tengah-tengahnya...",
    connection: "動詞ている形 ＋ 最中に\n名詞＋の ＋ 最中に",
    coreConcept:
      "Menyatakan suatu kejadian tak terduga datang menginterupsi tepat saat aktivitas puncak sedang berlangsung secara intens.",
    cautionNote:
      "Sering diikuti oleh kejadian yang mengejutkan, mengganggu, atau merepotkan (telepon berdering, mati lampu, gempa, dsb.).",
    examples: [
      {
        id: "ex-saichuu-1",
        textJp: "重要な会議の最中に、突然スマホが鳴り出して焦ってしまった。",
        ruby: "[重要:じゅうよう]な[会議:かいぎ]の[最中:さいちゅう]に、[突然:とつぜん]スマホが[鳴:な]り[出:だ]して[焦:あせ]ってしまった。",
        textId: "Tepat di tengah-tengah rapat penting, mendadak ponsel saya berdering sehingga membuat saya panik.",
        contextNote: "Interupsi yang mengganggu pada puncak konsentrasi.",
      },
      {
        id: "ex-saichuu-2",
        textJp: "シャワーを浴びている最中に停電して、真っ暗になった。",
        ruby: "シャワーを[浴:あ]びている[最中:さいちゅう]に[停電:ていでん]して、[真:ま]っ[暗:くら]になった。",
        textId: "Pas lagi asyik mandi air panas, listrik padam dan seketika jadi gelap gulita.",
        contextNote: "Gangguan tak terduga.",
      },
    ],
    comparisons: [
      {
        targetPattern: "〜間に (あいだに)",
        summary: "間に hanya menyatakan rentang waktu umum tanpa nuansa intensitas 'puncak kegiatan yang terinterupsi'.",
        distinctionId:
          "「最中に」 memberikan efek dramatis bahwa gangguan datang di saat yang paling tidak tepat (timing terburuk).",
      },
    ],
    questions: [
      {
        id: "q-b01-04",
        type: "seiretsu",
        questionNumber: 4,
        questionJp: "試験の　＿＿　＿＿　★　＿＿　お腹が痛くなった。",
        questionRuby: "[試験:しけん]の　＿＿　＿＿　★　＿＿　お[腹:なか]が[痛:いた]くなった。",
        questionTranslation: "Tepat di tengah-tengah ujian dimulai, perut saya mendadak terasa sakit.",
        items: ["最中に", "突然", "激しく", "受け始めた"],
        correctOrder: [0, 1, 2, 3], // 試験の 最中に 突然 激しく (sakit)
        starPosition: 2,
        explanation:
          "Kalimat lengkap: 『試験の [最中に] [突然] [激しく] お腹が痛くなった』. Kata di posisi bintang adalah 『突然』.",
      },
    ],
  },

  {
    id: "n3-b01-totan-ni",
    chapterNumber: 1,
    chapterTitle: "第1課: 時間・時の関係 (Waktu & Urutan Kejadian)",
    category: "time",
    categoryLabel: "時間・時",
    patternJp: "〜たとたん（に）",
    patternKana: "たとたんに",
    meaningId: "Begitu... seketika itu juga / Sesaat setelah...",
    connection: "動詞た形 ＋ とたん（に）",
    coreConcept:
      "Tepat pada detik saat aksi A selesai dilakukan, segera terjadi hal B secara mengejutkan di luar kendali pembicara.",
    cautionNote:
      "Bagian belakang HARUS merupakan kejadian refleks/spontan, bukan perintah atau niat pembicara (tidak boleh 〜たい / 〜てください).",
    examples: [
      {
        id: "ex-totan-1",
        textJp: "窓を開けたとたんに、冷たい風が吹き込んできた。",
        ruby: "[窓:まど]を[開:あ]けたとたんに、[冷:つめ]たい[風:かぜ]が[吹:ふ]き[込:こ]んできた。",
        textId: "Begitu jendela dibuka, seketika itu juga angin dingin berhembus masuk ke dalam.",
        contextNote: "Reaksi instan yang terjadi bersamaan dengan terbukanya jendela.",
      },
      {
        id: "ex-totan-2",
        textJp: "薬を飲んで横になったとたん、深い眠りに落ちてしまった。",
        ruby: "[薬:くすり]を[飲:の]んで[横:よこ]になったとたん、[深:ふか]い[眠:ねむ]りに[落:お]ちてしまった。",
        textId: "Begitu minum obat dan berbaring, saya langsung jatuh tertidur lelap seketika.",
        contextNote: "Kejadian spontan di luar kontrol sadar.",
      },
    ],
    questions: [
      {
        id: "q-b01-05",
        type: "cloze",
        questionNumber: 5,
        questionJp: "ボタンを（　　）とたんに、機械から煙が出てきた。",
        questionRuby: "ボタンを（　　）とたんに、[機械:きかい]から[煙:けむり]が[出:で]てきた。",
        questionTranslation: "Begitu menekan tombol tersebut, seketika asap mengepul dari mesin.",
        options: [
          { key: "1", textJp: "押した", textId: "Bentuk Lampau (た形)" },
          { key: "2", textJp: "押す", textId: "Bentuk Kamus" },
          { key: "3", textJp: "押して", textId: "Bentuk -te" },
          { key: "4", textJp: "押している", textId: "Bentuk Sedang" },
        ],
        correctKey: "1",
        explanation:
          "Rumus sambungan untuk pola 『〜たとたん』 wajib menggunakan 動詞た形 (bentuk lampau), sehingga yang benar adalah 『押した』.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BAB 2: 原因・理由 (Hubungan Sebab, Alasan & Akibat)
  // ─────────────────────────────────────────────────────────────
  {
    id: "n3-b02-sei-de",
    chapterNumber: 2,
    chapterTitle: "第2課: 原因・理由 (Sebab, Alasan & Akibat)",
    category: "cause",
    categoryLabel: "原因・理由",
    patternJp: "〜せい（で） / 〜せいに決まっている",
    patternKana: "せいで",
    meaningId: "Gara-gara... (Penyebab negatif / Menyalahkan)",
    connection: "動詞普通形 ＋ せい\nイ形容詞普通形 ＋ せい\nナ形容詞＋な ＋ せい\n名詞＋の ＋ せい",
    coreConcept:
      "Menyatakan bahwa faktor A menjadi biang keladi atau penyebab terjadinya dampak buruk/negatif B. Sering dipakai untuk mengeluh atau menyalahkan keadaan/orang lain.",
    cautionNote:
      "HANYA digunakan untuk akibat negatif yang tidak menyenangkan. Jika akibatnya positif/menguntungkan, gunakan 『〜おかげで』.",
    examples: [
      {
        id: "ex-sei-1",
        textJp: "電車が遅れたせいで、大事な面接に遅刻してしまった。",
        ruby: "[電車:でんしゃ]が[遅:おく]れたせいで、[大事:だいじ]な[面接:めんせつ]に[遅刻:ちこく]してしまった。",
        textId: "Gara-gara kereta terlambat, saya sampai terlambat menghadiri wawancara penting.",
        contextNote: "Menyalahkan keterlambatan kereta atas musibah yang dialami.",
      },
      {
        id: "ex-sei-2",
        textJp: "寝不足のせいで、朝から頭がズキズキ痛む。",
        ruby: "[寝不足:ねぶそく]のせいで、[朝:あさ]から[頭:あたま]がズキズキ[痛:いた]む。",
        textId: "Gara-gara kurang tidur, dari pagi kepala saya terasa berdenyut sakit.",
        contextNote: "Penyebab dari kondisi fisik yang buruk.",
      },
    ],
    comparisons: [
      {
        targetPattern: "〜おかげで",
        summary: "おかげで = Berkat... (khusus hasil positif / bersyukur).",
        distinctionId:
          "「せいで」 fokus pada menyalahkan kerugian, sedangkan 「おかげで」 ungkapan rasa terima kasih atas berkah/keuntungan.",
      },
    ],
    questions: [
      {
        id: "q-b02-01",
        type: "cloze",
        questionNumber: 6,
        questionJp: "昨夜コーヒーを飲みすぎた（　　）、全然眠れなかった。",
        questionRuby: "[昨夜:ゆうべ]コーヒーを[飲:の]みすぎた（　　）、[全然:ぜんぜん][眠:ねむ]れなかった。",
        questionTranslation: "Gara-gara semalam kebanyakan minum kopi, saya sama sekali tidak bisa tidur.",
        options: [
          { key: "1", textJp: "せいで", textId: "Gara-gara (akibat buruk)" },
          { key: "2", textJp: "おかげで", textId: "Berkat (akibat baik)" },
          { key: "3", textJp: "ために", textId: "Demi / untuk" },
          { key: "4", textJp: "ついでに", textId: "Sambil lalu" },
        ],
        correctKey: "1",
        explanation:
          "Akibat yang terjadi adalah hal yang merugikan/buruk (tidak bisa tidur sama sekali), sehingga pola penyalahan yang tepat adalah 『せいで』.",
      },
    ],
  },

  {
    id: "n3-b02-okage-de",
    chapterNumber: 2,
    chapterTitle: "第2課: 原因・理由 (Sebab, Alasan & Akibat)",
    category: "cause",
    categoryLabel: "原因・理由",
    patternJp: "〜おかげ（で）",
    patternKana: "おかげで",
    meaningId: "Berkat... / Berkat bantuan...",
    connection: "動詞普通形 ＋ おかげ\nイ形容詞普通形 ＋ おかげ\nナ形容詞＋な ＋ おかげ\n名詞＋の ＋ おかげ",
    coreConcept:
      "Menyatakan rasa syukur bahwa berkat faktor atau bantuan A, tercapailah hasil yang memuaskan dan positif B.",
    cautionNote:
      "Terkadang bisa dipakai dalam sindiran/sarkasme, namun fungsi utamanya di ujian JLPT adalah menyatakan hasil baik.",
    examples: [
      {
        id: "ex-okage-1",
        textJp: "先生が熱心に教えてくださったおかげで、無事に合格できました。",
        ruby: "[先生:せんせい]が[熱心:ねっしん]に[教:おし]えてくださったおかげで、[無事:ぶじ]に[合格:ごうかく]できました。",
        textId: "Berkat bimbingan guru yang penuh dedikasi, saya berhasil lulus dengan selamat.",
        contextNote: "Ungkapan terima kasih atas keberhasilan ujian.",
      },
      {
        id: "ex-okage-2",
        textJp: "毎日単語アプリで復習したおかげで、読解のスピードが上がった。",
        ruby: "[毎日:まいにち][単語:たんご]アプリで[復習:ふくしゅう]したおかげで、[読解:どっかい]のスピードが[上:あ]がった。",
        textId: "Berkat mengulang hafalan di aplikasi kosakata tiap hari, kecepatan membaca saya meningkat.",
        contextNote: "Hasil positif dari usaha yang konsisten.",
      },
    ],
    questions: [
      {
        id: "q-b02-02",
        type: "seiretsu",
        questionNumber: 7,
        questionJp: "先輩が　＿＿　＿＿　★　＿＿　早く終わった。",
        questionRuby: "[先輩:せんぱい]が　＿＿　＿＿　★　＿＿　[早:はや]く[終:お]わった。",
        questionTranslation: "Berkat senior membantu pekerjaan saya, tugasnya selesai lebih cepat.",
        items: ["おかげで", "仕事が", "手伝ってくれた", "今日の"],
        correctOrder: [2, 0, 3, 1], // 手伝ってくれた おかげで 今日の 仕事が (早く終わった)
        starPosition: 3,
        explanation:
          "Susunan yang benar: 『先輩が [手伝ってくれた] [おかげで] [今日の] [仕事が] 早く終わった』. Posisi bintang (★) jatuh pada kata 『今日の』.",
      },
    ],
  },

  {
    id: "n3-b02-amari",
    chapterNumber: 2,
    chapterTitle: "第2課: 原因・理由 (Sebab, Alasan & Akibat)",
    category: "cause",
    categoryLabel: "原因・理由",
    patternJp: "〜あまり（に）",
    patternKana: "あまりに",
    meaningId: "Saking... nya, sampai-sampai... / Karena terlalu berlebihan...",
    connection: "動詞辞書形 / た形 ＋ あまり\n感情を表す名詞＋の ＋ あまり\nナ形容詞＋な ＋ あまり",
    coreConcept:
      "Tingkat emosi, kekhawatiran, ketegangan, atau antusiasme yang melebihi batas wajar sehingga memicu hasil atau tindakan abnormal yang tidak terkontrol.",
    cautionNote:
      "Kerap dipasangkan dengan kata-kata emosi: 緊張 (grogi), 心配 (khawatir), 驚き (kaget), 喜び (kegirangan), 悲しみ (kesedihan).",
    examples: [
      {
        id: "ex-amari-1",
        textJp: "試験の発表を見る時は、緊張のあまり手が震えてしまった。",
        ruby: "[試験:しけん]の[発表:はっぴょう]を[見:み]る[時:とき]は、[緊張:きんちょう]のあまり[手:て]が[震:ふる]えてしまった。",
        textId: "Saat melihat pengumuman ujian, saking gugupnya sampai-sampai tangan saya gemetar.",
        contextNote: "Reaksi fisik di luar kendali karena kadar gugup yang meluap.",
      },
      {
        id: "ex-amari-2",
        textJp: "合格の知らせを聞いた母は、嬉しさのあまり涙を流していた。",
        ruby: "[合格:ごうかく]の[知:し]らせを[聞:き]いた[母:はは]は、[嬉:うれ]しさのあまり[涙:なみだ]を[流:なが]していた。",
        textId: "Mendengar kabar kelulusan, ibu saking gembiranya sampai meneteskan air mata.",
        contextNote: "Emosi positif berlebih yang meluap menjadi tangisan haru.",
      },
    ],
    questions: [
      {
        id: "q-b02-03",
        type: "cloze",
        questionNumber: 8,
        questionJp: "子供のことを心配する（　　）、夜もろくに眠れなかった。",
        questionRuby: "[子供:こども]のことを[心配:しんぱい]する（　　）、[夜:よる]もろくに[眠:ねむ]れなかった。",
        questionTranslation: "Saking khawatirnya memikirkan anak, sampai malam pun tidak bisa tidur nyenyak.",
        options: [
          { key: "1", textJp: "あまり", textId: "Saking berlebihannya emosi" },
          { key: "2", textJp: "ついでに", textId: "Sambil lalu" },
          { key: "3", textJp: "反面", textId: "Di sisi lain" },
          { key: "4", textJp: "とおりに", textId: "Sesuai dengan" },
        ],
        correctKey: "1",
        explanation:
          "Menyatakan perasaan cemas (心配する) yang terlampau tinggi hingga berdampak abnormal tidak bisa tidur, menggunakan pola 『〜あまり』.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BAB 3: 判断・主張・評価 (Pertimbangan, Pola WAKE & Penegasan)
  // ─────────────────────────────────────────────────────────────
  {
    id: "n3-b03-wake-da",
    chapterNumber: 3,
    chapterTitle: "第3課: 主張・評価・判断 (Pembedahan Pola WAKE & Penegasan)",
    category: "judgment",
    categoryLabel: "判断・主張",
    patternJp: "〜わけだ",
    patternKana: "わけだ",
    meaningId: "Pantas saja... / Tentu saja begitu! (Wajar secara logika)",
    connection: "動詞普通形 ＋ わけだ\nイ形容詞普通形 ＋ わけだ\nナ形容詞＋な ＋ わけだ\n名詞＋な／である ＋ わけだ",
    coreConcept:
      "Setelah mendengar alasan atau mengetahui suatu fakta baru, pembicara akhirnya memahami dengan penuh kepuasan logika: 'Ooh, pantas saja begitu! Masuk akal sekali!'.",
    cautionNote:
      "Wajib membedakan 3 variasi utama WAKE: 〜わけだ (Pantas saja), 〜わけではない (Bukan berarti/tidak mutlak), dan 〜わけがない (Mustahil/tidak mungkin!).",
    examples: [
      {
        id: "ex-wake-1-1",
        textJp: "外は雪が降っているのか。どうりで部屋が寒いはずだ、冷えるわけだ。",
        ruby: "[外:そと]は[雪:ゆき]が[降:ふ]っているのか。どうりで[部屋:へや]が[寒:さむ]いはずだ、[冷:ひ]えるわけだ。",
        textId: "Oh ternyata di luar sedang turun salju ya. Pantas saja ruangan terasa sedingin ini!",
        contextNote: "Pemahaman logis yang spontan setelah melihat bukti salju.",
      },
      {
        id: "ex-wake-1-2",
        textJp: "彼は日本に10年も住んでいるそうだ。だから日本語がペラペラなわけだ。",
        ruby: "[彼:かれ]は[日本:にほん]に[10年:じゅうねん]も[住:す]んでいるそうだ。だから[日本語:にほんご]がペラペラなわけだ。",
        textId: "Katanya dia sudah tinggal di Jepang selama 10 tahun. Pantas saja bahasa Jepangnya fasih sekali.",
        contextNote: "Kesimpulan yang wajar berdasarkan durasi tinggal.",
      },
    ],
    comparisons: [
      {
        targetPattern: "〜わけではない",
        summary: "わけではない = Penyangkalan parsial ('bukan berarti...').",
        distinctionId:
          "「わけだ」 membenarkan logika ('pantas saja!'), sedangkan 「わけではない」 meluruskan salah paham ('bukan berarti saya membenci, hanya saja...').",
      },
      {
        targetPattern: "〜わけがない",
        summary: "わけがない = Penyangkalan mutlak ('mustahil sekali!').",
        distinctionId:
          "Sama dengan 『はずがない』, menyatakan keyakinan 100% bahwa hal itu mustahil terjadi.",
      },
    ],
    questions: [
      {
        id: "q-b03-01",
        type: "cloze",
        questionNumber: 9,
        questionJp: "エアコンが壊れていたのか。暑い（　　）ね。",
        questionRuby: "エアコンが[壊:こわ]れていたのか。[暑:あつ]い（　　）ね。",
        questionTranslation: "Ternyata AC-nya rusak ya. Pantas saja panas ya!",
        options: [
          { key: "1", textJp: "わけだ", textId: "Pantas saja (masuk akal)" },
          { key: "2", textJp: "わけがない", textId: "Mustahil panas" },
          { key: "3", textJp: "わけではない", textId: "Bukan berarti panas" },
          { key: "4", textJp: "せいだ", textId: "Gara-gara panas" },
        ],
        correctKey: "1",
        explanation:
          "Melihat alasan AC rusak membuat rasa panas menjadi sangat wajar dan masuk akal ('Pantas saja panas!'), maka ungkapan yang tepat adalah 『暑いわけだ』.",
      },
    ],
  },

  {
    id: "n3-b03-wake-dewa-nai",
    chapterNumber: 3,
    chapterTitle: "第3課: 主張・評価・判断 (Pembedahan Pola WAKE & Penegasan)",
    category: "judgment",
    categoryLabel: "判断・主張",
    patternJp: "〜わけではない / 〜わけでもない",
    patternKana: "わけではない",
    meaningId: "Bukan berarti selalu... / Tidak sepenuhnya begitu...",
    connection: "動詞普通形 ＋ わけではない\nイ形容詞普通形 ＋ わけではない\nナ形容詞＋な ＋ わけではない\n名詞＋な／である ＋ わけではない",
    coreConcept:
      "Penyangkalan sebagian (partial negation). Menyatakan bahwa meskipun orang mungkin mengira kondisinya begitu, pada kenyataannya tidak 100% mutlak demikian.",
    cautionNote:
      "Sering dipasangkan dengan kata-kata penanda derajat seperti: 全て (semua), いつも (selalu), 誰でも (siapa pun), 決して (sama sekali).",
    examples: [
      {
        id: "ex-wake-2-1",
        textJp: "辛い料理が嫌いなわけではないが、あまり得意ではない。",
        ruby: "[辛:から]い[料理:りょうり]が[嫌:きら]いなわけではないが、あまり[得意:とくい]ではない。",
        textId: "Bukan berarti saya membenci makanan pedas, cuma memang tidak begitu kuat makannya.",
        contextNote: "Meluruskan anggapan orang lain agar tidak salah paham.",
      },
      {
        id: "ex-wake-2-2",
        textJp: "お金があれば幸せになれるというわけではない。",
        ruby: "お[金:かね]があれば[幸:しあわ]せになれるというわけではない。",
        textId: "Bukan berarti kalau punya banyak uang lantas otomatis pasti bahagia.",
        contextNote: "Menolak stereotip umum bahwa uang menjamin kebahagiaan.",
      },
    ],
    questions: [
      {
        id: "q-b03-02",
        type: "seiretsu",
        questionNumber: 10,
        questionJp: "日本の文化が　＿＿　＿＿　★　＿＿　納豆が苦手なだけです。",
        questionRuby: "[日本:にほん]の[文化:ぶんか]が　＿＿　＿＿　★　＿＿　[納豆:なっとう]が[苦手:にがて]なだけです。",
        questionTranslation: "Bukan berarti saya tidak menyukai budaya Jepang, hanya saja saya tidak doyan natto.",
        items: ["わけではなく", "嫌いな", "全部", "本当に"],
        correctOrder: [3, 2, 1, 0], // 本当に 全部 嫌いな わけではなく
        starPosition: 3, // Opsi ke-3 di urutan adalah '嫌いな'
        explanation:
          "Susunan utuh yang logis: 『日本の文化が [本当に] [全部] [嫌いな] [わけではなく]、納豆が苦手なだけです』. Opsi di posisi bintang (★) adalah 『嫌いな』.",
      },
    ],
  },

  {
    id: "n3-b03-wake-ga-nai",
    chapterNumber: 3,
    chapterTitle: "第3課: 主張・評価・判断 (Pembedahan Pola WAKE & Penegasan)",
    category: "judgment",
    categoryLabel: "判断・主張",
    patternJp: "〜わけがない / 〜わけはない",
    patternKana: "わけがない",
    meaningId: "Mustahil...! / Tidak mungkin sama sekali...!",
    connection: "動詞普通形 ＋ わけがない\nイ形容詞普通形 ＋ わけがない\nナ形容詞＋な ＋ わけがない\n名詞＋の／である ＋ わけがない",
    coreConcept:
      "Penyangkalan mutlak dengan keyakinan kuat dari pembicara berdasarkan logika sehat: 'Tidak ada alasan atau kemungkinan hal semacam itu bisa terjadi!'.",
    cautionNote:
      "Makna dan derajat kepastiannya identik dengan 『〜はずがない』.",
    examples: [
      {
        id: "ex-wake-3-1",
        textJp: "あんなに真面目な田中さんが、嘘をつくわけがありません。",
        ruby: "あんなに[真面目:まじめ]な[田中:たなか]さんが、[嘘:うそ]をつくわけがありません。",
        textId: "Tanaka-san yang serajin dan sejujur itu, mustahil sekali dia berbohong!",
        contextNote: "Keyakinan mutlak atas integritas seseorang.",
      },
      {
        id: "ex-wake-3-2",
        textJp: "たった一日でこの分厚い本を全部読めるわけがないだろう。",
        ruby: "たった[一日:いちにち]でこの[分厚:ぶあつ]い[本:ほん]を[全部:ぜんぶ][読:よ]めるわけがないだろう。",
        textId: "Hanya dalam waktu satu hari, mana mungkin bisa membaca habis seluruh buku setebal ini!",
        contextNote: "Mustahil secara keterbatasan waktu manusiawi.",
      },
    ],
    questions: [
      {
        id: "q-b03-03",
        type: "cloze",
        questionNumber: 11,
        questionJp: "あんなに練習したんだから、簡単に負ける（　　）。",
        questionRuby: "あんなに[練習:れんしゅう]したんだから、[簡単:かんたん]に[負:ま]ける（　　）。",
        questionTranslation: "Karena kita sudah berlatih sekeras itu, mustahil kita kalah dengan mudah!",
        options: [
          { key: "1", textJp: "わけがない", textId: "Mustahil / tidak mungkin" },
          { key: "2", textJp: "わけだ", textId: "Pantas saja" },
          { key: "3", textJp: "うちに", textId: "Selagi" },
          { key: "4", textJp: "最中だ", textId: "Tepat di tengah" },
        ],
        correctKey: "1",
        explanation:
          "Menyatakan keyakinan mutlak berdasarkan alasan latihan keras bahwa kekalahan mudah adalah hal yang mustahil, sehingga menggunakan 『わけがない』.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BAB 4: 対比・逆接 (Kontras, Perlawanan & Sudut Pandang)
  // ─────────────────────────────────────────────────────────────
  {
    id: "n3-b04-ni-taishite",
    chapterNumber: 4,
    chapterTitle: "第4課: 対比・逆接 (Kontras, Perlawanan & Hubungan Berbanding)",
    category: "contrast",
    categoryLabel: "対比・逆接",
    patternJp: "〜に対して / 〜に対する",
    patternKana: "にたいして",
    meaningId: "Berbanding terbalik dengan... / Berlawanan dengan... / Terhadap...",
    connection: "名詞 ＋ に対して\n動詞普通形＋の ＋ に対して\nナ形容詞＋な／である＋の ＋ に対して",
    coreConcept:
      "Membandingkan dua hal atau dua pihak yang memiliki sifat, sikap, atau kecenderungan yang bertolak belakang secara kontras.",
    cautionNote:
      "Pola ini juga memiliki arti kedua: 'Sikap yang ditujukan terhadap seseorang/objek' (cth: お客様に対する態度). Namun di bab kontras ini fokusnya adalah membandingkan 2 sisi.",
    examples: [
      {
        id: "ex-tai-1",
        textJp: "兄は社交的で友達が多いのに対して、弟は物静かで家で読書するのが好きだ。",
        ruby: "[兄:あに]は[社交的:しゃこうてき]で[友達:ともだち]が[多:おお]いのに対して、[弟:おとうと]は[物静:ものしず]かで[家:いえ]で[読書:どくしょ]するのが[好:す]きだ。",
        textId: "Berbanding terbalik dengan sang kakak yang pandai bergaul dan banyak teman, sang adik pendiam dan lebih suka membaca buku di rumah.",
        contextNote: "Dua kepribadian yang kontras antara kakak dan adik.",
      },
      {
        id: "ex-tai-2",
        textJp: "都市部では人口が増えているのに対して、地方では若者の減少が深刻化している。",
        ruby: "[都市部:としぶ]では[人口:じんこう]が[増:ふ]えているのに対して、[地方:ちほう]では[若者:わかもの]の[減少:げんしょう]が[深刻化:しんこくか]している。",
        textId: "Berbanding terbalik dengan populasi perkotaan yang terus bertambah, di daerah pelosok penurunan jumlah generasi muda kian memprihatinkan.",
        contextNote: "Perbandingan tren demografi antara kota vs desa.",
      },
    ],
    comparisons: [
      {
        targetPattern: "〜反面 (はんめん)",
        summary: "反面 = Membandingkan dua sisi positif & negatif dari SATU subjek yang sama.",
        distinctionId:
          "「に対して」 membandingkan dua subjek berbeda (si A vs si B). Sedangkan 「反面」 membedah dua sifat berlawanan dari benda/hal yang sama (kemudahan vs risikonya).",
      },
    ],
    questions: [
      {
        id: "q-b04-01",
        type: "cloze",
        questionNumber: 12,
        questionJp: "昨日は大雨だったの（　　）、今日は雲ひとつない快晴だ。",
        questionRuby: "[昨日:きのう]は[大雨:おおあめ]だったの（　　）、[今日:きょう]は[雲:くも]ひとつない[快晴:かいせい]だ。",
        questionTranslation: "Berbanding terbalik dengan kemarin yang hujan lebat, hari ini cuaca cerah tanpa segumpal awan pun.",
        options: [
          { key: "1", textJp: "に対して", textId: "Berbanding terbalik / kontras" },
          { key: "2", textJp: "おかげで", textId: "Berkat" },
          { key: "3", textJp: "最中に", textId: "Tepat di tengah" },
          { key: "4", textJp: "とおりに", textId: "Sesuai dengan" },
        ],
        correctKey: "1",
        explanation:
          "Dua hari yang berbeda (kemarin vs hari ini) dengan kondisi cuaca yang saling bertolak belakang diperbandingkan secara tajam, maka menggunakan 『〜に対して』.",
      },
    ],
  },

  {
    id: "n3-b04-hanmen",
    chapterNumber: 4,
    chapterTitle: "第4課: 対比・逆接 (Kontras, Perlawanan & Hubungan Berbanding)",
    category: "contrast",
    categoryLabel: "対比・逆接",
    patternJp: "〜反面",
    patternKana: "はんめん",
    meaningId: "Namun di sisi lain... / Di balik itu, sebaliknya...",
    connection: "動詞普通形 ＋ 反面\nイ形容詞普通形 ＋ 反面\nナ形容詞＋な／である ＋ 反面\n名詞＋である ＋ 反面",
    coreConcept:
      "Mengungkapkan dua sisi mata uang yang bertolak belakang dari SATU objek, situasi, atau fenomena yang sama (misal ada kelebihan, tapi ada juga kekurangannya).",
    cautionNote:
      "Subjek yang dibahas hanya satu, bukan membandingkan dua orang berbeda seperti 〜に対して.",
    examples: [
      {
        id: "ex-han-1",
        textJp: "都会の暮らしは便利な反面、生活費が高くストレスも多い。",
        ruby: "[都会:とかい]の[暮:く]らしは[便利:べんり]な[反面:はんめん]、[生活費:せいかつひ]が[高:たか]くストレスも[多:おお]い。",
        textId: "Tinggal di kota metropolitan memang praktis dan serba ada, namun di sisi lain biaya hidupnya mahal dan tingkat stres tinggi.",
        contextNote: "Sisi positif vs negatif dari satu hal yang sama: tinggal di kota.",
      },
      {
        id: "ex-han-2",
        textJp: "リモートワークは自由な時間が増える反面、自己管理が難しくなる。",
        ruby: "リモートワークは[自由:じゆう]な[時間:じかん]が[増:ふ]える[反面:はんめん]、[自己管理:じこかんり]が[難:むずか]しくなる。",
        textId: "Kerja jarak jauh (remote work) memberi lebih banyak waktu luang fleksibel, namun sebaliknya tuntutan kontrol disiplin diri menjadi kian sulit.",
        contextNote: "Dualisme kelebihan dan tantangan kerja remote.",
      },
    ],
    questions: [
      {
        id: "q-b04-02",
        type: "seiretsu",
        questionNumber: 13,
        questionJp: "一人暮らしは　＿＿　＿＿　★　＿＿　寂しさを感じることもある。",
        questionRuby: "[一人暮:ひとりぐ]らしは　＿＿　＿＿　★　＿＿　[寂:さび]しさを[感:かん]じることもある。",
        questionTranslation: "Hidup mandiri sendiri memang bebas, namun di sisi lain terkadang ada kalanya merasa kesepian.",
        items: ["気楽な", "反面", "自由で", "ふとした時に"],
        correctOrder: [2, 0, 1, 3], // 自由で 気楽な 反面 ふとした時に
        starPosition: 3, // Opsi ke-3 di urutan adalah '反面'
        explanation:
          "Susunan utuh: 『一人暮らしは [自由で] [気楽な] [反面] [ふとした時に] 寂しさを感じることもある』. Kata yang menempati posisi bintang (★) adalah 『反面』.",
      },
    ],
  },
];
