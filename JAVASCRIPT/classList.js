// =================================================================================================
// CLASSLIST
// =================================================================================================
// classList is specifically for the class attribute.

// HTML
<div id="box" class="red"></div>;

// JAVASCRIPT
const box = document.getElementById("box");

box.classList.add("active");
box.classList.remove("red");
box.classList.toggle("hidden");
box.classList.contains("active");
