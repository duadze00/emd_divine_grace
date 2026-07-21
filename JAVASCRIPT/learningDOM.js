// DOM manipulation is basically how JavaScript “grabs” an HTML page and changes it in real time. It’s what makes websites interactive—menus opening, forms reacting, content updating, buttons changing, etc.

// 1. DOM = Document Object Model
// When a browser loads HTML, it turns it into a tree structure called the DOM (Document Object Model).
// Example HTML:
// HTML
// <body>
//   <h1>Hello</h1>
//   <button>Click me</button>
// </body>
// Becomes something like:

// document
//  └── body
//       ├── h1
//       └── button
// JavaScript doesn’t “see HTML”—it sees this tree.
// 👉 So DOM manipulation = changing this tree with JavaScript.

// 2. SELECTING ELEMENTS (VERY IMPORTANT)
// Before you change anything, you must select it.
// Most used methods:
// 1. getElementById
JavaScript;
const title = document.getElementById("title");
// 2. querySelector (MOST POWERFUL)
JavaScript;
const title = document.querySelector("#title");
const button = document.querySelector(".btn");
// 3. querySelectorAll (multiple elements)
JavaScript;
const buttons = document.querySelectorAll(".btn");
// 👉 This returns a NodeList (like an array)

// 3. CHANING CONTENT
// Text content
JavaScript;
title.textContent = "New Title";
// HTML content
JavaScript;
title.innerHTML = "<span>New Title</span>";
// 👉 Rule:
// textContent = safe, plain text
// innerHTML = can insert HTML (use carefully)

// 4. CHANING ATTRIBUTES
JavaScript;
const img = document.querySelector("img");

img.src = "new-image.jpg";
img.alt = "New image";
Or: JavaScript;
img.setAttribute("src", "new-image.jpg");
img.getAttribute("src");
img.removeAttribute("src");
// 5. CHANCING STYLES
JavaScript;
title.style.color = "red";
title.style.fontSize = "30px";
title.style.backgroundColor = "black";
// 👉 But professionals don’t rely too much on inline styles.
// Better way → use classes:

// 6. WORKING WITH CLASSES (VERY IMPORTANT)
// Add class
JavaScript;
title.classList.add("active");
// Remove class
JavaScript;
title.classList.remove("active");
// Toggle class (SUPER USEFUL)
JavaScript;
title.classList.toggle("active");
// Check class
JavaScript;
title.classList.contains("active");

// 7. CREATING ELEMENTS (real-world skill)
JavaScript;
const div = document.createElement("div");
div.textContent = "Hello World";
// Then add it to page:
JavaScript;
document.body.appendChild(div);
// Or better:
JavaScript;
parentElement.appendChild(div);

// 8. REMOVING ELEMENTS
JavaScript;
element.remove();
// Or older way:
JavaScript;
parent.removeChild(child);

// 9. EVENTS OR EVENT LISTENERS (VERY IMPORTANT)
// Events = user interactions
// Click event
JavaScript;
button.addEventListener("click", function () {
  alert("Clicked!");
});
// Input event
JavaScript;
input.addEventListener("input", function (e) {
  console.log(e.target.value);
});
// Common events:
// click
// input
// submit
// mouseover
// keydown

// 10. FORMS (VERY IMPORTANT)
JavaScript;
form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop page refresh

  const value = input.value;
  console.log(value);
});
// 👉 preventDefault() is VERY important in real apps.

// 11. DOM TRAVERSAL (pro skill)
// JavaScript
// element.parentElement
// element.children
// element.nextElementSibling
// element.previousElementSibling
// Example:
JavaScript;
const item = document.querySelector(".item");
item.parentElement.style.background = "yellow";

// 12. Advanced DOM patterns (what professionals use)
// 1. Event delegation (VERY IMPORTANT)
// Instead of adding event to many elements:
JavaScript;
document.querySelector(".list").addEventListener("click", function (e) {
  if (e.target.classList.contains("item")) {
    console.log("Item clicked");
  }
});
// 👉 Why this matters:
// faster
// works for dynamic elements
// used in real apps
// 2. Dynamic rendering (like apps do)
JavaScript;
const users = ["Eric", "Ama", "Kofi"];

const list = document.querySelector("ul");

users.forEach((user) => {
  const li = document.createElement("li");
  li.textContent = user;
  list.appendChild(li);
});
// 3. State-driven DOM (modern thinking)
//Instead of manually changing everything:
JavaScript;
let count = 0;

function render() {
  document.querySelector("#count").textContent = count;
}

button.addEventListener("click", () => {
  count++;
  render();
});
// 👉 This is how frameworks like React think.

// 13. Performance tips (pro level)
// Avoid repeated innerHTML updates
// Cache selectors:
// JavaScript
// const btn = document.querySelector(".btn");
// Use documentFragment for many elements:
JavaScript;
const fragment = document.createDocumentFragment();

// 14. Common mistakes beginners make
// ❌ Using too much innerHTML ❌ Not using preventDefault() ❌ Not understanding event bubbling ❌ Re-selecting DOM elements inside loops ❌ Not using classes properly
// 15. Mental model (VERY IMPORTANT)
// Think like this:
// SELECT something

// LISTEN for an event OR DECIDE to change it
// UPDATE DOM

