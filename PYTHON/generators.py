# ==============================================================================
# GENERATORS
# ==============================================================================
# A generator is a function that yields values one at a time, instead of returning everything at once.


# ================================
# NORMAL FUNCTION VS GENERATOR
# ================================
# Normal:
def nums():
    return [1, 2, 3]


# Generator:
def nums():
    yield 1
    yield 2
    yield 3


# ================================
# USING GENERATOR
# ================================
g = nums()

print(next(g))  # 1
print(next(g))  # 2

# ================================
# LOOPING THROUGH GENERATOR
# ================================
for i in nums():
    print(i)

# ================================
# GENERATOR VS LIST
# ================================
# Feature     List           Generator
# Memory      High           Low
# Speed       Fast access    Lazy
# Execution   Immediate      On demand

# ================================
# GENERATOR EXPRESSION
# ================================
# Like list comprehension:
numbers = (x * x for x in range(5))
print(numbers)
for i in numbers:
    print(i)

# ================================
# YIELD VS RETURN
# ================================
# yield                return
# Pauses function      Ends function
# Keeps state          Discards state


# ================================
# GENERATOR STATE (KEY CONCEPT)
# ================================
def count():
    i = 0
    while True:
        yield i
        i += 1


# This remembers where it stopped


# ================================
# SEND() METHOD (ADVANCED)
# ================================
def generator():
    value = yield
    print(value)


g = generator()
next(g)
g.send("Hello")


# ================================
# YIELD FROM (PRO LEVEL)
# ================================
# Used to delegate generators:
def sub():
    yield 1
    yield 2


def main():
    yield from sub()
    yield 3


# ================================
# REAL-WORLD GENERATOR USE CASES
# ================================
# Reading Large Files
def read_file(file):
    for line in file:
        yield line


# Infinite Streams
def infinite():
    n = 0
    while True:
        yield n
        n += 1


# Pipelines
def even(nums):
    for n in nums:
        if n % 2 == 0:
            yield n


def square(nums):
    for n in nums:
        yield n * n


nums = range(10)

result = square(even(nums))


# ========================================================================================================================================
def main():
    n = int(input("What's n? "))
    for s in sheep(n):
        print(s)


def sheep(n):
    for i in range(n):
        yield "*" * i


if __name__ == "__main__":
    main()
