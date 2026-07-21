# Linear Search Or Sequential Search


def linear_search(list, target):
    for i in range(0, len(list)):
        if list[i] == target:
            return i
    return None


def verify(index):
    if index is not None:
        print("Taget found at index ", index)
    else:
        print("Target not found in list")


# TESTING
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

result = linear_search(numbers, 23)
verify(result)
result = linear_search(numbers, 2)
verify(result)