// Example
JavaScript;
const button = document.querySelector("button");

button.addEventListener("click", () => {
  document.body.style.background = "black";
});

// 1. LOCALSTORAGE + DOM (Saving data in the browser)
// What is LocalStorage?
// LocalStorage is a browser storage system that:
// stores data as key–value pairs
// persists even after refresh
// does NOT expire unless you remove it
// Think of it like a small database inside the browser.
// Basic syntax
// Save data
JavaScript;
localStorage.setItem("name", "Eric");
// Get data
JavaScript;
const name = localStorage.getItem("name");
console.log(name);
// Remove data
JavaScript;
localStorage.removeItem("name");
// Clear everything

// JavaScript
localStorage.clear();
// IMPORTANT: LocalStorage only stores STRINGS
// So this will NOT work directly:
JavaScript;
localStorage.setItem("user", { name: "Eric" });
// You must convert objects:
// 1.1 Storing objects (VERY IMPORTANT)
// Save object
JavaScript;
const user = {
  name: "Eric",
  age: 22,
};

localStorage.setItem("user", JSON.stringify(user));
// Retrieve object
JavaScript;
const userData = JSON.parse(localStorage.getItem("user"));

console.log(userData.name);

// 1.2 LocalStorage + DOM (REAL USE CASE)
// Example: Save input text
HTML;
// HTML
// <input id="input" />
// <button id="saveBtn">Save</button>
// <p id="output"></p>
JS;
JavaScript;
const input = document.querySelector("#input");
const button = document.querySelector("#saveBtn");
const output = document.querySelector("#output");

// Load saved value when page opens
const savedText = localStorage.getItem("text");
if (savedText) {
  output.textContent = savedText;
}

button.addEventListener("click", () => {
  const value = input.value;

  // update DOM
  output.textContent = value;

  // save to localStorage
  localStorage.setItem("text", value);
});
// 🔥 What is happening here?
// User types input
// DOM updates instantly
// Data is saved in localStorage
// On refresh → data comes back
// 👉 This is how apps “remember” things
// 1.3 Advanced pattern: To-do list with LocalStorage
// Core idea:
// JavaScript
let todos = JSON.parse(localStorage.getItem("todos")) || [];
// Then:
// update array
// save back to localStorage
// re-render DOM

// 2. ASYNC DOM (Working with time & data)
// What is “Async DOM”?
// It means:
// Updating the DOM after waiting for something (server, API, delay, file, etc.)
// 2.1 setTimeout (basic async)
// JavaScript
setTimeout(() => {
  document.body.innerHTML = "Hello after 3 seconds";
}, 3000);

// 👉 Waits before changing DOM
// 2.2 setInterval (repeating updates)
JavaScript;
setInterval(() => {
  console.log("Running every second");
}, 1000);

// Example: Live clock
JavaScript;
setInterval(() => {
  const now = new Date();
  document.querySelector("#time").textContent = now.toLocaleTimeString();
}, 1000);
// 3. FETCH API (MOST IMPORTANT ASYNC DOM CONCEPT)
// This is how apps get data from internet.
// 3.1 Basic fetch
JavaScript;
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

// 3.2 Async/Await version (MODERN WAY)
JavaScript;
async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  console.log(data);
}

// 3.3 Fetch + DOM (REAL WORLD)
// Example: Render users to page
JavaScript;
async function loadUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  const list = document.querySelector("#list");

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    list.appendChild(li);
  });
}

loadUsers();
// What is happening?
// Wait for data (async)
// Get JSON
// Loop data
// Create DOM elements
// Display on page

// 4. COMBINING EVERYTHING (REAL APP MINDSET)
// Now we mix:
// DOM + Async + LocalStorage
// Example idea:
// fetch users
// display them
// store them locally so they load faster next time
// Pattern:
JavaScript;
async function loadUsers() {
  const cached = localStorage.getItem("users");

  if (cached) {
    render(JSON.parse(cached));
    return;
  }

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  localStorage.setItem("users", JSON.stringify(data));
  render(data);
}

function render(users) {
  const list = document.querySelector("#list");
  list.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    list.appendChild(li);
  });
}

// 5. IMPORTANT CONCEPTS YOU MUST UNDERSTAND
// 5.1 Sync vs Async
Sync(blocking);
JavaScript;
console.log(1);
console.log(2);
console.log(3);
Async(non - blocking);
JavaScript;
console.log(1);

setTimeout(() => {
  console.log(2);
}, 1000);

console.log(3);
// Output:

// 1
// 3
// 2
// 5.2 Why async matters in DOM
// Because:
// API calls take time
// files take time
// user actions happen anytime
// So DOM must wait safely
// 6. REAL WORLD THINKING (VERY IMPORTANT)
// Professional mindset:
// NOT:
// “I change DOM manually”
// BUT:
// “I render UI based on data”
// So:
// Data changes → DOM updates
// Not DOM randomly changing
// 7. WHAT YOU SHOULD PRACTICE NEXT
// Build these 3:
// 1. To-do list app
// add items
// save in localStorage
// reload still keeps data
// 2. Weather app
// fetch API
// display results dynamically
// 3. Notes app
// add/delete notes
// localStorage persistence
