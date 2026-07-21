// ========================= ITERATORS =========================
let str = "HELLO WORLD";
console.log(str.charAt(1));
console.log(str.slice(1, 5));
console.log(str.split(" "));
console.log(Array.isArray(str));

let arr = [];

var numbers1 = [45, 4, 9, 16, 25];
numbers1.filter((e) => {
  if (e % 5 === 0) {
    arr.push(e);
  }
});
console.log(arr);

let mapNumber = [];

arr.map((e) => {
  let result = e * 4;
  mapNumber.push(result);
});
console.log(mapNumber);

// ========================= GETTERS AND SETTERS =========================

var person = {
  firstName: "John",
  lastName: "Doe",
  language: "NO",
  get lang() {
    return this.language;
  },
  set lang(value) {
    this.language = value;
  },
};

// Set an object property using a setter:
person.lang = "en";

// Display data from the object using a getter:
document.getElementById("demo").innerHTML = person.lang;

// Object.defineProperty() is a new Object method in ES5.
// It lets you define an object property and/or change a property's value and/or metadata.

// Create an Object:
var person = {
  firstName: "John",
  lastName: "Doe",
  language: "NO",
};

// Change a Property:
Object.defineProperty(person, "language", {
  value: "EN",
  writable: true,
  enumerable: true,
  configurable: true,
});

// Enumerate Properties
var txt = "";
for (var x in person) {
  txt += person[x] + "<br>";
}
document.getElementById("demo").innerHTML = txt;

/// Create an Object:
var person = {
  firstName: "John",
  lastName: "Doe",
  language: "NO",
};

// Change a Property:
Object.defineProperty(person, "language", {
  get: function () {
    return language;
  },
  set: function (value) {
    language = value.toUpperCase();
  },
});

// Change Language
person.language = "en";

// Display Language
document.getElementById("demo").innerHTML = person.language;

// // ========================= OBJECT METHODS =========================
// ES5 added a lot of new Object Methods to JavaScript:

// Managing Objects
// Create object with an existing object as prototype
Object.create(parent, donor);

// Adding or changing an object property
Object.defineProperty(object, property, descriptor);

// Adding or changing object properties
Object.defineProperties(object, descriptors);

// Accessing Properties
Object.getOwnPropertyDescriptor(object, property);

// Returns all properties as an array
Object.getOwnPropertyNames(object);

// Accessing the prototype
Object.getPrototypeOf(object);

// Returns enumerable properties as an array
Object.keys(object);

// Protecting Objects
// Prevents adding properties to an object
Object.preventExtensions(object);

// Returns true if properties can be added to an object
Object.isExtensible(object);

// Prevents changes of object properties (not values)
Object.seal(object);

// Returns true if object is sealed
Object.isSealed(object);

// Prevents any changes to an object
Object.freeze(object);

// Returns true if object is frozen
Object.isFrozen(object);

// ========================= OBJECT =========================

// JSON Objects:
// Allowed:
var person = '{"firstName":"John", "lastName":"Doe", "age":46}';
JSON.parse(person);

// Not allowed:
var person = '{"firstName":"John", "lastName":"Doe", "age":46,}';
JSON.parse(person);

// JSON Arrays:
// Allowed:
points = [40, 100, 1, 5, 25, 10];

// Not allowed:
points = [40, 100, 1, 5, 25, 10,];

// ========================= ARROW FUNCTIONS =========================
// Arrow functions allows a short syntax for writing function expressions.

// You don't need the function keyword, the return keyword, and the curly brackets.

// Arrow functions do not have their own this

// ES5
var x = function (x, y) {
  return x * y;
};

// ES6
const x = (x, y) => x * y;

// ========================= JAVASCRIPT MAP OBJECTS =========================
// Create Objects
const apples = { name: "Apples" };
const bananas = { name: "Bananas" };
const oranges = { name: "Oranges" };

// Create a new Map
const fruits = new Map();

// Add new Elements to the Map
fruits.set(apples, 500);
fruits.set(bananas, 300);
fruits.set(oranges, 200);

// ========================= JAVASCRIPT SET OBJECTS =========================
// Create a Set
const letters = new Set();

// Add some values to the Set
letters.add("a");
letters.add("b");
letters.add("c");

