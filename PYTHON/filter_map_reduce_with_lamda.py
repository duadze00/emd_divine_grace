from functools import reduce

# Using filter to filter all the even numbers from the numbers list
numbers = [12,13,45,51,34,36,200,102]
l = list(filter(lambda n : n % 2 == 0, numbers))
print(l)

# Using map to double the filtered list (l)
r = list(map(lambda n : n * 2, l))
print(r)

# Using reduce to take the sum of the map list (r)
s = reduce(lambda a, b : a + b, r)
print(s)

from functools import reduce
li = [23,0,-2,45,90,46,11]

fil = list(filter(lambda a: a % 2 == 0, li))
print(f"New filtered list: {fil}")

ma = list(map(lambda a : a / 2, fil))
print(f"New mapped list: {ma}")

red = reduce(lambda a, b : b - a, ma)
print(f"New reduced value: {red}")
