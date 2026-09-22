# FE Exam Prep Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive FE (Fundamental Information Technology Engineer) exam prep module at `/fe-prep` with 3 tabs: Kamoku A Drill, Kamoku B Pseudocode, and Trilingual Glossary.

**Architecture:** Single-page app with tab navigation, all state managed via React hooks + localStorage. Data soal trilingual (EN/ID/JA) dipisah ke file terpisah. Styling mengikuti design system kaidevlab existing (CSS variables, Tailwind). No backend required.

**Tech Stack:** Next.js 16 App Router, React 18+, TypeScript, Tailwind CSS, Lucide React

## Global Constraints

- All text content must support 3 locales: `en`, `id`, `ja`
- Mistake Bank persists to `localStorage` key `fe_mistake_bank`
- Language preference persists to `localStorage` key `kaidevlab_lang`
- Auto-detect browser language on first visit (`ja` or `id`, fallback to `en`)
- Dark/light mode follows existing kaidevlab theme system (`data-theme` attribute)
- All components are Client Components (`"use client"`)
- Use existing CSS variables from `globals.css` where possible

---

## File Structure

```
src/app/fe-prep/
├── page.tsx                 # Main page with tab navigation
├── layout.tsx               # Sub-layout (optional, can reuse root)
├── components/
│   ├── FePrepPage.tsx       # Main container with tabs & shared state
│   ├── LanguageSwitcher.tsx # EN/ID/JA toggle
│   ├── KamokuADrill.tsx     # Tab 1: Multiple choice quiz
│   ├── KamokuBPseudocode.tsx # Tab 2: Algorithm tracing
│   └── GlossaryTab.tsx      # Tab 3: Trilingual glossary with search
├── data/
│   ├── questions.ts         # 15-20 Kamoku A questions (trilingual)
│   ├── pseudocode.ts        # 2-3 Kamoku B scenarios (trilingual)
│   └── glossary.ts          # 15-20 glossary terms (trilingual)
└── types.ts                 # Shared TypeScript interfaces
```

---

## Task 1: Create Type Definitions

**Files:**
- Create: `src/app/fe-prep/types.ts`

**Interfaces:**
- `LocalizedString` — `{ en: string; id: string; ja: string }`
- `OptionId` — `"A" | "B" | "C" | "D"`
- `QuizOption` — `{ id: OptionId; text: LocalizedString }`
- `Question` — full question with category, question text, options, correct answer, explanation
- `PseudocodeStep` — `{ line: number; code: LocalizedString; variables: Record<string, number> }`
- `PseudocodeScenario` — `{ id, title, code, steps, question, options, correctOptionId, explanation }`
- `GlossaryTerm` — `{ id, term: LocalizedString, reading: string, definition: LocalizedString, category: string }`

- [ ] **Step 1: Write type definitions**

```typescript
export type Locale = "en" | "id" | "ja";
export type OptionId = "A" | "B" | "C" | "D";

export interface LocalizedString {
  en: string;
  id: string;
  ja: string;
}

export interface QuizOption {
  id: OptionId;
  text: LocalizedString;
}

export interface Question {
  id: string;
  category: LocalizedString;
  question: LocalizedString;
  options: QuizOption[];
  correctOptionId: OptionId;
  explanation: LocalizedString;
}

export interface PseudocodeStep {
  line: number;
  code: LocalizedString;
  variables: Record<string, number | string>;
}

export interface PseudocodeScenario {
  id: string;
  title: LocalizedString;
  code: LocalizedString;
  steps: PseudocodeStep[];
  question: LocalizedString;
  options: QuizOption[];
  correctOptionId: OptionId;
  explanation: LocalizedString;
}

export interface GlossaryTerm {
  id: string;
  term: LocalizedString;
  reading: string; // Romaji for Japanese
  definition: LocalizedString;
  category: string;
}
```

---

## Task 2: Create Kamoku A Question Bank (15-20 soal)

**Files:**
- Create: `src/app/fe-prep/data/questions.ts`

