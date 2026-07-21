# ============================================================
# QUICK SORT - PYTHON REFERENCE IMPLEMENTATION
# Works for numbers and strings (same-type lists only)
# ============================================================


def quicksort(values):
    # Base case: list with 0 or 1 element is already sorted
    if len(values) <= 1:
        return values

    # Choose pivot (first element)
    pivot = values[0]

    # Create partitions
    less_than_pivot = []
    greater_than_pivot = []

    # Partitioning step
    for value in values[1:]:
        if value <= pivot:
            less_than_pivot.append(value)
        else:
            greater_than_pivot.append(value)

    # Recursive sorting + merge
    return quicksort(less_than_pivot) + [pivot] + quicksort(greater_than_pivot)


# ============================================================
# TESTING THE FUNCTION
# ============================================================

# Numbers
nums = [10, 3, 7, 2, 9, 1]
print("Sorted numbers:", quicksort(nums))

# Strings (alphabetical order)
words = ["banana", "apple", "cherry", "date"]
print("Sorted words:", quicksort(words))


# ============================================================
# IMPORTANT NOTES
# ============================================================

"""
Works for:
- int, float
- strings
- any type that supports comparison (<, <=)

Do NOT mix types like:
- [1, "apple", 3]  -> TypeError

Pivot choice matters:
- First element = simple but not optimal
- Random pivot = better performance 
"""

# ============================================================
# PROFESSIONAL QUICKSORT (UPGRADED VERSION)
# Features:
# - Random pivot (better performance)
# - Ascending / descending toggle
# - Works for numbers & strings (same type only)
# ============================================================

import random


def quicksort(values, descending=False):
    """
    QuickSort implementation with random pivot.

    Args:
        values (list): list of comparable items (numbers or strings)
        descending (bool): True for descending order

    Returns:
        list: sorted list
    """

    # Base case
    if len(values) <= 1:
        return values

    # Random pivot selection (IMPORTANT improvement)
    pivot_index = random.randint(0, len(values) - 1)
    pivot = values[pivot_index]

    # Remove pivot from list to avoid duplicates issues
    remaining = values[:pivot_index] + values[pivot_index + 1 :]

    # Partitions
    less = []
    greater = []

    for value in remaining:
        if value <= pivot:
            less.append(value)
        else:
            greater.append(value)

    # Recursive sort
    sorted_list = quicksort(less, descending) + [pivot] + quicksort(greater, descending)

    # Reverse if descending order is required
    if descending:
        sorted_list.reverse()

    return sorted_list


# ============================================================
# TESTING
# ============================================================

# Numbers
nums = [10, 3, 7, 2, 9, 1]
print("Ascending:", quicksort(nums))
print("Descending:", quicksort(nums, descending=True))

# Strings
words = ["banana", "apple", "cherry", "date"]
print("Ascending:", quicksort(words))
print("Descending:", quicksort(words, descending=True))


# ============================================================
# WHY THIS VERSION IS BETTER
# ============================================================

"""
✔ Random pivot avoids worst-case O(n²)
✔ More realistic (used in real systems)
✔ Supports ascending & descending sorting
✔ Safer than always choosing first element
✔ Easy to extend for objects later

LIMITATION:
- Still NOT in-place (uses extra memory)
"""
