/**
 * FE Exam Vocabulary & Technical Kanji Glossary (N3 to FE Bridge)
 * Provides instant Indonesian definitions, JLPT levels, and exam context
 * for technical kanji terms appearing in FE questions and explanations.
 */

export interface VocabEntry {
  termJp: string;
  reading: string;
  romaji: string;
  meaningId: string;
  meaningEn?: string;
  partOfSpeech?: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1" | "FE-IT" | "General";
  contextLabel?: string;
  examTip?: string;
  collocation?: {
    jpRuby: string;
    meaningId: string;
  };
  exampleSentence?: {
    jpRuby: string;
    meaningId: string;
  };
}

// Hiragana to Romaji converter for dynamic pronunciation guides
const HIRAGANA_ROMAJI_MAP: Record<string, string> = {
  あ: "a", い: "i", う: "u", え: "e", お: "o",
  か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
  た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
  は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
  や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
  わ: "wa", を: "wo", ん: "n",
  が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
  ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
  だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
  ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
  ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
  きゃ: "kya", きゅ: "kyu", きょ: "kyo",
  しゃ: "sha", しゅ: "shu", しょ: "sho",
  ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
  にゃ: "nya", にゅ: "nyu", にょ: "nyo",
  ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo",
  みゃ: "mya", みゅ: "myu", みょ: "myo",
  りゃ: "rya", りゅ: "ryu", りょ: "ryo",
  ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo",
  じゃ: "ja", じゅ: "ju", じょ: "jo",
  びゃ: "bya", びゅ: "byu", びょ: "byo",
  ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",
};

export function hiraganaToRomaji(hiragana: string): string {
  if (!hiragana) return "";
  let result = "";
  let i = 0;
  while (i < hiragana.length) {
    // Check sokuon (small tsu っ)
    if (hiragana[i] === "っ" && i + 1 < hiragana.length) {
      const nextTwo = hiragana.slice(i + 1, i + 3);
      const nextOne = hiragana.slice(i + 1, i + 2);
      const nextRomaji = HIRAGANA_ROMAJI_MAP[nextTwo] || HIRAGANA_ROMAJI_MAP[nextOne] || "";
      if (nextRomaji) {
        result += nextRomaji[0];
      }
      i++;
      continue;
    }

    // Check two-char compounds (kya, sho, etc.)
    const twoChars = hiragana.slice(i, i + 2);
    if (HIRAGANA_ROMAJI_MAP[twoChars]) {
      result += HIRAGANA_ROMAJI_MAP[twoChars];
      i += 2;
      continue;
    }

    // Single char
    const oneChar = hiragana[i];
    if (HIRAGANA_ROMAJI_MAP[oneChar]) {
      result += HIRAGANA_ROMAJI_MAP[oneChar];
    } else {
      result += oneChar;
    }
    i++;
  }
  return result;
}

