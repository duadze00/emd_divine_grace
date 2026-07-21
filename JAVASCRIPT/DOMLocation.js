// ============================================================================
// WINDOW.LOCATION PROPERTIES (GETTERS & SETTERS)
// ============================================================================

// 1. Location href Property
// Sets or returns the entire URL of the current page.
// Syntax
// Return the href property:
location.href;

// Set the href property:
location.href = URL;

var getHref = location.href;
location.href = "https://www.w3schools.com";
location.href = "#top"; // Jump to anchor
location.href = "mailto:someone@example.com"; // Open mail client

// 2. Location protocol Property
// Sets or returns the protocol of the current URL, including the colon (:).
// Syntax
// Return the protocol property:
location.protocol;

// Set the protocol property:
location.protocol = protocol;

var getProtocol = location.protocol;
location.protocol = "https:";

// 3. Location host Property
// Sets or returns the hostname AND port of a URL.
// Syntax
// Return the host property:
location.host;

// Set the host property:
location.host = "hostname:port";

var getHost = location.host;
location.host = "example.com:8080";

// 4. Location hostname Property
// Sets or returns the domain hostname of a URL.
// Syntax
// Return the hostname property:
location.hostname;

// Set the hostname property:
location.hostname = hostname;

var getHostname = location.hostname;
location.hostname = "www.example.com";

// 5. Location port Property
// Sets or returns the port number the server uses for a URL.
var getPort = location.port;
location.port = "8080";

// 6. Location pathname Property
// Sets or returns the pathname (the directory path/file) of a URL.
// Syntax
// Return the pathname property:
location.pathname;

// Set the pathname property:
location.pathname = path;

var x = location.pathname;

var getPathname = location.pathname;
location.pathname = "/products/index.html";

// 7. Location search Property
// Sets or returns the querystring parameters, including the question mark (?).
// Syntax
// Return the search property:
location.search;

// Set the search property:
location.search = querystring;

var getSearch = location.search;
location.search = "?query=javascript&page=2";

// 8. Location hash Property
// Sets or returns the anchor part of a URL, including the hash sign (#).
// Note: When setting, do not manually include the "#" symbol.
// Syntax
// Return the hash property:
location.hash;

// Set the hash property:
location.hash = anchorname;

var getHash = location.hash;
location.hash = "part5";

// 9. Location origin Property (READ-ONLY)
// Returns the protocol, hostname, and port number combined.
// Syntax
location.origin;

var getOrigin = location.origin;

// 10. Location ancestorOrigins Property (READ-ONLY) [ADDED MISSING]
// Returns a list of all origins of parent container documents (if inside an iframe).
var getAncestors = location.ancestorOrigins;

// ============================================================================
// WINDOW.LOCATION METHODS
// ============================================================================

// 1. assign() Method
// Loads a new document. Saves the current page in session history (Back button works).
// Syntax
location.assign(URL);

location.assign("https://www.w3schools.com");

// 2. replace() Method
// Replaces current document with a new one. Removes current page from history (Back button breaks).
// Syntax
location.replace(newURL);

location.replace("https://www.w3schools.com");

// 3. reload() Method
// Reloads the current page (acts like the browser refresh button).
// Syntax
location.reload();

// 4. toString() Method [ADDED MISSING]
// Returns a string containing the whole URL (equivalent to location.href but read-only).
var urlString = location.toString();
