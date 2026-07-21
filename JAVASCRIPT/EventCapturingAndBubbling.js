// ============================================================================
// THE DOM EVENT FLOW (BUBBLING & CAPTURING)
// When an event occurs on an element, it doesn't just happen in one spot.
// The browser moves the event through 3 distinct phases in a waterfall flow:
// 1. CAPTURING PHASE - The event goes DOWN from window to the target element.
// 2. TARGET PHASE    - The event fires directly on the clicked element.
// 3. BUBBUNG PHASE   - The event travels back UP from the element to window.
// ============================================================================

// HTML Setup for the examples below:
// <div id="grandparent">
//   <div id="parent">
//     <button id="child">Click Me!</button>
//   </div>
// </div >

var grandparent = document.getElementById("grandparent");
var parent = document.getElementById("parent");
var child = document.getElementById("child");

// ============================================================================
// EVENT BUBBLING (The Default Behavior)
// When you click the #child button, the event travels upwards like a bubble
// in water, hitting the parent, then grandparent, then body, then document.
// ============================================================================

// By default, .addEventListener() listens for events during the BUBBLING phase.
child.addEventListener("click", function () {
  console.log("1. Child Button Clicked (Bubbling)");
});

parent.addEventListener("click", function () {
  console.log("2. Parent Div Hit (Bubbling)");
});

grandparent.addEventListener("click", function () {
  console.log("3. Grandparent Div Hit (Bubbling)");
});

// TEST RESULT OF CLICKING #child:
// -> "1. Child Button Clicked (Bubbling)"
// -> "2. Parent Div Hit (Bubbling)"
// -> "3. Grandparent Div Hit (Bubbling)"

// ============================================================================
// EVENT CAPTURING (The Optional Third Parameter)
// If you want an event to be intercepted on its way DOWN the tree before it
// hits the actual element, you use the optional 'useCapture' boolean flag.
// Syntax: element.addEventListener(event, function, useCapture);
// ============================================================================

// Setting the 3rd parameter to 'true' tells the browser to trigger during CAPTURING.
grandparent.addEventListener(
  "click",
  function () {
    console.log("A. Grandparent Intercepted (Capturing)");
  },
  true,
);

parent.addEventListener(
  "click",
  function () {
    console.log("B. Parent Intercepted (Capturing)");
  },
  true,
);

child.addEventListener(
  "click",
  function () {
    console.log("C. Child Target Hit (Capturing)");
  },
  true,
);

// TEST RESULT OF CLICKING #child WITH CAPTURING ACTIVE:
// -> "A. Grandparent Intercepted (Capturing)"
// -> "B. Parent Intercepted (Capturing)"
// -> "C. Child Target Hit (Capturing)"

// ============================================================================
// DEEP CONTROL USING THE EVENT OBJECT (e)
// Inside an event listener, the browser automatically passes an event object
// containing properties that track exactly how the phase flow is behaving.
// ============================================================================

parent.addEventListener("click", function (e) {
  // 1. e.target - The exact element that started the chain reaction (the button clicked).
  console.log("Element originally clicked:", e.target.id);

  // 2. e.currentTarget - The element that is currently executing this active script block.
  console.log("Element currently running this code:", e.currentTarget.id);

  // 3. e.eventPhase - Returns an integer representing the current active phase code:
  // 1 = Capturing Phase, 2 = Target Phase, 3 = Bubbling Phase
  console.log("Current Event Phase Code:", e.eventPhase);

  // 4. e.stopPropagation() - Halts the chain reaction completely!
  // If placed here during bubbling, the grandparent listener will NEVER hear this event.
  e.stopPropagation();
  console.log("Event propagation stopped here. It won't bubble up further!");
});

// ============================================================================
// PRODUCTION POWER: EVENT DELEGATION
// Why do we learn bubbling? To write cleaner, high-performance code!
// Instead of adding a click event listener to 100 individual list items (<li>),
// you add ONE single listener to their parent container (<ul>) and leverage bubbling.
// ============================================================================

// HTML Setup:
// <ul id="myProductList">
//   <li data-id="1">Product A</li>
//   <li data-id="2">Product B</li>
//   <li data-id="3">Product C</li>
// </ul>

var productList = document.getElementById("myProductList");

// Attach one listener to the parent container
productList.addEventListener("click", function (e) {
  // Use e.target to filter and check if the clicked item is an actual list element
  if (e.target && e.target.nodeName === "LI") {
    console.log("Dynamically handled item click!");
    console.log("Product ID selected:", e.target.getAttribute("data-id"));
    console.log("Product Text:", e.target.textContent);
  }
});

// Why Event Delegation is crucial for Software Engineers:
// 1. Memory Efficiency: You only use 1 listener instead of 100.
// 2. Dynamic Compatibility: If you add new <li> items via JavaScript later, they instantly have the click functionality without needing new listeners!

// QUICK MENTAL CHECK
// ​Bubbling (false): Inside-Out tracking. Fires from the specific element you clicked out to the root window.
// ​Capturing (true): Outside-In tracking. Fires from the root window down into the specific element.
// ​e.stopPropagation(): Draws a line in the sand. It tells the browser, "Stop traveling right here, do not process any more ancestral elements in the phase tree."
