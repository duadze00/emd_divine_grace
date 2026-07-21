# The try block lets you test a block of code for errors.

# The except block lets you handle the error.

# The finally block lets you execute code, regardless of the result of the try- and except blocks.

# THIS IS A BAD WAY OF HANDLING ERRORS
try:
    print(x)
except:
    print("An error occured")


# Use else keyword to define a block of code to be executed if no errors were raised
try:
  print("Hello")
except:
  print("Something went wrong")
else:
  print("Nothing went wrong")


# The finally block, if specified, will be executed regardless if the try block raises an error or not.
try:
  print(x)
except:
  print("Something went wrong")
finally:
  print("The 'try except' is finished")

# Raise an exception

# To throw (or raise) an exception, use the raise keyword
x = -1

if x < 0:
  raise Exception("Sorry, no numbers below zero")

# You can define what kind of error to raise, and the text to print to the user.
y = input("Enter a number: ")
if not type(y) is int:
  raise TypeError("Only integers are allowed")