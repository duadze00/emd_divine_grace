// ==========================================
// OBJECT BASICS
// ==========================================

// An object stores data in key-value pairs
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};
console.log(person);

// ==========================================
// ACCESSING PROPERTIES
// ==========================================

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
};

// Dot notation
console.log(person.firstName);

// Bracket notation
console.log(person["lastName"]);

// Using variables
const key = "age";
console.log(person[key]);

// ==========================================
// MODIFYING OBJECTS
// ==========================================

const person = {
  firstName: "John",
  age: 50,
};

// Add property
person.country = "Ghana";

// Update property
person.age = 25;

// Delete property
delete person.country;

console.log(person);

// ==========================================
// OBJECT REFERENCES (MUTATION)
// ==========================================

const person = {
  name: "John",
  age: 50,
};

// x DOES NOT create a copy
const x = person;

x.age = 10;

console.log(person.age); // 10
console.log(x.age); // 10

// ==========================================
// LOOPING THROUGH OBJECTS
// ==========================================

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
};

for (let key in person) {
  console.log(key, person[key]);
}

// ==========================================
// OBJECT METHODS
// ==========================================

const person = {
  firstName: "Eric",
  lastName: "Duadze",

  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

console.log(person.fullName());

// ==========================================
// THIS KEYWORD
// ==========================================

const person = {
  firstName: "Eric",
  lastName: "Duadze",

  fullName() {
    return this.firstName + " " + this.lastName;
  },
};
// this refers to the object calling the method
console.log(person.fullName());

// ==========================================
// NESTED OBJECTS
// ==========================================

const person = {
  name: "John",
  cars: {
    car1: "Ford",
    car2: "BMW",
    car3: "Fiat",
  },
};

console.log(person.cars.car2);
console.log(person.cars["car2"]);

// ==========================================
// NESTED ARRAYS + OBJECTS
// ==========================================

const person = {
  name: "John",
  cars: [
    {
      name: "Ford",
      models: ["Fiesta", "Focus", "Mustang"],
    },

    {
      name: "BMW",
      models: ["320", "X3", "X5"],
    },
  ],
};

for (let car of person.cars) {
  console.log(car.name);
  for (let model of car.models) {
    console.log(model);
  }
}

// ==========================================
// OBJECT.VALUES()
// ==========================================

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
};

console.log(Object.values(person));

// ==========================================
// GETTERS
// ==========================================

const person = {
  firstName: "John",
  lastName: "Doe",
  get fullName() {
    return this.firstName + " " + this.lastName;
  },
};

console.log(person.fullName);

// ==========================================
// SETTERS
// ==========================================

const person = {
  language: "",
  set lang(value) {
    this.language = value;
  },
};
person.lang = "en";
console.log(person.language);

// ==========================================
// METHODS VS GETTERS
// ==========================================

// Method
const person1 = {
  firstName: "John",
  lastName: "Doe",
  fullName() {
    return this.firstName + " " + this.lastName;
  },
};
console.log(person1.fullName());

// Getter
const person2 = {
  firstName: "John",
  lastName: "Doe",

  get fullName() {
    return this.firstName + " " + this.lastName;
  },
};

console.log(person2.fullName);

// ==========================================
// CONSTRUCTOR FUNCTIONS
// ==========================================

// Person constructor
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

// Objects
const person1 = new Person("John", "Doe", 50);
const person2 = new Person("Eric", "Duadze", 24);

console.log(person1);
console.log(person2);

// ==========================================
// METHODS INSIDE CONSTRUCTORS
// ==========================================

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  // A method in the constructor
  this.fullName = function () {
    return this.firstName + " " + this.lastName;
  };
}

// Object
const person = new Person("John", "Doe");
console.log(person.fullName());

// ==========================================
// PROTOTYPES
// ==========================================

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// Property shared by all objects
Person.prototype.country = "Ghana";

// Method shared by all objects
Person.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

// Object
const person = new Person("Eric", "Duadze");
console.log(person.country);
console.log(person.fullName());

// ==========================================
// OBJECT.CREATE()
// ==========================================

const person = {
  greet() {
    console.log("Hello");
  },
};

const student = Object.create(person);
student.greet();

// ==========================================
// OBJECT.DEFINEPROPERTY()
// ==========================================

const person = {
  firstName: "John",
};
Object.defineProperty(person, "country", {
  value: "Ghana",
  writable: false,
});

