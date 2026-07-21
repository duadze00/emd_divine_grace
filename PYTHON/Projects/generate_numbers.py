import random


def generate_numbers():
    n = []
    i = 0

    while i < 100:
        m = random.randint(100, 100000)
        n.append(m)
        i += 1

    return n


print(generate_numbers())
