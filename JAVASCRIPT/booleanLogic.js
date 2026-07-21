/*******************************************************************************
 * THE ULTIMATE JAVASCRIPT BOOLEAN LOGIC & TRUTHY/FALSY REFERENCE GUIDE
 * * Keep this file handy. You can run this directly in Node.js or your browser console.
 ******************************************************************************/

// =============================================================================
// 1. THE BIG TRAP: OPERATOR PRECEDENCE
// =============================================================================

function precedenceTrapDemo() {
  const password = "SecretPassword123";
  const confirmPassword = "SecretPassword123";

  // THE BUG (Your Example):
  // What you think it does:  !(confirmPassword === password)  -> !(true)  -> false
  // What it ACTUALLY does:   (!confirmPassword) === password -> (false) === "SecretPassword123" -> false
  if (!confirmPassword === password) {
    console.log("Bug triggered: Passwords do not match (Even though they do!)");
  }

  //  THE FIXES:
  // Fix A: Use parentheses to force the equality comparison first.
  if (!(confirmPassword === password)) {
  }

  // Fix B: Use the inequality operator (Much cleaner, standard industry practice).
  if (confirmPassword !== password) {
    console.log(" This is correct. This block won't run because they match.");
  }
}

// =============================================================================
// 2. TRUTHY VS. FALSY VALUES (Every dev must memorize these)
// =============================================================================

function truthyFalsyDemo() {
  // There are exactly 8 FALSY values in JavaScript. Everything else is TRUTHY.
  const falsyValues = [
    false,
    0, // The number zero
    -0, // Negative zero
    0n, // BigInt zero
    "", // Empty string
    null,
    undefined,
    NaN, // Not a Number
  ];

  //  COMMON JUNIOR INTERVIEW TRAPS (These look falsy, but are TRUTHY!)
  const deceptiveTruthyValues = [
    [], // Empty Array is TRUTHY!
    {}, // Empty Object is TRUTHY!
    " ", // String with just a space is TRUTHY!
    "false", // Non-empty string is TRUTHY!
  ];

  // Example of a clean, real-world truthy check:
  let userInput = "  ";
  if (userInput) {
    // This will run because a string with spaces is truthy.
    // Senior tip: Always use .trim() for text inputs!
  }
}

// =============================================================================
// 3. LOGICAL OPERATORS DEEP DIVE (&&, ||, !)
// =============================================================================

function logicalOperatorsDemo() {
  // -------------------------------------------------------------------------
  // A. Logical NOT (!) - Forces a value to a strict boolean opposite.
  // -------------------------------------------------------------------------
  console.log(!true); // false
  console.log(!0); // true (0 is falsy, so !0 is true)

  // Pro-Tip: Double NOT (!!) is used to explicitly cast anything to a clean boolean.
  const username = "DevGuy";
  const isLoggedIn = !!username; // true

  // -------------------------------------------------------------------------
  // B. Logical AND (&&) - "The Guardian"
  // Rules: Evaluates left to right. Returns the FIRST FALSY value it hits.
  // If all are truthy, it returns the LAST value.
  // -------------------------------------------------------------------------
  console.log("apple" && 0 && "banana"); // Returns: 0 (It hits 0 and stops)
  console.log("apple" && "orange" && "banana"); // Returns: "banana" (All truthy, returns last)

  // Real-world use: React / UI short-circuit rendering
  const hasPremiumAccount = true;
  const showBonusContent = hasPremiumAccount && "Welcome to the VIP Lounge";
  // If premium is true, showBonusContent becomes the string. If false, it becomes false.

  // -------------------------------------------------------------------------
  // C. Logical OR (||) - "The Fallback"
  // Rules: Evaluates left to right. Returns the FIRST TRUTHY value it hits.
  // If all are falsy, it returns the LAST value.
  // -------------------------------------------------------------------------
  console.log(null || undefined || "Valid Data" || "Backup Data"); // Returns: "Valid Data"

  // Real-world use: Setting default values
  let userNickname = "";
  let displayName = userNickname || "Anonymous Guest";
  // Bug Warning: If userNickname was 0 (like a game score), || treats it as falsy and overwrites it!
}

// =============================================================================
// 4. THE MISSING PIECES (What you need to know for Senior/Job-Ready status)
// =============================================================================

function advancedLogicDemo() {
  // -------------------------------------------------------------------------
  // A. Nullish Coalescing Operator (??)
  // Fixes the || bug. It ONLY triggers for 'null' or 'undefined'.
  // It treats 0 and "" (empty strings) as completely valid data.
  // -------------------------------------------------------------------------
  let userScore = 0;

  let badDefault = userScore || 10; // Returns 10 (Because 0 is falsy. Bug!)
  let goodDefault = userScore ?? 10; // Returns 0  (Because 0 is not null/undefined!)

  // -------------------------------------------------------------------------
  // B. Optional Chaining (?.)
  // Safely read deeply nested object properties without throwing a crashing error.
  // -------------------------------------------------------------------------
  const apiResponse = {
    user: {
      profile: null, // Maybe the user hasn't filled this out yet
    },
  };

  // This would CRASH the app: apiResponse.user.profile.theme
  // This is safe and returns undefined:
  const userTheme = apiResponse?.user?.profile?.theme ?? "default-dark";

  // -------------------------------------------------------------------------
  // C. Operator Precedence Master Cheat-Sheet
  // Higher on the list executes first.
  // -------------------------------------------------------------------------
  // 1. Grouping:             ( )
  // 2. Member Access/Chain:  .  ?.
  // 3. Logical NOT / Unary:  !  ++  --
  // 4. Comparison:           ===  !==  <  >
  // 5. Logical AND:          &&
  // 6. Logical OR:           ||
  // 7. Nullish Coalescing:   ??
  // 8. Assignment:           =
}

