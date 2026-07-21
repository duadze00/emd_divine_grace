// ============================================================================
// THE NAMEDNODEMAP OBJECT & ATTRIBUTE NODES
// A NamedNodeMap is an object collection of attribute nodes (e.g., id, class, type).
// Note: It looks like an array, but it is NOT an array!
// ============================================================================

// --- MAP COLLECTION METHODS (Managing the Attributes Collection) ---

// 1. getNamedItem() - Retrieves an attribute node by its string name
var btn = document.getElementsByTagName("BUTTON")[0];
var clickAttrNode = btn.attributes.getNamedItem("onclick");
console.log(clickAttrNode.value);

// Modern Alternative Tip: btn.getAttribute("onclick") is much more commonly used today!

// 2. setNamedItem() - Adds an entire pre-created attribute node to the element
var heading = document.getElementsByTagName("H1")[0];
var classAttr = document.createAttribute("class"); // Create the Attr node object
classAttr.value = "democlass"; // Set its text value
heading.attributes.setNamedItem(classAttr); // Inject it into the map

// Modern Alternative Tip: heading.setAttribute("class", "democlass") achieves this in one line.

// 3. removeNamedItem() - Deletes an attribute node from the element using its name
var inputEl = document.getElementsByTagName("INPUT")[0];
inputEl.attributes.removeNamedItem("type");

// Modern Alternative Tip: inputEl.removeAttribute("type") is the cleaner modern choice.

// 4. item() - Accesses an attribute node using its numerical index (0-based)
var matchOne = document.getElementsByTagName("BUTTON")[0].attributes.item(0);

// Shortcut Syntax: You can use standard bracket notation instead of .item()
var matchTwo = document.getElementsByTagName("BUTTON")[0].attributes[0]; // Exactly the same result

// --- MAP COLLECTION PROPERTIES (Analyzing the Collection) ---

// 5. length - Returns the total count of attributes currently active on the element
var totalImgAttrs = document.getElementById("myImg").attributes.length;

// Example: Standard For-Loop iterating through the NamedNodeMap
var outputLog = "";
var elementAttrs = document.getElementById("myBtn").attributes;

for (var i = 0; i < elementAttrs.length; i++) {
  outputLog += "Attribute name: " + elementAttrs[i].name + "\n";
}

// Modern Trick: Converting a NamedNodeMap into a real Array
// Because NamedNodeMaps lack modern array methods like .forEach(), you can convert them like this:
var attrArray = Array.from(document.getElementById("myImg").attributes);
// OR using spread syntax: 
// const attrArray = [...document.getElementById("myImg").attributes];
attrArray.forEach((attr) => {
  console.log(`${attr.name} has a value of ${attr.value}`);
});

// --- INDIVIDUAL ATTRIBUTE NODE PROPERTIES ---
// Once you grab a single attribute node (using item() or getNamedItem()), you can inspect these properties:

var standardAttrNode = document.getElementById("demo").attributes[0];

// 6. name - Returns the key name of the attribute (e.g., "class", "id", "href")
var attrKeyName = standardAttrNode.name;

// 7. value - Reads or overwrites the text value assigned to that attribute
var currentTextVal = standardAttrNode.value; // Read value
standardAttrNode.value = "new-updated-value"; // Overwrite value

// 8. specified - Returns true if the attribute was explicitly set in the HTML/JS.
// Returns false if it is a default value automatically given by the browser.
var isExplicitlySet = standardAttrNode.specified;

// 9. isId - Returns true if the target attribute node represents an ID attribute.
var checkIsIdType = standardAttrNode.isId;

// ---  hasAttribute() ---
// While your notes cover how to get, set, and remove attributes, checking if an element
// even has an attribute is crucial. Use this clean method instead of checking length or map loops:
var hasDisabledAttr = document.getElementById("myBtn").hasAttribute("disabled"); // Returns true or false
