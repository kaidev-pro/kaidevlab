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
    "id": "quiz-tech-01",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Information Security (PKI)",
    "questionJp": "公開鍵暗号方式を用いてメッセージを送受信する場合、送信者がメッセージを暗号化するために使用する鍵と、受信者がそれを復号するために使用する鍵の適切な組合せはどれか。",
    "questionTranslation": "Saat mengirim pesan menggunakan Kriptografi Kunci Publik, kombinasi kunci mana yang tepat yang digunakan pengirim untuk mengenkripsi dan penerima untuk mendekripsi?",
    "options": [
      {
        "key": "ア",
        "textJp": "暗号化：送信者の公開鍵 ／ 復号：送信者の秘密鍵",
        "textEnId": "Enkripsi: Kunci publik pengirim / Dekripsi: Kunci privat pengirim",
        "explanation": "Salah. Jika dienkripsi dengan kunci publik pengirim, penerima tidak memiliki kunci privat pengirim sehingga tidak bisa membacanya."
      },
      {
        "key": "イ",
        "textJp": "暗号化：受信者の公開鍵 ／ 復号：受信者の秘密鍵",
        "textEnId": "Enkripsi: Kunci publik penerima / Dekripsi: Kunci privat penerima",
        "explanation": "Benar! Siapa pun dapat mengenkripsi pesan menggunakan kunci publik penerima, tetapi hanya penerima yang memegang kunci privat rahasia untuk membukanya."
      },
      {
        "key": "ウ",
        "textJp": "暗号化：送信者の秘密鍵 ／ 復号：受信者の公開鍵",
        "textEnId": "Enkripsi: Kunci privat pengirim / Dekripsi: Kunci publik penerima",
        "explanation": "Salah. Ini adalah mekanisme yang salah; enkripsi pesan rahasia tidak pernah didekripsi dengan kunci publik penerima."
      },
      {
        "key": "エ",
        "textJp": "暗号化：受信者の秘密鍵 ／ 復号：送信者の公開鍵",
        "textEnId": "Enkripsi: Kunci privat penerima / Dekripsi: Kunci publik pengirim",
        "explanation": "Salah. Pengirim tidak mungkin memiliki akses ke kunci privat penerima (karena bersifat rahasia bagi penerima saja)."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Pada enkripsi kunci publik: Pengirim mengunci pesan dengan KUNCI PUBLIK PENERIMA (受信者の公開鍵), dan penerima membukanya dengan KUNCI PRIVAT MILIKNYA SENDIRI (受信者の秘密鍵). Sebaliknya, jika enkripsi dilakukan dengan kunci privat pengirim, tujuannya adalah Tanda Tangan Digital (ディジタル署名).",
    "keyTakeaway": "Pesan Rahasia = Kunci Publik Penerima. Tanda Tangan = Kunci Privat Pengirim."
  },
  {
    "id": "quiz-tech-02",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Database (ACID Properties)",
    "questionJp": "関係データベースのトランザクション処理において、ACID特性と呼ばれる4つの性質のうち、障害が発生しても一度コミットした更新結果は失われないことを保証する性質はどれか。",
    "questionTranslation": "Dalam pemrosesan transaksi basis data relasional, manakah di antara 4 sifat ACID yang menjamin bahwa perubahan data yang telah berhasil di-commit tidak akan hilang meskipun terjadi kegagalan sistem?",
    "options": [
      {
        "key": "ア",
        "textJp": "原子性（Atomicity）",
        "textEnId": "Atomicity (原子性)",
        "explanation": "Salah. Atomicity menjamin transaksi bersifat All-or-Nothing (seluruh operasi selesai atau dibatalkan sama sekali)."
      },
      {
        "key": "イ",
        "textJp": "一貫性（Consistency）",
        "textEnId": "Consistency (一貫性)",
        "explanation": "Salah. Consistency menjamin transaksi membawa database dari satu kondisi valid ke kondisi valid lainnya sesuai aturan integritas."
      },
      {
        "key": "ウ",
        "textJp": "隔離性（Isolation）",
        "textEnId": "Isolation / 独立性 (隔離性)",
        "explanation": "Salah. Isolation menjamin transaksi yang berjalan bersamaan tidak saling mengganggu hasil sementara satu sama lain."
      },
      {
        "key": "エ",
        "textJp": "耐久性（Durability）",
        "textEnId": "Durability (耐久性 / 永続性)",
        "explanation": "Benar! Durability menjamin bahwa begitu transaksi di-commit, perubahannya dicatat permanen dalam log/media non-volatile dan tidak akan hilang meski server mati mendadak."
      }
    ],
    "correctKey": "エ",
    "summaryExplanation": "4 Prinsip ACID: 1. Atomicity (原子性): All-or-Nothing. 2. Consistency (一貫性): Integritas aturan data terjaga. 3. Isolation (隔離性): Bebas interferensi transaksi paralel. 4. Durability (耐久性/永続性): Hasil commit tetap abadi walau crash.",
    "keyTakeaway": "Commit Berhasil & Data Tidak Hilang Pasca-Crash = Durability (耐久性)."
  },
  {
    "id": "quiz-tech-03",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Network (Subnetting /28)",
    "questionJp": "IPv4ネットワークにおいて、サブネットマスクが 255.255.255.240 のとき、1つのサブネット内でコンピュータ（ホスト）に割り当て可能なIPアドレスの最大数はいくつあるか。",
    "questionTranslation": "Pada jaringan IPv4 dengan subnet mask 255.255.255.240 (/28), berapa jumlah maksimum alamat IP yang dapat dialokasikan ke komputer host dalam 1 subnet?",
    "options": [
      {
        "key": "ア",
        "textJp": "14",
        "textEnId": "14 Alamat Host",
        "explanation": "Benar! 240 dalam biner adalah 11110000 (ada 4 bit host). Total alamat = 2^4 = 16. Dikurangi 2 (Network Address & Broadcast Address) = 14."
      },
      {
        "key": "イ",
        "textJp": "16",
        "textEnId": "16 Alamat",
        "explanation": "Salah. 16 adalah total seluruh alamat, tetapi 2 alamat wajib dicadangkan untuk Network Address (semua bit 0) dan Broadcast Address (semua bit 1)."
      },
      {
        "key": "ウ",
        "textJp": "30",
        "textEnId": "30 Alamat",
        "explanation": "Salah. 30 alamat host diperoleh jika subnet mask adalah 255.255.255.224 (/27)."
      },
      {
        "key": "エ",
        "textJp": "62",
        "textEnId": "62 Alamat",
        "explanation": "Salah. 62 alamat host diperoleh jika subnet mask adalah 255.255.255.192 (/26)."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Rumus Alamat Host Tersedia = (2^n) - 2, di mana n adalah jumlah bit host bernilai 0 pada subnet mask. Nilai 240 = 1111 0000 (4 bit nol). Maka (2^4) - 2 = 16 - 2 = 14 host.",
    "keyTakeaway": "Host = 2^n - 2 (selalu kurangi 2 untuk Network & Broadcast)."
  },
  {
    "id": "quiz-tech-04",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Computer Architecture (Cache Memory)",
    "questionJp": "キャッシュメモリのアクセス時間が 10 ナノ秒、主記憶のアクセス時間が 60 ナノ秒のシステムにおいて、キャッシュのヒット率が 0.8 であるとき、実効アクセス時間は何ナノ秒か。",
    "questionTranslation": "Pada sistem dengan waktu akses cache memory 10 ns, memori utama 60 ns, dan hit ratio cache 0.8, berapakah waktu akses efektifnya (dalam nanodetik)?",
    "options": [
      {
        "key": "ア",
        "textJp": "20 ナノ秒",
        "textEnId": "20 ns",
        "explanation": "Benar! Waktu Efektif = (Hit Ratio × Waktu Cache) + ((1 - Hit Ratio) × Waktu Memori) = (0.8 × 10) + (0.2 × 60) = 8 + 12 = 20 ns."
      },
      {
        "key": "イ",
        "textJp": "35 ナノ秒",
        "textEnId": "35 ns",
        "explanation": "Salah. 35 ns adalah nilai rata-rata sederhana (10+60)/2 tanpa memperhitungkan bobot hit ratio."
      },
      {
        "key": "ウ",
        "textJp": "48 ナノ秒",
        "textEnId": "48 ns",
        "explanation": "Salah. Hasil jika formula hit ratio tertukar."
      },
      {
        "key": "エ",
        "textJp": "50 ナノ秒",
        "textEnId": "50 ns",
        "explanation": "Salah. Terlalu mendekati waktu akses memori utama."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Rumus Waktu Akses Efektif (実効アクセス時間) = (h × Tc) + ((1 - h) × Tm). Di mana h = 0.8 (Hit Rate), Tc = 10 ns (Cache Time), Tm = 60 ns (Main Memory Time). 0.8 × 10 + 0.2 × 60 = 8 + 12 = 20 ns.",
    "keyTakeaway": "Hit Ratio × Waktu Cache + Miss Ratio × Waktu Memori = Waktu Akses Efektif."
  },
  {
    "id": "quiz-tech-05",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Operating Systems (Scheduling)",
    "questionJp": "タスクの処理方式に関する記述のうち、ラウンドロビン方式（Round Robin）の説明として適切なものはどれか。",
    "questionTranslation": "Di antara deskripsi pemrosesan task berikut, manakah yang merupakan penjelasan yang tepat mengenai Round Robin Scheduling?",
    "options": [
      {
        "key": "ア",
        "textJp": "各タスクに均等なタイムスライス（CPU時間枠）を順番に割り当て、時間内に完了しない場合はタスク待ち行列の最後尾に回す方式。",
        "textEnId": "Mengalokasikan time slice secara bergiliran dan memindahkan task yang belum selesai ke ujung antrean.",
        "explanation": "Benar! Round Robin membagi waktu CPU menjadi potongan waktu (タイムスライス) yang sama rata untuk setiap task secara bergiliran."
      },
      {
        "key": "イ",
        "textJp": "タスクの優先度に従って処理を行い、常に最も優先度が高いタスクを実行する方式。",
        "textEnId": "Priority Scheduling (優先度順方式)",
        "explanation": "Salah. Ini adalah definisi dari Priority Scheduling."
      },
      {
        "key": "ウ",
        "textJp": "処理時間の短いタスクから優先してCPUを割り当てる方式。",
        "textEnId": "Shortest Job First (SJF方式)",
        "explanation": "Salah. Ini adalah Shortest Job First / Shortest Processing Time."
      },
      {
        "key": "エ",
        "textJp": "タスクが到着した順序に従って、完了するまでCPUを占有させる方式。",
        "textEnId": "FIFO / FCFS (First Come First Served)",
        "explanation": "Salah. Ini adalah First-Come First-Served (FCFS / 到着順方式)."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Round Robin (ラウンドロビン方式): Setiap task mendapatkan jatah waktu yang sama (タイムスライス / Time Slice). Jika task belum selesai saat jatah waktunya habis, ia disela (preempted) dan ditempatkan ke barisan paling belakang antrean (待ち行列の末尾). Sangat cocok untuk sistem Time-Sharing (TSS).",
    "keyTakeaway": "Round Robin = Jatah Waktu Sama (Time Slice) + Antrean Melingkar."
  },
  {
    "id": "quiz-tech-06",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Database (Relational Algebra)",
    "questionJp": "関係代数演算のうち、ある表から特定の属性（列）だけを取り出して新しい表を作る演算はどれか。",
    "questionTranslation": "Dalam aljabar relasional basis data, operasi yang mengambil atribut tertentu (kolom) saja dari sebuah tabel untuk membentuk tabel baru disebut:",
    "options": [
      {
        "key": "ア",
        "textJp": "選択（Selection）",
        "textEnId": "Selection (選択)",
        "explanation": "Salah. 選択 (Selection) adalah mengambil BARIS (行 / Tuples) yang memenuhi kriteria tertentu (seperti klausa WHERE)."
      },
      {
        "key": "イ",
        "textJp": "射影（Projection）",
        "textEnId": "Projection (射影)",
        "explanation": "Benar! 射影 (Projection) adalah mengekstrak KOLOM tertentu (列 / Attributes) dari tabel (seperti daftar kolom dalam klausa SELECT)."
      },
      {
        "key": "ウ",
        "textJp": "結合（Join）",
        "textEnId": "Join (結合)",
        "explanation": "Salah. 結合 (Join) adalah menggabungkan dua tabel berdasarkan kolom relasi kunci yang sama."
      },
      {
        "key": "エ",
        "textJp": "積（Intersection）",
        "textEnId": "Intersection (積集合)",
        "explanation": "Salah. 積 (Intersection) adalah mencari irisan baris yang ada di kedua tabel."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Dua operasi paling sering keluar di ujian FE: 1. 射影 (Projection): Memotong secara VERTIKAL (mengambil kolom/atribut tertentu). 2. 選択 (Selection): Memotong secara HORIZONTAL (mengambil baris yang memenuhi syarat).",
    "keyTakeaway": "Kolom (Vertical) = 射影 (Projection). Baris (Horizontal) = 選択 (Selection)."
  },
  {
    "id": "quiz-tech-07",
    "year": "令和3年 過去問",
    "category": "technology",
    "subCategory": "Hardware & Storage (RAID)",
    "questionJp": "RAIDの構成のうち、データおよびパリティ（誤り訂正情報）を複数のディスクに分散して記録し、構成ディスクのうちいずれか1台が故障してもデータを復旧できる方式はどれか。",
    "questionTranslation": "Di antara konfigurasi RAID berikut, manakah konfigurasi yang menyimpan data dan paritas (informasi koreksi kesalahan) secara tersebar ke beberapa disk, serta dapat memulihkan data jika ada 1 disk yang rusak?",
    "options": [
      {
        "key": "ア",
        "textJp": "RAID 0",
        "textEnId": "RAID 0 (Striping)",
        "explanation": "Salah. RAID 0 (Striping) membagi data ke banyak disk tanpa paritas atau redundansi. Jika 1 disk rusak, seluruh data lenyap."
      },
      {
        "key": "イ",
        "textJp": "RAID 1",
        "textEnId": "RAID 1 (Mirroring)",
        "explanation": "Salah. RAID 1 (Mirroring) menyalin data identik ke 2 disk (duplikasi penuh), bukan menggunakan komputasi paritas tersebar."
      },
      {
        "key": "ウ",
        "textJp": "RAID 5",
        "textEnId": "RAID 5 (Distributed Parity)",
        "explanation": "Benar! RAID 5 menyebarkan data dan paritas (XOR) ke minimal 3 disk. Jika salah satu disk mati, data dapat dihitung ulang dari disk yang tersisa."
      },
      {
        "key": "エ",
        "textJp": "RAID 6",
        "textEnId": "RAID 6 (Dual Parity)",
        "explanation": "Salah. RAID 6 menyimpan dua blok paritas berbeda dan tahan terhadap kerusakan 2 disk sekaligus."
      }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "RAID 5 membutuhkan minimal 3 hard drive. Data dan paritas disebar ke seluruh disk (分散パリティ). Tahan terhadap kerusakan 1 disk. Efisiensi kapasitas: (N - 1) / N.",
    "keyTakeaway": "Data + Paritas Tersebar (Minimal 3 Disk, Tahan 1 Disk Mati) = RAID 5."
  },
  {
    "id": "quiz-tech-08",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Web Security (CSRF)",
    "questionJp": "Webアプリケーションにおいて、利用者がログイン中の正規セッションを悪用され、意図しないリクエスト（パスワード変更や送金など）をサーバへ強制的に送信させられる攻撃はどれか。",
    "questionTranslation": "Dalam aplikasi web, serangan di mana sesi login sah pengguna dimanfaatkan oleh pihak jahat untuk mengirimkan permintaan yang tidak diinginkan (seperti mengubah sandi atau transfer uang) ke server tanpa disadari pengguna adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "クロスサイトスクリプティング（XSS）",
        "textEnId": "Cross-Site Scripting (XSS)",
        "explanation": "Salah. XSS menyisipkan skrip berbahaya (JavaScript) ke halaman web korban untuk mencuri cookie atau memanipulasi DOM."
      },
      {
        "key": "イ",
        "textJp": "クロスサイトリクエストフォージェリ（CSRF）",
        "textEnId": "Cross-Site Request Forgery (CSRF)",
        "explanation": "Benar! CSRF memalsukan request atas nama pengguna yang sedang aktif terotentikasi (memanfaatkan kredensial sesi/cookie yang tersimpan)."
      },
      {
        "key": "ウ",
        "textJp": "SQLインジェクション",
        "textEnId": "SQL Injection",
        "explanation": "Salah. SQL Injection menyisipkan perintah SQL tak terduga ke dalam parameter input database."
      },
      {
        "key": "エ",
        "textJp": "バッファオーバーフロー",
        "textEnId": "Buffer Overflow",
        "explanation": "Salah. Buffer overflow mengeksploitasi alokasi memori berlebih untuk mengeksekusi shellcode berbahaya."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "CSRF (クロスサイトリクエストフォージェリ) memanfaatkan kepercayaan server terhadap browser korban yang sudah login. Solusi pencegahannya adalah menyertakan token acak rahasia sekali pakai (Anti-CSRF Token / Synchronizer Token) di setiap formulir permintaan sensitif.",
    "keyTakeaway": "Eksekusi Request Palsu Memanfaatkan Sesi Login Aktif Korban = CSRF."
  },
  {
    "id": "quiz-tech-09",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Artificial Intelligence (Machine Learning)",
    "questionJp": "機械学習における『教師あり学習』の手法として、適切なものはどれか。",
    "questionTranslation": "Di antara metode berikut, manakah yang merupakan teknik dari 'Supervised Learning' (教師あり学習) dalam Machine Learning?",
    "options": [
      {
        "key": "ア",
        "textJp": "事前にラベル付けされた入力と正解のペアデータを用いて、入力から出力を予測するモデルを構築する。",
        "textEnId": "Membangun model prediksi dengan pasangan data input dan label jawaban benar.",
        "explanation": "Benar! Supervised Learning (教師あり学習) dilatih menggunakan dataset yang memiliki label jawaban benar (ground truth) untuk regresi atau klasifikasi."
      },
      {
        "key": "イ",
        "textJp": "正解ラベルが与えられていないデータ集合から、データの類似度に基づいてグループ分け（クラスタリング）を行う。",
        "textEnId": "Pengelompokan (clustering) berdasarkan kemiripan tanpa label jawaban.",
        "explanation": "Salah. Ini adalah definisi dari 教師なし学習 (Unsupervised Learning / K-means)."
      },
      {
        "key": "ウ",
        "textJp": "エージェントが環境の中で行動を選択し、得られた報酬が最大になるような行動方針を試行錯誤により学習する。",
        "textEnId": "Agen belajar memaksimalkan reward lingkungan melalui trial and error.",
        "explanation": "Salah. Ini adalah definisi dari 強化学習 (Reinforcement Learning / Q-learning)."
      },
      {
        "key": "エ",
        "textJp": "多数の未分類テキストデータから、潜在的なトピックや頻出パターンを統計的に抽出する。",
        "textEnId": "Mengekstrak topik tersembunyi dari teks tanpa label.",
        "explanation": "Salah. Ini adalah teknik Unsupervised Topic Modeling (seperti LDA)."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "3 Paradigma Utama Machine Learning: 1. 教師あり学習 (Supervised): Ada label input + output benar (klasifikasi/regresi). 2. 教師なし学習 (Unsupervised): Tidak ada label, mencari struktur laten/cluster. 3. 強化学習 (Reinforcement): Belajar dari interaksi lingkungan untuk memaksimalkan reward (報酬).",
    "keyTakeaway": "Ada Label Jawaban = 教師あり (Supervised). Clustering = 教師なし. Reward = 強化学習."
  },
  {
    "id": "quiz-tech-10",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Deep Learning & AI (Overfitting)",
    "questionJp": "ニューラルネットワークの学習において、訓練データに対しては高い精度を示すが、未知のテストデータに対する予測精度が著しく低下する現象を何と呼ぶか。",
    "questionTranslation": "Dalam pelatihan neural network, fenomena di mana model memiliki akurasi sangat tinggi pada data latih (training) namun akurasinya turun drastis pada data uji baru yang belum pernah dilihat disebut apa?",
    "options": [
      {
        "key": "ア",
        "textJp": "勾配消失",
        "textEnId": "Vanishing Gradient (勾配消失)",
        "explanation": "Salah. Vanishing Gradient adalah masalah di mana nilai gradien menjadi mendekati nol pada lapisan awal jaringan yang sangat dalam."
      },
      {
        "key": "イ",
        "textJp": "過学習（オーバーフィッティング）",
        "textEnId": "Overfitting (過学習)",
        "explanation": "Benar! Overfitting terjadi ketika model terlalu menghafal detail dan noise data latih sehingga kehilangan kemampuan generalisasi terhadap data baru."
      },
      {
        "key": "ウ",
        "textJp": "ドロップアウト",
        "textEnId": "Dropout (ドロップアウト)",
        "explanation": "Salah. Dropout adalah teknik regularisasi untuk MENCEGAH overfitting dengan menonaktifkan neuron secara acak saat pelatihan."
      },
      {
        "key": "エ",
        "textJp": "局所最適解",
        "textEnId": "Local Minima (局所最適解)",
        "explanation": "Salah. Local minima adalah titik minimum lokal dalam optimasi gradien (bukan titik optimum global)."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "過学習 (Overfitting): Model terlalu fit pada data latihan sampai menghafal noise. Gejala: Akurasi data latih sangat tinggi, tetapi akurasi data uji (test data) rendah. Solusi pencegahan: Dropout (ドロップアウト), Regularisasi L1/L2 (正則化), dan Penambahan data (Data Augmentation).",
    "keyTakeaway": "Hafal Data Latih Tapi Gagal di Data Baru = 過学習 (Overfitting)."
  },
  {
    "id": "quiz-tech-11",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Cloud Architecture (Service Models)",
    "questionJp": "クラウドサービスのサービスモデルのうち、ハードウェア、仮想化基盤、OS、データベース管理システムなどのミドルウェアまでがプロバイダから提供され、利用者はアプリケーションの開発・実行環境のみを管理する形態はどれか。",
    "questionTranslation": "Dalam model layanan cloud, jenis layanan di mana hardware, virtualisasi, OS, dan middleware (seperti DBMS) disediakan oleh penyedia cloud, dan pengguna hanya mengelola aplikasi serta kodenya adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "IaaS (Infrastructure as a Service)",
        "textEnId": "IaaS (Infrastruktur)",
        "explanation": "Salah. IaaS hanya menyediakan server virtual, storage, dan network. Pengguna wajib menginstal dan mengelola OS serta runtime sendiri."
      },
      {
        "key": "イ",
        "textJp": "PaaS (Platform as a Service)",
        "textEnId": "PaaS (Platform)",
        "explanation": "Benar! PaaS menyediakan runtime platform lengkap termasuk OS, web server, dan database. Pengguna hanya perlu mengunggah dan menjalankan kode aplikasi."
      },
      {
        "key": "ウ",
        "textJp": "SaaS (Software as a Service)",
        "textEnId": "SaaS (Aplikasi)",
        "explanation": "Salah. SaaS menyediakan seluruh aplikasi lengkap (seperti Gmail, Google Docs, Slack). Pengguna hanya sebagai pemakai akhir."
      },
      {
        "key": "エ",
        "textJp": "DaaS (Desktop as a Service)",
        "textEnId": "DaaS (Virtual Desktop)",
        "explanation": "Salah. DaaS adalah penyediaan lingkungan desktop virtual di cloud."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Hirarki Cloud Computing: 1. IaaS: Hanya VM + Network (Pengguna kelola OS ke atas). 2. PaaS: OS + Middleware + Runtime disediakan cloud (Pengguna hanya kelola Aplikasi & Data). 3. SaaS: Seluruh aplikasi siap pakai dari browser.",
    "keyTakeaway": "Kelola OS sendiri = IaaS. Kelola Aplikasi saja (Platform siap) = PaaS. Tinggal Pakai = SaaS."
  },
  {
    "id": "quiz-tech-12",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Agile & Software Process (Scrum)",
    "questionJp": "アジャイル開発の代表的なフレームワークであるスクラム（Scrum）において、スプリントの終了時にチームが集まり、プロセスやチームの働き方を検査し、次のスプリントに向けた改善点を話し合うイベントはどれか。",
    "questionTranslation": "Dalam framework Scrum pada pengembangan Agile, acara di akhir sprint di mana tim berkumpul untuk memeriksa proses kerja dan mendiskusikan perbaikan untuk sprint berikutnya adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "スプリント計画（Sprint Planning）",
        "textEnId": "Sprint Planning",
        "explanation": "Salah. Sprint Planning diadakan di awal sprint untuk menentukan backlog apa yang akan dikerjakan."
      },
      {
        "key": "イ",
        "textJp": "デイリースクラム（Daily Scrum）",
        "textEnId": "Daily Scrum",
        "explanation": "Salah. Daily Scrum adalah pertemuan harian 15 menit untuk sinkronisasi progress 24 jam."
      },
      {
        "key": "ウ",
        "textJp": "スプリントレビュー（Sprint Review）",
        "textEnId": "Sprint Review",
        "explanation": "Salah. Sprint Review berfokus pada inspeksi hasil produk (demonstrasi fitur ke stakeholder)."
      },
      {
        "key": "エ",
        "textJp": "スプリントレトロスペクティブ（Sprint Retrospective / ふりかえり）",
        "textEnId": "Sprint Retrospective (ふりかえり)",
        "explanation": "Benar! Retrospective bertujuan mengevaluasi proses kerja tim (orang, hubungan, proses, tools) dan merencanakan peningkatan efisiensi untuk sprint berikutnya."
      }
    ],
    "correctKey": "エ",
    "summaryExplanation": "Perbedaan Dua Event Akhir Sprint: 1. スプリントレビュー (Sprint Review): Memeriksa 'PRODUK' yang dihasilkan (Demo ke klien). 2. スプリントレトロスペクティブ (Retrospective / ふりかえり): Memeriksa 'PROSES & CARA KERJA TIM' (Kaizen internal tim).",
    "keyTakeaway": "Evaluasi Produk = Sprint Review. Evaluasi Cara Kerja Tim = Sprint Retrospective (ふりかえり)."
  },
  {
    "id": "quiz-tech-13",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Information Security (Zero Trust)",
    "questionJp": "従来の境界防御モデルに対して、社内ネットワークの内外を区別せず、すべてのアクセス要求を信用せずに毎回検証を行うセキュリティ概念はどれか。",
    "questionTranslation": "Konsep keamanan modern yang berbeda dari keamanan batas tradisional, di mana jaringan internal dan eksternal tidak dibedakan, dan semua permintaan akses tidak dipercaya serta harus selalu diverifikasi setiap saat adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "ゼロトラスト（Zero Trust）",
        "textEnId": "Zero Trust (ゼロトラスト)",
        "explanation": "Benar! Prinsip fundamental Zero Trust adalah 'Never Trust, Always Verify' (jangan percaya siapa pun, verifikasi terus-menerus terlepas dari lokasi jaringan)."
      },
      {
        "key": "イ",
        "textJp": "DMZ（DeMilitarized Zone）",
        "textEnId": "DMZ",
        "explanation": "Salah. DMZ adalah arsitektur keamanan batas lama yang menempatkan server publik di antara firewall luar dan dalam."
      },
      {
        "key": "ウ",
        "textJp": "シングルサインオン（SSO）",
        "textEnId": "Single Sign-On (SSO)",
        "explanation": "Salah. SSO adalah mekanisme satu kali autentikasi untuk mengakses banyak aplikasi independen."
      },
      {
        "key": "エ",
        "textJp": "サンドボックス（Sandbox）",
        "textEnId": "Sandbox",
        "explanation": "Salah. Sandbox adalah lingkungan isolasi untuk menjalankan file mencurigakan dengan aman."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Zero Trust (ゼロトラスト): Pendekatan keamanan yang menganggap semua lalu lintas jaringan (termasuk jaringan LAN kantor) berpotensi berbahaya. Memeriksa identitas pengguna, kesehatan perangkat, dan hak akses dinamis pada setiap request.",
    "keyTakeaway": "Tak Ada Jaringan Internal yang Aman, Selalu Verifikasi = Zero Trust."
  },
  {
    "id": "quiz-tech-14",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Network Security (DNS Poisoning)",
    "questionJp": "DNSキャッシュサーバに偽のDNS応答を送り込み、キャッシュに不正なIPアドレスを登録させることで、利用者を偽のWebサイトへ誘導する攻撃はどれか。",
    "questionTranslation": "Serangan di mana penyerang mengirimkan respons DNS palsu ke DNS cache server sehingga server menyimpan IP palsu dan mengarahkan korban ke situs tiruan penipu disebut:",
    "options": [
      {
        "key": "ア",
        "textJp": "DNSキャッシュポイズニング",
        "textEnId": "DNS Cache Poisoning",
        "explanation": "Benar! Serangan ini meracuni cache resolver DNS dengan alamat IP palsu sebelum jawaban otoritatif yang sah tiba."
      },
      {
        "key": "イ",
        "textJp": "ドライブバイダウンロード",
        "textEnId": "Drive-by Download",
        "explanation": "Salah. Drive-by download mengunduh malware secara diam-diam hanya dengan mengunjungi situs web berbahaya."
      },
      {
        "key": "ウ",
        "textJp": "パス・ザ・ハッシュ",
        "textEnId": "Pass-the-Hash",
        "explanation": "Salah. Pass-the-hash mencuri hash password NTLM untuk mengotentikasi ke server Windows tanpa mengetahui plaintext password."
      },
      {
        "key": "エ",
        "textJp": "ディレクトリトラバーサル",
        "textEnId": "Directory Traversal",
        "explanation": "Salah. Directory Traversal mengeksploitasi celah path file dengan karakter `../` untuk membaca file rahasia server."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "DNS Cache Poisoning: Penyerang menebak Transaction ID dan Source Port DNS query untuk menyelipkan record IP palsu ke cache server. Mitigasi: Source Port Randomization dan penerapan DNSSEC (tanda tangan digital kriptografis pada DNS record).",
    "keyTakeaway": "Manipulasi Cache DNS Mengarahkan ke IP Palsu = DNS Cache Poisoning."
  },
  {
    "id": "quiz-tech-15",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Database (SQL GROUP BY & HAVING)",
    "questionJp": "SQLにおいて、GROUP BY句によってグループ化した集約結果に対して、条件を指定して絞り込みを行うために使用する句はどれか。",
    "questionTranslation": "Dalam SQL, klausa yang digunakan untuk memfilter baris hasil agregasi setelah dikelompokkan oleh klausa GROUP BY adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "WHERE",
        "textEnId": "WHERE",
        "explanation": "Salah. Klausa WHERE memfilter baris data individu SEBELUM proses pengelompokan/agregasi dilakukan."
      },
      {
        "key": "イ",
        "textJp": "HAVING",
        "textEnId": "HAVING",
        "explanation": "Benar! Klausa HAVING digunakan khusus untuk menentukan kondisi filter pada hasil fungsi agregasi (seperti COUNT, SUM, AVG) SETELAH GROUP BY."
      },
      {
        "key": "ウ",
        "textJp": "ORDER BY",
        "textEnId": "ORDER BY",
        "explanation": "Salah. ORDER BY digunakan untuk mengurutkan hasil query (ASC / DESC)."
      },
      {
        "key": "エ",
        "textJp": "DISTINCT",
        "textEnId": "DISTINCT",
        "explanation": "Salah. DISTINCT digunakan untuk menghilangkan duplikasi baris."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Urutan Eksekusi Logika SQL: FROM → WHERE (Filter baris awal) → GROUP BY (Pengelompokan) → HAVING (Filter hasil agregasi kelompok) → SELECT → ORDER BY.",
    "keyTakeaway": "Filter Baris Awal = WHERE. Filter Hasil Agregasi/Group = HAVING."
  },
  {
    "id": "quiz-tech-16",
    "year": "令和3年 過去問",
    "category": "technology",
    "subCategory": "Database (Outer Join)",
    "questionJp": "2つの表を結合する際、結合条件を満たす行だけでなく、一方の表にしか存在しない行も残し、対応する値が存在しない列には NULL を設定して結合する演算はどれか。",
    "questionTranslation": "Operasi penggabungan dua tabel yang tidak hanya mempertahankan baris yang cocok, melainkan juga tetap menampilkan seluruh baris dari salah satu tabel dan mengisi kolom yang tidak cocok dengan NULL adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "外部結合（Outer Join）",
        "textEnId": "Outer Join (外部結合)",
        "explanation": "Benar! Outer Join (seperti LEFT OUTER JOIN) mempertahankan seluruh baris dari tabel primer meskipun tidak memiliki pasangan di tabel kedua, dengan mengisi nilai NULL."
      },
      {
        "key": "イ",
        "textJp": "内部結合（Inner Join）",
        "textEnId": "Inner Join (内部結合)",
        "explanation": "Salah. Inner Join hanya menghasilkan baris yang memenuhi kondisi pencocokan di kedua tabel (baris yang tidak cocok dibuang)."
      },
      {
        "key": "ウ",
        "textJp": "交差結合（Cross Join）",
        "textEnId": "Cross Join",
        "explanation": "Salah. Cross Join menghasilkan perkalian kartesian (seluruh kombinasi baris tanpa syarat)."
      },
      {
        "key": "エ",
        "textJp": "直積（Cartesian Product）",
        "textEnId": "Cartesian Product",
        "explanation": "Salah. Sinonim matematis dari Cross Join."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Perbedaan Pokok Relational Join: 1. 内部結合 (Inner Join): Hanya baris yang cocok di kedua tabel. 2. 外部結合 (Outer Join): Mempertahankan baris yang tidak ada pasangannya dengan mengisi NULL pada kolom lawannya.",
    "keyTakeaway": "Baris Tanpa Pasangan Tetap Tampil Diisi NULL = 外部結合 (Outer Join)."
  },
  {
    "id": "quiz-tech-17",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Operating Systems (Virtual Memory LRU)",
    "questionJp": "仮想記憶管理におけるページ置換アルゴリズムのうち、最も長い時間参照されていないページを選択して主記憶から追い出す方式はどれか。",
    "questionTranslation": "Dalam manajemen memori virtual, algoritma penggantian page yang memilih untuk mengeluarkan halaman yang paling lama tidak diakses/dirujuk dari memori utama adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "FIFO（First In First Out）",
        "textEnId": "FIFO",
        "explanation": "Salah. FIFO mengeluarkan halaman yang paling pertama kali dimuat ke memori, tanpa peduli kapan terakhir kali diakses."
      },
      {
        "key": "イ",
        "textJp": "LRU（Least Recently Used）",
        "textEnId": "LRU (Least Recently Used)",
        "explanation": "Benar! LRU memantau riwayat akses dan mengganti page yang paling lama tidak diakses sejak pemakaian terakhirnya."
      },
      {
        "key": "ウ",
        "textJp": "LFU（Least Frequently Used）",
        "textEnId": "LFU",
        "explanation": "Salah. LFU mengganti page dengan total frekuensi jumlah akses paling sedikit."
      },
      {
        "key": "エ",
        "textJp": "LIFO（Last In First Out）",
        "textEnId": "LIFO",
        "explanation": "Salah. LIFO mengganti page yang paling terakhir masuk (struktur stack)."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Algoritma Page Replacement: 1. FIFO: Urutan masuk memori. 2. LRU (Least Recently Used): Paling lama tidak diakses (waktu akses terakhir paling lampau). 3. LFU (Least Frequently Used): Total frekuensi kali akses paling sedikit.",
    "keyTakeaway": "Paling Lama Tidak Diakses Sejak Terakhir Dipakai = LRU."
  },
  {
    "id": "quiz-tech-18",
    "year": "令和3年 過去問",
    "category": "technology",
    "subCategory": "Operating Systems (Deadlock Conditions)",
    "questionJp": "マルチタスク環境においてデッドロック（Deadlock）が発生するために成立する4つの必要条件に含まれないものはどれか。",
    "questionTranslation": "Di antara pilihan berikut, manakah yang BUKAN merupakan salah satu dari 4 syarat mutlak terjadinya Deadlock dalam sistem operasi?",
    "options": [
      {
        "key": "ア",
        "textJp": "相互排他（Mutual Exclusion）",
        "textEnId": "Mutual Exclusion",
        "explanation": "Salah. Ini adalah syarat deadlock: sumber daya hanya dapat digunakan oleh satu proses pada satu saat."
      },
      {
        "key": "イ",
        "textJp": "占有と待機（Hold and Wait）",
        "textEnId": "Hold and Wait",
        "explanation": "Salah. Ini adalah syarat deadlock: proses menahan sumber daya yang sudah didapat sambil menunggu sumber daya lain."
      },
      {
        "key": "ウ",
        "textJp": "非横取り（No Preemption）",
        "textEnId": "No Preemption",
        "explanation": "Salah. Ini adalah syarat deadlock: sumber daya yang sedang dipegang tidak dapat direbut paksa oleh proses lain."
      },
      {
        "key": "エ",
        "textJp": "プリエンプティブスケジューリング（Preemption）",
        "textEnId": "Preemptive Scheduling",
        "explanation": "Benar! Kemampuan merebut sumber daya (Preemption) justru MENCEGAH deadlock; syarat terjadinya deadlock adalah '非横取り' (No Preemption / Tidak Bisa Direbut)."
      }
    ],
    "correctKey": "エ",
    "summaryExplanation": "4 Syarat Terjadinya Deadlock (Coffman Conditions): 1. 相互排他 (Mutual Exclusion), 2. 占有と待機 (Hold and Wait), 3. 非横取り (No Preemption), 4. 循環待機 (Circular Wait). Jika salah satu dari 4 syarat ini berhasil digugurkan, deadlock mustahil terjadi.",
    "keyTakeaway": "Syarat Deadlock = 排他 + 占有待機 + 非横取り + 循環待機."
  },
  {
    "id": "quiz-tech-19",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Network Protocol (TCP Handshake)",
    "questionJp": "TCPにおいて、コネクションを確立する際に行われる3方向ハンドシェイク（3-way handshake）で送受信されるパケットのフラグの正しい順序はどれか。",
    "questionTranslation": "Urutan bendera (flag) paket yang benar yang dikirim dan diterima saat pembentukan koneksi TCP (3-way handshake) adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "SYN → SYN+ACK → ACK",
        "textEnId": "SYN → SYN+ACK → ACK",
        "explanation": "Benar! Klien mengirim SYN, server membalas dengan SYN+ACK, dan klien mengonfirmasi dengan ACK. Status koneksi berubah menjadi ESTABLISHED."
      },
      {
        "key": "イ",
        "textJp": "ACK → SYN → ACK",
        "textEnId": "ACK → SYN → ACK",
        "explanation": "Salah. Klien tidak memulai koneksi dengan paket ACK."
      },
      {
        "key": "ウ",
        "textJp": "SYN → ACK → FIN",
        "textEnId": "SYN → ACK → FIN",
        "explanation": "Salah. FIN adalah flag untuk memutus koneksi (termination), bukan membangun koneksi."
      },
      {
        "key": "エ",
        "textJp": "RST → SYN → ACK",
        "textEnId": "RST → SYN → ACK",
        "explanation": "Salah. RST adalah flag reset untuk membatalkan koneksi secara mendadak."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Alur 3-Way Handshake TCP: 1. Client → Server: [SYN] (Permintaan koneksi & nomor urut awal). 2. Server → Client: [SYN + ACK] (Menyetujui & mengirim nomor urut server). 3. Client → Server: [ACK] (Konfirmasi penerimaan).",
    "keyTakeaway": "Koneksi TCP = SYN → SYN/ACK → ACK."
  },
  {
    "id": "quiz-tech-20",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Email Security Protocols (SPF)",
    "questionJp": "電子メールの送信元ドメインの詐称を防ぐ技術のうち、送信側ドメインのDNSサーバに正当な送信元メールサーバのIPアドレスをあらかじめ登録しておき、受信側で送信元IPアドレスを照合する仕組みはどれか。",
    "questionTranslation": "Teknologi pencegah pemalsuan domain pengirim email di mana IP server pengirim yang sah didaftarkan di DNS domain pengirim, dan server penerima mencocokkan IP pengirim tersebut adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "SPF（Sender Policy Framework）",
        "textEnId": "SPF (Sender Policy Framework)",
        "explanation": "Benar! SPF menggunakan TXT record pada DNS domain pengirim untuk mendeklarasikan daftar alamat IP mail server resmi."
      },
      {
        "key": "イ",
        "textJp": "DKIM（DomainKeys Identified Mail）",
        "textEnId": "DKIM",
        "explanation": "Salah. DKIM menggunakan tanda tangan digital kriptografi pada header email (bukan pencocokan IP server)."
      },
      {
        "key": "ウ",
        "textJp": "DMARC",
        "textEnId": "DMARC",
        "explanation": "Salah. DMARC adalah kebijakan tindakan (reject/quarantine) dan pelaporan jika verifikasi SPF atau DKIM gagal."
      },
      {
        "key": "エ",
        "textJp": "S/MIME",
        "textEnId": "S/MIME",
        "explanation": "Salah. S/MIME adalah enkripsi pesan dan tanda tangan digital end-to-end berbasis sertifikat digital pengguna."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Trio Keamanan Email Anti-Spoofing: 1. SPF: Daftar IP server yang sah di DNS TXT record. 2. DKIM: Tanda tangan digital pada header email. 3. DMARC: Kebijakan penanganan jika SPF/DKIM tidak lolos.",
    "keyTakeaway": "Verifikasi IP Pengirim via DNS TXT Record = SPF."
  },
  {
    "id": "quiz-tech-21",
    "year": "令和3年 過去問",
    "category": "technology",
    "subCategory": "Software Engineering (Polymorphism)",
    "questionJp": "オブジェクト指向において、同じメッセージ（メソッド呼び出し）を送っても、受信したオブジェクトのクラスによって異なる処理が実行される性質は何と呼ばれるか。",
    "questionTranslation": "Dalam pemrograman berorientasi objek, sifat di mana pemanggilan metode yang sama dapat menghasilkan perilaku berbeda tergantung pada kelas objek penerima disebut:",
    "options": [
      {
        "key": "ア",
        "textJp": "継承（インヘリタンス）",
        "textEnId": "Inheritance (継承)",
        "explanation": "Salah. Inheritance adalah pewarisan atribut dan metode dari superclass ke subclass."
      },
      {
        "key": "イ",
        "textJp": "カプセル化",
        "textEnId": "Encapsulation (カプセル化)",
        "explanation": "Salah. Encapsulation adalah menyembunyikan data internal dan membatasi manipulasi langsung hanya melalui antarmuka metode."
      },
      {
        "key": "ウ",
        "textJp": "多態性（ポリモーフィズム）",
        "textEnId": "Polymorphism (多態性)",
        "explanation": "Benar! Polymorphism (多態性) memungkinkan satu panggilan antarmuka yang seragam mengeksekusi implementasi yang spesifik untuk masing-masing kelas objek."
      },
      {
        "key": "エ",
        "textJp": "抽象化",
        "textEnId": "Abstraction (抽象化)",
        "explanation": "Salah. Abstraction adalah menyaring esensi karakteristik penting dan mengabaikan detail implementasi minor."
      }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "3 Pilar Utama OOP: 1. カプセル化 (Encapsulation): Sembunyikan data (Information Hiding). 2. 継承 (Inheritance): Wariskan kode ke anak kelas. 3. 多態性 (Polymorphism): Pesan yang sama menghasilkan respon berbeda sesuai tipe objek.",
    "keyTakeaway": "Perintah Sama, Hasil Respon Berbeda Tiap Objek = 多態性 (Polymorphism)."
  },
  {
    "id": "quiz-tech-22",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Computer Architecture (DMA)",
    "questionJp": "CPUを介さずに、入出力装置（I/Oデバイス）と主記憶（メインメモリ）との間で直接高速にデータ転送を行う制御方式はどれか。",
    "questionTranslation": "Metode kontrol transfer data berkecepatan tinggi secara langsung antara perangkat I/O dan memori utama tanpa melalui intervensi instruksi CPU terus-menerus adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "DMA（Direct Memory Access）",
        "textEnId": "DMA (Direct Memory Access)",
        "explanation": "Benar! DMA controller mengambil alih bus sistem dan mentransfer data secara langsung antara perangkat I/O dan memori, membebaskan beban CPU untuk tugas komputasi lainnya."
      },
      {
        "key": "イ",
        "textJp": "プログラム制御入出力",
        "textEnId": "Programmed I/O",
        "explanation": "Salah. Programmed I/O mengharuskan CPU membaca dan menulis data per-byte atau per-word secara terus-menerus."
      },
      {
        "key": "ウ",
        "textJp": "割り込み制御",
        "textEnId": "Interrupt Control",
        "explanation": "Salah. Interrupt adalah sinyal pemberitahuan saat I/O selesai, bukan jalur transfer data mandiri."
      },
      {
        "key": "エ",
        "textJp": "メモリマップドI/O",
        "textEnId": "Memory-Mapped I/O",
        "explanation": "Salah. Memory-mapped I/O adalah metode pemetaan port register I/O ke ruang alamat memori."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "DMA (Direct Memory Access): Kontroler transfer khusus yang memindahkan blok data besar antara I/O dan memori utama secara otonom tanpa melalui register CPU, sangat meningkatkan throughput transfer disk dan jaringan.",
    "keyTakeaway": "Transfer I/O Langsung ke Memori Tanpa Beban CPU = DMA."
  },
  {
    "id": "quiz-tech-23",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Information Security (EDR)",
    "questionJp": "PCやサーバなどの端末（エンドポイント）における動作ログを常時監視し、万が一マルウェアに侵入された場合でも、その挙動をいち早く検知して隔離や調査を行うセキュリティツールはどれか。",
    "questionTranslation": "Alat keamanan yang terus memantau log perilaku perangkat terminal (endpoint) dan dengan cepat mendeteksi serta mengisolasi anomali jika malware berhasil menembus sistem adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "EDR（Endpoint Detection and Response）",
        "textEnId": "EDR",
        "explanation": "Benar! EDR memantau perilaku endpoint secara real-time dan berfokus pada deteksi, respons penahanan (seperti isolasi jaringan perangkat), dan investigasi forensik pasca-infeksi."
      },
      {
        "key": "イ",
        "textJp": "WAF（Web Application Firewall）",
        "textEnId": "WAF",
        "explanation": "Salah. WAF memfilter lalu lintas HTTP/HTTPS untuk melindungi server aplikasi web dari eksploitasi seperti SQL Injection dan XSS."
      },
      {
        "key": "ウ",
        "textJp": "VPN（Virtual Private Network）",
        "textEnId": "VPN",
        "explanation": "Salah. VPN adalah terowongan komunikasi terenkripsi aman antar jaringan."
      },
      {
        "key": "エ",
        "textJp": "IDS（Intrusion Detection System）",
        "textEnId": "IDS",
        "explanation": "Salah. IDS umumnya memantau lalu lintas paket pada segmen kabel jaringan (Network-based)."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Pergeseran Paradigma Keamanan: Antivirus tradisional berfokus pada pencegahan di gerbang (mendeteksi signature file). EDR (Endpoint Detection and Response) berfokus pada asumsi bahwa malware bisa lolos, sehingga memantau perilaku endpoint secara aktif untuk mendeteksi dan mengisolasi insiden dengan cepat.",
    "keyTakeaway": "Monitoring & Respon Cepat Pasca-Infeksi di Endpoint = EDR."
  },
  {
    "id": "quiz-tech-24",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Infrastructure & Virtualization (Containers)",
    "questionJp": "コンテナ型仮想化（Dockerなど）が、ハイパーバイザ型仮想化と比較して持つ特徴として、適切なものはどれか。",
    "questionTranslation": "Karakteristik yang dimiliki oleh virtualisasi berbasis kontainer (seperti Docker) jika dibandingkan dengan virtualisasi berbasis hypervisor adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "ゲストOSを起動する必要がないため、起動時間が短くリソース消費が少ない。",
        "textEnId": "Tidak butuh booting guest OS sehingga start instan dan hemat resource.",
        "explanation": "Benar! Kontainer berbagi kernel Host OS yang sama dan berjalan sebagai proses terisolasi, sehingga tidak perlu overhead booting OS terpisah."
      },
      {
        "key": "イ",
        "textJp": "ホストOSとは異なるカーネルのOSを自由に実行できる。",
        "textEnId": "Dapat menjalankan sembarang kernel OS yang berbeda dari host.",
        "explanation": "Salah. Kontainer berbagi kernel host, sehingga kontainer Linux tidak bisa berjalan langsung di host kernel non-Linux tanpa lapisan emulasi."
      },
      {
        "key": "ウ",
        "textJp": "各コンテナの独立性がハイパーバイザよりも強固である。",
        "textEnId": "Isolasi keamanan lebih kuat dibanding hypervisor.",
        "explanation": "Salah. Karena berbagi kernel, isolasi kontainer relatif lebih tipis dibandingkan isolasi perangkat keras penuh pada VM Hypervisor."
      },
      {
        "key": "エ",
        "textJp": "物理ハードウェアを完全にエミュレートして動作する。",
        "textEnId": "Mengemulasi hardware fisik secara penuh.",
        "explanation": "Salah. Kontainer tidak mengemulasi hardware."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Perbandingan Virtualisasi: 1. Hypervisor (VMware/KVM): Menjalankan Guest OS penuh di atas virtual hardware (Isolasi kuat, tapi berat & boot lambat). 2. Container (Docker): Berbagi kernel host menggunakan Linux namespaces & cgroups (Sangat ringan, start dalam hitungan detik).",
    "keyTakeaway": "Tanpa Guest OS Mandiri, Boot Cepat & Ringan = コンテナ (Container)."
  },
  {
    "id": "quiz-tech-25",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Cryptography (Digital Signature)",
    "questionJp": "送信者がメッセージにディジタル署名を付与して送信することによって達成できるセキュリティ要件として、最も適切なものはどれか。",
    "questionTranslation": "Persyaratan keamanan yang dapat dipenuhi ketika pengirim membubuhkan tanda tangan digital (Digital Signature) pada pesan yang dikirim adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "メッセージの盗聴を防ぎ、機密性を保つ。",
        "textEnId": "Mencegah penyadapan pesan dan menjaga kerahasiaan.",
        "explanation": "Salah. Tanda tangan digital saja tidak mengenkripsi teks pesan asli (tidak memberikan kerahasiaan / confidentiality)."
      },
      {
        "key": "イ",
        "textJp": "送信元が正当であることの証明と、メッセージが改ざんされていないことの検証（改ざん検知・否認防止）。",
        "textEnId": "Verifikasi keaslian pengirim dan pembuktian integritas data (anti-tamper & non-repudiation).",
        "explanation": "Benar! Digital signature mengenkripsi hash pesan menggunakan kunci privat pengirim, membuktikan bahwa pesan tidak diubah (改ざん検知) dan pengirim tidak dapat menyangkal pengirimannya (否認防止)."
      },
      {
        "key": "ウ",
        "textJp": "サーバのDoS攻撃を防御する。",
        "textEnId": "Mencegah serangan Denial of Service.",
        "explanation": "Salah. Tidak ada hubungan dengan DoS."
      },
      {
        "key": "エ",
        "textJp": "パスワードを自動生成して安全に保存する。",
        "textEnId": "Membuat dan menyimpan password otomatis.",
        "explanation": "Salah. Tidak ada kaitan dengan pembuatan sandi."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Tujuan Tanda Tangan Digital (ディジタル署名): 1. 改ざん検知 (Integrity / Deteksi Modifikasi): Memastikan pesan tidak diubah di tengah jalan. 2. 真正性の確認 (Authenticity): Memastikan pengirim benar-benar pemilik kunci privat. 3. 否認防止 (Non-repudiation): Pengirim tidak bisa menyangkal telah mengirim pesan.",
    "keyTakeaway": "Tanda Tangan Digital = Deteksi Manipulasi (改ざん検知) + Anti-Sangkalan (否認防止)."
  },
  {
    "id": "quiz-mgmt-01",
    "year": "令和5年 過去問",
    "category": "management",
    "subCategory": "Project Management (PERT Critical Path)",
    "questionJp": "プロジェクトマネジメントにおいて、アローダイアグラム（PERT）で作業の最早開始日と最遅開始日が一致する結合点を結ぶ経路は何と呼ばれるか。",
    "questionTranslation": "Dalam manajemen proyek diagram panah (PERT), jalur yang menghubungkan titik-titik di mana tanggal mulai paling awal sama persis dengan tanggal mulai paling lambat disebut apa?",
    "options": [
      {
        "key": "ア",
        "textJp": "クリティカルパス",
        "textEnId": "Critical Path (Jalur Kritis)",
        "explanation": "Benar! Jalur ini memiliki kelonggaran waktu nol (余裕日数 = 0). Keterlambatan di jalur ini langsung menunda proyek secara keseluruhan."
      },
      {
        "key": "イ",
        "textJp": "ダミー作業",
        "textEnId": "Dummy Activity",
        "explanation": "Salah. Dummy activity adalah garis putus-putus berdurasi 0 hari yang hanya dipakai untuk menunjukkan ketergantungan urutan."
      },
      {
        "key": "ウ",
        "textJp": "トローリング",
        "textEnId": "Trolling / Fast Tracking",
        "explanation": "Salah. Ini bukan istilah jalur PERT melainkan teknik kompresi jadwal."
      },
      {
        "key": "エ",
        "textJp": "スラックパス",
        "textEnId": "Slack Path",
        "explanation": "Salah. Slack adalah kelonggaran waktu (余裕時間), yang bernilai 0 pada jalur kritis."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Critical Path adalah jalur dengan durasi total terpanjang dalam proyek. Ciri khasnya: Earliest Start Date = Latest Start Date (tidak ada toleransi molor / 余裕日数なし).",
    "keyTakeaway": "Earliest = Latest Date → Critical Path (0 hari toleransi)."
  },
  {
    "id": "quiz-mgmt-02",
    "year": "令和4年 過去問",
    "category": "management",
    "subCategory": "EVM Project Management",
    "questionJp": "EVM（Earned Value Management）において、PV（計画価値）が 100万円、EV（獲得価値）が 80万円、AC（実コスト）が 90万円であるとき、プロジェクトの進捗とコストの状態として適切なものはどれか。",
    "questionTranslation": "Dalam EVM, jika PV = 1.000.000 yen, EV = 800.000 yen, dan AC = 900.000 yen, bagaimana kondisi kemajuan jadwal dan biaya proyek saat ini?",
    "options": [
      {
        "key": "ア",
        "textJp": "スケジュールは進んでおり、コストは予算を下回っている。",
        "textEnId": "Jadwal maju, biaya hemat",
        "explanation": "Salah. Baik jadwal maupun biaya sedang dalam kondisi buruk."
      },
      {
        "key": "イ",
        "textJp": "スケジュールは進んでいるが、コストは予算を超過している。",
        "textEnId": "Jadwal maju, biaya boros",
        "explanation": "Salah. SV bernilai negatif sehingga jadwal terlambat."
      },
      {
        "key": "ウ",
        "textJp": "スケジュールは遅れており、コストは予算を超過している。",
        "textEnId": "Jadwal terlambat (SV < 0), biaya membengkak (CV < 0)",
        "explanation": "Benar! SV = EV - PV = 80万 - 100万 = -20万 (terlambat). CV = EV - AC = 80万 - 90万 = -10万 (overbudget / biaya membengkak)."
      },
      {
        "key": "エ",
        "textJp": "スケジュールは遅れているが、コストは予算を下回っている。",
        "textEnId": "Jadwal terlambat, biaya hemat",
        "explanation": "Salah. CV bernilai negatif sehingga biaya tidak hemat."
      }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "Rumus Inti EVM: 1. SV (Schedule Variance) = EV - PV. Jika negatif, proyek terlambat. 2. CV (Cost Variance) = EV - AC. Jika negatif, biaya membengkak (Cost Overrun). Di soal ini: SV = -20万 (terlambat) dan CV = -10万 (overbudget).",
    "keyTakeaway": "EV - PV < 0: Terlambat. EV - AC < 0: Overbudget. Keduanya negatif = Proyek bermasalah."
  },
  {
    "id": "quiz-mgmt-03",
    "year": "令和4年 過去問",
    "category": "management",
    "subCategory": "IT Service Management (ITIL)",
    "questionJp": "ITサービスマネジメント（ITIL）における『インシデント管理』の主な目的として、最も適切なものはどれか。",
    "questionTranslation": "Tujuan utama dari 'Incident Management' (インシデント管理) dalam kerangka kerja ITIL adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "インシデントの根本原因を突き止め、将来的な再発を恒久的に防止すること。",
        "textEnId": "Mencari akar penyebab dan mencegah kekambuhan permanen",
        "explanation": "Salah. Mencari akar penyebab (Root Cause) dan pencegahan permanen adalah tugas dari 問題管理 (Problem Management)."
      },
      {
        "key": "イ",
        "textJp": "中断したITサービスを可能な限り迅速に正常復旧させ、ビジネスへの影響を最小限に抑えること。",
        "textEnId": "Memulihkan layanan secepat mungkin untuk meminimalkan dampak bisnis",
        "explanation": "Benar! Incident Management memprioritaskan pemulihan kilat (termasuk workaround sementara) agar operasional bisnis segera berjalan kembali."
      },
      {
        "key": "ウ",
        "textJp": "すべての変更作業を承認し、本番環境へのリスクを評価すること。",
        "textEnId": "Menyetujui perubahan dan mengevaluasi risiko rilis",
        "explanation": "Salah. Ini adalah tugas dari 変更管理 (Change Management)."
      },
      {
        "key": "エ",
        "textJp": "ITサービスの提供に必要な資産と構成アイテムを正確に記録すること。",
        "textEnId": "Mencatat aset dan item konfigurasi sistem",
        "explanation": "Salah. Ini adalah tugas dari サービス構成管理 (Service Configuration Management / CMDB)."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Perbedaan Paling Sering Diuji di IPA: 1. インシデント管理 (Incident Mgmt): Fokus Cepat Pulih (迅速な復旧), boleh pakai workaround sementara. 2. 問題管理 (Problem Mgmt): Fokus Akar Penyebab (根本原因究明) & Cegah Kambuh (再発防止).",
    "keyTakeaway": "Incident = Pulihkan Cepat (Workaround OK). Problem = Cari Akar Masalah Permanen."
  },
  {
    "id": "quiz-mgmt-04",
    "year": "令和3年 過去問",
    "category": "management",
    "subCategory": "Software Testing (Boundary Value)",
    "questionJp": "ブラックボックステストにおけるテストケース設計手法のうち、入力条件の境界となる値とその隣接した値を選択してテストを行う手法はどれか。",
    "questionTranslation": "Dalam perancangan test case black-box testing, metode yang memilih nilai batas dari kondisi input beserta nilai-nilai tepat di samping batas tersebut disebut apa?",
    "options": [
      {
        "key": "ア",
        "textJp": "同値分割法",
        "textEnId": "Equivalence Partitioning (同値分割法)",
        "explanation": "Salah. 同値分割法 membagi input menjadi grup valid dan tidak valid, lalu mengambil 1 nilai representatif dari tengah grup."
      },
      {
        "key": "イ",
        "textJp": "限界値分析（境界値分析）",
        "textEnId": "Boundary Value Analysis (限界値分析)",
        "explanation": "Benar! 限界値分析 (Boundary Value Analysis) berfokus menguji titik perbatasan (seperti n-1, n, n+1) di mana bug pemrograman (seperti tanda < vs <=) paling rawan muncul."
      },
      {
        "key": "ウ",
        "textJp": "デシジョンテーブルテスト",
        "textEnId": "Decision Table Testing",
        "explanation": "Salah. Metode ini menggunakan tabel logika kondisi majemuk untuk menentukan aksi."
      },
      {
        "key": "エ",
        "textJp": "原因結果グラフ法",
        "textEnId": "Cause-Effect Graphing",
        "explanation": "Salah. Metode grafis relasi boolean antara sebab dan akibat input/output."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Teknik Black-Box Paling Populer: 1. 同値分割 (Equivalence Partitioning): Mengambil nilai sembarang dari kelas ekuivalen. 2. 限界値分析 (Boundary Value Analysis): Menguji tepat di titik batas dan sekitarnya (titik kritis kesalahan logika operator perbandingan).",
    "keyTakeaway": "Uji Nilai Batas Titik Kritis (< vs <=) = 限界値分析 (Boundary Value Analysis)."
  },
  {
    "id": "quiz-mgmt-05",
    "year": "令和4年 過去問",
    "category": "management",
    "subCategory": "Project Management (Total Float)",
    "questionJp": "プロジェクトのPERT図において、ある作業の最早開始日が第4日、最遅開始日が第9日であるとき、この作業の総余裕時間（トータルフロート）は何日か。",
    "questionTranslation": "Dalam diagram PERT proyek, jika suatu aktivitas memiliki Earliest Start Date (最早開始日) hari ke-4 dan Latest Start Date (最遅開始日) hari ke-9, berapakah Total Float (総余裕時間) dari aktivitas tersebut?",
    "options": [
      {
        "key": "ア",
        "textJp": "0 日",
        "textEnId": "0 Hari",
        "explanation": "Salah. 0 hari hanya berlaku untuk aktivitas yang berada tepat di jalur kritis (Critical Path)."
      },
      {
        "key": "イ",
        "textJp": "4 日",
        "textEnId": "4 Hari",
        "explanation": "Salah. 4 hari adalah nilai Earliest Start Date."
      },
      {
        "key": "ウ",
        "textJp": "5 日",
        "textEnId": "5 Hari",
        "explanation": "Benar! Total Float = Latest Start Date - Earliest Start Date = 9 - 4 = 5 hari. Aktivitas ini boleh molor hingga 5 hari tanpa mengundurkan tanggal selesai proyek."
      },
      {
        "key": "エ",
        "textJp": "9 日",
        "textEnId": "9 Hari",
        "explanation": "Salah. 9 hari adalah nilai Latest Start Date."
      }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "Rumus Total Float (総余裕時間): Total Float = 最遅開始日 (LS) - 最早開始日 (ES) atau 最遅終了日 (LF) - 最早終了日 (EF). Pada soal: 9 - 4 = 5 hari. Jika Total Float = 0, maka aktivitas tersebut berada di jalur kritis.",
    "keyTakeaway": "Total Float = Latest Start - Earliest Start. (Batas toleransi molor proyek)."
  },
  {
    "id": "quiz-mgmt-06",
    "year": "令和5年 過去問",
    "category": "management",
    "subCategory": "Project Scope Management (WBS)",
    "questionJp": "WBS（Work Breakdown Structure）において、作業を階層的に細分化していき、責任者の割り当てやコスト・スケジュールの見積もりが可能となる最下層の構成要素は何と呼ばれるか。",
    "questionTranslation": "Dalam WBS, elemen terkecil pada tingkat paling bawah dari dekomposisi hierarki kerja tempat estimasi biaya, jadwal, dan penugasan penanggung jawab dilakukan disebut:",
    "options": [
      {
        "key": "ア",
        "textJp": "マイルストーン",
        "textEnId": "Milestone",
        "explanation": "Salah. Milestone adalah titik acuan capaian penting yang berdurasi nol hari."
      },
      {
        "key": "イ",
        "textJp": "ワークパッケージ（Work Package）",
        "textEnId": "Work Package (ワークパッケージ)",
        "explanation": "Benar! Work Package adalah unit kerja terkecil pada WBS yang dapat diestimasi waktu dan biayanya secara mandiri dan ditugaskan ke satu penanggung jawab."
      },
      {
        "key": "ウ",
        "textJp": "コントロールアカウント",
        "textEnId": "Control Account",
        "explanation": "Salah. Control Account berada di atas work package sebagai simpul pengawasan biaya terpadu."
      },
      {
        "key": "エ",
        "textJp": "クリティカルパス",
        "textEnId": "Critical Path",
        "explanation": "Salah. Critical path adalah jalur durasi terpanjang dalam diagram jaringan proyek."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Struktur WBS: Dekomposisi lingkup proyek menjadi potongan-potongan hierarkis. Level terbawah adalah ワークパッケージ (Work Package). Setiap work package memiliki deliverable terdefinisi, estimasi jam kerja terukur, dan satu PIC penanggung jawab.",
    "keyTakeaway": "Unit Kerja Terkecil di Dasar Hierarki WBS = ワークパッケージ (Work Package)."
  },
  {
    "id": "quiz-mgmt-07",
    "year": "令和3年 過去問",
    "category": "management",
    "subCategory": "Project Risk Management (Strategies)",
    "questionJp": "PMBOKにおけるマイナスのリスク（脅威）に対する対応戦略のうち、損害保険への加入や業務の外部委託（アウトソーシング）によって、リスクの影響や責任を第三者に移す戦略はどれか。",
    "questionTranslation": "Dalam PMBOK, strategi respon terhadap risiko negatif (ancaman) dengan membeli asuransi atau mengalihkan pekerjaan ke pihak ketiga (outsourcing) agar dampak dan tanggung jawab risiko berpindah ke pihak ketiga adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "回避（Avoidance）",
        "textEnId": "Avoidance (回避)",
        "explanation": "Salah. Avoidance adalah menghilangkan sumber risiko sama sekali (misalnya membatalkan implementasi modul yang berisiko)."
      },
      {
        "key": "イ",
        "textJp": "転嫁／移転（Transference）",
        "textEnId": "Transference (転嫁 / 移転)",
        "explanation": "Benar! Transference adalah mengalihkan kepemilikan dan konsekuensi kerugian finansial akibat risiko kepada pihak ketiga (contoh: asuransi, kontrak bergaransi vendor)."
      },
      {
        "key": "ウ",
        "textJp": "軽減（Mitigation）",
        "textEnId": "Mitigation (軽減)",
        "explanation": "Salah. Mitigation adalah tindakan mengurangi probabilitas kemunculan atau keparahan dampak risiko (misalnya menambah sesi pengujian beban)."
      },
      {
        "key": "エ",
        "textJp": "受容（Acceptance）",
        "textEnId": "Acceptance (受容)",
        "explanation": "Salah. Acceptance adalah menerima risiko apa adanya tanpa pencegahan aktif, hanya menyediakan dana cadangan darurat."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "4 Respon Risiko Negatif PMBOK: 1. 回避 (Avoidance): Menghilangkan risiko total. 2. 転嫁 (Transference): Mengalihkan risiko ke pihak ke-3 (Asuransi/Outsource). 3. 軽減 (Mitigation): Memperkecil probabilitas atau dampaknya. 4. 受容 (Acceptance): Pasrah/Menerima dengan contingency fund.",
    "keyTakeaway": "Beli Asuransi / Alihkan ke Pihak Ketiga = 転嫁 (Transference)."
  },
  {
    "id": "quiz-mgmt-08",
    "year": "令和4年 過去問",
    "category": "management",
    "subCategory": "IT Service Management (SLA Availability)",
    "questionJp": "SLA（Service Level Agreement）でシステムの年間可用性（稼働率）目標を 99.9% と定めている場合、1年間（365日＝8,760時間）において許容される年間の最大停止時間として最も近いものはどれか。",
    "questionTranslation": "Jika dalam SLA target ketersediaan tahunan (uptime) sistem disepakati sebesar 99,9%, berapakah toleransi waktu henti (downtime) maksimum dalam 1 tahun (365 hari = 8.760 jam)?",
    "options": [
      {
        "key": "ア",
        "textJp": "約 50 分",
        "textEnId": "Sekitar 50 Menit",
        "explanation": "Salah. 50 menit per tahun adalah toleransi untuk ketersediaan 99.99% (Four Nines)."
      },
      {
        "key": "イ",
        "textJp": "約 8.8 時間",
        "textEnId": "Sekitar 8.8 Jam",
        "explanation": "Benar! Toleransi downtime = 100% - 99.9% = 0.1% (0.001). 8.760 jam × 0.001 = 8.76 jam (sekitar 8 jam 45 menit)."
      },
      {
        "key": "ウ",
        "textJp": "約 36.5 時間",
        "textEnId": "Sekitar 36.5 Jam",
        "explanation": "Salah. Nilai ini setara dengan tingkat downtime 0.4%."
      },
      {
        "key": "エ",
        "textJp": "約 87.6 時間",
        "textEnId": "Sekitar 87.6 Jam",
        "explanation": "Salah. 87.6 jam diperoleh jika uptime sistem hanya 99.0% (One Nine)."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Perhitungan Downtime SLA: 1 tahun = 365 hari × 24 jam = 8.760 jam. Target Uptime = 99.9% → Rasio Downtime = 0.1% = 0.001. Maksimal Downtime = 8.760 × 0.001 = 8.76 jam ≈ 8.8 jam per tahun.",
    "keyTakeaway": "Toleransi Downtime 99.9% (Three Nines) = ±8.8 jam/tahun."
  },
  {
    "id": "quiz-mgmt-09",
    "year": "令和5年 過去問",
    "category": "management",
    "subCategory": "Business Continuity (RTO & RPO)",
    "questionJp": "BCP（事業継続計画）において、システム障害や災害が発生した時点から、業務やシステムを復旧させて再開するまでに許容される目標限界時間を表す指標はどれか。",
    "questionTranslation": "Dalam Business Continuity Plan (BCP), batas toleransi waktu yang diizinkan mulai dari terjadinya bencana/gangguan hingga sistem berhasil dipulihkan dan dioperasikan kembali disebut:",
    "options": [
      {
        "key": "ア",
        "textJp": "RTO（Recovery Time Objective / 目標復旧時間）",
        "textEnId": "RTO (Recovery Time Objective)",
        "explanation": "Benar! RTO mengukur target durasi waktu maksimal pemulihan sistem sejak insiden hingga layanan siap melayani pengguna kembali."
      },
      {
        "key": "イ",
        "textJp": "RPO（Recovery Point Objective / 目標復旧時点）",
        "textEnId": "RPO (Recovery Point Objective)",
        "explanation": "Salah. RPO mengukur titik batas ke belakang toleransi kehilangan data (misalnya: data boleh hilang maksimal 1 jam terakhir backup)."
      },
      {
        "key": "ウ",
        "textJp": "MTBF（Mean Time Between Failures）",
        "textEnId": "MTBF",
        "explanation": "Salah. MTBF adalah rata-rata interval waktu operasi normal antar kegagalan sistem."
      },
      {
        "key": "エ",
        "textJp": "MTTR（Mean Time To Repair）",
        "textEnId": "MTTR",
        "explanation": "Salah. MTTR adalah rata-rata waktu perbaikan teknis sistem."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Dua Target Kunci BCP/Disaster Recovery: 1. RTO (Recovery Time Objective): TARGET WAKTU PULIH (Berapa jam sistem mati sampai bisa jalan lagi). 2. RPO (Recovery Point Objective): TARGET TITIK DATA (Berapa jam data yang hilang yang dapat diterima perusahaan).",
    "keyTakeaway": "Waktu Sampai Pulih = RTO (Time). Batas Kehilangan Data = RPO (Point)."
  },
  {
    "id": "quiz-mgmt-10",
    "year": "令和4年 過去問",
    "category": "management",
    "subCategory": "System Audit (Independence)",
    "questionJp": "経済産業省の『システム監査基準』において、システム監査人が客観的かつ公平な立場で監査業務を実施するために求められる基本姿勢として、最も適切なものはどれか。",
    "questionTranslation": "Dalam Standar Audit Sistem Kementerian Ekonomi, Perdagangan, dan Industri (METI) Jepang, sikap dasar yang wajib dimiliki auditor sistem agar dapat menjalankan audit secara objektif dan adil adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "被監査部門の業務効率向上のため、監査人自らが直接システムの運用改善作業を実施する。",
        "textEnId": "Auditor turun tangan langsung memperbaiki operasional sistem",
        "explanation": "Salah. Auditor sistem dilarang keras ikut campur menjalankan perbaikan operasional sistem yang diauditnya sendiri karena akan merusak objektivitas."
      },
      {
        "key": "イ",
        "textJp": "外観的にも実質的にも被監査部門から独立した立場を保持し、公平不偏の態度を貫く。",
        "textEnId": "Menjaga independensi lahiriah maupun batiniah serta bersikap adil tidak memihak",
        "explanation": "Benar! Kemandirian (独立性 - Independence) secara fisik/organisasional maupun mentalitas adalah syarat mutlak auditor sistem dalam standar METI."
      },
      {
        "key": "ウ",
        "textJp": "監査結果の改善勧告について、法的拘束力を持って被監査部門に強制執行する。",
        "textEnId": "Memaksa eksekusi rekomendasi dengan kekuatan hukum",
        "explanation": "Salah. Hasil audit sistem bersifat rekomendasi (助言・勧告) kepada manajemen, bukan eksekusi hukum pidana/perdata."
      },
      {
        "key": "エ",
        "textJp": "監査費用を削減するため、被監査部門の管理職に内部調査を一任し、その報告書のみを承認する。",
        "textEnId": "Menyerahkan investigasi kepada bagian yang diaudit demi hemat biaya",
        "explanation": "Salah. Hal ini melanggar integritas pengumpulan bukti audit mandiri."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Prinsip Utama Auditor Sistem (システム監査基準): Auditor harus memiliki 'Independensi' (独立性) baik secara 外観的独立性 (secara struktur organisasi tidak di bawah departemen yang diaudit) maupun 実質的独立性 (mentalitas bebas benturan kepentingan).",
    "keyTakeaway": "Auditor Wajib Independen (外観的・実質的独立性) & Tidak Mengoperasikan Sistem Sendiri."
  },
  {
    "id": "quiz-strat-01",
    "year": "令和5年 過去問",
    "category": "strategy",
    "subCategory": "IT Law & Compliance (Copyright)",
    "questionJp": "日本の著作権法において、コンピュータプログラムに関して保護の対象となるものとして、適切なものはどれか。",
    "questionTranslation": "Berdasarkan Undang-Undang Hak Cipta Jepang, manakah di antara pilihan berikut yang merupakan objek perlindungan hak cipta untuk program komputer?",
    "options": [
      {
        "key": "ア",
        "textJp": "プログラムを作成するために使用したプログラミング言語",
        "textEnId": "Bahasa Pemrograman yang digunakan",
        "explanation": "Salah. Pasal 10 Ayat 3 UU Hak Cipta Jepang secara tegas mengecualikan bahasa pemrograman (プログラム言語) dari perlindungan hak cipta."
      },
      {
        "key": "イ",
        "textJp": "プログラムを記述するための約束事である通信プロトコル（規約）",
        "textEnId": "Protokol Komunikasi / Aturan Sintaks",
        "explanation": "Salah. Protokol atau aturan konvensi (規約) tidak dilindungi oleh hak cipta."
      },
      {
        "key": "ウ",
        "textJp": "プログラムにおける解法の手順であるアルゴリズム（解法）",
        "textEnId": "Algoritma Pemecahan Masalah",
        "explanation": "Salah. Algoritma (解法) adalah ide/gagasan abstrak, dan hak cipta hanya melindungi ekspresi konkret, bukan ide abstrak."
      },
      {
        "key": "エ",
        "textJp": "ソースコードやオブジェクトコードなどのプログラムの具体的表現",
        "textEnId": "Ekspresi Konkret Kode Program (Source Code / Object Code)",
        "explanation": "Benar! Hak cipta secara spesifik melindungi ekspresi konkret penulisan kode program (baik source code maupun binary object code)."
      }
    ],
    "correctKey": "エ",
    "summaryExplanation": "Pasal 10 Ayat 3 UU Hak Cipta Jepang (著作権法): 3 Hal yang TIDAK DILINDUNGI HAK CIPTA: 1. プログラム言語 (Bahasa Pemrograman: Java, Python, C). 2. 規約 (Protokol/Konvensi). 3. 解法 (Algoritma). Yang dilindungi HANYA EKSPRESI KODE KONKRET (具体的表現).",
    "keyTakeaway": "Bahasa, Protokol, & Algoritma = Bebas Hak Cipta. Kode Konkret = Dilindungi."
  },
  {
    "id": "quiz-strat-02",
    "year": "令和4年 過去問",
    "category": "strategy",
    "subCategory": "Corporate Strategy (PPM Matrix)",
    "questionJp": "PPM（プロダクト・ポートフォリオ・マネジメント）マトリクスにおいて、市場成長率が高く、相対的市場シェアも高い製品群の位置づけは何と呼ばれるか。",
    "questionTranslation": "Dalam matriks Product Portfolio Management (PPM), posisi produk yang memiliki tingkat pertumbuhan pasar tinggi DAN pangsa pasar relatif yang tinggi disebut apa?",
    "options": [
      {
        "key": "ア",
        "textJp": "花形（Star）",
        "textEnId": "Star (花形)",
        "explanation": "Benar! Tingkat pertumbuhan tinggi + pangsa pasar tinggi = Star (花形). Menghasilkan pendapatan besar namun juga butuh investasi modal besar untuk mempertahankan posisi."
      },
      {
        "key": "イ",
        "textJp": "金のなる木（Cash Cow）",
        "textEnId": "Cash Cow (金のなる木)",
        "explanation": "Salah. Cash Cow memiliki pertumbuhan pasar RENDAH tetapi pangsa pasar TINGGI (penghasil laba stabil tanpa butuh investasi besar lagi)."
      },
      {
        "key": "ウ",
        "textJp": "問題児（Question Mark）",
        "textEnId": "Question Mark (問題児)",
        "explanation": "Salah. Question Mark memiliki pertumbuhan pasar TINGGI tetapi pangsa pasarnya masih RENDAH."
      },
      {
        "key": "エ",
        "textJp": "負け犬（Dog）",
        "textEnId": "Dog (負け犬)",
        "explanation": "Salah. Dog memiliki pertumbuhan pasar RENDAH dan pangsa pasar juga RENDAH (kandidat untuk divestasi/ditarik)."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Matriks 4 Kuadran PPM (BCG Matrix): 1. 花形 (Star): Pertumbuhan Tinggi + Share Tinggi. 2. 金のなる木 (Cash Cow): Pertumbuhan Rendah + Share Tinggi. 3. 問題児 (Question Mark): Pertumbuhan Tinggi + Share Rendah. 4. 負け犬 (Dog): Pertumbuhan Rendah + Share Rendah.",
    "keyTakeaway": "Star = Growth Tinggi + Share Tinggi. Cash Cow = Mesin Uang (Share Tinggi di Pasar Matang)."
  },
  {
    "id": "quiz-strat-03",
    "year": "令和3年 過去問",
    "category": "strategy",
    "subCategory": "Business Accounting (BEP Calculation)",
    "questionJp": "ある製品の販売価格が 1個 1,000円、変動費が 1個あたり 600円、固定費が年間 400万円のとき、損益分岐点（Break-even Point）売上高は何百万円か。",
    "questionTranslation": "Sebuah produk memiliki harga jual 1.000 yen per unit, biaya variabel 600 yen per unit, dan biaya tetap tahunan 4.000.000 yen. Berapakah nilai penjualan titik impas (Break-even Point) dalam jutaan yen?",
    "options": [
      {
        "key": "ア",
        "textJp": "600 万円",
        "textEnId": "6 Juta Yen",
        "explanation": "Salah. Nilai ini tidak menutup biaya tetap dengan margin kontribusi yang ada."
      },
      {
        "key": "イ",
        "textJp": "800 万円",
        "textEnId": "8 Juta Yen",
        "explanation": "Salah. Pada penjualan 8 juta, margin kontribusi hanya 3.2 juta, belum menutup fixed cost 4 juta."
      },
      {
        "key": "ウ",
        "textJp": "1,000 万円",
        "textEnId": "10 Juta Yen",
        "explanation": "Benar! Rasio biaya variabel = 600/1000 = 0.6. Rasio margin kontribusi = 1 - 0.6 = 0.4. BEP = 400万 / 0.4 = 1,000万円."
      },
      {
        "key": "エ",
        "textJp": "1,200 万円",
        "textEnId": "12 Juta Yen",
        "explanation": "Salah. Pada penjualan 1.200 juta, perusahaan sudah menghasilkan laba bersih 800.000 yen."
      }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "Rumus Titik Impas (損益分岐点売上高) = 固定費 ÷ (1 - 変動費率). Rasio Variabel = 600 / 1000 = 0.6. Rasio Kontribusi = 1 - 0.6 = 0.4. BEP = 4.000.000 ÷ 0.4 = 10.000.000 yen (1,000 万円).",
    "keyTakeaway": "BEP = Biaya Tetap / (1 - Rasio Biaya Variabel)."
  },
  {
    "id": "quiz-strat-04",
    "year": "令和5年 過去問",
    "category": "strategy",
    "subCategory": "Corporate Strategy (SWOT Matrix)",
    "questionJp": "SWOT分析を応用したクロスSWOT分析において、自社の『強み（Strength）』を活かして、市場の『機会（Opportunity）』を最大限に獲得しようとする戦略はどれか。",
    "questionTranslation": "Dalam Analisis Cross-SWOT, strategi yang memanfaatkan 'Kekuatan (Strength)' internal perusahaan untuk meraih 'Peluang (Opportunity)' pasar secara maksimal adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "積極的攻勢（強み × 機会）",
        "textEnId": "Strategi Penetrasi Agresif (SO)",
        "explanation": "Benar! Strategi SO (Strength × Opportunity) adalah strategi ekspansi agresif yang mengerahkan seluruh keunggulan internal untuk memanfaatkan momentum peluang pasar sebesar-besarnya."
      },
      {
        "key": "イ",
        "textJp": "差別化・専守防衛（強み × 脅威）",
        "textEnId": "Strategi Diferensiasi / Diversifikasi (ST)",
        "explanation": "Salah. Strategi ST menggunakan kekuatan internal untuk menangkis atau menghindari ancaman persaingan eksternal."
      },
      {
        "key": "ウ",
        "textJp": "弱点補強・改善（弱み × 機会）",
        "textEnId": "Strategi Perbaikan Kelemahan (WO)",
        "explanation": "Salah. Strategi WO membenahi kekurangan internal agar tidak kehilangan peluang pasar yang muncul."
      },
      {
        "key": "エ",
        "textJp": "撤退・縮小（弱み × 脅威）",
        "textEnId": "Strategi Defensif / Divestasi (WT)",
        "explanation": "Salah. Strategi WT adalah strategi pertahanan darurat atau likuidasi bisnis untuk meminimalkan kerugian saat lemah menghadapi ancaman."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "4 Kuadran Cross-SWOT: 1. SO (強み×機会): 積極的攻勢 (Serangan agresif, ekspansi bisnis). 2. ST (強み×脅威): 差別化戦略 (Gunakan kelebihan untuk menangkal ancaman). 3. WO (弱み×機会): 段階的改善 (Benahi kelemahan untuk raih peluang). 4. WT (弱み×脅威): 防衛・撤退 (Defensif/Keluar dari pasar).",
    "keyTakeaway": "Kekuatan × Peluang (SO) = 積極的攻勢 (Strategi Agresif)."
  },
  {
    "id": "quiz-strat-05",
    "year": "令和4年 過去問",
    "category": "strategy",
    "subCategory": "Strategic Management (Balanced Scorecard)",
    "questionJp": "バランススコアカード（BSC）において設定される4つの視点の組合せとして、正しいものはどれか。",
    "questionTranslation": "Kombinasi yang benar dari 4 perspektif evaluasi yang ditetapkan dalam Balanced Scorecard (BSC) adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "財務の視点、顧客の視点、業務プロセスの視点、学習と成長の視点",
        "textEnId": "Financial, Customer, Internal Process, Learning & Growth",
        "explanation": "Benar! BSC mengimbangi metrik keuangan tradisional dengan metrik non-keuangan: Keuangan, Pelanggan, Proses Bisnis Internal, serta Pembelajaran & Pertumbuhan."
      },
      {
        "key": "イ",
        "textJp": "財務の視点、市場の視点、技術の視点、従業員の視点",
        "textEnId": "Financial, Market, Tech, Employee",
        "explanation": "Salah. Tidak sesuai dengan terminologi baku 4 perspektif BSC Kaplan & Norton."
      },
      {
        "key": "ウ",
        "textJp": "収益の視点、競合の視点、製品の視点、納期の視点",
        "textEnId": "Revenue, Competitor, Product, Delivery",
        "explanation": "Salah. Ini adalah kriteria operasional produksi harian."
      },
      {
        "key": "エ",
        "textJp": "経営の視点、営業の視点、開発の視点、保守の視点",
        "textEnId": "Management, Sales, Dev, Ops",
        "explanation": "Salah. Ini adalah struktur departemen fungsional perusahaan."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "4 Perspektif Balanced Scorecard (BSC): 1. 財務の視点 (Financial): Hasil keuangan bagi pemegang saham. 2. 顧客の視点 (Customer): Nilai kepuasan di mata konsumen. 3. 業務プロセスの視点 (Internal Process): Keunggulan efisiensi operasional. 4. 学習と成長の視点 (Learning & Growth): Peningkatan kapabilitas SDM & budaya organisasi.",
    "keyTakeaway": "4 Sudut BSC = 財務 (Financial) + 顧客 (Customer) + 業務 (Process) + 成長 (Growth)."
  },
  {
    "id": "quiz-strat-06",
    "year": "令和3年 過去問",
    "category": "strategy",
    "subCategory": "Competitive Strategy (Five Forces)",
    "questionJp": "マイケル・ポーターが提唱した競争要因（5つの力）分析において、業界の収益性に影響を与える脅威として含まれないものはどれか。",
    "questionTranslation": "Dalam analisis 5 Kekuatan Bersaing (Five Forces) yang dicetuskan oleh Michael Porter, manakah yang BUKAN merupakan salah satu dari 5 kekuatan tersebut?",
    "options": [
      {
        "key": "ア",
        "textJp": "新規参入業者の脅威",
        "textEnId": "Threat of New Entrants",
        "explanation": "Salah. Ancaman pendatang baru adalah salah satu dari 5 kekuatan Porter."
      },
      {
        "key": "イ",
        "textJp": "代替製品・サービスの脅威",
        "textEnId": "Threat of Substitutes",
        "explanation": "Salah. Ancaman produk/layanan pengganti adalah salah satu dari 5 kekuatan Porter."
      },
      {
        "key": "ウ",
        "textJp": "買い手の交渉力と売り手の交渉力",
        "textEnId": "Bargaining Power of Buyers & Suppliers",
        "explanation": "Salah. Daya tawar pembeli dan pemasok adalah kekuatan kunci ke-3 dan ke-4."
      },
      {
        "key": "エ",
        "textJp": "従業員の賃金上昇率",
        "textEnId": "Laju Kenaikan Upah Karyawan",
        "explanation": "Benar! Upah karyawan adalah elemen biaya internal organisasi, bukan kekuatan persaingan struktur industri eksternal menurut Porter."
      }
    ],
    "correctKey": "エ",
    "summaryExplanation": "5 Kekuatan Industri Michael Porter (Five Forces): 1. 業界内の競合関係 (Rivalitas antar pesaing industri), 2. 新規参入の脅威 (Ancaman pendatang baru), 3. 代替品の脅威 (Ancaman produk substitusi), 4. 買い手の交渉力 (Daya tawar pembeli), 5. 売り手の交渉力 (Daya tawar pemasok).",
    "keyTakeaway": "Five Forces = Pesaing Industri + Pendatang Baru + Substitusi + Pembeli + Pemasok."
  },
  {
    "id": "quiz-strat-07",
    "year": "令和5年 過去問",
    "category": "strategy",
    "subCategory": "IT Law & Contracts (Labor Dispatch)",
    "questionJp": "IT業界における契約形態のうち、発注者（ユーザー企業）が受託者（ベンダー）の作業者に対して業務の指揮命令権を持つ契約形態はどれか。",
    "questionTranslation": "Dalam kontrak kerja industri IT di Jepang, bentuk kontrak di mana pemesan/klien (発注者) memiliki hak untuk memberikan instruksi kerja langsung (指揮命令権) kepada pekerja dari vendor adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "労働者派遣契約",
        "textEnId": "Kontrak Kerja Haken (労働者派遣)",
        "explanation": "Benar! Pada 労働者派遣契約 (Labor Dispatch), ikatan kerja berada di agensi pengirim, namun hak komando perintah kerja sehari-hari (指揮命令権) berada di tangan klien/pemesan."
      },
      {
        "key": "イ",
        "textJp": "請負契約",
        "textEnId": "Kontrak Ukeoi (請負)",
        "explanation": "Salah. Pada 請負, vendor bertanggung jawab menyelesaikan hasil deliverable produk. Hak instruksi kerja wajib dipegang sendiri oleh vendor (jika klien memerintah langsung, terjadi pelanggaran hukum '偽装請負')."
      },
      {
        "key": "ウ",
        "textJp": "準委任契約",
        "textEnId": "Kontrak Jun-Inin (準委任)",
        "explanation": "Salah. Pada 準委任, vendor menyediakan jasa profesional kehati-hatian (善管注意義務). Hak komando pekerja tetap dipegang oleh vendor, bukan klien."
      },
      {
        "key": "エ",
        "textJp": "秘密保持契約（NDA）",
        "textEnId": "Non-Disclosure Agreement (NDA)",
        "explanation": "Salah. NDA adalah perjanjian kerahasiaan informasi rahasia."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Tabel Krusial Hukum Kerja IT Jepang: 1. 労働者派遣 (Haken): Perintah kerja (指揮命令) dipegang KLIEN. 2. 請負 (Ukeoi): Perintah kerja dipegang VENDOR, kewajiban menyelesaikan hasil produk (完成責任・契約不適合責任). 3. 準委任 (Jun-Inin): Perintah kerja dipegang VENDOR, kewajiban usaha profesional (善管注意義務). Jika klien memberi perintah langsung pada Ukeoi/Jun-Inin, itu adalah kejahatan '偽装請負'.",
    "keyTakeaway": "Klien Pegang Hak Perintah Langsung (指揮命令権) = 労働者派遣 (Haken)."
  },
  {
    "id": "quiz-strat-08",
    "year": "令和4年 過去問",
    "category": "strategy",
    "subCategory": "Intellectual Property Law (Trade Secret)",
    "questionJp": "不正競争防止法において、企業の『営業秘密（Trade Secret）』として法的に保護されるために満たすべき3つの要件の組合せはどれか。",
    "questionTranslation": "Berdasarkan Undang-Undang Pencegahan Persaingan Tidak Sehat Jepang, kombinasi 3 syarat mutlak yang harus dipenuhi agar suatu informasi bisnis dilindungi secara hukum sebagai 'Rahasia Dagang (営業秘密)' adalah:",
    "options": [
      {
        "key": "ア",
        "textJp": "秘密管理性、有用性、非公知性",
        "textEnId": "Dikelola rahasia, Memiliki nilai guna, Tidak diketahui publik",
        "explanation": "Benar! 3 Syarat Rahasia Dagang: 1. 秘密管理性 (dikelola secara rahasia dengan akses terbatas), 2. 有用性 (berguna bagi aktivitas bisnis/teknologi), 3. 非公知性 (tidak dapat diperoleh secara umum di publik)."
      },
      {
        "key": "イ",
        "textJp": "新規性、進歩性、産業上の利用可能性",
        "textEnId": "Kebaruan, Kemajuan penemuan, Kemampuan aplikasi industri",
        "explanation": "Salah. Ini adalah 3 syarat mutlak untuk mendapatkan Hak Paten (特許要件)."
      },
      {
        "key": "ウ",
        "textJp": "独創性、表現性、先願性",
        "textEnId": "Orisinalitas, Ekspresi, First-to-file",
        "explanation": "Salah. Ini adalah gabungan asas hak cipta dan sistem pendaftaran merek/paten."
      },
      {
        "key": "エ",
        "textJp": "公開性、確実性、反復可能性",
        "textEnId": "Keterbukaan publik, Kepastian, Repeatability",
        "explanation": "Salah. Keterbukaan publik (公開性) justru menggugurkan status rahasia dagang."
      }
    ],
    "correctKey": "ア",
    "summaryExplanation": "3 Syarat '営業秘密' UU Pencegahan Persaingan Tidak Sehat Jepang: 1. 秘密管理性 (Secrecy Control): Diberi label 'Rahasia' & dibatasi hak aksesnya. 2. 有用性 (Usefulness): Bermanfaat bagi efisiensi manufaktur atau penjualan. 3. 非公知性 (Not Publicly Known): Tidak beredar di luar perusahaan.",
    "keyTakeaway": "3 Syarat Rahasia Dagang = 秘密管理性 (Rahasia) + 有用性 (Berguna) + 非公知性 (Tak Publik)."
  },
  {
    "id": "quiz-strat-09",
    "year": "令和5年 過去問",
    "category": "strategy",
    "subCategory": "Open Source Software (GPL vs Permissive)",
    "questionJp": "オープンソースソフトウェア（OSS）のライセンスである GPL（GNU General Public License）の特徴として、適切なものはどれか。",
    "questionTranslation": "Manakah karakteristik yang tepat dari lisensi software open source GPL (GNU General Public License)?",
    "options": [
      {
        "key": "ア",
        "textJp": "ソースコードを改変して二次的著作物を配布する場合でも、そのソースコードを公開する義務はない。",
        "textEnId": "Tidak ada kewajiban membuka source code modifikasi",
        "explanation": "Salah. Ini adalah karakteristik lisensi permisif seperti MIT, BSD, atau Apache 2.0."
      },
      {
        "key": "イ",
        "textJp": "GPLのコードを組み込んで作成した派生物（二次的著作物）を配布する場合、そのソースコードもGPLに基づいて公開しなければならない（コピーレフト）。",
        "textEnId": "Wajib membuka source code turunan di bawah lisensi GPL (Copyleft)",
        "explanation": "Benar! Konsep Copyleft (コピーレフト) pada GPL mewajibkan karya turunan yang didistribusikan ke pihak lain untuk tetap dilisensikan di bawah GPL dan menyertakan source code."
      },
      {
        "key": "ウ",
        "textJp": "営利目的での商用利用が一切禁止されている。",
        "textEnId": "Penggunaan komersial dilarang mutlak",
        "explanation": "Salah. GPL secara tegas mengizinkan penggunaan komersial dan penjualan software, asalkan mematuhi syarat lisensi source code."
      },
      {
        "key": "エ",
        "textJp": "著作権者の表示を完全に削除して無名で再配布することができる。",
        "textEnId": "Boleh menghapus nama pemegang hak cipta",
        "explanation": "Salah. Menghapus atribusi hak cipta dilarang dalam semua lisensi open source resmi OSI."
      }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Konsep Inti Lisensi Open Source: 1. コピーレフト型 (GPL): Menular! Jika karya turunan didistribusikan, kode sumbernya WAJIB ikut dibuka di bawah lisensi GPL yang sama. 2. 非コピーレフト型 / 許諾型 (MIT, BSD, Apache): Boleh menutup kode sumber saat membuat produk turunan komersial.",
    "keyTakeaway": "GPL = Wajib Buka Source Code Karya Turunan (コピーレフト / Copyleft)."
  },
  {
    "id": "quiz-strat-10",
    "year": "令和4年 過去問",
    "category": "strategy",
    "subCategory": "Financial Analysis (ROI)",
    "questionJp": "あるIT投資計画において、投資額が 5,000万円で、導入によって得られる年間の当期純利益が 1,000万円であるとき、ROI（投下資本利益率）は何％か。",
    "questionTranslation": "Dalam sebuah rencana investasi sistem TI dengan nilai investasi 50.000.000 yen dan menghasilkan laba bersih tahunan 10.000.000 yen, berapakah nilai ROI (Return on Investment)?",
    "options": [
      {
        "key": "ア",
        "textJp": "5 ％",
        "textEnId": "5%",
        "explanation": "Salah. Terlalu kecil."
      },
      {
        "key": "イ",
        "textJp": "10 ％",
        "textEnId": "10%",
        "explanation": "Salah. 10.000.000 / 100.000.000."
      },
      {
        "key": "ウ",
        "textJp": "20 ％",
        "textEnId": "20%",
        "explanation": "Benar! ROI = (Laba Bersih ÷ Investasi) × 100% = (1.000万円 ÷ 5.000万円) × 100% = 0.2 × 100% = 20%."
      },
      {
        "key": "エ",
        "textJp": "50 ％",
        "textEnId": "50%",
        "explanation": "Salah. 25.000.000 / 50.000.000."
      }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "Rumus ROI (Return on Investment / 投下資本利益率): ROI = (当期純利益 ÷ 投資額) × 100%. Di soal: (1,000万 ÷ 5,000万) × 100% = 0.2 × 100% = 20%. Semakin tinggi persentase ROI, semakin efisien dan menguntungkan investasi TI tersebut.",
    "keyTakeaway": "ROI = (Laba Bersih / Nilai Investasi) × 100%."
  },

  // ==========================================
  // 計算問題 Technology — Calculation-Based Questions
  // ==========================================
  {
    "id": "quiz-calc-01",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Number Systems (Binary → Decimal Conversion)",
    "questionJp": "2進数 10110011 を10進数に変換した値はどれか。",
    "questionTranslation": "Berapa nilai desimal dari bilangan biner 10110011?",
    "options": [
      { "key": "ア", "textJp": "163", "textEnId": "163", "explanation": "Salah. Cek ulang perhitungan tiap posisi bit." },
      { "key": "イ", "textJp": "179", "textEnId": "179", "explanation": "Benar! 1×128 + 0×64 + 1×32 + 1×16 + 0×8 + 0×4 + 1×2 + 1×1 = 128+32+16+2+1 = 179." },
      { "key": "ウ", "textJp": "185", "textEnId": "185", "explanation": "Salah. Mungkin ada bit yang salah dihitung." },
      { "key": "エ", "textJp": "203", "textEnId": "203", "explanation": "Salah. Periksa kembali posisi bit yang bernilai 1." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Konversi 2進数→10進数: kalikan setiap bit dengan pangkat 2 sesuai posisinya (dari kanan, posisi 0). 10110011₂ = 2⁷+2⁵+2⁴+2¹+2⁰ = 128+32+16+2+1 = 179.",
    "keyTakeaway": "2進数→10進数: jumlahkan 2ⁿ untuk setiap bit yang bernilai 1."
  },
  {
    "id": "quiz-calc-02",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Number Systems (Decimal → Hexadecimal Conversion)",
    "questionJp": "10進数 250 を16進数に変換した値はどれか。",
    "questionTranslation": "Berapa nilai heksadesimal dari bilangan desimal 250?",
    "options": [
      { "key": "ア", "textJp": "EA", "textEnId": "EA", "explanation": "Salah. EA₁₆ = 14×16+10 = 234." },
      { "key": "イ", "textJp": "F0", "textEnId": "F0", "explanation": "Salah. F0₁₆ = 15×16+0 = 240." },
      { "key": "ウ", "textJp": "FA", "textEnId": "FA", "explanation": "Benar! 250÷16 = 15 sisa 10. 15=F, 10=A. Jadi 250₁₀ = FA₁₆." },
      { "key": "エ", "textJp": "FE", "textEnId": "FE", "explanation": "Salah. FE₁₆ = 15×16+14 = 254." }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "Konversi 10進数→16進数: bagi berulang dengan 16, catat sisa dari bawah ke atas. 250÷16 = 15 sisa 10 → F, A → FA₁₆. Verifikasi: 15×16+10 = 240+10 = 250 ✓.",
    "keyTakeaway": "10進→16進: bagi berulang dengan 16, sisa = digit hex dari bawah ke atas."
  },
  {
    "id": "quiz-calc-03",
    "year": "令和3年 過去問",
    "category": "technology",
    "subCategory": "Number Systems (Two's Complement)",
    "questionJp": "8ビットの2の補数表現で、-36₁₀ を表すビット列はどれか。",
    "questionTranslation": "Dalam representasi Two's Complement 8-bit, bagaimana -36 direpresentasikan?",
    "options": [
      { "key": "ア", "textJp": "10100100", "textEnId": "10100100", "explanation": "Salah. Ini adalah -92." },
      { "key": "イ", "textJp": "11011100", "textEnId": "11011100", "explanation": "Benar! 36₁₀ = 00100100₂. NOT: 11011011. +1: 11011100. Verifikasi: 128+64+16+8+4 = 220. 220-256 = -36 ✓." },
      { "key": "ウ", "textJp": "11011011", "textEnId": "11011011", "explanation": "Salah. Ini adalah 1の補数 (One's Complement), belum +1." },
      { "key": "エ", "textJp": "10100101", "textEnId": "10100101", "explanation": "Salah. Ini bukan complement yang benar." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Langkah 2の補数: ①Konversi absolut ke biner: 36=00100100 ②Balik semua bit (NOT): 11011011 ③Tambah 1: 11011100. MSB=1 menandakan bilangan negatif.",
    "keyTakeaway": "2の補数 = NOT(biner absolut) + 1. MSB=1 → negatif."
  },
  {
    "id": "quiz-calc-04",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Boolean Logic (De Morgan's Law)",
    "questionJp": "論理式 NOT(A AND B) と等価な論理式はどれか。",
    "questionTranslation": "Ekspresi logika mana yang ekuivalen dengan NOT(A AND B)?",
    "options": [
      { "key": "ア", "textJp": "A AND (NOT B)", "textEnId": "A AND (NOT B)", "explanation": "Salah. Ini hanya true jika A=1 dan B=0." },
      { "key": "イ", "textJp": "(NOT A) AND (NOT B)", "textEnId": "(NOT A) AND (NOT B)", "explanation": "Salah. Ini ekuivalen dengan NOT(A OR B) — De Morgan yang satunya." },
      { "key": "ウ", "textJp": "(NOT A) OR (NOT B)", "textEnId": "(NOT A) OR (NOT B)", "explanation": "Benar! Berdasarkan Hukum De Morgan: ¬(A∧B) = ¬A∨¬B." },
      { "key": "エ", "textJp": "A OR B", "textEnId": "A OR B", "explanation": "Salah. A OR B bukanlah negasi dari A AND B." }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "Hukum De Morgan: ¬(A∧B) = ¬A∨¬B dan ¬(A∨B) = ¬A∧¬B. Kunci: saat NOT didistribusikan, AND bertukar menjadi OR, dan sebaliknya.",
    "keyTakeaway": "De Morgan: NOT(AND) → OR of NOTs. NOT(OR) → AND of NOTs."
  },
  {
    "id": "quiz-calc-05",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Network (Subnet Mask /26 → Host Count)",
    "questionJp": "サブネットマスクが 255.255.255.192 (/26) のネットワークにおいて、1つのサブネットで使用できるホストアドレスの最大数はどれか。",
    "questionTranslation": "Pada jaringan dengan subnet mask 255.255.255.192 (/26), berapa jumlah maksimum alamat host yang dapat digunakan per subnet?",
    "options": [
      { "key": "ア", "textJp": "30", "textEnId": "30", "explanation": "Salah. Ini untuk /27 (32-2=30)." },
      { "key": "イ", "textJp": "62", "textEnId": "62", "explanation": "Benar! /26 = 32-26 = 6 bit host. 2⁶-2 = 64-2 = 62 host (dikurangi network address dan broadcast)." },
      { "key": "ウ", "textJp": "64", "textEnId": "64", "explanation": "Salah. 64 adalah total alamat termasuk network dan broadcast." },
      { "key": "エ", "textJp": "126", "textEnId": "126", "explanation": "Salah. Ini untuk /25." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "/26 berarti 26 bit untuk network, sisa 32-26=6 bit untuk host. Total alamat = 2⁶ = 64. Dikurangi network address (semua 0) dan broadcast (semua 1): 64-2 = 62 host.",
    "keyTakeaway": "Host per subnet = 2^(32-prefix) - 2."
  },
  {
    "id": "quiz-calc-06",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "CPU Performance (MIPS Calculation)",
    "questionJp": "クロック周波数が 800MHz、1命令の平均実行に必要なクロック数(CPI)が4のプロセッサにおいて、MIPS値はどれか。",
    "questionTranslation": "Berapa nilai MIPS dari prosesor dengan clock 800MHz dan CPI rata-rata 4?",
    "options": [
      { "key": "ア", "textJp": "100", "textEnId": "100", "explanation": "Salah. 800÷8=100, tapi CPI=4 bukan 8." },
      { "key": "イ", "textJp": "200", "textEnId": "200", "explanation": "Benar! MIPS = Clock(MHz) ÷ CPI = 800 ÷ 4 = 200 MIPS." },
      { "key": "ウ", "textJp": "400", "textEnId": "400", "explanation": "Salah. 800÷2=400, bukan CPI yang dipakai." },
      { "key": "エ", "textJp": "3200", "textEnId": "3200", "explanation": "Salah. Itu hasil perkalian, bukan pembagian." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "MIPS = Clock Frequency (MHz) ÷ CPI. Dengan clock 800MHz dan CPI=4: 800÷4 = 200 MIPS (200 juta instruksi per detik).",
    "keyTakeaway": "MIPS = Clock(MHz) ÷ CPI."
  },
  {
    "id": "quiz-calc-07",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "CPU Architecture (Pipeline Throughput)",
    "questionJp": "5段のパイプラインにおいて、各段の処理時間が20ナノ秒のとき、10命令の実行にかかる時間はどれか。",
    "questionTranslation": "Dalam pipeline 5 tahap dengan waktu per tahap 20ns, berapa waktu yang diperlukan untuk mengeksekusi 10 instruksi?",
    "options": [
      { "key": "ア", "textJp": "200 ナノ秒", "textEnId": "200 ns", "explanation": "Salah. Ini waktu tanpa pipeline (10×20ns), tapi pipeline butuh waktu setup awal." },
      { "key": "イ", "textJp": "280 ナノ秒", "textEnId": "280 ns", "explanation": "Benar! Pipeline: (k+n-1)×t = (5+10-1)×20 = 14×20 = 280 ns." },
      { "key": "ウ", "textJp": "300 ナノ秒", "textEnId": "300 ns", "explanation": "Salah. Bukan (k+n)×t." },
      { "key": "エ", "textJp": "1000 ナノ秒", "textEnId": "1000 ns", "explanation": "Salah. Ini waktu eksekusi sekuensial tanpa pipeline (10×5×20)." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Pipeline k-stage: Total time = (k + n - 1) × t. k=5 stage, n=10 instruksi, t=20ns → (5+10-1)×20 = 14×20 = 280ns. Bandingkan tanpa pipeline: 10×5×20 = 1000ns → speedup 3.57×.",
    "keyTakeaway": "Pipeline total = (jumlah_stage + jumlah_instruksi - 1) × waktu_per_stage."
  },
  {
    "id": "quiz-calc-08",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Memory Architecture (Cache Hit Rate → EAT)",
    "questionJp": "キャッシュメモリのアクセス時間が10ナノ秒、主記憶のアクセス時間が60ナノ秒、ヒット率が0.95のとき、実効アクセス時間はどれか。",
    "questionTranslation": "Jika waktu akses cache 10ns, waktu akses memori utama 60ns, dan hit rate 0.95, berapa effective access time (EAT)?",
    "options": [
      { "key": "ア", "textJp": "12.5 ナノ秒", "textEnId": "12.5 ns", "explanation": "Benar! EAT = 0.95×10 + 0.05×60 = 9.5 + 3.0 = 12.5 ns." },
      { "key": "イ", "textJp": "15 ナノ秒", "textEnId": "15 ns", "explanation": "Salah. Bukan (10+60)÷2÷2.33." },
      { "key": "ウ", "textJp": "35 ナノ秒", "textEnId": "35 ns", "explanation": "Salah. Ini rata-rata sederhana (10+60)/2." },
      { "key": "エ", "textJp": "57 ナノ秒", "textEnId": "57 ns", "explanation": "Salah. Ini 0.95×60, yang terbalik." }
    ],
    "correctKey": "ア",
    "summaryExplanation": "EAT = hit_rate × cache_time + (1-hit_rate) × main_memory_time = 0.95×10 + 0.05×60 = 9.5 + 3.0 = 12.5ns. Hit rate tinggi = EAT mendekati cache time.",
    "keyTakeaway": "EAT = h×Tc + (1-h)×Tm. Semakin tinggi hit rate, semakin cepat."
  },
  {
    "id": "quiz-calc-09",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "System Reliability (MTBF/MTTR → Availability)",
    "questionJp": "MTBFが450時間、MTTRが50時間のシステムの稼働率はどれか。",
    "questionTranslation": "Berapa availability sistem dengan MTBF 450 jam dan MTTR 50 jam?",
    "options": [
      { "key": "ア", "textJp": "0.80", "textEnId": "0.80", "explanation": "Salah. 400/500=0.80, bukan rumus yang benar." },
      { "key": "イ", "textJp": "0.88", "textEnId": "0.88", "explanation": "Salah. Periksa pembilang dan penyebut." },
      { "key": "ウ", "textJp": "0.90", "textEnId": "0.90", "explanation": "Benar! Availability = MTBF/(MTBF+MTTR) = 450/(450+50) = 450/500 = 0.90." },
      { "key": "エ", "textJp": "0.95", "textEnId": "0.95", "explanation": "Salah. Ini untuk MTBF=950, MTTR=50." }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "稼働率(Availability) = MTBF ÷ (MTBF + MTTR) = 450 ÷ (450+50) = 450 ÷ 500 = 0.90 (90%). MTBF = waktu rata-rata antar kerusakan, MTTR = waktu rata-rata perbaikan.",
    "keyTakeaway": "Availability = MTBF / (MTBF + MTTR)."
  },
  {
    "id": "quiz-calc-10",
    "year": "令和3年 過去問",
    "category": "technology",
    "subCategory": "System Reliability (Serial-Parallel Calculation)",
    "questionJp": "稼働率0.9の装置Aと稼働率0.8の装置Bを並列接続したシステムの稼働率はどれか。",
    "questionTranslation": "Berapa availability sistem jika perangkat A (0.9) dan perangkat B (0.8) dihubungkan secara paralel?",
    "options": [
      { "key": "ア", "textJp": "0.72", "textEnId": "0.72", "explanation": "Salah. 0.72 = 0.9×0.8, ini untuk sistem SERIAL." },
      { "key": "イ", "textJp": "0.85", "textEnId": "0.85", "explanation": "Salah. Bukan rata-rata sederhana." },
      { "key": "ウ", "textJp": "0.90", "textEnId": "0.90", "explanation": "Salah. Ini cuma availability A saja." },
      { "key": "エ", "textJp": "0.98", "textEnId": "0.98", "explanation": "Benar! Paralel: 1 - (1-0.9)(1-0.8) = 1 - 0.1×0.2 = 1 - 0.02 = 0.98." }
    ],
    "correctKey": "エ",
    "summaryExplanation": "Sistem paralel: R = 1 - (1-R_A)(1-R_B) = 1 - (1-0.9)(1-0.8) = 1 - 0.1×0.2 = 1 - 0.02 = 0.98. Jebakan: 0.72 = 0.9×0.8 adalah rumus SERIAL, bukan paralel!",
    "keyTakeaway": "Paralel: 1-(1-A)(1-B). Serial: A×B. Jangan tertukar!"
  },
  {
    "id": "quiz-calc-11",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "Database (SQL GROUP BY & Aggregate)",
    "questionJp": "表「受注」に対して次のSQL文を実行した結果の行数はどれか。受注テーブル: {(商品A, 5), (商品A, 3), (商品B, 2), (商品B, 7), (商品B, 1), (商品C, 4)}。SQL: SELECT 商品名 FROM 受注 GROUP BY 商品名 HAVING SUM(数量) >= 5",
    "questionTranslation": "Tabel Pesanan: {(A,5),(A,3),(B,2),(B,7),(B,1),(C,4)}. SQL: SELECT 商品名 FROM 受注 GROUP BY 商品名 HAVING SUM(数量) >= 5. Berapa baris hasilnya?",
    "options": [
      { "key": "ア", "textJp": "1 行", "textEnId": "1 baris", "explanation": "Salah. Lebih dari satu grup yang total-nya ≥ 5." },
      { "key": "イ", "textJp": "2 行", "textEnId": "2 baris", "explanation": "Benar! A: 5+3=8 ≥ 5 ✓, B: 2+7+1=10 ≥ 5 ✓, C: 4 < 5 ✗. Dua baris lolos HAVING." },
      { "key": "ウ", "textJp": "3 行", "textEnId": "3 baris", "explanation": "Salah. C hanya 4, tidak lolos HAVING SUM ≥ 5." },
      { "key": "エ", "textJp": "6 行", "textEnId": "6 baris", "explanation": "Salah. GROUP BY mengelompokkan, bukan menampilkan semua baris." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "GROUP BY mengelompokkan per 商品名, HAVING memfilter kelompok. A: SUM=8 ✓, B: SUM=10 ✓, C: SUM=4 ✗. Hanya 2 baris yang lolos.",
    "keyTakeaway": "WHERE memfilter BARIS sebelum grouping. HAVING memfilter GRUP setelah grouping."
  },
  {
    "id": "quiz-calc-12",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Algorithms (Binary Search Max Comparisons)",
    "questionJp": "1,000個のデータが昇順に整列された配列に対して2分探索を行うとき、最大の比較回数はどれか。",
    "questionTranslation": "Berapa jumlah perbandingan maksimum saat melakukan binary search pada array 1000 elemen terurut?",
    "options": [
      { "key": "ア", "textJp": "7", "textEnId": "7", "explanation": "Salah. 2⁷=128 < 1000." },
      { "key": "イ", "textJp": "10", "textEnId": "10", "explanation": "Benar! ⌈log₂(1000)⌉ = ⌈9.97⌉ = 10. (2¹⁰=1024 ≥ 1000)." },
      { "key": "ウ", "textJp": "100", "textEnId": "100", "explanation": "Salah. Ini untuk linear search (n/10)." },
      { "key": "エ", "textJp": "500", "textEnId": "500", "explanation": "Salah. Ini rata-rata linear search (n/2)." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Binary search membagi setengah di setiap langkah. Perbandingan max = ⌈log₂(n)⌉. Untuk n=1000: log₂(1000) ≈ 9.97 → dibulatkan ke atas = 10. Verifikasi: 2¹⁰=1024 ≥ 1000 ✓.",
    "keyTakeaway": "Binary search max comparisons = ⌈log₂(n)⌉. Ini yang membuat O(log n) jauh lebih cepat dari O(n)."
  },
  {
    "id": "quiz-calc-13",
    "year": "令和5年 過去問",
    "category": "technology",
    "subCategory": "OS (Page Replacement LRU Trace)",
    "questionJp": "ページ枠数が3のLRUページ置換方式で、次の参照列をアクセスしたとき、ページフォルト回数はどれか。参照列: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3",
    "questionTranslation": "Dengan 3 frame dan LRU, berapa kali page fault untuk urutan akses: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3?",
    "options": [
      { "key": "ア", "textJp": "5 回", "textEnId": "5 kali", "explanation": "Salah. Terlalu sedikit." },
      { "key": "イ", "textJp": "7 回", "textEnId": "7 kali", "explanation": "Benar! Trace: [1]F→[1,2]F→[1,2,3]F→[4,2,3]→[4,1,3]F→[4,1,2]F→[5,1,2]F→hit→hit→[3,1,2]F = 7 fault." },
      { "key": "ウ", "textJp": "8 回", "textEnId": "8 kali", "explanation": "Salah. Ada beberapa hit di antara akses." },
      { "key": "エ", "textJp": "10 回", "textEnId": "10 kali", "explanation": "Salah. Tidak semua akses menyebabkan page fault." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "LRU: buang halaman yang paling lama tidak diakses. Trace frame: {1}F,{1,2}F,{1,2,3}F,{2,3,4}F,{3,4,1}F,{4,1,2}F,{1,2,5}F,{1,2,5}H,{1,2,5}H,{1,2,3}F = 7 fault total.",
    "keyTakeaway": "LRU = Least Recently Used. Buang halaman yang paling lama tidak dipakai."
  },
  {
    "id": "quiz-calc-14",
    "year": "令和3年 過去問",
    "category": "technology",
    "subCategory": "Queuing Theory (M/M/1 Utilization)",
    "questionJp": "窓口が1つのM/M/1待ち行列モデルで、平均到着率λ=4件/時間、平均サービス率μ=5件/時間のとき、窓口の利用率ρはどれか。",
    "questionTranslation": "Model M/M/1 dengan λ=4/jam dan μ=5/jam, berapa utilization rate ρ?",
    "options": [
      { "key": "ア", "textJp": "0.6", "textEnId": "0.6", "explanation": "Salah. 3/5=0.6, bukan λ/μ yang benar." },
      { "key": "イ", "textJp": "0.8", "textEnId": "0.8", "explanation": "Benar! ρ = λ/μ = 4/5 = 0.8." },
      { "key": "ウ", "textJp": "1.0", "textEnId": "1.0", "explanation": "Salah. ρ=1 berarti sistem tepat saturasi." },
      { "key": "エ", "textJp": "1.25", "textEnId": "1.25", "explanation": "Salah. ρ=μ/λ terbalik. Dan ρ>1 berarti antrian tidak stabil." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Utilization rate ρ = λ/μ = arrival rate / service rate = 4/5 = 0.8 (80%). Syarat stabil: ρ < 1 (kedatangan harus lebih lambat dari layanan).",
    "keyTakeaway": "ρ = λ/μ. Harus < 1 agar antrian stabil."
  },
  {
    "id": "quiz-calc-15",
    "year": "令和4年 過去問",
    "category": "technology",
    "subCategory": "Software Testing (Boundary Value Analysis)",
    "questionJp": "入力値の有効範囲が 1 ≦ x ≦ 100 のとき、境界値分析で最低限テストすべき値の組合せはどれか。",
    "questionTranslation": "Jika rentang input valid adalah 1 ≤ x ≤ 100, kombinasi nilai mana yang harus diuji minimum dalam boundary value analysis?",
    "options": [
      { "key": "ア", "textJp": "0, 1, 100, 101", "textEnId": "0, 1, 100, 101", "explanation": "Benar! Boundary value = batas valid (1, 100) + tepat di luar batas (0, 101)." },
      { "key": "イ", "textJp": "1, 50, 100", "textEnId": "1, 50, 100", "explanation": "Salah. Tidak ada nilai di luar batas." },
      { "key": "ウ", "textJp": "-1, 0, 100, 101", "textEnId": "-1, 0, 100, 101", "explanation": "Salah. -1 terlalu jauh dari batas bawah." },
      { "key": "エ", "textJp": "1, 100", "textEnId": "1, 100", "explanation": "Salah. Hanya batas valid, tanpa nilai invalid di luar batas." }
    ],
    "correctKey": "ア",
    "summaryExplanation": "Boundary Value Analysis (BVA): uji nilai tepat DI batas dan tepat DI LUAR batas. Untuk 1≤x≤100: batas bawah (0,1) dan batas atas (100,101). Minimal 4 test case.",
    "keyTakeaway": "BVA: uji tepat di batas (valid) dan tepat di luar batas (invalid)."
  },

  // ==========================================
  // 計算問題 Management — Calculation-Based Questions
  // ==========================================
  {
    "id": "quiz-calc-16",
    "year": "令和5年 過去問",
    "category": "management",
    "subCategory": "Project Management (PERT Critical Path Calculation)",
    "questionJp": "次のアローダイアグラムにおいて、クリティカルパスの所要日数はどれか。A(3日)→C(5日)→E(2日)、A(3日)→D(4日)→E(2日)、B(2日)→D(4日)→E(2日)。",
    "questionTranslation": "Pada arrow diagram berikut, berapa hari durasi critical path? A(3)→C(5)→E(2), A(3)→D(4)→E(2), B(2)→D(4)→E(2).",
    "options": [
      { "key": "ア", "textJp": "8 日", "textEnId": "8 hari", "explanation": "Salah. B+D+E = 2+4+2 = 8, tapi ada jalur lebih panjang." },
      { "key": "イ", "textJp": "9 日", "textEnId": "9 hari", "explanation": "Salah. A+D+E = 3+4+2 = 9, tapi cek jalur lain." },
      { "key": "ウ", "textJp": "10 日", "textEnId": "10 hari", "explanation": "Benar! A→C→E = 3+5+2 = 10 hari. Ini jalur terpanjang (critical path)." },
      { "key": "エ", "textJp": "12 日", "textEnId": "12 hari", "explanation": "Salah. Tidak ada jalur yang berjumlah 12." }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "Critical Path = jalur TERPANJANG dalam network diagram. Path 1: A+C+E = 3+5+2 = 10. Path 2: A+D+E = 3+4+2 = 9. Path 3: B+D+E = 2+4+2 = 8. CP = 10 hari.",
    "keyTakeaway": "Critical Path = jalur terpanjang. Keterlambatan di CP = keterlambatan proyek."
  },
  {
    "id": "quiz-calc-17",
    "year": "令和4年 過去問",
    "category": "management",
    "subCategory": "EVM Project Management (CPI & SPI)",
    "questionJp": "あるプロジェクトの現時点でのEVM指標が、PV=500万円、EV=400万円、AC=480万円のとき、CPI(コスト効率指数)の値はどれか。",
    "questionTranslation": "Jika PV=5M yen, EV=4M yen, AC=4.8M yen, berapa nilai CPI?",
    "options": [
      { "key": "ア", "textJp": "約 0.80", "textEnId": "≈ 0.80", "explanation": "Salah. 0.80 = EV/PV = SPI, bukan CPI." },
      { "key": "イ", "textJp": "約 0.83", "textEnId": "≈ 0.83", "explanation": "Benar! CPI = EV/AC = 400/480 ≈ 0.833. CPI < 1 berarti over budget." },
      { "key": "ウ", "textJp": "約 1.04", "textEnId": "≈ 1.04", "explanation": "Salah. 1.04 = PV/AC, bukan rumus EVM." },
      { "key": "エ", "textJp": "約 1.20", "textEnId": "≈ 1.20", "explanation": "Salah. 1.20 = AC/EV, ini terbalik." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "CPI = EV ÷ AC = 400 ÷ 480 ≈ 0.833. CPI<1 = over budget (biaya aktual lebih tinggi dari earned value). SPI = EV ÷ PV = 400 ÷ 500 = 0.80 (behind schedule juga).",
    "keyTakeaway": "CPI = EV/AC (cost efficiency). SPI = EV/PV (schedule efficiency). < 1 = buruk."
  },
  {
    "id": "quiz-calc-18",
    "year": "令和5年 過去問",
    "category": "management",
    "subCategory": "EVM Project Management (EAC Estimation)",
    "questionJp": "EVM指標でBAC=1000万円、CPI=0.8のとき、完成時の見積総コスト(EAC)はどれか。",
    "questionTranslation": "Jika BAC=10M yen dan CPI=0.8, berapa estimasi total biaya saat selesai (EAC)?",
    "options": [
      { "key": "ア", "textJp": "800 万円", "textEnId": "8 juta yen", "explanation": "Salah. Ini BAC×CPI, bukan rumus EAC." },
      { "key": "イ", "textJp": "1000 万円", "textEnId": "10 juta yen", "explanation": "Salah. Ini BAC asli tanpa memperhitungkan inefisiensi." },
      { "key": "ウ", "textJp": "1200 万円", "textEnId": "12 juta yen", "explanation": "Salah. Bukan BAC × 1.2." },
      { "key": "エ", "textJp": "1250 万円", "textEnId": "12.5 juta yen", "explanation": "Benar! EAC = BAC ÷ CPI = 1000 ÷ 0.8 = 1250万円. Proyek akan over budget 250万." }
    ],
    "correctKey": "エ",
    "summaryExplanation": "EAC (Estimate at Completion) = BAC ÷ CPI = 1000 ÷ 0.8 = 1250万円. Asumsi: tren inefisiensi saat ini (CPI=0.8) akan berlanjut sampai akhir proyek.",
    "keyTakeaway": "EAC = BAC / CPI. Jika CPI < 1, EAC > BAC (pasti over budget)."
  },
  {
    "id": "quiz-calc-19",
    "year": "令和3年 過去問",
    "category": "management",
    "subCategory": "Project Management (Total Float Calc)",
    "questionJp": "クリティカルパスの所要日数が20日のプロジェクトにおいて、作業Xの最早開始日が5日、最遅完了日が15日、作業Xの所要日数が7日のとき、トータルフロートはどれか。",
    "questionTranslation": "Critical path = 20 hari. Task X: earliest start = hari 5, latest finish = hari 15, durasi = 7 hari. Berapa total float?",
    "options": [
      { "key": "ア", "textJp": "1 日", "textEnId": "1 hari", "explanation": "Salah. Kurang perhitungan." },
      { "key": "イ", "textJp": "3 日", "textEnId": "3 hari", "explanation": "Benar! Total Float = LF - ES - Duration = 15 - 5 - 7 = 3 hari." },
      { "key": "ウ", "textJp": "5 日", "textEnId": "5 hari", "explanation": "Salah. 20-15=5 bukan total float task X." },
      { "key": "エ", "textJp": "8 日", "textEnId": "8 hari", "explanation": "Salah. 15-7=8 bukan rumus yang tepat." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Total Float = Latest Finish - Earliest Start - Duration = 15 - 5 - 7 = 3 hari. Artinya task X bisa terlambat hingga 3 hari tanpa mempengaruhi jadwal proyek keseluruhan.",
    "keyTakeaway": "Total Float = LF - ES - Duration. Float = 0 → critical path."
  },
  {
    "id": "quiz-calc-20",
    "year": "令和4年 過去問",
    "category": "management",
    "subCategory": "IT Service Management (SLA Availability %)",
    "questionJp": "月間のサービス時間が720時間、そのうち計画外停止時間が3.6時間であったとき、可用性(%)はどれか。",
    "questionTranslation": "Jika total service time per bulan 720 jam dan downtime tidak terencana 3.6 jam, berapa availability (%)?",
    "options": [
      { "key": "ア", "textJp": "99.0 ％", "textEnId": "99.0%", "explanation": "Salah. 720×0.99 = 712.8 jam downtime." },
      { "key": "イ", "textJp": "99.5 ％", "textEnId": "99.5%", "explanation": "Benar! Availability = (720-3.6)/720 × 100% = 716.4/720 × 100% = 99.5%." },
      { "key": "ウ", "textJp": "99.9 ％", "textEnId": "99.9%", "explanation": "Salah. Untuk 99.9% downtime max 0.72 jam." },
      { "key": "エ", "textJp": "99.95 ％", "textEnId": "99.95%", "explanation": "Salah. Ini target SLA lebih ketat." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "SLA Availability = (Total Time - Downtime) / Total Time × 100% = (720-3.6)/720 × 100% = 99.5%. Istilah: 99.9% = Three Nines, 99.99% = Four Nines.",
    "keyTakeaway": "Availability % = (Service Time - Downtime) / Service Time × 100%."
  },
  {
    "id": "quiz-calc-21",
    "year": "令和5年 過去問",
    "category": "management",
    "subCategory": "Project Risk Management (Expected Value)",
    "questionJp": "リスクAの発生確率が30%で発生時の損失額が200万円、リスクBの発生確率が10%で発生時の損失額が500万円のとき、期待損失額の合計はどれか。",
    "questionTranslation": "Risiko A: probabilitas 30%, kerugian ¥2M. Risiko B: probabilitas 10%, kerugian ¥5M. Berapa total expected loss?",
    "options": [
      { "key": "ア", "textJp": "60 万円", "textEnId": "¥600K", "explanation": "Salah. Ini cuma risiko A saja." },
      { "key": "イ", "textJp": "110 万円", "textEnId": "¥1.1M", "explanation": "Benar! A: 0.3×200=60万 + B: 0.1×500=50万 = 110万円." },
      { "key": "ウ", "textJp": "150 万円", "textEnId": "¥1.5M", "explanation": "Salah. Bukan penjumlahan langsung probabilitas." },
      { "key": "エ", "textJp": "700 万円", "textEnId": "¥7M", "explanation": "Salah. Ini total kerugian tanpa memperhitungkan probabilitas." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Expected Loss = Σ (Probabilitas × Dampak). A: 0.3×200=60万. B: 0.1×500=50万. Total: 60+50 = 110万円. Ini digunakan untuk menentukan berapa besar anggaran mitigasi risiko.",
    "keyTakeaway": "Expected Value = Probability × Impact. Jumlahkan semua risiko."
  },
  {
    "id": "quiz-calc-22",
    "year": "令和4年 過去問",
    "category": "management",
    "subCategory": "Function Point Estimation",
    "questionJp": "あるシステムの未調整ファンクションポイント(UFP)が250で、調整係数(VAF)が1.10のとき、調整済みファンクションポイント(AFP)はどれか。",
    "questionTranslation": "Jika UFP = 250 dan VAF = 1.10, berapa Adjusted Function Point (AFP)?",
    "options": [
      { "key": "ア", "textJp": "225", "textEnId": "225", "explanation": "Salah. 250÷1.10 ≈ 227, bukan ini." },
      { "key": "イ", "textJp": "250", "textEnId": "250", "explanation": "Salah. Ini UFP tanpa adjustment." },
      { "key": "ウ", "textJp": "275", "textEnId": "275", "explanation": "Benar! AFP = UFP × VAF = 250 × 1.10 = 275." },
      { "key": "エ", "textJp": "360", "textEnId": "360", "explanation": "Salah. Faktor terlalu besar." }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "AFP = UFP × VAF = 250 × 1.10 = 275. VAF>1 berarti sistem lebih kompleks dari rata-rata. Function Point digunakan untuk estimasi effort dan biaya pengembangan.",
    "keyTakeaway": "AFP = UFP × VAF. Function Point = ukuran fungsionalitas software."
  },

  // ==========================================
  // 計算問題 Strategy — Calculation-Based Questions
  // ==========================================
  {
    "id": "quiz-calc-23",
    "year": "令和5年 過去問",
    "category": "strategy",
    "subCategory": "Business Accounting (BEP Break-Even Point)",
    "questionJp": "固定費が1,200万円、商品1個あたりの販売単価が2,000円、変動費が800円のとき、損益分岐点の販売個数はどれか。",
    "questionTranslation": "Fixed cost ¥12M, harga jual ¥2000/unit, variable cost ¥800/unit. Berapa unit BEP (break-even)?",
    "options": [
      { "key": "ア", "textJp": "6,000 個", "textEnId": "6.000 unit", "explanation": "Salah. 12,000,000÷2,000=6,000, tapi ini tanpa variable cost." },
      { "key": "イ", "textJp": "10,000 個", "textEnId": "10.000 unit", "explanation": "Benar! BEP = Fixed Cost ÷ (Price - Variable Cost) = 12,000,000 ÷ (2,000-800) = 12,000,000 ÷ 1,200 = 10,000 unit." },
      { "key": "ウ", "textJp": "12,000 個", "textEnId": "12.000 unit", "explanation": "Salah. 12,000,000÷1,000=12,000, margin kontribusi salah." },
      { "key": "エ", "textJp": "15,000 個", "textEnId": "15.000 unit", "explanation": "Salah. 12,000,000÷800=15,000, menggunakan variable cost saja." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "BEP (損益分岐点) = Fixed Cost ÷ Contribution Margin per unit = 12,000,000 ÷ (2,000-800) = 12,000,000 ÷ 1,200 = 10,000 unit. Di atas 10,000 unit = untung.",
    "keyTakeaway": "BEP = Fixed Cost ÷ (Selling Price - Variable Cost per unit)."
  },
  {
    "id": "quiz-calc-24",
    "year": "令和4年 過去問",
    "category": "strategy",
    "subCategory": "Financial Analysis (NPV Calculation)",
    "questionJp": "初期投資額が1,000万円、1年後のキャッシュフローが550万円、2年後のキャッシュフローが605万円、割引率が10%のとき、NPV(正味現在価値)はどれか。",
    "questionTranslation": "Investasi awal ¥10M, CF tahun 1 = ¥5.5M, CF tahun 2 = ¥6.05M, discount rate 10%. Berapa NPV?",
    "options": [
      { "key": "ア", "textJp": "-50 万円", "textEnId": "-¥500K", "explanation": "Salah. Perhitungan diskonto kurang tepat." },
      { "key": "イ", "textJp": "0 万円", "textEnId": "¥0", "explanation": "Benar! PV1 = 550/1.1 = 500万. PV2 = 605/1.21 = 500万. NPV = 500+500-1000 = 0万円." },
      { "key": "ウ", "textJp": "50 万円", "textEnId": "¥500K", "explanation": "Salah. Jangan lupa mendiskon CF masa depan." },
      { "key": "エ", "textJp": "155 万円", "textEnId": "¥1.55M", "explanation": "Salah. Ini tanpa diskonto: 550+605-1000=155." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "NPV = Σ(CFt/(1+r)^t) - Initial Investment. PV1 = 550/1.1 = 500万. PV2 = 605/(1.1)² = 605/1.21 = 500万. NPV = 500 + 500 - 1000 = 0. NPV≥0 → layak investasi.",
    "keyTakeaway": "NPV = Σ(CF/(1+r)^t) - Investment. NPV > 0 → investasi menguntungkan."
  },
  {
    "id": "quiz-calc-25",
    "year": "令和5年 過去問",
    "category": "strategy",
    "subCategory": "Financial Analysis (Depreciation 定額法)",
    "questionJp": "取得価額100万円、残存価額0円、耐用年数5年の固定資産を定額法で減価償却するとき、毎年の償却額はどれか。",
    "questionTranslation": "Aset ¥1M, nilai sisa ¥0, umur manfaat 5 tahun, metode garis lurus. Berapa depresiasi per tahun?",
    "options": [
      { "key": "ア", "textJp": "10 万円", "textEnId": "¥100K", "explanation": "Salah. Ini untuk 10 tahun." },
      { "key": "イ", "textJp": "15 万円", "textEnId": "¥150K", "explanation": "Salah. Bukan rumus garis lurus." },
      { "key": "ウ", "textJp": "20 万円", "textEnId": "¥200K", "explanation": "Benar! 定額法: (取得価額-残存価額)/耐用年数 = (100-0)/5 = 20万円/tahun." },
      { "key": "エ", "textJp": "25 万円", "textEnId": "¥250K", "explanation": "Salah. Ini untuk 4 tahun." }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "定額法 (Straight-Line): Depresiasi = (Acquisition Cost - Salvage Value) / Useful Life = (100-0)/5 = 20万/tahun. Sama setiap tahun (konstan).",
    "keyTakeaway": "定額法 = (取得 - 残存) ÷ 耐用年数. Sama setiap tahun."
  },
  {
    "id": "quiz-calc-26",
    "year": "令和3年 過去問",
    "category": "strategy",
    "subCategory": "Business Analysis (ABC / Pareto Analysis)",
    "questionJp": "全商品の売上を降順に並べたとき、累積構成比が上位70%までをAランク、70%～90%をBランク、90%～100%をCランクとする。全20商品で上位5商品の売上合計が全体の70%を占めるとき、Aランクの商品数はどれか。",
    "questionTranslation": "20 produk, 5 produk teratas = 70% total penjualan. Jika A=70%, B=70-90%, C=90-100%, berapa jumlah produk rank A?",
    "options": [
      { "key": "ア", "textJp": "3 品目", "textEnId": "3 produk", "explanation": "Salah. Terlalu sedikit." },
      { "key": "イ", "textJp": "5 品目", "textEnId": "5 produk", "explanation": "Benar! 5 produk teratas sudah mencapai 70% kumulatif → semuanya masuk Rank A." },
      { "key": "ウ", "textJp": "7 品目", "textEnId": "7 produk", "explanation": "Salah. 7 produk melebihi batas 70%." },
      { "key": "エ", "textJp": "14 品目", "textEnId": "14 produk", "explanation": "Salah. Ini 70% dari jumlah produk, bukan kumulatif penjualan." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "ABC分析 (Pareto): Rank A = produk yang secara kumulatif menyumbang 70% pertama. Karena 5 produk teratas = 70% kumulatif, maka Rank A = 5 produk.",
    "keyTakeaway": "ABC分析: A = top 70% sales. Prinsip Pareto: 20% item = 80% value."
  },
  {
    "id": "quiz-calc-27",
    "year": "令和4年 過去問",
    "category": "strategy",
    "subCategory": "Decision Making (Expected Value)",
    "questionJp": "ある事業に投資する場合、景気が良い確率60%で利益3,000万円、景気が悪い確率40%で損失1,000万円のとき、投資の期待値はどれか。",
    "questionTranslation": "Investasi: probabilitas 60% untung ¥30M, probabilitas 40% rugi ¥10M. Berapa expected value?",
    "options": [
      { "key": "ア", "textJp": "1,000 万円", "textEnId": "¥10M", "explanation": "Salah. 3000-1000÷2." },
      { "key": "イ", "textJp": "1,400 万円", "textEnId": "¥14M", "explanation": "Benar! EV = 0.6×3000 + 0.4×(-1000) = 1800 - 400 = 1400万円." },
      { "key": "ウ", "textJp": "1,800 万円", "textEnId": "¥18M", "explanation": "Salah. Ini hanya skenario untung tanpa dikurangi kerugian." },
      { "key": "エ", "textJp": "2,000 万円", "textEnId": "¥20M", "explanation": "Salah. Rata-rata sederhana (3000-1000)/1." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "Expected Value = Σ(Probability × Outcome). EV = 0.6 × 3,000 + 0.4 × (-1,000) = 1,800 - 400 = 1,400万円. EV > 0 → secara statistik layak diinvestasikan.",
    "keyTakeaway": "期待値 = Σ(確率 × 結果). EV > 0 → rata-rata menguntungkan."
  },
  {
    "id": "quiz-calc-28",
    "year": "令和5年 過去問",
    "category": "strategy",
    "subCategory": "Corporate Strategy (Market Share PPM)",
    "questionJp": "PPM(プロダクトポートフォリオマネジメント)において、市場成長率が高く相対的市場シェアも高い事業はどれに分類されるか。",
    "questionTranslation": "Dalam PPM, bisnis dengan pertumbuhan pasar TINGGI dan market share TINGGI diklasifikasikan sebagai?",
    "options": [
      { "key": "ア", "textJp": "花形 (Star)", "textEnId": "Star", "explanation": "Benar! High Growth + High Share = Star. Butuh investasi besar tapi menghasilkan revenue tinggi." },
      { "key": "イ", "textJp": "金のなる木 (Cash Cow)", "textEnId": "Cash Cow", "explanation": "Salah. Cash Cow = Low Growth + High Share." },
      { "key": "ウ", "textJp": "問題児 (Question Mark)", "textEnId": "Question Mark", "explanation": "Salah. Question Mark = High Growth + Low Share." },
      { "key": "エ", "textJp": "負け犬 (Dog)", "textEnId": "Dog", "explanation": "Salah. Dog = Low Growth + Low Share." }
    ],
    "correctKey": "ア",
    "summaryExplanation": "PPM Matrix (BCG Matrix): Star(花形)=HiGrowth+HiShare, Cash Cow(金のなる木)=LoGrowth+HiShare, Question Mark(問題児)=HiGrowth+LoShare, Dog(負け犬)=LoGrowth+LoShare.",
    "keyTakeaway": "Star = butuh investasi besar. Cash Cow = sumber dana utama perusahaan."
  },
  {
    "id": "quiz-calc-29",
    "year": "令和3年 過去問",
    "category": "strategy",
    "subCategory": "IT Law (Personal Data Protection APPI)",
    "questionJp": "個人情報保護法における「要配慮個人情報」に該当するものはどれか。",
    "questionTranslation": "Manakah yang termasuk 'Sensitive Personal Information' (要配慮個人情報) menurut UU Perlindungan Data Pribadi Jepang?",
    "options": [
      { "key": "ア", "textJp": "氏名と電話番号", "textEnId": "Nama dan nomor telepon", "explanation": "Salah. Ini personal information biasa, bukan yang memerlukan perhatian khusus." },
      { "key": "イ", "textJp": "メールアドレス", "textEnId": "Alamat email", "explanation": "Salah. Email adalah personal information biasa." },
      { "key": "ウ", "textJp": "病歴や犯罪歴", "textEnId": "Riwayat penyakit dan kriminal", "explanation": "Benar! 要配慮個人情報 mencakup ras, kepercayaan, riwayat penyakit, riwayat kriminal, dan status disabilitas — memerlukan consent EKSPLISIT untuk pengumpulannya." },
      { "key": "エ", "textJp": "勤務先の住所", "textEnId": "Alamat kantor", "explanation": "Salah. Ini bukan data sensitif." }
    ],
    "correctKey": "ウ",
    "summaryExplanation": "要配慮個人情報: ras, kepercayaan agama/politik, riwayat penyakit, riwayat kriminal, status korban kejahatan, disabilitas. Berbeda dari personal information biasa: pengumpulannya WAJIB consent eksplisit dari pemilik data.",
    "keyTakeaway": "要配慮個人情報 = data sensitif (penyakit, kriminal, ras). Wajib consent eksplisit."
  },
  {
    "id": "quiz-calc-30",
    "year": "令和4年 過去問",
    "category": "strategy",
    "subCategory": "IT Law (Worker Dispatch vs Contract 派遣 vs 請負)",
    "questionJp": "請負契約において、発注者が受注者の従業員に対して直接業務上の指示を行った場合、法的にどのような問題が生じるか。",
    "questionTranslation": "Dalam kontrak outsourcing (請負), jika pemesan langsung memberikan instruksi kerja kepada karyawan kontraktor, masalah hukum apa yang timbul?",
    "options": [
      { "key": "ア", "textJp": "契約違反にはならない", "textEnId": "Tidak melanggar kontrak", "explanation": "Salah. Ini jelas pelanggaran." },
      { "key": "イ", "textJp": "偽装請負に該当する可能性がある", "textEnId": "Berpotensi menjadi pseudo-outsourcing (偽装請負)", "explanation": "Benar! 請負 = kontraktor yang memberikan instruksi. Jika pemesan langsung memerintah karyawan kontraktor → 偽装請負 → melanggar UU Dispatch." },
      { "key": "ウ", "textJp": "委任契約に自動変更される", "textEnId": "Otomatis berubah menjadi kontrak komisi", "explanation": "Salah. Tidak ada perubahan otomatis." },
      { "key": "エ", "textJp": "労働基準法のみの問題", "textEnId": "Hanya masalah UU Standar Ketenagakerjaan", "explanation": "Salah. Ini melanggar UU Dispatch juga." }
    ],
    "correctKey": "イ",
    "summaryExplanation": "請負(outsourcing): kontraktor yang memberi instruksi kerja ke karyawannya sendiri. 派遣(dispatch): perusahaan klien yang memberi instruksi. Jika dalam 請負 tapi klien yang langsung perintah → 偽装請負 (pseudo-outsourcing) → ILEGAL karena melanggar 労働者派遣法.",
    "keyTakeaway": "請負: kontraktor yang perintah. Klien langsung perintah pekerja = 偽装請負 (ilegal)."
  }
];
