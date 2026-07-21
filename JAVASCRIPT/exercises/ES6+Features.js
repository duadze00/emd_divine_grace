// Template Literals
const names = "Eric Mawule Duadze";
console.log(`${names} is my name`);

// Destructuring
function operations() {
  return {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    power: (a, b) => a ** b,
  };
}

const { add, subtract, multiply, power } = operations();
console.log(add(2, 3));
console.log(operations().multiply(2, 3));
console.log(multiply(2, 3));
console.log(subtract(2, 3));
console.log(power(2, 3));

const person = { name: "Eric Mawule Duadze", age: 23 };
const { name: n, age, country = "Ghana" } = person;
console.log(n);
console.log(age);
console.log(country);

// Spread
const mineDetails = { ...person };
console.log(mineDetails);

// Rest
const numbers = [1, 4, 5, 3, 6, 77, 23456, 12];

function restOperator(...numbers) {
  numbers = numbers.flat(Infinity);

  return numbers.reduce((total, value) => total + value, 0);
}

console.log(restOperator(numbers));
console.log(restOperator([1, 4, 5, 3, 6, 77, 23456, 12, [43102]]));

// Modules
import { name } from "./module.js";
import greet from "./module.js";

console.log(name);
console.log(greet(names));
