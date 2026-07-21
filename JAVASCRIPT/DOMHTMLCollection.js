// =============== HTMLCollection item() Method ===============
// The item() method returns the element at the specified index in an HTMLCollection.

// Syntax
HTMLCollection.item(index);
// OR:
HTMLCollection[index];

// Example: Get the HTML content of the first <p> element of this document:
function myFunction() {
  var x = document.getElementsByTagName("P").item(0);
  alert(x.innerHTML);
}

// Shorthand method
var x = document.getElementsByTagName("P")[0];

// =============== HTMLCollection length Property ===============
// The length property returns the number of elements in a HTMLCollection.

// Syntax
HTMLCollection.length;

// Example: Find out how many P elements there are in the document:
function myFunction() {
  var l = document.getElementsByTagName("P").length;
  alert(l);
}

// =============== HTMLCollection namedItem() Method ===============
// he namedItem() method returns the element with the specified ID or name in an HTMLCollection.

// Syntax
HTMLCollection.namedItem(name);
// OR:
HTMLCollection[name];

// Example: Get the content of the P element with ID "myElement":
function myFunction() {
  var x = document.getElementsByTagName("P").namedItem("myElement");
  alert(x.innerHTML);
}

// Shorthand method
var x = document.getElementsByTagName("P")["myElement"];
