# =================================================================================================
# MANUALLY OPENING ANG CLOSING A FILE
# =================================================================================================
# ========= OPENING A FILE =========
# In Python, the open() function is used to open a file. You need two things:
# File name – the name of the file you want to work with.
# Mode – what you want to do with the file:
"""
MODES     DESCRIPTION
'r'   →   read (default)
'w'   →   write (creates file if not exists, overwrites if exists)
'a'   →   append (adds data to the end of file)
'x'   →   create a new file (fails if file exists)
'b'   →   binary mode (for images, pdfs, etc.)
"""

"""
BINARY MODES               DESCRIPTION
rb             →           read
wb             →           write
ab             →           append
"""
# Used for: Images, PDFs, Videos, Pickles

file = open("example.txt", "w")  # Open file for writing

# ========= WRITING TO A FILE =========
# Once the file is open in 'w' or 'a' mode, you can write using:
"""
write()       →   writes a string
writelines()  →   writes a list of strings
"""

file = open("example.txt", "w")
file.write("Hello world!\n")  # Adds a newline at the end
file.write("This is my first file.\n")
file.close()  # Always close the file

"""
Important: Always close the file with close() to save changes properly.
"""

# ========= READING FROM A FILE =========
# Open the file in 'r' mode:
file = open("example.txt", "r")
content = file.read()  # Reads the whole file as a string
print(content)
file.close()

"""
Other reading options:
readline()    →   reads one line at a time
readlines()   →   reads all lines as a list
"""

file = open("example.txt", "r")
lines = file.readlines()
print(lines)  # ['Hello world!\n', 'This is my first file.\n']
file.close()

# Read Fixed Number Of Characters
file = open("example.txt", "r")
content = file.read(10)
print(content)
file.close()

# =================================================================================================
# AUTOMATICALLY OPENING ANG CLOSING A FILE (BEST PRACTICE)
# =================================================================================================
# Python’s with statement automatically closes the file for you, which is safer:

# WRITING A FILE
with open("example.txt", "w") as file:
    file.write("Saved using 'with' statement!\n")

# READING ENTIRE FILE
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# READING FIXED NUMBER OF CHARACTERS
with open("example.txt") as file:
    print(file.read(10))

# READING ONE LINE
with open("example.txt") as file:
    print(file.readline())

# READ ALL LINES
with open("example.txt") as file:
    lines = file.readlines()
# OUTPUT:
# [
#     "line1\n",
#     "line2\n",
#     "line3\n"
# ]

# APPENDING TO AN EXISTING FILE
with open("example.txt", "a") as file:
    file.write("Adding a new line!\n")


# =================================================================================================
# FILE POINTER
# =================================================================================================
# CURRENT POSITION ( file.tell() )
with open("example.txt") as file:
    file.read(5)
    print(file.tell())


# MOVE CURSOR( file.seek(0) )
# Back to beginning
with open("example.txt") as file:
    print(file.read(5))
    file.seek(0)
    print(file.read(5))

# =================================================================================================
# WRITING FILES
# =================================================================================================
# SINGLE WRITE
with open("data.txt", "w") as file:
    file.write("Hello")

# MULTIPLE WRITES
with open("data.txt", "w") as file:
    file.write("A")
    file.write("B")
    file.write("C")

# WRITELINES
lines = ["Eric\n", "John\n", "Mary\n"]

with open("users.txt", "w") as file:
    file.writelines(lines)

# =================================================================================================
# WORKING WITH PATHS
# =================================================================================================
# OLD WAYS
import os

path = os.path.exists("data.txt")
print(path)

# MODERN WAY
from pathlib import Path

# CREATE PATH
from pathlib import Path

file = Path("data.txt")

# CHECK EXISTENCE
exist = file.exists()
print(exist)

# CREATE FOLDER
Path("reports").mkdir()

# NESTED FOLDER
Path("2026/reports").mkdir(parents=True)

# =================================================================================================
# JSON
# =================================================================================================
"""
JSON is everywhere.
APIs send JSON.
Configuration files use JSON.
Web applications use JSON.
"""

# PYTHON
user = {"name": "Eric", "age": 23}

# JSON
{"name": "Eric", "age": 23}

