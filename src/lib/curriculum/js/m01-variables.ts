import type { Module } from "../types";

export const m01Variables: Module = {
  id: "js-01-variables",
  track: "javascript",
  order: 1,
  title: "Variables & Data Types",
  subtitle: "Understanding how data lives in memory",
  difficulty: "beginner",
  estimatedTime: "45 min",
  prerequisites: [],
  learningObjectives: [
    "Declare variables using let, const, and var",
    "Choose the right declaration for each situation",
    "Identify JavaScript's primitive data types",
    "Work with arrays and objects",
    "Explain the difference between == and ===",
  ],
  realWorldAnalogy:
    "Think of variables as labeled boxes in a warehouse. You put something in a box, write a label on it, and later when you read the label, you know exactly what's inside. const is a sealed box — once you put something in, you cannot replace it. let is a regular box — you can swap the contents anytime. var is an old, dusty box that leaks — avoid using it.",
  whyThisMatters:
    "Every single JavaScript program ever written uses variables. This is THE most fundamental concept. In job interviews, 'let vs const vs var' is almost always the first question. React hooks, Next.js components, Node.js servers — everything starts with variable declarations.",
  lessons: [
    {
      id: "js-01-l1",
      order: 1,
      title: "What is a Variable?",
      estimatedTime: "5 min",
      sections: [
        {
          id: "js-01-l1-s1",
          title: "The Concept",
          type: "concept",
          content:
            "A variable is a named container for storing data. In JavaScript, you create a variable by giving it a name and assigning a value to it. The computer reserves a spot in memory for that data, and you can access it later by using the name.\n\nThink of it like a labeled box in a warehouse. The label is the variable name. The contents are the value. When you need the value, you just read the label.",
        },
        {
          id: "js-01-l1-s2",
          title: "Three Ways to Declare",
          type: "code",
          content:
            "JavaScript provides three keywords for declaring variables: var, let, and const. They look similar but behave very differently.",
          codeExample: {
            code: `// var — the old way (avoid)
var name = "Kai";

// let — can be reassigned
let age = 25;
age = 26; // OK, age is now 26

// const — cannot be reassigned
const country = "Japan";
// country = "Indonesia"; // ERROR: Assignment to constant variable`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-01-l1-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Use const by default. Use let only when you need to reassign the variable. Avoid var entirely — it exists for historical reasons and causes subtle bugs.",
        },
      ],
      keyTakeaway:
        "Variables are labeled boxes for data. Use const by default, let when you need to reassign, and never use var.",
    },
    {
      id: "js-01-l2",
      order: 2,
      title: "let vs const — When to Use Which",
      estimatedTime: "6 min",
      sections: [
        {
          id: "js-01-l2-s1",
          title: "The Rule of Thumb",
          type: "concept",
          content:
            "The golden rule: start with const. If you later find that you need to reassign the variable, change it to let. This is the safest approach because const prevents accidental reassignments, which are a common source of bugs.\n\nBut what about objects and arrays? Here's the trick: const prevents reassignment of the variable, but it does NOT prevent mutation of the value.",
        },
        {
          id: "js-01-l2-s2",
          title: "const with Objects and Arrays",
          type: "code",
          content:
            "When you use const with an object or array, you cannot reassign the variable, but you CAN modify the contents.",
          codeExample: {
            code: `const person = { name: "Kai" };
// person = { name: "Ren" }; // ERROR — cannot reassign
person.name = "Ren"; // OK — modifying the object

const numbers = [1, 2, 3];
// numbers = [4, 5, 6]; // ERROR — cannot reassign
numbers.push(4); // OK — modifying the array
console.log(numbers); // [1, 2, 3, 4]`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-01-l2-s3",
          title: "When to Use let",
          type: "concept",
          content:
            "Use let when the value will change — like a counter, a loop index, or a value that gets recalculated. If you are unsure, start with const and switch to let only when the compiler tells you to.",
        },
        {
          id: "js-01-l2-s4",
          title: "Practice",
          type: "practice",
          content:
            "Declare a variable called score with the value 100 that CANNOT be reassigned.",
          practice: {
            instruction:
              "Write the code to declare a constant variable named 'score' with value 100.",
            starterCode: "// Declare score here\n",
            solution: "const score = 100;",
            hint: "Use the const keyword, followed by the variable name, equals sign, and the value.",
          },
        },
      ],
      keyTakeaway:
        "Start with const always. Switch to let only when you need to reassign. const prevents reassignment but NOT mutation of objects/arrays.",
    },
    {
      id: "js-01-l3",
      order: 3,
      title: "Primitive Data Types",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-01-l3-s1",
          title: "The 7 Primitives",
          type: "concept",
          content:
            "JavaScript has 7 primitive data types. Primitives are the simplest forms of data — they are not objects and have no methods of their own (though JavaScript wraps them temporarily when you call methods on them).\n\nThe 7 primitives are:\n1. String — text data, wrapped in quotes\n2. Number — integers and decimals\n3. Boolean — true or false\n4. null — intentionally empty value\n5. undefined — value not yet assigned\n6. Symbol — unique identifier (advanced)\n7. BigInt — very large integers (advanced)",
        },
        {
          id: "js-01-l3-s2",
          title: "Examples",
          type: "code",
          content:
            "Here is how each primitive looks in code:",
          codeExample: {
            code: `const text = "Hello";      // String
const count = 42;           // Number
const price = 9.99;         // Number (decimal)
const isActive = true;     // Boolean
const empty = null;        // null (intentional empty)
let notAssigned;           // undefined (no value yet)
const id = Symbol();       // Symbol
const big = 9007199254740991n; // BigInt

// Check the type of a value
console.log(typeof text);  // "string"
console.log(typeof count); // "number"
console.log(typeof isActive); // "boolean"
console.log(typeof empty); // "object" (this is a known JS bug!)
console.log(typeof notAssigned); // "undefined"`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-01-l3-s3",
          title: "The typeof null Bug",
          type: "concept",
          content:
            "Notice that typeof null returns \"object\" — this is a long-standing JavaScript bug that cannot be fixed because it would break existing code. Just remember: null is NOT an object, it is a primitive that represents intentional emptiness. Use null when you want to say 'this is deliberately empty', and undefined when something has not been assigned yet.",
        },
        {
          id: "js-01-l3-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "JavaScript has 7 primitives: string, number, boolean, null, undefined, Symbol, BigInt. Everything else (arrays, functions, objects) is of type 'object'.",
        },
      ],
      keyTakeaway:
        "7 primitives: string, number, boolean, null, undefined, Symbol, BigInt. typeof null is 'object' — a known bug.",
    },
    {
      id: "js-01-l4",
      order: 4,
      title: "Arrays — Ordered Lists",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-01-l4-s1",
          title: "What is an Array?",
          type: "concept",
          content:
            "An array is an ordered collection of values. Each value has an index — a number that represents its position, starting from 0. Arrays are perfect for lists of items: a list of names, a list of prices, a list of DOM elements.",
        },
        {
          id: "js-01-l4-s2",
          title: "Creating and Accessing Arrays",
          type: "code",
          content:
            "Arrays are created with square brackets. You access elements by their index.",
          codeExample: {
            code: `const fruits = ["apple", "banana", "cherry"];

// Access by index (starts at 0)
console.log(fruits[0]); // "apple"
console.log(fruits[1]); // "banana"
console.log(fruits.length); // 3

// Modify an element
fruits[1] = "blueberry";
console.log(fruits); // ["apple", "blueberry", "cherry"]

// Add to the end
fruits.push("date");
console.log(fruits.length); // 4

// Arrays can hold any type
const mixed = [1, "hello", true, null];
console.log(typeof mixed); // "object" (arrays are objects!)`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-01-l4-s3",
          title: "Arrays are Objects",
          type: "concept",
          content:
            "Even though arrays feel special, they are actually a subtype of object. typeof [] returns \"object\", not \"array\". To check if something is an array, use Array.isArray():\n\nArray.isArray([1, 2, 3]) // true\nArray.isArray(\"hello\") // false",
        },
        {
          id: "js-01-l4-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Arrays are ordered lists with zero-based indexing. They are a subtype of object. Use Array.isArray() to check if a value is an array.",
        },
      ],
      keyTakeaway:
        "Arrays are ordered lists, zero-indexed. typeof [] is 'object'. Use Array.isArray() to check.",
    },
    {
      id: "js-01-l5",
      order: 5,
      title: "Objects — Key-Value Pairs",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-01-l5-s1",
          title: "What is an Object?",
          type: "concept",
          content:
            "An object is a collection of key-value pairs. Each key (also called a property) is a string (or Symbol), and each value can be any type — including other objects or arrays. Objects are the most important data structure in JavaScript. Nearly everything in JavaScript is an object or behaves like one.",
        },
        {
          id: "js-01-l5-s2",
          title: "Creating and Accessing Objects",
          type: "code",
          content:
            "Objects are created with curly braces. You can access properties with dot notation or bracket notation.",
          codeExample: {
            code: `const person = {
  name: "Kai",
  age: 25,
  isEmployed: true,
  hobbies: ["coding", "gaming"],
  address: {
    city: "Tokyo",
    country: "Japan"
  }
};

// Dot notation
console.log(person.name); // "Kai"
console.log(person.age); // 25

// Bracket notation (useful for dynamic keys)
console.log(person["name"]); // "Kai"

// Access nested properties
console.log(person.address.city); // "Tokyo"

// Add a new property
person.email = "kai@example.com";

// Delete a property
delete person.age;`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-01-l5-s3",
          title: "Dot vs Bracket Notation",
          type: "concept",
          content:
            "Use dot notation when the property name is known and is a valid identifier (no spaces, starts with a letter, etc.). Use bracket notation when the property name is dynamic, stored in a variable, or contains special characters.",
        },
        {
          id: "js-01-l5-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Objects are key-value pairs. Use dot notation for known properties, bracket notation for dynamic ones. Objects can be nested and hold any type of value.",
        },
      ],
      keyTakeaway:
        "Objects are key-value pairs. Dot notation for static keys, bracket notation for dynamic keys. Everything in JS is basically an object.",
    },
    {
      id: "js-01-l6",
      order: 6,
      title: "Type Coercion & ===",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-01-l6-s1",
          title: "What is Type Coercion?",
          type: "concept",
          content:
            "JavaScript is loosely typed, which means it will automatically try to convert types when you compare values with ==. This is called type coercion, and it leads to surprising and confusing results.",
        },
        {
          id: "js-01-l6-s2",
          title: "== vs ===",
          type: "code",
          content:
            "== (loose equality) converts types before comparing. === (strict equality) does NOT convert types. Always use ===.",
          codeExample: {
            code: `// == (loose equality — AVOID)
console.log(0 == "");      // true (both become falsy)
console.log(0 == "0");     // true (string converts to number)
console.log("" == "0");    // false (both are strings, different)
console.log(null == undefined); // true (special rule)

// === (strict equality — ALWAYS USE THIS)
console.log(0 === "");      // false (different types)
console.log(0 === "0");     // false (different types)
console.log(null === undefined); // false (different types)
console.log(5 === 5);       // true (same type, same value)`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-01-l6-s3",
          title: "Why This Matters",
          type: "concept",
          content:
            "Using == can cause bugs that are extremely hard to find. For example, if a user enters \"0\" in a form and you compare it to 0 with ==, it will be true. But if they enter \"\" (empty string), it will also match 0. This is why every style guide and every professional codebase requires ===.",
        },
        {
          id: "js-01-l6-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Always use === (strict equality). Never use == (loose equality). The only exception is checking for null OR undefined: value == null covers both, but you can also write value === null || value === undefined.",
        },
      ],
      keyTakeaway:
        "Always use === (strict equality). Never use == (loose equality) — it causes silent bugs through type coercion.",
    },
  ],
  commonMistakes: [
    {
      title: "Using var instead of let/const",
      wrong: "var name = 'Kai';",
      right: "const name = 'Kai';",
      explanation:
        "var has function scope, not block scope, which causes unexpected behavior. It is also hoisted to the top of its scope, meaning you can use it before declaration (it will be undefined). Always use let or const.",
    },
    {
      title: "Reassigning a const variable",
      wrong: "const age = 25;\nage = 26;",
      right: "let age = 25;\nage = 26;",
      explanation:
        "const variables cannot be reassigned. If the value needs to change, use let instead. This is a TypeError at runtime.",
    },
    {
      title: "Using == instead of ===",
      wrong: "if (age == '25')",
      right: "if (age === 25)",
      explanation:
        "== performs type coercion, which means '25' (string) equals 25 (number). This can cause unexpected behavior. Always use === for strict comparison.",
    },
  ],
  interviewQuestions: [
    {
      question: "What is the difference between let, const, and var?",
      answer:
        "let and const are block-scoped, while var is function-scoped. const cannot be reassigned after declaration, while let can be. var is hoisted to the top of its scope and initialized as undefined, while let and const are in the temporal dead zone before declaration. Best practice: use const by default, let when reassignment is needed, and never use var.",
    },
    {
      question: "When would you use const vs let?",
      answer:
        "Use const by default for any value that should not change. This includes objects and arrays — even though you can mutate their contents, using const signals that the reference itself should not be reassigned. Use let only when the variable will be reassigned, like loop counters, counters that increment, or values that get recalculated.",
    },
    {
      question: "What is the difference between == and ===?",
      answer:
        "== is loose equality — it performs type coercion before comparing, so '5' == 5 is true. === is strict equality — it does NOT perform type coercion, so '5' === 5 is false. Always use === to avoid silent bugs from unexpected type conversions. The only acceptable use of == is checking for null or undefined with value == null.",
    },
  ],
  quiz: [
    {
      question: "Which keyword creates a variable that CANNOT be reassigned?",
      options: ["let", "const", "var", "static"],
      correctIndex: 1,
      explanation:
        "const creates a variable whose reference cannot be reassigned. Note: you can still mutate objects and arrays declared with const.",
    },
    {
      question: "What will typeof [] return?",
      options: ["array", "object", "list", "undefined"],
      correctIndex: 1,
      explanation:
        "Arrays are a subtype of object in JavaScript. typeof [] returns 'object'. Use Array.isArray() to check if a value is specifically an array.",
    },
    {
      question: "What does 0 == \"\" return?",
      options: ["false", "true", "TypeError", "undefined"],
      correctIndex: 1,
      explanation:
        "With loose equality (==), both 0 and \"\" are coerced to the same falsy value, so they are considered equal. This is why you should always use === instead.",
    },
    {
      question: "How do you check if a value is an array?",
      options: [
        "typeof value === 'array'",
        "value.isArray()",
        "Array.isArray(value)",
        "value instanceof Array only",
      ],
      correctIndex: 2,
      explanation:
        "Array.isArray(value) is the most reliable way to check if a value is an array. typeof returns 'object' for arrays, so it cannot distinguish them.",
    },
    {
      question: "What will typeof null return?",
      options: ["null", "undefined", "object", "string"],
      correctIndex: 2,
      explanation:
        "typeof null returns 'object' — this is a long-standing JavaScript bug that cannot be fixed without breaking existing code. null is actually a primitive, not an object.",
    },
  ],
  labNotePrompt:
    "Write 3 sentences in English about what you learned in this module. Focus on when to use let vs const, and why === is better than ==.",
  resources: [
    {
      label: "MDN: Let declaration",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
    },
    {
      label: "MDN: Const declaration",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const",
    },
    {
      label: "javascript.info: Variables",
      url: "https://javascript.info/variables",
    },
    {
      label: "MDN: Equality comparisons",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness",
    },
  ],
};
