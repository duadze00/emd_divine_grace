// A regular expression is a sequence of characters that forms a search pattern.

// Regular expressions can be used to perform all types of text search and text replace operations.

// Syntax:  /pattern/modifiers;

// ===== Using String Methods =====

// In JavaScript, regular expressions are often used with the two string methods: search() and replace().

// The search() method uses an expression to search for a match and returns the position of the match.

// The replace() method returns a modified string where the pattern is replaced.

// ===== Using String search() With a String ====
// The search() method searches a string for a specified value and returns the position of the match

// Example. Use a string to do a search for "W3schools" in a string

let text = "Visit W3Schools!";
let n = text.search("W3Schools");
console.log(n);

// ===== Using String search() With a Regular Expression =====
// Example. Use a regular expression to do a case-insensitive search for "w3schools" in a string

let text1 = "Visit W3Schools!";
let m = text1.search(/w3schools/i);
console.log(m);
// NB. The /i make it case insensitive

// ===== Using String replace() With a String =====
// The replace() method replaces a specified value with another value in a string

let text2 = "Visit Microsoft!";
let o = text2.replace("Microsoft", "W3Schools");
console.log(o);

// ===== Use String replace() With a Regular Expression =====
// Example. Use a case insensitive regular expression to replace Microsoft with W3Schools in a string

let text3 = "Visit Microsoft!";
let result = text3.replace(/microsoft/i, "W3Schools");
console.log(result);

// REGULAR EXPRESSION MODIFIERS: Modifiers can be used to perform case-insensitive more global searches

// MODIFIER	          DESCRIPTION
// i	                Perform case-insensitive matching
// g	                Perform a global match (find all matches rather than stopping after the first match)
// m	                Perform multiline matching

// REGULAR EXPRESSION PATTERNS: Brackets are used to find a range of characters

// EXPRESSION     DESCRIPTION
// [abc]	        Find any of the characters between the brackets
// [0-9]	        Find any of the digits between the brackets
// [^abc]	        Find any character NOT between the brackets
// [^0-9]	        Find any character NOT between the brackets (any non-digit)
// (x|y)	        Find any of the alternatives separated with |

// METACHARACTERS: Are characters with a special meaning

// METACHARACTER	  DESCRIPTION
// \d	              Find a digit
// \s	              Find a whitespace character
// \b	              Find a match at the beginning of a word like this: \bWORD, or at the end of a word like this: WORD\b
// \uxxxx	          Find the Unicode character specified by the hexadecimal number xxxx

// QUANTIFIERS: Define quantities

// QUANTIFIERS	    DESCRIPTION
// n+	              Matches any string that contains at least one n
// n*	              Matches any string that contains zero or more occurrences of n
// n?	              Matches any string that contains zero or one occurrences of n

// ======================== USING THE RegExp OBJECT ========================
// RegExp object is a regular expression object with predefined properties and methods

// ===== Using test() =====
// It searches a string for a pattern and returns true or false, depending on the result
const pattern = /e/;
pattern.test("The best things in life are free!");
// OR
/e/.test("The best things in life are free!");

// ===== Using exec() =====
// It searches a string for a specified pattern and returns the found text as an object.

// If no match is found, it returns an empty (null) object.
/e/.exec("The best things in life are free!");

// ===== Using compile() =====
// Eg. Do a global search for "man" in a string, and replace it with "person". Then change the regular expression and replace either "man" or "woman" with "person", with the compile() method

var str = "Every man in the world! Every woman on earth!";
var patt = /man/g;
var str2 = str.replace(patt, "person");
document.write(str2 + "<br>");

patt = /(wo)?man/g;
patt.compile(patt);
str2 = str.replace(patt, "person");
document.write(str2);

// ===== Using exec() =====
// Eg. Return the string value of the regular expression

var patt1 = new RegExp("Hello World", "g");
var res = patt1.toString();
