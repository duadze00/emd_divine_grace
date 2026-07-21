function generatePalette() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }

  return colors;
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

console.log(generatePalette());
