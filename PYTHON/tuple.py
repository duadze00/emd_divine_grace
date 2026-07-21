# Tuple items
# Tuple is immutable or unchangeable but allow duplicates
tuple_items = ()

# Indexing in tuple
fruits = ("Eric","Mawule","Duadze", "Mawule")
l = fruits.index("Mawule")
print(l)
print(fruits[1])
print(fruits[2:-1])
print(fruits)

# NB. One item tuple must have comma at the end
# Eg. 
thistuple = ("Eric",)

# Tuple constructor
mytuple = tuple(("Eric","Mawule"))

# Check it is in a tuple
if "Eric" in mytuple:
    print("Yes")

# Finding the length of a tuple
print(len(fruits))

print(type(fruits))

# Change the value of a tuple even though it is immutable
x = ("apple", "banana", "cherry")
y = list(x)
y[0] = "Guava"
x = tuple(y)
print(x)

# Append to a tuple even though it is unchangeable
x = ("Eric", "Mawule")
y = list(x)
y.append("Duadze")
x = tuple(y)
print(x)
print(type(x))

# Append to a tuple even though it is unchangeable
this_tuple = ("Eric","Mawule","Duadze")
my_tuple = ("Kwadwo",)
this_tuple += my_tuple
print(this_tuple)

# NB. You can remove, add or do anything to a tuple by converting it to a list first with the list function.

# Unpacking tuple
y, x = ("Eric","Mawule")
print(x)
print(y)

# OR
fruits = ("apple", "banana", "cherry")
x,y,z = fruits
print(x)
print(y)
print(z)

# Unpacking too many values in tuple to small variable
fruits = ("apple", "banana", "cherry", "strawberry", "raspberry")
x, y, *z = fruits
print(x)
print(y)
print(z)

# Looping through a tuple
fruits = ("apple", "banana", "cherry", "strawberry", "raspberry")
for fruit in fruits:
    print(fruit)

    # OR
for i in range(len(fruits)):
    print(fruits[i])

# Enumerating tuple
for i, j in enumerate(fruits):
    print(i+1,j.title())


thistuple = ("apple", "banana", "cherry")
i = 0
while i < len(thistuple):
  print(thistuple[i])
  i = i + 1

# NB You can join two tuples by using the + operator

# The only two methods of tuple
fruits = ("apple", "banana", "cherry","apple")
print(fruits.index("banana"))
print(fruits.count("apple"))

# TUPLE COMPREHENSION
fruits = ("apple", "banana", "cherry","apple")
new_fruits = (i for i in fruits)
for fruit in new_fruits:
    print(fruit)