# ===== SAVE JSON =====
import json

with open("users.json", "w") as file:
    json.dump(user, file)

# ===== LOAD JSON =====
with open("users.json") as file:
    data = json.load(file)

print(data)

# ===== PRETTY JSON =====
with open("users.json", "w") as file:
    json.dump(user, file, indent=4)


# ===== DUMPS AND LOADS =====
content = json.dumps(user)
print(content)
data = json.loads(content)
print(data)

# =================================================================================================
# CSV FILES
# =================================================================================================
# CSV = Comma Separated Values
# Used everywhere: Excel, Data analysis, Reporting

# ===== WRITE CSV =====
import csv

with open("users.csv", "w", newline="") as file:
    writer = csv.writer(file)

    writer.writerow(["name", "age"])
    writer.writerow(["Eric", 23])

# ===== READ CSV =====
with open("users.csv") as file:
    reader = csv.reader(file)

    for row in reader:
        print(row)

# ===== DICTIONARY CSV WRITER =====
with open("users.csv") as file:
    writer = csv.DictWriter(file, fieldnames=["anything", "anything", ...])
    writer.writerow({"anything": ..., "anything": ..., ...: ...})


# ===== DICTIONARY CSV READER =====
with open("users.csv") as file:
    reader = csv.DictReader(file)

    for row in reader:
        print(row["name"])

# =================================================================================================
# PICKLE
# =================================================================================================
# Pickle stores Python objects directly.
"""
WHY PICKLE
Without pickle:
user = {"name": "Eric"}
Must convert manually.

With pickle:
pickle.dump(user, file)
"""
# Python stores object exactly.

# ===== SAVE OBJECT =====
import pickle

data = {"name": "Eric", "score": 100}

with open("data.pkl", "wb") as file:
    pickle.dump(data, file)

# ===== LOAD OBJECT =====
with open("data.pkl", "rb") as file:
    data = pickle.load(file)

print(data)

"""
REAL USE CASES
Caching: trained_model.pkl
Machine learning: model.pkl
Game saves: save.pkl
"""

# ===== PICKLE SECURITY =====
"""
Never load unknown pickle files.
pickle.load(file)
can execute malicious code.
Only load trusted pickles.
"""

# =================================================================================================
# BINARY FILES
# =================================================================================================
# ===== IMAGES =====
with open("image.jpg", "rb") as file:
    data = file.read()

# ===== COPY IMAGE =====
with open("image.jpg", "rb") as source:
    with open("copy.jpg", "wb") as dest:
        dest.write(source.read())

# =================================================================================================
# EXCEPTIONS
# =================================================================================================
# Professional code never assumes files exist.
# BAD
with open("data.txt") as file:
    print(file.read())

# GOOD
try:
    with open("data.txt") as file:
        print(file.read())

except FileNotFoundError:
    print("File not found")

# =================================================================================================
# LARGE FILES
# =================================================================================================
# BAD
with open("data.txt") as file:
    print(file.read())
# Loads entire file into memory.

# GOOD
with open("huge.log") as file:
    for line in file:
        print(line)
# Reads line-by-line.

# =================================================================================================
# LOGGING
# =================================================================================================
# Real applications don't use:
print()

# They use:
import logging

logging.basicConfig(filename="app.log", level=logging.INFO)
logging.info("User logged in")  # 2026-06-16 User logged in

# =================================================================================================
# TEMPORARY FILES
# =================================================================================================
from tempfile import TemporaryFile

with TemporaryFile() as file:
    file.write(b"Hello")
# Python automatically cleans it up.

# =================================================================================================
# COMPRESSION
# =================================================================================================
# Real systems often store compressed files.
import gzip

# ===== WRITE =====
with gzip.open("data.gz", "wt") as file:
    file.write("Hello")

# ===== READ =====
with gzip.open("data.gz", "rt") as file:
    print(file.read())

"""
===== ALSO ====
zipfile
tarfile
"""


# =================================================================================================
# EXAMPLE
# =================================================================================================

# Getting input from user
names = []

for _ in range(3):
    name = input("What's your name? ")
    names.append(name)

for name in sorted(names):
    print(f"Hello, {name}")

