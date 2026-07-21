// ====================== TYPEOF ======================

// ========= DATA TYPES =========
// In JavaScript there are 5 different data types that can contain values:

// 1. string
// 2. number
// 3. boolean
// 4. object
// 5. function

// ========= OBJECT TYPES =========
// There are 6 types of objects:

// 1. Object
// 2. Date
// 3. Array
// 4. String
// 5. Number
// 6. Boolean

// ========= DATA TYPES THAT CANNOT CONTAIN VALUES =========
// And 2 data types that cannot contain values:

// 1. null
// 2. undefined

typeof "John"; // Returns "string"
typeof 3.14; // Returns "number"
typeof NaN; // Returns "number"
typeof false; // Returns "boolean"
typeof [1, 2, 3, 4]; // Returns "object"
typeof { name: "John", age: 34 }; // Returns "object"
typeof new Date(); // Returns "object"
typeof function () {}; // Returns "function"
typeof myCar; // Returns "undefined" *
typeof null; // Returns "object"

// Primitive Data
// A primitive data value is a single simple data value with no additional properties and methods.
// The typeof operator can return one of these primitive types:

// 1. string
// 2. number
// 3. boolean
// 4. undefined

typeof "John"; // Returns "string"
typeof 3.14; // Returns "number"
typeof true; // Returns "boolean"
typeof false; // Returns "boolean"
typeof x; // Returns "undefined" (if x has no

// Complex Data
// The typeof operator can return one of two complex types:

// 1. function
// 2. object
// The typeof operator returns "object" for objects, arrays, and null.
// The typeof operator does not return "object" for functions.

typeof { name: "John", age: 34 }; // Returns "object"
typeof [1, 2, 3, 4]; // Returns "object" (not "array", see note below)
typeof null; // Returns "object"
typeof function myFunc() {}; // Returns "function"

// ========= THE CONSTRUCTOR PROPERTY =========

// The constructor property returns the constructor function for all JavaScript variables.

function hello() {
  return "Hello World!";
}
console.log(hello.constructor);
console.log("Eric Mawule Duadze".constructor);
console.log([].constructor);
console.log({}.constructor);
console.log(false.constructor);
console.log((1).constructor);
console.log([].forEach.constructor);
console.log(this.constructor);

// Check if an objection is array function.
function isArray(myArray) {
  return myArray.constructor === Array;
}

// Check if an objection is date function.
function isDate(myDate) {
  return myDate.constructor === Date;
}

// ========= UNDEFINED =========
// A variable without a value, has the value undefined
let car; // Value is undefined, type is undefined

// ========= EMPTY VALUES =========
// An empty value has nothing to do with undefined
let car1 = ""; // The value is "", the typeof is "string"

// ========= NULL =========
// In JavaScript null is "nothing". It is supposed to be something that doesn't exist.
// Unfortunately, in JavaScript, the data type of null is an object.
// You can empty an object by setting it to null

let person = { firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue" };
person = null; // Now value is null, but type is still an object

// ========= Difference Between Undefined and Null =========
// undefined and null are equal in value but different in type
typeof undefined; // undefined
typeof null; // object

null === undefined; // false
null == undefined; // true
