// Converting Strings to Numbers
Number("3.14"); // returns 3.14
Number(" "); // returns 0
Number(""); // returns 0
Number("99 88"); // returns NaN

// Method	          Description
// Number()	        Returns a number, converted from its argument
// parseFloat()	    Parses a string and returns a floating point number
// parseInt()	      Parses a string and returns an integer

// Converting Numbers to Strings
String(x); // returns a string from a number variable x
String(123); // returns a string from a number literal 123
String(100 + 23); // returns a string from a number from an expression
x.toString();
(123).toString();
(100 + 23).toString();

// Converting Dates to Numbers
d = new Date();
Number(d); // returns 1404568027739
// The date method getTime() does the same.
d.getTime(); // returns 1404568027739

// Converting Dates to Strings
String(Date()); // returns "Thu Jul 17 2014 15:38:19 GMT+0200 (W. Europe Daylight Time)"
Date().toString(); // returns "Thu Jul 17 2014 15:38:19 GMT+0200 (W. Europe Daylight Time)"

// Converting Booleans to Numbers
Number(false); // returns 0
Number(true); // returns 1

// Converting Booleans to Strings
String(false); // returns "false"
String(true); // returns "true"
false.toString(); // returns "false"
true.toString(); // returns "true"

// Automatic Type Conversion
5 + null; // returns 5 because null is converted to 0
"5" + null; // returns "5null" because null is converted to "null"
"5" + 2; // returns "52" because 2 is converted to "2"
"5" - 2; // returns 3 because "5" is converted to 5
"5" * "2"; // returns 10 because "5" and "2" are converted to 5 and 2
