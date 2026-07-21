// ======================== REST OPERATOR ========================
// The rest operator collects multiple values into one array or object.

// Example 1
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function restOperatorSum(...numbers) {
  return numbers.reduce((total, num) => total + num);
}

console.log(restOperatorSum(...arr)); // Output: 55

// Example 2
const numbers = [1, 2, 3, 5, 23, 563, 2355, 5];

function restOperator(...para) {
  if (Array.isArray(para[0])) {
    para = para[0];
  }

  if (!para.every((value) => typeof value === "number")) {
    return "All values must be a number";
  }

  return para.reduce((total, value) => total + value);
}

console.log(restOperator(1, 2));
console.log(restOperator([1, 2]));
console.log(restOperator(numbers));

// Example 3: With flattening the array
function flatSum(...para) {
  para = para.flat(Infinity);

  if (!para.every((value) => typeof value === "number")) {
    return "All values must be a number";
  }

  return para.reduce((total, value) => total + value);
}
console.log(flatSum(numbers));

// ======================== USING REGULAR FUNCTION AND LOOP ========================
const numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function sum(numbers) {
  // Just a regular parameter
  let result = 0;
  for (let num of numbers) {
    result += num;
  }
  return result;
}

console.log(sum(numbers1));
