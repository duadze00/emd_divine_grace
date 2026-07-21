for i in "Banana":
    print(i)

fruits = ["eric","mawule","duadze",21,45,True,"meat"]
for i in fruits:
    if i == 21:
        break
    print(i)

fruits = ["eric","mawule","duadze",21,45,True,"meat"]
for i in fruits:
    if i == 21:
        continue
    print(i)

for i in range(5):
    print(i)

for i in range(2,6):
    print(i)

# Specifying the increment
for i in range(2,30,3):
    print(i)

# Else in for loop
for x in range(6):
  print(x)
else:
  print("Finally finished!")

# NESTED FOR LOOPS
nums = [1,2,3,4,5,6]
foods = ["Apple","Mango","Pineapple","Grapes","Banana","Cherry"]
for i in nums:
   for j in foods:
      print(i,j)

adj = ["red", "big", "tasty"]
fruits = ["apple", "banana", "cherry"]
for x in adj:
  for y in fruits:
    print(x, y)

# pass statement for for loops
for i in [0,1,2]:
   pass
