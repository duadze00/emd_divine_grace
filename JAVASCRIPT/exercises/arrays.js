const fruits = ["Mango", "Pineapple", "Cherry", "Kiwi", "Orange", "Pawpaw"];

const firstIndex = fruits[0];
console.log(firstIndex);

const lastIndex = fruits[fruits.length - 1];
console.log(lastIndex);

// Add to array
fruits.push("Watermelon");
fruits.unshift("Guava");

// Remove from the array
fruits.shift();
fruits.pop();

// Reverse an array
fruits.reverse();
console.log(fruits);

const numbers = [1, 2, 3, 5, 23, 563, 2355, 5];

// Largest number in an array
const largestNumber = Math.max(...numbers);
console.log(largestNumber);

// Smallest number in an array
const smallestNumber = Math.min(...numbers);
console.log(smallestNumber);

console.log(numbers.some((e) => e < 10));
console.log(numbers.find((e) => e === 563));
console.log(numbers.concat(fruits));
