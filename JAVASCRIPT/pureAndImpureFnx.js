// ======================================================
// PURE AND IMPURE FUNCTIONS
// ======================================================

// PURE --> Same input = Same output
// IMPURE --> Same input = Different output

// Pure function: Always returns the same output for the same inputs and does not modify anything itself (no side effects).

function add(a, b) {
  return a + b;
}

console.log(add(2, 5));

// Impure function: Changes external state or depends on external values that may change. These are called side effect

let total = 0;

function addToTotal(num) {
  total += num;
  return total;
}

addToTotal(10);
console.log(total);

function getRandomNumber(num) {
  return Math.floor(Math.random()) * num;
}

console.log(getRandomNumber(10));
