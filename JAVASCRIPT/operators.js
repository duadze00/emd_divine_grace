// =============================== JAVASCRIPT ARITHMETIC OPERATORS =============================

// +	= Addition
// -	= Subtraction
// *	= Multiplication
// **	= Exponentiation (ES2016)
// /	= Division
// %	= Modulus (Division Remainder)
// ++	= Increment
// --	= Decrement
let x = 10;
x += 5;

let y = 5;
y++;
let z = y;

// =============================== JAVASCRIPT ASSIGNMENT OPERATORS =============================

// =	        x = y	      x = y
// +=	x       += y	      x = x + y
// -=	x       -= y	      x = x - y
// *=	x       *= y	      x = x * y
// /=	x       /= y	      x = x / y
// %=	x       %= y	      x = x % y
// **=	      x **=       y	x = x ** y

// =============================== JAVASCRIPT STRING OPERATORS =============================

// The + operator can also be used to add (concatenate) strings.
const name = "Eric Mawule";
const lastName = "Duadze";
const fullName = name + " " + "lastName";
console.log(fullName.toUpperCase());

let text1 = "What a very ";
text1 += "nice day";
console.log(text1);

// =============================== JAVASCRIPT COMPARISON OPERATORS =============================

//  Operator	      Description
//  ==	            equal to
//  ===	          equal value and equal type
//  !=	            not equal
//  !==	          not equal value or not equal type
//  >	            greater than
//  <	            less than
//  >=	            greater than or equal to
//  <=	            less than or equal to
//  ?	            ternary operator

// =============================== JAVASCRIPT LOGICAL OPERATORS =============================

// &&	    logical and
// ||	    logical or
// !	    logical not

// =============================== JAVASCRIPT TYPE OPERATORS =============================

// typeof	        Returns the type of a variable
// instanceof	    Returns true if an object is an instance of an object type
let me = "Eric";
console.log(typeof me);
console.log(typeof me);
console.log(me instanceof String);
