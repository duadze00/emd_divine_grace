import csv


# Write a program that stores student names, their marks, and calculates the average, highest, and lowest score

while True:
    name = input("Enter student name: ").strip().title()
    if " " in name:
        break
    elif not name.isalpha():
        print(f"{name} is invalid try again\n")
        continue
    break

while True:
    marks = input("Enter student score: ")
    try:
        marks = int(marks)
        if marks < 0:
            print("Invalid, score can't be less than 0.\n")
            continue
        elif marks > 100:
            print("Invalid, score can't be greater than 100\n")
            continue
        break
    except ValueError:
        print("Invalid input, enter valid score\n")

if marks >= 80:
    grade = "A"
elif marks >= 70:
    grade = "B"
elif marks >= 60:
    grade = "C"
elif marks >= 50:
    grade = "D"
elif marks >= 40:
    grade = "E"
else:
    grade = "F"


def save_student_info():
    student_info = [{"Name": name, "Marks": marks, "Grade": grade}]
    try:
        with open("Student_information.csv", "a") as file:
            writer = csv.writer(file)
            writer.writerow(student_info)
    except FileNotFoundError:
        with open("Student_information.csv", "w") as file:
            writer = csv.writer(file)
            writer.writerow(student_info)


def read_student_info():
    try:
        with open("Student_information.csv", "r") as file:
            readers = csv.reader(file)
            for reader in readers:
                for i in reader:
                    print(i)

    except FileNotFoundError:
        print("No student data found. \n")


save_student_info()
read_student_info()
