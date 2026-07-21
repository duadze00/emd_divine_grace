// ============================= ASYNCHRONOUS JAVASCRIPT =============================
// Waiting for a Timeout
// setTimeout() specify a callback function to be executed on time-out
setTimeout(myCallBackFnx, 3000);

function myCallBackFnx() {
  console.log(`It took 3000ms to execute this `);
}

// Right: setTimeout(myCallBackFnx, 3000);
// Wrong: setTimeout(myCallBackFnx(), 3000);

setTimeout(function () {
  console.log("I am learning Asynchronous Javascript.");
}, 5000);

// Waiting for Intervals
// setInterval() specify a callback function to be executed for each interval
setInterval(myFunction, 10000);

function myFunction() {
  let d = new Date();
  console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
}
// The example above, myFunction will be called after every 1000ms(1s).

// Waiting for Files
function myDisplayer(some) {
  document.getElementById("demo").innerHTML = some;
}

function getFile(myCallback) {
  let req = new XMLHttpRequest();
  req.open("GET", "practice.html");
  req.onload = function () {
    if (req.status == 200) {
      myCallback(this.responseText);
    } else {
      myCallback("Error: " + req.status);
    }
  };
  req.send();
}

getFile(myDisplayer);

// ============================= JAVASCRIPT PROMISE =============================
// "Producing code" is code that can take some time
// "Consuming code" is code that must wait for the result
// A Promise is a JavaScript object that links producing code and consuming code

// Promise Syntax
let myPromise = new Promise(function (myResolve, myReject) {
  // "Producing Code" (May take some time)
  myResolve(); // when successful
  myReject(); // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
  function (value) {
    /* code if successful */
  },
  function (error) {
    /* code if some error */
  },
);

// When the executing code obtains the result, it should call one of the two callbacks:

// Result	    Call
// Success	  myResolve(result value)
// Error	    myReject(error object)

// ===== Promise Object Properties =====
// A JavaScript Promise object can be:
// Pending
// Fulfilled
// Rejected

// The Promise object supports two properties: state and result.

// While a Promise object is "pending" (working), the result is undefined.
// When a Promise object is "fulfilled", the result is a value.
// When a Promise object is "rejected", the result is an error object.

// myPromise.state	  myPromise.result
// "pending"	        undefined
// "fulfilled"	      a result value
// "rejected"	        an error object

// You cannot access the Promise properties state and result.
// You must use a Promise method to handle promises.

// ===== Promise How To =====
// Here is how to use a Promise:

myPromise.then(
  function (value) {
    /* code if successful */
  },
  function (error) {
    /* code if some error */
  },
);
// Promise.then() takes two arguments, a callback for success and another for failure.
// Both are optional, so you can add a callback for success or failure only.

// EXAMPLE.
function myDisplay(some) {
  console.log(some);
}

let myPromise1 = new Promise(function (myResolve, myReject) {
  let x = 0;

  // The producing code (this may take some time)
  if (x == 0) {
    myResolve("OK");
  } else {
    myReject("Error");
  }
});

// Consuming Code (Must wait for a fulfilled Promise)
myPromise1.then(
  function (value) {
    myDisplay(value);
  },
  function (error) {
    myDisplay(error);
  },
);

// Waiting for a Timeout in promise
let myPromise2 = new Promise(function (myResolve, myReject) {
  setTimeout(function () {
    myResolve("I love You !!");
  }, 3000);
});

myPromise2.then(function (value) {
  console.log(value);
});

// Waiting for a file in promise
// using Callback
function getFile(myCallback) {
  let req = new XMLHttpRequest();
  req.open("GET", "practice.html");
  req.onload = function () {
    if (req.status == 200) {
      myCallback(req.responseText);
    } else {
      myCallback("Error: " + req.status);
    }
  };
  req.send();
}

getFile(myDisplayer);

// using Promise
let myPromise3 = new Promise(function (myResolve, myReject) {
  let req = new XMLHttpRequest();
  req.open("GET", "practice.html");
  req.onload = function () {
    if (req.status == 200) {
      myResolve(req.response);
    } else {
      myReject("File not Found");
    }
  };
  req.send();
});

myPromise3.then(
  function (value) {
    myDisplayer(value);
  },
  function (error) {
    myDisplayer(error);
  },
);

// ============================= JAVASCRIPT ASYNC =============================
// async and await make promises easier to write

// async makes a function return a Promise
// await makes a function wait for a Promise

// Async Syntax
// The keyword async before a function makes the function return a promise:

async function myFunction() {
  return "Hello";
}
// Is the same as:
async function myFunction() {
  return Promise.resolve("Hello");
}

// Here is how to use the Promise
myFunction().then(
  function (value) {
    /* code if successful */
  },
  function (error) {
    /* code if some error */
  },
);

// Example
async function myFunction() {
  return "Hello";
}
myFunction().then(
  function (value) {
    myDisplayer(value);
  },
  function (error) {
    myDisplayer(error);
  },
);

// Or simpler, since you expect a normal value (a normal response, not an error):

async function myFunction() {
  return "Hello";
}
myFunction().then(function (value) {
  myDisplayer(value);
});

// Await Syntax
// The keyword await before a function makes the function wait for a promise:

// let value = await promise;
// The await keyword can only be used inside an async function.

// Example
async function myDisplay() {
  let myPromise4 = new Promise(function (myResolve, myReject) {
    myResolve("I love You !!");
  });
  document.getElementById("demo").innerHTML = await myPromise4;
}

myDisplay();

// Waiting for a Timeout in promise
async function myDisplay() {
  let myPromise = new Promise(function (myResolve, myReject) {
    setTimeout(function () {
      myResolve("I love You !!");
    }, 3000);
  });
  document.getElementById("demo").innerHTML = await myPromise;
}

myDisplay();

// Waiting for a File in promise
async function getFile() {
  let myPromise = new Promise(function (myResolve, myReject) {
    let req = new XMLHttpRequest();
    req.open("GET", "practice.html");
    req.onload = function () {
      if (req.status == 200) {
        myResolve(req.response);
      } else {
        myResolve("File not Found");
      }
    };
    req.send();
  });
  document.getElementById("demo").innerHTML = await myPromise;
}

getFile();
