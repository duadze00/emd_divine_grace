let arrayMethods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Filter: Keeps only the elements that return 'true' for the condition
let newFilteredArray = arrayMethods.filter((e) => {
  return e % 2 === 0;
});
console.log("Filtered (Even numbers):", newFilteredArray); // [2, 4, 6]

// 2. Map: Transforms each element in the array
let newMappedArray = newFilteredArray.map((e) => {
  return e * 2;
});
console.log("Mapped (Doubled):", newMappedArray); // [4, 8, 12]

// 3. Reduce: Accumulates the array into a single value
let newReducedArray = newMappedArray.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0); // 0 is the starting value for the accumulator

// METHOD CHAINING
const total = arrayMethods
  .filter((e) => e % 2 === 0)
  .map((e) => e * 2)
  .reduce((acc, curr) => acc + curr, 0);

console.log("Total:", total); // 24

console.log("Reduced (Summed total):", newReducedArray); // 24
