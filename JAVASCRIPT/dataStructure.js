/**
 * ============================================================================
 * THE ULTIMATE JAVASCRIPT DATA STRUCTURES GUIDE
 * ============================================================================
 * A complete, production-ready reference covering built-in and advanced custom data structures in JavaScript.
 * * Each structure includes:
 * - Core concepts & Time Complexities
 * - Complete implementation / usage
 * - Real-world production use-case
 * ============================================================================
 */

/*============================================================================
  1. ARRAYS (Built-in Linear Structure)
  ----------------------------------------------------------------------------
  Description: Ordered collection of elements indexed by contiguous integers.
  Time Complexity: 
    - Access: O(1)
    - Search: O(n)
    - Insertion/Deletion at End (push/pop): O(1)
    - Insertion/Deletion at Start (unshift/shift): O(n) due to re-indexing
============================================================================*/

/**
 * REAL-WORLD USE CASE: Shopping Cart Management
 * Handling sequential items, calculating totals, and filtering out-of-stock items.
 */
function manageShoppingCart() {
  // Initialization
  const cart = [
    { id: "p1", name: "Developer Keyboard", price: 120, qty: 1 },
    { id: "p2", name: "Ergonomic Mouse", price: 80, qty: 2 },
  ];

  // 1. Insertion (O(1) - Push to end)
  cart.push({ id: "p3", name: "USB-C Cable", price: 15, qty: 3 });

  // 2. Transformation & Derivation (Map/Reduce)
  const totalCost = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 3. Search / Verification (O(n))
  const hasExpensiveItem = cart.some((item) => item.price > 100);
  const mouse = cart.find((item) => item.id === "p2");

  // 4. Deletion / Filtering (O(n))
  const filteredCart = cart.filter((item) => item.id !== "p3");

  console.log("--- ARRAY CASE: SHOPPING CART ---");
  console.log(`Total Cost: $${totalCost}`);
  console.log(`Found Mouse:`, mouse);
  console.log(`Filtered Cart Length: ${filteredCart.length}\n`);
}
manageShoppingCart();

/*============================================================================
  2. OBJECTS (Built-in Hash Table Variant)
  ----------------------------------------------------------------------------
  Description: Unordered key-value pairs where keys must be Strings or Symbols.
  Time Complexity: 
    - Access/Search/Insertion/Deletion: O(1) average case
============================================================================*/

/**
 * REAL-WORLD USE CASE: Cache / Memoization Layer
 * Storing API responses by their endpoints to prevent redundant network hits.
 */
function apiCacheLayer() {
  // The Object acting as a Hash Map
  const apiCache = {};

  function setCache(endpoint, data) {
    // O(1) insertion with metadata
    apiCache[endpoint] = {
      data,
      fetchedAt: Date.now(),
    };
  }

  function getCache(endpoint) {
    // O(1) lookup
    const cached = apiCache[endpoint];
    if (!cached) return null;

    // Eviction logic: Expire cache after 5 seconds
    if (Date.now() - cached.fetchedAt > 5000) {
      delete apiCache[endpoint]; // O(1) deletion
      return null;
    }
    return cached.data;
  }

  console.log("--- OBJECT CASE: API CACHE ---");
  setCache("/api/user/102", { name: "Alice", role: "Admin" });
  console.log("Cache Hit:", getCache("/api/user/102"));
  console.log("Cache Miss:", getCache("/api/user/999")); // Undefined key
  console.log("");
}
apiCacheLayer();

/*============================================================================
  3. MAPS (Built-in Key-Value Collection)
  ----------------------------------------------------------------------------
  Description: Ordered key-value maps. Unlike Objects, keys can be ANY value 
               (including objects, functions, and primitives). Maintains insertion order.
  Time Complexity: 
    - Access/Search/Insertion/Deletion: O(1)
============================================================================*/

/**
 * REAL-WORLD USE CASE: Active User Session & Socket Manager
 * Mapping complex DOM nodes or User Objects directly to their active states.
 */
