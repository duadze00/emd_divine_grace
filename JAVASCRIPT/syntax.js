//  JAVASCRIPT SYNTAX

// =============================== JAVASCRIPT VALUES =============================
/**
 * The JavaScript syntax defines two types of values:
 * * 1. Fixed values
 * * 2. Variable values
 * Fixed values are called Literals.
 * Variable values are called Variables.
 */

// =============================== DECLARING A VARIABLE =============================
var a;
let b;

// =============================== ASSIGNING VALUE TO A VARIABLE =============================
a = 10;
b = 100;
c = 1000;

// =============================== DECLARING AND ASSIGNING VALUE TO A VARIABLE =============================
const x = 120;
const y = 100;

// =============================== USING A VARIABLE =============================
let z = x + y;
console.log(z);

// =============================== STRINGS =============================
const mineName = "Eric Mawule Duadze";
let ourName = "EMD Divine Grace";

// =============================== NUMBERS =============================
const amount = 40.5; // Float
let age = 45; // Integer

// =============================== JAVASCRIPT OPERATORS =============================
// Arithmetic operators ( + - * / % )
const operators = ((5 * 10) % 2) + 100 / 1.5 - 15;
console.log(operators);

// Assignment operators ( = )
z += operators;
console.log(z);

// =============================== JAVASCRIPT EXPRESSION =============================
const name = "John" + " " + "Doe";
console.log(name);

// =============================== JAVASCRIPT COMMENTS =============================
// This is Single line Comment
/*
Multi-line
comment 
*/

// =============================== JAVASCRIPT ARRAY AND OBJECT =============================
// You can create a constant array:
const cars = ["Saab", "Volvo", "BMW"];
// You can change an element:
cars[0] = "Toyota";
// You can add an element:
cars.push("Audi");

// You can create a const object:
const car = { type: "Fiat", model: "500", color: "white" };
// You can change a property:
car.color = "red";
// You can add a property:
car.owner = "Johnson";

// =============================== JAVASCRIPT HOISTING =============================
// Meaning: You can use the variable before it is declared
carName = "Volvo";
var carName;
console.log(carName);

// =============================== HOW TO ADD JAVASCRIPT ===============================
// By adding <script> practice.js </script> to your HTML
<html>
  <head>
    <script> practice.js </script>
  </head>
  <body></body>
</html>;

// =============================== JAVASCRIPT SELECTORS ===============================
document.getElementById("heading");
document.getElementsByClassName("heading1");
document.getElementsByTagName("p");
document.querySelector(".heading2");
document.querySelector("#heading3");
document.querySelectorAll("span");

// =============================== JAVASCRIPT CHANGING HTML ATTRIBUTE VALUES ===============================
let imageEl = document.querySelector("img");
imageEl.setAttribute("src", "../images/adwoa.jpg");
imageEl.src = "../images/adwoa.jpg";
imageEl.setAttribute("class", "open");

// =============================== JAVASCRIPT CHANGING HTML STYLES (CSS) ===============================
const changeFontSize = document.querySelector(".change_font_size");
changeFontSize.style.fontSize = "64px";

// =============================== JAVASCRIPT HIDING HTML ELEMENTS ===============================
document.querySelector(".hide").style.display = "none";

// =============================== JAVASCRIPT SHOW HTML ELEMENTS ===============================
document.querySelector(".hide").style.display = "block";

// =============================== JAVASCRIPT DISPLAY POSSIBILITIES ===============================
/* 
Writing into an HTML element, using innerHTML.
Writing into the HTML output using document.write().
Writing into an alert box, using window.alert().
Writing into the browser console, using console.log().
*/
const add = (document.getElementById("innerHTMl").innerHTML = 5 + 5);
document.write(5 + 6);
window.alert("The window is alerting you");
alert("The window is alerting you, without using the window.alert");
console.log(add);

// =============================== JAVASCRIPT PRINT ===============================
window.print("Eric Mawule Duadze"); // For printing purpose

// =============================== JAVASCRIPT FUNCTION ===============================
function myFunction() {
  document.getElementById("demo1").innerHTML = "Hello Dolly!";
  document.getElementById("demo2").innerHTML = "How are you?";
}