console.log(person.country);

// ==========================================
// OBJECT METHODS
// ==========================================

Object.keys(obj);
Object.values(obj);
Object.getOwnPropertyNames(obj);
Object.getPrototypeOf(obj);

// ==========================================
// PROTECTING OBJECTS
// ==========================================

// Prevent new properties
Object.preventExtensions(obj);

// Prevent property removal
Object.seal(obj);

// Completely lock object
Object.freeze(obj);

// ==========================================
// MAPS
// ==========================================

const fruits = new Map();

fruits.set("apples", 500);
fruits.set("bananas", 300);
fruits.set("oranges", 200);
console.log(fruits.get("apples"));
console.log(fruits.size);
console.log(fruits.has("bananas"));
fruits.delete("oranges");

// ==========================================
// LOOPING MAPS
// ==========================================

const fruits = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200],
]);

for (const [key, value] of fruits) {
  console.log(key, value);
}

// ==========================================
// SETS
// ==========================================

const letters = new Set();

letters.add("a");
letters.add("b");
letters.add("c");
letters.add("c");

console.log(letters);
console.log(letters.size);

// ==========================================
// SET METHODS
// ==========================================

const letters = new Set(["a", "b", "c"]);

letters.add("d");
letters.delete("b");
console.log(letters.has("a"));

for (const value of letters) {
  console.log(value);
}

// ==========================================
// AVOID THESE
// ==========================================

// Avoid wrapper objects
const name = new String("Eric");
const age = new Number(20);
const isStudent = new Boolean(true);

// Prefer primitives
const name2 = "Eric";
const age2 = 20;
const isStudent2 = true;

// ====================================================================================
// ====================================================================================
// MORE DETAILED EXPLANATIONS FOR THE ABOVE CODE
// ====================================================================================
// ====================================================================================

// ========================================== OBJECT OR DICTIONARY ==========================================

const car = { type: "Fiat", model: "500", color: "white" };
console.log(car["type"]);

// Declaring an Object
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};

// Accessing the Object properties

console.log(person.firstName);
console.log(person.lastName);
console.log(person.age); // objectName.propertyName
console.log(person["eyeColor"]); // objectName["propertyName"]
console.log(person.eyeColor);

// Object Methods
const person1 = {
  firstName: "Eric",
  lastName: "Mawule Duadze",
  id: 5566,
  fullName: function () {
    return this.firstName + " " + this.lastName; // this Keyword is referring to the person1 object
  },
};

// Accessing the object method
console.log(person1.fullName());
// NB: When a JavaScript variable is declared with the keyword "new", the variable is created as an object

x = new String(); // Declares x as a String object
y = new Number(); // Declares y as a Number object
z = new Boolean(); // Declares z as a Boolean object
// AVOID THE ABOVE CODE, IT SLOWS EXECUTION SPEED

// =========== WAYS TO CREATE OBJECT ===========
// #. Create a single object, using an object literal.
// #. Create a single object, with the keyword new.
// #. Define an object constructor, and then create objects of the constructed type.
// #. Create an object using Object.create()

// USING OBJECT LITERAL
const usingObjectLiterals = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};
// This example creates an empty JavaScript object, and then adds 4 properties:

const peronEmptyObect = {};
peronEmptyObect.firstName = "John";
peronEmptyObect.lastName = "Doe";
peronEmptyObect.age = 50;
peronEmptyObect.eyeColor = "blue";

// USING THE JAVASCRIPT KEYWORD new
const usingNewObject = new Object();
usingNewObject.firstName = "John";
usingNewObject.lastName = "Doe";
usingNewObject.age = 50;
usingNewObject.eyeColor = "blue";
// This slows execution alway use the object literals

// =========== MUTATING OBJECTS ===========
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};
const x = person; // Will not create a copy of person. x is the same person object.
// Any changes will affect person.
const x = person;
x.age = 10; // Will change both x.age and person.age

// =========== ACCESSING OBJECT PROPERTIES ===========
// SYNTAX
objectName.property; // person.age
objectName["property"]; // person["age"]
objectName[expression]; // x = "age"; person[x]
person.firstname + " is " + person.age + " years old.";
person["firstname"] + " is " + person["age"] + " years old.";

// =========== LOOPING AN OBJECTS ===========
// The JavaScript for...in statement loops through the properties of an object.
for (let variable in object) {
  // code to be executed
}

