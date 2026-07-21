// ==============================================================
// TERNARY OPERATOR
// ==============================================================
// The ternary operator is a shorthand way of writing an if-else statement. It takes three operands: a condition, an expression to execute if the condition is true and an expression to execute if it's false.

// ​Syntax:
condition ? expressionIfTrue : expressionIfFalse;

// ==============================================================
// BASIC TERNARY OPERATOR (SINGLE CONDITIONS)
// ==============================================================
// Example:
// Let's check if a person is old enough to vote.

const age = 20;

// If age is 18 or older, citizen can vote. Otherwise, they cannot.
const canVote = age >= 18 ? "Yes, you can vote!" : "No, too young.";

console.log(canVote); // Output: "Yes, you can vote!"

// ==============================================================
// CHAINED TERNARY OPERATOR (MULTIPLE CONDITIONS)
// ==============================================================
// If you have multiple conditions (like an if / else if / else structure), you can chain ternary operators by placing a new condition in the "false" slot.

// ​Example:
// Let's assign a letter grade based on a score.
const score = 85;

const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F"; // The final 'else' fallback
console.log(grade); // Output: "B"

// ==============================================================
// CHANGING HTML ELEMENT OR STYLES WITH TERNARY OPERATOR
// ==============================================================
const container = document.querySelector("#container");

container.style.backgroundColor = container.id.length > 10 ? "red" : "green";
container.style.padding = container.id.length > 10 ? "1rem" : "10rem";

// Adding Class Base on Condition with Ternary Operator
container.classList.add(container.id.length < 7 ? "show" : "remove");
