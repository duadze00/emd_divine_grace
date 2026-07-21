// ===============================
// API URL
// ===============================
const adviceURL = "https://api.adviceslip.com/advice";

// ===============================
// DOM ELEMENTS
// ===============================
const para = document.querySelector(".para");
const generateBtn = document.querySelector(".generate");
const errorBox = document.querySelector("#error");

// ===============================
// EVENTS
// ===============================
window.addEventListener("DOMContentLoaded", getData);
generateBtn.addEventListener("click", getData);

// ===============================
// FUNCTIONS
// ===============================

async function getData() {
  try {
    // reset UI
    errorBox.classList.remove("show");
    para.innerText = "Loading advice...";

    const response = await fetch(adviceURL);

    // check HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    updateUI(data);
  } catch (error) {
    showError(error.message);
  }
}

// ===============================
// UPDATE UI
// ===============================
function updateUI(data) {
  para.innerText = data.slip.advice;
}

// ===============================
// ERROR HANDLING
// ===============================
function showError(message) {
  errorBox.classList.add("show");
  errorBox.innerText = `Connection error: ${message}`;
  para.innerText = "Failed to load advice.";
}