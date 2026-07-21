// Fetch API
const response = fetch("https://json-placeholder.com/users");
const data = response.json();
console.log(data);

// Browser API
const name = "Eric Mawule Duadze";
const age = 23;

// LocalStorage
localStorage.setItem("name", JSON.stringify(name));
const getName = JSON.parse(localStorage.getItem("name"));
localStorage.removeItem("name");
localStorage.length;
localStorage.key(0);
localStorage.clear();

// SessionStorage
sessionStorage.setItem("age", JSON.stringify(age));
JSON.parse(sessionStorage.getItem("age"));
sessionStorage.removeItem("age");
sessionStorage.length;
sessionStorage.key(1);
sessionStorage.clear();

// Geolocation API
