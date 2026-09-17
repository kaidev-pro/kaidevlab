import type { Module } from "../types";

export const m05DomEvents: Module = {
  id: "js-05-dom-events",
  track: "javascript",
  order: 5,
  title: "DOM & Events",
  subtitle: "Making web pages interactive",
  difficulty: "beginner",
  estimatedTime: "50 min",
  prerequisites: ["js-04-objects"],
  learningObjectives: [
    "Select DOM elements using querySelector and getElementById",
    "Create and modify DOM elements dynamically",
    "Add event listeners for user interactions",
    "Use event delegation for dynamic content",
    "Handle form submissions and input validation",
  ],
  realWorldAnalogy:
    "The DOM is like a family tree of your HTML elements. Each element is a person, and you can find any person by walking down the tree. Events are like doorbells — when a user clicks a button, a doorbell rings, and the event listener (the person inside) responds.",
  whyThisMatters:
    "Even with React and Next.js, understanding the DOM and events is essential. React's synthetic events are based on real DOM events. Knowing how the DOM works helps you debug, optimize performance, and understand why React does things the way it does. Many interview questions cover event delegation and bubbling.",
  lessons: [
    {
      id: "js-05-l1",
      order: 1,
      title: "Selecting Elements",
      estimatedTime: "6 min",
      sections: [
        {
          id: "js-05-l1-s1",
          title: "querySelector and getElementById",
          type: "concept",
          content:
            "The DOM (Document Object Model) is a tree-like representation of your HTML. JavaScript can select any element and modify it. querySelector is the modern, flexible way. getElementById is faster but only works with IDs.",
        },
        {
          id: "js-05-l1-s2",
          title: "Selection Methods",
          type: "code",
          content: "The four main methods for selecting elements.",
          codeExample: {
            code: `// querySelector — returns the FIRST match
const button = document.querySelector("button");
const card = document.querySelector(".card");
const header = document.querySelector("#header");
const firstParagraph = document.querySelector("p.intro");

// querySelectorAll — returns ALL matches (NodeList)
const allButtons = document.querySelectorAll("button");
allButtons.forEach(btn => console.log(btn.textContent));

// getElementById — fastest, only for IDs
const el = document.getElementById("header");

// getElementsByClassName — returns HTMLCollection (live)
const cards = document.getElementsByClassName("card");`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-05-l1-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Use querySelector for single elements (CSS selector syntax). Use querySelectorAll for multiple elements (returns a NodeList you can forEach over). getElementById is fastest but only for IDs.",
        },
      ],
      keyTakeaway: "querySelector = first match. querySelectorAll = all matches (NodeList). getElementById = fastest for IDs.",
    },
    {
      id: "js-05-l2",
      order: 2,
      title: "Creating & Modifying Elements",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-05-l2-s1",
          title: "Creating Elements",
          type: "code",
          content: "Create new elements with document.createElement.",
          codeExample: {
            code: `// Create a new element
const div = document.createElement("div");
div.className = "card";
div.id = "myCard";
div.textContent = "Hello World";

// Set attributes
div.setAttribute("data-role", "container");

// Set styles
div.style.color = "blue";
div.style.padding = "1rem";

// Append to the DOM
document.body.appendChild(div);

// Or insert at a specific position
const parent = document.querySelector("#container");
const reference = document.querySelector("#existing");
parent.insertBefore(div, reference);

// Modern: append, prepend, before, after
parent.append(div);       // at the end
parent.prepend(div);      // at the beginning
div.before(anotherDiv);   // before div
div.after(anotherDiv);    // after div`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-05-l2-s2",
          title: "Modifying Existing Elements",
          type: "code",
          content: "Change content, attributes, classes, and styles.",
          codeExample: {
            code: `const el = document.querySelector(".title");

// Change text
el.textContent = "New Title";

// Change HTML (be careful with XSS!)
el.innerHTML = "<strong>Bold Title</strong>";

// Toggle classes
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("dark");

// Check if has class
if (el.classList.contains("active")) {
  // do something
}

// Set attributes
el.setAttribute("data-id", "123");
el.removeAttribute("data-id");

// Modify styles (use camelCase)
el.style.backgroundColor = "blue";
el.style.fontSize = "18px";`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-05-l2-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "createElement creates new elements. textContent sets text safely (no HTML parsing). classList for classes (add, remove, toggle). style for inline styles (camelCase property names).",
        },
      ],
      keyTakeaway: "createElement + appendChild. textContent = safe text. innerHTML = careful (XSS). classList for classes.",
    },
    {
      id: "js-05-l3",
      order: 3,
      title: "Event Listeners",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-05-l3-s1",
          title: "addEventListener",
          type: "concept",
          content:
            "addEventListener is the modern way to listen for events. It allows multiple listeners on the same element and gives you more control. Always use addEventListener, not onclick attributes.",
        },
        {
          id: "js-05-l3-s2",
          title: "Listening to Events",
          type: "code",
          content: "Common events: click, input, submit, keydown, mouseenter, DOMContentLoaded.",
          codeExample: {
            code: `const button = document.querySelector("button");

// Basic click event
button.addEventListener("click", function(event) {
  console.log("Button clicked!");
  console.log(event.target); // the element that was clicked
});

// Arrow function (preferred)
button.addEventListener("click", (e) => {
  e.preventDefault(); // prevent default behavior
  console.log("Clicked!");
});

// Remove a listener (must reference the same function)
function handleClick(e) {
  console.log("Click");
}
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

// Common events
input.addEventListener("input", (e) => {
  console.log(e.target.value); // current value
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop form reload
  console.log("Form submitted");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") console.log("Escape pressed");
});

// Options object
button.addEventListener("click", handler, { once: true }); // auto-remove after first fire`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-05-l3-s3",
          title: "The Event Object",
          type: "concept",
          content:
            "The event object (e or event) contains information about the event: e.target (the element that triggered the event), e.currentTarget (the element the listener is attached to), e.key (for keyboard events), e.preventDefault() (stop default behavior), e.stopPropagation() (stop the event from bubbling).",
        },
        {
          id: "js-05-l3-s4",
          title: "Key Takeaway",
          type: "summary",
          content:
            "addEventListener('click', handler) is the modern way. The event object has target, currentTarget, preventDefault(), stopPropagation(). Use { once: true } for one-time listeners.",
        },
      ],
      keyTakeaway: "addEventListener is modern. e.target = clicked element. e.preventDefault() = stop default. Use arrow functions for handlers.",
    },
    {
      id: "js-05-l4",
      order: 4,
      title: "Event Delegation",
      estimatedTime: "7 min",
      sections: [
        {
          id: "js-05-l4-s1",
          title: "What is Event Delegation?",
          type: "concept",
          content:
            "Instead of adding a listener to every child element, you add ONE listener to the parent. When any child is clicked, the event bubbles up to the parent. You check e.target to see which child was clicked. This is more efficient and works for dynamically added elements.",
        },
        {
          id: "js-05-l4-s2",
          title: "Event Delegation Example",
          type: "code",
          content: "One listener on the parent handles all children.",
          codeExample: {
            code: `// BAD — add listener to each button
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    console.log(btn.textContent);
  });
});
// Problem: new buttons added later won't have listeners!

// GOOD — event delegation
document.querySelector("#container").addEventListener("click", (e) => {
  // Check if the clicked element is a button
  if (e.target.matches(".btn")) {
    console.log(e.target.textContent);
  }
});
// Works for ALL buttons, even ones added dynamically later!`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-05-l4-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Event delegation: one listener on parent, check e.target for the actual child. More efficient, works for dynamic content. This is a very common interview question.",
        },
      ],
      keyTakeaway: "Event delegation = one listener on parent, check e.target. More efficient + works for dynamically added elements.",
    },
    {
      id: "js-05-l5",
      order: 5,
      title: "Form Handling",
      estimatedTime: "8 min",
      sections: [
        {
          id: "js-05-l5-s1",
          title: "Preventing Default Form Behavior",
          type: "concept",
          content:
            "By default, form submission reloads the page. In modern web apps, you want to handle the submission with JavaScript instead. Use e.preventDefault() to stop the reload, then collect the form data.",
        },
        {
          id: "js-05-l5-s2",
          title: "Form Handling",
          type: "code",
          content: "Collect form data with FormData.",
          codeExample: {
            code: `const form = document.querySelector("#loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload!
  
  // Method 1: FormData (recommended)
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data); // { username: "kai", password: "1234" }
  
  // Method 2: Direct access
  const username = form.querySelector("#username").value;
  const password = form.querySelector("#password").value;
  
  // Validation
  if (!username) {
    showError("Username is required");
    return;
  }
  
  if (password.length < 6) {
    showError("Password must be at least 6 characters");
    return;
  }
  
  // Submit to server
  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
});

// Real-time input validation
const emailInput = document.querySelector("#email");
emailInput.addEventListener("input", (e) => {
  const isValid = e.target.value.includes("@");
  e.target.setCustomValidity(isValid ? "" : "Invalid email");
});`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-05-l5-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Always e.preventDefault() on form submit. Use FormData + Object.fromEntries() to collect all inputs at once. Validate before submitting.",
        },
      ],
      keyTakeaway: "e.preventDefault() on submit. FormData = collect all inputs. Validate before fetch().",
    },
    {
      id: "js-05-l6",
      order: 6,
      title: "Bubbling & Capturing",
      estimatedTime: "6 min",
      sections: [
        {
          id: "js-05-l6-s1",
          title: "Event Propagation",
          type: "concept",
          content:
            "When you click an element, the event does not just fire on that element. It has three phases: 1) Capturing (from the document down to the target), 2) Target (the actual clicked element), 3) Bubbling (from the target back up to the document). Bubbling is the default and the most important phase.",
        },
        {
          id: "js-05-l6-s2",
          title: "Bubbling Example",
          type: "code",
          content: "Events bubble up from child to parent to grandparent.",
          codeExample: {
            code: `<div id="outer">
  <div id="middle">
    <button id="inner">Click me</button>
  </div>
</div>

<script>
// Clicking the button triggers ALL three:
document.querySelector("#inner").addEventListener("click", () => {
  console.log("Inner clicked");
});

document.querySelector("#middle").addEventListener("click", () => {
  console.log("Middle clicked"); // also fires!
});

document.querySelector("#outer").addEventListener("click", () => {
  console.log("Outer clicked"); // also fires!
});

// Output when clicking button:
// Inner clicked
// Middle clicked
// Outer clicked

// Stop bubbling with stopPropagation()
inner.addEventListener("click", (e) => {
  e.stopPropagation(); // middle and outer will NOT fire
});`,
            language: "javascript",
            runnable: false,
          },
        },
        {
          id: "js-05-l6-s3",
          title: "Key Takeaway",
          type: "summary",
          content:
            "Events bubble: child → parent → grandparent. stopPropagation() stops bubbling. Capturing phase goes top-down (rarely used). Most of the time, you only need to understand bubbling.",
        },
      ],
      keyTakeaway: "Bubbling: child → parent → document. stopPropagation() stops it. Capturing: top-down (rarely used).",
    },
  ],
  commonMistakes: [
    {
      title: "Using onclick instead of addEventListener",
      wrong: "button.onclick = function() { ... };",
      right: "button.addEventListener('click', () => { ... });",
      explanation: "onclick only allows ONE handler per element. addEventListener allows multiple and gives more control (options, removal). Always use addEventListener.",
    },
    {
      title: "Not preventing default on form submit",
      wrong: "form.addEventListener('submit', () => { /* fetch */ });",
      right: "form.addEventListener('submit', (e) => { e.preventDefault(); /* fetch */ });",
      explanation: "Without e.preventDefault(), the form submits and the page reloads, losing all JavaScript state. Always prevent default in form submit handlers.",
    },
    {
      title: "Adding listeners to each child instead of using delegation",
      wrong: "buttons.forEach(btn => btn.addEventListener('click', handler));",
      right: "container.addEventListener('click', (e) => { if (e.target.matches('.btn')) handler(e); });",
      explanation: "Adding individual listeners is slower and does not work for dynamically added elements. Event delegation uses one listener on the parent and checks e.target.",
    },
    {
      title: "Using innerHTML with user input (XSS risk)",
      wrong: 'element.innerHTML = userInput;',
      right: 'element.textContent = userInput;',
      explanation: "If userInput contains <script> tags, innerHTML will execute them. This is a Cross-Site Scripting (XSS) vulnerability. Use textContent for user-generated content, or sanitize with a library like DOMPurify.",
    },
  ],
  interviewQuestions: [
    {
      question: "What is event delegation and why is it useful?",
      answer:
        "Event delegation is a pattern where you attach a single event listener to a parent element instead of individual listeners to each child. When a child is clicked, the event bubbles up to the parent, where you check e.target. Benefits: 1) fewer listeners (memory efficient), 2) works for dynamically added elements, 3) easier to manage. This is the basis of how React's event system works.",
    },
    {
      question: "What is the difference between e.target and e.currentTarget?",
      answer:
        "e.target is the element that actually triggered the event (the deepest element clicked). e.currentTarget is the element that the event listener is attached to. In event delegation, e.target is the child that was clicked, and e.currentTarget is the parent that has the listener.",
    },
    {
      question: "What is event bubbling?",
      answer:
        "Event bubbling is the phase where an event propagates from the target element up to the document. If you click a button inside a div inside a section, the click event fires on the button, then the div, then the section. You can stop this with e.stopPropagation(). The opposite phase is capturing (top-down), which is rarely used.",
    },
  ],
  quiz: [
    {
      question: "Which method selects ALL elements matching a CSS selector?",
      options: ["getElementById", "querySelector", "querySelectorAll", "getElementsBySelector"],
      correctIndex: 2,
      explanation: "querySelectorAll returns a NodeList of ALL matching elements. querySelector returns only the first match. getElementById only works with IDs.",
    },
    {
      question: "What does e.preventDefault() do in a form submit handler?",
      options: [
        "Deletes the form",
        "Stops the page from reloading",
        "Prevents form validation",
        "Stops event bubbling",
      ],
      correctIndex: 1,
      explanation: "By default, form submission causes a page reload. e.preventDefault() stops this, allowing you to handle the submission with JavaScript (e.g., fetch API).",
    },
    {
      question: "What is event delegation?",
      options: [
        "Delegating events to a server",
        "One listener on parent, check e.target for child",
        "Using multiple listeners on each child",
        "Removing event listeners",
      ],
      correctIndex: 1,
      explanation: "Event delegation: one listener on the parent element, then check e.target to determine which child was clicked. This is efficient and works for dynamically added elements.",
    },
    {
      question: "What is the difference between e.target and e.currentTarget?",
      options: [
        "They are the same",
        "target = clicked element, currentTarget = element with listener",
        "target = parent, currentTarget = child",
        "target = bubbling, currentTarget = capturing",
      ],
      correctIndex: 1,
      explanation: "e.target is the actual element that was clicked (the deepest element). e.currentTarget is the element that has the event listener attached. They differ when using event delegation.",
    },
    {
      question: "Which property safely sets text content (no XSS risk)?",
      options: ["innerHTML", "innerText", "textContent", "textContent or innerText"],
      correctIndex: 2,
      explanation: "textContent is the safest way to set text — it does not parse HTML, so no XSS risk. innerHTML parses HTML (dangerous with user input). innerText is similar to textContent but slower.",
    },
  ],
  labNotePrompt:
    "Write 3 sentences in English about event delegation. Why is it more efficient than individual listeners? Where would you use it?",
  resources: [
    { label: "MDN: addEventListener", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" },
    { label: "MDN: Event delegation", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events" },
    { label: "javascript.info: DOM Events", url: "https://javascript.info/introduction-browser-events" },
    { label: "MDN: FormData", url: "https://developer.mozilla.org/en-US/docs/Web/API/FormData" },
  ],
};