// =========== ADDING NEW PROPERTIES ===========
// You can add new properties to an existing object by simply giving it a value.
person.nationality = "English";

// =========== DELETING PROPERTIES =========
// The delete keyword deletes a property from an object
delete person.age;
delete person["age"];

// =========== NESTED OBJECTS =========

const nestedObject = {
  name: "John",
  age: 30,
  cars: {
    car1: "Ford",
    car2: "BMW",
    car3: "Fiat",
  },
};

// =========== ACCESSING NESTED OBJECTS AND IT'S PROPERTY =========
// You can access nested objects using the dot notation or the bracket notation
nestedObject.cars.car2;
nestedObject.cars["car2"];
nestedObject["cars"]["car2"];
let p1 = "cars";
let p2 = "car2";
nestedObject[p1][p2];

// =========== NESTED ARRAYS AND OBJECTS =========
const nestedArrayAndObject = {
  name: "John",
  age: 30,
  cars: [
    { name: "Ford", models: ["Fiesta", "Focus", "Mustang"] },
    { name: "BMW", models: ["320", "X3", "X5"] },
    { name: "Fiat", models: ["500", "Panda"] },
  ],
};

// =========== ACCESSING NESTED ARRAYS INSIDE ARRAYS =========
// use a for-in loop for each array
for (let i in nestedArrayAndObject.cars) {
  for (let j in nestedArrayAndObject.cars[i].models) {
    console.log(nestedArrayAndObject.cars[i].models[j]);
  }
}

// =========== THIS KEYWORD =========

const thisKeyword = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};
// this refers to thisKeyword object

// =========== USING Object.values() ========
// Object.value() can be used when you want to display object properties
const myArray = Object.values(person);
document.getElementById("demo").innerHTML = myArray;

// =========== JAVASCRIPT GETTER AND SETTER ===========
// JavaScript Getter (The get Keyword)
// This example uses a lang property to get the value of the language property.
// Create an object:

const person = {
  firstName: "John",
  lastName: "Doe",
  language: "en",
  // getting the value of the language property
  get lang() {
    return this.language;
  },
};
// Display data from the object using a getter:
document.getElementById("demo").innerHTML = person.lang;

// JavaScript Setter (The set Keyword)
// This example uses a lang property to set the value of the language property.

const person = {
  firstName: "John",
  lastName: "Doe",
  language: "",
  set lang(lang) {
    this.language = lang;
  },
};
// Setting an object property using a setter:
person.lang = "en";
// Display data from the object:
document.getElementById("demo").innerHTML = person.language;

// =============== JAVASCRIPT FUNCTION AND A GETTER ===============
// What is the differences between these two examples
// Example 1
const person = {
  firstName: "John",
  lastName: "Doe",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};
// Display data from the object using a method:
document.getElementById("demo").innerHTML = person.fullName();

// Example 2
const person = {
  firstName: "John",
  lastName: "Doe",
  get fullName() {
    return this.firstName + " " + this.lastName;
  },
};
// Display data from the object using a getter:
document.getElementById("demo").innerHTML = person.fullName;

// Example 1 access fullName as a function: person.fullName().
// Example 2 access fullName as a property: person.fullName.
// The second example provides a simpler syntax.

// =========== Object.defineProperty() ==============
// The Object.defineProperty() method can also be used to add Getters and Setters:
// A Counter Example
// Define object

const obj = { counter: 0 };
// Define setters
Object.defineProperty(obj, "reset", {
  get: function () {
    this.counter = 0;
  },
});

Object.defineProperty(obj, "increment", {
  get: function () {
    this.counter++;
  },
});

Object.defineProperty(obj, "decrement", {
  get: function () {
    this.counter--;
  },
});

Object.defineProperty(obj, "add", {
  set: function (value) {
    this.counter += value;
  },
});

Object.defineProperty(obj, "subtract", {
  set: function (value) {
    this.counter -= value;
  },
});

// Play with the counter:
obj.reset;
obj.add = 5;
obj.subtract = 1;
obj.increment;
obj.decrement;

// =============== OBJECT CONSTRUCTORS ===============
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
  // this refers to Person
}
// function Person() is an object constructor function.

// Creating an objects from the function Person() is an object constructor function.
const myFather = new Person("John", "Doe", 50, "blue");
const myMother = new Person("Sally", "Rally", 48, "green");

