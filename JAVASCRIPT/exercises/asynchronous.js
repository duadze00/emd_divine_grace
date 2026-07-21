// A. Callbacks
// SetTimeout
setTimeout(setTimeoutFnx, 3000);
function setTimeoutFnx() {
  console.log("Eric Mawule Duadze");
}

// SetInterval
setInterval(setIntervalFnx, 5000);
function setIntervalFnx() {
  console.log("Good God");
}

// B. Promises
const age = 18;
const promise = new Promise((resolve, reject) => {
  age >= 18 ? resolve("Can vote") : reject("Can not vote");
});

promise
  .then((message) => console.log(message))
  .catch((error) => console.log(error));

const promise1 = fetch("https://json-placeholder/api.com/user");
promise1
  .then((response) => {
    return response.json();
  })
  .then((users) => console.log(users))
  .catch((error) => console.log(error.message));

// C. Async/Await
async function getData() {
  try {
    const response = await fetch("https://json-placeholder/api.com/user");

    if (!response.ok) {
      throw new Error("Server Error");
    }

    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
    }
  } catch (error) {
    console.log(error.name);
  }
}

getData();

// D. Promise Utilities
// promise.all()
async function promiseAll() {
  try {
    const response = Promise.all([
      await fetch("https://json-placeholder/api.com/user"),
      await fetch("https://json-placeholder/api.com/user"),
    ]);
    const users = response.json();

    for (let user in users) {
      return user;
    }
  } catch (error) {
    return error.name;
  }
}

console.log(promiseAll());
