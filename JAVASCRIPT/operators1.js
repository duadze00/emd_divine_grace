// ============================================ THE ULTIMATE JAVASCRIPT OPERATORS MASTERCLASS ============================================

// ============================================================================
// 1. ARITHMETIC OPERATORS
// ============================================================================

let a = 10;
let b = 3;

console.log(a + b); // 13 -> Addition
console.log(a - b); // 7  -> Subtraction
console.log(a * b); // 30 -> Multiplication
console.log(a / b); // 3.3333333333333335 -> Division
console.log(a % b); // 1  -> Remainder (Modulus)
console.log(a ** b); // 1000 -> Exponentiation (10 to the power of 3)

// Increment & Decrement (Crucial Interview Gotcha: Post vs Pre)
let x = 5;
let y = x++; // Post-increment: Assigns first (y = 5), then increments x (x = 6)
console.log(`x: ${x}, y: ${y}`); // x: 6, y: 5

let m = 5;
let n = ++m; // Pre-increment: Increments first (m = 6), then assigns (n = 6)
console.log(`m: ${m}, n: ${n}`); // m: 6, n: 6

// ============================================================================
// 2. ASSIGNMENT OPERATORS (With Compound Shorthands)
// ============================================================================

let score = 10;
score += 5; // Same as: score = score + 5  (15)
score -= 2; // Same as: score = score - 2  (13)
score *= 2; // Same as: score = score * 2  (26)
score /= 2; // Same as: score = score / 2  (13)
score %= 5; // Same as: score = score % 5  (3)
score **= 2; // Same as: score = score ** 2 (9)

// ============================================================================
// 3. COMPARISON OPERATORS (The Coercion Minefield)
// ============================================================================

// Loose Equality (==) vs Strict Equality (===)
// RULE OF THUMB FOR JOBS: Always use === and !==. Never use == unless intentionally bypassing type checking.

console.log(5 == "5"); // true  -> Coerces string to number
console.log(5 === "5"); // false -> Strict check: types must match (Number vs String)

console.log(0 == false); // true  -> Coercion quirk
console.log(0 === false); // false -> Different types

console.log(null == undefined); // true  -> JavaScript spec quirk
console.log(null === undefined); // false -> Different types

// Relational
console.log(10 > 5); // true
console.log(10 >= 10); // true
console.log(5 < 3); // false

// ============================================================================
// 4. LOGICAL OPERATORS & SHORT-CIRCUITING
// ============================================================================

// Logical AND (&&): Returns the FIRST falsy value, or the LAST truthy value if all are truthy.
// In React, this is heavily used for conditional rendering.
console.log("Apple" && 0 && "Orange"); // 0 (Short-circuits immediately at 0)
console.log("Apple" && "Banana" && "Cherry"); // "Cherry" (All truthy, returns last)

// Logical OR (||): Returns the FIRST truthy value, or the LAST falsy value if all are falsy.
// Frequently used to provide default values.
console.log("" || "Default User"); // "Default User" (empty string is falsy)
console.log(0 || false || "Fallback"); // "Fallback"

// ============================================================================
// 5. MODERN OPERATORS (THE TRIPLE THREAT: ?., ??, ||=)
// ============================================================================

// A. OPTIONAL CHAINING (?.)
// Prevents "Cannot read properties of undefined (reading '...')" crashes when traversing deep objects.
const user = {
  name: "Alice",
  address: {
    city: "Gotham",
  },
  // profile is missing
};

// Old painful way to avoid crashes:
const zipOld = user.profile && user.profile.zip;

// Modern Production-grade Way:
const zipNew = user.profile?.zip;
console.log(zipNew); // undefined (No crash! It safely stops evaluated at user.profile)

// Works with dynamic brackets and functions too:
const functionResult = user.getAnalytics?.(); // undefined (Safely ignores if not a function)

// B. NULLISH COALESCING (??)
// Fixes a massive bug with the Logical OR (||) operator.
// OR (||) treats 0, false, and "" as falsy, which breaks when those are VALID inputs.
// Nullish Coalescing (??) ONLY falls back on `null` or `undefined`.

const serverConfig = {
  animationSpeed: 0, // 0 is a valid setting!
  isPremium: false, // false is a valid setting!
  title: "", // empty string is a valid setting!
};

// Buggy legacy way:
console.log(serverConfig.animationSpeed || 300); // 300 (Bug! User explicitly wanted 0)
console.log(serverConfig.isPremium || true); // true (Bug!)

