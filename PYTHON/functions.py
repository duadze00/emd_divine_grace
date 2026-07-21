def my_name():
    print("Hello user welcome to functions")

my_name()

# Defaut parameter value
def name(to = "World"):
    print(f"Hello {to}, welcome to python")
name()
name("Eric")

# Return values
def printable(name):
    return name

print(printable("Eric"))

# ARBITRARY ARGUMENTS, *args
def multiple_args(*names):
    print(f"Youre the youngest {names[0]}")
multiple_args("Eric")
multiple_args("Eric","Mawule","Duadze")

def my_function(child3, child2, child1):
  print("The youngest child is " + child3)

my_function(child1 = "Emil", child2 = "Tobias", child3 = "Linus")

# Arbitrary Keyword Arguments, **kwargs
def my_function(**kid):
  print("His last name is " + kid["lname"])

my_function(fname = "Tobias", lname = "Refsnes")

# Passing a list as an argument
def my_function(food):
  for x in food:
    print(x)
fruits = ["apple", "banana", "cherry"]
my_function(fruits)

# using pass in a statement
def inline():
   pass

# Recursion fnx
def tri_recursion(k):
  if(k > 0):
    result = k + tri_recursion(k - 1)
    print(result)
  else:
    result = 0
  return result

print("\n\nRecursion Example Results")
tri_recursion(6)
# LEARN HOW TO DO THE RECURSION MORE YOURSELF