// ============================================================================
// CATEGORY 1: DOM NAVIGATION & TRAVERSAL (The Family Tree)
// This section helps you move up, down, and sideways through the DOM tree.
// ============================================================================

// --- 1A. NODES VS ELEMENTS (Important Distinction) ---
// "Node" includes text blanks and comments. "Element" only counts actual HTML tags.

// 1. childNodes vs children
var totalNodes = document.body.childNodes; // Returns a NodeList (includes text, comments, elements)
var totalElements = document.body.children; // Returns an HTMLCollection (HTML elements only)

// 2. childElementCount
var totalChildTags = document.getElementById("myDIV").childElementCount; // Returns the count of child HTML tags

// 3. firstChild vs firstElementChild
var firstNode = document.getElementById("myList").firstChild; // Could be a blank space/text node
var firstTag = document.getElementById("myList").firstElementChild; // Always the first HTML tag (e.g., <li>)

// 4. lastChild vs lastElementChild
var lastNode = document.getElementById("mySelect").lastChild; // Last child node
var lastTag = document.getElementById("myDIV").lastElementChild; // Last child element tag

// 5. parentNode vs parentElement
var pNode = document.getElementById("myLI").parentNode; // Returns parent node
var pElem = document.body.parentElement; // Returns parent element (null if parent is not an element tag)

// 6. nextSibling vs nextElementSibling
var nNode = document.getElementById("item1").nextSibling; // Next node in line
var nElem = document.getElementById("item1").nextElementSibling; // Next actual HTML tag

// 7. previousSibling vs previousElementSibling
var pSiblingNode = document.getElementById("item2").previousSibling; // Previous node
var pSiblingElem = document.getElementById("item2").previousElementSibling; // Previous actual HTML tag

// --- 1B. ADVANCED LOOKUPS ---

// 8. closest() - Searches UP the DOM tree to find the nearest matching ancestor
var container = document.getElementById("myElement").closest(".container");
if (container) {
  container.style.border = "10px solid yellow";
}

// 9. contains() - Checks if a node is inside or equal to another node
var outerDiv = document.getElementById("myDIV");
var innerSpan = document.getElementById("mySPAN");
var isDescendant = outerDiv.contains(innerSpan); // Returns true or false

// ============================================================================
// CATEGORY 2: NODE MANIPULATION (Creating, Adding, Removing, Replacing)
// ============================================================================

// 1. appendChild() - Adds a node as the absolute last child of the parent
var listNode = document.createElement("LI");
var textNode = document.createTextNode("Water");
listNode.appendChild(textNode);
document.getElementById("myList").appendChild(listNode);

// 2. insertBefore() - Inserts a new node right before a specified existing child node
var targetList = document.getElementById("myList");
var newItem = document.createElement("LI");
newItem.appendChild(document.createTextNode("Coffee"));
targetList.insertBefore(newItem, targetList.childNodes[0]); // Inserts at the top

// 3. cloneNode() - Makes a duplicate copy of a node
var itemToCopy = document.getElementById("myList2").lastChild;
var copyInstance = itemToCopy.cloneNode(true); // pass 'true' to copy children/text too
document.getElementById("myList1").appendChild(copyInstance);

// 4. remove() - Deletes the element directly from the document
document.getElementById("demo").remove();

// 5. removeChild() - Removes a specific child node from a parent
var listParent = document.getElementById("myList");
listParent.removeChild(listParent.childNodes[0]);

// 6. replaceChild() - Swaps out an old child node with a new node
var newText = document.createTextNode("Fresh Water");
var oldChild = document.getElementById("myList").childNodes[0];
oldChild.replaceChild(newText, oldChild.childNodes[0]);

// --- 2A. THE "INSERT ADJACENT" TRIO ---
// Positions allowed: "beforebegin" (before target), "afterbegin" (first child), "beforeend" (last child), "afterend" (after target)
var heading = document.getElementById("myH2");

// 7. insertAdjacentElement()
var spanEl = document.getElementById("mySpan");
heading.insertAdjacentElement("afterend", spanEl);

// 8. insertAdjacentHTML()
heading.insertAdjacentHTML(
  "beforeend",
  "<span style='color:red'> Placed Inside!</span>",
);

// 9. insertAdjacentText()
heading.insertAdjacentText("beforebegin", "Text Prefix: ");

// ============================================================================
// CATEGORY 3: HANDLING ATTRIBUTES
// ============================================================================

// 1. attributes Collection - Returns all active attributes on an element
var imgAttributes = document.getElementById("myImg").attributes;
var txtOutput = "";
for (var i = 0; i < imgAttributes.length; i++) {
  txtOutput += imgAttributes[i].name + " = " + imgAttributes[i].value + "\n";
}

// 2. getAttribute() - Grabs the value of a specific attribute
var elementClass = document.getElementsByTagName("H1")[0].getAttribute("class");

// 3. setAttribute() - Changes or creates an attribute value
document.getElementsByTagName("H1")[0].setAttribute("class", "democlass");

// 4. removeAttribute() - Deletes an attribute from an element completely
document.getElementsByTagName("H1")[0].removeAttribute("class");

// --- 3A. ATTRIBUTE NODES (Dealing with Attributes as Objects) ---

// 5. getAttributeNode() [ADDED BENEFIT] - Fetches the actual attribute object node
var attrNode = document.getElementById("myAnchor").getAttributeNode("href");

