//  =================================
// JAVASCRIPT / JQUERY jQUERY DOM SELECTORS
// =================================

// ================ FINDING HTML ELEMENT BY ID ================
// Return the element with id="id01":

// jQuery
myElement = $("#id01");

// JavaScript
myElement = document.getElementById("id01");

// ================ FINDING HTML ELEMENT BY TAGNAME ================
// Return all <p> elements:

// jQuery
myElements = $("p");

// JavaScript
myElements = document.getElementsByTagName("p");

// ================ FINDING HTML ELEMENT BY CLASS NAME ================
// Return all elements with class="intro".

// jQuery
myElements = $(".intro");

// JavaScript
myElements = document.getElementsByClassName("intro");

// ================ FINDING HTML ELEMENT BY CSS SELECTORS ================
// Return a list of all <p> elements with class="intro".

// jQuery
myElements = $("p.intro");

// JavaScript
myElements = document.querySelectorAll("p.intro");

//  =================================
// JAVASCRIPT / JQUERY jQUERY HTML ELEMENTS
// =================================

// ================ SET TEXT CONTENT ================
// Set the inner text of an HTML element:

// jQuery
myElement.text("Hello Sweden!");

// JavaScript
myElement.textContent = "Hello Sweden!";

// ================ GET TEXT CONTENT ================
// Get the inner text of an HTML element:

// jQuery
myText = $("#02").text();

// JavaScript
myText = document.getElementById("02").textContent;

// ================ SET HTML CONTENT ================
// Set the HTML content of an element:

// jQuery
myElement.html("<p>Hello World</p>");

// JavaScript
myElement.innerHTML = "<p>Hello World</p>";

// ================ GET HTML CONTENT ================
// Get the HTML content of an element:

// jQuery
content = myElement.html();

// JavaScript
content = myElement.innerHTML;

//  =================================
// JAVASCRIPT / JQUERY jQUERY CSS  STYLES
// =================================

// ================ HIDING HTML ELEMENT ================
// Hide an HTML Element:

// jQuery
myElement.hide();

// JavaScript
myElement.style.display = "none";

// ================ SHOWING HTML ELEMENTS ================
// Show an HTML Element:

// jQuery
myElement.show();

// JavaScript
myElement.style.display = "";

// ================ STYLING HTML ELEMENT BY ID ================
// Change the font size of an HTML element:

// jQuery
$("#demo").css("font-size", "35px");

// JavaScript
document.getElementById("demo").style.fontSize = "35px";

//  =================================
// JAVASCRIPT / JQUERY jQUERY HTML DOM
// =================================

// ================ REMOVING HTML ELEMENTS ================
// Remove an HTML element:

// jQuery
$("#id02").remove();

// JavaScript
document.getElementById("id02").remove();

// ================ GETTING PARENT ELEMENT ================
// Return the parent of an HTML element:

// jQuery
myParent = $("#02").parent.prop("nodeName");

// JavaScript
myParent = document.getElementById("02").parentNode.nodeName;
