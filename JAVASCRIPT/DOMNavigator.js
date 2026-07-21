// ============================================================================
// WINDOW.NAVIGATOR PROPERTIES
// ============================================================================

// 1. cookieEnabled
// Returns true if cookies are enabled in the browser, false if blocked.
var cookiesAllowed = navigator.cookieEnabled;

// 2. geolocation [CRITICAL FOR MODERN APPS]
// Returns a Geolocation object used to request and get the user's physical location.
var geo = navigator.geolocation;
// Example Usage:
navigator.geolocation.getCurrentPosition(function (position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);
});

// 3. language & languages
// language: Returns the primary language string of the browser UI (e.g., "en-US").
// languages: Returns an array of the user's preferred languages.
var primaryLang = navigator.language;
var preferredLangs = navigator.languages; // e.g., ["en-US", "en", "es"]

// 4. onLine
// Returns a boolean indicating whether the browser is currently connected to the network.
var isOnline = navigator.onLine;

// 5. platform
// Returns a string representing the platform/OS the browser was compiled for (e.g., "Win32", "MacIntel").
// Note: This is deprecated in modern browsers in favor of navigator.userAgentData.
var osPlatform = navigator.platform;

// 6. userAgent
// Returns the entire User-Agent header string sent to the server (contains browser engine, version, OS details).
var uaString = navigator.userAgent;

// ============================================================================
// MODERN NAVIGATOR ADDITIONS (HIGHLY IMPORTANT)
// ============================================================================

// A. Clipboard API (navigator.clipboard)
// Replaces older document.execCommand() methods to read or write directly to the system clipboard.
navigator.clipboard.writeText("Hello World!").then(function () {
  console.log("Text copied to clipboard successfully!");
});

// B. User-Agent Data API (navigator.userAgentData)
// The modern, high-privacy replacement for navigator.userAgent and navigator.platform.
if (navigator.userAgentData) {
  console.log(navigator.userAgentData.brands); // Returns clean array of browser brands & versions
  console.log(navigator.userAgentData.mobile); // Returns true if user is on a mobile device
}

// C. Permissions API (navigator.permissions)
// Allows you to check the permission status of APIs (like camera, microphone, or geolocation) before requesting access.
navigator.permissions.query({ name: "geolocation" }).then(function (status) {
  console.log("Geolocation permission state is: " + status.state); // "granted", "denied", or "prompt"
});

// D. Service Worker API (navigator.serviceWorker)
// Used to register background workers for creating Progressive Web Apps (PWAs) and handling offline capabilities.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// E. Hardware Capabilities (navigator.hardwareConcurrency & navigator.deviceMemory)
// Helps optimize performance based on the user's physical computer specs.
var logicalProcessors = navigator.hardwareConcurrency; // Number of CPU cores available
var deviceRamInGB = navigator.deviceMemory; // Approximate amount of RAM in GB (e.g., 4, 8)

// ============================================================================
// DEPRECATED / LEGACY PROPERTIES (DO NOT USE IN NEW CODE)
// ============================================================================

// Returns "Mozilla" on almost all modern browsers for historical compatibility reasons.
var legacyCodeName = navigator.appCodeName;

// Returns "Netscape" on almost all modern browsers for historical compatibility reasons.
var legacyAppName = navigator.appName;

// Returns version strings that are often inaccurate or frozen for privacy.
var legacyAppVersion = navigator.appVersion;

// Returns "Gecko" on almost all modern browsers regardless of the actual engine.
var legacyProduct = navigator.product;

// ============================================================================
// WINDOW.NAVIGATOR METHODS
// ============================================================================

// 1. javaEnabled()
// Returns whether or not the browser has Java enabled.
// Note: Modern browsers no longer support Java applets, so this almost always returns false.
var isJavaEnabled = navigator.javaEnabled();

// ============================================================================
// REMOVED / OBSOLETE METHODS (WILL CAUSE ERRORS IN MODERN BROWSERS)
// ============================================================================

// navigator.taintEnabled() -> REMOVED completely. Do not use.
