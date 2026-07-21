// Declaring a variable
const name = "Eric Mawule Duadze";
const age = 23;
const country = "Ghana";

const sentence = `${23} years old ${name} from ${country}`;
console.log(sentence);

// Swapping two variables
let firstVar = "First";
let secondVar = "Second";

[firstVar, secondVar] = [secondVar, firstVar];
console.log(firstVar);
console.log(secondVar);

// Checking data types
const number = 100.0;
const string = "String";
const boolean = true;
let nothing;

console.log(typeof number);
console.log(typeof string);
console.log(typeof boolean);
console.log(typeof nothing);
console.log(typeof undeclared);

// Type conversion
let strToNumber = "500";
let numberToStr = 2000;

strToNumber = Number(strToNumber);
numberToStr = String(numberToStr);

console.log(typeof strToNumber);
console.log(typeof numberToStr);

// Simple Age calculator
const birthDate = "2000";

function ageCalculator(param) {
  const year = new Date().getFullYear();
  const age =
    param <= 0 || param > year || param === "" || isNaN(param)
      ? "Invalid input"
      : `${year - Number(param)}`;
  console.log(age);
  return age;
}

ageCalculator(birthDate);

// Check input datatype
function checkDatatype(para) {
  const type = typeof para;
  const result =
    para === undefined
      ? `No argument passed into the function but it is ${type}`
      : `"${para}" is a ${type}`;
  return result;
}

console.log(checkDatatype(ageCalculator));
