# ====================================== ARBITRARY ARGUMENTS ======================================
# Arbitrary arguments (*args) and arbitrary keyword arguments (**kwargs) are extremely important in Python because they allow a function to accept a variable number of arguments.


# ==============================================================================
# THE PROBLEM THEY SOLVE
# ==============================================================================
# Normally, a function expects a fixed number of arguments.


def add(a, b):
    return a + b


print(add(5, 10))  # Output: 15

# But what if you don't know how many values the user will pass?
add(1, 2, 3, 4)  # Error

# That's where *args and **kwargs come in.

# ==============================================================================
# ARBITRARY ARGUMENTS (*args)
# ==============================================================================
# *args allows a function to receive any number of positional arguments.


def numbers(*args):
    print(args)


numbers(1, 2, 3, 4, 5)  # Output: (1, 2, 3, 4, 5)
# Python automatically packs all positional arguments into a tuple.


# ==============================================================================
# HOW *args WORKS
# ==============================================================================
def show(*args):
    print(args)


show("Eric", 25, "Ghana")

# Python sees:
args = ("Eric", 25, "Ghana")


# ==============================================================================
# LOOPING THROUGH *args
# ==============================================================================
def display(*args):
    for item in args:
        print(item)


display("Apple", "Banana", "Orange")

# # Output:
# Apple
# Banana
# Orange

# ==============================================================================
# REAL PROJECT EXAMPLE
# ==============================================================================
# Imagine calculating totals.


# Without *args:
def total(a, b, c):
    return a + b + c


# With *args:
def total(*numbers):
    return sum(numbers)


print(total(10, 20))
print(total(10, 20, 30))
print(total(10, 20, 30, 40))


# ===== NB. NAMING DOESN'T MATTER =====
# args is just a convention.
# These are equivalent:
def test(*args):
    pass


def test(*numbers):
    pass


def test(*values):
    pass


# ===== THE * IS WHAT MATTERS =====


# ==============================================================================
# MIXING NORMAL PARAMETERS AND *args
# ==============================================================================
def introduce(name, *hobbies):
    print(name)
    print(hobbies)


introduce("Eric", "Coding", "Football", "Music")

# # Output:
# Eric
# ('Coding', 'Football', 'Music')

# # Python assigns:
# name = "Eric"
# hobbies = ("Coding", "Football", "Music")


# ==============================================================================
# ARBITRARY KEYWORD ARGUMENTS (*kwargs)
# ==============================================================================
# **kwargs allows a function to accept any number of keyword arguments.


def person(**kwargs):
    print(kwargs)


person(name="Eric", age=25, country="Ghana")

# # Output:
{"name": "Eric", "age": 25, "country": "Ghana"}

# ==============================================================================
# HOW *kwargs WORKS
# ==============================================================================
# Python automatically packs keyword arguments into a dictionary.


def test(**kwargs):
    print(type(kwargs))


test(a=1, b=2)

# # Output:
# <class 'dict'>

# ==============================================================================
# ACCESSING VALUES
# ==============================================================================


def person(**kwargs):
    print(kwargs["name"])


person(name="Eric", age=25)

# # Output:
# Eric


# ==============================================================================
# LOOPING THROUGH *kwargs
# ==============================================================================
def person(**kwargs):
    for key, value in kwargs.items():
        print(key, value)


person(name="Eric", age=25, country="Ghana")

# # Output:
# name Eric
# age 25
# country Ghana

# ==============================================================================
# REAL PROJECT EXAMPLE
# ==============================================================================
# Building user profiles.


def create_user(**details):
    print(details)


create_user(username="eric123", email="eric@gmail.com", age=25, role="admin")

# # Output:
{"username": "eric123", "email": "eric@gmail.com", "age": 25, "role": "admin"}


# ==============================================================================
# COMBINING *args AND *kwargs
# ==============================================================================


def test(*args, **kwargs):
    print(args)
    print(kwargs)


test(10, 20, 30, name="Eric", country="Ghana")

# # Output:
(10, 20, 30)
{"name": "Eric", "country": "Ghana"}


# ==============================================================================
# PARAMETER ORDER RULES
# ==============================================================================
# Python requires this order:


def func(normal, *args, **kwargs):
    pass


# VALID
def func(a, *args, **kwargs):
    pass


# INVALID
def func(**kwargs, *args):
    pass

# ==============================================================================
# ARGUMENT UNPACKING WITH *
# ==============================================================================
# You can unpack a list into separate arguments.

numbers = [1, 2, 3]
print(*numbers)


# ===== PASSING INTO A FUNCTION =====
def add(a, b, c):
    return a + b + c


nums = [10, 20, 30]
print(add(*nums))


# ==============================================================================
# ARGUMENT UNPACKING WITH **
# ==============================================================================
# For dictionaries:

person = {"name": "Eric", "age": 25}


def display(name, age):
    print(name, age)


display(**person)


# ==============================================================================
# MOST COMMON REAL WORLD USES
# ==============================================================================
# Logging
def log(*messages):
    for msg in messages:
        print(msg)


# Configuration
def connect(**settings):
    print(settings)


# Frameworks
# Libraries like: Django,Flask,FastAPI,Pandas


# use *args and **kwargs heavily.
# Example:
class User:
    def __init__(self, **kwargs):
        self.data = kwargs


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# Syntax        Accepts                   Stored As
# *args         Positional arguments      Tuple
# **kwargs      Keyword arguments         Dictionary

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# Example:


def demo(*args, **kwargs):
    print(args)
    print(kwargs)


demo(10, 20, name="Eric", country="Ghana")

# Python internally creates:
args = (10, 20)
kwargs = {"name": "Eric", "country": "Ghana"}
