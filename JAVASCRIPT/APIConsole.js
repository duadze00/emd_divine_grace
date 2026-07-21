// ============================================================================
// STANDARD OUTPUT METHODS
// ============================================================================

// 1. log()
// General-purpose logging for strings, objects, and variables.
console.log("This is a standard log message.");

// 2. info()
// Informational message. In some browsers (like Firefox), it displays an 'i' icon next to the text.
console.info("This is an informational message.");

// 3. warn()
// Displays a warning message with a yellow warning icon and a mini stack trace.
console.warn("Warning: This function will be deprecated soon!");

// 4. error()
// Displays a critical error message with a red icon and a full, expandable stack trace.
console.error("Error: Failed to fetch data from the server.");

// ============================================================================
// STRUCTURAL & VISUAL LAYOUT OUTPUTS
// ============================================================================

// 5. table()
// Highly powerful! Displays arrays or objects as a beautiful, clean interactive table.
var users = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "Developer" },
];
console.table(users);

// 6. trace()
// Prints a full stack trace to the console showing the exact path the code took to reach that point.
function functionA() {
  functionB();
}
function functionB() {
  console.trace("Show me how I got here:");
}
functionA(); // Calling this will print the execution path from functionA down to functionB

// ============================================================================
// CONSOLE STATE CONTROL
// ============================================================================

// 1. assert()
// Conditional logging. Writes an error message to the console *only* if the expression evaluates to false.
var userAge = 15;
console.assert(userAge >= 18, "Access Denied: User is under 18!");

// 2. count()
// Logs the number of times this specific count call has been invoked with this label.
console.count("Button Clicked"); // Outputs: "Button Clicked: 1"
console.count("Button Clicked"); // Outputs: "Button Clicked: 2"

// 3. countReset()
// Resets the counter engine for a specific label back to zero.
console.countReset("Button Clicked");

// 4. clear()
// Wipes the console screen clean of all previous logs (if allowed by browser settings).
console.clear();

// ============================================================================
// COLLAPSIBLE LOG GROUPS
// ============================================================================

// 1. group()
// Creates a new console log group block that is expanded by default.
console.group("User Authentication Process");
console.log("Checking credentials...");
console.log("Access token approved.");
console.groupEnd(); // Must call groupEnd() to close the block

// 2. groupCollapsed()
// Creates a console log group block that is hidden/collapsed by default.
console.groupCollapsed("System Hardware Details");
console.log("CPU Architecture: x64");
console.log("Memory Availability: High");
console.groupEnd(); // Closes the collapsed group block

// ============================================================================
// TIME MEASUREMENTS
// ============================================================================

// 1. time() & timeEnd()
// Starts a performance tracking timer with a unique label name, and stops it to display elapsed milliseconds.
console.time("Loop Performance Tracker");
for (var i = 0; i < 1000000; i++) {
  // Simulating heavy code calculations...
}
console.timeEnd("Loop Performance Tracker"); // Outputs something like: "Loop Performance Tracker: 2.14 ms"

// 2. timeLog()
// Logs the value of a timer that was previously started without stopping it.
console.time("Fetch Timer");
// ... code executes ...
console.timeLog("Fetch Timer"); // Logs elapsed time midway
// ... more code executes ...
console.timeEnd("Fetch Timer"); // Stops the timer completely

// ============================================================================
// MODERN CONSOLE ADDITIONS
// ============================================================================

// A. Advanced Object Inspection (console.dir)
// Prints an interactive JSON-like tree layout listing of all JavaScript properties belonging to an object.
// Excellent for inspecting HTML DOM elements as objects instead of raw HTML tags.
console.dir(document.body);

// B. CSS Styled Console Strings
// You can style console text by adding "%c" at the beginning of your string,
// and passing a CSS style string as the second argument!
console.log(
  "%c STOP! %c Critical System Panel ",
  "color: red; font-size: 24px; font-weight: bold;",
  "color: black; background: yellow;",
);

// C. String Substitutions / Placeholders
// You can use formatting flags (%s = string, %d/%i = integer, %o = object) to pass parameters smoothly.
var playerName = "Alex";
var playerScore = 450;
console.log("Player %s scored %d points!", playerName, playerScore);


