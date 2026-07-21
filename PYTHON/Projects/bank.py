from abc import ABC, abstractmethod
from PYTHON.Projects.amount import getAmount
from database import load, save
from datetime import datetime
import time
import random


class BankAccount(ABC):

    bank_name = "EMD Divine Grace Mobile Banking"

    def __init__(self, name):
        self.name = name

    @abstractmethod
    def deposit(self, amount):
        pass

    @abstractmethod
    def withdraw(self, amount):
        pass

    def check_balance(self):
        data = load()
        print(f'Current balance: {data[self.name]["balance"]}')

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = password
        return self._password

    @classmethod
    def register(cls, name, account, password, balance, account_type):
        user = load()
        user[name] = {
            "name": name,
            "password": password,
            "account": account,
            "account_type": account_type,
            "balance": balance,
            "time": str(datetime.now()),
            "account_id": int(time.time()) + int(random.randint(1000, 9999)),
            "transactions": [],
        }
        print(
            f"Account created successfully\nAccount Name: {user[name]['name'].title()}\nPassword: {user[name]['password']}\nCurrent Balance: {user[name]['balance']}GHs\n"
        )
        save(user)

    def record_transaction(self, data, transaction_type, amount):
        transaction_history = {
            "Account name": data[self.name]["name"].title(),
            "Type of transaction": transaction_type,
            "Amount": amount,
            "Balance": data[self.name]["balance"],
            "Date and Time": str(datetime.now()),
        }
        data[self.name]["transactions"].append(transaction_history)
        save(data)

    def history(self):
        data = load()
        counter = 0
        for transaction in reversed(data[self.name]["transactions"]):
            if counter == 3:
                break
            for key, value in transaction.items():
                print(f"{key}: {value}")
            print("")
            counter += 1


class CurrentAccount(BankAccount):
    def __init__(self, name):
        super().__init__(name)

    def deposit(self, amount):
        data = load()
        if amount <= 0:
            print("Invalid amount")
            return
        else:
            data[self.name]["balance"] += amount
            print(
                f'{amount}GHs deposited successfully\nCurrent balance: {data[self.name]["balance"]}GHs\n'
            )
            self.record_transaction(data, "Deposit", amount)
            save(data)
            return data[self.name]["balance"]

    def withdraw(self, amount):
        data = load()
        if amount <= 0:
            print("Invalid input")
            return
        if amount > data[self.name]["balance"]:
            print("Insufficient balance")
            return

        data[self.name]["balance"] -= amount
        print(
            f'{amount}GHs withdrew successfully\nCurrent balance: {data[self.name]["balance"]}GHs\n'
        )
        self.record_transaction(data, "Withdrawal", amount)
        save(data)
        return data[self.name]["balance"]


class SavingsAccount(BankAccount):
    def __init__(self, name):
        super().__init__(name)

    def deposit(self, amount):
        data = load()
        if amount <= 0:
            print("Invalid amount")
            return
        data[self.name]["balance"] += amount
        print(
            f'{amount}GHs deposited successfully\nCurrent balance: {data[self.name]["balance"]}GHs\n'
        )
        self.record_transaction(data, "Deposit", amount)
        save(data)
        return data[self.name]["balance"]

    def withdraw(self, amount):
        data = load()

        if amount <= 0:
            print("Invalid input")
            return

        if amount > data[self.name]["balance"]:
            print("Insufficient balance")
            return
        data[self.name]["balance"] -= amount
        print(
            f'{amount}GHs withdrew successfully\nCurrent balance: {data[self.name]["balance"]}GHs\n'
        )
        self.record_transaction(data, "Withdrawal", amount)
        save(data)
        return data[self.name]["balance"]


# =============== NB ================== #
""" You can not create an object from the BankAccount classs since it has an abstract method """


while True:
    data = load()
    print(f"Welcome to {BankAccount.bank_name}\n1. Register\n2. Login\n0. Exit")
    operation = input("\n")
    if not operation in ["1", "2", "0"]:
        print("Invalid choice")
        continue

    # ===================== USER REGISTRATION ================= #
    if operation == "1":
        name = input("Name: ").lower().strip()
        account = int(time.time()) + int(random.randint(1000, 9999))
        password = input("Password: ").strip()
        balance = input("Initial deposit: ")
        print("Select account type\n1. Savings Account\n2. Current Account")
        while True:
            Atype = input("\n")
            if not Atype in ["1", "2"]:
                print("Invalid input\n")
                continue
            if Atype == "1":
                account_type = "Savings Account"
                break
            else:
                account_type = "Current Account"
                break
        try:
            balance = float(balance)
            if not name or not password:
                print("Invalid input, check and try again\n")
                continue
            else:
                BankAccount.register(name, account, password, balance, account_type)
        except ValueError:
            print("Invalid amount")
            continue

    # ===================== USER LOGIN ================= #
    elif operation == "2":
        name = input("Name: ").lower().strip()
        password = input("Password: ").strip()
        if not name or not password:
            print("No name or password provided\n")
            continue
        if name in data:
            if data[name]["name"] == name and data[name]["password"] == password:
                if data[name]["account_type"] == "Savings Account":
                    account = SavingsAccount(name)
                else:
                    account = CurrentAccount(name)
                while True:
                    data = load()
                    print(
                        f"Name: {data[name]['name'].title()}\n"
                        f"Account Number: {data[name]['account']}\n"
                        "1. Deposit\n2. Withdraw\n3. Check balance\n4. Mini statement\n0. Cancel\n"
                    )

                    choice = input("Choice: ")

                    if choice not in ["1", "2", "3", "4", "0"]:
                        print("Invalid choice")
                        continue

                    if choice == "1":
                        amount = getAmount()
                        account.deposit(amount)

                    elif choice == "2":
                        amount = getAmount()
                        account.withdraw(amount)

                    elif choice == "3":
                        account.check_balance()

                    elif choice == "4":
                        account.history()

                    else:
                        break
        else:
            print("User not found\nCreate account here\n")
            continue
    else:
        break
