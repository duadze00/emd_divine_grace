// ============================= HTML DOM =============================

// DOM = DOCUMENT OBJECT MODEL
// HTML DOM methods are actions you can perform (on HTML Elements).
// HTML DOM properties are values (of HTML Elements) that you can set or change.

// ============================= FINDING HTML ELEMENTS =============================
document.getElementById(id); // Find an element by element id
document.getElementsByTagName(name); // Find elements by tag name
document.getElementsByClassName(name); // Find elements by class name
document.querySelector(); // Returns the first element that is a descendant of node that matches selectors.
document.querySelectorAll(); // Returns all element descendants of node that match selectors.

// Example
const newElement = document.querySelector("p");
const oldElement = document.querySelector("h1");
const image = document.getElementById("images");

// ============================= CHANGING HTML ELEMENTS =============================

// PROPERTY	                                  DESCRIPTION
// element.innerHTML =  new html              content	Change the inner HTML of an element
// element.attribute = new value	            Change the attribute value of an HTML element
// element.style.property = new               style	Change the style of an HTML element

// METHOD	                                    DESCRIPTION
// element.setAttribute(attribute, value)	    Change the attribute value of an HTML element

// Example: Changing text
newElement.innerHTML = "Eric Mawule Duadze";
newElement.innerText = "EMD Divine Grace";
oldElement.textContent = "Still On Grind";

// Example: Changing the value of an Attribute
image.src = "landscape.jpg";

// ============================= ADDING AND DELETING HTML ELEMENTS =============================

// METHOD	                                    DESCRIPTION
document.createElement(element); // Create an HTML element
document.removeChild(element); // Remove an HTML element
document.appendChild(element); // Add an HTML element
document.replaceChild(newElement, oldElement); // Replace an HTML element
document.write(text); // Write into the HTML output stream

// Example

// ============================= ADDING EVENTS HANDLERS =============================

// ==== The addEventListener() method ====
// Syntax
element.addEventListener(event, Function, useCapture);

// Example
newElement.addEventListener("click", (e) => console.log(e));

// ==== Adding Many and Different Events to same Element ====
element.addEventListener("click", myFunction);
element.addEventListener("click", mySecondFunction);
element.addEventListener("mouseover", myFunction);
element.addEventListener("click", mySecondFunction);
element.addEventListener("mouseout", myThirdFunction);

// ==== Add an Event Handler to the window Object ====
window.addEventListener("resize", function () {
  document.getElementById("demo").innerHTML = sometext;
});

// ==== Event Bubbling or Event Capturing ====

// There are two ways of event propagation in the HTML DOM, bubbling and capturing.

// Event propagation is a way of defining the element order when an event occurs. If you have a <p> element inside a <div> element, and the user clicks on the <p> element, which element's "click" event should be handled first?

// In bubbling the inner most element's event is handled first and then the outer: the <p> element's click event is handled first, then the <div> element's click event.

// In capturing the outer most element's event is handled first and then the inner: the <div> element's click event will be handled first, then the <p> element's click event.

// Syntax
addEventListener(event, Function, useCapture);

// The default value is false, which will use the bubbling propagation, when the value is set to true, the event uses the capturing propagation.

// Example
document.getElementById("myP").addEventListener("click", myFunction, true);
document.getElementById("myDiv").addEventListener("click", myFunction, true);

// ==== The removeEventListener() method ====
// The removeEventListener() method removes event handlers that have been attached with the addEventListener() method:

element.removeEventListener("mousemove", myFunction);

// ==== EVENTS ====
onload;
onunload;
onchange;
onmousedown;
onmouseup;
onmouseover;
onmouseout;
onmouseenter;
onclick;

// ============================= JAVASCRIPT FORMS =============================

// Validating a form
function validateForm() {
  let x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}

// The HTML for the function above
<html>
  <head></head>
  <body>
    <form
      name="myForm"
      action="/action_page.php"
      onsubmit="return validateForm()"
      method="post"
    >
      <label for="fname">Name: </label>
      <input type="text" name="fname"></input>
      <input type="submit" value="Submit">
        Submit
      </input>
    </form>
  </body>
</html>;

// Automatic HTML From Validation
// The required attribute prevents this form from being submitted

// ==== Constraint Validation HTML Input Attributes ====
// ATTRIBUTE	    DESCRIPTION
// disabled	      Specifies that the input element should be disabled
// max	          Specifies the maximum value of an input element
// min	          Specifies the minimum value of an input element
// pattern	      Specifies the value pattern of an input element
// required	      Specifies that the input field requires an element
// type 	        Specifies the type of an input element

// ============================= CHANGING CSS =============================
// syntax:
document.getElementById(id).style.property = new style();

