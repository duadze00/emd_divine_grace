import json
import random


FILE_NAME = "Bank_detail.json"


# -------------------- FILE HANDLING -------------------- #
def load_data():
    try:
        with open(FILE_NAME, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_data(data):
    with open(FILE_NAME, "w") as file:
        json.dump(data, file, indent=4)


# -------------------- ACCOUNT CLASS -------------------- #
class BankAccount:
    def __init__(self, name, age, phone, account_number, balance=0):
        self.name = name
        self.age = age
        self.phone = phone
        self.account_number = account_number
        self.balance = balance

    def to_dict(self):
        return {
            "Name": self.name,
            "Age": self.age,
            "Phone": self.phone,
            "Account Number": self.account_number,
            "Balance": self.balance,
        }


# -------------------- HELPERS -------------------- #
def generate_account_number():
    return random.randint(10000000, 99999999)


def find_account(data, acc_number):
    for user in data:
        if user["Account Number"] == acc_number:
            return user
    return None


# -------------------- OPERATIONS -------------------- #
def create_account():
    name = input("Enter name: ").strip().title()
    age = int(input("Enter age: "))
    phone = input("Enter phone number: ").strip()

    account_number = generate_account_number()
    balance = int(input("Initial deposit: "))

    account = BankAccount(name, age, phone, account_number, balance)

    data = load_data()
    data.append(account.to_dict())
    save_data(data)

    print(f"\nAccount created successfully!")
    print(f"Your Account Number: {account_number}\n")


def deposit():
    acc_number = int(input("Enter account number: "))
    amount = int(input("Enter amount to deposit: "))

    data = load_data()
    user = find_account(data, acc_number)

    if user:
        if amount <= 0:
            print("Invalid amount\n")
            return

        user["Balance"] += amount
        save_data(data)

        print(f"Deposit successful. New balance: {user['Balance']}\n")
    else:
        print("Account not found\n")


def withdraw():
    acc_number = int(input("Enter account number: "))
    amount = int(input("Enter amount to withdraw: "))

    data = load_data()
    user = find_account(data, acc_number)

    if user:
        if amount <= 0:
            print("Invalid amount\n")
            return

        if user["Balance"] < amount:
            print("Insufficient funds\n")
            return

        user["Balance"] -= amount
        save_data(data)

        print(f"Withdrawal successful. New balance: {user['Balance']}\n")
    else:
        print("Account not found\n")


def check_balance():
    acc_number = int(input("Enter account number: "))

    data = load_data()
    user = find_account(data, acc_number)

    if user:
        print(f"Current Balance: {user['Balance']}\n")
    else:
        print("Account not found\n")


def transfer():
    sender_acc = int(input("Enter your account number: "))
    receiver_acc = int(input("Enter receiver account number: "))
    amount = int(input("Enter amount to transfer: "))

    data = load_data()

    sender = find_account(data, sender_acc)
    receiver = find_account(data, receiver_acc)

    if not sender or not receiver:
        print("One or both accounts not found\n")
        return

    if amount <= 0:
        print("Invalid amount\n")
        return

    if sender["Balance"] < amount:
        print("Insufficient funds\n")
        return

    sender["Balance"] -= amount
    receiver["Balance"] += amount

    save_data(data)

    print("✅ Transfer successful\n")


# -------------------- MAIN MENU -------------------- #
def main():
    while True:
        print("====== EMD Divine Grace Bank ======")
        print("1. Create Account")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Transfer")
        print("5. Check Balance")
        print("0. Exit")

        choice = input("Choose option: ").strip()

        if choice == "1":
            create_account()
        elif choice == "2":
            deposit()
        elif choice == "3":
            withdraw()
        elif choice == "4":
            transfer()
        elif choice == "5":
            check_balance()
        elif choice == "0":
            print("👋 Thank you for banking with us!")
            break
        else:
            print("Invalid choice\n")


if __name__ == "__main__":
    main()
import random
import json


def main():
    class Bank_Account:
        def __init__(self, balance):
            self.balance = balance
            balance = 0

        def create_account(self, name, age, number, account_number):
            self.name = name
            self.age = age
            self.number = number
            self.account_number = account_number
            n = {
                "Name": name,
                "Age": age,
                "Number": number,
                "Account number": account_number,
            }
            with open("Bank_Info_Details.json", "w") as file:
                json.dump(n, file, indent=4, sort_keys=True)

        def withdraw(self, amount):
            self.amount = amount
            return self.balance - self.amount

        def deposit(self, amount):
            self.amount = amount
            self.balance += self.amount
            return self.balance

    name = input("Name: ")
    while True:
        age = input("Age: ")
        try:
            age = int(age)
            break
        except ValueError:
            print("Invalid age")
            continue
    while True:
        number = input("Phone number: ")
        if len(number) > 10:
            print("Invalid number")
            continue

        elif len(number) < 10 or "":
            print("Invalid number")
            continue
        else:
            break

    account_number = random.randint(111110111, 999991000)

    account = Bank_Account(200)
    account.create_account(name, age, number, account_number)
    print(account.withdraw(100))
    print(account.deposit(100))


if __name__ == "__main__":
    main()
