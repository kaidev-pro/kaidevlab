import type { Module } from "../types";

export const m04Objects: Module = {
  id: "js-04-objects",
  track: "javascript",
  order: 4,
  title: "Objects & Destructuring",
  subtitle: "The data structure that powers JavaScript",
  difficulty: "beginner",
  estimatedTime: "45 min",
  prerequisites: ["js-03-array-methods"],
  learningObjectives: [
    "Create and manipulate objects with methods",
    "Use destructuring for cleaner code",
    "Use spread and rest operators with objects",
    "Use optional chaining (?.) and nullish coalescing (??)",
    "Iterate over object entries with Object.keys/values/entries",
  ],
  realWorldAnalogy:
    "An object is like a form you fill out. Each field on the form has a label (key) and a value. Destructuring is like making copies of specific fields onto sticky notes so you do not have to keep referring to the full form. Spread is like photocopying the entire form and then adding extra fields.",
  whyThisMatters:
    "Objects are the core data structure in JavaScript. API responses are objects. React props are objects. Configuration files are objects. Destructuring and spread are used in virtually every modern codebase. Mastering these patterns will make your code dramatically cleaner and more professional.",
  lessons: [
    {
      id: "js-04-l1",
      order: 1,
      title: "Object Methods & 'this'",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-04-l1-s1",
          title: "Methods on Objects",
          type: "concept",
          content:
            "A method is a function that is a property of an object. Inside a method, the 'this' keyword refers to the object (in regular functions, not arrow functions). Methods let you group related data and behavior together.",
        },
        {
          id: "js-04-l1-s2",
          title: "Defining Methods",
          type: "code",
          content: "ES6 shorthand method syntax is the preferred way.",
          codeExample: {
            code: `const user = {
  name: "Kai",
  age: 25,
  
  // Method shorthand (preferred)
  greet() {
    return "Hello, I'm " + this.name;
  },
  
  // Regular function — 'this' works
  birthday() {
    this.age++;
    return this.age;
  },
  
  // Arrow function — 'this' does NOT work!
  broken: () => {
    // 'this' here is NOT the object — it's the enclosing scope
    return this.name; // undefined or error
  },
};

console.log(user.greet()); // "Hello, I'm Kai"
console.log(user.birthday()); // 26`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-04-l1-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Use method shorthand syntax (greet() {}). 'this' inside a regular method refers to the object. Arrow functions as object methods do NOT bind 'this' to the object — avoid them for methods.",
        },
      ],
      keyTakeaway: "Object methods: use shorthand greet() {}. 'this' works in regular methods, NOT in arrow function methods.",
    },
    {
      id: "js-04-l2",
      order: 2,
      title: "Destructuring",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-04-l2-s1",
          title: "What is Destructuring?",
          type: "concept",
          content:
            "Destructuring is a syntax that lets you extract properties from objects (or elements from arrays) into variables in one line. It makes code shorter and more readable. You will see destructuring everywhere in React (props, state, hooks).",
        },
        {
          id: "js-04-l2-s2",
          title: "Object Destructuring",
          type: "code",
          content: "Extract properties by name.",
          codeExample: {
            code: `const user = {
  name: "Kai",
  age: 25,
  city: "Tokyo",
};

// Without destructuring
const name = user.name;
const age = user.age;

// With destructuring — much cleaner
const { name, age } = user;
console.log(name); // "Kai"
console.log(age);  // 25

// Rename variables during destructuring
const { name: userName, city: location } = user;
console.log(userName);  // "Kai"
console.log(location);  // "Tokyo"

// Default values
const { country = "Japan" } = user;
console.log(country); // "Japan" (user.country doesn't exist)

// Nested destructuring
const { address: { city } } = { address: { city: "Osaka" } };
console.log(city); // "Osaka"`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-04-l2-s3",
          title: "Array Destructuring",
          type: "code",
          content: "Extract elements by position (index).",
          codeExample: {
            code: `const [first, second] = [10, 20];
console.log(first);  // 10
console.log(second); // 20

// Skip elements
const [a, , c] = [1, 2, 3];
console.log(a); // 1
console.log(c); // 3

// Swap variables (no temp needed!)
let x = 5, y = 10;
[x, y] = [y, x];
console.log(x); // 10
console.log(y); // 5

// Rest in destructuring
const [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest);  // [2, 3, 4]`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-04-l2-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Destructuring extracts values in one line. Objects: { name, age } = obj. Arrays: [a, b] = arr. You can rename, set defaults, skip, and use rest. This is used everywhere in React.",
        },
      ],
      keyTakeaway: "Destructuring: { name } = obj extracts by key. [a, b] = arr extracts by position. Can rename, default, skip, rest.",
    },
    {
      id: "js-04-l3",
      order: 3,
      title: "Spread & Rest Operators",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-04-l3-s1",
          title: "The ... Operator",
          type: "concept",
          content:
            "The three dots (...) operator has two meanings depending on context: Spread (expands an iterable into individual elements) and Rest (collects multiple elements into one). Same syntax, opposite purposes.",
        },
        {
          id: "js-04-l3-s2",
          title: "Spread — Expand",
          type: "code",
          content: "Spread copies or merges arrays and objects.",
          codeExample: {
            code: `// Spread arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

// Copy an array (shallow)
const copy = [...arr1];
copy.push(99);
console.log(arr1); // [1, 2, 3] — original unchanged

// Merge arrays
const merged = [...arr1, ...arr2];

// Spread objects
const defaults = { theme: "light", lang: "en" };
const userPrefs = { lang: "ja", fontSize: 14 };
const config = { ...defaults, ...userPrefs };
console.log(config);
// { theme: "light", lang: "ja", fontSize: 14 }
// 'lang' from userPrefs overrides defaults`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-04-l3-s3",
          title: "Rest — Collect",
          type: "code",
          content: "Rest collects multiple arguments into an array.",
          codeExample: {
            code: `// Rest in functions
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Rest in destructuring
const { name, ...rest } = {
  name: "Kai",
  age: 25,
  city: "Tokyo",
};
console.log(name); // "Kai"
console.log(rest); // { age: 25, city: "Tokyo" }`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-04-l3-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Spread (...) expands: [...arr], {...obj}. Rest (...) collects: function(...args), { name, ...rest }. Same syntax, opposite purposes. Spread is for copying/merging, rest is for collecting.",
        },
      ],
      keyTakeaway: "Spread = expand (...arr). Rest = collect (function(...args)). Same syntax, opposite purpose.",
    },
    {
      id: "js-04-l4",
      order: 4,
      title: "Optional Chaining & Nullish Coalescing",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-04-l4-s1",
          title: "Optional Chaining (?.)",
          type: "concept",
          content:
            "Optional chaining (?.) lets you safely access nested properties without checking each level. If any part of the chain is null or undefined, the whole expression returns undefined instead of throwing an error. This is a lifesaver when working with API responses.",
        },
        {
          id: "js-04-l4-s2",
          title: "Using ?.",
          type: "code",
          content: "Compare the old way vs the new way.",
          codeExample: {
            code: `const user = {
  name: "Kai",
  // address is undefined
};

// OLD WAY — verbose and error-prone
const city1 = user && user.address && user.address.city;
console.log(city1); // undefined

// NEW WAY — optional chaining
const city2 = user?.address?.city;
console.log(city2); // undefined (no error!)

// With array methods
const posts = null;
const firstTitle = posts?.[0]?.title;
console.log(firstTitle); // undefined

// With function calls
const obj = { method: () => "Hello" };
const result = obj.method?.(); // "Hello"
const missing = obj.missingMethod?.(); // undefined`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-04-l4-s3",
          title: "Nullish Coalescing (??)",
          type: "code",
          content:
            "The ?? operator returns the right side if the left is null or undefined. It is like || but only checks for null/undefined, not all falsy values.",
          codeExample: {
            code: `// || checks for ANY falsy value (0, "", false, null, undefined)
const count1 = 0;
console.log(count1 || 10); // 10 (0 is falsy — BUG!)

// ?? only checks for null/undefined
const count2 = 0;
console.log(count2 ?? 10); // 0 (0 is NOT null/undefined — correct!)

// Perfect for defaults
const userConfig = {
  theme: "dark",
  fontSize: 0,  // 0 is a valid font size!
};

const fontSize = userConfig.fontSize ?? 14;
console.log(fontSize); // 0 (correct!)
// With || it would be 14 (wrong!)`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-04-l4-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Optional chaining (?.) safely accesses nested properties. Nullish coalescing (??) provides defaults only for null/undefined. Together they make code safer and shorter. Use ?? instead of || for numeric/default values.",
        },
      ],
      keyTakeaway: "?. = safe access (undefined instead of error). ?? = default for null/undefined only (not 0 or '').",
    },
    {
      id: "js-04-l5",
      order: 5,
      title: "Object.keys, values, entries",
      estimatedTime: "6 min",
      sections: [
        {
          id: "js-04-l5-s1",
          title: "Iterating Objects",
          type: "concept",
          content:
            "Unlike arrays, objects are not iterable by default. To loop over an object's properties, use Object.keys(), Object.values(), or Object.entries(). These return arrays that you can then loop over with forEach or map.",
        },
        {
          id: "js-04-l5-s2",
          title: "The Three Methods",
          type: "code",
          content: "Each returns a different view of the object.",
          codeExample: {
            code: `const user = {
  name: "Kai",
  age: 25,
  city: "Tokyo",
};

// Get all keys
const keys = Object.keys(user);
console.log(keys); // ["name", "age", "city"]

// Get all values
const values = Object.values(user);
console.log(values); // ["Kai", 25, "Tokyo"]

// Get key-value pairs
const entries = Object.entries(user);
console.log(entries);
// [["name", "Kai"], ["age", 25], ["city", "Tokyo"]]

// Loop with entries
for (const [key, value] of Object.entries(user)) {
  console.log(key + ": " + value);
}
// name: Kai
// age: 25
// city: Tokyo

// Convert entries back to object
const newObj = Object.fromEntries(entries);
console.log(newObj); // { name: "Kai", age: 25, city: "Tokyo" }`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-04-l5-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Object.keys() returns keys, Object.values() returns values, Object.entries() returns [key, value] pairs. Object.fromEntries() converts entries back to an object. These are essential for working with data.",
        },
      ],
      keyTakeaway: "keys() = property names. values() = property values. entries() = [key, value] pairs. fromEntries() = reverse.",
    },
  ],
  commonMistakes: [
    {
      title: "Using arrow functions for object methods",
      wrong: "const obj = { name: 'Kai', greet: () => this.name };",
      right: "const obj = { name: 'Kai', greet() { return this.name; } };",
      explanation: "Arrow functions do not bind 'this' to the object. In the arrow function, 'this' refers to the enclosing scope (usually undefined or window), not the object. Use method shorthand instead.",
    },
    {
      title: "Using || for defaults with 0 or empty string",
      wrong: "const fontSize = config.fontSize || 14; // 0 becomes 14 (bug!)",
      right: "const fontSize = config.fontSize ?? 14; // 0 stays 0 (correct)",
      explanation: "The || operator treats 0 and '' as falsy, replacing them with the default. Use ?? to only replace null and undefined, which is usually what you want for numeric defaults.",
    },
    {
      title: "Forgetting that spread is shallow",
      wrong: "const copy = { ...original }; copy.nested.value = 99; // also changes original!",
      right: "const copy = structuredClone(original); // deep copy, or use JSON for simple cases",
      explanation: "Spread only copies the top level. Nested objects are still references. Modifying a nested property in the copy also modifies the original. Use structuredClone() or a deep copy library for nested objects.",
    },
  ],
  interviewQuestions: [
    {
      question: "What is the difference between spread and rest?",
      answer: "They use the same ... syntax but serve opposite purposes. Spread expands an iterable into individual elements: [...arr, 1] or {...obj, key: val}. Rest collects multiple elements into one: function(...args) or const { a, ...rest }. Spread is used in function calls and array/object literals, rest is used in function parameters and destructuring.",
    },
    {
      question: "What is optional chaining and when would you use it?",
      answer: "Optional chaining (?.) safely accesses nested properties. If any part of the chain is null or undefined, it returns undefined instead of throwing a TypeError. Use it when accessing deeply nested data from APIs where intermediate properties might not exist: const city = user?.address?.city.",
    },
    {
      question: "What is the difference between ?? and ||?",
      answer: "Both provide default values, but || checks for any falsy value (0, '', false, null, undefined, NaN), while ?? only checks for null and undefined. Use ?? when 0, '', or false are valid values that should not be replaced. Use || when you want to replace all falsy values.",
    },
  ],
  quiz: [
    {
      question: "What does const { name } = user do?",
      options: [
        "Creates a new object with a name property",
        "Extracts the name property from user into a variable",
        "Renames user to name",
        "Deletes the name property from user",
      ],
      correctIndex: 1,
      explanation: "This is object destructuring. It extracts the 'name' property from the 'user' object and assigns it to a variable called 'name'.",
    },
    {
      question: "What does user?.address?.city return if address is undefined?",
      options: ["A TypeError", "undefined", "null", "An empty string"],
      correctIndex: 1,
      explanation: "Optional chaining (?.) returns undefined instead of throwing an error when any part of the chain is null or undefined. This makes it safe for accessing deeply nested properties.",
    },
    {
      question: "What does Object.entries(obj) return?",
      options: [
        "An array of keys",
        "An array of values",
        "An array of [key, value] pairs",
        "The number of properties",
      ],
      correctIndex: 2,
      explanation: "Object.entries() returns an array of arrays, where each inner array is [key, value]. For example: [['name', 'Kai'], ['age', 25]].",
    },
    {
      question: "What will 0 ?? 10 return?",
      options: ["10", "0", "undefined", "null"],
      correctIndex: 1,
      explanation: "The nullish coalescing operator (??) only replaces null and undefined. Since 0 is neither null nor undefined, it returns 0. With || it would return 10.",
    },
    {
      question: "Is { ...obj1, ...obj2 } a deep or shallow copy?",
      options: ["Deep copy", "Shallow copy", "No copy at all", "It depends on the object"],
      correctIndex: 1,
      explanation: "Spread only creates a shallow copy — the top-level properties are copied, but nested objects are still references. Use structuredClone() for deep copies.",
    },
  ],
  labNotePrompt:
    "Write 3 sentences in English about destructuring and optional chaining. How do they make your code cleaner? Give one example from a real project.",
  resources: [
    { label: "MDN: Destructuring assignment", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" },
    { label: "MDN: Optional chaining", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining" },
    { label: "MDN: Nullish coalescing", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing" },
    { label: "MDN: Spread syntax", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" },
  ],
};
