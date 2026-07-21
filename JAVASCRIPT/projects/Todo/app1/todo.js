// ========================================================
// HTML DOM ELEMENTS
// ========================================================
const inputEl = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const todoItemContainer = document.querySelector("#list-item-container");

// ========================================================
// LOAD TODOS FROM LOCAL STORAGE
// If nothing exists, start with an empty array.
// ========================================================
let list = JSON.parse(localStorage.getItem("listItems")) || [];

// ========================================================
// DISPLAY TODOS WHEN PAGE LOADS
// ========================================================
window.addEventListener("DOMContentLoaded", () => {
  updateUI();
});

// ========================================================
// ADD TODO
// ========================================================
addBtn.addEventListener("click", () => {
  const inputText = inputEl.value.trim();

  if (inputText === "") return;

  const todo = inputText.charAt(0).toUpperCase() + inputText.slice(1);

  // Add a todo object
  list.push({
    text: todo,
    completed: false,
  });

  saveData();
  updateUI();

  inputEl.value = "";
  inputEl.focus();
});

// ========================================================
// SAVE TO LOCAL STORAGE
// ========================================================
function saveData() {
  localStorage.setItem("listItems", JSON.stringify(list));
}

// ========================================================
// UPDATE UI
// ========================================================
function updateUI() {
  // Clear previous UI
  todoItemContainer.innerHTML = "";

  // Create a new <li> for each todo
  list.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.text;

    // If completed, add line-through class
    if (item.completed) {
      li.classList.add("completed");
    }

    // Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("item-buttons");

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("del-btn");

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = item.completed ? "Undo" : "Complete";
    completeBtn.classList.add("complete-btn");

    // Append buttons
    buttonContainer.append(deleteBtn, completeBtn);

    // Append to li
    li.appendChild(buttonContainer);

    // Append li to container
    todoItemContainer.appendChild(li);

    // Event listeners
    deleteBtn.addEventListener("click", () => deleteTarget(index));
    completeBtn.addEventListener("click", () => completedTask(index));
  });
}

// ========================================================
// DELETE TODO
// ========================================================
function deleteTarget(index) {
  list.splice(index, 1);

  saveData();
  updateUI();
}

// ========================================================
// COMPLETE / UNDO TODO
// ========================================================
function completedTask(index) {
  list[index].completed = !list[index].completed;

  saveData();
  updateUI();
}
