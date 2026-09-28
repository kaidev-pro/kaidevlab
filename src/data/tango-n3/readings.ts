export interface TangoComprehensionQuestion {
  question: string;
  questionId: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TangoReadingPassage {
  id: string;
  number: number;
  partId: "noun" | "verb" | "adj" | "idiom" | "affix";
  partTitle: string;
  chapterTitle: string;
  title: string;
  titleId: string;
  badge: string;
  readTimeMinutes: number;
  targetWords: string[];
  content: string; // Teks bacaan dengan format furigana [漢字:かんじ]
  translation: string; // Terjemahan bahasa Indonesia
  audioText: string; // Teks bersih untuk pembacaan audio TTS
  comprehensionQuestions: TangoComprehensionQuestion[];
}

// 20 Bacaan Resmi Fitur 「読んでみよう」 Shin Kanzen Master Tango N3 (2021 Edition)
export const TANGO_N3_READINGS: TangoReadingPassage[] = [
  {
    "id": "reading-01",
    "number": 1,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 一般1 (生活のスタート)",
    "title": "[新生活:しんせいかつ]のスタートと[決意:けつい]",
    "titleId": "Memulai Kehidupan Baru dan Tekad Diri",
    "badge": "第1篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "アイデア",
      "握手",
      "安定",
      "意識",
      "決意",
      "意欲"
    ],
    "content": "[春:はる]を迎えて、私は新しい街での生活をスタートさせた。最初は[不安:ふあん]もあったが、職場の仲間たちと笑顔で[握手:あくしゅ]を交わした瞬間、心の中に温かい[安心:あんしん]感が広がった。新しい仕事では、従来のやり方にとらわれず、柔軟な[アイデア:アイデア]を積極的に提案していきたい。日々の生活を[安定:あんてい]させるとともに、社会人としての高い[意識:いしき]を持って、何事にも強い[意欲:いよく]で挑戦していく[決意:けつい]だ。",
    "translation": "Menyambut musim semi, saya memulai lembaran hidup baru di kota yang baru. Awalnya ada rasa cemas, namun saat berjabat tangan hangat penuh senyum dengan rekan kerja baru, rasa tenang pun menyelimuti hati. Di pekerjaan baru ini, saya ingin aktif mengusulkan ide-ide segar tanpa terpaku pada pola lama. Selain menjaga stabilitas hidup sehari-hari, saya bertekad menghadapi segala tantangan dengan semangat tinggi dan kesadaran profesional.",
    "comprehensionQuestions": [
      {
        "question": "筆者は職場の仲間と出会った時、どのように感じましたか。",
        "questionId": "Apa yang dirasakan penulis saat pertama kali bertemu dengan rekan-rekan kerjanya?",
        "options": [
          "とても不安になって逃げたくなった",
          "握手を交わして安心感が広がった",
          "従来のやり方をそのまま続けようと思った",
          "仕事の厳しさに落ち込んでしまった"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『職場の仲間たちと笑顔で握手を交わした瞬間、心の中に温かい安心感が広がった』 (Begitu berjabat tangan hangat dan tersenyum, rasa tenang menyelimuti hati)."
      }
    ],
    "audioText": "春を迎えて、私は新しい街での生活をスタートさせた。最初は不安もあったが、職場の仲間たちと笑顔で握手を交わした瞬間、心の中に温かい安心感が広がった。新しい仕事では、従来のやり方にとらわれず、柔軟なアイデアを積極的に提案していきたい。日々の生活を安定させるとともに、社会人としての高い意識を持って、何事にも強い意欲で挑戦していく決意だ。"
  },
  {
    "id": "reading-02",
    "number": 2,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 一般2 (社会と人間関係)",
    "title": "お[互:たが]いの[個性:こせい]を[認:みと]め[合:あ]うこと",
    "titleId": "Saling Menghargai Kepribadian Masing-Masing",
    "badge": "第2篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "個性",
      "態度",
      "配慮",
      "礼儀",
      "信頼",
      "円滑"
    ],
    "content": "人が集まる社会では、育った環境や考え方が異なるのは[当然:とうぜん]のことだ。相手の[個性:こせい]を尊重し、誠実な[態度:たいど]で接することが、お互いの[信頼:しんらい]関係を築くための第一歩となる。ちょっとした言葉遣いや[礼儀:れいぎ]への[配慮:はいりょ]を忘れないことで、人間関係の摩擦を防ぎ、コミュニケーションを[円滑:えんかつ]に進めることができる。違いを受け入れる心のゆとりが大切だ。",
    "translation": "Dalam masyarakat tempat berkumpulnya banyak orang, wajar jika latar belakang dan pola pikir setiap individu berbeda-beda. Menghormati kepribadian lawan bicara dan bersikap tulus adalah langkah awal membangun rasa saling percaya. Dengan tidak melupakan sopan santun dan tenggang rasa dalam bertutur kata, gesekan antarmanusia dapat dicegah serta komunikasi dapat berjalan lancar. Kelapangan hati menerima perbedaan adalah kunci utamanya.",
    "comprehensionQuestions": [
      {
        "question": "信頼関係を築くために最も大切だと述べられていることは何ですか。",
        "questionId": "Hal apa yang dinyatakan paling penting untuk membangun hubungan saling percaya?",
        "options": [
          "自分と同じ考え方の人だけと付き合うこと",
          "相手の個性を尊重し、誠実な態度で接すること",
          "どんなときも自分の意見を強く主張すること",
          "他人との関わりをできるだけ減らすこと"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『相手の個性を尊重し、誠実な態度で接することが、お互いの信頼関係を築くための第一歩となる』."
      }
    ],
    "audioText": "人が集まる社会では、育った環境や考え方が異なるのは当然のことだ。相手の個性を尊重し、誠実な態度で接することが、お互いの信頼関係を築くための第一歩となる。ちょっとした言葉遣いや礼儀への配慮を忘れないことで、人間関係の摩擦を防ぎ、コミュニケーションを円滑に進めることができる。違いを受け入れる心のゆとりが大切だ。"
  },
  {
    "id": "reading-03",
    "number": 3,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 交通 (日本の交通網と旅)",
    "title": "[新幹線:しんかんせん]での[快適:かいてき]な[旅:たび]",
    "titleId": "Perjalanan Nyaman dengan Kereta Cepat Shinkansen",
    "badge": "第3篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "新幹線",
      "運賃",
      "定期券",
      "車掌",
      "車窓",
      "定刻"
    ],
    "content": "日本の鉄道網は、世界でも有数の正確さと安全性を誇っている。先日、出張のために東京から京都まで[新幹線:しんかんせん]を利用した。窓口で乗車券と特急券を購入し、ホームへ向かうと、列車は[定刻:ていこく]通りにホームへ滑り込んできた。[車掌:しゃしょう]の丁寧な案内アナウンスを聞きながら、座席に深く身を沈める。[車窓:しゃそう]から富士山を眺めながら過ごす時間は、長旅の疲れを忘れさせてくれる至福のひとときだった。",
    "translation": "Jaringan perkeretaapian Jepang membanggakan ketepatan waktu dan tingkat keselamatan kelas dunia. Tempo hari, saya menaiki Shinkansen dari Tokyo ke Kyoto untuk urusan perjalanan dinas. Membeli tiket di loket lalu menuju peron, kereta tiba persis sesuai jadwal. Duduk bersandar nyaman sambil mendengarkan pengumuman ramah kondektur dan menatap Gunung Fuji dari jendela kereta, rasa letih perjalanan panjang pun sirna seketika.",
    "comprehensionQuestions": [
      {
        "question": "筆者は新幹線の旅で何を見て疲れを忘れましたか。",
        "questionId": "Apa yang dilihat penulis saat di Shinkansen sehingga melupakan rasa letihnya?",
        "options": [
          "駅のホームの人混み",
          "車窓から見えた富士山",
          "手元の時刻表",
          "特急券の金額"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyebutkan: 『車窓から富士山を眺めながら過ごす時間は、長旅の疲れを忘れさせてくれる至福のひとときだった』."
      }
    ],
    "audioText": "日本の鉄道網は、世界でも有数の正確さと安全性を誇っている。先日、出張のために東京から京都まで新幹線を利用した。窓口で乗車券と特急券を購入し、ホームへ向かうと、列車は定刻通りにホームへ滑り込んできた。車掌の丁寧な案内アナウンスを聞きながら、座席に深く身を沈める。車窓から富士山を眺めながら過ごす時間は、長旅の疲れを忘れさせてくれる至福のひとときだった。"
  },
  {
    "id": "reading-04",
    "number": 4,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 健康・医療 (体調管理の知恵)",
    "title": "[風邪:かぜ]の[予防:よぼう]と[健康:けんこう][管理:かんり]",
    "titleId": "Pencegahan Flu dan Manajemen Kesehatan",
    "badge": "第4篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "症状",
      "診察",
      "処方箋",
      "予防",
      "栄養",
      "睡眠"
    ],
    "content": "季節の変わり目は、朝晩の寒暖差によって体調を崩しやすい時期だ。微熱や喉の痛みなどの初期[症状:しょうじょう]に気づいたら、無理をせずに早めに医師の[診察:しんさつ]を受けることが肝心である。薬局で[処方箋:しょほうせん]をもらって適切な薬を飲むだけでなく、バランスの取れた[栄養:えいよう]と十分な[睡眠:すいみん]を確保することが、病気に対する最大の[予防:よぼう]策となる。健康な体があってこそ、日々の充実した生活が送れるのだ。",
    "translation": "Masa peralihan musim rawan memicu penurunan stamina akibat perubahan suhu pagi dan malam. Begitu merasakan gejala awal seperti meriang dan nyeri tenggorokan, lekas memeriksakan diri ke dokter adalah langkah bijak. Tak cuma menebus resep di apotek dan minum obat, memenuhi nutrisi berimbang dan tidur yang cukup adalah kunci pencegahan terbaik. Raga yang sehat adalah fondasi utama dalam menjalani hari-hari yang bermakna.",
    "comprehensionQuestions": [
      {
        "question": "病気に対する最大の予防策として挙げられているものは何ですか。",
        "questionId": "Apa yang disebut sebagai langkah pencegahan penyakit paling utama?",
        "options": [
          "毎日激しい運動を続けること",
          "栄養バランスと十分な睡眠を確保すること",
          "症状が重くなってから病院へ行くこと",
          "薬をできるだけたくさん飲むこと"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『バランスの取れた栄養と十分な睡眠を確保することが、病気に対する最大の予防策となる』."
      }
    ],
    "audioText": "季節の変わり目は、朝晩の寒暖差によって体調を崩しやすい時期だ。微熱や喉の痛みなどの初期症状に気づいたら、無理をせずに早めに医師の診察を受けることが肝心である。薬局で処方箋をもらって適切な薬を飲むだけでなく、バランスの取れた栄養と十分な睡眠を確保することが、病気に対する最大の予防策となる。健康な体があってこそ、日々の充実した生活が送れるのだ。"
  },
  {
    "id": "reading-05",
    "number": 5,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 人間関係 (友との絆)",
    "title": "[大切:たいせつ]な[親友:しんゆう]との[絆:きずな]",
    "titleId": "Ikatan Berharga Bersama Sahabat Karib",
    "badge": "第5篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "親友",
      "知人",
      "仲間",
      "味方",
      "恩人",
      "本音"
    ],
    "content": "大人になると、仕事関係の[知人:ちじん]は増えていくが、何でも包み隠さず[本音:ほんね]で語り合える[親友:しんゆう]に出会う機会は少なくなる。私が人生の壁にぶつかって深く悩んでいた時、学生時代からの友人が「何があっても私はあなたの[味方:みかた]だ」と言って支えてくれた。苦しい時に損得勘定抜きで手を差し伸べてくれる[仲間:なかま]は、人生におけるかけがえのない[恩人:おんじん]であり、私の心の支えである。",
    "translation": "Saat beranjak dewasa, kenalan kerja memang bertambah banyak, namun sahabat karib tempat bertukar isi hati apa adanya semakin langka ditemui. Ketika saya terpuruk menghadapi jalan buntu hidup, kawan sejak zaman sekolah merangkul dan berkata 'Apapun yang terjadi, aku akan selalu membela dan di sisimu'. Rekan yang mengulurkan tangan tanpa pamrih di masa sulit adalah penolong hidup berharga penopang jiwa.",
    "comprehensionQuestions": [
      {
        "question": "筆者にとって「学生時代からの友人」はどのような存在ですか。",
        "questionId": "Bagi penulis, sosok seperti apakah teman sejak zaman sekolah tersebut?",
        "options": [
          "仕事上の利害関係がある知人",
          "損得抜きで支えてくれるかけがえのない存在",
          "たまに連絡を取り合う程度の仲間",
          "厳しい忠告ばかりしてくる先輩"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『苦しい時に損得勘定抜きで手を差し伸べてくれる仲間は、人生におけるかけがえのない恩人であり、私の心の支えである』."
      }
    ],
    "audioText": "大人になると、仕事関係の知人は増えていくが、何でも包み隠さず本音で語り合える親友に出会う機会は少なくなる。私が人生の壁にぶつかって深く悩んでいた時、学生時代からの友人が「何があっても私はあなたの味方だ」と言って支えてくれた。苦しい時に損得勘定抜きで手を差し伸べてくれる仲間は、人生におけるかけがえのない恩人であり、私の心の支えである。"
  },
  {
    "id": "reading-06",
    "number": 6,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 教育・学校 (学びの探求)",
    "title": "[大学:だいがく]での[研究:けんきゅう]と[講義:こうぎ]",
    "titleId": "Kuliah dan Riset Akademik di Kampus",
    "badge": "第6篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "学部",
      "講義",
      "教授",
      "論文",
      "奨学金",
      "実験"
    ],
    "content": "大学の工[学部:がくぶ]に進学した私は、先端技術に関する専門[講義:こうぎ]を受講している。担当の[教授:きょうじゅ]は熱心な指導で知られ、学生一人ひとりの探求心を刺激してくれる。毎日の[実験:じっけん]は失敗の連続だが、データを地道に検証し、卒業[論文:ろんぶん]にまとめる過程で多くのことを学んでいる。経済的な負担を軽減してくれる[奨学金:しょうがくきん]の受給を受けながら、未来を支える技術者を目指して研究に励む日々だ。",
    "translation": "Melanjutkan kuliah di Fakultas Teknik, saya mengikuti kuliah khusus teknologi mutakhir. Dosen pembimbing dikenal sangat berdedikasi membimbing dan membakar rasa ingin tahu mahasiswa. Praktikum laboratorium memang penuh kegagalan, namun proses memvalidasi data demi skripsi kelulusan memberi banyak ilmu berharga. Didukung beasiswa yang meringankan biaya, saya giat meneliti demi menjadi insinyur masa depan.",
    "comprehensionQuestions": [
      {
        "question": "筆者が研究に励むことができている理由の一つは何ですか。",
        "questionId": "Salah satu alasan yang mendukung penulis giat meneliti adalah?",
        "options": [
          "すべての実験が最初から成功しているから",
          "奨学金を受給して経済的な負担が軽減されているから",
          "講義の出席が自由だから",
          "卒業論文の提出が免除されているから"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyebutkan: 『経済的な負担を軽減してくれる奨学金の受給を受けながら、未来を支える技術者を目指して研究に励む日々だ』."
      }
    ],
    "audioText": "大学の工学部に進学した私は、先端技術に関する専門講義を受講している。担当の教授は熱心な指導で知られ、学生一人ひとりの探求心を刺激してくれる。毎日の実験は失敗の連続だが、データを地道に検証し、卒業論文にまとめる過程で多くのことを学んでいる。経済的な負担を軽減してくれる奨学金の受給を受けながら、未来を支える技術者を目指して研究に励む日々だ。"
  },
  {
    "id": "reading-07",
    "number": 7,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 会社・ビジネス (現代の労働環境)",
    "title": "オフィスの[新:あたら]しい[働き方:はたらきかた]",
    "titleId": "Pola Kerja Baru di Lingkungan Kantor",
    "badge": "第7篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "出勤",
      "残業",
      "有給休暇",
      "上司",
      "部下",
      "効率"
    ],
    "content": "近年のビジネス界では、働き方改革が急速に進んでいる。毎日の満員電車による[出勤:しゅっきん]ストレスを減らすため、在宅勤務を導入する企業が増加した。かつて美徳とされていた無意味な[残業:ざんぎょう]は見直され、限られた時間内で業務を[効率:こうりつ]的に終わらせることが評価される。[上司:じょうし]と[部下:ぶか]がオープンに対話し、計画的に[有給休暇:ゆうきゅうきゅうか]を取得できる職場環境こそが、長期的な業績向上をもたらす。",
    "translation": "Dunia bisnis saat ini mengalami reformasi pola kerja yang pesat. Banyak perusahaan menerapkan kerja dari rumah demi mengurangi stres komuter jam padat. Lembur tak bermakna yang dulu dianggap terpuji kini dievaluasi, dan ketuntasan tugas secara efisien dalam jam kerja menjadi tolok ukur prestasi. Dialog terbuka atasan dan bawahan serta kemudahan cuti tahunan terencana justru mendongkrak kinerja jangka panjang.",
    "comprehensionQuestions": [
      {
        "question": "現代のビジネス現場で高く評価される働き方はどれですか。",
        "questionId": "Pola kerja seperti apa yang dinilai tinggi di dunia kerja saat ini?",
        "options": [
          "誰よりも遅くまでオフィスに残業すること",
          "限られた時間内で効率的に業務を終わらせること",
          "有給休暇を一切取らずに働くこと",
          "上司の指示に質問せず黙って従うこと"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『限られた時間内で業務を効率的に終わらせることが評価される』."
      }
    ],
    "audioText": "近年のビジネス界では、働き方改革が急速に進んでいる。毎日の満員電車による出勤ストレスを減らすため、在宅勤務を導入する企業が増加した。かつて美徳とされていた無意味な残業は見直され、限られた時間内で業務を効率的に終わらせることが評価される。上司と部下がオープンに対話し、計画的に有給休暇を取得できる職場環境こそが、長期的な業績向上をもたらす。"
  },
  {
    "id": "reading-08",
    "number": 8,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 自然・環境 (地球の未来を守る)",
    "title": "[地球:ちきゅう][温暖化:おんだんか]と[私:わたし]たちの[役割:やくわり]",
    "titleId": "Pemanasan Global dan Peran Kita",
    "badge": "第8篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "気候",
      "豪雨",
      "洪水",
      "省エネ",
      "資源",
      "森林"
    ],
    "content": "世界各地で[気候:きこう]の異常が報告されている。毎年のように発生する記録的な集中[豪雨:ごうう]や河川の[洪水:こうずい]は、地球温暖化の影響を色濃く示している。豊かな[森林:しんりん]を守り、限られた天然[資源:しげん]を浪費しない生活を心がけることが急務だ。家庭でのこまめな[省エネ:しょうエネ]活動やゴミの分別など、私たち一人ひとりの小さな実践が積み重なって、次世代へ美しい地球を引き継ぐ大きな力となる。",
    "translation": "Anomali iklim kian marak dilaporkan di penjuru bumi. Hujan lebat ekstrem dan luapan banjir sungai yang terjadi nyaris tiap tahun memperlihatkan nyata dampak pemanasan global. Melindungi hutan asri dan berhemat sumber daya alam adalah hal mendesak. Dari hemat listrik di rumah hingga pemilahan sampah daur ulang, kontribusi kecil setiap kita akan berakumulasi mewariskan bumi yang lestari ke generasi depan.",
    "comprehensionQuestions": [
      {
        "question": "美しい地球を次世代へ引き継ぐために必要なことは何ですか。",
        "questionId": "Apa yang diperlukan untuk mewariskan bumi indah ke generasi penerus?",
        "options": [
          "天然資源を気にせず使い切ること",
          "一人ひとりが省エネや資源の保護を実践すること",
          "豪雨の時は何もしないこと",
          "森林の開発をさらに進めること"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『家庭でのこまめな省エネ活動やゴミの分別など、私たち一人ひとりの小さな実践が積み重なって、次世代へ美しい地球を引き継ぐ大きな力となる』."
      }
    ],
    "audioText": "世界各地で気候の異常が報告されている。毎年のように発生する記録的な集中豪雨や河川の洪水は、地球温暖化の影響を色濃く示している。豊かな森林を守り、限られた天然資源を浪費しない生活を心がけることが急務だ。家庭でのこまめな省エネ活動やゴミの分別など、私たち一人ひとりの小さな実践が積み重なって、次世代へ美しい地球を引き継ぐ大きな力となる。"
  },
  {
    "id": "reading-09",
    "number": 9,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 生活・家事 (自炊の楽しみ)",
    "title": "[一人暮:ひとりぐ]らしの[自炊:じすい]と[節約:せつやく]",
    "titleId": "Masak Mandiri dan Hidup Hemat Anak Kos",
    "badge": "第9篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "献立",
      "炊事",
      "調味料",
      "冷凍",
      "節約",
      "必需品"
    ],
    "content": "一人暮らしを始めて痛感したのは、日々の[炊事:すいじ]の大切さだ。外食ばかりだと食費がかさむため、週末にスーパーで食材をまとめ買いし、一週間の[献立:こんだて]を考えるようになった。基本の[調味料:ちょうみりょう]を揃え、多めに作ったおかずを小分けにして[冷凍:れいとう]保存しておけば、忙しい平日でも手軽に温かい夕食が食べられる。毎月の生活費を[節約:せつやく]しながら料理の腕も上達し、自炊が楽しい日課となった。",
    "translation": "Tinggal sendiri membuat saya sadar betapa pentingnya memasak sendiri. Mengingat makan di luar boros, saya belanja bahan tiap akhir pekan dan merancang susunan menu sepekan. Menyiapkan bumbu dasar dan membekukan masakan porsi kecil membuat makan malam hangat tersaji praktis di hari kerja sibuk. Menghemat pengeluaran sembari mengasah keterampilan masak, kegiatan dapur pun jadi rutinitas menyenangkan.",
    "comprehensionQuestions": [
      {
        "question": "筆者が平日に手軽に温かい夕食を食べられる理由は何ですか。",
        "questionId": "Mengapa penulis bisa menikmati makan malam hangat praktis di hari kerja?",
        "options": [
          "毎日高級レストランでテイクアウトしているから",
          "作り置きしたおかずを冷凍保存しているから",
          "調味料を一切使わずに料理するから",
          "家族が毎日夕食を届けてくれるから"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『多めに作ったおかずを小分けにして冷凍保存しておけば、忙しい平日でも手軽に温かい夕食が食べられる』."
      }
    ],
    "audioText": "一人暮らしを始めて痛感したのは、日々の炊事の大切さだ。外食ばかりだと食費がかさむため、週末にスーパーで食材をまとめ買いし、一週間の献立を考えるようになった。基本の調味料を揃え、多めに作ったおかずを小分けにして冷凍保存しておけば、忙しい平日でも手軽に温かい夕食が食べられる。毎月の生活費を節約しながら料理の腕も上達し、自炊が楽しい日課となった。"
  },
  {
    "id": "reading-10",
    "number": 10,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 趣味・文化 (伝統の息吹)",
    "title": "[日本:にほん]の[伝統:でんとう][芸能:げいのう]に[触:ふ]れる",
    "titleId": "Menyelami Seni Pertunjukan Tradisional Jepang",
    "badge": "第10篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "演劇",
      "鑑賞",
      "伝統",
      "歌舞伎",
      "劇場",
      "観客"
    ],
    "content": "先週末、友人に誘われて銀座の[劇場:げきじょう]へ出かけ、人生で初めて[歌舞伎:かぶき]を[鑑賞:かんしょう]した。きらびやかな衣装と独特の化粧をまとった役者が舞台に現れると、客席の[観客:かんきゃく]から感嘆の声が漏れた。数百年にわたって受け継がれてきた日本の[伝統:でんとう]の重みと、観客を惹きつける力強い演技に圧倒された。古い歴史を持ちながらも現代の人々の心を揺さぶる舞台芸術の魅力に、深く魅了された一日だった。",
    "translation": "Akhir pekan kemarin, atas ajakan teman saya pergi ke teater Ginza menonton pementasan Kabuki perdana dalam hidup. Begitu aktor berbusana megah dan berias wajah mencolok melangkah ke panggung, decak kagum penonton serentak terdengar. Kedalaman tradisi ratusan tahun berpadu akting ekspresif sungguh memukau. Kesenian klasik bersejarah panjang yang sanggup menggetarkan jiwa insan modern membuat saya jatuh cinta pada seni pertunjukan.",
    "comprehensionQuestions": [
      {
        "question": "歌舞伎を見た筆者はどのような感想を持ちましたか。",
        "questionId": "Kesan apa yang dirasakan penulis seusai menonton Kabuki?",
        "options": [
          "内容が難しすぎて退屈だった",
          "伝統の重みと力強い演技の魅力に深く魅了された",
          "劇場の座席が狭くて疲れた",
          "現代劇のほうが面白いと感じた"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyebutkan: 『日本の伝統の重みと、観客を惹きつける力強い演技に圧倒された... 魅力に、深く魅了された一日だった』."
      }
    ],
    "audioText": "先週末、友人に誘われて銀座の劇場へ出かけ、人生で初めて歌舞伎を鑑賞した。きらびやかな衣装と独特の化粧をまとった役者が舞台に現れると、客席の観客から感嘆の声が漏れた。数百年にわたって受け継がれてきた日本の伝統の重みと、観客を惹きつける力強い演技に圧倒された。古い歴史を持ちながらも現代の人々の心を揺さぶる舞台芸術の魅力に、深く魅了された一日だった。"
  },
  {
    "id": "reading-11",
    "number": 11,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 政治・経済・社会 (市民社会の成熟)",
    "title": "[市民:しみん]としての[権利:けんり]と[義務:ぎむ]",
    "titleId": "Hak dan Kewajiban Sebagai Warga Negara",
    "badge": "第11篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "政策",
      "法律",
      "権利",
      "義務",
      "選挙",
      "投票"
    ],
    "content": "民主主義国家において、主権は国民にある。国や地方の将来を決める[政策:せいさく]に対して、私たちは[選挙:せんきょ]での[投票:とうひょう]を通じて自らの意思を表明することができる。法の下で保障された尊い[権利:けんり]を行使する一方で、社会の一員として[法律:ほうりつ]を守り、納税などの[義務:ぎむ]を果たす責任もある。権利と義務のバランスを一人ひとりが自覚して行動することが、成熟した公正な社会を維持するための土台である。",
    "translation": "Dalam negara demokrasi, kedaulatan berada di tangan rakyat. Terhadap arah kebijakan publik negara dan daerah, kita menyuarakan aspirasi lewat pemberian suara di pemilu. Di samping menggunakan hak kodrati yang dijamin hukum, sebagai warga kita memikul tanggung jawab mentaati aturan dan menunaikan kewajiban pajak. Kesadaran seimbang atas hak dan kewajiban adalah fondasi utama memelihara masyarakat adil bermartabat.",
    "comprehensionQuestions": [
      {
        "question": "成熟した公正な社会を維持するために何が必要だと述べられていますか。",
        "questionId": "Apa yang dinyatakan perlu demi menjaga masyarakat yang matang dan adil?",
        "options": [
          "権利だけを主張して義務を果たさないこと",
          "一人ひとりが権利と義務のバランスを自覚して行動すること",
          "選挙の投票に行かないこと",
          "国の政策に一切関心を持たないこと"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『権利と義務のバランスを一人ひとりが自覚して行動することが、成熟した公正な社会を維持するための土台である』."
      }
    ],
    "audioText": "民主主義国家において、主権は国民にある。国や地方の将来を決める政策に対して、私たちは選挙での投票を通じて自らの意思を表明することができる。法の下で保障された尊い権利を行使する一方で、社会の一員として法律を守り、納税などの義務を果たす責任もある。権利と義務のバランスを一人ひとりが自覚して行動することが、成熟した公正な社会を維持するための土台である。"
  },
  {
    "id": "reading-12",
    "number": 12,
    "partId": "noun",
    "partTitle": "名詞 (Kata Benda)",
    "chapterTitle": "名詞 情報・科学 (デジタルイノベーション)",
    "title": "[人工知能:じんこうちのう]（AI）が[変:か]える[未来:みらい]",
    "titleId": "Masa Depan yang Diubah oleh Kecerdasan Buatan",
    "badge": "第12篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "通信",
      "端末",
      "検索",
      "人工知能",
      "開発",
      "実験"
    ],
    "content": "情報[通信:つうしん]技術の進歩は、私たちの生活を劇的に変化させた。スマートフォンなどの携帯[端末:たんまつ]一つで世界中の知識を即座に[検索:けんさく]できる時代だ。さらに近年、[人工知能:じんこうちのう]（AI）の技術[開発:かいはつ]が世界中で加速し、医療診断や自動運転など様々な分野で実用化に向けた[実験:じっけん]が繰り返されている。科学技術を人類の幸福のためにどう活用していくかが、現代を生きる私たちに問われている。",
    "translation": "Kemajuan teknologi telekomunikasi informasi merevolusi peradaban manusia. Cukup lewat gawai ponsel cerdas, aneka wawasan di seluruh dunia tersaji instan di mesin pencari. Terlebih lagi, rekayasa riset kecerdasan buatan (AI) melesat diuji di bidang medis hingga kemudi otomatis. Bagaimana memanfaatkan teknologi bagi kemaslahatan manusia menjadi tantangan utama yang harus kita jawab bersama.",
    "comprehensionQuestions": [
      {
        "question": "現代の私たちに問われている課題は何ですか。",
        "questionId": "Persoalan apa yang menjadi tantangan bagi kita di era modern saat ini?",
        "options": [
          "すべての科学技術の開発を中止すること",
          "科学技術を人類の幸福のためにどう活用していくか",
          "スマートフォンを一切使わない生活に戻すこと",
          "AIにすべての判断を任せること"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『科学技術を人類の幸福のためにどう活用していくかが、現代を生きる私たちに問われている』."
      }
    ],
    "audioText": "情報通信技術の進歩は、私たちの生活を劇的に変化させた。スマートフォンなどの携帯端末一つで世界中の知識を即座に検索できる時代だ。さらに近年、人工知能（AI）の技術開発が世界中で加速し、医療診断や自動運転など様々な分野で実用化に向けた実験が繰り返されている。科学技術を人類の幸福のためにどう活用していくかが、現代を生きる私たちに問われている。"
  },
  {
    "id": "reading-13",
    "number": 13,
    "partId": "verb",
    "partTitle": "動詞 (Kata Kerja)",
    "chapterTitle": "動詞 1 (行動と日々のリズム)",
    "title": "休日の[過:す]ごし[方:かた]と[気分:きぶん][転換:てんかん]",
    "titleId": "Cara Menikmati Hari Libur dan Menyegarkan Pikiran",
    "badge": "第13篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "過ごす",
      "涼む",
      "散歩",
      "眺める",
      "誘う",
      "試す"
    ],
    "content": "忙しい平日が過ぎ、待ちに待った日曜日。私は友人をお茶に[誘:さそ]い、川沿いのカフェでゆったりとした時間を[過:す]ごした。午後は緑豊かな公園を[散歩:さんぽ]し、木陰のベンチで風に当たって[涼:すず]みながら、遠くの青空を静かに[眺:なが]めた。普段は慌ただしく通り過ぎてしまう景色も、足を止めてみると新しい発見がある。新しい料理のレシピを[試:ため]すなど、自分のための時間を楽しむことが明日への活力になる。",
    "translation": "Sepekan padat berganti minggu yang dinanti. Saya mengajak kawan minum teh dan menikmati waktu santai di kedai pinggir kali. Siang harinya berjalan santai di taman asri, berteduh adem di bawah pohon menikmati semilir angin seraya menatap langit biru. Pemandangan yang biasa terlewat terburu-buru kini menghadirkan pesona baru saat sejenak berhenti. Mencoba resep masakan baru dan menikmati waktu luang menjadi energi menyongsong hari esok.",
    "comprehensionQuestions": [
      {
        "question": "筆者は休日にどのようなことをして過ごしましたか。",
        "questionId": "Kegiatan apa saja yang dilakukan penulis saat hari libur?",
        "options": [
          "一日中家で仕事の残業をした",
          "友人を誘ってお茶をし、公園で涼みながら景色を眺めた",
          "朝から晩まで遠くへ旅行に出かけた",
          "部屋に閉じこもって寝ていただけだった"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyebutkan: 『友人をお茶に誘い... 午後は緑豊かな公園を散歩し、木陰のベンチで風に当たって涼みながら、遠くの青空を静かに眺めた』."
      }
    ],
    "audioText": "忙しい平日が過ぎ、待ちに待った日曜日。私は友人をお茶に誘い、川沿いのカフェでゆったりとした時間を過ごした。午後は緑豊かな公園を散歩し、木陰のベンチで風に当たって涼みながら、遠くの青空を静かに眺めた。普段は慌ただしく通り過ぎてしまう景色も、足を止めてみると新しい発見がある。新しい料理のレシピを試すなど、自分のための時間を楽しむことが明日への活力になる。"
  },
  {
    "id": "reading-14",
    "number": 14,
    "partId": "verb",
    "partTitle": "動詞 (Kata Kerja)",
    "chapterTitle": "動詞 2 (挑戦と前進)",
    "title": "[目標:もくひょう]に[向:む]かって[立:た]ち[向:む]かう",
    "titleId": "Berdiri Menghadapi Rintangan Menggapai Impian",
    "badge": "第14篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "立ち向かう",
      "争う",
      "戦う",
      "助け合う",
      "果たす",
      "目指す"
    ],
    "content": "誰の人生にも、避けて通ることのできない厳しい試練が訪れる。困難から逃げ出さず、勇気を持って正面から[立:た]ち[向:む]かう姿勢が人を成長させる。他人と無意味に優劣を[争:あらそ]うのではなく、昨日の自分を超えるために[戦:たたか]うのだ。道半ばで倒れそうになった時は、仲間と[助:たす]け[合:あ]いながら一歩ずつ進めばよい。自ら掲げた目標を[果:は]たした時の達成感は、何物にも代えがたい宝物となる。",
    "translation": "Dalam hidup siapapun, ujian berat tak terelakkan pasti datang menyapa. Sikap pantang lari dan berani berdiri tegak menghadapi rintangan dari depan adalah jalan mendewasakan diri. Bukan bersaing memperebutkan menang kalah semu dengan orang lain, melainkan berjuang melampaui diri sendiri kemarin. Di saat nyaris goyah, saling bantu bersama kawan melangkah perlahan. Rasa puas saat impian tercapai akan jadi pusaka hidup abadi.",
    "comprehensionQuestions": [
      {
        "question": "困難に直面したとき、筆者はどのような姿勢が大切だと述べていますか。",
        "questionId": "Sikap apa yang dianggap penting oleh penulis ketika menghadapi kesulitan?",
        "options": [
          "すぐに諦めて逃げ出すこと",
          "勇気を持って正面から立ち向かうこと",
          "他人のせいにして怒ること",
          "一人だけで抱え込んで誰にも頼らないこと"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『困難から逃げ出さず、勇気を持って正面から立ち向かう姿勢が人を成長させる』."
      }
    ],
    "audioText": "誰の人生にも、避けて通ることのできない厳しい試練が訪れる。困難から逃げ出さず、勇気を持って正面から立ち向かう姿勢が人を成長させる。他人と無意味に優劣を争うのではなく、昨日の自分を超えるために戦うのだ。道半ばで倒れそうになった時は、仲間と助け合いながら一歩ずつ進めばよい。自ら掲げた目標を果たした時の達成感は、何物にも代えがたい宝物となる。"
  },
  {
    "id": "reading-15",
    "number": 15,
    "partId": "verb",
    "partTitle": "動詞 (Kata Kerja)",
    "chapterTitle": "動詞 3 (複合動詞とチーム力)",
    "title": "チームで[課題:かだい]を[乗:の]り[越:こ]える",
    "titleId": "Mengatasi Masalah Bersama Tim Kerja",
    "badge": "第15篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "話し合う",
      "引き受ける",
      "乗り越える",
      "支え合う",
      "やり遂げる"
    ],
    "content": "大規模なプロジェクトを成功させる鍵は、チームワークにある。予期せぬトラブルが発生した際、メンバー全員が集まって解決策を徹底的に[話:はな]し[合:あ]った。それぞれが得意分野の役割を責任を持って[引:ひ]き[受:う]け、お互いの弱点を[支:ささ]え[合:あ]うことで、大きな危機を無事に[乗:の]り[越:こ]えることができた。一人では途方に暮れてしまう難題も、仲間と団結して最後まで[やり遂:と]げた時、チームの絆はより強固なものとなる。",
    "translation": "Kunci keberhasilan proyek berskala besar berakar pada kerja sama tim. Saat kendala tak terduga datang, seluruh anggota berkumpul berdiskusi tuntas merumuskan solusi. Masing-masing mengemban tugas sesuai keahliannya dengan tanggung jawab dan saling menopang kelemahan rekan, sehingga krisis besar terlewati dengan selamat. Problem rumit yang membingungkan jika dihadapi sendiri, saat dituntaskan kompak bersama tim, akan merekatkan persaudaraan erat.",
    "comprehensionQuestions": [
      {
        "question": "トラブルが発生した時、チームはどのように対処しましたか。",
        "questionId": "Bagaimana tim menangani masalah ketika terjadi kendala?",
        "options": [
          "リーダー一人だけにすべての責任を押し付けた",
          "徹底的に話し合い、役割を引き受けて支え合って乗り越えた",
          "プロジェクトを中止して解散した",
          "何も対策を講じずに時間が経つのを待った"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『メンバー全員が集まって解決策を徹底的に話し合った。それぞれが得意分野の役割を責任を持って引き受け、お互いの弱点を支え合うことで、大きな危機を無事に乗り越えることができた』."
      }
    ],
    "audioText": "大規模なプロジェクトを成功させる鍵は、チームワークにある。予期せぬトラブルが発生した際、メンバー全員が集まって解決策を徹底的に話し合った。それぞれが得意分野の役割を責任を持って引き受け、お互いの弱点を支え合うことで、大きな危機を無事に乗り越えることができた。一人では途方に暮れてしまう難題も、仲間と団結して最後までやり遂げた時、チームの絆はより強固なものとなる。"
  },
  {
    "id": "reading-16",
    "number": 16,
    "partId": "adj",
    "partTitle": "形容詞・副詞",
    "chapterTitle": "形容詞 (季節の情景と感情)",
    "title": "[四季:しき]の[移:うつ]ろいと[自然:しぜん]の[美:うつく]しさ",
    "titleId": "Keindahan Perubahan Empat Musim",
    "badge": "第16篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "険しい",
      "穏やか",
      "鮮やか",
      "清らか",
      "爽やか",
      "豊か"
    ],
    "content": "日本には、はっきりとした四季の変化がある。[険:けわ]しい山々も、春になれば桜の花でピンク色に染まり、[穏:おだ]やかな日差しに包まれる。夏には青々とした新緑が輝き、秋には山肌が[鮮:あざ]やかな紅葉で彩られる。小川の[清:きよ]らかなせせらぎや、吹き抜ける[爽:さわ]やかな風を感じるたびに、心が洗われるようだ。四季折々の[豊:ゆた]かな自然の美しさに触れることは、慌ただしい現代人の心を癒やしてくれる。",
    "translation": "Jepang memiliki perubahan empat musim yang sangat memesona. Gunung-gunung terjal berselimut bunga sakura merah muda di musim semi bermandikan mentari lembut hangat. Musim panas menghadirkan daun hijau segar berkilau, dan musim gugur mewarnai perbukitan dengan keelokan warna daun merah membara. Gemericik air jernih sungai kecil dan semilir angin sejuk menyegarkan jiwa. Keindahan alam empat musim melunturkan penat insan modern.",
    "comprehensionQuestions": [
      {
        "question": "自然の美しさに触れることは、現代人にとってどのような効果がありますか。",
        "questionId": "Apa efek menyatu dengan keindahan alam bagi insan modern?",
        "options": [
          "忙しさが増してストレスが溜まる",
          "心が癒やされてリフレッシュされる",
          "体力が奪われて疲れ果てる",
          "季節の変化が分からなくなる"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyebutkan: 『四季折々の豊かな自然の美しさに触れることは、慌ただしい現代人の心を癒やしてくれる』."
      }
    ],
    "audioText": "日本には、はっきりとした四季の変化がある。険しい山々も、春になれば桜の花でピンク色に染まり、穏やかな日差しに包まれる。夏には青々とした新緑が輝き、秋には山肌が鮮やかな紅葉で彩られる。小川の清らかなせせらぎや、吹き抜ける爽やかな風を感じるたびに、心が洗われるようだ。四季折々の豊かな自然の美しさに触れることは、慌ただしい現代人の心を癒やしてくれる。"
  },
  {
    "id": "reading-17",
    "number": 17,
    "partId": "adj",
    "partTitle": "形容詞・副詞",
    "chapterTitle": "副詞 (着実な語学学習)",
    "title": "[確実:かくじつ]に[力:ちから]を[伸:の]ばす[学習法:がくしゅうほう]",
    "titleId": "Metode Belajar untuk Meningkatkan Kemampuan Secara Nyata",
    "badge": "第17篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "徐々に",
      "着実に",
      "めったに",
      "到底",
      "必ずしも",
      "一気に"
    ],
    "content": "語学の習得は、マラソンによく似ている。一夜漬けで[一気:いっき]に覚えようとしても、知識はすぐに抜け落ちてしまう。最初から完璧を目指す必要はない。[徐々:じょじょ]に新しい単語を増やし、毎日[着実:ちゃくじつ]に復習を重ねることが最も近道だ。忙しくて時間が取れない日でも、[めったに:めったに]ない好機を逃さず、数分でも日本語に触れ続けること。語学力は[必:かなら]ずしも才能によるものではなく、継続した努力の結晶なのだ。",
    "translation": "Belajar bahasa asing ibarat lari maraton. Menghafal instan semalam suntuk hanya membuat kosakata cepat menguap lupa. Tak perlu menuntut kesempurnaan sejak awal. Menambah kata secara bertahap dan rutin mengulang dengan konsisten adalah rute tercepat. Di hari sibuk sekalipun, luangkan beberapa menit menyentuh bahasa Jepang. Kemahiran bahasa bukan mutlak soal bakat, melainkan kristalisasi ikhtiar konsisten tanpa henti.",
    "comprehensionQuestions": [
      {
        "question": "語学力を伸ばすために最も効果的だと述べられているのはどれですか。",
        "questionId": "Manakah yang dinyatakan paling efektif untuk meningkatkan kemampuan bahasa?",
        "options": [
          "試験の前日だけに一気に徹夜で勉強すること",
          "毎日着実に少しずつ復習を継続すること",
          "最初から完璧に話せるまで何もしないこと",
          "生まれ持った才能にすべてを任せること"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyatakan: 『徐々に新しい単語を増やし、毎日着実に復習を重ねることが最も近道だ』."
      }
    ],
    "audioText": "語学の習得は、マラソンによく似ている。一夜漬けで一気に覚えようとしても、知識はすぐに抜け落ちてしまう。最初から完璧を目指す必要はない。徐々に新しい単語を増やし、毎日着実に復習を重ねることが最も近道だ。忙しくて時間が取れない日でも、めったにない好機を逃さず、数分でも日本語に触れ続けること。語学力は必ずしも才能によるものではなく、継続した努力の結晶なのだ。"
  },
  {
    "id": "reading-18",
    "number": 18,
    "partId": "idiom",
    "partTitle": "慣用句・カタカナ",
    "chapterTitle": "慣用句 (身体を使った慣用表現)",
    "title": "[日常:にちじょう][会話:かいわ]で[使:つか]われる[慣用句:かんようく]",
    "titleId": "Ungkapan Idiom Alami dalam Percakapan Harian",
    "badge": "第18篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "頭に来る",
      "気がする",
      "足が出る",
      "手を引く",
      "耳を傾ける"
    ],
    "content": "日本語には、身体の部位を使った豊かな慣用句が数多く存在する。理不尽な対応に思わず「[頭:あたま]に[来:く]る」こともあれば、何か不思議な予感がして「良いことが起こる[気:き]がする」と口にすることもある。旅行で買い物をしすぎて予算から「[足:あし]が[出:で]る」苦い経験も、後になれば笑い話だ。相手の意見に真摯に「[耳:みみ]を[傾:かたむ]ける」姿勢を大切にしながら、慣用句を自然に使いこなせるようになりたい。",
    "translation": "Bahasa Jepang kaya akan ungkapan idiom anggota tubuh. Terkadang kita naik darah kesal (頭に来る) pada perlakuan janggal, atau firasat berkata hal baik akan terjadi (気がする). Boros belanja hingga anggaran tekor membengkak (足が出る) jadi cerita lucu di kemudian hari. Dengan senantiasa menyimak saksama (耳を傾ける) pendapat sesama, kita belajar memakai ungkapan alami dalam percakapan sehari-hari.",
    "comprehensionQuestions": [
      {
        "question": "「足が出る」とはどのような意味で使われていますか。",
        "questionId": "Apa makna ungkapan 'Ashi ga deru' dalam teks tersebut?",
        "options": [
          "足が長くなって靴が合わなくなること",
          "買い物をしすぎて予算をオーバーすること",
          "歩き疲れて足が動かなくなること",
          "誰かを足で蹴ってしまうこと"
        ],
        "correctIndex": 1,
        "explanation": "Teks menyebutkan: 『旅行で買い物をしすぎて予算から「足が出る」』 yang bermakna pengeluaran melampaui anggaran (tekor/overbudget)."
      }
    ],
    "audioText": "日本語には、身体の部位を使った豊かな慣用句が数多く存在する。理不尽な対応に思わず「頭に来る」こともあれば、何か不思議な予感がして「良いことが起こる気がする」と口にすることもある。旅行で買い物をしすぎて予算から「足が出る」苦い経験も、後になれば笑い話だ。相手の意見に真摯に「耳を傾ける」姿勢を大切にしながら、慣用句を自然に使いこなせるようになりたい。"
  },
  {
    "id": "reading-19",
    "number": 19,
    "partId": "idiom",
    "partTitle": "慣用句・カタカナ",
    "chapterTitle": "カタカナ語 (グローバル社会の言葉)",
    "title": "グローバル社会におけるカタカナ語",
    "titleId": "Kosakata Katakana di Era Masyarakat Global",
    "badge": "第19篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "ボランティア",
      "リサイクル",
      "アポイント",
      "プライバシー",
      "トラブル"
    ],
    "content": "現代の日本社会では、外来語由来のカタカナ語が日々の生活に深く浸透している。ビジネスの現場では、事前に「アポイント」を取って顧客を訪問し、予期せぬ「トラブル」を避けるためのリスク管理が重視される。一方、社会活動においては「ボランティア」や「リサイクル」といった言葉が定着し、環境意識の高まりを示している。個人の「プライバシー」を守りつつ、国際的な視野を持って新しい言葉を正しく理解していきたい。",
    "translation": "Dalam masyarakat Jepang modern, serapan kata katakana telah merasuk ke percakapan harian. Di dunia kantor, membuat janji temu (アポイント) sebelum berkunjung ke klien dan mengantisipasi kendala (トラブル) sangat diutamakan. Di ranah sosial, istilah sukarelawan (ボランティア) dan daur ulang (リサイクル) merefleksikan tingginya kesadaran ekologis. Sambil menjaga privasi pribadi, wawasan global memudahkan kita menyerap istilah anyar dengan tepat.",
    "comprehensionQuestions": [
      {
        "question": "ビジネスの現場でトラブルを避けるために重視されていることは何ですか。",
        "questionId": "Apa yang diutamakan di dunia bisnis demi mencegah masalah kendala?",
        "options": [
          "事前にアポイントを取って訪問すること",
          "ボランティア活動に参加すること",
          "リサイクルを徹底すること",
          "すべてのプライバシーを公開すること"
        ],
        "correctIndex": 0,
        "explanation": "Teks menyatakan: 『事前に「アポイント」を取って顧客を訪問し、予期せぬ「トラブル」を避けるためのリスク管理が重視される』."
      }
    ],
    "audioText": "現代の日本社会では、外来語由来のカタカナ語が日々の生活に深く浸透している。ビジネスの現場では、事前に「アポイント」を取って顧客を訪問し、予期せぬ「トラブル」を避けるためのリスク管理が重視される。一方、社会活動においては「ボランティア」や「リサイクル」といった言葉が定着し、環境意識の高まりを示している。個人の「プライバシー」を守りつつ、国際的な視野を持って新しい言葉を正しく理解していきたい。"
  },
  {
    "id": "reading-20",
    "number": 20,
    "partId": "affix",
    "partTitle": "接辞・接続詞",
    "chapterTitle": "接辞・接続詞 (日本語の造語力)",
    "title": "[言葉:ことば]の[豊:ゆた]かな[広:ひろ]がり",
    "titleId": "Memahami Struktur Awalan & Akhiran Pembentuk Kata",
    "badge": "第20篇",
    "readTimeMinutes": 2,
    "targetWords": [
      "無〜",
      "不〜",
      "〜性",
      "〜化",
      "〜的",
      "したがって"
    ],
    "content": "日本語の語彙を効率的に増やすためには、接頭辞や接尾辞の働きを理解することが極めて有効だ。例えば「無」や「不」という接頭辞を言葉の頭につけるだけで、「無責任」や「不安定」のように否定の意味を表すことができる。また、言葉の末尾に「性」や「化」をつければ、「安全性」や「近代化」のように名詞を抽象化したり変化を示したりできる。[したがって:したがって]、漢字一字の意味と接辞のルールを把握すれば、未知の単語に出会ってもその意味を推測できるようになるのだ。",
    "translation": "Untuk melipatgandakan perbendaharaan kosakata secara efektif, memahami peran awalan dan akhiran sangatlah ampuh. Sebagai contoh, menyematkan awalan 'Mu' (無) atau 'Fu' (不) pada pangkal kata langsung melahirkan makna negasi seperti 'Musekinin' (tak bertanggung jawab) atau 'Fuantei' (labil). Begitu pula akhiran '-Sei' (性) atau '-Ka' (化) mengubah kata menjadi konsep abstrak seperti 'Anzensei' (tingkat keamanan) atau 'Kindaika' (modernisasi). Oleh karena itu, menguasai kaidah imbuhan memampukan kita menebak arti kata baru secara mandiri.",
    "comprehensionQuestions": [
      {
        "question": "接辞のルールを理解することのメリットは何ですか。",
        "questionId": "Apa manfaat utama dari memahami aturan imbuhan (awalan & akhiran)?",
        "options": [
          "辞書を引かなくても未知の単語の意味を推測できるようになる",
          "日本語の勉強を完全にやめることができる",
          "漢字の書き順を覚えなくてよくなる",
          "会話のスピードが遅くなる"
        ],
        "correctIndex": 0,
        "explanation": "Teks menyatakan: 『漢字一字の意味と接辞のルールを把握すれば、未知の単語に出会ってもその意味を推測できるようになるのだ』."
      }
    ],
    "audioText": "日本語の語彙を効率的に増やすためには、接頭辞や接尾辞の働きを理解することが極めて有効だ。例えば「無」や「不」という接頭辞を言葉の頭につけるだけで、「無責任」や「不安定」のように否定の意味を表すことができる。また、言葉の末尾に「性」や「化」をつければ、「安全性」や「近代化」のように名詞を抽象化したり変化を示したりできる。したがって、漢字一字の意味と接辞のルールを把握すれば、未知の単語に出会ってもその意味を推測できるようになるのだ。"
  }
];
