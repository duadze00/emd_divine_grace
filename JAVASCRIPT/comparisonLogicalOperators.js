// ================== COMPARISON OPERATORS ==================
let x = 5;
// Operator	    Description	  Comparing	      Returns
// ==	          equal to	    x == 8	        false
//                            x == 5	        true
//                            x == "5"	      true

// ===	    equal (value and type)	x === 5	  true
//                                  x === "5"	false

// !=	          not equal	    x != 8	true

// !==	not equal (value or type	)   x !== 5	false
//                                    x !== "5"	true
//                                    x !== 8	true

// >	        greater than	  x > 8	      false

// <	        less than	    x < 8	        true

// >=	        greater than or equal to	x >= 8	false

// <=	        less than or equal to	    x <= 8	   true

let result = "";
let age = 20;
if (age < 18) {
  result = "Too young to buy alcohol";
}

// ================== LOGICAL OPERATORS ==================
// Operator	    Description	  Example
// &&	          and	          (x < 10 && y > 1) is true
// ||	          or	          (x == 5 || y == 5) is false
// !	          not	          !(x == y) is true

// ================== CONDITIONAL(TERNARY) OPERATOR ==================
// Syntax
// variablename = (condition) ? value1:value2

let voteable = age < 18 ? "Too young" : "Old enough";
console.log(voteable);

age = Number(age);
if (isNaN(age)) {
  voteable = "Input is not a number";
} else {
  voteable = age < 18 ? "Too young" : "Old enough";
}
