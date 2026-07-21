// ================= CONDITIONAL STATEMENT =================
condition = true;
// if statement
if (condition) {
  //  block of code to be executed if the condition is true
}
// else if statement
else if (condition2) {
  //  block of code to be executed if the condition1 is false and condition2 is true
}
// else statement
else {
  //  block of code to be executed if the condition1 is false and condition2 is false
}

// Example
let hour = new Date().getHours();

if (hour < 10) {
  greeting = "Good morning";
} else if (hour < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}
console.log(greeting);

// ================= SWITCH STATEMENT =================
// SYNTAX
switch (expression) {
  case x:
    // code block
    break;
  case y:
    // code block
    break;
  default:
  // code block
}

// Example

switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break; // The break keyword, it breaks out of the switch block.
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  default: // The default keyword specifies the code to run if there is no case match.
    day = "Saturday";
}
console.log(day);
