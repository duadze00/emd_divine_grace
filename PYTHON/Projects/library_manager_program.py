import json

#  A program to add books, borrow books, return books, and track available copies.

# I need to know total book available in the library
total_books = 100

# Get types of books in library
books_in_library = [
    "Science",
    "English",
    "Chemistry",
    "Biology",
    "Physics",
    "Elective Mathematics",
]


# Add books to the library
def add_books():
    global total_books
    new_book_added = input("Enter subject to add to the library: ").title().strip()
    while True:
        number_of_new_book = input("Enter number of books to add: ")
        try:
            number_of_new_book = int(number_of_new_book)
            if not new_book_added in books_in_library:
                total_books += number_of_new_book
                books_in_library.append(new_book_added)
                print(
                    f"{number_of_new_book} new {new_book_added} book(s) to the library added succesfully"
                )
            else:
                total_books += number_of_new_book
                print(
                    f"{number_of_new_book} {new_book_added} book(s) added to the library successfully"
                )
            break
        except ValueError:
            print("Enter valid number")
            continue


# Borrow books from library
def borrow_books():
    global total_books
    borrower_name = input("Enter borrower's name: ").strip().title()
    while True:
        number_of_books = input("Enter number of books to borrow: ")
        try:
            number_of_books = int(number_of_books)
            if number_of_books <= 0:
                print(f"Can not borrow {number_of_books} book, try again")
                continue
            elif number_of_books >= total_books / 2:
                print(
                    f"Can not borrow {number_of_books} books from this library.\nTry something less than that."
                )
                continue
            else:
                total_books -= number_of_books
                break
        except ValueError:
            print("Enter valid number of books to borrow.")
    while True:
        book_type = (
            input("Enter subject to borrow or enter 0 not to borrow: ").strip().title()
        )
        if book_type == "0":
            print("Thank you for choosing our library.")
            break
        if not book_type in books_in_library:
            print(
                "Book doesn't exist here.\nYou can not borrow book that doesn't exist in this librabry."
            )
            continue
        else:
            try:
                with open("Borrower.json", "r") as file:
                    borrowers = json.load(file)
            except (FileNotFoundError, json.JSONDecodeError):
                borrowers = []
            borrowers_list = {
                "Name": borrower_name,
                "Subject": book_type,
                "Number of books borrowed": number_of_books,
                "Total library books left": total_books,
            }
            borrowers.append(borrowers_list)
            with open("Borrower.json", "w") as file:
                json.dump(borrowers, file, indent=4)
            return book_type


# Return books to the library
def return_books():
    borrowers_name = input("Enter your name: ").title().strip()
    while True:
        number_of_books_to_return = input("Enter number of books you're returning: ")
        try:
            number_of_books_to_return = int(number_of_books_to_return)
            break
        except ValueError:
            print("Enter valid number.")
    try:
        with open("Borrower.json", "r") as file:
            borrowers = json.load(file)
            found = False
            for i in borrowers:
                if borrowers_name == i["Name"]:
                    if number_of_books_to_return == i["Number of books borrowed"]:
                        borrowers.remove(i)
                    elif (
                        number_of_books_to_return <= 0
                        or number_of_books_to_return > i["Number of books borrowed"]
                    ):
                        print(
                            f"Can not return {number_of_books_to_return} books, check and try again"
                        )
                    else:
                        i["Number of books borrowed"] -= number_of_books_to_return
                        i["Total library books left"] += number_of_books_to_return
                    found = True
                    break
            if not found:
                print("Borrower not found.")
    except FileNotFoundError, json.JSONDecodeError:
        print("No history for such acitivity")

    with open("Borrower.json", "w") as file:
        json.dump(borrowers, file, indent=4)


# Keep track of books
def keep_track_of_books():
    pass


while True:
    print(
        "\nWelcome to EMD Divine Grace Library\n\n1. Add Book(s)\n2. Borrow Book(s)\n3. Return Book(s)\n4. Track Book(s)\n0. Quit\n"
    )
    choice = input("Enter preferred choice: ")
    if not choice in ["1", "2", "3", "4", "0"]:
        print("Invalid choice, try again")
        continue
    elif choice == "1":
        add_books()
    elif choice == "2":
        borrow_books()
    elif choice == "3":
        return_books()
    elif choice == "4":
        keep_track_of_books()
    else:
        print("Thank you for choosing us\nHave a nice day")
        break
