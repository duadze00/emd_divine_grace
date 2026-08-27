//* ==========================================
//* TOPIC 1: EVENT PROPAGATION (Flow of Events)
//* ==========================================

const grandparent = document.getElementById("grandparent");
const parent = document.getElementById("parent");
const child = document.getElementById("child");

//* SUBTOPIC A: The Capturing Phase (Trickles Down)
// Setting the 3rd argument of addEventListener to 'true' listens to the Capturing phase.
grandparent.addEventListener(
  "click",
  () => {
    console.log("1. Grandparent Capture 🔴 (Downwards)");
  },
  true,
);

parent.addEventListener(
  "click",
  () => {
    console.log("2. Parent Capture 🔴 (Downwards)");
  },
  true,
);

//* SUBTOPIC B: The Bubbling Phase (Bubbles Up)
// Leaving it blank or setting it to 'false' (default) listens to the Bubbling phase.
child.addEventListener("click", (event) => {
  console.log("3. Target Reached! 🎯 (Child Clicked)");

  //* BONUS CONCEPT: Stopping Propagation
  // If you uncomment the line below, the event stops here and won't bubble up to Parent/Grandparent.
  // event.stopPropagation();
});

parent.addEventListener("click", () => {
  console.log("4. Parent Bubbling 🔵 (Upwards)");
});

grandparent.addEventListener("click", () => {
  console.log("5. Grandparent Bubbling 🔵 (Upwards)");
});

//* ==========================================
//* TOPIC 2: EVENT DELEGATION (Efficiency)
//* ==========================================

// Instead of adding an event listener to every single button,
// we add ONE listener to their common parent container.
const container = document.getElementById("button-container");

container.addEventListener("click", (event) => {
  // event.target is the exact element that was clicked
  const clickedElement = event.target;

  // Check if the clicked element is actually a button
  if (clickedElement.tagName === "BUTTON") {
    // Read custom attributes (data-action) to know what to do
    const action = clickedElement.getAttribute("data-action");

    console.log(`🎯 Delegation Success! Action triggered: ${action}`);
  }
});
