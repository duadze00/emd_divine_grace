// =========================================================================
// 1. THE CORE CONCEPT: HOW JAVASCRIPT SEES COOKIES
// =========================================================================
// Unlike localStorage, which uses a clean object-like API (.setItem(), .getItem()),
// the browser exposes cookies through a single, magical string property: `document.cookie`.
//
// Writing to it adds or updates *one* cookie at a time.
// Reading from it returns *all* accessible cookies as a single concatenated string.

console.log("--- Initial Cookie Jar State ---");
console.log(document.cookie); // Returns a string like: "user=john; theme=dark"

// =========================================================================
// 2. WRITING COOKIES (CRUD: CREATE & UPDATE)
// =========================================================================
// To write a cookie, you assign a string formatted as "key=value" to document.cookie.
// You can append optional attributes separated by semicolons.

// Basic Session Cookie (Disappears when the user closes the browser/tab)
document.cookie = "session_user=Alex";

// Cookie with Max-Age (Defined in seconds. Best practice for modern browsers)
// 3600 seconds = 1 hour
document.cookie = "theme=dim_neon; max-age=3600";

// Cookie with Expires (Older approach using an absolute UTC timestamp string)
const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
document.cookie =
  "marketing_id=xyz987; expires=" + oneWeekFromNow.toUTCString();

// Path Attribute (Restricts cookie accessibility to a specific URL path)
// path=/ means the cookie is accessible across the entire website domain.
document.cookie = "ui_scale=1.2; path=/; max-age=86400";

// =========================================================================
// 3. ESSENTIAL SECURITY & NETWORK FLAGS
// =========================================================================
// Security attributes protect cookies from theft, cross-site leaks, and injection.

/**
 * Secure
 * Ensures the cookie is ONLY transmitted over encrypted (HTTPS) connections.
 */
document.cookie = "secure_token=secret_val; max-age=1800; Secure";

/**
 * SameSite (Strict, Lax, or None)
 * Controls whether cookies are sent along with cross-site requests.
 * - Strict: Never sent on cross-site requests (Top protection against CSRF).
 * - Lax: Sent when navigating to the target site (Default behavior in modern browsers).
 * - None: Sent everywhere (Requires the 'Secure' attribute to be present).
 */
document.cookie = "csrf_protection=active; SameSite=Strict; Secure";

/**
 * NOTE ON HttpOnly:
 * You CANNOT set or read the 'HttpOnly' flag via JavaScript. It can only be set
 * by the server using the HTTP `Set-Cookie` header. It blocks document.cookie from
 * accessing the data, making it immune to client-side XSS scripting attacks.
 */

// =========================================================================
// 4. THE UTILITY TOOLKIT (THE PRODUCTION-READY COOKIE WRAPPER)
// =========================================================================
// Because parsing a raw string string of cookies is tedious, production apps
// use helper libraries or custom utility wrappers. Here is a complete wrapper:

const CookieManager = {
  /**
   * Set a cookie
   * @param {string} name - Cookie key name
   * @param {string} value - Cookie value
   * @param {object} options - Optional flags (maxAge, path, domain, secure, sameSite)
   */
  set(name, value, options = {}) {
    // Enforce basic encoding to handle special characters (spaces, semicolons, etc.)
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.maxAge) {
      cookieString += `; max-age=${options.maxAge}`;
    } else if (options.expires instanceof Date) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }

    // Default path to root if not provided so it's accessible site-wide
    cookieString += `; path=${options.path || "/"}`;

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }
    if (options.secure) {
      cookieString += `; Secure`;
    }
    if (options.sameSite) {
      cookieString += `; SameSite=${options.sameSite}`;
    }

    document.cookie = cookieString;
  },

  /**
   * Get a cookie value by name
   * @param {string} name - The name of the cookie to retrieve
   * @returns {string|null} - The decoded value or null if not found
   */
  get(name) {
    const matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)",
      ),
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  },

  /**
   * Delete a cookie
   * @param {string} name - The name of the cookie to remove
   * @param {string} path - Must match the path used when creating the cookie
   */
  delete(name, path = "/") {
    // Deleting a cookie simply means updating it with a max-age of 0 or a past date.
    this.set(name, "", { maxAge: 0, path: path });
  },

  /**
   * Check if a cookie exists
   * @param {string} name
   * @returns {boolean}
   */
  has(name) {
    return this.get(name) !== null;
  },
};

// =========================================================================
// 5. LIVE CODE DRILL & DEMONSTRATION
// =========================================================================

console.log("\n--- Executing CookieManager Demo ---");

// Step A: Store structured data (using JSON stringification since cookies only store strings)
const preferences = { layout: "grid", notifications: false };
CookieManager.set("user_prefs", JSON.stringify(preferences), {
  maxAge: 600,
  sameSite: "Lax",
});
CookieManager.set("session_id", "ABC-123-XYZ", {
  secure: true,
  sameSite: "Strict",
});

// Step B: Read the raw document string vs the structured manager
console.log("Raw document.cookie string:");
console.log(document.cookie);

// Step C: Retrieve specific targeted values
const sessionId = CookieManager.get("session_id");
console.log(`Retrieved Session ID: ${sessionId}`); // Output: ABC-123-XYZ

const storedPrefs = JSON.parse(CookieManager.get("user_prefs"));
console.log("Retrieved and parsed object:", storedPrefs); // Output: { layout: "grid", ... }

// Step D: Verify existance and delete data
console.log(`Has 'session_id'? ${CookieManager.has("session_id")}`); // true

CookieManager.delete("session_id");
console.log(
  `Has 'session_id' after deletion? ${CookieManager.has("session_id")}`,
); // false

// =========================================================================
// 6. QUICK CHEAT SHEET FOR WEB ARCHITECTS
// =========================================================================
/*
   COOKIE LIMITS:
   - Size limit: ~4KB total per cookie (including key, value, and attributes).
   - Domain limit: Around 20–50 cookies max per unique domain (varies slightly by browser).
   
   COOKIES VS WEB STORAGE:
   +---------------------------------------+---------------------------------------+
   | COOKIES                               | LOCALSTORAGE / SESSIONSTORAGE         |
   +---------------------------------------+---------------------------------------+
   | Automatically attached to network     | Stays isolated client-side inside the |
   | requests via HTTP headers.            | sandbox; never hits the wire alone.   |
   +---------------------------------------+---------------------------------------+
   | Max size 4KB.                         | Max size ~5MB to 10MB.                |
   +---------------------------------------+---------------------------------------+
   | Can be locked down via HttpOnly       | Completely vulnerable to XSS scripts  |
   | to prevent client-side theft.         | reading data directly.                |
   +---------------------------------------+---------------------------------------+
*/
