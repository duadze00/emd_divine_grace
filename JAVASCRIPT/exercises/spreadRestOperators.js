// Rest Operator

function restOperator(...para) {
  para = para.flat(Infinity)
  if (!para.every((value) => typeof value === "number")) {
    return "All values must be a number";
  }
  return para.reduce((total, value) => total + value);
}
const numbers = [1, 2, 3, 5, 23, 563, 2355, 5];
console.log(restOperator(1, 2));
console.log(restOperator([1, 2]));
console.log(restOperator(numbers));

// Spread Operator
const one = { name: "Eric Mawule Duadze", age: 23, gender: "Male" };
const spread = [...numbers];
console.log(spread);

const spread1 = { ...one };
console.log(spread1);