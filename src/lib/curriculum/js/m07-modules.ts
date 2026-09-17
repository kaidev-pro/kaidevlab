import type { Module } from "../types";

export const m07Modules: Module = {
  id: "js-07-modules",
  track: "javascript",
  order: 7,
  title: "ES Modules",
  subtitle: "Organizing code into reusable pieces",
  difficulty: "intermediate",
  estimatedTime: "35 min",
  prerequisites: ["js-06-async"],
  learningObjectives: [
    "Understand the ES module system (import/export)",
    "Use default exports and named exports correctly",
    "Import modules with different syntaxes",
    "Understand tree-shaking and dynamic imports",
  ],
  realWorldAnalogy:
    "Modules are like Lego bricks. Each brick (module) is a self-contained piece with a specific shape (exported values). You can snap bricks together (import) to build complex structures (applications). Each brick can be used in multiple structures without modification.",
  whyThisMatters:
    "Every modern JavaScript project uses modules. Next.js, React, Node.js — all use ES modules. Understanding import/export is essential for organizing code, working with npm packages, and understanding build tools like webpack and Vite. Bundlers use tree-shaking to remove unused exports, so how you export matters for bundle size.",
  lessons: [
    {
      id: "js-07-l1",
      order: 1,
      title: "Import & Export Basics",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-07-l1-s1",
          title: "What are ES Modules?",
          type: "concept",
          content:
            "ES Modules (ECMAScript Modules) are the official, standard module system in JavaScript. A module is simply a JavaScript file. Each module has its own scope — variables and functions declared in one module are NOT accessible in another unless explicitly exported and imported. This prevents global scope pollution and naming collisions.",
        },
        {
          id: "js-07-l1-s2",
          title: "Named Exports",
          type: "code",
          content: "Export multiple values by name. Import them by the same name.",
          codeExample: {
            code: `// math.js — export by name
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;

// main.js — import by name
import { add, subtract, PI } from "./math.js";

console.log(add(2, 3));       // 5
console.log(subtract(5, 2));  // 3
console.log(PI);              // 3.14159

// Import with aliases
import { add as plus } from "./math.js";
console.log(plus(2, 3)); // 5

// Import everything as a namespace
import * as Math from "./math.js";
console.log(Math.add(2, 3)); // 5
console.log(Math.PI);       // 3.14159`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-07-l1-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Each file is a module with its own scope. Named exports: export keyword before declarations. Named imports: { name } in import statement. Use aliases with 'as'. Use * to import everything as a namespace.",
        },
      ],
      keyTakeaway: "Module = file with own scope. Named exports: export function foo(). Named imports: import { foo } from './file.js'.",
    },
    {
      id: "js-07-l2",
      order: 2,
      title: "Default Exports",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-07-l2-s1",
          title: "What is a Default Export?",
          type: "concept",
          content:
            "A default export is the 'main thing' a module exports. Each module can have only ONE default export. When importing a default export, you can give it any name you want — no curly braces needed. Default exports are commonly used for React components, main classes, and primary functions.",
        },
        {
          id: "js-07-l2-s2",
          title: "Using Default Exports",
          type: "code",
          content: "Default export syntax and the corresponding import.",
          codeExample: {
            code: `// Button.js — default export
export default function Button({ label }) {
  return <button>{label}</button>;
}

// or: export default class Button { ... }
// or: function Button() { ... }
//     export default Button;

// App.js — import without curly braces, any name
import MyButton from "./Button.js";
import Btn from "./Button.js"; // also valid!
import TheButton from "./Button.js"; // also valid!

// Mixed: default + named
// utils.js
export default function mainFunction() { ... }
export const helper1 = () => { ... };
export const helper2 = () => { ... };

// Import both
import mainFunction, { helper1, helper2 } from "./utils.js";`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-07-l2-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Default export = one per module. Import without curly braces, any name. Can mix with named exports: import default, { named1, named2 } from './file.js'. Common for React components.",
        },
      ],
      keyTakeaway: "Default export = one per module. Import: import MyComponent from './file' (no braces, any name).",
    },
    {
      id: "js-07-l3",
      order: 3,
      title: "Re-exporting & Import Patterns",
      estimatedTime: "6 min",
      sections: [
        {
          id: "js-07-l3-s1",
          title: "Re-exporting",
          type: "code",
          content: "Create an index.js that re-exports from multiple files for cleaner imports.",
          codeExample: {
            code: `// Instead of importing from many files:
import { add } from "./math/add.js";
import { subtract } from "./math/subtract.js";
import { multiply } from "./math/multiply.js";

// Create an index.js that re-exports:
// math/index.js
export { add } from "./add.js";
export { subtract } from "./subtract.js";
export { multiply } from "./multiply.js";
export { default as default } from "./divide.js"; // re-export default

// Now import from the directory:
import { add, subtract, multiply } from "./math/";`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-07-l3-s2",
          title: "Side-Effect Imports",
          type: "concept",
          content:
            "Sometimes you import a module not for its exports, but for its side effects — like CSS files, polyfills, or configuration that runs on import. This is common in React/Next.js: import './globals.css' or import 'nprogress'.",
        },
        {
          id: "js-07-l3-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Re-exporting creates a clean API from an index.js file. Side-effect imports run the module without importing anything. Both are common patterns in real codebases.",
        },
      ],
      keyTakeaway: "Re-export from index.js for cleaner imports. Side-effect imports: import './style.css' (no named exports needed).",
    },
    {
      id: "js-07-l4",
      order: 4,
      title: "Tree-Shaking & Dynamic Imports",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-07-l4-s1",
          title: "Tree-Shaking",
          type: "concept",
          content:
            "Tree-shaking is a process where the bundler (webpack, Vite, esbuild) analyzes your imports and removes unused exports from the final bundle. This reduces file size. Named exports are tree-shakeable — if you do not import a function, it is removed. Default exports are harder to tree-shake because the entire module is often included.",
        },
        {
          id: "js-07-l4-s2",
          title: "Dynamic Imports",
          type: "code",
          content: "Load modules on demand with import().",
          codeExample: {
            code: `// Static import — always loaded
import { heavyFunction } from "./heavy-module.js";

// Dynamic import — loaded on demand
const button = document.querySelector("#loadButton");
button.addEventListener("click", async () => {
  // Module is loaded ONLY when the button is clicked
  const module = await import("./heavy-module.js");
  module.heavyFunction();
});

// Dynamic import returns a promise
import("./utils.js")
  .then(module => {
    module.doSomething();
  })
  .catch(err => console.error(err));

// Next.js uses dynamic imports for code-splitting
// const HeavyComponent = dynamic(() => import("./HeavyComponent"));`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-07-l4-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Tree-shaking removes unused exports from the bundle. Use named exports for better tree-shaking. Dynamic import() loads modules on demand — great for code-splitting and lazy loading.",
        },
      ],
      keyTakeaway: "Tree-shaking: bundler removes unused exports (prefer named exports). Dynamic import() = lazy load on demand. Good for performance.",
    },
  ],
  commonMistakes: [
    {
      title: "Mixing default and named import syntax",
      wrong: "import { myDefault } from './file.js'; // tries named import",
      right: "import myDefault from './file.js'; // correct for default export",
      explanation: "Default exports are imported without curly braces. Named exports use curly braces. If the module uses export default, you import it as import Name from './file.js' — no braces.",
    },
    {
      title: "Forgetting file extension in some environments",
      wrong: "import { foo } from './utils';",
      right: "import { foo } from './utils.js'; // or configure your bundler to resolve extensions",
      explanation: "In browser-native ES modules, you must include the .js extension. Bundlers like webpack and Vite resolve it automatically. In Next.js, you usually omit it because the bundler handles it.",
    },
  ],
  interviewQuestions: [
    {
      question: "What is the difference between default exports and named exports?",
      answer:
        "A module can have one default export and unlimited named exports. Default exports are imported without curly braces and can be given any name: import MyComponent from './file'. Named exports are imported with curly braces and must use the exact name: import { add, subtract } from './file'. Default exports are common for React components; named exports are better for utility functions and tree-shaking.",
    },
    {
      question: "What is tree-shaking?",
      answer:
        "Tree-shaking is dead code elimination for ES modules. The bundler analyzes which exports are actually imported and removes unused ones from the final bundle. This reduces bundle size. Named exports are tree-shakeable because the bundler can see exactly which functions are used. Default exports are harder to tree-shake because the entire module is typically included.",
    },
  ],
  quiz: [
    {
      question: "How do you import a default export?",
      options: [
        "import { myFunc } from './file.js'",
        "import myFunc from './file.js'",
        "import * as myFunc from './file.js'",
        "import default myFunc from './file.js'",
      ],
      correctIndex: 1,
      explanation: "Default exports are imported without curly braces: import myFunc from './file.js'. You can use any name — it does not need to match the original.",
    },
    {
      question: "How many default exports can a module have?",
      options: ["One", "Unlimited", "Two", "None — it is not allowed"],
      correctIndex: 0,
      explanation: "Each module can have exactly one default export. But it can have unlimited named exports alongside the default.",
    },
    {
      question: "What does import * as Math from './math.js' do?",
      options: [
        "Imports the default export as Math",
        "Imports all exports as a namespace object",
        "Imports only the default export",
        "Creates a new module",
      ],
      correctIndex: 1,
      explanation: "import * as Math creates a namespace object containing ALL named exports. Access them as Math.add(), Math.PI, etc.",
    },
    {
      question: "What is the benefit of dynamic import()?",
      options: [
        "It is faster than static imports",
        "It loads modules on demand (code splitting)",
        "It bypasses the module system",
        "It allows circular imports",
      ],
      correctIndex: 1,
      explanation: "Dynamic import() returns a promise that loads the module on demand. This enables code splitting — the module is only loaded when needed, reducing the initial bundle size.",
    },
    {
      question: "What is tree-shaking?",
      options: [
        "Removing unused code from the bundle",
        "Reorganizing the file tree",
        "Shaking the DOM to find elements",
        "A type of event delegation",
      ],
      correctIndex: 0,
      explanation: "Tree-shaking is dead code elimination for ES modules. The bundler removes unused exports from the final bundle, reducing file size. Named exports tree-shake better than default exports.",
    },
  ],
  labNotePrompt:
    "Write 3 sentences in English about ES modules. What is the difference between default and named exports? Which do you prefer and why?",
  resources: [
    { label: "MDN: JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
    { label: "MDN: import", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import" },
    { label: "MDN: export", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export" },
    { label: "javascript.info: Modules", url: "https://javascript.info/modules" },
  ],
};
