// ================ PROMISES ================
// A Promise represents a value that will be available later.

// Think of ordering food online.
// Order placed
//      ↓
// Preparing
//      ↓
// Delivered

// Promise states:
// Pending
// Fulfilled
// Rejected

// ================ CREATING A PROMISE ================
const promise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});

// ================ CONSUMING A PROMISE ================
promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// Example
function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Eric");
    }, 2000);
  });
}

getUser().then((user) => {
  console.log(user);
});

// ================ PROMISE CHAINING ================
getUser()
  .then((user) => {
    return user.toUpperCase();
  })
  .then((name) => {
    console.log(name);
  });

// ================ PROMISE UTILITIES ================
const url1 = fetch("https://jsonplaceholder.typicode.com/users");
const url2 = fetch("https://jsonplaceholder.typicode.com/users");
const url3 = fetch("https://jsonplaceholder.typicode.com/users");

// ===== Promise.any() =====
// Returns any fulfilled promise

Promise.any([p1, p2, p3]);

// Example
Promise.any([url1, url2, url3])
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let file in data) {
      console.log(file);
    }
  })
  .catch((error) => console.log(error.message));

// ===== Promise.all() =====
// Run multiple promises together.

const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.resolve("C");

Promise.all([p1, p2, p3]).then((data) => {
  console.log(data);
});

// Example
Promise.all([url1, url2, url3])
  .then((responses) => {
    return Promise.all(responses.map((response) => response.json()));
  })
  .then((data) => {
    console.log(data); // Array of 3 JSON objects
  })
  .catch((error) => console.log(error.message));

// ===== Promise.race() =====
// Returns first completed promise.

Promise.race([p1, p2, p3]);

// Example
Promise.race([url1, url2, url3])
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let file in data) {
      console.log(file);
    }
  })
  .catch((error) => console.log(error));

// OR

Promise.race([url1, url2, url3])
  .then((response) => response.json())
  .then((data) => console.log(data));

// ===== Promise.allSettled() =====
// Gets every result.
Promise.allSettled([Promise.resolve("Success"), Promise.reject("Error")]);

// Example
Promise.allSettled([url1, url2, url3])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => console.log(error.message));

// OR

Promise.allSettled([url1, url2, url3])
  .then((results) => {
    return Promise.all(
      results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value.json()),
    );
  })
  .then((data) => console.log(data))
  .catch((error) => console.log(error.message));
