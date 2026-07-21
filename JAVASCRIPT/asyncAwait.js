// ======================= ASYNC / AWAIT =======================
// Async/await is built on top of promises.

function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Eric");
    }, 2000);
  });
}

// Instead of:
getUser()
  .then((user) => getPosts(user))
  .then((posts) => console.log(posts));

// Use:
async function loadData() {
  const user = await getUser();
  const posts = await getPosts(user);
  console.log(posts);
}
// Cleaner and easier to read.

// ======================= ASYNC FUNCTION =======================
async function greet() {
  return "Hello";
}
// Returns Promise { "Hello" }

// ======================= AWAIT =======================
// Waits for a promise.
async function example() {
  const result = await Promise.resolve("Done");
  console.log(result);
}

// ======================= ERROR HANDLING =======================
async function getData() {
  try {
    const data = await fetch(url);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// REAL API EXAMPLE
async function getUsers() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.log(error);
  }
}
