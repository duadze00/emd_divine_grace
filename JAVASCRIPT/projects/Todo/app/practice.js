const parent = document.querySelector("#parent");
const inputField = document.querySelector("#input_field");
const addBtn = document.querySelector("#add_btn");
const itemLeft = document.querySelector("#remain");

let content = JSON.parse(localStorage.getItem("data")) || [];

addBtn.addEventListener("click", () => {
  let inputText = inputField.value.trim();
  inputText = inputText.charAt(0).toUpperCase() + inputText.slice(1);

  if (!inputText) {
    alert("Input field can not be empty");
    return;
  }

  content.push(inputText);

  saveData();
  updateUI();

  inputField.value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  updateUI();
});

function saveData() {
  localStorage.setItem("data", JSON.stringify(content));
}

function updateUI() {
  parent.innerHTML = "";

  content.forEach((element, index) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
    <span class="item">${element}</span>
    <button class="delete">Delete</button>
  `;
    listItem.classList.add("list_items");

    parent.appendChild(listItem);

    const deleteBtn = listItem.querySelector(".delete");
    deleteBtn.addEventListener("click", () => deleteFnx(index));
  });
  item();
}

function deleteFnx(index) {
  content.splice(index, 1); 
  saveData();
  updateUI();
  alert("Item deleted successfully!");
}

function item() {
  itemLeft.textContent = ` ${content.length} Task Remaining`;
}
