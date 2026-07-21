import requests

request = requests.get("https://https://google/users.com")
response = request.json()
print(response)


# Reverse string
me = "Eric Mawule Duadze"
print(me[::-1])


def reverse(x):
    return x[::-1]


m = reverse(me)
print(m)

# Remove duplicates from list
man = [1, 3, 1, 2, 3, 3, 3, 1, 0]
new = list(dict.fromkeys(man))
print(new)


# Remove duplicates function
def remove_duplicates(x):
    return list(dict.fromkeys(x))


n = remove_duplicates(man)
print(n)


# Casting
m = int(m)
f = float(m)
c = complex(f)
s = str(m)

m = "Eric Mawule Duadze"
print(m[0])
sub = m[1:5]
print(f"Substring of {m} is {sub}")
n = "           Eric"
print(n.strip())
print(len(m))
print(n.lower())
print(n.upper())
f = m.replace("Mawule", "Chilling Vibes")
print(f)
x, y, z = m.split(" ")
print(x)
print(y)
print(z)
a = 2 + 3
print(a)
b = 2 - 3
print(b)
print(2 * 3)
print(2 / 3)
print(2 % 3)
c = a
print(c)

my_list = [1, 2, 3, 5, 4, 2, 4, 3, 5]
print(my_list[4])
print(my_list.index(2))
my_list.remove(2)
print(my_list)
my_list[1] = "Eric Mawule Duadze"
print(my_list)
for i in my_list:
    print(i)
if 1 in my_list:
    print("Yes")
print(len(my_list))
my_list.append("New item")
print(my_list)

my_list.clear()
print(my_list)
new_list = list(my_list)
print(new_list)
n = (1, 3, 2, 4)
print(type(n))
print(n)
for i in n:
    print(i)

d = {"Name": "Eric Mawule Duadze", "Age": 23}
print(d["Name"])
d["Age"] = 24
print(d)
for i in d.keys():
    print(i)
for i in d.values():
    print(i)

for i in d:
    print(d.values())

for i in d.items():
    print(i)
d.update({"Job": "Sonography"})
print(d)
for i in d:
    print(f"{i}: {d[i]}")
d.update({"Job": "Sonography"})
print(d)
for i in d.items():
    print(i)
d.pop("Job")
print(d)
d.popitem()
print(d)
d = {"Name": "Eric Mawule Duadze", "Age": 23}
if d["Age"] == 23:
    print("Yes")
print("Qualified") if not d["Age"] > 25 else print("Yes")

a = 100
b = 100
print("A") if a > b or b > a else print("B")
x = 5
while True:
    n = int(input("Number"))
    if n == x:
        break
    else:
        print("New one printed")
        continue
me = "Eri"
for i, j in enumerate(me):
    print(f"{i+1} {j}")
for i, j in enumerate(me):
    print(i + 1, j)
for i in enumerate(me):
    print(i)
for i in range(5):
    print(i + 1, "I Love Jesus")


def me():
    print("100% there")


me()


def him(n, m):
    result = n + m
    print(result)


him(1, 1)


def default(m, n="Hellow World"):
    print(n, m)


x = input("Name: ").title()
default(x)


def m():
    return "This is Awesome"


print(m())


def r(n):
    return r(n) - r(n + 1)


m = r(2)
print(m)


def greet():
    print("Hello World")
    greet()


greet()


def r(n):
    if n == 0:
        return 1
    return n * r(n - 1)


re = r(6)
print(re)


def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)


result = factorial(5)
print(result)
from functools import reduce

a = [12, 13, 54, 64, 2, 33, 64]
m = list(filter(lambda a: a % 2 == 0, a))
z = list(map(lambda a: a / 2, m))
s = reduce(lambda a, b: a + b, z)
print(s)
a = 2
b = 3
x = lambda a, b: a * b
print(x(2, 2))
print(x(a, b))

c = lambda a: a + 10
print(c(2))
m = lambda a, b: a * b
print(m(2, 10))
s = lambda a, b, c: a + b + c
print(s(2, 10, 18))

import numpy

a = numpy.array([2, 4, 3, 5, 8, 6, 1, 9])
print((a))
a.put(0, 100)
a.sort()
print((a))
for i in a:
    print(i)
a.choose(0)


class School:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def nursery(self):
        print(f"{name} you're {age} years old and you're a child")


name = input("Name: ")
age = int(input("Age: "))

name = "Eric Mawule Duadze"
school = School(name, age)
school.nursery()
print(school.age)
del school.age
print(school.age)
del school
print(school.age)