export const FE_VOCAB_GLOSSARY: Record<string, VocabEntry> = {
  // --- Keamanan & IT (Security & System) ---
  脆弱性: {
    termJp: "脆弱性",
    reading: "ぜいじゃくせい",
    romaji: "zeijakusei",
    meaningId: "Celah kerentanan sistem atau cacat kode yang dapat dieksploitasi peretas untuk mencuri data atau merusak sistem.",
    level: "N1",
    examTip: "Sering muncul bersama kata パッチ (patch) atau ゼロデイ攻撃 (zero-day exploit).",
  },
  否認防止: {
    termJp: "否認防止",
    reading: "ひにんぼうし",
    romaji: "hinin boushi",
    meaningId: "Mekanisme anti-elak pembuktian hukum bahwa pengirim benar-benar melakukan transaksi tersebut.",
    level: "N1",
    examTip: "Kunci jawaban: terwujud melalui tanda tangan digital (ディジタル署名) dan kunci privat pengirim.",
  },
  冗長化: {
    termJp: "冗長化",
    reading: "じょうちょうか",
    romaji: "jouchouka",
    meaningId: "Menyediakan komponen cadangan (server/jaringan duplikat) agar saat sistem utama rusak, layanan tetap berjalan.",
    level: "N1",
    examTip: "Pondasi utama sistem berketersediaan tinggi (High Availability / 可用性).",
  },
  漏洩: {
    termJp: "漏洩",
    reading: "ろうえい",
    romaji: "rouei",
    meaningId: "Kebocoran informasi rahasia atau data pribadi kepada pihak yang tidak berhak.",
    level: "N1",
    examTip: "Sering ditulis '漏えい' pada soal hukum GDPR atau Undang-Undang Perlindungan Data Pribadi.",
  },
  改ざん: {
    termJp: "改ざん",
    reading: "かいざん",
    romaji: "kaizan",
    meaningId: "Pemalsuan atau manipulasi isi data digital secara tidak sah.",
    level: "N1",
    examTip: "Dideteksi menggunakan nilai Hash (ハッシュ値) atau MAC (Message Authentication Code).",
  },
  盗聴: {
    termJp: "盗聴",
    reading: "とうちょう",
    romaji: "touchou",
    meaningId: "Penyadapan komunikasi data di tengah jalur transmisi jaringan.",
    level: "N1",
    examTip: "Dicegah melalui enkripsi komunikasi (SSL/TLS, IPsec, VPN).",
  },
  なりすまし: {
    termJp: "なりすまし",
    reading: "なりすまし",
    romaji: "narisumashi",
    meaningId: "Penyamaran identitas ilegal (spoofing) seolah-olah menjadi pengguna asli yang berhak.",
    level: "FE-IT",
    examTip: "Dicegah melalui autentikasi multi-faktor (多要素認証) dan tanda tangan digital.",
  },
  隔離: {
    termJp: "隔離",
    reading: "かくり",
    romaji: "kakuri",
    meaningId: "Mengisolasi file atau proses mencurigakan ke lingkungan terpisah agar tidak menular.",
    level: "N1",
    examTip: "Konsep dasar Sandbox (サンドボックス) dan zona DMZ (非武装地帯).",
  },
  踏み台: {
    termJp: "踏み台",
    reading: "ふみだい",
    romaji: "fumidai",
    meaningId: "Server korban yang dibajak peretas untuk dijadikan batu loncatan menyerang target lain.",
    level: "N2",
    examTip: "Ciri khas serangan DDoS dari jaringan zombie/botnet.",
  },

  // --- Hukum, Kontrak & Manajemen (Legal & Management) ---
  善管注意義務: {
    termJp: "善管注意義務",
    reading: "ぜんかんちゅういぎむ",
    romaji: "zenkan chuui gimu",
    meaningId: "Kewajiban mengelola pekerjaan dengan kehati-hatian profesional sesuai standar keahlian yang wajar.",
    level: "N1",
    examTip: "Merupakan kewajiban utama pihak pelaksana pada Kontrak Kuasa Kerja (準委任契約).",
  },
  契約不適合: {
    termJp: "契約不適合",
    reading: "けいやくふてきごう",
    romaji: "keiyaku futekigou",
    meaningId: "Kondisi hasil kerja tidak sesuai kesepakatan spesifikasi kontrak (dahulu disebut 瑕疵担保責任 / cacat produk).",
    level: "N1",
    examTip: "Pada kontrak borongan (請負契約), klien berhak minta perbaikan atau ganti rugi jika ada cacat ini.",
  },
  委託: {
    termJp: "委託",
    reading: "いたく",
    romaji: "itaku",
    meaningId: "Pihak pemberi pekerjaan / klien yang mempercayakan suatu proyek ke pihak luar.",
    level: "N2",
    examTip: "Lawan kata dari 受託 (jutaku / vendor pelaksana).",
  },
  受託: {
    termJp: "受託",
    reading: "じゅたく",
    romaji: "jutaku",
    meaningId: "Pihak penerima amanah pekerjaan / vendor kontraktor pelaksana proyek.",
    level: "N2",
    examTip: "Pada kontrak borongan (請負), vendor memegang hak instruksi kerja langsung (指揮命令権).",
  },
  指揮命令権: {
    termJp: "指揮命令権",
    reading: "しきめいれいけん",
    romaji: "shiki meireiken",
    meaningId: "Hak legal untuk memberikan perintah atau instruksi kerja langsung kepada staf/pekerja.",
    level: "N1",
    examTip: "Kunci pembeda: Pada 労働者派遣, klien memegang hak ini. Pada 請負, klien DILARANG memberi instruksi langsung (jika melanggar disebut 偽装請負).",
  },
  偽装請負: {
    termJp: "偽装請負",
    reading: "ぎそううけおい",
    romaji: "gisou ukeoi",
    meaningId: "Praktik ilegal menyamarkan tenaga alih daya sebagai kontrak borongan agar lepas dari regulasi perlindungan buruh.",
    level: "N1",
    examTip: "Salah satu jebakan hukum paling sering keluar di bidang Strategy & Legal.",
  },
  納品: {
    termJp: "納品",
    reading: "のうひん",
    romaji: "nouhin",
    meaningId: "Penyerahan hasil karya software/hardware selesai kepada pihak klien.",
    level: "N2",
    examTip: "Kewajiban mutlak pada kontrak borongan (請負契約).",
  },
  検収: {
    termJp: "検収",
    reading: "けんしゅう",
    romaji: "kenshuu",
    meaningId: "Proses inspeksi pemeriksaan oleh klien sebelum menerima dan menyetujui barang yang diserahkan.",
    level: "N1",
    examTip: "Titik resmi berpindahnya kepemilikan dan kewajiban pembayaran invoice.",
  },
  帰属: {
    termJp: "帰属",
    reading: "きぞく",
    romaji: "kizoku",
    meaningId: "Status kepemilikan hak hukum yang sah (misal: hak cipta milik siapa).",
    level: "N1",
    examTip: "Bila karyawan menciptakan software dinas, hak cipta otomatis帰属 ke perusahaan (職務著作).",
  },

  // --- Kosakata Inti Soal & Pembahasan Ujian (Exam Words) ---
  把握: {
    termJp: "把握",
    reading: "はあく",
    romaji: "haaku",
    meaningId: "Memahami, menguasai, atau menangkap situasi/data secara menyeluruh dan tepat.",
    level: "N2",
    examTip: "Sering muncul pada langkah awal analisis risiko (リスク把握) atau evaluasi progres proyek.",
  },
  迅速: {
    termJp: "迅速",
    reading: "迅速",
    romaji: "jinsoku",
    meaningId: "Cepat, tanggap, dan efisien tanpa bertele-tele.",
    level: "N2",
    examTip: "Sering dipakai dalam kriteria penanganan insiden darurat (迅速な復旧).",
  },
  網羅: {
    termJp: "網羅",
    reading: "もうら",
    romaji: "moura",
    meaningId: "Mencakup dan menguji seluruh bagian tanpa ada satu skenario pun yang terlewat.",
    level: "N1",
    examTip: "Kata kunci pada pengujian perangkat lunak: 網羅率 (Coverage: C0, C1, C2).",
  },
  排除: {
    termJp: "排除",
    reading: "はいじょ",
    romaji: "haijo",
    meaningId: "Menyingkirkan, membuang, atau mengeliminasi faktor penyebab masalah.",
    level: "N2",
    examTip: "Digunakan pada analisis akar masalah (根本原因の排除).",
  },
  準拠: {
    termJp: "準拠",
    reading: "じゅんきょ",
    romaji: "junkyo",
    meaningId: "Tunduk dan patuh mengikuti acuan standar baku resmi (ISO, JIS, W3C).",
    level: "N1",
    examTip: "Ciri opsi jawaban benar saat membahas kepatuhan regulasi atau arsitektur standar.",
  },
  昇順: {
    termJp: "昇順",
    reading: "しょうじゅん",
    romaji: "shoujun",
    meaningId: "Urutan menaik dari nilai terkecil ke terbesar (1 -> 9, A -> Z).",
    level: "N2",
    examTip: "Lawan kata dari 降順 (koujun / urutan menurun).",
  },
  降順: {
    termJp: "降順",
    reading: "こうじゅん",
    romaji: "koujun",
    meaningId: "Urutan menurun dari nilai terbesar ke terkecil (9 -> 1, Z -> A).",
    level: "N2",
    examTip: "Di SQL menggunakan keyword DESC, sedangkan 昇順 menggunakan ASC.",
  },
  必須: {
    termJp: "必須",
    reading: "ひっす",
    romaji: "hissu",
    meaningId: "Syarat mutlak yang wajib dipenuhi dan tidak boleh dilewati.",
    level: "N2",
    examTip: "Perhatikan kata ini pada instruksi soal: sering membedakan hal wajib vs opsional.",
  },
  異常: {
    termJp: "異常",
    reading: "いじょう",
    romaji: "ijou",
    meaningId: "Kondisi tidak wajar, cacat, anomali, atau penyimpangan dari standar.",
    level: "N2",
    examTip: "Pada database sering merujuk ke anomali transaksi (Dirty read, Phantom read).",
  },
  整合性: {
    termJp: "整合性",
    reading: "せいごうせい",
    romaji: "seigousei",
    meaningId: "Konsistensi logis dan keutuhan data agar tidak ada kontradiksi antar-tabel.",
    level: "N1",
    examTip: "Pilar 'C' dalam sifat ACID transaksi (Consistency / 一貫性・整合性).",
  },
  排他制御: {
    termJp: "排他制御",
    reading: "はいたせいぎょ",
    romaji: "haita seigyo",
    meaningId: "Mekanisme penguncian (lock) agar dua transaksi tidak merusak data yang sama di saat bersamaan.",
    level: "N1",
    examTip: "Memakai Shared Lock (共有ロック) untuk baca dan Exclusive Lock (専有ロック) untuk tulis.",
  },
  閾値: {
    termJp: "閾値",
    reading: "しきいち",
    romaji: "shikiichi",
    meaningId: "Batas nilai angka penentu pemicu alarm atau aksi otomatis (misal: CPU > 85%).",
    level: "N1",
    examTip: "Bisa dibaca 'shikiichi' atau 'ikichi'. Sangat sering keluar di manajemen operasi server.",
  },
  稼働率: {
    termJp: "稼働率",
    reading: "かどうりつ",
    romaji: "kadouritsu",
    meaningId: "Persentase ketersediaan waktu suatu sistem bekerja normal (MTBF / (MTBF + MTTR)).",
    level: "N2",
    examTip: "Rumus hitung: Sistem Paralel = 1 - (1 - R)², Sistem Seri = R₁ × R₂.",
  },
  妥当性確認: {
    termJp: "妥当性確認",
    reading: "だとうせいかくにん",
    romaji: "datousei kakunin",
    meaningId: "Validasi (Validation): Memastikan produk yang dibuat benar-benar memenuhi kebutuhan asli pengguna.",
    level: "N1",
    examTip: "Beda dengan 検証 (Verification: kesesuaian dengan dokumen spesifikasi teknis).",
  },
  是正保守: {
    termJp: "是正保守",
    reading: "ぜせいほしゅ",
    romaji: "zesei hoshu",
    meaningId: "Pemeliharaan korektif untuk memperbaiki bug/kerusakan yang ditemukan setelah sistem live.",
    level: "N1",
    examTip: "Lawan dari 予防保守 (preventif) dan 適応保守 (penyesuaian OS/lingkungan baru).",
  },
  突合: {
    termJp: "突合",
    reading: "とつごう",
    romaji: "totsugou",
    meaningId: "Pemeriksaan silang dengan membandingkan data dari dua sumber berbeda untuk memastikan kecocokannya.",
    level: "N1",
    examTip: "Istilah kunci dalam proses audit sistem informasi (システム監査).",
  },
  従属: {
    termJp: "従属",
    reading: "じゅうぞく",
    romaji: "juuzoku",
    meaningId: "Keterikatan atau ketergantungan nilai suatu kolom terhadap kolom kunci.",
    level: "N2",
    examTip: "Kunci normalisasi basis data: 完全関数従属 (lengkap), 部分関数従属 (parsial), 推移的関数従属 (transitif).",
  },
  互換: {
    termJp: "互換",
    reading: "ごかん",
    romaji: "gokan",
    meaningId: "Kompatibilitas atau kecocokan kerja sama antar versi software/hardware.",
    level: "N2",
    examTip: "上位互換 (versi baru mendukung format lama) vs 下位互換 (versi lama mengenali format baru).",
  },
  損益分岐点: {
    termJp: "損益分岐点",
    reading: "そんえきぶんきてん",
    romaji: "son'eki bunkiten",
    meaningId: "Titik impas (Break-Even Point) di mana total pendapatan persis sama dengan total biaya (laba = 0).",
    level: "N2",
    examTip: "Rumus wajib hafal: Biaya Tetap (固定費) / (1 - (Biaya Variabel (変動費) / Penjualan (売上高))).",
  },
};

