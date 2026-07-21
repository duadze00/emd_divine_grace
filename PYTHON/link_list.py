# ========================================== LINKED LIST ==========================================
# A linked list is a type of data structure used to store a collection of items (called nodes), where each item points to the next one in the sequence.
# Simple idea:
# Instead of storing elements next to each other in memory (like an array), a linked list stores them anywhere in memory, but connects them using links (pointers).

# Each node typically has:
# # Data – the value it holds
# # Pointer (or reference) – a link to the next node

# Visual example
# # [10 | next] → [20 | next] → [30 | next] → null
# # The first node is called the head
# # The last node points to null (end of the list)

# Types of linked lists:
# # Singly linked list: each node points to the next one
# # Doubly linked list: each node points to both next and previous
# # Circular linked list: last node points back to the first node

# Key advantages:
# # Efficient insertion and deletion (no shifting like arrays)
# # Dynamic size (can grow/shrink easily)

# Key disadvantages:
# # No direct access by index (must traverse from the start)
# # Extra memory needed for pointers

# ==================================================================================================
# STEP BY STEP PROCESS OF CREATING A LINKED LIST
# ==================================================================================================

# STEP 1: Create the Node Structure
# A node usually contains:
# # data → the value stored
# # next → reference to the next node


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


# STEP 2: Create the Linked List Class
# The linked list needs a way to know where the list starts.


class LinkedList:
    def __init__(self):
        self.head = None


# Initially: head → None


# STEP 3: Create Nodes
node1 = Node(10)
node2 = Node(20)
node3 = Node(30)

# Memory:
# # node1 = [10 | None]
# # node2 = [20 | None]
# # node3 = [30 | None]


# STEP 4: Link the Nodes Together
node1.next = node2
node2.next = node3

# Now: [10 | •] → [20 | •] → [30 | None]


# STEP 5: Point the Head to the First Node
ll = LinkedList()
ll.head = node1

# Now:
# # head
# #  ↓
# # [10 | •] → [20 | •] → [30 | None]

# ==================================================================================================
# IN PRACTICE
# ==================================================================================================
# Usually you don't manually create nodes every time. Instead, you create methods inside the linked list.


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)

        if self.head is None:
            self.head = new_node
            return

        current = self.head

        while current.next:
            current = current.next

        current.next = new_node


# ==================================================================================================
# MENTAL MODEL
# ==================================================================================================

# Whenever you build a linked list:
# # 1. Define Node
# # # data
# # # next pointer
# # 2. Define LinkedList
# # # head pointer
# # 3. Create nodes
# # # Node(data)
# # 4. Connect nodes
# # # node1.next = node2
# # 5. Set head
# # # head = first node
# # 6. Add operations
# # # append
# # # prepend
# # # insert
# # # delete
# # # search
# # # traverse


# ==================================================================================================
# FOUNDATION — What you MUST understand first
# ==================================================================================================
# A linked list is built from nodes, not built-in like lists.


# Node Structure
class Node:
    def __init__(self, data):
        self.data = data  # value
        self.next = None  # pointer to next node


# ==================================================================================================
# BUILD YOUR FIRST LINKED LIST
# ==================================================================================================
class LinkedList:
    def __init__(self):
        self.head = None


# ==================================================================================================
# BASIC OPERATIONS
# ==================================================================================================
class LinkedList:
    def __init__(self):
        self.head = None

    # INSERT AT BEGINNING
    def insert_at_beginning(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    # INSERT AT END
    def insert_at_end(self, data):
        new_node = Node(data)

        if not self.head:
            self.head = new_node
            return

        current = self.head
        while current.next:
            current = current.next

        current.next = new_node

    # DISPLAY LIST
    def display(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")


# EXAMPLE USAGE
ll = LinkedList()
ll.insert_at_beginning(10)
ll.insert_at_end(20)
ll.insert_at_end(30)

ll.display()


# ==================================================================================================
# INTERMEDIATE OPERATIONS
# ==================================================================================================
class LinkedList:
    def __init__(self):
        self.head = None

    # INSERT AT A POSITION
    def insert_at_position(self, data, position):
        new_node = Node(data)

        if position == 0:
            self.insert_at_beginning(data)
            return

        current = self.head
        for _ in range(position - 1):
            current = current.next

        new_node.next = current.next
        current.next = new_node

    # DELETE A NODE
    def delete(self, key):
        current = self.head

        if current and current.data == key:
            self.head = current.next
            return

        prev = None
        while current and current.data != key:
            prev = current
            current = current.next

        if current:
            prev.next = current.next

    # SEARCH
    def search(self, key):
        current = self.head
        while current:
            if current.data == key:
                return True
            current = current.next
        return False


# ==================================================================================================
# ADVANCED CONCEPTS
# ==================================================================================================
class LinkedList:
    def __init__(self):
        self.head = None

    # REVERSE A LINKED LIST
    def reverse(self):
        prev = None
        current = self.head

        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node

        self.head = prev

    # FIND MIDDLE NODE
    def find_middle(self):
        slow = self.head
        fast = self.head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        return slow.data
        # This is called two-pointer technique

    # DETECT CYCLE (FLOYD'S ALGORITHM)
    def has_cycle(self):
        slow = self.head
        fast = self.head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                return True

        return False


# ==================================================================================================
# DOUBLY LINKED LIST
# ==================================================================================================
# Each node has:
# # next
# # prev


class DNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None


# ==================================================================================================
# CIRCULAR LINKED LIST
# ==================================================================================================
# Last node points back to head:
# # current.next = self.head

# Used in:
# # Music playlists
# # Round-robin scheduling

# ==================================================================================================
# TIME COMPLEXITY (VERY IMPORTANT)
# ==================================================================================================

# OPERATION          TIME
# Insert at head     O(1)
# Insert at end      O(n)
# Search             O(n)
# Delete             O(n)

# ==================================================================================================
# WHEN TO USE LINKED LIST
# ==================================================================================================

# Use it when:
# # Frequent insertions/deletions
# # Memory is dynamic
# # You don’t need random access
# Avoid when:
# # You need fast indexing (use list instead)

# ==================================================================================================
# PRO LEVEL THINKING
# ==================================================================================================

# To reach advanced level, you should be able to:
# ✔ Merge two linked lists
# ✔ Remove duplicates
# ✔ Reverse in groups (k nodes)
# ✔ Detect intersection
# ✔ Implement stack/queue using linked list
