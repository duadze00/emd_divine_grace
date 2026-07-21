const me = {
  name: "John",
  age: 30,
  cars: ["Ford", "BMW", "Fiat"],
};

// STANDARD FOR LOOP
// Target the array directly using me.cars
for (let j = 0; j < me.cars.length; j++) {
  console.log(`${j}: ${me.cars[j]}`);
}

// FOREACH LOOP
me.cars.forEach((car, index) => {
  console.log(`${index}: ${car}`);
});

// FOR IN LOOP
for (let key in me) {
  // Check if the current property is an array (like cars)
  if (Array.isArray(me[key])) {
    for (let j = 0; j < me[key].length; j++) {
      console.log(`${j}: ${me[key][j]}`);
    }
  }
}
