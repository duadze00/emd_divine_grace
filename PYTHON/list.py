list_items = []
x = 0
while x < 1:
    list_items.append(input("Enter what you want: "))
    print(list_items)
    x += 1

list_items.clear()
print(list_items)

new_list = list_items.copy()
print(new_list)

# Changing list item value
list_items[0] = "Eric Mawule Duadze"
print(list_items)

# Checking if item is in a list or not
if "e" in list_items:
    print("yes")

# Changing the range of items in a list
# NB. You can use the list() to create a list but put square bracket into it eg. list([])
list_item = list(["Apple", "Mangoes", "Grapes"])
list_item[1:3] = ["Fufu", "Banku"]
print(list_item)

li = [1,2,3,4,5]
li[2] = [34,56,9]
print(li)
print(li[2])

thislist = ["apple", "banana", "cherry"]
thislist[1:3] = ["watermelon"]
print(thislist)

my_list = ["Rice", "Banku", "Jollof"]
my_list.insert(0, "Mawule")
print(my_list)

# Extend is used to append different list to another list or any iterable object. Eg list, tuple, set and dict, etc..
my_list = ["Rice", "Banku", "Jollof"]
my_list.extend(my_list)
print(my_list)

my_list = ["Rice", "Banku", "Jollof"]
my_list.remove(my_list[0])
my_list.remove("Banku")
print(my_list)

# Pop() remove the specified index
my_list = ["Rice", "Banku", "Jollof"]
my_list.pop()
my_list.pop(1)
print(my_list)

# del keyword can also delete the list completely
my_list = ["Rice", "Banku", "Jollof"]
del my_list

thislist = ["apple", "banana", "cherry"]
del thislist[0]
print(thislist)

thislist = ["apple", "banana", "cherry"]
thislist.clear(thislist)
print(thislist)

for i in ["apple", "banana", "cherry",1,2,3,4,5,6,]:
    print(i)
    # OR
thislist = ["apple", "banana", "cherry",1,2,3,4,5,6,]
for i,j in enumerate(thislist):
    print(f"{i+1}. {j}")

# LIST COMPREHENSION
thislist = ["apple", "banana", "cherry"]
[print(x) for x in thislist]

# Using loops for list comprehension
l = ["a",1,3,4,34,52,452,545,6335]
li = []
for i in l:
    if type(i) != str:
        li.append(i)

print(li)

# Your code above, it list comprehension
fruits = ["apple", "banana", "cherry", "kiwi", "mango"]

# List comprehension with condition(the if statement)
newlist = [x for x in fruits if "a" in x]

print(newlist)

# Or The condition is optional can be omitted or used
fruit = [i for i in fruits]

# Sorting a list
l = ["Eric","Mawule","Duadze"]
l.sort()
print(l)

thislist = ["orange", "mango", "kiwi", "pineapple", "banana"]
thislist.sort()
print(thislist)

li = [1,2,3,10,9,8,7,6,5,4,1]
li.sort(reverse= True)
print(li)
li.reverse()
print(li)

# Make a copy of a list with the copy() method:
thislist = ["apple", "banana", "cherry"]
mylist = thislist.copy()
print(mylist)

li = [1,2,3,10,9,8,7,6,5,4,1]
ni = ["list","join","them","together"]
li.extend(ni)
print(li)

