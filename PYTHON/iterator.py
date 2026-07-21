# We us the iter() and next() for iteration
# The for loop actually creates an iterator object and executes the next() method for each loop.

# __iter__() and __next__() are used in class if you want to iterate over datas in classes

mytuple = ("apple", "banana", "cherry")
myit = iter(mytuple)

print(next(myit))
print(next(myit))
print(next(myit))

mystr = "banana"
myit = iter(mystr)

print(next(myit))
print(next(myit))
print(next(myit))
print(next(myit))
print(next(myit))
print(next(myit))


class School:
    def __iter__(self):
        self.a = 1
        return self
    
    def __next__(self):
        x = self.a
        self.a += 1
        return x
    
myschool = School()
my_iterator = iter(myschool)

print(next(my_iterator))
print(next(my_iterator))
print(next(my_iterator))
print(next(my_iterator))
print(next(my_iterator))


class Odd:
    def __iter__(self):
        self.number = 0
        return self
    def __next__(self):
        if self.number <= 20:
            n = self.number
            self.number +=3
            return n
        else:
            raise StopIteration
    
myiterator = Odd()
m = iter(myiterator)
for i in m:
    print(i)
