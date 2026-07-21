// ============================================================================
// 1. COMPLETE STRING METHODS & PROPERTIES
// ============================================================================

let text = "  JavaScript is awesome!  ";

// --- Properties ---
console.log(text.length); // 26 (Total character count)

// --- Searching & Inspecting ---
console.log(text.includes("Script")); // true (Case-sensitive check)
console.log(text.startsWith("Java")); // false (Because of leading whitespace)
console.log(text.trim().startsWith("Java")); // true (Fixed by removing whitespace)
console.log(text.endsWith("!")); // false (Trailing whitespace)
console.log(text.indexOf("is")); // 13 (Index of first occurrence)
console.log(text.lastIndexOf("a")); // 14 (Last occurrence of 'a')
console.log(text.search(/awesome/i)); // 16 (Regex search, returns index)

// --- Extracting Substrings ---
// Industry standard: Use .slice(). Avoid deprecated .substr()
console.log(text.slice(2, 12)); // "JavaScript" (Extracts from index 2 up to 12)
console.log(text.slice(-10)); // "awesome!  " (Negative numbers count from end)
console.log(text.substring(2, 12)); // "JavaScript" (Similar to slice, but no negative indices)

// --- Modifying & Cleaning ---
console.log(text.toLowerCase()); // "  javascript is awesome!  "
console.log(text.toUpperCase()); // "  JAVASCRIPT IS AWESOME!  "
console.log(text.trim()); // "JavaScript is awesome!" (Removes both ends)
console.log(text.trimStart()); // "JavaScript is awesome!  "
console.log(text.trimEnd()); // "  JavaScript is awesome!"
console.log(text.repeat(2)); // Repeats the entire string twice
console.log(text.padStart(30, ".")); // Pads start with '.' until length is 30
console.log(text.padEnd(30, ".")); // Pads end with '.' until length is 30

// --- Replacing ---
let report = "Rain in Spain falls mainly on the plain.";
console.log(report.replace("Spain", "Ghana")); // Replaces first occurrence
console.log(report.replaceAll("ain", "XYZ")); // Modern ES2021: Replaces ALL matches without complex Regex

// --- Splitting & Converting ---
console.log(text.trim().split(" ")); // ["JavaScript", "is", "awesome!"] (Splits into array)
console.log(text.charAt(2)); // "J" (Character at index)
console.log(text.charCodeAt(2)); // 74 (UTF-16 code element at index)
console.log(String.fromCodePoint(97)); // "a" (Modern alternative to fromCharCode)

// ============================================================================
// 2. COMPLETE ARRAY METHODS (The Core of JS Data Manipulation)
// ============================================================================

const items = ["Laptop", "Mouse", "Keyboard"];

// --- Basic Mutations ---
items.push("Monitor"); // Adds to end -> ["Laptop", "Mouse", "Keyboard", "Monitor"]
items.pop(); // Removes from end -> returns "Monitor"
items.unshift("Desk"); // Adds to front -> ["Desk", "Laptop", "Mouse", "Keyboard"]
items.shift(); // Removes from front -> returns "Desk"

// --- Modifying & Re-arranging ---
// splice(startIndex, deleteCount, item1, item2...) MUTATES the original array
items.splice(1, 1, "Trackpad"); // Removes 1 item at index 1, inserts "Trackpad"
console.log(items); // ["Laptop", "Trackpad", "Keyboard"]

// slice(start, end) DOES NOT mutate. It copies a chunk out.
const subset = items.slice(0, 2); // ["Laptop", "Trackpad"]

const positions = ["A", "B", "C"];
positions.reverse(); // Mutates: ["C", "B", "A"]
positions.sort(); // Mutates: Sorts alphabetically

// CRITICAL JOB TIP: Sorting numbers requires a callback function!
const numbers = [40, 100, 1, 5, 25];
numbers.sort((a, b) => a - b); // Ascending order: [1, 5, 25, 40, 100]
numbers.sort((a, b) => b - a); // Descending order: [100, 40, 25, 5, 1]

// --- Searching & Locating ---
const users = ["Alice", "Bob", "Charlie", "Bob"];
console.log(users.indexOf("Bob")); // 1
console.log(users.lastIndexOf("Bob")); // 3
console.log(users.includes("Charlie")); // true

// Modern / Object-safe searching
const employees = [
  { id: 1, name: "Eric" },
  { id: 2, name: "Mawule" },
];
const found = employees.find((emp) => emp.id === 2); // Returns the actual object matching condition
const foundIndex = employees.findIndex((emp) => emp.id === 2); // Returns index (1)

