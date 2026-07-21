// DOM ELEMENTS
const summaryBalance = document.getElementById("total-container__balance");
const totalIcomeEl = document.getElementById("transactions__income");
const totalExpensesEl = document.getElementById("transactions__expenses");
const selectTransactionType = document.getElementById("transaction-type");
const amountEl = document.getElementById("amount");
const addTransactionBtn = document.getElementById("add-transaction-btn");
const historyContainer = document.getElementById("history");
const error = document.querySelector("small");

// TRANSACTIONS STORED
const transactionContent =
  JSON.parse(localStorage.getItem("transaction")) || [];

// EVENT LISTENERS
addTransactionBtn.addEventListener("click", (event) => {
  event.preventDefault();

  try {
    const [amount, transactionType] = getInput();

    if (!amount) {
      throw new Error("Amount is required");
    }

    const userInputs = { amount: amount, transactionType: transactionType };
    transactionContent.push(userInputs);
    saveData();
    updateUI();
    amountEl.value = "";
    amountEl.focus();
  } catch (error) {
    console.log(error);
  }
});

window.addEventListener("DOMContentLoaded", updateUI);

// FUNCTIONS
function getInput() {
  const selectedOption =
    selectTransactionType.options[selectTransactionType.selectedIndex];
  const amount = amountEl.value;
  if (!amount) {
    error.style.display = "block";
    return;
  } else {
    error.style.display = "none";
    return [amount, selectedOption.value];
  }
}

function saveData() {
  localStorage.setItem("transaction", JSON.stringify(transactionContent));
}

function updateUI() {
  historyContainer.innerHTML = "";
  if (transactionContent.length < 1) {
    historyContainer.style.display = "none";
  } else {
    historyContainer.style.display = "block";
    for (let i = 0; i < transactionContent.length; i++) {
      const list = document.createElement("li");
      list.classList.add("list-item");

      const sign = document.createElement("span");
      transactionContent[i].transactionType === "income"
        ? (sign.textContent = "↑")
        : (sign.textContent = "↓");
      transactionContent[i].transactionType === "income"
        ? sign.classList.add("income")
        : sign.classList.add("expenses");

      const amount = document.createElement("p");
      amount.textContent = transactionContent[i].amount;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "x";
      deleteFnx(deleteBtn, i);

      list.appendChild(sign);
      list.appendChild(amount);
      list.appendChild(deleteBtn);

      historyContainer.appendChild(list);
    }
    totalBalance();
    totalIncomeExpenses();
  }
}

function totalBalance() {
  let total = 0;
  for (let i = 0; i < transactionContent.length; i++) {
    if (transactionContent[i].transactionType === "income") {
      total += Number(transactionContent[i].amount);
    } else {
      total -= Number(transactionContent[i].amount);
    }
  }
  summaryBalance.textContent = `$ ${total.toFixed(2)}`;
  return total;
}

function totalIncomeExpenses() {
  let totalIcome = 0;
  let totalExpenses = 0;
  for (let i = 0; i < transactionContent.length; i++) {
    if (transactionContent[i].transactionType === "income") {
      totalIcome += Number(transactionContent[i].amount);
    } else {
      totalExpenses += Number(transactionContent[i].amount);
    }
  }
  totalIcomeEl.textContent = `$ ${totalIcome.toFixed(2)}`;
  totalExpensesEl.textContent = `$ ${totalExpenses.toFixed(2)}`;
}

function deleteFnx(element, index) {
  element.addEventListener("click", () => {
    transactionContent.splice(index, 1);
    saveData();
    updateUI();
  });
}
