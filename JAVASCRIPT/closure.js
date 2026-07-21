// ====================================================== CLOSURE ======================================================
// ==================== NORMAL FUNCTION BEHAVIOR ====================
// VARIABLE SCOPE & THE COUNTER DILEMMA
// 1. Scope Basics
// Global variables can be accessed by any function.
// Local variables (declared with let/const inside a function) are private to that function.
// Variables created WITHOUT let/const/var automatically become global.

// 2. The Dilemma: Global Counter
// Problem: Any external script can accidentally overwrite this counter.
let globalCounter = 0;
function addGlobal() {
  globalCounter += 1;
}

// 3. The Dilemma: Local Counter
// Problem: Every time you call the function, the counter resets to 0. It always returns 1.
function addLocal() {
  let localCounter = 0;
  localCounter += 1;
  return localCounter;
}

// 4. The Solution: Nested Functions & Closures
// By nesting a function, the inner function has access to the parent's scope.
// (To fully protect it, this pattern is turned into a self-invoking closure).
function countWrapper() {
  let counter = 0;
  function plus() {
    counter += 1;
  }
  plus();
  return counter;
}

// ==================== CLOSURE ====================
// A closure is a function having access to the parent scope, even after the parent function has closed.
// In simple terms: A function remembers where it was created.

// ===== RETURNING A SINGLE FUNCTION =====
// Self invoke function
const add = (function () {
  let counter = 0;
  return function () {
    counter += 1;
    return counter;
  };
})();

add();
add();
add(); // the counter is now 3

// EXAMPLE
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3

// ===== RETURNING AN ARRAY =====
// Single array
function counter() {
  let count = 0;
  return [
    function time() {
      count += 1;
      return count;
    },
  ];
}

let c = counter();
let g = c[0];

console.log(g()); // 1
console.log(g()); // 2
console.log(g()); // 3

// Multiple array
function counter() {
  let count = 0;

  return [() => ++count, () => --count, () => count];
}
// Destructinge the return function
const [increment, decrement, getCount] = counter();

console.log(increment()); // 1
console.log(increment()); // 2
console.log(getCount()); // 2
console.log(decrement()); // 1

// ===== RETURNING AN OBJECT =====
function createBankAccount(balance) {
  return {
    deposit(amount) {
      balance += amount;
      console.log(balance);
    },
    withdraw(amount) {
      balance -= amount;
      console.log(balance);
    },
  };
}

const account = createBankAccount(100);
account.deposit(50); // 150
account.withdraw(20); // 130

// ATM WITHOUT VALIDATION
function ATM() {
  let balance = 0;

  return {
    checkBalance: function () {
      console.log(`Current balance: ${balance}GHS`);
    },
    withdraw: function (amount) {
      balance -= amount;
      return balance;
    },
    deposit: function (amount) {
      balance += amount;
      return balance;
    },
  };
}

// USAGE
let account = ATM();

console.log(account.deposit(10000));
console.log(account.withdraw(9000));
account.checkBalance();

// ATM WITH VALIDATION
function ATM() {
  let balance = 0;

  return {
    deposit: function (amount) {
      if (amount <= 0) {
        console.log("Deposit must be greater than 0");
        return balance;
      }

      balance += amount;
      console.log(`Deposited: ${amount}GHS`);
      return balance;
    },

    withdraw: function (amount) {
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

// USAGE
let account1 = ATM();

account1.deposit(10000);
account1.withdraw(9000);
account1.checkBalance();

/**
 * ATM()
 ├── private balance = 0
 ├── deposit()  → modifies balance
 ├── withdraw() → modifies balance
 └── checkBalance() → reads balance
 */
