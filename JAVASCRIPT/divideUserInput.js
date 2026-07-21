let lines = "=============";

// USING HALF OF THE ELEMENT
function divideLines(e) {
  let half = e.length / 2;
  console.log(half);
}
divideLines(lines);

// USING HALF AND SLICE OF THE ELEMENT
function divideLines(e) {
  let halfLength = e.length / 2;
  let halfString = e.slice(0, halfLength); // Cuts the string from index 0 to the halfway point
  console.log(halfString);
}
divideLines(lines);
