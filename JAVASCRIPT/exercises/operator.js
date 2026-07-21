const result = 2000.89992 + 2.00009;
console.log(result.toFixed(2));

const remainder = 5 % 2;
console.log(remainder);

const isEven = 78 % 2 === 0 ? "Even number" : "Odd number";
console.log(isEven);

// BMI Calculator
const weight = 70;
const height = 2;
function CalculateBMI(weight, height) {
  if (weight === "" || height === "") {
    console.log("Weight and height are required");
    return;
  }

  if (isNaN(weight) || isNaN(height)) {
    console.log("Weight and height must be numbers");
    return;
  }

  if (weight <= 0 || height <= 0) {
    console.log("Weight and height must be greater than 0");
    return;
  }

  const BMI = weight / height ** 2;
  return BMI;
}

function checkBMI(e) {
  if (e <= 18.5) {
    console.log(`${e.toFixed(2)} is underweight`);
  } else if (e <= 24.9) {
    console.log(`${e.toFixed(2)} is normal weight`);
  } else if (e <= 29.9) {
    console.log(`${e.toFixed(2)} is overweight`);
  } else if (e <= 34.9) {
    console.log(`${e.toFixed(2)} is obesity Class I`);
  } else if (e <= 39.9) {
    console.log(`${e.toFixed(2)} is obesity Class II`);
  } else {
    console.log(`${e.toFixed(2)} is obesity Class III`);
  }
}

const bmi = CalculateBMI(weight, height);

if (bmi !== undefined) {
  checkBMI(bmi);
}

// Todo: Solve the advance question under operators
