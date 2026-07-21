# Recursion meaning calling a function within a function


# GREET RECURSION
def greet():
    print("Hello World")
    greet()


greet()


# FACTORIAL RECURSION
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)


result = factorial(5)
print(result)


# TRIPLE RECURSION
def tri_recursion(k):
    if k > 0:
        result = k + tri_recursion(k - 1)
        print(result)
    else:
        result = 0
    return result


tri_recursion(6)
