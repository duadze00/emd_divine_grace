# Defining getting valid user input
def get_valid_integer():
    while True:
        x = input("Enter x value: ")
        y = input("Enter y value: ")
        try:
            x = float(x)
            y = float(y)
            return x, y
        except ValueError:
            print("Invalid input, try again")
            continue

# Defining addition function
def add(x, y):
    return x + y

# Defining multiplication function
def mul(x,y):
    return x * y

# Defining substraction function
def sub(x,y):
    return x - y

# Defining division function
def division(x,y):
    return x/y

# Defining exponent or power function
def exponent(x,y):
    return x**y

# Making user menu
while True:
    print("1. Addition\n2. Multiplication\n3. Subtraction\n4. Division\n5. Exponent\n0. Exit")
    while True:
        choice = input()
        if choice not in ["1","2","3","4","5","0"]:
            print("Invalid operation, try again")
            continue
        else:
            break

    # Assigning user choice to their function
    if choice == "1":
        x, y = get_valid_integer()
        result = add(x,y)
        print(result)
    elif choice == "2":
        x, y = get_valid_integer()
        result = mul(x,y)
        print(result)
    elif choice == "3":
        x, y = get_valid_integer()
        result = sub(x,y)
        print(result)
    elif choice == "4":
        try:
            x,y = get_valid_integer()
            result = division(x,y)
            print(f"{result:.2f}")
        except ZeroDivisionError:
            result = 0
            print(result)
    elif choice == "5":
        x,y = get_valid_integer()
        result = exponent(x, y)
        print(result)
    else:
        print("Thank you!")
        break
    