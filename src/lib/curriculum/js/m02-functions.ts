import type { Module } from "../types";

export const m02Functions: Module = {
  id: "js-02-functions",
  track: "javascript",
  order: 2,
  title: "Functions & Scope",
  subtitle: "Reusable blocks of code that do one thing well",
  difficulty: "beginner",
  estimatedTime: "50 min",
  prerequisites: ["js-01-variables"],
  learningObjectives: [
    "Declare functions using three different syntaxes",
    "Understand parameters and arguments",
    "Explain scope (global, function, block)",
    "Understand closures and why they matter",
    "Use arrow functions correctly",
  ],
  realWorldAnalogy:
    "A function is like a recipe. You write the steps once, give the recipe a name, and then whenever you want to cook that dish, you just follow the recipe. You can give it different ingredients (parameters) each time, and it produces a result (return value).",
  whyThisMatters:
    "Functions are the building blocks of every JavaScript application. React components are functions. Express routes are functions. Event handlers are functions. If you do not understand functions deeply, you cannot build anything meaningful. Interview questions about closures and scope are extremely common.",
  lessons: [
    {
      id: "js-02-l1",
      order: 1,
      title: "Function Declarations",
      estimatedTime: "5 min",
      sections: [
        {
          id: "js-02-l1-s1",
          title: "What is a Function?",
          type: "concept",
          content:
            "A function is a reusable block of code designed to perform a specific task. You define it once and call it as many times as you want. Functions can take inputs (parameters), process them, and return an output.",
        },
        {
          id: "js-02-l1-s2",
          title: "Function Declaration Syntax",
          type: "code",
          content:
            "The most traditional way to create a function is with the function keyword.",
          codeExample: {
            code: `// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Call the function
const message = greet("Kai");
console.log(message); // "Hello, Kai!"

// Function with multiple parameters
function add(a, b) {
  return a + b;
}

console.log(add(3, 4)); // 7`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-02-l1-s3",
          title: "Parameters vs Arguments",
          type: "concept",
          content:
            "Parameters are the variables listed in the function definition (name, a, b). Arguments are the actual values passed when calling the function (\"Kai\", 3, 4). This distinction matters in interviews and documentation.",
        },
      ],
      keyTakeaway:
        "Functions are reusable code blocks. Parameters are placeholders in the definition, arguments are the actual values passed when calling.",
    },
    {
      id: "js-02-l2",
      order: 2,
      title: "Function Expressions",
      estimatedTime: "5 min",
      sections: [
        {
          id: "js-02-l2-s1",
          title: "Assigning Functions to Variables",
          type: "concept",
          content:
            "In JavaScript, functions are first-class citizens. This means you can assign them to variables, pass them as arguments, and return them from other functions. A function expression is when you assign a function to a variable.",
        },
        {
          id: "js-02-l2-s2",
          title: "Expression Syntax",
          type: "code",
          content:
            "Function expressions look slightly different from declarations.",
          codeExample: {
            code: `// Function expression
const greet = function(name) {
  return "Hello, " + name + "!";
};

// Named function expression (useful for stack traces)
const add = function sum(a, b) {
  return a + b;
};

console.log(add(3, 4)); // 7
// sum(3, 4) // ReferenceError — 'sum' is not available outside`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-02-l2-s3",
          title: "Hoisting Difference",
          type: "concept",
          content:
            "Function declarations are hoisted — you can call them before they appear in the code. Function expressions are NOT hoisted in the same way. If you try to call a function expression before it is defined, you get a ReferenceError.",
        },
      ],
      keyTakeaway:
        "Function expressions assign functions to variables. They are not hoisted like function declarations. Functions are first-class citizens in JavaScript.",
    },
    {
      id: "js-02-l3",
      order: 3,
      title: "Arrow Functions",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-02-l3-s1",
          title: "A Shorter Syntax",
          type: "concept",
          content:
            "Arrow functions were introduced in ES6 as a shorter, more concise way to write function expressions. They are especially useful for callbacks and short functions.",
        },
        {
          id: "js-02-l3-s2",
          title: "Arrow Function Syntax",
          type: "code",
          content:
            "Arrow functions have a few syntax variations depending on the number of parameters and the body.",
          codeExample: {
            code: `// Basic arrow function
const greet = (name) => {
  return "Hello, " + name + "!";
};

// Single parameter — can omit parentheses
const greet2 = name => "Hello, " + name + "!";

// No parameters — need empty parentheses
const sayHi = () => "Hi!";

// Implicit return (no braces, no 'return' keyword)
const add = (a, b) => a + b;

// Multiple statements — need braces and explicit return
const calculate = (a, b) => {
  const sum = a + b;
  return sum * 2;
};

// Returning an object literal — wrap in parentheses
const makeUser = (name, age) => ({ name, age });`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-02-l3-s3",
          title: "No 'this' Binding",
          type: "concept",
          content:
            "Arrow functions do NOT have their own 'this' binding. They inherit 'this' from the enclosing scope. This is both their biggest advantage and biggest source of confusion. In React, arrow functions are commonly used for class methods because they automatically bind 'this'. In regular callbacks, they prevent the 'this' context issues that plague traditional function expressions.",
        },
        {
          id: "js-02-l3-s4",
          title: "Practice",
          type: "practice",
          content:
            "Write an arrow function called multiply that takes two parameters (a, b) and returns their product.",
          practice: {
            instruction: "Write an arrow function 'multiply' that returns a * b",
            starterCode: "// Write multiply here\n",
            solution: "const multiply = (a, b) => a * b;",
            hint: "Use the arrow syntax: (params) => expression. With implicit return, you do not need braces or the return keyword.",
          },
        },
      ],
      keyTakeaway:
        "Arrow functions are concise. Single param: omit parentheses. Single expression: omit braces and return. They do NOT have their own 'this'.",
    },
    {
      id: "js-02-l4",
      order: 4,
      title: "Scope — Global, Function, Block",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-02-l4-s1",
          title: "What is Scope?",
          type: "concept",
          content:
            "Scope determines the accessibility (visibility) of variables. Where you declare a variable determines where you can use it. JavaScript has three main types of scope: global scope, function scope, and block scope.",
        },
        {
          id: "js-02-l4-s2",
          title: "The Three Scopes",
          type: "code",
          content:
            "Understanding scope prevents accidental variable collisions and leaks.",
          codeExample: {
            code: `// Global scope — accessible everywhere
const globalVar = "I am global";

function example() {
  // Function scope — only accessible inside this function
  const funcVar = "I am function-scoped";

  if (true) {
    // Block scope — only accessible inside this block
    const blockVar = "I am block-scoped";
    console.log(globalVar);  // OK
    console.log(funcVar);    // OK
    console.log(blockVar);  // OK
  }

  console.log(globalVar); // OK
  console.log(funcVar);   // OK
  // console.log(blockVar); // ReferenceError!
}

example();
// console.log(funcVar); // ReferenceError!`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-02-l4-s3",
          title: "let/const vs var Scoping",
          type: "concept",
          content:
            "let and const are block-scoped — they only exist within the nearest curly braces. var is function-scoped — it exists within the entire function, ignoring block boundaries. This is why var can cause bugs: a variable declared inside an if-block with var is accessible outside that block.",
        },
      ],
      keyTakeaway:
        "Three scopes: global (everywhere), function (inside function), block (inside {}). let/const are block-scoped, var is function-scoped.",
    },
    {
      id: "js-02-l5",
      order: 5,
      title: "Closures",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-02-l5-s1",
          title: "What is a Closure?",
          type: "concept",
          content:
            "A closure is when a function 'remembers' the variables from the scope where it was created, even after that scope has finished executing. In other words, a closure is a function that carries its birth environment with it.\n\nClosures are not an edge case — they are everywhere in JavaScript. Every time you use a callback, an event handler, or a React hook, you are using closures.",
        },
        {
          id: "js-02-l5-s2",
          title: "A Simple Closure",
          type: "code",
          content:
            "Here is the classic example of a closure:",
          codeExample: {
            code: `function createCounter() {
  let count = 0; // This variable is "closed over"

  return function() {
    count++; // The inner function remembers 'count'
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 'count' is not accessible from outside
// console.log(count); // ReferenceError

// Each call to createCounter creates a NEW closure
const counter2 = createCounter();
console.log(counter2()); // 1 (separate from counter)`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-02-l5-s3",
          title: "Why Closures Matter",
          type: "concept",
          content:
            "Closures are used for: data privacy (encapsulating variables so they cannot be accessed directly), function factories (creating functions with preset configurations), and callbacks/event handlers (remembering state between calls). React's useState hook is built on closures.",
        },
        {
          id: "js-02-l5-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "A closure is a function that remembers variables from its creation scope, even after that scope has finished. Closures are used everywhere: callbacks, event handlers, React hooks, data privacy.",
        },
      ],
      keyTakeaway:
        "Closures = functions that remember their birth scope. Used for privacy, factories, callbacks, and React hooks.",
    },
    {
      id: "js-02-l6",
      order: 6,
      title: "Higher-Order Functions",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-02-l6-s1",
          title: "Functions as Values",
          type: "concept",
          content:
            "Because functions are first-class citizens, you can pass them as arguments to other functions and return them from functions. A function that takes another function as an argument or returns a function is called a higher-order function.",
        },
        {
          id: "js-02-l6-s2",
          title: "Examples",
          type: "code",
          content:
            "Array methods like map, filter, and reduce are the most common higher-order functions.",
          codeExample: {
            code: `// Function that takes a function as argument
function applyOperation(a, b, operation) {
  return operation(a, b);
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log(applyOperation(3, 4, add));      // 7
console.log(applyOperation(3, 4, multiply)); // 12

// Function that returns a function
function createGreeter(greeting) {
  return function(name) {
    return greeting + ", " + name + "!";
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
console.log(sayHello("Kai")); // "Hello, Kai!"
console.log(sayHi("Kai"));    // "Hi, Kai!"`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-02-l6-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Higher-order functions accept functions as arguments or return functions. They are the backbone of functional programming and are used extensively in React (components, render props) and array manipulation.",
        },
      ],
      keyTakeaway:
        "Higher-order functions take or return other functions. Array methods (map, filter, reduce) are the most common examples.",
    },
    {
      id: "js-02-l7",
      order: 7,
      title: "Default & Rest Parameters",
      estimatedTime: "5 min",
      sections: [
        {
          id: "js-02-l7-s1",
          title: "Default Parameters",
          type: "code",
          content:
            "You can provide default values for parameters that are not passed (or are undefined).",
          codeExample: {
            code: `function greet(name = "Guest") {
  return "Hello, " + name;
}

console.log(greet());     // "Hello, Guest"
console.log(greet("Kai")); // "Hello, Kai"
console.log(greet(undefined)); // "Hello, Guest"
console.log(greet(null)); // "Hello, null" (null is a value!)`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-02-l7-s2",
          title: "Rest Parameters",
          type: "code",
          content:
            "Rest parameters allow you to collect any number of arguments into an array.",
          codeExample: {
            code: `function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum());              // 0`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-02-l7-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Default parameters provide fallback values. Rest parameters (...args) collect arguments into an array. Both make functions more flexible.",
        },
      ],
      keyTakeaway:
        "Default params: greet(name = 'Guest'). Rest params: ...args collects any number of arguments into an array.",
    },
  ],
  commonMistakes: [
    {
      title: "Using var for loop variables",
      wrong: "for (var i = 0; i < 5; i++) { setTimeout(() => console.log(i), 0); } // prints 5, 5, 5, 5, 5",
      right: "for (let i = 0; i < 5; i++) { setTimeout(() => console.log(i), 0); } // prints 0, 1, 2, 3, 4",
      explanation:
        "var is function-scoped, so all closures share the same i. By the time the callbacks run, i is 5. let is block-scoped, so each iteration creates a new binding.",
    },
    {
      title: "Confusing parameters and arguments",
      wrong: "function greet(name) { console.log('The argument is:', name); } // 'name' is actually a parameter",
      right: "function greet(name) { console.log('The parameter is:', name); } // 'name' is the parameter; 'Kai' is the argument when called as greet('Kai')",
      explanation:
        "Parameters are the placeholders in the function definition. Arguments are the actual values passed when the function is called. This distinction matters in documentation and interviews.",
    },
    {
      title: "Using arrow functions for object methods",
      wrong: "const obj = { name: 'Kai', greet: () => console.log(this.name) }; obj.greet(); // undefined",
      right: "const obj = { name: 'Kai', greet() { console.log(this.name); } }; obj.greet(); // 'Kai'",
      explanation:
        "Arrow functions do not have their own 'this' binding — they inherit from the enclosing scope. For object methods, use regular function syntax so 'this' refers to the object.",
    },
    {
      title: "Forgetting to return in arrow function with braces",
      wrong: "const add = (a, b) => { a + b }; // returns undefined",
      right: "const add = (a, b) => { return a + b }; // or: const add = (a, b) => a + b;",
      explanation:
        "When you use curly braces in an arrow function, you MUST use the return keyword. Without braces, the expression is implicitly returned.",
    },
  ],
  interviewQuestions: [
    {
      question: "What is a closure?",
      answer:
        "A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished executing. Closures are used for data privacy, function factories, and callbacks. React's useState hook is built on closures — the state variable is closed over by the component function.",
    },
    {
      question: "What is the difference between function declarations and function expressions?",
      answer:
        "Function declarations (function foo() {}) are hoisted — you can call them before they appear in the code. Function expressions (const foo = function() {}) are NOT hoisted in the same way — the variable declaration is hoisted but the function assignment is not, so calling before definition gives a TypeError. Use declarations for top-level functions and expressions for callbacks.",
    },
    {
      question: "What is the difference between let/const and var in terms of scope?",
      answer:
        "let and const are block-scoped — they only exist within the nearest curly braces. var is function-scoped — it exists throughout the entire function, ignoring block boundaries. Additionally, var declarations are hoisted and initialized as undefined, while let/const are hoisted but in the temporal dead zone — accessing them before declaration throws a ReferenceError.",
    },
    {
      question: "When should you NOT use arrow functions?",
      answer:
        "Do not use arrow functions for: 1) object methods that need 'this' to refer to the object (arrow functions inherit 'this' from the enclosing scope), 2) constructors (arrow functions cannot be used with 'new'), 3) event handlers that need 'this' to refer to the element (though modern code often uses addEventListener with regular functions or arrow functions with explicit element references).",
    },
  ],
  quiz: [
    {
      question: "What is a closure?",
      options: [
        "A function that closes the program",
        "A function that remembers variables from its creation scope",
        "A function that cannot be called twice",
        "A function that returns undefined",
      ],
      correctIndex: 1,
      explanation:
        "A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished executing. This is fundamental to callbacks, event handlers, and React hooks.",
    },
    {
      question: "Which of the following is NOT a characteristic of arrow functions?",
      options: [
        "They have a shorter syntax",
        "They do not have their own 'this' binding",
        "They can be used as constructors with 'new'",
        "They support implicit return without braces",
      ],
      correctIndex: 2,
      explanation:
        "Arrow functions cannot be used as constructors. They do not have their own 'this', 'arguments', 'super', or 'new.target' bindings. Using 'new' with an arrow function throws a TypeError.",
    },
    {
      question: "What is the difference between parameters and arguments?",
      options: [
        "They are the same thing",
        "Parameters are in the definition, arguments are the actual values passed",
        "Parameters are passed when calling, arguments are in the definition",
        "Arguments are optional, parameters are required",
      ],
      correctIndex: 1,
      explanation:
        "Parameters are the placeholder variables listed in the function definition. Arguments are the actual values passed to the function when it is called. For example, in greet('Kai'), 'name' is the parameter and 'Kai' is the argument.",
    },
    {
      question: "What will this code output?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
      options: ["0, 1, 2", "3, 3, 3", "0, 0, 0", "undefined"],
      correctIndex: 1,
      explanation:
        "var is function-scoped, so all three closures share the same i. By the time the setTimeout callbacks run, the loop has finished and i is 3. Using let instead of var would output 0, 1, 2.",
    },
    {
      question: "What is a higher-order function?",
      options: [
        "A function with many parameters",
        "A function that takes or returns another function",
        "A function that runs at high speed",
        "A function declared at the top of the file",
      ],
      correctIndex: 1,
      explanation:
        "A higher-order function is a function that accepts other functions as arguments (like map, filter, reduce) or returns a function (like createGreeter). This is possible because functions are first-class citizens in JavaScript.",
    },
  ],
  labNotePrompt:
    "Write 3 sentences in English about closures. Why do they matter? Give one example of where you have seen or would use a closure.",
  resources: [
    {
      label: "MDN: Functions",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
    },
    {
      label: "MDN: Closures",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
    },
    {
      label: "javascript.info: Scope & Closures",
      url: "https://javascript.info/closure",
    },
    {
      label: "MDN: Arrow functions",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
    },
  ],
};
