// URL
const url = "https://api.quotable.io/random";

// HTML DOM ELEMENTS
const authorEl = document.querySelector("#author");
const quoteEl = document.querySelector("#quote");
const generateBtnEl = document.querySelector("#generate-btn");
const quoteContainer = document.querySelector("#quote-container");
const errorContainerEl = document.querySelector("#error-container");
const errorEl = document.querySelector("#error");

// EVENT HANDLERS
generateBtnEl.addEventListener("click", async () => {
  const data = await getQuote(url);
  updateUI(data);
});

window.addEventListener("DOMContentLoaded", async () => {
  const data = await getQuote(url);
  updateUI(data);
});

// FUNCTION
async function getQuote(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    quoteContainer.style.display = "block";
    errorContainerEl.style.display = "none";

    return data;
  } catch (error) {
    quoteContainer.style.display = "none";
    errorContainerEl.style.display = "block";

    errorEl.textContent = error.message;
  }
}

function updateUI(data) {
  if (!data) return;

  quoteEl.textContent = data.content;
  authorEl.textContent = data.author;
}
