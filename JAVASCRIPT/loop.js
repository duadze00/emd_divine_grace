// ============ DIFFERENT KINKDS OF LOOPS ============
// for    -   loops through a block of code a number of times
// for/in -   loops through the properties of an object
// for/of -   loops through the values of an iterable object
// while  -   loops through a block of code while a specified condition is true
// do/while - also loops through a block of code while a specified condition is true

// ============ FOR LOOP ============
let statement_1;
let statement_2;
let statement_3;

// Styntax
for (statement_1; statement_2; statement_3) {
  // code block to be executed
}

// Example
let myName = "Eric Mawule Duadze";
for (let i = 0; i < myName.length; i++) {
  console.log(myName[i]);
}

// Bad:
for (let i = 0; i < arr.length; i++) {}

// Better Code:
let l = arr.length;
for (let i = 0; i < l; i++) {}

// NB. FOR LOOP IS NOT USED ON OBJECT, ONLY FOR ARRAY

// ===== LOOP SCOPE =====
// Using var in a loop:
var i = 5;
for (var i = 0; i < 10; i++) {
  // some code
}
// Here i is 10

// Using let in a loop:
let i = 5;
for (let i = 0; i < 10; i++) {
  // some code
}
// Here i is 5

// ============ FOR/IN AND FOR/OF LOOPS ============

// THE FOR IN LOOP
// The JavaScript for in statement loops through the properties of an Object

// Syntax
for (key in object) {
  // code block to be executed
}

// Example
const person = { fname: "John", lname: "Doe", age: 25 };
let text = "";
for (let i in person) {
  text += person[i];
}
console.log(text);

// For In Over Arrays
// Syntax
for (variable in array) {
  code;
}

// Example
const numbers = [45, 4, 9, 16, 25];
let txt = "";
for (let x in numbers) {
  txt += numbers[x];
}

// forEach Loop
let fruits = ["Mango", "Banana", "Apple", "Kiwi"];
fruits.forEach((e) => {
  console.log(`${fruits.indexOf(e) + 1}: ${e}`);
});

// THE FOR OF LOOP
// Syntax
for (variable of iterable) {
  // code block to be executed
}
// variable - For every iteration the value of the next property is assigned to the variable. Variable can be declared with const, let, or var.

// iterable - An object that has iterable properties.

// Example
const cars = ["BMW", "Volvo", "Mini"];
for (let x of cars) {
  console.log(x);
}

// Looping over a string
// Example
let language = "JavaScript";
for (let x of language) {
  console.log(x);
}

// ============ WHILE LOOP ============
// The while loop loops through a block of code as long as a specified condition is true.

// Syntax
while (condition) {
  // code block to be executed
}

// Example
let i = 0;
while (i < 10) {
  console.log(`The number is ${i + 1}`);
  i++;
}
// NB. Alway increase or decrease the variable used in the condition else the loop while never end.

// ============ DO WHILE LOOP ============
// The do while loop is a variant of the while loop. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.

// Syntax
do {
  // code block to be executed
} while (condition);

// Example
do {
  console.log(`The number is ${i + 1}`);
  i++;
} while (i < 10);
// NB. Alway increase or decrease the variable used in the condition else the loop while never end.

// ============ BREAK AND CONTINUE ============
// The break statement "jumps out" of a loop.
// The continue statement "jumps over" one iteration in the loop.

// Example
let countries = ["Ghana", "USA", "Germany", "UK", "Canada", "London"];
for (let x = 0; x < countries.length; x++) {
  if (countries[x] == "Ghana") {
    console.log(countries[x]);
    break;
  } else {
    continue;
  }
}

// Example 2
for (let i = 0; i < 10; i++) {
  if (i === 3) {
    console.log(i);
    break;
  } else {
    continue;
  }
}
