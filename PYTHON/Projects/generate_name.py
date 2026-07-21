import random
import string

# ===========================================================================
# OPTION 1
# ===========================================================================

NAMES = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emma",
    "Frank",
    "Grace",
    "Henry",
    "Isabella",
    "Jack",
    "Karen",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Peter",
    "Queen",
    "Ryan",
    "Sophia",
    "Thomas",
]


def generate_names(count):
    names = []

    for _ in range(count):
        names.append(random.choice(NAMES))

    return names


print(generate_names(5))
print(generate_names(10))


# ===========================================================================
# OPTION 2
# ===========================================================================

NAMES = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emma",
    "Frank",
    "Grace",
    "Henry",
    "Isabella",
    "Jack",
    "Karen",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Peter",
    "Queen",
    "Ryan",
    "Sophia",
    "Thomas",
]


def generate_names(count):
    return random.sample(NAMES, count)


print(generate_names(5))


# ===========================================================================
# OPTION 3
# ===========================================================================


def random_name(length=6):
    first = random.choice(string.ascii_uppercase)
    rest = "".join(random.choice(string.ascii_lowercase) for _ in range(length - 1))
    return first + rest


def generate_names(count):
    return [random_name() for _ in range(count)]


print(generate_names(10))
