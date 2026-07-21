/*
       [back()] ◄─── Current Page ───► [forward()]
                      │        ▲
     ┌────────────────▼────────┴────────────────┐
     │  History Stack List (history.length)      │
     ├──────────────────────────────────────────┤
     │  3. https://example.com/profile          │ ◄── go(1)
     │  2. https://example.com/dashboard        │ ◄── [Current View]
     │  1. https://example.com/login            │ ◄── go(-1)
     │  0. https://google.com                   │ ◄── go(-2)
     └──────────────────────────────────────────┘
*/

// ============================================================================
// WINDOW.HISTORY PROPERTIES
// ============================================================================

// 1. length
// Returns the total number of URLs in the history stack list for the current tab session.
var historyCount = history.length;

// 2. state
// Returns the history entry's current state object without waiting for a popstate event.
var currentStateData = history.state;

// ============================================================================
// CLASSIC HISTORY NAVIGATION METHODS
// ============================================================================

// 1. back()
// Loads the previous URL in the history list (Functions exactly like clicking the browser's "Back" button).
history.back();

// 2. forward()
// Loads the next URL in the history list (Functions exactly like clicking the browser's "Forward" button).
history.forward();

// 3. go()
// Loads a specific page from the history list based on a relative delta integer.
history.go(-1); // Equivalent to history.back()
history.go(1); // Equivalent to history.forward()
history.go(-3); // Goes back exactly 3 pages in the history stack
history.go(0); // Reloads the current page

// ============================================================================
// MODERN SINGLE-PAGE APP (SPA) HISTORY METHODS
// ============================================================================

// A. history.pushState()
// Adds a new entry to the history stack. The URL changes in the address bar instantly,
// but the browser does NOT reload or fetch the new page.
// Syntax: history.pushState(stateObject, title, URL)
var stateObj = { userId: 42, view: "settings" };
history.pushState(stateObj, "", "/account/settings");

// B. history.replaceState()
// Updates/overwrites the current entry on the history stack instead of creating a new one.
// Useful for updating search query filters without creating a million "Back button" steps for the user.
// Syntax: history.replaceState(stateObject, title, URL)
var updatedState = { userId: 42, view: "settings-security" };
history.replaceState(updatedState, "", "/account/settings?tab=security");

// C. Companion Window Event: "popstate"
// This event fires on the window object every single time the user navigates using the physical
// browser Back or Forward buttons. It lets you read back the state objects you pushed earlier.
window.addEventListener("popstate", function (event) {
  if (event.state) {
    console.log("User navigated! Restoring state data:", event.state);
    // Direct access to event.state.userId, event.state.view, etc.
  }
});
