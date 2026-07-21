// ========================================================================
// DYNAMIC ARRAY
// ========================================================================
class DynamicArray {
  constructor() {
    this.capacity = 4; // Starts small to demonstrate resizing logic
    this.length = 0;
    this.data = new Array(this.capacity);
  }

  // Access element by index
  get(index) {
    if (index < 0 || index >= this.length) return undefined;
    return this.data[index];
  }

  // Push element to the end
  push(item) {
    if (this.length === this.capacity) {
      this._resize();
    }
    this.data[this.length] = item;
    this.length++;
  }

  // Pop element from the end
  pop() {
    if (this.length === 0) return undefined;
    const lastItem = this.data[this.length - 1];
    this.data[this.length - 1] = undefined;
    this.length--;
    return lastItem;
  }

  // Double the storage capacity when full
  _resize() {
    this.capacity *= 2;
    const newStorage = new Array(this.capacity);
    for (let i = 0; i < this.length; i++) {
      newStorage[i] = this.data[i];
    }
    this.data = newStorage;
  }
}

// Execution Test
const arr = new DynamicArray();
arr.push("Data1");
arr.push("Data2");
console.log(arr.get(0)); // Output: "Data1"

// ========================================================================
// STACK
// ========================================================================
class Stack {
  constructor() {
    this.items = [];
  }

  // Add element to the top
  push(element) {
    this.items.push(element);
  }

  // Remove and return the top element
  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  }

  // Inspect the top element without removing it
  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Execution Test
const historyStack = new Stack();
historyStack.push("homepage.com");
historyStack.push("profile.com");
console.log(historyStack.peek()); // Output: "profile.com"
historyStack.pop();
console.log(historyStack.peek()); // Output: "homepage.com"

// ========================================================================
// QUEUE
// ========================================================================
class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  // Add to the back
  enqueue(element) {
    this.items[this.tail] = element;
    this.tail++;
  }

  // Remove from the front
  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  peek() {
    return this.items[this.head];
  }

  isEmpty() {
    return this.tail - this.head === 0;
  }
}

// Execution Test
const requestQueue = new Queue();
requestQueue.enqueue("Fetch User 1");
requestQueue.enqueue("Fetch User 2");
console.log(requestQueue.dequeue()); // Output: "Fetch User 1"

// ========================================================================
// LINKED LIST
// ========================================================================
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null; // Included for flexibility in Doubly Linked List use cases
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Append node to the end
  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Delete node by specific value
  delete(value) {
    if (!this.head) return null;

    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      this.size--;
    }
  }
}

// ========================================================================
// HASH TABLE
// ========================================================================
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  // Simple, deterministic string hashing function
  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  // Insert or update key-value pair
  set(key, value) {
    let index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  // Retrieve value associated with a key
  get(key) {
    let index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }
    return undefined;
  }
}

// ========================================================================
// SET & MAP
// ========================================================================
// MAP
const userRoles = new Map();
const userObj = { id: 101 };

userRoles.set(userObj, "Admin");
console.log(userRoles.get(userObj)); // Output: 'Admin'

// SET
const uniqueIds = new Set([1, 2, 2, 3, 4, 4]);
console.log(uniqueIds.has(3)); // Output: true
console.log([...uniqueIds]); // Output: [1, 2, 3, 4]

// ========================================================================
// BINARY SEARCH TREE
// ========================================================================
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert node into correct position based on comparative value
  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  // Search structural tree for value match
  find(value) {
    if (!this.root) return false;
    let current = this.root;
    let found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    return found ? current : false;
  }
}

// ========================================================================
// GRAPH
// ========================================================================
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1); // Symmetric layout for undirected relationships
  }

  // Breadth-First Search (BFS) - Essential for processing short-path layouts
  bfs(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;

    while (queue.length) {
      let currentVertex = queue.shift();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

// Execution Test
const net = new Graph();
net.addVertex("A");
net.addVertex("B");
net.addVertex("C");
net.addEdge("A", "B");
net.addEdge("B", "C");
console.log(net.bfs("A")); // Output: ['A', 'B', 'C']

// ========================================================================
// BINARY HEAP/PRIORITY QUEUE
// ========================================================================
class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  // Insert element and bubble it upward to preserve heap ordering invariants
  enqueue(value, priority) {
    const newNode = { value, priority };
    this.heap.push(newNode);
    this._bubbleUp(this.heap.length - 1);
  }

  // Remove and return root item with peak priority, then shift components down
  dequeue() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return min.value;
  }

  _bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (element.priority >= parent.priority) break;

      this.heap[index] = parent;
      index = parentIndex;
    }
    this.heap[index] = element;
  }

  _sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      index = swap;
    }
    this.heap[index] = element;
  }
}

// Execution Test
const tasks = new MinPriorityQueue();
tasks.enqueue("Low importance task", 3);
tasks.enqueue("System Crash Fix", 1);
tasks.enqueue("Minor Bug Fix", 2);

console.log(tasks.dequeue()); // Output: "System Crash Fix" (Priority 1 item)

