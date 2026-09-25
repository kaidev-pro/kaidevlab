import { FE_CARDS, FECard, FECategory } from "./fe-study-data";

export interface FEDailyDeck {
  day: number;
  category: FECategory;
  icon: string;
  titleId: string;
  titleJp: string;
  descriptionId: string;
  cardIds: string[];
}

export const FE_DAILY_DECKS: FEDailyDeck[] = [
  {
    "day": 1,
    "category": "technology",
    "icon": "Shield",
    "titleId": "Hari 01: Kriptografi, PKI & Otentikasi",
    "titleJp": "暗号技術・PKIと認証",
    "descriptionId": "Kunci Publik/Privat, Digital Signature, Hash SHA-256, CA, Salt, dan Multi-Factor Authentication.",
    "cardIds": [
      "tech-sec-01",
      "tech-sec-02",
      "tech-sec-hash",
      "tech-sec-symm",
      "tech-sec-salt",
      "tech-sec-10",
      "tech-sec-16",
      "tech-sec-07",
      "tech-sec-08",
      "tech-sec-14"
    ]
  },
  {
    "day": 2,
    "category": "technology",
    "icon": "ShieldAlert",
    "titleId": "Hari 02: Serangan Siber, Kerentanan Web & Pertahanan",
    "titleJp": "サイバー攻撃・Web脆弱性と防御システム",
    "descriptionId": "SQL Injection, XSS, WAF, IDS vs IPS, SIEM/EDR, DMZ, Man-in-the-Middle, dan Cookie/Session.",
    "cardIds": [
      "tech-sec-03",
      "tech-sec-04",
      "tech-sec-05",
      "tech-sec-06",
      "tech-sec-11",
      "tech-sec-12",
      "tech-sec-13",
      "tech-sec-15",
      "tech-net-06",
      "tech-net-arp"
    ]
  },
  {
    "day": 3,
    "category": "technology",
    "icon": "Network",
    "titleId": "Hari 03: Jaringan Komputer, Subnetting & Protokol",
    "titleJp": "ネットワーク・IPアドレス・通信プロトコル",
    "descriptionId": "Subnet Mask, DNS, OSI 7 Layer, DHCP, NAT/NAPT, VLAN, Email (SMTP/POP/IMAP), ICMP Ping, dan NTP.",
    "cardIds": [
      "tech-net-01",
      "tech-net-02",
      "tech-net-03",
      "tech-net-04",
      "tech-net-05",
      "tech-net-nat",
      "tech-net-07",
      "tech-net-08",
      "tech-net-09",
      "tech-net-10"
    ]
  },
  {
    "day": 4,
    "category": "technology",
    "icon": "Database",
    "titleId": "Hari 04: Basis Data, Transaksi ACID & Pemodelan Data",
    "titleJp": "データベース・ACID特性・データモデリング",
    "descriptionId": "ACID, Exclusive/Shared Lock, Normalisasi, SQL Join, Isolation Level, DFD, E-R Diagram, dan SDN.",
    "cardIds": [
      "tech-db-01",
      "tech-db-02",
      "tech-db-03",
      "tech-db-04",
      "tech-db-06",
      "tech-db-07",
      "tech-net-11",
      "tech-net-12",
      "tech-soft-04",
      "tech-soft-05"
    ]
  },
  {
    "day": 5,
    "category": "technology",
    "icon": "Cpu",
    "titleId": "Hari 05: Perangkat Keras, Memori & Arsitektur CPU",
    "titleJp": "コンピュータ構成・記憶階層・仮想記憶",
    "descriptionId": "SRAM vs DRAM, RAID, Pipeline, DMA, Interupsi, GPU/SIMD, Virtualisasi Mesin, Paging, dan Deadlock.",
    "cardIds": [
      "tech-hw-01",
      "tech-arch-01",
      "tech-arch-02",
      "tech-arch-05",
      "tech-arch-06",
      "tech-arch-07",
      "tech-arch-08",
      "tech-arch-09",
      "tech-os-01",
      "tech-os-02"
    ]
  },
  {
    "day": 6,
    "category": "technology",
    "icon": "Layers",
    "titleId": "Hari 06: Sistem Operasi, Rekayasa Perangkat Lunak & Algoritma Dasar",
    "titleJp": "OS・ソフトウェア工学・基本アルゴリズム",
    "descriptionId": "Semaphore, Round Robin, Design Pattern, OOP 3 Pilar, Test Coverage (C0/C1), Binary Search, dan Sorting.",
    "cardIds": [
      "tech-os-03",
      "tech-os-04",
      "tech-soft-01",
      "tech-soft-02",
      "tech-soft-03",
      "tech-algo-01",
      "tech-algo-02",
      "tech-algo-03",
      "tech-algo-04",
      "tech-algo-05"
    ]
  },
  {
    "day": 7,
    "category": "technology",
    "icon": "GitBranch",
    "titleId": "Hari 07: Struktur Data Lanjutan & Fondasi Manajemen Proyek",
    "titleJp": "応用データ構造とプロジェクトマネジメント基礎",
    "descriptionId": "Tree Traversal, Queue vs Stack, Sort Complexity, Critical Path, WBS, Gantt Chart, EVM, dan FP Method.",
    "cardIds": [
      "tech-ds-01",
      "tech-ds-02",
      "tech-ds-03",
      "mgmt-pm-01",
      "mgmt-pm-02",
      "mgmt-pm-03",
      "mgmt-pm-04",
      "mgmt-pm-05",
      "mgmt-pm-06",
      "mgmt-proj-05"
    ]
  },
  {
    "day": 8,
    "category": "management",
    "icon": "Briefcase",
    "titleId": "Hari 08: Manajemen Proyek, Layanan TI & Audit Sistem",
    "titleJp": "プロジェクト管理・ITサービスマネジメント・監査",
    "descriptionId": "Float (余裕日数), Scope Creep, SLA/SLO, Incident vs Problem Mgmt, System Audit, Scrum, Helpdesk, dan BIA/RTO.",
    "cardIds": [
      "mgmt-proj-06",
      "mgmt-proj-07",
      "mgmt-serv-01",
      "mgmt-serv-02",
      "mgmt-serv-03",
      "mgmt-serv-04",
      "mgmt-serv-05",
      "mgmt-serv-06",
      "mgmt-serv-07",
      "mgmt-audit-03"
    ]
  },
  {
    "day": 9,
    "category": "strategy",
    "icon": "TrendingUp",
    "titleId": "Hari 09: Strategi Perusahaan, Analisis Bisnis & Portofolio",
    "titleJp": "企業戦略・経営分析・ポートフォリオ",
    "descriptionId": "SWOT, BSC, Break-even Point, PPM, 3C/4P, Five Forces, SCM, SaaS/PaaS/IaaS, dan ROA/ROE.",
    "cardIds": [
      "strat-biz-01",
      "strat-biz-02",
      "strat-biz-03",
      "strat-biz-04",
      "strat-biz-05",
      "strat-biz-06",
      "strat-biz-08",
      "strat-biz-09",
      "strat-biz-12",
      "strat-biz-07"
    ]
  },
  {
    "day": 10,
    "category": "strategy",
    "icon": "Scale",
    "titleId": "Hari 10: Hukum TI, Hak Cipta, Ketenagakerjaan & Jebakan Soal",
    "titleJp": "法務・著作権・労働契約・出題トラップ",
    "descriptionId": "Kontrak Haken vs Ukeoi, Rahasia Dagang, GDPR, OSS License (GPL/MIT), Margin Profit, dan kata jebakan '不適切'.",
    "cardIds": [
      "strat-biz-10",
      "strat-legal-01",
      "strat-legal-02",
      "strat-legal-03",
      "strat-legal-04",
      "strat-legal-05",
      "strat-legal-06",
      "strat-biz-11",
      "strat-legal-07",
      "vocab-01"
    ]
  },
  {
    "day": 11,
    "category": "vocab",
    "icon": "BookOpen",
    "titleId": "Hari 11: Kanji & Istilah Kunci FE: Keamanan & Sistem",
    "titleJp": "頻出漢字・重要語彙：セキュリティとシステム基盤",
    "descriptionId": "改ざん, 否認防止, 脆弱性, 整合性, 冗長化, 閾値, 準拠, 負荷分散, 網羅, 漏えい.",
    "cardIds": [
      "vocab-02",
      "vocab-03",
      "vocab-04",
      "vocab-05",
      "vocab-06",
      "vocab-07",
      "vocab-08",
      "vocab-09",
      "vocab-10",
      "vocab-11"
    ]
  },
  {
    "day": 12,
    "category": "vocab",
    "icon": "CheckCircle2",
    "titleId": "Hari 12: Kanji & Istilah Kunci FE: Operasional & Kriptografi",
    "titleJp": "頻出漢字・重要語彙：運用管理と暗号・認証",
    "descriptionId": "破棄, 監査, 委託 vs 受託, 稼働率, 状態遷移, 偽装, 照合, 排他, 保守, 復号 vs 暗号化.",
    "cardIds": [
      "vocab-12",
      "vocab-13",
      "vocab-14",
      "vocab-15",
      "vocab-16",
      "vocab-17",
      "vocab-18",
      "vocab-19",
      "vocab-20",
      "vocab-21"
    ]
  },
  {
    "day": 13,
    "category": "vocab",
    "icon": "Sparkles",
    "titleId": "Hari 13: Kanji & Istilah Kunci FE: Arsitektur & Kualitas Software",
    "titleJp": "頻出漢字・重要語彙：アーキテクチャとソフトウェア品質",
    "descriptionId": "認証 vs 認可, 隠蔽, 逐次 vs 並行, 割り当て, 追跡性, 検証 vs 妥当性確認, 互換性, 退避 vs 復帰, 遅延.",
    "cardIds": [
      "vocab-22",
      "vocab-23",
      "vocab-24",
      "vocab-25",
      "vocab-26",
      "vocab-27",
      "vocab-28",
      "vocab-29",
      "vocab-30"
    ]
  },
  {
    "day": 14,
    "category": "technology",
    "icon": "Cpu",
    "titleId": "Hari 14: Kecerdasan Buatan (AI), Machine Learning & Deep Learning",
    "titleJp": "人工知能（AI）・機械学習・深層学習",
    "descriptionId": "Supervised, Unsupervised, Reinforcement Learning, Overfitting, Regularization, Dropout, Confusion Matrix, dan LLM/GenAI.",
    "cardIds": [
      "tech-ai-01",
      "tech-ai-02",
      "tech-ai-03",
      "tech-ai-04",
      "tech-ai-05",
      "tech-ai-06",
      "tech-ai-07",
      "tech-ai-08",
      "tech-ai-09",
      "tech-ai-10"
    ]
  },
  {
    "day": 15,
    "category": "technology",
    "icon": "Cloud",
    "titleId": "Hari 15: Cloud Computing, Virtualisasi Kontainer & Zero Trust",
    "titleJp": "クラウド・コンテナ仮想化・ゼロトラストセキュリティ",
    "descriptionId": "Zero Trust, Tanggung Jawab Bersama Cloud, Docker Container vs Hypervisor, EDR, SPF/DKIM, DNS Poisoning, dan Serverless.",
    "cardIds": [
      "tech-cloud-01",
      "tech-cloud-02",
      "tech-cloud-03",
      "tech-cloud-04",
      "tech-cloud-05",
      "tech-cloud-06",
      "tech-cloud-07",
      "tech-cloud-08",
      "tech-cloud-09",
      "tech-cloud-10"
    ]
  },
  {
    "day": 16,
    "category": "management",
    "icon": "Zap",
    "titleId": "Hari 16: Agile Scrum, Manajemen Proyek Lanjutan & DX",
    "titleJp": "アジャイル・スクラム・高度マネジメント・DX",
    "descriptionId": "Sprint Retrospective, Sprint Review, Product Backlog, Total Float, Work Package, Balanced Scorecard, Cross-SWOT, Rahasia Dagang, dan Copyleft.",
    "cardIds": [
      "mgmt-agile-01",
      "mgmt-agile-02",
      "mgmt-agile-03",
      "mgmt-agile-04",
      "mgmt-agile-05",
      "mgmt-agile-06",
      "mgmt-agile-07",
      "mgmt-agile-08",
      "mgmt-agile-09",
      "mgmt-agile-10"
    ]
  },
  {
    "day": 17,
    "category": "technology",
    "icon": "Binary",
    "titleId": "Hari 17: Sistem Bilangan, Konversi Basis & Logika Boolean",
    "titleJp": "基数変換・論理演算・数値表現",
    "descriptionId": "Biner, Heksadesimal, 2の補数, Floating Point, AND/OR/NOT/XOR, De Morgan, Bit Shift, dan Error Numerik.",
    "cardIds": [
      "calc-num-01",
      "calc-num-02",
      "calc-num-03",
      "calc-num-04",
      "calc-num-05",
      "calc-num-06",
      "calc-num-07",
      "calc-num-08",
      "calc-num-09",
      "calc-num-10"
    ]
  },
  {
    "day": 18,
    "category": "technology",
    "icon": "Gauge",
    "titleId": "Hari 18: CPU, Pipeline, Cache & Perhitungan Kinerja Sistem",
    "titleJp": "CPU・パイプライン・キャッシュ・性能計算",
    "descriptionId": "MIPS, Pipeline Processing, Cache Hit Rate, CISC vs RISC, MTBF/MTTR, Reliability, Throughput, dan Queuing Theory.",
    "cardIds": [
      "calc-perf-01",
      "calc-perf-02",
      "calc-perf-03",
      "calc-perf-04",
      "calc-perf-05",
      "calc-perf-06",
      "calc-perf-07",
      "calc-perf-08",
      "calc-perf-09",
      "calc-perf-10"
    ]
  },
  {
    "day": 19,
    "category": "technology",
    "icon": "Workflow",
    "titleId": "Hari 19: UML, Design Pattern & Software Testing",
    "titleJp": "UML・デザインパターン・ソフトウェアテスト",
    "descriptionId": "UML Overview, Class Diagram, Use Case, Sequence, State Transition, Coupling, Cohesion, White Box Testing, GoF Pattern, dan Refactoring.",
    "cardIds": [
      "sw-eng-01",
      "sw-eng-02",
      "sw-eng-03",
      "sw-eng-04",
      "sw-eng-05",
      "sw-eng-06",
      "sw-eng-07",
      "sw-eng-08",
      "sw-eng-09",
      "sw-eng-10"
    ]
  },
  {
    "day": 20,
    "category": "strategy",
    "icon": "Building2",
    "titleId": "Hari 20: Bisnis Digital, Keuangan & Hukum IT Lanjutan",
    "titleJp": "ビジネスシステム・企業法務・経営戦略",
    "descriptionId": "SFA, SCM, CRM, ERP, EDI, Enterprise Architecture, BPR, 個人情報保護法, 派遣 vs 請負, dan Linear Programming.",
    "cardIds": [
      "biz-term-01",
      "biz-term-02",
      "biz-term-03",
      "biz-term-04",
      "biz-term-05",
      "biz-term-06",
      "biz-term-07",
      "biz-term-08",
      "biz-term-09",
      "biz-term-10"
    ]
  }
];

export function getCardsForDay(day: number): FECard[] {
  const deck = FE_DAILY_DECKS.find(d => d.day === day);
  if (!deck) return [];
  const cardMap = new Map(FE_CARDS.map(c => [c.id, c]));
  return deck.cardIds.map(id => cardMap.get(id)).filter((c): c is FECard => Boolean(c));
}
