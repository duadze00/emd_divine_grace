# Helps to debug your code when you specify the data type with type hint.
# Install mypy: pip install mypy

# How to use mypy to check for error or bugs
# Run: mypy filename


def meow(n: int):
    for _ in range(n):
        print("Meow")


number: int = input("Number: ")

meow(number)