// Correct modern way:
console.log(serverConfig.animationSpeed ?? 300); // 0 (Correct!)
console.log(serverConfig.isPremium ?? true); // false (Correct!)
console.log(serverConfig.title ?? "Untitled"); // "" (Correct!)
console.log(serverConfig.missingProperty ?? "Default"); // "Default"

// C. LOGICAL ASSIGNMENT OPERATORS (ES2021)
// Shorthands that combine logical operators with assignments.
let maxPlayers = 0;
maxPlayers ||= 10; // Same as: maxPlayers = maxPlayers || 10
console.log(maxPlayers); // 10 (because 0 is falsy for ||)

let currentScore = 0;
currentScore ??= 50; // Same as: currentScore = currentScore ?? 50
console.log(currentScore); // 0 (because 0 is not null or undefined)

// ============================================================================
// 6. TERNARY (CONDITIONAL) OPERATOR
// ============================================================================
// Condition ? Express_If_True : Expression_If_False

const age = 20;
const status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// ============================================================================
// 7. BITWISE OPERATORS (Rare in web apps, common in game dev & cryptography)
// ============================================================================
// Operates on 32-bit binary representations of numbers.

let bitA = 5; // Binary: 0101
let bitB = 3; // Binary: 0011

console.log(bitA & bitB); // 1  -> AND (Both bits must be 1: 0001)
console.log(bitA | bitB); // 7  -> OR  (Either bit can be 1: 0111)
console.log(bitA ^ bitB); // 6  -> XOR (Bits must be different: 0110)
console.log(~bitA); // -6 -> NOT (Inverts all bits)
console.log(bitA << 1); // 10 -> Left Shift (Shifts bits left by 1, doubles the number)

// ============================================================================
// 8. UNARY OPERATORS (Single Operand Operations)
// ============================================================================

// Unary Plus (+): Quickest way to cast a string or boolean to a number in JS.
console.log(+"42"); // 42 (Number)
console.log(+true); // 1
console.log(+false); // 0

// Unary Negation (-): Converts to number and negates it.
console.log(-"10"); // -10

// Logical NOT (!): Inverts truthiness. Double NOT (!!) is used to quickly convert to actual boolean.
console.log(!"hello"); // false
console.log(!!"hello"); // true (Converts any value to its native boolean equivalent)

// typeof Operator
console.log(typeof "text"); // "string"
console.log(typeof 42); // "number"
console.log(typeof null); // "object" -> (Famous historical JS bug you must know for interviews!)

// delete Operator (Removes a property from an object)
const employee = { id: 101, role: "Admin" };
delete employee.role;
console.log(employee); // { id: 101 }

// ============================================================================
// 9. STRING & SPREAD/REST OPERATORS
// ============================================================================

// String Concatenation (+)
console.log("Hello " + "World"); // "Hello World"

// Spread Operator (...) -> Expands arrays/objects into elements
const numbers = [1, 2, 3];
const combined = [...numbers, 4, 5]; // [1, 2, 3, 4, 5]

const baseConfig = { theme: "dark" };
const finalConfig = { ...baseConfig, layout: "grid" }; // { theme: "dark", layout: "grid" }

// Rest Operator (...) -> Gathers elements into an array/object
const [first, ...restOfArray] = [10, 20, 30, 40];
console.log(first); // 10
console.log(restOfArray); // [20, 30, 40]

// ============================================================================
// 10. RELATIONAL & ADVANCED OPERATORS
// ============================================================================

// `in` operator: Checks if a property exists in an object
const car = { make: "Tesla", model: "Y" };
console.log("make" in car); // true
console.log("year" in car); // false

// `instanceof` operator: Checks if an object is an instance of a specific class/constructor
class Developer {}
const me = new Developer();
console.log(me instanceof Developer); // true
console.log(me instanceof Array); // false

// Comma Operator (,) -> Evaluates multiple expressions, returns the last one
let evaluation = (10 + 2, 5 + 5);
console.log(evaluation); // 10 (evaluated 12, then evaluated 10, returned 10)

// ============================================================================
// SUMMARY TRIVIA FOR THE INTERVIEW ROOM
// ============================================================================
/*
  1. What is operator precedence? 
     It determines the order in which operators are evaluated (like PEMDAS in math).
     Multiplication (*) beats addition (+). Grouping with () beats everything.
     
  2. What is associativity?
     If operators have the same precedence, associativity decides the direction:
     Left-to-right: (10 - 5 - 2) evaluates as ((10 - 5) - 2)
     Right-to-left: Assignment and Ternary (a = b = c) evaluates as (a = (b = c))
*/
