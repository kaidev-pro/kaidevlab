export interface QuizOption {
  key: "ア" | "イ" | "ウ" | "エ";
  textJp: string;
  textEnId?: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  year: string;
  category: "technology" | "management" | "strategy";
  subCategory: string;
  questionJp: string;
  questionTranslation: string;
  options: QuizOption[];
  correctKey: "ア" | "イ" | "ウ" | "エ";
  summaryExplanation: string;
  keyTakeaway: string;
}

export const FE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "quiz-tech-01",
    year: "令和5年 過去問",
    category: "technology",
    subCategory: "Information Security",
    questionJp:
      "公開鍵暗号方式を用いてメッセージを送受信する場合、送信者がメッセージを暗号化するために使用する鍵と、受信者がそれを復号するために使用する鍵の適切な組合せはどれか。",
    questionTranslation:
      "Saat mengirim pesan menggunakan Kriptografi Kunci Publik, kombinasi kunci mana yang tepat yang digunakan pengirim untuk mengenkripsi dan penerima untuk mendekripsi?",
    options: [
      {
        key: "ア",
        textJp: "暗号化：送信者の公開鍵 ／ 復号：送信者の秘密鍵",
        textEnId: "Enkripsi: Kunci publik pengirim / Dekripsi: Kunci privat pengirim",
        explanation: "Salah. Jika dienkripsi dengan kunci publik pengirim, penerima tidak memiliki kunci privat pengirim sehingga tidak bisa membacanya.",
      },
      {
        key: "イ",
        textJp: "暗号化：受信者の公開鍵 ／ 復号：受信者の秘密鍵",
        textEnId: "Enkripsi: Kunci publik penerima / Dekripsi: Kunci privat penerima",
        explanation: "Benar! Siapa pun dapat mengenkripsi pesan menggunakan kunci publik penerima, tetapi hanya penerima yang memegang kunci privat rahasia untuk membukanya.",
      },
      {
        key: "ウ",
        textJp: "暗号化：送信者の秘密鍵 ／ 復号：受信者の公開鍵",
        textEnId: "Enkripsi: Kunci privat pengirim / Dekripsi: Kunci publik penerima",
        explanation: "Salah. Ini adalah mekanisme yang salah; enkripsi pesan rahasia tidak pernah didekripsi dengan kunci publik penerima.",
      },
      {
        key: "エ",
        textJp: "暗号化：受信者の秘密鍵 ／ 復号：送信者の公開鍵",
        textEnId: "Enkripsi: Kunci privat penerima / Dekripsi: Kunci publik pengirim",
        explanation: "Salah. Pengirim tidak mungkin memiliki akses ke kunci privat penerima (karena bersifat rahasia bagi penerima saja).",
      },
    ],
    correctKey: "イ",
    summaryExplanation:
      "Pada enkripsi kunci publik: Pengirim mengunci pesan dengan KUNCI PUBLIK PENERIMA (受信者の公開鍵), dan penerima membukanya dengan KUNCI PRIVAT MILIKNYA SENDIRI (受信者の秘密鍵). Sebaliknya, jika enkripsi dilakukan dengan kunci privat pengirim, tujuannya adalah Tanda Tangan Digital (ディジタル署名).",
    keyTakeaway: "Pesan Rahasia = Kunci Publik Penerima. Tanda Tangan = Kunci Privat Pengirim.",
  },
  {
    id: "quiz-tech-02",
    year: "令和4年 過去問",
    category: "technology",
    subCategory: "Database",
    questionJp:
      "関係データベースのトランザクション処理において、ACID特性の『原子性（Atomicity）』を保証するために用いられる機能はどれか。",
    questionTranslation:
      "Dalam pemrosesan transaksi basis data relasional, fitur mana yang digunakan untuk menjamin karakteristik ACID 'Atomicity'?",
    options: [
      {
        key: "ア",
        textJp: "コミットとロールバック",
        textEnId: "Commit and Rollback",
        explanation: "Benar! Atomicity mensyaratkan prinsip all-or-nothing (selesai semua via Commit, atau batal tanpa sisa via Rollback).",
      },
      {
        key: "イ",
        textJp: "2相ロック（ツーフェーズロック）",
        textEnId: "Two-Phase Locking",
        explanation: "Salah. 2-Phase Locking digunakan untuk menjamin karakteristik 'Isolation' (隔離性) saat transaksi berjalan bersamaan.",
      },
      {
        key: "ウ",
        textJp: "チェックポイント",
        textEnId: "Checkpointing",
        explanation: "Salah. Checkpoint digunakan untuk pemulihan kegagalan (Durability/Consistency), bukan mekanisme all-or-nothing transaksi.",
      },
      {
        key: "エ",
        textJp: "ログ（ジャーナル）の二重化",
        textEnId: "Duplexing Log Files",
        explanation: "Salah. Ini adalah teknik keandalan media penyimpanan untuk menjamin 'Durability' (永続性).",
      },
    ],
    correctKey: "ア",
    summaryExplanation:
      "Atomicity (原子性) berarti seluruh rangkaian transaksi harus berhasil sepenuhnya (Commit) atau tidak dieksekusi sama sekali (Rollback jika terjadi galat).",
    keyTakeaway: "Atomicity = All-or-Nothing via Rollback / Commit.",
  },
  {
    id: "quiz-tech-03",
    year: "令和4年 過去問",
    category: "technology",
    subCategory: "Network",
    questionJp:
      "IPv4ネットワークにおいて、サブネットマスクが 255.255.255.240 のとき、1つのサブネット内でコンピュータ（ホスト）に割り当て可能なIPアドレスの最大数はいくつあるか。",
    questionTranslation:
      "Pada jaringan IPv4 dengan subnet mask 255.255.255.240 (/28), berapa jumlah maksimum alamat IP yang dapat dialokasikan ke komputer host dalam 1 subnet?",
    options: [
      {
        key: "ア",
        textJp: "14",
        textEnId: "14 Alamat Host",
        explanation: "Benar! 240 dalam biner adalah 11110000 (ada 4 bit host). Total alamat = 2^4 = 16. Dikurangi 2 (Network Address & Broadcast Address) = 14.",
      },
      {
        key: "イ",
        textJp: "16",
        textEnId: "16 Alamat",
        explanation: "Salah. 16 adalah total seluruh alamat, tetapi 2 alamat wajib dicadangkan untuk Network Address (semua bit 0) dan Broadcast Address (semua bit 1).",
      },
      {
        key: "ウ",
        textJp: "30",
        textEnId: "30 Alamat",
        explanation: "Salah. 30 alamat host diperoleh jika subnet mask adalah 255.255.255.224 (/27).",
      },
      {
        key: "エ",
        textJp: "62",
        textEnId: "62 Alamat",
        explanation: "Salah. 62 alamat host diperoleh jika subnet mask adalah 255.255.255.192 (/26).",
      },
    ],
    correctKey: "ア",
    summaryExplanation:
      "Rumus Alamat Host Tersedia = (2^n) - 2, di mana n adalah jumlah bit host bernilai 0 pada subnet mask. Nilai 240 = 1111 0000 (4 bit nol). Maka (2^4) - 2 = 16 - 2 = 14 host.",
    keyTakeaway: "Host = 2^n - 2 (selalu kurangi 2 untuk Network & Broadcast).",
  },
  {
    id: "quiz-mgmt-01",
    year: "令和5年 過去問",
    category: "management",
    subCategory: "Project Management",
    questionJp:
      "プロジェクトマネジメントにおいて、アローダイアグラム（PERT）で作業の最早開始日と最遅開始日が一致する結合点を結ぶ経路は何と呼ばれるか。",
    questionTranslation:
      "Dalam manajemen proyek diagram panah (PERT), jalur yang menghubungkan titik-titik di mana tanggal mulai paling awal sama persis dengan tanggal mulai paling lambat disebut apa?",
    options: [
      {
        key: "ア",
        textJp: "クリティカルパス",
        textEnId: "Critical Path (Jalur Kritis)",
        explanation: "Benar! Jalur ini memiliki kelonggaran waktu nol (余裕日数 = 0). Keterlambatan di jalur ini langsung menunda proyek secara keseluruhan.",
      },
      {
        key: "イ",
        textJp: "ダミー作業",
        textEnId: "Dummy Activity",
        explanation: "Salah. Dummy activity adalah garis putus-putus berdurasi 0 hari yang hanya dipakai untuk menunjukkan ketergantungan urutan.",
      },
      {
        key: "ウ",
        textJp: "トローリング",
        textEnId: "Trolling / Fast Tracking",
        explanation: "Salah. Ini bukan istilah jalur PERT melainkan teknik kompresi jadwal.",
      },
      {
        key: "エ",
        textJp: "スラックパス",
        textEnId: "Slack Path",
        explanation: "Salah. Slack adalah kelonggaran waktu (余裕時間), yang bernilai 0 pada jalur kritis.",
      },
    ],
    correctKey: "ア",
    summaryExplanation:
      "Critical Path adalah jalur dengan durasi total terpanjang dalam proyek. Ciri khasnya: Earliest Start Date = Latest Start Date (tidak ada toleransi molor / 余裕日数なし).",
    keyTakeaway: "Earliest = Latest Date → Critical Path (0 hari toleransi).",
  },
  {
    id: "quiz-tech-04",
    year: "令和5年 過去問",
    category: "technology",
    subCategory: "Computer Architecture",
    questionJp:
      "キャッシュメモリのアクセス時間が 10 ナノ秒、主記憶のアクセス時間が 60 ナノ秒であるコンピュータにおいて、キャッシュメモリのヒット率が 80% のとき、実効アクセス時間は何ナノ秒か。",
    questionTranslation:
      "Pada komputer dengan waktu akses cache memory 10 ns dan memori utama 60 ns, jika hit ratio cache adalah 80% (0.8), berapakah waktu akses efektifnya (実効アクセス時間)?",
    options: [
      {
        key: "ア",
        textJp: "18 ナノ秒",
        textEnId: "18 ns",
        explanation: "Salah. Perhitungan tidak cocok dengan bobot hit ratio.",
      },
      {
        key: "イ",
        textJp: "20 ナノ秒",
        textEnId: "20 ns",
        explanation: "Benar! T = (0.8 × 10 ns) + ((1 - 0.8) × 60 ns) = 8 ns + 12 ns = 20 ns.",
      },
      {
        key: "ウ",
        textJp: "24 ナノ秒",
        textEnId: "24 ns",
        explanation: "Salah. Hasil jika hit ratio 70% atau kesalahan perhitungan pembobotan.",
      },
      {
        key: "エ",
        textJp: "50 ナノ秒",
        textEnId: "50 ns",
        explanation: "Salah. 50 ns terjadi jika cache miss sangat tinggi (80% miss).",
      },
    ],
    correctKey: "イ",
    summaryExplanation:
      "Rumus Waktu Akses Efektif (実効アクセス時間): T = (Hit Ratio × Waktu Cache) + ((1 - Hit Ratio) × Waktu Memori Utama). Maka T = (0.8 × 10) + (0.2 × 60) = 8 + 12 = 20 ns.",
    keyTakeaway: "T = (h × Tcache) + ((1 - h) × Tmain)",
  },
  {
    id: "quiz-tech-05",
    year: "令和4年 過去問",
    category: "technology",
    subCategory: "Operating Systems",
    questionJp:
      "タスクの処理方式に関する記述のうち、ラウンドロビン方式（Round Robin）の説明として適切なものはどれか。",
    questionTranslation:
      "Manakah dari pernyataan berikut yang merupakan penjelasan tepat mengenai metode Round Robin pada penjadwalan proses OS?",
    options: [
      {
        key: "ア",
        textJp: "各タスクに実行優先度を設定し、常に最も優先度の高いタスクから順に処理する。",
        textEnId: "Menetapkan prioritas setiap proses dan selalu memproses prioritas tertinggi terlebih dahulu.",
        explanation: "Salah. Ini adalah skema 'Priority Scheduling' (優先度順方式).",
      },
      {
        key: "イ",
        textJp: "各タスクに一定の時間枠（タイムクウォンタム）を割り当て、割り当て時間が経過したら次のタスクへ切り替える。",
        textEnId: "Mengalokasikan batas waktu tetap (time quantum) untuk tiap proses, dan beralih ke proses berikutnya saat batas waktu habis.",
        explanation: "Benar! Round Robin membagi waktu CPU secara adil menggunakan jatah waktu (タイムシェアリング / タイムクウォンタム) bergilir.",
      },
      {
        key: "ウ",
        textJp: "タスクの予想実行時間が短いものから優先してCPUを割り当てる。",
        textEnId: "Memprioritaskan proses dengan perkiraan waktu eksekusi paling pendek.",
        explanation: "Salah. Ini adalah 'Shortest Job First' (処理時間順方式).",
      },
      {
        key: "エ",
        textJp: "タスクが発生した順番にCPUを割り当て、終了するまで切り替えない。",
        textEnId: "Mengalokasikan CPU berdasarkan urutan datang dan tidak berpindah sampai proses tuntas.",
        explanation: "Salah. Ini adalah skema 'First-Come, First-Served' (FCFS / 先着順方式 non-preemptive).",
      },
    ],
    correctKey: "イ",
    summaryExplanation:
      "Round Robin (ラウンドロビン方式) adalah algoritma preemptive time-sharing di mana setiap proses menerima slot waktu CPU yang sama (タイムクウォンタム). Jika tugas belum selesai saat waktunya habis, ia kembali ke antrean akhir.",
    keyTakeaway: "Round Robin = Jatah waktu giliran yang sama (タイムクウォンタム).",
  },
  {
    id: "quiz-tech-06",
    year: "令和4年 過去問",
    category: "technology",
    subCategory: "Database",
    questionJp:
      "関係代数演算のうち、ある表から特定の属性（列）だけを取り出して新しい表を作る演算はどれか。",
    questionTranslation:
      "Dalam aljabar relasional, operasi mana yang mengekstrak atribut tertentu (kolom tertentu) dari sebuah tabel untuk membentuk tabel baru?",
    options: [
      {
        key: "ア",
        textJp: "選択（Selection）",
        textEnId: "Selection (選択)",
        explanation: "Salah. Selection (選択) mengambil baris (tuples/records) yang memenuhi kriteria kondisi WHERE, bukan kolom.",
      },
      {
        key: "イ",
        textJp: "射影（Projection）",
        textEnId: "Projection (射影)",
        explanation: "Benar! Projection (射影) mengambil kolom (attributes) tertentu dari tabel, setara dengan klausa 'SELECT col1, col2' dalam SQL.",
      },
      {
        key: "ウ",
        textJp: "結合（Join）",
        textEnId: "Join (結合)",
        explanation: "Salah. Join menggabungkan dua tabel berdasarkan kolom kunci relasi yang sama.",
      },
      {
        key: "エ",
        textJp: "直積（Cartesian Product）",
        textEnId: "Cartesian Product (直積)",
        explanation: "Salah. Cartesian Product mengalikan seluruh baris tabel A dengan tabel B tanpa kondisi filter.",
      },
    ],
    correctKey: "イ",
    summaryExplanation:
      "Dalam Aljabar Relasional: 射影 (Projection) = Mengambil KOLOM (vertikal). 選択 (Selection) = Mengambil BARIS (horizontal). 結合 (Join) = Menggabungkan dua tabel berdasar relasi.",
    keyTakeaway: "Kolom = 射影 (Projection). Baris = 選択 (Selection).",
  },
  {
    id: "quiz-tech-07",
    year: "令和3年 過去問",
    category: "technology",
    subCategory: "Hardware & Storage",
    questionJp:
      "RAIDの構成のうち、データおよびパリティ（誤り訂正情報）を複数の磁気ディスクに分散して記録し、1台のディスク故障時でも稼働を継続できる方式はどれか。",
    questionTranslation:
      "Di antara konfigurasi RAID berikut, manakah yang mendistribusikan data dan informasi paritas ke beberapa disk sekaligus, sehingga sistem tetap beroperasi normal meski 1 drive rusak?",
    options: [
      {
        key: "ア",
        textJp: "RAID 0",
        textEnId: "RAID 0 (Striping)",
        explanation: "Salah. RAID 0 hanya melakukan striping tanpa redundansi. Jika 1 disk mati, seluruh data langsung lenyap.",
      },
      {
        key: "イ",
        textJp: "RAID 1",
        textEnId: "RAID 1 (Mirroring)",
        explanation: "Salah. RAID 1 menduplikasi (mirror) data identik ke dua disk tanpa perhitungan paritas.",
      },
      {
        key: "ウ",
        textJp: "RAID 5",
        textEnId: "RAID 5 (Distributed Parity)",
        explanation: "Benar! RAID 5 membagi data dan paritas secara terdistribusi di minimal 3 disk. Dapat menoleransi kerusakan 1 disk.",
      },
      {
        key: "エ",
        textJp: "RAID 6",
        textEnId: "RAID 6 (Dual Distributed Parity)",
        explanation: "Salah. RAID 6 mendistribusikan DUA blok paritas (dual parity) dan tahan jika 2 disk rusak sekaligus (memerlukan minimal 4 disk).",
      },
    ],
    correctKey: "ウ",
    summaryExplanation:
      "RAID 5 mendistribusikan paritas ke semua disk (パリティ分散配置) dengan minimal 3 drive, mampu menoleransi 1 drive fail. RAID 6 memiliki dual parity dan tahan 2 drive fail.",
    keyTakeaway: "RAID 0: Striping cepat tanpa proteksi. RAID 1: Mirroring. RAID 5: Paritas tersebar (min 3 disk).",
  },
  {
    id: "quiz-tech-08",
    year: "令和5年 過去問",
    category: "technology",
    subCategory: "Web Security",
    questionJp:
      "Webアプリケーションにおいて、利用者がログイン中の正規セッションを悪用され、攻撃者の意図するリクエスト（パスワード変更や送金など）をサーバに送信させられてしまう攻撃手法はどれか。",
    questionTranslation:
      "Dalam aplikasi web, teknik serangan di mana sesi login pengguna sah dieksploitasi untuk mengirimkan permintaan yang diinginkan penyerang (seperti ubah password atau transfer dana) ke server disebut apa?",
    options: [
      {
        key: "ア",
        textJp: "クロスサイトリクエストフォージェリ（CSRF）",
        textEnId: "Cross-Site Request Forgery (CSRF)",
        explanation: "Benar! CSRF memalsukan request atas nama korban yang sedang aktif login dengan memanfaatkan kredensial cookie sesi yang tersimpan di browser.",
      },
      {
        key: "イ",
        textJp: "クロスサイトスクリプティング（XSS）",
        textEnId: "Cross-Site Scripting (XSS)",
        explanation: "Salah. XSS menyuntikkan script jahat (JavaScript) ke halaman web agar dieksekusi di browser korban untuk mencuri token/cookie.",
      },
      {
        key: "ウ",
        textJp: "SQLインジェクション",
        textEnId: "SQL Injection",
        explanation: "Salah. SQL Injection menyuntikkan perintah SQL lewat input formulir untuk memanipulasi basis data backend.",
      },
      {
        key: "エ",
        textJp: "バッファオーバーフロー",
        textEnId: "Buffer Overflow",
        explanation: "Salah. Buffer Overflow merusak memori proses server tingkat rendah akibat input melebihi alokasi memori buffer.",
      },
    ],
    correctKey: "ア",
    summaryExplanation:
      "CSRF (クロスサイトリクエストフォージェリ) memaksa browser korban yang telah login untuk mengirim request berbahaya ke aplikasi web sasaran tanpa disadari. Pencegahan utamanya menggunakan Anti-CSRF Token rahasia pada tiap formulir.",
    keyTakeaway: "CSRF = Memalsukan aksi request pengguna yang sedang login.",
  },
  {
    id: "quiz-mgmt-01",
    year: "令和5年 過去問",
    category: "management",
    subCategory: "Project Management",
    questionJp:
      "プロジェクトマネジメントにおいて、アローダイアグラム（PERT）で作業の最早開始日と最遅開始日が一致する結合点を結ぶ経路は何と呼ばれるか。",
    questionTranslation:
      "Dalam manajemen proyek diagram panah (PERT), jalur yang menghubungkan titik-titik di mana tanggal mulai paling awal sama persis dengan tanggal mulai paling lambat disebut apa?",
    options: [
      {
        key: "ア",
        textJp: "クリティカルパス",
        textEnId: "Critical Path (Jalur Kritis)",
        explanation: "Benar! Jalur ini memiliki kelonggaran waktu nol (余裕日数 = 0). Keterlambatan di jalur ini langsung menunda proyek secara keseluruhan.",
      },
      {
        key: "イ",
        textJp: "ダミー作業",
        textEnId: "Dummy Activity",
        explanation: "Salah. Dummy activity adalah garis putus-putus berdurasi 0 hari yang hanya dipakai untuk menunjukkan ketergantungan urutan.",
      },
      {
        key: "ウ",
        textJp: "トローリング",
        textEnId: "Trolling / Fast Tracking",
        explanation: "Salah. Ini bukan istilah jalur PERT melainkan teknik kompresi jadwal.",
      },
      {
        key: "エ",
        textJp: "スラックパス",
        textEnId: "Slack Path",
        explanation: "Salah. Slack adalah kelonggaran waktu (余裕時間), yang bernilai 0 pada jalur kritis.",
      },
    ],
    correctKey: "ア",
    summaryExplanation:
      "Critical Path adalah jalur dengan durasi total terpanjang dalam proyek. Ciri khasnya: Earliest Start Date = Latest Start Date (tidak ada toleransi molor / 余裕日数なし).",
    keyTakeaway: "Earliest = Latest Date → Critical Path (0 hari toleransi).",
  },
  {
    id: "quiz-mgmt-02",
    year: "令和4年 過去問",
    category: "management",
    subCategory: "EVM Project Management",
    questionJp:
      "EVM（Earned Value Management）において、PV（計画価値）が 100万円、EV（獲得価値）が 80万円、AC（実コスト）が 90万円であるとき、プロジェクトの進捗とコストの状態として適切なものはどれか。",
    questionTranslation:
      "Dalam EVM, jika PV = 1.000.000 yen, EV = 800.000 yen, dan AC = 900.000 yen, bagaimana kondisi kemajuan jadwal dan biaya proyek saat ini?",
    options: [
      {
        key: "ア",
        textJp: "進捗は遅れており、コストは超過している。",
        textEnId: "Jadwal terlambat, dan biaya over-budget.",
        explanation: "Benar! SV = EV - PV = 80 - 100 = -20 (negatif → terlambat). CV = EV - AC = 80 - 90 = -10 (negatif → biaya boros/melebihi hasil).",
      },
      {
        key: "イ",
        textJp: "進捗は進んでおり、コストは超過している。",
        textEnId: "Jadwal maju lebih cepat, dan biaya over-budget.",
        explanation: "Salah. Karena EV (80) < PV (100), jadwal justru terlambat.",
      },
      {
        key: "ウ",
        textJp: "進捗は遅れており、コストは予算内に収まっている。",
        textEnId: "Jadwal terlambat, tetapi biaya masih hemat di bawah anggaran.",
        explanation: "Salah. Karena EV (80) < AC (90), biaya yang dihabiskan lebih besar dari nilai hasil kerja (over-budget).",
      },
      {
        key: "エ",
        textJp: "進捗は進んでおり、コストは予算内に収まっている。",
        textEnId: "Jadwal lebih cepat dan biaya hemat.",
        explanation: "Salah. Baik indeks jadwal (SPI) maupun biaya (CPI) berada di bawah 1.0.",
      },
    ],
    correctKey: "ア",
    summaryExplanation:
      "Jadwal: SV = EV - PV = 80 - 100 = -20 (EV < PV menandakan keterlambatan / スケジュール遅延). Biaya: CV = EV - AC = 80 - 90 = -10 (EV < AC menandakan biaya melebihi hasil / コスト超過).",
    keyTakeaway: "EV < PV = Telat. EV < AC = Boros (Over-budget).",
  },
  {
    id: "quiz-mgmt-03",
    year: "令和4年 過去問",
    category: "management",
    subCategory: "IT Service Management (ITIL)",
    questionJp:
      "ITサービスマネジメント（ITIL）における『インシデント管理』の主な目的はどれか。",
    questionTranslation:
      "Manakah tujuan utama dari 'Incident Management' (インシデント管理) dalam manajemen layanan ITIL?",
    options: [
      {
        key: "ア",
        textJp: "インシデントの根本原因を究明し、再発を恒久的に防止すること。",
        textEnId: "Menyelidiki akar masalah insiden dan mencegah terjadinya kembali secara permanen.",
        explanation: "Salah. Menyelidiki akar penyebab (根本原因) adalah tugas dari 'Problem Management' (問題管理).",
      },
      {
        key: "イ",
        textJp: "サービスの中断に対して、可能な限り迅速に正常なサービス運用を復旧させること。",
        textEnId: "Memulihkan operasi layanan normal secepat mungkin ketika terjadi gangguan.",
        explanation: "Benar! Fokus utama Incident Management adalah pemulihan cepat (迅速な復旧), meskipun hanya berupa solusi sementara (workaround).",
      },
      {
        key: "ウ",
        textJp: "ITサービスの変更を安全かつ効率的に承認・適用すること。",
        textEnId: "Menyetujui dan menerapkan perubahan layanan IT dengan aman dan efisien.",
        explanation: "Salah. Ini adalah tugas dari 'Change Management' (変更管理).",
      },
      {
        key: "エ",
        textJp: "合意された目標サービス水準（SLA）の達成状況を監視・評価すること。",
        textEnId: "Memantau dan mengevaluasi pencapaian tingkat target layanan yang disepakati (SLA).",
        explanation: "Salah. Ini adalah tugas dari 'Service Level Management' (サービスレベル管理 / SLM).",
      },
    ],
    correctKey: "イ",
    summaryExplanation:
      "Bedakan dua pilar penting ITIL: インシデント管理 (Incident Management) = Pemulihan cepat sesegera mungkin (迅速なサービス復旧). 問題管理 (Problem Management) = Menemukan akar penyebab untuk mencegah kekambuhan (根本原因の究明・再発防止).",
    keyTakeaway: "Insiden = Cepat pulih dulu! Problem = Cari akar masalahnya.",
  },
  {
    id: "quiz-mgmt-04",
    year: "令和3年 過去問",
    category: "management",
    subCategory: "Software Testing",
    questionJp:
      "ブラックボックステストにおけるテストケース設計手法のうち、入力条件の境界となる値とその隣接値を重点的にテストする手法はどれか。",
    questionTranslation:
      "Dalam perancangan pengujian Black-box, metode manakah yang secara intensif menguji nilai-nilai di batas rentang input beserta nilai tepat di sebelahnya?",
    options: [
      {
        key: "ア",
        textJp: "同値分割法",
        textEnId: "Equivalence Partitioning (同値分割法)",
        explanation: "Salah. Metode ini membagi data ke kelas valid dan tidak valid, lalu mengambil satu sampel perwakilan dari tiap kelas.",
      },
      {
        key: "イ",
        textJp: "限界値分析（境界値分析）",
        textEnId: "Boundary Value Analysis (境界値分析)",
        explanation: "Benar! Bugs pemrograman (seperti < vs <=) seringkali muncul di titik tepi nilai batas (misal: 0, 1, 99, 100).",
      },
      {
        key: "ウ",
        textJp: "決定表（デシジョンテーブル）",
        textEnId: "Decision Table Testing",
        explanation: "Salah. Decision Table menguji kombinasi dari beberapa input logika yang kompleks terhadap outputnya.",
      },
      {
        key: "エ",
        textJp: "分岐網羅（ブランチカバレッジ）",
        textEnId: "Branch Coverage",
        explanation: "Salah. Branch Coverage adalah teknik White-box testing berdasarkan struktur kode internal.",
      },
    ],
    correctKey: "イ",
    summaryExplanation:
      "境界値分析 (Boundary Value Analysis / 限界値分析) fokus menguji angka di tepi ambang batas (contoh rentang 1~100 diuji di angka 0, 1, 100, 101) karena di sinilah kekeliruan operator perbandingan (< vs <=) paling sering terjadi.",
    keyTakeaway: "Nilai batas tepi = 境界値分析 (Boundary Value Analysis).",
  },
  {
    id: "quiz-strat-01",
    year: "令和5年 過去問",
    category: "strategy",
    subCategory: "IT Law & Compliance",
    questionJp:
      "日本の著作権法において、コンピュータプログラムに関して保護の対象となるものはどれか。",
    questionTranslation:
      "Berdasarkan Undang-Undang Hak Cipta di Jepang, manakah dari pilihan berikut yang menjadi objek perlindungan hak cipta terkait program komputer?",
    options: [
      {
        key: "ア",
        textJp: "プログラムのソースコード（具体的な表現）",
        textEnId: "Source code program (Ekspresi konkret)",
        explanation: "Benar! Hak cipta hanya melindungi 'ekspresi' (表現) konkret dari kode sumber atau objek biner.",
      },
      {
        key: "イ",
        textJp: "プログラムのアルゴリズム（解法の手順）",
        textEnId: "Algoritma program (Langkah penyelesaian)",
        explanation: "Salah. Algoritma (解法) dianggap sebagai ide abstrak matematis, sehingga secara eksplisit DIKECUALIKAN dari perlindungan hak cipta.",
      },
      {
        key: "ウ",
        textJp: "使用したプログラミング言語（構文規則）",
        textEnId: "Bahasa pemrograman yang digunakan",
        explanation: "Salah. Bahasa pemrograman bebas digunakan oleh siapa pun dan tidak dilindungi hak cipta.",
      },
      {
        key: "エ",
        textJp: "通信プロトコル（規約）",
        textEnId: "Protokol komunikasi",
        explanation: "Salah. Protokol komunikasi adalah aturan kesepakatan teknis yang tidak dilindungi hak cipta.",
      },
    ],
    correctKey: "ア",
    summaryExplanation:
      "Pasal 10 ayat 3 UU Hak Cipta Jepang menegaskan bahwa: Bahasa Pemrograman (プログラム言語), Protokol (規約), dan Algoritma (解法) TIDAK dilindungi hak cipta. Yang dilindungi hanyalah KODE SUMBER KONGKRET (表現).",
    keyTakeaway: "Bahasa, Protokol, & Algoritma = Bebas Hak Cipta. Kode Konkret = Dilindungi.",
  },
  {
    id: "quiz-strat-02",
    year: "令和4年 過去問",
    category: "strategy",
    subCategory: "Corporate Strategy (PPM)",
    questionJp:
      "PPM（プロダクト・ポートフォリオ・マネジメント）マトリクスにおいて、市場成長率が高く、相対的市場シェアも高い製品群の位置づけは何と呼ばれるか。",
    questionTranslation:
      "Dalam matriks Product Portfolio Management (PPM), posisi produk yang memiliki tingkat pertumbuhan pasar tinggi DAN pangsa pasar relatif yang tinggi disebut apa?",
    options: [
      {
        key: "ア",
        textJp: "花形（Star）",
        textEnId: "Star (花形)",
        explanation: "Benar! Tingkat pertumbuhan tinggi + pangsa pasar tinggi = Star. Menghasilkan pendapatan besar namun juga butuh investasi modal besar.",
      },
      {
        key: "イ",
        textJp: "金のなる木（Cash Cow）",
        textEnId: "Cash Cow (金のなる木)",
        explanation: "Salah. Cash Cow memiliki pertumbuhan pasar RENDAH tetapi pangsa pasar TINGGI (penghasil laba stabil tanpa butuh investasi besar lagi).",
      },
      {
        key: "ウ",
        textJp: "問題児（Question Mark）",
        textEnId: "Question Mark (問題児)",
        explanation: "Salah. Question Mark memiliki pertumbuhan pasar TINGGI tetapi pangsa pasarnya masih RENDAH.",
      },
      {
        key: "エ",
        textJp: "負け犬（Dog）",
        textEnId: "Dog (負け犬)",
        explanation: "Salah. Dog memiliki pertumbuhan pasar RENDAH dan pangsa pasar juga RENDAH (kandidat untuk divestasi/ditarik).",
      },
    ],
    correctKey: "ア",
    summaryExplanation:
      "Matriks 4 Kuadran PPM (BCG Matrix): 1. 花形 (Star): Pertumbuhan Tinggi + Share Tinggi. 2. 金のなる木 (Cash Cow): Pertumbuhan Rendah + Share Tinggi. 3. 問題児 (Question Mark): Pertumbuhan Tinggi + Share Rendah. 4. 負け犬 (Dog): Pertumbuhan Rendah + Share Rendah.",
    keyTakeaway: "Star = Growth Tinggi + Share Tinggi. Cash Cow = Mesin Uang (Share Tinggi di Pasar Matang).",
  },
  {
    id: "quiz-strat-03",
    year: "令和3年 過去問",
    category: "strategy",
    subCategory: "Business Accounting",
    questionJp:
      "ある製品の販売価格が 1個 1,000円、変動費が 1個あたり 600円、固定費が年間 400万円のとき、損益分岐点（Break-even Point）売上高は何百万円か。",
    questionTranslation:
      "Sebuah produk memiliki harga jual 1.000 yen per unit, biaya variabel 600 yen per unit, dan biaya tetap tahunan 4.000.000 yen. Berapakah nilai penjualan titik impas (Break-even Point) dalam jutaan yen?",
    options: [
      {
        key: "ア",
        textJp: "600 万円",
        textEnId: "6 Juta Yen",
        explanation: "Salah. Nilai ini tidak menutup biaya tetap dengan margin kontribusi yang ada.",
      },
      {
        key: "イ",
        textJp: "800 万円",
        textEnId: "8 Juta Yen",
        explanation: "Salah. Pada penjualan 8 juta, margin kontribusi hanya 3.2 juta, belum menutup fixed cost 4 juta.",
      },
      {
        key: "ウ",
        textJp: "1,000 万円",
        textEnId: "10 Juta Yen",
        explanation: "Benar! Rasio biaya variabel = 600/1000 = 0.6. Rasio margin kontribusi = 1 - 0.6 = 0.4. BEP = 400万 / 0.4 = 1,000万円.",
      },
      {
        key: "エ",
        textJp: "1,200 万円",
        textEnId: "12 Juta Yen",
        explanation: "Salah. Pada penjualan 1.200 juta, perusahaan sudah menghasilkan laba bersih 800.000 yen.",
      },
    ],
    correctKey: "ウ",
    summaryExplanation:
      "Rumus Titik Impas (損益分岐点売上高) = 固定費 ÷ (1 - 変動費率). Rasio Variabel = 600 / 1000 = 0.6. Rasio Kontribusi = 1 - 0.6 = 0.4. BEP = 4.000.000 ÷ 0.4 = 10.000.000 yen (1,000 万円).",
    keyTakeaway: "BEP = Biaya Tetap / (1 - Rasio Biaya Variabel).",
  },
];

