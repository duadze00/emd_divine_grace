/*
 * ============================================================================
 * THE ULTIMATE GUIDE: ATTRIBUTES VS. DATASET IN JAVASCRIPT
 * ============================================================================
 * Rule of Thumb:
 * - Use ATTRIBUTES for browser configurations (styles, routing, input types).
 * - Use DATASET for custom business data meant solely for your JavaScript.
 */

// Let's create a mockup element in memory to test all concepts
const sampleElement = document.createElement("div");
sampleElement.id = "app-root";

/* ============================================================================
 * GROUP 1: TRADITIONAL HTML ATTRIBUTES
 * ============================================================================
 * Core Concept: Attributes describe the element itself and configure how the
 * browser behaves or looks.
 */

// 1. Defining standard attributes via HTML mockup:
// <img src="cat.jpg" id="image" class="avatar" alt="A cute cat">

const img = document.createElement("img");

// 2. SETTING attributes
img.setAttribute("src", "cat.jpg");
img.setAttribute("id", "image");
img.setAttribute("alt", "A cute cat");

// 3. GETTING attributes
console.log("--- Group 1: Attributes ---");
console.log("Image Source:", img.getAttribute("src")); // Output: cat.jpg

// 4. CHECKING if an attribute exists
if (img.hasAttribute("alt")) {
  console.log("Alt tag is present:", img.getAttribute("alt"));
}

// 5. REMOVING attributes
img.removeAttribute("alt");
console.log("Has alt after removal?", img.hasAttribute("alt")); // Output: false

/* ============================================================================
 * GROUP 2: CUSTOM DATA ATTRIBUTES & THE DATASET OBJECT
 * ============================================================================
 * Core Concept: Custom data attributes use the prefix "data-*". The browser
 * ignores them, leaving them entirely for your JavaScript code to use.
 * JavaScript maps all "data-*" attributes into a single object: element.dataset
 */

// Let's create a mock user card button:
// <button id="userBtn" data-name="Eric" data-country="Ghana" data-age="25"></button>
const userBtn = document.createElement("button");
userBtn.id = "userBtn";
userBtn.setAttribute("data-name", "Eric");
userBtn.setAttribute("data-country", "Ghana");
userBtn.setAttribute("data-age", "25");

console.log("\n--- Group 2: Dataset Basics ---");

// 1. READING all data attributes at once (Returns a DOMStringMap object)
console.log("Complete dataset object:", userBtn.dataset);
/* Output:
   {
     name: "Eric",
     country: "Ghana",
     age: "25"
   }
*/

// 2. READING specific keys
console.log("Name:", userBtn.dataset.name); // Output: Eric
console.log("Country:", userBtn.dataset.country); // Output: Ghana

// 3. WRITING / UPDATING data attributes
userBtn.dataset.country = "Germany";
console.log("Updated Country:", userBtn.dataset.country); // Output: Germany
// Behind the scenes, the HTML has automatically changed to: data-country="Germany"

/* ============================================================================
 * GROUP 3: THE HYPHEN-TO-CAMELCASE CONVERSION RULE
 * ============================================================================
 * Core Concept: HTML attributes are case-insensitive and separate words with
 * hyphens (-). JavaScript properties use camelCase.
 * The dataset API handles this translation automatically.
 */

const complexCard = document.createElement("div");

// HTML: data-user-id  ---> JS: dataset.userId
complexCard.setAttribute("data-user-id", "123");

// HTML: data-first-name ---> JS: dataset.firstName
complexCard.setAttribute("data-first-name", "Alex");

// HTML: data-account-number ---> JS: dataset.accountNumber
complexCard.setAttribute("data-account-number", "998877");

console.log("\n--- Group 3: Hyphen Conversions ---");
console.log("userId:", complexCard.dataset.userId); // Output: 123
console.log("firstName:", complexCard.dataset.firstName); // Output: Alex
console.log("accountNumber:", complexCard.dataset.accountNumber); // Output: 998877

// Writing directly in JS also converts back to hyphens in HTML automatically:
complexCard.dataset.premiumUserStatus = "active";
// HTML Output: data-premium-user-status="active"

/* ============================================================================
 * GROUP 4: ADVANCED DATASET MANIPULATION (LOOPS & DELETION)
 * ============================================================================
 */

console.log("\n--- Group 4: Advanced Loops & Deletion ---");

// 1. Iterating through all data attributes using a for...in loop
for (let key in userBtn.dataset) {
  console.log(`Key in JS: ${key} -> Value: ${userBtn.dataset[key]}`);
}

// 2. Deleting a data attribute dynamically
console.log("Before deleting name:", userBtn.dataset.name); // Output: Eric
delete userBtn.dataset.name;
console.log("After deleting name:", userBtn.dataset.name); // Output: undefined
// The element's HTML no longer contains the data-name attribute.

/* ============================================================================
 * GROUP 5: THE CRITICAL TRAP - EVERY VALUE IS A STRING!
 * ============================================================================
 * Core Concept: HTML reads everything as text. Even if you put numbers or
 * booleans into your dataset, JavaScript evaluates them as data type 'string'.
 */

const systemConfig = document.createElement("div");
systemConfig.setAttribute("data-max-connections", "50");
systemConfig.setAttribute("data-is-admin-mode", "true");

console.log("\n--- Group 5: The String Type Trap ---");
console.log(
  "Type of max-connections:",
  typeof systemConfig.dataset.maxConnections,
); // Output: string
console.log("Type of is-admin-mode:", typeof systemConfig.dataset.isAdminMode); // Output: string

// ❌ WARNING: Direct boolean evaluations will break if you don't parse them!
// "false" is a truthy string in JS.

