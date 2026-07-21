// ============== ARROW FUNCTION ==============
// Before
hello = function () {
  return "Hello World!";
};
console.log(hello());

// With Arrow Function
hello = () => {
  return "Hello World! 2";
};
console.log(hello());

// Arrow Functions Returns Value by Default
hello = () => "Hello World! 3";
console.log(hello());

// ============== ARROW FUNCTION WITH PARAMETERS ==============
yello = (parameter) => `Hello ${parameter}`;
console.log(yello("Eric Mawule Duadze"));

// Arrow Function Without Parentheses
hello = (val) => "Hello " + val;
console.log(hello("W3School"));

// ============== ARROW FUNCTION WITH this ==============
// Regular Function:
// With a regular function this represents the object that calls the function
hello = function () {
  document.getElementById("demo").innerHTML += this;
};

// The window object calls the function:
window.addEventListener("load", hello);

// A button object calls the function:
document.getElementById("btn").addEventListener("click", hello);

// Arrow Function:
// With an arrow function this represents the owner of the function
hello = () => {
  document.getElementById("demo").innerHTML += this;
};

// The window object calls the function:
window.addEventListener("load", hello);

// A button object calls the function:
document.getElementById("btn").addEventListener("click", hello);
