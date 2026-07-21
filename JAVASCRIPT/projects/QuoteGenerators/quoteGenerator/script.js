// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DOM ELEMENTS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const quote = document.querySelector("#quote p");
const author = document.querySelector("#author h3");
const generateBtn = document.querySelector("#generate-btn");

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// QUOTES
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const quotes = [
  {
    quote: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
  },
  {
    quote: "Knowledge is power.",
    author: "Francis Bacon",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
  },
  {
    quote: "Success is not final; failure is not fatal.",
    author: "Winston Churchill",
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    quote: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "Dream big and dare to fail.",
    author: "Norman Vaughan",
  },
  {
    quote: "Action is the foundational key to success.",
    author: "Pablo Picasso",
  },
  {
    quote: "We get what we deserve.",
    author: "Eric Mawule Duadze",
  },
];

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// EVENT LISTENERS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

generateBtn.addEventListener("click", generateQuote);
window.addEventListener("DOMContentLoaded", generateQuote);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Generate random quote function
function generateQuote() {
  const random = Math.floor(Math.random() * quotes.length);

  const randomQuote = quotes[random];

  // Calling updateUI function when after random quote is generated
  updateUI(randomQuote);
}

// Update UI function
function updateUI(e) {
  quote.innerText = `"${e.quote}"`;
  author.innerText = e.author;
}
