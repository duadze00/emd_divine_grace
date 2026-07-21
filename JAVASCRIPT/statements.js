// ====================================================
// COMPUTER PROGRAM
// ====================================================
// A computer program is a list of "instructions" to be "executed" by a computer.

// ====================================================
// STATEMENTS
// ====================================================
// In a programming language, these programming instructions are called statements.

// A JavaScript program is a list of programming statements.
// JavaScript statements are composed of: Values, Operators, Expressions, Keywords and Comments.

let x, y, z; // Statement 1
x = 5; // Statement 2
y = 6; // Statement 3
z = x + y; // Statement 4

// ====================================================
// SEMICOLONS
// ====================================================
// Semicolons separate JavaScript statements. Add a semicolon at the end of each executable statement.

let a, b, c;
a = 5;
b = 6;
c = a + b;

// ====================================================
// DECLARING A VARIABLE
// ====================================================
var x; // Allow
let y; //Allow
const z; // Error

// ====================================================
// INITIALIZING A VARIABLE
// ====================================================
x = 100;
y = "Eric Mawule Duadze";
z = true;

// ====================================================
// DECLARING AND INITIALIZING A VARIABLE
// ====================================================
var name = "Eric Mawule Duadze";
let age = 23;
const gender = "Male";

// ====================================================
// RE-DECLARING AN EXISTING VARIABLE
// ====================================================
/**
 ** 1. var can be re-declared
 ** 2. let can not be re-declared
 ** 3. const can not be re-declared
 */

//  EXISTING VARIABLES
var name = "Eric Mawule Duadze";
let age = 23;
const gender = "Male";

// RE-DECLARING AN EXISTING VARIABLES
var name = "Kwadwo Duadze"; // Allow
let age = 45; // Error
const gender = "Female"; // Error

// ====================================================
// RE-ASSIGNING AN EXISTING VARIABLE
// ====================================================
/**
 ** 1. var can be re-assigned
 ** 2. let can be re-assigned
 ** 3. const can not be re-assigned
 */

//  EXISTING VARIABLES
var name = "Eric Mawule Duadze";
let age = 23;
const gender = "Male";

// RE-ASSIGNING AN EXISTING VARIABLES
name = "Kwadwo Duadze"; // Allow
age = 45; // Allow
gender = "Female"; // Error