function userSessionManager() {
  const activeSessions = new Map();

  // Create mock domain user entities (Objects as keys!)
  const userAdmin = { id: 1001, username: "dev_alex" };
  const userGuest = { id: 5005, username: "guest_user" };

  // 1. Setting values (Keys are references, not strings)
  activeSessions.set(userAdmin, { socketId: "ws_99x7", loginTime: new Date() });
  activeSessions.set(userGuest, { socketId: "ws_11a2", loginTime: new Date() });

  // 2. Checking size and existence
  console.log("--- MAP CASE: SESSION MANAGER ---");
  console.log(`Active Connections: ${activeSessions.size}`);
  console.log(`Is Admin active?: ${activeSessions.has(userAdmin)}`);

  // 3. Iteration (Guaranteed insertion order)
  for (const [user, sessionDetails] of activeSessions.entries()) {
    console.log(
      `User ${user.username} is connected via ${sessionDetails.socketId}`,
    );
  }

  // 4. Deletion
  activeSessions.delete(userGuest);
  console.log("");
}
userSessionManager();

/*============================================================================
  4. SETS (Built-in Unique Value Collection)
  ----------------------------------------------------------------------------
  Description: Collection of unique values. No duplicates allowed.
  Time Complexity:
    - Insertion/Deletion/Search (has): O(1)
============================================================================*/

/**
 * REAL-WORLD USE CASE: Real-time Analytics Unique Visitor Tracker
 * Tracking unique system log tags or processing user IDs to eliminate duplicates fast.
 */
function trackingUniqueVisitors() {
  const uniqueVisitorIDs = new Set();

  // Simulate a stream of user visits (with repeated actions)
  const stream = [402, 101, 402, 305, 101, 999, 402];

  stream.forEach((id) => {
    uniqueVisitorIDs.add(id); // Duplicates are automatically ignored inline
  });

  console.log("--- SET CASE: UNIQUE VISITORS ---");
  console.log(`Total raw click events: ${stream.length}`);
  console.log(`Total unique visitors: ${uniqueVisitorIDs.size}`);
  console.log(`Has user 305 visited?: ${uniqueVisitorIDs.has(305)}`);

  // Fast Array Deduplication trick using Set & Spread
  const deduplicatedArray = [...uniqueVisitorIDs];
  console.log("Deduplicated Array:", deduplicatedArray);
  console.log("");
}
trackingUniqueVisitors();

/*============================================================================
  5. LINKED LIST (Custom Linear Structure)
  ----------------------------------------------------------------------------
  Description: Sequential collection of nodes where each node points to the next.
  Why it matters: Excellent for constant time O(1) insertion/deletion at any known point.
  Time Complexity:
    - Access/Search: O(n)
    - Insertion/Deletion at Known Position: O(1)
============================================================================*/

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null; // Pointer to next node
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Append to the end of the list: O(1) thanks to tail pointer
  append(value) {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
  }

  // Delete first matching node: O(n) search, O(1) mutation
  delete(value) {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        if (current.next === this.tail) {
          this.tail = current;
        }
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  toArray() {
    const elements = [];
    let current = this.head;
    while (current) {
      elements.push(current.value);
      current = current.next;
    }
    return elements;
  }
}

/**
 * REAL-WORLD USE CASE: Music Playlist Queue
 * Song tracks playing sequentially where songs can be skipped or dynamically linked next.
 */
console.log("--- LINKED LIST CASE: MUSIC PLAYLIST ---");
const playlist = new LinkedList();
playlist.append("Song A: Synthwave Intro");
playlist.append("Song B: Cyberpunk Beats");
playlist.append("Song C: Outrun Melodies");

playlist.delete("Song B: Cyberpunk Beats");
console.log("Current Playlist Tracklist:", playlist.toArray());
console.log("");

/*============================================================================
  6. STACK (Custom LIFO Structure)
  ----------------------------------------------------------------------------
  Description: Last-In, First-Out collection.
  Time Complexity:
    - Push/Pop/Peek: O(1)
============================================================================*/

class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.length ? this.items.pop() : null;
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

/**
 * REAL-WORLD USE CASE: Text Editor Undo History
 */
console.log("--- STACK CASE: TEXT EDITOR UNDO ---");
const textEditorHistory = new Stack();

