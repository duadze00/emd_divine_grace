n = input("What is your name: ").strip().title()

# formatting with format keyword
m = "{} is my name."
print(m.format(n))

# Format a number to be displayed as a number with two decimals
price = float(input("Enter the price of the food "))
txt = "The price is {:.2f} dollars"
print(txt.format(price))

# Formatting with f string
print(f"My name is {n}")
print(f"The price {price:.1f} GHs")

# Multiple item to format
quantity = 3
itemno = 567
price = 49
myorder = "I want {} pieces of item number {} for {:.2f} dollars."
print(myorder.format(quantity, itemno, price))

# Indexing the values
quantity = 3
itemno = 567
price = 49
myorder = "I want {} pieces of item number {} for {:.2f} dollars."
print(myorder.format(quantity, itemno, price))

# Named indexes
myorder = "I have a {carname}, it is a {model}."
print(myorder.format(carname = "Ford", model = "Mustang"))