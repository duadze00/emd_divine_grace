// @ts-check
// Always at this at the top of your file when using type hint

/**
 * ==========================================================================
 * THE ULTIMATE GUIDE TO NATIVE JAVASCRIPT TYPE HINTING (JSDOC)
 * ==========================================================================
 * - No build tools or compilers needed.
 * - This is pure JavaScript that runs natively in Node.js or the browser.
 * ==========================================================================
 */

// ==========================================================================
// 1. PRIMITIVES & ARRAYS
// ==========================================================================

/** @type {string} */
let username = "Dev_User";

/** @type {number} */
let userId = 101;

/** @type {boolean} */
let isActive = true;

/** @type {number[]} */
let scores = [95, 88, 100];

// ==========================================================================
// 2. OBJECTS & CUSTOM TYPES (CORRECTED SYNTAX)
// ==========================================================================

/**
 * @typedef {Object} UserProfile
 * @property {number} id            - Note: JSDoc uses explicit types.
 * @property {string} name
 * @property {string} email
 * @property {string} [phoneNumber] - The brackets [] make it optional
 */

/** @type {{ readonly id: number, name: string, email: string, phoneNumber?: string }} */
const employee = {
  id: 2002,
  name: "Alice",
  email: "alice@company.com",
};

// ==========================================================================
// 3. ADVANCED TYPES (Unions & Literals)
// ==========================================================================

/** @typedef {string | number} ID */

/** @typedef {"success" | "failed" | "pending"} HTTPStatus */

/**
 * @param {ID} id
 * @param {HTTPStatus} status
 * @returns {void}
 */
function handleResponse(id, status) {
  console.log(`Job ${id} status is: ${status}`);
}

// ==========================================================================
// 4. FUNCTIONS & CALLBACKS
// ==========================================================================

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const add = (a, b) => {
  return a + b;
};

// ==========================================================================
// 5. ULTIMATE ESCAPE HATCHES
// ==========================================================================

/** @type {any} */
let dangerousData = { x: 0 };

/** @type {unknown} */
let secureData = "Hello World";

if (typeof secureData === "string") {
  console.log(secureData.toUpperCase());
}

// ================================================================================
// REAL WORLD USE
// ================================================================================
// @ts-check

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} category
 */

/**
 * Fetches a product from the database
 * @param {number} productId
 * @returns {Promise<Product>}
 */
async function fetchProduct(productId) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`,
  );
  const data = await response.json();

  return data;
}

// REAL WORLD USAGE:
async function displayUI() {
  const item = await fetchProduct(1);

  // As you type "item.", your editor will instantly autocomplete:
  // id, title, price, category
  console.log(item.title.toUpperCase());
}
