// ==========================================================================
// THE ULTIMATE GUIDE TO JAVASCRIPT MODULES (ESM) FOR PRODUCTION
// ==========================================================================
// Why Modules?
// 1. Maintainability: Decouples code into self-contained pieces.
// 2. Namespacing: Avoids polluting the global window object.
// 3. Reusability: Share logic across different parts of an application.
// 4. Tree-Shaking: Modern bundlers (Webpack, Vite) eliminate dead code automatically.
// ==========================================================================

// ==========================================================================
// FILE 1: mathUtils.js (Conceptual separate file)
// ==========================================================================
/*
  NAMED EXPORTS:
  - Perfect for utility files where you want to export multiple things.
  - MUST be imported using the exact same name inside curly braces {}.
*/

export const SECRET_KEY = "XYZ_123_SECRET"; // Exporting a constant

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Inline named export declaration later on
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) throw new Error("Cannot divide by zero.");
  return a / b;
};
export { multiply, divide }; // Bundled named exports

// ==========================================================================
// FILE 2: AuthService.js (Conceptual separate file)
// ==========================================================================
/*
  DEFAULT EXPORTS:
  - Used when a file has one primary responsibility (like a class or main function).
  - You can only have ONE default export per file.
  - When importing, you can name it whatever you want (no curly braces).
*/

export default class AuthService {
  constructor(user) {
    this.user = user;
  }

  login() {
    console.log(`${this.user} logged in successfully.`);
    return true;
  }

  logout() {
    console.log(`${this.user} logged out.`);
  }
}

// ==========================================================================
// FILE 3: index.js / main.js (Combining it all)
// ==========================================================================

// 1. Standard Named Imports
// You must match the names exactly as they were exported.
import { add, subtract, SECRET_KEY } from "./mathUtils.js";

// 2. Renaming Imports (Aliasing)
// Vital if you have naming conflicts across different modules.
import {
  multiply as multiplyNumbers,
  divide as splitNumbers,
} from "./mathUtils.js";

// 3. Namespace Import (Importing Everything as an Object)
// Excellent for mocking modules in unit tests or keeping utilities organized.
import * as MathTools from "./mathUtils.js";

// 4. Default Import
// Note: No curly braces! We can also name it 'Auth' instead of 'AuthService'.
import Auth from "./AuthService.js";

// --- EXECUTION & USE CASES ---

console.log("--- 1. Basic Named Imports ---");
console.log("Add:", add(5, 5)); // 10
console.log("Subtract:", subtract(10, 4)); // 6
console.log("Secret:", SECRET_KEY);

console.log("\n--- 2. Aliased Imports ---");
console.log("Multiplication via Alias:", multiplyNumbers(4, 5)); // 20

console.log("\n--- 3. Namespace Imports ---");
console.log("MathTools Object:", MathTools);
console.log("MathTools Add:", MathTools.add(50, 50)); // 100

console.log("\n--- 4. Default Class Import ---");
const userSession = new Auth("Senior_Developer");
userSession.login();

// ==========================================================================
// ADVANCED TOPICS (Crucial for Job Readiness & Technical Interviews)
// ==========================================================================

// 5. Aggregating/Re-exporting Modules (The "Barrel File" Pattern)
// In a real project, you might have an `index.js` inside a /components folder
// that collects exports from other files so consumers can import from one clean line.
/*
  Example code inside a barrel file:
  export { add, subtract } from './mathUtils.js';
  export { default as AuthService } from './AuthService.js';
*/

// 6. Dynamic Imports (Code Splitting / Lazy Loading)
// Interview Note: Standard imports are static (evaluated before code runs).
// Dynamic imports allow you to load code *on-demand* (e.g., when a user clicks a button).
// This reduces initial bundle size and massively improves performance metrics (LCP/FCP).

async function loadAnalyticsModule() {
  try {
    // import() returns a Promise
    const analytics = await import("./analytics.js");
    analytics.initializeTracker();
  } catch (error) {
    console.error("Failed to load the module dynamically:", error);
  }
}

// 7. Module Scope & Singleton Behavior
// - Variables declared inside a module are scoped to THAT module (not window).
// - Modules only execute ONCE. If multiple files import 'AuthService.js',
//   they all share the exact same cached instance (classic Singleton pattern).

let moduleCounter = 0;
export function incrementCounter() {
  moduleCounter++;
  console.log(`Counter is now: ${moduleCounter}`);
}
// If imported in 3 files, they all manipulate the *same* moduleCounter variable.

// 8. Top-Level Await (ES2022)
// In modern JS modules, you don't need to wrap await inside an async function
// at the root level of your file. Perfect for initializing databases or fetching configurations.

const connection = await db.connect();
export { connection };

// ==========================================================================
// HOW TO RUN THIS IN THE REAL WORLD
// ==========================================================================
/*
  1. BROWSER ENVIRONMENT:
     If using raw HTML/JS without a build tool, you MUST use the type="module" attribute:
     <script type="module" src="main.js"></script>
     
     *Note: Modules automatically run in "strict mode" ('use strict') and support CORS.
            You cannot run them locally via file:// protocol; you must use a local server (like Live Server).

  2. NODE.JS ENVIRONMENT:
     To use ES Modules (import/export) instead of CommonJS (require/module.exports):
     - Add `"type": "module"` to your root `package.json`.
     - Alternatively, name your files with the `.mjs` extension.

  3. PRODUCTION BUNDLERS (Vite, Webpack, Rollup):
     - In production, you write standard ESM code like above.
     - The bundler parses these import trees, builds a dependency graph, minifies the code,
       and uses "Tree Shaking" to delete any functions you imported but never called.
*/
