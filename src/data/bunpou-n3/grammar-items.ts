import { BunpouItem } from "./types";

export const BUNPOU_ITEMS: BunpouItem[] = [
  // ─────────────────────────────────────────────────────────────
  // 第1課: 時間・時の関係 (Waktu & Urutan Kejadian)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b01-saichuu-ni",
    "chapterNumber": 1,
    "chapterTitle": "第1課: 時間・時の関係 (Waktu & Urutan Kejadian)",
    "category": "time",
    "categoryLabel": "時間・時",
    "patternJp": "〜最中に / 〜最中だ",
    "patternKana": "さいちゅうに",
    "meaningId": "Tepat di puncak kesibukan / Pas lagi tengah-tengahnya...",
    "connection": "動詞ている形 ＋ 最中に\n名詞＋の ＋ 最中に",
    "coreConcept": "Menyatakan suatu kejadian tak terduga datang menginterupsi tepat saat aktivitas puncak sedang berlangsung secara intens.",
    "cautionNote": "Sering diikuti oleh kejadian yang mengejutkan, mengganggu, atau merepotkan (telepon berdering, mati lampu, gempa, dsb.).",
    "examples": [
      {
        "id": "ex-saichuu-1",
        "textJp": "重要な会議の最中に、突然スマホが鳴り出して焦ってしまった。",
        "ruby": "[重要:じゅうよう]な[会議:かいぎ]の[最中:さいちゅう]に、[突然:とつぜん]スマホが[鳴:な]り[出:だ]して[焦:あせ]ってしまった。",
        "textId": "Tepat di tengah-tengah rapat penting, mendadak ponsel saya berdering sehingga membuat saya panik.",
        "contextNote": "Interupsi yang mengganggu pada puncak konsentrasi."
      },
      {
        "id": "ex-saichuu-2",
        "textJp": "シャワーを浴びている最中に停電して、真っ暗になった。",
        "ruby": "シャワーを[浴:あ]びている[最中:さいちゅう]に[停電:ていでん]して、[真:ま]っ[暗:くら]になった。",
        "textId": "Pas lagi asyik mandi air panas, listrik padam dan seketika jadi gelap gulita.",
        "contextNote": "Gangguan tak terduga."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜間に (あいだに)",
        "summary": "間に hanya menyatakan rentang waktu umum tanpa nuansa intensitas 'puncak kegiatan yang terinterupsi'.",
        "distinctionId": "「最中に」 memberikan efek dramatis bahwa gangguan datang di saat yang paling tidak tepat (timing terburuk)."
      }
    ],
    "questions": [
      {
        "id": "q-b01-04",
        "type": "seiretsu",
        "questionNumber": 1,
        "questionJp": "試験の　＿＿　＿＿　★　＿＿　お腹が痛くなった。",
        "questionRuby": "[試験:しけん]の　＿＿　＿＿　★　＿＿　お[腹:なか]が[痛:いた]くなった。",
        "questionTranslation": "Tepat di tengah-tengah ujian dimulai, perut saya mendadak terasa sakit.",
        "items": [
          "最中に",
          "突然",
          "激しく",
          "受け始めた"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "starPosition": 2,
        "explanation": "Kalimat lengkap: 『試験の [最中に] [突然] [激しく] お腹が痛くなった』. Kata di posisi bintang adalah 『突然』."
      }
    ]
  },

  {
    "id": "n3-b01-totan-ni",
    "chapterNumber": 1,
    "chapterTitle": "第1課: 時間・時の関係 (Waktu & Urutan Kejadian)",
    "category": "time",
    "categoryLabel": "時間・時",
    "patternJp": "〜たとたん（に）",
    "patternKana": "たとたんに",
    "meaningId": "Begitu... seketika itu juga / Sesaat setelah...",
    "connection": "動詞た形 ＋ とたん（に）",
    "coreConcept": "Tepat pada detik saat aksi A selesai dilakukan, segera terjadi hal B secara mengejutkan di luar kendali pembicara.",
    "cautionNote": "Bagian belakang HARUS merupakan kejadian refleks/spontan, bukan perintah atau niat pembicara (tidak boleh 〜たい / 〜てください).",
    "examples": [
      {
        "id": "ex-totan-1",
        "textJp": "窓を開けたとたんに、冷たい風が吹き込んできた。",
        "ruby": "[窓:まど]を[開:あ]けたとたんに、[冷:つめ]たい[風:かぜ]が[吹:ふ]き[込:こ]んできた。",
        "textId": "Begitu jendela dibuka, seketika itu juga angin dingin berhembus masuk ke dalam.",
        "contextNote": "Reaksi instan yang terjadi bersamaan dengan terbukanya jendela."
      },
      {
        "id": "ex-totan-2",
        "textJp": "薬を飲んで横になったとたん、深い眠りに落ちてしまった。",
        "ruby": "[薬:くすり]を[飲:の]んで[横:よこ]になったとたん、[深:ふか]い[眠:ねむ]りに[落:お]ちてしまった。",
        "textId": "Begitu minum obat dan berbaring, saya langsung jatuh tertidur lelap seketika.",
        "contextNote": "Kejadian spontan di luar kontrol sadar."
      }
    ],
    "questions": [
      {
        "id": "q-b01-05",
        "type": "cloze",
        "questionNumber": 2,
        "questionJp": "ボタンを（　　）とたんに、機械から煙が出てきた。",
        "questionRuby": "ボタンを（　　）とたんに、[機械:きかい]から[煙:けむり]が[出:で]てきた。",
        "questionTranslation": "Begitu menekan tombol tersebut, seketika asap mengepul dari mesin.",
        "options": [
          {
            "key": "1",
            "textJp": "押した",
            "textId": "Bentuk Lampau (た形)"
          },
          {
            "key": "2",
            "textJp": "押す",
            "textId": "Bentuk Kamus"
          },
          {
            "key": "3",
            "textJp": "押して",
            "textId": "Bentuk -te"
          },
          {
            "key": "4",
            "textJp": "押している",
            "textId": "Bentuk Sedang"
          }
        ],
        "correctKey": "1",
        "explanation": "Rumus sambungan untuk pola 『〜たとたん』 wajib menggunakan 動詞た形 (bentuk lampau), sehingga yang benar adalah 『押した』."
      }
    ]
  },

  {
    "id": "n3-b01-uchi-ni-1",
    "chapterNumber": 1,
    "chapterTitle": "第1課: 時間・時の関係 (Waktu & Urutan Kejadian)",
    "category": "time",
    "categoryLabel": "時間・時",
    "patternJp": "〜うちに（１）",
    "patternKana": "うちに",
    "meaningId": "Selagi / Mumpung... (sebelum kondisi saat ini berubah)",
    "connection": "動詞辞書形 / V-ている / V-ない形 ＋ うちに\nイ形容詞 ＋ うちに\nナ形容詞＋な ＋ うちに\n名詞＋の ＋ うちに",
    "coreConcept": "Dipakai ketika pembicara ingin melakukan sesuatu dengan kemauan sendiri (keinginan/aksi) mumpung situasi atau kondisi tertentu masih berlangsung, sebelum situasinya berubah dan kesempatan tersebut hilang.",
    "cautionNote": "Kalimat belakang berisi kalimat berkehendak (ajakan, niat, atau perintah: 〜たい、〜てください、〜よう). Berbeda dengan 〜うちに (2) yang kejadian belakangnya di luar kendali.",
    "examples": [
      {
        "id": "ex-uchi-1-1",
        "textJp": "スープが[冷:つめ]たくならないうちに、どうぞ[召:め]し上がってください。",
        "ruby": "スープが[冷:つめ]たくならないうちに、どうぞ[召:め]し[上:あ]がってください。",
        "textId": "Silakan dimakan selagi supnya belum dingin.",
        "contextNote": "Aksi yang disarankan sebelum suhu sup berubah dingin."
      },
      {
        "id": "ex-uchi-1-2",
        "textJp": "日本にいるうちに、一度富士山に登ってみたいです。",
        "ruby": "[日本:にほん]にいるうちに、[一度:いちど][富士山:ふじさん]に[登:のぼ]ってみたいです。",
        "textId": "Mumpung masih tinggal di Jepang, saya ingin mencoba mendaki Gunung Fuji sekali saja.",
        "contextNote": "Keinginan pribadi selagi kesempatan masih terbuka."
      },
      {
        "id": "ex-uchi-1-3",
        "textJp": "若いうちに、いろいろな国を旅したほうがいいですよ。",
        "ruby": "[若:わか]いうちに、いろいろな[国:くに]を[旅:たび]したほうがいいですよ。",
        "textId": "Selagi masih muda, sebaiknya kamu bepergian keliling berbagai negara.",
        "contextNote": "Saran mumpung masih punya tenaga dan kebebasan waktu."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜あいだに (間に)",
        "summary": "あいだに = menunjukkan rentang waktu objektif, tidak ada penekanan 'mumpung sebelum berubah'.",
        "distinctionId": "「うちに」 ada nuansa keterdesakan bahwa jika kondisi berubah nanti tidak bisa lagi. Sedangkan 「間に」 murni menyatakan aksi terjadi di tengah jangka waktu tertentu."
      }
    ],
    "questions": [
      {
        "id": "q-b01-01",
        "type": "cloze",
        "questionNumber": 3,
        "questionJp": "明るい（　　）、急いで山を下りましょう。",
        "questionRuby": "[明:あか]るい（　　）、[急:いそ]いで[山:やま]を[下:お]りましょう。",
        "questionTranslation": "Selagi masih terang, ayo kita lekas turun gunung.",
        "options": [
          {
            "key": "1",
            "textJp": "うちに",
            "textId": "Selagi / Mumpung"
          },
          {
            "key": "2",
            "textJp": "あいだ",
            "textId": "Selama terus menerus"
          },
          {
            "key": "3",
            "textJp": "ついでに",
            "textId": "Sekalian"
          },
          {
            "key": "4",
            "textJp": "最中に",
            "textId": "Tepat di tengah-tengah"
          }
        ],
        "correctKey": "1",
        "explanation": "Kondisi 'terang' akan segera berubah menjadi gelap jika waktu berlalu. Maka ekspresi mumpung/sebelum kondisi berubah yang tepat adalah 『うちに』."
      },
      {
        "id": "q-b01-02",
        "type": "seiretsu",
        "questionNumber": 4,
        "questionJp": "雨が　＿＿　＿＿　★　＿＿　帰りましょう。",
        "questionRuby": "[雨:あめ]が　＿＿　＿＿　★　＿＿　[帰:かえ]りましょう。",
        "questionTranslation": "Sebelum hujan turun, ayo lekas kita pulang ke rumah.",
        "items": [
          "うちに",
          "急いで",
          "降らない",
          "家へ"
        ],
        "correctOrder": [
          2,
          0,
          1,
          3
        ],
        "starPosition": 3,
        "explanation": "Struktur urutan yang tepat: 『雨が [降らない] [うちに] [急いで] [家へ] 帰りましょう』. Kata yang berada di posisi bintang (★) adalah 『急いで』."
      }
    ]
  },

  {
    "id": "n3-b01-uchi-ni-2",
    "chapterNumber": 1,
    "chapterTitle": "第1課: 時間・時の関係 (Waktu & Urutan Kejadian)",
    "category": "time",
    "categoryLabel": "時間・時",
    "patternJp": "〜うちに（２）",
    "patternKana": "うちに",
    "meaningId": "Tanpa disadari / Perlahan berubah menjadi... (di tengah kondisi A)",
    "connection": "動詞辞書形 / V-ている / V-ない形 ＋ うちに",
    "coreConcept": "Menyatakan bahwa di tengah-tengah suatu keadaan atau saat sedang melakukan suatu aktivitas berkesinambungan, tiba-tiba atau tanpa disadari terjadi perubahan keadaan alamiah yang tidak disengaja oleh pembicara.",
    "cautionNote": "Kalimat belakang TIDAK BOLEH mengandung kehendak (niat, ajakan, perintah). Kalimat belakang selalu berupa perubahan spontan atau di luar kendali.",
    "examples": [
      {
        "id": "ex-uchi-2-1",
        "textJp": "何度も音楽を聴いているうちに、自然に歌詞を覚えてしまった。",
        "ruby": "[何:なん][度:ど]も[音楽:おんがく]を[聴:き]いているうちに、[自然:しぜん]に[歌詞:かし]を[覚:おぼ]えてしまった。",
        "textId": "Saking seringnya mendengarkan lagu itu, tanpa sadar liriknya terhafal dengan sendirinya.",
        "contextNote": "Perubahan alami yang terjadi tanpa niat menghafal secara sengaja."
      },
      {
        "id": "ex-uchi-2-2",
        "textJp": "知らないうちに、外はすっかり暗くなっていた。",
        "ruby": "[知:し]らないうちに、[外:そと]はすっかり[暗:くら]くなっていた。",
        "textId": "Tanpa saya sadari, di luar sudah benar-benar gelap gulita.",
        "contextNote": "Kondisi waktu berubah perlahan di luar perhatian pembicara."
      }
    ],
    "questions": [
      {
        "id": "q-b01-03",
        "type": "cloze",
        "questionNumber": 5,
        "questionJp": "毎日話している（　　）、いつの間にか日本語が上手になった。",
        "questionRuby": "[毎日:まいにち][話:はな]している（　　）、いつの[間:ま]にか[日本語:にほんご]が[上手:じょうず]になった。",
        "questionTranslation": "Selama mengobrol setiap hari, tanpa sadar bahasa Jepang saya menjadi lancar.",
        "options": [
          {
            "key": "1",
            "textJp": "うちに",
            "textId": "Seiring berjalannya waktu / tanpa sadar"
          },
          {
            "key": "2",
            "textJp": "ついでに",
            "textId": "Sekalian memanfaatkan jalan"
          },
          {
            "key": "3",
            "textJp": "かわりに",
            "textId": "Sebagai pengganti"
          },
          {
            "key": "4",
            "textJp": "反面",
            "textId": "Di sisi lain"
          }
        ],
        "correctKey": "1",
        "explanation": "Kalimat belakang menyatakan perubahan alami tanpa disadari (いつの間にか〜になった), sehingga pola yang tepat adalah 『うちに』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第2課: 原因・理由 (Sebab, Alasan & Akibat)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b02-amari",
    "chapterNumber": 2,
    "chapterTitle": "第2課: 原因・理由 (Sebab, Alasan & Akibat)",
    "category": "cause",
    "categoryLabel": "原因・理由",
    "patternJp": "〜あまり（に）",
    "patternKana": "あまりに",
    "meaningId": "Saking... nya, sampai-sampai... / Karena terlalu berlebihan...",
    "connection": "動詞辞書形 / た形 ＋ あまり\n感情を表す名詞＋の ＋ あまり\nナ形容詞＋な ＋ あまり",
    "coreConcept": "Tingkat emosi, kekhawatiran, ketegangan, atau antusiasme yang melebihi batas wajar sehingga memicu hasil atau tindakan abnormal yang tidak terkontrol.",
    "cautionNote": "Kerap dipasangkan dengan kata-kata emosi: 緊張 (grogi), 心配 (khawatir), 驚き (kaget), 喜び (kegirangan), 悲しみ (kesedihan).",
    "examples": [
      {
        "id": "ex-amari-1",
        "textJp": "試験の発表を見る時は、緊張のあまり手が震えてしまった。",
        "ruby": "[試験:しけん]の[発表:はっぴょう]を[見:み]る[時:とき]は、[緊張:きんちょう]のあまり[手:て]が[震:ふる]えてしまった。",
        "textId": "Saat melihat pengumuman ujian, saking gugupnya sampai-sampai tangan saya gemetar.",
        "contextNote": "Reaksi fisik di luar kendali karena kadar gugup yang meluap."
      },
      {
        "id": "ex-amari-2",
        "textJp": "合格の知らせを聞いた母は、嬉しさのあまり涙を流していた。",
        "ruby": "[合格:ごうかく]の[知:し]らせを[聞:き]いた[母:はは]は、[嬉:うれ]しさのあまり[涙:なみだ]を[流:なが]していた。",
        "textId": "Mendengar kabar kelulusan, ibu saking gembiranya sampai meneteskan air mata.",
        "contextNote": "Emosi positif berlebih yang meluap menjadi tangisan haru."
      }
    ],
    "questions": [
      {
        "id": "q-b02-03",
        "type": "cloze",
        "questionNumber": 6,
        "questionJp": "子供のことを心配する（　　）、夜もろくに眠れなかった。",
        "questionRuby": "[子供:こども]のことを[心配:しんぱい]する（　　）、[夜:よる]もろくに[眠:ねむ]れなかった。",
        "questionTranslation": "Saking khawatirnya memikirkan anak, sampai malam pun tidak bisa tidur nyenyak.",
        "options": [
          {
            "key": "1",
            "textJp": "あまり",
            "textId": "Saking berlebihannya emosi"
          },
          {
            "key": "2",
            "textJp": "ついでに",
            "textId": "Sambil lalu"
          },
          {
            "key": "3",
            "textJp": "反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "4",
            "textJp": "とおりに",
            "textId": "Sesuai dengan"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan perasaan cemas (心配する) yang terlampau tinggi hingga berdampak abnormal tidak bisa tidur, menggunakan pola 『〜あまり』."
      }
    ]
  },

  {
    "id": "n3-b02-okage-de",
    "chapterNumber": 2,
    "chapterTitle": "第2課: 原因・理由 (Sebab, Alasan & Akibat)",
    "category": "cause",
    "categoryLabel": "原因・理由",
    "patternJp": "〜おかげ（で）",
    "patternKana": "おかげで",
    "meaningId": "Berkat... / Berkat bantuan...",
    "connection": "動詞普通形 ＋ おかげ\nイ形容詞普通形 ＋ おかげ\nナ形容詞＋な ＋ おかげ\n名詞＋の ＋ おかげ",
    "coreConcept": "Menyatakan rasa syukur bahwa berkat faktor atau bantuan A, tercapailah hasil yang memuaskan dan positif B.",
    "cautionNote": "Terkadang bisa dipakai dalam sindiran/sarkasme, namun fungsi utamanya di ujian JLPT adalah menyatakan hasil baik.",
    "examples": [
      {
        "id": "ex-okage-1",
        "textJp": "先生が熱心に教えてくださったおかげで、無事に合格できました。",
        "ruby": "[先生:せんせい]が[熱心:ねっしん]に[教:おし]えてくださったおかげで、[無事:ぶじ]に[合格:ごうかく]できました。",
        "textId": "Berkat bimbingan guru yang penuh dedikasi, saya berhasil lulus dengan selamat.",
        "contextNote": "Ungkapan terima kasih atas keberhasilan ujian."
      },
      {
        "id": "ex-okage-2",
        "textJp": "毎日単語アプリで復習したおかげで、読解のスピードが上がった。",
        "ruby": "[毎日:まいにち][単語:たんご]アプリで[復習:ふくしゅう]したおかげで、[読解:どっかい]のスピードが[上:あ]がった。",
        "textId": "Berkat mengulang hafalan di aplikasi kosakata tiap hari, kecepatan membaca saya meningkat.",
        "contextNote": "Hasil positif dari usaha yang konsisten."
      }
    ],
    "questions": [
      {
        "id": "q-b02-02",
        "type": "seiretsu",
        "questionNumber": 7,
        "questionJp": "先輩が　＿＿　＿＿　★　＿＿　早く終わった。",
        "questionRuby": "[先輩:せんぱい]が　＿＿　＿＿　★　＿＿　[早:はや]く[終:お]わった。",
        "questionTranslation": "Berkat senior membantu pekerjaan saya, tugasnya selesai lebih cepat.",
        "items": [
          "おかげで",
          "仕事が",
          "手伝ってくれた",
          "今日の"
        ],
        "correctOrder": [
          2,
          0,
          3,
          1
        ],
        "starPosition": 3,
        "explanation": "Susunan yang benar: 『先輩が [手伝ってくれた] [おかげで] [今日の] [仕事が] 早く終わった』. Posisi bintang (★) jatuh pada kata 『今日の』."
      }
    ]
  },

  {
    "id": "n3-b02-sei-de",
    "chapterNumber": 2,
    "chapterTitle": "第2課: 原因・理由 (Sebab, Alasan & Akibat)",
    "category": "cause",
    "categoryLabel": "原因・理由",
    "patternJp": "〜せい（で） / 〜せいに決まっている",
    "patternKana": "せいで",
    "meaningId": "Gara-gara... (Penyebab negatif / Menyalahkan)",
    "connection": "動詞普通形 ＋ せい\nイ形容詞普通形 ＋ せい\nナ形容詞＋な ＋ せい\n名詞＋の ＋ せい",
    "coreConcept": "Menyatakan bahwa faktor A menjadi biang keladi atau penyebab terjadinya dampak buruk/negatif B. Sering dipakai untuk mengeluh atau menyalahkan keadaan/orang lain.",
    "cautionNote": "HANYA digunakan untuk akibat negatif yang tidak menyenangkan. Jika akibatnya positif/menguntungkan, gunakan 『〜おかげで』.",
    "examples": [
      {
        "id": "ex-sei-1",
        "textJp": "電車が遅れたせいで、大事な面接に遅刻してしまった。",
        "ruby": "[電車:でんしゃ]が[遅:おく]れたせいで、[大事:だいじ]な[面接:めんせつ]に[遅刻:ちこく]してしまった。",
        "textId": "Gara-gara kereta terlambat, saya sampai terlambat menghadiri wawancara penting.",
        "contextNote": "Menyalahkan keterlambatan kereta atas musibah yang dialami."
      },
      {
        "id": "ex-sei-2",
        "textJp": "寝不足のせいで、朝から頭がズキズキ痛む。",
        "ruby": "[寝不足:ねぶそく]のせいで、[朝:あさ]から[頭:あたま]がズキズキ[痛:いた]む。",
        "textId": "Gara-gara kurang tidur, dari pagi kepala saya terasa berdenyut sakit.",
        "contextNote": "Penyebab dari kondisi fisik yang buruk."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜おかげで",
        "summary": "おかげで = Berkat... (khusus hasil positif / bersyukur).",
        "distinctionId": "「せいで」 fokus pada menyalahkan kerugian, sedangkan 「おかげで」 ungkapan rasa terima kasih atas berkah/keuntungan."
      }
    ],
    "questions": [
      {
        "id": "q-b02-01",
        "type": "cloze",
        "questionNumber": 8,
        "questionJp": "昨夜コーヒーを飲みすぎた（　　）、全然眠れなかった。",
        "questionRuby": "[昨夜:ゆうべ]コーヒーを[飲:の]みすぎた（　　）、[全然:ぜんぜん][眠:ねむ]れなかった。",
        "questionTranslation": "Gara-gara semalam kebanyakan minum kopi, saya sama sekali tidak bisa tidur.",
        "options": [
          {
            "key": "1",
            "textJp": "せいで",
            "textId": "Gara-gara (akibat buruk)"
          },
          {
            "key": "2",
            "textJp": "おかげで",
            "textId": "Berkat (akibat baik)"
          },
          {
            "key": "3",
            "textJp": "ために",
            "textId": "Demi / untuk"
          },
          {
            "key": "4",
            "textJp": "ついでに",
            "textId": "Sambil lalu"
          }
        ],
        "correctKey": "1",
        "explanation": "Akibat yang terjadi adalah hal yang merugikan/buruk (tidak bisa tidur sama sekali), sehingga pola penyalahan yang tepat adalah 『せいで』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第3課: 主張・評価・判断 (Pembedahan Pola WAKE & Penegasan)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b03-wake-da",
    "chapterNumber": 3,
    "chapterTitle": "第3課: 主張・評価・判断 (Pembedahan Pola WAKE & Penegasan)",
    "category": "judgment",
    "categoryLabel": "判断・主張",
    "patternJp": "〜わけだ",
    "patternKana": "わけだ",
    "meaningId": "Pantas saja... / Tentu saja begitu! (Wajar secara logika)",
    "connection": "動詞普通形 ＋ わけだ\nイ形容詞普通形 ＋ わけだ\nナ形容詞＋な ＋ わけだ\n名詞＋な／である ＋ わけだ",
    "coreConcept": "Setelah mendengar alasan atau mengetahui suatu fakta baru, pembicara akhirnya memahami dengan penuh kepuasan logika: 'Ooh, pantas saja begitu! Masuk akal sekali!'.",
    "cautionNote": "Wajib membedakan 3 variasi utama WAKE: 〜わけだ (Pantas saja), 〜わけではない (Bukan berarti/tidak mutlak), dan 〜わけがない (Mustahil/tidak mungkin!).",
    "examples": [
      {
        "id": "ex-wake-1-1",
        "textJp": "外は雪が降っているのか。どうりで部屋が寒いはずだ、冷えるわけだ。",
        "ruby": "[外:そと]は[雪:ゆき]が[降:ふ]っているのか。どうりで[部屋:へや]が[寒:さむ]いはずだ、[冷:ひ]えるわけだ。",
        "textId": "Oh ternyata di luar sedang turun salju ya. Pantas saja ruangan terasa sedingin ini!",
        "contextNote": "Pemahaman logis yang spontan setelah melihat bukti salju."
      },
      {
        "id": "ex-wake-1-2",
        "textJp": "彼は日本に10年も住んでいるそうだ。だから日本語がペラペラなわけだ。",
        "ruby": "[彼:かれ]は[日本:にほん]に[10年:じゅうねん]も[住:す]んでいるそうだ。だから[日本語:にほんご]がペラペラなわけだ。",
        "textId": "Katanya dia sudah tinggal di Jepang selama 10 tahun. Pantas saja bahasa Jepangnya fasih sekali.",
        "contextNote": "Kesimpulan yang wajar berdasarkan durasi tinggal."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜わけではない",
        "summary": "わけではない = Penyangkalan parsial ('bukan berarti...').",
        "distinctionId": "「わけだ」 membenarkan logika ('pantas saja!'), sedangkan 「わけではない」 meluruskan salah paham ('bukan berarti saya membenci, hanya saja...')."
      },
      {
        "targetPattern": "〜わけがない",
        "summary": "わけがない = Penyangkalan mutlak ('mustahil sekali!').",
        "distinctionId": "Sama dengan 『はずがない』, menyatakan keyakinan 100% bahwa hal itu mustahil terjadi."
      }
    ],
    "questions": [
      {
        "id": "q-b03-01",
        "type": "cloze",
        "questionNumber": 9,
        "questionJp": "エアコンが壊れていたのか。暑い（　　）ね。",
        "questionRuby": "エアコンが[壊:こわ]れていたのか。[暑:あつ]い（　　）ね。",
        "questionTranslation": "Ternyata AC-nya rusak ya. Pantas saja panas ya!",
        "options": [
          {
            "key": "1",
            "textJp": "わけだ",
            "textId": "Pantas saja (masuk akal)"
          },
          {
            "key": "2",
            "textJp": "わけがない",
            "textId": "Mustahil panas"
          },
          {
            "key": "3",
            "textJp": "わけではない",
            "textId": "Bukan berarti panas"
          },
          {
            "key": "4",
            "textJp": "せいだ",
            "textId": "Gara-gara panas"
          }
        ],
        "correctKey": "1",
        "explanation": "Melihat alasan AC rusak membuat rasa panas menjadi sangat wajar dan masuk akal ('Pantas saja panas!'), maka ungkapan yang tepat adalah 『暑いわけだ』."
      }
    ]
  },

  {
    "id": "n3-b03-wake-dewa-nai",
    "chapterNumber": 3,
    "chapterTitle": "第3課: 主張・評価・判断 (Pembedahan Pola WAKE & Penegasan)",
    "category": "judgment",
    "categoryLabel": "判断・主張",
    "patternJp": "〜わけではない / 〜わけでもない",
    "patternKana": "わけではない",
    "meaningId": "Bukan berarti selalu... / Tidak sepenuhnya begitu...",
    "connection": "動詞普通形 ＋ わけではない\nイ形容詞普通形 ＋ わけではない\nナ形容詞＋な ＋ わけではない\n名詞＋な／である ＋ わけではない",
    "coreConcept": "Penyangkalan sebagian (partial negation). Menyatakan bahwa meskipun orang mungkin mengira kondisinya begitu, pada kenyataannya tidak 100% mutlak demikian.",
    "cautionNote": "Sering dipasangkan dengan kata-kata penanda derajat seperti: 全て (semua), いつも (selalu), 誰でも (siapa pun), 決して (sama sekali).",
    "examples": [
      {
        "id": "ex-wake-2-1",
        "textJp": "辛い料理が嫌いなわけではないが、あまり得意ではない。",
        "ruby": "[辛:から]い[料理:りょうり]が[嫌:きら]いなわけではないが、あまり[得意:とくい]ではない。",
        "textId": "Bukan berarti saya membenci makanan pedas, cuma memang tidak begitu kuat makannya.",
        "contextNote": "Meluruskan anggapan orang lain agar tidak salah paham."
      },
      {
        "id": "ex-wake-2-2",
        "textJp": "お金があれば幸せになれるというわけではない。",
        "ruby": "お[金:かね]があれば[幸:しあわ]せになれるというわけではない。",
        "textId": "Bukan berarti kalau punya banyak uang lantas otomatis pasti bahagia.",
        "contextNote": "Menolak stereotip umum bahwa uang menjamin kebahagiaan."
      }
    ],
    "questions": [
      {
        "id": "q-b03-02",
        "type": "seiretsu",
        "questionNumber": 10,
        "questionJp": "日本の文化が　＿＿　＿＿　★　＿＿　納豆が苦手なだけです。",
        "questionRuby": "[日本:にほん]の[文化:ぶんか]が　＿＿　＿＿　★　＿＿　[納豆:なっとう]が[苦手:にがて]なだけです。",
        "questionTranslation": "Bukan berarti saya tidak menyukai budaya Jepang, hanya saja saya tidak doyan natto.",
        "items": [
          "わけではなく",
          "嫌いな",
          "全部",
          "本当に"
        ],
        "correctOrder": [
          3,
          2,
          1,
          0
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh yang logis: 『日本の文化が [本当に] [全部] [嫌いな] [わけではなく]、納豆が苦手なだけです』. Opsi di posisi bintang (★) adalah 『嫌いな』."
      }
    ]
  },

  {
    "id": "n3-b03-wake-ga-nai",
    "chapterNumber": 3,
    "chapterTitle": "第3課: 主張・評価・判断 (Pembedahan Pola WAKE & Penegasan)",
    "category": "judgment",
    "categoryLabel": "判断・主張",
    "patternJp": "〜わけがない / 〜わけはない",
    "patternKana": "わけがない",
    "meaningId": "Mustahil...! / Tidak mungkin sama sekali...!",
    "connection": "動詞普通形 ＋ わけがない\nイ形容詞普通形 ＋ わけがない\nナ形容詞＋な ＋ わけがない\n名詞＋の／である ＋ わけがない",
    "coreConcept": "Penyangkalan mutlak dengan keyakinan kuat dari pembicara berdasarkan logika sehat: 'Tidak ada alasan atau kemungkinan hal semacam itu bisa terjadi!'.",
    "cautionNote": "Makna dan derajat kepastiannya identik dengan 『〜はずがない』.",
    "examples": [
      {
        "id": "ex-wake-3-1",
        "textJp": "あんなに真面目な田中さんが、嘘をつくわけがありません。",
        "ruby": "あんなに[真面目:まじめ]な[田中:たなか]さんが、[嘘:うそ]をつくわけがありません。",
        "textId": "Tanaka-san yang serajin dan sejujur itu, mustahil sekali dia berbohong!",
        "contextNote": "Keyakinan mutlak atas integritas seseorang."
      },
      {
        "id": "ex-wake-3-2",
        "textJp": "たった一日でこの分厚い本を全部読めるわけがないだろう。",
        "ruby": "たった[一日:いちにち]でこの[分厚:ぶあつ]い[本:ほん]を[全部:ぜんぶ][読:よ]めるわけがないだろう。",
        "textId": "Hanya dalam waktu satu hari, mana mungkin bisa membaca habis seluruh buku setebal ini!",
        "contextNote": "Mustahil secara keterbatasan waktu manusiawi."
      }
    ],
    "questions": [
      {
        "id": "q-b03-03",
        "type": "cloze",
        "questionNumber": 11,
        "questionJp": "あんなに練習したんだから、簡単に負ける（　　）。",
        "questionRuby": "あんなに[練習:れんしゅう]したんだから、[簡単:かんたん]に[負:ま]ける（　　）。",
        "questionTranslation": "Karena kita sudah berlatih sekeras itu, mustahil kita kalah dengan mudah!",
        "options": [
          {
            "key": "1",
            "textJp": "わけがない",
            "textId": "Mustahil / tidak mungkin"
          },
          {
            "key": "2",
            "textJp": "わけだ",
            "textId": "Pantas saja"
          },
          {
            "key": "3",
            "textJp": "うちに",
            "textId": "Selagi"
          },
          {
            "key": "4",
            "textJp": "最中だ",
            "textId": "Tepat di tengah"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan keyakinan mutlak berdasarkan alasan latihan keras bahwa kekalahan mudah adalah hal yang mustahil, sehingga menggunakan 『わけがない』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第4課: 対比・逆接 (Kontras, Perlawanan & Hubungan Berbanding)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b04-hanmen",
    "chapterNumber": 4,
    "chapterTitle": "第4課: 対比・逆接 (Kontras, Perlawanan & Hubungan Berbanding)",
    "category": "contrast",
    "categoryLabel": "対比・逆接",
    "patternJp": "〜反面",
    "patternKana": "はんめん",
    "meaningId": "Namun di sisi lain... / Di balik itu, sebaliknya...",
    "connection": "動詞普通形 ＋ 反面\nイ形容詞普通形 ＋ 反面\nナ形容詞＋な／である ＋ 反面\n名詞＋である ＋ 反面",
    "coreConcept": "Mengungkapkan dua sisi mata uang yang bertolak belakang dari SATU objek, situasi, atau fenomena yang sama (misal ada kelebihan, tapi ada juga kekurangannya).",
    "cautionNote": "Subjek yang dibahas hanya satu, bukan membandingkan dua orang berbeda seperti 〜に対して.",
    "examples": [
      {
        "id": "ex-han-1",
        "textJp": "都会の暮らしは便利な反面、生活費が高くストレスも多い。",
        "ruby": "[都会:とかい]の[暮:く]らしは[便利:べんり]な[反面:はんめん]、[生活費:せいかつひ]が[高:たか]くストレスも[多:おお]い。",
        "textId": "Tinggal di kota metropolitan memang praktis dan serba ada, namun di sisi lain biaya hidupnya mahal dan tingkat stres tinggi.",
        "contextNote": "Sisi positif vs negatif dari satu hal yang sama: tinggal di kota."
      },
      {
        "id": "ex-han-2",
        "textJp": "リモートワークは自由な時間が増える反面、自己管理が難しくなる。",
        "ruby": "リモートワークは[自由:じゆう]な[時間:じかん]が[増:ふ]える[反面:はんめん]、[自己管理:じこかんり]が[難:むずか]しくなる。",
        "textId": "Kerja jarak jauh (remote work) memberi lebih banyak waktu luang fleksibel, namun sebaliknya tuntutan kontrol disiplin diri menjadi kian sulit.",
        "contextNote": "Dualisme kelebihan dan tantangan kerja remote."
      }
    ],
    "questions": [
      {
        "id": "q-b04-02",
        "type": "seiretsu",
        "questionNumber": 12,
        "questionJp": "一人暮らしは　＿＿　＿＿　★　＿＿　寂しさを感じることもある。",
        "questionRuby": "[一人暮:ひとりぐ]らしは　＿＿　＿＿　★　＿＿　[寂:さび]しさを[感:かん]じることもある。",
        "questionTranslation": "Hidup mandiri sendiri memang bebas, namun di sisi lain terkadang ada kalanya merasa kesepian.",
        "items": [
          "気楽な",
          "反面",
          "自由で",
          "ふとした時に"
        ],
        "correctOrder": [
          2,
          0,
          1,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『一人暮らしは [自由で] [気楽な] [反面] [ふとした時に] 寂しさを感じることもある』. Kata yang menempati posisi bintang (★) adalah 『反面』."
      }
    ]
  },

  {
    "id": "n3-b04-ni-taishite",
    "chapterNumber": 4,
    "chapterTitle": "第4課: 対比・逆接 (Kontras, Perlawanan & Hubungan Berbanding)",
    "category": "contrast",
    "categoryLabel": "対比・逆接",
    "patternJp": "〜に対して / 〜に対する",
    "patternKana": "にたいして",
    "meaningId": "Berbanding terbalik dengan... / Berlawanan dengan... / Terhadap...",
    "connection": "名詞 ＋ に対して\n動詞普通形＋の ＋ に対して\nナ形容詞＋な／である＋の ＋ に対して",
    "coreConcept": "Membandingkan dua hal atau dua pihak yang memiliki sifat, sikap, atau kecenderungan yang bertolak belakang secara kontras.",
    "cautionNote": "Pola ini juga memiliki arti kedua: 'Sikap yang ditujukan terhadap seseorang/objek' (cth: お客様に対する態度). Namun di bab kontras ini fokusnya adalah membandingkan 2 sisi.",
    "examples": [
      {
        "id": "ex-tai-1",
        "textJp": "兄は社交的で友達が多いのに対して、弟は物静かで家で読書するのが好きだ。",
        "ruby": "[兄:あに]は[社交的:しゃこうてき]で[友達:ともだち]が[多:おお]いのに対して、[弟:おとうと]は[物静:ものしず]かで[家:いえ]で[読書:どくしょ]するのが[好:す]きだ。",
        "textId": "Berbanding terbalik dengan sang kakak yang pandai bergaul dan banyak teman, sang adik pendiam dan lebih suka membaca buku di rumah.",
        "contextNote": "Dua kepribadian yang kontras antara kakak dan adik."
      },
      {
        "id": "ex-tai-2",
        "textJp": "都市部では人口が増えているのに対して、地方では若者の減少が深刻化している。",
        "ruby": "[都市部:としぶ]では[人口:じんこう]が[増:ふ]えているのに対して、[地方:ちほう]では[若者:わかもの]の[減少:げんしょう]が[深刻化:しんこくか]している。",
        "textId": "Berbanding terbalik dengan populasi perkotaan yang terus bertambah, di daerah pelosok penurunan jumlah generasi muda kian memprihatinkan.",
        "contextNote": "Perbandingan tren demografi antara kota vs desa."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜反面 (はんめん)",
        "summary": "反面 = Membandingkan dua sisi positif & negatif dari SATU subjek yang sama.",
        "distinctionId": "「に対して」 membandingkan dua subjek berbeda (si A vs si B). Sedangkan 「反面」 membedah dua sifat berlawanan dari benda/hal yang sama (kemudahan vs risikonya)."
      }
    ],
    "questions": [
      {
        "id": "q-b04-01",
        "type": "cloze",
        "questionNumber": 13,
        "questionJp": "昨日は大雨だったの（　　）、今日は雲ひとつない快晴だ。",
        "questionRuby": "[昨日:きのう]は[大雨:おおあめ]だったの（　　）、[今日:きょう]は[雲:くも]ひとつない[快晴:かいせい]だ。",
        "questionTranslation": "Berbanding terbalik dengan kemarin yang hujan lebat, hari ini cuaca cerah tanpa segumpal awan pun.",
        "options": [
          {
            "key": "1",
            "textJp": "に対して",
            "textId": "Berbanding terbalik / kontras"
          },
          {
            "key": "2",
            "textJp": "おかげで",
            "textId": "Berkat"
          },
          {
            "key": "3",
            "textJp": "最中に",
            "textId": "Tepat di tengah"
          },
          {
            "key": "4",
            "textJp": "とおりに",
            "textId": "Sesuai dengan"
          }
        ],
        "correctKey": "1",
        "explanation": "Dua hari yang berbeda (kemarin vs hari ini) dengan kondisi cuaca yang saling bertolak belakang diperbandingkan secara tajam, maka menggunakan 『〜に対して』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第5課: 範囲・起点・終点 (Rentang & Batas Lingkup)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b05-kara-nikakete",
    "chapterNumber": 5,
    "chapterTitle": "第5課: 範囲・起点・終点 (Rentang & Batas Lingkup)",
    "category": "limitation",
    "categoryLabel": "範囲・限定",
    "patternJp": "〜から〜にかけて",
    "patternKana": "からにかけると",
    "meaningId": "Dari... membentang hingga sekitar... (rentang waktu / wilayah fleksibel)",
    "connection": "名詞 ＋ から ＋ 名詞 ＋ にかけて",
    "coreConcept": "Menunjukkan rentang waktu kejadian atau jangkauan wilayah geografis secara garis besar dan berkelanjutan, di mana batas akhirnya bersifat perkiraan atau samar (gradual), bukan titik batas mati yang tajam.",
    "cautionNote": "Berbeda dengan 『〜から〜まで』. Kalau 『まで』 titik akhirnya jelas dan tegas (cth: jam 9 sampai tepat jam 17). 『にかけて』 dipakai untuk cuaca, musim, atau wilayah luas yang transisinya bertahap.",
    "examples": [
      {
        "id": "ex-kake-1",
        "textJp": "昨夜から今朝にかけて、関東地方に大雨が降り続いた。",
        "ruby": "[昨夜:ゆうべ]から[今朝:けさ]にかけて、[関東地方:かんとうちほう]に[大雨:おおあめ]が[降:ふ]り[続:つづ]いた。",
        "textId": "Dari tadi malam hingga menjelang pagi ini, hujan deras terus mengguyur wilayah Kanto.",
        "contextNote": "Rentang waktu cuaca yang transisinya tidak kaku."
      },
      {
        "id": "ex-kake-2",
        "textJp": "春から初夏にかけては、新しい生活を始める人が多い季節だ。",
        "ruby": "[春:はる]から[初夏:しょか]にかけては、[新:あたら]しい[生活:せいかつ]を[始:はじ]める[人:ひと]が[多:おお]い[季節:きせつ]だ。",
        "textId": "Dari musim semi hingga sekitar awal musim panas adalah musim di mana banyak orang memulai babak kehidupan baru.",
        "contextNote": "Rentang musim yang menyatu secara berkesinambungan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜から〜まで (titik akhir pasti)",
        "summary": "まで = titik akhir tegas, ada garis batas yang pasti.",
        "distinctionId": "『〜にかけて』 titik akhirnya tidak tegas, meliputi peralihan kondisi atau hamparan wilayah secara merata."
      }
    ],
    "questions": [
      {
        "id": "q-b05-04",
        "type": "seiretsu",
        "questionNumber": 14,
        "questionJp": "九州地方では　＿＿　＿＿　★　＿＿　強い風と雨への警戒が必要だ。",
        "questionRuby": "[九州地方:きゅうしゅうちほう]では　＿＿　＿＿　★　＿＿　[強:つよ]い[風:かぜ]と[雨:あめ]への[警戒:けいかい]が[必要:ひつよう]だ。",
        "questionTranslation": "Di wilayah Kyushu, diperlukan kewaspadaan terhadap angin kencang dan hujan lebat dari malam ini hingga sekitar besok pagi.",
        "items": [
          "今夜から",
          "明日の朝",
          "にかけて",
          "沿岸部で"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『九州地方では [今夜から] [明日の朝] [にかけて] [沿岸部で] 強い風と雨への警戒が必要だ』. Kata di posisi bintang (★) adalah 『にかけて』."
      }
    ]
  },

  {
    "id": "n3-b05-ni-oite",
    "chapterNumber": 5,
    "chapterTitle": "第5課: 範囲・起点・終点 (Rentang & Batas Lingkup)",
    "category": "limitation",
    "categoryLabel": "範囲・限定",
    "patternJp": "〜において / 〜における",
    "patternKana": "において / における",
    "meaningId": "Di / pada... (ragam formal: lokasi, era, atau bidang spesifik)",
    "connection": "名詞 ＋ において\n名詞 ＋ における ＋ 名詞",
    "coreConcept": "Merupakan bentuk tulisan dan formal dari partikel 『で』. Menunjukkan tempat pelaksanaan acara/upacara, latar era waktu sejarah, atau ranah/bidang ilmu spesifik.",
    "cautionNote": "Biasa dipakai dalam dokumen resmi, berita koran, pidato, atau karya ilmiah. Jarang dipakai dalam percakapan akrab sehari-hari.",
    "examples": [
      {
        "id": "ex-oite-1",
        "textJp": "令和八年度の入学式は、大学の大講堂において執り行われます。",
        "ruby": "[令和八年度:れいわはちねんど]の[入学式:にゅうがくしき]は、[大学:だいがく]の[大講堂:だいこうどう]において[執:と]り[行:おこな]われます。",
        "textId": "Upacara penerimaan mahasiswa baru tahun akademik Reiwa 8 akan diselenggarakan di Aula Utama universitas.",
        "contextNote": "Tempat resmi pelaksanaan upacara akademik."
      },
      {
        "id": "ex-oite-2",
        "textJp": "現代社会におけるIT技術の発展は、私たちの暮らしを根底から変えた。",
        "ruby": "[現代社会:げんだいしゃかい]におけるIT[技術:ぎじゅつ]の[発展:はってん]は、[私:わたし]たちの[暮:く]らしを[根底:こんてい]から[変:か]えた。",
        "textId": "Perkembangan teknologi IT di tengah masyarakat modern telah mengubah kehidupan kita secara mendasar.",
        "contextNote": "Modifikasi kata benda: 'di dalam masyarakat modern'."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜で (ragam kasual)",
        "summary": "で = partikel lokasi/kondisi biasa.",
        "distinctionId": "『〜において』 adalah register formal/resmi untuk pidato, berita, dan penulisan ilmiah."
      }
    ],
    "questions": [
      {
        "id": "q-b05-05",
        "type": "cloze",
        "questionNumber": 15,
        "questionJp": "国際社会（　　）日本の役割について、議論が交わされた。",
        "questionRuby": "[国際社会:こくさいしゃかい]（　　）[日本:にほん]の[役割:やくわり]について、[議論:ぎろん]が[交:か]わされた。",
        "questionTranslation": "Diskusi diadakan mengenai peranan Jepang di panggung masyarakat internasional.",
        "options": [
          {
            "key": "1",
            "textJp": "における",
            "textId": "Di / pada... (modifikasi kata benda)"
          },
          {
            "key": "2",
            "textJp": "にかけて",
            "textId": "Membentang sampai..."
          },
          {
            "key": "3",
            "textJp": "に反して",
            "textId": "Berlawanan dengan..."
          },
          {
            "key": "4",
            "textJp": "につれて",
            "textId": "Seiring dengan..."
          }
        ],
        "correctKey": "1",
        "explanation": "Kalimat membutuhkan modifikasi kata benda sebelum 『日本の役割』 dalam konteks formal internasional. Bentuk yang tepat adalah 『名詞 ＋ における ＋ 名詞』."
      }
    ]
  },

  {
    "id": "n3-b05-wo-hajime",
    "chapterNumber": 5,
    "chapterTitle": "第5課: 範囲・起点・終点 (Rentang & Batas Lingkup)",
    "category": "limitation",
    "categoryLabel": "範囲・限定",
    "patternJp": "〜をはじめ / 〜をはじめとする",
    "patternKana": "をはじめ",
    "meaningId": "Mulai dari... (sebagai contoh utama / perwakilan terpenting)",
    "connection": "名詞 ＋ をはじめ（として）\n名詞 ＋ をはじめとする ＋ 名詞",
    "coreConcept": "Digunakan untuk mengangkat satu contoh paling utama, populer, atau representatif dalam suatu kelompok, kemudian diikuti hal-hal lain yang masuk dalam kelompok tersebut.",
    "cautionNote": "Hal yang diletakkan sebelum 『をはじめ』 haruslah figur/objek yang paling penting atau paling representatif di antara yang lain, bukan hal minor atau sepele.",
    "examples": [
      {
        "id": "ex-hajime-1",
        "textJp": "東京タワーをはじめ、東京には魅力的な観光地がたくさん集まっている。",
        "ruby": "[東京:とうきょう]タワーをはじめ、[東京:とうきょう]には[魅力的:みりょくてき]な[観光地:かんこうち]がたくさん[集:あつ]まっている。",
        "textId": "Mulai dari Menara Tokyo sebagai ikon utama, di Tokyo berkumpul banyak sekali destinasi wisata yang memikat.",
        "contextNote": "Tokyo Tower sebagai representasi utama destinasi wisata."
      },
      {
        "id": "ex-hajime-2",
        "textJp": "校長先生をはじめとする先生方のご指導に、心より感謝申し上げます。",
        "ruby": "[校長先生:こうちょうせんせい]をはじめとする[先生方:せんせいがた]のご[指導:しどう]に、[心:こころ]より[感謝:かんしゃ][申:もう]し[上:あ]げます。",
        "textId": "Mulai dari Bapak Kepala Sekolah hingga seluruh jajaran guru, kami mengucapkan terima kasih dari lubuk hati terdalam atas bimbingannya.",
        "contextNote": "Ragam formal/pidato kelulusan dengan Kepala Sekolah sebagai representasi pimpinan."
      },
      {
        "id": "ex-hajime-3",
        "textJp": "日本のアニメは、アジアをはじめ世界中で親しまれている。",
        "ruby": "[日本:にほん]のアニメは、アジアをはじめ[世界中:せかいじゅう]で[親:した]しまれている。",
        "textId": "Anime Jepang digemari di seluruh dunia, dimulai dari Asia sebagai kawasan pertama dan terbesar.",
        "contextNote": "Asia sebagai wilayah perwakilan utama penerima anime."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜など (等)",
        "summary": "など = menyebutkan contoh secara kasual tanpa menonjolkan mana yang nomor satu.",
        "distinctionId": "『〜をはじめ』 secara eksplisit mengangkat contoh nomor satu atau paling berpengaruh sebagai lokomotif kelompok."
      }
    ],
    "questions": [
      {
        "id": "q-b05-01",
        "type": "cloze",
        "questionNumber": 16,
        "questionJp": "富士山（　　）、日本には美しい自然景観が多い。",
        "questionRuby": "[富士山:ふじさん]（　　）、[日本:にほん]には[美:うつく]しい[自然景観:しぜんけいかん]が[多:おお]い。",
        "questionTranslation": "Mulai dari Gunung Fuji sebagai ikon utama, di Jepang ada banyak bentang alam yang indah.",
        "options": [
          {
            "key": "1",
            "textJp": "をはじめ",
            "textId": "Mulai dari... (contoh utama)"
          },
          {
            "key": "2",
            "textJp": "をめぐって",
            "textId": "Memperebutkan / mengenai..."
          },
          {
            "key": "3",
            "textJp": "にかけて",
            "textId": "Membentang sampai..."
          },
          {
            "key": "4",
            "textJp": "に沿って",
            "textId": "Sepanjang jalan / sesuai aturan..."
          }
        ],
        "correctKey": "1",
        "explanation": "Gunung Fuji adalah contoh representatif utama dari bentang alam Jepang. Pola yang mengangkat contoh nomor satu adalah 『名詞 ＋ をはじめ』."
      },
      {
        "id": "q-b05-02",
        "type": "seiretsu",
        "questionNumber": 17,
        "questionJp": "この展示会では　＿＿　＿＿　★　＿＿　先端ロボットが一堂に会している。",
        "questionRuby": "この[展示会:てんじかい]では　＿＿　＿＿　★　＿＿　[先端:せんたん]ロボットが[一堂:いちどう]に[会:かい]している。",
        "questionTranslation": "Di pameran ini, robot-robot canggih berkumpul di satu tempat, dimulai dari robot humanoid sebagai primadona utama.",
        "items": [
          "人型ロボット",
          "をはじめとする",
          "国内外の",
          "多彩な"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『この展示会では [人型ロボット] [をはじめとする] [国内外の] [多彩な] 先端ロボットが一堂に会している』. Kata di posisi bintang (★) adalah 『国内外の』."
      }
    ]
  },

  {
    "id": "n3-b05-wo-megutte",
    "chapterNumber": 5,
    "chapterTitle": "第5課: 範囲・起点・終点 (Rentang & Batas Lingkup)",
    "category": "limitation",
    "categoryLabel": "範囲・限定",
    "patternJp": "〜をめぐって / 〜をめぐる",
    "patternKana": "をめぐって / をめぐる",
    "meaningId": "Memperdebatkan / Memperebutkan seputar... (topik sengketa atau pertikaian pihak)",
    "connection": "名詞 ＋ をめぐって\n名詞 ＋ をめぐる ＋ 名詞",
    "coreConcept": "Digunakan ketika terjadi perdebatan sengit, pertikaian pendapat, atau perebutan di antara banyak pihak seputar satu masalah kontroversial atau objek bernilai.",
    "cautionNote": "Harus melibatkan dinamika banyak orang atau dua pihak yang berselisih. Kalimat belakang biasanya berupa kata kerja seperti: 議論する (berdebat), 対立する (berseteru), 争う (memperebutkan).",
    "examples": [
      {
        "id": "ex-megu-1",
        "textJp": "新工場の建設予定地をめぐって、住民と行政の間で激しい議論が続いている。",
        "ruby": "[新工場:しんこうじょう]の[建設予定地:けんせつよていち]をめぐって、[住民:じゅうみん]と[行政:ぎょうせい]の[間:あいだ]で[激:はげ]しい[議論:ぎろん]が[続:つづ]いている。",
        "textId": "Seputar lokasi rencana pembangunan pabrik baru, perdebatan sengit terus berlangsung antara warga dan pihak dinas pemerintah.",
        "contextNote": "Perselisihan dua kubu (warga vs pemerintah)."
      },
      {
        "id": "ex-megu-2",
        "textJp": "遺産の配分をめぐる親族間の争いは、裁判所に持ち込まれた。",
        "ruby": "[遺産:いさん]の[配分:はいぶん]をめぐる[親族間:しんぞくかん]の[争:あらそ]いは、[裁判所:さいばんしょ]に[持:も]ち[込:こ]まれた。",
        "textId": "Sengketa antar kerabat keluarga seputar pembagian harta warisan akhirnya dibawa ke pengadilan.",
        "contextNote": "Modifikasi kata benda: 'sengketa seputar pembagian warisan'."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜について (mengenai topik)",
        "summary": "について = membicarakan atau meneliti topik secara umum dan netral.",
        "distinctionId": "『〜をめぐって』 selalu mengandung konotasi konflik, perselisihan, atau perdebatan beragam kubu."
      }
    ],
    "questions": [
      {
        "id": "q-b05-06",
        "type": "cloze",
        "questionNumber": 18,
        "questionJp": "安全基準の改定（　　）、有識者たちの意見が対立している。",
        "questionRuby": "[安全基準:あんぜんきじゅん]の[改定:かいてい]（　　）、[有識者:ゆうしきしゃ]たちの[意見:いけん]が[対立:たいりつ]している。",
        "questionTranslation": "Seputar revisi standar keselamatan, pendapat para pakar ahli saling berseberangan.",
        "options": [
          {
            "key": "1",
            "textJp": "をめぐって",
            "textId": "Seputar perdebatan..."
          },
          {
            "key": "2",
            "textJp": "をとおして",
            "textId": "Melalui perantara..."
          },
          {
            "key": "3",
            "textJp": "にかけて",
            "textId": "Membentang sampai..."
          },
          {
            "key": "4",
            "textJp": "反面",
            "textId": "Di sisi lain sebaliknya..."
          }
        ],
        "correctKey": "1",
        "explanation": "Terdapat silang pendapat dan perseteruan para pakar ahli (意見が対立している). Pola yang menandai topik perdebatan sengit adalah 『〜をめぐって』."
      }
    ]
  },

  {
    "id": "n3-b05-wo-tsuujite",
    "chapterNumber": 5,
    "chapterTitle": "第5課: 範囲・起点・終点 (Rentang & Batas Lingkup)",
    "category": "limitation",
    "categoryLabel": "範囲・限定",
    "patternJp": "〜を通じて / 〜を通して",
    "patternKana": "をつうじて / をとおして",
    "meaningId": "1) Sepanjang waktu... / 2) Melalui perantara...",
    "connection": "名詞 ＋ を通じて / を通して\n名詞 ＋ を通じた / を通した ＋ 名詞",
    "coreConcept": "Memiliki 2 fungsi utama: 1) Menyatakan seluruh periode waktu tanpa henti (misal: sepanjang tahun). 2) Menyatakan sarana atau perantara pihak ketiga untuk memperoleh informasi/hubungan (misal: lewat teman, melalui internet).",
    "cautionNote": "Bila dipakai untuk arti 'sarana perantara', tidak bisa digunakan untuk alat langsung yang dipegang tangan (tidak bisa: ペンを通して手紙を書く ✕, harus ペンで ○).",
    "examples": [
      {
        "id": "ex-tsuu-1",
        "textJp": "沖縄は一年を通じて温暖な気候で、観光客に人気がある。",
        "ruby": "[沖縄:おきなわ]は[一年:いちねん]を[通:つう]じて[温暖:おんだん]な[気候:きこう]で、[観光客:かんこうきゃく]に[人気:にんき]がある。",
        "textId": "Okinawa beriklim hangat sepanjang tahun, menjadikannya sangat populer di kalangan wisatawan.",
        "contextNote": "Arti 1: Rentang waktu kontinu selama satu tahun penuh."
      },
      {
        "id": "ex-tsuu-2",
        "textJp": "ボランティア活動を通して、多くの貴重な友人に出会うことができた。",
        "ruby": "ボランティア[活動:かつどう]を[通:とお]して、[多:おお]くの[貴重:きちょう]な[友人:ゆうじん]に[出会:であ]うことができた。",
        "textId": "Melalui perantara kegiatan sukarelawan, saya berkesempatan bertemu banyak sahabat berharga.",
        "contextNote": "Arti 2: Media/kegiatan yang menjadi perantara hubungan sosial."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜によって (sarana langsung)",
        "summary": "によって = cara atau metode teknis pelaksanaan.",
        "distinctionId": "『〜を通して / を通じて』 menekankan perantara (medium) atau pengalaman yang menjadi jembatan proses."
      }
    ],
    "questions": [
      {
        "id": "q-b05-03",
        "type": "cloze",
        "questionNumber": 19,
        "questionJp": "共通の趣味（　　）、二人はすぐに親しくなった。",
        "questionRuby": "[共通:きょうつう]の[趣味:しゅみ]（　　）、[二人:ふたり]はすぐに[親:した]しくなった。",
        "questionTranslation": "Melalui perantara hobi yang sama, keduanya lekas menjadi akrab.",
        "options": [
          {
            "key": "1",
            "textJp": "を通して",
            "textId": "Melalui perantara..."
          },
          {
            "key": "2",
            "textJp": "に沿って",
            "textId": "Sepanjang pedoman..."
          },
          {
            "key": "3",
            "textJp": "に基づいて",
            "textId": "Berdasarkan acuan..."
          },
          {
            "key": "4",
            "textJp": "をこめて",
            "textId": "Sepenuh hati..."
          }
        ],
        "correctKey": "1",
        "explanation": "Hobi yang sama bertindak sebagai perantara atau medium kedekatan mereka. Pola yang tepat adalah 『〜を通して』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第6課: 視点・立場・基準 (Sudut Pandang & Tolok Ukur)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b06-ni-shite-wa",
    "chapterNumber": 6,
    "chapterTitle": "第6課: 視点・立場・基準 (Sudut Pandang & Tolok Ukur)",
    "category": "judgment",
    "categoryLabel": "視点・判断",
    "patternJp": "〜にしては",
    "patternKana": "にしては",
    "meaningId": "Untuk ukuran... (fakta konkret tertentu yang menyimpang dari gambaran umum)",
    "connection": "動詞・イ形容詞・ナ形容詞普通形 ＋ にしては\n名詞（だ を省く） ＋ にしては",
    "coreConcept": "Dipakai ketika ada fakta atau angka konkret yang disebutkan, lalu bagian belakangnya menghasilkan fakta nyata yang tidak cocok atau menyimpang dari citra standar fakta tersebut.",
    "cautionNote": "Perhatikan sambungannya pada kata benda: langsung tanpa partikel 『の』 (cth: 子どもにしては ○, 子どものにしては ✕).",
    "examples": [
      {
        "id": "ex-shite-wa-1",
        "textJp": "彼は日本に来てまだ三か月にしては、日本語が流暢で驚かされる。",
        "ruby": "[彼:かれ]は[日本:にほん]に[来:き]てまだ[三:さん]か[月:げつ]にしては、[日本語:にほんご]が[流暢:りゅうちょう]で[驚:おどろ]かされる。",
        "textId": "Untuk ukuran orang yang baru tiga bulan tiba di Jepang, bahasa Jepangnya begitu fasih sampai membuat tercengang.",
        "contextNote": "Fakta konkret '3 bulan' vs kefasihan yang jauh melampaui standar 3 bulan."
      },
      {
        "id": "ex-shite-wa-2",
        "textJp": "今日は真冬にしては日差しが暖かく、過ごしやすい一日だ。",
        "ruby": "[今日:きょう]は[真冬:まふゆ]にしては[日差:ひざ]しが[暖:あたた]かく、[過:す]ごしやすい[一日:いちにち]だ。",
        "textId": "Hari ini untuk ukuran tengah musim dingin, sinar mataharinya hangat dan nyaman dihabiskan.",
        "contextNote": "Kondisi hangat yang aneh untuk ukuran tengah musim dingin."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜わりに（は）",
        "summary": "わりに = menyambung ke kata benda pakai 『の』 (名詞+の+わりに).",
        "distinctionId": "『〜にしては』 langsung menempel ke kata benda tanpa partikel: 『子どものわりに』 vs 『子どもにしては』."
      }
    ],
    "questions": [
      {
        "id": "q-b06-04",
        "type": "cloze",
        "questionNumber": 20,
        "questionJp": "この絵は、小学生が描いた（　　）とても立体感がある。",
        "questionRuby": "この[絵:え]は、[小学生:しょうがくせい]が[描:か]いた（　　）とても[立体感:りったいかん]がある。",
        "questionTranslation": "Lukisan ini untuk ukuran digambar oleh anak SD, sangat terasa dimensi 3D-nya.",
        "options": [
          {
            "key": "1",
            "textJp": "にしては",
            "textId": "Untuk ukuran fakta konkret..."
          },
          {
            "key": "2",
            "textJp": "において",
            "textId": "Di dalam bidang..."
          },
          {
            "key": "3",
            "textJp": "反面",
            "textId": "Namun di sisi lain..."
          },
          {
            "key": "4",
            "textJp": "せいか",
            "textId": "Mungkin karena gara-gara..."
          }
        ],
        "correctKey": "1",
        "explanation": "Kalimat menyatakan kekaguman terhadap lukisan yang dibuat anak SD karena kualitasnya melampaui kemampuan standar anak SD. Pola yang tepat adalah 『〜にしては』."
      }
    ]
  },

  {
    "id": "n3-b06-ni-totte",
    "chapterNumber": 6,
    "chapterTitle": "第6課: 視点・立場・基準 (Sudut Pandang & Tolok Ukur)",
    "category": "judgment",
    "categoryLabel": "視点・判断",
    "patternJp": "〜にとって / 〜にとっても",
    "patternKana": "にとって",
    "meaningId": "Bagi... (ditinjau dari sudut pandang / posisi subjek tertentu)",
    "connection": "名詞 ＋ にとって / にとっても / にとっての ＋ 名詞",
    "coreConcept": "Dipakai untuk menyatakan suatu penilaian, derajat pentingnya sesuatu, atau sikap bila dipandang dari kacamata/posisi subjek (orang/organisasi) tersebut.",
    "cautionNote": "Bagian belakang kalimat berupa penilaian (penting, sulit, berharga, dll.). Tidak boleh diikuti kalimat aksi kehendak pembicara (misal: 私にとって勉強する ✕).",
    "examples": [
      {
        "id": "ex-totte-1",
        "textJp": "現代の若者にとって、スマートフォンは手放せない生活必需品だ。",
        "ruby": "[現代:げんだい]の[若者:わかもの]にとって、スマートフォンは[手放:てばな]せない[生活必需品:せいかつひつじゅひん]だ。",
        "textId": "Bagi kalangan muda zaman sekarang, ponsel pintar adalah kebutuhan pokok yang tak bisa lepas dari genggaman.",
        "contextNote": "Sudut pandang spesifik pemuda modern."
      },
      {
        "id": "ex-totte-2",
        "textJp": "誰にとっても、家族と過ごす穏やかな時間はかけがえのない宝物である。",
        "ruby": "[誰:だれ]にとっても、[家族:かぞく]と[過:す]ごす[穏:おだ]やかな[時間:じかん]はかけがえのない[宝物:たからもの]である。",
        "textId": "Bagi siapa pun juga, waktu damai yang dihabiskan bersama keluarga adalah harta tak ternilai.",
        "contextNote": "Ditinjau dari kacamata manusia mana pun."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜に対して (arah objek sikap)",
        "summary": "に対して = sasaran target sikap atau tindakan (ramah kepada seseorang).",
        "distinctionId": "『〜にとって』 fokus pada posisi penilaian si subjek (apakah hal itu berharga/sulit menurut sudut pandangnya)."
      }
    ],
    "questions": [
      {
        "id": "q-b06-01",
        "type": "cloze",
        "questionNumber": 21,
        "questionJp": "留学生（　　）、日本の物価の高さは大きな悩みの一つだ。",
        "questionRuby": "[留学生:りゅうがくせい]（　　）、[日本:にほん]の[物価:ぶっか]の[高:たか]さは[大:おお]きな[悩:なや]みの[一:ひと]つだ。",
        "questionTranslation": "Bagi mahasiswa asing, tingginya biaya hidup di Jepang adalah salah satu kekhawatiran terbesar.",
        "options": [
          {
            "key": "1",
            "textJp": "にとって",
            "textId": "Bagi sudut pandang..."
          },
          {
            "key": "2",
            "textJp": "に関して",
            "textId": "Mengenai topik..."
          },
          {
            "key": "3",
            "textJp": "に応じて",
            "textId": "Sesuai dengan kapasitas..."
          },
          {
            "key": "4",
            "textJp": "に沿って",
            "textId": "Mengikuti alur..."
          }
        ],
        "correctKey": "1",
        "explanation": "Kalimat menyatakan sudut pandang evaluasi mahasiswa asing terhadap tingginya harga. Pola yang tepat adalah 『名詞 ＋ にとって』."
      }
    ]
  },

  {
    "id": "n3-b06-to-shite",
    "chapterNumber": 6,
    "chapterTitle": "第6課: 視点・立場・基準 (Sudut Pandang & Tolok Ukur)",
    "category": "judgment",
    "categoryLabel": "視点・判断",
    "patternJp": "〜として / 〜としては / 〜としても",
    "patternKana": "として",
    "meaningId": "Sebagai... (dalam status, kapasitas, atau peran resmi)",
    "connection": "名詞 ＋ として / としては / としても / としての ＋ 名詞",
    "coreConcept": "Menunjukkan kualifikasi, kapasitas, kedudukan resmi, peran kerja, atau fungsi dari subjek/objek saat melakukan sesuatu.",
    "cautionNote": "Selalu menempel langsung pada kata benda yang mendefinisikan peran status tersebut (misal: dokter, perwakilan, cendera mata).",
    "examples": [
      {
        "id": "ex-shite-1",
        "textJp": "彼はエンジニアとして、チームのシステム設計を統括している。",
        "ruby": "[彼:かれ]はエンジニアとして、チームのシステム[設計:せっけい]を[統括:とうかつ]している。",
        "textId": "Dia, dalam kapasitasnya sebagai seorang engineer, memimpin seluruh perancangan sistem tim.",
        "contextNote": "Peran profesi resmi dalam tim kerja."
      },
      {
        "id": "ex-shite-2",
        "textJp": "日本代表として世界大会に出場することは、子どもの頃からの夢だった。",
        "ruby": "[日本代表:にほんだいひょう]として[世界大会:せかいたいかい]に[出場:しゅつじょう]することは、[子:こ]どもの[頃:ころ]からの[夢:ゆめ]だった。",
        "textId": "Tampil di turnamen dunia sebagai perwakilan Jepang adalah impiannya sejak masa kanak-kanak.",
        "contextNote": "Kualifikasi dan kehormatan status perwakilan negara."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜にとって (sudut pandang)",
        "summary": "にとって = dari kacamata/sudut pandang penilaian subjek.",
        "distinctionId": "『〜として』 menunjukkan posisi atau peran status tindakan (sebagai dokter, sebagai orang tua)."
      }
    ],
    "questions": [
      {
        "id": "q-b06-02",
        "type": "seiretsu",
        "questionNumber": 22,
        "questionJp": "私は　＿＿　＿＿　★　＿＿　このプロジェクトに全力を尽くす覚悟だ。",
        "questionRuby": "[私:わたし]は　＿＿　＿＿　★　＿＿　このプロジェクトに[全力:ぜんりょく]を[尽:つ]くす[覚悟:かくご]だ。",
        "questionTranslation": "Saya bertekad mengerahkan segenap tenaga untuk proyek ini dalam kapasitas saya sebagai penanggung jawab.",
        "items": [
          "リーダーとしての",
          "自覚を持ち",
          "チームの",
          "責任者として"
        ],
        "correctOrder": [
          2,
          0,
          1,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『私は [チームの] [リーダーとしての] [自覚を持ち] [責任者として] このプロジェクトに全力を尽くす覚悟だ』. Kata di posisi bintang (★) adalah 『自覚を持ち』."
      }
    ]
  },

  {
    "id": "n3-b06-wari-ni",
    "chapterNumber": 6,
    "chapterTitle": "第6課: 視点・立場・基準 (Sudut Pandang & Tolok Ukur)",
    "category": "judgment",
    "categoryLabel": "視点・判断",
    "patternJp": "〜わりに（は）",
    "patternKana": "わりには",
    "meaningId": "Mengingat... / Untuk ukuran... padahal ekspektasinya berbeda (ketidakseimbangan)",
    "connection": "動詞・イ形容詞普通形 ＋ わりに（は）\nナ形容詞＋な ＋ わりに（は）\n名詞＋の ＋ わりに（は）",
    "coreConcept": "Dipakai ketika hasil atau kenyataan yang terjadi tidak seimbang dengan tolok ukur/alasan awal (misal: harganya murah TAPI rasanya luar biasa enak; atau usianya masih muda TAPI penampilannya tua).",
    "cautionNote": "Digunakan untuk rentang luas (harga, usia, usaha). Berbeda dengan 『〜にしては』 yang harus mengacu pada angka atau fakta sangat spesifik.",
    "examples": [
      {
        "id": "ex-wari-1",
        "textJp": "この定食は値段が安いわりに、ボリュームがあって味も素晴らしい。",
        "ruby": "この[定食:ていしょく]は[値段:ねだん]が[安:やす]いわりに、ボリュームがあって[味:あじ]も[素晴:すば]らしい。",
        "textId": "Paket makan ini untuk ukuran harganya yang murah, porsinya berlimpah dan rasanya lezat luar biasa.",
        "contextNote": "Ketidakseimbangan positif: murah tapi kualitas melebihi ekspektasi standar."
      },
      {
        "id": "ex-wari-2",
        "textJp": "彼はあまり勉強しなかったわりには、試験で高得点を取った。",
        "ruby": "[彼:かれ]はあまり[勉強:べんきょう]しなかったわりには、[試験:しけん]で[高得点:こうとくてん]を[取:と]った。",
        "textId": "Mengingat dia tidak banyak belajar, dia malah meraih skor tinggi di ujian.",
        "contextNote": "Kenyataan kontras dengan sedikitnya usaha belajar."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜にしては (fakta konkret)",
        "summary": "にしては = menempel pada fakta konkret tertentu (cth: 2月にしては hangat).",
        "distinctionId": "『〜わりに』 bisa menempel pada kata sifat abstrak (harga murah, banyak latihan), sedangkan 『にしては』 menempel pada nama/fakta konkret."
      }
    ],
    "questions": [
      {
        "id": "q-b06-03",
        "type": "cloze",
        "questionNumber": 23,
        "questionJp": "祖父は75歳という年齢の（　　）、足腰が丈夫で毎日散歩している。",
        "questionRuby": "[祖父:そふ]は75[歳:さい]という[年齢:ねんれい]の（　　）、[足腰:あしこし]が[丈夫:じょうぶ]で[毎日:まいにち][散歩:さんぽ]している。",
        "questionTranslation": "Kakek untuk ukuran usianya yang 75 tahun, fisik kakinya masih sangat bugar dan rajin jalan kaki tiap hari.",
        "options": [
          {
            "key": "1",
            "textJp": "わりに",
            "textId": "Untuk ukuran / mengingat... (kata benda + の)"
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Di sisi lain sebaliknya..."
          },
          {
            "key": "3",
            "textJp": "ために",
            "textId": "Demi / karena..."
          },
          {
            "key": "4",
            "textJp": "とおりに",
            "textId": "Sesuai persis dengan..."
          }
        ],
        "correctKey": "1",
        "explanation": "Bentuk sambungan pada kata benda adalah 『名詞 ＋ の ＋ わりに』. Kalimat menyatakan kondisi kakek jauh lebih prima daripada ekspektasi umum usia 75 tahun."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第7課: 限定・付加・程度 (Batasan, Tambahan & Tingkatan)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b07-bakari-ka",
    "chapterNumber": 7,
    "chapterTitle": "第7課: 限定・付加・程度 (Batasan, Tambahan & Tingkatan)",
    "category": "degree",
    "categoryLabel": "程度・付加",
    "patternJp": "〜ばかりか / 〜ばかりでなく",
    "patternKana": "ばかりか / ばかりでなく",
    "meaningId": "Bukan hanya... bahkan juga... (menambah informasi yang lebih mengejutkan)",
    "connection": "名詞 ＋ ばかりか / ばかりでなく\n普通形（ナ形＋な / である、名＋である） ＋ ばかりか",
    "coreConcept": "Menyatakan bahwa tidak hanya hal pertama yang terjadi, tetapi bahkan ditambah lagi dengan hal kedua yang derajatnya lebih besar atau tak terduga (bisa positif ganda, atau negatif ganda).",
    "cautionNote": "Kalimat belakang sering kali dipertegas dengan partikel 『も』, 『まで』, atau 『さえ』 (misal: 漢字ばかりかひらがなさえ読めない).",
    "examples": [
      {
        "id": "ex-bakari-1",
        "textJp": "彼は日本語ばかりか、中国語やフランス語も流暢に操るマルチリンガルだ。",
        "ruby": "[彼:かれ]は[日本語:にほんご]ばかりか、[中国語:ちゅうごくご]やフランス[語:ご]も[流暢:りゅうちょう]に[操:あやつ]るマルチリンガルだ。",
        "textId": "Dia bukan hanya bahasa Jepang saja, bahkan juga mahir bertutur lancar bahasa Mandarin dan Prancis sebagai seorang poliglot.",
        "contextNote": "Tambahan impresif positif yang bertingkat."
      },
      {
        "id": "ex-bakari-2",
        "textJp": "台風のせいで電車が止まったばかりか、停電まで起きて大変な夜だった。",
        "ruby": "[台風:たいふう]のせいで[電車:でんしゃ]が[止:と]まったばかりか、[停電:ていでん]まで[起:お]きて[大変:たいへん]な[夜:よる]だった。",
        "textId": "Gara-gara topan bukan hanya kereta yang berhenti beroperasi, bahkan pemadaman listrik pun turut terjadi, sungguh malam yang kacau.",
        "contextNote": "Rentetan kemalangan bertubi-tubi (negatif ganda)."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜だけでなく (tidak hanya)",
        "summary": "だけでなく = menyatakan penambahan secara umum tanpa efek kaget.",
        "distinctionId": "『〜ばかりか』 memiliki nuansa emosional penutur yang lebih kuat bahwa fakta kedua jauh melampaui perkiraan awal."
      }
    ],
    "questions": [
      {
        "id": "q-b07-01",
        "type": "cloze",
        "questionNumber": 24,
        "questionJp": "その新薬は病気を治す（　　）、副作用も全く報告されていない。",
        "questionRuby": "その[新薬:しんやく]は[病気:びょうき]を[治:なお]す（　　）、[副作用:ふくさよう]も[全:まった]く[報告:ほうこく]されていない。",
        "questionTranslation": "Obat baru itu bukan hanya menyembuhkan penyakit, bahkan efek sampingnya pun sama sekali belum dilaporkan.",
        "options": [
          {
            "key": "1",
            "textJp": "ばかりか",
            "textId": "Bukan hanya... bahkan juga..."
          },
          {
            "key": "2",
            "textJp": "せいで",
            "textId": "Gara-gara..."
          },
          {
            "key": "3",
            "textJp": "わりに",
            "textId": "Untuk ukuran..."
          },
          {
            "key": "4",
            "textJp": "あまり",
            "textId": "Saking terlampau..."
          }
        ],
        "correctKey": "1",
        "explanation": "Kalimat menambahkan keunggulan kedua yang luar biasa dengan partikel 『も』 di belakang. Pola yang tepat adalah 『〜ばかりか』."
      }
    ]
  },

  {
    "id": "n3-b07-kurai-hodo",
    "chapterNumber": 7,
    "chapterTitle": "第7課: 限定・付加・程度 (Batasan, Tambahan & Tingkatan)",
    "category": "degree",
    "categoryLabel": "程度・付加",
    "patternJp": "〜くらい / 〜ほど",
    "patternKana": "くらい / ほど",
    "meaningId": "Sampai-sampai / Seukuran tingkat ekstrem...",
    "connection": "動詞辞書形 / V-ない形 ＋ くらい / ほど\nイ形・ナ形＋な ＋ くらい / ほど\n名詞 ＋ くらい / ほど",
    "coreConcept": "Digunakan sebagai perumpamaan untuk melukiskan betapa tingginya intensitas perasaan atau keadaan sampai pada suatu level kondisi yang dramatis/nyata.",
    "cautionNote": "Bila dipadukan dengan 『〜はない』 maka bermakna superlatif: 'Tidak ada yang se- (paling)...' (misal: 富士山ほど美しい山はない = tidak ada gunung yang seindah Fuji).",
    "examples": [
      {
        "id": "ex-kura-1",
        "textJp": "お腹が空きすぎて、倒れそうなくらい目が回った。",
        "ruby": "お[腹:なか]が[空:す]きすぎて、[倒:たお]れそうなくらい[目:め]が[回:まわ]った。",
        "textId": "Saking kelaparannya, kepalaku pusing sampai-sampai rasanya hendak roboh pingsan.",
        "contextNote": "Perumpamaan dramatis mengukur rasa pusing karena lapar."
      },
      {
        "id": "ex-kura-2",
        "textJp": "涙が出るほど感動的なスピーチを聞いて、胸が熱くなった。",
        "ruby": "[涙:なみだ]が[出:で]るほど[感動的:かんどうてき]なスピーチを[聞:き]いて、[胸:むね]が[熱:あつ]くなった。",
        "textId": "Mendengar pidato yang begitu menyentuh hingga meneteskan air mata, dadaku bergetar haru.",
        "contextNote": "Derajat haru yang diukur dengan tangisan nyata."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ばかり (hanya/melulu)",
        "summary": "ばかり = frekuensi atau batasan terus menerus.",
        "distinctionId": "『〜くらい / ほど』 mengukur intensitas kedalaman suatu keadaan dengan analogi kejadian ekstrem."
      }
    ],
    "questions": [
      {
        "id": "q-b07-03",
        "type": "cloze",
        "questionNumber": 25,
        "questionJp": "息ができない（　　）大笑いして、お腹が痛くなった。",
        "questionRuby": "[息:いき]ができない（　　）[大笑:おおわら]いして、お[腹:なか]が[痛:いた]くなった。",
        "questionTranslation": "Kami tertawa terbahak-bahak sampai-sampai tak bisa bernapas hingga perut terasa sakit.",
        "options": [
          {
            "key": "1",
            "textJp": "ほど",
            "textId": "Sampai-sampai derajat..."
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Namun di sisi lain..."
          },
          {
            "key": "3",
            "textJp": "にしては",
            "textId": "Untuk ukuran..."
          },
          {
            "key": "4",
            "textJp": "最中に",
            "textId": "Tepat di tengah..."
          }
        ],
        "correctKey": "1",
        "explanation": "Derajat tertawa diukur dengan batas ketidakmampuan bernapas. Pola perumpamaan derajat ekstrem adalah 『動詞 ＋ ほど / くらい』."
      }
    ]
  },

  {
    "id": "n3-b07-sae",
    "chapterNumber": 7,
    "chapterTitle": "第7課: 限定・付加・程度 (Batasan, Tambahan & Tingkatan)",
    "category": "degree",
    "categoryLabel": "程度・付加",
    "patternJp": "〜さえ / 〜でさえ",
    "patternKana": "さえ / でさえ",
    "meaningId": "Bahkan... (memberikan contoh paling ekstrem untuk menyimpulkan hal wajar lainnya)",
    "connection": "名詞 ＋ （で）さえ\n動詞マス形＋さえ ＋ すれば（〜ば）",
    "coreConcept": "Menyebutkan satu contoh paling ekstrem atau paling mendasar untuk menegaskan bahwa jika hal sejelas itu saja begitu, apalagi hal-hal lainnya yang lebih rumit.",
    "cautionNote": "Bentuk 『〜さえ〜ば』 memiliki arti khusus: 'Asalkan... sudah cukup' (misal: 水さえあれば生きられる = asalkan ada air bisa bertahan hidup).",
    "examples": [
      {
        "id": "ex-sae-1",
        "textJp": "あまりの激痛に、声を出すことさえできなかった。",
        "ruby": "あまりの[激痛:げきつう]に、[声:こえ]を[出:だ]すことさえできなかった。",
        "textId": "Saking sakitnya yang luar biasa hebat, bahkan mengeluarkan suara rintihan pun saya tak sanggup.",
        "contextNote": "Contoh kemampuan paling mendasar (bersuara) pun tidak sanggup dilakukan."
      },
      {
        "id": "ex-sae-2",
        "textJp": "この漢字は日本人でさえ読み方を間違えることがある難読文字だ。",
        "ruby": "この[漢字:かんじ]は[日本人:にほんじん]でさえ[読:よ]み[方:かた]を[間違:まちが]えることがある[難読文字:なんどくもじ]だ。",
        "textId": "Kanji ini adalah aksara berkategori sulit dibaca di mana orang Jepang asli pun bahkan terkadang keliru membacanya.",
        "contextNote": "Orang Jepang sebagai figur standar saja keliru, apalagi pembelajar asing."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜も (juga)",
        "summary": "も = partikel penambahan biasa.",
        "distinctionId": "『〜さえ』 menekankan unsur kejutan atau keterkejutan karena hal yang dijadikan contoh adalah tingkat ekstrem."
      }
    ],
    "questions": [
      {
        "id": "q-b07-02",
        "type": "seiretsu",
        "questionNumber": 26,
        "questionJp": "忙しすぎて、昨日は　＿＿　＿＿　★　＿＿　働き続けた。",
        "questionRuby": "[忙:いそが]しすぎて、[昨日:きのう]は　＿＿　＿＿　★　＿＿　[働:はたら]き[続:つづ]けた。",
        "questionTranslation": "Terlalu sibuk, kemarin saya terus bekerja tanpa sempat bahkan untuk meneguk air minum sekalipun.",
        "items": [
          "水を飲む",
          "時間さえ",
          "ほとんど",
          "なく"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『忙しすぎて、昨日は [水を飲む] [時間さえ] [ほとんど] [なく] 働き続けた』. Kata di posisi bintang (★) adalah 『ほとんど』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第8課: 傾向・様子・変化 (Kecenderungan & Kondisi Alami)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b08-darake",
    "chapterNumber": 8,
    "chapterTitle": "第8課: 傾向・様子・変化 (Kecenderungan & Kondisi Alami)",
    "category": "change",
    "categoryLabel": "傾向・様子",
    "patternJp": "〜だらけ",
    "patternKana": "だらけ",
    "meaningId": "Penuh dengan... / Berlumuran... (konotasi berantakan, kotor, atau penuh cacat)",
    "connection": "名詞 ＋ だらけ",
    "coreConcept": "Dipakai ketika seluruh permukaan benda, ruangan, tubuh, atau teks dipenuhi oleh benda cair/kotor/kesalahan yang tidak mengenakkan dipandang mata.",
    "cautionNote": "Hampir selalu bermakna negatif (cth: 泥だらけ = berlepotan lumpur, 間違いだらけ = penuh kekeliruan). Tidak boleh dipakai untuk hal bersih atau positif (tidak bisa: 友達だらけ ✕).",
    "examples": [
      {
        "id": "ex-dara-1",
        "textJp": "雨の日のサッカーで、ユニフォームが泥だらけになってしまった。",
        "ruby": "[雨:あめ]の[日:ひ]のサッカーで、ユニフォームが[泥:どろ]だらけになってしまった。",
        "textId": "Bermain sepak bola saat hari hujan, seragam pun berlumuran lumpur kotor.",
        "contextNote": "Permukaan baju yang tertutup noda lumpur kotor."
      },
      {
        "id": "ex-dara-2",
        "textJp": "急いで書いたレポートを読み返したら、誤字脱字だらけで恥ずかしい。",
        "ruby": "[急:いそ]いで[書:か]いたレポートを[読:よ]み[返:かえ]したら、[誤字脱字:ごじだつじ]だらけで[恥:は]ずかしい。",
        "textId": "Saat membaca ulang laporan yang kutulis terburu-buru, isinya penuh salah ketik dan huruf yang terlewat, sungguh memalukan.",
        "contextNote": "Teks yang dipenuhi kekeliruan bertebaran."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜いっぱい (penuh)",
        "summary": "いっぱい = penuh secara kuantitas normal (penuh orang, penuh cinta).",
        "distinctionId": "『〜だらけ』 mengisyaratkan ketidaksukaan pembicara karena permukaannya kotor atau banyak cacat."
      }
    ],
    "questions": [
      {
        "id": "q-b08-03",
        "type": "cloze",
        "questionNumber": 27,
        "questionJp": "祖父の古いアルバムは、何十年もの（　　）になっていた。",
        "questionRuby": "[祖父:そふ]の[古:ふる]いアルバムは、[何十年:なんじゅうねん]もの（　　）になっていた。",
        "questionTranslation": "Album foto tua milik kakek sudah berdebu tebal akibat puluhan tahun tersimpan.",
        "options": [
          {
            "key": "1",
            "textJp": "ほこりだらけ",
            "textId": "Penuh berlumur debu"
          },
          {
            "key": "2",
            "textJp": "ほこり気味",
            "textId": "Bergejala debu (salah arti)"
          },
          {
            "key": "3",
            "textJp": "ほこりがち",
            "textId": "Cenderung debu (salah sambung)"
          },
          {
            "key": "4",
            "textJp": "ほこり反面",
            "textId": "Di sisi lain debu"
          }
        ],
        "correctKey": "1",
        "explanation": "Benda fisik yang tertutup kotoran debu tebal di seluruh permukaannya diungkapkan dengan 『名詞 ＋ だらけ』 -> 『ほこりだらけ』."
      }
    ]
  },

  {
    "id": "n3-b08-gachi",
    "chapterNumber": 8,
    "chapterTitle": "第8課: 傾向・様子・変化 (Kecenderungan & Kondisi Alami)",
    "category": "change",
    "categoryLabel": "傾向・様子",
    "patternJp": "〜がち / 〜がちだ",
    "patternKana": "がち",
    "meaningId": "Cenderung / Seringkali terjadi hal yang tidak diinginkan",
    "connection": "動詞マス形（マス省く） ＋ がち\n名詞 ＋ がち",
    "coreConcept": "Menyatakan kecenderungan negatif atau kebiasaan buruk yang sering terjadi berulang kali tanpa sengaja (misal: sering lupa, gampang sakit, cenderung menunda).",
    "cautionNote": "Hampir selalu digunakan untuk hal-hal yang berkonotasi negatif atau disesalkan, tidak dipakai untuk hal positif (tidak bisa: 成功しがち ✕).",
    "examples": [
      {
        "id": "ex-gachi-1",
        "textJp": "冬場は運動不足になりがちなので、意識して体を動かそう。",
        "ruby": "[冬場:ふゆば]は[運動不足:うんどうぶそく]になりがちなので、[意識:いしき]して[体:からだ]を[動:うご]かそう。",
        "textId": "Musim dingin cenderung membuat kita kurang bergerak olahraga, jadi mari gerakkan badan secara sadar.",
        "contextNote": "Kecenderungan pasif di musim dingin."
      },
      {
        "id": "ex-gachi-2",
        "textJp": "一人暮らしを始めると、野菜が不足して栄養が偏りがちになる。",
        "ruby": "[一人暮:ひとりぐ]らしを[始:はじ]めると、[野菜:やさい]が[不足:ふそく]して[栄養:えいよう]が[偏:かたよ]りがちになる。",
        "textId": "Saat mulai hidup mandiri sendirian, sayuran menjadi kurang dan asupan nutrisi sering kali cenderung timpang.",
        "contextNote": "Kecenderungan gaya makan yang tidak seimbang."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜気味 (ぎみ)",
        "summary": "気味 = terasa sedikit ada gejala fisik/mental sesaat (misal: 風邪気味 = agak meriang).",
        "distinctionId": "『〜がち』 adalah kecenderungan berulang frekuentatif, sedangkan 『気味』 adalah gejala ringan saat ini."
      }
    ],
    "questions": [
      {
        "id": "q-b08-01",
        "type": "cloze",
        "questionNumber": 28,
        "questionJp": "最近忙しくて、大切な約束を忘れ（　　）になっている。",
        "questionRuby": "[最近:さいきん][忙:いそが]しくて、[大切:たいせつ]な[約束:やくそく]を[忘:わす]れ（　　）になっている。",
        "questionTranslation": "Akhir-akhir ini karena sibuk, saya cenderung sering lupa janji-janji penting.",
        "options": [
          {
            "key": "1",
            "textJp": "がち",
            "textId": "Cenderung sering... (V-masu + がち)"
          },
          {
            "key": "2",
            "textJp": "だらけ",
            "textId": "Berlumuran / penuh dengan..."
          },
          {
            "key": "3",
            "textJp": "反面",
            "textId": "Di sisi lain sebaliknya..."
          },
          {
            "key": "4",
            "textJp": "わけ",
            "textId": "Wajar demikian..."
          }
        ],
        "correctKey": "1",
        "explanation": "Kata kerja 『忘れます』 dipotong masunya menjadi 『忘れ』 lalu disambung dengan 『がち』 untuk menyatakan kecenderungan negatif yang kerap terjadi."
      }
    ]
  },

  {
    "id": "n3-b08-gimi",
    "chapterNumber": 8,
    "chapterTitle": "第8課: 傾向・様子・変化 (Kecenderungan & Kondisi Alami)",
    "category": "change",
    "categoryLabel": "傾向・様子",
    "patternJp": "〜気味 (ぎみ)",
    "patternKana": "ぎみ",
    "meaningId": "Agak sedikit terasa bergejala... (nuansa kondisi fisik atau psikologis sesaat)",
    "connection": "動詞マス形（マス省く） ＋ 気味\n名詞 ＋ 気味",
    "coreConcept": "Digunakan saat seseorang merasakan sedikit gejala fisik yang kurang sehat atau tekanan psikologis tertentu yang belum terlalu parah namun sudah mulai terasa.",
    "cautionNote": "Sering menempel pada kata-kata seperti: 風邪気味 (agak flu/meriang), 疲れ気味 (agak capek), 太り気味 (agak kegemukan), 緊張気味 (agak gugup).",
    "examples": [
      {
        "id": "ex-gimi-1",
        "textJp": "今朝から少し風邪気味なので、今夜は温かくして早めに寝ます。",
        "ruby": "[今朝:けさ]から[少:すこ]し[風邪気味:かぜぎみ]なので、[今夜:こんや]は[温:あたた]かくして[早:はや]めに[寝:ね]ます。",
        "textId": "Sejak tadi pagi agak sedikit terasa gejala flu, jadi malam ini saya akan menghangatkan diri dan tidur lebih awal.",
        "contextNote": "Gejala fisik awal flu ringan."
      },
      {
        "id": "ex-gimi-2",
        "textJp": "プレゼンの直前、彼は緊張気味の面持ちで深呼吸を繰り返していた。",
        "ruby": "プレゼンの[直前:ちょくぜん]、[彼:かれ]は[緊張気味:きんちょうぎみ]の[面持:おもも]ちで[深呼吸:しんこきゅう]を[繰:く]り[返:かえ]していた。",
        "textId": "Tepat sebelum presentasi, dia dengan raut wajah agak gugup berulang kali menarik napas dalam-dalam.",
        "contextNote": "Kondisi psikologis gugup sesaat."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜っぽい",
        "summary": "っぽい = sifat yang dominan menyerupai sesuatu (misal: pelupa, kekanak-kanakan).",
        "distinctionId": "『〜気味』 khusus untuk gejala ringan tubuh/perasaan saat ini (sedikit flu, sedikit lelah)."
      }
    ],
    "questions": [
      {
        "id": "q-b08-02",
        "type": "cloze",
        "questionNumber": 29,
        "questionJp": "連日の残業で最近（　　）なので、週末はしっかり休みたい。",
        "questionRuby": "[連日:れんじつ]の[残業:ざんぎょう]で[最近:さいきん]（　　）なので、[週末:しゅうまつ]はしっかり[休:やす]みたい。",
        "questionTranslation": "Karena lembur berhari-hari belakangan ini agak terasa lelah, akhir pekan ini saya ingin istirahat total.",
        "options": [
          {
            "key": "1",
            "textJp": "疲れ気味",
            "textId": "Agak bergejala capek"
          },
          {
            "key": "2",
            "textJp": "疲れだらけ",
            "textId": "Penuh lelah (salah sambung)"
          },
          {
            "key": "3",
            "textJp": "疲れ反面",
            "textId": "Di sisi lain lelah"
          },
          {
            "key": "4",
            "textJp": "疲れ最中",
            "textId": "Di tengah lelah"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan gejala fisik ringan yang mulai terasa akibat lembur adalah 『疲れ気味』 (V-masu + 気味)."
      }
    ]
  },

  {
    "id": "n3-b08-ppoi",
    "chapterNumber": 8,
    "chapterTitle": "第8課: 傾向・様子・変化 (Kecenderungan & Kondisi Alami)",
    "category": "change",
    "categoryLabel": "傾向・様子",
    "patternJp": "〜っぽい",
    "patternKana": "っぽい",
    "meaningId": "Terasa seperti... / Cepat bersifat... (menyerupai sifat khas atau gampang begitu)",
    "connection": "名詞 ＋ っぽい\nイ形容詞（い省く） ＋ っぽい\n動詞マス形（マス省く） ＋ っぽい",
    "coreConcept": "Memiliki arti: 1) Menyerupai sifat atau warna tertentu (seperti anak-anak, agak kehitaman). 2) Gampang menjadi sifat tertentu dalam jangka pendek (mudah marah/bosan/lupa).",
    "cautionNote": "Merupakan ragam bahasa percakapan akrab (lisan). Konotasi sering kali mengekspresikan sedikit rasa kurang sreg atau kritik halus.",
    "examples": [
      {
        "id": "ex-ppoi-1",
        "textJp": "大人なのに、いつまでも子どもっぽい言動を繰り返すのはよくない。",
        "ruby": "[大人:おとな]なのに、いつまでも[子:こ]どもっぽい[言動:げんどう]を[繰:く]り[返:かえ]すのはよくない。",
        "textId": "Padahal sudah dewasa, terus mengulangi tingkah laku kekanak-kanakan itu tidaklah pantas.",
        "contextNote": "Sifat menyerupai anak kecil (padahal bukan anak-anak)."
      },
      {
        "id": "ex-ppoi-2",
        "textJp": "最近の彼は怒りっぽくて、同僚たちも話しかけづらそうにしている。",
        "ruby": "[最近:さいきん]の[彼:かれ]は[怒:おこ]りっぽくて、[同僚:どうりょう]たちも[話:はな]しかけづらそうにしている。",
        "textId": "Akhir-akhir ini dia sangat mudah terpancing marah, rekan-rekan kerjanya pun tampak sungkan menyapanya.",
        "contextNote": "Karakter yang mudah tersulut emosi (怒ります -> 怒りっぽい)."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜らしい",
        "summary": "らしい = memang sesuai identitas aslinya (cth: 男らしい = jantan selayaknya pria).",
        "distinctionId": "『〜っぽい』 mengesankan 'seperti X padahal bukan X' (misal: orang dewasa yang bertingkah seperti anak-anak)."
      }
    ],
    "questions": [
      {
        "id": "q-b08-04",
        "type": "seiretsu",
        "questionNumber": 30,
        "questionJp": "彼は　＿＿　＿＿　★　＿＿　すぐに別の趣味に移ってしまう。",
        "questionRuby": "[彼:かれ]は　＿＿　＿＿　★　＿＿　すぐに[別:べつ]の[趣味:しゅみ]に[移:うつ]ってしまう。",
        "questionTranslation": "Dia karena orangnya gampang cepat bosan, apa pun yang dimulai lekas berpindah ke hobi lain.",
        "items": [
          "飽きっぽい",
          "性格なので",
          "何を始めても",
          "長続きせず"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『彼は [飽きっぽい] [性格なので] [何を始めても] [長続きせず] すぐに別の趣味に移ってしまう』. Kata di posisi bintang (★) adalah 『何を始めても』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第9課: 条件・契機・機会 (Syarat & Momen Pemicu)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b09-kikkake-ni",
    "chapterNumber": 9,
    "chapterTitle": "第9課: 条件・契機・機会 (Syarat & Momen Pemicu)",
    "category": "condition",
    "categoryLabel": "条件・仮定",
    "patternJp": "〜をきっかけに / 〜を契機に",
    "patternKana": "をきっかけに / をけいきに",
    "meaningId": "Bermula dari... / Dipicu oleh momen... (titik tolak perubahan besar)",
    "connection": "名詞 ＋ をきっかけに（して） / を契機に（して）\n動詞た形 ＋ のをきっかけに",
    "coreConcept": "Menyatakan sebuah peristiwa, perjumpaan, atau insiden tertentu yang menjadi titik tolak atau pemicu dimulainya suatu perubahan hidup, kebiasaan baru, atau babak sejarah baru.",
    "cautionNote": "『〜を契機に』 adalah ragam yang lebih formal dan berbobot akademis/resmi dibanding 『〜をきっかけに』.",
    "examples": [
      {
        "id": "ex-kikka-1",
        "textJp": "日本のアニメを見たことをきっかけに、独学で日本語を勉強し始めた。",
        "ruby": "[日本:にほん]のアニメを[見:み]たことをきっかけに、[独学:どくがく]で[日本語:にほんご]を[勉強:べんきょう]し[始:はじ]めた。",
        "textId": "Bermula dari menonton anime Jepang, saya terpicu untuk mulai belajar bahasa Jepang secara otodidak.",
        "contextNote": "Momen awal yang mengubah jalan belajar seseorang."
      },
      {
        "id": "ex-kikka-2",
        "textJp": "病気で入院したのをきっかけに、毎日の食生活や運動習慣を見直した。",
        "ruby": "[病気:びょうき]で[入院:にゅういん]したのをきっかけに、[毎日:まいにち]の[食生活:しょくせいかつ]や[運動習慣:うんどうしゅうかん]を[見直:みなお]した。",
        "textId": "Dipicu oleh peristiwa sempat dirawat opname di rumah sakit, saya mengevaluasi kembali pola makan dan kebiasaan olahraga harian.",
        "contextNote": "Titik balik perubahan gaya hidup."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜から (sebab awal)",
        "summary": "から = kata sambung alasan penyebab umum.",
        "distinctionId": "『〜をきっかけに』 secara spesifik menunjuk peristiwa sebagai gerbang awal (titik tolak pemicu) transformasi."
      }
    ],
    "questions": [
      {
        "id": "q-b09-04",
        "type": "cloze",
        "questionNumber": 31,
        "questionJp": "引っ越し（　　）、不要な家具を思い切って処分した。",
        "questionRuby": "[引:ひ]っ[越:こ]し（　　）、[不要:ふよう]な[家具:かぐ]を[思:おも]い[切:き]って[処分:しょぶん]した。",
        "questionTranslation": "Bermula dari momentum pindah rumah, saya mantap membuang perabotan yang sudah tak terpakai.",
        "options": [
          {
            "key": "1",
            "textJp": "をきっかけに",
            "textId": "Bermula dari momentum..."
          },
          {
            "key": "2",
            "textJp": "をはじめ",
            "textId": "Mulai dari contoh utama..."
          },
          {
            "key": "3",
            "textJp": "に対して",
            "textId": "Sebaliknya terhadap..."
          },
          {
            "key": "4",
            "textJp": "にかけて",
            "textId": "Membentang sampai..."
          }
        ],
        "correctKey": "1",
        "explanation": "Pindah rumah menjadi momen pemicu pembersihan perabotan. Pola titik balik momentum adalah 『名詞 ＋ をきっかけに』."
      }
    ]
  },

  {
    "id": "n3-b09-sae-ba",
    "chapterNumber": 9,
    "chapterTitle": "第9課: 条件・契機・機会 (Syarat & Momen Pemicu)",
    "category": "condition",
    "categoryLabel": "条件・仮定",
    "patternJp": "〜さえ〜ば",
    "patternKana": "さえ〜ば",
    "meaningId": "Asalkan... (sudah cukup memenuhi syarat minimal keberhasilan)",
    "connection": "名詞 ＋ さえ ＋ 動詞ば形\n動詞マス形＋さえ ＋ すれば\nイ形容詞・ナ形容詞 ＋ でさえあれば",
    "coreConcept": "Menyatakan bahwa asalkan satu kondisi minimal yang terpenting ini terpenuhi, maka hal-hal lain tidak menjadi masalah dan tujuan pasti tercapai.",
    "cautionNote": "Perhatikan posisi kata bantu: partikel が / を sering kali dilebur dan digantikan langsung oleh 『さえ』 (cth: お金さえあれば ○, お金をさえあれば ✕).",
    "examples": [
      {
        "id": "ex-saeba-1",
        "textJp": "パスポートとスマホさえあれば、世界中どこへでも一人で旅ができる。",
        "ruby": "パスポートとスマホさえあれば、[世界中:せかいじゅう]どこへでも[一人:ひとり]で[旅:たび]ができる。",
        "textId": "Asalkan ada paspor dan ponsel pintar di tangan, ke belahan dunia mana pun saya bisa bepergian sendirian.",
        "contextNote": "Syarat minimal esensial untuk traveling mandiri."
      },
      {
        "id": "ex-saeba-2",
        "textJp": "体さえ健康なら、どんな失敗からもやり直すことができる。",
        "ruby": "[体:からだ]さえ[健康:けんこう]なら、どんな[失敗:しっぱい]からもやり[直:なお]すことができる。",
        "textId": "Asalkan tubuh tetap sehat bugar, dari kegagalan seburuk apa pun kita pasti bisa bangkit kembali.",
        "contextNote": "Kesehatan sebagai modal paling pokok kehidupan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ば (pengandaian biasa)",
        "summary": "ば = pengandaian logika sebab-akibat umum.",
        "distinctionId": "『〜さえ〜ば』 memiliki penekanan kuat pada 'satu-satunya prasyarat mutlak yang paling krusial'."
      }
    ],
    "questions": [
      {
        "id": "q-b09-01",
        "type": "cloze",
        "questionNumber": 32,
        "questionJp": "薬を（　　）、すぐに熱は下がりますから心配いりません。",
        "questionRuby": "[薬:くすり]を（　　）、すぐに[熱:ねつ]は[下:さ]がりますから[心配:しんぱい]いりません。",
        "questionTranslation": "Asalkan kamu minum obatnya, demamnya akan lekas turun jadi tidak usah cemas.",
        "options": [
          {
            "key": "1",
            "textJp": "飲みさえすれば",
            "textId": "Asalkan minum (V-masu + さえすれば)"
          },
          {
            "key": "2",
            "textJp": "飲むわりに",
            "textId": "Mengingat minum"
          },
          {
            "key": "3",
            "textJp": "飲む反面",
            "textId": "Di sisi lain minum"
          },
          {
            "key": "4",
            "textJp": "飲むばかりに",
            "textId": "Hanya gara-gara minum"
          }
        ],
        "correctKey": "1",
        "explanation": "Pola kata kerja untuk syarat minimal adalah 『動詞マス形＋さえ＋すれば』 -> 『飲みさえすれば』."
      }
    ]
  },

  {
    "id": "n3-b09-tabi-ni",
    "chapterNumber": 9,
    "chapterTitle": "第9課: 条件・契機・機会 (Syarat & Momen Pemicu)",
    "category": "condition",
    "categoryLabel": "条件・仮定",
    "patternJp": "〜たびに",
    "patternKana": "たびに",
    "meaningId": "Setiap kali... selalu... (kebiasaan berulang tiap momen terjadi)",
    "connection": "動詞辞書形 ＋ たびに\n名詞＋の ＋ たびに",
    "coreConcept": "Menyatakan bahwa setiap kali peristiwa A terjadi, tanpa terkecuali peristiwa B yang sama akan selalu berulang atau perasaan yang sama selalu muncul.",
    "cautionNote": "Tidak dipakai untuk rutinitas harian yang alami atau membosankan seperti 'tiap pagi sarapan' (毎朝ご飯を食べる たびに ✕). Harus ada respons perasaan atau kejadian khas yang terpicu.",
    "examples": [
      {
        "id": "ex-tabi-1",
        "textJp": "この懐かしい曲を聴くたびに、故郷の景色や家族を思い出す。",
        "ruby": "この[懐:なつ]かしい[曲:きょく]を[聴:き]くたびに、[故郷:こきょう]の[景色:けしき]や[家族:かぞく]を[思:おも]い[出:だ]す。",
        "textId": "Setiap kali mendengarkan alunan lagu penuh nostalgia ini, saya selalu teringat panorama kampung halaman dan keluarga tercinta.",
        "contextNote": "Pemicu memori yang selalu timbul berulang."
      },
      {
        "id": "ex-tabi-2",
        "textJp": "父は海外出張のたびに、珍しいお土産を買ってきてくれる。",
        "ruby": "[父:ちち]は[海外出張:かいがいしゅっちょう]のたびに、[珍:めずら]しいお[土産:みやげ]を[買:か]ってきてくれる。",
        "textId": "Setiap kali ayah dinas tugas ke luar negeri, beliau selalu membawakan oleh-oleh unik khas negara tersebut.",
        "contextNote": "Kebiasaan ayah tiap ada momen dinas luar negeri."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜いつも (selalu)",
        "summary": "いつも = frekuensi selalu secara umum.",
        "distinctionId": "『〜たびに』 menekankan hubungan pemicu: 'Tiap kali ada momen A, otomatis B selalu menyertainya'."
      }
    ],
    "questions": [
      {
        "id": "q-b09-02",
        "type": "seiretsu",
        "questionNumber": 33,
        "questionJp": "彼女は　＿＿　＿＿　★　＿＿　大人っぽくなっていく。",
        "questionRuby": "[彼女:かのじょ]は　＿＿　＿＿　★　＿＿　[大人:おとな]っぽくなっていく。",
        "questionTranslation": "Dia setiap kali bertemu, penampilannya selalu tampak semakin anggun dewasa.",
        "items": [
          "会う",
          "雰囲気が",
          "たびに",
          "洗練されて"
        ],
        "correctOrder": [
          0,
          2,
          1,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『彼女は [会う] [たびに] [雰囲気が] [洗練されて] 大人っぽくなっていく』. Kata di posisi bintang (★) adalah 『雰囲気が』."
      }
    ]
  },

  {
    "id": "n3-b09-tsuide-ni",
    "chapterNumber": 9,
    "chapterTitle": "第9課: 条件・契機・機会 (Syarat & Momen Pemicu)",
    "category": "condition",
    "categoryLabel": "条件・仮定",
    "patternJp": "〜ついでに",
    "patternKana": "ついでに",
    "meaningId": "Sekalian... (memanfaatkan kesempatan saat melakukan aksi utama)",
    "connection": "動詞辞書形 / た形 ＋ ついでに\n名詞＋の ＋ ついでに",
    "coreConcept": "Saat pembicara hendak melakukan suatu tindakan utama (A), pembicara memanfaatkan kesempatan, waktu, atau rute perjalanan tersebut untuk melakukan tindakan sampingan (B) yang praktis.",
    "cautionNote": "Tindakan A adalah tujuan utama, sedangkan tindakan B hanyalah bonus tambahan sekalian jalan.",
    "examples": [
      {
        "id": "ex-tsui-1",
        "textJp": "コンビニへ郵便物を出しに行くついでに、明日の朝食も買ってきた。",
        "ruby": "コンビニへ[郵便物:ゆうびんぶつ]を[出:だ]しに[行:い]くついでに、[明日:あした]の[朝食:ちょうしょく]も[買:か]ってきた。",
        "textId": "Sekalian keluar ke minimarket untuk mengirim surat pos, saya juga membeli sarapan untuk besok pagi.",
        "contextNote": "Aksi sampingan (beli sarapan) saat melakukan aksi pokok (ke minimarket)."
      },
      {
        "id": "ex-tsui-2",
        "textJp": "東京へ出張に行ったついでに、大学時代の旧友と会って食事をした。",
        "ruby": "[東京:とうきょう]へ[出張:しゅっちょう]に[行:い]ったついでに、[大学時代:だいがくじだい]の[旧友:きゅうゆう]と[会:あ]って[食事:しょくじ]をした。",
        "textId": "Sekalian berdinas ke Tokyo, saya memanfaatkan waktu luang untuk bertemu dan makan bersama sahabat lama zaman kuliah.",
        "contextNote": "Memanfaatkan rute tugas kantor untuk silaturahmi."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ながら (sambil)",
        "summary": "ながら = melakukan dua aksi simultan pada detik waktu yang bersamaan (sambil jalan sambil minum).",
        "distinctionId": "『〜ついでに』 bukan aksi simultan, melainkan memanfaatkan momen/perjalanan suatu agenda untuk menyisipkan agenda lain."
      }
    ],
    "questions": [
      {
        "id": "q-b09-03",
        "type": "cloze",
        "questionNumber": 34,
        "questionJp": "散歩の（　　）、ポストに手紙を投函してきてくれる？",
        "questionRuby": "[散歩:さんぽ]の（　　）、ポストに[手紙:てがみ]を[投函:とうかん]してきてくれる？",
        "questionTranslation": "Sekalian kamu jalan-jalan santai, bisakah tolong masukkan surat ini ke kotak pos?",
        "options": [
          {
            "key": "1",
            "textJp": "ついでに",
            "textId": "Sekalian memanfaatkan rute (名詞＋のついでに)"
          },
          {
            "key": "2",
            "textJp": "たびに",
            "textId": "Setiap kali"
          },
          {
            "key": "3",
            "textJp": "うちに",
            "textId": "Selagi mumpung"
          },
          {
            "key": "4",
            "textJp": "とおりに",
            "textId": "Sesuai petunjuk"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyisipkan titipan memasukkan surat ke dalam kegiatan jalan santai menggunakan 『名詞 ＋ の ＋ ついでに』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第10課: 義務・禁止・忠告 (Keharusan Moral & Anjuran)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b10-beki-da",
    "chapterNumber": 10,
    "chapterTitle": "第10課: 義務・禁止・忠告 (Keharusan Moral & Anjuran)",
    "category": "judgment",
    "categoryLabel": "義務・忠告",
    "patternJp": "〜べきだ / 〜べきではない",
    "patternKana": "べきだ / べきではない",
    "meaningId": "Seharusnya / Sudah sewajarnya wajib... (tuntutan moral, etika, atau akal sehat)",
    "connection": "動詞辞書形 ＋ べきだ / べきではない\n※ する ＋ べきだ / すべきだ（keduanya lazim）",
    "coreConcept": "Menyatakan kewajiban moral, etika kemasyarakatan, atau akal sehat bahwa seseorang secara kodrati wajar dan sepatutnya melakukan (atau tidak melakukan) hal tersebut.",
    "cautionNote": "Bukan aturan hukum kaku, melainkan etika/moralitas. Hati-hati: tidak sopan jika ditujukan langsung menasihati atasan/orang yang lebih tua secara frontal.",
    "examples": [
      {
        "id": "ex-beki-1",
        "textJp": "約束した時間は何があっても守るべきだし、遅れるなら連絡すべきだ。",
        "ruby": "[約束:やくそく]した[時間:じかん]は[何:なに]があっても[守:まも]るべきだし、[遅:おく]れるなら[連絡:れんらく]すべきだ。",
        "textId": "Waktu yang telah dijanjikan sudah sepatutnya ditepati apa pun yang terjadi, dan jika terlambat sewajarnya segera memberi kabar.",
        "contextNote": "Tuntutan etika dasar menjaga kepercayaan."
      },
      {
        "id": "ex-beki-2",
        "textJp": "他人のプライベートな領域に、無遠慮に首を突っ込むべきではない。",
        "ruby": "[他人:たにん]のプライベートな[領域:りょういき]に、[無遠慮:ぶえんりょ]に[首:くび]を[突:つ]っ[込:こ]むべきではない。",
        "textId": "Kita sewajarnya tidak boleh mencampuri ranah privasi orang lain secara lancang tanpa etika.",
        "contextNote": "Larangan moral kesopanan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜なければならない (keharusan mutlak)",
        "summary": "なければならない = keharusan mutlak (tuntutan tugas, hukum, atau fisik).",
        "distinctionId": "『〜べきだ』 menekankan standar nilai moral, kesadaran pribadi, dan norma kepantasan akal sehat."
      }
    ],
    "questions": [
      {
        "id": "q-b10-01",
        "type": "cloze",
        "questionNumber": 35,
        "questionJp": "若いうちに、失敗を恐れず多くの挑戦を（　　）。",
        "questionRuby": "[若:わか]いうちに、[失敗:しっぱい]を[恐:おそ]れず[多:おお]くの[挑戦:ちょうせん]を（　　）。",
        "questionTranslation": "Selagi masih muda, sudah sepatutnya kita banyak mencoba tantangan tanpa takut gagal.",
        "options": [
          {
            "key": "1",
            "textJp": "すべきだ",
            "textId": "Sewajarnya wajib dilakukan (moral/nasihat)"
          },
          {
            "key": "2",
            "textJp": "するわけだ",
            "textId": "Pantas saja begitu"
          },
          {
            "key": "3",
            "textJp": "する反面",
            "textId": "Di sisi lain melakukan"
          },
          {
            "key": "4",
            "textJp": "するせいだ",
            "textId": "Gara-gara melakukan"
          }
        ],
        "correctKey": "1",
        "explanation": "Kalimat berisi nasihat moral positif tentang apa yang sepatutnya dilakukan selagi muda. Bentuk untuk 『する』 adalah 『すべきだ』."
      }
    ]
  },

  {
    "id": "n3-b10-nai-wake-ni-wa-ikanai",
    "chapterNumber": 10,
    "chapterTitle": "第10課: 義務・禁止・忠告 (Keharusan Moral & Anjuran)",
    "category": "judgment",
    "categoryLabel": "義務・忠告",
    "patternJp": "〜ないわけにはいかない",
    "patternKana": "ないわけにはいかない",
    "meaningId": "Mau tidak mau harus melakukan... (tuntutan kewajiban moral yang tak terelakkan)",
    "connection": "動詞ナイ形 ＋ わけにはいかない",
    "coreConcept": "Merupakan negasi ganda (double negative) dari 『わけにはいかない』. Artinya: 'Tidak melakukan adalah hal yang terlarang/tidak bermoral', sehingga mau tidak mau pembicara harus melakukannya.",
    "cautionNote": "Sering keluar berpasangan dengan 『〜わけにはいかない』 di soal ujian JLPT untuk menguji pemahaman makna negasi ganda.",
    "examples": [
      {
        "id": "ex-naiikanai-1",
        "textJp": "いつも親切にしてくれる先輩の結婚式だから、出席しないわけにはいかない。",
        "ruby": "いつも[親切:しんせつ]にしてくれる[先輩:せんぱい]の[結婚式:けっこんしき]だから、[出席:しゅっせき]しないわけにはいかない。",
        "textId": "Karena ini adalah pesta pernikahan senior yang selalu berbuat baik kepadaku, mau tidak mau aku tentu harus hadir.",
        "contextNote": "Rasa sungkan dan hormat mengharuskan untuk datang."
      },
      {
        "id": "ex-naiikanai-2",
        "textJp": "自分のミスで他人に迷惑をかけたのだから、直接謝罪に行かないわけにはいかない。",
        "ruby": "[自分:じぶん]のミスで[他人:たにん]に[迷惑:めいわく]をかけたのだから、[直接:ちょくせつ][謝罪:しゃざい]に[行:い]かないわけにはいかない。",
        "textId": "Karena kesalahan diriku sendirilah yang merepotkan orang lain, mau tidak mau aku harus pergi meminta maaf secara langsung.",
        "contextNote": "Tuntutan tanggung jawab moral atas kelalaian diri."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜なければならない (keharusan)",
        "summary": "なければならない = harus.",
        "distinctionId": "『〜ないわけにはいかない』 menekankan bahwa tidak melakukannya akan melanggar etika atau merusak hubungan sosial."
      }
    ],
    "questions": [
      {
        "id": "q-b10-04",
        "type": "cloze",
        "questionNumber": 36,
        "questionJp": "親友からのお願いとあっては、力を（　　）。",
        "questionRuby": "[親友:しんゆう]からのお[願:ねが]いとあっては、[力:ちから]を（　　）。",
        "questionTranslation": "Mengingat ini adalah permohonan dari sahabat karib, mau tidak mau saya harus meminjamkan tenaga membantunya.",
        "options": [
          {
            "key": "1",
            "textJp": "貸さないわけにはいかない",
            "textId": "Mau tidak mau harus meminjamkan tenaga"
          },
          {
            "key": "2",
            "textJp": "貸すわけにはいかない",
            "textId": "Tidak boleh meminjamkan tenaga"
          },
          {
            "key": "3",
            "textJp": "貸すべきではない",
            "textId": "Seharusnya tidak meminjamkan"
          },
          {
            "key": "4",
            "textJp": "貸しがちだ",
            "textId": "Cenderung meminjamkan"
          }
        ],
        "correctKey": "1",
        "explanation": "Sebagai sahabat sejati, menolak permintaan adalah hal yang melanggar kesetiaan pertemanan, jadi harus membantunya (貸さないわけにはいかない)."
      }
    ]
  },

  {
    "id": "n3-b10-wake-ni-wa-ikanai",
    "chapterNumber": 10,
    "chapterTitle": "第10課: 義務・禁止・忠告 (Keharusan Moral & Anjuran)",
    "category": "judgment",
    "categoryLabel": "義務・忠告",
    "patternJp": "〜わけにはいかない",
    "patternKana": "わけにはいかない",
    "meaningId": "Tidak bisa begitu saja melakukan... (terhalang norma sosial, tanggung jawab, atau situasi)",
    "connection": "動詞辞書形 ＋ わけにはいかない",
    "coreConcept": "Secara fisik/kemampuan pembicara mampu melakukannya, namun karena pertimbangan moral, rasa tanggung jawab, atau norma sosial kemasyarakatan, hal itu sama sekali tidak bisa dilakukan.",
    "cautionNote": "Berbeda dengan 『〜ことができない』 (tidak mampu fisik/aturan). 『〜わけにはいかない』 adalah rem psikologis/moral diri sendiri.",
    "examples": [
      {
        "id": "ex-ikanai-1",
        "textJp": "明日は大事な最終プレゼンの日だから、風邪気味でも休むわけにはいかない。",
        "ruby": "[明日:あした]は[大事:だいじ]な[最終:さいしゅう]プレゼンの[日:ひ]だから、[風邪気味:かぜぎみ]でも[休:やす]むわけにはいかない。",
        "textId": "Karena besok adalah hari presentasi final yang amat krusial, walau agak meriang saya tidak bisa begitu saja libur mangkir.",
        "contextNote": "Tanggung jawab kerja menahan diri agar tidak izin libur."
      },
      {
        "id": "ex-ikanai-2",
        "textJp": "親切にお世話になった恩人を、困っている時に見捨てるわけにはいかない。",
        "ruby": "[親切:しんせつ]にお[世話:せわ]になった[恩人:おんじん]を、[困:こま]っている[時:とき]に[見捨:みす]てるわけにはいかない。",
        "textId": "Sosok penolong berjasa yang merawatku dengan penuh ketulusan, sama sekali tak mungkin bisa kutinggalkan begitu saja saat beliau kesusahan.",
        "contextNote": "Norma balas budi moral kemanusiaan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ことができない (ketidakmampuan teknis)",
        "summary": "ことができない = tidak bisa karena keterbatasan fisik atau hukum mutlak.",
        "distinctionId": "『〜わけにはいかない』 bisa secara fisik tapi ditahan oleh nurani atau beban profesionalisme."
      }
    ],
    "questions": [
      {
        "id": "q-b10-03",
        "type": "seiretsu",
        "questionNumber": 37,
        "questionJp": "大事な試験の前日だから、　＿＿　＿＿　★　＿＿　わけにはいかない。",
        "questionRuby": "[大事:だいじ]な[試験:しけん]の[前日:ぜんじつ]だから、　＿＿　＿＿　★　＿＿　わけにはいかない。",
        "questionTranslation": "Karena besok adalah hari ujian penting, saya tidak bisa begitu saja santai bermain game semalaman.",
        "items": [
          "徹夜で",
          "遊んでいる",
          "ゲームをして",
          "のんびり"
        ],
        "correctOrder": [
          0,
          2,
          3,
          1
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『大事な試験の前日だから、 [徹夜で] [ゲームをして] [のんびり] [遊んでいる] わけにはいかない』. Kata di posisi bintang (★) adalah 『のんびり』."
      }
    ]
  },

  {
    "id": "n3-b10-zaru-wo-enai",
    "chapterNumber": 10,
    "chapterTitle": "第10課: 義務・禁止・忠告 (Keharusan Moral & Anjuran)",
    "category": "judgment",
    "categoryLabel": "義務・忠告",
    "patternJp": "〜ざるを得ない",
    "patternKana": "ざるをえない",
    "meaningId": "Terpaksa harus... (tiada pilihan lain selain melakukannya meski berat hati)",
    "connection": "動詞ナイ形（ない省く） ＋ ざるを得ない\n※ する ＋ ざるを得ない → せざるを得ない",
    "coreConcept": "Mengekspresikan situasi mendesak di mana sebenarnya pembicara tidak ingin melakukannya, namun karena kondisi objektif atau desakan keadaan, tidak ada pilihan lain yang tersisa.",
    "cautionNote": "Perubahan khusus untuk kata kerja 『する』: bukan 'しさる' melainkan 『せざるを得ない』 (sangat sering keluar di soal JLPT N3!).",
    "examples": [
      {
        "id": "ex-zaru-1",
        "textJp": "大型台風の直撃が予想されるため、楽しみにしていた花火大会は中止せざるを得ない。",
        "ruby": "[大型台風:おおがたたいふう]の[直撃:ちょくげき]が[予想:よそう]されるため、[楽:たの]しみにしていた[花火大会:はなびたいかい]は[中止:ちゅうし]せざるを[得:え]ない。",
        "textId": "Karena badai topan dahsyat diprediksi menerjang langsung, festival kembang api yang sangat dinantikan terpaksa harus dibatalkan.",
        "contextNote": "Keputusan berat yang tak terelakkan demi keselamatan."
      },
      {
        "id": "ex-zaru-2",
        "textJp": "これだけ決定的な証拠を突きつけられては、自らの非を認めざるを得ない。",
        "ruby": "これだけ[決定的:けっていてき]な[証拠:しょうこ]を[突:つ]きつけられては、[自:みずか]らの[非:ひ]を[認:みと]めざるを[得:え]ない。",
        "textId": "Disodori bukti yang sebegitu telaknya, mau tidak mau dia terpaksa harus mengakui kesalahannya sendiri.",
        "contextNote": "Pengakuan yang tak terhindarkan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜なければならない (harus)",
        "summary": "なければならない = kewajiban umum.",
        "distinctionId": "『〜ざるを得ない』 secara eksplisit menyiratkan rasa berat hati, ketidakberdayaan, dan ketiadaan jalan keluar lain."
      }
    ],
    "questions": [
      {
        "id": "q-b10-02",
        "type": "cloze",
        "questionNumber": 38,
        "questionJp": "体調がここまで悪化しては、今日の登山計画は延期（　　）。",
        "questionRuby": "[体調:たいちょう]がここまで[悪化:あっか]しては、[今日:きょう]の[登山計画:とざんけいかく]は[延期:えんき]（　　）。",
        "questionTranslation": "Melihat kondisi tubuh memburuk hingga seperti ini, rencana mendaki hari ini terpaksa harus ditunda.",
        "options": [
          {
            "key": "1",
            "textJp": "せざるを得ない",
            "textId": "Terpaksa harus (bukan kehendak sendiri)"
          },
          {
            "key": "2",
            "textJp": "するべきではない",
            "textId": "Tidak boleh dilakukan"
          },
          {
            "key": "3",
            "textJp": "しがちだ",
            "textId": "Cenderung melakukan"
          },
          {
            "key": "4",
            "textJp": "する気味だ",
            "textId": "Bergejala melakukan"
          }
        ],
        "correctKey": "1",
        "explanation": "Kondisi fisik yang buruk memaksa pembatalan pendakian walau sebenarnya ingin pergi. Bentuk terpaksa untuk 『延期する』 adalah 『延期せざるを得ない』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第11課: 感情・感覚・自発 (Emosi & Luapan Perasaan)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b11-garu",
    "chapterNumber": 11,
    "chapterTitle": "第11課: 感情・感覚・自発 (Emosi & Luapan Perasaan)",
    "category": "emotion",
    "categoryLabel": "感情・感覚",
    "patternJp": "〜がる / 〜がっている",
    "patternKana": "がる / がっている",
    "meaningId": "Tampak menunjukkan tanda perasaan / Tampak ingin... (sikap lahiriah orang ketiga)",
    "connection": "イ形容詞（い省く） ＋ がる / がっている\nナ形容詞 ＋ がる / がっている\nV-たい（たい省く） ＋ たがる / たがっている",
    "coreConcept": "Dalam tata bahasa Jepang, perasaan batin atau hasrat keinginan (sakit, malu, takut, ingin) hanya boleh diucapkan langsung oleh diri sendiri. Bila mendeskripsikan kondisi orang ketiga, wajib menggunakan 『〜がる / たがる』 berdasarkan tanda fisik yang tampak dari luar.",
    "cautionNote": "Tidak boleh dipakai untuk perasaan diri sendiri (tidak bisa: 私は寒がる ✕). Khusus untuk orang lain atau hewan peliharaan.",
    "examples": [
      {
        "id": "ex-garu-1",
        "textJp": "うちの飼い犬は雷の轟音を怖がって、ベッドの下に潜り込んで震えている。",
        "ruby": "うちの[飼:か]い[犬:いぬ]は[雷:かみなり]の[轟音:ごうおん]を[怖:こわ]がって、ベッドの[下:した]に[潜:もぐ]り[込:こ]んで[震:ふる]えている。",
        "textId": "Anjing peliharaan kami tampak sangat ketakutan mendengar gemuruh petir, hingga menyelinap masuk ke bawah kolong ranjang sambil gemetar.",
        "contextNote": "Sikap takut orang/hewan lain yang tampak dari perilakunya."
      },
      {
        "id": "ex-garu-2",
        "textJp": "妹は人前で歌うのを恥ずかしがって、母の背中に隠れてしまった。",
        "ruby": "[妹:いもうと]は[人前:ひとまえ]で[歌:うた]うのを[恥:は]ずかしがって、[母:はは]の[背中:せなか]に[隠:かく]れてしまった。",
        "textId": "Adik perempuanku tampak malu bernyanyi di depan orang banyak, lalu bersembunyi di balik punggung ibu.",
        "contextNote": "Rasa malu pihak ketiga yang teramati secara nyata."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜たい (keinginan diri)",
        "summary": "たい = ingin (khusus untuk subjek diri sendiri).",
        "distinctionId": "Orang ketiga harus memakai 『〜たがる』: 彼は日本へ行きたがっている (Dia tampak ingin pergi ke Jepang)."
      }
    ],
    "questions": [
      {
        "id": "q-b11-04",
        "type": "cloze",
        "questionNumber": 39,
        "questionJp": "息子は新しいおもちゃを（　　）、おもちゃ屋の前から動こうとしない。",
        "questionRuby": "[息子:むすこ]は[新:あたら]しいおもちゃを（　　）、おもちゃ[屋:や]の[前:まえ]から[動:うご]こうとしない。",
        "questionTranslation": "Putraku tampak sangat menginginkan mainan baru itu hingga tak mau beranjak dari depan toko mainan.",
        "options": [
          {
            "key": "1",
            "textJp": "欲しがって",
            "textId": "Tampak sangat menginginkan (ほしい -> 欲しがる)"
          },
          {
            "key": "2",
            "textJp": "欲しくてたまらない",
            "textId": "Sangat ingin (khusus diri sendiri)"
          },
          {
            "key": "3",
            "textJp": "欲しい反面",
            "textId": "Di sisi lain ingin"
          },
          {
            "key": "4",
            "textJp": "欲しいがち",
            "textId": "Cenderung ingin"
          }
        ],
        "correctKey": "1",
        "explanation": "Subjek kalimat adalah orang ketiga (putraku). Untuk menyatakan keinginan pihak ketiga yang teramati dari perilakunya, kata sifat 『ほしい』 berubah menjadi 『欲しがって』."
      }
    ]
  },

  {
    "id": "n3-b11-te-naranai",
    "chapterNumber": 11,
    "chapterTitle": "第11課: 感情・感覚・自発 (Emosi & Luapan Perasaan)",
    "category": "emotion",
    "categoryLabel": "感情・感覚",
    "patternJp": "〜てならない",
    "patternKana": "てならない",
    "meaningId": "Amat sangat terasa... (dorongan emosi yang timbul spontan dari lubuk hati)",
    "connection": "動詞テ形 ＋ ならない\nイ形（くて） / ナ形（で） ＋ ならない",
    "coreConcept": "Dipakai untuk emosi spontan (merasa iba, khawatir, sedih, atau ada firasat) yang mengalir dari relung hati terdalam secara otomatis tanpa bisa ditepis oleh logika.",
    "cautionNote": "Merupakan ragam bahasa tulis (khas esai, sastra, atau refleksi pribadi) yang lebih halus dan formal dibanding 『てたまらない』.",
    "examples": [
      {
        "id": "ex-nara-1",
        "textJp": "被災地で懸命に復旧活動を続ける人々の姿を見て、胸が痛んでならない。",
        "ruby": "[被災地:ひさいち]で[懸命:けんめい]に[復旧活動:ふっきゅうかつどう]を[続:つづ]ける[人々:ひとびと]の[姿:すがた]を[見:み]て、[胸:むね]が[痛:いた]んでならない。",
        "textId": "Melihat sosok orang-orang yang berjuang sekuat tenaga memulihkan daerah bencana, hatiku terasa teramat perih dari lubuk terdalam.",
        "contextNote": "Empati kemanusiaan mendalam yang muncul spontan."
      },
      {
        "id": "ex-nara-2",
        "textJp": "なぜか今回のプロジェクトには、重大な見落としがあるような気がしてならない。",
        "ruby": "なぜか[今回:こんかい]のプロジェクトには、[重大:じゅうだい]な[見落:みお]としがあるような[気:き]がしてならない。",
        "textId": "Entah mengapa, dari lubuk hatiku terus terasa firasat kuat seolah-olah ada kekhilafan fatal yang terlewat dalam proyek kali ini.",
        "contextNote": "Firasat batin (気がしてならない) yang tak bisa ditepis."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜てたまらない",
        "summary": "てたまらない = sangat umum untuk rasa gatal, dingin, haus, atau nafsu fisik.",
        "distinctionId": "『〜てならない』 tidak dipakai untuk rasa gatal atau lapar fisik, murni untuk renungan batin emosi tinggi."
      }
    ],
    "questions": [
      {
        "id": "q-b11-03",
        "type": "cloze",
        "questionNumber": 40,
        "questionJp": "長年連れ添った愛犬が亡くなり、悲しくて（　　）。",
        "questionRuby": "[長年:ながねん][連:つ]れ[添:そ]った[愛犬:あいけん]が[亡:な]くなり、[悲:かな]しくて（　　）。",
        "questionTranslation": "Anjing kesayangan yang telah menemaniku bertahun-tahun meninggal dunia, rasa sedih mendalam menusuk lubuk hatiku.",
        "options": [
          {
            "key": "1",
            "textJp": "ならない",
            "textId": "Amat sangat terasa dari lubuk hati (悲しくてならない)"
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Namun di sisi lain"
          },
          {
            "key": "3",
            "textJp": "わけだ",
            "textId": "Pantas saja begitu"
          },
          {
            "key": "4",
            "textJp": "がちだ",
            "textId": "Cenderung begitu"
          }
        ],
        "correctKey": "1",
        "explanation": "Duka mendalam akibat kehilangan hewan peliharaan diungkapkan dengan ragam batin halus 『悲しくてならない』."
      }
    ]
  },

  {
    "id": "n3-b11-te-shouganai",
    "chapterNumber": 11,
    "chapterTitle": "第11課: 感情・感覚・自発 (Emosi & Luapan Perasaan)",
    "category": "emotion",
    "categoryLabel": "感情・感覚",
    "patternJp": "〜てしょうがない / 〜てしかたがない",
    "patternKana": "てしょうがない",
    "meaningId": "Sangat... tak ada habisnya / tak terbendung lagi rasa...",
    "connection": "動詞テ形 ＋ しょうがない / しかたがない\nイ形（くて） / ナ形（で） ＋ しょうがない",
    "coreConcept": "Menyatakan emosi atau kondisi batin (kesepian, rindu, bosan, ingin tahu) yang muncul secara alami dan tidak bisa dicegah atau dikontrol oleh akal budi pembicara.",
    "cautionNote": "Merupakan ungkapan emosi percakapan yang sangat sering muncul dalam dialog harian dan teks dokkai emosional.",
    "examples": [
      {
        "id": "ex-shou-1",
        "textJp": "一人暮らしの部屋に帰ると、静かすぎて寂しくてしょうがない日がある。",
        "ruby": "[一人暮:ひとりぐ]らしの[部屋:へや]に[帰:かえ]ると、[静:しず]かすぎて[寂:さび]しくてしょうがない[日:ひ]がある。",
        "textId": "Saat kembali ke kamar kos hidup sendiri, terkadang ada hari di mana suasananya terlampau sunyi hingga kesepian yang teramat sangat tak bisa kubendung.",
        "contextNote": "Perasaan sepi yang datang merayap tanpa bisa ditahan."
      },
      {
        "id": "ex-shou-2",
        "textJp": "大好きな作家の最新作の結末が気になってしかたがない。",
        "ruby": "[大好:だいす]きな[作家:さっか]の[最新作:さいしんさく]の[結末:けつまつ]が[気:き]になってしかたがない。",
        "textId": "Akhir cerita dari karya terbaru penulis favoritku ini sungguh membuatku penasaran setengah mati tak terbendung.",
        "contextNote": "Rasa penasaran tinggi yang menyita pikiran."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜てたまらない",
        "summary": "てたまらない = ketahanan fisik/mental sudah hampir meledak.",
        "distinctionId": "『〜てしょうがない』 menekankan hilangnya daya kontrol akal untuk membendung perasaan tersebut."
      }
    ],
    "questions": [
      {
        "id": "q-b11-02",
        "type": "seiretsu",
        "questionNumber": 41,
        "questionJp": "退屈な講義の間中、　＿＿　＿＿　★　＿＿　しょうがなかった。",
        "questionRuby": "[退屈:たいくつ]な[講義:こうぎ]の[間中:あいだじゅう]、　＿＿　＿＿　★　＿＿　しょうがなかった。",
        "questionTranslation": "Sepanjang kuliah yang membosankan itu, rasa kantuk terus menyerang hingga tak tertahankan lagi.",
        "items": [
          "何度も",
          "あくびが出て",
          "眠くて",
          "耐えられないほど"
        ],
        "correctOrder": [
          3,
          2,
          0,
          1
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『退屈な講義の間中、 [耐えられないほど] [眠くて] [何度も] [あくびが出て] しょうがなかった』. Kata di posisi bintang (★) adalah 『何度も』."
      }
    ]
  },

  {
    "id": "n3-b11-te-tamaranai",
    "chapterNumber": 11,
    "chapterTitle": "第11課: 感情・感覚・自発 (Emosi & Luapan Perasaan)",
    "category": "emotion",
    "categoryLabel": "感情・感覚",
    "patternJp": "〜てたまらない / 〜でたまらない",
    "patternKana": "てたまらない",
    "meaningId": "Amat sangat... sampai tak tertahankan lagi (sensasi fisik atau emosi yang meluap)",
    "connection": "動詞テ形 ＋ たまらない\nイ形容詞（い→くて） ＋ たまらない\nナ形容詞＋で ＋ たまらない\nV-たい（たい→たくて） ＋ たまらない",
    "coreConcept": "Mengekspresikan sensasi rasa sakit/gatal/dingin/haus fisik, atau rasa rindu/khawatir/penasaran yang sebegitu kuatnya hingga pembicara tak sanggup lagi membendungnya.",
    "cautionNote": "Hanya digunakan untuk perasaan orang pertama (saya). Jika untuk orang lain, harus ditambahkan bentuk dugaan seperti 『〜ようだ / 〜らしい』.",
    "examples": [
      {
        "id": "ex-tama-1",
        "textJp": "昨夜から虫に刺されたところが痒くてたまらない。",
        "ruby": "[昨夜:ゆうべ]から[虫:むし]に[刺:さ]されたところが[痒:かゆ]くてたまらない。",
        "textId": "Sejak tadi malam bagian yang digigit serangga rasanya gatal sekali sampai tak tertahankan.",
        "contextNote": "Sensasi gatal fisik yang teramat sangat."
      },
      {
        "id": "ex-tama-2",
        "textJp": "故郷の母の健康状態が心配でたまらず、毎晩電話をかけている。",
        "ruby": "[故郷:こきょう]の[母:はは]の[健康状態:けんこうじょうたい]が[心配:しんぱい]でたまらず、[毎晩:まいばん][電話:でんわ]をかけている。",
        "textId": "Kondisi kesehatan ibu di kampung amat sangat mengkhawatirkanku sampai tak tertahankan, hingga tiap malam aku menelepon beliau.",
        "contextNote": "Rasa cemas mendalam seorang anak."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜てならない (dorongan batin mendalam)",
        "summary": "てならない = perasaan alami yang muncul dari lubuk batin tanpa kendali (kebanyakan rasa sedih/penasaran).",
        "distinctionId": "『〜てたまらない』 sangat sering dipakai untuk sensasi biologis fisik (haus, gatal, kantuk) maupun emosi kuat."
      }
    ],
    "questions": [
      {
        "id": "q-b11-01",
        "type": "cloze",
        "questionNumber": 42,
        "questionJp": "激しい練習の後は、冷たい水が（　　）。",
        "questionRuby": "[激:はげ]しい[練習:れんしゅう]の[後:あと]は、[冷:つめ]たい[水:みず]が（　　）。",
        "questionTranslation": "Sehabis latihan berat menguras tenaga, aku ingin sekali minum air dingin sampai tak tertahankan.",
        "options": [
          {
            "key": "1",
            "textJp": "飲みたくてたまらない",
            "textId": "Ingin minum tak tertahankan"
          },
          {
            "key": "2",
            "textJp": "飲むべきだ",
            "textId": "Seharusnya minum"
          },
          {
            "key": "3",
            "textJp": "飲む反面",
            "textId": "Di sisi lain minum"
          },
          {
            "key": "4",
            "textJp": "飲まざるを得ない",
            "textId": "Terpaksa harus minum"
          }
        ],
        "correctKey": "1",
        "explanation": "Keinginan fisik yang meluap karena haus setelah olahraga diungkapkan dengan 『動詞たくてたまらない』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第12課: 確信・推量・評価 (Keyakinan & Tingkat Dugaan)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b12-kko-nai",
    "chapterNumber": 12,
    "chapterTitle": "第12課: 確信・推量・評価 (Keyakinan & Tingkat Dugaan)",
    "category": "judgment",
    "categoryLabel": "確信・推量",
    "patternJp": "〜っこない",
    "patternKana": "っこない",
    "meaningId": "Mana mungkin bisa... / Mustahil sekali terjadi! (penolakan tegas dalam ragam lisan)",
    "connection": "動詞マス形（マス省く） ＋ っこない",
    "coreConcept": "Merupakan ungkapan bahasa lisan yang kuat untuk menepis atau menyangkal kemungkinan bahwa hal tersebut bisa terjadi. Artinya setara dengan 『絶対に〜できるはずがない』 (Mustahil bisa).",
    "cautionNote": "Hanya digunakan dalam percakapan akrab/lisan kasual, tidak boleh dipakai dalam laporan formal tertulis atau kepada atasan.",
    "examples": [
      {
        "id": "ex-kkonai-1",
        "textJp": "たった一日でこの分厚い専門書を全部読めっこないよ。",
        "ruby": "たった[一日:いちにち]でこの[分厚:ぶあつ]い[専門書:せんもんしょ]を[全部:ぜんぶ][読:よ]めっこないよ。",
        "textId": "Hanya dalam waktu satu hari mana mungkin bisa membaca habis buku referensi setebal ini!",
        "contextNote": "Penolakan logis terhadap target yang mustahil."
      },
      {
        "id": "ex-kkonai-2",
        "textJp": "こんな複雑なパスワード、誰にも推測されっこないから安心しなよ。",
        "ruby": "こんな[複雑:ふくざつ]なパスワード、[誰:だれ]にも[推測:すいそく]されっこないから[安心:あんしん]しなよ。",
        "textId": "Kata sandi serumit ini, mana mungkin bisa ditebak oleh siapa pun, jadi tenanglah.",
        "contextNote": "Bentuk pasif penolakan: 'mana mungkin ditebak orang'."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜はずがない (mustahil)",
        "summary": "はずがない = mustahil menurut nalar formal.",
        "distinctionId": "『〜っこない』 adalah ragam percakapan santai yang sangat ekspresif dan lugas."
      }
    ],
    "questions": [
      {
        "id": "q-b12-04",
        "type": "seiretsu",
        "questionNumber": 43,
        "questionJp": "いくら彼が天才でも、　＿＿　＿＿　★　＿＿　っこない。",
        "questionRuby": "いくら[彼:かれ]が[天才:てんさい]でも、　＿＿　＿＿　★　＿＿　っこない。",
        "questionTranslation": "Betapa pun hebatnya dia seorang genius, masalah serumit ini mana mungkin bisa diselesaikan seorang diri.",
        "items": [
          "こんな難問を",
          "一人だけで",
          "解決でき",
          "短時間で"
        ],
        "correctOrder": [
          0,
          3,
          1,
          2
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『いくら彼が天才でも、 [こんな難問を] [短時間で] [一人だけで] [解決でき] っこない』. Kata di posisi bintang (★) adalah 『一人だけで』."
      }
    ]
  },

  {
    "id": "n3-b12-ni-chigainai",
    "chapterNumber": 12,
    "chapterTitle": "第12課: 確信・推量・評価 (Keyakinan & Tingkat Dugaan)",
    "category": "judgment",
    "categoryLabel": "確信・推量",
    "patternJp": "〜に違いない",
    "patternKana": "にちがいない",
    "meaningId": "Pasti tidak salah lagi... (keyakinan teguh pembicara berdasarkan bukti)",
    "connection": "動詞・イ形容詞普通形 ＋ に違いない\nナ形容詞・名詞（だ 省く） ＋ に違いない",
    "coreConcept": "Pembicara memiliki keyakinan intuitif atau logis yang amat kuat (hampir 100%) bahwa dugaannya tersebut tidak mungkin meleset.",
    "cautionNote": "Perhatikan sambungannya pada kata benda dan na-adjektiva: tidak memakai 『だ』 (cth: 犯人に違いない ○, 犯人だに違いない ✕).",
    "examples": [
      {
        "id": "ex-chigai-1",
        "textJp": "彼があれほど熱心に練習を重ねてきたのだから、今回のコンクールで優勝するに違いない。",
        "ruby": "[彼:かれ]があれほど[熱心:ねっしん]に[練習:れんしゅう]を[重:かさ]ねてきたのだから、[今回:こんかい]のコンクールで[優勝:ゆうしょう]するに[違:ちが]いない。",
        "textId": "Mengingat dia telah berlatih begitu tekunnya secara berkesinambungan, dia pasti tidak salah lagi akan menjadi juara pada kompetisi kali ini.",
        "contextNote": "Keyakinan teguh berdasarkan fakta ketekunan latihan."
      },
      {
        "id": "ex-chigai-2",
        "textJp": "明かりがついていないところを見ると、鈴木さんはまだ帰宅していないに違いない。",
        "ruby": "[明:あ]かりがついていないところを[見:み]ると、[鈴木:すずき]さんはまだ[帰宅:きたく]していないに[違:ちが]いない。",
        "textId": "Melihat lampu rumahnya yang masih padam, Pak Suzuki pasti tidak salah lagi belum pulang ke rumah.",
        "contextNote": "Deduksi logis dari fakta lampu mati."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜かもしれない (mungkin)",
        "summary": "かもしれない = probabilitas rendah (~50%), sekadar kemungkinan.",
        "distinctionId": "『〜に違いない』 adalah keyakinan tinggi mendekati kepastian mutlak (95-99%)."
      }
    ],
    "questions": [
      {
        "id": "q-b12-01",
        "type": "cloze",
        "questionNumber": 44,
        "questionJp": "あれだけの人気作なら、映画館は満員に（　　）。",
        "questionRuby": "あれだけの[人気作:にんきさく]なら、[映画館:えいがかん]は[満員:まんいん]に（　　）。",
        "questionTranslation": "Karya sepopuler itu, bioskop pasti tidak salah lagi akan penuh sesak penonton.",
        "options": [
          {
            "key": "1",
            "textJp": "違いない",
            "textId": "Pasti tidak salah lagi (名詞＋に違いない)"
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Di sisi lain sebaliknya"
          },
          {
            "key": "3",
            "textJp": "わけだ",
            "textId": "Wajar demikian faktanya"
          },
          {
            "key": "4",
            "textJp": "気味だ",
            "textId": "Bergejala sedikit"
          }
        ],
        "correctKey": "1",
        "explanation": "Pola keyakinan kuat menempel langsung pada kata benda 『満員』 menjadi 『満員に違いない』."
      }
    ]
  },

  {
    "id": "n3-b12-ni-kimatte-iru",
    "chapterNumber": 12,
    "chapterTitle": "第12課: 確信・推量・評価 (Keyakinan & Tingkat Dugaan)",
    "category": "judgment",
    "categoryLabel": "確信・推量",
    "patternJp": "〜に決まっている",
    "patternKana": "にきまっている",
    "meaningId": "Sudah pasti / Pastilah begitu hasilnya (asumsi subjektif pembicara tanpa keraguan)",
    "connection": "動詞・イ形容詞普通形 ＋ に決まっている\nナ形容詞・名詞（だ 省く） ＋ に決まっている",
    "coreConcept": "Pembicara secara tegas dan lugas meyakini bahwa hal tersebut 100% pasti terjadi atau memang demikian adanya, berdasarkan prasangka atau keyakinan subjektifnya.",
    "cautionNote": "Lebih bersifat subjektif dan emosional dibanding 『〜に違いない』 yang didasarkan pada penalaran bukti objektif.",
    "examples": [
      {
        "id": "ex-kimari-1",
        "textJp": "あんなに真面目で腕の良い職人が作った家具なら、丈夫に決まっている。",
        "ruby": "あんなに[真面目:まじめ]で[腕:うで]の[良:よ]い[職人:しょくにん]が[作:つく]った[家具:かぐ]なら、[丈夫:じょうぶ]に[決:き]まっている。",
        "textId": "Kalau perabotan yang dibuat oleh pengrajin yang sebegitu jujur dan terampilnya, pastilah sudah tentu awet dan kokoh.",
        "contextNote": "Asumsi mantap pembicara menilai kualitas barang."
      },
      {
        "id": "ex-kimari-2",
        "textJp": "練習もろくにしないで本番に挑んでも、負けるに決まっている。",
        "ruby": "[練習:れんしゅう]もろくにしないで[本番:ほんばん]に[挑:いど]んでも、[負:ま]けるに[決:き]まっている。",
        "textId": "Tanpa latihan yang matang lalu nekat maju ke laga sungguhan, pastilah sudah pasti bakal menelan kekalahan.",
        "contextNote": "Kenyataan mutlak dari kurangnya persiapan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜に違いない",
        "summary": "に違いない = keyakinan berdasarkan petunjuk/bukti deduksi ilmiah/logis.",
        "distinctionId": "『〜に決まっている』 mencerminkan ketegasan penilaian pribadi yang lugas tanpa ragu."
      }
    ],
    "questions": [
      {
        "id": "q-b12-03",
        "type": "cloze",
        "questionNumber": 45,
        "questionJp": "こんなに安い商品、すぐに壊れるに（　　）。",
        "questionRuby": "こんなに[安:やす]い[商品:しょうひん]、すぐに[壊:こわ]れるに（　　）。",
        "questionTranslation": "Barang semurah ini, pastilah sudah tentu bakal cepat rusak.",
        "options": [
          {
            "key": "1",
            "textJp": "決まっている",
            "textId": "Pastilah sudah tentu (に決まっている)"
          },
          {
            "key": "2",
            "textJp": "反面だ",
            "textId": "Di sisi lain sebaliknya"
          },
          {
            "key": "3",
            "textJp": "おそれだ",
            "textId": "Ketakutan"
          },
          {
            "key": "4",
            "textJp": "わけだ",
            "textId": "Wajar demikian"
          }
        ],
        "correctKey": "1",
        "explanation": "Asumsi subjektif langsung pembicara terhadap barang murahan adalah 『動詞 ＋ に決まっている』."
      }
    ]
  },

  {
    "id": "n3-b12-osore-ga-aru",
    "chapterNumber": 12,
    "chapterTitle": "第12課: 確信・推量・評価 (Keyakinan & Tingkat Dugaan)",
    "category": "judgment",
    "categoryLabel": "確信・推量",
    "patternJp": "〜おそれがある",
    "patternKana": "おそれがある",
    "meaningId": "Dikhawatirkan / Ada risiko ancaman terjadinya hal buruk...",
    "connection": "動詞辞書形 / ない形 ＋ おそれがある\n名詞＋の ＋ おそれがある",
    "coreConcept": "Digunakan dalam berita cuaca, peringatan pemerintah, atau analisis medis/finansial untuk menyatakan adanya ancaman risiko atau kemungkinan terjadinya bencana/kerugian serius.",
    "cautionNote": "Hanya digunakan untuk hal-hal yang berbahaya, merugikan, atau negatif. Tidak bisa digunakan untuk peristiwa baik (tidak bisa: 合格するおそれがある ✕).",
    "examples": [
      {
        "id": "ex-osore-1",
        "textJp": "今夜の寒波により、路面が凍結してスリップ事故が多発するおそれがあります。",
        "ruby": "[今夜:こんや]の[寒波:かんぱ]により、[路面:ろめん]が[凍結:とうけつ]してスリップ[事故:じこ]が[多発:たはつ]するおそれがあります。",
        "textId": "Akibat gelombang dingin malam ini, permukaan jalan dikhawatirkan membeku dan memicu maraknya kecelakaan tergelincir.",
        "contextNote": "Peringatan keselamatan lalulintas resmi dalam siaran berita."
      },
      {
        "id": "ex-osore-2",
        "textJp": "このまま地球温暖化が進行すれば、多くの島国が水没するおそれがある。",
        "ruby": "このまま[地球温暖化:ちきゅうおんだんか]が[進行:しんこう]すれば、[多:おお]くの[島国:しまぐに]が[水没:すいぼつ]するおそれがある。",
        "textId": "Bila pemanasan global terus berlanjut tanpa kendali seperti ini, dikhawatirkan banyak negara kepulauan akan tenggelam ke dasar laut.",
        "contextNote": "Prediksi ancaman krisis lingkungan global."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜かもしれない (mungkin)",
        "summary": "かもしれない = kemungkinan umum tanpa batas positif/negatif.",
        "distinctionId": "『〜おそれがある』 adalah register formal berita/hukum khusus menyoroti ancaman bahaya yang menakutkan."
      }
    ],
    "questions": [
      {
        "id": "q-b12-02",
        "type": "cloze",
        "questionNumber": 46,
        "questionJp": "長時間のスマートフォンの使用は、視力を低下させる（　　）。",
        "questionRuby": "[長時間:ちょうじかん]のスマートフォンの[使用:しよう]は、[視力:しりょく]を[低下:ていか]させる（　　）。",
        "questionTranslation": "Penggunaan ponsel pintar dalam durasi berlebihan dikhawatirkan dapat menurunkan ketajaman daya penglihatan.",
        "options": [
          {
            "key": "1",
            "textJp": "おそれがある",
            "textId": "Dikhawatirkan berisiko buruk"
          },
          {
            "key": "2",
            "textJp": "おかげがある",
            "textId": "Berkat (salah susun)"
          },
          {
            "key": "3",
            "textJp": "反面がある",
            "textId": "Ada sisi lain"
          },
          {
            "key": "4",
            "textJp": "せいがある",
            "textId": "Ada gara-gara (salah susun)"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan risiko kesehatan medis yang mengkhawatirkan adalah 『動詞 ＋ おそれがある』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第13課: 関連・対応・関係 (Hubungan & Respons)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b13-ni-kanshite",
    "chapterNumber": 13,
    "chapterTitle": "第13課: 関連・対応・関係 (Hubungan & Respons)",
    "category": "judgment",
    "categoryLabel": "関連・対応",
    "patternJp": "〜に関して / 〜に関する",
    "patternKana": "にかんして / にかんする",
    "meaningId": "Mengenai / Berkenaan dengan... (topik formal bahasan, investigasi, atau pidato)",
    "connection": "名詞 ＋ に関して / に関しても\n名詞 ＋ に関する ＋ 名詞",
    "coreConcept": "Merupakan ragam formal dari 『〜について』. Menandai objek atau isu pokok yang sedang diselidiki, diteliti, dibahas dalam seminar, atau diuraikan dalam laporan resmi.",
    "cautionNote": "Cakupannya lebih luas, formal, dan berbobot daripada 『〜について』. Bila memodifikasi kata benda di belakangnya, wajib menggunakan 『に関する』.",
    "examples": [
      {
        "id": "ex-kan-1",
        "textJp": "今回の不祥事に関して、会社側から詳しい経緯の説明が行われた。",
        "ruby": "[今回:こんかい]の[不祥事:ふしょうじ]に[関:かん]して、[会社側:かいしゃがわ]から[詳:くわ]しい[経緯:けいい]の[説明:せつめい]が[行:おこな]われた。",
        "textId": "Berkenaan dengan skandal yang terjadi kali ini, pihak perusahaan telah memberikan penjelasan kronologi terperinci.",
        "contextNote": "Isu investigasi resmi dalam konferensi pers."
      },
      {
        "id": "ex-kan-2",
        "textJp": "環境保護に関する国際条約が、全会一致で採択された。",
        "ruby": "[環境保護:かんきょうほご]に[関:かん]する[国際条約:こくさいじょうやく]が、[全会一致:ぜんかいいっち]で[採択:さいたく]された。",
        "textId": "Perjanjian internasional yang berkaitan dengan perlindungan lingkungan hidup telah disahkan secara aklamasi.",
        "contextNote": "Modifikasi kata benda: 'traktat berkenaan dengan lingkungan'."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜について (tentang)",
        "summary": "について = membicarakan topik biasa dalam percakapan sehari-hari.",
        "distinctionId": "『〜に関して』 bernuansa lebih akademis, hukum, atau jurnalisme formal."
      }
    ],
    "questions": [
      {
        "id": "q-b13-01",
        "type": "cloze",
        "questionNumber": 47,
        "questionJp": "新入社員の研修計画（　　）、来週の会議で話し合います。",
        "questionRuby": "[新入社員:しんにゅうしゃいん]の[研修計画:けんしゅうけいかく]（　　）、[来週:らいしゅう]の[会議:かいぎ]で[話:はな]し[合:あ]います。",
        "questionTranslation": "Berkenaan dengan rencana pelatihan karyawan baru, akan dibahas dalam rapat pekan depan.",
        "options": [
          {
            "key": "1",
            "textJp": "に関して",
            "textId": "Berkenaan dengan topik..."
          },
          {
            "key": "2",
            "textJp": "に反して",
            "textId": "Berlawanan dengan..."
          },
          {
            "key": "3",
            "textJp": "につれて",
            "textId": "Seiring dengan..."
          },
          {
            "key": "4",
            "textJp": "反面",
            "textId": "Di sisi lain sebaliknya..."
          }
        ],
        "correctKey": "1",
        "explanation": "Topik bahasan agenda rapat resmi ditandai dengan 『名詞 ＋ に関して』."
      }
    ]
  },

  {
    "id": "n3-b13-ni-kotaete",
    "chapterNumber": 13,
    "chapterTitle": "第13課: 関連・対応・関係 (Hubungan & Respons)",
    "category": "judgment",
    "categoryLabel": "関連・対応",
    "patternJp": "〜にこたえて / 〜にこたえる",
    "patternKana": "にこたえて / にこたえる",
    "meaningId": "Menjawab / Membalas... (merespons harapan, dukungan, atau permintaan pihak lain)",
    "connection": "名詞 ＋ にこたえて\n名詞 ＋ にこたえる ＋ 名詞",
    "coreConcept": "Subjek melakukan suatu aksi nyata untuk memenuhi atau membalas harapan (期待), permintaan (要望), atau sorak dukungan (声援) dari orang lain.",
    "cautionNote": "Kata benda di depan selalu berkaitan dengan harapan atau perasaan orang lain: 期待, 応援, 要望, 声援, リクエスト.",
    "examples": [
      {
        "id": "ex-kota-1",
        "textJp": "選手たちはファンの熱烈な応援にこたえて、見事な逆転勝利を収めた。",
        "ruby": "[選手:せんしゅ]たちはファンの[熱烈:ねつれつ]な[応援:おうえん]にこたえて、[見事:みごと]な[逆転勝利:ぎゃくてんしょうり]を[収:おさ]めた。",
        "textId": "Para atlet menjawab dukungan hangat yang membara dari penggemar dengan memetik kemenangan berbalik yang spektakuler.",
        "contextNote": "Aksi gemilang membalas sorak dukungan fans."
      },
      {
        "id": "ex-kota-2",
        "textJp": "お客様からの強いご要望にこたえて、名物メニューの販売を再開しました。",
        "ruby": "お[客様:きゃくさま]からの[強:つよ]いご[要望:ようぼう]にこたえて、[名物:めいぶつ]メニューの[販売:はんばい]を[再開:さいかい]しました。",
        "textId": "Menjawab tingginya permintaan dari para pelanggan, kami telah membuka kembali penjualan menu andalan tersebut.",
        "contextNote": "Merespons permohonan konsumen."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜に対して (arah objek)",
        "summary": "に対して = sasaran perlakuan (misal: bersikap ramah pada tamu).",
        "distinctionId": "『〜にこたえて』 mengandung muatan balasan budi atas energi/harapan yang telah diberikan."
      }
    ],
    "questions": [
      {
        "id": "q-b13-03",
        "type": "cloze",
        "questionNumber": 48,
        "questionJp": "両親の大きな期待（　　）、彼は猛勉強して難関大学に合格した。",
        "questionRuby": "[両親:りょうしん]の[大:おお]きな[期待:きたい]（　　）、[彼:かれ]は[猛勉強:もうべんきょう]して[難関大学:なんかんだいがく]に[合格:ごうかく]した。",
        "questionTranslation": "Menjawab harapan besar kedua orang tuanya, dia belajar luar biasa keras hingga lulus di universitas bergengsi.",
        "options": [
          {
            "key": "1",
            "textJp": "にこたえて",
            "textId": "Menjawab harapan orang tua"
          },
          {
            "key": "2",
            "textJp": "にかけて",
            "textId": "Membentang sampai"
          },
          {
            "key": "3",
            "textJp": "を通じて",
            "textId": "Sepanjang waktu"
          },
          {
            "key": "4",
            "textJp": "反面",
            "textId": "Di sisi lain sebaliknya"
          }
        ],
        "correctKey": "1",
        "explanation": "Menjawab dan membalas harapan orang tua (期待) menggunakan 『名詞 ＋ にこたえて』."
      }
    ]
  },

  {
    "id": "n3-b13-ni-oujite",
    "chapterNumber": 13,
    "chapterTitle": "第13課: 関連・対応・関係 (Hubungan & Respons)",
    "category": "judgment",
    "categoryLabel": "関連・対応",
    "patternJp": "〜に応じて / 〜に応じた",
    "patternKana": "におうじて / におじた",
    "meaningId": "Sesuai dengan... (menyesuaikan perubahan tindakan menurut kapasitas, kebutuhan, atau situasi)",
    "connection": "名詞 ＋ に応じて / に応じ\n名詞 ＋ に応じた ＋ 名詞",
    "coreConcept": "Tindakan atau perlakuan diubah atau disesuaikan secara proporsional mengikuti perbedaan kondisi subjek (misal: sesuai anggaran, sesuai tingkat kemampuan, sesuai cuaca).",
    "cautionNote": "Di depan 『に応じて』 selalu kata benda yang memiliki skala perbedaan atau variasi (usia, kemampuan, permintaan, cuaca).",
    "examples": [
      {
        "id": "ex-ouji-1",
        "textJp": "受講生の日本語レベルに応じて、クラスを三段階に編成している。",
        "ruby": "[受講生:じゅこうせい]の[日本語:にほんご]レベルに[応:おう]じて、クラスを[三段階:さんだんかい]に[編成:へんせい]している。",
        "textId": "Sesuai dengan level kecakapan bahasa Jepang para siswa, kelas disusun ke dalam tiga tingkatan berbeda.",
        "contextNote": "Penyesuaian kelas berdasarkan tingkatan kemampuan."
      },
      {
        "id": "ex-ouji-2",
        "textJp": "予算に応じた最適な旅行プランをご提案いたします。",
        "ruby": "[予算:よさん]に[応:おう]じた[最適:さいてき]な[旅行:りょこう]プランをご[提案:ていあん]いたします。",
        "textId": "Kami mengusulkan paket perjalanan terbaik yang disesuaikan dengan anggaran Anda.",
        "contextNote": "Modifikasi kata benda: 'rencana yang sesuai anggaran'."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜にこたえて (menjawab harapan)",
        "summary": "にこたえて = merespons doa, cinta, atau ekspektasi dukungan.",
        "distinctionId": "『〜に応じて』 adalah penyesuaian fleksibel matematis/logis terhadap variasi kebutuhan."
      }
    ],
    "questions": [
      {
        "id": "q-b13-02",
        "type": "seiretsu",
        "questionNumber": 49,
        "questionJp": "当クリニックでは　＿＿　＿＿　★　＿＿　治療方針を決定します。",
        "questionRuby": "[当:とう]クリニックでは　＿＿　＿＿　★　＿＿　[治療方針:ちりょうほうしん]を[決定:けってい]します。",
        "questionTranslation": "Di klinik kami, kebijakan penanganan medis diputuskan sesuai dengan kondisi kesehatan masing-masing pasien.",
        "items": [
          "患者さん一人ひとりの",
          "症状や体質に",
          "応じて",
          "最適な"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『当クリニックでは [患者さん一人ひとりの] [症状や体質に] [応じて] [最適な] 治療方針を決定します』. Kata di posisi bintang (★) adalah 『応じて』."
      }
    ]
  },

  {
    "id": "n3-b13-ni-watatte",
    "chapterNumber": 13,
    "chapterTitle": "第13課: 関連・対応・関係 (Hubungan & Respons)",
    "category": "limitation",
    "categoryLabel": "範囲・限定",
    "patternJp": "〜にわたって / 〜にわたる",
    "patternKana": "にわたって / にわたる",
    "meaningId": "Sepanjang / Selama rentang waktu yang lama / Menyeluruh di seluruh wilayah luas...",
    "connection": "名詞 ＋ にわたって / にわたり\n名詞 ＋ にわたる ＋ 名詞",
    "coreConcept": "Menyatakan suatu rentang waktu yang panjang (berhari-hari, berbulan-bulan, puluhan tahun) atau bentang wilayah geografis yang luas, di mana peristiwa tersebut berlangsung secara menyeluruh dengan skala besar.",
    "cautionNote": "Kata benda di depan selalu menunjukkan kuantitas jangka panjang atau skala wilayah besar: 10年, 数か月, 全域, 何キロ.",
    "examples": [
      {
        "id": "ex-wata-1",
        "textJp": "十日間にわたる激しい選挙戦が、いよいよ今夜幕を閉じる。",
        "ruby": "[十日間:とおかかん]にわたる[激:はげ]しい[選挙戦:せんきょせん]が、いよいよ[今夜:こんや][幕:まく]を[閉:と]じる。",
        "textId": "Pertarungan kampanye pemilu sengit yang membentang selama sepuluh hari penuh akhirnya malam ini menutup tirai.",
        "contextNote": "Durasi panjang pertarungan pemilu (10 hari)."
      },
      {
        "id": "ex-wata-2",
        "textJp": "台風の影響は、関東地方のほぼ全域にわたって及んだ。",
        "ruby": "[台風:たいふう]の[影響:えいきょう]は、[関東地方:かんとうちほう]のほぼ[全域:ぜんいき]にわたって[及:およ]んだ。",
        "textId": "Dampak amukan badai topan menyebar menyeluruh ke hampir seluruh penjuru kawasan Kanto.",
        "contextNote": "Skala cakupan wilayah geografis yang amat luas."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜から〜にかけて (rentang bertahap)",
        "summary": "にかけて = batas transisi samar dari A ke B.",
        "distinctionId": "『〜にわたって』 menekankan bobot skala besar atau durasi yang luar biasa luasnya."
      }
    ],
    "questions": [
      {
        "id": "q-b13-04",
        "type": "cloze",
        "questionNumber": 50,
        "questionJp": "三日（　　）停電が続き、住民の生活に大きな支障が出た。",
        "questionRuby": "[三日:みっか]（　　）[停電:ていでん]が[続:つづ]き、[住民:じゅうみん]の[生活:せいかつ]に[大:おお]きな[支障:ししょう]が[出:で]た。",
        "questionTranslation": "Pemadaman listrik berlangsung selama tiga hari berturut-turut, menimbulkan kendala besar bagi kehidupan warga.",
        "options": [
          {
            "key": "1",
            "textJp": "にわたって",
            "textId": "Membentang selama skala durasi (三日間にわたって)"
          },
          {
            "key": "2",
            "textJp": "に反して",
            "textId": "Berlawanan dengan"
          },
          {
            "key": "3",
            "textJp": "わりに",
            "textId": "Untuk ukuran"
          },
          {
            "key": "4",
            "textJp": "反面",
            "textId": "Di sisi lain"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan durasi pemadaman listrik skala besar selama 3 hari adalah 『期間名詞 ＋ にわたって』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第14課: 基準・根拠・準拠 (Dasar Acuan & Landasan)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b14-ni-motozuite",
    "chapterNumber": 14,
    "chapterTitle": "第14課: 基準・根拠・準拠 (Dasar Acuan & Landasan)",
    "category": "judgment",
    "categoryLabel": "基準・根拠",
    "patternJp": "〜に基づいて / 〜に基づく",
    "patternKana": "にもとづいて / にもとづく",
    "meaningId": "Berdasarkan / Berlandaskan pada... (data ilmiah, hukum, fakta konkret, atau prinsip acuan)",
    "connection": "名詞 ＋ に基づいて / に基づき\n名詞 ＋ に基づく ＋ 名詞",
    "coreConcept": "Menyatakan bahwa suatu keputusan, tindakan, atau perancangan dibuat dengan berlandaskan pada data angka nyata, undang-undang resmi, fakta sejarah, atau teori ilmiah yang kokoh.",
    "cautionNote": "Merupakan ragam formal. Berbeda dengan 『〜をもとに』 yang sering dipakai untuk bahan kreasi seni (novel/film), 『〜に基づいて』 lebih ke aturan, data riset, atau hukum.",
    "examples": [
      {
        "id": "ex-moto-1",
        "textJp": "厳密な市場調査のデータに基づいて、新商品の開発戦略を策定した。",
        "ruby": "[厳密:げんみつ]な[市場調査:しじょうちょうさ]のデータに[基:もと]づいて、[新商品:しんしょうひん]の[開発戦略:かいはつせんりゃく]を[策定:さくてい]した。",
        "textId": "Berdasarkan data riset pasar yang ketat dan akurat, kami merumuskan strategi pengembangan produk baru.",
        "contextNote": "Keputusan bisnis berlandaskan data riset."
      },
      {
        "id": "ex-moto-2",
        "textJp": "法律に基づく適正な手続きを経て、契約が締結された。",
        "ruby": "[法律:ほうりつ]に[基:もと]づく[適正:てきせい]な[手続:てつづ]きを[経:へ]て、[契約:けいやく]が[締結:ていけつ]された。",
        "textId": "Melalui prosedur resmi yang sah berlandaskan hukum, kontrak perjanjian tersebut telah resmi diteken.",
        "contextNote": "Modifikasi kata benda berlandaskan perundang-undangan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜をもとに (bahan inspirasi)",
        "summary": "をもとに = memakai bahan/ide sebagai bahan baku pembuatan.",
        "distinctionId": "『〜に基づいて』 penekanannya adalah kesahihan dasar acuan (data akurat atau payung hukum)."
      }
    ],
    "questions": [
      {
        "id": "q-b14-01",
        "type": "cloze",
        "questionNumber": 51,
        "questionJp": "長年の実験結果（　　）、新しい治療薬の効果が実証された。",
        "questionRuby": "[長年:ながねん]の[実験結果:じっけんけっか]（　　）、[新:あたら]しい[治療薬:ちりょうやく]の[効果:こうか]が[実証:じっしょう]された。",
        "questionTranslation": "Berdasarkan hasil eksperimen selama bertahun-tahun, khasiat obat terapi baru tersebut telah terbukti secara ilmiah.",
        "options": [
          {
            "key": "1",
            "textJp": "に基づいて",
            "textId": "Berdasarkan data ilmiah acuan"
          },
          {
            "key": "2",
            "textJp": "をはじめ",
            "textId": "Mulai dari contoh utama"
          },
          {
            "key": "3",
            "textJp": "にかけて",
            "textId": "Membentang sampai"
          },
          {
            "key": "4",
            "textJp": "に反して",
            "textId": "Berlawanan dengan"
          }
        ],
        "correctKey": "1",
        "explanation": "Pembuktian ilmiah berpijak pada data hasil eksperimen bertahun-tahun menggunakan 『名詞 ＋ に基づいて』."
      }
    ]
  },

  {
    "id": "n3-b14-ni-sotte",
    "chapterNumber": 14,
    "chapterTitle": "第14課: 基準・根拠・準拠 (Dasar Acuan & Landasan)",
    "category": "judgment",
    "categoryLabel": "基準・根拠",
    "patternJp": "〜に沿って / 〜に沿った",
    "patternKana": "にそって / にそった",
    "meaningId": "1) Mengikuti pedoman / 2) Menyusuri sepanjang garis rute...",
    "connection": "名詞 ＋ に沿って / に沿い\n名詞 ＋ に沿った ＋ 名詞",
    "coreConcept": "Memiliki 2 fungsi: 1) Bertindak taat tanpa menyimpang dari aturan, rencana, manual, atau harapan. 2) Bergerak mengikuti alur fisik yang panjang (sungai, rel kereta, garis pantai).",
    "cautionNote": "Menyiratkan bahwa ada garis acuan (garis rute atau dokumen pedoman) dan pembicara menelusurinya lurus tanpa keluar jalur.",
    "examples": [
      {
        "id": "ex-sotte-1",
        "textJp": "配布された作業マニュアルの手順に沿って、慎重に機械を操作してください。",
        "ruby": "[配布:はいふ]された[作業:さぎょう]マニュアルの[手順:てじゅん]に[沿:そ]って、[慎重:しんちょう]に[機械:きかい]を[操作:そうさ]してください。",
        "textId": "Tolong operasikan mesin ini secara hati-hati mengikuti langkah-langkah yang tercantum di manual kerja.",
        "contextNote": "Ketaatan pada alur panduan manual."
      },
      {
        "id": "ex-sotte-2",
        "textJp": "川の土手に沿って桜並木が続き、春には見事な花を咲かせる。",
        "ruby": "[川:かわ]の[土手:どて]に[沿:そ]って[桜並木:さくらなみき]が[続:つづ]き、[春:はる]には[見事:みごと]な[花:はな]を[咲:さ]かせる。",
        "textId": "Menyusuri bantaran sungai berderet pohon sakura yang merekah indah saat musim semi tiba.",
        "contextNote": "Mengikuti garis lintasan fisik tepi sungai."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜どおりに (persis sesuai)",
        "summary": "どおりに = persis sama detailnya tanpa selisih.",
        "distinctionId": "『〜に沿って』 mengalir mengikuti garis koridor pedoman agar tetap pada jalurnya."
      }
    ],
    "questions": [
      {
        "id": "q-b14-03",
        "type": "cloze",
        "questionNumber": 52,
        "questionJp": "政府が定めた基本方針（　　）、各自治体で対策が進められている。",
        "questionRuby": "[政府:せいふ]が[定:さだ]めた[基本方針:きほんほうしん]（　　）、[各自治体:かくじちたい]で[対策:たいさく]が[進:すす]められている。",
        "questionTranslation": "Mengikuti arah kebijakan dasar yang ditetapkan pemerintah, langkah penanggulangan dijalankan di tiap daerah.",
        "options": [
          {
            "key": "1",
            "textJp": "に沿って",
            "textId": "Mengikuti garis koridor pedoman..."
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Di sisi lain sebaliknya"
          },
          {
            "key": "3",
            "textJp": "せいか",
            "textId": "Mungkin karena gara-gara"
          },
          {
            "key": "4",
            "textJp": "最中に",
            "textId": "Tepat di tengah kesibukan"
          }
        ],
        "correctKey": "1",
        "explanation": "Pelaksanaan program daerah mengalir mengikuti arah garis kebijakan pemerintah menggunakan 『名詞 ＋ に沿って』."
      }
    ]
  },

  {
    "id": "n3-b14-no-moto-de",
    "chapterNumber": 14,
    "chapterTitle": "第14課: 基準・根拠・準拠 (Dasar Acuan & Landasan)",
    "category": "judgment",
    "categoryLabel": "基準・根拠",
    "patternJp": "〜のもとで / 〜のもとに",
    "patternKana": "のもとで / のもとに",
    "meaningId": "Di bawah bimbingan / Di bawah pengaruh kondisi atau naungan...",
    "connection": "名詞 ＋ のもとで / のもとに",
    "coreConcept": "Menyatakan melakukan suatu aktivitas penting di bawah pengaruh, bimbingan, atau perlindungan sosok berwibawa (guru besar, pelatih, orang tua), atau di bawah kondisi atmosfer tertentu (perdamaian, keadilan).",
    "cautionNote": "『〜のもとで』 condong ke bimbingan manusia nyata (cth: 先生のもとで研究する). Sedangkan 『〜のもとに』 condong ke konsep abstrak/kondisi hukum (cth: 法の公平のもとに).",
    "examples": [
      {
        "id": "ex-moto-de-1",
        "textJp": "世界的な名指揮者のもとで、若き音楽家たちが熱心に練習に励んでいる。",
        "ruby": "[世界的:せかいてき]な[名指揮者:めいしきしゃ]のもとで、[若:わか]き[音楽家:おんがくか]たちが[熱心:ねっしん]に[練習:れんしゅう]に[励:はげ]んでいる。",
        "textId": "Di bawah bimbingan konduktor ternama kaliber dunia, para musisi muda berlatih mengasah kemampuan dengan penuh semangat.",
        "contextNote": "Bimbingan langsung dari figur maestro."
      },
      {
        "id": "ex-moto-de-2",
        "textJp": "人類の自由と平等の旗印のもとに、多くの人々が立ち上がった。",
        "ruby": "[人類:じんるい]の[自由:じゆう]と[平等:びょうどう]の[旗印:はたじるし]のもとに、[多:おお]くの[人々:ひとびと]が[立:た]ち[上:あ]がった。",
        "textId": "Di bawah panji naungan kebebasan dan kesetaraan umat manusia, banyak orang bangkit berjuang.",
        "contextNote": "Kondisi di bawah panji konsep abstrak luhur."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜によって (oleh)",
        "summary": "によって = pelaku atau agen penyebab.",
        "distinctionId": "『〜のもとで』 menonjolkan atmosfer perlindungan dan bimbingan yang melingkupi subjek."
      }
    ],
    "questions": [
      {
        "id": "q-b14-04",
        "type": "cloze",
        "questionNumber": 53,
        "questionJp": "優秀な指導官の（　　）、厳しい実務訓練を乗り越えた。",
        "questionRuby": "[優秀:ゆうしゅう]な[指導官:しどうかん]の（　　）、[厳:きび]しい[実務訓練:じつむくんれん]を[乗:の]り[越:こ]えた。",
        "questionTranslation": "Di bawah bimbingan instruktur yang luar biasa cakap, kami berhasil melewati gemblengan pelatihan praktik yang keras.",
        "options": [
          {
            "key": "1",
            "textJp": "もとで",
            "textId": "Di bawah bimbingan pembimbing (名詞+のもとで)"
          },
          {
            "key": "2",
            "textJp": "反面で",
            "textId": "Di sisi lain sebaliknya"
          },
          {
            "key": "3",
            "textJp": "最中で",
            "textId": "Di tengah kesibukan"
          },
          {
            "key": "4",
            "textJp": "せいで",
            "textId": "Gara-gara"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan belajar atau berlatih di bawah asuhan instruktur ahli adalah 『名詞 ＋ のもとで』."
      }
    ]
  },

  {
    "id": "n3-b14-wo-moto-ni",
    "chapterNumber": 14,
    "chapterTitle": "第14課: 基準・根拠・準拠 (Dasar Acuan & Landasan)",
    "category": "judgment",
    "categoryLabel": "基準・根拠",
    "patternJp": "〜をもとに / 〜をもとにして",
    "patternKana": "をもとに / をもとにして",
    "meaningId": "Berasaskan / Terinspirasi dari bahan mentah atau kisah nyata...",
    "connection": "名詞 ＋ をもとに / をもとにして\n名詞 ＋ をもとにした ＋ 名詞",
    "coreConcept": "Menjadikan suatu kejadian nyata, cerita masa lalu, atau bahan mentah sebagai pondasi material untuk menciptakan sesuatu yang baru (karya seni, novel, film, produk).",
    "cautionNote": "Sering menempel pada kata seperti: 実話 (kisah nyata), 経験 (pengalaman), アンケート (angket survei), 資料 (dokumen materi).",
    "examples": [
      {
        "id": "ex-wmoto-1",
        "textJp": "この映画は、実際に起きた感動的な実話をもとにして制作された。",
        "ruby": "この[映画:えいが]は、[実際:じっさい]に[起:お]きた[感動的:かんどうてき]な[実話:じつわ]をもとにして[制作:せいさく]された。",
        "textId": "Film ini diproduksi berasaskan pada sebuah kisah nyata menyentuh hati yang benar-benar terjadi.",
        "contextNote": "Kisah nyata sebagai materi dasar pembuatan film."
      },
      {
        "id": "ex-wmoto-2",
        "textJp": "ユーザーからのアンケート調査の結果をもとに、UIデザインを一新した。",
        "ruby": "ユーザーからのアンケート[調査:ちょうさ]の[結果:けっか]をもとに、UIデザインを[一新:いっしん]した。",
        "textId": "Berasaskan pada hasil survei kuesioner pengguna, kami memperbarui seluruh desain antarmuka (UI).",
        "contextNote": "Materi masukan pengguna sebagai dasar perombakan desain."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜から (bahan fisik kelihatan)",
        "summary": "から = bahan mentah yang mengalami perubahan wujud (misal: anggur jadi wine).",
        "distinctionId": "『〜をもとに』 adalah inspirasi atau pondasi konseptual penciptaan ide."
      }
    ],
    "questions": [
      {
        "id": "q-b14-02",
        "type": "seiretsu",
        "questionNumber": 54,
        "questionJp": "この小説は、　＿＿　＿＿　★　＿＿　描かれている。",
        "questionRuby": "この[小説:しょうせつ]は、　＿＿　＿＿　★　＿＿　[描:えが]かれている。",
        "questionTranslation": "Novel ini ditulis dan dilukiskan berasaskan pengalaman masa kecil sang penulis sendiri.",
        "items": [
          "作者自身の",
          "少年時代の",
          "体験を",
          "もとにして"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『この小説は、 [作者自身の] [少年時代の] [体験を] [もとにして] 描かれている』. Kata di posisi bintang (★) adalah 『体験を』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第15課: 比例・連動・推移 (Perubahan Proporsional)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b15-ippou-da",
    "chapterNumber": 15,
    "chapterTitle": "第15課: 比例・連動・推移 (Perubahan Proporsional)",
    "category": "change",
    "categoryLabel": "変化・推移",
    "patternJp": "〜一方だ",
    "patternKana": "いっぽうだ",
    "meaningId": "Kian terus menerus... ke satu arah tanpa henti (sering kali situasi memburuk)",
    "connection": "動詞辞書形（perubahan: 増える、減る、悪化する） ＋ 一方だ",
    "coreConcept": "Menunjukkan suatu kecenderungan perubahan keadaan yang terus meluncur ke satu kutub secara kontinu tanpa menunjukkan tanda-tanda berhenti (kebanyakan untuk tren memburuk, harga naik, atau penurunan stamina).",
    "cautionNote": "Kata kerja yang menempel harus kata kerja yang mengandung makna perubahan (変化動詞): 増える, 減る, 上がる, 下がる, 悪化する.",
    "examples": [
      {
        "id": "ex-ippou-1",
        "textJp": "物価の上昇に給与が追いつかず、家計の負担は重くなる一方だ。",
        "ruby": "[物価:ぶっか]の[上昇:じょうしょう]に[給与:きゅうよ]が[追:お]いつかず、[家計:かけい]の[負担:ふたん]は[重:おも]くなる[一方:いっぽう]だ。",
        "textId": "Kenaikan gaji tak mampu mengejar lonjakan harga barang, beban keuangan rumah tangga pun kian hari kian memberat.",
        "contextNote": "Beban ekonomi yang memburuk tanpa henti."
      },
      {
        "id": "ex-ippou-2",
        "textJp": "少子高齢化の影響で、地方の人口は減少する一方である。",
        "ruby": "[少子高齢化:しょうしこうれいか]の[影響:えいきょう]で、[地方:ちほう]の[人口:じんこう]は[減少:げんしょう]する[一方:いっぽう]である。",
        "textId": "Akibat dampak penurunan angka kelahiran dan penuaan populasi, jumlah penduduk daerah pedesaan terus merosot tanpa henti.",
        "contextNote": "Tren demografi yang menyusut terus."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ばかりだ",
        "summary": "ばかりだ = bisa bermakna persiapan sudah beres tinggal jalan, atau tren memburuk.",
        "distinctionId": "『〜一方だ』 khusus menggarisbawahi akselerasi perubahan tren secara berkesinambungan ke satu arah."
      }
    ],
    "questions": [
      {
        "id": "q-b15-03",
        "type": "cloze",
        "questionNumber": 55,
        "questionJp": "十分な休養を取らないと、疲労が（　　）ですよ。",
        "questionRuby": "[十分:じゅうぶん]な[休養:きゅうよう]を[取:と]らないと、[疲労:ひろう]が（　　）ですよ。",
        "questionTranslation": "Bila tidak mengambil istirahat yang memadai, rasa letih tubuh akan kian terus bertumpuk tanpa henti lho.",
        "options": [
          {
            "key": "1",
            "textJp": "たまる一方だ",
            "textId": "Kian menumpuk terus menerus"
          },
          {
            "key": "2",
            "textJp": "たまる反面",
            "textId": "Di sisi lain menumpuk"
          },
          {
            "key": "3",
            "textJp": "たまるわりに",
            "textId": "Mengingat menumpuk"
          },
          {
            "key": "4",
            "textJp": "たまるわけだ",
            "textId": "Wajar menumpuk"
          }
        ],
        "correctKey": "1",
        "explanation": "Kondisi keletihan yang terus terakumulasi ke arah buruk tanpa perbaikan diungkapkan dengan 『動詞辞書形 ＋ 一方だ』."
      }
    ]
  },

  {
    "id": "n3-b15-ni-shitagatte",
    "chapterNumber": 15,
    "chapterTitle": "第15課: 比例・連動・推移 (Perubahan Proporsional)",
    "category": "change",
    "categoryLabel": "変化・推移",
    "patternJp": "〜にしたがって / 〜に従い",
    "patternKana": "にしたがって / にしたがい",
    "meaningId": "1) Seiring dengan (perubahan bertahap) / 2) Mematuhi instruksi aturan...",
    "connection": "動詞辞書形 ＋ にしたがって\n名詞 ＋ にしたがって",
    "coreConcept": "Memiliki 2 arti: 1) Hubungan proporsional perubahan bertahap (mirip 『につれて』 namun lebih formal). 2) Mengikuti atau patuh pada instruksi/aturan (cth: petunjuk dokter, rambu lalu lintas).",
    "cautionNote": "Bila dipakai untuk arti 'mematuhi instruksi', maka bagian belakang kalimat berisi tindakan manusia yang taat (cth: 指示に従って避難する).",
    "examples": [
      {
        "id": "ex-shita-1",
        "textJp": "経験を積むにしたがって、冷静な判断が下せるようになってきた。",
        "ruby": "[経験:けいけん]を[積:つ]むにしたがって、[冷静:れいせい]な[判断:はんだん]が[下:くだ]せるようになってきた。",
        "textId": "Seiring dengan bertambahnya asam garam pengalaman, saya menjadi sanggup mengambil keputusan dengan kepala dingin.",
        "contextNote": "Arti 1: Kematangan mental yang seiring dengan jam terbang."
      },
      {
        "id": "ex-shita-2",
        "textJp": "警備員の指示に従って、非常階段から落ち着いて避難してください。",
        "ruby": "[警備員:けいびいん]の[指示:しじ]に[従:したが]って、[非常階段:ひじょうかいだん]から[落:お]ち[着:つ]いて[避難:ひなん]してください。",
        "textId": "Patuhi instruksi petugas keamanan, dan harap lakukan evakuasi dengan tenang melalui tangga darurat.",
        "contextNote": "Arti 2: Ketaatan mematuhi arahan petugas keselamatan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜につれて",
        "summary": "につれて = hanya untuk perubahan alami ke satu arah saja.",
        "distinctionId": "『〜にしたがって』 selain untuk perubahan proporsional, juga bisa untuk arti 'patuh menaati perintah/aturan'."
      }
    ],
    "questions": [
      {
        "id": "q-b15-02",
        "type": "seiretsu",
        "questionNumber": 56,
        "questionJp": "登山口から山頂へ　＿＿　＿＿　★　＿＿　険しくなっていった。",
        "questionRuby": "[登山口:とうざんぐち]から[山頂:さんちょう]へ　＿＿　＿＿　★　＿＿　[険:けわ]しくなっていった。",
        "questionTranslation": "Dari kaki pintu masuk jalur pendakian menuju puncak gunung, seiring langkah mendaki medannya kian terjal membahayakan.",
        "items": [
          "登り進めるに",
          "道の傾斜が",
          "したがって",
          "次第に"
        ],
        "correctOrder": [
          0,
          2,
          1,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『登山口から山頂へ [登り進めるに] [したがって] [道の傾斜が] [次第に] 険しくなっていった』. Kata di posisi bintang (★) adalah 『道の傾斜が』."
      }
    ]
  },

  {
    "id": "n3-b15-ni-tsurete",
    "chapterNumber": 15,
    "chapterTitle": "第15課: 比例・連動・推移 (Perubahan Proporsional)",
    "category": "change",
    "categoryLabel": "変化・推移",
    "patternJp": "〜につれて",
    "patternKana": "につれて",
    "meaningId": "Seiring dengan... berbanding lurus (perubahan alami bertahap ke satu arah)",
    "connection": "動詞辞書形 ＋ につれて\n名詞（perubahan aksi） ＋ につれて",
    "coreConcept": "Ketika A mengalami perubahan derajat secara bertahap, maka seiring berjalannya proses tersebut B juga ikut mengalami perubahan secara beriringan dan alami.",
    "cautionNote": "Perubahan yang terjadi adalah hal alamiah yang bertahap, bukan kehendak sengaja manusia (tidak diikuti ajakan atau perintah: 〜てください ✕).",
    "examples": [
      {
        "id": "ex-tsure-1",
        "textJp": "標高が高くなるにつれて、気温がぐんぐん下がり空気が薄くなってきた。",
        "ruby": "[標高:ひょうこう]が[高:たか]くなるにつれて、[気温:きおん]がぐんぐん[下:さ]がり[空気:くうき]が[薄:うす]くなってきた。",
        "textId": "Seiring dengan bertambah tingginya elevasi gunung, suhu udara merosot tajam dan udara terasa kian menipis.",
        "contextNote": "Korelasi alami ketinggian gunung dan penurunan suhu."
      },
      {
        "id": "ex-tsure-2",
        "textJp": "時代の変化につれて、人々の価値観や働き方も大きく変わった。",
        "ruby": "[時代:じだい]の[変化:へんか]につれて、[人々:ひとびと]の[価値観:かちかん]や[働:はたら]き[方:かた]も[大:おお]きく[変:か]わった。",
        "textId": "Seiring dengan bergulirnya perubahan zaman, nilai-nilai hidup dan cara kerja masyarakat pun mengalami transformasi besar.",
        "contextNote": "Perubahan zaman yang membawa pergeseran kultur sosial."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜とともに (bersamaan)",
        "summary": "とともに = penekanan pada faktor keserentakan waktu.",
        "distinctionId": "『〜につれて』 secara khusus menyoroti hukum perbandingan berbanding lurus bertahap: 'makin X, makin Y'."
      }
    ],
    "questions": [
      {
        "id": "q-b15-01",
        "type": "cloze",
        "questionNumber": 57,
        "questionJp": "台風が近づく（　　）、風と雨が次第に激しさを増してきた。",
        "questionRuby": "[台風:たいふう]が[近:ちか]づく（　　）、[風:かぜ]と[雨:あめ]が[次第:しだい]に[激:はげ]しさを[増:ま]してきた。",
        "questionTranslation": "Seiring dengan semakin mendekatnya topan, angin dan hujan secara bertahap kian mengganas.",
        "options": [
          {
            "key": "1",
            "textJp": "につれて",
            "textId": "Seiring dengan perubahan bertahap"
          },
          {
            "key": "2",
            "textJp": "に反して",
            "textId": "Berlawanan dengan"
          },
          {
            "key": "3",
            "textJp": "わりに",
            "textId": "Untuk ukuran ekspektasi"
          },
          {
            "key": "4",
            "textJp": "せいか",
            "textId": "Mungkin gara-gara"
          }
        ],
        "correctKey": "1",
        "explanation": "Semakin mendekatnya jarak badai berbanding lurus dengan memuncaknya kekuatan angin hujan. Pola perubahan bertahap ini adalah 『動詞辞書形 ＋ につれて』."
      }
    ]
  },

  {
    "id": "n3-b15-to-tomo-ni",
    "chapterNumber": 15,
    "chapterTitle": "第15課: 比例・連動・推移 (Perubahan Proporsional)",
    "category": "change",
    "categoryLabel": "変化・推移",
    "patternJp": "〜とともに",
    "patternKana": "とともに",
    "meaningId": "1) Seiring bertambahnya... maka... / 2) Bersama-sama dengan...",
    "connection": "動詞辞書形 ＋ とともに\n名詞 ＋ とともに",
    "coreConcept": "Memiliki 2 fungsi: 1) Menyatakan dua perubahan yang bergerak bersamaan waktunya (seiring kemajuan teknologi, cara hidup pun berubah). 2) Melakukan sesuatu bersama dengan rekan/partner (mirip 『と一緒に』 namun lebih formal).",
    "cautionNote": "Merupakan ragam bahasa formal tulisan yang sangat lazim ditemukan di koran dan esai opini.",
    "examples": [
      {
        "id": "ex-tomo-1",
        "textJp": "近代化の進展とともに、伝統的な手仕事の工芸品が姿を消しつつある。",
        "ruby": "[近代化:きんだいか]の[進展:しんてん]とともに、[伝統的:でんとうてき]な[手仕事:てしごと]の[工芸品:こうげいひん]が[姿:すがた]を[消:き]しつつある。",
        "textId": "Seiring dengan bergulirnya arus modernisasi, barang-barang kriya kerajinan tangan tradisional perlahan mulai menghilang.",
        "contextNote": "Arti 1: Dua fenomena sosial yang bergerak bersamaan waktu."
      },
      {
        "id": "ex-tomo-2",
        "textJp": "苦楽をともにしてきた仲間たちと、創業十周年の節目を祝った。",
        "ruby": "[苦楽:くらく]をともにしてきた[仲間:なかま]たちと、[創業十周年:そうぎょうじゅっしゅうねん]の[節目:ふしめ]を[祝:いわ]った。",
        "textId": "Bersama rekan-rekan yang telah berbagi suka dan duka bersama, kami merayakan momentum ulang tahun ke-10 berdirinya perusahaan.",
        "contextNote": "Arti 2: Berbagi pengalaman hidup bersama partner."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜につれて",
        "summary": "につれて = perbandingan berbanding lurus matematis alami.",
        "distinctionId": "『〜とともに』 selain perubahan proporsional serentak, juga memiliki fungsi arti kebersamaan sosial."
      }
    ],
    "questions": [
      {
        "id": "q-b15-04",
        "type": "seiretsu",
        "questionNumber": 58,
        "questionJp": "インターネットの普及　＿＿　＿＿　★　＿＿　変化を遂げた。",
        "questionRuby": "インターネットの[普及:ふきゅう]　＿＿　＿＿　★　＿＿　[変化:へんか]を[遂:と]げた。",
        "questionTranslation": "Seiring dengan meluasnya internet, sistem distribusi informasi dunia telah mengalami transformasi drastis.",
        "items": [
          "とともに",
          "世界の",
          "情報流通は",
          "劇的な"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『インターネットの普及 [とともに] [世界の] [情報流通は] [劇的な] 変化を遂げた』. Kata di posisi bintang (★) adalah 『情報流通は』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第16課: 限定・境界・範囲 (Batasan Kondisi & Lingkup)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b16-kagiri",
    "chapterNumber": 16,
    "chapterTitle": "第16課: 限定・境界・範囲 (Batasan Kondisi & Lingkup)",
    "category": "limitation",
    "categoryLabel": "限定・境界",
    "patternJp": "〜かぎり / 〜かぎりは",
    "patternKana": "かぎり / かぎりは",
    "meaningId": "Selama... / Sepanjang kondisi tersebut masih bertahan...",
    "connection": "動詞辞書形 / ない形 ＋ かぎり（は）\nイ形・ナ形＋な／である ＋ かぎり（は）\n名詞＋である ＋ かぎり（は）",
    "coreConcept": "Menyatakan bahwa selama batasan kondisi A tersebut tidak berubah, maka situasi B di belakangnya akan terus berlaku secara konsisten.",
    "cautionNote": "Bila kondisinya berubah, maka situasi di belakangnya pun akan runtuh atau berubah.",
    "examples": [
      {
        "id": "ex-kagi-1",
        "textJp": "日本で生活しているかぎりは、地震への備えを常に怠ってはならない。",
        "ruby": "[日本:にほん]で[生活:せいかつ]しているかぎりは、[地震:じしん]への[備:そな]えを[常:つね]に[怠:おこた]ってはならない。",
        "textId": "Selama kita masih menjalani kehidupan menetap di Jepang, persiapan menghadapi gempa bumi tidak boleh sekali-kali diabaikan.",
        "contextNote": "Kondisi menetap di Jepang yang mewajibkan kewaspadaan gempa."
      },
      {
        "id": "ex-kagi-2",
        "textJp": "本人が諦めないかぎり、夢への挑戦の道が閉ざされることは決してない。",
        "ruby": "[本人:ほんにん]が[諦:あきら]めないかぎり、[夢:ゆめ]への[挑戦:ちょうせん]の[道:みち]が[閉:と]ざされることは[決:けっ]してない。",
        "textId": "Sepanjang orang itu sendiri tidak menyerah kalah, jalan perjuangan menuju impian tak akan pernah tertutup.",
        "contextNote": "Kondisi tidak menyerah menjamin pintu harapan tetap terbuka."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜あいだは (selama jangka waktu)",
        "summary": "あいだは = rentang durasi waktu jam/hari tertentu.",
        "distinctionId": "『〜かぎり』 menekankan prasyarat status: 'Selama status/keadaan ini belum putus'."
      }
    ],
    "questions": [
      {
        "id": "q-b16-01",
        "type": "cloze",
        "questionNumber": 59,
        "questionJp": "学生で（　　）、学割料金で電車や映画館を利用できる。",
        "questionRuby": "[学生:がくせい]で（　　）、[学割料金:がくわりりょうきん]で[電車:でんしゃ]や[映画館:えいがかん]を[利用:りよう]できる。",
        "questionTranslation": "Selama berstatus sebagai pelajar, kamu berhak menikmati diskon tarif khusus pelajar di kereta api dan bioskop.",
        "options": [
          {
            "key": "1",
            "textJp": "あるかぎり",
            "textId": "Selama berstatus (名詞+であるかぎり)"
          },
          {
            "key": "2",
            "textJp": "ある反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "ある気味",
            "textId": "Bergejala"
          },
          {
            "key": "4",
            "textJp": "あるうちに",
            "textId": "Mumpung"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan masa status pelajar yang menjadi prasyarat hak diskon adalah 『名詞 ＋ であるかぎり』."
      }
    ]
  },

  {
    "id": "n3-b16-kagiri-dewa",
    "chapterNumber": 16,
    "chapterTitle": "第16課: 限定・境界・範囲 (Batasan Kondisi & Lingkup)",
    "category": "limitation",
    "categoryLabel": "限定・境界",
    "patternJp": "〜かぎりでは",
    "patternKana": "かぎりでは",
    "meaningId": "Sepanjang sejauh... (menurut jangkauan pengamatan, ingatan, atau riset pribadi)",
    "connection": "動詞辞書形 / た形 ＋ かぎりでは\n名詞＋の ＋ かぎりでは",
    "coreConcept": "Membatasi lingkup kepastian informasi pada apa yang dilihat, didengar, diselidiki, atau diingat sendiri oleh pembicara, sebagai bentuk kehati-hatian agar tidak menyimpulkan secara gegabah.",
    "cautionNote": "Sering berpasangan dengan kata kerja persepsi/kognisi: 見る, 聞く, 調べる, 知っている, 覚えている.",
    "examples": [
      {
        "id": "ex-kagiridewa-1",
        "textJp": "私の知っているかぎりでは、彼ほど誠実で信頼できる人物は他にいない。",
        "ruby": "[私:わたし]の[知:し]っているかぎりでは、[彼:かれ]ほど[誠実:せいじつ]で[信頼:しんらい]できる[人物:じんぶつ]は[他:ほか]にいない。",
        "textId": "Sejauh yang saya ketahui, tidak ada sosok lain yang sejujur dan seandal dirinya.",
        "contextNote": "Pembatasan informasi sebatas jangkauan pengetahuan pembicara."
      },
      {
        "id": "ex-kagiridewa-2",
        "textJp": "今回の予備調査のかぎりでは、システムに致命的な欠陥は見つかっていない。",
        "ruby": "[今回:こんかい]の[予備調査:よびちょうさ]のかぎりでは、システムに[致命的:ちめいてき]な[欠陥:けっかん]は[見:み]つかっていない。",
        "textId": "Sepanjang sejauh hasil investigasi awal kali ini, belum ditemukan adanya cacat fatal pada sistem.",
        "contextNote": "Hasil penyelidikan terbatas pada skala survei awal."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜かぎり (selama kondisi bertahan)",
        "summary": "かぎり = syarat keberlangsungan (selama masih berstatus mahasiswa).",
        "distinctionId": "『〜かぎりでは』 adalah batas jangkauan sumber data/persepsi (sejauh yang saya tahu/dengar)."
      }
    ],
    "questions": [
      {
        "id": "q-b16-04",
        "type": "cloze",
        "questionNumber": 60,
        "questionJp": "今朝の天気予報の（　　）、午後は雨の心配はなさそうだ。",
        "questionRuby": "[今朝:けさ]の[天気予報:てんきよほう]の（　　）、[午後:ごご]は[雨:あめ]の[心配:しんぱい]はなさそうだ。",
        "questionTranslation": "Sejauh yang diumumkan prakiraan cuaca pagi ini, tampaknya siang nanti tidak perlu cemas hujan.",
        "options": [
          {
            "key": "1",
            "textJp": "かぎりでは",
            "textId": "Sejauh batas informasi (名詞+のかぎりでは)"
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "気味",
            "textId": "Bergejala"
          },
          {
            "key": "4",
            "textJp": "せいか",
            "textId": "Mungkin karena"
          }
        ],
        "correctKey": "1",
        "explanation": "Membatasi kesimpulan pada informasi yang didapat dari ramalan cuaca adalah 『名詞 ＋ のかぎりでは』."
      }
    ]
  },

  {
    "id": "n3-b16-ni-kagitte",
    "chapterNumber": 16,
    "chapterTitle": "第16課: 限定・境界・範囲 (Batasan Kondisi & Lingkup)",
    "category": "limitation",
    "categoryLabel": "限定・境界",
    "patternJp": "〜にかぎり / 〜にかぎって",
    "patternKana": "にかぎり / にかぎって",
    "meaningId": "1) Khusus hanya untuk... / 2) Justru sialnya pas di saat...",
    "connection": "名詞 ＋ にかぎり / にかぎって",
    "coreConcept": "Memiliki 2 arti khas: 1) Pembatasan hak istimewa (khusus hari ini, khusus member). 2) Murphy's law: justru sialnya tepat saat kondisi penting, malah terjadi hal buruk (misal: pas gak bawa payung, justru turun hujan).",
    "cautionNote": "Arti ke-2 sangat sering diujikan di bagian percakapan atau dokkai untuk menunjukkan kekesalan nasib sial yang kebetulan.",
    "examples": [
      {
        "id": "ex-nikagi-1",
        "textJp": "本日ご来店のお客様にかぎり、全品20パーセント割引の特典がございます。",
        "ruby": "[本日:ほんじつ]ご[来店:らいてん]のお[客様:きゃくさま]にかぎり、[全品:ぜんぴん]20パーセント[割引:わりびき]の[特典:とくてん]がございます。",
        "textId": "Khusus bagi pelanggan yang hadir berkunjung pada hari ini saja, tersedia keistimewaan diskon 20 persen untuk seluruh barang.",
        "contextNote": "Arti 1: Pembatasan hak istimewa khusus."
      },
      {
        "id": "ex-nikagi-2",
        "textJp": "傘を持っていない日にかぎって、夕立が降るのはどうしてだろう。",
        "ruby": "[傘:かさ]を[持:も]っていない[日:ひ]にかぎって、[夕立:ゆうだち]が[降:ふ]るのはどうしてだろう。",
        "textId": "Kenapa ya, justru pas sialnya di hari saat aku tidak membawa payung, malah hujan lebat sore hari turun mengguyur.",
        "contextNote": "Arti 2: Kesialan tak terduga yang datang tepat di saat tidak siap."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜だけ (hanya)",
        "summary": "だけ = pembatasan kuantitas biasa.",
        "distinctionId": "『〜にかぎって』 mengandung muatan rasa jengkel 'kenapa justru pas di momen sial ini'."
      }
    ],
    "questions": [
      {
        "id": "q-b16-02",
        "type": "seiretsu",
        "questionNumber": 61,
        "questionJp": "急いでいる　＿＿　＿＿　★　＿＿　なかなか来ないものだ。",
        "questionRuby": "[急:いそ]いでいる　＿＿　＿＿　★　＿＿　なかなか[来:こ]ないものだ。",
        "questionTranslation": "Justru pas saat kita sedang terburu-buru mengejar waktu, sialnya bus malah tak kunjung tiba.",
        "items": [
          "バスが",
          "ときに",
          "かぎって",
          "待っている"
        ],
        "correctOrder": [
          1,
          2,
          3,
          0
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『急いでいる [ときに] [かぎって] [待っている] [バスが] なかなか来ないものだ』. Kata di posisi bintang (★) adalah 『待っている』."
      }
    ]
  },

  {
    "id": "n3-b16-nuki-de",
    "chapterNumber": 16,
    "chapterTitle": "第16課: 限定・境界・範囲 (Batasan Kondisi & Lingkup)",
    "category": "limitation",
    "categoryLabel": "限定・境界",
    "patternJp": "〜ぬきで / 〜ぬきにして",
    "patternKana": "ぬきで / ぬきにして",
    "meaningId": "Tanpa menyertakan... (menghilangkan elemen yang biasanya wajib ada)",
    "connection": "名詞 ＋ ぬきで / ぬきにして / ぬきの ＋ 名詞",
    "coreConcept": "Dipakai ketika suatu hal dilakukan dengan sengaja meniadakan atau mengesampingkan komponen yang normalnya selalu ada (tanpa wasabi, tanpa basa-basi, tanpa lelucon).",
    "cautionNote": "Sering menempel pada kata seperti: 冗談 (lelucon), わさび (wasabi), 前置き (basa-basi pengantar), お世辞 (pujian basa-basi).",
    "examples": [
      {
        "id": "ex-nuki-1",
        "textJp": "冗談はぬきにして、今後の会社の再建策について真剣に話し合おう。",
        "ruby": "[冗談:じょうだん]はぬきにして、[今後:こんご]の[会社:かいしゃ]の[再建策:さいけんさく]について[真剣:しんけん]に[話:はな]し[合:あ]おう。",
        "textId": "Mari kesampingkan dulu lelucon canda tawa, dan mari kita bicarakan secara serius langkah pemulihan perusahaan ke depan.",
        "contextNote": "Mengesampingkan gurauan demi fokus pada isu genting."
      },
      {
        "id": "ex-nuki-2",
        "textJp": "辛いものが苦手なので、わさびぬきで寿司を握ってもらった。",
        "ruby": "[辛:から]いものが[苦手:にがて]なので、わさびぬきで[寿司:すし]を[握:にぎ]ってもらった。",
        "textId": "Karena tidak kuat rasa pedas, saya meminta sushi dibuatkan tanpa wasabi.",
        "contextNote": "Menghilangkan wasabi dari pesanan makanan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜なしで (tanpa)",
        "summary": "なしで = ketiadaan umum.",
        "distinctionId": "『〜ぬきで』 secara spesifik menyingkirkan elemen yang lazimnya menyatu atau ada di situ."
      }
    ],
    "questions": [
      {
        "id": "q-b16-05",
        "type": "cloze",
        "questionNumber": 62,
        "questionJp": "挨拶や前置きは（　　）、早速本題に入りましょう。",
        "questionRuby": "[挨拶:あいさつ]や[前置:まえお]きは（　　）、[早速:さっそく][本題:ほんだい]に[入:はい]りましょう。",
        "questionTranslation": "Mari lewati basa-basi dan salam pembuka, dan mari kita lekas langsung masuk ke pokok bahasan utama.",
        "options": [
          {
            "key": "1",
            "textJp": "ぬきにして",
            "textId": "Meniadakan / mengesampingkan basa-basi"
          },
          {
            "key": "2",
            "textJp": "反面にして",
            "textId": "Di sisi lain sebaliknya"
          },
          {
            "key": "3",
            "textJp": "がちにして",
            "textId": "Cenderung"
          },
          {
            "key": "4",
            "textJp": "気味にして",
            "textId": "Bergejala"
          }
        ],
        "correctKey": "1",
        "explanation": "Meniadakan kata pengantar atau basa-basi untuk langsung ke inti masalah adalah 『名詞 ＋ はぬきにして』."
      }
    ]
  },

  {
    "id": "n3-b16-wo-towazu",
    "chapterNumber": 16,
    "chapterTitle": "第16課: 限定・境界・範囲 (Batasan Kondisi & Lingkup)",
    "category": "limitation",
    "categoryLabel": "限定・境界",
    "patternJp": "〜を問わず / 〜は問わず",
    "patternKana": "をとわず / はとわず",
    "meaningId": "Tanpa memandang... / Bebas tanpa membeda-bedakan (usia, gender, kewarganegaraan)",
    "connection": "名詞 ＋ を問わず / は問わず",
    "coreConcept": "Menyatakan bahwa batasan kategori tertentu (usia, jenis kelamin, pengalaman kerja, iklim, siang/malam) dikesampingkan atau tidak dipermasalahkan sama sekali, semuanya diterima secara setara.",
    "cautionNote": "Sering menempel pada pasangan kata yang berlawanan atau kata berkategori luas: 年齢 (usia), 性別 (gender), 国籍 (kebangsaan), 経験 (pengalaman), 昼夜 (siang-malam).",
    "examples": [
      {
        "id": "ex-towa-1",
        "textJp": "このスポーツジムは、年齢や性別を問わず誰でも気軽に参加できる。",
        "ruby": "このスポーツジムは、[年齢:ねんれい]や[性別:せいべつ]を[問:と]わず[誰:だれ]でも[気軽:きがる]に[参加:さんか]できる。",
        "textId": "Pusat kebugaran ini dapat diikuti oleh siapa saja secara leluasa tanpa memandang batasan usia maupun jenis kelamin.",
        "contextNote": "Akses terbuka inklusif bagi semua orang."
      },
      {
        "id": "ex-towa-2",
        "textJp": "経験の有無を問わず、意欲のある新しい仲間を広く募集しています。",
        "ruby": "[経験:けいけん]の[有無:うむ]を[問:と]わず、[意欲:いよく]のある[新:あたら]しい[仲間:なかま]を[広:ひろ]く[募集:ぼしゅう]しています。",
        "textId": "Tanpa memandang ada atau tidaknya pengalaman, kami membuka rekrutmen luas bagi rekan-rekan baru yang memiliki antusiasme tinggi.",
        "contextNote": "Lowongan kerja terbuka bebas tanpa syarat jam terbang."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜にかかわらず (terlepas dari)",
        "summary": "にかかわらず = terlepas dari kondisi situasi (cth: hujan maupun panas).",
        "distinctionId": "『〜を問わず』 berakar dari kata 'tidak mempertanyakan syarat' (kriteria penerimaan/partisipasi)."
      }
    ],
    "questions": [
      {
        "id": "q-b16-03",
        "type": "cloze",
        "questionNumber": 63,
        "questionJp": "国籍や言語（　　）、世界中のエンジニアが協力して開発を進めている。",
        "questionRuby": "[国籍:こくせき]や[言語:げんご]（　　）、[世界中:せかいじゅう]のエンジニアが[協力:きょうりょく]して[開発:かいはつ]を[進:すす]めている。",
        "questionTranslation": "Tanpa memandang perbedaan kewarganegaraan maupun bahasa, para engineer di seluruh dunia bekerja sama memajukan pengembangan sistem.",
        "options": [
          {
            "key": "1",
            "textJp": "を問わず",
            "textId": "Tanpa memandang batasan kategori"
          },
          {
            "key": "2",
            "textJp": "にかけて",
            "textId": "Membentang sampai"
          },
          {
            "key": "3",
            "textJp": "反面",
            "textId": "Di sisi lain sebaliknya"
          },
          {
            "key": "4",
            "textJp": "ばかりか",
            "textId": "Bukan hanya bahkan juga"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan ketiadaan batasan sekat kebangsaan atau bahasa menggunakan 『名詞 ＋ を問わず』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第17課: 受動・使役・敬意 (Bentuk Izin & Kesopanan)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b17-nasaru-kudasaru",
    "chapterNumber": 17,
    "chapterTitle": "第17課: 受動・使役・敬意 (Bentuk Izin & Kesopanan)",
    "category": "judgment",
    "categoryLabel": "敬意・使役",
    "patternJp": "〜なさる / 〜くださる",
    "patternKana": "なさる / くださる",
    "meaningId": "Berkenan melakukan / Menganugerahkan... (Bentuk Kehormatan Tinggi - Sonkeigo)",
    "connection": "お ＋ 動詞マス形 ＋ なさる / くださる\n漢語名詞 ＋ なさる / くださる",
    "coreConcept": "Merupakan pilar tata bahasa Sonkeigo (bahasa penghormatan) JLPT N3 untuk meninggikan kedudukan lawan bicara atau pihak ketiga yang dihormati (atasan, guru, pelanggan). 『なさる』 = する, 『くださる』 = くれる.",
    "cautionNote": "Tidak boleh sekali-kali digunakan untuk tindakan diri sendiri (cth: 私は旅行なさる ✕). Khusus meninggikan orang lain.",
    "examples": [
      {
        "id": "ex-nasaru-1",
        "textJp": "社長は来週からヨーロッパへ海外視察にお出かけなさいます。",
        "ruby": "[社長:しゃちょう]は[来週:らいしゅう]からヨーロッパへ[海外視察:かいがいしさつ]にお[出:で]かけなさいます。",
        "textId": "Bapak Presiden Direktur berkenan berangkat dinas inspeksi luar negeri ke Eropa mulai pekan depan.",
        "contextNote": "Meninggikan tindakan pimpinan perusahaan (お出かけになる / なさる)."
      },
      {
        "id": "ex-nasaru-2",
        "textJp": "先生が私の論文をご指導くださったおかげで、無事に書き上げることができました。",
        "ruby": "[先生:せんせい]が[私:わたし]の[論文:ろんぶん]をご[指導:しどう]くださったおかげで、[無事:ぶじ]に[書:か]き[上:あ]げることができました。",
        "textId": "Berkat kebaikan Bapak Guru yang telah berkenan meluangkan bimbingan atas tesis saya, saya berhasil menuntaskannya dengan lancar.",
        "contextNote": "Kebaikan atasan/guru yang diberikan kepada pembicara (くださる)."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜いたす (Kenjougo)",
        "summary": "いたす = merendahkan tindakan diri sendiri.",
        "distinctionId": "『〜なさる / くださる』 adalah Sonkeigo untuk meninggikan posisi lawan bicara atau guru."
      }
    ],
    "questions": [
      {
        "id": "q-b17-03",
        "type": "cloze",
        "questionNumber": 64,
        "questionJp": "部長、こちらの資料をもうご覧に（　　）でしょうか。",
        "questionRuby": "[部長:ぶちょう]、こちらの[資料:しりょう]をもうご[覧:らん]に（　　）でしょうか。",
        "questionTranslation": "Bapak Manajer, apakah Bapak sudah berkenan memeriksa berkas dokumen ini?",
        "options": [
          {
            "key": "1",
            "textJp": "なりました",
            "textId": "Berkenan melihat (ご覧になる - Sonkeigo)"
          },
          {
            "key": "2",
            "textJp": "拝見しました",
            "textId": "Saya melihat (Kenjougo - salah sasaran)"
          },
          {
            "key": "3",
            "textJp": "見がちでした",
            "textId": "Cenderung melihat"
          },
          {
            "key": "4",
            "textJp": "見反面でした",
            "textId": "Di sisi lain melihat"
          }
        ],
        "correctKey": "1",
        "explanation": "Menanyakan tindakan atasan (Pak Manajer) melihat dokumen wajib menggunakan bentuk Sonkeigo 『ご覧になる』."
      }
    ]
  },

  {
    "id": "n3-b17-o-negau",
    "chapterNumber": 17,
    "chapterTitle": "第17課: 受動・使役・敬意 (Bentuk Izin & Kesopanan)",
    "category": "judgment",
    "categoryLabel": "敬意・使役",
    "patternJp": "お〜願う / ご〜願う",
    "patternKana": "お〜ねがう / ご〜ねがう",
    "meaningId": "Mohon kesediaan untuk... (permohonan sopan dalam pelayanan atau bisnis)",
    "connection": "お ＋ 和語動詞マス形（マス省く） ＋ 願う / 願えますか\nご ＋ 漢語名詞 ＋ 願う / 願えますか",
    "coreConcept": "Digunakan dalam pengumuman publik, bandara, hotel, stasiun, atau korespondensi email bisnis untuk meminta kerja sama atau tindakan pihak pelanggan secara elegan dan anggun.",
    "cautionNote": "Perhatikan aturan prefiks: kata asli Jepang (和語) memakai 『お〜願います』 (cth: お待ち願います), sedangkan kata serapan kanji Tionghoa (漢語) memakai 『ご〜願います』 (cth: ご確認願います).",
    "examples": [
      {
        "id": "ex-onegau-1",
        "textJp": "安全のため、白線の内側までお下がり願います。",
        "ruby": "[安全:あんぜん]のため、[白線:はくせん]の[内側:うちがわ]までお[下:さ]がり[願:ねが]います。",
        "textId": "Demi keselamatan bersama, mohon kesediaan para penumpang untuk mundur ke sisi dalam garis putih.",
        "contextNote": "Instruksi pengumuman stasiun kereta api."
      },
      {
        "id": "ex-onegau-2",
        "textJp": "添付いたしました見積書の内容をご確認願えますでしょうか。",
        "ruby": "[添付:てんぷ]いたしました[見積書:みつもりしょ]の[内容:ないよう]をご[確認:かくにん][願:ねが]えますでしょうか。",
        "textId": "Sudikah kiranya Bapak/Ibu berkenan memeriksa isi surat penawaran harga yang telah kami lampirkan?",
        "contextNote": "Permohonan verifikasi santun dalam email bisnis."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜てください (mohon lakukan)",
        "summary": "てください = kalimat perintah sopan biasa.",
        "distinctionId": "『お〜願います』 jauh lebih anggun, resmi, dan mencerminkan tata krama pelayanan Jepang yang prima."
      }
    ],
    "questions": [
      {
        "id": "q-b17-02",
        "type": "cloze",
        "questionNumber": 65,
        "questionJp": "お席でお待ちのお客様、お名前をお呼びするまで少々（　　）。",
        "questionRuby": "お[席:せき]でお[待:ま]ちのお[客様:きゃくさま]、お[名前:なまえ]をお[呼:よ]びするまで[少々:しょうしょう]（　　）。",
        "questionTranslation": "Bagi para pelanggan yang menunggu di tempat duduk, mohon kesediaannya menunggu sejenak hingga nama Anda dipanggil.",
        "options": [
          {
            "key": "1",
            "textJp": "お待ち願います",
            "textId": "Mohon kesediaan menunggu (お+待ち+願います)"
          },
          {
            "key": "2",
            "textJp": "ご待ち願います",
            "textId": "Salah prefiks (bukan ご)"
          },
          {
            "key": "3",
            "textJp": "待たざるを得ません",
            "textId": "Terpaksa menunggu"
          },
          {
            "key": "4",
            "textJp": "待つべきです",
            "textId": "Harus menunggu"
          }
        ],
        "correctKey": "1",
        "explanation": "Kata kerja 『待つ』 adalah kata asli Jepang (和語), sehingga memakai awalan 『お』 menjadi 『お待ち願います』."
      }
    ]
  },

  {
    "id": "n3-b17-sasete-itadaku",
    "chapterNumber": 17,
    "chapterTitle": "第17課: 受動・使役・敬意 (Bentuk Izin & Kesopanan)",
    "category": "judgment",
    "categoryLabel": "敬意・使役",
    "patternJp": "〜（さ）せていただく",
    "patternKana": "させていただく",
    "meaningId": "Mohon izin / Memohon perkenan untuk melakukan... (merendahkan diri santun)",
    "connection": "動詞使役テ形（〜せて／させて） ＋ いただく",
    "coreConcept": "Merupakan frasa bisnis dan percakapan formal tingkat tinggi untuk memohon perkenan melakukan suatu aksi pribadi dengan sopan, seraya berterima kasih atas izin atau toleransi pihak lawan tutur.",
    "cautionNote": "Hanya digunakan untuk tindakan diri sendiri yang membutuhkan izin atau pengertian pihak lawan (misal: izin libur, pamit berbicara, mengumumkan keputusan).",
    "examples": [
      {
        "id": "ex-itadaku-1",
        "textJp": "体調不良のため、本日は早退させていただきます。",
        "ruby": "[体調不良:たいちょうふりょう]のため、[本日:ほんじつ]は[早退:そうたい]させていただきます。",
        "textId": "Karena kondisi kesehatan yang kurang baik, hari ini saya memohon izin untuk pulang lebih awal.",
        "contextNote": "Izin pulang kantor secara santun kepada atasan."
      },
      {
        "id": "ex-itadaku-2",
        "textJp": "それでは、次のプロジェクトの概要について説明させていただきます。",
        "ruby": "それでは、[次:つぎ]のプロジェクトの[概要:がいよう]について[説明:せつめい]させていただきます。",
        "textId": "Baiklah, izinkan saya memaparkan garis besar mengenai proyek kita berikutnya.",
        "contextNote": "Frasa pembuka presentasi bisnis formal."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜てもらう",
        "summary": "てもらう = meminta orang lain berbuat sesuatu untuk kita.",
        "distinctionId": "『〜（さ）せていただく』 pelakunya adalah diri sendiri, kita meminta izin agar diperkenankan bertindak."
      }
    ],
    "questions": [
      {
        "id": "q-b17-01",
        "type": "cloze",
        "questionNumber": 66,
        "questionJp": "誠に勝手ながら、来週月曜日はお休みを（　　）。",
        "questionRuby": "[誠:まこと]に[勝手:かって]ながら、[来週月曜日:らいしゅうげつようび]はお[休:やす]みを（　　）。",
        "questionTranslation": "Mohon maaf atas kelancangan kami, pada hari Senin pekan depan kami memohon izin untuk libur.",
        "options": [
          {
            "key": "1",
            "textJp": "いただきます",
            "textId": "Memohon perkenan (休ませていただきます)"
          },
          {
            "key": "2",
            "textJp": "くだされます",
            "textId": "Pemberian atasan"
          },
          {
            "key": "3",
            "textJp": "なさいます",
            "textId": "Dilakukan atasan"
          },
          {
            "key": "4",
            "textJp": "がちです",
            "textId": "Cenderung libur"
          }
        ],
        "correctKey": "1",
        "explanation": "Bentuk permohonan izin santun untuk diri sendiri berlibur adalah 『お休みをいただきます / 休ませていただきます』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第18課: もの・ことの表現 (Penegasan Alasan & Aturan)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b18-kara-to-itte",
    "chapterNumber": 18,
    "chapterTitle": "第18課: もの・ことの表現 (Penegasan Alasan & Aturan)",
    "category": "judgment",
    "categoryLabel": "主張・否定",
    "patternJp": "〜からといって",
    "patternKana": "からといって",
    "meaningId": "Hanya karena alasan... bukan berarti otomatis... (penolakan generalisasi keliru)",
    "connection": "普通形（動・イ・ナ・名） ＋ からといって",
    "coreConcept": "Menepis anggapan atau prasangka dangkal: 'Hanya karena memiliki kondisi A, bukan berarti kesimpulan B di belakangnya otomatis selalu berlaku!'.",
    "cautionNote": "Kalimat belakang hampir selalu diakhiri dengan bentuk negasi parsial seperti: 『〜わけではない』, 『〜とはかぎらない』, atau 『〜とは言えない』.",
    "examples": [
      {
        "id": "ex-karato-1",
        "textJp": "日本に長く住んでいるからといって、誰でも日本語が流暢になるとはかぎらない。",
        "ruby": "[日本:にほん]に[長:なが]く[住:す]んでいるからといって、[誰:だれ]でも[日本語:にほんご]が[流暢:りゅうちょう]になるとはかぎらない。",
        "textId": "Hanya karena sudah lama tinggal di Jepang, bukan berarti otomatis siapa saja pasti menjadi fasih berbahasa Jepang.",
        "contextNote": "Menepis generalisasi keliru seputar lama tinggal dan kefasihan bahasa."
      },
      {
        "id": "ex-karato-2",
        "textJp": "お金持ちだからといって、必ずしも幸せな人生を送っているわけではない。",
        "ruby": "お[金持:かねも]ちだからといって、[必:かなら]ずしも[幸:しあわ]せな[人生:じんせい]を[送:おく]っているわけではない。",
        "textId": "Hanya karena berlimpah harta, bukan berarti otomatis menjalani roda kehidupan yang selalu bahagia.",
        "contextNote": "Kekayaan materi vs kebahagiaan sejati."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜から (karena)",
        "summary": "から = menyatakan hubungan sebab akibat langsung.",
        "distinctionId": "『〜からといって』 secara spesifik memutus korelasi generalisasi dangkal di antara dua hal."
      }
    ],
    "questions": [
      {
        "id": "q-b18-04",
        "type": "cloze",
        "questionNumber": 67,
        "questionJp": "好きではないから（　　）、野菜を全く食べないのは健康によくない。",
        "questionRuby": "[好:す]きではないから（　　）、[野菜:やさい]を[全:まった]く[食:た]べないのは[健康:けんこう]によくない。",
        "questionTranslation": "Hanya karena tidak suka, sama sekali tidak menyantap sayuran itu tidak baik untuk kesehatan.",
        "options": [
          {
            "key": "1",
            "textJp": "といって",
            "textId": "Hanya karena alasan... (からといって)"
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "わりに",
            "textId": "Untuk ukuran"
          },
          {
            "key": "4",
            "textJp": "せいで",
            "textId": "Gara-gara"
          }
        ],
        "correctKey": "1",
        "explanation": "Menegaskan bahwa alasan tidak suka tidak boleh dijadikan pembenaran untuk tidak makan sayur adalah 『〜からといって』."
      }
    ]
  },

  {
    "id": "n3-b18-koto-ni-natte-iru",
    "chapterNumber": 18,
    "chapterTitle": "第18課: もの・ことの表現 (Penegasan Alasan & Aturan)",
    "category": "judgment",
    "categoryLabel": "習慣・決定",
    "patternJp": "〜ことになっている",
    "patternKana": "ことになっている",
    "meaningId": "Sudah menjadi aturan / Terjadwal bahwa... (ketetapan dari pihak luar / tradisi / regulasi)",
    "connection": "動詞辞書形 / ない形 ＋ ことになっている",
    "coreConcept": "Menyatakan suatu peraturan hukum, tata tertib sekolah/kantor, jadwal resmi, atau norma tradisi yang telah ditetapkan oleh pihak luar/organisasi dan wajib ditaati.",
    "cautionNote": "Bila berbentuk negatif 『〜ないことになっている』 bermakna larangan resmi (misal: di sini dilarang merokok).",
    "examples": [
      {
        "id": "ex-kotoninat-1",
        "textJp": "本校の校則では、授業中のスマートフォン使用は禁止ということになっている。",
        "ruby": "[本校:ほんこう]の[校則:こうそく]では、[授業中:じゅぎょうちゅう]のスマートフォン[使用:しよう]は[禁止:きんし]ということになっている。",
        "textId": "Menurut tata tertib sekolah kami, penggunaan ponsel pintar saat jam pelajaran berlangsung telah ditetapkan sebagai larangan resmi.",
        "contextNote": "Regulasi resmi tata tertib institusi pendidikan."
      },
      {
        "id": "ex-kotoninat-2",
        "textJp": "来週の月曜日に、海外支社の役員とオンライン面談を行うことになっている。",
        "ruby": "[来週:らいしゅう]の[月曜日:げつようび]に、[海外支社:かいがいししゃ]の[役員:やくいん]とオンライン[面談:めんだん]を[行:おこな]うことになっている。",
        "textId": "Pada hari Senin pekan depan, telah terjadwal untuk melangsungkan pertemuan wawancara daring dengan jajaran direksi kantor cabang luar negeri.",
        "contextNote": "Jadwal resmi agenda korporat."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ことにしている",
        "summary": "ことにしている = kebiasaan pribadi pembicara sendiri.",
        "distinctionId": "『〜ことになっている』 berasal dari kesepakatan kolektif, sistem organisasi, atau kalender jadwal."
      }
    ],
    "questions": [
      {
        "id": "q-b18-06",
        "type": "cloze",
        "questionNumber": 68,
        "questionJp": "このビルでは、夜10時を過ぎると正面玄関が自動で（　　）。",
        "questionRuby": "このビルでは、[夜:よる]10[時:じ]を[過:す]ぎると[正面玄関:しょうめんげんかん]が[自動:じどう]で（　　）。",
        "questionTranslation": "Di gedung ini, jika sudah lewat pukul 10 malam pintu gerbang utama telah diatur otomatis terkunci.",
        "options": [
          {
            "key": "1",
            "textJp": "閉まることになっている",
            "textId": "Sudah menjadi sistem aturan (自動で閉まることになっている)"
          },
          {
            "key": "2",
            "textJp": "閉めることにしている",
            "textId": "Saya membiasakan diri menutup"
          },
          {
            "key": "3",
            "textJp": "閉まる反面だ",
            "textId": "Di sisi lain menutup"
          },
          {
            "key": "4",
            "textJp": "閉まるおそれだ",
            "textId": "Ketakutan menutup"
          }
        ],
        "correctKey": "1",
        "explanation": "Sistem operasional keamanan gedung yang telah diatur oleh pengelola adalah 『動詞辞書形 ＋ ことになっている』."
      }
    ]
  },

  {
    "id": "n3-b18-koto-ni-shite-iru",
    "chapterNumber": 18,
    "chapterTitle": "第18課: もの・ことの表現 (Penegasan Alasan & Aturan)",
    "category": "judgment",
    "categoryLabel": "習慣・決定",
    "patternJp": "〜ことにしている",
    "patternKana": "ことにしている",
    "meaningId": "Membiasakan diri untuk... (keputusan dan disiplin pribadi yang dijalankan rutin)",
    "connection": "動詞辞書形 / ない形 ＋ ことにしている",
    "coreConcept": "Menyatakan suatu aturan pribadi, prinsip hidup, atau kebiasaan disiplin yang diputuskan sendiri oleh pembicara dan terus dijaga pelaksanaannya secara konsisten.",
    "cautionNote": "Berbeda dengan 『〜ことになっている』 yang aturannya ditentukan pihak luar/kantor. 『〜ことにしている』 murni keputusan kehendak pribadi sendiri.",
    "examples": [
      {
        "id": "ex-kotoni-1",
        "textJp": "健康を維持するため、エレベーターを使わず階段を歩くことにしている。",
        "ruby": "[健康:けんこう]を[維持:いじ]するため、エレベーターを[使:つか]わず[階段:かいだん]を[歩:ある]くことにしている。",
        "textId": "Demi menjaga kebugaran, saya membiasakan diri selalu berjalan lewat tangga tanpa menggunakan lift.",
        "contextNote": "Disiplin fisik pribadi yang konsisten."
      },
      {
        "id": "ex-kotoni-2",
        "textJp": "夜寝る前の一時間は、スマートフォンの画面を見ないことにしている。",
        "ruby": "[夜:よる][寝:ね]る[前:まえ]の[一時間:いちじかん]は、スマートフォンの[画面:がめん]を[見:み]ないことにしている。",
        "textId": "Satu jam sebelum tidur malam, saya membiasakan diri untuk tidak melihat layar ponsel pintar.",
        "contextNote": "Aturan pribadi menjaga kualitas tidur."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ことになっている (aturan luar)",
        "summary": "ことになっている = peraturan kantor, jadwal, atau tradisi yang ditentukan pihak luar.",
        "distinctionId": "『〜ことにしている』 adalah ikrar disiplin diri sendiri atas kemauan pribadi."
      }
    ],
    "questions": [
      {
        "id": "q-b18-05",
        "type": "cloze",
        "questionNumber": 69,
        "questionJp": "毎朝出勤する前に、新聞の社説をじっくり（　　）。",
        "questionRuby": "[毎朝:まいあさ][出勤:しゅっきん]する[前:まえ]に、[新聞:しんぶん]の[社説:しゃせつ]をじっくり（　　）。",
        "questionTranslation": "Setiap pagi sebelum berangkat kantor, saya membiasakan diri membaca tajuk rencana surat kabar dengan saksama.",
        "options": [
          {
            "key": "1",
            "textJp": "読むことにしている",
            "textId": "Membiasakan diri membaca (disiplin pribadi)"
          },
          {
            "key": "2",
            "textJp": "読まざるを得ない",
            "textId": "Terpaksa membaca"
          },
          {
            "key": "3",
            "textJp": "読む反面だ",
            "textId": "Di sisi lain membaca"
          },
          {
            "key": "4",
            "textJp": "読む気味だ",
            "textId": "Bergejala membaca"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan komitmen kebiasaan pribadi yang dijalankan rutin setiap pagi adalah 『動詞辞書形 ＋ ことにしている』."
      }
    ]
  },

  {
    "id": "n3-b18-koto-wa-nai",
    "chapterNumber": 18,
    "chapterTitle": "第18課: もの・ことの表現 (Penegasan Alasan & Aturan)",
    "category": "judgment",
    "categoryLabel": "忠告・助言",
    "patternJp": "〜ことはない",
    "patternKana": "ことはない",
    "meaningId": "Tidak perlu repot-repot... / Tidak usah sampai sebegitunya (memberi ketenangan)",
    "connection": "動詞辞書形 ＋ ことはない",
    "coreConcept": "Memberikan nasihat atau penegasan kepada lawan bicara agar tidak perlu merasa cemas, terbebani, atau repot-repot melakukan tindakan berlebihan: 'Tidak perlu sampai memaksakan diri!'.",
    "cautionNote": "Sering berpasangan dengan kata seperti: 心配する (cemas), 焦る (terburu-buru), 無理をする (memaksakan diri), 謝る (meminta maaf).",
    "examples": [
      {
        "id": "ex-kotowanai-1",
        "textJp": "ただの擦り傷ですから、病院へ行くほどのことではありませんよ。",
        "ruby": "ただの[擦:す]り[傷:きず]ですから、[病院:びょういん]へ[行:い]くほどのことではありませんよ。",
        "textId": "Ini hanya luka lecet biasa, jadi tidak perlu sampai repot-repot pergi ke rumah sakit kok.",
        "contextNote": "Menenangkan agar tidak panik atas luka ringan."
      },
      {
        "id": "ex-kotowanai-2",
        "textJp": "君の過失ではないのだから、自分をそこまで責めることはない。",
        "ruby": "[君:きみ]の[過失:かしつ]ではないのだから、[自分:じぶん]をそこまで[責:せ]めることはない。",
        "textId": "Karena ini sama sekali bukan kelalaianmu, kamu tidak perlu menyalahkan dirimu sendiri sampai seberat itu.",
        "contextNote": "Nasihat penghiburan agar tidak menyiksa diri."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜なくてもいい (tidak perlu)",
        "summary": "なくてもいい = fleksibilitas izin tidak melakukan.",
        "distinctionId": "『〜ことはない』 memberikan penegasan moral bahwa tindakan tersebut memang tidak ada faedahnya dilakukan berlebihan."
      }
    ],
    "questions": [
      {
        "id": "q-b18-07",
        "type": "cloze",
        "questionNumber": 70,
        "questionJp": "時間はまだたっぷりありますから、そんなに（　　）。",
        "questionRuby": "[時間:じかん]はまだたっぷりありますから、そんなに（　　）。",
        "questionTranslation": "Waktu masih tersisa banyak sekali, jadi kamu tidak usah terburu-buru panik begitu.",
        "options": [
          {
            "key": "1",
            "textJp": "焦ることはない",
            "textId": "Tidak perlu panik buru-buru (焦ることはない)"
          },
          {
            "key": "2",
            "textJp": "焦るべきだ",
            "textId": "Seharusnya panik"
          },
          {
            "key": "3",
            "textJp": "焦らざるを得ない",
            "textId": "Terpaksa panik"
          },
          {
            "key": "4",
            "textJp": "焦る気味だ",
            "textId": "Bergejala panik"
          }
        ],
        "correctKey": "1",
        "explanation": "Menenangkan kawan agar tidak perlu terburu-buru adalah 『動詞辞書形 ＋ ことはない』."
      }
    ]
  },

  {
    "id": "n3-b18-mono-dakara",
    "chapterNumber": 18,
    "chapterTitle": "第18課: もの・ことの表現 (Penegasan Alasan & Aturan)",
    "category": "cause",
    "categoryLabel": "理由・弁解",
    "patternJp": "〜ものだから / 〜もので",
    "patternKana": "ものだから / もので",
    "meaningId": "Habisnya... / Soalnya... (alasan pribadi yang mendesak atau tak terelakkan)",
    "connection": "動詞・イ形容詞普通形 ＋ ものだから / もので\nナ形容詞＋な ＋ ものだから / もので\n名詞＋な ＋ ものだから / もので",
    "coreConcept": "Digunakan saat memberikan alasan atau klarifikasi pembenaran diri ketika terlambat, gagal memenuhi janji, atau melakukan hal di luar rencana karena situasi eksternal yang di luar kendali.",
    "cautionNote": "Merupakan ragam lisan yang menyiratkan rasa sungkan atau alasan yang tak terelakkan. Tidak boleh digunakan untuk kalimat perintah atau ajakan.",
    "examples": [
      {
        "id": "ex-monoda-1",
        "textJp": "事故で電車が急に止まってしまったものだから、約束の時間に遅れました。",
        "ruby": "[事故:じこ]で[電車:でんしゃ]が[急:きゅう]に[止:と]まってしまったものだから、[約束:やくそく]の[時間:じかん]に[遅:おく]れました。",
        "textId": "Habisnya kereta tiba-tiba tertahan mogok akibat kecelakaan, makanya saya terlambat dari waktu janjian.",
        "contextNote": "Alasan keterlambatan akibat kendala transportasi eksternal."
      },
      {
        "id": "ex-monoda-2",
        "textJp": "あまりに懐かしい香りがしたもので、つい立ち止まって振り返ってしまった。",
        "ruby": "あまりに[懐:なつ]かしい[香:かお]りがしたもので、つい[立:た]ち[止:ど]まって[振:ふ]り[返:かえ]ってしまった。",
        "textId": "Soalnya tercium aroma yang begitu sarat nostalgia, tanpa sadar langkahku terhenti dan menoleh ke belakang.",
        "contextNote": "Alasan spontan melakukan tindakan tanpa sadar."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜から / 〜ので",
        "summary": "から / ので = kata sambung alasan umum dan netral.",
        "distinctionId": "『〜ものだから』 menyiratkan permohonan permakluman dari lawan bicara atas situasi yang tak terhindarkan."
      }
    ],
    "questions": [
      {
        "id": "q-b18-01",
        "type": "cloze",
        "questionNumber": 71,
        "questionJp": "道路がひどく渋滞していた（　　）、集合時間に間に合いませんでした。",
        "questionRuby": "[道路:どうろ]がひどく[渋滞:じゅうたい]していた（　　）、[集合時間:しゅうごうじかん]に[間:ま]に[合:あ]いませんでした。",
        "questionTranslation": "Habisnya jalanan macet parah sekali, makanya saya tidak sempat tiba tepat waktu kumpul.",
        "options": [
          {
            "key": "1",
            "textJp": "ものだから",
            "textId": "Habisnya... (alasan klarifikasi tak terelakkan)"
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Di sisi lain sebaliknya"
          },
          {
            "key": "3",
            "textJp": "わりに",
            "textId": "Untuk ukuran ekspektasi"
          },
          {
            "key": "4",
            "textJp": "気味で",
            "textId": "Dengan gejala"
          }
        ],
        "correctKey": "1",
        "explanation": "Menjelaskan alasan keterlambatan akibat macet dengan nada memohon pengertian menggunakan 『〜ものだから』."
      }
    ]
  },

  {
    "id": "n3-b18-mono-ka",
    "chapterNumber": 18,
    "chapterTitle": "第18課: もの・ことの表現 (Penegasan Alasan & Aturan)",
    "category": "judgment",
    "categoryLabel": "主張・否定",
    "patternJp": "〜ものか / 〜もんですか",
    "patternKana": "ものか / もんですか",
    "meaningId": "Mana mungkin...! / Sama sekali tidak sudi...! (penolakan keras dan emosional)",
    "connection": "動詞辞書形 ＋ ものか / もんですか\nイ形容詞辞書形 ＋ ものか\nナ形容詞＋な ＋ ものか\n名詞＋な ＋ ものか",
    "coreConcept": "Penyangkalan mutlak yang sarat emosi pembicara: 'Sama sekali tidak sudi melakukannya lagi!' atau 'Mana mungkin hal seburuk itu benar!'.",
    "cautionNote": "『〜ものか』 biasa dipakai pria/ragam kasual, sedangkan 『〜もんですか』 dipakai wanita atau bentuk agak lebih sopan namun tetap tegas menolak.",
    "examples": [
      {
        "id": "ex-monoka-1",
        "textJp": "あんなに無礼で失礼な店、二度と行くものか！",
        "ruby": "あんなに[無礼:ぶれい]で[失礼:しつれい]な[店:みせ]、[二度:にど]と[行:い]くものか！",
        "textId": "Restoran yang pelayanannya sebegitu kurang ajar dan kasarnya, mana sudi aku menginjakkan kaki ke sana untuk kedua kalinya!",
        "contextNote": "Tekad penolakan keras akibat rasa kecewa mendalam."
      },
      {
        "id": "ex-monoka-2",
        "textJp": "こんな簡単な試験で、私が落ちるもんですか。絶対合格してみせます。",
        "ruby": "こんな[簡単:かんたん]な[試験:しけん]で、[私:わたし]が[落:お]ちるもんですか。[絶対:ぜったい][合格:ごうかく]してみせます。",
        "textId": "Dalam ujian semudah ini, mana mungkin aku bakal gagal! Aku pasti akan membuktikannya dengan kelulusan.",
        "contextNote": "Penyangkalan percaya diri atas keraguan orang lain."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜わけがない (mustahil logis)",
        "summary": "わけがない = kesimpulan logika bahwa hal itu mustahil.",
        "distinctionId": "『〜ものか』 menyiratkan kehendak batin dan emosi penolakan diri yang menyala-nyala."
      }
    ],
    "questions": [
      {
        "id": "q-b18-02",
        "type": "seiretsu",
        "questionNumber": 72,
        "questionJp": "あんな嘘つきの言うことなど、　＿＿　＿＿　★　＿＿　ものか。",
        "questionRuby": "あんな[嘘:うそ]つきの[言:い]うことなど、　＿＿　＿＿　★　＿＿　ものか。",
        "questionTranslation": "Perkataan sosok pembohong seperti itu, mana sudi aku mempercayainya barang sedikit pun!",
        "items": [
          "信じて",
          "二度と",
          "やる",
          "誰が"
        ],
        "correctOrder": [
          3,
          1,
          0,
          2
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『あんな嘘つきの言うことなど、 [誰が] [二度と] [信じて] [やる] ものか』. Kata di posisi bintang (★) adalah 『信じて』."
      }
    ]
  },

  {
    "id": "n3-b18-mono-no",
    "chapterNumber": 18,
    "chapterTitle": "第18課: もの・ことの表現 (Penegasan Alasan & Aturan)",
    "category": "contrast",
    "categoryLabel": "逆接・対比",
    "patternJp": "〜ものの",
    "patternKana": "ものの",
    "meaningId": "Meskipun kenyataannya... namun realitanya tidak seindah itu",
    "connection": "動詞・イ形容詞普通形 ＋ ものの\nナ形容詞＋な／である ＋ ものの\n名詞＋である ＋ ものの",
    "coreConcept": "Mengakui fakta pertama sebagai kebenaran (memang benar A sudah terjadi), namun realitas atau hasil yang menyusul di bagian kedua tidak berjalan memuaskan atau tidak seindah yang diharapkan.",
    "cautionNote": "Merupakan ragam bahasa tulisan formal (menyerupai 『〜けれども / 〜とはいえ』). Sering berpasangan dengan bentuk lampau: 『〜たものの』.",
    "examples": [
      {
        "id": "ex-monono-1",
        "textJp": "大学に入学したものの、講義のレベルが高すぎてついていくのが大変だ。",
        "ruby": "[大学:だいがく]に[入学:にゅうがく]したものの、[講義:こうぎ]のレベルが[高:たか]すぎてついていくのが[大変:たいへん]だ。",
        "textId": "Meskipun sudah berhasil masuk universitas, materi perkuliahannya terlampau tinggi hingga berat untuk mengikutinya.",
        "contextNote": "Fakta lulus universitas vs realita beratnya materi kuliah."
      },
      {
        "id": "ex-monono-2",
        "textJp": "最新のノートパソコンを購入したものの、忙しくてまだ箱から出してもいない。",
        "ruby": "[最新:さいしん]のノートパソコンを[購入:こうにゅう]したものの、[忙:いそが]しくてまだ[箱:はこ]から[出:だ]してもいない。",
        "textId": "Meskipun sudah membeli laptop keluaran terbaru, saking sibuknya barang tersebut bahkan belum sempat dikeluarkan dari kardusnya.",
        "contextNote": "Kontras tindakan membeli vs realita tidak sempat dipakai."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜のに (padahal)",
        "summary": "のに = mengeluhkan ketidakcocokan dengan nada emosi kecewa.",
        "distinctionId": "『〜ものの』 lebih bersifat reflektif dan elegan dalam mengakui dua fakta yang saling bertolak belakang."
      }
    ],
    "questions": [
      {
        "id": "q-b18-03",
        "type": "cloze",
        "questionNumber": 73,
        "questionJp": "給料は上がった（　　）、税金も増えたので手取りはほとんど変わらない。",
        "questionRuby": "[給料:きゅうりょう]は[上:あ]がった（　　）、[税金:ぜいきん]も[増:ふ]えたので[手取:てど]りはほとんど[変:か]わらない。",
        "questionTranslation": "Meskipun gaji pokok mengalami kenaikan, namun karena potongan pajak juga bertambah maka uang bersih yang diterima hampir tidak ada bedanya.",
        "options": [
          {
            "key": "1",
            "textJp": "ものの",
            "textId": "Meskipun faktanya demikian (〜たものの)"
          },
          {
            "key": "2",
            "textJp": "ものだから",
            "textId": "Habisnya"
          },
          {
            "key": "3",
            "textJp": "ばかりに",
            "textId": "Hanya gara-gara"
          },
          {
            "key": "4",
            "textJp": "せいで",
            "textId": "Gara-gara"
          }
        ],
        "correctKey": "1",
        "explanation": "Mengakui fakta bahwa gaji naik, namun kenyataan uang bersih tidak berubah diungkapkan dengan 『動詞た形 ＋ ものの』."
      }
    ]
  },

  {
    "id": "n3-b18-nai-koto-wa-nai",
    "chapterNumber": 18,
    "chapterTitle": "第18課: もの・ことの表現 (Penegasan Alasan & Aturan)",
    "category": "judgment",
    "categoryLabel": "主張・可能性",
    "patternJp": "〜ないことはない / 〜ないこともない",
    "patternKana": "ないことはない / ないこともない",
    "meaningId": "Bukannya tidak bisa sama sekali / Ada kemungkinan bisa jika diusahakan",
    "connection": "動詞ナイ形 ＋ ことはない\nイ形容詞（くない） ＋ ことはない\nナ形容詞（ではない） ＋ ことはない",
    "coreConcept": "Bentuk negasi ganda (double negative) untuk mengekspresikan persetujuan setengah hati atau konfirmasi ragu-ragu: 'Bukannya sama sekali mustahil, sebenarnya bisa asalkan ada syarat tertentu'.",
    "cautionNote": "Merupakan kesopanan khas komunikasi Jepang yang enggan menegaskan 'bisa' 100% untuk menghindari terkesan sombong atau berjanji mutlak.",
    "examples": [
      {
        "id": "ex-naikotowanai-1",
        "textJp": "納豆はあまり得意ではありませんが、食べられないことはありません。",
        "ruby": "[納豆:なっとう]はあまり[得意:とくい]ではありませんが、[食:た]べられないことはありません。",
        "textId": "Saya memang tidak terlalu gemar natto, tapi bukannya sama sekali tidak bisa memakannya jika disajikan.",
        "contextNote": "Sikap kompromi sopan atas makanan khas."
      },
      {
        "id": "ex-naikotowanai-2",
        "textJp": "徹夜して全力を尽くせば、明日までに資料を完成させられないこともない。",
        "ruby": "[徹夜:てつや]して[全力:ぜんりょく]を[尽:つ]くせば、[明日:あした]までに[資料:しりょう]を[完成:かんせい]させられないこともない。",
        "textId": "Bila begadang semalaman dan mengerahkan segenap daya, bukannya mustahil untuk menuntaskan berkas dokumen ini sebelum esok hari.",
        "contextNote": "Kemungkinan tipis yang masih bisa diupayakan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜できる (bisa)",
        "summary": "できる = menyatakan sanggup secara lugas dan tegas.",
        "distinctionId": "『〜ないことはない』 mengekspresikan sikap hati-hati bahwa ada syarat berat di balik kesanggupan tersebut."
      }
    ],
    "questions": [
      {
        "id": "q-b18-08",
        "type": "cloze",
        "questionNumber": 74,
        "questionJp": "条件次第では、そのプロジェクトに参加（　　）。",
        "questionRuby": "[条件次第:じょうけんしだい]では、そのプロジェクトに[参加:さんか]（　　）。",
        "questionTranslation": "Tergantung bagaimana syarat kesepakatannya, bukannya saya sama sekali tidak mau bergabung dalam proyek tersebut.",
        "options": [
          {
            "key": "1",
            "textJp": "しないこともない",
            "textId": "Bukannya tidak mau bergabung (double negative)"
          },
          {
            "key": "2",
            "textJp": "するべきではない",
            "textId": "Seharusnya tidak bergabung"
          },
          {
            "key": "3",
            "textJp": "する反面だ",
            "textId": "Di sisi lain bergabung"
          },
          {
            "key": "4",
            "textJp": "する一方だ",
            "textId": "Kian terus bergabung"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan kemungkinan bersedia bergabung asalkan kondisinya cocok adalah 『動詞ナイ形 ＋ こともない』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第19課: 様態・比喩・推量 (Perumpamaan & Dugaan)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b19-ge",
    "chapterNumber": 19,
    "chapterTitle": "第19課: 様態・比喩・推量 (Perumpamaan & Dugaan)",
    "category": "judgment",
    "categoryLabel": "様態・気配",
    "patternJp": "〜げ",
    "patternKana": "げ",
    "meaningId": "Raut wajah / Suasana yang menyiratkan rasa... (kesan batin yang terpancar keluar)",
    "connection": "イ形容詞（い省く） ＋ げ\nナ形容詞 ＋ げ\n動詞マス形（たい→たげ） ＋ げ",
    "coreConcept": "Melukiskan raut wajah, sorot mata, senyuman, atau gerak-gerik seseorang yang memancarkan aura perasaan tertentu (sedih, bangga, ragu, kesepian) menurut pengamatan mata pembicara.",
    "cautionNote": "Sering menempel pada kata sifat emosi: 悲しげ (tampak sedih), 嬉しげ (tampak riang), 自信ありげ (tampak penuh percaya diri), 言いたげ (tampak ingin bicara sesuatu).",
    "examples": [
      {
        "id": "ex-ge-1",
        "textJp": "彼女はどこか寂しげな微笑みを浮かべながら、夕暮れの海を見つめていた。",
        "ruby": "[彼女:かのじょ]はどこか[寂:さび]しげな[微笑:ほほえ]みを[浮:う]かべながら、[夕暮:ゆうぐ]れの[海:うみ]を[見:み]つめていた。",
        "textId": "Sambil menyunggingkan senyum yang menyiratkan rasa sepi, dia menatap lekat laut di kala senja.",
        "contextNote": "Aura kesepian yang terpancar lembut dari senyuman."
      },
      {
        "id": "ex-ge-2",
        "textJp": "彼は何か言いたげな様子でこちらを見ていたが、結局何も言わずに立ち去った。",
        "ruby": "[彼:かれ]は[何:なに]か[言:い]いたげな[様子:ようす]でこちらを[見:み]ていたが、[結局:けっきょく][何:なに]も[言:い]わずに[立:た]ち[去:さ]った。",
        "textId": "Dia menatap ke arahku dengan raut wajah seolah hendak mengatakan sesuatu, namun pada akhirnya berlalu pergi tanpa sepatah kata pun.",
        "contextNote": "Isyarat wajah yang memancarkan keinginan bicara."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜そうだ (kelihatannya)",
        "summary": "そうだ = kesan visual umum (kelihatannya enak, kelihatannya berat).",
        "distinctionId": "『〜げ』 bernuansa sastrawi dan estetis, khusus untuk pantulan emosi atau aura batin di wajah."
      }
    ],
    "questions": [
      {
        "id": "q-b19-07",
        "type": "cloze",
        "questionNumber": 75,
        "questionJp": "彼は（　　）な表情で壇上に上がり、堂々とスピーチを始めた。",
        "questionRuby": "[彼:かれ]は（　　）な[表情:ひょうじょう]で[壇上:だんじょう]に[上:あ]がり、[堂々:どうどう]とスピーチを[始:はじ]めた。",
        "questionTranslation": "Dia menaiki mimbar dengan ekspresi wajah yang memancarkan rasa percaya diri, lalu memulai pidatonya dengan gagah.",
        "options": [
          {
            "key": "1",
            "textJp": "自信ありげ",
            "textId": "Tampak percaya diri (自信ありげな)"
          },
          {
            "key": "2",
            "textJp": "自信だらけ",
            "textId": "Berlumuran percaya diri"
          },
          {
            "key": "3",
            "textJp": "自信反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "4",
            "textJp": "自信がち",
            "textId": "Cenderung"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan raut wajah yang menyiratkan rasa percaya diri tinggi adalah 『自信ありげな表情』."
      }
    ]
  },

  {
    "id": "n3-b19-kano-you-da",
    "chapterNumber": 19,
    "chapterTitle": "第19課: 様態・比喩・推量 (Perumpamaan & Dugaan)",
    "category": "judgment",
    "categoryLabel": "比喩・様態",
    "patternJp": "〜かのようだ / 〜かのように",
    "patternKana": "かのようだ / かのように",
    "meaningId": "Seolah-olah seperti... padahal kenyataan sebenarnya bukan demikian",
    "connection": "動詞・イ形容詞普通形 ＋ かのようだ / かのように\nナ形容詞・名詞（である） ＋ かのようだ / かのように",
    "coreConcept": "Perumpamaan dramatis untuk melukiskan suatu kemiripan yang sebegitu hidupnya, seolah-olah hal itu nyata, padahal si pembicara tahu persis fakta aslinya berbeda.",
    "cautionNote": "Sering menempel pada kata kerja lampau atau pengandaian: 『まるで〜かのようだ』.",
    "examples": [
      {
        "id": "ex-kanoyou-1",
        "textJp": "まだ五月だというのに、真夏になったかのような猛暑が続いている。",
        "ruby": "まだ[五月:ごがつ]だというのに、[真夏:まなつ]になったかのような[猛暑:もうしょ]が[続:つづ]いている。",
        "textId": "Padahal masih bulan Mei, namun cuaca terik luar biasa seolah-olah sudah memasuki puncak musim panas.",
        "contextNote": "Hawa panas Mei yang diumpamakan bak tengah musim panas."
      },
      {
        "id": "ex-kanoyou-2",
        "textJp": "彼はその事件をまるで自分の目で見てきたかのように語った。",
        "ruby": "[彼:かれ]はその[事件:じけん]をまるで[自分:じぶん]の[目:め]で[見:み]てきたかのように[語:かた]った。",
        "textId": "Dia menceritakan peristiwa insiden tersebut begitu fasihnya seolah-olah dia menyaksikannya sendiri dengan mata kepalanya.",
        "contextNote": "Gaya bercerita yang tampak seolah saksi mata padahal bukan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ようだ (perumpamaan biasa)",
        "summary": "ようだ = perumpamaan umum (seperti bidadari).",
        "distinctionId": "『〜かのようだ』 memiliki unsur penolakan fakta 'padahal kenyataannya jelas-jelas bukan'."
      }
    ],
    "questions": [
      {
        "id": "q-b19-01",
        "type": "cloze",
        "questionNumber": 76,
        "questionJp": "合格の知らせを聞いた瞬間、夢を見ている（　　）大喜びした。",
        "questionRuby": "[合格:ごうかく]の[知:し]らせを[聞:き]いた[瞬間:しゅんかん]、[夢:ゆめ]を[見:み]ている（　　）[大喜:おおよろこ]びした。",
        "questionTranslation": "Saat mendengar kabar kelulusan, saya bersorak gembira seolah-olah sedang bermimpi.",
        "options": [
          {
            "key": "1",
            "textJp": "かのように",
            "textId": "Seolah-olah seperti (夢を見ているかのように)"
          },
          {
            "key": "2",
            "textJp": "反面で",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "わりに",
            "textId": "Untuk ukuran"
          },
          {
            "key": "4",
            "textJp": "せいか",
            "textId": "Mungkin karena"
          }
        ],
        "correctKey": "1",
        "explanation": "Perumpamaan rasa bahagia ekstrem yang terasa bagaikan di alam mimpi adalah 『〜かのように』."
      }
    ]
  },

  {
    "id": "n3-b19-kurai-nara",
    "chapterNumber": 19,
    "chapterTitle": "第19課: 様態・比喩・推量 (Perumpamaan & Dugaan)",
    "category": "judgment",
    "categoryLabel": "選択・比較",
    "patternJp": "〜くらいなら / 〜ぐらいなら",
    "patternKana": "くらいなら / ぐらいなら",
    "meaningId": "Daripada harus mengalami kondisi A... masih jauh lebih mending B",
    "connection": "動詞辞書形 ＋ くらいなら / ぐらいなら",
    "coreConcept": "Menyatakan penolakan tegas terhadap pilihan A yang dianggap sebegitu buruk/menyakitkan, sehingga pembicara lebih memilih alternatif B yang ekstrem sekalipun demi menghindarinya.",
    "cautionNote": "Kalimat belakang sering diikuti oleh 『〜ほうがましだ』 (lebih mending) atau 『〜たい』 (lebih ingin).",
    "examples": [
      {
        "id": "ex-kurainara-1",
        "textJp": "不正をしてまで合格するくらいなら、堂々と落ちて再挑戦するほうがずっとましだ。",
        "ruby": "[不正:ふせい]をしてまで[合格:ごうかく]するくらいなら、[堂々:どうどう]と[落:お]ちて[再挑戦:さいちょうせん]するほうがずっとましだ。",
        "textId": "Daripada harus berbuat curang demi lulus, jauh lebih terhormat jika gagal dengan kesatria lalu mencoba berjuang kembali.",
        "contextNote": "Integritas moral vs kelulusan dengan jalan curang."
      },
      {
        "id": "ex-kurainara-2",
        "textJp": "満員電車に毎朝揺られるくらいなら、会社の近くに引っ越して家賃を払うほうがいい。",
        "ruby": "[満員電車:まんいんでんしゃ]に[毎朝:まいあさ][揺:ゆ]られるくらいなら、[会社:かいしゃ]の[近:ちか]くに[引:ひ]っ[越:こ]して[家賃:やちん]を[払:はら]うほうがいい。",
        "textId": "Daripada setiap pagi harus berdesak-desakan terguncang di kereta penuh sesak, masih lebih baik pindah kos dekat kantor walau sewa lebih mahal.",
        "contextNote": "Memilih bayar sewa mahal daripada stres macet komuter harian."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜より (dibanding)",
        "summary": "より = perbandingan netral biasa.",
        "distinctionId": "『〜くらいなら』 mengisyaratkan bahwa pilihan A adalah mimpi buruk yang sangat dibenci."
      }
    ],
    "questions": [
      {
        "id": "q-b19-06",
        "type": "seiretsu",
        "questionNumber": 77,
        "questionJp": "途中で投げ出すくらいなら、　＿＿　＿＿　★　＿＿　ほうがいい。",
        "questionRuby": "[途中:とちゅう]で[投:な]げ[出:だ]すくらいなら、　＿＿　＿＿　★　＿＿　ほうがいい。",
        "questionTranslation": "Daripada berhenti menyerah di tengah jalan, masih jauh lebih baik dari awal tidak usah memulai sama sekali.",
        "items": [
          "最初から",
          "手を出さない",
          "そんな計画には",
          "一切"
        ],
        "correctOrder": [
          0,
          3,
          2,
          1
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『途中で投げ出すくらいなら、 [最初から] [一切] [そんな計画には] [手を出さない] ほうがいい』. Kata di posisi bintang (★) adalah 『そんな計画には』."
      }
    ]
  },

  {
    "id": "n3-b19-mitai-da",
    "chapterNumber": 19,
    "chapterTitle": "第19課: 様態・比喩・推量 (Perumpamaan & Dugaan)",
    "category": "judgment",
    "categoryLabel": "比喩・様態",
    "patternJp": "〜みたいだ / 〜みたいに",
    "patternKana": "みたいだ / みたいに",
    "meaningId": "Mirip / Seperti... (perumpamaan atau dugaan santai dalam percakapan)",
    "connection": "動詞・イ形容詞普通形 ＋ みたいだ\nナ形容詞・名詞（だ 省く） ＋ みたいだ",
    "coreConcept": "Merupakan padanan percakapan santai dari 『〜ようだ』. Menunjukkan: 1) Perumpamaan kemiripan (seperti mimpi, bagaikan anak kecil). 2) Dugaan berdasarkan tanda visual (sepertinya mau hujan, sepertinya dia sudah pulang).",
    "cautionNote": "Biasa dipakai dalam percakapan lisan sehari-hari. Pada kata benda dan na-adjektiva, langsung menempel tanpa 『の』 atau 『な』 (cth: 子どもみたいだ ○, 子どものみたいだ ✕).",
    "examples": [
      {
        "id": "ex-mitai-1",
        "textJp": "このチョコレート、本物の宝石みたいにキラキラ輝いているね。",
        "ruby": "このチョコレート、[本物:ほんもの]の[宝石:ほうせき]みたいにキラキラ[輝:かがや]いているね。",
        "textId": "Cokelat ini berkilau gemerlap persis seperti permata asli ya.",
        "contextNote": "Perumpamaan visual perhiasan dalam dialog santai."
      },
      {
        "id": "ex-mitai-2",
        "textJp": "隣の部屋から誰も声がしない。もうみんな寝てしまったみたいだ。",
        "ruby": "[隣:となり]の[部屋:へや]から[誰:だれ]も[声:こえ]がしない。もうみんな[寝:ね]てしまったみたいだ。",
        "textId": "Tidak terdengar suara siapa pun dari kamar sebelah. Sepertinya semua orang sudah tertidur lelap.",
        "contextNote": "Dugaan wajar dari suasana sunyi."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ようだ (ragam tulisan)",
        "summary": "ようだ = formal, memakai 『名詞＋の＋ようだ』.",
        "distinctionId": "『〜みたいだ』 adalah ragam percakapan akrab yang langsung menempel pada kata benda tanpa 『の』."
      }
    ],
    "questions": [
      {
        "id": "q-b19-08",
        "type": "cloze",
        "questionNumber": 78,
        "questionJp": "彼の話し方は、まるでプロのアナウンサー（　　）聞き取りやすい。",
        "questionRuby": "[彼:かれ]の[話:はな]し[方:かた]は、まるでプロのアナウンサー（　　）[聞:き]き[取:と]りやすい。",
        "questionTranslation": "Cara bicaranya begitu jelas dan nyaman didengar, persis bagaikan seorang penyiar profesional.",
        "options": [
          {
            "key": "1",
            "textJp": "みたいで",
            "textId": "Bagaikan / seperti (名詞＋みたいで)"
          },
          {
            "key": "2",
            "textJp": "反面で",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "気味で",
            "textId": "Bergejala"
          },
          {
            "key": "4",
            "textJp": "がちで",
            "textId": "Cenderung"
          }
        ],
        "correctKey": "1",
        "explanation": "Perumpamaan santai yang langsung menempel pada kata benda 『アナウンサー』 adalah 『アナウンサーみたいで』."
      }
    ]
  },

  {
    "id": "n3-b19-ni-kurabete",
    "chapterNumber": 19,
    "chapterTitle": "第19課: 様態・比喩・推量 (Perumpamaan & Dugaan)",
    "category": "judgment",
    "categoryLabel": "比較・基準",
    "patternJp": "〜にくらべて / 〜に比べ",
    "patternKana": "にくらべて / にくらべ",
    "meaningId": "Dibandingkan dengan... (menilai perbedaan derajat dua subjek)",
    "connection": "名詞 ＋ にくらべて / に比べ",
    "coreConcept": "Menyandingkan dua objek atau dua periode waktu untuk memperjelas perbedaan sifat, harga, kemudahan, atau kuantitas di antara keduanya.",
    "cautionNote": "Fokus kalimat adalah perbedaan nilai atau derajat di antara dua hal yang diperbandingkan.",
    "examples": [
      {
        "id": "ex-kura-1",
        "textJp": "昔に比べて、現代はインターネットのおかげで情報の入手が格段に容易になった。",
        "ruby": "[昔:むかし]に[比:くら]べて、[現代:げんだい]はインターネットのおかげで[情報:じょうほう]の[入手:にゅうしゅ]が[格段:かくだん]に[容易:ようい]になった。",
        "textId": "Dibandingkan dengan zaman dahulu, di era modern ini berkat internet perolehan informasi menjadi jauh lebih mudah.",
        "contextNote": "Komparasi kemudahan informasi zaman dulu vs sekarang."
      },
      {
        "id": "ex-kura-2",
        "textJp": "兄に比べて弟はおとなしく、家で読書をするのが好きな性格だ。",
        "ruby": "[兄:あに]に[比:くら]べて[弟:おとうと]はおとなしく、[家:いえ]で[読書:どくしょ]をするのが[好:す]きな[性格:せいかく]だ。",
        "textId": "Dibandingkan dengan sang kakak, adik laki-laki lebih pendiam dan berkarakter senang membaca buku di rumah.",
        "contextNote": "Perbandingan karakter dua bersaudara."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜に対して (kontras perlawanan)",
        "summary": "に対して = dua kutub yang berlawanan arah.",
        "distinctionId": "『〜に比べて』 adalah pengukuran perbandingan derajat pada satu tolok ukur yang sama (lebih mudah, lebih murah)."
      }
    ],
    "questions": [
      {
        "id": "q-b19-04",
        "type": "cloze",
        "questionNumber": 79,
        "questionJp": "今年の夏は、例年（　　）気温が高く雨が少ない日が続いている。",
        "questionRuby": "[今年:ことし]の[夏:なつ]は、[例年:れいねん]（　　）[気温:きおん]が[高:たか]く[雨:あめ]が[少:すく]ない[日:ひ]が[続:つづ]いている。",
        "questionTranslation": "Musim panas tahun ini, dibandingkan tahun-tahun biasanya, suhu udara lebih tinggi dan hari-hari minim hujan terus berlanjut.",
        "options": [
          {
            "key": "1",
            "textJp": "に比べて",
            "textId": "Dibandingkan dengan standar acuan (例年に比べて)"
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "にかけて",
            "textId": "Membentang sampai"
          },
          {
            "key": "4",
            "textJp": "せいか",
            "textId": "Mungkin karena"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyandingkan cuaca tahun ini dengan rata-rata tahun biasa adalah 『名詞 ＋ に比べて』."
      }
    ]
  },

  {
    "id": "n3-b19-rashii",
    "chapterNumber": 19,
    "chapterTitle": "第19課: 様態・比喩・推量 (Perumpamaan & Dugaan)",
    "category": "judgment",
    "categoryLabel": "性質・推量",
    "patternJp": "〜らしい",
    "patternKana": "らしい",
    "meaningId": "Khas mencerminkan karakter aslinya / Benar-benar selayaknya...",
    "connection": "名詞 ＋ らしい / らしく\n名詞 ＋ らしい ＋ 名詞",
    "coreConcept": "Menyatakan bahwa subjek benar-benar menampilkan ciri khas, identitas sejati, atau standar perilaku yang memang sepantasnya dimiliki oleh status tersebut (seorang pria sejati, selayaknya anak-anak, khas musim semi).",
    "cautionNote": "Berbeda dengan 『〜っぽい』 yang menyiratkan sifat mirip padahal bukan aslinya (cth: anak kecil bertingkah seperti anak-anak = 子どもらしい ○; orang dewasa bertingkah kekanakan = 子どもっぽい ○).",
    "examples": [
      {
        "id": "ex-rashii-1",
        "textJp": "ぽかぽかと暖かく、ようやく春らしい穏やかな季節になってきた。",
        "ruby": "ぽかぽかと[暖:あたた]かく、ようやく[春:はる]らしい[穏:おだ]やかな[季節:きせつ]になってきた。",
        "textId": "Hawa hangat menyelimuti lembut, akhirnya tiba musim damai yang benar-benar khas mencerminkan keindahan musim semi sejati.",
        "contextNote": "Karakter sejati musim semi."
      },
      {
        "id": "ex-rashii-2",
        "textJp": "失敗を恐れず果敢に行動する、彼らしい素晴らしい決断だった。",
        "ruby": "[失敗:しっぱい]を[恐:おそ]れず[果敢:かかん]に[行動:こうどう]する、[彼:かれ]らしい[素晴:すば]らしい[決断:けつだん]だった。",
        "textId": "Bergerak berani tanpa gentar menghadapi kegagalan, sungguh keputusan luar biasa yang benar-benar mencerminkan karakter khas dirinya.",
        "contextNote": "Sifat khas kepribadian seseorang."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜っぽい (menyerupai luar)",
        "summary": "っぽい = menyerupai padahal identitas aslinya bukan itu.",
        "distinctionId": "『〜らしい』 adalah kemurnian karakter asli: 'memang dia orangnya dan pantas begitu'."
      }
    ],
    "questions": [
      {
        "id": "q-b19-03",
        "type": "cloze",
        "questionNumber": 80,
        "questionJp": "社会人になったのだから、社会人（　　）マナーを身につけなさい。",
        "questionRuby": "[社会人:しゃかいじん]になったのだから、[社会人:しゃかいじん]（　　）マナーを[身:み]につけなさい。",
        "questionTranslation": "Karena kamu sudah menjadi anggota masyarakat profesional, kuasailah etika kesopanan yang selayaknya seorang profesional.",
        "options": [
          {
            "key": "1",
            "textJp": "らしい",
            "textId": "Khas mencerminkan karakter asli (社会人らしい)"
          },
          {
            "key": "2",
            "textJp": "っぽい",
            "textId": "Mirip meniru"
          },
          {
            "key": "3",
            "textJp": "反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "4",
            "textJp": "だらけ",
            "textId": "Berlumuran"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan etika yang memang sepantasnya dimiliki oleh seorang profesional sejati adalah 『名詞 ＋ らしい』."
      }
    ]
  },

  {
    "id": "n3-b19-sou-ni-nai",
    "chapterNumber": 19,
    "chapterTitle": "第19課: 様態・比喩・推量 (Perumpamaan & Dugaan)",
    "category": "judgment",
    "categoryLabel": "推量・可能性",
    "patternJp": "〜そうにない / 〜そうもない",
    "patternKana": "そうにない / そうもない",
    "meaningId": "Tampaknya kecil kemungkinan / Sama sekali tidak terlihat tanda-tanda akan...",
    "connection": "動詞マス形（マス省く） ＋ そうにない / そうもない",
    "coreConcept": "Bentuk negasi dari 『〜そうだ (kelihatannya akan)』. Menunjukkan pengamatan pembicara bahwa peristiwa tersebut kemungkinan besar tidak akan terjadi atau sulit sekali terwujud.",
    "cautionNote": "Bentuk 『〜そうもない』 memiliki penekanan ketidakmungkinan yang lebih kuat dan tegas dibanding 『〜そうにない』.",
    "examples": [
      {
        "id": "ex-souninai-1",
        "textJp": "この山積みの仕事は、どう頑張っても今日中には終わりそうにない。",
        "ruby": "この[山積:やまづ]みの[仕事:しごと]は、どう[頑張:がんば]っても[今日中:きょうじゅう]には[終:お]わりそうにない。",
        "textId": "Tumpukan pekerjaan sebanyak ini, sekeras apa pun saya berjuang tampaknya kecil kemungkinan bisa selesai dalam hari ini.",
        "contextNote": "Pengamatan realistis atas beban kerja."
      },
      {
        "id": "ex-souninai-2",
        "textJp": "空には黒い雨雲が広がり、当分雨はやみそうもない。",
        "ruby": "[空:そら]には[黒:くろ]い[雨雲:あまぐも]が[広:ひろ]がり、[当分:とうぶん][雨:あめ]はやみそうもない。",
        "textId": "Awan mendung hitam pekat menyelimuti angkasa, untuk sementara waktu tampaknya sama sekali tidak ada tanda hujan akan reda.",
        "contextNote": "Analisis cuaca visual."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ないだろう (dugaan biasa)",
        "summary": "ないだろう = perkiraan pikiran umum.",
        "distinctionId": "『〜そうにない』 didasarkan pada tanda-tanda fisik yang tampak langsung di depan mata saat ini."
      }
    ],
    "questions": [
      {
        "id": "q-b19-02",
        "type": "seiretsu",
        "questionNumber": 81,
        "questionJp": "これだけ意見が対立していては、　＿＿　＿＿　★　＿＿　そうにない。",
        "questionRuby": "これだけ[意見:いけん]が[対立:たいりつ]していては、　＿＿　＿＿　★　＿＿　そうにない。",
        "questionTranslation": "Melihat silang pendapat yang sebegitu sengitnya, kompromi kesepakatan tampaknya kecil kemungkinan tercapai dengan mudah.",
        "items": [
          "簡単に",
          "妥協案が",
          "まとまり",
          "両者の間で"
        ],
        "correctOrder": [
          3,
          0,
          1,
          2
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『これだけ意見が対立していては、 [両者の間で] [簡単に] [妥協案が] [まとまり] そうにない』. Kata di posisi bintang (★) adalah 『妥協案が』."
      }
    ]
  },

  {
    "id": "n3-b19-toori-ni",
    "chapterNumber": 19,
    "chapterTitle": "第19課: 様態・比喩・推量 (Perumpamaan & Dugaan)",
    "category": "judgment",
    "categoryLabel": "基準・一致",
    "patternJp": "〜とおりに / 〜どおりに",
    "patternKana": "とおりに / どおりに",
    "meaningId": "Persis tepat sesuai dengan... (arahan, rencana, dugaan, atau resep)",
    "connection": "動詞辞書形 / た形 ＋ とおりに\n名詞 ＋ どおりに（rendaku: do-）\n名詞＋の ＋ とおりに",
    "coreConcept": "Menyatakan bahwa tindakan yang dilakukan berlangsung tepat tanpa meleset sedikit pun dari rancangan, instruksi guru, peta rute, resep masakan, atau firasat awal.",
    "cautionNote": "Perhatikan bunyi suara (rendaku): jika menempel langsung pada kata benda berubah menjadi 『〜どおり』 (cth: 計画どおり, 予想どおり). Jika pakai 『の』 tetap 『計画のとおり』.",
    "examples": [
      {
        "id": "ex-toori-1",
        "textJp": "料理本のレシピのとおりに作ったところ、プロ顔負けの美味しいカレーができた。",
        "ruby": "[料理本:りょうりぼん]のレシピのとおりに[作:つく]ったところ、プロ[顔負:かおま]けの[美味:おい]しいカレーができた。",
        "textId": "Saat memasak tepat persis sesuai resep di buku kuliner, terciptalah kari lezat yang tak kalah dari buatan koki profesional.",
        "contextNote": "Ketaatan presisi mengikuti resep masakan."
      },
      {
        "id": "ex-toori-2",
        "textJp": "事前の計画どおりに工事が進み、予定期日までに無事竣工した。",
        "ruby": "[事前:じぜん]の[計画:けいかく]どおりに[工事:こうじ]が[進:すす]み、[予定期日:よていきじつ]までに[無事:ぶじ][竣工:しゅんこう]した。",
        "textId": "Pengerjaan konstruksi berjalan mulus tepat sesuai rencana awal, dan rampung tepat sebelum batas waktu yang ditargetkan.",
        "contextNote": "Proyek yang selesai presisi sesuai jadwal."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜に沿って (mengikuti alur)",
        "summary": "に沿って = mengikuti koridor umum garis pedoman.",
        "distinctionId": "『〜とおりに』 menuntut ketepatan presisi 100% tanpa selisih."
      }
    ],
    "questions": [
      {
        "id": "q-b19-05",
        "type": "cloze",
        "questionNumber": 82,
        "questionJp": "私が今から（　　）やって見せてください。",
        "questionRuby": "[私:わたし]が[今:いま]から（　　）やって[見:み]せてください。",
        "questionTranslation": "Tolong peragakan persis seperti apa yang akan saya contohkan sekarang.",
        "options": [
          {
            "key": "1",
            "textJp": "言うとおりに",
            "textId": "Persis sesuai yang dikatakan (動詞辞書形＋とおりに)"
          },
          {
            "key": "2",
            "textJp": "言う反面",
            "textId": "Di sisi lain berkata"
          },
          {
            "key": "3",
            "textJp": "言う気味",
            "textId": "Bergejala"
          },
          {
            "key": "4",
            "textJp": "言うわりに",
            "textId": "Untuk ukuran"
          }
        ],
        "correctKey": "1",
        "explanation": "Meminta lawan bicara menirukan secara presisi arahan yang diucapkan menggunakan 『動詞 ＋ とおりに』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第20課: 目的・意志・対象 (Maksud & Segmentasi)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b20-muke",
    "chapterNumber": 20,
    "chapterTitle": "第20課: 目的・意志・対象 (Maksud & Segmentasi)",
    "category": "judgment",
    "categoryLabel": "対象・用途",
    "patternJp": "〜向け / 〜向けに / 〜向けの",
    "patternKana": "むけ / むけに / むけの",
    "meaningId": "Dikhususkan / Dibuat khusus untuk target tertentu (anak-anak, pemula, pasar global)",
    "connection": "名詞 ＋ 向けだ / 向けに / 向けの ＋ 名詞",
    "coreConcept": "Menyatakan bahwa suatu produk, buku, program, atau fasilitas secara sengaja dirancang dari awal untuk melayani segmen target sasaran tertentu.",
    "cautionNote": "Berbeda dengan 『〜向き』 yang berarti 'secara alami pas karakternya'. 『〜向け』 adalah tindakan niat sengaja si pembuat (desain intensional).",
    "examples": [
      {
        "id": "ex-muke-1",
        "textJp": "この日本語教材は、非漢字圏の初級学習者向けに特別に編集されている。",
        "ruby": "この[日本語教材:にほんごきょうざい]は、[非漢字圏:ひかんじけん]の[初級学習者向:しょきゅうがくしゅうしゃむ]けに[特別:とくべつ]に[編集:へんしゅう]されている。",
        "textId": "Buku ajar bahasa Jepang ini diedit dan dirancang secara khusus untuk target pembelajar tingkat dasar dari kawasan non-kanji.",
        "contextNote": "Desain buku yang sengaja menyasar target segmen spesifik."
      },
      {
        "id": "ex-muke-2",
        "textJp": "海外の富裕層向けの高層タワーマンションが、都心部に次々と建設されている。",
        "ruby": "[海外:かいがい]の[富裕層向:ふゆうそうむ]けの[高層:こうそう]タワーマンションが、[都心部:としんぶ]に[次々:つぎつぎ]と[建設:けんせつ]されている。",
        "textId": "Apartemen menara mewah yang dikhususkan untuk kalangan berpenghasilan tinggi luar negeri dibangun silih berganti di pusat kota.",
        "contextNote": "Produk hunian yang secara sengaja membidik pasar kaum berada."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜向き (kecocokan alami)",
        "summary": "向き = sifat bawaan yang pas secara natural (cocok untuk musim dingin).",
        "distinctionId": "『〜向け』 adalah produk atau karya yang sengaja dibuat demi target audiens tersebut."
      }
    ],
    "questions": [
      {
        "id": "q-b20-03",
        "type": "cloze",
        "questionNumber": 83,
        "questionJp": "子ども（　　）のアニメだが、奥深いテーマは大人の心にも響く。",
        "questionRuby": "[子:こ]ども（　　）のアニメだが、[奥深:おくふか]いテーマは[大人:おとな]の[心:こころ]にも[響:ひび]く。",
        "questionTranslation": "Meskipun anime yang dibuat khusus untuk anak-anak, temanya yang mendalam turut menyentuh hati orang dewasa.",
        "options": [
          {
            "key": "1",
            "textJp": "向け",
            "textId": "Dikhususkan untuk target sasaran (子ども向け)"
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "気味",
            "textId": "Bergejala"
          },
          {
            "key": "4",
            "textJp": "せいで",
            "textId": "Gara-gara"
          }
        ],
        "correctKey": "1",
        "explanation": "Karya animasi yang secara sengaja ditargetkan untuk pemirsa anak-anak adalah 『名詞 ＋ 向け』."
      }
    ]
  },

  {
    "id": "n3-b20-muki",
    "chapterNumber": 20,
    "chapterTitle": "第20課: 目的・意志・対象 (Maksud & Segmentasi)",
    "category": "judgment",
    "categoryLabel": "適合・性質",
    "patternJp": "〜向き / 〜向きに / 〜向きの",
    "patternKana": "むき / むきに / むきの",
    "meaningId": "Cocok / Pas secara alami karakternya untuk...",
    "connection": "名詞 ＋ 向きだ / 向きに / 向きの ＋ 名詞",
    "coreConcept": "Menyatakan bahwa sifat, karakter alami, rasa, atau proporsi suatu hal pas dan cocok untuk pengguna, situasi, atau musim tertentu, tanpa memandang apakah barang itu memang sengaja dibuat untuk itu atau tidak.",
    "cautionNote": "Sering menempel pada kata seperti: 夏向き (pas untuk musim panas), 初心者向き (karakternya cocok untuk pemula), 女性向き (pas untuk wanita).",
    "examples": [
      {
        "id": "ex-muki-1",
        "textJp": "この通気性の良い生地は、汗をかきやすい日本の蒸し暑い夏向きだ。",
        "ruby": "この[通気性:つうきせい]の[良:よ]い[生地:きじ]は、[汗:あせ]をかきやすい[日本:にほん]の[蒸:む]し[暑:あつ]い[夏向:なつむ]きだ。",
        "textId": "Kain dengan sirkulasi udara yang baik ini sangat cocok dan pas karakternya untuk musim panas Jepang yang lembap dan gerah.",
        "contextNote": "Kecocokan alami karakteristik kain dengan cuaca musim panas."
      },
      {
        "id": "ex-muki-2",
        "textJp": "彼は穏やかで根気強い性格だから、じっくり人と向き合うカウンセラー向きだ。",
        "ruby": "[彼:かれ]は[穏:おだ]やかで[根気強:こんきづよ]い[性格:せいかく]だから、じっくり[人:ひと]と[向:む]き[合:あ]うカウンセラー[向:む]きだ。",
        "textId": "Karena dia berkarakter tenang dan sabar, kepribadiannya sangat cocok menjadi seorang konselor.",
        "contextNote": "Kecocokan bakat alamiah seseorang dengan profesi tertentu."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜向け",
        "summary": "向け = dibuat sengaja demi sasaran pasar.",
        "distinctionId": "『〜向き』 adalah kecocokan atau kepantasan secara alami menurut sifat karakternya."
      }
    ],
    "questions": [
      {
        "id": "q-b20-04",
        "type": "cloze",
        "questionNumber": 84,
        "questionJp": "このワインはフルーティーで飲みやすく、お酒が苦手な人（　　）の味だ。",
        "questionRuby": "このワインはフルーティーで[飲:の]みやすく、お[酒:さけ]が[苦手:にがて]な[人:ひと]（　　）の[味:あじ]だ。",
        "questionTranslation": "Anggur ini terasa manis buah dan mudah diminum, rasanya pas cocok bagi orang yang kurang kuat minum alkohol.",
        "options": [
          {
            "key": "1",
            "textJp": "向き",
            "textId": "Cocok karakternya (苦手な人向き)"
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "だらけ",
            "textId": "Berlumuran"
          },
          {
            "key": "4",
            "textJp": "がち",
            "textId": "Cenderung"
          }
        ],
        "correctKey": "1",
        "explanation": "Citarasa anggur yang ramah dan pas secara alami bagi peminum pemula diungkapkan dengan 『名詞 ＋ 向き』."
      }
    ]
  },

  {
    "id": "n3-b20-tame-ni",
    "chapterNumber": 20,
    "chapterTitle": "第20課: 目的・意志・対象 (Maksud & Segmentasi)",
    "category": "judgment",
    "categoryLabel": "目的・動機",
    "patternJp": "〜ために / 〜ための",
    "patternKana": "ために / ための",
    "meaningId": "Demi... (tujuan utama dengan kehendak dan aksi sadar pembicara)",
    "connection": "動詞辞書形 ＋ ために / ための ＋ 名詞\n名詞＋の ＋ ために / ための ＋ 名詞",
    "coreConcept": "Menunjukkan cita-cita, ambisi, atau tujuan luhur yang hendak dicapai, di mana pembicara secara sengaja dan aktif melakukan tindakan untuk mewujudkannya.",
    "cautionNote": "Kata kerja di depan 『ために』 harus berupa kata kerja yang berada dalam kendali kehendak pembicara (意志動詞). Subjek kalimat depan dan belakang harus orang yang sama.",
    "examples": [
      {
        "id": "ex-tameni-1",
        "textJp": "念願のマイホームを購入するために、毎月コツコツと節約に励んでいる。",
        "ruby": "[念願:ねんがん]のマイホームを[購入:こうにゅう]するために、[毎月:まいつき]コツコツと[節約:せつやく]に[励:はげ]んでいる。",
        "textId": "Demi membeli rumah impian yang diidam-idamkan, setiap bulan saya tekun berhemat sedikit demi sedikit.",
        "contextNote": "Tujuan finansial jangka panjang."
      },
      {
        "id": "ex-tameni-2",
        "textJp": "これは日本語の聴解力を飛躍的に向上させるための専用アプリです。",
        "ruby": "これは[日本語:にほんご]の[聴解力:ちょうかいりょく]を[飛躍的:ひやくてき]に[向上:こうじょう]させるための[専用:せんよう]アプリです。",
        "textId": "Ini adalah aplikasi khusus demi mendongkrak kemampuan menyimak (choukai) bahasa Jepang secara pesat.",
        "contextNote": "Modifikasi kata benda: 'aplikasi demi tujuan peningkatan skor'."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ように",
        "summary": "ように = tujuan kondisi atau potensi (supaya bisa mendengar).",
        "distinctionId": "『〜ために』 adalah aksi kehendak sadar pembicara (demi membeli rumah, saya menabung)."
      }
    ],
    "questions": [
      {
        "id": "q-b20-08",
        "type": "cloze",
        "questionNumber": 85,
        "questionJp": "夢を叶える（　　）、日々の努力を惜しんではならない。",
        "questionRuby": "[夢:ゆめ]を[叶:かな]える（　　）、[日々:ひび]の[努力:どりょく]を[惜:お]しんではならない。",
        "questionTranslation": "Demi mewujudkan impian, kita tidak boleh menyia-nyiakan ikhtiar perjuangan setiap hari.",
        "options": [
          {
            "key": "1",
            "textJp": "ために",
            "textId": "Demi tujuan sadar (動詞辞書形＋ために)"
          },
          {
            "key": "2",
            "textJp": "反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "気味",
            "textId": "Bergejala"
          },
          {
            "key": "4",
            "textJp": "わりに",
            "textId": "Untuk ukuran"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan tujuan kehendak luhur mewujudkan impian adalah 『動詞辞書形 ＋ ために』."
      }
    ]
  },

  {
    "id": "n3-b20-tsumori-de",
    "chapterNumber": 20,
    "chapterTitle": "第20課: 目的・意志・対象 (Maksud & Segmentasi)",
    "category": "judgment",
    "categoryLabel": "思い込み・覚悟",
    "patternJp": "〜つもりで / 〜たつもりで",
    "patternKana": "つもりで / たつもりで",
    "meaningId": "Seolah-olah / Bertekad dengan anggapan bahwa...",
    "connection": "動詞普通形（た形／ている） ＋ つもりで\n名詞＋の ＋ つもりで",
    "coreConcept": "Melakukan suatu tindakan dengan memasang tekad batin atau menganggap seolah-olah suatu kondisi ekstrem sudah terjadi, padahal kenyataan sebenarnya berbeda (cth: berjuang seolah-olah sudah mati; menabung seolah-olah sudah beli kopi).",
    "cautionNote": "Bukan sekadar 'berniat', melainkan bersikap mental seolah-olah hal tersebut nyata sebagai sumber motivasi.",
    "examples": [
      {
        "id": "ex-tsumoride-1",
        "textJp": "死んだつもりで必死に練習に励めば、どんな強敵にも勝てるはずだ。",
        "ruby": "[死:し]んだつもりで[必死:ひっし]に[練習:れんしゅう]に[励:はげ]めば、どんな[強敵:きょうてき]にも[勝:か]てるはずだ。",
        "textId": "Bila kita berlatih mati-matian seolah-olah siap mengorbankan nyawa, musuh sekuat apa pun pasti bisa kita kalahkan.",
        "contextNote": "Sikap tekad membara menganggap diri siap mati."
      },
      {
        "id": "ex-tsumoride-2",
        "textJp": "外食したつもりでその分のお金を貯金箱に入れ、旅行資金を貯めている。",
        "ruby": "[外食:がいしょく]したつもりでその[分:ぶん]のお[金:かね]を[貯金箱:ちょきんばこ]に[入:い]れ、[旅行資金:りょこうしきん]を[貯:た]めている。",
        "textId": "Menganggap seolah-olah saya makan di restoran mewah lalu memasukkan uangnya ke celengan, saya mengumpulkan dana jalan-jalan.",
        "contextNote": "Metode menabung dengan pura-pura sudah berbelanja."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜つもりだ (niat rencana)",
        "summary": "つもりだ = berencana melakukan sesuatu di masa depan.",
        "distinctionId": "『〜たつもりで』 adalah mentalitas berandai-andai dalam melakukan aksi saat ini."
      }
    ],
    "questions": [
      {
        "id": "q-b20-06",
        "type": "cloze",
        "questionNumber": 86,
        "questionJp": "本番の試験の（　　）、時間を厳格に測って模擬試験を解いた。",
        "questionRuby": "[本番:ほんばん]の[試験:しけん]の（　　）、[時間:じかん]を[厳格:げんかく]に[測:はか]って[模擬試験:もぎしけん]を[解:と]いた。",
        "questionTranslation": "Dengan anggapan dan keseriusan seolah-olah sedang ujian sungguhan, saya mengukur waktu secara ketat saat mengerjakan simulasi try-out.",
        "options": [
          {
            "key": "1",
            "textJp": "つもりで",
            "textId": "Seolah-olah memasang sikap mental (名詞+のつもりで)"
          },
          {
            "key": "2",
            "textJp": "反面で",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "気味で",
            "textId": "Bergejala"
          },
          {
            "key": "4",
            "textJp": "せいで",
            "textId": "Gara-gara"
          }
        ],
        "correctKey": "1",
        "explanation": "Mengerjakan try-out dengan sikap mental seolah-olah menghadapi ujian asli adalah 『名詞 ＋ のつもりで』."
      }
    ]
  },

  {
    "id": "n3-b20-you-ni",
    "chapterNumber": 20,
    "chapterTitle": "第20課: 目的・意志・対象 (Maksud & Segmentasi)",
    "category": "judgment",
    "categoryLabel": "目的・配慮",
    "patternJp": "〜ように / 〜ようにと",
    "patternKana": "ように / ようにと",
    "meaningId": "Agar / Supaya... (tujuan keadaan yang di luar kendali langsung)",
    "connection": "動詞辞書形（無意志動詞 / 可能形） ＋ ように\n動詞ナイ形 ＋ ように",
    "coreConcept": "Menyatakan suatu tujuan atau harapan kondisi masa depan yang diinginkan pembicara, di mana kata kerja di depan 『ように』 adalah kata kerja tanpa kehendak (無意志動詞), bentuk potensi (可能形), atau bentuk negatif (ナイ形).",
    "cautionNote": "Berbeda dengan 『〜ために』 yang memakai kata kerja berkehendak (意志動詞) dan subjeknya harus sama. 『〜ように』 fokus pada terciptanya suatu kondisi.",
    "examples": [
      {
        "id": "ex-youni-1",
        "textJp": "後ろの席の人にもよく聞こえるように、大きな声で話してください。",
        "ruby": "[後:うし]ろの[席:せき]の[人:ひと]にもよく[聞:き]こえるように、[大:おお]きな[声:こえ]で[話:はな]してください。",
        "textId": "Agar dapat terdengar jelas bahkan oleh orang di kursi belakang, berbicaralah dengan suara yang lantang.",
        "contextNote": "Tujuan agar kondisi 'terdengar' (bisa terdengar) tercapai."
      },
      {
        "id": "ex-youni-2",
        "textJp": "風邪をひかないように、暖かくして出かけましょう。",
        "ruby": "[風邪:かぜ]をひかないように、[暖:あたた]かくして[出:で]かけましょう。",
        "textId": "Supaya tidak masuk angin/flu, mari kenakan pakaian hangat sebelum bepergian keluar.",
        "contextNote": "Tujuan negatif menghindari jatuh sakit (ナイ形)."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ために (demi)",
        "summary": "ために = subjek memiliki kendali kehendak langsung (cth: beli mobil demi kerja).",
        "distinctionId": "『〜ように』 digunakan jika kata kerjanya adalah potensi (bisa), otomatis (terlihat/terdengar), atau negatif (jangan sampai)."
      }
    ],
    "questions": [
      {
        "id": "q-b20-01",
        "type": "cloze",
        "questionNumber": 87,
        "questionJp": "忘れない（　　）、手帳にしっかりとメモを取っておいた。",
        "questionRuby": "[忘:わす]れない（　　）、[手帳:てちょう]にしっかりとメモを[取:と]っておいた。",
        "questionTranslation": "Supaya tidak lupa, saya mencatat memo dengan rapi di buku agenda.",
        "options": [
          {
            "key": "1",
            "textJp": "ように",
            "textId": "Supaya jangan sampai (V-nai + ように)"
          },
          {
            "key": "2",
            "textJp": "ために",
            "textId": "Demi (kurang tepat untuk V-nai)"
          },
          {
            "key": "3",
            "textJp": "反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "4",
            "textJp": "わりに",
            "textId": "Untuk ukuran"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan tujuan menghindari kelupaan menggunakan bentuk negatif 『動詞ナイ形 ＋ ように』."
      }
    ]
  },

  {
    "id": "n3-b20-you-ni-iu",
    "chapterNumber": 20,
    "chapterTitle": "第20課: 目的・意志・対象 (Maksud & Segmentasi)",
    "category": "judgment",
    "categoryLabel": "伝達・指示",
    "patternJp": "〜ように言う / 〜ように頼む",
    "patternKana": "ようにいう / ようにたのむ",
    "meaningId": "Menyampaikan pesan agar... / Meminta pihak lain untuk... (kalimat tidak langsung)",
    "connection": "動詞辞書形 / ない形 ＋ ように言う / 頼む / 伝える",
    "coreConcept": "Merupakan bentuk penyampaian instruksi, pesan permohonan, atau larangan secara tidak langsung (indirect speech) kepada pihak ketiga.",
    "cautionNote": "Bentuk pasifnya 『〜ように言われる』 bermakna 'saya disuruh / diperintahkan oleh orang lain agar melakukan hal tersebut'.",
    "examples": [
      {
        "id": "ex-youniiu-1",
        "textJp": "先生から、明日は絶対に遅刻しないようにときつく言われました。",
        "ruby": "[先生:せんせい]から、[明日:あした]は[絶対:ぜったい]に[遅刻:ちこく]しないようにときつく[言:い]われました。",
        "textId": "Saya diperingatkan dengan tegas oleh guru agar besok tidak boleh sekali-kali terlambat.",
        "contextNote": "Bentuk pasif perintah tidak langsung dari guru."
      },
      {
        "id": "ex-youniiu-2",
        "textJp": "田中さんに、至急こちらの書類を確認してくださるよう頼んでおきました。",
        "ruby": "[田中:たなか]さんに、[至急:しきゅう]こちらの[書類:しょるい]をこ[確認:かくにん]してくださるよう[頼:たの]んでおきました。",
        "textId": "Saya sudah menitip pesan permohonan kepada Tanaka-san agar segera sudi memeriksa berkas dokumen ini.",
        "contextNote": "Permohonan tidak langsung kepada rekan kerja."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜と直接言う (kutipan langsung)",
        "summary": "「〜」と言う = mengutip kata per kata dalam tanda kutip.",
        "distinctionId": "『〜ように言う』 menyampaikan substansi maksud perintah secara elegan tanpa tanda kutip langsung."
      }
    ],
    "questions": [
      {
        "id": "q-b20-07",
        "type": "seiretsu",
        "questionNumber": 88,
        "questionJp": "医者から　＿＿　＿＿　★　＿＿　言われている。",
        "questionRuby": "[医者:いしゃ]から　＿＿　＿＿　★　＿＿　[言:い]われている。",
        "questionTranslation": "Saya diperingatkan oleh dokter agar menghentikan kebiasaan merokok demi kesehatan.",
        "items": [
          "タバコを",
          "健康のために",
          "やめるようにと",
          "厳しく"
        ],
        "correctOrder": [
          1,
          0,
          2,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『医者から [健康のために] [タバコを] [やめるようにと] [厳しく] 言われている』. Kata di posisi bintang (★) adalah 『やめるようにと』."
      }
    ]
  },

  {
    "id": "n3-b20-you-ni-suru",
    "chapterNumber": 20,
    "chapterTitle": "第20課: 目的・意志・対象 (Maksud & Segmentasi)",
    "category": "judgment",
    "categoryLabel": "配慮・習慣",
    "patternJp": "〜ようにする",
    "patternKana": "ようにする",
    "meaningId": "Berupaya membiasakan diri / Mengusahakan agar selalu...",
    "connection": "動詞辞書形 / ない形 ＋ ようにする\n動詞辞書形 / ない形 ＋ ようにしてください",
    "coreConcept": "Menyatakan ikhtiar atau komitmen pembicara untuk berusaha sebisa mungkin menjaga kebiasaan atau perilaku tertentu secara berkesinambungan.",
    "cautionNote": "Bentuk 『〜ようにしてください』 sering digunakan untuk memberikan instruksi, nasihat, atau anjuran halus (misal: dokter menasihati pasien).",
    "examples": [
      {
        "id": "ex-younisuru-1",
        "textJp": "毎食後には必ず歯を丁寧に磨くようにしている。",
        "ruby": "[毎食後:まいしょくご]には[必:かなら]ず[歯:は]を[丁寧:ていねい]に[磨:みが]くようにしている。",
        "textId": "Seusai makan setiap kali, saya selalu berupaya membiasakan diri menggosok gigi dengan teliti.",
        "contextNote": "Ikhtiar menjaga kebiasaan hidup bersih."
      },
      {
        "id": "ex-younisuru-2",
        "textJp": "薬の効果を最大限に高めるため、毎日決まった時間に飲むようにしてください。",
        "ruby": "[薬:くすり]の[効果:こうか]を[最大限:さいだいげん]に[高:たか]めるため、[毎日:まいにち][決:き]まった[時間:じかん]に[飲:の]むようにしてください。",
        "textId": "Demi memaksimalkan khasiat obat, mohon usahakan untuk meminumnya pada jam yang sama setiap hari.",
        "contextNote": "Instruksi anjuran medis dari apoteker."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ことにする (keputusan tegas)",
        "summary": "ことにする = memutuskan pilihan satu kali di titik awal.",
        "distinctionId": "『〜ようにする』 menekankan proses ikhtiar dan upaya terus-menerus agar tidak lalai."
      }
    ],
    "questions": [
      {
        "id": "q-b20-05",
        "type": "cloze",
        "questionNumber": 89,
        "questionJp": "夜遅く帰宅したときは、近所迷惑にならないよう静かに（　　）。",
        "questionRuby": "[夜遅:よるおそ]く[帰宅:きたく]したときは、[近所迷惑:きんじょめいわく]にならないよう[静:しず]かに（　　）。",
        "questionTranslation": "Saat pulang larut malam, saya selalu berupaya untuk bergerak tenang agar tidak mengganggu tetangga.",
        "options": [
          {
            "key": "1",
            "textJp": "歩くようにしている",
            "textId": "Berupaya membiasakan jalan pelan"
          },
          {
            "key": "2",
            "textJp": "歩く反面だ",
            "textId": "Di sisi lain berjalan"
          },
          {
            "key": "3",
            "textJp": "歩かざるを得ない",
            "textId": "Terpaksa berjalan"
          },
          {
            "key": "4",
            "textJp": "歩く気味だ",
            "textId": "Bergejala berjalan"
          }
        ],
        "correctKey": "1",
        "explanation": "Ikhtiar menjaga tata krama keheningan agar tidak merepotkan tetangga adalah 『動詞辞書形 ＋ ようにしている』."
      }
    ]
  },

  {
    "id": "n3-b20-you-to-suru",
    "chapterNumber": 20,
    "chapterTitle": "第20課: 目的・意志・対象 (Maksud & Segmentasi)",
    "category": "judgment",
    "categoryLabel": "意志・試み",
    "patternJp": "〜ようとする / 〜ようとしない",
    "patternKana": "ようとする / ようとしない",
    "meaningId": "1) Berupaya hendak... / 2) Tepat di detik hendak... / 3) Sama sekali enggan berupaya",
    "connection": "動詞意向形（〜よう／〜ろう） ＋ とする / としない",
    "coreConcept": "Memiliki fungsi: 1) Tepat di detik hendak memulai aksi (ketika hendak naik kereta, pintu menutup). 2) Mengerahkan daya upaya untuk mencapai sesuatu. 3) Bila berbentuk 『〜ようとしない』, bermakna pihak ketiga keras kepala sama sekali tidak mau mencoba.",
    "cautionNote": "Bentuk negatif 『〜ようとしない』 sering keluar di ujian untuk mendeskripsikan kekecewaan melihat orang lain yang enggan berubah.",
    "examples": [
      {
        "id": "ex-youtosuru-1",
        "textJp": "電車に乗ろうとしたとき、目の前で無情にもドアが閉まってしまった。",
        "ruby": "[電車:でんしゃ]に[乗:の]ろうとしたとき、[目:め]の[前:まえ]で[無情:むじょう]にもドアが[閉:し]まってしまった。",
        "textId": "Tepat di detik hendak melangkah naik ke gerbong kereta, pintunya tanpa ampun tertutup persis di depan mataku.",
        "contextNote": "Momen tepat di detik hendak memulai tindakan."
      },
      {
        "id": "ex-youtosuru-2",
        "textJp": "弟は自分の非を認めようとせず、言い訳ばかり並べている。",
        "ruby": "[弟:おとうと]は[自分:じぶん]の[非:ひ]を[認:みと]めようとせず、[言:い]い[訳:わけ]ばかり[並:なら]べている。",
        "textId": "Adik laki-lakiku sama sekali tidak mau berupaya mengakui kesalahannya sendiri, dan hanya sibuk membeberkan berbagai alasan.",
        "contextNote": "Sikap keras kepala orang lain yang enggan berbuat benar."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ようと思う (berniat)",
        "summary": "ようと思う = niat di dalam batin.",
        "distinctionId": "『〜ようとする』 adalah tindakan fisik nyata yang sedang dicoba atau tepat di ambang detik pelaksanaan."
      }
    ],
    "questions": [
      {
        "id": "q-b20-02",
        "type": "seiretsu",
        "questionNumber": 90,
        "questionJp": "家を出ようとした　＿＿　＿＿　★　＿＿　鳴り響いた。",
        "questionRuby": "[家:いえ]を[出:で]ようとした　＿＿　＿＿　★　＿＿　[鳴:な]り[響:ひび]いた。",
        "questionTranslation": "Tepat di detik hendak melangkah keluar rumah, tiba-tiba telepon mendadak berdering kencang.",
        "items": [
          "電話のベルが",
          "突然",
          "その瞬間に",
          "けたたましく"
        ],
        "correctOrder": [
          2,
          1,
          0,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『家を出ようとした [その瞬間に] [突然] [電話のベルが] [けたたましく] 鳴り響いた』. Kata di posisi bintang (★) adalah 『電話のベルが』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第21課: 時点・推移・完了 (Titik Waktu & Ketuntasan)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b21-kakeru",
    "chapterNumber": 21,
    "chapterTitle": "第21課: 時点・推移・完了 (Titik Waktu & Ketuntasan)",
    "category": "change",
    "categoryLabel": "途中・直前",
    "patternJp": "〜かける / 〜かけの",
    "patternKana": "かける / かけの",
    "meaningId": "1) Sedang di tengah jalan (belum tuntas selesai) / 2) Nyaris hampir saja terjadi",
    "connection": "動詞マス形（マス省く） ＋ かける / かけの ＋ 名詞 / かけだ",
    "coreConcept": "Menunjukkan: 1) Suatu proses tindakan sudah dimulai namun ditinggalkan di tengah jalan sebelum beres (misal: buku yang baru dibaca separuh, makanan yang belum habis). 2) Sesuatu yang nyaris hampir terjadi (misal: hampir tenggelam).",
    "cautionNote": "Bila berbentuk modifikasi kata benda: 『〜かけの＋名詞』 (cth: 飲みかけのコーヒー = kopi yang baru diminum separuh).",
    "examples": [
      {
        "id": "ex-kakeru-1",
        "textJp": "机の上には、読みかけの小説と冷めかけた紅茶がそのまま置かれていた。",
        "ruby": "[机:つくえ]の[上:うえ]には、[読:よ]みかけの[小説:しょうせつ]と[冷:さ]めかけた[紅茶:こうちゃ]がそのまま[置:お]かれていた。",
        "textId": "Di atas meja, tergeletak begitu saja novel yang baru dibaca separuh dan teh hitam yang mulai mendingin.",
        "contextNote": "Buku dan minuman yang belum tuntas ditinggalkan begitu saja."
      },
      {
        "id": "ex-kakeru-2",
        "textJp": "彼は何か言いかけて口をつぐみ、困ったように視線を落とした。",
        "ruby": "[彼:かれ]は[何:なに]か[言:い]いかけて[口:くち]をつぐみ、[困:こま]ったように[視線:しせん]を[落:お]とした。",
        "textId": "Dia sempat hendak mengatakan sesuatu namun mendadak mengatupkan bibirnya rapat-rapat, lalu menundukkan pandangannya serba salah.",
        "contextNote": "Ucapan yang tertahan di tengah jalan sebelum tuntas terucap."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜切る (menuntaskan)",
        "summary": "切る = selesai tuntas hingga tetes penghabisan.",
        "distinctionId": "『〜かける』 adalah kebalikannya: pekerjaan terhenti mengambang di separuh jalan."
      }
    ],
    "questions": [
      {
        "id": "q-b21-06",
        "type": "cloze",
        "questionNumber": 91,
        "questionJp": "誰ですか、ここに（　　）のペットボトルを放置した人は！",
        "questionRuby": "[誰:だれ]ですか、ここに（　　）のペットボトルを[放置:ほうち]した[人:ひと]は！",
        "questionTranslation": "Siapa ini orangnya yang menelantarkan botol minuman yang baru diminum separuh di sini!",
        "options": [
          {
            "key": "1",
            "textJp": "飲みかけ",
            "textId": "Baru diminum setengah jalan (V-masu + かけ)"
          },
          {
            "key": "2",
            "textJp": "飲み反面",
            "textId": "Di sisi lain minum"
          },
          {
            "key": "3",
            "textJp": "飲み気味",
            "textId": "Bergejala minum"
          },
          {
            "key": "4",
            "textJp": "飲みだらけ",
            "textId": "Berlumuran minum"
          }
        ],
        "correctKey": "1",
        "explanation": "Botol minuman yang isinya masih tersisa belum habis diungkapkan dengan 『動詞マス形 ＋ かけ』 -> 『飲みかけのペットボトル』."
      }
    ]
  },

  {
    "id": "n3-b21-kiru",
    "chapterNumber": 21,
    "chapterTitle": "第21課: 時点・推移・完了 (Titik Waktu & Ketuntasan)",
    "category": "degree",
    "categoryLabel": "完了・極限",
    "patternJp": "〜切る / 〜切れない",
    "patternKana": "きる / きれない",
    "meaningId": "1) Menuntaskan sampai habis tandas / 2) Tak sanggup menghabiskan (negatif)",
    "connection": "動詞マス形（マス省く） ＋ 切る / 切れる / 切れない",
    "coreConcept": "Menyatakan melakukan suatu tindakan secara tuntas mutlak sampai ke tetes/lembar penghabisan. Bila berbentuk 『〜切れない』, bermakna kuantitasnya terlampau banyak sehingga mustahil dihabiskan seluruhnya.",
    "cautionNote": "Sering menempel pada kata kerja seperti: 使い切る (menghabiskan tuntas uang/stamina), 食べ切れない (tak sanggup menghabiskan makanan), 信じ切る (percaya sepenuh hati).",
    "examples": [
      {
        "id": "ex-kiru-1",
        "textJp": "フルマラソンの過酷な42.195キロを、最後まで笑顔で走り切った。",
        "ruby": "フルマラソンの[過酷:かこく]な42.195キロを、[最後:さいご]まで[笑顔:えがお]で[走:はし]り[切:き]った。",
        "textId": "Jarak kejam 42,195 km maraton penuh berhasil kutuntaskan larinya hingga garis akhir dengan senyuman.",
        "contextNote": "Menuntaskan lari jarak jauh maraton secara sempurna."
      },
      {
        "id": "ex-kiru-2",
        "textJp": "数え切れないほど多くの星々が、夜空一面にきらめいている。",
        "ruby": "[数:かぞ]え[切:き]れないほど[多:おお]くの[星々:ほしぼし]が、[夜空一面:よぞらいちめん]にきらめいている。",
        "textId": "Bintang-gemintang yang sebegitu banyaknya hingga tak sanggup terhitung lagi jumlahnya berkilauan di seantero langit malam.",
        "contextNote": "Kuantitas tak terhingga (数え切れない)."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜終わる (selesai)",
        "summary": "終わる = sekadar tanda waktu berakhirnya suatu aksi.",
        "distinctionId": "『〜切る』 menekankan kepuasan emosional karena telah menguras habis energi atau sumber daya sampai nol."
      }
    ],
    "questions": [
      {
        "id": "q-b21-07",
        "type": "cloze",
        "questionNumber": 92,
        "questionJp": "給料日直前なのに、今月の生活費をもう全部使い（　　）しまった。",
        "questionRuby": "[給料日直前:きゅうりょうびちょくぜん]なのに、[今月:こんげつ]の[生活費:せいかつひ]をもう[全部使:ぜんぶつか]い（　　）しまった。",
        "questionTranslation": "Padahal hari gajian baru di depan mata, namun uang belanja bulan ini sudah tandas terpakai habis seluruhnya.",
        "options": [
          {
            "key": "1",
            "textJp": "切って",
            "textId": "Tandas habis terkuras (使い切ってしまった)"
          },
          {
            "key": "2",
            "textJp": "かけて",
            "textId": "Baru terpakai setengah"
          },
          {
            "key": "3",
            "textJp": "反面で",
            "textId": "Di sisi lain"
          },
          {
            "key": "4",
            "textJp": "気味で",
            "textId": "Bergejala"
          }
        ],
        "correctKey": "1",
        "explanation": "Menghabiskan uang sampai saldo nol tandas adalah 『動詞マス形 ＋ 切る』 -> 『使い切ってしまった』."
      }
    ]
  },

  {
    "id": "n3-b21-nuku",
    "chapterNumber": 21,
    "chapterTitle": "第21課: 時点・推移・完了 (Titik Waktu & Ketuntasan)",
    "category": "degree",
    "categoryLabel": "達成・不屈",
    "patternJp": "〜抜く (ぬく)",
    "patternKana": "ぬく",
    "meaningId": "Berjuang gigih menembus penderitaan/kesulitan hingga ke garis akhir",
    "connection": "動詞マス形（マス省く） ＋ 抜く",
    "coreConcept": "Berbeda dengan 『切る』 yang menekankan ketuntasan kuantitas, 『〜抜く』 menekankan kegigihan mental, daya tahan, dan perjuangan pantang menyerah dalam mengatasi rintangan berat hingga tuntas.",
    "cautionNote": "Sering menempel pada kata kerja berbobot perjuangan: 耐え抜く (bertahan tabah), 考え抜く (berpikir mendalam), 守り抜く (menjaga teguh sampai akhir).",
    "examples": [
      {
        "id": "ex-nuku-1",
        "textJp": "どんな逆境に立たされても、自らの信念を最後まで守り抜く覚悟だ。",
        "ruby": "どんな[逆境:ぎゃっきょう]に[立:た]たされても、[自:みずか]らの[信念:しんねん]を[最後:さいご]まで[守:まも]り[抜:ぬ]く[覚悟:かくご]だ。",
        "textId": "Berada dalam situasi sulit seburuk apa pun, saya bertekad menjaga teguh keyakinan prinsip diri hingga akhir hayat.",
        "contextNote": "Kegigihan mempertahankan prinsip hidup di tengah badai."
      },
      {
        "id": "ex-nuku-2",
        "textJp": "何日も悩み抜いた末に、ついに会社を辞めて独立する決断を下した。",
        "ruby": "[何日:なんにち]も[悩:なや]み[抜:ぬ]いた[末:すえ]に、ついに[会社:かいしゃ]を[辞:や]めて[独立:どくりつ]する[決断:けつだん]を[下:くだ]した。",
        "textId": "Setelah berhari-hari memeras pikiran dan bergulat batin menembus kegalauan, akhirnya saya mengambil keputusan berani untuk keluar dari kantor dan merintis usaha mandiri.",
        "contextNote": "Perenungan mendalam yang menguras energi batin (悩み抜いた)."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜切る (habis tuntas)",
        "summary": "切る = kuantitas/aksi tuntas habis.",
        "distinctionId": "『〜抜く』 mengandung nilai kepahlawanan: ada penderitaan, rasa sakit, atau rintangan yang berhasil ditembus dengan gigih."
      }
    ],
    "questions": [
      {
        "id": "q-b21-08",
        "type": "cloze",
        "questionNumber": 93,
        "questionJp": "過酷な自然環境の中で、彼らは力を合わせて最後まで生き（　　）。",
        "questionRuby": "[過酷:かこく]な[自然環境:しぜんかんきょう]の[中:なか]で、[彼:かれ]らは[力:ちから]を[合:あ]わせて[最後:さいご]まで[生:い]き（　　）。",
        "questionTranslation": "Di tengah bentang alam lingkungan yang kejam ganas, mereka bersatu padu bertahan hidup gigih hingga titik akhir.",
        "options": [
          {
            "key": "1",
            "textJp": "抜いた",
            "textId": "Berjuang gigih menembus penderitaan (生き抜いた)"
          },
          {
            "key": "2",
            "textJp": "かけた",
            "textId": "Baru setengah jalan"
          },
          {
            "key": "3",
            "textJp": "気味だった",
            "textId": "Bergejala"
          },
          {
            "key": "4",
            "textJp": "反面だった",
            "textId": "Di sisi lain"
          }
        ],
        "correctKey": "1",
        "explanation": "Bertahan hidup gigih melewati rintangan ganasnya alam hingga selamat adalah 『動詞マス形 ＋ 抜く』 -> 『生き抜いた』."
      }
    ]
  },

  {
    "id": "n3-b21-te-hajimete",
    "chapterNumber": 21,
    "chapterTitle": "第21課: 時点・推移・完了 (Titik Waktu & Ketuntasan)",
    "category": "time",
    "categoryLabel": "契機・自覚",
    "patternJp": "〜てはじめて",
    "patternKana": "てはじめて",
    "meaningId": "Baru setelah mengalami A... barulah menyadari nilai pentingnya B",
    "connection": "動詞テ形 ＋ はじめて",
    "coreConcept": "Menyatakan bahwa sebelum peristiwa A terjadi, pembicara sama sekali tidak mengerti atau tidak mempedulikannya. Baru setelah benar-benar mengalami A secara langsung, terbitlah kesadaran baru yang membuka mata batinnya.",
    "cautionNote": "Peristiwa A adalah pengalaman nyata atau cobaan berat (jatuh sakit, hidup mandiri, kehilangan) yang menjadi katalis kesadaran baru.",
    "examples": [
      {
        "id": "ex-tehajimete-1",
        "textJp": "重い病気にかかってはじめて、普段の健康な体のありがたさを痛感した。",
        "ruby": "[重:おも]い[病気:びょうき]にかかってはじめて、[普段:ふだん]の[健康:けんこう]な[体:からだ]のありがたさを[痛感:つうかん]した。",
        "textId": "Baru setelah jatuh sakit parah, barulah aku benar-benar menyadari betapa berharganya nikmat tubuh yang sehat sehari-hari.",
        "contextNote": "Kesadaran kesehatan yang baru terbuka pasca jatuh sakit."
      },
      {
        "id": "ex-tehajimete-2",
        "textJp": "海外で一人暮らしを経験してはじめて、家族の温かい支えに感謝するようになった。",
        "ruby": "[海外:かいがい]で[一人暮:ひとりぐ]らしを[経験:けいけん]してはじめて、[家族:かぞく]の[温:あたた]かい[支:ささ]えに[感謝:かんしゃ]するようになった。",
        "textId": "Baru setelah merasakan sendiri hidup merantau sendirian di negeri orang, barulah aku menjadi bersyukur atas hangatnya dukungan keluarga.",
        "contextNote": "Kedewasaan emosional setelah merantau mandiri."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜たあとで (setelah)",
        "summary": "たあとで = urutan waktu kronologis biasa tanpa ada unsur 'kesadaran baru'.",
        "distinctionId": "『〜てはじめて』 sarat dengan momen 'pencerahan batin': baru tersadar setelah mengalaminya sendiri."
      }
    ],
    "questions": [
      {
        "id": "q-b21-03",
        "type": "cloze",
        "questionNumber": 94,
        "questionJp": "実際に現場に（　　）、問題の深刻さが浮き彫りになった。",
        "questionRuby": "[実際:じっさい]に[現場:げんば]に（　　）、[問題:もんだい]の[深刻:しんこく]さが[浮:う]き[彫:ぼ]りになった。",
        "questionTranslation": "Baru setelah benar-benar turun meninjau langsung ke lapangan, barulah gambaran betapa peliknya masalah tersebut menjadi tersingkap terang.",
        "options": [
          {
            "key": "1",
            "textJp": "足を運んではじめて",
            "textId": "Baru setelah melangkah ke lokasi (V-te + はじめて)"
          },
          {
            "key": "2",
            "textJp": "足を運ぶ反面",
            "textId": "Di sisi lain ke lokasi"
          },
          {
            "key": "3",
            "textJp": "足を運ぶわりに",
            "textId": "Untuk ukuran ke lokasi"
          },
          {
            "key": "4",
            "textJp": "足を運ぶせいで",
            "textId": "Gara-gara ke lokasi"
          }
        ],
        "correctKey": "1",
        "explanation": "Membuka mata atas kepelikan masalah baru setelah mendatangi lokasi secara nyata adalah 『動詞テ形 ＋ はじめて』."
      }
    ]
  },

  {
    "id": "n3-b21-te-irai",
    "chapterNumber": 21,
    "chapterTitle": "第21課: 時点・推移・完了 (Titik Waktu & Ketuntasan)",
    "category": "time",
    "categoryLabel": "起点・継続",
    "patternJp": "〜て以来",
    "patternKana": "ていらい",
    "meaningId": "Semenjak peristiwa itu terjadi... terus menerus berlangsung sampai saat ini",
    "connection": "動詞テ形 ＋ 以来\n名詞 ＋ 以来",
    "coreConcept": "Menandai suatu titik tolak peristiwa di masa lampau, di mana sejak detik itu terjadi hingga saat sekarang kalimat diucapkan, suatu kondisi atau kebiasaan terus bertahan secara konsisten tanpa henti.",
    "cautionNote": "Tidak boleh digunakan untuk peristiwa yang baru saja terjadi kemarin (harus peristiwa yang sudah berselang cukup lama). Bagian belakang harus keadaan kontinu.",
    "examples": [
      {
        "id": "ex-teirai-1",
        "textJp": "高校を卒業して以来、彼とは一度も顔を合わせていない。",
        "ruby": "[高校:こうこう]を[卒業:そつぎょう]して[以来:いらい]、[彼:かれ]とは[一度:いちど]も[顔:かお]を[合:あ]わせていない。",
        "textId": "Semenjak lulus dari bangku SMA, aku belum pernah bertatap muka sekali pun dengannya hingga detik ini.",
        "contextNote": "Ketiadaan perjumpaan kontinu sejak kelulusan SMA."
      },
      {
        "id": "ex-teirai-2",
        "textJp": "昨年の夏に日本を訪れて以来、日本文化の魅力にすっかり夢中になっている。",
        "ruby": "[昨年:さくねん]の[夏:なつ]に[日本:にほん]を[訪:おとず]れて[以来:いらい]、[日本文化:にほんぶんか]の[魅力:みりょく]にすっかり[夢中:むちゅう]になっている。",
        "textId": "Semenjak mengunjungi Jepang pada musim panas tahun lalu, saya benar-benar jatuh hati terpesona pada daya pikat kebudayaan Jepang.",
        "contextNote": "Kecintaan budaya yang terus berlanjut sejak kunjungan pertama."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜てから (setelah)",
        "summary": "てから = urutan waktu biasa (cth: habis makan tidur).",
        "distinctionId": "『〜て以来』 menuntut kondisi belakangnya terus bersambung tanpa putus sampai saat ini."
      }
    ],
    "questions": [
      {
        "id": "q-b21-04",
        "type": "cloze",
        "questionNumber": 95,
        "questionJp": "あの事故を（　　）、車の運転には人一倍慎重になっている。",
        "questionRuby": "あの[事故:じこ]を（　　）、[車:くるま]の[運転:うんてん]には[人一倍慎重:ひといちばいしんちょう]になっている。",
        "questionTranslation": "Semenjak mengalami kecelakaan waktu itu, saya menjadi berkali-kali lipat lebih berhati-hati saat menyetir mobil.",
        "options": [
          {
            "key": "1",
            "textJp": "経験して以来",
            "textId": "Semenjak mengalami (V-te + 以来)"
          },
          {
            "key": "2",
            "textJp": "経験する反面",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "経験する気味",
            "textId": "Bergejala"
          },
          {
            "key": "4",
            "textJp": "経験するうちに",
            "textId": "Mumpung"
          }
        ],
        "correctKey": "1",
        "explanation": "Titik tolak perubahan kebiasaan menyetir hati-hati yang terus terjaga sejak insiden tabrakan adalah 『動詞テ形 ＋ 以来』."
      }
    ]
  },

  {
    "id": "n3-b21-tokoro",
    "chapterNumber": 21,
    "chapterTitle": "第21課: 時点・推移・完了 (Titik Waktu & Ketuntasan)",
    "category": "time",
    "categoryLabel": "瞬間・局面",
    "patternJp": "〜ところ（へ・に・を）",
    "patternKana": "ところへ / ところに / ところを",
    "meaningId": "Tepat di detik momen... (disapa, tertangkap basah, atau disergap kejadian lain)",
    "connection": "動詞辞書形 / た形 / ている形 ＋ ところ（へ／に／を）",
    "coreConcept": "Menandai titik detik waktu yang sangat spesifik ketika suatu tindakan sedang atau baru saja terjadi, lalu tiba-tiba ada peristiwa lain yang menyela atau menyergap momen tersebut.",
    "cautionNote": "Perhatikan partikelnya: 『〜ところを』 biasanya dipakai saat ditangkap basah atau disapa (cth: 居眠りしているところを見つかった = ketahuan pas sedang tertidur).",
    "examples": [
      {
        "id": "ex-tokoro-1",
        "textJp": "授業中にこっそり早弁を食べているところを、運悪く先生に見つかってしまった。",
        "ruby": "[授業中:じゅぎょうちゅう]にこっそり[早弁:はやべん]を[食:た]べているところを、[運悪:うんわる]く[先生:せんせい]に[見:み]つかってしまった。",
        "textId": "Tepat di detik momen asyik menyantap bekal diam-diam saat jam pelajaran, sialnya saya tertangkap basah oleh guru.",
        "contextNote": "Tertangkap basah tepat di momen kejadian rahasia."
      },
      {
        "id": "ex-tokoro-2",
        "textJp": "お忙しいところをお時間を割いていただき、誠にありがとうございます。",
        "ruby": "お[忙:いそが]しいところをお[時間:じかん]を[割:さ]いていただき、[誠:まこと]にありがとうございます。",
        "textId": "Tepat di saat Bapak/Ibu sedang amat sibuk, terima kasih sebesar-besarnya atas kesediaannya meluangkan waktu berharga.",
        "contextNote": "Frasa etika bisnis memohon maaf atas waktu sibuk mitra."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜とき (saat)",
        "summary": "とき = penunjuk waktu umum.",
        "distinctionId": "『〜ところを』 mengabadikan momen 'pas di detik kejadian yang sedang berlangsung'."
      }
    ],
    "questions": [
      {
        "id": "q-b21-05",
        "type": "seiretsu",
        "questionNumber": 96,
        "questionJp": "出かけようとしていた　＿＿　＿＿　★　＿＿　足止めを食らった。",
        "questionRuby": "[出:で]かけようとしていた　＿＿　＿＿　★　＿＿　[足止:あしど]めを[食:く]らった。",
        "questionTranslation": "Tepat saat hendak melangkah bepergian keluar, seorang tamu mendadak berkunjung hingga langkahku tertahan.",
        "items": [
          "ところへ",
          "突然の",
          "来客があり",
          "急な"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "starPosition": 3,
        "explanation": "Susunan utuh: 『出かけようとしていた [ところへ] [突然の] [来客があり] [急な] 足止めを食らった』. Kata di posisi bintang (★) adalah 『来客があり』."
      }
    ]
  },

  {
    "id": "n3-b21-tsutsu",
    "chapterNumber": 21,
    "chapterTitle": "第21課: 時点・推移・完了 (Titik Waktu & Ketuntasan)",
    "category": "contrast",
    "categoryLabel": "逆接・同時",
    "patternJp": "〜つつ / 〜つつも",
    "patternKana": "つつ / つつも",
    "meaningId": "1) Sambil... (formal dari ながら) / 2) Meskipun menyadari... namun tetap berbuat sebaliknya",
    "connection": "動詞マス形（マス省く） ＋ つつ（も）",
    "coreConcept": "Memiliki 2 arti: 1) Melakukan dua aksi secara simultan dalam ragam tulisan (formal dari 『ながら』). 2) Pertentangan batin: meskipun dalam lubuk hatinya menyadari bahwa hal itu salah/buruk, namun tindakannya tetap bertolak belakang.",
    "cautionNote": "Arti ke-2 (pertentangan nurani) sangat sering diujikan di soal JLPT N3 dengan kata kerja kognisi: 知りつつ (meski tahu), 思いつつ (meski memikirkan).",
    "examples": [
      {
        "id": "ex-tsutsu-1",
        "textJp": "健康によくないと知りつつも、夜食のラーメンをやめられない。",
        "ruby": "[健康:けんこう]によくないと[知:し]りつつも、[夜食:やしょく]のラーメンをやめられない。",
        "textId": "Meskipun sadar betul tidak baik bagi kesehatan tubuh, saya tetap saja tak sanggup menghentikan godaan makan mi ramen larut malam.",
        "contextNote": "Arti 2: Kontradiksi nurani vs kebiasaan makan malam."
      },
      {
        "id": "ex-tsutsu-2",
        "textJp": "過去の苦い失敗を反省しつつ、前を向いて歩みを進めなければならない。",
        "ruby": "[過去:かこ]の[苦:にが]い[失敗:しっぱい]を[反省:はんせい]しつつ、[前:まえ]を[向:む]いて[歩:あゆ]みを[進:すす]めなければならない。",
        "textId": "Sambil merenungi dan memetik pelajaran dari pahitnya kegagalan masa lalu, kita harus terus melangkah maju menatap masa depan.",
        "contextNote": "Arti 1: Melakukan dua refleksi aksi secara bersamaan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ながら (sambil)",
        "summary": "ながら = ragam lisan umum.",
        "distinctionId": "『〜つつ（も）』 adalah ragam sastrawi/tertulis yang kuat menyuarakan pergulatan nurani batin manusia."
      }
    ],
    "questions": [
      {
        "id": "q-b21-02",
        "type": "cloze",
        "questionNumber": 97,
        "questionJp": "危険だと（　　）も、好奇心に負けて立ち入り禁止区域に入ってしまった。",
        "questionRuby": "[危険:きけん]だと（　　）も、[好奇心:こうきしん]に[負:ま]けて[立:た]ち[入:い]り[禁止区域:きんしくいき]に[入:はい]ってしまった。",
        "questionTranslation": "Meskipun tahu betul bahwa itu berbahaya, kalah oleh rasa penasaran saya malah masuk ke area terlarang.",
        "options": [
          {
            "key": "1",
            "textJp": "知りつつ",
            "textId": "Meskipun menyadari (知る -> 知りつつも)"
          },
          {
            "key": "2",
            "textJp": "知る反面",
            "textId": "Di sisi lain tahu"
          },
          {
            "key": "3",
            "textJp": "知るわりに",
            "textId": "Untuk ukuran tahu"
          },
          {
            "key": "4",
            "textJp": "知る気味",
            "textId": "Bergejala tahu"
          }
        ],
        "correctKey": "1",
        "explanation": "Pergulatan batin di mana subjek tahu bahaya namun tetap melanggar adalah 『動詞マス形 ＋ つつも』 -> 『知りつつも』."
      }
    ]
  },

  {
    "id": "n3-b21-tsutsu-aru",
    "chapterNumber": 21,
    "chapterTitle": "第21課: 時点・推移・完了 (Titik Waktu & Ketuntasan)",
    "category": "change",
    "categoryLabel": "推移・進行",
    "patternJp": "〜つつある",
    "patternKana": "つつある",
    "meaningId": "Sedang dalam proses bergerak menuju... (perubahan tren bertahap yang terus berlangsung)",
    "connection": "動詞マス形（マス省く） ＋ つつある",
    "coreConcept": "Merupakan ragam bahasa formal berita atau artikel untuk melukiskan suatu fenomena alam, sosial, atau ekonomi yang sedang mengalami pergeseran arah secara bertahap saat ini.",
    "cautionNote": "Hanya menempel pada kata kerja perubahan (変化動詞) seperti: 回復する, 増加する, 悪化する, 消え去る, 明ける.",
    "examples": [
      {
        "id": "ex-tsutsuaru-1",
        "textJp": "長引く不況を脱し、景気は緩やかに回復しつつあると発表された。",
        "ruby": "[長引:ながび]く[不況:ふきょう]を[脱:だっ]し、[景気:けいき]は[緩:ゆる]やかに[回復:かいふく]しつつあると[発表:はっぴょう]された。",
        "textId": "Lepas dari resesi ekonomi yang berkepanjangan, diumumkan bahwa kondisi perekonomian kini sedang dalam proses pulih secara perlahan.",
        "contextNote": "Tren makroekonomi yang sedang bergulir ke arah positif."
      },
      {
        "id": "ex-tsutsuaru-2",
        "textJp": "医療技術の進歩により、不治の病と恐れられた病気も克服されつつある。",
        "ruby": "[医療技術:いりょうぎじゅつ]の[進歩:しんぽ]により、[不治:ふじ]の[病:やまい]と[恐:おそ]れられた[病気:びょうき]も[克服:こくふく]されつつある。",
        "textId": "Berkat kemajuan teknologi medis, penyakit yang dahulu ditakuti sebagai momok tak tersembuhkan kini sedang dalam proses ditaklukkan.",
        "contextNote": "Proses perkembangan sejarah penaklukan penyakit."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ている (sedang)",
        "summary": "ている = ragam biasa untuk kondisi sedang berlangsung.",
        "distinctionId": "『〜つつある』 bernuansa lebih anggun dan formal, khusus menyoroti dinamika perubahan bertahap."
      }
    ],
    "questions": [
      {
        "id": "q-b21-01",
        "type": "cloze",
        "questionNumber": 98,
        "questionJp": "春の気配が近づき、厳しい冬の寒さも和らぎ（　　）。",
        "questionRuby": "[春:はる]の[気配:けはい]が[近:ちか]づき、[厳:きび]しい[冬:ふゆ]の[寒:さむ]さも[和:やわ]らぎ（　　）。",
        "questionTranslation": "Hawa musim semi semakin mendekat, dan dinginnya musim dingin yang menggigit pun sedang dalam proses mereda perlahan.",
        "options": [
          {
            "key": "1",
            "textJp": "つつある",
            "textId": "Sedang dalam proses perubahan (V-masu + つつある)"
          },
          {
            "key": "2",
            "textJp": "反面だ",
            "textId": "Di sisi lain"
          },
          {
            "key": "3",
            "textJp": "わりにだ",
            "textId": "Untuk ukuran"
          },
          {
            "key": "4",
            "textJp": "せいで",
            "textId": "Gara-gara"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan hawa dingin yang sedang dalam fase mereda secara bertahap adalah 『和らぎつつある』."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第22課: 使役受動・促し・伝達 (Perintah & Perasaan Terpaksa)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b22-o-ni-naru",
    "chapterNumber": 22,
    "chapterTitle": "第22課: 使役受動・促し・伝達 (Perintah & Perasaan Terpaksa)",
    "category": "judgment",
    "categoryLabel": "敬語・尊敬",
    "patternJp": "お〜になる / ご〜になる",
    "patternKana": "お〜になる / ご〜になる",
    "meaningId": "Melakukan (Bentuk hormat standar / Sonkeigo)",
    "connection": "お ＋ 動詞マス形語幹 ＋ になる (Kata kerja asli Jepang / 和語)\nご ＋ 漢語名詞 ＋ になる (Kata kerja Kanji Sino-Jepang / 漢語)",
    "coreConcept": "Bentuk penghormatan standar (尊敬語) untuk meninggikan derajat perbuatan pihak yang dihormati (atasan, guru, tamu, atau pelanggan).",
    "cautionNote": "HANYA boleh digunakan untuk perbuatan orang lain yang dihormati, JANGAN PERNAH dipakai untuk perbuatan diri sendiri.",
    "examples": [
      {
        "id": "ex-oninaru-1",
        "textJp": "社長はもう新幹線の切符をお取りになりましたか。",
        "ruby": "[社長:しゃ|ちょう]はもう[新幹線:しん|かん|せん]の[切符:きっぷ]をお[取:と]りになりましたか。",
        "textId": "Apakah Bapak Direktur sudah memesan tiket Shinkansen-nya?",
        "contextNote": "Bentuk hormat reguler dari 取る."
      },
      {
        "id": "ex-oninaru-2",
        "textJp": "こちらの新しいカタログをご利用になりましたか。",
        "ruby": "こちらの[新:あたら]しいカタログをご[利用:り|よう]になりましたか。",
        "textId": "Apakah Anda sudah menggunakan/melihat katalog baru kami ini?",
        "contextNote": "ご + 漢語 + になる."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "お〜する (Kenjougo)",
        "summary": "お〜する = merendahkan diri sendiri melayani orang lain.",
        "distinctionId": "お〜になる = meninggikan tindakan pihak lain yang dihormati."
      }
    ],
    "questions": [
      {
        "id": "q-b22-03",
        "type": "cloze",
        "questionNumber": 99,
        "questionJp": "先生は昨日のニュースをお（　　）になりましたか。",
        "questionRuby": "[先生:せん|せい]は[昨日:きのう]のニュースをお（　　）になりましたか。",
        "questionTranslation": "Apakah Bapak Guru sudah mendengarkan berita kemarin?",
        "options": [
          {
            "key": "1",
            "textJp": "聞く",
            "textId": "Bentuk kamus"
          },
          {
            "key": "2",
            "textJp": "聞き",
            "textId": "Stem ます"
          },
          {
            "key": "3",
            "textJp": "聞いて",
            "textId": "Bentuk te"
          },
          {
            "key": "4",
            "textJp": "聞かせ",
            "textId": "Bentuk kausatif"
          }
        ],
        "correctKey": "2",
        "explanation": "Rumus Sonkeigo reguler adalah お + V(stem ます) + になる → お聞きになりましたか."
      }
    ]
  },

  {
    "id": "n3-b22-o-suru",
    "chapterNumber": 22,
    "chapterTitle": "第22課: 使役受動・促し・伝達 (Perintah & Perasaan Terpaksa)",
    "category": "judgment",
    "categoryLabel": "敬語・謙譲",
    "patternJp": "お〜する / ご〜する (お〜いたす)",
    "patternKana": "お〜する / ご〜する",
    "meaningId": "Melakukan (Bentuk merendah diri / Kenjougo)",
    "connection": "お ＋ 動詞マス形語幹 ＋ する / いたす\nご ＋ 漢語名詞 ＋ する / いたす",
    "coreConcept": "Pola bahasa merendahkan diri (謙譲語) saat pembicara atau anggota kelompoknya melakukan suatu tindakan yang ditujukan untuk melayani pihak yang dihormati.",
    "cautionNote": "HANYA untuk tindakan diri sendiri / kelompok kita. Jangan pernah gunakan untuk tindakan lawan bicara.",
    "examples": [
      {
        "id": "ex-osuru-1",
        "textJp": "重そうな荷物ですね。私がお持ちしましょう。",
        "ruby": "[重:おも]そうな[荷物:に|もつ]ですね。[私:わたし]がお[持:も]ちしましょう。",
        "textId": "Koper Anda terlihat sangat berat ya. Biar saya bantu bawakan.",
        "contextNote": "Bantuan santun dengan お〜する."
      },
      {
        "id": "ex-osuru-2",
        "textJp": "明日の午後に改めてご連絡いたします。",
        "ruby": "[明日:あした]の[午後:ご|ご]に[改:あらた]めてご[連絡:れん|らく]いたします。",
        "textId": "Besok siang saya akan menghubungi Anda kembali secara resmi.",
        "contextNote": "ご〜いたす (ragam bisnis sangat formal)."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜てあげる (Memberi kebaikan)",
        "summary": "〜てあげる memberi kesan merendahkan martabat jika dipakai ke atasan/klien.",
        "distinctionId": "Gunakan selalu お〜する / お〜いたす saat melayani pihak luar/atasan."
      }
    ],
    "questions": [
      {
        "id": "q-b22-04",
        "type": "cloze",
        "questionNumber": 100,
        "questionJp": "駅まで車でお送り（　　）。どうぞお乗りください。",
        "questionRuby": "[駅:えき]まで[車:くるま]でお[送:おく]り（　　）。どうぞお[乗:の]りください。",
        "questionTranslation": "Biar saya antar sampai stasiun dengan mobil. Silakan masuk.",
        "options": [
          {
            "key": "1",
            "textJp": "になりましょう",
            "textId": "Sonkeigo (salah untuk diri sendiri)"
          },
          {
            "key": "2",
            "textJp": "しましょう",
            "textId": "Kenjougo (merendah melayani)"
          },
          {
            "key": "3",
            "textJp": "いただきましょう",
            "textId": "Meminta bantuan"
          },
          {
            "key": "4",
            "textJp": "なさい",
            "textId": "Perintah atasan"
          }
        ],
        "correctKey": "2",
        "explanation": "Karena pembicara sendiri yang mengantar lawan bicara, pola Kenjougo yang tepat adalah お送りしましょう."
      }
    ]
  },

  {
    "id": "n3-b22-saserareru",
    "chapterNumber": 22,
    "chapterTitle": "第22課: 使役受動・促し・伝達 (Perintah & Perasaan Terpaksa)",
    "category": "judgment",
    "categoryLabel": "使役受動・強制",
    "patternJp": "〜させられる / 〜される",
    "patternKana": "させられる / される",
    "meaningId": "Dipaksa / terpaksa melakukan (tanpa kehendak sendiri)",
    "connection": "動詞使役受動形 (V-saserareru / V-sareru)\n【Grup 1】: 行く → 行かされる, 飲む → 飲まされる (khusus berakhiran す: 話す → 話させられる)\n【Grup 2】: 食べる → 食べさせられる\n【Grup 3】: する → させられる、来る → こさせられる",
    "coreConcept": "Mengekspresikan perasaan terpaksa atau dipaksa melakukan suatu tindakan oleh pihak lain di luar kehendak diri sendiri. Selain paksaan fisik, juga kerap digunakan saat suatu hal secara spontan menggerakkan batin kita (misal: 考えさせられる = dibuat merenung mendalam).",
    "cautionNote": "Untuk kata kerja Grup 1, bentuk ringkas 〜される (行かされる, 待たされる) jauh lebih sering dipakai dalam ujian dan percakapan. Hati-hati: kata kerja berakhiran 〜す wajib memakai 〜させられる.",
    "examples": [
      {
        "id": "ex-saserareru-1",
        "textJp": "子供のころ、母に嫌いな野菜を食べさせられた。",
        "ruby": "[子供:こ|ども]のころ、[母:はは]に[嫌:きら]いな[野菜:や|さい]を[食:た]べさせられた。",
        "textId": "Waktu kecil, aku dipaksa oleh ibuku memakan sayuran yang tidak kusukai.",
        "contextNote": "Bentuk kausatif pasif Grup 2: 食べる → 食べさせられる."
      },
      {
        "id": "ex-saserareru-2",
        "textJp": "昨日は上司に深夜まで付き合わされて、今日はとても眠い。",
        "ruby": "[昨日:きのう]は[上司:じょう|し]に[深夜:しん|や]まで[付:つ]き[合:あ]わされて、[今日:きょう]はとても[眠:ねむ]い。",
        "textId": "Kemarin aku dipaksa menemani bos minum-minum hingga larut malam, hari ini rasanya sangat mengantuk.",
        "contextNote": "Bentuk ringkas Grup 1: 付き合う → 付き合わされる."
      },
      {
        "id": "ex-saserareru-3",
        "textJp": "この映画を見て、命の大切さについて深く考えさせられた。",
        "ruby": "この[映画:えい|が]を[見:み]て、[命:いのち]の[大切:たい|せつ]さについて[深:ふか]く[考:かんが]えさせられた。",
        "textId": "Setelah menonton film ini, saya terdorong/dibuat untuk merenungi arti penting sebuah kehidupan.",
        "contextNote": "Spontanitas batin: 考えさせられる (dibuat berpikir)."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜（さ）せる (Kausatif aktif)",
        "summary": "〜（さ）せる = menyuruh pihak lain melakukan.",
        "distinctionId": "〜（さ）せられる = subjek menjadi korban yang dipaksa/disuruh oleh orang lain."
      }
    ],
    "questions": [
      {
        "id": "q-b22-01",
        "type": "cloze",
        "questionNumber": 101,
        "questionJp": "カラオケで先輩に無理矢理歌を（　　）、とても恥ずかしかった。",
        "questionRuby": "カラオケで[先輩:せん|ぱい]に[無理矢理:む|り|やり][歌:うた]を（　　）、とても[恥:は]ずかしかった。",
        "questionTranslation": "Di tempat karaoke aku dipaksa bernyanyi oleh seniorku, rasanya sangat malu.",
        "options": [
          {
            "key": "1",
            "textJp": "歌わせた",
            "textId": "Menyuruh bernyanyi (Kausatif aktif)"
          },
          {
            "key": "2",
            "textJp": "歌わされた",
            "textId": "Dipaksa bernyanyi (Kausatif pasif)"
          },
          {
            "key": "3",
            "textJp": "歌われた",
            "textId": "Dinyanyikan (Pasif murni)"
          },
          {
            "key": "4",
            "textJp": "歌うようにした",
            "textId": "Berusaha bernyanyi"
          }
        ],
        "correctKey": "2",
        "explanation": "Karena subjek dipaksa oleh seniornya (先輩に) menyanyikan lagu, bentuk yang tepat adalah kausatif pasif Grup 1: 歌わされた."
      }
    ]
  },

  {
    "id": "n3-b22-tamae",
    "chapterNumber": 22,
    "chapterTitle": "第22課: 使役受動・促し・伝達 (Perintah & Perasaan Terpaksa)",
    "category": "judgment",
    "categoryLabel": "促し・指示",
    "patternJp": "〜たまえ",
    "patternKana": "たまえ",
    "meaningId": "Lakukanlah / Kerjakanlah (perintah halus berwibawa pria senior)",
    "connection": "動詞マス形語幹 ＋ たまえ",
    "coreConcept": "Bentuk perintah bernuansa kebapakan/senior yang biasanya diucapkan oleh pria berkedudukan lebih tinggi (dosen, manajer senior) kepada anak buah atau juniornya.",
    "cautionNote": "Khas bahasa pria atasan. Jangan pernah ditujukan kepada atasan atau orang yang setara dalam hubungan formal.",
    "examples": [
      {
        "id": "ex-tamae-1",
        "textJp": "まだ時間はあるから、もっとゆっくり考えたまえ。",
        "ruby": "まだ[時間:じ|かん]はあるから、もっとゆっくり[考:かんが]えたまえ。",
        "textId": "Waktunya masih ada kok, pikirkanlah baik-baik dengan lebih tenang.",
        "contextNote": "Instruksi menenangkan dari mentor senior."
      },
      {
        "id": "ex-tamae-2",
        "textJp": "準備ができたら、すぐに私の部屋に来たまえ。",
        "ruby": "[準備:じゅん|び]ができたら、すぐに[私:わたし]の[部屋:へ|や]に[来:き]たまえ。",
        "textId": "Jika persiapannya sudah selesai, segeralah datang ke ruanganku.",
        "contextNote": "Perintah halus atasan: 来る → 来たまえ."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜なさい (Perintah)",
        "summary": "〜なさい sering dipakai guru sekolah atau ibu rumah tangga.",
        "distinctionId": "〜たまえ khas dipakai figur atasan laki-laki di kantor atau akademisi."
      }
    ],
    "questions": [
      {
        "id": "q-b22-06",
        "type": "cloze",
        "questionNumber": 102,
        "questionJp": "君、遠慮しないで何でも質問し（　　）。",
        "questionRuby": "[君:きみ]、[遠慮:えん|りょ]しないで[何:なん]でも[質問:しつ|もん]し（　　）。",
        "questionTranslation": "Kamu, jangan sungkan dan tanyakanlah apa saja.",
        "options": [
          {
            "key": "1",
            "textJp": "たまえ",
            "textId": "Perintah halus pria atasan"
          },
          {
            "key": "2",
            "textJp": "たまらない",
            "textId": "Sangat emosional tak tertahankan"
          },
          {
            "key": "3",
            "textJp": "かねない",
            "textId": "Bisa berakibat buruk"
          },
          {
            "key": "4",
            "textJp": "っこない",
            "textId": "Pasti mustahil"
          }
        ],
        "correctKey": "1",
        "explanation": "Pola instruksi bersahabat dari atasan: 質問し ＋ たまえ → 質問したまえ."
      }
    ]
  },

  {
    "id": "n3-b22-te-goran",
    "chapterNumber": 22,
    "chapterTitle": "第22課: 使役受動・促し・伝達 (Perintah & Perasaan Terpaksa)",
    "category": "judgment",
    "categoryLabel": "促し・助言",
    "patternJp": "〜てごらん / 〜てごらんなさい",
    "patternKana": "てごらん / てごらんなさい",
    "meaningId": "Cobalah lakukan... (dorongan santai dari senior/orang tua)",
    "connection": "動詞テ形 ＋ ごらん / ごらんなさい",
    "coreConcept": "Digunakan oleh orang tua kepada anak, guru kepada murid kecil, atau senior kepada bawahan akrab untuk menyuruh atau mendorong mereka mencoba melakukan sesuatu (sinonim santai dari 〜てみなさい).",
    "cautionNote": "Tidak boleh digunakan kepada orang yang kedudukannya lebih tinggi atau orang asing yang harus dihormati.",
    "examples": [
      {
        "id": "ex-tegoran-1",
        "textJp": "とても美味しいケーキだから、一口食べてごらん。",
        "ruby": "とても[美味:おい]しいケーキだから、[一口:ひと|くち][食:た]べてごらん。",
        "textId": "Kue ini enak sekali lho, coba cicipi sesuap.",
        "contextNote": "Ajakan mencicipi secara ramah."
      },
      {
        "id": "ex-tegoran-2",
        "textJp": "分からない言葉があったら、自分で辞書を引いてごらんなさい。",
        "ruby": "[分:わ]からない[言葉:こと|ば]があったら、[自分:じ|ぶん]で[辞書:じ|しょ]を[引:ひ]いてごらんなさい。",
        "textId": "Kalau ada kata yang belum kamu pahami, coba buka kamus sendiri dulu sana.",
        "contextNote": "Arahan mendidik dari orang tua ke anak."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜てみてください (Coba lakukan)",
        "summary": "〜てみてください = ragam sopan netral untuk siapa saja.",
        "distinctionId": "〜てごらん = instruksi/dorongan dari posisi superior kepada anak/bawahan."
      }
    ],
    "questions": [
      {
        "id": "q-b22-05",
        "type": "cloze",
        "questionNumber": 103,
        "questionJp": "怖がらないで、自分の力でやって（　　）。",
        "questionRuby": "[怖:こわ]がらないで、[自分:じ|ぶん]の[力:ちから]でやって（　　）。",
        "questionTranslation": "Jangan takut, cobalah lakukan sendiri dengan kekuatanmu.",
        "options": [
          {
            "key": "1",
            "textJp": "ごらん",
            "textId": "Dorongan mencoba (〜てごらん)"
          },
          {
            "key": "2",
            "textJp": "くださる",
            "textId": "Bentuk hormat pihak lain"
          },
          {
            "key": "3",
            "textJp": "もらう",
            "textId": "Menerima jasa"
          },
          {
            "key": "4",
            "textJp": "いらっしゃる",
            "textId": "Bentuk hormat pergi/ada"
          }
        ],
        "correctKey": "1",
        "explanation": "Pola dorongan mencoba untuk bawahan/anak kecil adalah やってごらん."
      }
    ]
  },

  {
    "id": "n3-b22-te-hoshii",
    "chapterNumber": 22,
    "chapterTitle": "第22課: 使役受動・促し・伝達 (Perintah & Perasaan Terpaksa)",
    "category": "judgment",
    "categoryLabel": "希望・要求",
    "patternJp": "〜てほしい / 〜てもらいたい",
    "patternKana": "てほしい / てもらいたい",
    "meaningId": "Ingin agar orang lain melakukan sesuatu",
    "connection": "動詞テ形 ＋ ほしい / もらいたい\n動詞ナイ形 ＋ で ＋ ほしい / もらいたい",
    "coreConcept": "Digunakan ketika pembicara mengharapkan orang lain (lawan bicara atau pihak ketiga) yang melakukan suatu perbuatan demi kebaikan pembicara atau situasi bersama.",
    "cautionNote": "Pola 〜たい untuk keinginan tindakan diri sendiri, sedangkan 〜てほしい mengharapkan orang LAIN yang bertindak. Pelaku tindakan ditandai dengan partikel に.",
    "examples": [
      {
        "id": "ex-tehoshii-1",
        "textJp": "先生、このレポートの日本語をチェックしてほしいのですが。",
        "ruby": "[先生:せん|せい]、このレポートの[日本語:に|ほん|ご]をチェックしてほしいのですが。",
        "textId": "Pak Guru, saya ingin Bapak berkenan memeriksa bahasa Jepang di laporan saya ini.",
        "contextNote": "Permohonan sopan kepada guru."
      },
      {
        "id": "ex-tehoshii-2",
        "textJp": "大切な話し合いだから、絶対に遅刻しないでほしい。",
        "ruby": "[大切:たい|せつ]な[話:はな]し[合:あ]いだから、[絶対:ぜっ|たい]に[遅刻:ち|こく]しないでほしい。",
        "textId": "Karena ini diskusi penting, aku ingin kalian sama sekali tidak terlambat.",
        "contextNote": "Harapan agar orang lain TIDAK melakukan sesuatu (V-naide hoshii)."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜たい (Ingin)",
        "summary": "〜たい = keinginan diri sendiri untuk bertindak.",
        "distinctionId": "〜てほしい = keinginan agar pihak lain yang melakukan tindakan tersebut."
      }
    ],
    "questions": [
      {
        "id": "q-b22-02",
        "type": "cloze",
        "questionNumber": 104,
        "questionJp": "もっとたくさんの若者にこの活動に（　　）。",
        "questionRuby": "もっとたくさんの[若者:わか|もの]にこの[活動:かつ|どう]に（　　）。",
        "questionTranslation": "Saya ingin lebih banyak anak muda berpartisipasi dalam kegiatan ini.",
        "options": [
          {
            "key": "1",
            "textJp": "参加したい",
            "textId": "Saya sendiri ingin berpartisipasi"
          },
          {
            "key": "2",
            "textJp": "参加してほしい",
            "textId": "Ingin agar mereka berpartisipasi"
          },
          {
            "key": "3",
            "textJp": "参加させる",
            "textId": "Membuat berpartisipasi"
          },
          {
            "key": "4",
            "textJp": "参加したがる",
            "textId": "Tampak ingin berpartisipasi"
          }
        ],
        "correctKey": "2",
        "explanation": "Karena mengharapkan pihak lain (若者に) yang berpartisipasi, pola yang tepat adalah 〜てほしい."
      }
    ]
  },

  {
    "id": "n3-b22-te-kure-to",
    "chapterNumber": 22,
    "chapterTitle": "第22課: 使役受動・促し・伝達 (Perintah & Perasaan Terpaksa)",
    "category": "judgment",
    "categoryLabel": "伝達・引用",
    "patternJp": "〜てくれと頼まれる / 言われる",
    "patternKana": "てくれとたのまれる / いわれる",
    "meaningId": "Diminta / disuruh (secara tidak langsung) untuk...",
    "connection": "動詞テ形 ＋ くれと ＋ 頼まれる / 言われる\n動詞ナイ形 ＋ でくれと ＋ 頼まれる / 言われる",
    "coreConcept": "Bentuk kutipan tidak langsung untuk meneruskan permintaan orang lain. Orang tersebut berkata '...te kure!' (Tolong lakukan!), dan pembicara menyampaikannya kepada pihak lain bahwa ia diminta melakukan hal tersebut.",
    "cautionNote": "Bagian di depan と bernuansa kasual (〜てくれ), tetapi kalimat utuh dapat diakhiri dengan bentuk sopan 頼まれました.",
    "examples": [
      {
        "id": "ex-tekureto-1",
        "textJp": "友達に引っ越しを手伝ってくれと頼まれた。",
        "ruby": "[友達:とも|だち]に[引越:ひっ|こ]しを[手伝:て|つだ]ってくれと[頼:たの]まれた。",
        "textId": "Saya diminta oleh teman untuk membantu pindahan rumahnya.",
        "contextNote": "Meneruskan permintaan teman: 手伝ってくれ."
      },
      {
        "id": "ex-tekureto-2",
        "textJp": "先生に教室では日本語だけで話してくれと言われました。",
        "ruby": "[先生:せん|せい]に[教室:きょう|しつ]では[日本語:に|ほん|ご]だけで[話:はな]してくれと[言:い]われました。",
        "textId": "Kami diberitahu oleh guru agar berbicara hanya dalam bahasa Jepang di kelas.",
        "contextNote": "Instruksi tidak langsung dari pengajar."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ように頼まれる (Disuruh agar)",
        "summary": "〜ように頼まれる = ragam kutipan objektif umum.",
        "distinctionId": "〜てくれと頼まれる = lebih menangkap bunyi ucapan asli orang yang meminta secara langsung."
      }
    ],
    "questions": [
      {
        "id": "q-b22-07",
        "type": "cloze",
        "questionNumber": 105,
        "questionJp": "妻に仕事の帰りに牛乳を買って（　　）と頼まれた。",
        "questionRuby": "[妻:つま]に[仕事:し|ごと]の[帰:かえ]りに[牛乳:ぎゅう|にゅう]を[買:か]って（　　）と[頼:たの]まれた。",
        "questionTranslation": "Aku diminta oleh istriku untuk membelikan susu sepulang kerja.",
        "options": [
          {
            "key": "1",
            "textJp": "くれ",
            "textId": "Permintaan santai (〜てくれと頼まれる)"
          },
          {
            "key": "2",
            "textJp": "あげ",
            "textId": "Memberi"
          },
          {
            "key": "3",
            "textJp": "もらい",
            "textId": "Menerima"
          },
          {
            "key": "4",
            "textJp": "ほしい",
            "textId": "Keinginan"
          }
        ],
        "correctKey": "1",
        "explanation": "Pola meneruskan permintaan: 買って ＋ くれと頼まれた."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第23課: 論理・推量・主張 (Kepastian Logis & Sikap Batin)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b23-hazu-da",
    "chapterNumber": 23,
    "chapterTitle": "第23課: 論理・推量・主張 (Kepastian Logis & Sikap Batin)",
    "category": "judgment",
    "categoryLabel": "推量・確信",
    "patternJp": "〜はずだ",
    "patternKana": "はずだ",
    "meaningId": "Seharusnya / mestinya pasti (berdasarkan logika / jadwal)",
    "connection": "動詞・イ形容詞普通形 ＋ はずだ\nナ形容詞 ＋ な ＋ はずだ\n名詞 ＋ の ＋ はずだ",
    "coreConcept": "Menyatakan keyakinan kuat bahwa sesuatu semestinya terjadi demikian berdasarkan jadwal, data, alasan logis, atau bukti yang objektif.",
    "cautionNote": "Untuk kata benda (名詞) wajib memakai の (休みの[はず:は|ず]だ), dan untuk な形容詞 gunakan な (元気なはずだ).",
    "examples": [
      {
        "id": "ex-hazuda-1",
        "textJp": "彼は10年も日本に住んでいたのだから、日本語が上手なはずだ。",
        "ruby": "[彼:かれ]は10[年:ねん]も[日本:に|ほん]に[住:す]んでいたのだから、[日本語:に|ほん|ご]が[上手:じょう|ず]なはずだ。",
        "textId": "Karena dia tinggal di Jepang selama 10 tahun, mestinya bahasa Jepangnya mahir.",
        "contextNote": "Kesimpulan logis dari pengalaman 10 tahun."
      },
      {
        "id": "ex-hazuda-2",
        "textJp": "電車はあと5分で到着するはずです。",
        "ruby": "[電車:でん|しゃ]はあと5[分:ふん]で[到着:とう|ちゃく]するはずです。",
        "textId": "Kereta seharusnya tiba dalam 5 menit lagi.",
        "contextNote": "Berdasarkan jadwal keberangkatan resmi."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜に違いない (Pasti)",
        "summary": "に違いない = keyakinan intuisi subjektif pembicara tanpa harus berlandaskan jadwal.",
        "distinctionId": "はずだ = kepastian berdasarkan penalaran logis objektif atau jadwal teratur."
      }
    ],
    "questions": [
      {
        "id": "q-b23-01",
        "type": "cloze",
        "questionNumber": 106,
        "questionJp": "会議は午後2時から始まる（　　）ですが、まだ誰も来ていません。",
        "questionRuby": "[会議:かい|ぎ]は[午後:ご|ご]2[時:じ]から[始:はじ]まる（　　）ですが、まだ[誰:だれ]も[来:き]ていません。",
        "questionTranslation": "Rapatnya seharusnya mulai jam 2 siang, tapi belum ada seorang pun yang datang.",
        "options": [
          {
            "key": "1",
            "textJp": "はず",
            "textId": "Seharusnya berdasarkan jadwal (はずだ)"
          },
          {
            "key": "2",
            "textJp": "わけ",
            "textId": "Wajar/alasan logis (わけだ)"
          },
          {
            "key": "3",
            "textJp": "こと",
            "textId": "Hal/fakta"
          },
          {
            "key": "4",
            "textJp": "もの",
            "textId": "Benda/karena"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan harapan yang seharusnya terjadi berdasarkan jadwal yang telah ditetapkan: はずです."
      }
    ]
  },

  {
    "id": "n3-b23-hazu-ga-nai",
    "chapterNumber": 23,
    "chapterTitle": "第23課: 論理・推量・主張 (Kepastian Logis & Sikap Batin)",
    "category": "judgment",
    "categoryLabel": "推量・確信",
    "patternJp": "〜はずがない",
    "patternKana": "はずがない",
    "meaningId": "Pasti tidak mungkin / mustahil",
    "connection": "動詞・イ形容詞普通形 ＋ はずがない\nナ形容詞 ＋ な ＋ はずがない\n名詞 ＋ の ＋ はずがない",
    "coreConcept": "Menyatakan penolakan tegas pembicara bahwa sesuatu hal mustahil terjadi, didasari oleh logika, akal sehat, atau kepribadian orang tersebut (sinonim kuat: 〜わけがない).",
    "cautionNote": "Jangan tertukar dengan 〜ないはずだ (seharusnya tidak terjadi), sedangkan 〜はずがない berarti 'sama sekali mustahil/tidak masuk akal jika terjadi'.",
    "examples": [
      {
        "id": "ex-hazuganai-1",
        "textJp": "あんなに真面目な彼が、嘘をつくはずがない。",
        "ruby": "あんなに[真面目:ま|じめ]な[彼:かれ]が、[嘘:うそ]をつくはずがない。",
        "textId": "Orang serajin dan sejujur dia tidak mungkin berbohong.",
        "contextNote": "Mustahil secara sifat kepribadiannya."
      },
      {
        "id": "ex-hazuganai-2",
        "textJp": "まだ練習を始めたばかりなのだから、すぐにできるはずがない。",
        "ruby": "まだ[練習:れん|しゅう]を[始:はじ]めたばかりなのだから、すぐにできるはずがない。",
        "textId": "Karena baru saja mulai latihan, mana mungkin bisa langsung mahir.",
        "contextNote": "Logika proses belajar yang membutuhkan waktu."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜っこない (Pasti mustahil lisan)",
        "summary": "っこない = ragam lisan santai bernada emosional subjektif pembicara.",
        "distinctionId": "はずがない = kemustahilan berdasarkan alasan rasional dan bukti yang masuk akal."
      }
    ],
    "questions": [
      {
        "id": "q-b23-02",
        "type": "cloze",
        "questionNumber": 107,
        "questionJp": "こんなに難しい試験で満点を取れる（　　）。",
        "questionRuby": "こんなに[難:むずか]しい[試験:し|けん]で[満点:まん|てん]を[取:と]れる（　　）。",
        "questionTranslation": "Pada ujian sesulit ini, mana mungkin bisa mendapatkan nilai sempurna.",
        "options": [
          {
            "key": "1",
            "textJp": "はずがない",
            "textId": "Pasti tidak mungkin (〜はずがない)"
          },
          {
            "key": "2",
            "textJp": "べきではない",
            "textId": "Seharusnya tidak boleh"
          },
          {
            "key": "3",
            "textJp": "にほかならない",
            "textId": "Tidak lain dan tidak bukan"
          },
          {
            "key": "4",
            "textJp": "にすぎない",
            "textId": "Hanya sebatas"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan kemustahilan logis meraih skor sempurna: はずがない."
      }
    ]
  },

  {
    "id": "n3-b23-kke",
    "chapterNumber": 23,
    "chapterTitle": "第23課: 論理・推量・主張 (Kepastian Logis & Sikap Batin)",
    "category": "judgment",
    "categoryLabel": "確認・想起",
    "patternJp": "〜っけ",
    "patternKana": "っけ",
    "meaningId": "...kan ya? (mengingat-ingat kembali fakta masa lalu)",
    "connection": "動詞・イ形容詞タ形 ＋ っけ\n名詞・ナ形容詞 ＋ だ / だった ＋ っけ\n丁寧体: 〜ましたっけ / 〜でしたっけ",
    "coreConcept": "Partikel akhir percakapan santai yang digunakan saat pembicara berusaha memanggil kembali informasi masa lalu yang samar-samar atau agak terlupa untuk dikonfirmasi ke diri sendiri atau lawan bicara.",
    "cautionNote": "Hampir selalu menempel pada bentuk lampau (~ta / ~datta). Jangan gunakan bentuk kamus sekarang.",
    "examples": [
      {
        "id": "ex-kke-1",
        "textJp": "明日の会議の集合時間、何時だったっけ？",
        "ruby": "[明日:あした]の[会議:かい|ぎ]の[集合:しゅう|ごう][時間:じ|かん]、[何時:なん|じ]だったっけ？",
        "textId": "Waktu kumpul rapat besok itu tadi jam berapa kan ya?",
        "contextNote": "Konfirmasi jadwal yang agak terlupa."
      },
      {
        "id": "ex-kke-2",
        "textJp": "田中さんの誕生日は来週でしたっけ？",
        "ruby": "[田中:た|なか]さんの[誕生日:たん|じょう|び]は[来週:らい|しゅう]でしたっけ？",
        "textId": "Ulang tahun Tanaka-san minggu depan kan ya?",
        "contextNote": "Bentuk sopan konfirmasi: でしたっけ."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜よね (Kan ya)",
        "summary": "よね = meminta persetujuan atas fakta yang sedang disadari saat ini.",
        "distinctionId": "っけ = khusus untuk mengingat informasi masa lalu yang sedang terlupa."
      }
    ],
    "questions": [
      {
        "id": "q-b23-05",
        "type": "cloze",
        "questionNumber": 108,
        "questionJp": "あれ、駅前のあの本屋、いつ（　　）っけ？ もう閉まっているね。",
        "questionRuby": "あれ、[駅前:えき|まえ]のあの[本屋:ほん|や]、いつ（　　）っけ？ もう[閉:し]まっているね。",
        "questionTranslation": "Eh, toko buku di depan stasiun itu kapan tutupnya ya? Sekarang sudah tutup ya.",
        "options": [
          {
            "key": "1",
            "textJp": "閉まる",
            "textId": "Bentuk kamus"
          },
          {
            "key": "2",
            "textJp": "閉まった",
            "textId": "Bentuk lampau (〜た＋っけ)"
          },
          {
            "key": "3",
            "textJp": "閉まり",
            "textId": "Stem mas"
          },
          {
            "key": "4",
            "textJp": "閉める",
            "textId": "Bentuk transitif"
          }
        ],
        "correctKey": "2",
        "explanation": "Pola mengingat kembali fakta yang telah terjadi menempel pada bentuk lampau: 閉まったっけ."
      }
    ]
  },

  {
    "id": "n3-b23-mai",
    "chapterNumber": 23,
    "chapterTitle": "第23課: 論理・推量・主張 (Kepastian Logis & Sikap Batin)",
    "category": "judgment",
    "categoryLabel": "否定意志・推量",
    "patternJp": "〜まい / 〜まいか",
    "patternKana": "まい / まいか",
    "meaningId": "1. Tidak akan berniat lagi; 2. Bukankah...?",
    "connection": "【否定意志 (Niat negatif)】: 動詞辞書形 (Grup 1) ＋ まい / 動詞ナイ形語幹 (Grup 2/3) ＋ まい\n※する → すまい / するまい、来る → こまい / くるまい\n【否定推量 (Dugaan retoris)】: 〜ではあるまいか",
    "coreConcept": "(1) Tekad batin yang keras untuk TIDAK akan melakukan hal itu lagi (sinonim: もう絶対に〜しない); (2) Dugaan retoris formal bahwa kemungkinan hal tersebut terjadi (〜ではあるまいか = bukankah begitu?).",
    "cautionNote": "Bernuansa tulisan formal, sastra, atau tekad monolog batin yang kuat.",
    "examples": [
      {
        "id": "ex-mai-1",
        "textJp": "あんなまずい店には、二度と行くまい。",
        "ruby": "あんなまずい[店:みせ]には、[二度:に|ど]と[行:い]くまい。",
        "textId": "Ke restoran seburuk itu, aku bersumpah tidak akan pernah datang lagi.",
        "contextNote": "Tekad batin negatif mutlak."
      },
      {
        "id": "ex-mai-2",
        "textJp": "このままでは地球温暖化がさらに進むのではあるまいか。",
        "ruby": "このままでは[地球:ち|きゅう][温暖化:おん|だん|か]がさらに[進:すす]むのではあるまいか。",
        "textId": "Jika dibiarkan seperti ini, bukankah pemanasan global akan semakin bertambah parah?",
        "contextNote": "Dugaan retoris formal: ではあるまいか."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜ないつもりだ (Tidak berencana)",
        "summary": "ないつもりだ = rencana biasa dalam kehidupan sehari-hari.",
        "distinctionId": "まい = sumpah/tekad batin yang sangat keras dan bersungguh-sungguh."
      }
    ],
    "questions": [
      {
        "id": "q-b23-06",
        "type": "cloze",
        "questionNumber": 109,
        "questionJp": "こんなにひどい目に遭ったのだから、もう彼を信用する（　　）。",
        "questionRuby": "こんなにひどい[目:め]に[遭:あ]ったのだから、もう[彼:かれ]を[信用:しん|よう]する（　　）。",
        "questionTranslation": "Setelah mengalami kejadian seburuk ini, aku bersumpah tidak akan mempercayainya lagi.",
        "options": [
          {
            "key": "1",
            "textJp": "まい",
            "textId": "Tekad tidak berniat lagi (〜まい)"
          },
          {
            "key": "2",
            "textJp": "ものか",
            "textId": "Mana mungkin mau (lisan)"
          },
          {
            "key": "3",
            "textJp": "べきだ",
            "textId": "Seharusnya"
          },
          {
            "key": "4",
            "textJp": "はずだ",
            "textId": "Semestinya"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan sumpah batin tidak akan mempercayai lagi: 信用するまい."
      }
    ]
  },

  {
    "id": "n3-b23-ni-hoka-naranai",
    "chapterNumber": 23,
    "chapterTitle": "第23課: 論理・推量・主張 (Kepastian Logis & Sikap Batin)",
    "category": "judgment",
    "categoryLabel": "主張・断定",
    "patternJp": "〜にほかならない",
    "patternKana": "にほかならない",
    "meaningId": "Tidak lain dan tidak bukan adalah...",
    "connection": "名詞 ＋ にほかならない\n動詞普通形 ＋ から ＋ にほかならない",
    "coreConcept": "Pola penegasan tegas (断定) dalam ragam tulisan atau pidato formal untuk menekankan bahwa satu-satunya penyebab, alasan utama, atau esensi dari suatu peristiwa adalah hal tersebut, bukan faktor lainnya.",
    "cautionNote": "Sangat formal. Sering berpasangan dengan 〜のは: 『〜のは、…からにほかならない』.",
    "examples": [
      {
        "id": "ex-hokanaranai-1",
        "textJp": "今回のプロジェクトの成功は、チーム全員の努力の結果にほかならない。",
        "ruby": "[今回:こん|かい]のプロジェクトの[成功:せい|こう]は、チーム[全員:ぜん|いん]の[努力:ど|りょく]の[結果:けっ|か]にほかならない。",
        "textId": "Keberhasilan proyek kali ini tidak lain dan tidak bukan adalah hasil kerja keras seluruh anggota tim.",
        "contextNote": "Penegasan penyebab tunggal kesuksesan."
      },
      {
        "id": "ex-hokanaranai-2",
        "textJp": "彼が厳しく注意したのは、君に成長してほしいからにほかならない。",
        "ruby": "[彼:かれ]が[厳:きび]しく[注意:ちゅう|い]したのは、[君:きみ]に[成長:せい|ちょう]してほしいからにほかならない。",
        "textId": "Alasan dia menegurmu dengan tegas tiada lain karena dia ingin kamu berkembang.",
        "contextNote": "Penegasan niat baik sejati di balik tindakan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜にすぎない (Hanya sebatas)",
        "summary": "にすぎない = merendahkan signifikansi ('hanya sebatas itu').",
        "distinctionId": "にほかならない = mengangkat penegasan mutlak ('pasti itulah esensinya!')."
      }
    ],
    "questions": [
      {
        "id": "q-b23-03",
        "type": "cloze",
        "questionNumber": 110,
        "questionJp": "彼が合格できたのは、毎日夜遅くまで勉強した努力の成果（　　）。",
        "questionRuby": "[彼:かれ]が[合格:ごう|かく]できたのは、[毎日:まい|にち][夜:よる][遅:おそ]くまで[勉強:べん|きょう]した[努力:ど|りょく]の[成果:せい|か]（　　）。",
        "questionTranslation": "Lulusnya dia tidak lain dan tidak bukan adalah buah dari kerja keras belajar hingga larut malam setiap hari.",
        "options": [
          {
            "key": "1",
            "textJp": "にすぎない",
            "textId": "Hanya sekadar"
          },
          {
            "key": "2",
            "textJp": "にほかならない",
            "textId": "Tiada lain adalah (にほかならない)"
          },
          {
            "key": "3",
            "textJp": "にちがいない",
            "textId": "Pasti begitu"
          },
          {
            "key": "4",
            "textJp": "に沿って",
            "textId": "Sesuai dengan"
          }
        ],
        "correctKey": "2",
        "explanation": "Pola penegasan bahwa hasil kelulusan tiada lain adalah buah usahanya: にほかならない."
      }
    ]
  },

  {
    "id": "n3-b23-ni-soui-nai",
    "chapterNumber": 23,
    "chapterTitle": "第23課: 論理・推量・主張 (Kepastian Logis & Sikap Batin)",
    "category": "judgment",
    "categoryLabel": "推量・確信",
    "patternJp": "〜に相違ない",
    "patternKana": "にそういない",
    "meaningId": "Pasti tidak salah lagi (formal dari 〜に違いない)",
    "connection": "動詞・イ形容詞普通形 ＋ に相違ない\nナ形容詞語幹 / 名詞 ＋ に相違ない (tanpa だ)",
    "coreConcept": "Secara harfiah bermakna 'tidak ada perbedaan/kesalahan (相違がない)'. Menyatakan kepastian mutlak tanpa keraguan sedikit pun dari sudut pandang pembicara.",
    "cautionNote": "Ragam bahasa tertulis kaku dan formal tinggi (sering muncul di laporan resmi, investigasi, atau wacana hukum).",
    "examples": [
      {
        "id": "ex-souinai-1",
        "textJp": "現場に残された指紋から判断して、犯人は彼に相違ない。",
        "ruby": "[現場:げん|ば]に[残:のこ]された[指紋:し|もん]から[判断:はん|だん]して、[犯人:はん|にん]は[彼:かれ]に[相違:そう|い]ない。",
        "textId": "Menilai dari sidik jari yang tertinggal di TKP, pelakunya pasti tidak salah lagi adalah dia.",
        "contextNote": "Kepastian mutlak dalam penyelidikan resmi."
      },
      {
        "id": "ex-souinai-2",
        "textJp": "この新技術が将来の産業に大きな変革をもたらすことに相違ない。",
        "ruby": "この[新技術:しん|ぎ|じゅつ]が[将来:しょう|らい]の[産業:さん|ぎょう]に[大:おお]きな[変革:へん|かく]をもたらすことに[相違:そう|い]ない。",
        "textId": "Teknologi baru ini pasti tidak salah lagi akan membawa transformasi besar bagi industri masa depan.",
        "contextNote": "Pernyataan tertulis resmi berbobot tinggi."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜に違いない (Pasti)",
        "summary": "に違いない = sangat umum digunakan dalam percakapan lisan maupun tulisan.",
        "distinctionId": "に相違ない = ragam tertulis formal dan formalitasnya lebih tinggi."
      }
    ],
    "questions": [
      {
        "id": "q-b23-07",
        "type": "cloze",
        "questionNumber": 111,
        "questionJp": "彼の実力からすれば、今度の試験にも上位で合格する（　　）。",
        "questionRuby": "[彼:かれ]の[実力:じつ|りょく]からすれば、[今度:こん|ど]の[試験:し|けん]にも[上位:じょう|い]で[合格:ごう|かく]する（　　）。",
        "questionTranslation": "Menilik kemampuannya yang nyata, ia pasti tidak salah lagi akan lulus dengan peringkat atas pada ujian kali ini.",
        "options": [
          {
            "key": "1",
            "textJp": "に相違ない",
            "textId": "Pasti tidak salah lagi (に相違ない)"
          },
          {
            "key": "2",
            "textJp": "にすぎない",
            "textId": "Hanya sekadar"
          },
          {
            "key": "3",
            "textJp": "にほかならない",
            "textId": "Tidak lain dan tidak bukan"
          },
          {
            "key": "4",
            "textJp": "にわたる",
            "textId": "Mencakup rentang"
          }
        ],
        "correctKey": "1",
        "explanation": "Keyakinan pasti tanpa keraguan: 合格するに相違ない."
      }
    ]
  },

  {
    "id": "n3-b23-ni-suginai",
    "chapterNumber": 23,
    "chapterTitle": "第23課: 論理・推量・主張 (Kepastian Logis & Sikap Batin)",
    "category": "judgment",
    "categoryLabel": "限定・評価",
    "patternJp": "〜にすぎない",
    "patternKana": "にすぎない",
    "meaningId": "Hanya sebatas / tidak lebih dari sekadar...",
    "connection": "動詞普通形 ＋ にすぎない\n名詞 ＋ にすぎない\nナ形容詞である ＋ にすぎない",
    "coreConcept": "Digunakan untuk menyatakan bahwa suatu hal tidak memiliki nilai tinggi, berskala kecil, atau hanya sekadar hal biasa tanpa perlu dibesar-besarkan.",
    "cautionNote": "Sering diawali dengan kata 単に (tanni = semata-mata) atau ただ (hanya): 『ただの〜にすぎない』.",
    "examples": [
      {
        "id": "ex-suginai-1",
        "textJp": "これは私の個人的な意見にすぎません。",
        "ruby": "これは[私:わたし]の[個人的:こ|じん|てき]な[意見:い|けん]にすぎません。",
        "textId": "Ini semata-mata hanyalah opini pribadi saya saja (tidak mewakili lembaga resmi).",
        "contextNote": "Sikap merendah atas pendapat sendiri."
      },
      {
        "id": "ex-suginai-2",
        "textJp": "アルバイトの立場にすぎない私には、その決定を下す権限はない。",
        "ruby": "アルバイトの[立場:たち|ば]にすぎない[私:わたし]には、その[決定:けっ|てい]を[下:くだ]す[権限:けん|げん]はない。",
        "textId": "Saya yang posisinya hanya sebatas pekerja paruh waktu, tidak memiliki wewenang untuk mengambil keputusan tersebut.",
        "contextNote": "Membatasi status wewenang."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜だけだ (Hanya)",
        "summary": "だけだ = membatasi jumlah atau tindakan secara netral.",
        "distinctionId": "にすぎない = mengandung penilaian evaluatif bahwa bobotnya rendah/remeh."
      }
    ],
    "questions": [
      {
        "id": "q-b23-04",
        "type": "cloze",
        "questionNumber": 112,
        "questionJp": "私はただ言われたことをやった（　　）、特別なことは何もしていません。",
        "questionRuby": "[私:わたし]はただ[言:い]われたことをやった（　　）、[特別:とく|べつ]なことは[何:なに]もしていません。",
        "questionTranslation": "Saya hanya sekadar melakukan apa yang disuruh, sama sekali tidak melakukan hal istimewa.",
        "options": [
          {
            "key": "1",
            "textJp": "にすぎず",
            "textId": "Hanya sebatas (にすぎない)"
          },
          {
            "key": "2",
            "textJp": "にほかならず",
            "textId": "Tiada lain adalah"
          },
          {
            "key": "3",
            "textJp": "に沿って",
            "textId": "Sesuai pedoman"
          },
          {
            "key": "4",
            "textJp": "にしたがって",
            "textId": "Seiring dengan"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan kerendahan hati bahwa tindakannya hanya sebatas melakukan instruksi biasa: やったにすぎず."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 第24課: 譲歩・前提・話題 (Pengandaian, Batasan & Topik)
  // ─────────────────────────────────────────────────────────────
  {
    "id": "n3-b24-ni-shitemo",
    "chapterNumber": 24,
    "chapterTitle": "第24課: 譲歩・前提・話題 (Pengandaian, Batasan & Topik)",
    "category": "contrast",
    "categoryLabel": "事実・譲歩",
    "patternJp": "〜にしても",
    "patternKana": "にしても",
    "meaningId": "Bahkan jika / bagaimanapun keadaannya...",
    "connection": "動詞・イ形容詞普通形 ＋ にしても\nナ形容詞語幹 / 名詞 ＋ にしても (tanpa だ)",
    "coreConcept": "Mengakui suatu fakta atau kondisi sebagai konsesi, namun tetap merasa bahwa hal tersebut melampaui batas kewajaran, tidak dapat dibenarkan, atau kesimpulan pembicara tidak berubah. Sering mengekspresikan kritik ringan.",
    "cautionNote": "Sering muncul bentuk ganda 〜にしても〜にしても (baik A maupun B).",
    "examples": [
      {
        "id": "ex-nishitemo-1",
        "textJp": "冗談にしても、そんな失礼なことを言うべきではない。",
        "ruby": "[冗談:じょう|だん]にしても、そんな[失礼:しつ|れい]なことを[言:い]うべきではない。",
        "textId": "Bahkan sekalipun itu hanya lelucon, kamu tidak pantas mengatakan hal sekurang ajar itu.",
        "contextNote": "Kritik atas lelucon yang melampaui batas wajar."
      },
      {
        "id": "ex-nishitemo-2",
        "textJp": "忙しいにしても、一言連絡ぐらいはできるはずだ。",
        "ruby": "[忙:いそが]しいにしても、[一言:ひと|こと][連絡:れん|らく]ぐらいはできるはずだ。",
        "textId": "Bahkan jika sibuk sekalipun, semestinya setidaknya bisa memberi kabar sepatah kata.",
        "contextNote": "Alasan sibuk tidak membenarkan ketiadaan kabar."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜にしては (Untuk ukuran)",
        "summary": "にしては = membandingkan dengan standar umum (cth: untuk ukuran anak kecil, pintar sekali).",
        "distinctionId": "にしても = konsesi atas suatu kondisi (bahkan jika demikian, tetap ada batasan)."
      }
    ],
    "questions": [
      {
        "id": "q-b24-02",
        "type": "cloze",
        "questionNumber": 113,
        "questionJp": "いくら安い（　　）、こんなにたくさんの量は必要ないよ。",
        "questionRuby": "いくら[安:やす]い（　　）、こんなにたくさんの[量:りょう]は[必要:ひつ|よう]ないよ。",
        "questionTranslation": "Betapapun murahnya, kita tidak butuh porsi sebanyak ini lho.",
        "options": [
          {
            "key": "1",
            "textJp": "にしても",
            "textId": "Bahkan jika demikian (〜にしても)"
          },
          {
            "key": "2",
            "textJp": "にしては",
            "textId": "Untuk ukuran standar"
          },
          {
            "key": "3",
            "textJp": "にとって",
            "textId": "Bagi sudut pandang"
          },
          {
            "key": "4",
            "textJp": "にかけて",
            "textId": "Sampai rentang"
          }
        ],
        "correctKey": "1",
        "explanation": "Berpasangan dengan いくら〜にしても (betapapun murahnya): 安いにしても."
      }
    ]
  },

  {
    "id": "n3-b24-ppanashi",
    "chapterNumber": 24,
    "chapterTitle": "第24課: 譲歩・前提・話題 (Pengandaian, Batasan & Topik)",
    "category": "judgment",
    "categoryLabel": "状態・放置",
    "patternJp": "〜っぱなし",
    "patternKana": "っぱなし",
    "meaningId": "Dibiarkan begitu saja tanpa dibereskan",
    "connection": "動詞マス形語幹 ＋ っぱなし",
    "coreConcept": "Menyatakan bahwa suatu perbuatan dilakukan, tetapi keadaan setelahnya dibiarkan begitu saja tanpa dirapikan, ditutup, atau dibereskan sebagaimana mestinya. Biasanya mengandung nada teguran, keluhan, atau ketidaknyamanan pembicara terhadap kelalaian tersebut.",
    "cautionNote": "Hanya menempel pada stem kata kerja (ます形語幹). Pada kata kerja intransitif seperti 立ちっぱなし artinya 'berdiri terus-menerus tanpa istirahat duduk'.",
    "examples": [
      {
        "id": "ex-ppanashi-1",
        "textJp": "テレビをつけっぱなしで寝てしまった。",
        "ruby": "テレビをつけっぱなしで[寝:ね]てしまった。",
        "textId": "Saya ketiduran dengan televisi dibiarkan menyala begitu saja.",
        "contextNote": "Kelalaian membiarkan barang elektronik menyala."
      },
      {
        "id": "ex-ppanashi-2",
        "textJp": "満員電車で2時間も立ちっぱなしだったので、足がパンパンだ。",
        "ruby": "[満員電車:まん|いん|でん|しゃ]で2[時間:じ|かん]も[立:た]ちっぱなしだったので、[足:あし]がパンパンだ。",
        "textId": "Karena harus terus berdiri selama 2 jam di kereta yang padat, kakiku pegal sekali.",
        "contextNote": "Kondisi fisik terus-menerus tanpa jeda (立ちっぱなし)."
      },
      {
        "id": "ex-ppanashi-3",
        "textJp": "脱いだ服を脱ぎっぱなしにしないで、ちゃんと片付けなさい！",
        "ruby": "[脱:ぬ]いだ[服:ふく]を[脱:ぬ]ぎっぱなしにしないで、ちゃんと[片付:かた|づ]けなさい！",
        "textId": "Jangan biarkan pakaian yang kamu lepas berserakan begitu saja, rapikan baik-baik!",
        "contextNote": "Teguran atas kebiasaan membiarkan pakaian berserakan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜たまま (Dalam kondisi tetap)",
        "summary": "たまま = deskripsi netral tanpa nada keluhan emosional.",
        "distinctionId": "っぱなし = hampir selalu mengandung nada keluhan, rasa lelah, atau teguran atas kelalaian."
      }
    ],
    "questions": [
      {
        "id": "q-b24-06",
        "type": "cloze",
        "questionNumber": 114,
        "questionJp": "エアコンを（　　）にして外出したため、電気代が高くなってしまった。",
        "questionRuby": "エアコンを（　　）にして[外出:がい|しゅつ]したため、[電気代:でん|き|だい]が[高:たか]くなってしまった。",
        "questionTranslation": "Karena pergi keluar dengan AC dibiarkan menyala begitu saja, tagihan listrik jadi mahal.",
        "options": [
          {
            "key": "1",
            "textJp": "つけっぱなし",
            "textId": "Dibiarkan menyala (〜っぱなし)"
          },
          {
            "key": "2",
            "textJp": "つけたまま",
            "textId": "Dalam kondisi menyala (netral)"
          },
          {
            "key": "3",
            "textJp": "つけがち",
            "textId": "Cenderung menyala"
          },
          {
            "key": "4",
            "textJp": "つけ気味",
            "textId": "Agak sedikit menyala"
          }
        ],
        "correctKey": "1",
        "explanation": "Menyatakan kelalaian membiarkan pendingin ruangan terus menyala tanpa dimatikan: つけっぱなし."
      }
    ]
  },

  {
    "id": "n3-b24-to-ittemo",
    "chapterNumber": 24,
    "chapterTitle": "第24課: 譲歩・前提・話題 (Pengandaian, Batasan & Topik)",
    "category": "contrast",
    "categoryLabel": "限定・譲歩",
    "patternJp": "〜といっても",
    "patternKana": "といっても",
    "meaningId": "Meskipun dibilang... (namun kenyataannya tidak sehebat bayangan)",
    "connection": "動詞・イ形容詞普通形 ＋ といっても\nナ形容詞語幹 / 名詞 ＋ といっても (tanpa だ)",
    "coreConcept": "Digunakan ketika pembicara membatasi ekspektasi lawan bicara agar tidak membayangkan hal yang berlebihan. Menyatakan bahwa faktanya memang begitu, tetapi skala atau kualitas sebenarnya jauh lebih sederhana.",
    "cautionNote": "Klausa setelah といっても hampir selalu diikuti fakta sederhana atau batasan yang mengecilkan ekspektasi.",
    "examples": [
      {
        "id": "ex-toittemo-1",
        "textJp": "料理ができるといっても、簡単な卵焼きが作れる程度です。",
        "ruby": "[料理:りょう|り]ができるといっても、[簡単:かん|たん]な[卵焼:たまご|や]きが[作:つく]れる[程度:てい|ど]です。",
        "textId": "Meskipun saya bilang bisa memasak, itu hanya sebatas bisa membuat telur dadar sederhana saja.",
        "contextNote": "Membatasi ekspektasi kepandaian memasak."
      },
      {
        "id": "ex-toittemo-2",
        "textJp": "今週は忙しいといっても、先週のピークほどではありません。",
        "ruby": "[今週:こん|しゅう]は[忙:いそが]しいといっても、[先週:せん|しゅう]のピークほどではありません。",
        "textId": "Meskipun dibilang minggu ini sibuk, tidaklah sepadat puncak minggu lalu.",
        "contextNote": "Mengklarifikasi derajat kesibukan."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜とはいえ (Kendati demikian)",
        "summary": "とはいえ = ragam formal tertulis N2.",
        "distinctionId": "といっても = ragam umum percakapan dan tulisan N3."
      }
    ],
    "questions": [
      {
        "id": "q-b24-03",
        "type": "cloze",
        "questionNumber": 115,
        "questionJp": "家を買ったといっても、とても（　　）中古のマンションです。",
        "questionRuby": "[家:いえ]を[買:か]ったといっても、とても（　　）[中古:ちゅう|こ]のマンションです。",
        "questionTranslation": "Meskipun dibilang membeli rumah, itu hanyalah apartemen bekas yang sangat kecil dan tua.",
        "options": [
          {
            "key": "1",
            "textJp": "小さくて古い",
            "textId": "Kecil dan tua (merendahkan ekspektasi)"
          },
          {
            "key": "2",
            "textJp": "豪華で広い",
            "textId": "Mewah dan luas"
          },
          {
            "key": "3",
            "textJp": "新築で綺麗な",
            "textId": "Baru dibangun dan bersih"
          },
          {
            "key": "4",
            "textJp": "駅前の超高層",
            "textId": "Gedung pencakar langit depan stasiun"
          }
        ],
        "correctKey": "1",
        "explanation": "Karena berpola 〜といっても, kelanjutan kalimat harus membatasi atau merendahkan bayangan mewah: 小さくて古い."
      }
    ]
  },

  {
    "id": "n3-b24-to-iu-no-wa",
    "chapterNumber": 24,
    "chapterTitle": "第24課: 譲歩・前提・話題 (Pengandaian, Batasan & Topik)",
    "category": "judgment",
    "categoryLabel": "定義・説明",
    "patternJp": "〜というのは / 〜とは",
    "patternKana": "というのは / とは",
    "meaningId": "Yang dimaksud dengan... / Definisi dari...",
    "connection": "名詞 ＋ というのは / とは\n文末: 〜ことだ / 〜意味だ / 〜からだ",
    "coreConcept": "Digunakan untuk mengangkat suatu kata, istilah baru, atau konsep untuk mendefinisikan artinya, atau untuk menjelaskan alasan/sebab dari suatu situasi yang baru disebutkan (というのは〜からだ).",
    "cautionNote": "〜とは adalah versi yang lebih ringkas dan tertulis dari というのは.",
    "examples": [
      {
        "id": "ex-toiu-1",
        "textJp": "「円高」というのは、円の価値が他の通貨に対して高くなることです。",
        "ruby": "「[円高:えん|だか]」というのは、[円:えん]の[価値:か|ち]が[他:ほか]の[通貨:つう|か]に[対:たい]して[高:たか]くなることです。",
        "textId": "Yang dimaksud dengan 'Endaka' adalah menguatnya nilai mata uang Yen terhadap mata uang asing lainnya.",
        "contextNote": "Mendefinisikan konsep keuangan."
      },
      {
        "id": "ex-toiu-2",
        "textJp": "昨日学校を休んだ。というのは、急に高熱が出たからだ。",
        "ruby": "[昨日:きのう][学校:がっ|こう]を[休:やす]んだ。というのは、[急:きゅう]に[高熱:こう|ねつ]が[出:で]たからだ。",
        "textId": "Kemarin saya absen sekolah. Hal itu adalah karena saya tiba-tiba demam tinggi.",
        "contextNote": "というのは〜からだ (menjelaskan alasan keterlambatan/absen)."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜といえば (Bicara tentang)",
        "summary": "といえば = memancing asosiasi pikiran spontan.",
        "distinctionId": "というのは / とは = mendefinisikan arti istilah secara objektif."
      }
    ],
    "questions": [
      {
        "id": "q-b24-04",
        "type": "cloze",
        "questionNumber": 116,
        "questionJp": "「リモートワーク」というのは、オフィス以外の場所で働く（　　）。",
        "questionRuby": "「リモートワーク」というのは、オフィス[以外:い|がい]の[場所:ば|しょ]で[働:はたら]く（　　）。",
        "questionTranslation": "Yang dimaksud dengan 'Remote Work' adalah bekerja di tempat selain kantor.",
        "options": [
          {
            "key": "1",
            "textJp": "ことだ",
            "textId": "Artinya adalah (〜ことだ)"
          },
          {
            "key": "2",
            "textJp": "ものだ",
            "textId": "Sudah sewajarnya"
          },
          {
            "key": "3",
            "textJp": "わけだ",
            "textId": "Berarti kesimpulannya"
          },
          {
            "key": "4",
            "textJp": "はずだ",
            "textId": "Semestinya"
          }
        ],
        "correctKey": "1",
        "explanation": "Pola pemberian definisi istilah: 〜というのは…ことだ."
      }
    ]
  },

  {
    "id": "n3-b24-to-iu-to",
    "chapterNumber": 24,
    "chapterTitle": "第24課: 譲歩・前提・話題 (Pengandaian, Batasan & Topik)",
    "category": "judgment",
    "categoryLabel": "話題・連想",
    "patternJp": "〜というと / 〜といえば / 〜といったら",
    "patternKana": "というと / といえば / といったら",
    "meaningId": "Kalau bicara soal... (hal khas yang langsung terlintas)",
    "connection": "名詞 / 普通形 ＋ というと / といえば / といったら",
    "coreConcept": "Digunakan ketika suatu kata atau topik disebut, lalu secara spontan memancing asosiasi khas atau representasi paling terkenal dari hal tersebut. Khusus 〜といったら juga dapat digunakan untuk mengungkapkan intensitas emosional yang luar biasa.",
    "cautionNote": "〜といえば sering dipakai saat tiba-tiba teringat suatu topik di tengah obrolan ('Ngomong-ngomong soal itu...').",
    "examples": [
      {
        "id": "ex-toiuto-1",
        "textJp": "日本の春の風物詩というと、やはり桜のお花見でしょう。",
        "ruby": "[日本:に|ほん]の[春:はる]の[風物詩:ふう|ぶつ|し]というと、やはり[桜:さくら]のお[花見:はな|み]でしょう。",
        "textId": "Kalau bicara soal tradisi khas musim semi di Jepang, tentulah melihat mekarnya bunga Sakura.",
        "contextNote": "Asosiasi representatif utama musim semi."
      },
      {
        "id": "ex-toiuto-2",
        "textJp": "北海道の真冬の寒さといったら、言葉では表せないほどだ。",
        "ruby": "[北海道:ほっ|かい|どう]の[真冬:ま|ふゆ]の[寒:さむ]さといったら、[言葉:こと|ば]では[表:あらわ]せないほどだ。",
        "textId": "Kalau bicara soal dinginnya puncak musim dingin di Hokkaido, sungguh luar biasa sampai tak terkatakan dengan kata-kata.",
        "contextNote": "といったら untuk intensitas ekstrem."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜にかけては (Dalam hal keahlian)",
        "summary": "にかけては = menonjolkan keahlian khusus di suatu bidang.",
        "distinctionId": "というと / といえば = asosiasi umum yang langsung terlintas di benak saat mendengar suatu kata."
      }
    ],
    "questions": [
      {
        "id": "q-b24-05",
        "type": "cloze",
        "questionNumber": 117,
        "questionJp": "イタリア料理（　　）、真っ先にピザやパスタが思い浮かぶ。",
        "questionRuby": "イタリア[料理:りょう|り]（　　）、[真:ま]っ[先:さき]にピザやパスタが[思:おも]い[浮:う]かぶ。",
        "questionTranslation": "Kalau bicara soal kuliner Italia, hal yang paling pertama terlintas adalah pizza dan pasta.",
        "options": [
          {
            "key": "1",
            "textJp": "といえば",
            "textId": "Kalau bicara soal (〜といえば)"
          },
          {
            "key": "2",
            "textJp": "にすれば",
            "textId": "Jika dari sudut pandang"
          },
          {
            "key": "3",
            "textJp": "といっても",
            "textId": "Meskipun dibilang"
          },
          {
            "key": "4",
            "textJp": "にしたがって",
            "textId": "Seiring dengan"
          }
        ],
        "correctKey": "1",
        "explanation": "Pola asosiasi representasi utama suatu konsep: イタリア料理といえば."
      }
    ]
  },

  {
    "id": "n3-b24-to-shitemo",
    "chapterNumber": 24,
    "chapterTitle": "第24課: 譲歩・前提・話題 (Pengandaian, Batasan & Topik)",
    "category": "contrast",
    "categoryLabel": "仮定・譲歩",
    "patternJp": "〜としても",
    "patternKana": "としても",
    "meaningId": "Sekalipun / kalaupun diandaikan demikian...",
    "connection": "動詞・イ形容詞・ナ形容詞・名詞普通形 ＋ としても\n※名詞・ナ形容詞 juga dapat langsung: だとしても",
    "coreConcept": "Membuat pengandaian hipotesis konsesif: 'Kalaupun seandainya hal itu terjadi atau benar adanya, fakta atau keputusan pada kalimat pokok tetap tidak akan terpengaruh/berubah'.",
    "cautionNote": "Mengandaikan kondisi teoritis atau kemungkinan di masa depan (sering diawali kata たとえ: たとえ〜としても).",
    "examples": [
      {
        "id": "ex-toshitemo-1",
        "textJp": "たとえ失敗したとしても、全力を尽くしたのなら後悔はない。",
        "ruby": "たとえ[失敗:しっ|ぱい]したとしても、[全力:ぜん|りょく]を[尽:つ]くしたのなら[後悔:こう|かい]はない。",
        "textId": "Sekalipun seandainya gagal, jika sudah mengerahkan segenap tenaga, maka tidak ada penyesalan.",
        "contextNote": "Hipotesis konsesif berpasangan dengan たとえ."
      },
      {
        "id": "ex-toshitemo-2",
        "textJp": "今からタクシーに乗ったとしても、飛行機の時間には間に合わないだろう。",
        "ruby": "[今:いま]からタクシーに[乗:の]ったとしても、[飛行機:ひ|こう|き]の[時間:じ|かん]には[間:ま]に[合:あ]わないだろう。",
        "textId": "Kalaupun naik taksi dari sekarang, kemungkinan tetap tidak akan keburu waktu pesawat.",
        "contextNote": "Tindakan pengandaian yang tidak mengubah hasil."
      }
    ],
    "comparisons": [
      {
        "targetPattern": "〜にしても (Bahkan jika)",
        "summary": "にしても = sering merujuk pada fakta nyata yang sudah ada.",
        "distinctionId": "としても = murni pengandaian hipotesis teoritis."
      }
    ],
    "questions": [
      {
        "id": "q-b24-01",
        "type": "cloze",
        "questionNumber": 118,
        "questionJp": "たとえ反対（　　）、私は自分の信じる道を進むつもりだ。",
        "questionRuby": "たとえ[反対:はん|たい]（　　）、[私:わたし]は[自分:じ|ぶん]の[信:しん]じる[道:みち]を[進:すす]むつもりだ。",
        "questionTranslation": "Kalaupun seandainya ditentang, saya berniat untuk tetap maju di jalan yang saya yakini.",
        "options": [
          {
            "key": "1",
            "textJp": "されたとしても",
            "textId": "Sekalipun seandainya ditentang (たとえ〜としても)"
          },
          {
            "key": "2",
            "textJp": "されたからには",
            "textId": "Karena sudah ditentang"
          },
          {
            "key": "3",
            "textJp": "されるにつれて",
            "textId": "Seiring ditentang"
          },
          {
            "key": "4",
            "textJp": "される一方だ",
            "textId": "Makin terus ditentang"
          }
        ],
        "correctKey": "1",
        "explanation": "Pola pengandaian hipotesis berpasangan dengan kata たとえ: されたとしても."
      }
    ]
  }
];