// ===== Adding a Property to an Object =====
// Adding a new property to an existing object is easy
myFather.nationality = "English";
// The property will be added to myFather. Not to myMother. (Not to any other person objects).

// ===== Adding a Method to an Object =====
// Adding a new method to an existing object is easy
myFather.name = function () {
  return this.firstName + " " + this.lastName;
};
// The method will be added to myFather. Not to myMother. (Not to any other person objects).

// ===== Adding a Property to a Constructor =====
// You cannot add a new property to an object constructor the same way you add a new property to an existing object
Person.nationality = "English";
// To add a new property to a constructor, you must add it to the constructor function

// Example
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
  this.nationality = "English";
}
// This way object properties can have default values.

// ===== Adding a Method to a Constructor =====
// Your constructor function can also define methods:\

// Example
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
  this.name = function () {
    return this.firstName + " " + this.lastName;
  };
}
// You cannot add a new method to an object constructor the same way you add a new method to an existing object.

// Adding methods to an object constructor must be done inside the constructor function

// Example
function Person(firstName, lastName, age, eyeColor) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.eyeColor = eyeColor;
  this.changeName = function (name) {
    this.lastName = name;
  };
}
// The changeName() function assigns the value of name to the person's lastName property.
// Now You Can Try:
myMother.changeName("Doe");
// JavaScript knows which person you are talking about by "substituting" this with myMother.

// Built-in JavaScript Constructors
new String(); // A new String object
new Number(); // A new Number object
new Boolean(); // A new Boolean object
new Object(); // A new Object object
new Array(); // A new Array object
new RegExp(); // A new RegExp object
new Function(); // A new Function object
new Date(); // A new Date object

// ============= JAVASCRIPT OBJECT PROTOTYPE =============
// All JavaScript objects inherit properties and methods from a prototype
// Date objects inherit from Date.prototype
// Array objects inherit from Array.prototype
// Person objects inherit from Person.prototype
// The Object.prototype is on the top of the prototype inheritance chain:
// Date objects, Array objects, and Person objects inherit from Object.prototype.

// ============= Adding Properties and Methods to Objects =============
// Sometimes you want to add new properties (or methods) to all existing objects of a given type.
// Sometimes you want to add new properties (or methods) to an object constructor.

// ============= Using the prototype Property =============
// The JavaScript prototype property allows you to add new properties to object constructors:

// Example
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}
Person.prototype.nationality = "English";
// The JavaScript prototype property also allows you to add new methods to objects constructors

// Example
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}
Person.prototype.name = function () {
  return this.firstName + " " + this.lastName;
};

// ======= JavaScript ES5 Object Methods =======
// ECMAScript 5 (2009) added a lot of new Object Methods to JavaScript.

// ======= Managing Objects =======
// Create object with an existing object as prototype
Object.create();

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

// ======= Protecting Objects =======

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

// ======= Changing a Property Value =======
// Syntax
Object.defineProperty(object, property, { value: value });

// Example
const person = {
  firstName: "John",
  lastName: "Doe",
  language: "EN",
};

// Change a property
Object.defineProperty(person, "language", { value: "NO" });

// ======= Changing Meta Data =======
// ES5 allows the following property meta data to be changed:
writable: true; // Property value can be changed
enumerable: true; // Property can be enumerated
configurable: true; // Property can be reconfigured
writable: false; // Property value can not be changed
enumerable: false; // Property can be not enumerated
configurable: false; // Property can be not reconfigured

// ES5 allows getters and setters to be changed
// Defining a getter
// get: function() { return language }

// Defining a setter
// set: function(value) { language = value }

// This example makes language read-only:
Object.defineProperty(person, "language", { writable: false });

// This example makes language not enumerable:
Object.defineProperty(person, "language", { enumerable: false });

// ======= Listing All Properties =======
// This example list all properties of an object:

// Example
const person = {
  firstName: "John",
  lastName: "Doe",
  language: "EN",
};
Object.defineProperty(person, "language", { enumerable: false });
Object.getOwnPropertyNames(person); // Returns an array of properties

// ======= Listing Enumerable Properties =======
// This example list only the enumerable properties of an object:

// Example
const person = {
  firstName: "John",
  lastName: "Doe",
  language: "EN",
};

Object.defineProperty(person, "language", { enumerable: false });
Object.keys(person); // Returns an array of enumerable properties

