// ========= HTML DOM activeElement Property =========
// The activeElement property returns the currently focused element in the document.

// Note: This property is read-only.

// Tip: To give focus to an element, use the element.focus() method.
// Tip: To find out if the document has focus, use the document.hasFocus() method.

var x = document.activeElement.tagName;

// ========= HTML DOM addEventListener() Method =========
// The document.addEventListener() method attaches an event handler to the document.

// Tip: Use the document.removeEventListener() method to remove an event handler that has been attached with the addEventListener() method.
// Tip: Use the element.addEventListener() method to attach an event handler to a specified element.

document.addEventListener("click", function () {
  document.getElementById("demo").innerHTML = "Hello World";
});

document.addEventListener("click", myFunction);
function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World";
}

document.addEventListener("click", myFunction);
document.addEventListener("click", someOtherFunction);
document.addEventListener("mouseover", myFunction);
document.addEventListener("click", someOtherFunction);
document.addEventListener("mouseout", someOtherFunction);
document.addEventListener("click", function () {
  myFunction(p1, p2);
});
document.addEventListener("click", function () {
  document.body.style.backgroundColor = "red";
});

// Using the removeEventListener() method to remove an event handler that has been attached with the addEventListener() method:

// Attach an event handler to the document
document.addEventListener("mousemove", myFunction);

// Remove the event handler from the document
document.removeEventListener("mousemove", myFunction);

if (document.addEventListener) {
  // For all major browsers, except IE 8 and earlier
  document.addEventListener("click", myFunction);
} else if (document.attachEvent) {
  // For IE 8 and earlier versions
  document.attachEvent("onclick", myFunction);
}
// ========= HTML DOM adoptNode() Method =========
// he adoptNode() method adopts a node from another document.

// Adopt the first <h1> element that appears in an iframe (another document):
var frame = document.getElementsByTagName("IFRAME")[0];
var h = frame.contentWindow.document.getElementsByTagName("H1")[0];
var x = document.adoptNode(h);

// ========= HTML DOM anchors Collection =========
// The anchors collection returns a collection of all <a> elements in the document that have a name attribute

var x = document.anchors.length;

var x = document.anchors[0].innerHTML;

// ========= HTML DOM applets Collection =========
// The applets collection returns a collection of all <applet> elements in the document.

var x = document.applet.length;

// ========= HTML DOM baseURI Property =========
// The baseURI property returns the base URI of the HTML document.

var x = document.baseURI;

// ========= HTML DOM body Property =========
// The body property sets or returns the document's body.

document.body.style.backgroundColor = "yellow";

// Return the body property:
document.body;
var x = document.body.innerHTML;

// Set the body property:
document.body = newContent;
document.body.innerHTML = "Some new HTML content";

// Example: Create a <p> element with some text and append it to the document's body:

var x = document.createElement("P"); // Create a <p> element
var t = document.createTextNode("This is a paragraph."); // Create a text node
x.appendChild(t); // Append the text to <p>
document.body.appendChild(x); // Append <p> to <body>

// ========= HTML DOM close() Method =========
// The close() method closes the output stream previously opened with the document.open() method, and displays the collected data in this process.

// Example: Open an output stream, add some text, then close the output stream:
document.open();
document.write("<h1>Hello World</h1>");
document.close();

// Example: Using window.open() together with document.open() to open an output stream in a new window, add some text, then close the output stream:

var w = window.open();
w.document.open();
w.document.write("<h1>Hello World!</h1>");
w.document.close();

// ========= HTML DOM cookie Property =========
// he cookie property sets or returns all name/value pairs of cookies in the current document.
var x = document.cookie;

// Return the cookie property:
document.cookie;

// Set the cookie property:
document.cookie = newCookie;

// ========= HTML DOM characterSet Property =========
// The characterSet property returns the character encoding for the document.

var x = document.characterSet;

// ========= HTML DOM createAttribute() Method =========
// The createAttribute() method creates an attribute with the specified name, and returns the attribute as an Attr object.

// Example: Create a class attribute, with the value "democlass", and insert it to an <h1> element:

var h1 = document.getElementsByTagName("H1")[0]; // Get the first <h1> element in the document
var att = document.createAttribute("class"); // Create a "class" attribute
att.value = "democlass"; // Set the value of the class attribute
h1.setAttributeNode(att); // Add the class attribute to <h1>

