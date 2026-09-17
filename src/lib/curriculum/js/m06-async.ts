import type { Module } from "../types";

export const m06Async: Module = {
  id: "js-06-async",
  track: "javascript",
  order: 6,
  title: "Async JavaScript",
  subtitle: "Handling operations that take time",
  difficulty: "intermediate",
  estimatedTime: "55 min",
  prerequisites: ["js-05-dom-events"],
  learningObjectives: [
    "Understand callbacks and the problem of callback hell",
    "Create and consume Promises with then/catch/finally",
    "Use async/await for cleaner async code",
    "Fetch data from APIs using the fetch API",
    "Handle errors with try/catch in async code",
    "Run multiple promises in parallel with Promise.all",
  ],
  realWorldAnalogy:
    "Async programming is like ordering food at a restaurant. You place your order (start the operation), then you do not stand frozen at the counter waiting. You go sit down, chat with friends, check your phone (other code runs). When the food is ready (the operation completes), the waiter brings it to you (the callback/promise resolves).",
  whyThisMatters:
    "Every web app communicates with servers, reads files, or sets timers. All of these are asynchronous. If you do not understand async JavaScript, you cannot build real applications. fetch(), setTimeout, event listeners, and React effects are all async. This is one of the most tested topics in interviews.",
  lessons: [
    {
      id: "js-06-l1",
      order: 1,
      title: "Callbacks",
      estimatedTime: "6 min",
      sections: [
        {
          id: "js-06-l1-s1",
          title: "What is Async?",
          type: "concept",
          content:
            "JavaScript is single-threaded — it can only do one thing at a time. But some operations take time: network requests, file reading, timers. If JavaScript waited for these, the entire page would freeze. So JavaScript uses async patterns: callbacks, promises, and async/await.",
        },
        {
          id: "js-06-l1-s2",
          title: "Callback Pattern",
          type: "code",
          content: "A callback is a function passed as an argument to be executed later.",
          codeExample: {
            code: `// setTimeout — the simplest async
console.log("1");
setTimeout(() => {
  console.log("2"); // runs after 1 second
}, 1000);
console.log("3"); // runs immediately!
// Output: 1, 3, 2 (NOT 1, 2, 3)

// Callback pattern
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received!");
  }, 1000);
}

fetchData((result) => {
  console.log(result); // "Data received!" after 1 sec
});`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-06-l1-s3",
          title: "Callback Hell",
          type: "concept",
          content:
            "When you need to do multiple async operations in sequence, callbacks nest inside each other, creating deeply indented code known as 'callback hell' or 'pyramid of doom'. This is hard to read and maintain. Promises were invented to solve this.",
        },
        {
          id: "js-06-l1-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "JavaScript is single-threaded. Callbacks are functions passed to be executed later. Nested callbacks create 'callback hell'. Promises and async/await were created to solve this.",
        },
      ],
      keyTakeaway: "Callbacks = functions executed later. Nested callbacks = callback hell. Promises solve this problem.",
    },
    {
      id: "js-06-l2",
      order: 2,
      title: "Promises",
      estimatedTime: "10 min",
      sections: [
        {
          id: "js-06-l2-s1",
          title: "What is a Promise?",
          type: "concept",
          content:
            "A Promise is an object representing the eventual completion (or failure) of an async operation. It has three states: Pending (operation in progress), Fulfilled (operation succeeded), Rejected (operation failed). Once settled (fulfilled or rejected), a promise cannot change state.",
        },
        {
          id: "js-06-l2-s2",
          title: "Creating Promises",
          type: "code",
          content: "Create with new Promise and resolve/reject.",
          codeExample: {
            code: `const myPromise = new Promise((resolve, reject) => {
  const success = true;
  
  if (success) {
    resolve("Operation succeeded!");
  } else {
    reject(new Error("Operation failed!"));
  }
});

// Consuming promises
myPromise
  .then((result) => {
    console.log(result); // "Operation succeeded!"
  })
  .catch((error) => {
    console.error(error); // Error: "Operation failed!"
  })
  .finally(() => {
    console.log("Cleanup"); // always runs
  });

// Chain promises — flat, not nested!
fetchUser()
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.error(error)); // catches ANY error in chain`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-06-l2-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "A Promise has 3 states: pending, fulfilled, rejected. Use .then() for success, .catch() for errors, .finally() for cleanup. Promises chain flatly (no nesting) — this solves callback hell.",
        },
      ],
      keyTakeaway: "Promise: pending → fulfilled/rejected. .then() success, .catch() error, .finally() cleanup. Chains flat.",
    },
    {
      id: "js-06-l3",
      order: 3,
      title: "async/await",
      estimatedTime: "10 min",
      sections: [
        {
          id: "js-06-l3-s1",
          title: "The Modern Way",
          type: "concept",
          content:
            "async/await is syntax sugar over promises. It lets you write async code that LOOKS synchronous (top-to-bottom). The 'async' keyword makes a function return a promise. The 'await' keyword pauses execution until a promise settles. This is the most readable way to handle async operations.",
        },
        {
          id: "js-06-l3-s2",
          title: "Using async/await",
          type: "code",
          content: "Compare the promise chain vs async/await.",
          codeExample: {
            code: `// Promise chain (harder to read)
function getUserData() {
  return fetchUser()
    .then(user => fetchPosts(user.id))
    .then(posts => fetchComments(posts[0].id))
    .then(comments => console.log(comments))
    .catch(error => console.error(error));
}

// async/await (much cleaner!)
async function getUserData() {
  try {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    console.error(error);
  }
}

// Key rules:
// 1. 'async' keyword before function
// 2. 'await' can only be used inside async functions
// 3. await PAUSES the function, NOT the whole program
// 4. Use try/catch for error handling`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-06-l3-s3",
          title: "Practice",
          type: "practice",
          content: "Write an async function that returns 'Hello after 1 second' using setTimeout wrapped in a promise.",
          practice: {
            instruction: "Create async function delayedHello() that waits 1 second then returns 'Hello after 1 second'",
            starterCode: "async function delayedHello() {\n  // Your code here\n}",
            solution: "async function delayedHello() {\n  return new Promise(resolve => {\n    setTimeout(() => resolve('Hello after 1 second'), 1000);\n  });\n}",
            hint: "Create a new Promise that calls setTimeout, then resolve inside the timeout callback. The function will return the promise automatically because it's async.",
          },
        },
        {
          id: "js-06-l3-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "async makes a function return a promise. await pauses the function until a promise settles. Use try/catch for errors. async/await makes async code look synchronous and is much easier to read.",
        },
      ],
      keyTakeaway: "async = function returns promise. await = pause until promise settles. try/catch for errors. Cleaner than .then() chains.",
    },
    {
      id: "js-06-l4",
      order: 4,
      title: "fetch API",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-06-l4-s1",
          title: "Fetching Data",
          type: "concept",
          content:
            "The fetch API is the modern way to make HTTP requests. It returns a promise that resolves to a Response object. You need to call .json() on the response to get the actual data. fetch only rejects on network errors — HTTP errors (404, 500) do NOT cause rejection!",
        },
        {
          id: "js-06-l4-s2",
          title: "GET and POST Requests",
          type: "code",
          content: "Use async/await with fetch for clean API calls.",
          codeExample: {
            code: `// GET request
async function getUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    
    // IMPORTANT: check response.ok
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}

// POST request
async function createUser(data) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) throw new Error("Failed to create user");
    
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

// Usage
getUser(1).then(user => console.log(user));
createUser({ name: "Kai", email: "kai@example.com" });`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-06-l4-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "fetch() returns a promise. Check response.ok — HTTP errors (404, 500) do NOT reject. Call response.json() to parse the body. Use async/await with try/catch for clean error handling.",
        },
      ],
      keyTakeaway: "fetch returns a promise. Check response.ok (HTTP errors don't reject). response.json() parses body. Use async/await + try/catch.",
    },
    {
      id: "js-06-l5",
      order: 5,
      title: "Error Handling",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-06-l5-s1",
          title: "try/catch/finally",
          type: "concept",
          content:
            "In async/await, errors are handled with try/catch/finally — same as synchronous code. This is one of the biggest advantages over promise chains. You wrap the entire async block in try/catch and handle all errors in one place.",
        },
        {
          id: "js-06-l5-s2",
          title: "Error Handling Patterns",
          type: "code",
          content: "Best practices for async error handling.",
          codeExample: {
            code: `async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error; // last attempt, throw
      console.log(\`Retry \${i + 1}...\`);
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // backoff
    }
  }
}

// Custom error classes
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Using custom errors
async function getData() {
  const response = await fetch("/api/data");
  if (response.status === 404) {
    throw new ApiError("Resource not found", 404);
  }
  if (response.status === 401) {
    throw new ApiError("Unauthorized", 401);
  }
  return response.json();
}`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-06-l5-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Use try/catch/finally with async/await. Create custom error classes for better error handling. Implement retry logic with exponential backoff for network requests.",
        },
      ],
      keyTakeaway: "try/catch/finally for async errors. Custom error classes for specific cases. Retry with backoff for flaky networks.",
    },
    {
      id: "js-06-l6",
      order: 6,
      title: "Promise.all & Promise.race",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-06-l6-s1",
          title: "Running Promises in Parallel",
          type: "concept",
          content:
            "Sometimes you need to make multiple async calls at once. If you await each one sequentially, it is slow. Promise.all runs multiple promises in parallel and waits for all of them. Promise.race returns as soon as the first one finishes.",
        },
        {
          id: "js-06-l6-s2",
          title: "Promise.all vs Sequential",
          type: "code",
          content: "Compare sequential vs parallel execution.",
          codeExample: {
            code: `// SEQUENTIAL — slow (3 seconds total)
async function sequential() {
  const user = await fetchUser();     // 1 sec
  const posts = await fetchPosts();    // 1 sec
  const comments = await fetchComments(); // 1 sec
  return { user, posts, comments };
}

// PARALLEL — fast (1 second total!)
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
  ]);
  return { user, posts, comments };
}

// Promise.all — all must succeed
// If ANY promise rejects, the whole thing rejects
Promise.all([p1, p2, p3])
  .then(([r1, r2, r3]) => console.log(r1, r2, r3))
  .catch(err => console.error("One failed:", err));

// Promise.allSettled — wait for all, never reject
Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach(r => {
      if (r.status === "fulfilled") console.log(r.value);
      else console.error(r.reason);
    });
  });

// Promise.race — first to finish wins
Promise.race([
  fetchWithTimeout("/api/fast", 1000),
  new Promise((_, reject) => 
    setTimeout(() => reject("Timeout"), 5000)
  ),
]);`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-06-l6-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Promise.all runs in parallel — much faster than sequential await. If any rejects, all rejects. Use Promise.allSettled if you want results even if some fail. Promise.race for timeout patterns.",
        },
      ],
      keyTakeaway: "Promise.all = parallel (fast). allSettled = wait for all regardless. race = first to finish. Use for performance!",
    },
  ],
  commonMistakes: [
    {
      title: "Forgetting to check response.ok with fetch",
      wrong: "const data = await response.json(); // no error check!",
      right: "if (!response.ok) throw new Error(`HTTP ${response.status}`);\nconst data = await response.json();",
      explanation: "fetch only rejects on network errors. A 404 or 500 response still resolves the promise. You MUST check response.ok before calling .json(), otherwise you might parse an error page as JSON.",
    },
    {
      title: "Using await in parallel when you need sequential",
      wrong: "const a = await fetchA();\nconst b = await fetchB(); // waits for A first",
      right: "const [a, b] = await Promise.all([fetchA(), fetchB()]);",
      explanation: "Sequential await waits for each request to finish before starting the next. If the calls are independent, use Promise.all to run them in parallel — it is much faster.",
    },
    {
      title: "Not using try/catch with async/await",
      wrong: "async function getData() {\n  const data = await fetchData();\n  return data;\n}",
      right: "async function getData() {\n  try {\n    const data = await fetchData();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n}",
      explanation: "Without try/catch, any error in the async function becomes an unhandled promise rejection, which can crash the process in newer Node.js versions. Always wrap async code in try/catch.",
    },
    {
      title: "Using await outside async function",
      wrong: "const data = await fetch('/api').then(r => r.json());",
      right: "async function getData() {\n  const data = await fetch('/api').then(r => r.json());\n}",
      explanation: "await can only be used inside functions declared with the 'async' keyword. At the top level, wrap your code in an async IIFE: (async () => { ... })(); or use top-level await in ES modules.",
    },
  ],
  interviewQuestions: [
    {
      question: "What is a Promise?",
      answer:
        "A Promise is an object representing the eventual completion or failure of an async operation. It has three states: pending, fulfilled, and rejected. Once settled, it cannot change. Promises solve callback hell by allowing flat chaining with .then() instead of nesting.",
    },
    {
      question: "What is the difference between async/await and promises?",
      answer:
        "async/await is syntax sugar over promises. Under the hood, async functions return promises and await pauses execution until the promise settles. The advantage is readability: async/await code looks synchronous, uses try/catch instead of .catch(), and is easier to debug. However, they are the same thing fundamentally — async/await IS promises.",
    },
    {
      question: "Does fetch() reject on a 404 or 500 response?",
      answer:
        "No! fetch only rejects on network-level errors (DNS failure, no connection). HTTP error responses (404, 500, 403) still resolve the promise. You must check response.ok or response.status manually and throw an error if needed. This is one of the most common bugs with fetch.",
    },
    {
      question: "What is the difference between Promise.all and Promise.allSettled?",
      answer:
        "Promise.all waits for all promises to succeed. If ANY promise rejects, Promise.all immediately rejects with that error. Promise.allSettled waits for all promises to finish regardless of success or failure, and returns an array of { status, value/reason } objects. Use allSettled when you want all results even if some fail.",
    },
  ],
  quiz: [
    {
      question: "What are the three states of a Promise?",
      options: ["start, middle, end", "pending, fulfilled, rejected", "initial, running, stopped", "created, resolved, destroyed"],
      correctIndex: 1,
      explanation: "A Promise has three states: pending (in progress), fulfilled (succeeded), and rejected (failed). Once settled (fulfilled or rejected), the state cannot change.",
    },
    {
      question: "Does fetch() reject on a 404 response?",
      options: ["Yes, always", "No, only on network errors", "Yes, but only for 500", "It depends on the browser"],
      correctIndex: 1,
      explanation: "fetch() only rejects on network-level errors (no connection, DNS failure). HTTP error responses (404, 500) still resolve the promise. You must check response.ok manually.",
    },
    {
      question: "What does Promise.all do?",
      options: ["Returns the first promise to resolve", "Runs all promises in parallel, waits for all", "Runs promises sequentially", "Combines all results into one object"],
      correctIndex: 1,
      explanation: "Promise.all takes an array of promises and runs them in parallel. It resolves when ALL promises have resolved. If any promise rejects, Promise.all immediately rejects with that error.",
    },
    {
      question: "What is the advantage of async/await over .then() chains?",
      options: ["It is faster", "It looks synchronous and uses try/catch", "It does not use promises", "It can run multiple threads"],
      correctIndex: 1,
      explanation: "async/await is the same speed as promises and still uses promises under the hood. The advantage is readability: the code looks top-to-bottom (synchronous) and uses try/catch instead of .catch() chains.",
    },
    {
      question: "How do you handle errors in async/await?",
      options: [".catch() on the function", "try/catch/finally", "onerror event", ".error() method"],
      correctIndex: 1,
      explanation: "In async/await, you use try/catch/finally blocks, just like synchronous code. This is one of the main advantages — you do not need .catch() chains.",
    },
  ],
  labNotePrompt:
    "Write 3 sentences in English about async/await. Why is it better than callbacks? What is one thing you need to be careful about when using fetch?",
  resources: [
    { label: "MDN: Using promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises" },
    { label: "MDN: async function", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" },
    { label: "MDN: fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
    { label: "javascript.info: Async/await", url: "https://javascript.info/async-await" },
  ],
};
