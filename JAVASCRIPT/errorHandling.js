// ============ ERROR HANDLING ============
// The try statement lets you test a block of code for errors.
// The catch statement lets you handle the error.
// The throw statement lets you create custom errors.
// The finally statement lets you execute code, after try and catch, regardless of the result.

// ===== try and catch =====
try {
  // Block of code to try
} catch (err) {
  // Block of code to handle errors
}

// ===== throw ====
throw "Too big"; // throw a text
throw 500;

// NB. If you use throw together with try and catch, you can control program flow and generate custom error messages.

function myFunction() {
  let x = "";
  try {
    if (x == "") throw "empty";
    if (isNaN(x)) throw "not a number";
    x = Number(x);
    if (x < 5) throw "too low";
    if (x > 10) throw "too high";
  } catch (err) {
    console.log(err);
  }
}
myFunction();

// See the example in the error_handling_eg.html.

// ===== finally ====
try {
  // Block of code to try
} catch (err) {
  // Block of code to handle errors
} finally {
  // Block of code to be executed regardless of the try / catch result
}

function myFunction1() {
  const message = document.getElementById("p01");
  message.innerHTML = "";
  let x = document.getElementById("demo").value;
  try {
    if (x == "") throw "is empty";
    if (isNaN(x)) throw "is not a number";
    x = Number(x);
    if (x > 10) throw "is too high";
    if (x < 5) throw "is too low";
  } catch (err) {
    message.innerHTML = "Error: " + err + ".";
  } finally {
    document.getElementById("demo").value = "";
  }
}

// ============ ERROR OBJECT ============
// JavaScript has a built in error object that provides error information when an error occurs.
// The error object provides two useful properties: name and message.

// ====== Error Object Properties ======
// Property	    Description
// name	        Sets or returns an error name
// message	    Sets or returns an error message (a string)

// Entire error, both name and message
try {
  console.log("Eric Mawule Duadze");
} catch (error) {
  console.log(error);
}

// Error name
try {
  console.log("Eric Mawule Duadze");
} catch (error) {
  console.log(error.name);
}

try {
  adddlert("Welcome guest!");
} catch (err) {
  console.log(err.name);
}

// Error message
try {
  console.log("Eric Mawule Duadze");
} catch (error) {
  console.log(error.message);
}

try {
  adddlert("Welcome guest!");
} catch (err) {
  console.log(err.message);
}

// ============ INFINITY HANDLING ============
function infinityHandler(e) {
  if (e === Infinity || e === -Infinity) {
    return `Invalid input (Basic Way)`;
  }

  // OR
  if (!Number.isFinite(e)) {
    return `Invalid input (Professional Way)`;
  }
}

console.log(infinityHandler());
