// ======== The Boolean() Function ========
// You can use the Boolean() function to find out if an expression (or a variable) is true
console.log(Boolean(10 > 9));

let number = "10";
let result = Boolean(Number(number) === 10);
console.log(result);
let result1 = Boolean(parseInt(number) === 10);
console.log(result1);
let result2 = Boolean(parseFloat(number) === 10);
console.log(result2);

// Operator	  Description	    Example
// ==	        equal to	      if (day == "Monday")
// >	        greater than	  if (salary > 9000)
// <	        less than	      if (age < 18)

// NB. Everything with a value is true and vice versa

// Boolean that are false:
let x = 0;
console.log(Boolean(x)); // returns false
let y = -0;
console.log(Boolean(y)); // returns false
console.log(Boolean("")); // empty string returns false
let z;
console.log(Boolean(z)); // returns false
console.log(Boolean(null)); // returns false
console.log(Boolean(false)); // returns false
// The Boolean value of NaN is false
console.log(Boolean(10/"Hellow")); // returns false

