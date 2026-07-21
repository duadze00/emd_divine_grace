"""
==========================================================================
THE ULTIMATE GUIDE TO PYTHON TYPE HINTING (PEP 484) FOR PRODUCTION
==========================================================================
Why Type Hinting?
1. Catch bugs early before runtime using static analysis tools like Mypy.
2. Auto-completion and documentation directly inside your IDE (VS Code, PyCharm).
3. Safer refactoring of massive codebases.
Note: Python type hints are ignored at runtime; they are purely for tooling.
==========================================================================
"""

from typing import (
    List,
    Dict,
    Tuple,
    Set,
    Optional,
    Union,
    Any,
    Callable,
    TypeVar,
    Generic,
    Protocol,
    Literal,
    Final,
)

# ==========================================================================
# 1. PRIMITIVES & BASIC COLLECTIONS
# ==========================================================================
# Modern Python (3.9+) allows using built-in types directly for hinting.

username: str = "Dev_User"
user_id: int = 101
is_active: bool = True
pi: float = 3.14159

# Lists, Sets, and Tuples
scores: list[int] = [95, 88, 100]  # Or List[int] in older versions
unique_tags: set[str] = {"python", "backend"}
coordinates: tuple[float, float] = (45.10, -122.68)  # Fixed size tuple
variable_tuple: tuple[str, ...] = ("a", "b", "c")  # Arbitrary length tuple

# Dictionaries (Key: Value)
user_roles: dict[int, str] = {101: "Admin", 102: "Manager"}


# ==========================================================================
# 2. ADVANCED TYPE UTILITIES
# ==========================================================================


# Union: Variable can be one of multiple types (Modern syntax uses pipe '|')
# Optional[X] is exactly equivalent to X | None
def process_id(identifier: int | str) -> str:
    return f"ID_{identifier}"


def get_user_bio(user_id: int) -> str | None:
    if user_id == 101:
        return "Senior Software Engineer"
    return None  # Returns None if not found


# Literal: Restricts a variable to exact specific values
OrderStatus = Literal["pending", "shipped", "delivered"]


def update_order(order_id: int, status: OrderStatus) -> None:
    print(f"Order {order_id} updated to {status}")
    # Passing "processing" here will trigger a type-checker error!


# Final: Creates a constant that cannot be reassigned
DATABASE_URL: Final[str] = "postgresql://localhost:5432/db"


# ==========================================================================
# 3. FUNCTIONS & CALLABLES
# ==========================================================================
# Syntax: Callable[[Param1Type, Param2Type], ReturnType]


def execute_operation(a: int, b: int, operation: Callable[[int, int], int]) -> int:
    return operation(a, b)


math_callback = lambda x, y: x * y
result = execute_operation(5, 4, math_callback)


# ==========================================================================
# 4. OOP, GENERICS, AND STRUCTURAL TYPING (INTERVIEW GOLD)
# ==========================================================================

# TypeVar: Used to create Generic classes or functions that preserve exact types
T = TypeVar("T")


class Storage(Generic[T]):
    """A generic storage container that maintains the item type."""

    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()


# Usage of Generics
string_box = Storage[str]()
string_box.push("Hello")


# Protocol (Structural Typing / Duck Typing)
# Defines an interface based on what methods an object has, not its class inheritance.
class Renderable(Protocol):
    def render(self) -> str: ...


def display_component(component: Renderable) -> None:
    print(component.render())


class Button:
    def render(self) -> str:
        return "<button>Click Me</button>"


# Works perfectly because Button implements the Renderable interface/protocol
display_component(Button())


# ==========================================================================
# HOW TO VALIDATE YOUR CODE
# ==========================================================================
"""
To actually enforce these rules, run these commands in your terminal:
1. pip install mypy
2. mypy typing_demo.py
"""

# Using semi-colon and specific type help to know what type of data you want to use.


def meow(n: int) -> None:
    for _ in range(n):
        print("Meow")


number: int = int(input("Number: "))
meow(number)


name: str = "Eric Mawule Duadze"


def hello(n: str) -> str:
    return n


hello(name)
