# Lambda is used instead of defining a funtions and only use it ones

# lambda arguments : expression

x = lambda n : n / 2
print(x(4))
# NB. It is very useful

y = lambda a, b : a * b
print(y(10,5))

x = lambda a, b, c : a + b + c
print(x(5, 6, 2))

def myfunc(n):
  return lambda a : a * n

def myfunc(n):
    return lambda a : a * n

doubler = myfunc(2)
print(doubler(10))