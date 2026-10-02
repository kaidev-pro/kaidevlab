import { BunpouItem } from "./types";

export const BUNPOU_ITEMS: BunpouItem[] = [
  // ─────────────────────────────────────────────────────────────
  // 第1課: 時間・時の関係 (Waktu & Urutan Kejadian)
  // ─────────────────────────────────────────────────────────────
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
        "questionNumber": 1,
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
        "questionNumber": 2,
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
        "questionNumber": 3,
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
        "questionNumber": 4,
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
        "questionNumber": 5,
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

  // ─────────────────────────────────────────────────────────────
  // 第2課: 原因・理由 (Sebab, Alasan & Akibat)
  // ─────────────────────────────────────────────────────────────
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
        "questionNumber": 6,
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
        "questionNumber": 8,
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
        "questionNumber": 12,
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
        "questionNumber": 13,
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

  // ─────────────────────────────────────────────────────────────
  // 第5課: 範囲・起点・終点 (Rentang & Batas Lingkup)
  // ─────────────────────────────────────────────────────────────
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
        "questionNumber": 14,
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
        "questionNumber": 15,
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
        "questionNumber": 16,
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
        "questionNumber": 17,
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
        "questionNumber": 18,
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
        "questionNumber": 19,
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

  // ─────────────────────────────────────────────────────────────
  // 第6課: 視点・立場・基準 (Sudut Pandang & Tolok Ukur)
  // ─────────────────────────────────────────────────────────────
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
        "questionNumber": 20,
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
        "questionNumber": 21,
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
        "questionNumber": 22,
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
        "questionNumber": 23,
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
        "questionNumber": 25,
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
        "questionNumber": 26,
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

  // ─────────────────────────────────────────────────────────────
  // 第8課: 傾向・様子・変化 (Kecenderungan & Kondisi Alami)
  // ─────────────────────────────────────────────────────────────
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
        "questionNumber": 27,
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
        "questionNumber": 28,
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
        "questionNumber": 29,
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
        "questionNumber": 31,
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
        "questionNumber": 32,
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
        "questionNumber": 33,
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
        "questionNumber": 34,
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
        "questionNumber": 36,
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
        "questionNumber": 38,
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

  // ─────────────────────────────────────────────────────────────
  // 第11課: 感情・感覚・自発 (Emosi & Luapan Perasaan)
  // ─────────────────────────────────────────────────────────────
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
        "questionNumber": 39,
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
        "questionNumber": 40,
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
        "questionNumber": 41,
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
        "questionNumber": 42,
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

  // ─────────────────────────────────────────────────────────────
  // 第12課: 確信・推量・評価 (Keyakinan & Tingkat Dugaan)
  // ─────────────────────────────────────────────────────────────
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
        "questionNumber": 43,
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
        "questionNumber": 44,
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
        "questionNumber": 46,
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
  }
];
