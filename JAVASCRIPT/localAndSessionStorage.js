//* ==========================================
//* LOCALSTORAGE CHEAT SHEET (Permanent)
//* ==========================================

// --- 1. Resetting the playground ---
localStorage.clear(); // Starts us with a blank slate

// --- 2. Saving Data (Create / Update) ---
// Note: Everything gets converted to a string automatically!
localStorage.setItem("username", "EricTheDeveloper");
localStorage.setItem("isLoggedIn", "true"); // Saved as a string 'true'
localStorage.setItem("themeMode", "dark");

// --- 3. Reading Data (Read) ---
const user = localStorage.getItem("username");
console.log("Username:", user); // Output: EricTheDeveloper

// If a key doesn't exist, it returns null
const nonExistent = localStorage.getItem("fakeKey");
console.log("Missing Key:", nonExistent); // Output: null

// --- 4. Checking the Size (Length Property) ---
const totalItems = localStorage.length;
console.log("Total items stored:", totalItems); // Output: 3

// --- 5. Looping through items by Index ---
// Useful if you need to inspect everything inside the storage
console.log("--- Loop Output ---");
for (let i = 0; i < localStorage.length; i++) {
  let keyName = localStorage.key(i); // Gets the key name at index i
  let value = localStorage.getItem(keyName); // Gets the value of that key
  console.log(`Index ${i} -> ${keyName}: ${value}`);
}

// --- 6. Deleting Data (Delete) ---
localStorage.removeItem("themeMode"); // Removes ONLY 'themeMode'
console.log("Theme after removal:", localStorage.getItem("themeMode")); // Output: null

// --- 7. Wiping everything ---
localStorage.clear(); // Deletes username and isLoggedIn too
console.log("Storage size after clear:", localStorage.length); // Output: 0

//* ====================================================
//* STORING MULTIPLE DATA AND ACCESSING THEIR VALUES
//* ====================================================
let userName = "Eric";
let userPassword = 2345;
let initialDeposit = 500;

// ============ OPTION 1 ============
// 1. Put the data into an object
let userSession = {
  name: userName,
  password: userPassword,
  deposit: initialDeposit,
};

// 2. Convert to a string and save to localStorage
localStorage.setItem("user", JSON.stringify(userSession));

// 3. Retrieve the string and convert it back to an object
let retrievedUser = JSON.parse(localStorage.getItem("user"));

// 4. Now you can access the properties perfectly!
console.log(retrievedUser.name); // Output: Eric
console.log(retrievedUser.deposit); // Output: 500

// ============ OPTION 2 ============
// Save using JSON.stringify
localStorage.setItem(
  "userData",
  JSON.stringify([userName, userPassword, initialDeposit]),
);

// Retrieve using JSON.parse
let dataArray = JSON.parse(localStorage.getItem("userData"));

console.log(dataArray[0]); // Output: Eric
console.log(dataArray[2]); // Output: 500

//* ==========================================
//* SESSIONSTORAGE CHEAT SHEET (Temporary)
//* ==========================================

sessionStorage.clear(); // Clear initial session data

// --- 1. Saving Data ---
sessionStorage.setItem("sessionToken", "xyz123abc456");
sessionStorage.setItem("currentStepInForm", "2");
sessionStorage.setItem("cartTotal", "150.50");

// --- 2. Reading Data ---
const token = sessionStorage.getItem("sessionToken");
console.log("Session Token:", token); // Output: xyz123abc456

// --- 3. Properties & Indexing ---
console.log("Session items count:", sessionStorage.length); // Output: 3
console.log("First key name:", sessionStorage.key(0));

// --- 4. Deleting & Clearing ---
sessionStorage.removeItem("currentStepInForm");
sessionStorage.clear(); // Wipes out all session storage for this tab


/*
Feature localStorage sessionStorage
Lifespan Permanent ( survives browser restarts/shutdowns) Temporary (wiped when tab or window is closed)
Tab Sharing Shared across all tabs/windows with the same origin Isolated to that specific tab (even same URL in a new tab gets its own session)
Storage Limit ~5MB to 10MB (depending on browser) ~5MB (depending on browser)
Server Access Stored purely on the client side (never sent to the server) Stored purely on the client side
*/