const parent = document.querySelector("#parent");

// EVENT DELEGATION
parent.addEventListener("click", (event) => {
  if (event.target.tagName !== "LI") return;

  parent.querySelectorAll("li").forEach((li) => {
    li.classList.remove("show");
  });

  event.target.classList.add("show");
});

// EVENT CAPTURING AND BUBBLING
// Capturing
parent.addEventListener("click", (event)=>{console.log(event);}, {capture: true});

// Bubbling
parent.addEventListener("click", (event)=>{console.log(event);},  {capture: true});

// event.stopPropagation() → Stops the event from continuing to other elements.
// event.stopImmediatePropagation() → Stops other listeners on the same element as well.
// event.preventDefault() → Prevents the browser's default action 