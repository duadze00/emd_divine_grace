#  ============ CONDITIONAL STATEMENT ============
a = 30
b = 300
if b > a:
    print(f"{b} is greater than {a}")
elif b == a:
    print(f"{b} is equal to {a}")
else:
    print(f"{a} is greater than {b}")

# Ternary Operators, or Conditional Expressions.
# SHORT HANDS
if b > a:
    print("b is greater than a")

print("A") if a < b else print("B")

# and operator is used when you want both conditions to be truth
a = 100
b = 90
c = 980
print("You're eligible") if a > b and b > c else print("You're not eligible")
# Above is same as below
if a > b and b > c:
    print("You're eligible")
else:
    print("You're not eligible")

# or operator is used when you want any one of the conditions is to be true
if a > b or a > c:
    print("You're eligible")
else:
    print("You're not eligible")


# pass is used when you have condtion but it has no content because conditions can not be empty.
if a < b:
    pass

#  short hand if
if a > b:
    print("a is greater than b")

# Short hand for if and else conditions
a = 2
b = 330
print("A") if a > b else print("B")

d = {"Name": "Eric Mawule Duadze", "Age": 23}
if d["Age"] == 23:
    print("Yes")
print("Qualified") if not d["Age"] > 25 else print("Yes")

# ============ MATCH STATEMENT ============
target = int(input("Enter a number: "))

match target:
    case 0:
        print("Zero")
    case 1:
        print("One")
    case 2:
        print("Two")
    case 3:
        print("Three")
    case 4:
        print("Four")
    case 5:
        print("Five")
    case _:
        print(f"{target} was entered")