// --- Modern Iterators & Functional Methods (Crucial for Interviews) ---
const prices = [10, 20, 30, 40];

// .forEach() - Runs a function on every item (Does not return anything)
prices.forEach((price) => console.log(`Price: $${price}`));

// .map() - Transforms data. Returns a BRAND NEW array of equal length
const doubled = prices.map((price) => price * 2); // [20, 40, 60, 80]

// .filter() - Strips out unwanted data based on a condition
const expensive = prices.filter((price) => price > 25); // [30, 40]

// .reduce() - Accumulates array into a single value (number, object, string)
// syntax: array.reduce((accumulator, currentItem) => value, initialValue)
const totalInvoice = prices.reduce((sum, price) => sum + price, 0); // 100

// .some() - Returns true if AT LEAST ONE item meets condition
const hasCheapItem = prices.some((price) => price < 15); // true

// .every() - Returns true ONLY if ALL items meet condition
const allExpensive = prices.every((price) => price > 50); // false

// --- Advanced Utility ---
const nestedArray = [1, [2, 3], [[4, 5]]];
console.log(nestedArray.flat(1)); // [1, 2, 3, [4, 5]] (Flattens 1 layer deep)
console.log(nestedArray.flat(2)); // [1, 2, 3, 4, 5] (Flattens 2 layers deep)

// .flatMap() - Combines mapping and flattening into 1 step for performance
const phrases = ["hello world", "good morning"];
const words = phrases.flatMap((phrase) => phrase.split(" ")); // ["hello", "world", "good", "morning"]

// Converting Iterators back to clean arrays
const uniqueSet = new Set([1, 2, 2, 3]);
const cleanArray = Array.from(uniqueSet); // [1, 2, 3]

// ============================================================================
// 3. COMPLETE OBJECT METHODS (Essential for API Data Handling)
// ============================================================================

const developer = {
  name: "Eric",
  role: "Software Engineer",
  country: "Ghana",
  experienceYears: 5,
};

// --- Extracting Keys, Values, and Entries ---
const keys = Object.keys(developer);
// ["name", "role", "country", "experienceYears"]

const values = Object.values(developer);
// ["Eric", "Software Engineer", "Ghana", 5]

const entries = Object.entries(developer);
// [ ["name", "Eric"], ["role", "Software Engineer"], ["country", "Ghana"], ["experienceYears", 5] ]

// --- Reconstructing Objects ---
// Object.fromEntries() converts a list of key-value pairs back into an object
const restoredObj = Object.fromEntries(entries);

// --- Merging and Cloning Objects ---
const technicalSkills = { primary: "JavaScript", framework: "React" };

// Object.assign(target, ...sources) - Merges objects into target (Mutates target)
// Modern dev note: Usually replaced now by the Spread Operator: {...developer, ...technicalSkills}
const completeProfile = Object.assign({}, developer, technicalSkills);

// --- Integrity & Security Level Methods ---

// 1. Object.freeze() -> absolute lockdown. Cannot add, delete, or change properties.
const config = { apiEndpoint: "https://api.com" };
Object.freeze(config);
config.apiEndpoint = "broken link"; // Fails silently (or throws error in Strict Mode)
console.log(config.apiEndpoint); // Still "https://api.com"
console.log(Object.isFrozen(config)); // true

// 2. Object.seal() -> Restricted lockdown. Can change EXISTING properties, but CANNOT add or delete.
const userSession = { loggedIn: true };
Object.seal(userSession);
userSession.loggedIn = false; // Works!
userSession.newProperty = "test"; // Blocked!
console.log(Object.isSealed(userSession)); // true

// --- Prototype Inspection ---
console.log(developer.hasOwnProperty("name")); // true (Checks if property belongs to object directly, not prototype)

// ============================================================================
// BONUS: REAL-WORLD PATTERNS YOU ABSOLUTELY NEED FOR A JOB
// ============================================================================

// Optional Chaining (?.) and Nullish Coalescing (??)
// Stops your app from crashing if an API returns null/undefined data nested down.
const serverResponse = {
  status: 200,
  data: {
    profile: null, // Notice profile is missing expected properties
  },
};

// Safe access without throwing "Cannot read property 'city' of null"
const userCity = serverResponse.data?.profile?.address?.city ?? "Accra";
console.log(userCity); // "Accra" (Gracefully fell back to default value!)
