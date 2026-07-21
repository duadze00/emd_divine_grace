// ====================== HOISTING ======================
// Hoisting is JavaScript's default behavior of moving declarations to the top.

// VAR HOISTING
console.log(name);
var name = "Eric";

// JAVASCRIPT SEES IT LIKE
var name; // memory allocation
console.log(name); // undefined
name = "Eric";

// OUTPUT
undefined;

// LET HOISTING
console.log(name);
let name = "Eric";

// OUTPUT
ReferenceError;

// JAVASCRIPT SEES IT LIKE
// TDZ starts
console.log(name); // Error
let name = "Eric";
// TDZ ends

// CONST HOISTING
console.log(age);
const age = 20;

// OUTPUT
ReferenceError;

// JAVASCRIPT SEES IT LIKE
// TDZ starts
console.log(age); // Error
const age = 20;
// TDZ ends

// FUNCTION DECLARATION HOISTING
greet();
function greet() {
  console.log("Hello");
}

// OUTPUT
// Hello

// JAVASCRIPT INTERNALLY
function greet() {
  console.log("Hello");
}
greet();

// FUNCTION EXPRESSION HOISTING
greet();
var greet = function () {
  console.log("Hello");
};

// OUTPUT
// TypeError: greet is not a function

// JAVASCRIPT SEES IT LIKE
var greet;
greet(); // undefined()
greet = function () {
  console.log("Hello");
};

// ARROW FUNCTION HOISTING
sayHi();
const sayHi = () => {
  console.log("Hi");
};

// OUTPUT
ReferenceError;

// ================== TEMPORAL DEAD ZONE (TDZ) ==================
// The TDZ is the period between:
{
  // TDZ begins
  console.log(name); // Error
  let name = "Eric";
  // TDZ ends
}

// ================== GOOD PRACTICE ==================
// 1. Declare variables before using them
const user = "Eric";
console.log(user);

// 2. Use const by default
const PI = 3.14;
const names = ["Eric", "John"];

// 3. Use let when reassignment is needed
let score = 0;
score += 10;

// 4. Keep functions above usage when possible
function calculateTotal(a, b) {
  return a + b;
}
console.log(calculateTotal(5, 3));

// 5. Prefer Function Declarations for reusable functions
function multiply(a, b) {
  return a * b;
}

// ================== BAD PRACTICE ==================
// 1. Don't rely on var hoisting
console.log(username);
var username = "Eric";

// 2. Don't access let or const before declaration
console.log(age);
let age = 25;

// 3. Don't call function expressions before creation
sayHello();

const sayHello = () => {
  console.log("Hello");
};

// 4. Don't mix var and let unnecessarily
var score = 10;
let score2 = 20;
// Modern JavaScript rarely needs var.
