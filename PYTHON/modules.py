# CREATING YOUR OWN MODULES
def my_greetings(to = "World"):
    print(f"Hello {to}")

my_greetings()


# Different ways to import a module
"""
1. import module_name
2. from module_name import funtion
3. import module_name as what_you_want
4. from module_name import *
5. from module_name import funtion as what_you_want
"""

# The dir() function list all the functions name or variable names in a module for you
# E.g. 
import platform
a = dir(platform)
for i in a:
    print(i) # This list a the fnx in the platform module

# DATETIME MODULE
import datetime
x = datetime.datetime.now()
print(x)

x = datetime.datetime.now()
print(x.year)
print(x.strftime("%A"))

x = datetime.datetime(2020, 5, 17) # This prints the date that you have specified
print(x)

# MATH MODULE
import math
x = min(5, 10, 25)
y = max(5, 10, 25)
print(x)
print(y)

# The abs() function returns the absolute (positive) value of the specified number:
x = abs(-7.25)
print(x)

x = pow(4, 3)
print(x)

x = math.sqrt(64)
print(x)

print(math.pi)

# JSON MODULE
import json
x =  '{ "name":"John", "age":30, "city":"New York"}'
y = json.loads(x) # Converts JSON to pyton
print(y["age"])

x = {
  "name": "John",
  "age": 30,
  "city": "New York"
}

y = json.dumps(x) #  converts python to JSON
print(y) # the result is a JSON string

# Use the indent parameter to define the numbers of indents
json.dumps(x, indent=4)

json.dumps(x, indent=4, sort_keys=True) # This order the result

# RegEx(REGULAR EXPRESSION) MODULE
import re
txt = "The rain in Spain"
# Search the string to see if it starts with "The" and ends with "Spain"
x = re.search("^The.*Spain$", txt)

# The findall() function returns a list containing all matches.
txt = "The rain in Spain"
x = re.findall("ai", txt)
print(x)

# # Match Object
# .span() returns a tuple containing the start-, and end positions of the match.
# .string returns the string passed into the function
# .group() returns the part of the string where there was a match