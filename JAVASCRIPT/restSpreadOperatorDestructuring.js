// ============================================================================
// THE ULTIMATE GUIDE TO SPREAD, REST AND DESTRUCTURING IN JAVASCRIPT
// ============================================================================

// ----------------------------------------------------------------------------
// TOPIC 1: THE REST OPERATOR (...)
// ----------------------------------------------------------------------------
// PURPOSE: "Gathers" multiple individual elements into a single array or object.
// THINK OF IT AS: Putting loose items scattered on the floor back into a box.
// SYNTAX NOTE: It looks identical to Spread (...), but it is used in the exact opposite way.
// ----------------------------------------------------------------------------

// A. Rest in Function Parameters
// This allows a function to accept any number of arguments as an array.
function sumEverything(...nums) {
  // 'nums' is now a real array containing all passed arguments
  return nums.reduce((total, current) => total + current, 0);
}
console.log("Sum:", sumEverything(1, 2, 3, 4, 5)); // 15

// B. Rest with Regular Parameters
// CRITICAL RULE: The rest parameter MUST be the last parameter in the function signature!
function driverLicense(firstName, lastName, ...scores) {
  console.log(`Driver: ${firstName} ${lastName}`);
  console.log(`Test Scores gathered by Rest:`, scores);
}
driverLicense("John", "Doe", 95, 88, 100);
// firstName = "John", lastName = "Doe", scores = [95, 88, 100]

/* DIFFERENCE / KEY TAKEAWAY FOR REST:
  - It acts on the RECEIVING/COLLAPSING side.
  - It condenses multiple separate elements into a tidy array or object.
  - SPREAD unpacks arrays/objects; REST packs values into arrays/objects.
*/

// ----------------------------------------------------------------------------
// TOPIC 2: THE SPREAD OPERATOR (...)
// ----------------------------------------------------------------------------
// PURPOSE: "Unpacks" elements of an array or object into individual values.
// THINK OF IT AS: Dumping the contents of a box out onto the floor.
// ----------------------------------------------------------------------------

// A. Spreading Arrays
const fruits = ["apple", "banana"];
const veggies = ["carrot", "potato"];

// Combining arrays (Instead of using .concat())
const food = [...fruits, ...veggies, "donut"];
console.log("Combined Array:", food); // ['apple', 'banana', 'carrot', 'potato', 'donut']

// Creating a shallow copy of an array
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];
// copiedArray is a brand new array in memory. Modifying it won't hurt originalArray.

// B. Spreading Objects
const userBase = { name: "Alex", age: 25 };

// Copying and adding/updating properties at the same time
const updatedUser = {
  ...userBase,
  location: "New York", // Adding a new property
  age: 26, // Overwriting an existing property (Order matters! Put updates last)
};
console.log("Updated Object:", updatedUser); // { name: 'Alex', age: 26, location: 'New York' }

// C. Spreading into Function Calls
const numbers = [10, 45, 2, 99, 14];
// Math.max expects individual arguments, not an array. Spread solves this!
const maxNum = Math.max(...numbers);
console.log("Max Number:", maxNum); // 99

/* DIFFERENCE / KEY TAKEAWAY FOR SPREAD:
  - It acts on the SENDING/EXPANDING side.
  - It takes an existing collection (array/object) and spreads it out.
  - It is always used where individual values are expected (arguments, array literals, object literals).
*/

// ----------------------------------------------------------------------------
// TOPIC 3: DESTRUCTURING (ARRAYS, OBJECTS & FUNCTIONS)
// ----------------------------------------------------------------------------
// PURPOSE: A clean syntax to extract values from arrays or properties from objects
//          and assign them directly to distinct variables.
// ----------------------------------------------------------------------------

// A. Array Destructuring
// Based strictly on POSITION (index).
const RGB = [255, 128, 0];
const [red, green, blue] = RGB;
console.log(`Colors -> R: ${red}, G: ${green}, B: ${blue}`); // 255, 128, 0

// Skipping elements in array destructuring
const [primaryColor, , tertiaryColor] = ["red", "yellow", "blue"];
console.log(`Skipped yellow: ${primaryColor} and ${tertiaryColor}`); // red and blue

// A nested array (matrix)
const rgbColors = [
  [255, 0, 0], // Red
  [0, 255, 0], // Green
  [0, 0, 255], // Blue
];

// Extracting specific values from nested arrays
const [
  [redH], // Gets the first element of the first array
  ,
  // Skips the second array entirely
  [, , blueL], // Skips first two elements of the third array, gets the third
] = rgbColors;

console.log(redH); // Output: 255
console.log(blueL); // Output: 255

// B. Object Destructuring
// Based strictly on PROPERTY KEYS (names), not position.
const movie = { title: "Inception", director: "Nolan", year: 2010 };
const { title, director } = movie;
console.log(`Movie: ${title} directed by ${director}`);

// The source object for nested destructuring
const user = {
  id: 101,
  profile: {
    username: "js_wizard",
    fullName: {
      first: "Alex",
      last: "Mercer",
    },
    socials: {
      twitter: "@alex_m",
    },
  },
};

