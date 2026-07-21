// ========================== GETTING THE VALUES IN AN HTML ELEMENTS ==========================

// Using innerHTML: Gets the HTML markup inside an element.
const paragraph = document.querySelector("p").innerHTML;
console.log(paragraph);

// Using innerText: Gets only visible text.
const paragraph1 = document.querySelector("p").innerText;
console.log(paragraph1);

// Using textContent: Gets all text inside an element.
const paragraph2 = document.querySelector("p").textContent;
console.log(paragraph2);

// ========================== GETTING THE VALUES FROM HTML INPUT ELEMENT ==========================

// .value is used for form element which works with: <input>, <textarea> and <select>
const userInput = document.querySelector("#input");
const viewBtn = document.querySelector("button");
const view = document.querySelector("#view");

function userInputField() {
  const userInputContent = userInput.value;

  // Checking if user input is empty or not
  if (userInputContent.trim() === "") {
    view.textContent = "Nothing entered in the input field below";
  } else {
    view.textContent = userInputContent;
  }
  console.log("Clicked");
}

viewBtn.addEventListener("click", userInputField);

// ========================== GETTING ATTRIBUTES ==========================

// .getAttribute()
const link = document.querySelector("a");
console.log(link.getAttribute("href")); // https://google.com

// Direct Attribute Properties
console.log(link.href);

const img = document.querySelector("img");
console.log(img.src);
console.log(img.alt);

// ========================== GETTING FORM STATES  ==========================

// .checked
const checkbox = document.querySelector("#agree");
console.log(checkbox.checked); // true

// .selectedIndex: For dropdowns.
const select = document.querySelector("#country");
console.log(select.selectedIndex); // 0

// .files: For file uploads.
const fileInput = document.querySelector("#fileInput");
console.log(fileInput.files);

// ========================== GETTING CLASSES INFORMATION  ==========================

// .className
const div = document.querySelector("div");
console.log(div.className); // card active

// .classList: Returns a list of classes.
console.log(div.classList);

// ========================== GETTING STYLES INFORMATION  ==========================

// .style
const p = document.querySelector("p");
console.log(p.style.color); // red

// ========================== GETTING DATASET VALUES  ==========================

// .dataset
const dataSet = document.querySelector("#data_set");

console.log(dataSet.dataset.id); // 123
console.log(dataSet.dataset.role); // admin

// WHAT YOU'RE GETTING    PROPERTY
// User input             .value
// Text                   .textContent
// HTML markup            .innerHTML
// Attributes             .getAttribute() or direct properties (src, href, alt)