// 6. setAttributeNode()
var h1Element = document.getElementsByTagName("H1")[0];
var customAttr = document.createAttribute("class");
customAttr.value = "new-dynamic-class";
h1Element.setAttributeNode(customAttr);

// 7. removeAttributeNode()
var anchorEl = document.getElementById("myAnchor");
var targetAttrNode = anchorEl.getAttributeNode("href");
anchorEl.removeAttributeNode(targetAttrNode);

// ============================================================================
// CATEGORY 4: WORKING WITH TEXT & CONTENT (The inner/outer properties)
// ============================================================================

// 1. innerHTML vs outerHTML
// innerHTML: Read/write content *inside* the tags
var innerContent = document.getElementById("demo").innerHTML;
// outerHTML: Read/write the element *including* its own start and end tags
document.getElementsByTagName("h1")[0].outerHTML =
  "<h3>Completely Replaced Heading</h3>";

// 2. textContent vs innerText vs outerText
// textContent: Gets raw text of all children, including hidden text and script content.
var cleanText = document.getElementById("myList").textContent;
// innerText: Only gets human-readable visible text (respects CSS styling)
var visibleText = document.getElementById("myList").innerText;
// outerText: Reading acts like innerText. Writing replaces the target element itself.
document.getElementById("myH1").outerText = "Changed content!";

// ============================================================================
// CATEGORY 5: ELEMENT STYLING & CLASSES
// ============================================================================

// --- 5A. INLINE STYLES ---
// 1. style Property - Manipulates inline CSS values directly
document.getElementById("myBtn").style.backgroundColor = "red";

// --- 5B. CLASSNAME STRINGS ---
// 2. className - Gets or overwrites the entire class attribute string
document.getElementById("myDIV").className = "style-one style-two";

// --- 5C. CLASSLIST OBJECT (Highly recommended for modern updates) ---
// 3. classList Methods
var divBox = document.getElementById("myDIV");
divBox.classList.add("active", "visible"); // Add single/multiple classes
divBox.classList.remove("old-class"); // Remove classes
divBox.classList.toggle("dark-mode"); // Swaps layout (adds if missing, removes if present)

var totalClasses = divBox.classList.length; // Count of classes
var firstClassName = divBox.classList.item(0); // View class name at index
var hasClass = divBox.classList.contains("active"); // Conditional check (true/false)

// --- 5D. HISTORICAL INTERNET EXPLORER FALLBACKS ---
// Cross-browser alternatives for IE9 and below
function legacyClassAdd(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    var arr = el.className.split(" ");
    if (arr.indexOf(className) == -1) {
      el.className += " " + className;
    }
  }
}

// ============================================================================
// CATEGORY 6: INTERACTIVITY & EVENTS (Actions)
// ============================================================================

// 1. addEventListener() & removeEventListener()
var actionBtn = document.getElementById("myBtn");
function alertHandler() {
  alert("Action Triggered!");
}

// Attaching standard action
actionBtn.addEventListener("click", alertHandler);
// Removing standard action
actionBtn.removeEventListener("click", alertHandler);

// Event Capturing Example (Third true flag ensures event runs on way *down* tree)
document.getElementById("myDiv").addEventListener("click", alertHandler, true);

// 2. Cross-browser Legacy Event Handling (IE8 fallback)
if (actionBtn.addEventListener) {
  actionBtn.addEventListener("click", alertHandler);
} else if (actionBtn.attachEvent) {
  actionBtn.attachEvent("onclick", alertHandler);
}

// 3. click() Method - Triggers an automated, synthetic element click
document.getElementById("myCheck").click();

// ============================================================================
// CATEGORY 7: META DATA & SPECIALIZED PROPERTIES
// ============================================================================

// 1. nodeName, nodeType, nodeValue
var pTag = document.getElementById("myP");
console.log(pTag.nodeName); // Output: "P" (returns capitalized tag name)
console.log(pTag.nodeType); // Output: 1 (1 = Element Node, 3 = Text Node)
console.log(pTag.childNodes[0].nodeValue); // Accesses text data inside string node

// 2. accessKey - Configures keyboard shortcuts (Alt + key or Option + key)
document.getElementById("myAnchor").accessKey = "w";

// 3. title - Controls the HTML hover descriptive tooltip text
document.getElementById("myAbbr").title = "World Health Organization";

// 4. dir - Alters layout text alignment direction
document.getElementById("myP").dir = "rtl"; // Right to Left formatting

// 5. contentEditable - Enables live modifications to content inside paragraph/div
document.getElementById("myP").contentEditable = "true";

// 6. blur() & focus() [ADDED BENEFIT] - Controls application target concentration
document.getElementById("myAnchor").focus(); // Automatically highlights the item
document.getElementById("myAnchor").blur(); // Disengages focus instantly

// 7. Fullscreen Control API
var rootLayout = document.documentElement;

function openFullscreen() {
  if (rootLayout.requestFullscreen) {
    rootLayout.requestFullscreen();
  } else if (rootLayout.webkitRequestFullscreen) {
    rootLayout.webkitRequestFullscreen();
  } // Safari
  else if (rootLayout.msRequestFullscreen) {
    rootLayout.msRequestFullscreen();
  } // IE11
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } // Safari
  else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } // IE11
}
