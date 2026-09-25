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
  // ==========================================
  // 1. 2分探索 (Binary Search) - IPA Spec
  // ==========================================
  {
    id: "algo-binary-search",
    titleJp: "2分探索 (Binary Search)",
    titleEn: "Binary Search in Sorted Array (IPA Spec)",
    category: "search",
    description: "Mencari angka 63 dalam array terurut data[1..9] = [12, 25, 34, 48, 57, 63, 79, 88, 91] menggunakan format resmi 擬似言語 IPA 科目B (1-based index, ← assignment). Amati bagaimana batas low dan high terbelah dua di tiap iterasi.",
    initialVariables: {
      low: 1,
      high: 9,
      mid: "-",
      "data[mid]": "-",
      target: 63,
      status: "Mulai pencarian di rentang 1..9...",
    },
    codeLines: [
      "○ 整数型: binarySearch(整数型の配列: data, 整数型: target)",
      "  整数型: low, high, mid",
      "  low ← 1",
      "  high ← dataの要素数",
      "  while (low ≦ high)",
      "    mid ← (low + high) ÷ 2 の整数部",
      "    if (data[mid] = target)",
      "      return mid  // Ditemukan!",
      "    elseif (data[mid] < target)",
      "      low ← mid + 1",
      "    else",
      "      high ← mid - 1",
      "    endif",
      "  endwhile",
      "  return -1  // Tidak ditemukan",
    ],
    steps: [
      {
        lineIndex: 2,
        explanation: "Inisialisasi low ← 1 (indeks awal array 1-based sesuai standar resmi IPA).",
        variableState: { low: 1, high: "-", mid: "-", "data[mid]": "-", target: 63, status: "low diisi 1" },
      },
      {
        lineIndex: 3,
        explanation: "Inisialisasi high ← dataの要素数 (high diisi 9, yaitu jumlah total elemen array data).",
        variableState: { low: 1, high: 9, mid: "-", "data[mid]": "-", target: 63, status: "high diisi 9" },
      },
      {
        lineIndex: 4,
        explanation: "Cek kondisi loop: low (1) ≦ high (9) bernilai TRUE. Masuk ke iterasi 1.",
        variableState: { low: 1, high: 9, mid: "-", "data[mid]": "-", target: 63, status: "Loop 1 dimulai (1 ≦ 9)" },
      },
      {
        lineIndex: 5,
        explanation: "Hitung titik tengah: mid ← (1 + 9) ÷ 2 = 5. Elemen data[5] bernilai 57.",
        variableState: { low: 1, high: 9, mid: 5, "data[mid]": 57, target: 63, status: "Cek data[5] = 57" },
      },
      {
        lineIndex: 6,
        explanation: "Cek apakah data[5] (57) = target (63)? Nilai berbeda (FALSE).",
        variableState: { low: 1, high: 9, mid: 5, "data[mid]": 57, target: 63, status: "57 ≠ 63" },
      },
      {
        lineIndex: 8,
        explanation: "Cek apakah data[5] (57) < target (63)? TRUE. Target berada di paruh kanan!",
        variableState: { low: 1, high: 9, mid: 5, "data[mid]": 57, target: 63, status: "57 < 63 (Geser low)" },
      },
      {
        lineIndex: 9,
        explanation: "Geser batas bawah: low ← mid + 1 = 5 + 1 = 6. Rentang kini menyusut jadi indeks 6..9.",
        variableState: { low: 6, high: 9, mid: 5, "data[mid]": 57, target: 63, status: "low jadi 6" },
      },
      {
        lineIndex: 4,
        explanation: "Cek kondisi loop: low (6) ≦ high (9) bernilai TRUE. Masuk ke iterasi 2.",
        variableState: { low: 6, high: 9, mid: 5, "data[mid]": "-", target: 63, status: "Loop 2 dimulai (6 ≦ 9)" },
      },
      {
        lineIndex: 5,
        explanation: "Hitung mid baru ← (6 + 9) ÷ 2 = 15 ÷ 2 = 7 (ambil bagian bulat). data[7] bernilai 79.",
        variableState: { low: 6, high: 9, mid: 7, "data[mid]": 79, target: 63, status: "Cek data[7] = 79" },
      },
      {
        lineIndex: 6,
        explanation: "Cek apakah data[7] (79) = target (63)? Nilai berbeda (FALSE).",
        variableState: { low: 6, high: 9, mid: 7, "data[mid]": 79, target: 63, status: "79 ≠ 63" },
      },
      {
        lineIndex: 8,
        explanation: "Cek data[7] (79) < target (63)? FALSE (79 > 63). Masuk ke blok else.",
        variableState: { low: 6, high: 9, mid: 7, "data[mid]": 79, target: 63, status: "79 > 63 (Geser high)" },
      },
      {
        lineIndex: 11,
        explanation: "Geser batas atas: high ← mid - 1 = 7 - 1 = 6. Rentang kini menyusut hanya indeks 6..6.",
        variableState: { low: 6, high: 6, mid: 7, "data[mid]": 79, target: 63, status: "high jadi 6" },
      },
      {
        lineIndex: 4,
        explanation: "Cek kondisi loop: low (6) ≦ high (6) bernilai TRUE. Masuk ke iterasi 3.",
        variableState: { low: 6, high: 6, mid: "-", "data[mid]": "-", target: 63, status: "Loop 3 dimulai (6 ≦ 6)" },
      },
      {
        lineIndex: 5,
        explanation: "Hitung mid baru ← (6 + 6) ÷ 2 = 6. data[6] bernilai 63.",
        variableState: { low: 6, high: 6, mid: 6, "data[mid]": 63, target: 63, status: "Cek data[6] = 63" },
      },
      {
        lineIndex: 6,
        explanation: "Cek apakah data[6] (63) = target (63)? TRUE! Target ditemukan di indeks 6.",
        variableState: { low: 6, high: 6, mid: 6, "data[mid]": 63, target: 63, status: "COCOK! (Ditemukan)" },
      },
      {
        lineIndex: 7,
        explanation: "Kembalikan nilai mid = 6. Algoritma selesai dalam 3 kali pengecekan!",
        variableState: { low: 6, high: 6, mid: 6, "data[mid]": 63, target: 63, status: "Return 6 (Selesai)" },
      },
    ],
    challenges: [
      {
        id: "c-bin-01",
        type: "fill_blank",
        title: "Soal 科目B: Menentukan Pembaruan Rentang Pencarian (IPA Spec)",
        questionJp: "次の関数 binarySearch において、探索対象が現在の中央値よりも大きい場合、次の探索範囲の下限を更新する空欄 [  a  ] に入る式として適切なものはどれか。",
        questionId: "Pada fungsi binarySearch, jika target lebih besar dari data[mid], rumus yang tepat untuk mengisi kekosongan [  a  ] adalah...",
        blankLabel: "a",
        codeSnippet: [
          "elseif (data[mid] < target)",
          "  low ← [  a  ]",
        ],
        options: [
          { key: "ア", text: "mid", isCorrect: false, explanation: "Jika low ← mid, loop dapat terjebak dalam infinite loop saat jarak hanya 1 elemen." },
          { key: "イ", text: "mid + 1", isCorrect: true, explanation: "Benar! Karena data[mid] sudah terbukti < target, pencarian berikutnya dimulai dari mid + 1." },
          { key: "ウ", text: "mid - 1", isCorrect: false, explanation: "mid - 1 adalah pembaruan untuk variabel high ketika data[mid] > target." },
          { key: "エ", text: "low + 1", isCorrect: false, explanation: "low + 1 adalah pencarian linear berurutan, bukan karakteristik pembagian dua binary search." },
        ],
        keyTakeaway: "Sintaks IPA resmi: assignment menggunakan '←', perbandingan '＝' dan '≦', serta array 1-based (elemen 1 s/d n). Jika data[mid] < target, batas bawah low ← mid + 1.",
        hintStepIndex: 6,
      },
    ],
  },

  // ==========================================
  // 2. 番兵法 (Sentinel Linear Search) - IPA Spec
  // ==========================================
  {
    id: "algo-sentinel-search",
    titleJp: "番兵法 (Sentinel Linear Search)",
    titleEn: "Linear Search with Sentinel (IPA Spec)",
    category: "search",
    description: "Mencari angka 91 dalam array data[1..5] = [24, 73, 52, 91, 15] dengan teknik legendaris 科目B: menaruh 'Sentinel' (番兵 - target 91) di data[n + 1] agar loop tidak perlu mengecek batas indeks (i ≦ n) setiap kali iterasi.",
    initialVariables: {
      "data": "[24, 73, 52, 91, 15, (91)]",
      target: 91,
      n: 5,
      i: 1,
      "data[i]": "-",
      status: "Sentinel disisipkan di data[6]...",
    },
    codeLines: [
      "○ 整数型: sentinelSearch(整数型の配列: data, 整数型: n, 整数型: target)",
      "  整数型: i",
      "  data[n + 1] ← target  // Pasang Banpei (番兵) di indeks n+1",
      "  i ← 1",
      "  while (data[i] ≠ target)  // Tanpa cek batas i ≦ n!",
      "    i ← i + 1",
      "  endwhile",
      "  if (i ≦ n)",
      "    return i  // Ditemukan di data asli (1 ≦ i ≦ n)",
      "  else",
      "    return -1 // Hanya menabrak banpei di n+1",
      "  endif",
    ],
    steps: [
      {
        lineIndex: 2,
        explanation: "Pasang banpei: letakkan target 91 di indeks data[n + 1] (data[6]).",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: "-", "data[i]": "-", status: "Sentinel terpasang di data[6]" },
      },
      {
        lineIndex: 3,
        explanation: "Inisialisasi i ← 1 (indeks awal array 1-based).",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: 1, "data[i]": 24, status: "Mulai dari indeks 1" },
      },
      {
        lineIndex: 4,
        explanation: "Cek data[1] (24) ≠ 91 bernilai TRUE. Lanjut periksa elemen berikutnya.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: 1, "data[i]": 24, status: "data[1] bukan 91" },
      },
      {
        lineIndex: 5,
        explanation: "i bertambah: i ← 1 + 1 = 2.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: 2, "data[i]": 73, status: "i = 2" },
      },
      {
        lineIndex: 4,
        explanation: "Cek data[2] (73) ≠ 91 bernilai TRUE. Lanjut.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: 2, "data[i]": 73, status: "data[2] bukan 91" },
      },
      {
        lineIndex: 5,
        explanation: "i bertambah: i ← 2 + 1 = 3.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: 3, "data[i]": 52, status: "i = 3" },
      },
      {
        lineIndex: 4,
        explanation: "Cek data[3] (52) ≠ 91 bernilai TRUE. Lanjut.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: 3, "data[i]": 52, status: "data[3] bukan 91" },
      },
      {
        lineIndex: 5,
        explanation: "i bertambah: i ← 3 + 1 = 4.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: 4, "data[i]": 91, status: "i = 4" },
      },
      {
        lineIndex: 4,
        explanation: "Cek data[4] (91) ≠ 91 bernilai FALSE! Perulangan langsung berhenti seketika.",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: 4, "data[i]": 91, status: "Kecocokan ditemukan!" },
      },
      {
        lineIndex: 7,
        explanation: "Cek apakah i (4) ≦ n (5)? TRUE! Elemen ditemukan di data asli (bukan sentinel di indeks 6).",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: 4, "data[i]": 91, status: "Validasi asli: i ≦ 5" },
      },
      {
        lineIndex: 8,
        explanation: "Kembalikan indeks 4. Pencarian sukses tanpa perlu cek batas array (i ≦ n) berulang kali!",
        variableState: { "data": "[24, 73, 52, 91, 15, 91]", target: 91, n: 5, i: 4, "data[i]": 91, status: "Selesai di indeks 4" },
      },
    ],
    challenges: [
      {
        id: "c-sent-01",
        type: "fill_blank",
        title: "Soal 科目B: Kondisi Loop Tanpa Cek Batas Array (IPA Spec)",
        questionJp: "番兵法を用いる最大の利点は、ループ内の終了判定条件を簡略化できることにある。while文の条件式 [  a  ] に入る式として適切なものはどれか。",
        questionId: "Keuntungan terbesar Banpeihou adalah menyederhanakan kondisi loop. Rumus yang tepat untuk mengisi [  a  ] pada while loop adalah...",
        blankLabel: "a",
        codeSnippet: [
          "data[n + 1] ← target",
          "while [  a  ]",
          "  i ← i + 1",
          "endwhile",
        ],
        options: [
          { key: "ア", text: "i ≦ n and data[i] ≠ target", isCorrect: false, explanation: "Ini adalah linear search biasa. Jika tetap mengecek i ≦ n, tujuan efisiensi 番兵法 menjadi hilang." },
          { key: "イ", text: "data[i] ≠ target", isCorrect: true, explanation: "Benar! Karena target dipastikan ada di ujung array (data[n + 1]), loop pasti berhenti tanpa resiko index out of bounds." },
          { key: "ウ", text: "data[i] = target", isCorrect: false, explanation: "Kondisi ini akan langsung berhenti di awal jika elemen pertama bukan target." },
          { key: "エ", text: "i ≦ n", isCorrect: false, explanation: "Hanya mengecek indeks tanpa memeriksa nilai data tidak akan menemukan target." },
        ],
        keyTakeaway: "番兵 (Banpei) menjamin target pasti ditemukan di ujung (n + 1). Loop cukup mengecek data[i] ≠ target tanpa overhead i ≦ n.",
        hintStepIndex: 0,
      },
    ],
  },

  // ==========================================
  // 3. 基本挿入法 (Insertion Sort) - IPA Spec
  // ==========================================
  {
    id: "algo-insertion-sort",
    titleJp: "基本挿入法 (Insertion Sort)",
    titleEn: "Insertion Sort Algorithm (IPA Spec)",
    category: "sort",
    description: "Algoritma sorting fundamental 科目B: Mengambil satu kartu data dan menyisipkannya ke posisi yang tepat pada kelompok data yang sudah terurut di sebelah kiri (array data[1..5] = [5, 2, 4, 6, 1]).",
    initialVariables: {
      data: "[5, 2, 4, 6, 1]",
      i: 2,
      key: 2,
      j: 1,
      status: "Mulai penyisipan elemen ke-2 (nilai 2)...",
    },
    codeLines: [
      "○ insertionSort(整数型の配列: data, 整数型: n)",
      "  整数型: i, j, key",
      "  for (i を 2 から n まで 1 ずつ増やす)",
      "    key ← data[i]",
      "    j ← i - 1",
      "    while (j ≧ 1 and data[j] > key)",
      "      data[j + 1] ← data[j]  // Geser elemen lebih besar ke kanan",
      "      j ← j - 1",
      "    endwhile",
      "    data[j + 1] ← key  // Sisipkan key di posisi lowong",
      "  endfor",
    ],
    steps: [
      {
        lineIndex: 2,
        explanation: "Mulai loop luar: i ← 2. Kita akan menyisipkan elemen data[2] bernilai 2 ke kelompok kiri.",
        variableState: { data: "[5, 2, 4, 6, 1]", i: 2, key: 2, j: 1, status: "Ambil key = data[2] = 2" },
      },
      {
        lineIndex: 5,
        explanation: "Cek while: j (1) ≧ 1 dan data[1] (5) > key (2) bernilai TRUE. Angka 5 harus digeser ke kanan!",
        variableState: { data: "[5, 2, 4, 6, 1]", i: 2, key: 2, j: 1, status: "5 > 2 -> Geser 5" },
      },
      {
        lineIndex: 6,
        explanation: "Geser: data[2] ← data[1] (nilai 5 digeser ke indeks 2). Array sementara [5, 5, 4, 6, 1].",
        variableState: { data: "[5, 5, 4, 6, 1]", i: 2, key: 2, j: 1, status: "Array sementara: [5, 5, ...]" },
      },
      {
        lineIndex: 7,
        explanation: "j berkurang: j ← 1 - 1 = 0. Loop while selesai karena j < 1.",
        variableState: { data: "[5, 5, 4, 6, 1]", i: 2, key: 2, j: 0, status: "Posisi sisip ditemukan" },
      },
      {
        lineIndex: 9,
        explanation: "Sisipkan key: data[0 + 1] ← key (2). Bagian terurut kiri sekarang [2, 5].",
        variableState: { data: "[2, 5, 4, 6, 1]", i: 2, key: 2, j: 0, status: "Selesai iterasi 1: [2, 5, 4, 6, 1]" },
      },
      {
        lineIndex: 2,
        explanation: "Iterasi i ← 3: Ambil key = data[3] bernilai 4. Sisipkan ke kelompok [2, 5].",
        variableState: { data: "[2, 5, 4, 6, 1]", i: 3, key: 4, j: 2, status: "Ambil key = 4" },
      },
      {
        lineIndex: 6,
        explanation: "data[2] (5) > 4 -> Geser 5 ke kanan menjadi data[3]. Array sementara [2, 5, 5, 6, 1].",
        variableState: { data: "[2, 5, 5, 6, 1]", i: 3, key: 4, j: 2, status: "Geser 5" },
      },
      {
        lineIndex: 9,
        explanation: "data[1] (2) < 4 (tidak geser). Sisipkan key 4 di data[2]. Kelompok terurut kini [2, 4, 5, 6, 1].",
        variableState: { data: "[2, 4, 5, 6, 1]", i: 3, key: 4, j: 1, status: "Kelompok terurut: [2, 4, 5, 6, 1]" },
      },
    ],
    challenges: [
      {
        id: "c-ins-01",
        type: "fill_blank",
        title: "Soal 科目B: Pergeseran Elemen pada Insertion Sort (IPA Spec)",
        questionJp: "基本挿入法において、整列済みの部分配列内で key より大きい要素を右へ1つシフトする処理 [  a  ] として適切なものはどれか。",
        questionId: "Pada Insertion Sort, operasi menggeser elemen yang lebih besar dari key ke kanan [  a  ] adalah...",
        blankLabel: "a",
        codeSnippet: [
          "while (j ≧ 1 and data[j] > key)",
          "  [  a  ]",
          "  j ← j - 1",
          "endwhile",
        ],
        options: [
          { key: "ア", text: "data[j] ← data[j + 1]", isCorrect: false, explanation: "Ini menggeser ke kiri dan menimpa nilai yang sedang diperiksa." },
          { key: "イ", text: "data[j + 1] ← data[j]", isCorrect: true, explanation: "Benar! Nilai data[j] digeser ke indeks j + 1 di sebelah kanannya untuk memberi ruang bagi key." },
          { key: "ウ", text: "data[j] ← key", isCorrect: false, explanation: "Penyisipan key dilakukan setelah loop while selesai, bukan di dalam loop pergeseran." },
          { key: "エ", text: "data[i] ← data[j]", isCorrect: false, explanation: "Menyalin langsung ke indeks i akan merusak penanda posisi luar." },
        ],
        keyTakeaway: "Insertion sort menggeser data[j] ke data[j + 1] selama data[j] > key, lalu meletakkan key di data[j + 1] setelah loop while selesai.",
        hintStepIndex: 2,
      },
    ],
  },

  // ==========================================
  // 4. バブルソート (Bubble Sort) - IPA Spec
  // ==========================================
  {
    id: "algo-bubble-sort",
    titleJp: "バブルソート (Bubble Sort)",
    titleEn: "Bubble Sort Algorithm (IPA Spec)",
    category: "sort",
    description: "Membandingkan dua elemen berdampingan dari kanan ke kiri dan menukarnya jika urutannya salah, hingga elemen terkecil mengapung ke posisi paling depan (array data[1..4] = [4, 3, 1, 2]).",
    initialVariables: {
      data: "[4, 3, 1, 2]",
      i: 1,
      j: 4,
      swaps: 0,
      status: "Mulai iterasi i = 1...",
    },
    codeLines: [
      "○ bubbleSort(整数型の配列: data, 整数型: n)",
      "  整数型: i, j, temp",
      "  for (i を 1 から n - 1 まで 1 ずつ増やす)",
      "    for (j を n から i + 1 まで 1 ずつ減らす)",
      "      if (data[j - 1] > data[j])",
      "        temp ← data[j - 1]",
      "        data[j - 1] ← data[j]",
      "        data[j] ← temp",
      "      endif",
      "    endfor",
      "  endfor",
    ],
    steps: [
      {
        lineIndex: 4,
        explanation: "Iterasi i = 1, j = 4: Bandingkan data[3] (1) dan data[4] (2). 1 > 2 bernilai FALSE (urutan sudah benar, tidak tukar).",
        variableState: { data: "[4, 3, 1, 2]", i: 1, j: 4, swaps: 0, status: "1 < 2 (Aman)" },
      },
      {
        lineIndex: 4,
        explanation: "j berkurang jadi 3: Bandingkan data[2] (3) dan data[3] (1). 3 > 1 TRUE (salah urut!). Tukar posisi!",
        variableState: { data: "[4, 3, 1, 2]", i: 1, j: 3, swaps: 0, status: "3 > 1 -> Tukar!" },
      },
      {
        lineIndex: 6,
        explanation: "Tukar data[2] dan data[3]. Array menjadi [4, 1, 3, 2].",
        variableState: { data: "[4, 1, 3, 2]", i: 1, j: 3, swaps: 1, status: "Hasil tukar: [4, 1, 3, 2]" },
      },
      {
        lineIndex: 4,
        explanation: "j berkurang jadi 2: Bandingkan data[1] (4) dan data[2] (1). 4 > 1 TRUE! Tukar posisi 4 dan 1!",
        variableState: { data: "[4, 1, 3, 2]", i: 1, j: 2, swaps: 1, status: "4 > 1 -> Tukar!" },
      },
      {
        lineIndex: 6,
        explanation: "Tukar data[1] dan data[2]. Array kini [1, 4, 3, 2]. Nilai minimum 1 telah mengapung ke indeks 1!",
        variableState: { data: "[1, 4, 3, 2]", i: 1, j: 2, swaps: 2, status: "Selesai i=1: [1, 4, 3, 2]" },
      },
    ],
    challenges: [
      {
        id: "c-bub-01",
        type: "predict_output",
        title: "Soal 科目B: Prediksi Status Array Pasca Iterasi Luar Pertama (IPA Spec)",
        questionJp: "初期配列 data = [4, 3, 1, 2] に対し、上記のバブルソートを実行したとき、外側のループ i = 1 が終了した直後の配列の状態として正しいものはどれか。",
        questionId: "Pada array data = [4, 3, 1, 2], setelah iterasi luar pertama (i = 1) selesai dijalankan, keadaan array adalah...",
        options: [
          { key: "ア", text: "[1, 4, 3, 2]", isCorrect: true, explanation: "Benar! Elemen terkecil '1' mengapung ke indeks 1 setelah dua kali pertukaran (3↔1 lalu 4↔1)." },
          { key: "イ", text: "[1, 2, 3, 4]", isCorrect: false, explanation: "Array baru sepenuhnya terurut setelah seluruh iterasi luar selesai, bukan pada i = 1." },
          { key: "ウ", text: "[3, 1, 2, 4]", isCorrect: false, explanation: "Urutan ini tidak merefleksikan pergerakan gelembung minimum ke depan." },
          { key: "エ", text: "[4, 1, 2, 3]", isCorrect: false, explanation: "Elemen 4 tertukar dengan 1, sehingga 1 berada di depan dan 4 di indeks 2." },
        ],
        keyTakeaway: "Pada bubble sort dari kanan ke kiri, iterasi i ke-1 selalu menempatkan elemen terkecil di indeks 1 (1-based array).",
        hintStepIndex: 4,
      },
    ],
  },

  // ==========================================
  // 5. 逆ポーランド記法 (Reverse Polish Notation) - IPA Spec
  // ==========================================
  {
    id: "algo-reverse-polish",
    titleJp: "逆ポーランド記法 (Reverse Polish Notation)",
    titleEn: "Postfix Expression Evaluation with Stack (IPA Spec)",
    category: "structure",
    description: "Evaluasi ekspresi aritmatika postfix '5 3 + 2 *' menggunakan struktur data Stack (LIFO) dengan notasi pseudocode resmi IPA. Angka di-push ke stack; saat bertemu operator pop 2 angka, hitung, dan push kembali hasilnya.",
    initialVariables: {
      token: "5",
      stack: "[]",
      action: "Mulai evaluasi postfix...",
    },
    codeLines: [
      "○ 整数型: evalPostfix(文字列型の配列: tokens, 整数型: n)",
      "  整数型のスタック: stack",
      "  整数型: i, a, b",
      "  stack ← newStack()",
      "  for (i を 1 から n まで 1 ずつ増やす)",
      "    if (isNumber(tokens[i]))",
      "      push(stack, toInteger(tokens[i]))",
      "    elseif (isOperator(tokens[i]))",
      "      b ← pop(stack)",
      "      a ← pop(stack)",
      "      push(stack, calculate(a, tokens[i], b))",
      "    endif",
      "  endfor",
      "  return pop(stack)",
    ],
    steps: [
      {
        lineIndex: 6,
        explanation: "Token '5' adalah angka. push(stack, 5). Isi stack sekarang: [5].",
        variableState: { token: "5", stack: "[5]", action: "Push 5" },
      },
      {
        lineIndex: 6,
        explanation: "Token '3' adalah angka. push(stack, 3). Isi stack sekarang: [5, 3].",
        variableState: { token: "3", stack: "[5, 3]", action: "Push 3" },
      },
      {
        lineIndex: 8,
        explanation: "Token '+' adalah operator. Pop nilai atas: b ← 3, lalu pop nilai berikutnya: a ← 5.",
        variableState: { token: "+", stack: "[]", action: "Pop b=3, a=5" },
      },
      {
        lineIndex: 10,
        explanation: "Hitung a + b = 5 + 3 = 8. push(stack, 8). Stack sekarang: [8].",
        variableState: { token: "+", stack: "[8]", action: "Push 8 (5 + 3)" },
      },
      {
        lineIndex: 6,
        explanation: "Token '2' adalah angka. push(stack, 2). Stack sekarang: [8, 2].",
        variableState: { token: "2", stack: "[8, 2]", action: "Push 2" },
      },
      {
        lineIndex: 8,
        explanation: "Token '*' adalah operator. Pop nilai atas: b ← 2, lalu pop: a ← 8.",
        variableState: { token: "*", stack: "[]", action: "Pop b=2, a=8" },
      },
      {
        lineIndex: 10,
        explanation: "Hitung a * b = 8 * 2 = 16. push(stack, 16). Stack sekarang: [16].",
        variableState: { token: "*", stack: "[16]", action: "Push 16 (8 * 2)" },
      },
      {
        lineIndex: 13,
        explanation: "Loop selesai. pop(stack) untuk mengambil hasil akhir 16!",
        variableState: { token: "EOF", stack: "[]", action: "Hasil Akhir = 16" },
      },
    ],
    challenges: [
      {
        id: "c-rpn-01",
        type: "predict_output",
        title: "Soal 科目B: Urutan Operand Saat Operasi Pengurangan (IPA Spec)",
        questionJp: "逆ポーランド記法の式 '7 3 -' をスタックを用いて処理する際、pop した2つの値を順に b, a とするとき、減算の演算式として正しいものはどれか。",
        questionId: "Pada ekspresi postfix '7 3 -', saat pop 2 nilai berturut-turut (pertama b, kedua a), rumus pengurangannya adalah...",
        options: [
          { key: "ア", text: "b - a", isCorrect: false, explanation: "Karena stack LIFO, nilai yang di-pop pertama adalah 3 (b) dan kedua adalah 7 (a). Jika b - a, hasilnya 3 - 7 = -4 (salah)." },
          { key: "イ", text: "a - b", isCorrect: true, explanation: "Benar! Nilai pertama yang di-pop adalah operand kanan (b=3), nilai kedua operand kiri (a=7). Maka a - b = 7 - 3 = 4." },
          { key: "ウ", text: "a ÷ b", isCorrect: false, explanation: "Operator yang diproses pada soal adalah pengurangan (-)." },
          { key: "エ", text: "b % a", isCorrect: false, explanation: "Bukan operasi modulus." },
        ],
        keyTakeaway: "Pada Stack LIFO: elemen teratas yang di-pop pertama adalah operand kanan (b), pop kedua adalah operand kiri (a). Operasi yang benar adalah a - b atau a ÷ b.",
        hintStepIndex: 2,
      },
    ],
  },

  // ==========================================
  // 6. ユークリッドの互除法 (Euclidean Algorithm) - IPA Spec
  // ==========================================
  {
    id: "algo-euclidean-gcd",
    titleJp: "ユークリッドの互除法 (Euclidean Algorithm)",
    titleEn: "Greatest Common Divisor (IPA Spec)",
    category: "math",
    description: "Mencari Pembagi Bersama Terbesar (FPB / 最大公約数) dari dua bilangan bulat (48 dan 18) menggunakan operasi sisa bagi (modulo %) dengan sintaks resmi IPA 科目B.",
    initialVariables: {
      a: 48,
      b: 18,
      r: "-",
      status: "Mulai pencarian FPB (48, 18)...",
    },
    codeLines: [
      "○ 整数型: gcd(整数型: a, 整数型: b)",
      "  整数型: r",
      "  while (b ≠ 0)",
      "    r ← a % b",
      "    a ← b",
      "    b ← r",
      "  endwhile",
      "  return a  // FPB ditemukan",
    ],
    steps: [
      {
        lineIndex: 2,
        explanation: "Cek kondisi while: b (18) ≠ 0 bernilai TRUE. Masuk iterasi pertama.",
        variableState: { a: 48, b: 18, r: "-", status: "Loop 1 dimulai" },
      },
      {
        lineIndex: 3,
        explanation: "Hitung sisa bagi r ← a % b = 48 % 18 = 12 (karena 18 × 2 = 36, sisa 12).",
        variableState: { a: 48, b: 18, r: 12, status: "r ← 48 % 18 = 12" },
      },
      {
        lineIndex: 4,
        explanation: "Geser nilai: a ← b = 18.",
        variableState: { a: 18, b: 18, r: 12, status: "a diperbarui jadi 18" },
      },
      {
        lineIndex: 5,
        explanation: "Geser sisa bagi: b ← r = 12. Persiapan pasangan baru (18, 12).",
        variableState: { a: 18, b: 12, r: 12, status: "b diperbarui jadi 12" },
      },
      {
        lineIndex: 2,
        explanation: "Cek kondisi while: b (12) ≠ 0 masih TRUE. Masuk iterasi kedua.",
        variableState: { a: 18, b: 12, r: 12, status: "Loop 2 dimulai" },
      },
      {
        lineIndex: 3,
        explanation: "Hitung r ← a % b = 18 % 12 = 6 (karena 12 × 1 = 12, sisa 6).",
        variableState: { a: 18, b: 12, r: 6, status: "r ← 18 % 12 = 6" },
      },
      {
        lineIndex: 4,
        explanation: "Geser nilai: a ← b = 12.",
        variableState: { a: 12, b: 12, r: 6, status: "a diperbarui jadi 12" },
      },
      {
        lineIndex: 5,
        explanation: "Geser sisa bagi: b ← r = 6. Persiapan pasangan baru (12, 6).",
        variableState: { a: 12, b: 6, r: 6, status: "b diperbarui jadi 6" },
      },
      {
        lineIndex: 2,
        explanation: "Cek kondisi while: b (6) ≠ 0 masih TRUE. Masuk iterasi ketiga.",
        variableState: { a: 12, b: 6, r: 6, status: "Loop 3 dimulai" },
      },
      {
        lineIndex: 3,
        explanation: "Hitung r ← a % b = 12 % 6 = 0 (habis dibagi tanpa sisa!).",
        variableState: { a: 12, b: 6, r: 0, status: "r ← 12 % 6 = 0 (Habis)" },
      },
      {
        lineIndex: 4,
        explanation: "Geser nilai: a ← b = 6.",
        variableState: { a: 6, b: 6, r: 0, status: "a diperbarui jadi 6" },
      },
      {
        lineIndex: 5,
        explanation: "Geser sisa bagi: b ← r = 0.",
        variableState: { a: 6, b: 0, r: 0, status: "b bernilai 0" },
      },
      {
        lineIndex: 2,
        explanation: "Cek kondisi while: b = 0, kondisi b ≠ 0 bernilai FALSE! Loop berhenti.",
        variableState: { a: 6, b: 0, r: 0, status: "Loop berhenti" },
      },
      {
        lineIndex: 7,
        explanation: "Kembalikan nilai a = 6. FPB terbesar dari 48 dan 18 adalah 6!",
        variableState: { a: 6, b: 0, r: 0, status: "GCD = 6 (Selesai)" },
      },
    ],
    challenges: [
      {
        id: "c-euc-01",
        type: "fill_blank",
        title: "Soal 科目B: Logika Geser Nilai pada Algoritma Euclid (IPA Spec)",
        questionJp: "ユークリッドの互除法において、2つの変数の更新処理 [  a  ] に入る代入文として正しいものはどれか。",
        questionId: "Pada algoritma Euclid, rumus penggeseran variabel yang benar pada [  a  ] adalah...",
        blankLabel: "a",
        codeSnippet: [
          "r ← a % b",
          "a ← b",
          "[  a  ]",
        ],
        options: [
          { key: "ア", text: "b ← a", isCorrect: false, explanation: "Karena baris sebelumnya a sudah diisi dengan b, b ← a akan membuat nilai b tidak berubah dari sebelumnya." },
          { key: "イ", text: "b ← r", isCorrect: true, explanation: "Benar! Pembagi b yang baru adalah sisa bagi r dari iterasi saat ini." },
          { key: "ウ", text: "b ← r % a", isCorrect: false, explanation: "Tidak perlu operasi modulus ulang." },
          { key: "エ", text: "r ← b", isCorrect: false, explanation: "Ini membalik arah penyimpanan sisa bagi." },
        ],
        keyTakeaway: "Euclidean GCD dalam sintaks IPA: r ← a % b, a ← b, b ← r. Saat b = 0, nilai a adalah FPB (最大公約数).",
        hintStepIndex: 3,
      },
    ],
  },

  // ==========================================
  // 7. 2分探索木の巡回 (Tree Traversal) - IPA Spec
  // ==========================================
  {
    id: "algo-tree-inorder",
    titleJp: "2分探索木の巡回 (Tree Traversal)",
    titleEn: "Binary Search Tree In-Order Traversal (IPA Spec)",
    category: "structure",
    description: "Menelusuri pohon 2分木 dengan metode rekursif 中間順 (In-order: Kiri ➔ Node Sendiri ➔ Kanan). Karakteristik sakti ujian FE: In-order pada BST selalu menghasilkan urutan data terurut menaik (昇順)!",
    initialVariables: {
      tree: "Root(20) [L:10 (L:5), R:30]",
      output: "[]",
      current: "Node(20)",
      status: "Mulai penelusuran dari root (20)...",
    },
    codeLines: [
      "○ inOrder(Node: node)",
      "  if (node ≠ null)",
      "    inOrder(node.left)   // 1. Kunjungi anak kiri",
      "    print(node.value)    // 2. Kunjungi node sendiri",
      "    inOrder(node.right)  // 3. Kunjungi anak kanan",
      "  endif",
    ],
    steps: [
      {
        lineIndex: 2,
        explanation: "Panggil inOrder(20). Karena memiliki anak kiri (10), rekursif ke kiri: inOrder(10).",
        variableState: { tree: "Node(20)", output: "[]", current: "inOrder(20)", status: "Rekursif ke kiri (10)" },
      },
      {
        lineIndex: 2,
        explanation: "Di Node(10): Memiliki anak kiri (5), rekursif ke kiri lagi: inOrder(5).",
        variableState: { tree: "Node(10)", output: "[]", current: "inOrder(5)", status: "Rekursif ke daun (5)" },
      },
      {
        lineIndex: 3,
        explanation: "Node(5) tidak memiliki anak kiri. Cetak nilai 5! Output: [5].",
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
        title: "Soal 科目B: Urutan Cetak pada Tree Traversal (IPA Spec)",
        questionJp: "2分探索木に対して中間順巡回（In-order Traversal: 左部分木 ➔ 根 ➔ 右部分木）を行ったとき、出力される要素の並び順に関する説明として正しいものはどれか。",
        questionId: "Pernyataan yang paling benar mengenai hasil keluaran penelusuran In-order pada Binary Search Tree adalah...",
        options: [
          { key: "ア", text: "値が昇順（小さい順）に整列されて出力される", isCorrect: true, explanation: "Benar! Karakteristik sakti BST: Left < Root < Right. Maka In-order (Left -> Root -> Right) otomatis menghasilkan urutan data menaik (ascending / 昇順)!" },
          { key: "イ", text: "根（root）の値が最初に出力される", isCorrect: false, explanation: "Root dicetak pertama kali pada Pre-order (先行順), bukan In-order." },
          { key: "ウ", text: "値が降順（大きい順）に出力される", isCorrect: false, explanation: "Jika ingin descending, urutannya harus Right -> Root -> Left." },
          { key: "エ", text: "深さが浅い階層順に出力される", isCorrect: false, explanation: "Itu adalah pencarian melebar (Breadth-First Search / 幅優先探索)." },
        ],
        keyTakeaway: "Kunci Emas FE: In-order traversal (中間順) pada 2分探索木 (BST) PASTI menghasilkan data terurut menaik (昇順).",
        hintStepIndex: 5,
      },
    ],
  },

  // ==========================================
  // 8. リングバッファ (Circular Queue) - IPA Spec
  // ==========================================
  {
    id: "algo-ring-buffer",
    titleJp: "リングバッファ (Circular Queue)",
    titleEn: "Circular Buffer Pointer Wrap-around (IPA Spec)",
    category: "structure",
    description: "Struktur data antrean (Queue FIFO) berbasis array melingkar ukuran MAX = 5 dengan indeks 1-based (buffer[1..5]). Ketika pointer tail mencapai MAX (5), pointer melingkar kembali ke indeks 1 menggunakan rumus IPA: (tail % MAX) + 1.",
    initialVariables: {
      buffer: "[A, B, C, -, -]",
      head: 1,
      tail: 4,
      MAX: 5,
      status: "Siap enqueue item 'D' di indeks tail (4)...",
    },
    codeLines: [
      "○ 論理型: enqueue(文字列型: item)",
      "  if (((tail % MAX) + 1) = head)",
      "    return false  // Queue Penuh (Head terkejar)",
      "  endif",
      "  buffer[tail] ← item",
      "  tail ← (tail % MAX) + 1  // Melingkar ke 1 jika tail=MAX",
      "  return true",
    ],
    steps: [
      {
        lineIndex: 1,
        explanation: "Cek kondisi penuh: ((tail % MAX) + 1) = ((4 % 5) + 1) = 4 + 1 = 5 ≠ head (1). Masih ada ruang kosong!",
        variableState: { buffer: "[A, B, C, -, -]", head: 1, tail: 4, MAX: 5, status: "Cek kapasitas: Masih aman" },
      },
      {
        lineIndex: 4,
        explanation: "Simpan item 'D' di buffer[4].",
        variableState: { buffer: "[A, B, C, D, -]", head: 1, tail: 4, MAX: 5, status: "buffer[4] ← 'D'" },
      },
      {
        lineIndex: 5,
        explanation: "Geser tail: tail ← (4 % 5) + 1 = 5.",
        variableState: { buffer: "[A, B, C, D, -]", head: 1, tail: 5, MAX: 5, status: "tail jadi 5" },
      },
      {
        lineIndex: 4,
        explanation: "Enqueue berikutnya: Simpan item 'E' di buffer[5] (posisi ujung array).",
        variableState: { buffer: "[A, B, C, D, E]", head: 1, tail: 5, MAX: 5, status: "buffer[5] ← 'E'" },
      },
      {
        lineIndex: 5,
        explanation: "Melingkar! tail ← (5 % 5) + 1 = 0 + 1 = 1. Pointer tail melingkar kembali ke indeks 1!",
        variableState: { buffer: "[A, B, C, D, E]", head: 1, tail: 1, MAX: 5, status: "Wrap-around! tail melingkar ke 1" },
      },
    ],
    challenges: [
      {
        id: "c-ring-01",
        type: "fill_blank",
        title: "Soal 科目B: Rumus Melingkar Indeks Pointer Ring Buffer (IPA 1-Based)",
        questionJp: "要素数 MAX の配列 buffer（添字 1 〜 MAX）を用いたリングバッファにおいて、末尾ポインタ tail を次に進める更新式 [  a  ] として適切なものはどれか。",
        questionId: "Pada ring buffer berukuran MAX dengan indeks 1 s/d MAX, rumus pembaruan pointer tail agar melingkar kembali ke 1 saat mencapai MAX adalah...",
        blankLabel: "a",
        codeSnippet: [
          "buffer[tail] ← item",
          "tail ← [  a  ]",
        ],
        options: [
          { key: "ア", text: "tail + 1", isCorrect: false, explanation: "Hanya tail + 1 akan menyebabkan IndexOutOfBoundsException saat tail melampaui MAX." },
          { key: "イ", text: "(tail % MAX) + 1", isCorrect: true, explanation: "Benar! Pada array 1-based (1..MAX), saat tail = MAX (5), (5 % 5) + 1 = 0 + 1 = 1, sehingga kembali ke indeks pertama!" },
          { key: "ウ", text: "(tail + 1) % MAX", isCorrect: false, explanation: "(tail + 1) % MAX adalah rumus jika array menggunakan indeks 0..MAX-1 (0-based), bukan 1-based." },
          { key: "エ", text: "tail % (MAX + 1)", isCorrect: false, explanation: "Batas array adalah MAX, bukan MAX + 1." },
        ],
        keyTakeaway: "Kunci Emas FE: Array 1-based (1 s/d MAX) menggunakan (index % MAX) + 1 untuk wrap-around. Array 0-based (0 s/d MAX-1) menggunakan (index + 1) % MAX.",
        hintStepIndex: 4,
      },
    ],
  },
];
