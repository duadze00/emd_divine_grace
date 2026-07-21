import json
from datetime import datetime
import random
import hashlib
import sys

# ============================================================
# DATABASE FUNCTIONS
# ============================================================
DATABASE_FILE = "detail.json"


# ====================== LOAD DATABASE ======================
def load_users():
    try:
        with open(DATABASE_FILE, "r") as file:
            return json.load(file)

    except (FileNotFoundError, json.JSONDecodeError):
        return {}


# ====================== SAVE DATABASE ======================
def save_users(data):
    with open(DATABASE_FILE, "w") as file:
        json.dump(data, file, indent=4)


# ============================================================
# HELPER FUNCTIONS
# ============================================================


# ====================== GET VALID AMOUNT ======================
def get_amount():
    while True:
        amount = input("Amount: ").strip()
        try:
            amount = float(amount)
            if amount <= 0:
                print("Amount must be greater than 0")
                continue
            return amount

        except ValueError:
            print("Invalid amount")


# ====================== HASH PASSWORD ======================
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


# ====================== GENERATE ACCOUNT NUMBER ======================
def generate_account_number(users):
    while True:
        account_number = random.randint(1000000000, 9999999999)

        exists = any(
            user["Account number"] == account_number for user in users.values()
        )

        if not exists:
            return account_number


