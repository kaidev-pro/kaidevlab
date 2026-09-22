export interface TracerStep {
  lineIndex: number;
  explanation: string;
  variableState: Record<string, string | number | boolean | (number | string)[]>;
}

export interface TracerAlgorithm {
  id: string;
  titleJp: string;
  titleEn: string;
  description: string;
  codeLines: string[];
  initialVariables: Record<string, string | number | boolean | (number | string)[]>;
  steps: TracerStep[];
}

export const FE_TRACER_ALGORITHMS: TracerAlgorithm[] = [
  {
    id: "algo-binary-search",
    titleJp: "2分探索 (Binary Search)",
    titleEn: "Binary Search in Sorted Array",
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
        explanation: "Hitung titik tengah mid = floor((0 + 8) / 2) = 4. Nilai data[4] = 57.",
        variableState: { low: 0, high: 8, mid: 4, "data[mid]": 57, target: 63, status: "Cek data[4]=57" },
      },
      {
        lineIndex: 7,
        explanation: "data[4] (57) < target (63) bernilai TRUE. Target ada di belahan kanan!",
        variableState: { low: 0, high: 8, mid: 4, "data[mid]": 57, target: 63, status: "Target lebih besar" },
      },
      {
        lineIndex: 8,
        explanation: "Geser batas kiri: low = mid + 1 = 4 + 1 = 5. Rentang pencarian kini indeks 5 s/d 8.",
        variableState: { low: 5, high: 8, mid: 4, "data[mid]": 57, target: 63, status: "low bergeser ke 5" },
      },
      {
        lineIndex: 3,
        explanation: "Cek kondisi while: low (5) <= high (8) masih TRUE. Lanjut iterasi 2.",
        variableState: { low: 5, high: 8, mid: 4, "data[mid]": 57, target: 63, status: "Loop 2 dimulai" },
      },
      {
        lineIndex: 4,
        explanation: "Hitung mid baru = floor((5 + 8) / 2) = floor(13/2) = 6. Nilai data[6] = 63.",
        variableState: { low: 5, high: 8, mid: 6, "data[mid]": 63, target: 63, status: "Cek data[6]=63" },
      },
      {
        lineIndex: 5,
        explanation: "data[6] (63) == target (63) bernilai TRUE! Angka target ditemukan tepat di indeks 6.",
        variableState: { low: 5, high: 8, mid: 6, "data[mid]": 63, target: 63, status: "MATCH! Ditemukan di index 6" },
      },
      {
        lineIndex: 6,
        explanation: "Kembalikan indeks 6. Algoritma selesai hanya dalam 2 kali pembelahan (O(log n))!",
        variableState: { low: 5, high: 8, mid: 6, "data[mid]": 63, target: 63, status: "Selesai (Success)" },
      },
    ],
  },
  {
    id: "algo-stack-calc",
    titleJp: "スタック (Stack LIFO Evaluation)",
    titleEn: "Reverse Polish Notation Evaluation",
    description: "Evaluasi ekspresi matematika Postfix: '5 3 + 2 *' menggunakan struktur data Stack (Last In, First Out).",
    initialVariables: {
      token: "-",
      stack: "[]",
      action: "Mulai evaluasi postfix...",
    },
    codeLines: [
      "tokens = ['5', '3', '+', '2', '*']",
      "stack = []",
      "for token in tokens:",
      "  if isNumber(token):",
      "    stack.push(toNumber(token))",
      "  else if isOperator(token):",
      "    b = stack.pop()",
      "    a = stack.pop()",
      "    stack.push(applyOp(token, a, b))",
      "return stack.pop()",
    ],
    steps: [
      {
        lineIndex: 1,
        explanation: "Inisialisasi stack kosong: [].",
        variableState: { token: "-", stack: "[]", action: "Stack siap" },
      },
      {
        lineIndex: 4,
        explanation: "Token '5' adalah angka. Push 5 ke dalam stack.",
        variableState: { token: "5", stack: "[5]", action: "Push 5" },
      },
      {
        lineIndex: 4,
        explanation: "Token '3' adalah angka. Push 3 ke dalam stack.",
        variableState: { token: "3", stack: "[5, 3]", action: "Push 3" },
      },
      {
        lineIndex: 6,
        explanation: "Token '+' adalah operator. Pop b = 3.",
        variableState: { token: "+", stack: "[5]", action: "Pop b=3" },
      },
      {
        lineIndex: 7,
        explanation: "Pop a = 5.",
        variableState: { token: "+", stack: "[]", action: "Pop a=5" },
      },
      {
        lineIndex: 8,
        explanation: "Hitung a + b = 5 + 3 = 8. Push hasil 8 ke dalam stack.",
        variableState: { token: "+", stack: "[8]", action: "Push 8 (5+3)" },
      },
      {
        lineIndex: 4,
        explanation: "Token '2' adalah angka. Push 2 ke dalam stack.",
        variableState: { token: "2", stack: "[8, 2]", action: "Push 2" },
      },
      {
        lineIndex: 6,
        explanation: "Token '*' adalah operator. Pop b = 2, Pop a = 8.",
        variableState: { token: "*", stack: "[]", action: "Pop 2 dan 8" },
      },
      {
        lineIndex: 8,
        explanation: "Hitung a * b = 8 * 2 = 16. Push 16 ke dalam stack.",
        variableState: { token: "*", stack: "[16]", action: "Push 16 (8*2)" },
      },
      {
        lineIndex: 9,
        explanation: "Pop hasil akhir 16. Ekspresi '(5 + 3) * 2' terhitung tuntas!",
        variableState: { token: "EOF", stack: "[]", action: "Hasil Akhir = 16" },
      },
    ],
  },
  {
    id: "algo-euclidean-gcd",
    titleJp: "ユークリッドの互除法 (Euclidean Algorithm)",
    titleEn: "Greatest Common Divisor (GCD)",
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
  },
  {
    id: "algo-sentinel-search",
    titleJp: "番兵法 (Sentinel Linear Search)",
    titleEn: "Linear Search with Sentinel",
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
  },
];

