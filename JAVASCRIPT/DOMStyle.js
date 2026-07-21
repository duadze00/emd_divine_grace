// ============================================================================
// ACCESSING STYLE OBJECTS
// ============================================================================

// 1. Access an inline style of a specific element (Most Common)
var element = document.getElementById("myH1");
var styleObj = element.style;

// Example: Get or Set inline property values
var currentBackground = element.style.backgroundColor; // Get
element.style.backgroundColor = "blue"; // Set

// 2. Access the global <style> tags located in the document <head>
var allStyleTags = document.getElementsByTagName("STYLE");
var firstStyleTag = allStyleTags[0];

// ============================================================================
// CREATING STYLE OBJECTS DYNAMICALLY
// ============================================================================

// Create a completely new <style> element, inject CSS into it, and append it to the document head
var newStyleElement = document.createElement("STYLE");
newStyleElement.textContent =
  "body { background-color: #f3f3f3; } .custom-class { color: red; }";
document.head.appendChild(newStyleElement);

// ========= LAYOUT & SIZING =========
element.style.width = "100px";
element.style.height = "200px";
element.style.minWidth = "50px";
element.style.maxWidth = "500px";
element.style.minHeight = "100px";
element.style.maxHeight = "800px";
element.style.display = "block"; // e.g., "block", "inline", "none", "flex", "grid"
element.style.visibility = "hidden"; // "visible" or "hidden"
element.style.overflow = "scroll"; // Shorthand for X and Y axes
element.style.overflowX = "auto";
element.style.overflowY = "hidden";
element.style.boxSizing = "border-box"; // "content-box" or "border-box"
element.style.resize = "both"; // "none", "both", "horizontal", "vertical"

// ========= POSITIONING & BOX MODEL =========
// Positioning
element.style.position = "absolute"; // "static", "relative", "absolute", "fixed", "sticky"
element.style.top = "10px";
element.style.bottom = "10px";
element.style.left = "0px";
element.style.right = "0px";
element.style.zIndex = "10"; // Stack order (Requires a non-static position)

// Margins (Shorthand and Longhand)
element.style.margin = "10px 20px";
element.style.marginTop = "10px";
element.style.marginBottom = "10px";
element.style.marginLeft = "20px";
element.style.marginRight = "20px";

// Padding (Shorthand and Longhand)
element.style.padding = "15px";
element.style.paddingTop = "15px";
element.style.paddingBottom = "15px";
element.style.paddingLeft = "15px";
element.style.paddingRight = "15px";

// Borders & Radii
element.style.border = "2px solid black";
element.style.borderColor = "red";
element.style.borderStyle = "dashed";
element.style.borderWidth = "5px";
element.style.borderRadius = "8px"; // Standard rounded corners
element.style.borderTopLeftRadius = "4px";
element.style.borderTopRightRadius = "4px";
element.style.borderBottomLeftRadius = "0px";
element.style.borderBottomRightRadius = "0px";
element.style.boxShadow = "10px 10px 5px grey";

// ========= FLEXBOX ALIGNMENT =========
element.style.flexDirection = "row"; // "row", "row-reverse", "column", "column-reverse"
element.style.flexWrap = "wrap"; // "nowrap", "wrap", "wrap-reverse"
element.style.justifyContent = "center"; // "flex-start", "center", "space-between", etc.
element.style.alignItems = "stretch"; // Cross-axis alignment for items
element.style.alignContent = "normal"; // Alignment between multi-lines
element.style.alignSelf = "auto"; // Override alignment for a specific item
element.style.flexGrow = "1";
element.style.flexShrink = "0";
element.style.flexBasis = "auto";
element.style.order = "2"; // Reordering layout order

// ========= TYPOGRAPHY & TEXT COLORS =========
element.style.color = "#333333";
element.style.fontFamily = "Arial, sans-serif";
element.style.fontSize = "16px";
element.style.fontWeight = "bold"; // "normal", "bold", "700", etc.
element.style.fontStyle = "italic"; // "normal", "italic", "oblique"
element.style.lineHeight = "1.5";
element.style.textAlign = "center"; // "left", "right", "center", "justify"
element.style.textDecoration = "underline";
element.style.textTransform = "uppercase"; // "uppercase", "lowercase", "capitalize"
element.style.letterSpacing = "2px";
element.style.wordSpacing = "4px";
element.style.whiteSpace = "nowrap";
element.style.textOverflow = "ellipsis"; // Adds "..." to cut-off text
element.style.textShadow = "2px 2px #ff0000";

// ========= BACKGROUNDS, ANIMATION & VISUAL EFFECTS =========
// Backgrounds
element.style.background = "url('bg.png') no-repeat center";
element.style.backgroundColor = "transparent";
element.style.backgroundImage = "url('img.jpg')";
element.style.backgroundSize = "cover"; // "auto", "cover", "contain"
element.style.backgroundRepeat = "repeat-x";

// Visual Effects
element.style.opacity = "0.5"; // Range: 0.0 (transparent) to 1.0 (opaque)
element.style.filter = "blur(5px)"; // CSS Filters like blur, grayscale, sepia, contrast
element.style.cursor = "pointer"; // Changes cursor style on hover (e.g., "pointer", "wait", "crosshair")

// Transitions & Transformations
element.style.transform = "rotate(45deg) scale(1.2)";
element.style.transformOrigin = "center center";
element.style.transition = "all 0.3s ease-in-out";
element.style.transitionProperty = "opacity";
element.style.transitionDuration = "300ms";

// Animations
element.style.animation = "slideIn 2s ease infinite";
element.style.animationName = "slideIn";
element.style.animationDuration = "2s";
element.style.animationPlayState = "paused"; // "running" or "paused"

// ========= MASS MODIFICATION VIA cssText =========
// Overwrites all inline styles with a single string assignment
element.style.cssText =
  "color: blue; background-color: yellow; width: 100px; height: 100px;";

// ========= SET PROPERTY & REMOVE PROPERTY METHODS =========
// 1. setProperty() - No camelCase translation needed!
element.style.setProperty("background-color", "purple");

// 2. removeProperty() - Completely strips an inline style off an element
element.style.removeProperty("background-color");

// ========= READING STYLES SAFELY =========
var myElem = document.getElementById("myH1");

// WRONG: Returns empty string if color is managed by an external stylesheet file
var badWay = myElem.style.color;

// CORRECT: Returns the true value currently rendered on screen
var realColor = window.getComputedStyle(myElem).color;
