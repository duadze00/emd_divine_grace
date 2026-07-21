import random

# Scoring user
user_score = 10

# Scoring computer
computer_score = 10

# Getting user game name
user = input("Enter username for the game: ").strip().title()

# Trying to let user pick from a range of numbers for the game
while True:
    print("Pick a range you want the random number to be generated from.\nStart point must be positive number and End point must be greater than start point\n")
    x = input("Enter start number: ")
    y = input("Enter ending number: ")
    try:
        x,y = int(x),int(y)
        if x >= 1 and y > x:
            print(f"Are you sure you want to start from {x} and end at {y}\n1. Yes\n2. No")
            while True:
                choice = input()
                if choice not in ["1","2"]:
                    print("Invalid input")
                    continue
                elif choice == "1":
                    break
                else:
                    continue
            break
        if x == y or y < x:
            print("End point must be greater than starting point")
            continue
    except ValueError:
        print("Starting and ending points must be numbers.\n")
        continue

def points():
    print(f"{user} points: {user_score}")
    print(f"Computer points: {computer_score}\n")

print("===== Welcome to Deduct Points Game =====\n")
# Main program
while True:
    # Creating the random number
    random_number = random.randint(x,y)

    # Letting user know his range
    print(f"Start point: {x}\nEnd point: {y}")
    # Letting user enter his lucky number
    lucky_number = input("Enter lucky guess: ")
    try:
        lucky_number = int(lucky_number)
        if lucky_number == random_number:
            computer_score -= 2
            print("Computer score: -2 points")
            points()
        elif lucky_number != random_number:
            user_score -= 2
            print(f"{user} score: -2 points")
            points()
        if user_score == 0:
            print(f"Oops, Computer won the game with {computer_score} points")
            break
        elif computer_score == 0:
            print(f"Congratulations {user}\nYou won the game with {user_score} points")
            break
    except ValueError:
        print("Invalid input, provide a number")