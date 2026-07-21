// ===== MATH.RANDOM() =====
let a = Math.random();
console.log(a);
let b = Math.random();
console.log(b);

// ===== RANDOM INTEGERS =====
// Math.random() used with Math.floor() can be used to return random integers.

let wholeNumber = Math.floor(Math.random() * 10); // Returns a random integer from 0 to 9
console.log(wholeNumber);

Math.floor(Math.random() * 100); // Returns a random integer from 0 to 99:

Math.floor(Math.random() * 10) + 1; // Returns a random integer from 1 to 10

Math.floor(Math.random() * 100) + 1; // Returns a random integer from 1 to 100

// ===== CREATING YOUR OWN RANDOM INTEGERS FUNCTION =====

// Then min is included and the max is excluded
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
console.log(getRandomInteger(10, 100));

// Both min an max are included
function getRandomInteger1(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomInteger1(1, 100));

// ================== GETTING RANDOM ITEM FROM A LIST ==================

const mineList = ["Eric", "Mawule", "Duadze"];

// Method One
const randomIndex1 = Math.floor(Math.random() * mineList.length);
console.log(mineList[randomIndex1]);

// Method Two
console.log(mineList[Math.floor(Math.random() * mineList.length)]);

// ================== CREATING A FUNCTION FOR GETTING RANDOM ITEM FROM A LIST ==================

// Normal Funtion
function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Same as above
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Arrow Function
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Normal Function with Error Handling
function getRandomItem(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument must be an array");
  }

  if (arr.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
