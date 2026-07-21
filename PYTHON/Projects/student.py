students = []

# Defining Add student function
def add_student():
  while True:
    name = input("Enter your name: ").strip().title()
    if name.replace(" ","").isalpha():
      break
    else:
      print("Name must be an alphabet\n")
      continue

  while True:
    age = input("Your age: ")
    try:
      age = int(age)
      break
    except ValueError:
      print("Enter valid age\n")
      continue

  while True:
    course = input("Enter course offered: ").strip().title()
    if course.isalpha():
      break
    else:
      print("Name must be an alphabet\n")
      continue
  
  student = {"name": name, "age": age, "course": course}

  # Appending to sudents list
  students.append(student)

# Defining View student function
def view_student():
  for i, student in enumerate(students,1):
    print(f"{i}. {student["name"]} - {student["age"]} - {student["course"]}\n")

# Defining search student function
def search_student(): 
  while True:
    student_name = input("Enter search student name: ").title().strip()
    if student_name.replace(" ","").isalpha():
      break
    else:
      print("Enter valid student name\n")
      continue
  found = False
  for student in students:
      if student_name == student["name"]:
        print(f"{student["name"]} - {student["age"]} - {student["course"]}\n")
        found = True
        break
  if not found:
    print("Student not found\n")

# Defining the deleting student function
def delete_student():
  while True:
    student_name = input("Enter student name you want to delete: ").title().strip()
    if student_name.replace(" ","").isalpha():
      break
    else:
      print("Enter valid student name\n")
      continue
  for student in students:
    if student_name == student["name"]:
      n = (f"{student["name"]}")
      print(f"Are sure you want to delete {n} records\n1. Yes\n2. No")
      m = input("Confirm: ")
      if m == "1":
        students.remove(student)
        print("Deleted successfully\n")
        break
      else:
        print("Deletion cancelled\n")
        pass
  if student not in students:
    print("Student not found\n")

# Defining save file function
def save_student_file():
  n = input("Enter filename to save to: ")
  with open(f"{n}.txt","a") as file:
    file.write(f"{str(students)}\n")

# Defining loading student file
def load_student_file():
  n = input("Enter filename: ")
  with open(f"{n}.txt","r") as file:
    content = file.readlines()
    for _ in students:
      print(content)

while True:
  # Welcoming user and making menu
  print("Welcome to EMD Student Manager")
  print("\n1. Add Student\n2. View Studen\n3. Search Student\n4. Delete Student\n5. Save File\n6. Load from File\n7. Exit\n")
  choice = input("Enter preferred choice: ")
  if choice not in ["1","2","3","4","5","6","7"]:
    print("Invalid choice, try again")
    continue
  if choice == "1":
    add_student()
  elif choice == "2":
    view_student()
  elif choice == "3":
    search_student()
  elif choice == "4":
    delete_student()
  elif choice == "5":
    save_student_file()
  elif choice == "6":
    load_student_file()
  else:
    print("Thank you for using EMD Student Manager")
    break