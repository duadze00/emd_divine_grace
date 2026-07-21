target = int(input("Enter a number"))

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


for i in range(3):
  print(f"{i+1} I Love God")
