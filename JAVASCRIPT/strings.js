let carName1 = "Volvo XC60"; // Double quotes
let carName2 = "Volvo XC60"; // Single quotes

// Quotes inside a string
let answer1 = "It's alright";
let answer2 = "He is called 'Johnny'";
let answer3 = 'He is called "Johnny"';

// Length of a string
let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
console.log(text.length);
console.log(answer3.length); // NB. Quotes are included in the counting

// Escaping a character
console.log("Eric\"s\" Duadze"); // The backslash (\) escape character
console.log("Eric\\s Duadze");

// Strings Can be Objects
let firstName = "John"; // Normal string
console.log(typeof firstName);
console.log(firstName);

let secondName = new String("John"); // String converted to object the the new keyword
console.log(typeof secondName);
console.log(secondName);

// ================== JavaScript String Methods ==================

// Length
console.log(firstName.length);

// Extracting String Parts
// 1. slice(start, end)
// 2. substring(start, end)
// 3. substr(start, length)
console.log(firstName.slice(1));
let str = "Apple, Banana, Kiwi";
console.log(str.slice(7, 13));
console.log(str.slice(-12, -6));
console.log(str.slice(-12));
console.log(str.substring(7, 13)); // Can not accept negative number
console.log(str.substring(7));
console.log(str.substr(7, 6));

// Replace String Content
let myName = "Eric Mawule Duadze";
let newMyName = myName.replace("Eric", "Kwadwo");
console.log(newMyName);

// Converting to Upper and Lower Case
console.log(newMyName.toLowerCase());
console.log(myName.toUpperCase());

// The concat() Method
let text1 = "Hello";
let text2 = "World";
let text3 = text1.concat(" ", text2);
console.log(text3);

// Removing whitespace
let our = "              Rich Man          ";
console.log(our.trim()); // Remove white space from both sides
console.log(our.trimEnd()); // Remove white space from end
console.log(our.trimStart()); // Remove white space from start

// JavaScript String Padding
let padding = "5";
console.log(padding.padStart(4, 0)); // Add zero's to the start
console.log(padding.padEnd(4, 0)); // Add zero's to the end
console.log(padding.padEnd(9, 1));

// Extracting String Characters
// 1. charAt(position)
// 2. charCodeAt(position)
// 3. Property access [ ]
let greet = "HELLO WORLD";
console.log(greet.charAt(1));
console.log(greet.charAt(3));
console.log(greet[0]);
console.log(greet[0]);
console.log(greet.charCodeAt(0)); // Return unicode of specified character

// Splitting a String
let split = "Eric Mawule, Kwadwo Duadze is very brilliant | and love coding";
console.log(split.split(" ")); // split base on space
console.log(split.split(",")); // split base on ,
console.log(split.split("|")); // split base on |
console.log(split.split("")); // split base on characters
console.log(split.split("M")); // split base on M

// JavaScript String Search
let search = "Lorem Ipsum Loacel Desingo Lavarole Dimarco Loacel";
console.log(search.indexOf("Loacel"));
console.log(search.lastIndexOf("Loacel"));
console.log(search.indexOf("Eric"));
console.log(search.lastIndexOf("Eric"));
console.log(search.search("Loacel"));
console.log(search.match("/em/g"));
console.log(search.includes("Lorem"));
console.log(search.includes("Lorem", 0));
console.log(search.startsWith("Lorem"));
console.log(search.startsWith("Lorem", 1));
console.log(search.endsWith("Lorem"));
console.log(search.endsWith("Lorem", -1));


// =================== TEMPLATE LITERALS ===================
// Synonyms: Template Literals, Template Strings, String Templates, Back-Tics Syntax

const template = "Eric Mawule Duadze";
const job = "Diagnostic medical sonograher";
console.log(`My name is ${template} and I'm a ${job.toLowerCase()}.`);

// Back-Tics Syntax
let back_tics = `Hello World`;

// Interpolation
let interpolate = `${back_tics}`;
console.log(interpolate);

let price = 10;
let VAT = 0.25;
let total = `Total: ${(price * (1 + VAT)).toFixed(2)}`;
console.log(total);

