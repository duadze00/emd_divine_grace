import random


def is_sorted(value):
    for index in range(len(value) - 1):
        if value[index] > value[index + 1]:
            return False
    return True


# Bogo Sort
def bogo_sort(values):
    while not is_sorted(values):
        random.shuffle(values)
    return values


numbers = [3, 4, 5, 2, 1, 6, 9, 8, 7]

print(bogo_sort(numbers))