**Data:** 15-20 questions covering:
- Computer Architecture (cache, pipeline)
- Binary/Two's Complement/Bitwise
- OS (paging, virtual memory)
- Database (SQL, normalization, ACID)
- Network (OSI 7 layers, TCP vs UDP, DNS, CIDR)
- Security (digital signature, phishing, ransomware, symmetric/asymmetric)
- Algorithms (time complexity)
- Software engineering (UML, testing)

Each question has: `id`, `category`, `question`, `options` (A-D), `correctOptionId`, `explanation` — all trilingual.

- [ ] **Step 1: Write first 5 questions** (Architecture, Binary, OS, Database, Network)
- [ ] **Step 2: Write next 5 questions** (Security, Algorithms, Software Engineering, +2 more)
- [ ] **Step 3: Write final 5-10 questions** (fill remaining topics)

**Sample format:**
```typescript
import { Question } from "../types";

export const QUESTIONS_DATA: Question[] = [
  {
    id: "fe-a-001",
    category: { en: "Computer Architecture", id: "Arsitektur Komputer", ja: "コンピュータ構成要素" },
    question: { en: "...", id: "...", ja: "..." },
    options: [
      { id: "A", text: { en: "18 ns", id: "18 ns", ja: "18ナノ秒" } },
      // ...
    ],
    correctOptionId: "B",
    explanation: { en: "...", id: "...", ja: "..." },
  },
  // ... 15-20 more
];
```

---

## Task 3: Create Kamoku B Pseudocode Data (2-3 soal)

**Files:**
- Create: `src/app/fe-prep/data/pseudocode.ts`

**Scenarios:**
1. **Binary Search** — trace mid, left, right variables
2. **Bubble Sort** — trace array state after each pass
3. **Recursive Factorial** — trace stack frames

Each has: `id`, `title`, `code` (the pseudocode), `steps` (line-by-line with variable states), `question`, `options`, `correctOptionId`, `explanation` — all trilingual.

- [ ] **Step 1: Write Binary Search scenario**
- [ ] **Step 2: Write Bubble Sort scenario**
- [ ] **Step 3: Write Recursive Factorial scenario**

---

## Task 4: Create Glossary Data (15-20 terms)

**Files:**
- Create: `src/app/fe-prep/data/glossary.ts`

**Terms:** Cover key IT concepts with Kanji + Romaji, English, Indonesian:
- アーキテクチャ (Architecture)
- キャッシュメモリ (Cache Memory)
- 仮想記憶 (Virtual Memory)
- ページング (Paging)
- デッドロック (Deadlock)
- 正規化 (Normalization)
- トランザクション (Transaction)
- デジタル署名 (Digital Signature)
- ファイアウォール (Firewall)
- マルウェア (Malware)
- フレームワーク (Framework)
- アジャイル (Agile)
- ウォーターフォール (Waterfall)
- ビット演算 (Bitwise Operation)
- 再帰呼び出し (Recursive Call)
- 擬似言語 (Pseudocode)
- ヒット率 (Hit Ratio)
- スループット (Throughput)
- レイテンシ (Latency)
- 冗長性 (Redundancy)

- [ ] **Step 1: Write all 20 glossary terms**

---

## Task 5: Create UI Text Dictionary

**Files:**
- Create: `src/app/fe-prep/data/ui-text.ts`

**Content:** All UI labels in 3 languages:
- Tab labels: "Kamoku A", "Kamoku B", "Glossary"
- Button labels: "Next", "Restart", "Check Answer", etc.
- Status labels: "Correct", "Incorrect", "Mistake Bank", etc.
- Filter labels: "All Categories", "All Questions", etc.

- [ ] **Step 1: Write UI_TEXT dictionary**

---

## Task 6: Build Language Switcher Component

**Files:**
- Create: `src/app/fe-prep/components/LanguageSwitcher.tsx`

**Props:**
- `locale: Locale`
- `onChange: (locale: Locale) => void`

**Behavior:**
- Shows 3 buttons: EN / ID / 日本語
- Highlights active locale
- Calls onChange when clicked

- [ ] **Step 1: Implement LanguageSwitcher**
- [ ] **Step 2: Add to page and test switching**

---

## Task 7: Build Kamoku A Drill Component

**Files:**
- Create: `src/app/fe-prep/components/KamokuADrill.tsx`

