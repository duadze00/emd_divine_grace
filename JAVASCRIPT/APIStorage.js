// ============================================================================
// STORAGE OBJECT PROPERTIES & METHODS
// ============================================================================

// 1. setItem(key, value)
// Adds a key-value pair to storage, or updates the value if the key already exists.
// Crucial: Values are strictly cast and stored as strings!
localStorage.setItem("username", "Alex");
sessionStorage.setItem("isLoggedIn", "true");

// 2. getItem(key)
// Returns the string value tied to the specified key. Returns null if the key doesn't exist.
var user = localStorage.getItem("username"); // Returns: "Alex"
var status = sessionStorage.getItem("isLoggedIn"); // Returns: "true"

// 3. length
// A read-only integer property returning the total number of items stored.
var totalSavedItems = localStorage.length;

// 4. key(index)
// Returns the name of the key at a specified numerical index (useful for looping).
// Note: The browser determines the internal ordering of storage keys.
var firstKeyName = localStorage.key(0);

// 5. removeItem(key)
// Deletes a specific key-value pair from storage using its key name.
localStorage.removeItem("username");

// 6. clear()
// Wipes the entire storage tracking database clean for that origin/session.
localStorage.clear();

// ============================================================================
// PRESERVING JAVASCRIPT OBJECTS (JSON HANDLING)
// ============================================================================

var settings = { theme: "dark", volume: 80 };

// WRONG WAY: Saves as "themeData: [object Object]"
localStorage.setItem("themeData", settings);

// CORRECT WAY: Serialize to string first, then parse back to object when reading
localStorage.setItem("themeData", JSON.stringify(settings)); // Saved as JSON string

var savedSettings = JSON.parse(localStorage.getItem("themeData")); // Restored back as an Object
console.log(savedSettings.theme); // "dark"

// ============================================================================
// ALTENATIVE QUICK SYNTAX (PROPERTY ACCESS)
// ============================================================================

// Alternative setting syntax
localStorage.cartCount = "5";

// Alternative getting syntax
var itemsInCart = localStorage.cartCount; // "5"

// ============================================================================
// CATCHING QUOTA EXCEEDED ERRORS
// ============================================================================
try {
  localStorage.setItem("heavyData", massiveDataString);
} catch (error) {
  if (error.name === "QuotaExceededError") {
    console.error("Storage limit reached! Failed to save data.");
  }
}

// ============================================================================
// THE STORAGE CROSS-TAB SYNC EVENT
// ============================================================================
// Place this code inside your script to coordinate sync updates across multiple tabs
window.addEventListener("storage", function (event) {
  console.log(`Storage Key Changed: ${event.key}`);
  console.log(`Old Value: ${event.oldValue}`);
  console.log(`New Value: ${event.newValue}`);
  console.log(`Triggered by URL: ${event.url}`);
});

// ============================================================================
// LOCALSTORAGE REAL-WORLD EXAMPLE: USER THEME PREFERENCES
// ============================================================================

// 1. Define data structure
const userPreferences = {
  theme: "dark",
  fontSize: "large",
  notificationsEnabled: true,
};

// 2. Save data to permanent storage (must convert to JSON string first)
localStorage.setItem("app_settings", JSON.stringify(userPreferences));
console.log("Preferences securely saved to disk.");

// 3. Read data back (even weeks later, or in a completely different browser tab)
const savedDataString = localStorage.getItem("app_settings");

if (savedDataString) {
  const absoluteSettings = JSON.parse(savedDataString);
  console.log(`Applying layout theme: ${absoluteSettings.theme}`); // Outputs: "dark"
}

// 4. Clean up operations
localStorage.removeItem("app_settings"); // Deletes just this settings key
localStorage.clear(); // Wipes all data tied to this domain

// ============================================================================
// SESSIONSTORAGE REAL-WORLD EXAMPLE: MULTI-STEP CHECKOUT FORM
// ============================================================================

// 1. Collect partial progress data from Step 1 of a checkout wizard form
const checkoutStep1 = {
  itemsInCart: 3,
  couponApplied: "SUMMER2026",
  estimatedTotal: 145.5,
};

// 2. Save progress to temporary session memory
sessionStorage.setItem("active_checkout_state", JSON.stringify(checkoutStep1));
console.log(
  "Step 1 data cached. Safe to navigate or refresh this specific tab.",
);

// 3. Retrieve progress data on Step 2 of the form
const currentSessionString = sessionStorage.getItem("active_checkout_state");

if (currentSessionString) {
  const activeCheckout = JSON.parse(currentSessionString);
  console.log(
    `Processing total order cost of: $${activeCheckout.estimatedTotal}`,
  ); // Outputs: 145.5
}

// 4. Clear data explicitly once the checkout is complete
function completePurchaseOrder() {
  console.log("Transaction processed successfully!");
  sessionStorage.removeItem("active_checkout_state"); // Clear state since it's no longer needed
}
