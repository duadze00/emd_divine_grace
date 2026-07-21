# ==============================================================================
# DECORATORS
# ==============================================================================
# A decorator is a function that modifies another function without changing its code.
# Think of it like: “Wrapping extra behavior around a function”


# ================================
# WHY DECORATORS EXIST
# ================================
# Instead of doing this repeatedly:
def greet():
    print("Start")
    print("Hello")
    print("End")


# You can reuse behavior using decorators.


# ================================
# FUNCTIONS ARE FIRST-CLASS OBJECTS
# ================================
# Before decorators, understand this:
def say_hello():
    return "Hello"


func = say_hello
print(func())  # Hello

# Functions can:
# # Be stored in variables
# # Be passed as arguments
# # Be returned from other functions


# ================================
# BASIC DECORATOR STRUCTURE
# ================================
def my_decorator(func):
    def wrapper():
        print("Before")
        func()
        print("After")

    return wrapper


# Use it like this:
@my_decorator
def greet():
    print("Hello")


greet()
# Output:
# # Before
# # Hello
# # After


# ================================
# DECORATOR WITHOUT @ SYNTAX
# ================================
# This:
@my_decorator
def greet():
    print("Hello")


# Is the same as:
greet = my_decorator(greet)


# ================================
# DECORATORS WITH ARGUMENTS
# ================================
# Problem:
def greet(name):
    print(name)


# Fix:
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before")
        func(*args, **kwargs)
        print("After")

    return wrapper


# ================================
# RETURNING VALUES FROM DECORATORS
# ================================
def my_decorator(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result

    return wrapper


# ================================
# PRESERVING FUNCTION METADATA
# ================================
# Without this, your function loses its name.
# Use:
from functools import wraps


def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)

    return wrapper


# ================================
# DECORATORS WITH ARGUMENTS (ADVANCED)
# ================================
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)

        return wrapper

    return decorator


# Usage:
@repeat(3)
def greet():
    print("Hello")


# ================================
# MULTIPLE DECORATORS
# ================================
def decorator1():
    pass


def decorator2():
    pass


@decorator1
@decorator2
def func():
    pass


# Equivalent to:
func = decorator1(decorator2(func))

# Execution order = inside → outside

# ================================
# REAL WORLD DECORATOR USE CASES
# ================================


# Logging
def log(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)

    return wrapper


# Authentication
def require_login(func):
    def wrapper(user):
        if not user["logged_in"]:
            print("Access denied")
            return
        return func(user)

    return wrapper


# Timing Function
import time


def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(time.time() - start)
        return result

    return wrapper


# ================================
# CLASS-BASED DECORATORS (PRO LEVEL)
# ================================
class MyDecorator:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print("Before")
        return self.func(*args, **kwargs)
