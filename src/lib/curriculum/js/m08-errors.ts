import type { Module } from "../types";

export const m08Errors: Module = {
  id: "js-08-errors",
  track: "javascript",
  order: 8,
  title: "Error Handling",
  subtitle: "Writing robust code that does not crash",
  difficulty: "intermediate",
  estimatedTime: "40 min",
  prerequisites: ["js-07-modules"],
  learningObjectives: [
    "Use try/catch/finally to handle errors gracefully",
    "Understand the Error object and create custom errors",
    "Apply debugging techniques with the console and DevTools",
    "Follow error handling best practices",
    "Handle errors in async code properly",
  ],
  realWorldAnalogy:
    "Error handling is like wearing a seatbelt. Most of the time, nothing happens. But when something goes wrong, the seatbelt (try/catch) prevents a disaster. You do not wear a seatbelt because you expect to crash — you wear it because the cost of NOT wearing it is catastrophic.",
  whyThisMatters:
    "In production, errors WILL happen. Network requests fail, APIs return unexpected data, users do unpredictable things. If you do not handle errors, your app crashes and users see a blank screen or broken page. Good error handling is the difference between a junior and a senior developer. It is also heavily tested in interviews.",
  lessons: [
    {
      id: "js-08-l1",
      order: 1,
      title: "try/catch/finally",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-08-l1-s1",
          title: "The try/catch Structure",
          type: "concept",
          content:
            "try/catch lets you handle errors without crashing. Code in the try block runs normally. If an error occurs, execution jumps to the catch block. The finally block runs regardless of whether an error occurred — use it for cleanup (closing connections, hiding loaders).",
        },
        {
          id: "js-08-l1-s2",
          title: "Basic Usage",
          type: "code",
          content: "try/catch/finally structure.",
          codeExample: {
            code: `try {
  // Code that might throw an error
  const data = JSON.parse(invalidJson);
  console.log(data);
} catch (error) {
  // Runs if try block throws
  console.error("Failed to parse JSON:", error.message);
} finally {
  // Always runs, regardless of success or error
  console.log("Cleanup complete");
  hideLoader();
}

// try without catch (with finally only) — valid in modern JS
try {
  riskyOperation();
} finally {
  cleanup();
}

// The error object
try {
  null.x; // TypeError
} catch (error) {
  console.log(error.name);    // "TypeError"
  console.log(error.message); // "Cannot read properties of null"
  console.log(error.stack);   // full stack trace
  console.error(error);       // full error info
}`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-08-l1-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "try = risky code, catch = error handling, finally = cleanup (always runs). The error object has .message, .name, and .stack. Use finally for cleanup like hiding loaders.",
        },
      ],
      keyTakeaway: "try = risky code, catch = handle error, finally = cleanup (always runs). Error object: .message, .name, .stack.",
    },
    {
      id: "js-08-l2",
      order: 2,
      title: "The Error Object & Custom Errors",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-08-l2-s1",
          title: "Built-in Error Types",
          type: "concept",
          content:
            "JavaScript has several built-in error types: Error (generic), TypeError (wrong type), RangeError (value out of range), SyntaxError (invalid syntax), ReferenceError (variable not found), URIError (URI encoding error). Each gives specific information about what went wrong.",
        },
        {
          id: "js-08-l2-s2",
          title: "Creating Custom Errors",
          type: "code",
          content: "Extend the Error class for domain-specific errors.",
          codeExample: {
            code: `// Custom error class
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

// Throwing custom errors
function validateUser(user) {
  if (!user.email) {
    throw new ValidationError("Email is required", "email");
  }
  if (!user.email.includes("@")) {
    throw new ValidationError("Email format is invalid", "email");
  }
  if (user.age < 0) {
    throw new ValidationError("Age cannot be negative", "age");
  }
}

// Handling specific errors
try {
  validateUser({ email: "invalid", age: -5 });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(\`Validation error on \${error.field}: \${error.message}\`);
    // Show field-specific error message to user
  } else {
    // Unexpected error
    console.error("Unexpected error:", error);
    // Show generic error message
  }
}`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-08-l2-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Built-in errors: TypeError, RangeError, ReferenceError, SyntaxError. Create custom errors by extending Error. Use instanceof to check error type in catch blocks. Custom errors carry domain-specific data.",
        },
      ],
      keyTakeaway: "Custom errors: class MyError extends Error. Use instanceof to handle different error types differently. Carry extra data (field, statusCode).",
    },
    {
      id: "js-08-l3",
      order: 3,
      title: "Debugging Techniques",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-08-l3-s1",
          title: "Console Methods",
          type: "code",
          content: "Use the right console method for the situation.",
          codeExample: {
            code: `// Basic logging
console.log("Info");
console.error("Error"); // red
console.warn("Warning"); // yellow
console.info("Info"); // blue icon

// Structured logging
console.table([{ name: "Kai", age: 25 }, { name: "Ren", age: 30 }]);
// Shows a nice table in the console!

// Group related logs
console.group("User details");
console.log("Name: Kai");
console.log("Age: 25");
console.groupEnd();

// Time operations
console.time("loop");
for (let i = 0; i < 1000000; i++) {}
console.timeEnd("loop"); // "loop: 3.5ms"

// Stack trace
console.trace("Where am I?");`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-08-l3-s2",
          title: "DevTools Debugger",
          type: "concept",
          content:
            "Chrome DevTools Sources tab lets you set breakpoints, step through code, inspect variables, and evaluate expressions. Set a breakpoint by clicking the line number. Use the debugger statement in code to pause execution: debugger; — this pauses in DevTools when it is open. This is the most powerful debugging tool available.",
        },
        {
          id: "js-08-l3-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Use console.table, console.group, console.time for structured debugging. Use the debugger statement to pause execution in DevTools. Set breakpoints in the Sources tab for interactive debugging.",
        },
      ],
      keyTakeaway: "console.table/group/time for structured logs. debugger; statement pauses in DevTools. Set breakpoints in Sources tab.",
    },
    {
      id: "js-08-l4",
      order: 4,
      title: "Best Practices",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-08-l4-s1",
          title: "Error Handling Principles",
          type: "concept",
          content:
            "1. Catch only what you can handle — do not swallow errors silently. 2. Be specific — catch specific error types, not everything. 3. Provide meaningful messages — help future you debug. 4. Fail fast — throw early, do not let invalid state propagate. 5. Log errors — even if you handle them, log for debugging. 6. Never throw in catch without re-throwing or logging. 7. Use custom errors for domain logic.",
        },
        {
          id: "js-08-l4-s2",
          title: "Good vs Bad Patterns",
          type: "code",
          content: "Common anti-patterns and their correct alternatives.",
          codeExample: {
            code: `// BAD — swallowing errors silently
try {
  riskyOperation();
} catch (e) {
  // empty catch — error is lost!
}

// GOOD — log and handle
try {
  riskyOperation();
} catch (e) {
  console.error("Operation failed:", e);
  showUserMessage("Something went wrong. Please try again.");
}

// BAD — catching everything the same way
try {
  // 50 lines of code with different risk levels
} catch (e) {
  console.error(e); // no idea what failed
}

// GOOD — specific error handling
try {
  const data = JSON.parse(jsonString);
  const user = transform(data);
} catch (e) {
  if (e instanceof SyntaxError) {
    console.error("Invalid JSON format");
  } else {
    console.error("Transformation failed:", e);
  }
}

// BAD — throwing strings
throw "Something went wrong"; // not an Error object

// GOOD — throw Error objects
throw new Error("Something went wrong");`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-08-l4-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Never swallow errors. Be specific in catch blocks. Throw Error objects, not strings. Fail fast. Log errors even when handling them. Use custom error classes for domain logic.",
        },
      ],
      keyTakeaway: "Never swallow errors. Throw Error objects (not strings). Be specific with instanceof. Fail fast, log always.",
    },
    {
      id: "js-08-l5",
      order: 5,
      title: "Error Handling in Async Code",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-08-l5-s1",
          title: "Async Error Patterns",
          type: "concept",
          content:
            "In async code, errors can come from: network failures, invalid API responses, parsing errors, or unexpected data shapes. Wrap async operations in try/catch. For promises, use .catch(). For async/await, use try/catch. Always provide fallback behavior.",
        },
        {
          id: "js-08-l5-s2",
          title: "Complete Example",
          type: "code",
          content: "A real-world pattern for async error handling.",
          codeExample: {
            code: `async function fetchUserProfile(userId) {
  // Show loading state
  showLoader();
  
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      }
      if (response.status === 401) {
        throw new Error("Please log in");
      }
      throw new Error(\`Server error: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Validate data shape
    if (!data.name || typeof data.name !== "string") {
      throw new Error("Invalid user data received");
    }
    
    return data;
    
  } catch (error) {
    // Handle specific errors
    if (error.message === "User not found") {
      showNotFoundPage();
    } else if (error.message === "Please log in") {
      redirectToLogin();
    } else {
      showGenericError(error.message);
    }
    
    // Re-throw for the caller
    throw error;
    
  } finally {
    // Always hide loader
    hideLoader();
  }
}

// Usage with error handling at the call site
fetchUserProfile(123)
  .then(user => renderProfile(user))
  .catch(error => {
    // Only reaches here if the function re-throws
    console.error("Profile load failed:", error);
  });`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-08-l5-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Wrap async operations in try/catch. Check response.ok. Validate data shapes. Handle specific errors differently. Use finally for cleanup (hide loaders). Re-throw if the caller needs to know.",
        },
      ],
      keyTakeaway: "Async error handling: try/catch around fetch. Check response.ok. Validate data. finally for cleanup. Handle specific errors.",
    },
  ],
  commonMistakes: [
    {
      title: "Swallowing errors with empty catch",
      wrong: "try { riskyOp(); } catch (e) {}",
      right: "try { riskyOp(); } catch (e) { console.error(e); handleError(e); }",
      explanation: "An empty catch block silently swallows errors. You will never know something went wrong. At minimum, log the error. Ideally, also show user feedback or re-throw.",
    },
    {
      title: "Throwing strings instead of Error objects",
      wrong: "throw 'Something went wrong';",
      right: "throw new Error('Something went wrong');",
      explanation: "Throwing a string loses the stack trace and error metadata. Always throw an Error object (or a subclass). This preserves the stack trace and allows instanceof checks.",
    },
    {
      title: "Catching too broadly",
      wrong: "try { 50 lines of mixed code } catch (e) { console.error(e); }",
      right: "try { specific risky operation } catch (e) { handle specific error }",
      explanation: "Wrapping too much code in a single try/catch makes it impossible to know which line failed. Wrap only the specific operation that can throw. Use specific error types with instanceof.",
    },
  ],
  interviewQuestions: [
    {
      question: "What is the difference between throw 'message' and throw new Error('message')?",
      answer:
        "throw new Error('message') creates an Error object with a stack trace, name, and message property. throw 'message' throws a plain string, which loses the stack trace and makes debugging much harder. Always throw Error objects (or subclasses like TypeError) so that catch blocks can access error.stack, error.name, and use instanceof checks.",
    },
    {
      question: "How do you handle errors in async/await?",
      answer:
        "Use try/catch/finally blocks around the async code. try wraps the risky operations (fetch, JSON.parse, etc.), catch handles specific error types with instanceof checks, and finally runs cleanup (hide loaders, close connections). For network requests, always check response.ok before parsing — fetch does not reject on HTTP errors. Re-throw if the caller needs to handle the error too.",
    },
    {
      question: "What is the purpose of the finally block?",
      answer:
        "finally runs regardless of whether the try block succeeded or threw an error. It is used for cleanup operations that must always happen: hiding loading spinners, closing database connections, releasing resources, resetting state. Even if the catch block re-throws the error, finally still executes before the error propagates.",
    },
  ],
  quiz: [
    {
      question: "What does the finally block do?",
      options: [
        "Runs only if try succeeds",
        "Runs only if try throws",
        "Runs regardless of success or error",
        "Runs before try",
      ],
      correctIndex: 2,
      explanation: "finally always runs, regardless of whether the try block succeeded or threw an error. Use it for cleanup: hiding loaders, closing connections, releasing resources.",
    },
    {
      question: "Why should you throw new Error() instead of throw 'message'?",
      options: [
        "It is faster",
        "It preserves the stack trace and error metadata",
        "Strings cannot be caught",
        "It is required by the language",
      ],
      correctIndex: 1,
      explanation: "throw new Error('message') creates an Error object with a stack trace, name, and message. Throwing a plain string loses all this information, making debugging much harder.",
    },
    {
      question: "What is a common error handling anti-pattern?",
      options: [
        "Using try/catch",
        "Logging errors",
        "Empty catch blocks that swallow errors",
        "Creating custom error classes",
      ],
      correctIndex: 2,
      explanation: "Empty catch blocks (try { ... } catch (e) {}) silently swallow errors. The program continues as if nothing happened, but the error is lost forever. Always at least log the error.",
    },
    {
      question: "How do you check for a specific error type in a catch block?",
      options: [
        "error.type === 'TypeError'",
        "error instanceof TypeError",
        "typeof error === 'TypeError'",
        "error.name === TypeError",
      ],
      correctIndex: 1,
      explanation: "Use the instanceof operator: if (error instanceof TypeError). This checks the prototype chain and works with both built-in errors and custom error classes.",
    },
    {
      question: "In async/await, where do you put cleanup code (like hiding a loader)?",
      options: ["In the try block", "In the catch block", "In the finally block", "After the try/catch"],
      correctIndex: 2,
      explanation: "finally runs regardless of success or failure, making it the correct place for cleanup. If you put cleanup in try, it will not run on error. If in catch, it will not run on success. finally guarantees it always runs.",
    },
  ],
  labNotePrompt:
    "Write 3 sentences in English about error handling. Why is it important? What is one best practice you will follow from now on?",
  resources: [
    { label: "MDN: try...catch", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" },
    { label: "MDN: Error object", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" },
    { label: "MDN: console", url: "https://developer.mozilla.org/en-US/docs/Web/API/console" },
    { label: "javascript.info: Error handling", url: "https://javascript.info/try-catch" },
  ],
};
