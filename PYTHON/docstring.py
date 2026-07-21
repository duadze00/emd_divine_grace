# Use triple quotation marks to document to formerly document a function


def hello(n):
    """Returns hello to user"""
    return f"Hello! {n}"


def meow(n: int) -> str:
    """
    Meow n times.

    :param n: Number of times to meow
    :type n: int
    :raise TypeError: If n is not an it
    :return: A string, one per line
    """
    return "meow\n" * n
