// ==========================================
// STEP 1: THE NORMAL FUNCTION (THE BASELINE)
// ==========================================
/**
 * To understand closures, we must first remember how normal functions work.
 * Normally, when a function finishes running, all of its local variables
 * are completely erased from memory to save space.
 */
function normalFunction() {
  let name = "Eric";
  console.log(name);
}

normalFunction(); // Output: Eric
// At this exact point, the variable 'name' is GONE. JavaScript deleted it.

// ==========================================
// STEP 2: THE "BACKPACK" CONCEPT (CLOSURE)
// ==========================================
/**
 * * DEFINITION 1: A closure is a function that remembers variables from where it was created.
 * * DEFINITION 2: A closure is when an inner function remembers variables from an
 * outer function after the outer function has finished executing.
 * * THE ANALOGY: Think of it like a backpack. When an inner function is born,
 * JavaScript gives it a physical backpack containing any variables it needs
 * from its parent's environment. Wherever that inner function goes, it carries the backpack.
 */

// ==========================================
// STEPS TO WRITE A CLOSURE
// ==========================================

// 1. Create an outer function
function outerFunction() {
  // 2. Declare a variable inside the outer function (this is the "state" you want to remember)
  let storedValue = 0;

  // 3. Create an inner function inside the outer function
  function innerFunction() {
    // 4. Use or modify the outer function's variable
    storedValue++;

    // 5. Return or use the updated value
    console.log(storedValue);
  }

  // 6. Return the inner function (THIS creates the closure)
  return innerFunction;
}

// 7. Call the outer function and store the returned inner function
const myClosure = outerFunction();

// 8. Call the returned function multiple times
myClosure(); // 1
myClosure(); // 2
myClosure(); // 3

// ==========================================
// EXAMPLE 1
// ==========================================

function outer() {
  let count = 0; // This variable will be packed into the inner function's backpack.

  return function inner() {
    count++; // Reaches into the backpack, updates 'count', and saves it back inside.
    console.log(`Step 2 Count: ${count}`);
  };
}

// 'counter' now holds the inner() function. outer() has finished running!
const counter = outer();

counter(); // Output: Step 2 Count: 1  (It looked in the backpack and found count = 0)
counter(); // Output: Step 2 Count: 2  (It remembered count was updated to 1)
counter(); // Output: Step 2 Count: 3  (It remembered count was updated to 2)

// ==========================================
// EXAMPLE 2: RETAINING VALUES
// ==========================================
/**
 * Let's look at the greeting example using this exact same rule.
 * The inner function is returned and assigned to 'sayHello'.
 */
function greet() {
  let name = "Eric"; // Trapped in the backpack

  return function () {
    console.log(`Hello, ${name}`);
  };
}

const sayHello = greet(); // greet() runs and finishes. 'name' should disappear...
sayHello(); // Output: Hello, Eric (But it doesn't! Because the closure saved it.)

// ==========================================
// EXAMPLE 3: REAL-WORLD APPLICATION - PRIVATE DATA (SECURITY)
// ==========================================
/**
 * Why do we use closures in real life? To hide variables so people cannot cheat or break our code.
 * This prevents external scripts from modifying the score directly.
 */
function createGame() {
  // This variable is trapped inside the "memory bubble" of createGame.
  // It cannot be accessed or changed from the outside world directly.
  let score = 0;

  // We return an object containing specialized functions.
  // Because these functions are born inside createGame, they form a closure
  // and share the exact same "backpack" containing access to 'score'.
  return {
    getScore: function () {
      return score;
    },
    winPoint: function () {
      score += 10; // Updates the score inside the shared backpack
    },
    losePoint: function () {
      score -= 10; // Updates the score inside the shared backpack
    },
  };
}

// 1. Initialize the game. createGame() runs and completely finishes.
const player1 = createGame();

// 2. Play the game using the closure functions
player1.winPoint(); // score becomes 10
player1.winPoint(); // score becomes 20
player1.losePoint(); // score becomes 10

// 3. Check the score via the authorized getter function
console.log("Current Game Score: ", player1.getScore()); // Output: 10

// 4. SECURITY CHECK: Try to access or cheat the score directly
console.log(player1.score); // Output: undefined (The variable is completely safe and hidden!)

// ==========================================
// EXAMPLE 4:REAL-WORLD APPLICATION - FUNCTION FACTORIES
// ==========================================
/**
 * Closures allow us to build custom "function factories" that mass-produce functions
 * with unique pre-configured settings built right into their backpacks.
 */
function makeFontSizeChanger(size) {
  // The 'size' parameter acts exactly like a local variable.
  // It gets trapped in the closure of the returned function.
  return function () {
    // Note: In a real browser environment, you would use: document.body.style.fontSize = size + "px";
    console.log(`Setting website text size to ${size}px`);
  };
}