// ========================================================================
// TRIE (PREFIX TREE)
// ========================================================================
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insert a string path character-by-character into structural children maps
  insert(word) {
    let current = this.root;
    for (let char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isEndOfWord = true;
  }

  // Validate exact matches within the search path
  search(word) {
    let current = this.root;
    for (let char of word) {
      if (!current.children[char]) return false;
      current = current.children[char];
    }
    return current.isEndOfWord;
  }

  // Evaluate partial prefix fragments (Ideal for autocomplete systems)
  startsWith(prefix) {
    let current = this.root;
    for (let char of prefix) {
      if (!current.children[char]) return false;
      current = current.children[char];
    }
    return true;
  }
}

// Execution Test
const autocomplete = new Trie();
autocomplete.insert("apple");
console.log(autocomplete.startsWith("app")); // Output: true
console.log(autocomplete.search("app")); // Output: false (Fragment exists, but not flagged as an end word)

/**
 ** ============================================================================
 **               THE ULTIMATE DATA STRUCTURE DECISION FRAMEWORK
 ** ============================================================================
 * Use this reference to instantly identify the right data structure based on
 * the specific requirements and patterns of a technical problem.
 *
 * ----------------------------------------------------------------------------
 * * 1. HASH TABLE (Object / Map)
 * ----------------------------------------------------------------------------
 * [Requirement]: Instant lookups, insertions, or deletions by a unique key.
 * [Interview Problem Hints]:
 *   - "Find if a target element exists..." (e.g., Two Sum)
 *   - "Count the frequency/occurrences of words/characters..."
 *   - "Keep track of elements we have already visited/seen..."
 *   - Requires O(1) time complexity for data retrieval.
 *
 * ----------------------------------------------------------------------------
 * * 2. PRIORITY QUEUE (Min / Max Heap)
 * ----------------------------------------------------------------------------
 * [Requirement]: Dynamically prioritizing tasks or retrieving extreme values.
 * [Interview Problem Hints]:
 *   - "Find the K-th largest / smallest element in a dynamic stream..."
 *   - "Merge K sorted lists together efficiently..."
 *   - "Get the most frequent item dynamically while data is being modified..."
 *   - Requires continuous access to the minimum or maximum element in O(1)
 *     time, with updates allowed in O(log n) time.
 *
 * ----------------------------------------------------------------------------
 * * 3. STACK (LIFO: Last In, First Out)
 * ----------------------------------------------------------------------------
 * [Requirement]: Tracking execution history, backtracking, or nested structures.
 * [Interview Problem Hints]:
 *   - "Validate matching brackets, parentheses, or HTML tags..." (e.g., Valid Parentheses)
 *   - "Evaluate math expressions given as strings..." (e.g., Reverse Polish Notation)
 *   - "Track an undo/redo operations history buffer..."
 *   - Requires reverting to the immediate previous state or processing nested layers.
 *
 * ----------------------------------------------------------------------------
 * * 4. QUEUE (FIFO: First In, First Out)
 * ----------------------------------------------------------------------------
 * [Requirement]: Processing items in the exact order they arrived (order-preservation).
 * [Interview Problem Hints]:
 *   - Implement Breadth-First Search (BFS) for trees or graphs.
 *   - "Find the shortest path in an unweighted grid/maze..."
 *   - "Design a print queue, task scheduler, or request rate-limiter..."
 *   - Requires handling traffic buffers cleanly without skipping items.
 *
 * ----------------------------------------------------------------------------
 * * 5. TRIE (Prefix Tree)
 * ----------------------------------------------------------------------------
 * [Requirement]: Processing string character sequences, prefixes, or dictionaries.
 * [Interview Problem Hints]:
 *   - "Design an autocomplete, type-ahead, or spellcheck system..."
 *   - "Search for words sharing a common prefix string..."
 *   - "Efficiently store and search a large dictionary of words..."
 *   - Eliminates redundant string scanning by binding shared character routes.
 *
 * ----------------------------------------------------------------------------
 * * 6. GRAPH
 * ----------------------------------------------------------------------------
 * [Requirement]: Modeling real-world networks, connections, or dependencies.
 * [Interview Problem Hints]:
 *   - "Find if a path exists between Person A and Person B..." (Social Networks)
 *   - "Determine the order of courses to take given prerequisites..." (Topological Sort)
 *   - "Find connected components, networks of cities, or web-crawler links..."
 *   - Look for keywords like "connections", "edges", "networks", or "dependencies".
 */

/**
 ** ============================================================================
 **                       BIG O COMPLEXITY CHEAT SHEET
 ** ============================================================================
 */

/**
 ** ----------------------------------------------------------------------------
 ** 1. DYNAMIC ARRAY COMPLEXITY
 ** ----------------------------------------------------------------------------
 * Access / Lookup by Index         : O(1) -> Constant Time
 * Search by Value                  : O(n) -> Linear Time (must scan array)
 * Insertion (At End)               : O(1) -> Amortized Constant Time (O(n) when resizing)
 * Deletion (From End)              : O(1) -> Constant Time
 * Deletion (From Front)            : O(n) -> Linear Time (must shift all remaining elements)
 * Space Complexity                 : O(n) -> Linear Space for elements stored
 */

