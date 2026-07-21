// ==========================================
// 1. THE LOGICAL AND OPERATOR (&&)
// ==========================================
// Condition: Returns true ONLY if BOTH sides are true.
// Short-circuiting: If the first value is false, it stops and returns it immediately.

let hasDriverLicense = true;
let isSober = true;

// Both must be true to drive
let canDrive = hasDriverLicense && isSober;
console.log("Can drive?", canDrive); // Output: true

// Short-circuit example:
// Because 'false' is hit first, JS doesn't even look at 'isRainy'.
let isSunny = false;
let isRainy = true;
console.log(isSunny && isRainy); // Output: false

// ==========================================
// 2. THE LOGICAL OR OPERATOR (||)
// ==========================================
// Condition: Returns true if AT LEAST ONE side is true.
// Short-circuiting: If the first value is true, it stops and returns it immediately.

let hasCash = false;
let hasCreditCard = true;

// Only one needs to be true to buy food
let canBuyFood = hasCash || hasCreditCard;
console.log("Can buy food?", canBuyFood); // Output: true

// ==========================================
// 3. THE LOGICAL NOT OPERATOR (!)
// ==========================================
// Condition: Inverts the boolean value (true becomes false, false becomes true).

let isWeekend = false;
let isWeekday = !isWeekend; // Inverts false to true
console.log("Is it a weekday?", isWeekday); // Output: true

// Pro-Tip: Double NOT (!!) forces any value into a strict boolean
let username = "Alex";
console.log(!!username); // Output: true (because a non-empty string is "truthy")

// ==========================================
// 4. IMPORTANT BONUS: TRUTHY VS FALSY
// ==========================================
// In JS, values don't have to be strictly true/false to be evaluated.
// These 6 values are ALWAYS "Falsy":
// 1. false
// 2. 0 (and -0, 0n)
// 3. "" (empty string)
// 4. null
// 5. undefined
// 6. NaN (Not a Number)
// EVERYTHING ELSE is "Truthy" (acts like true).

let itemsInCart = 0; // 0 is falsy
if (itemsInCart) {
  console.log("You have items!"); // This will NOT run
}

// ==========================================
// 5. THE NULLISH COALESCING OPERATOR (??)
// ==========================================
// Problem with ||: Sometimes 0 or "" are valid data, but || treats them as false.
// Solution ?? : It ONLY triggers if the left side is 'null' or 'undefined'.

let userScore = 0; // Valid score, but "falsy"

let defaultScoreWithOR = userScore || 10;
console.log(defaultScoreWithOR); // Output: 10 (Oops! Overwrote our 0)

let defaultScoreWithNullish = userScore ?? 10;
console.log(defaultScoreWithNullish); // Output: 0 (Correct! 0 is not null/undefined)

// ==========================================
// 6. LOGICAL ASSIGNMENT OPERATORS (Modern JS)
// ==========================================
// Shorthands that combine logical operators with variable assignment (=).

let userNickname = "";
// &&= assigns a value ONLY if the variable is currently truthy
// ||= assigns a value ONLY if the variable is currently falsy
userNickname ||= "Anonymous";
console.log(userNickname); // Output: "Anonymous" (because "" was falsy)

let serverConfig = { port: null };
// ??= assigns a value ONLY if the variable is currently null or undefined
serverConfig.port ??= 8080;
console.log(serverConfig.port); // Output: 8080

// ==========================================
// 7. OPERATOR PRECEDENCE
// ==========================================
// Just like math (Multiplication before Addition), JS evaluates logic in this order:
// 1. ! (NOT)
// 2. && (AND)
// 3. || and ?? (OR and Nullish)
// Always use parentheses () to make your code clear and predictable!

// Example: ! happens first, then &&, then ||
// true || false && false  --> evaluated as true || (false) --> true
let complexLogic = true || (!false && false);
console.log("Complex result:", complexLogic); // Output: true
