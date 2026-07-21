# Define a class by using the class keyword
class Myclass:
    x = 5


# Object is define using the class name
object1 = Myclass()

# We assess the value of an object in a class by using the object
x = object1.x
print(x)
# OR
print(object1.x)


# The __init__() fnx
# NB. All class has an __init__ fnx and it always get executed when the class is being initiated automatically
class People:
    def __init__(self, name, age):
        self.name = name
        self.age = age


# Creating object to assess the values
person1 = People("John", 34)
# Getting the values
print(person1.age)
print(person1.name)


# Methods is a function that belongs to an object or class
class People:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # Method in object
    # NB. Always pass the self argument or parameter in every method. The self could be anything eg mysillyobject and use it in place of the self
    def tall_people(self):
        print("This people are very tall.")


person1 = People("John", 34)
person1.tall_people()

# Modifying the properties of an object. Like this
person1.age = 100

# Deleting the properties of an object. Like this
del person1.name
# Or the the entire object like this
del person1


# The pass statement can also be used in a class if the content is not known yet
class Village:
    pass


# INHERITANCE
# Inheritance allows us to define a class that inherits all the methods and properties from another class.

# Parent class is the class being inherited from, also called base class.

# Child class is the class that inherits from another class, also called derived class.


# THIS IS PARENT CLASS
class Capitals:
    def __init__(self, city_name):
        self.city_name = city_name

    def kumasi(self):
        print("Kumasi is the capital of Ashanti Region")

    def accra(self):
        print("Accra is capital of Greater Accra Region")


town1 = Capitals("Kumasi")
town1.kumasi()


# CHILD CLASS
# This child class (Villages) is inheriting the parent class (Capitals)
class Villages(Capitals):
    def __init__(self, city_name):
        # if you add the init to only the child, it no longer inherit the parent __init__ fnx. So it need to add the parent __init__ fnx.
        # As in below
        Capitals.__init__(self, city_name)

        # The best and moderm way is to use the super() fnx
        def __init__(self, city_name):
            super(self, city_name)


# You can use the chill class (Villages) to create an object
village1 = Villages("Accra")
village1.accra()

# CLEANER WAY FOR THE CODE ABOVE


# Parent class
class Capitals:
    def __init__(self, city_name):
        self.city_name = city_name

    def kumasi(self):
        print("Kumasi is the capital of Ashanti Region")

    def accra(self):
        print("Accra is capital of Greater Accra Region")


town1 = Capitals("Kumasi")
town1.kumasi()


# Child class (Viallages) inheriting parent class (Capitals)
class Villages(Capitals):
    def __init__(self, city_name):
        super().__init__(city_name)
        self.village = "Assin Breku"


village1 = Villages("Accra")
x = village1.village
print(x)

# __iter__() and __next__() are used in class if you want to iterate over datas

# The __iter__() method acts similar, you can do operations (initializing etc.), but must always return the iterator object itself.

# The __next__() method also allows you to do operations, and must return the next item in the sequence

"""
Summary

Method => Uses => Purpose
Instance => self => object data
Class => cls => class data
Static => none => utility
"""


class Person:
    country = "Ghana"  # class or static attributes. Defined directly inside class. Shared by all objects

    def __init__(self, name, age):
        self.name = name  # instance attribute. Uses self to define it
        self.__age = age  # private

    # All instance methods uses self
    def show(self):  # instance method
        print(f"{self.name}, {self.__age}, {self.country}")

    # All class methods uses cls
    @classmethod  # Declare @classmethod whenever creating one
    def change_country(cls, new_country):  # class method uses cls insted of self
        cls.country = new_country

    @staticmethod  # Use @staticmethod to declare static method
    def is_adult(age):
        return age >= 18

    @property  # Getter method. It uses @property to define getter
    def age(self):
        return self.__age

    @age.setter  # Setter method. It uses @example.setter to define setter
    def age(self, value):
        if value > 0:
            self.__age = value


p = Person("Eric", 20)
p.show()

print(Person.is_adult(20))

p.age = 25
print(p.age)

Person.change_country("USA")
p.show()


# Encapsulation (Data Hiding)
# Encapsulation = protecting your data
# Public

# self.name = "Eric"
# Protected (convention)

# self._age = 20
# Private
# self.__salary = 5000
# Private cannot be accessed directly:

# obj.__salary  ERROR


# Getters and Setters
# Used to control access to private variables
class Person:
    def __init__(self):
        self.__age = 0

    def get_age(self):
        return self.__age

    def set_age(self, value):
        if value > 0:
            self.__age = value
        else:
            print("Invalid age")


# Modern Python Way (Property)
class Person:
    def __init__(self):
        self.__age = 0

    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self, value):
        if value > 0:
            self.__age = value


# Polymorphism (Many Forms)
# Same method name, different behavior
# Example


class Dog:
    def speak(self):
        print("Bark")


class Cat:
    def speak(self):
        print("Meow")


animals = [Dog(), Cat()]

for animal in animals:
    animal.speak()


# Polymorphism With Inheritance
class Animal:
    def speak(self):
        print("Some sound")


class Dog(Animal):
    def speak(self):
        print("Bark")


# This is also called method overriding


# Abstraction (Important)
# Hiding implementation details

from abc import ABC, abstractmethod

# ABC == Abstract Base Class


class Animal(ABC):
    @abstractmethod
    def sound(self):
        pass


# Forces child classes to implement method


# Object constuctor
def __init__(self):
    print("Object created")


# Object destructor
def __del__(self):
    print("Object destroyed")
