// ========================================================
// CREATING UTILITY FUNCTIONS (RECOMMENDED)
// ========================================================

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
console.log(capitalize("john")); // John

// HANLES EMPTY STRINGS
function capitalize(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}
console.log(capitalize("john")); // John
console.log(capitalize("")); // ""

function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
console.log(capitalizeWords("john doe")); // John Doe

// ========================================================
// HOW TO USE
// ========================================================
// Export the function
export function capitalize() {}

// And import it where to use it
import { capitalize } from "file_location";

// ========================================================
// CREATE YOUR OWN STRING METHOD (NOT RECOMMENDED)
// ========================================================
// This is using the dataType.prototype
String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};
console.log("john".capitalize()); // John
// Not recommended because it can conflict with others.
