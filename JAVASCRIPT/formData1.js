//  * ============================================================================
//  * THE ULTIMATE GUIDE TO FORMDATA IN JAVASCRIPT
//  * ============================================================================

// ============================================================================
// SECTION 1: THE BEGINNER BASICS (Instantiating and Reading)
// ============================================================================

/**
 * What is FormData?
 * It's a special object that mimics an HTML <form> element.
 * The best part: It sets the correct HTTP headers ('Content-Type: multipart/form-data')
 * automatically when passed to fetch().
 */

// Way 1: Create an empty FormData object and append data manually
const emptyForm = new FormData();
emptyForm.append("username", "dev_jay");
emptyForm.append("role", "admin");

// Way 2: Automatically capture data from an existing HTML form element
// HTML context: <form id="myForm"><input name="email" value="test@test.com" /></form>
const formElement = document.querySelector("#myForm");
if (formElement) {
  const autoForm = new FormData(formElement); // Automatically grabs all inputs with a "name" attribute!

  // To read a value from a FormData object, use .get(key)
  console.log(autoForm.get("email")); // Output: "test@test.com"
}

// ============================================================================
// SECTION 2: THE INTERMEDIATE LEVEL (CRUD Operations)
// ============================================================================

const formData = new FormData();

// 1. APPEND (Add data): .append(key, value)
// If the key already exists, .append() adds a NEW value to that key rather than overwriting it.
formData.append("tags", "javascript");
formData.append("tags", "frontend"); // "tags" now contains both values!

// 2. SET (Update / Overwrite): .set(key, value)
// If the key exists, it overwrites it. If it doesn't exist, it creates it.
formData.set("username", "alex_code");
formData.set("username", "alex_code_final"); // Overwritten!

// 3. DELETE (Remove data): .delete(key)
formData.append("temporaryData", "secret_123");
formData.delete("temporaryData"); // Gone.

// 4. HAS (Check existence): .has(key)
console.log(formData.has("username")); // Output: true
console.log(formData.has("temporaryData")); // Output: false

// 5. GET ALL (Retrieve multi-value keys): .getAll(key)
// Essential for checkboxes or fields where multiple items share the same name attribute.
console.log(formData.getAll("tags")); // Output: ["javascript", "frontend"]

// ============================================================================
// SECTION 3: ADVANCED (Looping, File Uploads, Object Conversion, & Gotchas)
// ============================================================================

/**
 * A Gotcha: You cannot just console.log(formData)!
 * It will display an empty object `{}` because it is a special internal stream wrapper.
 * To debug or see the contents, you must iterate over it or convert it.
 */

// --- 1. Iterating / Looping over FormData ---
console.log("--- Iterating FormData Key/Value Pairs ---");
for (let [key, value] of formData.entries()) {
  console.log(`${key}: ${value}`);
}

// Alternative iterators:
// formData.keys() -> yields all keys
// formData.values() -> yields all values

// --- 2. Converting FormData to a standard JavaScript Object ---
// (Note: This approach will only grab the FIRST value of multi-value fields like "tags")
const plainObject = Object.fromEntries(formData.entries());
console.log("Plain Object:", plainObject);

// --- 3. Handling Multi-value fields cleanly during conversion ---
const comprehensiveObject = {};
for (let [key, value] of formData.entries()) {
  if (comprehensiveObject[key]) {
    // If it's already an array, push to it. Otherwise, convert it to an array.
    if (!Array.isArray(comprehensiveObject[key])) {
      comprehensiveObject[key] = [comprehensiveObject[key]];
    }
    comprehensiveObject[key].push(value);
  } else {
    comprehensiveObject[key] = value;
  }
}

// --- 4. File and Blob Uploads ---
// This is where FormData shines. You cannot upload binary files natively via pure JSON.
const fileInput = document.querySelector("#avatarUpload"); // Assume an <input type="file" id="avatarUpload">
if (fileInput && fileInput.files[0]) {
  // Syntax: .append(key, fileBlob, filename)
  formData.append("profilePicture", fileInput.files[0], "user_avatar.png");
}

// You can even append a raw Blob dynamically created in JavaScript!
const jsonBlob = new Blob([JSON.stringify({ setting: "darkMode" })], {
  type: "application/json",
});
formData.append("userConfig", jsonBlob, "config.json");

// ============================================================================
// SECTION 4: REAL-LIFE PROJECT IMPLEMENTATION
// A complete Profile Setup feature handling text, tags, and an image upload.
// ============================================================================

/**
 * CRISIS WARNING: NEVER manually set the 'Content-Type' header to 'multipart/form-data'
 * when sending FormData via fetch(). The browser MUST generate it automatically
 * so it can append the unique numeric boundary string separating each field.
 */

async function handleProfileSubmit(event) {
  // Prevent the default browser page reload on submit
  event.preventDefault();

  const form = event.target;
  // Instantiate FormData passing the target HTML Form
  const dataToSend = new FormData(form);

  // We can dynamically add background system architecture variables on the fly
  dataToSend.append("submittedAt", new Date().toISOString());
  dataToSend.append("clientVersion", "1.4.2");

  // Debugging what we are about to ship out
  console.log("Preparing payload...");
  for (let [k, v] of dataToSend.entries()) {
    // Checking if the entry is a file object or normal text string
    if (v instanceof File) {
      console.log(
        `[File Entry] Key: ${k}, Filename: ${v.name}, Size: ${v.size} bytes`,
      );
    } else {
      console.log(`[Text Entry] Key: ${k}, Value: ${v}`);
    }
  }

  try {
    // Shipping via standard fetch API
    const response = await fetch("https://api.example.com/v1/profiles", {
      method: "POST",
      // CRITICAL: No 'headers: { "Content-Type": ... }' here. Let browser handle it.
      body: dataToSend,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Success! Server Response:", result);
    alert("Profile successfully updated!");
  } catch (error) {
    console.error("Network or transmission breakdown:", error);
    alert("Submission failed. Check your connection logs.");
  }
}

// To activate this in an application context:
// const myFormElement = document.getElementById("profileRegistrationForm");
// myFormElement.addEventListener("submit", handleProfileSubmit);
