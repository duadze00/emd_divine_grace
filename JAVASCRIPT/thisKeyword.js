// ========== THIS KEYWORD ===============
// The JavaScript this keyword refers to the object it belongs to
// this means who is calling me right now

// ========== THIS IN A METHOD ===============
// In a method, this refers to the owner object.
const person = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};
console.log(person.fullName);
// this === person

// ========== THIS ALONE  IN GLOBAL SCOPE =============
// this refers to the global object [object Window].
console.log(this); // Returns Window {...}

// ========== THIS IN A REGULAR FUNCTION  ============
// this refers to the global object [object Window].
function myFunction() {
  return this;
}
console.log(myFunction()); // Returns Window {...}

// ========== THIS IN A FUNCTION (STRICT) ===============
// In a function, in strict mode, this is undefined.
("use strict");
function greet() {
  console.log(this);
}
greet(); // Returns undefined

// ========== THIS IN EVENT HANDLERS ===============
// this refers to the element that received the event.
const btn = document.querySelector("button");
btn.addEventListener("click", function () {
  console.log(this);
});
btn.addEventListener("click", function () {
  this.style.display = "none";
});
// this === btn

// ========== THIS INSIDE AN OBJECT METHOD ===============
const myName = {
  firstName: "Eric",
  lastName: "Duadze",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};
console.log(myName.fullName());
// this === myName

// ========== ARROW FUNCTION AND THIS ===============
const arrowFunction = {
  name: "Eric",
  greet: () => {
    console.log(this.name);
  },
};
arrowFunction.greet(); // This returns undefined

// Corrected version
const arrowFunction1 = {
  name: "Eric Mawule Duadze",
  greet() {
    console.log(this.name);
  },
};
arrowFunction1.greet();
// this === arrowFunction1
// OR
btn.addEventListener("click", (e) => {
  e.target.style.display = "none";
});

// ========== USING call() ===============
const usingCall = {
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

const usingCall1 = {
  firstName: "John",
  lastName: "Doe",
};
console.log(usingCall.fullName.call(usingCall1));
// this === usingCall1

// ========== USING apply() ===============
function usingApply(city, country) {
  console.log(`${this.name} lives in ${city}, ${country}`);
}

const user = {
  name: "Eric",
};
usingApply.apply(user, ["Accra", "Ghana"]);

// ========== USING bind() ===============
// bind() creates a new function with a fixed this.
const usingBind = {
  name: "Eric",
};

function greet() {
  console.log(this.name);
}
const boundGreet = greet.bind(usingBind);
boundGreet();

// ========== WHEN TO USE this ===============
// 1. Inside object methods
const objectMethod = {
  name: "Eric",
  greet() {
    console.log(this.name);
  },
};
// 2. Inside classes
class User {
  constructor(name) {
    this.name = name;
  }
}
// 3. When you want a function to work with different objects using call, apply, or bind.

// ========== WHEN NOT TO USE this ===============
// 1. In arrow-function object methods
const notInArrowFunction = {
  name: "Eric",
  greet: () => {
    console.log(this.name);
  },
};
// 2. In regular functions when you don't know what this will be
function test() {
  console.log(this);
}

// ==============================
// THE FOUR RULES TO REMEMBER
// ==============================
// Rule 1
// obj.method();
// this === obj

// Rule 2
function test() {}
test();
// this === window (or undefined in strict mode)

// Rule 3
btn.addEventListener("click", function () {});
// this === button

// Rule 4
let arrowFnx = () => {};
// Arrow functions do not get their own this.