// Example
newElement.style.backgroundColor = "red";

// ============================= HTML DOM ANIMATION =============================
// ==== STEPS ====
// 1. Create an Animation Container
// 2. Style the Elements
// #. The container element should be created with style = "position: relative".
// #. The animation element should be created with style = "position: absolute".
// 3. Animation Code

// Create the Full Animation Using JavaScript
// Example
function myMove() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + "px";
      elem.style.left = pos + "px";
    }
  }
}

// ============================= JAVASCRIPT HTML DOM NAVIGATION =============================
// DOM Nodes
// According to the W3C HTML DOM standard, everything in an HTML document is a node

// NODE RELATIONSHIPS
<html>
  <head>
    <title>DOM Tutorial</title>
  </head>
  <body>
    <h1>DOM Lesson one</h1>
    <p>Hello world!</p>
  </body>
</html>;

{
  /* 
From the HTML above you can read:
  <html> is the root node
  <html> has no parents
  <html> is the parent of <head> and <body>
  <head> is the first child of <html>
  <body> is the last child of <html>

and:
  <head> has one child: <title>
  <title> has one child (a text node): "DOM Tutorial"
  <body> has two children: <h1> and <p>
  <h1> has one child: "DOM Lesson one"
  <p> has one child: "Hello world!"
  <h1> and <p> are siblings 
*/
}

// NAVIGATION BETWEEN NODES
// You can use the following node properties to navigate between nodes with JavaScript:

parentNode;
childNodes[nodenumber];
firstChild;
lastChild;
nextSibling;
previousSibling;

// DOM ROOT NODES
// There are two special properties that allow access to the full document:

document.body; //The body of the document
document.documentElement; //The full document

// The nodeName Property
// The nodeName property specifies the name of a node.
document.getElementById("id02").innerHTML =
  document.getElementById("id01").nodeName;

// The nodeValue Property
// The nodeValue property specifies the value of a node.

// The nodeType Property
// The nodeType property is read only. It returns the type of a node.

// ============================= CREATING NEW HTML ELEMENTS (NODES) =============================

// ==== CREATING NEW HTML ELEMENTS -appendChild() ====
// The appendChild() method append element as the last child of the parent.

<div id="div1">
  <p id="p1">This is a paragraph.</p>
  <p id="p2">This is another paragraph.</p>
</div>;

const para = document.createElement("p");
const node = document.createTextNode("This is new.");
para.appendChild(node);

const element = document.getElementById("div1");
element.appendChild(para);

// ==== CREATING NEW HTML ELEMENTS -insertBefore() ====
// insertBefore() method append element at a specified index

<div id="div1">
  <p id="p1">This is a paragraph.</p>
  <p id="p2">This is another paragraph.</p>
</div>;

const para = document.createElement("p");
const node = document.createTextNode("This is new.");
para.appendChild(node);

const element = document.getElementById("div1");
const child = document.getElementById("p1");
element.insertBefore(para, child);

// ==== REMOVING EXISTING HTML ELEMENTS ====
// To remove an HTML element, use the remove() method

<div>
  <p id="p1">This is a paragraph.</p>
  <p id="p2">This is another paragraph.</p>
</div>;

const elmnt = document.getElementById("p1");
elmnt.remove();

// ==== REMOVING A CHILD NODE ====
// For browsers that does not support the remove() method, you have to find the parent node to remove an element

<div id="div1">
  <p id="p1">This is a paragraph.</p>
  <p id="p2">This is another paragraph.</p>
</div>;

const parent = document.getElementById("div1");
const child = document.getElementById("p1");
parent.removeChild(child);

// ==== REPLACING HTML ELEMENTS ====
// To replace an element to the HTML DOM, use the replaceChild() method

<div id="div1">
  <p id="p1">This is a paragraph.</p>
  <p id="p2">This is another paragraph.</p>
</div>;

const para = document.createElement("p");
const node = document.createTextNode("This is new.");
para.appendChild(node);

const parent = document.getElementById("div1");
const child = document.getElementById("p1");
parent.replaceChild(para, child);

// ============================= HTML DOM NODE LISTS =============================
// ==== The HTML DOM NodeList Object ====
// A NodeList object is a list (collection) of nodes extracted from a document.

// NB. Most browsers return a NodeList object for the method querySelectorAll()

const myNodeList = document.querySelectorAll("p");
console.log(myNodeList[1]);

// ==== HTML DOM Node List Length ====
// The length property defines the number of nodes in a node list

myNodelist.length;

// ==== The Difference Between an HTMLCollection and a NodeList ====
// An HTMLCollection is a collection of HTML elements and a NodeList is a collection of document nodes.
// A NodeList and an HTML collection is very much the same thing.
