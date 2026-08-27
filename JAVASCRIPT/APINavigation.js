/*
 * =========================================================================
 * LEVEL 1: THE WINDOW.LOCATION OBJECT (Traditional Navigation)
 * =========================================================================
 * Every job interview will expect you to know the difference between
 * location.href, location.assign(), and location.replace().
 */

document.getElementById("btn-parse-url").addEventListener("click", () => {
  // Mocking search params for demonstration if none exist
  if (!window.location.search) {
    window.history.replaceState(
      null,
      "",
      "?user=dev_expert&session=active#target-heading",
    );
  }

  const urlData = {
    "window.location.href": window.location.href, // Full URL string
    "window.location.hostname": window.location.hostname, // domain (e.g., localhost)
    "window.location.pathname": window.location.pathname, // path string (e.g., /dashboard)
    "window.location.search": window.location.search, // query strings (e.g., ?id=5)
    "window.location.hash": window.location.hash, // anchor tag target (e.g., #bio)
  };

  // Modern way to extract query parameters cleanly
  const params = new URLSearchParams(window.location.search);
  const userParam = params.get("user"); // returns 'dev_expert'

  document.getElementById("url-output").textContent =
    JSON.stringify(urlData, null, 2) +
    `\n\nParsed 'user' Query Parameter: "${userParam}"`;
});

document.getElementById("btn-redirect").addEventListener("click", () => {
  // .assign() or setting .href loads a new page and adds it to the browser's back-button history.
  window.location.assign("https://www.google.com");
});

document.getElementById("btn-replace").addEventListener("click", () => {
  alert(
    'Simulating login redirect. Notice that if you click "Back" after this, you won\'t loop back to this screen!',
  );
  // .replace() removes the current page from session history and replaces it with the new one.
  // CRITICAL FOR JOB: Use this after login screens or payment submissions so users can't accidentally go back.
  window.location.replace("https://www.wikipedia.org");
});

/*
 * =========================================================================
 * LEVEL 2: THE HISTORY API & CLIENT-SIDE ROUTING (SPA Style)
 * =========================================================================
 * Modern frameworks (React, Vue, Angular) mimic this under the hood.
 * This code demonstrates how to change URLs without a webpage flash/reload.
 */

// 1. Mock Database of Views
const views = {
  home: `<h2>Welcome Home</h2><p>This content changes dynamically without refreshing the page.</p>`,
  dashboard: `<h2>Analytics Dashboard</h2><p>Real-time data charts would render here in production.</p>`,
  settings: `<h2>Application Settings</h2><p>Manage accounts, themes, and configuration flags.</p>`,
};

// 2. The Core Render Function
function renderView(routeKey) {
  const appContainer = document.getElementById("app-view");

  if (views[routeKey]) {
    appContainer.innerHTML = views[routeKey];
  } else {
    appContainer.innerHTML = `<h2>404 - Not Found</h2><p>The requested view does not exist.</p>`;
  }

  // Update UI styling for active link status
  document.querySelectorAll(".spa-link").forEach((link) => {
    if (link.getAttribute("data-route") === routeKey) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// 3. Intercepting Link Click events (Event Delegation Pattern)
document.addEventListener("click", (event) => {
  const targetLink = event.target.closest(".spa-link");

  if (targetLink) {
    // Prevent the browser from making a server network request
    event.preventDefault();

    const route = targetLink.getAttribute("data-route");
    const path = targetLink.getAttribute("href");

    // Update the URL in the address bar without a page reload
    // Syntax: history.pushState(stateObject, unusedTitle, urlPath)
    window.history.pushState({ route: route }, "", path);

    renderView(route);
  }
});

// 4. Handling Browser Back/Forward Buttons
// The 'popstate' event fires when the user clicks the browser's native back/forward buttons
window.addEventListener("popstate", (event) => {
  // Retrieve state data attached during our history.pushState call
  if (event.state && event.state.route) {
    renderView(event.state.route);
  } else {
    // Fallback to home if no history state object is present
    renderView("home");
  }
});

/*
 * =========================================================================
 * LEVEL 3: PROGRAMMATIC SPA ROUTING & INITIAL STATE
 * =========================================================================
 */

// Navigate programmatically using JavaScript
document.getElementById("btn-go-settings").addEventListener("click", () => {
  window.history.pushState({ route: "settings" }, "", "/settings");
  renderView("settings");
});

// Use native window history steps
document.getElementById("btn-go-back").addEventListener("click", () => {
  window.history.back(); // Equivalent to clicking the browser back button
  // Note: window.history.go(-1) also achieves the same action
});

// INITIALIZATION: Detect the route when the application first boots up
window.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  // Basic route matcher map
  if (currentPath === "/dashboard") {
    renderView("dashboard");
  } else if (currentPath === "/settings") {
    renderView("settings");
  } else {
    renderView("home");
  }
});
