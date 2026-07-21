let x = 3.14; // A number with decimals
let y = 3; // A number without decimals

let largeNumber = 123e5; // 12300000
let smallNumber = 123e-5; // 0.00123

// NB. These two are different
console.log(10 + 20);
console.log("10" + "20");

// Numeric Strings
let number = 100; // x is a number
let string = "100"; // y is a string

// =========== NaN - Not a Number ===========
let notANumber = "Eric Mawule Duadze";
let aNumber = 100;
// Using isNaN() fnx to find out if a value is a number
if (isNaN(notANumber)) {
  console.log(`${notANumber} is not a number`);
} else {
  console.log(`${notANumber} is a number`);
}

console.log(isNaN(aNumber)); // Will return false because 100 is a number

// =========== Infinity ===========
let myNumber = 2;
let infinityNumber = Infinity;
if (myNumber < infinityNumber) {
  console.log(myNumber - infinityNumber);
}

// =========== Numbers Can be Objects ===========
let numbers = 1234;
let numbersToObject = new Number(number);
console.log(numbersToObject);

// =========== Javascript Number Methods ===========

// The toString() method returns a number as a string.
let numberToString = numbers.toString();
console.log(typeof numberToString);

// toExponential() returns a string, with a number rounded and written using exponential notation.
let exponent = 9.656;
console.log(exponent.toExponential(4));
console.log(exponent.toExponential());

// toFixed() returns a string, with the number written with a specified number of decimals.
let fixed = 9.656;
console.log(fixed.toFixed(0));
console.log(fixed.toFixed(2));

// toPrecision() returns a string, with a number written with a specified length.
let precision = 1.2345;
console.log(precision.toPrecision());
console.log(precision.toPrecision(2));
console.log(precision.toPrecision(3));

// valueOf() returns a number as a number.
let value = 10010;
console.log(value.valueOf());
console.log((11120).valueOf());

// isInteger(): Checks whether a value is an integer.
let integer = 10010;
console.log(Number.isInteger(integer));

// =========== Converting Variables to Numbers ===========
// There are 3 JavaScript methods that can be used to convert variables to numbers:

// 1. The Number() method
// 2. The parseInt() method
// 3. The parseFloat() method

// Number() can be used to convert JavaScript variables to numbers
Number(true); // returns 1
Number(false); // returns 0
Number("10"); // returns 10
Number("  10"); // returns 10
Number("10  "); // returns 10
Number(" 10  "); // returns 10
Number("10.33"); // returns 10.33
Number("10,33"); // returns NaN
Number("10 33"); // returns NaN
Number("John"); // returns NaN

// parseInt() parses a string and returns a whole number. Spaces are allowed. Only the first number is returned
parseInt("-10"); // returns -10
parseInt("-10.33"); // returns -10
parseInt("10"); // returns 10
parseInt("10.33"); // returns 10
parseInt("10 20 30"); // returns 10
parseInt("10 years"); // returns 10
parseInt("years 10"); // returns NaN

// parseFloat() parses a string and returns a number. Spaces are allowed. Only the first number is returned
parseFloat("10"); // returns 10
parseFloat("10.33"); // returns 10.33
parseFloat("10 20 30"); // returns 10
parseFloat("10 years"); // returns 10
parseFloat("years 10"); // returns NaN

// =========== JavaScript MIN_VALUE and MAX_VALUE ===========
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);
