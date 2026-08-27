// ========================================================
// FORM HTML
// ========================================================

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <main>
      <form class="form">
        <label for="username">Name</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
        <label for="user_password">Password</label>
        <input
          type="password"
          name="user_password"
          id="user_password"
          placeholder="Password"
        />
        <input type="submit" class="submit" />
      </form>
    </main>
  </body>
</html>;

// ========================================================
// GETTING FORM ELEMENT INPUTS
// ========================================================

// HTML Elements
const formEl = document.querySelector(".form");
const submitBtn = document.querySelector(".submit");

// Eventlistener
submitBtn.addEventListener("click", (e) => {
  // Prevent form from deleting user input after submit
  e.preventDefault();

  // Getting user details inside the form
  const formData = new FormData(formEl);

  // Appending to form data
  formData.append("gender", "male");
  // NB. Use the . notatation on formData to learn about other properties like the append

  const data = Object.fromEntries(formData);

  console.log(data);
});

// ========================================================
// CHECKING IF FORM INPUT ARE NOT EMPTY
// ========================================================

// ===== THE MODERN & CLEAN WAY (Object.values()) =====
const formData = new FormData(formEl);
const data = Object.fromEntries(formData);

// Check if EVERY value in the object is NOT empty
const allFieldsFilled = Object.values(data).every(
  (value) => value.trim() !== "",
);

if (allFieldsFilled) {
  submitBtn.classList.add("allow");
} else {
  submitBtn.classList.remove("allow");
}

// ===== HTML5 VALIDATION (EASIEST) =====
// HTML5 Validation (Easiest​If your form inputs have the required attribute in HTML, you don't even need to parse the data object manually. You can check the form's native validity

if (formEl.checkValidity()) {
  submitBtn.classList.add("allow");
} else {
  submitBtn.classList.remove("allow");
}
