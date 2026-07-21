# NB. Make sure whenever a making inheritance you pass the arguments in the parent Class to the subclass or child class
# Both the __init__ and super() function

# 👉 If a parent class requires parameters, ALL child classes must pass them unless you override the logic.


# Main student class
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def nursery(self):
        pass

    def kindagatern(self):
        pass

    def primary(self):
        pass

    def junior_high(self):
        pass


# Subclass for Student class
class Senior_student(Student):
    def __init__(self, name, age):
        super().__init__(name, age)

    def senior_high(self):
        pass


# Subclass for Senior_student class
class Tertiary_student(Senior_student):
    def __init__(self, name, age):
        super().__init__(name, age)
        pass


# Subclass for Tertiary_student class
class Advanced_student(Tertiary_student):
    def __init__(self, name, age):
        super().__init__(name, age)
        pass


beginner = Student("Eric", 23)  # Declaring an Object with Student class
senior_level = Senior_student(
    "Kwadwo", 26
)  # Declaring an Object with Senior_student class
tertiary_level = Tertiary_student(
    "Mawule", 24
)  # Declaring an Object with Tertiary_student class
advanced_level = Advanced_student(
    "Duadze", 25
)  # Declaring an Object with Advanced_student class

# Multiple object for one class (Advanced_student class)
advanced_level_1 = Advanced_student("Emmanuel", 25)
advanced_level_2 = Advanced_student("Benjamin", 25)

# Attributes of a Class or Object or Calling class or obeject attributes
name = beginner.name
age = beginner.age
name1 = advanced_level_1.name
age1 = advanced_level_1.age
print(name)
print(age)
print(name1)
print(age1)


# Declaring Person class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def show(self):
        print(self.name, self.age)


# Declaring Student class inheriting from the Person class
class Student(Person):
    def __init__(self, name, age, course):
        super().__init__(name, age)
        self.course = course

    def study(self):
        print(self.name, "is studying", self.course)


# Creating an object
s1 = Student("Eric", 22, "Sonography")

# Accessing the attribute
s1.show()
s1.study()


# Overriding Methods
class Animal:
    def speak(self):
        print("Animal sound")


class Dog(Animal):
    def speak(self):
        print("Bark")


# NB. The method speak in the Dog class is overriding the Animal  class
dog1 = Dog()
dog1.speak()  # This will print "Bark" instead of the "Animal sound"


# CLEAN PROFESSIONAL WAY TO WRITE CLASSES


# 1. Define classes
class Person:
    def __init__(self, name):
        self.name = name


class Student(Person):
    def __init__(self, name, level):
        super().__init__(name)
        self.level = level


# 2. Program starts
def main():
    # Take input
    name = input("Enter name: ")
    level = input("Enter level: ")

    # Create object
    student = Student(name, level)

    # Use object
    print(student.name, student.level)


if __name__ == "__main__":
    main()


# AI HELPED WITH THE CODE BELOW

# ------------------------------
# PROFESSIONAL OOP PYTHON EXAMPLE
# ------------------------------


# 1. Define classes
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display_info(self):
        return f"{self.name}, you're {self.age} years old"


class Student(Person):
    def __init__(self, name, age, course):
        super().__init__(name, age)
        self.course = course

    def display_info(self):
        return f"{self.name} is a student studying {self.course}"


class Teacher(Person):
    def __init__(self, name, age, qualification):
        super().__init__(name, age)
        self.qualification = qualification

    def display_info(self):
        return f"{self.name} is {self.age} years old and holds a {self.qualification} degree"


class Course:
    def __init__(self, course_name):
        self.course_name = course_name

    def display_info(self):
        return f"Course: {self.course_name}"


# 2. Program logic
def main():
    # Input: name
    name = input("Enter your name: ").strip().title()

    # Input: age with validation
    while True:
        age_input = input("Enter your age: ")
        try:
            age = int(age_input)
            break
        except ValueError:
            print("Invalid age, try again.\n")

    # Input: course
    course_name = input("Enter your course: ").strip().title()

    # Input: qualification
    qualification = input("Enter your degree type: ").strip().title()

    # Create objects
    student = Student(name, age, course_name)
    teacher = Teacher(name, age, qualification)
    course = Course(course_name)

    # Display info using methods
    print("\n--- Information ---")
    print(student.display_info())
    print(teacher.display_info())
    print(course.display_info())


# 3. Entry point
if __name__ == "__main__":
    main()


# ------------------------------
# MENU-DRIVEN OOP EXAMPLE
# ------------------------------


class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display_info(self):
        return f"{self.name}, you're {self.age} years old"


class Student(Person):
    def __init__(self, name, age, course):
        super().__init__(name, age)
        self.course = course

    def display_info(self):
        return f"{self.name} is a student studying {self.course}"


class Teacher(Person):
    def __init__(self, name, age, qualification):
        super().__init__(name, age)
        self.qualification = qualification

    def display_info(self):
        return f"{self.name} is {self.age} years old and holds a {self.qualification} degree"


# Main menu function
def main_menu():
    print("Welcome! Choose your role:")
    print("1. Student")
    print("2. Teacher")
    print("3. Exit")

    while True:
        choice = input("Enter choice (1-3): ").strip()
        if choice in ["1", "2", "3"]:
            return choice
        print("Invalid choice, try again.")


# Input helpers
def get_name():
    return input("Enter your name: ").strip().title()


def get_age():
    while True:
        age_input = input("Enter your age: ")
        try:
            age = int(age_input)
            return age
        except ValueError:
            print("Invalid age. Try again.")


def get_course():
    return input("Enter your course: ").strip().title()


def get_qualification():
    return input("Enter your degree type: ").strip().title()


# Main program
def main():
    while True:
        choice = main_menu()
        if choice == "1":  # Student
            name = get_name()
            age = get_age()
            course = get_course()
            student = Student(name, age, course)
            print("\n--- Student Information ---")
            print(student.display_info())
        elif choice == "2":  # Teacher
            name = get_name()
            age = get_age()
            qualification = get_qualification()
            teacher = Teacher(name, age, qualification)
            print("\n--- Teacher Information ---")
            print(teacher.display_info())
        else:  # Exit
            print("Goodbye!")
            break

        print("\n")  # space before next iteration


if __name__ == "__main__":
    main()
