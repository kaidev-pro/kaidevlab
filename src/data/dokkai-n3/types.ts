export type DokkaiCategory =
  | "technique"     // 基礎編: Teknik Analisis Struktur Kalimat (Kata Tunjuk, Subjek Hilang, dll)
  | "short"         // 実践編: 短文読解 (Teks Pendek 150-200 karakter)
  | "medium"        // 実践編: 中文読解 (Teks Menengah 350-450 karakter)
  | "long"          // 実践編: 長文読解 (Teks Panjang 600-800 karakter)
  | "info_search";  // 実践編: 情報検索 (Pencarian Informasi Tabel/Iklan/Pengumuman)

export interface DokkaiOption {
  key: "1" | "2" | "3" | "4";
  textJp: string;
  textId: string;
  explanation: string;
  isCorrect: boolean;
}

export interface DokkaiQuestion {
  id: string;
  questionNumber: number;
  questionJp: string;
  questionTranslation: string;
  options: DokkaiOption[];
  clueSentenceIndex?: number; // Indeks kalimat dalam paragraf yang membuktikan jawaban
  techniqueTip?: string;      // Tips cara eliminasi jebakan pada soal ini
}

export interface DokkaiSentence {
  id: string;
  textJp: string;
  textId: string;
  ruby?: string; // Curated bracket ruby specifically targeting N3/N2 difficult vocabulary
  isKeySentence?: boolean; // Kalimat inti / opini penulis
}

export interface DokkaiPassage {
  id: string;
  chapterNumber: number;
  category: DokkaiCategory;
  categoryLabel: string;
  titleJp: string;
  titleId: string;
  techniqueTag: string; // Misal: "指示語の把握", "省略された主語", "逆接の後の主張"
  techniqueDescription: string;
  sentences: DokkaiSentence[];
  passageTranslation: string;
  vocabulary: {
    termJp: string;
    furigana: string;
    meaningId: string;
    level: "N5" | "N4" | "N3" | "N2" | "N1" | "FE-IT";
  }[];
  questions: DokkaiQuestion[];
}
