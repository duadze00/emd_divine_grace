// ======================= ARRAY ITERATION =======================
const numbers = [45, 4, 9, 16, 25];

// Array.forEach()
// The forEach() method calls a function (a callback function) once for each array element.

numbers.forEach(forEachFunction);

function forEachFunction(value, index, array) {
  console.log(value);
}

// Array.map()
// The map() method creates a new array by performing a function on each array element.

const numbers2 = numbers.map(mapFunction);

function mapFunction(value, index, array) {
  return value * 2;
}
console.log(numbers2);

const persons = [
  { firstname: "Malcom", lastname: "Reynolds" },
  { firstname: "Kaylee", lastname: "Frye" },
  { firstname: "Jayne", lastname: "Cobb" },
];

let person = persons.map(getFullName);

function getFullName(item) {
  return [item.firstname, item.lastname].join(" ");
}
console.log(person);

// Array.filter()
// The filter() method creates a new array with array elements that passes a test.

const over18 = numbers.filter(filterFunction);

function filterFunction(value, index, array) {
  return value > 18;
}
console.log(over18);

// Array.reduce()
// The reduce() method runs a function on each array element to produce (reduce it to) a single value.

let sum = numbers.reduce(reduceFunction);

function reduceFunction(total, value, index, array) {
  return total + value;
}
console.log(sum);

// The reduce() method can accept an initial value:

let initialSum = numbers.reduce(myFunction, 100);

function myFunction(total, value) {
  return total + value;
}
console.log(initialSum);

// Array.reduceRight()
// The reduceRight() method runs a function on each array element to produce (reduce it to) a single value.

let sum1 = numbers.reduceRight(reduceRightFunction);

function reduceRightFunction(total, value, index, array) {
  return total + value;
}
console.log(sum1);

// Array.every()
// The every() method check if all array values pass a test.

let allOver18 = numbers.every(everyFunction);

function everyFunction(value, index, array) {
  return value > 18;
}
console.log(allOver18);

// Array.some()
// The some() method check if some array values pass a test.

let someOver18 = numbers.some(someFunction);

function someFunction(value, index, array) {
  return value > 18;
}
console.log(someOver18);

// Array.indexOf()
// The indexOf() method searches an array for an element value and returns its position.

// Syntax
// array.indexOf(item, start)

const fruits = ["Apple", "Orange", "Apple", "Mango"];
let indexOf = fruits.indexOf("Apple") + 1;
console.log(indexOf);

// Array.lastIndexOf()
// Array.lastIndexOf() is the same as Array.indexOf(), but returns the position of the last occurrence of the specified element.

let lastIndexOf = fruits.lastIndexOf("Apple") + 1;
console.log(lastIndexOf);

// Array.includes()
// This allows us to check if an element is present in an array (including NaN, unlike indexOf).

// Syntax
// array.includes(search-item)

let include = fruits.includes("Mango");
console.log(include);

// Array.find()
// The find() method returns the value of the first array element that passes a test function.

let first = numbers.find(findFunction);

function findFunction(value, index, array) {
  return value > 18;
}
console.log(first);

// Array.findIndex()
// The findIndex() method returns the index of the first array element that passes a test function.

let findIndex = numbers.findIndex(findInexFunction);

function findInexFunction(value, index, array) {
  return value > 18;
}
console.log(findIndex);

// Array.from()
// The Array.from() method returns an Array object from any object with a length property or any iterable object.

let from = Array.from("ABCDEFG");
console.log(from);

// Array.Keys()
// The Array.keys() method returns an Array Iterator object with the keys of an array.

const keys = fruits.keys();

for (let x of keys) {
  console.log(x);
}

// Array entries()
// Create an Array Iterator, and then iterate over the key/value pairs:

const f = fruits.entries();

for (let x of f) {
  console.log(x);
}

// Array fill()
// The fill() method fills specified elements in an array with a static value.

// Syntax
// array.fill(value, start, end)

// fill() overwrites the original array.

fruits.fill("Kiwi", 3, 4);
console.log(fruits);
fruits.fill("Kiwi");
console.log(fruits);

// ======================= OTHERS =======================

// Array isArray()
// Check whether an object is an array

Array.isArray(fruits); // Returns true

// Array join()
// Convert the elements of an array into a string

// Syntax
// array.join(separator)

console.log(fruits.join());
console.log(fruits.join(" and "));

// Array length
// The length property sets or returns the number of elements in an array.

// Syntax
// Return the length of an array:
// array.length

// Set the length of an array:
// array.length = number

fruits.length; // Returns 4

// Array prototype
// The prototype constructor allows you to add new properties and methods to Arrays.

// Create a method that transforms array values into upper case:
Array.prototype.myUcase = function () {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toUpperCase();
  }
};

// Use the method on any array:
fruits.myUcase();
console.log(fruits);

// Array reverse()
// The reverse() method reverses the order of the elements in an array.

const fruit = ["Banana", "Orange", "Apple", "Mango"];
fruit.reverse();
console.log(fruit);
// reverse() overwrites the original array.

// Array sort()
// The sort() method sorts the elements of an array.

fruit.sort();

// Sort numbers in an array in ascending order:
const points = [40, 100, 1, 5, 25, 10];
points.sort(function (a, b) {
  return a - b;
});

// Sort numbers in an array in descending order:
points.sort(function (a, b) {
  return b - a;
});

// Find the lowest value in an array:
// Sort the numbers in ascending order
points.sort(function (a, b) {
  return a - b;
});
// points[0] = 1 (the lowest value)

// Find the highest value in an array:
// Sort the numbers in descending order:
points.sort(function (a, b) {
  return b - a;
});
// points[0] = 100 (the highest value)

// Find the highest value in an array:

// Sort the numbers in ascending order:
points.sort(function (a, b) {
  return a - b;
});
// points[points.length-1] = 100 (the highest value)

// Sort an array alphabetically, and then reverse the order
fruit.sort();
fruit.reverse();

// Array slice()
// The slice() method returns selected elements in an array, as a new array.

const citrus = fruit.slice(1, 3);

// Array toString()
// The toString() method returns a string with all array values separated by commas.

let text = fruit.toString();
console.log(text)