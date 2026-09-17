import type { GlossaryTerm } from "../curriculum/types";

export const glossaryTerms: GlossaryTerm[] = [
  // A
  { term: "API", category: "web", definitionEn: "Application Programming Interface — a set of rules for how software components communicate.", definitionId: "Antarmuka Pemrograman Aplikasi — aturan untuk bagaimana komponen software berkomunikasi.", example: "The fetch() function calls an API to get data." },
  { term: "Argument", category: "javascript", definitionEn: "The actual value passed to a function when it is called.", definitionId: "Nilai aktual yang dikirim ke function saat dipanggil.", example: "In greet('Kai'), 'Kai' is the argument." },
  { term: "Array", category: "javascript", definitionEn: "An ordered collection of values, accessed by zero-based index.", definitionId: "Kumpulan nilai berurutan, diakses dengan index dari nol.", example: "const fruits = ['apple', 'banana'];" },
  { term: "Async", category: "javascript", definitionEn: "Code that runs asynchronously, allowing other code to execute while waiting.", definitionId: "Kode yang berjalan secara asinkron, memungkinkan kode lain berjalan sambil menunggu.", example: "fetch(), setTimeout(), and promises are async." },
  { term: "Arrow Function", category: "javascript", definitionEn: "A concise function syntax using =>, with no own 'this' binding.", definitionId: "Syntax function singkat menggunakan =>, tanpa binding 'this' sendiri.", example: "const add = (a, b) => a + b;" },
  // B
  { term: "Backend", category: "web", definitionEn: "The server-side of a web application — databases, APIs, and server logic.", definitionId: "Sisi server dari aplikasi web — database, API, dan logika server.", example: "Node.js, Python, PHP, and Ruby are backend languages." },
  { term: "Block Scope", category: "javascript", definitionEn: "Variable visibility limited to the nearest curly braces {}.", definitionId: "Visibilitas variabel terbatas pada kurung kurawal {} terdekat.", example: "let and const are block-scoped." },
  { term: "Boolean", category: "javascript", definitionEn: "A primitive data type with only two values: true or false.", definitionId: "Tipe data primitif dengan hanya dua nilai: true atau false.", example: "const isActive = true;" },
  { term: "Bug", category: "general", definitionEn: "An error or flaw in code that produces incorrect behavior.", definitionId: "Kesalahan dalam kode yang menghasilkan perilaku salah.", example: "An off-by-one error in a loop is a common bug." },
  // C
  { term: "Callback", category: "javascript", definitionEn: "A function passed as an argument to another function, executed later.", definitionId: "Function yang dikirim sebagai argumen ke function lain, dieksekusi nanti.", example: "setTimeout(() => console.log('hi'), 1000);" },
  { term: "Closure", category: "javascript", definitionEn: "A function that remembers variables from its creation scope.", definitionId: "Function yang mengingat variabel dari scope pembuatannya.", example: "function counter() { let n = 0; return () => ++n; }" },
  { term: "Component", category: "react", definitionEn: "A reusable UI building block in React, written as a function or class.", definitionId: "Blok UI yang dapat digunakan ulang di React, ditulis sebagai function atau class.", example: "function Button() { return <button>Click</button>; }" },
  { term: "const", category: "javascript", definitionEn: "A keyword for declaring a variable that cannot be reassigned.", definitionId: "Keyword untuk mendeklarasikan variabel yang tidak dapat diassign ulang.", example: "const PI = 3.14;" },
  { term: "Constructor", category: "javascript", definitionEn: "A special function for creating objects, called with 'new'.", definitionId: "Function khusus untuk membuat objek, dipanggil dengan 'new'.", example: "new Date() creates a date object." },
  { term: "CSS", category: "web", definitionEn: "Cascading Style Sheets — the language for styling web pages.", definitionId: "Cascading Style Sheets — bahasa untuk menstyling halaman web.", example: "body { background: blue; }" },
  // D
  { term: "DOM", category: "web", definitionEn: "Document Object Model — the tree-like representation of HTML elements.", definitionId: "Document Object Model — representasi pohon dari elemen HTML.", example: "document.querySelector('#app') selects a DOM element." },
  { term: "Debugging", category: "general", definitionEn: "The process of finding and fixing errors in code.", definitionId: "Proses menemukan dan memperbaiki kesalahan dalam kode.", example: "Using console.log and breakpoints to find bugs." },
  { term: "Deploy", category: "devops", definitionEn: "The process of making an application available to users.", definitionId: "Proses membuat aplikasi tersedia untuk pengguna.", example: "Deploying to Vercel or VPS makes the site live." },
  { term: "Destructuring", category: "javascript", definitionEn: "A syntax for extracting values from objects or arrays into variables.", definitionId: "Syntax untuk mengekstrak nilai dari objek atau array ke variabel.", example: "const { name } = user;" },
  // E
  { term: "Endpoint", category: "web", definitionEn: "A specific URL where an API can be accessed.", definitionId: "URL spesifik tempat API dapat diakses.", example: "GET /api/users is an endpoint." },
  { term: "Event Listener", category: "javascript", definitionEn: "A function that waits for a specific event (click, input) and responds.", definitionId: "Function yang menunggu event spesifik (click, input) dan merespons.", example: "button.addEventListener('click', handler);" },
  { term: "Export", category: "javascript", definitionEn: "A keyword that makes a value available for import in other modules.", definitionId: "Keyword yang membuat nilai tersedia untuk import di module lain.", example: "export function add(a, b) { return a + b; }" },
  // F
  { term: "Frontend", category: "web", definitionEn: "The client-side of a web application — what the user sees and interacts with.", definitionId: "Sisi klien dari aplikasi web — apa yang dilihat dan diinteraksi pengguna.", example: "HTML, CSS, and JavaScript are frontend technologies." },
  { term: "Fullstack", category: "web", definitionEn: "A developer who works on both frontend and backend.", definitionId: "Developer yang bekerja di frontend dan backend.", example: "A fullstack dev builds both the UI and the API." },
  { term: "fetch", category: "javascript", definitionEn: "The modern browser API for making HTTP requests.", definitionId: "API browser modern untuk membuat HTTP request.", example: "const res = await fetch('/api/data');" },
  { term: "Function", category: "javascript", definitionEn: "A reusable block of code that performs a specific task.", definitionId: "Blok kode yang dapat digunakan ulang untuk melakukan tugas tertentu.", example: "function greet() { return 'Hello'; }" },
  // G
  { term: "Git", category: "devops", definitionEn: "A version control system for tracking code changes.", definitionId: "Sistem kontrol versi untuk melacak perubahan kode.", example: "git commit -m 'fix bug'" },
  // H
  { term: "Hook", category: "react", definitionEn: "A special function in React that lets you use state and lifecycle features.", definitionId: "Function khusus di React yang memungkinkan menggunakan state dan lifecycle.", example: "const [count, setCount] = useState(0);" },
  { term: "Hoisting", category: "javascript", definitionEn: "JavaScript's behavior of moving declarations to the top of their scope.", definitionId: "Perilaku JavaScript memindahkan deklarasi ke atas scope-nya.", example: "var is hoisted, let/const are in the TDZ." },
  // I
  { term: "Import", category: "javascript", definitionEn: "A keyword that brings values from another module into the current scope.", definitionId: "Keyword yang membawa nilai dari module lain ke scope saat ini.", example: "import { add } from './math.js';" },
  { term: "Immutable", category: "javascript", definitionEn: "A value that cannot be changed after creation. The opposite of mutable.", definitionId: "Nilai yang tidak dapat diubah setelah dibuat. Kebalikan dari mutable.", example: "Strings are immutable in JavaScript." },
  { term: "Interface", category: "typescript", definitionEn: "A TypeScript construct for defining the shape of an object.", definitionId: "Konstruk TypeScript untuk mendefinisikan bentuk objek.", example: "interface User { name: string; }" },
  // J
  { term: "JSON", category: "web", definitionEn: "JavaScript Object Notation — a lightweight data interchange format.", definitionId: "JavaScript Object Notation — format pertukaran data ringan.", example: '{ "name": "Kai", "age": 25 }' },
  // L
  { term: "let", category: "javascript", definitionEn: "A keyword for declaring a variable that can be reassigned.", definitionId: "Keyword untuk mendeklarasikan variabel yang dapat diassign ulang.", example: "let count = 0; count++;" },
  { term: "Loop", category: "javascript", definitionEn: "A construct that repeats a block of code multiple times.", definitionId: "Konstruk yang mengulang blok kode beberapa kali.", example: "for (let i = 0; i < 5; i++) { ... }" },
  // M
  { term: "map()", category: "javascript", definitionEn: "An array method that creates a new array by transforming each element.", definitionId: "Method array yang membuat array baru dengan mentransformasi tiap elemen.", example: "[1,2,3].map(n => n * 2) → [2,4,6]" },
  { term: "Module", category: "javascript", definitionEn: "A self-contained JavaScript file with its own scope, using import/export.", definitionId: "File JavaScript mandiri dengan scope sendiri, menggunakan import/export.", example: "import { add } from './math.js'" },
  { term: "Mutable", category: "javascript", definitionEn: "A value that can be changed after creation. The opposite of immutable.", definitionId: "Nilai yang dapat diubah setelah dibuat. Kebalikan dari immutable.", example: "Arrays and objects are mutable in JavaScript." },
  // N
  { term: "Node.js", category: "web", definitionEn: "A JavaScript runtime built on V8, for running JS outside the browser.", definitionId: "Runtime JavaScript yang dibangun di V8, untuk menjalankan JS di luar browser.", example: "node server.js starts a Node.js server." },
  { term: "Null", category: "javascript", definitionEn: "A primitive representing an intentionally empty value.", definitionId: "Primitif yang mewakili nilai kosong yang disengaja.", example: "const empty = null;" },
  { term: "Number", category: "javascript", definitionEn: "A primitive data type for numeric values (integers and decimals).", definitionId: "Tipe data primitif untuk nilai numerik (bilangan bulat dan desimal).", example: "const age = 25; const price = 9.99;" },
  // O
  { term: "Object", category: "javascript", definitionEn: "A collection of key-value pairs, the most important data structure in JavaScript.", definitionId: "Kumpulan pasangan key-value, struktur data terpenting di JavaScript.", example: "{ name: 'Kai', age: 25 }" },
  { term: "Optional Chaining", category: "javascript", definitionEn: "The ?. operator for safely accessing nested properties.", definitionId: "Operator ?. untuk mengakses properti bertingkat dengan aman.", example: "user?.address?.city" },
  // P
  { term: "Parameter", category: "javascript", definitionEn: "A variable listed in a function definition that receives the argument.", definitionId: "Variabel yang ada di definisi function yang menerima argument.", example: "function greet(name) {} — name is the parameter." },
  { term: "Promise", category: "javascript", definitionEn: "An object representing the eventual completion or failure of an async operation.", definitionId: "Objek yang mewakili penyelesaian atau kegagalan operasi async.", example: "fetch(url).then(res => res.json())" },
  { term: "Prop", category: "react", definitionEn: "Data passed from a parent component to a child component in React.", definitionId: "Data yang dikirim dari parent component ke child component di React.", example: "<Button label='Click' /> — label is a prop." },
  { term: "Prototype", category: "javascript", definitionEn: "The mechanism by which JavaScript objects inherit features from one another.", definitionId: "Mekanisme di mana objek JavaScript mewarisi fitur dari satu sama lain.", example: "Array.prototype.map() — map is on the prototype." },
  // R
  { term: "reduce()", category: "javascript", definitionEn: "An array method that accumulates all elements into a single value.", definitionId: "Method array yang mengakumulasi semua elemen menjadi satu nilai.", example: "[1,2,3].reduce((a,b) => a+b, 0) → 6" },
  { term: "Render", category: "web", definitionEn: "The process of displaying UI elements on screen.", definitionId: "Proses menampilkan elemen UI di layar.", example: "React renders components to the DOM." },
  { term: "REST", category: "web", definitionEn: "An architectural style for designing APIs using HTTP methods.", definitionId: "Gaya arsitektur untuk mendesain API menggunakan HTTP methods.", example: "GET, POST, PUT, DELETE are REST methods." },
  // S
  { term: "Scope", category: "javascript", definitionEn: "The visibility of a variable — where it can be accessed in code.", definitionId: "Visibilitas variabel — di mana ia dapat diakses dalam kode.", example: "Block scope, function scope, global scope." },
  { term: "Spread Operator", category: "javascript", definitionEn: "The ... syntax for expanding an iterable into individual elements.", definitionId: "Syntax ... untuk mengembangkan iterable menjadi elemen individual.", example: "[...arr1, ...arr2] merges arrays." },
  { term: "State", category: "react", definitionEn: "Data that changes over time and controls component behavior in React.", definitionId: "Data yang berubah seiring waktu dan mengontrol perilaku component di React.", example: "const [count, setCount] = useState(0);" },
  { term: "String", category: "javascript", definitionEn: "A primitive data type for text, enclosed in quotes.", definitionId: "Tipe data primitif untuk teks, diapit tanda kutip.", example: "const name = 'Kai';" },
  // T
  { term: "TypeScript", category: "typescript", definitionEn: "A typed superset of JavaScript that compiles to plain JavaScript.", definitionId: "Superset JavaScript yang diketik dan dikompilasi ke JavaScript biasa.", example: "const name: string = 'Kai';" },
  { term: "typeof", category: "javascript", definitionEn: "An operator that returns the type of a value as a string.", definitionId: "Operator yang mengembalikan tipe nilai sebagai string.", example: "typeof 25 → 'number'" },
  // U
  { term: "Undefined", category: "javascript", definitionEn: "A primitive representing a variable that has not been assigned a value.", definitionId: "Primitif yang mewakili variabel yang belum diberi nilai.", example: "let x; console.log(x); // undefined" },
  { term: "useEffect", category: "react", definitionEn: "A React hook for running side effects (fetching, subscriptions) after render.", definitionId: "Hook React untuk menjalankan side effect setelah render.", example: "useEffect(() => { fetchData(); }, []);" },
  { term: "useState", category: "react", definitionEn: "A React hook for adding local state to a component.", definitionId: "Hook React untuk menambah state lokal ke component.", example: "const [count, setCount] = useState(0);" },
  // V
  { term: "var", category: "javascript", definitionEn: "The old way to declare variables in JavaScript. Avoid using it.", definitionId: "Cara lama mendeklarasikan variabel di JavaScript. Hindari penggunaannya.", example: "var x = 5; // use let instead" },
  { term: "Variable", category: "javascript", definitionEn: "A named container for storing data in memory.", definitionId: "Kontainer bernama untuk menyimpan data di memori.", example: "const name = 'Kai';" },
  // W
  { term: "Webhook", category: "web", definitionEn: "An HTTP callback triggered by an event, sending data to a URL.", definitionId: "Callback HTTP yang dipicu oleh event, mengirim data ke URL.", example: "Payment gateway sends a webhook on payment success." },
];
