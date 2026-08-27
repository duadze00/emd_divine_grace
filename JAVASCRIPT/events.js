//* ==================================================================================================
//* KEYBOARD EVENTS
//* ==================================================================================================

// Target an input field or the entire window for shortcuts
const inputField = document.querySelector("#search-input");

inputField.addEventListener("keydown", (event) => {
  // 1. Handling the ENTER key (Extremely common for forms)
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents the default form submission page-reload
    console.log(
      "Enter key pressed! Triggering search for:",
      event.target.value,
    );
    // Call your search/submit function here
  }

  // 2. Handling the ESCAPE key (Great for closing modals/dropdowns)
  if (event.key === "Escape") {
    console.log("Escape key pressed! Closing modal...");
    // Call your modal close function here
  }

  // 3. Handling Keyboard Shortcuts (e.g., Ctrl + S or Cmd + S)
  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    event.preventDefault(); // Stop the browser's save dialog from popping up
    console.log("Ctrl+S or Cmd+S shortcut detected! Saving progress...");
  }
});

//* ==================================================================================================
//* MOUSE EVENTS
//* ==================================================================================================

const button = document.querySelector(".action-btn");
const card = document.querySelector(".card-element");

// Standard Click
button.addEventListener("click", (event) => {
  console.log(
    "Button clicked! X and Y coordinates:",
    event.clientX,
    event.clientY,
  );
});

// Double Click (Great for zoom actions or liking a post)
card.addEventListener("dblclick", () => {
  console.log("Element double-clicked!");
});

// Hover In (Fires once when the mouse enters the element's boundaries)
card.addEventListener("mouseenter", () => {
  card.classList.add("highlight-border");
});

// Hover Out (Fires once when the mouse completely leaves the element)
card.addEventListener("mouseleave", () => {
  card.classList.remove("highlight-border");
});

//* ==================================================================================================
//* FORM EVENTS
//* ==================================================================================================

const signupForm = document.querySelector("#signup-form");
const emailInput = document.querySelector("#email");

// 1. Submit Event (Always attach to the <form> tag itself, NOT the submit button)
signupForm.addEventListener("submit", (event) => {
  event.preventDefault(); // STOP the page from refreshing automatically

  // Clean modern way to collect all form fields at once
  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData.entries());

  console.log("Form successfully intercepted. Payload ready for API:", data);
});

// 2. Input Event (Triggers on *every single keystroke* — ideal for real-time validation)
emailInput.addEventListener("input", (event) => {
  const currentValue = event.target.value;
  if (!currentValue.includes("@")) {
    emailInput.setCustomValidity("Please enter a valid email address.");
  } else {
    emailInput.setCustomValidity(""); // Clear error
  }
});

// 3. Focus and Blur (Used to highlight inputs or validate when a user leaves a field)
emailInput.addEventListener("focus", () => {
  emailInput.classList.add("active-ring"); // User clicked inside
});

emailInput.addEventListener("blur", () => {
  emailInput.classList.remove("active-ring"); // User clicked away
  console.log("Validation on blur: checking uniqueness of email...");
});

// 4. Change Event (Triggers on checkboxes, radios, and file inputs when selection changes)
const fileInput = document.querySelector("#avatar-upload");
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  console.log(
    "New file selected:",
    file.name,
    `${(file.size / 1024).toFixed(2)} KB`,
  );
});

//* ==================================================================================================
//* UI AND WINDOW LIFECYCLE EVENTS
//* ==================================================================================================

// 1. DOMContentLoaded (Fires when HTML parsing is complete. Safe to run your JS scripts here)
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully built. Safe to query elements now.");
});

// 2. Resize Event (Triggers when the browser window changes dimensions)
// High-performance tip: Always debounce this in real-world apps to avoid layout lag!
window.addEventListener("resize", () => {
  console.log(
    "Window resized. New dimensions:",
    window.innerWidth,
    window.innerHeight,
  );
});

// 3. Scroll Event (Triggers whenever the user scrolls up or down)
window.addEventListener("scroll", () => {
  const totalScrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const currentScrollPosition = window.scrollY;
  const percentageScrolled =
    (currentScrollPosition / totalScrollableHeight) * 100;

  console.log(`User scroll progress: ${percentageScrolled.toFixed(0)}%`);
});

//* ==================================================================================================
//* EVENT DELEGATION
//* ==================================================================================================

// Imagine a large dynamic table or list of items
const productList = document.querySelector(".dynamic-product-list");

productList.addEventListener("click", (event) => {
  // Look upwards from the clicked element to find the button with our dataset attribute
  const deleteBtn = event.target.closest(".delete-item-btn");

  // If the user clicked inside the list but NOT on a delete button, ignore it
  if (!deleteBtn) return;

  // Access data-attributes safely using the dataset API
  const productId = deleteBtn.dataset.productId;

  console.log(`Event Delegation Success! Extracted Product ID: ${productId}`);
  // Perform the delete operation here
});

/*
* ========================================================================================================================================
*                                       JAVASCRIPT EVENTS 
* ========================================================================================================================================
Event Name        | Attached To         | Trigger Mechanism                  | Top Real-World Use Case
------------------|---------------------|------------------------------------|------------------------------------------------------------
keydown           | window / input      | Pressing any key down              | Catching Enter key or setting up shortcuts (Ctrl+S)
click             | button / a          | Left mouse click                   | Main interaction trigger for actions
mouseenter        | Element container   | Cursor moves inside boundaries     | Displaying dropdown menus, styling updates, tooltips
submit            | form tag            | Clicking submit or pressing Enter  | Processing input data via AJAX/Fetch API safely
input             | input / textarea    | Value changes on character input   | Building dynamic search filters & password strength meters
change            | select / file       | Selection is finalized/modified    | Toggling dark mode dropdowns, file upload validation
DOMContentLoaded  | document            | HTML structure finishes rendering  | Initializing scripts safely before heavy images load
 */
