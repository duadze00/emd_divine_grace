// ============================================================================
// EVENT METHODS & THE EVENT OBJECT (e)
// When an event fires, browser passes an "Event Object" (usually written as 'e')
// into your function. This object contains powerful control methods.
// ============================================================================

// 1. preventDefault() - Stops the default browser action from happening.
// Example: Stopping a link from opening, or stopping a form from refreshing the page.
document.getElementById("myAnchor").addEventListener("click", function (e) {
  e.preventDefault(); // The browser will NOT follow the URL link now!
});

// 2. stopPropagation() - Stops the event from "bubbling" up the DOM tree.
// prevents parent element click handlers from firing when you click a child element.
document.getElementById("myChildBtn").addEventListener("click", function (e) {
  e.stopPropagation(); // Parent div click events won't be triggered by this click
});

// 3. target - Returns the exact element that triggered the event.
document.getElementById("myDiv").addEventListener("click", function (e) {
  console.log("You clicked exactly on: " + e.target.nodeName);
});

// ============================================================================
// MOUSE EVENTS
// ============================================================================

var box = document.getElementById("box");

// 1. click - Fires when an element is clicked
box.addEventListener("click", function () {
  console.log("Clicked!");
});

// 2. dblclick - Fires when an element is double-clicked
box.addEventListener("dblclick", function () {
  console.log("Double Clicked!");
});

// 3. mousedown & mouseup - Fires when mouse button is pressed down, then released
box.addEventListener("mousedown", function () {
  console.log("Mouse button down");
});
box.addEventListener("mouseup", function () {
  console.log("Mouse button released");
});

// 4. mouseenter & mouseleave - Fires when pointer moves inside / outside an element
box.addEventListener("mouseenter", function () {
  this.style.backgroundColor = "yellow";
});
box.addEventListener("mouseleave", function () {
  this.style.backgroundColor = "white";
});

// 5. mousemove - Fires continuously as the mouse pointer moves over an element
box.addEventListener("mousemove", function (e) {
  console.log(`Mouse position: X=${e.clientX}, Y=${e.clientY}`);
});

// ============================================================================
// KEYBOARD EVENTS
// Note: Usually attached to inputs, textareas, or the global 'window' object.
// ============================================================================

var inputField = document.getElementById("username");

// 1. keydown - Fires the exact moment a key is pressed down (repeats if held)
inputField.addEventListener("keydown", function (e) {
  console.log("Key pressed: " + e.key); // e.key tells you the actual letter/number
});

// 2. keyup - Fires when the user releases a key on the keyboard
inputField.addEventListener("keyup", function () {
  console.log("User let go of the key");
});

// ============================================================================
// FORM & INPUT EVENTS
// ============================================================================

var myForm = document.getElementById("registrationForm");
var textInput = document.getElementById("emailInput");

// 1. submit - Fires when a form is submitted (Crucial for validation!)
myForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop page reload
  console.log("Form submission intercepted safely!");
});

// 2. input - Fires instantly every time the value of an <input> or <textarea> changes
textInput.addEventListener("input", function (e) {
  console.log("Current typing value: " + e.target.value);
});

// 3. change - For text inputs, fires only when the user finishes typing and leaves the field (blurs).
// For checkboxes, radio buttons, and dropdown <select>, it fires instantly upon selection.
document.getElementById("mySelect").addEventListener("change", function (e) {
  console.log("Dropdown changed to: " + e.target.value);
});

// 4. focus & blur - Focus fires when an element gains attention (clicked into).
// Blur fires when it loses attention (clicked away).
textInput.addEventListener("focus", function () {
  this.style.borderColor = "blue";
});
textInput.addEventListener("blur", function () {
  this.style.borderColor = "gray";
});

// ============================================================================
// WINDOW & DOCUMENT LIFE-CYCLE EVENTS
// These are attached to 'window' or 'document' to track the state of the page.
// ============================================================================

// 1. DOMContentLoaded - Fires when the HTML document is fully parsed and loaded,
// without waiting for images or stylesheets to finish downloading. (Great for fast script starts!)
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM tree ready! You can safely select elements now.");
});

// 2. load - Fires when the entire page is completely loaded, including all images, shells, and files.
window.addEventListener("load", function () {
  console.log("Everything on the page has fully loaded.");
});

// 3. resize - Fires when the browser window changes width or height
window.addEventListener("resize", function () {
  console.log(`New Window Size: ${window.innerWidth}x${window.innerHeight}`);
});

// 4. scroll - Fires when the user scrolls up or down on the page
window.addEventListener("scroll", function () {
  console.log("User is scrolling. Current Y offset: " + window.pageYOffset);
});

// ============================================================================
// TOUCH EVENTS (For Smartphones and Tablets)
// ============================================================================

var touchArea = document.getElementById("touchBox");

// 1. touchstart - Fires when one or more fingers are placed on the touch screen
touchArea.addEventListener("touchstart", function () {
  console.log("Screen touched!");
});

// 2. touchmove - Fires continuously as the user drags a finger across the screen
touchArea.addEventListener("touchmove", function (e) {
  // e.touches[0] reads the coordinates of the first finger
  console.log("Dragging at X: " + e.touches[0].clientX);
});

// 3. touchend - Fires when a finger is lifted off the screen
touchArea.addEventListener("touchend", function () {
  console.log("Finger lifted.");
});