# Saving or (and) appending to the file
file = open("text.txt", "a")
file.write(f"{name}\n")
file.close()

# Reading the file
read = open("text.txt", "r")
for i in read:
    print(i)

# Reading the file but making sure no empty newline is printed
with open("text.txt", "r") as file:
    readers = file.readlines()

for reader in sorted(readers):
    print(f"hello {reader.rstrip()}")

# Reading the file but in reverse order
with open("text.txt") as file:
    for line in file:
        names.append(line.rstrip())

for name in sorted(names, reverse=True):
    print(f"{name.title()}")

# =================================================================================================
# EXAMPLE 2
# =================================================================================================

# ======================================== JSON ========================================
import json

FILENAME = "students.json"

names = {"name": "Eric Mawule", "age": 23}

names_dict = json.dumps(names)

python_object = json.loads(names_dict)

print(type(names_dict))
print(type(python_object))

for key, value in python_object.items():
    print(f"{key}: {value}")

for i, j in enumerate(python_object):
    print(f"{i+1}) {j}: {python_object[j]}")

for x in enumerate(python_object.values()):
    print(x)

for x in enumerate(python_object.keys()):
    print(x)

for y in python_object:
    print(f"{y}: {python_object[y]}")


with open(FILENAME, "w") as file:
    json.dump(python_object, file, indent=4, sort_keys=True)

with open(FILENAME, "r") as file:
    content = json.load(file)

for x in content:
    print(f"{x}: {content[x]}")


try:
    with open(FILENAME) as file:
        content = json.load(file)
    for x in content:
        print(f"{x}: {content[x]}")
except (FileNotFoundError, json.JSONDecodeError):
    print("File not found")


# ======================================== CSV ========================================
import csv

FILENAME = "data.csv"

name: str = input("Name: ")
while True:
    age = input("Age: ")
    try:
        age = int(age)
        break
    except ValueError:
        print("Invalid age, try again")
        continue


with open(FILENAME, "a", newline="") as file:
    writer = csv.writer(file)

    writer.writerow([name, age])

with open(FILENAME) as file:
    contents = csv.reader(file)

    for content in contents:
        print(f"{content}")

# ========  DICTWRITER AND DICTREADER ========
FILENAME = "users.csv"

with open("users.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "age"])
    writer.writeheader()  # Use writeheader() once, when creating a new CSV file.

with open(FILENAME, "a") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "age"])

    writer.writerow({"name": name, "age": age})

with open(FILENAME) as file:
    reader = csv.DictReader(file)

    for row in reader:
        print(f"{row['name']}: {row['age']}")


# ============= PROFESSIONAL APPROACH =============
import csv
import os

FILENAME = "users.csv"

file_exists = os.path.exists(FILENAME)

with open(FILENAME, "a", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "age"])

    if not file_exists:
        writer.writeheader()

    writer.writerow({"name": "Eric", "age": 23})

"""
What's the difference between csv.writer and csv.DictWriter?
A good answer is:
    1. csv.writer writes and reads rows as lists.
    2. csv.DictWriter writes rows using dictionaries and column names (fieldnames).
    3. DictWriter is usually more readable and less error-prone because data is accessed by keys instead of column positions.
"""

# ======================================== PICKLE ========================================
# NB. Pickle requires binary mode
import pickle

FILENAME = "user.pkl"

user = {"name": "John", "age": "30"}

with open(FILENAME, "wb") as file:
    pickle.dump(user, file)

with open(FILENAME, "rb") as file:
    data = pickle.load(file)

for key, value in data.items():
    print(f"{key}: {value}")


"""
dump vs dumps
dump → goes to a file
dumps → returns bytes as a value

dump() → Writes directly to a file.
with open("user.pkl", "wb") as file:
    pickle.dump(user, file)

dumps() → Returns serialized bytes.
data = pickle.dumps(user)
print(data)

load vs loads

load() → Read from a file.
with open("user.pkl", "rb") as file:
    data = pickle.load(file)

loads() → Read from bytes.
serialized = pickle.dumps(user)
data = pickle.loads(serialized)
print(data)

SAMPLE APPLIES TO JSON
json.dump()    # file
json.load()    # file

json.dumps()   # string
json.loads()   # string
"""
