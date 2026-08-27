/*
 * CONCEPT 1: THE EVENT OBJECT (e) & EVENT FLOW
 * When an event happens, it travels in 3 phases:
 * 1. Capturing Phase: Goes from Window down to the target element.
 * 2. Target Phase: Fires on the actual element you clicked.
 * 3. Bubbling Phase: Bubbles from the target element back up to the Window.
 * * Note: .addEventListener(type, callback, useCapture)
 * If useCapture is true -> listener runs during Capturing phase.
 * If useCapture is false (default) -> listener runs during Bubbling phase.
 */

const grandparent = document.getElementById("grandparent");
const parent = document.getElementById("parent");
const child = document.getElementById("child");

//* CAPTURING PHASE (useCapture = true)
grandparent.addEventListener(
  "click",
  (e) => {
    console.log(
      "%c1. Capturing: Grandparent",
      "color: #e74c3c; font-weight: bold;",
    );
    logEventObjectDetails(e);
  },
  true,
);

parent.addEventListener(
  "click",
  (e) => {
    console.log("%c2. Capturing: Parent", "color: #3498db; font-weight: bold;");
  },
  true,
);

child.addEventListener(
  "click",
  (e) => {
    console.log(
      "%c3. Target Phase (Reached Child during capture)",
      "color: #2ecc71; font-weight: bold;",
    );
  },
  true,
);

//* BUBBLING PHASE (useCapture = false)
child.addEventListener(
  "click",
  (e) => {
    console.log(
      "%c4. Target Phase (Reached Child during bubble)",
      "color: #2ecc71; font-weight: bold;",
    );
  },
  false,
);

parent.addEventListener(
  "click",
  (e) => {
    console.log("%c5. Bubbling: Parent", "color: #3498db; font-weight: bold;");

    //* RELATED TOPIC UNMENTIONED: e.stopPropagation()
    // Uncomment the line below to stop the event from bubbling up to Grandparent!
    // e.stopPropagation();
  },
  false,
);

grandparent.addEventListener(
  "click",
  (e) => {
    console.log(
      "%c6. Bubbling: Grandparent",
      "color: #e74c3c; font-weight: bold;",
    );
  },
  false,
);

//* DEEP DIVE: Crucial Properties of the Event Object (e)

function logEventObjectDetails(e) {
  console.log(`   👉 e.target (The exact element clicked):`, e.target.id);
  console.log(
    `   👉 e.currentTarget (The element currently handling this listener):`,
    e.currentTarget.id,
  );
  console.log(`   👉 e.type (Type of event):`, e.type);
}

/*
 * =======================================================================
 * CONCEPT 2: EVENT DELEGATION (The Real-World Example)
 * =======================================================================
 * Instead of attaching listeners to every single delete button, we attach
 * ONE listener to the parent container ('#taskList').
 * We then use e.target to identify exactly what was clicked.
 */

const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");

// 1. The Single Parent Listener (Delegation)
taskList.addEventListener("click", function (e) {
  // Check if the user clicked something with the class 'btn-delete'
  if (e.target.classList.contains("btn-delete")) {
    // Find the closest list item to get the data-id or remove it
    const taskItem = e.target.closest(".task-item");
    console.log(
      `%c[Delegation Log] Deleting task ID: ${taskItem.dataset.id}`,
      "color: #9b59b6",
    );
    taskItem.remove();
  }
});

// 2. Feature to add elements dynamically
// Notice how new elements get delete functionality automatically! No new listeners needed.
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return alert("Please enter a task name");

  const nextId = Date.now(); // Unique ID simulation
  const li = document.createElement("li");
  li.className = "task-item";
  li.setAttribute("data-id", nextId);
  li.innerHTML = `
        <span>${text}</span>
        <button class="btn-delete">Delete</button>
    `;

  taskList.appendChild(li);
  taskInput.value = "";
  console.log(
    "%c[System] New item added to DOM. Event delegation handles its clicks seamlessly.",
    "color: gray",
  );
});

/**
 * =======================================================================
 * BONUS RELATED TOPICS (Things you didn't mention but MUST know)
 * =======================================================================
 */

// 1. e.preventDefault()
// Stops the default browser action (e.g., stops a link from opening or form from reloading).
// Example:
// document.querySelector('form').addEventListener('submit', (e) => e.preventDefault());

// 2. Custom Events
// You can create and fire your own events manually!
const customEvent = new CustomEvent("userUpvoted", {
  detail: { points: 10, username: "JS_Developer" },
});
// You can trigger it anywhere:
// document.dispatchEvent(customEvent);

// 3. Performance: Passive Event Listeners
// Essential for scroll or touch events. Tells the browser the event won't call e.preventDefault(),
// allowing the browser to optimize scrolling performance smoothly.
window.addEventListener(
  "scroll",
  () => {
    // Highly efficient scroll tracking
  },
  { passive: true },
);

// ​e.target vs e.currentTarget: This is the #1 interview question. e.target is the element that originated the event (the actual target you clicked). e.currentTarget is the element that the event listener is attached to.
// ​Why use Event Delegation?: It saves massive amounts of system memory because you only create one event listener in memory instead of hundreds, and it perfectly supports elements injected into the HTML later via JavaScript.
