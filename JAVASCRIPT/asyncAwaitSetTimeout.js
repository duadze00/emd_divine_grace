const adviceURL = "https://api.adviceslip.com/advice";

// =====================================================
// WAIT FOR SOME TIME BEFORE FETCHING DATA
// =====================================================

setTimeout(async () => {
  const response = await fetch(adviceURL);
}, 5000);

setTimeout(async () => {
  try {
    const response = await fetch(adviceURL);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error.name);
  }
}, 5000);

// OR

function getData() {
  setTimeout(async () => {
    try {
      const response = await fetch(adviceURL);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }, 5000);
}

// Calling the getData function
getData();

// Timeline
/*
getData() called
     │
     ├─ setTimeout schedules task
     │
     └─ getData() FINISHES immediately
            │
            │ 5 seconds later
            ▼
      callback runs
            │
            ▼
          fetch()
*/

// =====================================================
// DELAY FOR SOME TIME BEFORE FETCHING DATA
// =====================================================
async function getData() {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

  try {
    const response = await fetch(adviceURL);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

// Timeline
/*
getData() called
      │
      ▼
wait 5 seconds
      │
      ▼
fetch()
      │
      ▼
getData() finishes
*/

async function getData() {
  await delay(5000);

  const response = await fetch(url);
  const data = await response.json();
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// =====================================================
// ABORTCONTROLLER
// =====================================================
async function getData() {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(adviceURL, {
      signal: controller.signal,
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.name); // AbortError if timed out
  } finally {
    clearTimeout(timer);
  }
}