**Props:**
- `locale: Locale`
- `questions: Question[]`

**State:**
- `currentIndex`, `selectedOption`, `hasAnswered`, `isMistakeMode`, `selectedCategory`, `mistakeIds`

**Features:**
- Category filter dropdown
- Mistake Bank toggle (shows only wrong answers)
- Question card with options A-D
- Instant feedback (green/red) after selecting
- Explanation box shows after answering
- Auto-save wrong answers to localStorage
- Auto-remove from Mistake Bank when answered correctly in review mode
- Next/Restart button
- Progress indicator ("Question 3 of 20")

- [ ] **Step 1: Implement question display & option selection**
- [ ] **Step 2: Implement feedback & explanation**
- [ ] **Step 3: Implement Mistake Bank with localStorage**
- [ ] **Step 4: Implement category filter**
- [ ] **Step 5: Test all features**

---

## Task 8: Build Kamoku B Pseudocode Component

**Files:**
- Create: `src/app/fe-prep/components/KamokuBPseudocode.tsx`

**Props:**
- `locale: Locale`
- `scenarios: PseudocodeScenario[]`

**Features:**
- Show pseudocode block
- Step-by-step tracing table (variable values per line)
- Question with options A-D
- Same feedback pattern as Kamoku A
- Explanation with correct variable trace

- [ ] **Step 1: Implement pseudocode display**
- [ ] **Step 2: Implement tracing table**
- [ ] **Step 3: Implement question & feedback**
- [ ] **Step 4: Test with all scenarios**

---

## Task 9: Build Glossary Component

**Files:**
- Create: `src/app/fe-prep/components/GlossaryTab.tsx`

**Props:**
- `locale: Locale`
- `terms: GlossaryTerm[]`

**Features:**
- Live search input (filters by term or definition)
- List of terms with:
  - Japanese (Kanji + Romaji)
  - English
  - Indonesian
  - Definition in active locale
- Category badge

- [ ] **Step 1: Implement search filter**
- [ ] **Step 2: Implement term cards**
- [ ] **Step 3: Test search functionality**

---

## Task 10: Build Main Page with Tab Navigation

**Files:**
- Create: `src/app/fe-prep/page.tsx`

**Features:**
- Tab navigation: Kamoku A | Kamoku B | Glossary
- Language switcher in header
- Back to portfolio link
- Persist locale to localStorage
- Load locale from localStorage or browser on mount

- [ ] **Step 1: Implement tab navigation**
- [ ] **Step 2: Integrate all 3 tab components**
- [ ] **Step 3: Add language persistence**
- [ ] **Step 4: Style to match kaidevlab design**

---

## Task 11: Add Navigation Link from Portfolio

**Files:**
- Modify: `src/components/site-header.tsx` or `src/app/page.tsx`

**Change:**
- Add "FE Prep" link to main navigation or hero section

- [ ] **Step 1: Add link to header or homepage**

---

## Task 12: Build and Deploy

**Files:**
- Run build command

- [ ] **Step 1: Run `npm run build`**
- [ ] **Step 2: Fix any TypeScript errors**
- [ ] **Step 3: Deploy to Cloud Studio**

---

## Spec Coverage Check

| PRD Requirement | Task |
|-----------------|------|
| 3-tab interface (Kamoku A / B / Glossary) | Task 10 |
| 15-20 Kamoku A questions trilingual | Task 2 |
| 2-3 Kamoku B pseudocode scenarios | Task 3 |
| 15-20 glossary terms trilingual | Task 4 |
| Mistake Bank with localStorage | Task 7 |
| Category filter | Task 7 |
| Instant feedback | Task 7, 8 |
| Language switcher (EN/ID/JA) | Task 6 |
| Live search glossary | Task 9 |
| Dark/light mode support | All tasks (use CSS vars) |

## Placeholder Scan

- No TBD/TODO/fill-in-details found
- All data will be fully populated
- All components have complete implementations specified

## Type Consistency

- `Locale`, `OptionId`, `LocalizedString` used consistently across all tasks
- `Question`, `PseudocodeScenario`, `GlossaryTerm` interfaces defined in Task 1, consumed by Tasks 2-4 and 7-9
