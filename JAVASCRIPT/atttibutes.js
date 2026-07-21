// =================================================================================================
// ATTRIBUTE METHODS
// =================================================================================================
// These work with any HTML attribute, not just classes.

// HTML
<input id="username" type="text" placeholder="Enter name"></input>;

// JAVASCRIPT
const input = document.getElementById("username");

input.setAttribute("placeholder", "Type your username");
input.getAttribute("placeholder");
input.hasAttribute("placeholder");
input.removeAttribute("placeholder");

// These methods can manipulate:
/*
id
src
href
alt
title
disabled
required
data-*
class
*/

// EXAMPLE
img.setAttribute("src", "cat.jpg");
link.setAttribute("href", "https://google.com");
button.setAttribute("disabled", "");

// ADDING MULTIPLE ATTRIBUTES
const img = document.createElement("img");

// 1. Calling setAttribute multiple time
img.setAttribute("src", "cat.jpg");
img.setAttribute("alt", "A cute cat");
img.setAttribute("width", "300");
img.setAttribute("height", "200");

// 2. Use properties directly
img.src = "cat.jpg";
img.alt = "A cute cat";
img.width = 300;
img.height = 200;

// 3. Use an object and a loop
// This is useful when you have many attributes.
const attributes = {
  src: "cat.jpg",
  alt: "A cute cat",
  width: "300",
  height: "200",
};

for (const [name, value] of Object.entries(attributes)) {
  img.setAttribute(name, value);
}

// 4. Using Object.assign()
Object.assign(img, {
  src: "cat.jpg",
  alt: "A cute cat",
  width: 300,
  height: 200,
});

// 5. Special case: data-* attributes
const div = document.createElement("div");

div.setAttribute("data-id", "123");
div.setAttribute("data-role", "admin");

// OR
div.dataset.id = "123";
div.dataset.role = "admin";

// RESULT
<div data-id="123" data-role="admin"></div>;

// =================================================================================================
// REAL-WORLD EXAMPLE
// =================================================================================================
const input = document.createElement("input");

input.setAttribute("type", "email");
input.setAttribute("placeholder", "Enter email");
input.setAttribute("required", "");
input.setAttribute("maxlength", "50");

// RESULT
<input type="email" placeholder="Enter email" required maxlength="50" />;

/*
 * ================================================================================
 * HTML ATTRIBUTES CHEAT SHEET
 * ================================================================================
 * * [GLOBAL ATTRIBUTES]      - id, class, style, title, lang, dir, hidden, tabindex, contenteditable, draggable, spellcheck, translate, accesskey, autocapitalize, autofocus, popover, role, aria-*
 * * [DATA ATTRIBUTES]        - data-* (e.g., data-id, data-user, data-role)
 * * [LINK (<a>)]             - href, target, download, rel, hreflang, ping, referrerpolicy
 * * [IMAGES (<img>)]         - src, alt, width, height, loading, srcset, sizes, crossorigin, referrerpolicy, fetchpriority
 * * [AUDIO & VIDEO]          - src, controls, autoplay, loop, muted, preload, poster, width, height, playsinline
 * * [FORMS (<form>)]         - action, method, enctype, autocomplete, novalidate, target
 * * [INPUTS (<input>)]       - type, name, value, placeholder, required, disabled, readonly, checked, min, max, step, maxlength, minlength, pattern, autocomplete, multiple, accept, list, form, formaction
 * * [BUTTONS]                - type, disabled, name, value, form, formaction
 * * [TEXTAREA]               - rows, cols, placeholder, maxlength, minlength, readonly, disabled, required, wrap
 * * [SELECT & OPTION]        - name, multiple, required, disabled, size, autocomplete, value, selected, disabled, label
 * * [SCRIPTS (<script>)]     - src, type, async, defer, crossorigin, integrity, nomodule
 * * [IFRAMES (<iframe>)]     - src, srcdoc, width, height, allow, allowfullscreen, sandbox, loading, name
 * * [TABLES]                 - colspan, rowspan, scope, headers, span
 * * [META (<meta>)]          - name, content, charset, http-equiv
 * * ================================================================================
 */
