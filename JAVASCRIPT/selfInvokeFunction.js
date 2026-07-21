// =======================================================================================
// SELF-INVOKING FUNCTION (ALSO CALLED AN IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE))
// =======================================================================================

// A self-invoking function (also called an Immediately Invoked Function Expression (IIFE)) is a function that runs immediately after it is defined.

// =====================================================
// GENERAL SYNTAX
// =====================================================
(function (parameters) {
  // code
})(arguments);

// OR

((parameters) => {
  // code
})(arguments);

// =====================================================
// TRADITIONAL FUNCTION IIFE
// =====================================================
(function () {
  console.log("Hello, World!");
})();

// =====================================================
// ARROW FUNCTION IIFE
// =====================================================
(() => {
  console.log("Hello, World!");
})();

// =====================================================
// IIFE WITH PARAMETERS
// =====================================================
(function (name) {
  console.log(`Hello ${name}`);
})("Eric");

// =====================================================
// ARROW IIFE WITH PARAMETERS
// =====================================================
((name) => {
  console.log(`Hello ${name}`);
})("Eric");

// =====================================================
// RETURNING A VALUE
// =====================================================
const result = (() => {
  return 5 + 10;
})();

console.log(result);
