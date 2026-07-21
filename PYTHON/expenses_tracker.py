import csv

# Expense Tracker: Create an app that records expenses, categorizes them and shows a summary.

expenses_record = []


def write_csv():
    with open("Expenses.csv", "a") as file:
        writer = csv.writer(file)
        writer.writerow(["Category", "Item", "Price"])
        writer.writerow(expenses_record)


def read_csv():
    with open("Expenses.csv", "r") as file:
        readers = csv.reader(file)
        for reader in readers:
            print(reader)


def items():
    category = input("Catrgory: ").strip().title()
    item = input("Enter item name: ").strip().title()
    while True:
        price = input("Price: ")
        try:
            price = float(price)
            break
        except ValueError:
            print("Invalid amount")
            continue
    return category, item, price


while True:
    print("Enter details of items to track expenses")
    category, item, price = items()
    all = category, item, price
    expenses_record.append(all)
    write_csv()
