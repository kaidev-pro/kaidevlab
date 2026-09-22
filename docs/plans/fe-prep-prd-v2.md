# FE Exam Prep Platform — Product Requirements Document v2.0

## 1. Overview

### 1.1 Product Name
**FE Prep** — Integrated study platform for the Japanese IT Passport (ITパスポート) and Fundamental Information Technology Engineer Examination (基本情報技術者試験 / FE).

### 1.2 Vision
A focused, no-distraction exam preparation tool that helps Indonesian developers and tech professionals systematically master the FE exam through intelligent drilling, algorithm tracing practice, and trilingual terminology reinforcement.

### 1.3 Target User
- Indonesian software developers preparing for Japanese IT certification
- Tech professionals relocating to Japan
- Self-taught programmers seeking structured certification prep
- Language: Interface in **English** and **Indonesian** (content trilingual: EN/ID/JA)

### 1.4 Integration
This module lives inside **Kaidevlab** (kai's portfolio site) at `/fe-prep/`. It shares the site's design system (colors, typography, dark/light mode) but operates as a self-contained study environment.

---

## 2. Design System

### 2.1 Color Palette (from Kaidevlab)
```
Light Mode:
  --background: #f4f9ff
  --surface: #ffffff
  --surface-soft: #e7f1fb
  --text-primary: #07162f
  --text-secondary: #526987
  --brand-primary: #2563eb
  --brand-hover: #1d55d4
  --brand-glow: #4da8ff
  --success: #1d9e72
  --warning: #b77818
  --error: #dc2626

Dark Mode:
  --background: #061126
  --surface: #0b1b38
  --surface-soft: #102a52
  --text-primary: #f2f7ff
  --text-secondary: #a9bdd7
  --brand-primary: #4da8ff
  --brand-hover: #6eaee8
  --success: #22c55e
  --warning: #f59e0b
  --error: #ef4444
```

### 2.2 Typography
- **Display/Headings**: Georgia, "Times New Roman", serif (matches Kaidevlab)
- **Body**: Inter, system-ui, sans-serif
- **Code/Monospace**: "JetBrains Mono", "Fira Code", monospace
- **Japanese**: "Noto Sans JP", sans-serif (for kanji terms)

### 2.3 Spacing & Layout
- Max content width: 900px (focused reading)
- Card border-radius: 16px
- Section padding: 48px 24px
- Card padding: 24px
- Gap between cards: 16px

### 2.4 Component Patterns
- **Cards**: `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: 16px`, `box-shadow: var(--shadow)`
- **Buttons Primary**: `background: var(--brand-primary)`, `color: white`, `border-radius: 12px`, `padding: 12px 24px`
- **Buttons Secondary**: `background: var(--surface-soft)`, `color: var(--text-primary)`, `border: 1px solid var(--border)`
- **Inputs**: `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: 10px`
- **Tags/Badges**: `background: var(--surface-soft)`, `color: var(--brand-primary)`, `border-radius: 20px`, `padding: 4px 12px`, `font-size: 12px`

---

## 3. Information Architecture

### 3.1 URL Structure
```
/fe-prep/                    → Main hub (redirects to dashboard)
/fe-prep/dashboard/          → User progress & quick actions
/fe-prep/drill/              → Kamoku A: Multiple choice drill
/fe-prep/drill/[category]/   → Filtered drill by category
/fe-prep/pseudocode/         → Kamoku B: Algorithm tracing
/fe-prep/glossary/           → Trilingual terminology bank
/fe-prep/exam/               → Full exam simulation (locked until 60+ questions)
/fe-prep/exam/results/       → Exam results & review
```

### 3.2 Navigation Structure
```
FE Prep Hub
├── Dashboard (overview, stats, continue where you left off)
├── Kamoku A — Drill
│   ├── All Questions
│   ├── By Category (Architecture, Network, Security, Database, OS, Algorithms, Software Engineering)
│   └── Mistake Bank (previously wrong answers)
├── Kamoku B — Pseudocode
│   ├── All Scenarios
│   └── By Algorithm Type (Search, Sort, Recursive, Stack/Queue)
├── Glossary
│   ├── All Terms
│   └── By Category
└── Exam Simulation (locked/badge: "Complete 60 questions to unlock")
```

---

## 4. Page Specifications

### 4.1 Dashboard (`/fe-prep/dashboard/`)

**Purpose**: User landing page showing progress overview and quick actions.

**Layout**:
```
[Header: "FE Prep" + Language Toggle (EN/ID)]

[Stats Row — 4 cards]
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Questions  │ │   Accuracy  │ │   Streak    │ │  Time Spent │
│    47/60    │ │    72%      │ │   5 days    │ │   4h 20m    │
│   drilled   │ │             │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘

[Continue Learning Card]
┌─────────────────────────────────────────┐
│  Continue where you left off            │
│  Category: Network — OSI Layer          │
│  Progress: 12/20 questions              │
│  [Resume Drill]                         │
└─────────────────────────────────────────┘

[Quick Actions Grid]
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Kamoku A   │ │  Kamoku B   │ │  Glossary   │
│   Drill     │ │  Pseudocode │ │   Bank      │
│  60 soal    │ │  10 soal    │ │  50 istilah │
│  [Start]    │ │  [Start]    │ │  [Browse]   │
└─────────────┘ └─────────────┘ └─────────────┘

[Category Progress]
┌─────────────────────────────────────────┐
│  Your Progress by Category              │
│  ████████░░ Architecture     8/10       │
│  ██████░░░░ Network          6/10       │
│  █████░░░░░ Security         5/10       │
│  ...                                    │
└─────────────────────────────────────────┘

[Mistake Bank Preview]
┌─────────────────────────────────────────┐
│  Mistake Bank (12 questions)            │
│  Review questions you've answered wrong │
│  [Review Mistakes]                      │
└─────────────────────────────────────────┘
```

**Interactions**:
- Stats animate counting up on page load
- Progress bars animate width on scroll into view
- "Continue" card shows last active category with progress
- Clicking category in progress bar navigates to filtered drill

---

### 4.2 Kamoku A — Drill Mode (`/fe-prep/drill/`)

**Purpose**: Multiple choice question practice with instant feedback.

**Layout**:
```
[Header with back button + "Kamoku A: Drill Mode"]

[Filter Bar]
Category: [All ▼]  Difficulty: [All ▼]  Status: [All ▼]  [🔍 Search]

[Question Card — Active]
┌─────────────────────────────────────────┐
│  #23  [Network] [Medium]               │
│                                         │
│  Which OSI layer is responsible for     │
│  routing packets between networks?      │
│                                         │
│  ○ A. Transport Layer                   │
│  ○ B. Network Layer                     │
│  ○ C. Data Link Layer                   │
│  ○ D. Session Layer                     │
│                                         │
│  [Submit Answer]                        │
└─────────────────────────────────────────┘

[After Submit — Correct]
┌─────────────────────────────────────────┐
│  ✅ Correct!                            │
│                                         │
│  The Network Layer (Layer 3) handles    │
│  logical addressing and routing...      │
│                                         │
│  [Next Question]  [Add to Mistake Bank] │
└─────────────────────────────────────────┘

[After Submit — Wrong]
┌─────────────────────────────────────────┐
│  ❌ Incorrect                           │
│  Correct answer: B. Network Layer       │
│                                         │
│  Explanation:                           │
│  The Network Layer (Layer 3) is...      │
│                                         │
│  [Next Question]  [Review in Mistake Bank]
└─────────────────────────────────────────┘

[Bottom Navigation]
◀ Prev  [1] [2] [3] ... [60]  Next ▶
```

**Question Card States**:
1. **Unanswered**: All options neutral, submit disabled until selection
2. **Submitted Correct**: Selected option green, explanation shown, "Next" enabled
3. **Submitted Wrong**: Selected option red, correct option green, explanation shown
4. **Bookmarked**: Star icon filled, question saved for later

**Data Structure**:
```typescript
interface DrillQuestion {
  id: string;
  category: "architecture" | "network" | "security" | "database" | "os" | "algorithms" | "software-engineering";
  difficulty: "easy" | "medium" | "hard";
  question: { en: string; id: string; ja: string };
  options: Array<{ id: "A" | "B" | "C" | "D"; text: { en: string; id: string; ja: string } }>;
  correctOptionId: "A" | "B" | "C" | "D";
  explanation: { en: string; id: string; ja: string };
  reference?: string; // Source material reference
}
```

---

### 4.3 Kamoku B — Pseudocode Tracing (`/fe-prep/pseudocode/`)

**Purpose**: Practice tracing algorithm execution step-by-step.

**Layout**:
```
[Header: "Kamoku B: Algorithm Tracing"]

[Algorithm Selector]
[Search ▼] [Sort ▼] [Recursive ▼] [Stack/Queue ▼]

[Problem Card]
┌─────────────────────────────────────────┐
│  #P03  [Sort] [Bubble Sort]            │
│                                         │
│  Trace the following bubble sort        │
│  algorithm with input [5, 2, 8, 1, 9]:  │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 1. FOR i = 0 TO n-1             │    │
│  │ 2.   FOR j = 0 TO n-i-2         │    │
│  │ 3.     IF A[j] > A[j+1]         │    │
│  │ 4.       SWAP A[j], A[j+1]      │    │
│  │ 5.     END IF                   │    │
│  │ 6.   END FOR                    │    │
│  │ 7. END FOR                      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  What is the value of A after           │
│  the first outer loop iteration?        │
│                                         │
│  ○ A. [2, 5, 1, 8, 9]                 │
│  ○ B. [2, 5, 8, 1, 9]                 │
│  ○ C. [1, 2, 5, 8, 9]                 │
│  ○ D. [5, 2, 1, 8, 9]                 │
│                                         │
│  [Submit]  [Show Tracing Table]         │
└─────────────────────────────────────────┘

[Tracing Table — Expanded]
┌─────────────────────────────────────────┐
│  Step-by-Step Tracing Table             │
│  ┌──────┬─────────────┬───────────────┐ │
│  │ Step │ Variables   │ Array State   │ │
│  ├──────┼─────────────┼───────────────┤ │
│  │ Init │ i=0, j=0    │ [5,2,8,1,9]   │ │
│  │ 1    │ i=0, j=0    │ [2,5,8,1,9]   │ │
│  │ 2    │ i=0, j=1    │ [2,5,8,1,9]   │ │
│  │ 3    │ i=0, j=2    │ [2,5,1,8,9]   │ │
│  │ 4    │ i=0, j=3    │ [2,5,1,8,9]   │ │
│  └──────┴─────────────┴───────────────┘ │
└─────────────────────────────────────────┘
```

**Data Structure**:
```typescript
interface PseudocodeScenario {
  id: string;
  algorithmType: "search" | "sort" | "recursive" | "stack-queue";
  algorithmName: string;
  problem: { en: string; id: string; ja: string };
  code: string; // Pseudocode with line numbers
  tracingTable: Array<{
    step: number;
    lineNumber: number;
    variables: Record<string, string | number>;
    description: { en: string; id: string; ja: string };
  }>;
  question: { en: string; id: string; ja: string };
  options: Array<{ id: "A" | "B" | "C" | "D"; text: { en: string; id: string; ja: string } }>;
  correctOptionId: "A" | "B" | "C" | "D";
  explanation: { en: string; id: string; ja: string };
}
```

---

### 4.4 Glossary (`/fe-prep/glossary/`)

**Purpose**: Trilingual terminology reference with search and categorization.

**Layout**:
```
[Header: "Glossary" + Search Bar]

[Category Filter Chips]
[All] [Architecture] [Network] [Security] [Database] [OS] [Algorithms] [General]

[Term Card]
┌─────────────────────────────────────────┐
│  仮想記憶 (きそうきおく)               │
│  Virtual Memory / Memori Virtual        │
│                                         │
│  A memory management technique that     │
│  provides an "idealized abstraction of  │
│  the storage resources..."              │
│                                         │
│  [OS] [Memory Management]               │
│                                         │
│  Related: Paging, Segmentation, TLB     │
└─────────────────────────────────────────┘

[Term Card — Compact View]
┌─────────────────────────────────────────┐
│  デッドロック (deddorokku)              │
│  Deadlock / Keadaan Buntu               │
│  [OS] [Concurrency]                     │
└─────────────────────────────────────────┘

[View Toggle]: [Card View ▼] [Table View ▼]

[Table View]
┌──────────────┬─────────────────┬─────────────────┬──────────┐
│ Japanese     │ Reading         │ English         │ Category │
├──────────────┼─────────────────┼─────────────────┼──────────┤
│ 仮想記憶     │ きそうきおく    │ Virtual Memory  │ OS       │
│ デッドロック │ でっどろっく    │ Deadlock        │ OS       │
│ ...          │ ...             │ ...             │ ...      │
└──────────────┴─────────────────┴─────────────────┴──────────┘
```

**Data Structure**:
```typescript
interface GlossaryTerm {
  id: string;
  term: { ja: string; en: string; id: string };
  reading: string; // Romaji or kana reading
  definition: { en: string; id: string; ja: string };
  category: "architecture" | "network" | "security" | "database" | "os" | "algorithms" | "general";
  relatedTerms?: string[]; // IDs of related terms
}
```

---

### 4.5 Exam Simulation (`/fe-prep/exam/`)

**Purpose**: Full 90-minute timed exam simulation (unlocked after 60+ questions drilled).

**Layout**:
```
[Header: "Exam Simulation"]

[Lock Screen — Before Unlock]
┌─────────────────────────────────────────┐
│  🔒 Exam Simulation Locked              │
│                                         │
│  Complete at least 60 drill questions   │
│  to unlock the exam simulation.         │
│                                         │
│  Progress: 47/60 questions              │
│  ████████████████░░░░░░░░░░ 78%         │
│                                         │
│  [Return to Drill]                      │
└─────────────────────────────────────────┘

[Active Exam]
┌─────────────────────────────────────────┐
│  ⏱ 72:34 remaining    Question 23/60    │
│  [=======░░░░░░░░░░░░░░░░░░]            │
│                                         │
│  [Question Card — same as drill]        │
│                                         │
│  [Previous]  [Flag for Review]  [Next]  │
└─────────────────────────────────────────┘

[Question Navigator — Bottom Sheet]
┌─────────────────────────────────────────┐
│  Question Navigator                     │
│  1  2  3  4  5  6  7  8  9  10         │
│  ●  ●  ○  ○  ●  ○  ○  ○  ○  ○          │
│  (● = answered, ○ = unanswered,         │
│   ⚑ = flagged)                          │
└─────────────────────────────────────────┘

[Results Page]
┌─────────────────────────────────────────┐
│  Exam Complete!                         │
│  Score: 52/60 (87%) — PASSED ✅         │
│                                         │
│  [Score Breakdown Chart]                │
│  Architecture:  8/10  ████████░░        │
│  Network:       9/10  █████████░        │
│  Security:      7/10  ███████░░░        │
│  ...                                    │
│                                         │
│  Time Used: 78:22 / 90:00               │
│                                         │
│  [Review Wrong Answers]  [Retake Exam]  │
└─────────────────────────────────────────┘
```

**Exam Rules**:
- 60 questions, 90 minutes
- Questions randomly selected from drill bank
- No instant feedback (answers shown after completion)
- Can flag questions for review
- Navigator shows answered/unanswered/flagged status
- Results show category breakdown and time analysis

---

## 5. Data Requirements

### 5.1 Question Bank (Kamoku A)
**Target**: 60+ questions minimum for exam unlock

**Distribution**:
| Category | Count | Topics |
|----------|-------|--------|
| Computer Architecture | 10 | Binary, Two's complement, CPU pipeline, Cache, RAID |
| Network | 10 | OSI 7 layers, TCP/UDP, DNS, HTTP, Subnetting |
| Security | 10 | Cryptography, Phishing, Ransomware, Firewall, SSL/TLS |
| Database | 10 | SQL, Normalization, Transaction, Indexing |
| OS | 10 | Process scheduling, Memory management, Paging, Deadlock |
| Algorithms | 5 | Complexity, Sorting, Searching, Data structures |
| Software Engineering | 5 | SDLC, Testing, Design patterns, UML |

**Question Format**:
- 4 options (A/B/C/D)
- Trilingual: English (primary), Indonesian, Japanese
- Difficulty: Easy (30%), Medium (50%), Hard (20%)
- Each question has explanation in all 3 languages

### 5.2 Pseudocode Bank (Kamoku B)
**Target**: 10+ scenarios

**Distribution**:
| Algorithm Type | Count | Examples |
|----------------|-------|----------|
| Search | 3 | Linear search, Binary search, Hash search |
| Sort | 3 | Bubble sort, Selection sort, Insertion sort |
| Recursive | 2 | Factorial, Fibonacci, Tower of Hanoi |
| Stack/Queue | 2 | Stack operations, Queue operations, Priority queue |

### 5.3 Glossary
**Target**: 50+ terms

**Distribution**:
| Category | Count |
|----------|-------|
| Architecture | 8 |
| Network | 8 |
| Security | 8 |
| Database | 8 |
| OS | 8 |
| Algorithms | 5 |
| General | 5 |

---

## 6. State Management & Logic

### 6.1 Local Storage Schema
```typescript
interface UserProgress {
  version: number;
  questionsAnswered: Array<{
    questionId: string;
    selectedOption: "A" | "B" | "C" | "D";
    isCorrect: boolean;
    timestamp: number;
    attempts: number;
  }>;
  pseudocodeAnswered: Array<{
    scenarioId: string;
    selectedOption: "A" | "B" | "C" | "D";
    isCorrect: boolean;
    timestamp: number;
  }>;
  examHistory: Array<{
    examId: string;
    date: number;
    score: number;
    totalQuestions: number;
    timeUsed: number;
    categoryBreakdown: Record<string, { correct: number; total: number }>;
  }>;
  settings: {
    language: "en" | "id";
    theme: "light" | "dark" | "system";
    showJapanese: boolean; // Show Japanese terms in content
  };
  bookmarks: string[]; // Question IDs
}
```

### 6.2 Progress Tracking
- **Questions Drilled**: Total unique questions answered
- **Accuracy**: Correct answers / Total attempts
- **Streak**: Consecutive days with activity
- **Category Mastery**: Percentage correct per category
- **Mistake Bank**: Questions answered wrong (auto-added, manually removable)

### 6.3 Exam Unlock Logic
```
IF questionsDrilled >= 60:
  examUnlocked = true
ELSE:
  examUnlocked = false
  showProgressBar(questionsDrilled / 60)
```

---

## 7. Component Inventory

### 7.1 Shared Components
| Component | Props | Description |
|-----------|-------|-------------|
| `LanguageToggle` | `value: "en" \| "id"`, `onChange` | EN/ID toggle switch |
| `CategoryBadge` | `category: string` | Colored category label |
| `DifficultyBadge` | `difficulty: "easy" \| "medium" \| "hard"` | Difficulty indicator |
| `ProgressBar` | `value: number`, `max: number`, `label?: string` | Animated progress bar |
| `QuestionCard` | `question: DrillQuestion`, `mode: "drill" \| "exam"`, `onAnswer`, `showResult` | Main question display |
| `OptionButton` | `label: string`, `selected: boolean`, `correct?: boolean`, `wrong?: boolean`, `onClick` | Answer option |
| `TracingTable` | `steps: TracingStep[]` | Step-by-step variable table |
| `GlossaryCard` | `term: GlossaryTerm`, `compact?: boolean` | Term display card |
| `GlossaryTable` | `terms: GlossaryTerm[]` | Table view of terms |
| `SearchInput` | `value: string`, `onChange`, `placeholder` | Search with icon |
| `StatCard` | `label: string`, `value: string \| number`, `icon`, `trend?: number` | Dashboard stat |
| `ExamTimer` | `duration: number`, `onExpire` | Countdown timer |
| `QuestionNavigator` | `total: number`, `current: number`, `answered: number[]`, `flagged: number[]`, `onNavigate` | Exam question grid |

### 7.2 Page Components
| Page | Main Components |
|------|----------------|
| Dashboard | `StatCard` ×4, `ProgressBar`, `QuickActionCard` ×3, `MistakeBankPreview` |
| Drill | `FilterBar`, `QuestionCard`, `OptionButton` ×4, `Pagination` |
| Pseudocode | `AlgorithmSelector`, `QuestionCard`, `TracingTable` |
| Glossary | `SearchInput`, `CategoryChips`, `GlossaryCard` / `GlossaryTable`, `ViewToggle` |
| Exam | `ExamTimer`, `QuestionCard`, `QuestionNavigator`, `FlagButton` |
| Results | `ScoreDisplay`, `ProgressBar` ×categories, `TimeDisplay`, `ActionButtons` |

---

## 8. Animation & Interaction

### 8.1 Micro-interactions
- **Option Selection**: Scale 1.02 on hover, border color transition 200ms
- **Submit**: Button ripple effect, loading spinner
- **Correct/Wrong**: Shake animation on wrong, bounce on correct
- **Progress Bar**: Width transition 600ms ease-out
- **Card Appear**: Fade up 20px, 400ms stagger 50ms per card
- **Page Transition**: Fade 200ms between routes

### 8.2 Scroll Behaviors
- Dashboard stats: Count up animation on viewport entry
- Progress bars: Animate width on scroll into view
- Question cards: Fade in on navigation

### 8.3 Loading States
- Skeleton cards for question loading
- Pulsing placeholders for stats
- Spinner for submit actions

---

## 9. Responsive Behavior

### 9.1 Breakpoints
- **Desktop**: > 1024px — Full layout, sidebar navigation
- **Tablet**: 768px - 1024px — 2-column grids, condensed cards
- **Mobile**: < 768px — Single column, bottom sheet for navigator

### 9.2 Mobile Adaptations
- Question cards: Full width, larger touch targets (min 48px)
- Tracing table: Horizontal scroll with sticky first column
- Exam navigator: Bottom sheet modal
- Filter bar: Horizontal scroll chips
- Glossary: Card view default (table too cramped)

---

## 10. Accessibility

### 10.1 Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation for all interactions
- Focus visible indicators
- Screen reader announcements for results
- Reduced motion support (`prefers-reduced-motion`)

### 10.2 ARIA
- `role="radiogroup"` for options
- `aria-pressed` for selected option
- `aria-live="polite"` for feedback messages
- `aria-label` for icon buttons

---

## 11. Performance

### 11.1 Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

### 11.2 Optimizations
- Lazy load question data (chunk by category)
- Virtual scroll for glossary list (> 50 items)
- Debounce search input (300ms)
- Memoize filtered question lists
- Preload next question in drill mode

---

## 12. Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Type definitions
- [ ] Data structure (questions, pseudocode, glossary)
- [ ] Local storage utilities
- [ ] Base components (LanguageToggle, CategoryBadge, ProgressBar)
- [ ] Layout wrapper for /fe-prep/

### Phase 2: Core Features (Week 2)
- [ ] Dashboard page
- [ ] Kamoku A drill mode (20 questions)
- [ ] Question card with instant feedback
- [ ] Category filter & search
- [ ] Mistake bank

### Phase 3: Advanced Features (Week 3)
- [ ] Kamoku B pseudocode (5 scenarios)
- [ ] Tracing table component
- [ ] Glossary page (20 terms)
- [ ] Search & category filter
- [ ] Card/Table view toggle

### Phase 4: Polish (Week 4)
- [ ] Add 40+ more questions (total 60+)
- [ ] Add 5+ more pseudocode scenarios
- [ ] Add 30+ more glossary terms
- [ ] Exam simulation (locked until 60 questions)
- [ ] Results page
- [ ] Animations & micro-interactions
- [ ] Responsive design
- [ ] Accessibility audit

### Phase 5: Launch
- [ ] Performance optimization
- [ ] Build & deploy
- [ ] Link from portfolio header

---

## 13. Open Questions

1. **Question Data Source**: Should we create original questions or adapt from publicly available FE exam prep materials?
2. **User Accounts**: Is local storage sufficient, or should we add authentication for cross-device sync?
3. **Analytics**: Should we track anonymous usage patterns to improve question difficulty?
4. **Community Features**: Should users be able to contribute questions or report errors?
5. **Mobile App**: Is a PWA or native app in the future roadmap?

---

## 14. Appendix

### 14.1 File Structure
```
src/app/fe-prep/
├── layout.tsx              # FE Prep layout wrapper
├── page.tsx                # Redirect to dashboard
├── dashboard/
│   └── page.tsx
├── drill/
│   ├── page.tsx
│   └── [category]/
│       └── page.tsx
├── pseudocode/
│   └── page.tsx
├── glossary/
│   └── page.tsx
├── exam/
│   ├── page.tsx
│   └── results/
│       └── page.tsx
├── components/
│   ├── LanguageToggle.tsx
│   ├── CategoryBadge.tsx
│   ├── DifficultyBadge.tsx
│   ├── ProgressBar.tsx
│   ├── QuestionCard.tsx
│   ├── OptionButton.tsx
│   ├── TracingTable.tsx
│   ├── GlossaryCard.tsx
│   ├── GlossaryTable.tsx
│   ├── SearchInput.tsx
│   ├── StatCard.tsx
│   ├── ExamTimer.tsx
│   ├── QuestionNavigator.tsx
│   ├── FilterBar.tsx
│   └── QuickActionCard.tsx
├── hooks/
│   ├── useProgress.ts
│   ├── useLocalStorage.ts
│   └── useExamTimer.ts
├── lib/
│   ├── questions.ts        # 60+ questions
│   ├── pseudocode.ts       # 10+ scenarios
│   ├── glossary.ts         # 50+ terms
│   └── utils.ts
└── types/
    └── index.ts
```

### 14.2 Dependencies
- `lucide-react` (icons — already in project)
- `framer-motion` (animations)
- `recharts` (charts for results)
- `fuse.js` (fuzzy search for glossary)

---

*Document Version: 2.0*
*Last Updated: 2026-09-22*
*Author: AI Assistant + Kai*
