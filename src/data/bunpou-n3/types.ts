export type BunpouCategory =
  | "time"        // 時間・時の関係 (Waktu & Urutan Kejadian)
  | "cause"       // 原因・理由 (Sebab, Alasan & Akibat)
  | "condition"   // 条件・仮定 (Syarat & Pengandaian)
  | "contrast"    // 逆接・対比 (Kontras & Perlawanan)
  | "degree"      // 程度・比較 (Derajat, Batasan & Komparasi)
  | "limitation"  // 限定・非限定・付加 (Pengecualian & Tambahan)
  | "judgment"    // 主張・評価・判断 (Pertimbangan, Penilaian & Sudut Pandang)
  | "change"      // 進行・変化 (Perkembangan & Perubahan Keadaan)
  | "emotion";    // 感情・感覚 (Perasaan, Spontanitas & Nuansa Hati)

export interface BunpouExample {
  id: string;
  textJp: string;
  ruby: string; // Bracket format: [日本語:にほんご]
  textId: string;
  contextNote?: string; // Nuansa kontekstual spesifik pada kalimat ini
}

export interface BunpouComparison {
  targetPattern: string;
  summary: string;
  distinctionId: string;
}

export interface BunpouQuestion {
  id: string;
  type: "cloze" | "seiretsu"; // cloze = Pilihan Ganda Sambungan/Partikel; seiretsu = Susun Kalimat Bintang ★ (1 2 ★ 4)
  questionNumber: number;
  questionJp: string;
  questionRuby?: string;
  questionTranslation: string;
  // For cloze:
  options?: {
    key: "1" | "2" | "3" | "4";
    textJp: string;
    textId: string;
  }[];
  correctKey?: "1" | "2" | "3" | "4";
  // For seiretsu (Urut Kalimat Bintang):
  items?: string[]; // 4 potongan kalimat
  correctOrder?: number[]; // urutan indeks 0-3 yang benar, misal [2, 0, 3, 1]
  starPosition?: number; // posisi bintang (1-indexed: 1, 2, 3, atau 4; default 3)
  explanation: string;
}

export interface BunpouItem {
  id: string;
  chapterNumber: number;
  chapterTitle: string;
  category: BunpouCategory;
  categoryLabel: string;
  patternJp: string;
  patternKana: string;
  meaningId: string;
  connection: string; // 接続 (Setsuzoku), cth: "動詞辞書形 / V-ている / V-ない形 + うちに"
  coreConcept: string; // Konsep inti dan kapan digunakan
  cautionNote?: string; // Hal yang dilarang atau jebakan sering keluar di ujian
  examples: BunpouExample[];
  comparisons?: BunpouComparison[];
  questions: BunpouQuestion[];
}