// Example: Create a href attribute, with the value "www.w3schools.com", and insert it to an <a> element:

var anchor = document.getElementById("myAnchor"); // Get the <a> element with id="myAnchor"
var att = document.createAttribute("href"); // Create a "href" attribute
att.value = "https://www.w3schools.com"; // Set the value of the href attribute
anchor.setAttributeNode(att); // Add the href attribute to <a>

// ========= HTML DOM createComment() Method =========
// The createComment() method creates a Comment node with the specified text.

// Example: Create a comment node, and insert it to the HTML document:

var c = document.createComment("My personal comments");
document.body.appendChild(c);

// ========= HTML DOM createDocumentFragment() Method =========
// The createDocumentFragment() method creates an imaginary Node object, with all the properties and methods of the Node object.
// The createDocumentFragment() method is usefull when you want to extract parts of your document, change, add, or delete, some of the content, and insert it back to your document.

// Example: Create a documentFragment node and append a child to it (a list item). Then, change the list item's node value and insert it as the last child of the list:

var d = document.createDocumentFragment();
d.appendChild(document.getElementsByTagName("LI")[0]);
d.childNodes[0].childNodes[0].nodeValue = "Milk";
document.getElementsByTagName("UL")[0].appendChild(d);

// ========= HTML DOM createElement() Method =========
// The createElement() method creates an Element Node with the specified name.

// Example: Create a <button> element:
var btn = document.createElement("BUTTON");

// HTML elements often contains text. To create a button with text, use the innerText or innerHTML properties of the element object:

// Example: Create a button with text:
var btn = document.createElement("BUTTON"); // Create a <button> element
btn.innerHTML = "CLICK ME"; // Insert text
document.body.appendChild(btn); // Append <button> to <body>

// ========= HTML DOM activeElement Property =========
// The createEvent() method creates an event object.
// The event can be of any legal event type, and must be initialized before use.

// Example: Simulate a mouseover event:
var x = document.createEvent("MouseEvent");
x.initMouseEvent(
  "mouseover",
  true,
  true,
  window,
  0,
  0,
  0,
  0,
  0,
  false,
  false,
  false,
  false,
  0,
  null,
);

document.getElementById("myDiv").dispatchEvent(x);

// ========= HTML DOM createTextNode() Method =========
// The createTextNode() method creates a Text Node with the specified text.
// Example: Create a text node:
var t = document.createTextNode("Hello World");

// Example: Create a <h1> element with some text:
var h = document.createElement("H1"); // Create a <h1> element
var t = document.createTextNode("Hello World"); // Create a text node
h.appendChild(t); // Append the text to <h1>

// Example: Create a <p> element with some text:
var para = document.createElement("P"); // Create a <p> element
var t = document.createTextNode("This is a paragraph."); // Create a text node
para.appendChild(t); // Append the text to <p>

// ========= HTML DOM defaultView Property =========
// The defaultView property returns the document's Window Object.

// Example: Get the document's window object:
var x = document.defaultView;

// Example: Get the size of the window:
var x = document.defaultView;
var w = x.innerWidth;
var h = x.innerHeight;

// ========= HTML DOM designMode Property =========
// The designMode property sets or returns whether the document is editable or not.

// Example: Make the entire document editable:
document.designMode = "on";

// Syntax
// Get:
document.designMode;
// Set:
document.designMode = "on|off";

// ========= HTML DOM doctype Property =========
// The doctype property returns the doctype of the HTML document, as a DocumentType object.

// Example: Get the doctype name of an HTML document:
var x = document.doctype.name;

// ========= HTML DOM documentElement Property =========
// The documentElement property returns the documentElement of the document, as an Element object.

// Syntax
document.documentElement;

// For HTML documents the returned object is the <html> element.
var x = document.documentElement.nodeName;

// ========= HTML DOM documentMode Property =========
// he documentMode property returns the mode used by the browser to render the current document.

// Example: Return the mode used by the browser to render the current document:
var x = document.documentMode;

// ========= HTML DOM documentURI Property =========
// The documentURI property sets or returns the location of a document.

// Example: Get the location URI of the document:
var x = document.documentURI;

// ========= HTML domain Property =========
// The domain property returns the domain name of the server that loaded the current document.

// Example: Get the domain name of the server that loaded the document:
var x = document.domain;

