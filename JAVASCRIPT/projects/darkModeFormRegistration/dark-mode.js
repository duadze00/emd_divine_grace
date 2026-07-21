const year = document.querySelector("#year");
const eyeToggles = document.querySelectorAll("i");
const submitBtn = document.querySelector("button");
const inputs = document.querySelectorAll("input");

// Set current footer year
const date = new Date();
year.textContent = date.getFullYear();

// Loop through the NodeList since addEventListener can't be attached directly to a collection
eyeToggles.forEach((toggle) => {
  toggle.addEventListener("click", function () {
    // Dynamically find the password field relative to the clicked icon
    const passwordField = this.parentElement.querySelector("input");

    // Toggle the type attribute
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    // Optional UI Polish: change icon color based on visibility
    this.style.opacity = type === "text" ? "0.5" : "1";
  });
});

submitBtn.addEventListener("click", submitFunction);

function submitFunction(e) {
  e.preventDefault();
}
