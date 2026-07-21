/***********************************************************************************************
 ** COMPREHENSIVE JAVASCRIPT TYPE CHECKING GUIDE
 ** Use these patterns to validate inputs and prevent runtime crashes.
 ***********************************************************************************************/

// ==========================================
// 1. PRIMITIVE TYPES (The Simple Checks)
// ==========================================

// --- Strings ---
const exactString = "Hello";
const objectString = new String("Hello"); // Rare, but possible
console.log(typeof exactString === "string"); // true
// Catching both literal strings and String objects:
console.log(typeof exactString === "string" || exactString instanceof String); // true

// --- Numbers ---
// Regular numbers, NaN, and Infinity are ALL technically 'number' to JavaScript.
const validNum = 42;
const nanValue = NaN;

console.log(typeof validNum === "number" && Number.isFinite(validNum)); // true (Safe, real number)
console.log(Number.isNaN(nanValue)); // true (Always use Number.isNaN, not standard equality)

// --- BigInt (Large Integers) ---
const bigIntNum = 9007199254740991n;
console.log(typeof bigIntNum === "bigint"); // true

// --- Booleans ---
const isTrue = true;
console.log(typeof isTrue === "boolean"); // true

// --- Symbols ---
const uniqueKey = Symbol("id");
console.log(typeof uniqueKey === "symbol"); // true

// --- Undefined ---
let notDefined;
console.log(typeof notDefined === "undefined"); // true

// ==========================================
// 2. THE CHAMELEONS (Null & Arrays)
// ==========================================

// --- Null ---
// BUG ALERT: typeof null returns 'object'. This is a 30-year-old JavaScript bug.
const emptyValue = null;
console.log(emptyValue === null); // true (Strict equality is the only safe way)

// --- Arrays ---
// BUG ALERT: typeof [] returns 'object'.
const list = [1, 2, 3];
console.log(Array.isArray(list)); // true (Always use this built-in method)

// ==========================================
// 3. COMPLEX OBJECTS & SPECIAL INSTANCES
// ==========================================

// --- Plain Objects (POJOs) ---
// We want to verify it's a true {} and not null, an array, or a date.
const user = { name: "Alex" };
const isPlainObject = (val) =>
  val !== null &&
  typeof val === "object" &&
  !Array.isArray(val) &&
  !(val instanceof Date);
console.log(isPlainObject(user)); // true

// --- Dates ---
const today = new Date();
console.log(today instanceof Date && !isNaN(today)); // true (Ensures it's a date AND not an "Invalid Date")

// --- Functions / Async Functions / Generators ---
const standardFn = () => {};
async function asyncFn() {}
console.log(typeof standardFn === "function"); // true
console.log(typeof asyncFn === "function"); // true (Async functions are still functions)

// --- Regular Expressions (RegEx) ---
const regex = /abc/g;
console.log(regex instanceof RegExp); // true

// ==========================================
// 4. ERROR HANDLING AND CLASSES
// ==========================================

// --- Custom/Built-in Errors ---
// Critical for your try/catch blocks!
try {
  throw new TypeError("Invalid configuration");
} catch (error) {
  if (error instanceof TypeError) {
    console.log("Handled a specific Type Error");
  } else if (error instanceof Error) {
    console.log("Handled a generic Error");
  }
}

// --- Custom Classes ---
class Vehicle {}
class Car extends Vehicle {}

const myCar = new Car();
console.log(myCar instanceof Car); // true
console.log(myCar instanceof Vehicle); // true (Inheritance works perfectly with instanceof)

// ==========================================
// 5. THE HOLY GRAIL: THE "ULTIMATE" TYPE CHECKER
// ==========================================
// If you don't want to memorize all the rules above, use this bulletproof function.
// It extracts the internal [[Class]] property that JavaScript uses under the hood.

function getExactType(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  // Returns things like '[object Array]', '[object RegExp]', '[object Arguments]'
  const rawString = Object.prototype.toString.call(value);

  // Clean it up to just return 'array', 'regexp', 'date', 'number', etc.
  return rawString.slice(8, -1).toLowerCase();
}

// Test driving the ultimate checker:
console.log(getExactType([])); // "array"
console.log(getExactType(new Date())); // "date"
console.log(getExactType(/test/)); // "regexp"
console.log(getExactType(null)); // "null"
console.log(getExactType(42)); // "number"
console.log(getExactType(NaN)); // "number" (Note: NaN is still a number type, use Number.isNaN alongside this)
