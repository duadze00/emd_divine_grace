// ========================================== SELECT ELEMENTS FROM THE DOM ==========================================

// Get the Add button
const addBtn = document.querySelector("#add_btn");

// Get the input fields
const leftInput = document.querySelector("#left");
const rightInput = document.querySelector("#right");

// Get the answer field
const answerInput = document.querySelector("#answer");

// ========================================== ADDITION FUNCTION/ ==========================================

function addNumbers() {
  // Convert input values from strings to numbers
  const firstNumber = Number(leftInput.value);
  const secondNumber = Number(rightInput.value);

  // Check if inputs are valid numbers
  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    answerInput.value = "Invalid Input";
    return;
  }

  // Add the two numbers
  const result = firstNumber + secondNumber;

  // Display the result
  answerInput.value = result;
}

// ========================================== EVENT LISTENER ==========================================

// Run addNumbers() whenever the button is clicked
addBtn.addEventListener("click", addNumbers);

// ========================================== DECLARING A FUNCTION ==========================================
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}

// ========================================== INVOKING OR CALLING A FUNCTION ==========================================
let endResult = toCelsius(77);
console.log(endResult);

// ========================================== FUNCTION REST PARAMETER ==========================================
// The rest parameter (...) allows a function to treat an indefinite number of arguments as an array

function sum(...args) {
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}

let x = sum(4, 9, 16, 25, 29, 100, 66, 77);

// ========================================== ASYNC FUNCTION ==========================================

// Waiting for a Timeout
async function myDisplay() {
  let myPromise = new Promise(function (myResolve, myReject) {
    setTimeout(function () {
      myResolve("I love You !!");
    }, 3000);
  });
  document.getElementById("demo").innerHTML = await myPromise;
}

myDisplay();

// ========================= JAVASCRIPT PROMISES =========================
// Promise Syntax
const myPromise = new Promise(function (myResolve, myReject) {
  // "Producing Code" (May take some time)

  myResolve(); // when successful
  myReject(); // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise).
myPromise.then(
  function (value) {
    /* code if successful */
  },
  function (error) {
    /* code if some error */
  },
);

// Using a Promise
const myPromise = new Promise(function (myResolve, myReject) {
  setTimeout(function () {
    myResolve("I love You !!");
  }, 3000);
});

myPromise.then(function (value) {
  document.getElementById("demo").innerHTML = value;
});

let myPromise = new Promise();

myPromise.then();
myPromise.catch();
myPromise.finally();

// ========================================== JAVASCRIPT ASYNCHRONOUS ITERATION ==========================================
// ECMAScript 2018 added asynchronous iterators and iterables.

// With asynchronous iterables, we can use the await keyword in for/of loops.

numbers = [1, 2, 3, 4, 5, 6, 7, 8];
for await (let c of numbers) {
  console.log(c);
}

// ========================================== JAVASCRIPT OBJECT REST PROPERTIES ==========================================
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }

function myFunction(a, b) {
  return arguments.length;
}
console.log(myFunction(1, 2, 3, 4, 5));

// ========================================== FUNCTION PARARAMETERS AND ARGUMENTS ==========================================
function functionName(parameter1, parameter2, parameter3) {
  // code to be executed
}

// ===== Parameter Rules =====
// JavaScript function definitions do not specify data types for parameters.
// JavaScript functions do not perform type checking on the passed arguments.
// JavaScript functions do not check the number of arguments received.

// ===== Default Parameters =====
// If a function is called with missing arguments (less than declared), the missing values are set to undefined.

// Sometimes this is acceptable, but sometimes it is better to assign a default value to the parameter:

// Example
function myFunction(x, y) {
  if (y === undefined) {
    y = 2;
  }
}

// ==== The Arguments Object ====
// JavaScript functions have a built-in object called the arguments object.

// The argument object contains an array of the arguments used when the function was called (invoked).

// This way you can simply use a function to find (for instance) the highest value in a list of numbers:

// Example
let x = findMax(1, 123, 500, 115, 44, 88);

function findMax() {
  let max = -Infinity;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i];
    }
  }
  return max;
}

let x = sumAll(1, 123, 500, 115, 44, 88);

function sumAll() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

function myFunction(a, b) {
  return a * b;
}
window.myFunction(10, 2);    // Will also return 20