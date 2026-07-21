const userEmail = document.querySelector("#user_email");
const userPassword = document.querySelector("#password");
const login_btn = document.querySelector("#login_btn");

// Start disabled
login_btn.disabled = true;

const checkInputs = () => {
  if (userEmail.value.trim() && userPassword.value.trim()) {
    login_btn.disabled = false;
    login_btn.classList.add("active");
  } else {
    login_btn.disabled = true;
    login_btn.classList.remove("active");
  }
};

[userEmail, userPassword].forEach((input) => {
  input.addEventListener("input", checkInputs);
});
