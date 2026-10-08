"use client";

import { FECategory } from "./fe-study-data";

export interface FEDailyQuest {
  day: number;
  week: number;
  category: FECategory;
  titleId: string;
  titleJp: string;
  themeTag: string;
  durationMinutes: number;
  descriptionId: string;
  cardIds: string[]; // 4-5 Concept Cards
  tracerAlgoId?: string; // Links to FE_TRACER_ALGORITHMS
  quizQuestionIds: string[]; // 4-5 Questions from FE_QUIZ_QUESTIONS
  isBossFight?: boolean;
}

export const FE_DAILY_QUESTS: FEDailyQuest[] = [
  // =========================================================================
  // WEEK 1: SECURITY, NETWORKING, DATA STRUCTURES & ALGORITHMS
  // =========================================================================
  {
    day: 1,
    week: 1,
    category: "technology",
    titleId: "Hari 01: Kriptografi Kunci Publik, PKI & Otentikasi",
    titleJp: "暗号技術・PKIと認証システム",
    themeTag: "🔐 Security & PKI",
    durationMinutes: 20,
    descriptionId: "Kuasai mekanisme Kunci Publik/Privat, Digital Signature integritas data, Hash SHA-256, CA, dan Otentikasi Multi-Faktor (MFA).",
    cardIds: [
      "tech-sec-01",
      "tech-sec-02",
      "tech-sec-hash",
      "tech-sec-salt",
      "tech-sec-10",
      "tech-sec-07",
    ],
    tracerAlgoId: "algo-binary-search",
    quizQuestionIds: [
      "quiz-tech-01",
      "quiz-tech-02",
      "quiz-tech-03",
      "quiz-tech-04",
    ],
  },
  {
    day: 2,
    week: 1,
    category: "technology",
    titleId: "Hari 02: Serangan Siber, Kerentanan Web & Pertahanan (WAF/DMZ)",
    titleJp: "サイバー攻撃・Web脆弱性と防御システム",
    themeTag: "🛡️ Cyber Defense",
    durationMinutes: 20,
    descriptionId: "Pahami anatomi serangan SQL Injection, Cross-Site Scripting (XSS), peran Web Application Firewall (WAF), IDS vs IPS, dan zona DMZ.",
    cardIds: [
      "tech-sec-03",
      "tech-sec-04",
      "tech-sec-05",
      "tech-sec-06",
      "tech-sec-11",
      "tech-sec-12",
    ],
    tracerAlgoId: "algo-binary-search",
    quizQuestionIds: [
      "quiz-tech-05",
      "quiz-tech-06",
      "quiz-tech-07",
      "quiz-tech-08",
    ],
  },
  {
    day: 3,
    week: 1,
    category: "technology",
    titleId: "Hari 03: Jaringan Komputer, Subnetting & Protokol OSI Layer",
    titleJp: "ネットワーク・IPアドレス・通信プロトコル",
    themeTag: "🌐 Network & Protocols",
    durationMinutes: 20,
    descriptionId: "Pelajari pembagian IP subnet mask, alur resolusi DNS domain, translasi NAT/NAPT, dan pembagian fungsi 7 Lapisan OSI.",
    cardIds: [
      "tech-net-01",
      "tech-net-02",
      "tech-net-03",
      "tech-net-04",
      "tech-net-05",
      "tech-net-06",
    ],
    tracerAlgoId: "algo-binary-search",
    quizQuestionIds: [
      "quiz-tech-09",
      "quiz-tech-10",
      "quiz-tech-11",
      "quiz-tech-12",
    ],
  },
  {
    day: 4,
    week: 1,
    category: "technology",
    titleId: "Hari 04: Basis Data, Normalisasi Tabel & Transaksi ACID",
    titleJp: "データベース・正規化とトランザクションACID",
    themeTag: "🗄️ Database & SQL",
    durationMinutes: 20,
    descriptionId: "Pahami perancangan ER diagram, dekomposisi tabel ke Bentuk Normal Ketiga (3NF), serta 4 pilar transaksi (Atomicity, Consistency, Isolation, Durability).",
    cardIds: [
      "tech-db-01",
      "tech-db-02",
      "tech-db-03",
      "tech-db-04",
      "tech-db-05",
    ],
    tracerAlgoId: "algo-binary-search",
    quizQuestionIds: [
      "quiz-tech-13",
      "quiz-tech-14",
      "quiz-tech-15",
      "quiz-tech-16",
    ],
  },
  {
    day: 5,
    week: 1,
    category: "technology",
    titleId: "Hari 05: Struktur Data (Stack, Queue, Tree) & Kompleksitas O-Notation",
    titleJp: "データ構造と計算量（O記法）",
    themeTag: "⚙️ Data Structures",
    durationMinutes: 20,
    descriptionId: "Kuasai operasi LIFO pada Stack, FIFO pada Queue, pohon biner (Binary Tree), dan perhitungan kompleksitas waktu O(log n) vs O(n).",
    cardIds: [
      "tech-ds-01",
      "tech-ds-02",
      "tech-ds-03",
      "tech-ds-04",
    ],
    tracerAlgoId: "algo-binary-search",
    quizQuestionIds: [
      "quiz-tech-17",
      "quiz-tech-18",
      "quiz-tech-19",
      "quiz-tech-20",
    ],
  },
  {
    day: 6,
    week: 1,
    category: "management",
    titleId: "Hari 06: Metodologi Agile Scrum & Pengujian Perangkat Lunak",
    titleJp: "ソフトウェア開発・アジャイルとテスト手法",
    themeTag: "🚀 Dev & QA Testing",
    durationMinutes: 20,
    descriptionId: "Pahami perbedaan siklus Waterfall vs Agile Scrum, pengujian White-box (coverage) vs Black-box (nilai batas / boundary value analysis).",
    cardIds: [
      "tech-dev-01",
      "tech-dev-02",
      "tech-dev-03",
      "tech-dev-04",
    ],
    tracerAlgoId: "algo-binary-search",
    quizQuestionIds: [
      "quiz-tech-21",
      "quiz-tech-22",
      "quiz-tech-23",
      "quiz-tech-24",
    ],
  },
  {
    day: 7,
    week: 1,
    category: "technology",
    titleId: "Hari 07: 🏆 WEEK 1 CBT SIMULATOR BOSS FIGHT",
    titleJp: "第1週 総復習 CBT模擬テスト",
    themeTag: "🏆 Boss Fight Exam",
    durationMinutes: 25,
    isBossFight: true,
    descriptionId: "Simulasi evaluasi mini-ujian CBT berwaktu menguji 15 soal campuran dari materi Keamanan, Jaringan, Basis Data, dan Struktur Data.",
    cardIds: [
      "tech-sec-01",
      "tech-sec-03",
      "tech-net-01",
      "tech-db-02",
      "tech-ds-01",
    ],
    tracerAlgoId: "algo-binary-search",
    quizQuestionIds: [
      "quiz-tech-01",
      "quiz-tech-03",
      "quiz-tech-05",
      "quiz-tech-07",
      "quiz-tech-09",
      "quiz-tech-11",
      "quiz-tech-13",
      "quiz-tech-15",
      "quiz-tech-17",
      "quiz-tech-19",
    ],
  },
];