// ✅ HOW TO FIX IT (Type Casting):
const maxConnections = Number(systemConfig.dataset.maxConnections); // Explicitly cast to Number
const isAdminMode = systemConfig.dataset.isAdminMode === "true"; // Explicitly check value for Boolean

console.log("Fixed Number Type:", typeof maxConnections); // Output: number
console.log("Fixed Boolean Type:", typeof isAdminMode); // Output: boolean

/* ============================================================================
 * GROUP 6: REAL-WORLD IMPLEMENTATION EXAMPLE (E-COMMERCE DATA SYSTEM)
 * ============================================================================
 * Below is a realistic script showing how an e-commerce catalog page handles
 * product information inside data structures seamlessly without hitting databases.
 */

// 1. Mocking our dynamic product element structure
const productUI = document.createElement("div");
productUI.className = "product-card";
productUI.innerHTML = `
    <h3>Wireless Headphones</h3>
    <p>Price: $150</p>
    <button class="buy-btn" 
            data-product-id="prod_8829" 
            data-base-price="150" 
            data-category="electronics">
        Add to Cart
    </button>
`;

// 2. The event handler simulating user actions
function handleAddToCart(event) {
  const targetButton = event.target;

  // Grabbing custom datasets attached to the button
  const id = targetButton.dataset.productId;
  const category = targetButton.dataset.category;

  // Safely converting values away from strings
  const price = Number(targetButton.dataset.basePrice);

  console.log("\n--- Group 6: Real-World E-commerce Processing ---");
  console.log(`Processing Order...`);
  console.log(`Product ID: ${id}`);
  console.log(`Category: ${category}`);
  console.log(`Final Price (with 10% tax calculated via JS): $${price * 1.1}`);
}

// 3. Binding the action
const button = productUI.querySelector(".buy-btn");
button.addEventListener("click", handleAddToCart);

// Programmatically triggering the click event to see the final logs!
button.click();

/**
 * ============================================================================
 * ADVANCED ATTRIBUTES & DATASET: THE PRO LEVEL SCRIPT
 * ============================================================================
 * This covers the missing mechanics: Memory Syncing, Performance, and Security.
 */

const element = document.createElement("div");

/* ============================================================================
 * 1. UNEXPECTED BEHAVIOR: ULTRALIGHT MEMORY SYNCING
 * ============================================================================
 * Changing a data attribute via `dataset` OR `setAttribute` updates the exact
 * same space in the DOM. They are mirrors of each other, not separate storages.
 */
console.log("--- 1. Memory Syncing Proof ---");

// Set using dataset
element.dataset.status = "pending";

// Read using getAttribute — it automatically finds it!
console.log(element.getAttribute("data-status")); // Output: "pending"

// Update using setAttribute
element.setAttribute("data-status", "completed");

// Read using dataset — it updated here too!
console.log(element.dataset.status); // Output: "completed"

/* ============================================================================
 * 2. PERFORMANCE CRITICAL: THE "DOM THRASHING" PROBLEM
 * ============================================================================
 * Every single time you update `element.dataset.something` or `setAttribute`,
 * the browser has to update the actual HTML DOM tree.
 * Doing this inside a fast loop slows down web pages drastically.
 */
console.log("\n--- 2. Performance (Good vs Bad) ---");

// ❌ BAD PRACTICE: Modifying the DOM 1000 times inside a loop
for (let i = 0; i < 1000; i++) {
  element.dataset.index = i; // Causes 1000 browser UI micro-updates
}

// ✅ GOOD PRACTICE: Do all your complex calculations in raw JS variables,
// then update the dataset ONCE at the very end.
let finalIndex = 0;
for (let i = 0; i < 1000; i++) {
  finalIndex = i; // Fast: staying entirely in JavaScript memory
}
element.dataset.index = finalIndex; // Updates the DOM exactly once!

/* ============================================================================
 * 3. SECURITY: DOM XSS (CROSS-SITE SCRIPTING) WARNING
 * ============================================================================
 * Because data attributes are visible in the HTML source code, malicious users
 * can change them manually in their browser inspector.
 * NEVER trust dataset values implicitly if they handle raw HTML rendering.
 */
console.log("\n--- 3. Security (XSS Risk) ---");

// Imagine a hacker changes the data attribute in their browser inspector to this:
element.dataset.username = "<img src='x' onerror='alert(\"Hacked!\")'>";

// ❌ DANGEROUS: Injecting data directly into innerHTML executes malicious code!
// document.body.innerHTML = `<div>Welcome, ${element.dataset.username}</div>`;

// ✅ SAFE: Use textContent. It treats the value strictly as text, rendering the
// dangerous HTML harmlessly as plain text.
const safeDiv = document.createElement("div");
safeDiv.textContent = `Welcome, ${element.dataset.username}`;
console.log("Safe string output:", safeDiv.textContent);

/* ============================================================================
 * SUMMARY CHEATSHEET (The ultimate mental model)
 * ============================================================================
 */
const summary = {
  Performance:
    "Reading/Writing to dataset hits the DOM. Use sparingly in loops.",
  Syncing:
    "dataset.myKey and getAttribute('data-my-key') target the exact same data.",
  Security:
    "Treat dataset data like user input; never blindly trust it inside innerHTML.",
};
console.log("\n--- Summary Cheatsheet ---", summary);

// If an interviewer asks you: "What is the main advantage of dataset.userId over getAttribute('data-user-id')?"
// The Answer: Object manipulation. Because dataset turns your custom data into a standard JavaScript object (DOMStringMap), you can use standard object tools like Object.keys(element.dataset), Object.values() and loops easily. getAttribute can only read one standalone string at a time.