// Run all code to ensure it's functional
precedenceTrapDemo();
truthyFalsyDemo();
logicalOperatorsDemo();
advancedLogicDemo();

/*******************************************************************************
 * THE JOB-READY JAVASCRIPT BOOLEAN LOGIC CHEAT SHEET
 ******************************************************************************/

// 1. WHAT IS A BOOLEAN?
const isLoggedIn = true;
const isAdmin = false;

// 2. COMPARISON OPERATORS
5 > 3; // true
5 < 3; // false
5 >= 5; // true
5 <= 4; // false
5 == "5"; // true  (Loose equality: converts types)
5 === "5"; // false (Strict equality: checks value AND type)
5 != "5"; // false (Loose inequality)
5 !== "5"; // true  (Strict inequality)

// 3. == VS === (Rule: Always use === and !==)
5 === 5; // true
true === 1; // false
undefined === null; // false

// 4. LOGICAL AND (&&) - All must be true
true && true; // true
true && false; // false
false && false; // false

const hasValidEmail = true;
const hasValidPassword = true;
if (hasValidEmail && hasValidPassword) {
  console.log("Form valid");
}

// 5. LOGICAL OR (||) - At least one must be true
true || false; // true
false || false; // false

const isOwner = false;
const isEmployee = true;
if (isOwner || isEmployee) {
  console.log("Access allowed");
}

// 6. LOGICAL NOT (!) - Flips the value
!true; // false
!false; // true

const hasToken = false;
if (!hasToken) {
  console.log("Redirect to login");
}

// 7. DOUBLE NOT (!!) - Explicitly casts any value to a Boolean
!!"Eric"; // true
!!0; // false
!!null; // false
!![]; // true

// 8. THE 8 FALSY VALUES (Everything else is TRUTHY)
// false, 0, -0, 0n, "", null, undefined, NaN

// 9. DECEPTIVE TRUTHY VALUES (Common interview traps)
// [], {}, " ", "false"

// 10. TRUTHY/FALSY IN REAL PROJECTS
if (username) {
  /* Runs if username is not empty, null, or undefined */
}
if (!errorMessage) {
  /* Runs if there is no error message */
}

// 11. SHORT-CIRCUIT EVALUATION (&& and ||)
// && returns the first FALSY value, or the last value if all are truthy
const renderDashboard = isLoggedIn && "<div>Dashboard</div>";

// || returns the first TRUTHY value, or the last value if all are falsy
const currentTheme = userTheme || "light-mode";

// 12. NULLISH COALESCING (??) - Fixes the || bug for 0 and ""
// Only triggers fallback on null or undefined
const gameScore = 0;
const setup1 = gameScore || 10; // 10 (Wrong: 0 is a valid score but falsy)
const setup2 = gameScore ?? 10; // 0  (Correct: 0 is not nullish)

// 13. OPERATOR PRECEDENCE & MISTAKES
// Wrong: ! gets evaluated before ===
if (!confirmPassword === password) {
}

// Correct:
if (confirmPassword !== password) {
}
if (!(confirmPassword === password)) {
}

// 14. CLEAN CONDITIONAL GROUPING
const isAdultAdmin = age > 18 && role === "admin";
const isManager = role === "manager";

if ((isAdultAdmin || isManager) && !isSuspended) {
  console.log("Access granted");
}

// 15. DE MORGAN'S LAWS
!(a && b) === (!a || !b);
!(a || b) === (!a && !b);

// Real-world trade:
if (!(isLoaded && hasData)) {
}
if (!isLoaded || !hasData) {
} // Same meaning, often easier to parse

// 16. OPTIONAL CHAINING (?.) & GUARD CLAUSES
// Stops execution and returns undefined if a nested property doesn't exist
const zipCode = user?.address?.shipping?.zip ?? "00000";

// Guard Clause: Exit early to avoid nested 'if' blocks
function processPayment(user, payment) {
  if (!user.isLoggedIn) return "Please log in";
  if (!payment.isValid) return "Invalid payment method";

  return "Payment processed";
}

// 17. TERNARY OPERATOR (condition ? ifTrue : ifFalse)
const accessMessage = isAdmin ? "Welcome Admin" : "Welcome Guest";

// 18. PREDICATE FUNCTIONS (Functions returning a boolean)
const isEmailValid = (str) => str.includes("@");
const isExpired = (exp) => Date.now() > exp;

// 19. BOOLEAN-DRIVEN ARRAY METHODS
const users = [
  { name: "Eric", active: true, age: 25 },
  { name: "Sam", active: false, age: 17 },
];

// .filter() uses a boolean check to keep items
const activeUsers = users.filter((user) => user.active);

// .some() returns true if AT LEAST ONE item matches
const hasMinors = users.some((user) => user.age < 18); // true

// .every() returns true if ALL items match
const allActive = users.every((user) => user.active); // false