// ======= Adding a Property =======
// This example adds a new property to an object:

// Example
// Create an object:
const person = {
  firstName: "John",
  lastName: "Doe",
  language: "EN",
};
// Add a property
Object.defineProperty(person, "year", { value: "2008" });

// ======= Adding Getters and Setters =======
// The Object.defineProperty() method can also be used to add Getters and Setters:

// Example
//Create an object
const person = { firstName: "John", lastName: "Doe" };
// Define a getter
Object.defineProperty(person, "fullName", {
  get: function () {
    return this.firstName + " " + this.lastName;
  },
});

// A Counter Example
// Define object
const obj = { counter: 0 };
// Define setters
Object.defineProperty(obj, "reset", {
  get: function () {
    this.counter = 0;
  },
});

Object.defineProperty(obj, "increment", {
  get: function () {
    this.counter++;
  },
});

Object.defineProperty(obj, "decrement", {
  get: function () {
    this.counter--;
  },
});

Object.defineProperty(obj, "add", {
  set: function (value) {
    this.counter += value;
  },
});

Object.defineProperty(obj, "subtract", {
  set: function (i) {
    this.counter -= i;
  },
});

// Play with the counter:
obj.reset;
obj.add = 5;
obj.subtract = 1;
obj.increment;
obj.decrement;

// ========== JAVASCRIPT MAP() METHODS ==========
// A Map object holds key-value pairs where the keys can be any datatype.
// A Map object remembers the original insertion order of the keys.
// A Map object has a property that represents the size of the map.

// ===== Essensial Map() Methods =====

// Method	      Description
// new Map()	  Creates a new Map object
// set()	      Sets a value for a key in a Map object
// get()	      Gets a value for a key in a Map object
// entries()	  Returns an array of the key/value pairs in a Map object
// keys()	      Returns an array of the keys in a Map object
// values()	    Returns an array of the values in a Map object

// ====== Map() Properties ======
// Property	    Description
// size	        Gets a value for a key in a Map object

// ====== Create a Map Object ======
// Being able to use an Object as a key is an important Map feature.

// Example
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

// The get() method gets a value for a key in a Map object:
// Example
fruits.get(apples); // Returns 500
fruits.get("apples"); // Returns undefined

// You can pass an Array to the new Map() constructor:

// Example
// Create Objects
const apples = { name: "Apples" };
const bananas = { name: "Bananas" };
const oranges = { name: "Oranges" };

// Create a new Map
const fruits = new Map([
  [apples, 500],
  [bananas, 300],
  [oranges, 200],
]);

// ====== Other Map() Methods ======

// Method	      Description
// clear()	    Removes all elements in a Map
// delete()	    Removes an element specified by a key.
// has()	      Returns true if a key exists.
// forEach()	  Invokes a callback for each key/value pair.

// ========== JAVASCRIPT SET() METHODS ==========

// Create a Set and add existing variables:

// Example
// Create some variables
const a = "a";
const b = "b";
const c = "c";

// Create a Set
const letters = new Set();

// Add the values to the Set
letters.add(a);
letters.add(b);
letters.add(c);

// ====== Create a Set and add literal values ======

// Example
// Create a Set
const letters = new Set();

// Add some values to the Set
letters.add("a");
letters.add("b");
letters.add("c");

// ====== Pass an Array to the new Set() constructor ======

// Example
// Create a new Set
const letters = new Set(["a", "b", "c"]);

// For a Set, typeof returns object:
typeof letters; // Returns object

// For a Set, instanceof Set returns true:
letters instanceof Set; // Returns true

// ====== Adding Elements to a Set ======
letters.add("d");
letters.add("e");
// If you add equal elements, only the first will be saved:
letters.add("a");
letters.add("b");
letters.add("c");
letters.add("c");
letters.add("c");
letters.add("c");
letters.add("c");
letters.add("c");

// ====== Set Object Methods and Properties ======

// new Set()	  Creates a new Set object
// add()	      Adds a new element to the Set
// clear()	    Removes all elements from a Set
// delete()	    Removes an element specified by its value.
// entries()	  Returns an array of the values in a Set object
// has()	      Returns true if a value exists
// forEach()	  Invokes a callback for each element
// keys()	      Returns an array of the values in a Set object
// values()	    Same as keys()
// size	        Returns the element count