// ========= HTML DOM embeds Collection =========
// The embeds collection returns a collection of all <embeds> elements in the document.

// Example: Find out how many <embed> elements there are in the document:
var x = document.embeds.length;

// ========= HTML DOM execCommand() Method =========
// The execCommand() method executes the specified command for the selected part of an editable section.

// Example: Make the selected text bold:
document.execCommand("bold");

// ========= HTML DOM forms Collection =========
// The forms collection returns a collection of all <form> elements in the document.

var x = document.forms.length;

// ========= HTML DOM fullscreenElement Property =========
// The fullscreenElement property returns the current element that is displayed in fullscreen mode, or null when not in fullscreen.

// Example: Get the element that is currently in fullscreen mode:
var elem = document.fullscreenElement;

// Example:Using prefixes for cross-browser code:
if (
  document.fullscreenElement /* Standard syntax */ ||
  document.webkitFullscreenElement /* Safari and Opera syntax */ ||
  document.msFullscreenElement /* IE11 syntax */
) {
}

// ========= HTML DOM fullscreenEnabled() Method =========
// The fullscreenEnabled() method returns a Boolean value indicating whether the document can be viewed in fullscreen mode.

// The fullscreenEnabled() method returns true if fullscreen mode is available, otherwise false.

// Tip: Use the element.requestFullscreen() method to view an element in fullscreen mode.

// Tip: Use the element.exitFullscreen() method to cancel fullscreen mode.

// Example: Show a <video> element in fullscreen mode:

/* Get the element you want displayed in fullscreen */
var elem = document.getElementById("myvideo");

/* Function to open fullscreen mode */
function openFullscreen() {
  /* If fullscreen mode is available, show the element in fullscreen */
  if (document.fullscreenEnabled) {
    /* Show the element in fullscreen */
    elem.requestFullscreen();
  }
}

// Example: Using prefixes for cross-browser code:

/* If fullscreen mode is available, then do something */
if (
  document.fullscreenEnabled /* Standard syntax */ ||
  document.webkitFullscreenEnabled /* Safari */ ||
  document.msFullscreenEnabled /* IE11 */
) {
}

// ========= HTML DOM images Collection =========
// The images collection returns a collection of all <img> elements in the document.
var x = document.images.length;

// Get the URL of the first <img> element (index 0) in the document:
var x = document.images[0].src;

// Get the URL of the first <img> element (index 0) in the document:
var x = document.images.item(0).src;

// Get the URL of the <img> element with id="myImg" in the document:

var x = document.images.namedItem("myImg").src;

// Example: Add a black dotted border to the first <img> element in the document:
document.images[0].style.border = "10px dotted black";

// Example: Loop through all <img> elements in the document, and output the URL (src) of each image:
var x = document.images;
var txt = "";
var i;
for (i = 0; i < x.length; i++) {
  txt = txt + x[i].src + "<br>";
}

// ========= HTML DOM write() Method =========
// The write() method writes HTML expressions or JavaScript code to a document.
document.write("Hello World!");

// ========= HTML DOM removeEventListener() Method =========
// The document.removeEventListener() method removes an event handler that has been attached with the document.addEventListener() method.

// Note: To remove event handlers, the function specified with the addEventListener() method must be an external, "named" function, like in the example above (myFunction).

// Anonymous functions, like "document.removeEventListener("event", function(){ myScript });" will not work.

// Tip: Use the element.addEventListener() and element.removeEventListener() methods to add/remove event handlers to/from a specified element.

// Example: Remove a "mousemove" event that has been attached with the addEventListener() method:

// Attach an event handler to the document
document.addEventListener("mousemove", myFunction);

// Remove the event handler from the document
document.removeEventListener("mousemove", myFunction);

// Example: For browsers that do not support the removeEventListener() method, you can use the detachEvent() method.

// This example demonstrates a cross-browser solution:
if (document.removeEventListener) {
  // For all major browsers, except IE 8 and earlier
  document.removeEventListener("mousemove", myFunction);
} else if (document.detachEvent) {
  // For IE 8 and earlier versions
  document.detachEvent("onmousemove", myFunction);
}

// ========= HTML DOM URL Property =========
// The URL property returns the full URL of the current HTML document.
// Note: This property is similar to the location.href property.

var x = document.URL;

