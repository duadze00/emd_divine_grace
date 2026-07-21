/*
+--------------------------------------------------+  ▲
|  Browser Window / Desktop Workspace              |  │
|                                                  |  │
|                                                  |  │
|                                                  |  │ location.availHeight
|                                                  |  │ (Excludes OS Taskbar)
|                                                  |  │
|                                                  |  │
+--------------------------------------------------+  ▼
|  [OS Taskbar / Dock]                             |
+--------------------------------------------------+  ▼
◄──────────────────────────────────────────────────►
                 location.width / availWidth
 (Note: If taskbar is vertical, availWidth shrinks)
*/

// ============================================================================
// WINDOW.SCREEN PROPERTIES
// ============================================================================

// 1. width
// Returns the total horizontal width of the user's physical screen screen (in pixels).
var totalScreenWidth = screen.width;

// 2. height
// Returns the total vertical height of the user's physical screen (in pixels).
var totalScreenHeight = screen.height;

// 3. availWidth
// Returns the width of the screen available to the browser interface,
// minus OS interface features like a vertical taskbar or dock.
var availableScreenWidth = screen.availWidth;

// 4. availHeight
// Returns the height of the screen available to the browser interface,
// minus OS interface features like the Windows Taskbar or Mac Dock.
var availableScreenHeight = screen.availHeight;

// 5. colorDepth
// Returns the bit depth of the color palette used to render images (e.g., 24 or 32 bits per pixel).
var screenColorDepth = screen.colorDepth;

// 6. pixelDepth
// Returns the current color resolution of the screen in bits per pixel.
// Note: For modern devices, pixelDepth and colorDepth are almost always identical.
var screenPixelDepth = screen.pixelDepth;

// ============================================================================
// MODERN SCREEN ADDITIONS (HIGHLY IMPORTANT)
// ============================================================================

// A. Screen Orientation Object (screen.orientation)
// Returns a ScreenOrientation object containing information about the current screen angle and type.
if (screen.orientation) {
  var orientationType = screen.orientation.type; // e.g., "portrait-primary", "landscape-secondary"
  var orientationAngle = screen.orientation.angle; // e.g., 0, 90, 180, 270 degrees
  console.log(
    "Orientation type: " + orientationType + " (" + orientationAngle + "°)",
  );
}

// B. Screen Orientation Methods
// Allows web applications to programmatically force-lock the orientation of the screen
// (Works primarily in mobile full-screen applications).
// Note: Must be invoked in a user-interaction handler (like a button click).
function lockScreenToLandscape() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation
      .lock("landscape")
      .then(function () {
        console.log("Locked to landscape!");
      })
      .catch(function (error) {
        console.error("Locking failed:", error);
      });
  }
}

// To unlock the screen orientation:
function unlockScreen() {
  if (screen.orientation && screen.orientation.unlock) {
    screen.orientation.unlock();
  }
}

// C. Bonus Window Property: Device Pixel Ratio (window.devicePixelRatio)
// While part of the window object rather than screen object, it is highly tied to the screen.
// It returns the ratio of physical pixels to CSS pixels on the current screen (Crucial for Retina/High-DPI displays).
var pixelRatio = window.devicePixelRatio; // Returns 1 for standard screens, 2 or 3 for high-density displays
