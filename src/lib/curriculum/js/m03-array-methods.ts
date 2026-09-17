import type { Module } from "../types";

export const m03ArrayMethods: Module = {
  id: "js-03-array-methods",
  track: "javascript",
  order: 3,
  title: "Array Methods",
  subtitle: "Transform, filter, and reduce arrays like a pro",
  difficulty: "beginner",
  estimatedTime: "50 min",
  prerequisites: ["js-02-functions"],
  learningObjectives: [
    "Use map() to transform every element in an array",
    "Use filter() to select elements that match a condition",
    "Use reduce() to accumulate a single value from an array",
    "Chain array methods together for complex transformations",
    "Understand when to use forEach vs map",
  ],
  realWorldAnalogy:
    "Imagine a conveyor belt of items. map() replaces each item with a new version. filter() removes items that do not pass inspection. reduce() combines all items into a single package. forEach() just looks at each item without changing anything.",
  whyThisMatters:
    "Array methods are the most used feature in modern JavaScript. React's list rendering uses map(). Data processing in Node.js uses filter() and reduce(). Interview coding challenges almost always involve array methods. Mastering these is non-negotiable for any web developer.",
  lessons: [
    {
      id: "js-03-l1",
      order: 1,
      title: "map() — Transform Every Element",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-03-l1-s1",
          title: "What map() Does",
          type: "concept",
          content:
            "map() creates a NEW array by applying a function to every element of the original array. The original array is not modified. map() always returns an array of the same length as the original.",
        },
        {
          id: "js-03-l1-s2",
          title: "Using map()",
          type: "code",
          content:
            "map() takes a callback function. The callback receives (element, index, array).",
          codeExample: {
            code: `const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Convert to objects
const users = ["Kai", "Ren", "Aria"];
const userObjects = users.map((name, index) => ({
  id: index,
  name: name,
}));
console.log(userObjects);
// [{ id: 0, name: "Kai" }, { id: 1, name: "Ren" }, { id: 2, name: "Aria" }]

// Original array is unchanged
console.log(numbers); // [1, 2, 3, 4, 5]`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-03-l1-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "map() transforms each element and returns a new array of the same length. It does not modify the original. This is the most common array method in React (for rendering lists).",
        },
      ],
      keyTakeaway:
        "map() = transform each element, return new array of same length. Immutable. Most used in React for rendering lists.",
    },
    {
      id: "js-03-l2",
      order: 2,
      title: "filter() — Keep What Matches",
      estimatedTime: "6 min",
      sections: [
        {
          id: "js-03-l2-s1",
          title: "What filter() Does",
          type: "concept",
          content:
            "filter() creates a NEW array containing only the elements that pass a test (return true). The callback must return a boolean. The new array may be shorter than the original.",
        },
        {
          id: "js-03-l2-s2",
          title: "Using filter()",
          type: "code",
          content: "filter() keeps elements where the callback returns true.",
          codeExample: {
            code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Keep only even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Filter objects
const users = [
  { name: "Kai", age: 25 },
  { name: "Ren", age: 17 },
  { name: "Aria", age: 30 },
  { name: "Yuki", age: 15 },
];

const adults = users.filter(user => user.age >= 18);
console.log(adults);
// [{ name: "Kai", age: 25 }, { name: "Aria", age: 30 }]`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-03-l2-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "filter() returns a new array with only elements that pass the test. The callback must return a boolean. Great for searching and removing unwanted items.",
        },
      ],
      keyTakeaway: "filter() = keep elements where callback returns true. Returns new (possibly shorter) array.",
    },
    {
      id: "js-03-l3",
      order: 3,
      title: "reduce() — Combine to One",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-03-l3-s1",
          title: "What reduce() Does",
          type: "concept",
          content:
            "reduce() processes every element and accumulates them into a single value. It is the most powerful array method — you can use it to sum, find averages, group items, flatten arrays, and more. The callback receives (accumulator, currentElement, index, array).",
        },
        {
          id: "js-03-l3-s2",
          title: "Basic reduce()",
          type: "code",
          content: "The most common use is summing numbers.",
          codeExample: {
            code: `const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((acc, current) => acc + current, 0);
console.log(sum); // 15

// How it works:
// Step 1: acc=0,  current=1 → acc=1
// Step 2: acc=1,  current=2 → acc=3
// Step 3: acc=3,  current=3 → acc=6
// Step 4: acc=6,  current=4 → acc=10
// Step 5: acc=10, current=5 → acc=15

// Find the maximum
const max = numbers.reduce((acc, current) => 
  current > acc ? current : acc
, 0);
console.log(max); // 5

// Group by property
const users = [
  { name: "Kai", role: "admin" },
  { name: "Ren", role: "user" },
  { name: "Aria", role: "admin" },
];

const grouped = users.reduce((acc, user) => {
  if (!acc[user.role]) acc[user.role] = [];
  acc[user.role].push(user.name);
  return acc;
}, {});
console.log(grouped);
// { admin: ["Kai", "Aria"], user: ["Ren"] }`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-03-l3-s3",
          title: "The Initial Value",
          type: "concept",
          content:
            "The second argument to reduce() (0 in the examples above) is the initial value of the accumulator. ALWAYS provide an initial value. If you omit it, reduce uses the first element as the initial accumulator, which can cause bugs with empty arrays (TypeError) and unexpected behavior with objects.",
        },
        {
          id: "js-03-l3-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "reduce() accumulates all elements into a single value. The callback receives (accumulator, current). ALWAYS provide an initial value as the second argument.",
        },
      ],
      keyTakeaway: "reduce() = combine all elements into one value. Always pass an initial value as the second argument.",
    },
    {
      id: "js-03-l4",
      order: 4,
      title: "find(), some(), every()",
      estimatedTime: "6 min",
      sections: [
        {
          id: "js-03-l4-s1",
          title: "Searching Arrays",
          type: "code",
          content: "Three methods for checking if elements exist or match a condition.",
          codeExample: {
            code: `const users = [
  { name: "Kai", age: 25 },
  { name: "Ren", age: 17 },
  { name: "Aria", age: 30 },
];

// find() — returns the FIRST matching element (or undefined)
const adult = users.find(u => u.age >= 18);
console.log(adult); // { name: "Kai", age: 25 }

// some() — returns true if AT LEAST ONE matches
const hasMinor = users.some(u => u.age < 18);
console.log(hasMinor); // true

// every() — returns true if ALL match
const allNamed = users.every(u => u.name.length > 0);
console.log(allNamed); // true

const allAdults = users.every(u => u.age >= 18);
console.log(allAdults); // false`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-03-l4-s2",
          title: "Key Takeaway",
          type: "summary",
          content:
            "find() returns the first match or undefined. some() returns true if any element matches. every() returns true only if ALL elements match. All three short-circuit — they stop as soon as the result is determined.",
        },
      ],
      keyTakeaway: "find() = first match. some() = any match. every() = all must match. All return early.",
    },
    {
      id: "js-03-l5",
      order: 5,
      title: "Chaining Array Methods",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-03-l5-s1",
          title: "Combining Methods",
          type: "concept",
          content:
            "Because map(), filter(), and reduce() return new arrays (or values), you can chain them together. This is the functional programming style used heavily in modern JavaScript and React.",
        },
        {
          id: "js-03-l5-s2",
          title: "Chaining Example",
          type: "code",
          content: "Filter adults, map to names, then reduce to a single string.",
          codeExample: {
            code: `const users = [
  { name: "Kai", age: 25, role: "admin" },
  { name: "Ren", age: 17, role: "user" },
  { name: "Aria", age: 30, role: "admin" },
  { name: "Yuki", age: 15, role: "user" },
];

// Chain: filter → map → join
const adminNames = users
  .filter(u => u.role === "admin")  // Keep admins
  .map(u => u.name)                 // Extract names
  .join(", ");                       // Join into string

console.log(adminNames); // "Kai, Aria"

// Chain: filter → reduce
const adultTotalAge = users
  .filter(u => u.age >= 18)
  .reduce((sum, u) => sum + u.age, 0);

console.log(adultTotalAge); // 55 (25 + 30)

// Chain: map → filter
const doubledEvens = numbers
  .map(n => n * 2)        // [2, 4, 6, 8, 10]
  .filter(n => n > 5);    // [6, 8, 10]`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-03-l5-s3",
          title: "Practice",
          type: "practice",
          content: "Given an array of numbers, filter out odd numbers, then double the remaining.",
          practice: {
            instruction: "Chain filter and map: keep evens, then double them.",
            starterCode: "const result = [1,2,3,4,5,6].filter(/* your code */).map(/* your code */);",
            solution: "[1,2,3,4,5,6].filter(n => n % 2 === 0).map(n => n * 2)",
            hint: "Filter with n % 2 === 0, then map with n * 2.",
          },
        },
      ],
      keyTakeaway: "Chain array methods: filter().map().reduce(). Each step transforms the data for the next step.",
    },
    {
      id: "js-03-l6",
      order: 6,
      title: "forEach() vs map()",
      estimatedTime: "5 min",
      sections: [
        {
          id: "js-03-l6-s1",
          title: "The Difference",
          type: "concept",
          content:
            "forEach() executes a function for each element but returns undefined. map() returns a new array. If you need the result, use map(). If you are just doing side effects (like logging, DOM manipulation), forEach is fine.",
        },
        {
          id: "js-03-l6-s2",
          title: "Comparison",
          type: "code",
          content: "Common mistake: using forEach when you need the result.",
          codeExample: {
            code: `const numbers = [1, 2, 3];

// forEach — returns undefined
const result1 = numbers.forEach(n => console.log(n));
console.log(result1); // undefined

// map — returns new array
const result2 = numbers.map(n => n * 2);
console.log(result2); // [2, 4, 6]

// Common mistake: using forEach for transformation
const wrong = numbers.forEach(n => n * 2);
console.log(wrong); // undefined — data is lost!

// forEach is fine for side effects
numbers.forEach(n => {
  const el = document.createElement("p");
  el.textContent = n;
  document.body.appendChild(el);
});`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-03-l6-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "forEach() = side effects only, returns undefined. map() = transformation, returns new array. Never use forEach when you need the transformed data.",
        },
      ],
      keyTakeaway: "forEach = side effects, returns undefined. map = transform, returns new array. Never chain forEach.",
    },
  ],
  commonMistakes: [
    {
      title: "Forgetting to return in map/filter callbacks",
      wrong: "const doubled = numbers.map(n => { n * 2 });",
      right: "const doubled = numbers.map(n => n * 2); // or: n => { return n * 2; }",
      explanation: "With arrow function braces, you must use 'return'. Without braces, the expression is implicitly returned. Forgetting to return gives an array of undefined.",
    },
    {
      title: "Using forEach for transformation",
      wrong: "const doubled = numbers.forEach(n => n * 2);",
      right: "const doubled = numbers.map(n => n * 2);",
      explanation: "forEach returns undefined. If you need the transformed data, use map(). forEach is only for side effects like logging or DOM manipulation.",
    },
    {
      title: "Mutating the original array in map",
      wrong: "numbers.map(n => { numbers.push(n); return n; });",
      right: "const more = [...numbers, ...numbers];",
      explanation: "Never modify the original array inside map(). This causes infinite loops or incorrect results. If you need to add elements, create a new array with spread or concat.",
    },
    {
      title: "Omitting initial value in reduce",
      wrong: "const sum = numbers.reduce((acc, n) => acc + n);",
      right: "const sum = numbers.reduce((acc, n) => acc + n, 0);",
      explanation: "Without an initial value, reduce uses the first element as the accumulator. If the array is empty, this throws a TypeError. Always provide an initial value.",
    },
  ],
  interviewQuestions: [
    {
      question: "What is the difference between map and forEach?",
      answer: "map returns a new array with the transformed elements, while forEach returns undefined. map is for transformation, forEach is for side effects. You can chain map but not forEach because forEach returns undefined.",
    },
    {
      question: "How does reduce work?",
      answer: "reduce takes a callback (accumulator, currentElement) and an initial value. It processes each element, passing the accumulated result to the next iteration. The final accumulated value is returned. Always provide an initial value to avoid bugs with empty arrays.",
    },
    {
      question: "What is the difference between find, some, and every?",
      answer: "find returns the first element that matches the condition (or undefined). some returns true if at least one element matches. every returns true only if ALL elements match. All three short-circuit — they stop iterating as soon as the result is determined.",
    },
  ],
  quiz: [
    {
      question: "What does map() return?",
      options: ["The original array", "A new array of the same length", "undefined", "A single value"],
      correctIndex: 1,
      explanation: "map() returns a NEW array with the same number of elements. Each element is the result of the callback. The original array is not modified.",
    },
    {
      question: "What does filter() return if no elements match?",
      options: ["undefined", "null", "An empty array", "The original array"],
      correctIndex: 2,
      explanation: "filter() always returns an array. If no elements pass the test, it returns an empty array [], not undefined or null.",
    },
    {
      question: "What is the second argument to reduce()?",
      options: ["The callback function", "The initial value of the accumulator", "The index", "The array itself"],
      correctIndex: 1,
      explanation: "The second argument is the initial value for the accumulator. Always provide it to avoid bugs with empty arrays and to make the behavior predictable.",
    },
    {
      question: "Which method returns true if at least one element matches?",
      options: ["every()", "find()", "some()", "filter()"],
      correctIndex: 2,
      explanation: "some() returns true if at least one element passes the test. It short-circuits — it stops as soon as it finds a match.",
    },
    {
      question: "What will this code output?\n[1,2,3].map(n => n * 2).filter(n => n > 3)",
      options: ["[2, 4, 6]", "[4, 6]", "[2, 4]", "[6]"],
      correctIndex: 1,
      explanation: "map doubles each: [2, 4, 6]. filter keeps > 3: [4, 6]. Chaining works because map returns a new array that filter can operate on.",
    },
  ],
  labNotePrompt:
    "Write 3 sentences in English about the most useful array method you learned. Why is it useful? Where would you use it in a real project?",
  resources: [
    { label: "MDN: Array.prototype.map()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" },
    { label: "MDN: Array.prototype.filter()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" },
    { label: "MDN: Array.prototype.reduce()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" },
    { label: "javascript.info: Array methods", url: "https://javascript.info/array-methods" },
  ],
};
