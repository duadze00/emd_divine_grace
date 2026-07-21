// ============================================================================
// 1. THE ANIMATIONEVENT OBJECT
// ============================================================================
// Triggers during CSS Animations. Inherits from the base Event Object.

// Event Types: "animationstart", "animationiteration", "animationend"
element.addEventListener("animationstart", function (event) {
  var name = event.animationName; // Returns the name of the CSS animation (string)
  var time = event.elapsedTime; // Returns seconds animation has run (float)
  var pseudo = event.pseudoElement; // Returns pseudo-element name, e.g., "::before" (string)
});

// ============================================================================
// 2. THE CLIPBOARDEVENT OBJECT
// ============================================================================
// Triggers when cut, copy, or paste operations are performed.

// Event Types: "copy", "cut", "paste"
element.addEventListener("paste", function (event) {
  var clipboardData = event.clipboardData; // Returns a DataTransfer object containing the data
});

// ============================================================================
// 3. THE DRAGEVENT OBJECT
// ============================================================================
// Triggers during drag-and-drop operations. Inherits from MouseEvent.

// Event Types: "drag", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "drop"
element.addEventListener("drop", function (event) {
  var dataTransfer = event.dataTransfer; // Returns the DataTransfer object (holds dragged files/data)
});

// ============================================================================
// 4. THE FOCUSEVENT OBJECT
// ============================================================================
// Triggers when elements gain or lose focus. Inherits from UIEvent.

// Event Types: "focus", "blur", "focusin", "focusout"
element.addEventListener("blur", function (event) {
  var related = event.relatedTarget; // Returns the secondary element receiving/losing focus
});

// ============================================================================
// 5. THE HASHCHANGEEVENT OBJECT
// ============================================================================
// Triggers when the URL anchor part (#fragment) changes.

// Event Type: "hashchange" (Listened to on the window object)
window.addEventListener("hashchange", function (event) {
  var oldUrl = event.oldURL; // Returns the URL before the hash changed
  var newUrl = event.newURL; // Returns the URL after the hash changed
});

// ============================================================================
// 6. THE INPUTEVENT OBJECT
// ============================================================================
// Triggers when an <input>, <select>, or <textarea> value changes. Inherits from UIEvent.

// Event Type: "input"
element.addEventListener("input", function (event) {
  var data = event.data; // Returns the string character inserted
  var type = event.inputType; // Returns type of change (e.g., "insertText", "deleteContentBackward")
  var isComposing = event.isComposing; // Returns true if part of an IME composition session
});

// ============================================================================
// 7. THE KEYBOARDEVENT OBJECT
// ============================================================================
// Triggers during physical keyboard interactions. Inherits from UIEvent.

// Event Types: "keydown", "keyup"
window.addEventListener("keydown", function (event) {
  var code = event.code; // Returns physical key code (e.g., "KeyA")
  var key = event.key; // Returns character value (e.g., "A" or "Enter")
  var isCtrl = event.ctrlKey; // Returns true if Ctrl key was active
  var isShift = event.shiftKey; // Returns true if Shift key was active
  var isAlt = event.altKey; // Returns true if Alt key was active
  var isMeta = event.metaKey; // Returns true if Windows/Command key was active
  var isRepeat = event.repeat; // Returns true if the key is being held down
});

// ============================================================================
// 8. THE MOUSEEVENT OBJECT
// ============================================================================
// Triggers during mouse interactions. Inherits from UIEvent.

// Event Types: "click", "dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseout"
element.addEventListener("click", function (event) {
  var clientX = event.clientX; // X coordinate relative to the current viewport
  var clientY = event.clientY; // Y coordinate relative to the current viewport
  var pageX = event.pageX; // X coordinate relative to the entire document page
  var pageY = event.pageY; // Y coordinate relative to the entire document page
  var screenX = event.screenX; // X coordinate relative to the physical monitor screen
  var screenY = event.screenY; // Y coordinate relative to the physical monitor screen
  var button = event.button; // Returns numerical indicator of clicked button (0=Left, 1=Middle, 2=Right)
});

// ============================================================================
// 9. THE PAGETRANSITIONEVENT OBJECT
// ============================================================================
// Triggers when navigating to or from webpages.

// Event Types: "pageshow", "pagehide" (Listened to on the window object)
window.addEventListener("pageshow", function (event) {
  var persisted = event.persisted; // Returns true if the page was loaded directly from cache (Back/Forward button)
});

// ============================================================================
// 10. THE POPSTATEEVENT OBJECT
// ============================================================================
// Triggers when the active browser history entry changes.

// Event Type: "popstate" (Listened to on the window object)
window.addEventListener("popstate", function (event) {
  var state = event.state; // Returns a copy of the history entry state object (from history.pushState())
});

// ============================================================================
// 11. THE PROGRESSEVENT OBJECT
// ============================================================================
// Triggers during data measuring operations (like Fetch, XMLHttpRequest file uploads/downloads, or <img> loading).

// Event Types: "loadstart", "progress", "error", "abort", "load", "loadend"
xhr.addEventListener("progress", function (event) {
  var lengthComputable = event.lengthComputable; // Returns true if progress total size is known
  var loaded = event.loaded; // Returns number of bytes already processed
  var total = event.total; // Returns total expected bytes to load
});

// ============================================================================
// 12. THE STORAGEEVENT OBJECT
// ============================================================================
// Triggers when localStorage or sessionStorage is modified in the context of another document (tab).

// Event Type: "storage" (Listened to on the window object)
window.addEventListener("storage", function (event) {
  var key = event.key; // Returns key that was changed (string)
  var oldValue = event.oldValue; // Returns original value before modification
  var newValue = event.newValue; // Returns updated new value
  var url = event.url; // Returns URL of the document that changed the storage
  var storageArea = event.storageArea; // Returns reference to the changed Storage object
});

// ============================================================================
// 13. THE TOUCHEVENT OBJECT
// ============================================================================
// Triggers during touch screen interactions. Inherits from UIEvent.

// Event Types: "touchstart", "touchmove", "touchend", "touchcancel"
element.addEventListener("touchmove", function (event) {
  var touches = event.touches; // List of all touch targets currently on the screen
  var targetTouches = event.targetTouches; // List of touches originates from the same element binding
  var changedTouches = event.changedTouches; // List of touches that contributed to the current event
});

// ============================================================================
// 14. THE UIEVENT OBJECT
// ============================================================================
// Base class for UI elements interactions. Base object for Keyboard, Mouse, Focus, and Touch events.

// Event Types: "load", "unload", "abort", "error", "select", "resize", "scroll"
window.addEventListener("resize", function (event) {
  var detail = event.detail; // Returns extra contextual details about the event (event dependent)
  var view = event.view; // Returns reference to the Window object containing the event
});

// ============================================================================
// 15. THE WHEELEVENT OBJECT
// ============================================================================
// Triggers when a mouse wheel or touchpad scroll device is actively rotated. Inherits from MouseEvent.

// Event Type: "wheel"
element.addEventListener("wheel", function (event) {
  var deltaX = event.deltaX; // Returns horizontal scroll amount (float)
  var deltaY = event.deltaY; // Returns vertical scroll amount (float)
  var deltaZ = event.deltaZ; // Returns Z-axis scroll amount (float)
  var deltaMode = event.deltaMode; // Returns unit measurement mode (0 = pixels, 1 = lines, 2 = pages)
});
