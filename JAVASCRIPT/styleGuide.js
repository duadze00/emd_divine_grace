// ===== Variable Names =====
// At W3schools we use camelCase for identifier names (variables and functions).
// All names start with a letter.
let firstName = "John";
let lastName = "Doe";

let price = 19.9;
let tax = 0.2;

let fullPrice = price + price * tax;

// ===== Spaces Around Operators =====
// Always put spaces around operators ( = + - * / ), and after commas
let x = y + z;
const myArray = ["Volvo", "Saab", "Fiat"];

// ===== Code Indentation =====
// Always use 2 spaces for indentation of code blocks
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}

// ===== Statement Rules =====
// General rules for simple statements: Always end a simple statement with a semicolon (;)
const cars = ["Volvo", "Saab", "Fiat"];

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

// General rules for complex (compound) statements:

// Put the opening bracket at the end of the first line.
// Use one space before the opening bracket.
// Put the closing bracket on a new line, without leading spaces.
// Do not end a complex statement with a semicolon.

// Functions:
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}

// Conditionals:
if (time < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}

// Object Rules
// General rules for object definitions:

// Place the opening bracket on the same line as the object name.
// Use colon plus one space between each property and its value.
// Use quotes around string values, not around numeric values.
// Do not add a comma after the last property-value pair.
// Place the closing bracket on a new line, without leading spaces.
// Always end an object definition with a semicolon.

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

// Short objects can be written compressed, on one line, using spaces only between properties, like this:

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

//  =====Line Length < 80 =====
// For readability, avoid lines longer than 80 characters.

// If a JavaScript statement does not fit on one line, the best place to break it, is after an operator or a comma.

document.getElementById("demo").innerHTML = "Hello Dolly.";

// ===== Naming Conventions =====
// Always use the same naming convention for all your code. For example:

//  * Variable and function names written as camelCase
//  * Global variables written in UPPERCASE (We don't, but it's quite common)
//  * Constants (like PI) written in UPPERCASE

// Loading JavaScript in HTML
// Use simple syntax for loading external scripts (the type attribute is not necessary):

<script src="myscript.js"></script>;

// ===== Accessing HTML Elements =====
// A consequence of using "untidy" HTML styles, might result in JavaScript errors.

// These two JavaScript statements will produce different results:

const obj = getElementById("Demo");
const obj = getElementById("demo");

// ==================== GOOD PRACTICE ====================
// ===== Declarations on Top =====
// It is a good coding practice to put all declarations at the top of each script or function.

// This will:
//  # Give cleaner code
//  # Provide a single place to look for local variables
//  # Make it easier to avoid unwanted (implied) global variables
//  # Reduce the possibility of unwanted re-declarations

// Declare at the beginning
let firstName, lastName, price, discount, fullPrice;

// Use later
firstName = "John";
lastName = "Doe";

price = 19.9;
discount = 0.1;

fullPrice = price - discount;

// This also goes for loop variables:
for (let i = 0; i < 5; i++) {}

// ===== Initialize Variables =====
// It is a good coding practice to initialize variables when you declare them.

// This will:
// Give cleaner code
// Provide a single place to initialize variables
// Avoid undefined values

// Declare and initiate at the beginning
let firstName = "";
let lastName = "";
let price = 0;
let discount = 0;
let fullPrice = 0;
const myArray = [];
const myObject = {};

// ===== Declare Objects with const =====
// Declaring objects with const will prevent any accidential change of type

let car = { type: "Fiat", model: "500", color: "white" };
car = "Fiat"; // Changes object to string

const car = { type: "Fiat", model: "500", color: "white" };
car = "Fiat"; // Not possible
// ===== Declare Arrays with const =====
// Declaring arrays with const will prevent any accidential change of type

let cars = ["Saab", "Volvo", "BMW"];
cars = 3; // Changes array to number

const cars = ["Saab", "Volvo", "BMW"];
cars = 3; // Not possible

// Don't Use new Object()
// Use "" instead of new String()
// Use 0 instead of new Number()
// Use false instead of new Boolean()
// Use {} instead of new Object()
// Use [] instead of new Array()
// Use /()/ instead of new RegExp()
// Use function (){} instead of new Function()

let x1 = ""; // new primitive string
let x2 = 0; // new primitive number
let x3 = false; // new primitive boolean
const x4 = {}; // new object
const x5 = []; // new array object
const x6 = /()/; // new regexp object
const x7 = function () {}; // new function object

// ===== Beware of Automatic Type Conversions =====
// JavaScript is loosely typed.
// A variables can contain all data types.
// A variable can change its data type:

let x = "Hello"; // typeof x is a string
x = 5; // changes typeof x to a number

// Beware that numbers can accidentally be converted to strings or NaN (Not a Number).
// When doing mathematical operations, JavaScript can convert numbers to strings:

let x = 5 + 7; // x.valueOf() is 12,  typeof x is a number
let x = 5 + "7"; // x.valueOf() is 57,  typeof x is a string
let x = "5" + 7; // x.valueOf() is 57,  typeof x is a string
let x = 5 - 7; // x.valueOf() is -2,  typeof x is a number
let x = 5 - "7"; // x.valueOf() is -2,  typeof x is a number
let x = "5" - 7; // x.valueOf() is -2,  typeof x is a number
let x = 5 - "x"; // x.valueOf() is NaN, typeof x is a number

// Subtracting a string from a string, does not generate an error but returns NaN (Not a Number):

"Hello" - "Dolly"; // returns NaN
// Use === Comparison
// The == comparison operator always converts (to matching types) before comparison.

// The === operator forces comparison of values and type:

Example;
0 == ""; // true
1 == "1"; // true
1 == true; // true

0 === ""; // false
1 === "1"; // false
1 === true; // false

// ===== Use Parameter Defaults =====
// If a function is called with a missing argument, the value of the missing argument is set to undefined.

// Undefined values can break your code. It is a good habit to assign default values to arguments.

function myFunction(x, y) {
  if (y === undefined) {
    y = 0;
  }
}
// ECMAScript 2015 allows default parameters in the function definition:

function defaulParameters(a = 1, b = 1) {
  /*function code*/
}
// Read more about function parameters and arguments at Function Parameters

// End Your Switches with Defaults
// Always end your switch statements with a default. Even if you think there is no need for it.

switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
    break;
  default:
    day = "Unknown";
}

// ===== Avoid Number, String, and Boolean as Objects =====
// Always treat numbers, strings, or booleans as primitive values. Not as objects.

// Declaring these types as objects, slows down execution speed, and produces nasty side effects:

let x = "John";
let y = new String("John");
x === y; // is false because x is a string and y is an object.
// Or even worse:

let x = new String("John");
let y = new String("John");
x == y; // is false because you cannot compare objects.

// ===== Avoid Using eval() =====
// The eval() function is used to run text as code. In almost all cases, it should not be necessary to use it.

// Because it allows arbitrary code to be run, it also represents a security problem.

// ===== Misunderstanding Floats =====
let x = 0.1;
let y = 0.2;
let z = x + y; // the result in z will not be 0.3
// To solve the problem above, it helps to multiply and divide:

let z = (x * 10 + y * 10) / 10; // z will be 0.3