/**
 ** ----------------------------------------------------------------------------
 ** 2. STACK COMPLEXITY (LIFO)
 ** ----------------------------------------------------------------------------
 * Push (Insert at Top)             : O(1) -> Constant Time
 * Pop (Remove from Top)            : O(1) -> Constant Time
 * Peek (View Top Element)          : O(1) -> Constant Time
 * Search / Access                  : O(n) -> Linear Time (not intended for random access)
 * Space Complexity                 : O(n) -> Linear Space proportional to size
 */

/**
 ** ----------------------------------------------------------------------------
 ** 3. QUEUE COMPLEXITY (FIFO)
 ** ----------------------------------------------------------------------------
 * Enqueue (Insert at Back)         : O(1) -> Constant Time
 * Dequeue (Remove Front)           : O(1) -> Constant Time (using object-backed approach)
 * Peek (View Front Element)        : O(1) -> Constant Time
 * Search / Access                  : O(n) -> Linear Time
 * Space Complexity                 : O(n) -> Linear Space proportional to size
 */

/**
 ** ----------------------------------------------------------------------------
 ** 4. LINKED LIST COMPLEXITY (Singly Linked List)
 ** ----------------------------------------------------------------------------
 * Insert / Delete at Head          : O(1) -> Constant Time
 * Insert / Delete at Tail          : O(n) -> Linear Time (O(1) if tracking tail pointer)
 * Search / Access by Value         : O(n) -> Linear Time (must traverse via pointers)
 * Space Complexity                 : O(n) -> Linear Space for nodes and pointers
 */

/**
 ** ----------------------------------------------------------------------------
 ** 5. HASH TABLE COMPLEXITY (Separate Chaining)
 ** ----------------------------------------------------------------------------
 * Insertion                        : O(1) -> Average / O(n) Worst Case (severe collisions)
 * Deletion                         : O(1) -> Average / O(n) Worst Case
 * Lookup by Key                    : O(1) -> Average / O(n) Worst Case
 * Space Complexity                 : O(n) -> Proportional to number of keys stored
 */

/**
 ** ----------------------------------------------------------------------------
 ** 6. NATIVE SET & MAP COMPLEXITY (JS Engine Built-ins)
 ** ----------------------------------------------------------------------------
 * Map.set() / Map.get()            : O(1) -> Sub-linear / Constant Time (highly optimized)
 * Set.add() / Set.has()            : O(1) -> Sub-linear / Constant Time
 * Deletion (delete / clear)        : O(1) -> Constant Time
 * Space Complexity                 : O(n) -> Linear Space
 */

/**
 ** ----------------------------------------------------------------------------
 ** 7. BINARY SEARCH TREE COMPLEXITY (BST)
 ** ----------------------------------------------------------------------------
 * Insertion                        : O(log n) -> Average / O(n) Worst Case (if unbalanced/skewed)
 * Deletion                         : O(log n) -> Average / O(n) Worst Case
 * Search / Lookup                  : O(log n) -> Average / O(n) Worst Case
 * Space Complexity                 : O(n)     -> Linear Space for tree nodes
 */

/**
 ** ----------------------------------------------------------------------------
 ** 8. GRAPH COMPLEXITY (Adjacency List Representation)
 ** ----------------------------------------------------------------------------
 * Add Vertex                       : O(1)     -> Constant Time
 * Add Edge                         : O(1)     -> Constant Time
 * Remove Edge                      : O(E)     -> Linear relative to edges connected to vertex
 * Remove Vertex                    : O(V + E) -> Must clear vertex and all its edge connections
 * BFS / DFS Traversal              : O(V + E) -> V = Vertices, E = Edges
 * Space Complexity                 : O(V + E) -> Stores all vertices and their edge list references
 */

/**
 ** ----------------------------------------------------------------------------
 ** 9. BINARY HEAP / PRIORITY QUEUE COMPLEXITY
 ** ----------------------------------------------------------------------------
 * Enqueue (Insert + Bubble)        : O(log n) -> Logarithmic Time
 * Dequeue (Extract + Sink)         : O(log n) -> Logarithmic Time
 * Peek (Find Min/Max Root)         : O(1)     -> Constant Time
 * Space Complexity                 : O(n)     -> Stored efficiently in flat continuous array
 */

/**
 ** ----------------------------------------------------------------------------
 ** 10. TRIE / PREFIX TREE COMPLEXITY
 ** ----------------------------------------------------------------------------
 * Insertion                        : O(k) -> Linear relative to string length 'k'
 * Search (Exact Word)              : O(k) -> Linear relative to string length 'k'
 * StartsWith (Prefix Search)       : O(k) -> Linear relative to prefix length 'k'
 * Space Complexity                 : O(N * k) -> Where N is number of words and k is average length
 *                                    (Note: Memory usage decreases drastically as common prefixes increase)
 */
