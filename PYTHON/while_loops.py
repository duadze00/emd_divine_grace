a = 0
while a < 5:
    print(a+1,"I Love God")
    a += 1

# break
b = 0
while b < 5:
    print(b+1,"Thank God")
    if b == 2:
        break
    b += 1

# continue
c = 0
while c < 5:
    c += 1
    if c % 2 != 0:
        continue
    print(c,"God")

# else after while loop
i = 1
while i < 6:
  print(i)
  i += 1
else:
  print("i is no longer less than 6")