import { FE_CARDS } from "@/data/fe-study-data";
import { DOKKAI_VOCAB_GLOSSARY } from "./dokkai-vocab-glossary";
import { TANGO_N3_CARDS, TangoN3Card } from "@/data/tango-n3-data";

// Fast lookup cache for Tango N3
const tangoByWord = new Map<string, TangoN3Card>();
const tangoByReading = new Map<string, TangoN3Card>();

for (const card of TANGO_N3_CARDS) {
  if (!tangoByWord.has(card.word)) {
    tangoByWord.set(card.word, card);
  }
  if (!tangoByReading.has(card.reading)) {
    tangoByReading.set(card.reading, card);
  }
}

/**
 * Looks up any Japanese kanji or vocabulary term in our integrated dictionary.
 * Priority:
 * 1. Curated Dokkai reading passage glossary (185 definitions)
 * 2. JLPT N3 Tango dataset (1,800 cards)
 * 3. Curated FE IT vocabulary glossary & 129 FE Cards
 * 4. Substring and compound match
 * 5. Clean, polite dynamic Japanese dictionary fallback
 */
export function lookupFeTerm(
  kanji: string,
  fallbackFurigana?: string,
  context: "dokkai" | "tango" | "fe" | "auto" = "auto"
): VocabEntry {
  const cleanKanji = kanji.replace(/\[|\]/g, "").trim();

  // If FE context is explicitly requested, search FE resources first
  if (context === "fe") {
    if (FE_VOCAB_GLOSSARY[cleanKanji]) {
      return {
        ...FE_VOCAB_GLOSSARY[cleanKanji],
        contextLabel: "Glosarium Kosakata FE",
      };
    }
    const matchedCard = FE_CARDS.find(
      (c) =>
        c.termJp === cleanKanji ||
        (cleanKanji.length >= 3 && c.termJp.includes(cleanKanji)) ||
        (c.termJp.length >= 3 && cleanKanji.includes(c.termJp))
    );
    if (matchedCard) {
      const reading = matchedCard.furigana || fallbackFurigana || cleanKanji;
      return {
        termJp: cleanKanji,
        reading,
        romaji: hiraganaToRomaji(reading),
        meaningId: `${matchedCard.termEn}: ${matchedCard.definitionId}`,
        level: "FE-IT",
        contextLabel: "Glosarium Kosakata FE",
        examTip: matchedCard.keyDifferentiator
          ? `Kata Kunci Ujian: ${matchedCard.keyDifferentiator.replace(/\([^)]+\)/g, "").trim()}`
          : undefined,
      };
    }
  }

  // 1. Direct match in Dokkai Curated Glossary (highest priority for reading passages)
  if (DOKKAI_VOCAB_GLOSSARY[cleanKanji]) {
    const entry = DOKKAI_VOCAB_GLOSSARY[cleanKanji];
    const reading = entry.reading || fallbackFurigana || cleanKanji;
    return {
      termJp: cleanKanji,
      reading,
      romaji: hiraganaToRomaji(reading),
      meaningId: entry.meaningId,
      level: entry.level,
      contextLabel: "Kamus Dokkai N3",
      examTip: entry.tip,
    };
  }

  // 2. Direct match in Tango N3 (1,800 official vocabulary cards)
  const matchedTango =
    tangoByWord.get(cleanKanji) ||
    (fallbackFurigana ? tangoByReading.get(fallbackFurigana) : undefined) ||
    TANGO_N3_CARDS.find(
      (c) =>
        c.word === cleanKanji ||
        (cleanKanji.length >= 2 && c.word.includes(cleanKanji)) ||
        (c.word.length >= 2 && cleanKanji.includes(c.word))
    );

  if (matchedTango) {
    const reading = matchedTango.reading || fallbackFurigana || cleanKanji;
    return {
      termJp: cleanKanji,
      reading,
      romaji: hiraganaToRomaji(reading),
      meaningId: matchedTango.meaningId,
      meaningEn: matchedTango.meaningEn,
      partOfSpeech: matchedTango.partOfSpeech,
      level: "N3",
      contextLabel: "JLPT N3 Tango",
      examTip: matchedTango.collocation
        ? `Kolokasi: ${matchedTango.collocation.jpRuby.replace(/\[([^:\]]+):([^\]]+)\]/g, "$1 ($2)")} — ${matchedTango.collocation.meaningId}`
        : matchedTango.usageNote || undefined,
      collocation: matchedTango.collocation,
      exampleSentence: matchedTango.exampleSentence,
    };
  }

  // 3. Substring match in Dokkai Curated Glossary
  for (const [key, entry] of Object.entries(DOKKAI_VOCAB_GLOSSARY)) {
    if (cleanKanji.includes(key) || (key.length >= 2 && key.includes(cleanKanji))) {
      const reading = entry.reading || fallbackFurigana || cleanKanji;
      return {
        termJp: cleanKanji,
        reading,
        romaji: hiraganaToRomaji(reading),
        meaningId: entry.meaningId,
        level: entry.level,
        contextLabel: "Kamus Dokkai N3",
        examTip: entry.tip,
      };
    }
  }

  // 4. Curated FE Study Glossary (for technical IT terms)
  if (FE_VOCAB_GLOSSARY[cleanKanji]) {
    return {
      ...FE_VOCAB_GLOSSARY[cleanKanji],
      contextLabel: "Glosarium Kosakata FE",
    };
  }

  // 5. FE Study Cards (129 cards)
  const matchedFeCard = FE_CARDS.find(
    (c) =>
      c.termJp === cleanKanji ||
      (cleanKanji.length >= 3 && c.termJp.includes(cleanKanji)) ||
      (c.termJp.length >= 3 && cleanKanji.includes(c.termJp))
  );

  if (matchedFeCard) {
    const reading = matchedFeCard.furigana || fallbackFurigana || cleanKanji;
    return {
      termJp: cleanKanji,
      reading,
      romaji: hiraganaToRomaji(reading),
      meaningId: `${matchedFeCard.termEn}: ${matchedFeCard.definitionId}`,
      level: "FE-IT",
      contextLabel: "Glosarium Kosakata FE",
      examTip: matchedFeCard.keyDifferentiator
        ? `Kata Kunci Ujian: ${matchedFeCard.keyDifferentiator.replace(/\([^)]+\)/g, "").trim()}`
        : undefined,
    };
  }

  // 6. Substring match from FE Glossary (technical terms)
  for (const [key, entry] of Object.entries(FE_VOCAB_GLOSSARY)) {
    if (cleanKanji.includes(key) || key.includes(cleanKanji)) {
      return {
        ...entry,
        termJp: cleanKanji,
        contextLabel: "Glosarium Kosakata FE",
      };
    }
  }

  // 7. Dynamic clean fallback (polite Japanese dictionary entry, NO misleading FE message!)
  const reading = fallbackFurigana || cleanKanji;
  return {
    termJp: cleanKanji,
    reading,
    romaji: hiraganaToRomaji(reading),
    meaningId: fallbackFurigana
      ? `Kosakata bahasa Jepang dibaca "${fallbackFurigana}".`
      : "Kosakata bahasa Jepang.",
    level: "N3",
    contextLabel: context === "fe" ? "Glosarium Kosakata FE" : "Kamus Kosakata Jepang",
    examTip: "Ketuk tombol suara untuk mendengarkan pelafalan audio bahasa Jepang.",
  };
}
