me = "Eric"
for i, j in enumerate(me):
    print(f"{i+1} {j}")


for i, j in enumerate(me):
    print(i + 1, j)


for i in enumerate(me):
    print(i)

fruits = ["apple", "banana", "cherry", "kiwi", "mango"]

for i, fruit in enumerate(fruits):
    print(i, fruit)
