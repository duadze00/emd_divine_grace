// =========================================================================
// LEVEL 1: BASIC FUNDAMENTALS (THE CORE BASICS)
// =========================================================================

// 1. Creation & Basic Key-Value Pairs
const smartphone = {
  brand: "Apple",
  model: "iPhone 15",
  storageGB: 128,
  "is 5G Enabled": true, // Keys with spaces must be wrapped in strings
};

// 2. Reading Properties (Dot vs. Bracket Notation)
console.log(smartphone.brand); // Apple (Dot notation: cleanest, standard)
console.log(smartphone["storageGB"]); // 128 (Bracket notation)
console.log(smartphone["is 5G Enabled"]); // true (Bracket notation is REQUIRED for keys with spaces)

// 3. Modifying and Adding Properties
smartphone.storageGB = 256; // Modifies existing property
smartphone.color = "Deep Black"; // Adds a brand new property dynamically
delete smartphone["is 5G Enabled"]; // Deletes a property entirely

console.log(smartphone);

// =========================================================================
// NESTING, METHODS & SHORTHANDS
// =========================================================================

const managerName = "Sophia";
const roleKey = "jobTitle";

const employee = {
  name: "Alex",
  // A. Property Shorthand: If variable name matches key name, just write it once
  managerName,

  // B. Computed Property Names: Evaluate expressions inside brackets [] to create dynamic keys
  [roleKey]: "Senior Engineer",
  ["department_" + "ID"]: 404, // Evaluates to department_ID: 404

  // C. Nested Objects: Objects inside objects
  address: {
    city: "Accra",
    country: "Ghana",
  },

  // D. ES6 Method Shorthand: Defining functions cleanly without the ": function" keyword
  getProfile() {
    // 'this' refers to the current object context
    return `${this.name} works as a ${this.jobTitle} in ${this.address.city}.`;
  },
};

console.log(employee.jobTitle); // "Senior Engineer"
console.log(employee.department_ID); // 404
console.log(employee.getProfile()); // "Alex works as a Senior Engineer in Accra."

// =========================================================================
// LOOPING, DESTRUCTURING & REFERENCES
// =========================================================================

const laptop = { os: "Linux", ram: 16, price: 1200 };

// 1. Destructuring: Extracting values into variables cleanly
const { os, ram } = laptop;
console.log(`OS: ${os}, RAM: ${ram}GB`); // OS: Linux, RAM: 16GB

// 2. Renaming during destructuring & adding fallback defaults
const { price: cost, discount = 0 } = laptop;
console.log(`Cost: $${cost}, Discount: ${discount}%`); // Cost: $1200, Discount: 0%

// 3. Object Iteration: How to loop through an object's keys, values, or pairs
console.log("Keys:", Object.keys(laptop)); // ['os', 'ram', 'price']
console.log("Values:", Object.values(laptop)); // ['Linux', 16, 1200]
console.log("Entries:", Object.entries(laptop)); // Array of [key, value] pairs

// Looping through pairs cleanly using destructuring inside a loop
for (const [key, value] of Object.entries(laptop)) {
  console.log(`  - ${key.toUpperCase()}: ${value}`);
}

// 4. Memory References vs. Cloning
const original = { score: 90 };
const reference = original; // DOES NOT COPY! Points to the exact same memory drawer.
reference.score = 100;
console.log("Original Score (Accidentally changed):", original.score); // 100

// How to properly clone/merge objects using the Spread Operator (...)
const realClone = { ...original, attempts: 2 };
realClone.score = 45; // Changes only the clone
console.log("Original after safe clone modification:", original.score); // Still 100
console.log("Clone Score:", realClone.score); // 45

// =========================================================================
// FREEZING, SEALING & SAFETY
// =========================================================================

const configuration = { apiEndpoint: "https://api.v1.com", timeout: 5000 };

// 1. Object.freeze(): Makes an object completely immutable (Read-only)
Object.freeze(configuration);
configuration.timeout = 3000; // Silently fails (or throws error in 'use strict' mode)
configuration.newKey = "test"; // Silently fails to add
console.log("Frozen Object remains untouched:", configuration.timeout); // 5000