// User types text changes
textEditorHistory.push("Typed: 'Hello '");
textEditorHistory.push("Typed: 'Hello Worl'");
textEditorHistory.push("Typed: 'Hello World!'");

console.log("Current state (Peek):", textEditorHistory.peek());
// User hits Ctrl+Z
console.log("Reverted action (Pop):", textEditorHistory.pop());
console.log("New current state:", textEditorHistory.peek());
console.log("");

/*============================================================================
  7. QUEUE (Custom FIFO Structure)
  ----------------------------------------------------------------------------
  Description: First-In, First-Out collection.
  Time Complexity:
    - Enqueue/Dequeue: O(1) optimized (using an object map to avoid array shift O(n))
============================================================================*/

class Queue {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  // Add item to back: O(1)
  enqueue(element) {
    this.items[this.tailIndex] = element;
    this.tailIndex++;
  }

  // Remove item from front: O(1) optimized
  dequeue() {
    if (this.headIndex === this.tailIndex) return null;
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  }

  peek() {
    return this.items[this.headIndex];
  }
}

/**
 * REAL-WORLD USE CASE: Background Print Job / Email Queue Processor
 */
console.log("--- QUEUE CASE: BACKGROUND JOBS ---");
const emailQueue = new Queue();

emailQueue.enqueue({ to: "user1@ex.com", body: "Welcome!" });
emailQueue.enqueue({ to: "user2@ex.com", body: "Invoice #04" });

console.log("Processing next job:", emailQueue.dequeue());
console.log("Next up in line:", emailQueue.peek());
console.log("");

/*============================================================================
  8. BINARY SEARCH TREE - BST (Custom Non-Linear Structure)
  ----------------------------------------------------------------------------
  Description: Hierarchical tree structure where nodes have at most two children.
               Left child < Parent < Right child.
  Time Complexity (Balanced):
    - Search/Insertion/Deletion: O(log n)
============================================================================*/

class BSTNode {
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

  insert(value) {
    const newNode = new BSTNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this._insertNode(this.root, newNode);
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else {
      if (!node.right) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  // Search execution: O(log n) average
  search(node, value) {
    if (!node) return false;
    if (value === node.value) return true;
    return value < node.value
      ? this.search(node.left, value)
      : this.search(node.right, value);
  }
}

/**
 * REAL-WORLD USE CASE: Fast Catalog Numerical Searching (e.g., E-commerce pricing thresholds)
 */
console.log("--- BST CASE: CATALOG SEARCH ---");
const priceTree = new BinarySearchTree();
priceTree.insert(50); // Root
priceTree.insert(20);
priceTree.insert(80);
priceTree.insert(15);
priceTree.insert(30);

console.log(
  "Does price $30 exist in index?:",
  priceTree.search(priceTree.root, 30),
);
console.log(
  "Does price $99 exist in index?:",
  priceTree.search(priceTree.root, 99),
);
console.log("");

/*============================================================================
  9. GRAPH (Custom Non-Linear Network Structure)
  ----------------------------------------------------------------------------
  Description: A collection of nodes (vertices) connected by links (edges).
               Represented here via an Adjacency List.
  Time Complexity:
    - Add Vertex: O(1)
    - Add Edge: O(1)
    - Graph Traversal (BFS/DFS): O(V + E) where V=vertices, E=edges
============================================================================*/

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1); // Undirected connection
    }
  }

  // Breadth-First Search (BFS) for exploring closest nodes first
  bfs(startVertex) {
    const queue = [startVertex];
    const result = [];
    const visited = {};
    visited[startVertex] = true;

    while (queue.length) {
      const currentVertex = queue.shift();
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

/**
 * REAL-WORLD USE CASE: Social Network Connections ("People You May Know")
 */
console.log("--- GRAPH CASE: SOCIAL NETWORK ---");
const network = new Graph();
network.addVertex("Alice");
network.addVertex("Bob");
network.addVertex("Charlie");
network.addVertex("David");

network.addEdge("Alice", "Bob");
network.addEdge("Bob", "Charlie");
network.addEdge("Charlie", "David");
network.addEdge("Alice", "David");

console.log("Network Proximity Traversal Map (BFS from Alice):");
console.log(network.bfs("Alice"));
console.log(
  "============================================================================",
);
