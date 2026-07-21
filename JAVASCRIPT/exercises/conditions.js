// ========================== Checking person can vote ==========================
const age = 18;
// if/else statement
if (age >= 18) {
  console.log("Can vote");
} else {
  console.log("Can not vote");
}

// ternary operator
const legit = age >= 18 ? "Adult, can vote" : "Minor, can not vote";
console.log(legit);

// ========================== Checking a number is positive or negative ==========================
const number = 0.9;

// if/else statement
if (number >= 0) {
  console.log(`${number} is positive`);
} else {
  console.log(`${number} is negative`);
}

// ternary operator
console.log(number >= 0 ? `${number} is positive` : `${number} is negative`);

// Grade System
const score = "Eric";

function checkGrade(score) {
  if (score > 100 || score < 0) {
    console.log("Invalid input");
    return;
  }
  if (isNaN(score) || score === undefined) {
    console.log("Score must be a number");
    return;
  }
  if (score >= 90) {
    console.log("Grade A");
  } else if (score >= 80 && score <= 89) {
    console.log("Grade B");
  } else if (score >= 70 && score <= 79) {
    console.log("Grade C");
  } else if (score >= 60 && score <= 69) {
    console.log("Grade D");
  } else {
    console.log("Grade F");
  }
}

checkGrade(score);

function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    console.log(`${year} is a leap year`);
  } else {
    console.log(`${year} is NOT a leap year`);
  }
}

isLeapYear(2024);
isLeapYear(1900);
isLeapYear(2000);
isLeapYear(2023);

function ATM() {
  let balance = 0;

  return {
    deposit: function (amount) {
      if (isNaN(amount)) {
        console.log("Invalid input");
        return;
      }
      if (amount <= 0) {
        console.log("Deposit must be greater than 0");
        return balance;
      }

      balance += amount;
      console.log(`Deposited: ${amount}GHS`);
      return balance;
    },

    withdraw: function (amount) {
      if (isNaN(amount)) {
        console.log("Invalid input");
        return;
      }
      if (amount <= 0) {
        console.log("Withdrawal must be greater than 0");
        return balance;
      }

      if (amount > balance) {
        console.log("Insufficient funds");
        return balance;
      }

      balance -= amount;
      console.log(`Withdrawn: ${amount}GHS`);
      return balance;
    },

    checkBalance: function () {
      console.log(`Current balance: ${balance}GHS`);
      return balance;
    },
  };
}

// ========================== USAGE ==========================
let account = ATM();

account.deposit(10000);
account.withdraw(9000);
account.checkBalance();
let acc = ATM();
