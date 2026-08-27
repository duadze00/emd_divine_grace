// ==================== JS MATH OBJECT ====================
// Syntax
Math.property;

// Math constant property
Math.E; // returns Euler's number
Math.PI; // returns PI
Math.SQRT2; // returns the square root of 2
Math.SQRT1_2; // returns the square root of 1/2
Math.LN2; // returns the natural logarithm of 2
Math.LN10; // returns the natural logarithm of 10
Math.LOG2E; // returns base 2 logarithm of E
Math.LOG10E; // returns base 10 logarithm of E

// Math Methods
// The syntax for Math any methods is : Math.method.(number)

// Number to Integer
// There are 4 common methods to round a number to an integer:

// Math.round(x)	Returns x rounded to its nearest integer
// Math.ceil(x)	  Returns x rounded up to its nearest integer
// Math.floor(x)	Returns x rounded down to its nearest integer
// Math.trunc(x)	Returns the integer part of x

Math.round(4.9); // returns 5
Math.round(4.7); // returns 5
Math.round(4.4); // returns 4
Math.round(4.2); // returns 4
Math.round(-4.2); // returns -4

Math.ceil(4.9); // returns 5
Math.ceil(4.7); // returns 5
Math.ceil(4.4); // returns 5
Math.ceil(4.2); // returns 5
Math.ceil(-4.2); // returns -4

Math.floor(4.9); // returns 4
Math.floor(4.7); // returns 4
Math.floor(4.4); // returns 4
Math.floor(4.2); // returns 4
Math.floor(-4.2); // returns -5

Math.trunc();
Math.trunc(4.9); // returns 4
Math.trunc(4.7); // returns 4
Math.trunc(4.4); // returns 4
Math.trunc(4.2); // returns 4
Math.trunc(-4.2); // returns -4

Math.sign();
// Math.sign(x) returns if x is negative, null or positive:
Math.sign(-4); // returns -1
Math.sign(0); // returns 0
Math.sign(4); // returns 1

Math.pow();
// Math.pow(x, y) returns the value of x to the power of y
Math.pow(8, 2); // returns 64

Math.sqrt();
// Math.sqrt(x) returns the square root of x:
Math.sqrt(64); // returns 8

Math.abs();
// Math.abs(x) returns the absolute (positive) value of x:
Math.abs(-4.7); // returns 4.7

Math.sin();
// Math.sin(x) returns the sine (a value between -1 and 1) of the angle x (given in radians).
// If you want to use degrees instead of radians, you have to convert degrees to radians:

// Angle in radians = Angle in degrees x PI / 180.
Math.sin((90 * Math.PI) / 180); // returns 1 (the sine of 90 degrees)

Math.cos();
// Math.cos(x) returns the cosine (a value between -1 and 1) of the angle x (given in radians).
// If you want to use degrees instead of radians, you have to convert degrees to radians:

// Angle in radians = Angle in degrees x PI / 180.
Math.cos((0 * Math.PI) / 180); // returns 1 (the cos of 0 degrees)

// Math.min() and Math.max()
// Math.min() and Math.max() can be used to find the lowest or highest value in a list of arguments:

Math.min(0, 150, 30, 20, -8, -200); // returns -200
Math.max(0, 150, 30, 20, -8, -200); // returns 150
Math.random();
// Math.random() returns a random number between 0 (inclusive), and 1 (exclusive):
Math.random(); // returns a random number

Math.log();
// Math.log(x) returns the natural logarithm of x:
Math.log(1); // returns 0
// Math.E and Math.log() are twins.
// How many times must we multiply Math.E to get 10?
Math.log(10); // returns 2.302585092994046

Math.log2();
// Math.log2(x) returns the base 2 logarithm of x.
// How many times must we multiply 2 to get 8?
Math.log2(8); // returns 3

Math.log10();
// Math.log10(x) returns the base 10 logarithm of x.
Math.log10(1000); // returns 3

// =============== Math Object Methods=================

// METHOD                     DESCRIPTION
// abs(x)	                    Returns the absolute value of x
// acos(x)	                  Returns the arccosine of x, in radians
// acosh(x)	                  Returns the hyperbolic arccosine of x
// asin(x)	                  Returns the arcsine of x, in radians
// asinh(x)	                  Returns the hyperbolic arcsine of x
// atan(x)	                  Returns the arctangent of x as a numeric value between -PI/2 and PI/2 radians
// atan2(y, x)	              Returns the arctangent of the quotient of its arguments
// atanh(x)	                  Returns the hyperbolic arctangent of x
// cbrt(x)	                  Returns the cubic root of x
// ceil(x)	                  Returns x, rounded upwards to the nearest integer
// cos(x)	                    Returns the cosine of x (x is in radians)
// cosh(x)	                  Returns the hyperbolic cosine of x
// exp(x)	                    Returns the value of Ex
// floor(x)	                  Returns x, rounded downwards to the nearest integer
// log(x)	                    Returns the natural logarithm (base E) of x
// max(x, y, z, ..., n)	      Returns the number with the highest value
// min(x, y, z, ..., n)	      Returns the number with the lowest value
// pow(x, y)	                Returns the value of x to the power of y
// random()	                  Returns a random number between 0 and 1
// round(x)	                  Rounds x to the nearest integer
// sign(x)	                  Returns if x is negative, null or positive (-1, 0, 1)
// sin(x)	                    Returns the sine of x (x is in radians)
// sinh(x)	                  Returns the hyperbolic sine of x
// sqrt(x)	                  Returns the square root of x
// tan(x)	                    Returns the tangent of an angle
// tanh(x)	                  Returns the hyperbolic tangent of a number
// trunc(x)	                  Returns the integer part of a number (x)

Number.isInteger()
Number.isSafeInteger()

let x = 5;
x **= 2; // result 25