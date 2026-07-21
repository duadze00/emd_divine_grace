// ========================================================================================================
// ASYNC/AWAIT WITHOUT WRITING STANDARD ASYNC FUNCTION
// ========================================================================================================

// 1. Fetch the data and await the actual network response
let response = await fetch("url1");

// 2. Parse the response body as JSON and await the result
let data = await response.json();

// 3. Loop through the parsed data (using 'of' for arrays, 'in' for objects)
for (let x in data) {
  console.log(x); // Corrected 'i' to 'x' to match the loop variable
}

// ========================================================================================================
// IMMEDIATE INVOKED FUNCTION EXPRESSION (IIFE)
// ========================================================================================================

(async () => {
  let response = await fetch("url1");
  let data = await response.json();

  for (let x in data) {
    console.log(x);
  }
})();

// ========================================================================================================
// ASYNC/AWAIT WITHOUT WRITING STANDARD ASYNC FUNCTION WITH TRY & CATCH
// ========================================================================================================

try {
  // 1. Try to fetch the network resource
  let response = await fetch("url1");

  // Check if the server returned a 404 or 500 error
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // 2. Try to parse the response body as JSON
  let data = await response.json();

  // 3. Loop through the parsed data
  for (let x in data) {
    console.log(x);
  }
} catch (error) {
  // This runs if ANYTHING in the try block fails (network down, bad JSON, etc.)
  console.error("An error occurred while fetching data:", error.message);
}

// ========================================================================================================
// USING AN IMMEDIATE INVOKED FUNCTION EXPRESSION (IIFE) WITH TRY & CATCH
// ========================================================================================================

(async () => {
  try {
    let response = await fetch("url1");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();

    for (let x in data) {
      console.log(x);
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
})();

// ========================================================================================================
// OTHER METHODS
// ========================================================================================================

// 1. Use an AbortController to implement a timeout
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

// 2. Use configuration/environment variables for your API endpoints
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.example.com/data";

try {
  const response = await fetch(API_URL, {
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${apiToken}` // Common professional addition
    },
  });

  // Clear timeout if the fetch succeeds before 5 seconds
  clearTimeout(timeoutId);

  // Handle HTTP errors cleanly
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Professional safe guard: Ensure data is an iterable object before looping
  if (data && typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        console.log(`${key}:`, data[key]);
      }
    }
  }
} catch (error) {
  clearTimeout(timeoutId); // Ensure cleanup in case of errors

  // Handle specific error types
  if (error.name === "AbortError") {
    console.error(
      "Request failed: The server took too long to respond (Timeout).",
    );
  } else if (error instanceof SyntaxError) {
    console.error("Request failed: Server did not return valid JSON.");
  } else {
    console.error("Network or unexpected error:", error.message);
  }
}
