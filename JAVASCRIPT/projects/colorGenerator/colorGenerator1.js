const body = document.querySelector("body");
function colorGenerator() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(randomColor());
  }

  // Changes the background color one after the other.
  colors.forEach((color, index) => {
    setTimeout(() => {
      body.style.background = color;
    }, index * 1000); // 0s, 1s, 2s, 3s, 4s
  });

  // Changes the background color forever
  setInterval(() => {
    body.style.background = randomColor();
  }, 1000);
  return colors;
}

function randomColor() {
  const hexValues = "0123456789ABCDEF";
  let colorValues = "#";

  for (let i = 0; i < 6; i++) {
    colorValues += hexValues[Math.floor(Math.random() * hexValues.length)];
  }

  return colorValues;
}

colorGenerator();
