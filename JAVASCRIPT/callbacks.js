// A callback is a function passed as an argument to another function
// This technique allows a function to call another function
// A callback function can run after another function has finished
// When you pass a function as an argument, remember not to use parenthesis.

function myDisplayer(parameter) {
  console.log(parameter);
}

function myFirst() {
  myDisplayer("Hello");
}

function mySecond() {
  myDisplayer("Goodbye");
}

myFirst();
mySecond();

function myCalculator(num1, num2) {
  let sum = num1 + num2;
  return sum;
}

let result = myCalculator(5, 5);
myDisplayer(result);
