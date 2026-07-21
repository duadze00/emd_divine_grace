const togglePassword = document.querySelector('#togglePassword');
const passwordField = document.querySelector('#passwordField');

togglePassword.addEventListener('click', function () {
  // Toggle the input type
  const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordField.setAttribute('type', type);

  // Toggle the eye / eye-slash icon
  this.classList.toggle('fa-eye-slash');
});
