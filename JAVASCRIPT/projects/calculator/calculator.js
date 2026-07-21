// =================== DOM ELEMENTS ===================
const buttons = document.querySelectorAll("button");
const expressionDisplay = document.querySelector(".expression");
const resultDisplay = document.querySelector(".result");

// =================== CALCULATOR STATE ===================
let expression = "";
let memory = 0;
let justCalculated = false;

const operators = ["+", "-", "*", "/", "%"];

// =================== SAFE MATH PARSER (From Script 1) ===================
function tokenize(expr) {
  return expr.match(/(\d+\.?\d*|\.\d+|[+\-*/%()])/g) || [];
}

function precedence(op) {
  if (op === "+" || op === "-") return 1;
  if (op === "*" || op === "/" || op === "%") return 2;
  return 0;
}

function toRPN(tokens) {
  let output = [];
  let ops = [];
  for (let token of tokens) {
    if (!isNaN(token)) {
      output.push(token);
    } else if (operators.includes(token)) {
      while (
        ops.length &&
        precedence(ops[ops.length - 1]) >= precedence(token)
      ) {
        output.push(ops.pop());
      }
      ops.push(token);
    }
  }
  while (ops.length) {
    output.push(ops.pop());
  }
  return output;
}

function evalRPN(rpn) {
  let stack = [];
  for (let token of rpn) {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      let b = stack.pop();
      let a = stack.pop();
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(b === 0 ? "Error" : a / b);
          break; // Prevent Division by Zero
        case "%":
          stack.push(a % b);
          break;
      }
    }
  }
  return stack[0];
}

function safeEvaluate(expr) {
  if (!expr) return "";
  // Trim trailing operator before evaluating
  if (operators.includes(expr.slice(-1))) {
    expr = expr.slice(0, -1);
  }
  const tokens = tokenize(expr);
  const rpn = toRPN(tokens);
  return evalRPN(rpn);
}

// =================== HELPERS ===================
function updateDisplay() {
  expressionDisplay.textContent = expression;

  if (expression && !operators.includes(expression.slice(-1))) {
    try {
      const liveResult = safeEvaluate(expression);
      if (
        liveResult !== undefined &&
        !isNaN(liveResult) &&
        liveResult !== "Error"
      ) {
        resultDisplay.textContent = liveResult;
        return;
      }
    } catch {
      // Keep result quiet until expression is valid
    }
  }
  if (!expression) {
    resultDisplay.textContent = "";
  }
}

function getLastNumber() {
  const tokens = expression.split(/([+\-*/%])/);
  return tokens[tokens.length - 1] || "";
}

function replaceLastNumber(newNum) {
  const tokens = expression.split(/([+\-*/%])/);
  tokens[tokens.length - 1] = newNum;
  expression = tokens.join("");
}

// =================== MAIN LOGIC ===================
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.value;
    let lastNum = getLastNumber();

    // CLEAR ALL
    if (value === "C") {
      expression = "";
      expressionDisplay.textContent = "";
      resultDisplay.textContent = "";
      justCalculated = false;
      return;
    }

    // CLEAR ENTRY
    if (value === "CE") {
      if (justCalculated) {
        expression = "";
        resultDisplay.textContent = "";
      } else {
        replaceLastNumber("");
      }
      updateDisplay();
      return;
    }

    // BACKSPACE
    if (value === "←") {
      if (justCalculated) {
        resultDisplay.textContent = "";
        justCalculated = false;
      } else {
        expression = expression.slice(0, -1);
      }
      updateDisplay();
      return;
    }

    // MEMORY FUNCTIONS
    if (["MC", "MR", "M+", "M-"].includes(value)) {
      let currentVal = parseFloat(resultDisplay.textContent || lastNum || "0");

      if (value === "MC") {
        memory = 0;
      } else if (value === "MR") {
        if (justCalculated) {
          expression = memory.toString();
          justCalculated = false;
        } else {
          replaceLastNumber(memory.toString());
        }
      } else if (value === "M+") {
        memory += currentVal;
        justCalculated = true;
      } else if (value === "M-") {
        memory -= currentVal;
        justCalculated = true;
      }
      updateDisplay();
      return;
    }

    // RECIPROCAL (1/X)
    if (value === "1/X") {
      let numToInvert = parseFloat(lastNum || resultDisplay.textContent);
      if (numToInvert && numToInvert !== 0) {
        let inverted = (1 / numToInvert).toString();
        if (justCalculated) {
          expression = inverted;
          justCalculated = false;
        } else {
          replaceLastNumber(inverted);
        }
      } else {
        resultDisplay.textContent = "Error";
        return;
      }
      updateDisplay();
      return;
    }

    // TOGGLE SIGN (±)
    if (value === "±") {
      if (justCalculated) {
        let inverted = (parseFloat(resultDisplay.textContent) * -1).toString();
        expression = inverted;
        justCalculated = false;
      } else if (lastNum) {
        let inverted = (parseFloat(lastNum) * -1).toString();
        replaceLastNumber(inverted);
      }
      updateDisplay();
      return;
    }

    // RESET STATE AFTER EQUALS
    if (justCalculated) {
      if (!isNaN(value) || value === ".") {
        expression = "";
        resultDisplay.textContent = "";
      } else if (operators.includes(value)) {
        expression = resultDisplay.textContent;
        resultDisplay.textContent = "";
      }
      justCalculated = false;
    }

    // PREVENT DOUBLE OPERATORS
    if (operators.includes(value)) {
      if (expression === "") return;
      if (operators.includes(expression.slice(-1))) {
        expression = expression.slice(0, -1) + value;
        updateDisplay();
        return;
      }
    }

    // PREVENT DOUBLE DECIMALS
    if (value === "." && lastNum.includes(".")) {
      return;
    }

    // EQUALS SIGN
    if (value === "=") {
      if (!expression) return;
      try {
        const answer = safeEvaluate(expression);
        if (answer === "Error" || isNaN(answer)) {
          resultDisplay.textContent = "Error";
          expression = "";
        } else {
          resultDisplay.textContent = answer;
          expression = answer.toString();
          justCalculated = true;
        }
      } catch {
        resultDisplay.textContent = "Error";
        expression = "";
      }
      return;
    }

    // APPEND DIGIT / OPERATOR
    expression += value;
    updateDisplay();
  });
});

// MC (Memory Clear): Resets the stored memory value to 0.
// ​MR (Memory Recall): Retrieves the stored memory value and places it on the screen.
// ​M+ (Memory Plus): Adds the currently displayed number to the memory.
// ​M- (Memory Minus): Subtracts the currently displayed number from the memory.
// ​← (Backspace): Deletes the last typed character.
// ​CE (Clear Entry): Clears the current input/number you are typing without wiping out the whole equation.
// ​± (Toggle Sign): Flips a number between positive and negative.
// ​1/X (Reciprocal): Divides 1 by the currently typed number.
