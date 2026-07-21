# Importing random module
import random

# Giving the initial score for the game
score = 0
machine_score = 0

# Taking user name for the game
name = input("Enter player name: ").title()

# Allowing user to play until the want to quit
while True:

  # Creating the random number
  guess = random.randint(0,2)

  # Allowing user to input lucky or random number
  pick = input("Enter lucky number or press Q to quit the game: ")
  if pick.lower().strip() == "q":
    print("\nAre sure you want to quit\n1. Yes\n2. No")
    close = input()

    # Making sure user does not quit the game by mistake
    if close not in ["1","2"]:
      for _ in range(3):
        print("\nAre sure you want to quit\n1. Yes\n2. No")
        close = input()
        if close == "1":
          break
        elif close == "2":
          print("Existing cancelled")
          continue
    if close == "1":
      print("Thank you for using EMD Guess Game\nSee you soon")
      break
    elif close == "2":
      continue
  
  # Converting user input into a number and handling errors
  try:
    pick = int(pick)
  except ValueError:
    print("Invalid input, enter a number\n")
    continue

  # If user score is correct 2 points is awarded
  if pick == guess:
    print("Congratulation that is correct\n2 points earned\n")
    score += 2
  else:
    machine_score += 2
    print("Oops, try again")
    print(f"Random number is {guess} and You choose {pick}\n")

# Printing user total scores
print(f"\n{name} score: {score} points")
print(f"Computer score: {machine_score} points")

# Checking whether user won or computer
if score > machine_score:
  print(f"Congratulations {name}\nYou won the game\n")
elif score < machine_score:
  print("Computer won\nTry again next time\n")
else:
  print("There was no winner\nThe scores are equal\n")