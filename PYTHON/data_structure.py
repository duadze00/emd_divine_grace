# LIST
# Loop through a list
numbers = [1, 2, 3, 4]
for num in numbers:
    print(num)

# Loop through a list with index
for i in range(len(numbers)):
    print(i, numbers[i])

# List key methods
items = ["Apple", "Mango", "Banana"]

numbers.append(5)
numbers.remove(2)
numbers.pop()
numbers.sort()
numbers.reverse()
numbers.clear()
numbers.count(1)
numbers.insert(1, "Eric")
numbers.extend(items)
new_numbers = numbers.copy()
numbers.index("Mango")
sorted(numbers)

# List comprehension
my_list = [x for x in numbers]
print(my_list)

# TUPLES
point = (10, 20)

# Loop through tuples
for i in point:
    print(i)

# List key methods
point.count("Eric")
point.index(20)

# Tuple comprehension
my_point = (y for y in point)
for i in my_point:
    print(i)

# SET
my_set = {1, 2, 3, 3}
other_set = {"Eric", "Mawule", "Duadze", True}
their_set = {0, 1, 3, 10, 4}

# Loop through tuples
for i in my_set:
    print(i)

# Set key methods
my_set.add("Eric")
my_set.clear()
that_set = my_set.copy()
my_set.difference(their_set)
my_set.difference_update(other_set)
my_set.discard(1)
my_set.union(their_set)
my_set.update(their_set, other_set)
my_set.remove(0)
their_set.pop()
their_set.intersection(my_set)
# There are more set method. Try them out

# Tuple comprehension
new_set = {i for i in my_set}
print(new_set)

# DICTIONARIES
student = {"name": "Eric", "age": 20}

# Loop through dictionary
for key in student:
    print(f"{key}: {student[key]}")
    # OR
for key, value in student.items():  # Better way
    print(f"{key}: {value}")

# Dictionary comprehension
mine = {x for x in student if student["age"] % 2 == 0}

# NESTED DATA STRUCTURE
students = [
    {"name": "Eric", "score": 80},
    {"name": "Ama", "score": 90},
    {"name": "Ella", "score": 100},
]

for student in students:
    print(f'{student["name"]}: {student["score"]}')

students = {
    "Eric": {"Math": 85, "English": 78, "Science": 92},
    "Ama": {"Math": 90, "English": 88, "Science": 95},
    "Kojo": {"Math": 70, "English": 65, "Science": 80},
}

# Outer loop → goes through each student
for student, subjects in students.items():
    print(f"\nStudent: {student}")
    # Inner loop → goes through each subject of that student
    for subject, score in subjects.items():
        print(f"{subject}: {score}")

# This calculates the average of students
for student, subjects in students.items():
    print(f"\nStudent: {student}")
    total = 0
    count = 0
    for subject, score in subjects.items():
        print(f"{subject}: {score}")
        total += score
        count += 1
    average = total / count
    print(f"  Average: {average:.2f}")


# NESTED LOOPS
matrix = [[1, 2], [3, 4]]

for row in matrix:
    for value in row:
        print(value)

# LOOP PATTERNS

# Count occurrences
numbers = [1, 2, 3, 4, 6, 8]
count = 0
for num in numbers:
    if num % 2 == 0:
        count += 1
print(f"Counter: {count}")

# Filtering
numbers = [1, 2, 3, 4]
even = []
for i in numbers:
    if i % 2 == 0:
        even.append(i)
print(f"Filtered list: {even}")


# Advanced Data Structures
# # Stacks (LIFO - Last In First Out)
stack = []
stack.append(1)
stack.append(2)
stack.pop()  # removes last item

# Loop
while stack:
    print(stack.pop())
# 👉 Used in: undo operations, recursion simulation and backtracking

# # Queues (FIFO - First In First Out)
from collections import deque

queue = deque()
queue.append(1)
queue.append(2)
queue.popleft()

# Loop
while queue:
    print(queue.popleft())
# 👉 Used in: scheduling and BFS (important algorithm)

# Hash Tables
d = {"a": 1, "b": 2}
print(d["a"])


# # ADVANCED LOOP TECHNIQUES
# Enumerate
numbers = [1, 2, 3, 4]
for i, j in enumerate(numbers):  # Best Practices
    print(f"{i+1}: {j}")
    # OR
for i in enumerate(numbers, 1):
    print(i)

# Zip (Looping Multiple Lists)
names = ["Eric", "Ama"]
scores = [80, 90]
for name, score in zip(names, scores):
    print(f"Name: {name}, Score: {score}")

# While Loops (Control-Based Loops)
i = 0
while i < 5:
    print(i)
    i += 1

# Loop + Condition Optimization
numbers = [1, 2, 3, 4, 10, 19]

# # Bad practice
for i in range(len(numbers)):
    if numbers[i] > 5:
        print(numbers[i])

# # Good practice
for num in numbers:
    if num > 5:
        print(num)

numbers = [1, 2, 3, 4]
# Two Pointer Technique
left = 0
right = len(numbers) - 1

while left < right:
    print(numbers[left], numbers[right])
    left += 1
    right -= 1

# Sliding Window
window_sum = sum(numbers[:3])

for i in range(3, len(numbers)):
    window_sum += numbers[i]
    window_sum -= numbers[i - 3]

# Frequency Counter
freq = {}

for num in numbers:
    freq[num] = freq.get(num, 0) + 1


# Recursion
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)


print(factorial(4))


# Tree Traversal
def traverse(node):
    if node:
        print(node.value)
        traverse(node.left)
        traverse(node.right)


print(traverse())
