export interface TracerChallengeOption {
  key: "ア" | "イ" | "ウ" | "エ";
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface TracerChallenge {
  id: string;
  type: "fill_blank" | "predict_output";
  title: string;
  questionJp: string;
  questionId: string;
  blankLabel?: string; // e.g. "a"
  codeSnippet?: string[];
  options: TracerChallengeOption[];
  keyTakeaway: string;
  hintStepIndex?: number;
}

export interface TracerStep {
  lineIndex: number;
  explanation: string;
  variableState: Record<string, string | number | boolean | (number | string)[]>;
}

export interface TracerAlgorithm {
  id: string;
  titleJp: string;
  titleEn: string;
  category: "search" | "sort" | "structure" | "math";
  description: string;
  codeLines: string[];
  initialVariables: Record<string, string | number | boolean | (number | string)[]>;
  steps: TracerStep[];
  challenges: TracerChallenge[];
}

export const FE_TRACER_ALGORITHMS: TracerAlgorithm[] = [
  {
    id: "algo-binary-search",
    titleJp: "2分探索 (Binary Search)",
    titleEn: "Binary Search in Sorted Array",
    category: "search",
    description: "Mencari angka 63 dalam array terurut [12, 25, 34, 48, 57, 63, 79, 88, 91]. Amati bagaimana rentang 'low' dan 'high' terbelah dua di tiap iterasi.",
    initialVariables: {
      low: 0,
      high: 8,
      mid: "-",
      "data[mid]": "-",
      target: 63,
      status: "Mulai pencarian...",
    },
    codeLines: [
      "function binarySearch(data, target):",
      "  low = 0",
      "  high = data.length - 1",
      "  while low <= high:",
      "    mid = floor((low + high) / 2)",
      "    if data[mid] == target:",
      "      return mid  // Ditemukan!",
      "    else if data[mid] < target:",
      "      low = mid + 1",
      "    else:",
      "      high = mid - 1",
      "  return -1  // Tidak ditemukan",
    ],
    steps: [
      {
        lineIndex: 1,
        explanation: "Inisialisasi low = 0 (indeks awal array).",
        variableState: { low: 0, high: "-", mid: "-", "data[mid]": "-", target: 63, status: "Inisialisasi" },
      },
      {
        lineIndex: 2,
        explanation: "Inisialisasi high = 8 (indeks elemen terakhir array bernilai 91).",
        variableState: { low: 0, high: 8, mid: "-", "data[mid]": "-", target: 63, status: "Inisialisasi" },
      },
      {
        lineIndex: 3,
        explanation: "Cek kondisi while: low (0) <= high (8) bernilai TRUE. Masuk ke loop.",
        variableState: { low: 0, high: 8, mid: "-", "data[mid]": "-", target: 63, status: "Loop 1 dimulai" },
      },
      {
        lineIndex: 4,
        explanation: "Hitung titik tengah: mid = floor((0 + 8) / 2) = 4. Elemen data[4] bernilai 57.",
        variableState: { low: 0, high: 8, mid: 4, "data[mid]": 57, target: 63, status: "Cek data[4] = 57" },
      },
      {
        lineIndex: 5,
        explanation: "Cek apakah data[4] (57) == target (63)? FALSE.",
        variableState: { low: 0, high: 8, mid: 4, "data[mid]": 57, target: 63, status: "57 != 63" },
      },
      {
        lineIndex: 7,
        explanation: "Cek apakah data[4] (57) < target (63)? TRUE. Target berada di paruh kanan!",
        variableState: { low: 0, high: 8, mid: 4, "data[mid]": 57, target: 63, status: "57 < 63 (Geser low)" },
      },
      {
        lineIndex: 8,
        explanation: "Geser batas bawah: low = mid + 1 = 4 + 1 = 5. Rentang pencarian kini indeks 5 s/d 8.",
        variableState: { low: 5, high: 8, mid: 4, "data[mid]": 57, target: 63, status: "low jadi 5" },
      },
      {
        lineIndex: 3,
        explanation: "Cek kondisi while: low (5) <= high (8) bernilai TRUE. Masuk loop kedua.",
        variableState: { low: 5, high: 8, mid: 4, "data[mid]": "-", target: 63, status: "Loop 2 dimulai" },
      },
      {
        lineIndex: 4,
        explanation: "Hitung mid baru = floor((5 + 8) / 2) = floor(13 / 2) = 6. data[6] bernilai 79.",
        variableState: { low: 5, high: 8, mid: 6, "data[mid]": 79, target: 63, status: "Cek data[6] = 79" },
      },
      {
        lineIndex: 5,
        explanation: "Cek apakah data[6] (79) == target (63)? FALSE.",
        variableState: { low: 5, high: 8, mid: 6, "data[mid]": 79, target: 63, status: "79 != 63" },
      },
      {
        lineIndex: 7,
        explanation: "Cek data[6] (79) < target (63)? FALSE. Masuk ke blok else.",
        variableState: { low: 5, high: 8, mid: 6, "data[mid]": 79, target: 63, status: "79 > 63 (Geser high)" },
      },
      {
        lineIndex: 10,
        explanation: "Geser batas atas: high = mid - 1 = 6 - 1 = 5. Rentang pencarian kini hanya indeks 5.",
        variableState: { low: 5, high: 5, mid: 6, "data[mid]": 79, target: 63, status: "high jadi 5" },
      },
      {
        lineIndex: 3,
        explanation: "Cek kondisi while: low (5) <= high (5) bernilai TRUE. Masuk loop ketiga.",
        variableState: { low: 5, high: 5, mid: "-", "data[mid]": "-", target: 63, status: "Loop 3 dimulai" },
      },
      {
        lineIndex: 4,
        explanation: "Hitung mid baru = floor((5 + 5) / 2) = 5. data[5] bernilai 63.",
        variableState: { low: 5, high: 5, mid: 5, "data[mid]": 63, target: 63, status: "Cek data[5] = 63" },
      },
      {
        lineIndex: 5,
        explanation: "Cek apakah data[5] (63) == target (63)? TRUE! Target ditemukan persis di indeks 5.",
        variableState: { low: 5, high: 5, mid: 5, "data[mid]": 63, target: 63, status: "COCOK! (Ditemukan)" },
      },
      {
        lineIndex: 6,
        explanation: "Kembalikan nilai mid = 5. Algoritma selesai hanya dalam 3 kali pengecekan!",
        variableState: { low: 5, high: 5, mid: 5, "data[mid]": 63, target: 63, status: "Return 5 (Selesai)" },
      },
    ],
    challenges: [
      {
        id: "c-bin-01",
        type: "fill_blank",
        title: "Soal 科目B: Menentukan Pembaruan Rentang Pencarian",
        questionJp: "次の関数 binarySearch において、探索対象が現在の中央値よりも大きい場合、次の探索範囲の下限を更新する空欄 [  a  ] に入る式として適切なものはどれか。",
        questionId: "Pada fungsi binarySearch, jika target lebih besar dari data[mid], rumus yang tepat untuk mengisi kekosongan [  a  ] adalah...",
        blankLabel: "a",
        codeSnippet: [
          "else if data[mid] < target:",
          "  low = [  a  ]",
        ],
        options: [
          { key: "ア", text: "mid", isCorrect: false, explanation: "Jika low = mid, loop dapat terjebak dalam infinite loop karena rentang tidak mengecil." },
          { key: "イ", text: "mid + 1", isCorrect: true, explanation: "Benar! Karena data[mid] sudah dicek dan terbukti lebih kecil dari target, pencarian berikutnya dimulai dari mid + 1." },
          { key: "ウ", text: "mid - 1", isCorrect: false, explanation: "mid - 1 adalah pembaruan untuk variabel high ketika data[mid] > target." },
          { key: "エ", text: "low + 1", isCorrect: false, explanation: "low + 1 adalah pencarian linear lambat, bukan karakteristik binary search yang membagi dua." },
        ],
        keyTakeaway: "Binary search membagi rentang jadi 2. Jika data[mid] < target, low = mid + 1. Jika data[mid] > target, high = mid - 1.",
        hintStepIndex: 7,
      },
    ],
  },
  {
    id: "algo-sentinel-search",
    titleJp: "番兵法 (Sentinel Linear Search)",
    titleEn: "Linear Search with Sentinel",
    category: "search",
    description: "Trik legendaris ujian FE 科目B: Menambahkan 'Sentinel' (番兵 - elemen target 91) di ujung array [24, 73, 52, 91, 15] agar loop tidak perlu mengecek batas indeks (i < n) di tiap iterasi.",
    initialVariables: {
      "data": "[24, 73, 52, 91, 15, (91)]",
      target: 91,
      i: 0,
      "data[i]": "-",
      status: "Sentinel disisipkan di data[5]...",
    },
    codeLines: [
      "function sentinelSearch(data, n, target):",
      "  data[n] = target  // Pasang Banpei (番兵) di ujung",
      "  i = 0",
      "  while data[i] != target:  // Tanpa cek i < n!",
      "    i = i + 1",
      "  if i < n:",
      "    return i  // Ditemukan di data asli",
      "  else:",
      "    return -1 // Hanya menabrak banpei",
    ],
    steps: [
      {
        lineIndex: 1,
        explanation: "Pasang banpei: letakkan target 91 di indeks data[5]. Array kini berukuran 6.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: "-", "data[i]": "-", status: "Sentinel terpasang di ujung" },
      },
      {
        lineIndex: 2,
        explanation: "Inisialisasi i = 0.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: 0, "data[i]": 24, status: "Mulai dari index 0" },
      },
      {
        lineIndex: 3,
        explanation: "Cek data[0] (24) != 91 bernilai TRUE. Lewati.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: 0, "data[i]": 24, status: "data[0] bukan 91" },
      },
      {
        lineIndex: 4,
        explanation: "i bertambah jadi 1.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: 1, "data[i]": 73, status: "i = 1" },
      },
      {
        lineIndex: 3,
        explanation: "Cek data[1] (73) != 91 bernilai TRUE. Lewati.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: 1, "data[i]": 73, status: "data[1] bukan 91" },
      },
      {
        lineIndex: 4,
        explanation: "i bertambah jadi 2.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: 2, "data[i]": 52, status: "i = 2" },
      },
      {
        lineIndex: 3,
        explanation: "Cek data[2] (52) != 91 bernilai TRUE. Lewati.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: 2, "data[i]": 52, status: "data[2] bukan 91" },
      },
      {
        lineIndex: 4,
        explanation: "i bertambah jadi 3.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: 3, "data[i]": 91, status: "i = 3" },
      },
      {
        lineIndex: 3,
        explanation: "Cek data[3] (91) != 91 bernilai FALSE! Perulangan langsung berhenti seketika.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: 3, "data[i]": 91, status: "Kecocokan ditemukan!" },
      },
      {
        lineIndex: 5,
        explanation: "Cek apakah i (3) < n (5)? TRUE! Elemen ditemukan di data asli (bukan sentinel tiruan di indeks 5).",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: 3, "data[i]": 91, status: "Validasi asli: i < 5" },
      },
      {
        lineIndex: 6,
        explanation: "Kembalikan indeks 3. Pencarian sukses tanpa perlu cek batas array berulang kali!",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, i: 3, "data[i]": 91, status: "Selesai di index 3" },
      },
    ],
    challenges: [
      {
        id: "c-sent-01",
        type: "fill_blank",
        title: "Soal 科目B: Kondisi Loop Tanpa Cek Batas Array",
        questionJp: "番兵法を用いる最大の利点は、ループ内の終了判定条件を簡略化できることにある。while文の条件式 [  a  ] に入る式として適切なものはどれか。",
        questionId: "Keuntungan terbesar Banpeihou adalah menyederhanakan kondisi loop. Rumus yang tepat untuk mengisi [  a  ] pada while loop adalah...",
        blankLabel: "a",
        codeSnippet: [
          "data[n] = target",
          "while [  a  ]:",
          "  i = i + 1",
        ],
        options: [
          { key: "ア", text: "i < n and data[i] != target", isCorrect: false, explanation: "Ini adalah linear search biasa. Jika tetap mengecek i < n, tujuan efisiensi番兵法 menjadi hilang." },
          { key: "イ", text: "data[i] != target", isCorrect: true, explanation: "Benar! Karena target dipastikan ada di ujung array (data[n]), loop pasti berhenti tanpa resiko index out of bounds." },
          { key: "ウ", text: "data[i] == target", isCorrect: false, explanation: "Kondisi ini akan langsung berhenti di awal jika elemen pertama bukan target." },
          { key: "エ", text: "i <= n", isCorrect: false, explanation: "Hanya mengecek indeks tanpa memeriksa nilai data tidak akan menemukan target." },
        ],
        keyTakeaway: "番兵 (Banpei) menjamin target pasti ditemukan di ujung. Loop cukup mengecek data[i] != target tanpa overhead i < n.",
        hintStepIndex: 0,
      },
    ],
  },
  {
    id: "algo-insertion-sort",
    titleJp: "基本挿入法 (Insertion Sort)",
    titleEn: "Insertion Sort Algorithm",
    category: "sort",
    description: "Algoritma sorting fundamental 科目B: Mengambil satu kartu data dan menyisipkannya ke posisi yang tepat pada kelompok data yang sudah terurut di sebelah kiri.",
    initialVariables: {
      data: "[5, 2, 4, 6, 1]",
      i: 1,
      key: 2,
      j: 0,
      status: "Mulai penyisipan elemen ke-1 (nilai 2)...",
    },
    codeLines: [
      "function insertionSort(data, n):",
      "  for i = 1 to n - 1:",
      "    key = data[i]",
      "    j = i - 1",
      "    while j >= 0 and data[j] > key:",
      "      data[j + 1] = data[j]  // Geser elemen lebih besar ke kanan",
      "      j = j - 1",
      "    data[j + 1] = key  // Sisipkan key di posisi lowong",
    ],
    steps: [
      {
        lineIndex: 1,
        explanation: "Mulai loop luar: i = 1. Kita akan menyisipkan elemen data[1] bernilai 2 ke kiri.",
        variableState: { data: "[5, 2, 4, 6, 1]", i: 1, key: 2, j: 0, status: "Ambil key = data[1] = 2" },
      },
      {
        lineIndex: 4,
        explanation: "Cek while: j (0) >= 0 dan data[0] (5) > key (2) bernilai TRUE. 5 harus digeser ke kanan!",
        variableState: { data: "[5, 2, 4, 6, 1]", i: 1, key: 2, j: 0, status: "5 > 2 -> Geser 5" },
      },
      {
        lineIndex: 5,
        explanation: "Geser: data[1] = data[0] (nilai 5 digeser ke kanan).",
        variableState: { data: "[5, 5, 4, 6, 1]", i: 1, key: 2, j: 0, status: "Array sementara: [5, 5, ...]" },
      },
      {
        lineIndex: 6,
        explanation: "j berkurang: j = 0 - 1 = -1. Loop while selesai karena j < 0.",
        variableState: { data: "[5, 5, 4, 6, 1]", i: 1, key: 2, j: -1, status: "Posisi sisip ditemukan" },
      },
      {
        lineIndex: 7,
        explanation: "Sisipkan key: data[0] = key (2). Bagian terurut kiri sekarang [2, 5].",
        variableState: { data: "[2, 5, 4, 6, 1]", i: 1, key: 2, j: -1, status: "Selesai iterasi 1: [2, 5, 4, 6, 1]" },
      },
      {
        lineIndex: 1,
        explanation: "Iterasi i = 2: Ambil key = data[2] bernilai 4. Sisipkan ke kelompok [2, 5].",
        variableState: { data: "[2, 5, 4, 6, 1]", i: 2, key: 4, j: 1, status: "Ambil key = 4" },
      },
      {
        lineIndex: 5,
        explanation: "data[1] (5) > 4 -> Geser 5 ke kanan menjadi data[2].",
        variableState: { data: "[2, 5, 5, 6, 1]", i: 2, key: 4, j: 1, status: "Geser 5" },
      },
      {
        lineIndex: 7,
        explanation: "data[0] (2) < 4 (tidak geser). Sisipkan key 4 di data[1]. Kelompok kini [2, 4, 5].",
        variableState: { data: "[2, 4, 5, 6, 1]", i: 2, key: 4, j: 0, status: "Kelompok terurut: [2, 4, 5, 6, 1]" },
      },
    ],
    challenges: [
      {
        id: "c-ins-01",
        type: "fill_blank",
        title: "Soal 科目B: Pergeseran Elemen pada Insertion Sort",
        questionJp: "基本挿入法において、整列済みの部分配列内で key より大きい要素を右へ1つシフトする処理 [  a  ] として適切なものはどれか。",
        questionId: "Pada Insertion Sort, operasi menggeser elemen yang lebih besar dari key ke kanan [  a  ] adalah...",
        blankLabel: "a",
        codeSnippet: [
          "while j >= 0 and data[j] > key:",
          "  [  a  ]",
          "  j = j - 1",
        ],
        options: [
          { key: "ア", text: "data[j] = data[j + 1]", isCorrect: false, explanation: "Ini menggeser ke kiri dan menimpa nilai yang sedang diperiksa." },
          { key: "イ", text: "data[j + 1] = data[j]", isCorrect: true, explanation: "Benar! Nilai data[j] digeser ke indeks j + 1 di sebelah kanannya untuk memberi ruang bagi key." },
          { key: "ウ", text: "data[j] = key", isCorrect: false, explanation: "Penyisipan key dilakukan setelah loop while selesai, bukan di dalam loop pergeseran." },
          { key: "エ", text: "data[i] = data[j]", isCorrect: false, explanation: "Menyalin langsung ke indeks i akan merusak penanda posisi luar." },
        ],
        keyTakeaway: "Insertion sort menggeser data[j] ke data[j+1] selama data[j] > key, lalu meletakkan key di data[j+1].",
        hintStepIndex: 2,
      },
    ],
  },
  {
    id: "algo-bubble-sort",
    titleJp: "バブルソート (Bubble Sort)",
    titleEn: "Bubble Sort Algorithm",
    category: "sort",
    description: "Membandingkan dua elemen berdampingan dari kanan ke kiri dan menukarnya jika urutannya salah, hingga elemen terkecil mengapung ke posisi paling depan seperti gelembung.",
    initialVariables: {
      data: "[4, 3, 1, 2]",
      i: 0,
      j: 3,
      swaps: 0,
      status: "Mulai iterasi i = 0...",
    },
    codeLines: [
      "function bubbleSort(data, n):",
      "  for i = 0 to n - 2:",
      "    for j = n - 1 down to i + 1:",
      "      if data[j - 1] > data[j]:",
      "        temp = data[j - 1]",
      "        data[j - 1] = data[j]",
      "        data[j] = temp",
    ],
    steps: [
      {
        lineIndex: 2,
        explanation: "Iterasi i = 0: Bandingkan data[2] (1) dan data[3] (2). data[2] < data[3] (sudah benar, tidak tukar).",
        variableState: { data: "[4, 3, 1, 2]", i: 0, j: 3, swaps: 0, status: "1 < 2 (Aman)" },
      },
      {
        lineIndex: 2,
        explanation: "Bandingkan data[1] (3) dan data[2] (1). 3 > 1 (salah urut!), tukar posisi 3 dan 1!",
        variableState: { data: "[4, 3, 1, 2]", i: 0, j: 2, swaps: 0, status: "3 > 1 -> Tukar!" },
      },
      {
        lineIndex: 5,
        explanation: "Tukar data[1] dan data[2]. Array menjadi [4, 1, 3, 2].",
        variableState: { data: "[4, 1, 3, 2]", i: 0, j: 2, swaps: 1, status: "Hasil tukar: [4, 1, 3, 2]" },
      },
      {
        lineIndex: 2,
        explanation: "Bandingkan data[0] (4) dan data[1] (1). 4 > 1, tukar posisi 4 dan 1!",
        variableState: { data: "[4, 1, 3, 2]", i: 0, j: 1, swaps: 1, status: "4 > 1 -> Tukar!" },
      },
      {
        lineIndex: 5,
        explanation: "Tukar data[0] dan data[1]. Array kini [1, 4, 3, 2]. Nilai minimum 1 telah mengapung ke indeks 0!",
        variableState: { data: "[1, 4, 3, 2]", i: 0, j: 1, swaps: 2, status: "Selesai i=0: [1, 4, 3, 2]" },
      },
    ],
    challenges: [
      {
        id: "c-bub-01",
        type: "predict_output",
        title: "Soal 科目B: Prediksi Status Array Pasca Iterasi Luar Pertama",
        questionJp: "初期配列 data = [4, 3, 1, 2] に対し、上記のバブルソートを実行したとき、外側のループ i = 0 が終了した直後の配列の状態として正しいものはどれか。",
        questionId: "Pada array awal [4, 3, 1, 2], setelah iterasi luar pertama (i = 0) selesai dijalankan, keadaan array adalah...",
        options: [
          { key: "ア", text: "[1, 4, 3, 2]", isCorrect: true, explanation: "Benar! Elemen terkecil '1' mengapung ke indeks 0 setelah dua kali pertukaran (3↔1 lalu 4↔1)." },
          { key: "イ", text: "[1, 2, 3, 4]", isCorrect: false, explanation: "Array baru sepenuhnya terurut setelah seluruh iterasi luar selesai, bukan pada i = 0." },
          { key: "ウ", text: "[3, 1, 2, 4]", isCorrect: false, explanation: "Urutan ini tidak merefleksikan pergerakan gelembung minimum ke depan." },
          { key: "エ", text: "[4, 1, 2, 3]", isCorrect: false, explanation: "Elemen 4 tertukar dengan 1, sehingga 1 berada di depan dan 4 di indeks 1." },
        ],
        keyTakeaway: "Pada bubble sort dari kanan ke kiri, iterasi i ke-0 selalu menempatkan elemen terkecil di indeks 0.",
        hintStepIndex: 4,
      },
    ],
  },
  {
    id: "algo-reverse-polish",
    titleJp: "逆ポーランド記法 (Reverse Polish Notation)",
    titleEn: "Postfix Expression Evaluation using Stack",
    category: "structure",
    description: "Evaluasi ekspresi aritmatika postfix '5 3 + 2 *' menggunakan struktur data Stack (LIFO). Jika angka push ke stack; jika operator pop 2 angka, hitung, dan push kembali hasilnya.",
    initialVariables: {
      token: "5",
      stack: "[]",
      action: "Mulai evaluasi...",
    },
    codeLines: [
      "function evalPostfix(tokens):",
      "  stack = new Stack()",
      "  for token in tokens:",
      "    if isNumber(token):",
      "      stack.push(token)",
      "    else if isOperator(token):",
      "      b = stack.pop()",
      "      a = stack.pop()",
      "      stack.push(calculate(a, token, b))",
      "  return stack.pop()",
    ],
    steps: [
      {
        lineIndex: 4,
        explanation: "Token '5' adalah angka. Push 5 ke dalam stack.",
        variableState: { token: "5", stack: "[5]", action: "Push 5" },
      },
      {
        lineIndex: 4,
        explanation: "Token '3' adalah angka. Push 3 ke dalam stack. Stack sekarang [5, 3].",
        variableState: { token: "3", stack: "[5, 3]", action: "Push 3" },
      },
      {
        lineIndex: 6,
        explanation: "Token '+' adalah operator. Pop b = 3 (elemen atas), Pop a = 5.",
        variableState: { token: "+", stack: "[]", action: "Pop b=3, a=5" },
      },
      {
        lineIndex: 8,
        explanation: "Hitung a + b = 5 + 3 = 8. Push 8 ke dalam stack.",
        variableState: { token: "+", stack: "[8]", action: "Push 8 (5+3)" },
      },
      {
        lineIndex: 4,
        explanation: "Token '2' adalah angka. Push 2 ke dalam stack. Stack sekarang [8, 2].",
        variableState: { token: "2", stack: "[8, 2]", action: "Push 2" },
      },
      {
        lineIndex: 6,
        explanation: "Token '*' adalah operator. Pop b = 2, Pop a = 8.",
        variableState: { token: "*", stack: "[]", action: "Pop b=2, a=8" },
      },
      {
        lineIndex: 8,
        explanation: "Hitung a * b = 8 * 2 = 16. Push 16 ke dalam stack.",
        variableState: { token: "*", stack: "[16]", action: "Push 16 (8*2)" },
      },
      {
        lineIndex: 9,
        explanation: "Ekspresi selesai. Pop hasil akhir 16. Selesai!",
        variableState: { token: "EOF", stack: "[]", action: "Hasil Akhir = 16" },
      },
    ],
    challenges: [
      {
        id: "c-rpn-01",
        type: "predict_output",
        title: "Soal 科目B: Urutan Operand Saat Operasi Pengurangan",
        questionJp: "逆ポーランド記法の式 '7 3 -' をスタックを用いて処理する際、pop した2つの値を a, b とするとき、減算の演算式として正しいものはどれか。",
        questionId: "Pada ekspresi postfix '7 3 -', saat pop 2 nilai berturut-turut (pertama b, kedua a), rumus pengurangannya adalah...",
        options: [
          { key: "ア", text: "b - a", isCorrect: false, explanation: "Karena stack LIFO, nilai yang di-pop pertama adalah 3 (b) dan kedua adalah 7 (a). Jika b - a, hasilnya 3 - 7 = -4 (salah)." },
          { key: "イ", text: "a - b", isCorrect: true, explanation: "Benar! Nilai pertama yang di-pop adalah operand kanan (b=3), nilai kedua operand kiri (a=7). Maka a - b = 7 - 3 = 4." },
          { key: "ウ", text: "a / b", isCorrect: false, explanation: "Operator yang diproses adalah pengurangan (-)." },
          { key: "エ", text: "b % a", isCorrect: false, explanation: "Bukan operasi modulus." },
        ],
        keyTakeaway: "Pada Stack LIFO: pop pertama = operand kanan (b), pop kedua = operand kiri (a). Operasi = a - b atau a / b.",
        hintStepIndex: 2,
      },
    ],
  },
  {
    id: "algo-euclidean-gcd",
    titleJp: "ユークリッドの互除法 (Euclidean Algorithm)",
    titleEn: "Greatest Common Divisor (GCD)",
    category: "math",
    description: "Mencari Pembagi Bersama Terbesar (FPB / 最大公約数) dari dua bilangan bulat (48 dan 18) menggunakan operasi sisa bagi (modulo).",
    initialVariables: {
      a: 48,
      b: 18,
      remainder: "-",
      status: "Mulai pencarian FPB...",
    },
    codeLines: [
      "function gcd(a, b):",
      "  while b != 0:",
      "    r = a % b",
      "    a = b",
      "    b = r",
      "  return a  // FPB ditemukan",
    ],
    steps: [
      {
        lineIndex: 1,
        explanation: "Cek kondisi while: b (18) != 0 bernilai TRUE. Masuk iterasi pertama.",
        variableState: { a: 48, b: 18, remainder: "-", status: "Loop 1 dimulai" },
      },
      {
        lineIndex: 2,
        explanation: "Hitung sisa bagi r = a % b = 48 % 18 = 12 (karena 18 × 2 = 36, sisa 12).",
        variableState: { a: 48, b: 18, remainder: 12, status: "r = 48 % 18 = 12" },
      },
      {
        lineIndex: 3,
        explanation: "Geser nilai: a = b = 18.",
        variableState: { a: 18, b: 18, remainder: 12, status: "a diperbarui jadi 18" },
      },
      {
        lineIndex: 4,
        explanation: "Geser sisa bagi: b = r = 12. Persiapan pasangan baru (18, 12).",
        variableState: { a: 18, b: 12, remainder: 12, status: "b diperbarui jadi 12" },
      },
      {
        lineIndex: 1,
        explanation: "Cek kondisi while: b (12) != 0 masih TRUE. Masuk iterasi kedua.",
        variableState: { a: 18, b: 12, remainder: 12, status: "Loop 2 dimulai" },
      },
      {
        lineIndex: 2,
        explanation: "Hitung r = a % b = 18 % 12 = 6 (karena 12 × 1 = 12, sisa 6).",
        variableState: { a: 18, b: 12, remainder: 6, status: "r = 18 % 12 = 6" },
      },
      {
        lineIndex: 3,
        explanation: "Geser nilai: a = b = 12.",
        variableState: { a: 12, b: 12, remainder: 6, status: "a diperbarui jadi 12" },
      },
      {
        lineIndex: 4,
        explanation: "Geser sisa bagi: b = r = 6. Persiapan pasangan baru (12, 6).",
        variableState: { a: 12, b: 6, remainder: 6, status: "b diperbarui jadi 6" },
      },
      {
        lineIndex: 1,
        explanation: "Cek kondisi while: b (6) != 0 masih TRUE. Masuk iterasi ketiga.",
        variableState: { a: 12, b: 6, remainder: 6, status: "Loop 3 dimulai" },
      },
      {
        lineIndex: 2,
        explanation: "Hitung r = a % b = 12 % 6 = 0 (habis dibagi tanpa sisa!).",
        variableState: { a: 12, b: 6, remainder: 0, status: "r = 12 % 6 = 0 (Habis)" },
      },
      {
        lineIndex: 3,
        explanation: "Geser nilai: a = b = 6.",
        variableState: { a: 6, b: 6, remainder: 0, status: "a diperbarui jadi 6" },
      },
      {
        lineIndex: 4,
        explanation: "Geser sisa bagi: b = r = 0.",
        variableState: { a: 6, b: 0, remainder: 0, status: "b bernilai 0" },
      },
      {
        lineIndex: 1,
        explanation: "Cek kondisi while: b == 0, loop berhenti!",
        variableState: { a: 6, b: 0, remainder: 0, status: "Loop berhenti" },
      },
      {
        lineIndex: 5,
        explanation: "Kembalikan nilai a = 6. FPB terbesar dari 48 dan 18 adalah 6!",
        variableState: { a: 6, b: 0, remainder: 0, status: "GCD = 6 (Selesai)" },
      },
    ],
    challenges: [
      {
        id: "c-euc-01",
        type: "fill_blank",
        title: "Soal 科目B: Logika Geser Nilai pada Algoritma Euclid",
        questionJp: "ユークリッドの互除法において、2つの変数の更新処理 [  a  ] に入る代入文として正しいものはどれか。",
        questionId: "Pada algoritma Euclid, rumus penggeseran variabel yang benar pada [  a  ] adalah...",
        blankLabel: "a",
        codeSnippet: [
          "r = a % b",
          "a = b",
          "[  a  ]",
        ],
        options: [
          { key: "ア", text: "b = a", isCorrect: false, explanation: "Karena baris sebelumnya a sudah diubah menjadi b, b = a akan membuat b tetap sama." },
          { key: "イ", text: "b = r", isCorrect: true, explanation: "Benar! Pembagi b yang baru adalah sisa bagi r dari iterasi saat ini." },
          { key: "ウ", text: "b = r % a", isCorrect: false, explanation: "Tidak perlu modulus ulang." },
          { key: "エ", text: "r = b", isCorrect: false, explanation: "Ini membalik arah penyimpanan sisa bagi." },
        ],
        keyTakeaway: "Euclidean GCD: r = a % b, a = b, b = r. Saat b == 0, nilai a adalah FPB (最大公約数).",
        hintStepIndex: 3,
      },
    ],
  },
  {
    id: "algo-tree-inorder",
    titleJp: "2分探索木の巡回 (Tree Traversal)",
    titleEn: "Binary Search Tree In-Order Traversal",
    category: "structure",
    description: "Menelusuri pohon 2分木 dengan metode rekursif 中間順 (In-order: Kiri ➔ Node Sendiri ➔ Kanan). Karakteristik sakti FE: In-order pada BST selalu menghasilkan urutan data terurut!",
    initialVariables: {
      tree: "Root(20) [L:10 (L:5), R:30]",
      output: "[]",
      current: "Node(20)",
      status: "Mulai penelusuran dari root (20)...",
    },
    codeLines: [
      "function inOrder(node):",
      "  if node != null:",
      "    inOrder(node.left)   // 1. Kunjungi anak kiri",
      "    print(node.value)    // 2. Kunjungi node sendiri",
      "    inOrder(node.right)  // 3. Kunjungi anak kanan",
    ],
    steps: [
      {
        lineIndex: 2,
        explanation: "Panggil inOrder(20). Karena punya anak kiri (10), rekursif ke kiri inOrder(10).",
        variableState: { tree: "Node(20)", output: "[]", current: "inOrder(20)", status: "Rekursif ke kiri (10)" },
      },
      {
        lineIndex: 2,
        explanation: "Di Node(10): Punya anak kiri (5), rekursif ke kiri lagi inOrder(5).",
        variableState: { tree: "Node(10)", output: "[]", current: "inOrder(5)", status: "Rekursif ke daun (5)" },
      },
      {
        lineIndex: 3,
        explanation: "Node(5) tidak punya anak kiri. Cetak nilai 5! Output: [5].",
        variableState: { tree: "Node(5)", output: "[5]", current: "Print 5", status: "Cetak 5" },
      },
      {
        lineIndex: 3,
        explanation: "Kembali ke Node(10). Anak kiri selesai, sekarang cetak nilai 10! Output: [5, 10].",
        variableState: { tree: "Node(10)", output: "[5, 10]", current: "Print 10", status: "Cetak 10" },
      },
      {
        lineIndex: 3,
        explanation: "Kembali ke Node(20) (root). Sub-pohon kiri selesai, cetak nilai 20! Output: [5, 10, 20].",
        variableState: { tree: "Node(20)", output: "[5, 10, 20]", current: "Print 20", status: "Cetak 20" },
      },
      {
        lineIndex: 4,
        explanation: "Dari Node(20), kunjungi anak kanan Node(30). Cetak nilai 30! Output akhir: [5, 10, 20, 30].",
        variableState: { tree: "Node(30)", output: "[5, 10, 20, 30]", current: "Print 30", status: "Selesai (Sorted!)" },
      },
    ],
    challenges: [
      {
        id: "c-tree-01",
        type: "predict_output",
        title: "Soal 科目B: Urutan Cetak pada Tree Traversal",
        questionJp: "2分探索木に対して中間順巡回（In-order Traversal: 左部分木 ➔ 根 ➔ 右部分木）を行ったとき、出力される要素の並び順に関する説明として正しいものはどれか。",
        questionId: "Pernyataan yang paling benar mengenai hasil keluaran penelusuran In-order pada Binary Search Tree adalah...",
        options: [
          { key: "ア", text: "値が昇順（小さい順）に整列されて出力される", isCorrect: true, explanation: "Benar! Karakteristik sakti BST: Left < Root < Right. Maka In-order (Left -> Root -> Right) otomatis menghasilkan urutan data menaik (ascending/昇順)!" },
          { key: "イ", text: "根（root）の値が最初に出力される", isCorrect: false, explanation: "Root dicetak pertama kali pada Pre-order (先行順), bukan In-order." },
          { key: "ウ", text: "値が降順（大きい順）に出力される", isCorrect: false, explanation: "Jika ingin descending, urutannya harus Right -> Root -> Left." },
          { key: "エ", text: "深さが浅い階層順に出力される", isCorrect: false, explanation: "Itu adalah pencarian melebar (Breadth-First Search / 幅優先探索)." },
        ],
        keyTakeaway: "Kunci Emas FE: In-order traversal (中間順) pada 2分探索木 (BST) PASTI menghasilkan data terurut menaik (昇順).",
        hintStepIndex: 5,
      },
    ],
  },
  {
    id: "algo-ring-buffer",
    titleJp: "リングバッファ (Circular Queue)",
    titleEn: "Circular Buffer Pointer Wrap-around",
    category: "structure",
    description: "Struktur data antrean (Queue FIFO) berbasis array melingkar ukuran MAX = 5. Ketika pointer 'tail' mencapai ujung array, pointer melingkar kembali ke indeks 0 menggunakan operator modulus (%).",
    initialVariables: {
      buffer: "[A, B, C, -, -]",
      head: 0,
      tail: 3,
      MAX: 5,
      status: "Siap enqueue item 'D' di indeks tail (3)...",
    },
    codeLines: [
      "function enqueue(item):",
      "  if (tail + 1) % MAX == head:",
      "    return 'Queue Penuh'",
      "  buffer[tail] = item",
      "  tail = (tail + 1) % MAX  // Melingkar ke awal jika mentok",
    ],
    steps: [
      {
        lineIndex: 1,
        explanation: "Cek kondisi penuh: (tail + 1) % 5 = (3 + 1) % 5 = 4 != head (0). Masih ada ruang!",
        variableState: { buffer: "[A, B, C, -, -]", head: 0, tail: 3, MAX: 5, status: "Cek kapasitas: Aman" },
      },
      {
        lineIndex: 3,
        explanation: "Simpan item 'D' di buffer[3].",
        variableState: { buffer: "[A, B, C, D, -]", head: 0, tail: 3, MAX: 5, status: "buffer[3] = 'D'" },
      },
      {
        lineIndex: 4,
        explanation: "Geser tail: tail = (3 + 1) % 5 = 4.",
        variableState: { buffer: "[A, B, C, D, -]", head: 0, tail: 4, MAX: 5, status: "tail jadi 4" },
      },
      {
        lineIndex: 3,
        explanation: "Enqueue berikutnya: Simpan item 'E' di buffer[4] (posisi ujung array).",
        variableState: { buffer: "[A, B, C, D, E]", head: 0, tail: 4, MAX: 5, status: "buffer[4] = 'E'" },
      },
      {
        lineIndex: 4,
        explanation: "Melingkar! tail = (4 + 1) % 5 = 5 % 5 = 0. Pointer tail melingkar kembali ke indeks 0!",
        variableState: { buffer: "[A, B, C, D, E]", head: 0, tail: 0, MAX: 5, status: "Wrap-around! tail melingkar ke 0" },
      },
    ],
    challenges: [
      {
        id: "c-ring-01",
        type: "fill_blank",
        title: "Soal 科目B: Rumus Melingkar Indeks Pointer Ring Buffer",
        questionJp: "要素数 MAX の配列を用いたリングバッファにおいて、末尾ポインタ tail を次に進める更新式 [  a  ] として適切なものはどれか。",
        questionId: "Pada ring buffer berukuran MAX, rumus pembaruan pointer tail agar melingkar kembali ke 0 saat mencapai ujung adalah...",
        blankLabel: "a",
        codeSnippet: [
          "buffer[tail] = item",
          "tail = [  a  ]",
        ],
        options: [
          { key: "ア", text: "tail + 1", isCorrect: false, explanation: "Hanya tail + 1 akan menyebabkan IndexOutOfBoundsException saat tail mencapai MAX." },
          { key: "イ", text: "(tail + 1) % MAX", isCorrect: true, explanation: "Benar! Operasi modulo % MAX membuat angka kembali ke 0 begitu mencapai nilai MAX (contoh: (4 + 1) % 5 = 0)." },
          { key: "ウ", text: "(tail + 1) / MAX", isCorrect: false, explanation: "Operasi pembagian bukan untuk menghitung indeks sisa melingkar." },
          { key: "エ", text: "tail % (MAX + 1)", isCorrect: false, explanation: "Batas array adalah MAX, bukan MAX + 1." },
        ],
        keyTakeaway: "Rumus sakti antrean melingkar (Circular Buffer): nextIndex = (currentIndex + 1) % MAX.",
        hintStepIndex: 4,
      },
    ],
  },
];
