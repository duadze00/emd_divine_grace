const person = { name: "John", age: 31, city: "New York" };

// Saving the person object
const personJSON = JSON.stringify(person);
localStorage.setItem("myObject", personJSON);

// Retrieving the person saved object
const myNewPersonObj = localStorage.getItem("myObject");
const personObj = JSON.parse(myNewPersonObj);

// HTML Element
const parentEl = document.querySelector("ul");

// Looping through object
Object.entries(personObj).forEach(([key, value]) => {
  console.log(key, value);
});

// NB. The forEach() only works on Array not Objects
Object.entries(personObj).forEach(([key, value]) => {
  const li = document.createElement("li");
  li.textContent = `${key}: ${value}`;
  parentEl.appendChild(li);
});

Object.values(myObj).forEach(e =>{
  console.log(e)
})

Object.keys(myObj).forEach(e =>{
  console.log(e)
})

// To use the forEach(), use on of the below and call .forEach() on the array they returns
Object.keys(personObj);
Object.values(personObj);
Object.entries(personObj);
