# ============================================================================
# MERGE SORT ON LINKED LIST
# ============================================================================
from linked_list import LinkedList


def merge_sort_linked_list(linked_list):
    if linked_list.size() == 1:
        return linked_list
    elif linked_list.head is None:
        return linked_list

    left_half, right_half = split_linked_list(linked_list)
    left = merge_sort_linked_list(left_half)
    right = merge_sort_linked_list(right_half)

    return merge_linked_list(left, right)


def split_linked_list(linked_list):
    if linked_list == None or linked_list.head == None:
        left_half = linked_list
        right_half = None

        return left_half, right_half
    else:
        size = linked_list.size()
        mid = size // 2

        mid_node = linked_list.node_at_index(mid - 1)

        left_half = linked_list
        right_half = LinkedList()
        right_half.head = mid_node.next_node
        mid_node.next_node = None

        return left_half, right_half


def merge_linked_list(left, right):
    merged = LinkedList()

    merged.add(None)

    current = merged.head

    left_head = left.head
    right_head = right.head

    while left_head or right_head:
        if left_head is None:
            current.next_node = right_head
            right_head = right_head.next_node
        elif right_head is None:
            current.next_node = left_head
            left_head = left_head.next_node
        else:
            left_data = left_head.data
            right_data = right_head.data

            if left_data < right_data:
                current.next_node = left_head
                left_head = left_head.next_node
            else:
                current.next_node = right_head
                right_head = right_head.next_node

        current = current.next_node
    head = merged.head.next_node
    merged.head = head

    return merged


# TESTING
l = LinkedList()
l.add(23)
l.add(45)
l.add(1)

l_sort = merge_sort_linked_list(l)
print(l_sort)
