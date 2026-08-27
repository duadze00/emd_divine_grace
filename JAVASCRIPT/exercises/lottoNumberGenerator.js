function lottoNumber() {
  let lottoNumbers = new Set();

  // Keep looping until we have exactly 3 unique numbers
  while (lottoNumbers.size < 3) {
    let number = Math.floor(Math.random() * 50) + 1;
    lottoNumbers.add(number); 
  }

  // Convert the Set into an Array so we can easily display the numbers
  let finalNumbers = Array.from(lottoNumbers);

  return `Today's lotto numbers are ${finalNumbers[0]} ${finalNumbers[1]} ${finalNumbers[2]}`;
}

console.log(lottoNumber());

function lottoNumber() {
  let lottoNumbers = [];

  // Keep looping until the array has 3 items
  while (lottoNumbers.length < 3) {
    let number = Math.floor(Math.random() * 50) + 1;

    // Only push the number if it isn't already in the array
    if (!lottoNumbers.includes(number)) {
      lottoNumbers.push(number);
    }
  }
  return `Today's lotto numbers are ${lottoNumbers[0]} ${lottoNumbers[1]} ${lottoNumbers[2]}`;
}

console.log(lottoNumber());