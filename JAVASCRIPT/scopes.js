// ===== BLOCK SCOPE =====
// Variables declared inside a { } block cannot be accessed from outside the block
{
  let x = 2;
}
// x can NOT be used here

// ===== LOCAL SCOPE =====
// Variables declared within a JavaScript function, become LOCAL to the function

// code here can NOT use carName
function myFunction() {
  let carName = "Volvo";
  // code here CAN use carName
}
// code here can NOT use carName

// ===== FUNCTION SCOPE =====
// Variables declared with var, let and const are quite similar when declared inside a function.

function myFunction() {
  var carName = "Volvo"; // Function Scope
}
function myFunction() {
  let carName = "Volvo"; // Function Scope
}
function myFunction() {
  const carName = "Volvo"; // Function Scope
}

// ===== GLOBAL VARIABLE =====
// A variable declared outside a function, becomes GLOBAL.

let carName = "Volvo";
// code here can use carName
function myFunction() {
  // code here can also use carName
}

// ===== GLOBAL SCOPE ====
// Variables declared with var, let and const are quite similar when declared outside a block

var X = 2; // Global scope
let Y = 2; // Global scope
const Z = 2; // Global scope

// ===== AUTOMATIC GLOBAL =====
// If you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable

myFunction();
// code here can use carName
function myFunction() {
  carName = "Volvo";
}

// ===== GLOBAL VARIABLES IN HTML =====
// With JavaScript, the global scope is the JavaScript environment.

// In HTML, the global scope is the window object.

// Global variables defined with the var keyword belong to the window object
var carName = "Volvo";
// code here can use window.carName

// Global variables defined with the let keyword do not belong to the window object

let carName = "Volvo";
// code here can not use window.carName