// Create customized functions by passing different parameters to the factory.
// Each of these variables holds a completely separate inner function with its own 'size' setting.
const makeTextSmall = makeFontSizeChanger(12);
const makeTextLarge = makeFontSizeChanger(24);

// Call the custom functions much later in execution (e.g., when a user clicks a button)
makeTextSmall(); // Output: Setting website text size to 12px
makeTextLarge(); // Output: Setting website text size to 24px

// ==========================================
// EXAMPLE 5: ISOLATION OF STATE (FRESH BACKPACKS)
// ==========================================
/**
 * Final crucial concept: Every single time you call an outer function,
 * JavaScript spawns a brand new, completely separate closure backpack.
 * They do not share variables with each other.
 */
function createCounter() {
  let count = 0;

  return function () {
    count++;
    console.log(`Classic Counter State: ${count}`);
  };
}

// Counter A gets its own memory bubble
const myCounter = createCounter();
myCounter(); // Output: Classic Counter State: 1
myCounter(); // Output: Classic Counter State: 2

// Counter B gets a completely fresh, separate memory bubble starting at 0
const separateCounter = createCounter();
separateCounter(); // Output: Classic Counter State: 1 (Isolated from myCounter!)

// ==================================================
// CLOSURE AND CLASS COMPARISON
// ==================================================

// THE CLOSURE WAY
function createPlayer(name) {
  let score = 0; // Private variable

  return {
    win: function () {
      score++;
    },
    getScore: function () {
      return `${name} has ${score} points`;
    },
  };
}

const playerA = createPlayer("Eric");
playerA.win();
console.log(playerA.getScore()); // "Eric has 1 points"

// THE CLASS WAY
class Player {
  #score = 0; // Private property (# makes it private in classes)

  constructor(name) {
    this.name = name;
  }

  win() {
    this.#score++;
  }

  getScore() {
    return `${this.name} has ${this.#score} points`;
  }
}

const playerB = new Player("Eric");
playerB.win();
console.log(playerB.getScore()); // "Eric has 1 points"

// =========================================================================
// CLASSES VS CLOSURES CHEAT SHEET
// =========================================================================

/*
============================================================================
 CONCEPT MAPPING: HOW CLOSURES AND CLASSES DO THE SAME JOB
============================================================================

| CLASS CONCEPT        | CLOSURE EQUIVALENT        | WHAT IT DOES          
|----------------------|---------------------------|------------------------
| Constructor / 'new'  | Calling Outer Function    | Spawns a fresh instance
| 'this.variable'      | Outer Local Variables     | Instance-specific data 
| Private Field (#)    | Standard Local 'let/const'| Hidden/secured data   
| Class Methods        | Returned Inner Functions  | Allowed actions       

============================================================================
*/

// -------------------------------------------------------------------------
// APPROACH A: THE CLASS WAY
// -------------------------------------------------------------------------
class PlayerClass {
  #score = 0; // Private property: Hidden from the outside world

  constructor(name) {
    this.name = name; // Instance property
  }

  win() {
    this.#score++; // Method updating state
  }

  getScore() {
    return `${this.name}: ${this.#score}`;
  }
}

// Spawning instances using the Class blueprint
const athleteA = new PlayerClass("Eric");
athleteA.win();
console.log(athleteA.getScore()); // Output: "Eric: 1"

// -------------------------------------------------------------------------
// APPROACH B: THE CLOSURE WAY (Achieves the exact same result)
// -------------------------------------------------------------------------
function createPlayerClosure(name) {
  let score = 0; // Private variable: Trapped safely in the closure backpack

  // Return an object containing inner functions that remember 'score' and 'name'
  return {
    win: function () {
      score++; // Inner function updating trapped state
    },
    getScore: function () {
      return `${name}: ${score}`;
    },
  };
}

// Spawning instances by executing the Outer Function
const athleteB = createPlayerClosure("Eric");
athleteB.win();
console.log(athleteB.getScore()); // Output: "Eric: 1"

/*
============================================================================
 THE UNDER-THE-HOOD DIFFERENCE (MEMORY)
============================================================================

* CLASS MEMORY (Prototypes):
  If you make 1,000 players, the methods (win, getScore) are saved ONLY ONCE 
  on a shared blueprint. Highly memory efficient.

* CLOSURE MEMORY (Lexical Scoping):
  If you make 1,000 players, every individual player gets their own brand-new,
  duplicated copies of the 'win' and 'getScore' functions inside their unique
  backpack. More flexible, but copies functions in memory.
*/