// 1. Standard nested destructuring
const {
  profile: {
    fullName: { first, last },
  },
} = user;
console.log(first); // Output: Alex
console.log(last); // Output: Mercer

// 2. Destructuring with renaming (alias) and default values
const {
  profile: {
    username: handle, // Renames 'username' to 'handle'
    socials: { github = "N/A" }, // Provides default value if undefined
  },
} = user;

console.log(handle); // Output: js_wizard
console.log(github); // Output: N/A

// C. Advanced Destructuring Features
// 1. Renaming variables during object destructuring:
const { title: movieTitle } = movie;
console.log("Renamed Variable:", movieTitle); // Inception

// 2. Default Values (Fallback if property/element doesn't exist):
const settings = { theme: "dark" };
const { theme, fontSize = "16px" } = settings;
console.log(`Theme: ${theme}, Size: ${fontSize}`); // dark, 16px (fallback used)

// Typical API response structure
const course = {
  title: "JavaScript Advanced",
  lessons: [
    { title: "Prototypes", duration: "15m" },
    { title: "Destructuring", duration: "10m" },
  ],
};

// Digging through an object, into an array, into a specific object
const {
  lessons: [
    { title: firstLessonTitle }, // Extracts title from the first lesson object
    { duration: secondLessonDuration }, // Extracts duration from the second lesson object
  ],
} = course;

console.log(firstLessonTitle); // Output: Prototypes
console.log(secondLessonDuration); // Output: 10m

// D. Function Destructuring
function destructuringFnx(a, b) {
  const add = a + b;
  const subtract = a - b;
  const multiply = a * b;
  const divide = a / b;

  // Directly returning the mathematical results in an array
  return [add, subtract, multiply, divide];
}
const [add, subtract, multiply, divide] = destructuringFnx(4, 6);

console.log(add); // 10
console.log(subtract); // -2
console.log(multiply); // 24
console.log(divide); // 0.666...

/* DIFFERENCE / KEY TAKEAWAY FOR DESTRUCTURING:
  - Array destructuring uses brackets `[]` and relies on index order.
  - Object destructuring uses curly braces `{}` and relies on matching property names.
*/

// ----------------------------------------------------------------------------
// TOPIC 4: COMBINING THEM ALL TOGETHER (THE POWER PLAYS)
// ----------------------------------------------------------------------------
// This is where modern JavaScript gets incredibly powerful and elegant.
// ----------------------------------------------------------------------------

// A. Destructuring with REST
// You can grab what you need, and use REST to dump the "rest" of the data into a new variable.
const highScores = [100, 90, 85, 70, 60];
const [gold, silver, ...theRestOfScores] = highScores;
console.log(`Gold: ${gold}, Silver: ${silver}`); // 100, 90
console.log(`Others gathered by Rest:`, theRestOfScores); // [85, 70, 60]

// Doing the same with Objects:
const hardware = { cpu: "i9", ram: "32GB", gpu: "RTX 4090", storage: "2TB" };
const { cpu, gpu, ...otherSpecs } = hardware;
console.log(`Core Gaming Specs: ${cpu} and ${gpu}`);
console.log(`Other Specs gathered by Rest:`, otherSpecs); // { ram: '32GB', storage: '2TB' }

// B. Destructuring Object Parameters directly in a Function
const developer = {
  username: "DevDan",
  skills: ["JS", "Python"],
  meta: { verified: true },
};

function greetDeveloper({
  username,
  skills: [primarySkill],
  meta: { verified },
}) {
  // Notice we also nested destructured 'skills' to get just the first element!
  console.log(
    `Hello ${username}! Your primary skill is ${primarySkill}. Verified: ${verified}`,
  );
}
greetDeveloper(developer); // Hello DevDan! Your primary skill is JS. Verified: true

const order = {
  orderId: "A982",
  customer: {
    email: "hello@example.com",
  },
};

// Destructuring the nested customer email directly in the parameter list
function sendReceipt({ orderId, customer: { email } }) {
  console.log(`Receipt for order ${orderId} sent to ${email}`);
}
sendReceipt(order); // Output: Receipt for order A982 sent to hello@example.com

// ------------------------------------------------------------------------------------------------------------
// SUMMARY OF DIFFERENCES AT A GLANCE
// ------------------------------------------------------------------------------------------------------------
/*
  +------------------+----------------------------------------------+-----------------------------------------+
  | FEATURE          | SYNTAX KEYPLACE                              | CORE ACTION                             |
  +------------------+----------------------------------------------+-----------------------------------------+
  | SPREAD (...)     | In expressions / values                      | "Explodes" 1 item into multiple items.  |
  |                  | (e.g. [...arr] or func(...args))             |                                         |
  +------------------+----------------------------------------------+-----------------------------------------+
  | REST (...)       | In assignments / parameters                  | "Collapses" multiple items into 1 item. |
  |                  | (e.g. [a, ...rest] or function f(...args))   |                                         |
  +------------------+----------------------------------------------+-----------------------------------------+
  | DESTRUCTURING    | Left side of an assignment                   | "Extracts" values out of a structure    |
  |                  | (e.g. const [x] = array)                     | directly into single variables.         |
  +------------------+----------------------------------------------+-----------------------------------------+
*/
