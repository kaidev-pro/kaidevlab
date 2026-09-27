export type TangoPartOfSpeech =
  | "[名]"           // Noun (名詞)
  | "[名・ナ形]"      // Noun & na-Adjective
  | "[名・副]"        // Noun & Adverb
  | "[動Ⅰ 自]"       // Verb Group 1 Intransitive (自動詞)
  | "[動Ⅰ 他]"       // Verb Group 1 Transitive (他動詞)
  | "[動Ⅰ 自・他]"    // Verb Group 1 Transitive/Intransitive
  | "[動Ⅱ 自]"       // Verb Group 2 Intransitive
  | "[動Ⅱ 他]"       // Verb Group 2 Transitive
  | "[動Ⅱ 自・他]"    // Verb Group 2 Transitive/Intransitive
  | "[動Ⅲ 自]"       // Verb Group 3 (する) Intransitive
  | "[動Ⅲ 他]"       // Verb Group 3 (する) Transitive
  | "[動Ⅲ 自・他]"    // Verb Group 3 (する) Transitive/Intransitive
  | "[イ形]"         // i-Adjective
  | "[ナ形]"         // na-Adjective
  | "[ナ形・副]"      // na-Adjective & Adverb
  | "[副]"           // Adverb (副詞)
  | "[副・ナ形]"      // Adverb & na-Adjective
  | "[副・名]"        // Adverb & Noun
  | "[副・自名]"      // Adverb & Intransitive Noun
  | "[連体]"         // Pre-noun Adjectival (連体詞)
  | "[連語]"         // Collocation / Idiom / Phrase
  | "[接頭辞]"       // Prefix
  | "[接尾辞]"       // Suffix
  | "[接続詞]";      // Conjunction

export interface TangoReference {
  type: "synonym" | "antonym" | "related" | "derivative";
  label: "類" | "対" | "関" | "派";
  word: string;
  reading: string;
  ruby?: string;
  meaningId: string;
}

export interface TangoN3Card {
  id: string;               // e.g. "tango-0001"
  bookNumber: number;       // Nomor entri resmi di buku edisi 2021 (1 - 1800)
  part: string;             // e.g. "名詞 (Kata Benda)"
  partId: "noun" | "verb" | "adj" | "idiom" | "affix";
  chapter: string;          // e.g. "名詞 一般1"
  chapterId: string;        // e.g. "noun-general-1"
  section: string;          // e.g. "第1回 (1〜39)"
  sectionId: string;        // e.g. "sec-1-39"
  
  // Kata & Bacaan
  word: string;             // Kanji / Kana utama
  reading: string;          // Hiragana lengkap
  ruby: string;             // Format [漢字:かんじ]
  partOfSpeech: TangoPartOfSpeech;
  
  // Arti
  meaningId: string;        // Bahasa Indonesia presisi
  meaningEn: string;        // English translation
  
  // Ciri khas Shin Kanzen Master: Kolokasi / Pasangan Kata (連語)
  collocation?: {
    jpRuby: string;         // e.g. "[家族:かぞく]への[愛:あい]"
    meaningId: string;      // e.g. "cinta kepada keluarga"
  };
  
  // Kalimat Contoh Resmi Shin Kanzen Master (例文)
  exampleSentence: {
    jpRuby: string;         // Kalimat dengan ruby furigana
    meaningId: string;      // Terjemahan kalimat ke bahasa Indonesia
  };
  
  // Referensi kata terkait di buku (類 / 対 / 関 / 派)
  references?: TangoReference[];
  
  // Catatan tips penggunaan khas Shin Kanzen Master
  usageNote?: string;
}
