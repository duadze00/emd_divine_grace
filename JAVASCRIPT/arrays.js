// ========= SYNTAX ===========
const array_name = ["item1", "item2"];

// Eg.
const cars = ["Saab", "Volvo", "BMW"];

// Empty array
const emptyArray = [];

// ============ USING THE JAVASCRIPT KEWYWORD NEW =========
// This creates a new array but slow execution speed. Alway use the method above
const newCars = new Array("Mercedes", "BMW");

// ============ ACCESSING ARRAY ELEMENTS =========
// Accessing with index
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let x = fruits[0];
console.log(x.toLowerCase());
let y = fruits[2];
console.log(y.toUpperCase());
console.log(fruits.indexOf("Orange")); // Getting the index

// Accessing the First Array Element
console.log(fruits[0]); // Returns "Banana"

// Accessing the Last Array Element
console.log(fruits[fruits.length - 1]);

// ============ CHANGING AN ARRAY ELEMENT =========
fruits[3] = "Kwadwo";
console.log(fruits);
fruits[0] = "Vibes";
console.log(fruits);

// ============ ADDING AN ARRAY TO HTML =========
const content = document.querySelector("h1");
content.innerHTML = fruits;

// ============ ARRAY PROPERTIES AND METHODS =========
console.log(fruits.length); // Returns the number of elements
fruits.sort(); // Sorts the array
fruits.reverse(); // Reverse the array
fruits.push("Chilling"); // Add to the last index
fruits.unshift("Cartel"); // Add to the first index
fruits.pop("Chilling"); // Remove last element & return it
fruits.shift("Eric"); // Remove first index & return it
let b = fruits.toString();
console.log(b);
let c = fruits.join(); // join() method also joins all array elements into a string. You can specify separator
console.log(c);
delete fruits[0]; // Delete element at specify index but not good practice
fruits.splice(2, 0, "Lemon", "Kiwi"); // Can be used to add new items to an array
fruits.splice(0, 1); // Removes the first element
const myGirls = ["Cecilie", "Lone"];
const myBoys = ["Emil", "Tobias", "Linus"];
const myChildren = myGirls.concat(myBoys); // Concatenate (join) myGirls and myBoys
console.log(myChildren);
const citrus = fruits.slice(1); // slice() method slices out a piece of an array into a new array.
console.log(citrus);
const citrus1 = fruits.slice(1, 3);
console.log(citrus1);
console.log(typeof fruits);
console.log(Array.isArray(fruits));
console.log(fruits instanceof Array);

// ============ SORT ARRAY IN RANDOM ORDER =========
const randomOrder = [40, 100, 1, 5, 25, 10];
randomOrder.sort(function (a, b) {
  return 0.5 - Math.random();
});
console.log(randomOrder);

const randomOrder1 = [40, 100, 1, 5, 25, 10];
for (let i = randomOrder1.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * i);
  let k = randomOrder1[i];
  randomOrder1[i] = randomOrder1[j];
  randomOrder1[j] = k;
}
console.log(randomOrder1);

// ============ LOOPING THROUGH ARRAY ELEMENTS =========
let fruitsLength = fruits.length;

// Using the for loop
for (let i = 0; i < fruitsLength; i++) {
  console.log(fruits[i]);
}

// Using the Array.forEach() funtion
// NB. The forEach() method calls a function (a callback function) once for each array element.
fruits.forEach((e) => {
  console.log(e);
});

// ============ THE DIFFERENCE BETWEEN ARRAYS AND OBJECTS ============
// In JavaScript, arrays use numbered indexes.
// In JavaScript, objects use named indexes.

// =========== GOOD AND BAD PRACTICE WITH ARRAYS ========
const point = new Array(); // Bad
const points = []; // Good

// =========== FIND THE HIGHEST (OR LOWEST) ARRAY VALUE ===========
const arr = [40, 100, 1, 5, 25, 10];

// You can use Math.max.apply to find the highest number in an array
function myArrayMax(e) {
  return Math.max.apply(null, e);
}
console.log(`The max value is: ${myArrayMax(arr)}`);

// You can use Math.min.apply to find the lowest number in an array
function myArrayMin(e) {
  return Math.min.apply(null, e);
}
console.log(`The min value is: ${myArrayMin(arr)}`);

// =============== JAVASCRIPT ARRAY ITERATION ===============
// Array.forEach()
const numbers = [45, 4, 9, 16, 25];
let txt = [];
numbers.forEach(myFunction);

function myFunction(value) {
  txt.push(value);
}
console.log(txt);

// Array.map()
// The map() method creates a new array by performing a function on each array element.
const numbers2 = numbers.map(myFunction);

function myFunction(value) {
  return value * 2;
}
console.log(numbers2);

// Array.filter()
// The filter() method creates a new array with array elements that passes a test.
const over18 = numbers.filter(myFunction);

function myFunction(value) {
  return value > 18;
}

// Array.reduce()
// The reduce() method runs a function on each array element to produce (reduce it to) a single value.
let sum = numbers.reduce(myFunction);

function myFunction(total, value) {
  return total + value;
}
console.log(sum);

// Array.reduceRight()
// The reduceRight() method runs a function on each array element to produce (reduce it to) a single value.

// The reduceRight() works from right-to-left in the array. See also reduce().
let sum1 = numbers.reduceRight(myFunction);

function myFunction(total, value) {
  return total + value;
}

// Array.every()
// The every() method check if all array values pass a test.
let allOver18 = numbers.every(myFunction);

function myFunction(value) {
  return value > 18;
}
console.log(allOver18);

// Array.some()
// The some() method check if some array values pass a test.
let someOver18 = numbers.some(myFunction);

function myFunction(value) {
  return value > 18;
}
console.log(someOver18);

// Array.indexOf()
// The indexOf() method searches an array for an element value and returns its position.
let position = fruits.indexOf("Apple") + 1;
console.log(position);

// Array.lastIndexOf()
// Array.lastIndexOf() is the same as Array.indexOf(), but returns the position of the last occurrence of the specified element.
let position1 = fruits.lastIndexOf("Apple") + 1;
console.log(position1);

// Array.includes()
// Array.includes() to arrays. This allows us to check if an element is present in an array (including NaN, unlike indexOf).
let v = fruits.includes("Banana");
console.log(v);

// Array.find()
// The find() method returns the value of the first array element that passes a test function.
let find = numbers.find(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
console.log(find);

// Array.findIndex()
// The findIndex() method returns the index of the first array element that passes a test function.
let findIndex = numbers.findIndex(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
console.log(findIndex);

// Array.from()
// The Array.from() method returns an Array object from any object with a length property or any iterable object.

let array = Array.from("ABCDEFG");
console.log(array);

// Array.Keys()
// The Array.keys() method returns an Array Iterator object with the keys of an array.
const key = fruits.keys();

for (const x of key) {
  console.log(x);
}

// ============ FLATTENING AN ARRAY =========
// ONE LEVEL NESTED ARRAY
const arr = [1, 2, [3, 4], 5];
console.log(arr.flat());

// MULTI-LEVEL NESTED ARRAY
const arr1 = [1, [2, [3, 4]]];
console.log(arr1.flat(2));

// INFINITY NESTED ARRAY
const infinityNestedArr = [1, [2, [3, [4, [5]]]]];
console.log(infinityNestedArr.flat(Infinity));
// [1, 2, 3, 4, 5]