// 2. Object.seal(): Allows updating existing values, but blocks adding/deleting properties
const userSession = { status: "active" };
Object.seal(userSession);
userSession.status = "expired"; // Allowed!
delete userSession.status; // Blocked!
console.log("Sealed Object (Modified but structure preserved):", userSession); // { status: "expired" }

// 3. Optional Chaining (?.): Essential safety net to avoid runtime crashes
const databaseResponse = {
  user: {
    profile: null, // profile details missing from database
  },
};

// Without Optional Chaining, the line below would crash your whole server/app:
// console.log(databaseResponse.user.profile.location);

// With Optional Chaining, it gracefully returns undefined if anything along the path is null/undefined:
console.log("Safe Deep Access:", databaseResponse.user?.profile?.location); // undefined

// =========================================================================
// SENIOR ARCHITECTURE 
// =========================================================================

// 1. Getters and Setters (Computed properties masquerading as fields)
const bankAccount = {
  owner: "Eric MD",
  balanceGHS: 5000,

  // A 'getter' allows you to read a method like a regular property (no parentheses needed!)
  get formattedBalance() {
    return `₵${this.balanceGHS}.00`;
  },

  // A 'setter' intercepts a value when someone tries to reassign it, allowing validation
  set deposit(amount) {
    if (amount <= 0) {
      console.error("Deposit must be positive!");
    } else {
      this.balanceGHS += amount;
    }
  },
};

console.log(bankAccount.formattedBalance); // Output: ₵5000.00 (Notice: NO parentheses used!)
bankAccount.deposit = 1500; // Triggers the setter function
console.log(bankAccount.formattedBalance); // Output: ₵6500.00

// 2. Object Property Descriptors (Under-the-hood Metadata)
// Every object property has hidden flags: writable, enumerable, and configurable.
const product = { name: "Laptop" };

Object.defineProperty(product, "id", {
  value: 999,
  writable: false, // Cannot be changed
  enumerable: false, // Will be hidden from loops like for...in or Object.keys()
  configurable: false, // Cannot be deleted
});

product.id = 111; // Fails silently (or throws an error in strict mode)
console.log("Hidden/Read-only ID:", product.id); // Output: 999
console.log("Keys found:", Object.keys(product)); // Output: ['name'] (id is hidden from loops!)

// 3. Object Comparison Gotcha (Memory Addresses)
// In JavaScript, objects are compared by their MEMORY REFERENCE, not their values.
const objA = { code: 1 };
const objB = { code: 1 };
const objC = objA;

console.log("Are identical objects equal?", objA === objB); // false! They live in different memory slots.
console.log("Are referenced objects equal?", objA === objC); // true! They point to the exact same drawer.

// Job-Ready Trick: Quick deep value comparison using JSON strings
console.log(
  "Value Comparison Check:",
  JSON.stringify(objA) === JSON.stringify(objB),
); // true

// 4. Object Rest Pattern (Splitting an object up)
const productDetails = {
  title: "Wireless Mouse",
  sku: "MS-102",
  inventory: 45,
  warehouseRow: "B5",
};

// Destructure what you want, collect the REST into a brand new object using '...'
const { title, sku, ...shippingData } = productDetails;

console.log("Extracted Title:", title); // "Wireless Mouse"
console.log("Collected Shipping Data:", shippingData); // { inventory: 45, warehouseRow: 'B5' }

// 5. Prototype Links (Object.create)
// Objects can inherit directly from other objects without using ES6 Classes.
const animal = {
  isLiving: true,
  eat() {
    return "Chomp chomp";
  },
};

// Create a new object literal linked via the prototype chain to 'animal'
const dog = Object.create(animal);
dog.breed = "Golden Retriever";

console.log(dog.breed); // "Golden Retriever" (Its own property)
console.log(dog.isLiving); // true (Inherited up the chain from animal)
console.log(dog.eat()); // "Chomp chomp"