# ============================================================
# MAIN BANK ACCOUNT CLASS
# ============================================================
class BankAccount:

    def __init__(self):
        self.current_user = None

    # ========================================================
    # REGISTER
    # ========================================================
    def register(self, name, initial_deposit, password):
        users = load_users()

        # ====================== VALIDATIONS ======================
        if not name:
            print("Name cannot be empty")
            return

        if name in users:
            print("User already exists")
            return

        if len(password) < 4:
            print("Password too short")
            return

        account_number = generate_account_number(users)

        users[name] = {
            "Account name": name,
            "Account number": account_number,
            "Account balance": initial_deposit,
            "Password": hash_password(password),
            "Transaction history": [],
        }

        save_users(users)

        print("\nRegistration successful")
        print(f"Account Name: {name}")
        print(f"Account Number: {account_number}")
        print(f"Balance: {initial_deposit} GHS")

    # ========================================================
    # LOGIN
    # ========================================================
    def login(self, name, password):
        users = load_users()

        if not name or not password:
            print("Name and password required")
            return

        if name not in users:
            print("User not found")
            return

        hashed_password = hash_password(password)

        if hashed_password != users[name]["Password"]:
            print("Incorrect password")
            return

        self.current_user = name
        print(f"\nWelcome {name.title()}")

        self.dashboard()

    # ========================================================
    # DASHBOARD
    # ========================================================
    def dashboard(self):
        while True:
            print("\n===== DASHBOARD =====")
            print("1. Transfer")
            print("2. Deposit")
            print("3. Withdraw")
            print("4. Check Balance")
            print("5. Transaction History")
            print("0. Logout")

            choice = input("Choice: ").strip()

            if choice == "1":
                receiver = input("Receiver Account Number: ").strip()

                try:
                    receiver = int(receiver)
                except ValueError:
                    print("Invalid account number")
                    continue

                amount = get_amount()
                self.transfer(amount, receiver)

            elif choice == "2":
                amount = get_amount()
                self.deposit(amount)

            elif choice == "3":
                amount = get_amount()
                self.withdraw(amount)

            elif choice == "4":
                self.check_balance()

            elif choice == "5":
                self.transaction_history()

            elif choice == "0":
                print("Logged out")
                self.current_user = None
                break

            else:
                print("Invalid choice")

    # ========================================================
    # CHECK BALANCE
    # ========================================================
    def check_balance(self):
        users = load_users()
        balance = users[self.current_user]["Account balance"]
        print(f"Current Balance: {balance} GHS")

    # ========================================================
    # DEPOSIT
    # ========================================================
    def deposit(self, amount):
        users = load_users()
        users[self.current_user]["Account balance"] += amount
        history = {
            "Transaction type": "Deposit",
            "Amount": amount,
            "Balance": users[self.current_user]["Account balance"],
            "Date": str(datetime.now()),
        }
        users[self.current_user]["Transaction history"].append(history)

        save_users(users)
        print(f"{amount} GHS deposited successfully")

    # ========================================================
    # WITHDRAW
    # ========================================================
    def withdraw(self, amount):
        users = load_users()
        balance = users[self.current_user]["Account balance"]
        if amount > balance:
            print("Insufficient balance")
            return
        users[self.current_user]["Account balance"] -= amount
        history = {
            "Transaction type": "Withdrawal",
            "Amount": amount,
            "Balance": users[self.current_user]["Account balance"],
            "Date": str(datetime.now()),
        }
        users[self.current_user]["Transaction history"].append(history)
        save_users(users)

        print(f"{amount} GHS withdrawn successfully")

    # ========================================================
    # TRANSFER
    # ========================================================
    def transfer(self, amount, receiver_account_number):
        users = load_users()
        sender = users[self.current_user]
        receiver_user = None

        # ====================== FIND RECEIVER ======================
        for username, details in users.items():
            if details["Account number"] == receiver_account_number:
                receiver_user = details
                break

        # ====================== RECEIVER CHECK ======================
        if receiver_user is None:
            print("Receiver not found")
            return

        # ====================== SELF TRANSFER CHECK ======================
        if sender["Account number"] == receiver_account_number:
            print("You cannot transfer money to yourself")
            return

        # ====================== BALANCE CHECK ======================
        if amount > sender["Account balance"]:
            print("Insufficient balance")
            return

        # ====================== TRANSFER ======================
        sender["Account balance"] -= amount
        receiver_user["Account balance"] += amount

        # ====================== SENDER HISTORY ======================
        sender_history = {
            "Transaction type": "Transfer",
            "Receiver": receiver_user["Account name"],
            "Amount": amount,
            "Balance": sender["Account balance"],
            "Date": str(datetime.now()),
        }
        sender["Transaction history"].append(sender_history)

        # ====================== RECEIVER HISTORY ======================
        receiver_history = {
            "Transaction type": "Received",
            "Sender": sender["Account name"],
            "Amount": amount,
            "Balance": receiver_user["Account balance"],
            "Date": str(datetime.now()),
        }
        receiver_user["Transaction history"].append(receiver_history)

        save_users(users)
        print("Transfer successful")

    # ========================================================
    # TRANSACTION HISTORY
    # ========================================================
    def transaction_history(self):
        users = load_users()
        history = users[self.current_user]["Transaction history"]
        if not history:
            print("No transaction history")
            return
        print("\n===== TRANSACTION HISTORY =====")

        for transaction in history:
            print("-" * 40)
            for key, value in transaction.items():
                print(f"{key}: {value}")


# ============================================================
# SAVINGS ACCOUNT
# ============================================================
class SavingsAccount(BankAccount):
    pass


# ============================================================
# CURRENT ACCOUNT
# ============================================================
class CurrentAccount(BankAccount):
    pass


# ============================================================
# OBJECTS
# ============================================================
savings = SavingsAccount()
current = CurrentAccount()


# ============================================================
# MAIN APPLICATION
# ============================================================
while True:
    print("\n===== EMD DIVINE GRACE MOBILE BANKING =====")
    print("1. Register")
    print("2. Login")
    print("0. Exit")

    choice = input("Choice: ").strip()

    # ====================== REGISTER ======================
    if choice == "1":
        name = input("Name: ").strip().lower()
        initial_deposit = get_amount()
        password = input("Password: ").strip()
        savings.register(name, initial_deposit, password)

    # ====================== LOGIN ======================
    elif choice == "2":
        name = input("Name: ").strip().lower()
        password = input("Password: ").strip()
        savings.login(name, password)

    # ====================== EXIT ======================
    elif choice == "0":
        print("Thank you for banking with us")
        sys.exit()
    else:
        print("Invalid choice")
