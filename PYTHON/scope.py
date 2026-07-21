# LOCAL SCOPE
def myfunc():
  x = 300
  def myinnerfunc():
    print(x)
  myinnerfunc()

myfunc()

# GLOCAL SCOPE
x = 300
def myfunc():
  print(x)

myfunc()
print(x)

# VARIABLE CAN BE LOCAL OR GLOBAL DEPENDING ON WHERE THEY ARE CREATED AND WHERE THEY ARE BEEN USED
x = 300
def myfunc():
  x = 200
  print(x)

myfunc() # This will print 200
print(x) # This will print 300

# MAKING LOCAL VARIABLE BECOME GLOBAL
x = "Eric Mawule Duadze"
def name():
    global x
    x = "Chilling Vibes"
    print(x)

name() # This will print "Chilling Vibes"
print(x) # This will print "Chilling Vibes" because we are using the global key word

