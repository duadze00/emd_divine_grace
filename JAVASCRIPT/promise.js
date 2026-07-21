// ==========================================================
// PROMISE
// ==========================================================
// PROMISE: I don't have the result now, but I promise to give it to you later.
/* 
Imagine ordering food.
  You order pizza
  The waiter gives you a receipt.
  The receipt is the Promise.
  Not the pizza.
  The pizza comes later.

Receipt = Promise
Pizza = Actual Data
*/

// PROMISE STATES
// === Pending ===
// Pizza is still cooking
// Promise { <pending> }

// === Fulfilled ===
// Pizza is ready
// Promise { data }

// === Rejected ===
// Kitchen caught fire
// Promise { error }

// NB. JavaScript handles the states internally so don't write them.
// You react using:
// .then()
// .catch()
// OR
// await

// Why .then() Exists
// When the pizza arrives:
fetch("/users").then((data) => {
  console.log(data);
});
// Translation:
// When the data arrives, run this function.

// Why .catch() Exists
// What if the internet fails?
fetch("/users").catch((error) => {
  console.log(error);
});
// Translation:
// If something goes wrong, run this function.

// Why async/await Exists
// People hated writing:
fetch("/users")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

// So JavaScript introduced:
async function getUsers() {
  try {
    const response = await fetch("/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
// Same thing as above but Cleaner syntax.

// In Real Projects
// You'll use:
// async
// await
// try/catch
// about 90% of the time.

// EXAMPLE
async function getUsers() {
  try {
    const response = await fetch("/users");
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    showError(error);
  }
}
// This is how most modern code looks.

// ==========================================================
// PROMISE WITH TRADITIONAL SYNTAX
// ==========================================================

fetch("https://reqres.in/api/users")
  .then((resposnse) => resposnse.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

// ==========================================================
// PROMISE WITH ASYN AWAIT
// ==========================================================

async function asynAwaitPromise() {
  try {
    const response = await fetch("https://reqres.in/api/users");
    const data = response.json();

    if (!response.ok) {
      console.log(data.description);
      return;
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// CREATE YOUR OWN PROMISE
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operation successful");
  } else {
    reject("Operation failed");
  }
});

// GET DATA
async function asynAwaitPromise() {
  try {
    const response = await fetch("https://reqres.in/api/users");
    const data = response.json();

    if (!response.ok) {
      console.log(data.description);
      return;
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// POST DATA
const newUser = { name: "Eric Mawule Duadze", job: "Sonographer" };

async function asynAwaitPromise() {
  try {
    const response = await fetch("https://reqres.in/api/users/userdetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();

    if (!response.ok) {
      console.log(data.description);
      return;
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// PUT DATA
async function asynAwaitPromise() {
  const updatedUser = {
    name: "Eric",
    job: "Developer",
  };
  try {
    const response = await fetch("https://reqres.in/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
    const data = response.json();

    if (!response.ok) {
      console.log(data.description);
      return;
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// DELETE DATA
async function asynAwaitPromise() {
  try {
    const response = await fetch("https://reqres.in/api/users/userdetails", {
      method: "DELETE",
    });
    const data = response.json();

    if (!response.ok) {
      console.log(data.description);
      return;
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// ALL PROMISE
// Promise.all() starts all promises at the same time and waits until every one of them succeeds before continuing.
Promise.all([
  fetch("https://userimage.in/img.jpg"),
  fetch("https://usercomment.in/comments"),
])
  .then((results) => console.log(results))
  .catch((error) => console.log(error));

// OR
try {
  const results = await Promise.all([
    fetch("https://userimage.in/img.jpg"),
    fetch("https://usercomment.in/comments"),
  ]);

  console.log(results);
} catch (error) {
  console.log(error);
}

// ANY PROMISE
Promise.any([
  fetch("https://userimage.in/img.jpg"),
  fetch("https://usercomment.in/comments"),
])
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// RESOLVE PROMISE
const promise = Promise.resolve("Hello");
promise.then((data) => console.log(data));

// REJECT PROMISE
const promise = Promise.reject("Something went wrong");
promise.catch((error) => console.log(error));

// RACE PROMISE
// Returns the first promise that settles. Whichever finishes first wins.
Promise.race([fetch("/users"), fetch("/posts")]).then((result) =>
  console.log(result),
);

// RACE PROMISE
// Very important. Unlike Promise.all(), it never fails because one promise fails.
Promise.allSettled([Promise.resolve("Success"), Promise.reject("Failed")]).then(
  (results) => console.log(results),
);

// ERROR THROWING
async function getUser() {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return response.json();
}

// ALLSETTLED
// If one fail you still want the rest
await Promise.allSettled([
  fetch("/profile"),
  fetch("/posts"),
  fetch("/comments"),
]);

// SEQUENTIAL VS PARALLEL AWAIT
// Sequential Await: Returns one after the another
const user = await fetch("/user");
const posts = await fetch("/posts");

// Parallel Await: Runs simultaneously
// Is much faster
const [user, posts] = await Promise.all([fetch("/user"), fetch("/posts")]);

// FINALLY
// Runs whether success or failure
fetch(url)
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
  .finally(() => {
    console.log("Finished");
  });

/* 
Promises
│
├── Promise States
│   ├── Pending
│   ├── Fulfilled
│   └── Rejected
│
├── Creating Promises
│   └── new Promise()
│
├── Consuming Promises
│   ├── then()
│   ├── catch()
│   └── finally()
│
├── Async/Await
│   ├── async
│   ├── await
│   ├── try/catch
│   └── throw Error()
│
├── Static Methods
│   ├── Promise.resolve()
│   ├── Promise.reject()
│   ├── Promise.all()
│   ├── Promise.allSettled()
│   ├── Promise.any()
│   └── Promise.race()
│
├── Fetch API
│   ├── GET
│   ├── POST
│   ├── PUT
│   ├── PATCH
│   └── DELETE
│
└── Advanced
    ├── Sequential execution
    ├── Parallel execution
    ├── Promise chaining
    ├── Error propagation
    ├── Async iteration
    └── AbortController
*/

// =============================================================
// BEST PRACTICE
// =============================================================
async function run() {
  try {
    const result = await somethingAsync();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// WHAT PROFESSIONALS USE MOST
/*  
95% of the time
├── async
├── await
├── try/catch
└── Promise.all()

4% of the time
├── then()
└── catch()

1% of the time
├── Promise.any()
├── Promise.race()
└── Promise.allSettled()
*/

// =============================================================
// EXAMPLE
// =============================================================

// HTML
<html>
  <h1>Dashboard</h1>
  <button id="loadBtn">Load Data</button>
  <p id="status"></p>
  <h2>Users</h2>
  <ul id="users"></ul>
  <h2>Posts</h2>
  <ul id="posts"></ul>
  <h2>Comments</h2>
  <ul id="comments"></ul>
</html>;

// JAVASCRIPT
const loadBtn = document.querySelector("#loadBtn");
const status = document.querySelector("#status");
const usersList = document.querySelector("#users");
const postsList = document.querySelector("#posts");
const commentsList = document.querySelector("#comments");
loadBtn.addEventListener("click", loadDashboard);

async function loadDashboard() {
  try {
    // =====================================
    // LOADING STATE
    // =====================================
    status.textContent = "Loading data...";

    // =====================================
    // FETCH EVERYTHING TOGETHER
    // =====================================
    const [usersRes, postsRes, commentsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/comments"),
    ]);

    // =====================================
    // CHECK FOR ERRORS
    // =====================================
    if (!usersRes.ok || !postsRes.ok || !commentsRes.ok) {
      throw new Error("Failed to fetch data");
    }

    // =====================================
    // CONVERT TO JSON
    // =====================================
    const users = await usersRes.json();
    const posts = await postsRes.json();
    const comments = await commentsRes.json();

    // =====================================
    // CLEAR OLD DATA
    // =====================================
    usersList.innerHTML = "";
    postsList.innerHTML = "";
    commentsList.innerHTML = "";

    // =====================================
    // DISPLAY USERS
    // =====================================
    users.slice(0, 5).forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.name;
      usersList.appendChild(li);
    });

    // =====================================
    // DISPLAY POSTS
    // =====================================
    posts.slice(0, 5).forEach((post) => {
      const li = document.createElement("li");
      li.textContent = post.title;
      postsList.appendChild(li);
    });

    // =====================================
    // DISPLAY COMMENTS
    // =====================================
    comments.slice(0, 5).forEach((comment) => {
      const li = document.createElement("li");
      li.textContent = comment.name;
      commentsList.appendChild(li);
    });

    // =====================================
    // SUCCESS MESSAGE
    // =====================================
    status.textContent = "Dashboard Loaded Successfully!";
  } catch (error) {
    status.textContent = "Something went wrong!";
    console.error(error);
  }
}
