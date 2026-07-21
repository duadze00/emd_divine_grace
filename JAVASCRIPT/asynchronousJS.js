// ===================== ASYNCHRONOUS JAVASCRIPT =====================
// Synchronous: Runs line by line.
console.log("1");
console.log("2");
console.log("3");

// Asynchronous: Some tasks take time:
// Fetching API
// Reading files
// Database queries
// Timers

console.log("1");
setTimeout(() => {
  console.log("2");
}, 2000); // The timer is delegated to the browser/node runtime and JavaScript continues executing other code.
console.log("3");

// ===================== ASYNCHRONOUS ITERATION =====================
// Normal loop:
for (const item of items) {
  console.log(item);
}
// Works for synchronous data.

// ===================== ASYNC GENERATOR =====================
async function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

// ===================== FOR AWAIT...OF =====================
async function run() {
  for await (const num of numbers()) {
    console.log(num);
  }
}
run();

// REALISTIC EXAMPLE
async function* fetchPages() {
  yield "Page 1";

  await new Promise((resolve) => setTimeout(resolve, 1000));

  yield "Page 2";

  await new Promise((resolve) => setTimeout(resolve, 1000));

  yield "Page 3";
}

async function run() {
  for await (const page of fetchPages()) {
    console.log(page);
  }
}

// ===================== ADVANCED CONCEPTS =====================

// =========== Async Generator ===========

async function* counter() {
  let i = 1;

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    yield i++;
  }
}

// =========== Creating Your Own Delay ===========
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Usage
async function run() {
  console.log("Start");
  await delay(2000);
  console.log("End");
}
