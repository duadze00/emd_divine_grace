import React, { useState, useCallback, useMemo, useEffect } from "react";

// ============================================================================
// 1. WHAT IS useCallback?
// ============================================================================
/**
 * KEY TAKEAWAY:
 * - useCallback memoizes a FUNCTION REFERENCE, not its execution or return value.
 * - It prevents React from recreating a function on every single render cycle.
 * - In JavaScript, () => {} !== () => {}. Every render creates a NEW memory reference.
 *   useCallback keeps that memory reference stable across renders.
 */

// ============================================================================
// 2. SYNTAX & MENTAL MODEL
// ============================================================================

// Standard Syntax:
const memoizedFunction = useCallback(
  () => {
    // Your function logic here
  },
  [
    /* dependencies */
  ],
);

/**
 * MENTAL MODEL:
 *
 * Component Renders
 *        │
 *        ▼
 * Have dependencies changed since last render?
 *   ├── NO  ──► Return the EXISTING function reference (from memory)
 *   └── YES ──► Create and return a NEW function reference
 */

// ============================================================================
// 3. BASIC EXAMPLE: PREVENTING UNNECESSARY CHILD RENDERS
// ============================================================================

// Step A: Wrap the child component in React.memo
// React.memo skips rendering if props haven't changed.
const Child = React.memo(function Child({ onClick }) {
  console.log("Child re-rendered!");
  return <button onClick={onClick}>Click Child</button>;
});

// Step B: Use useCallback in the parent
function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback, handleClick would be a NEW reference every time 'count' updates,
  // causing <Child /> to re-render even though its props logically didn't change!
  const handleClick = useCallback(() => {
    console.log("Child button clicked");
  }, []); // Empty deps = function reference NEVER changes

  return (
    <div>
      <p>Parent Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment Parent</button>
      <Child onClick={handleClick} />
    </div>
  );
}

// ============================================================================
// 4. HANDLING DEPENDENCIES & CLOSURES
// ============================================================================
/**
 * CRITICAL RULE:
 * Include any variable inside the dependency array that comes from the component scope
 * (props, state, or external variables). Otherwise, you will capture a "stale closure"
 * (an outdated snapshot of that variable).
 */

function UserProfile({ userId }) {
  // 'userId' must be in the dependency array so the function
  // updates whenever the logged-in user changes.
  const logUserId = useCallback(() => {
    console.log("Current User ID is:", userId);
  }, [userId]);

  return <button onClick={logUserId}>Log User ID</button>;
}

// ============================================================================
// 5. useCallback vs. useMemo
// ============================================================================
/**
 * DIFFERENCE:
 * - useCallback(fn, deps)  --> Remembers the FUNCTION itself.
 * - useMemo(() => value, deps) --> Remembers the RESULT of running a function.
 */

function ComparisonExample() {
  // Memoizes a function reference
  const handleClick = useCallback(() => {
    console.log("Hello World");
  }, []);

  // Memoizes a calculated value
  const expensiveCalculation = useMemo(() => {
    return 100 * 5000; // Returns 500000
  }, []);

  // PRO TIP: useCallback(fn, deps) is identical to useMemo(() => fn, deps)
}

// ============================================================================
// 6. THREE REAL-WORLD USE CASES (WHEN TO USE IT)
// ============================================================================

// USE CASE 1: Passing callbacks to React.memo child components
function SearchPage() {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

  const handleSearch = useCallback(() => {
    console.log("Searching for:", query);
  }, [query]);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <SearchButton onSearch={handleSearch} />
    </>
  );
}

const SearchButton = React.memo(function SearchButton({ onSearch }) {
  console.log("SearchButton rendered");
  return <button onClick={onSearch}>Search</button>;
});

// USE CASE 2: A callback is used inside a useEffect dependency array
function FetchDataExample({ itemId }) {
  const [data, setData] = useState(null);

  // Memoize the fetch function so it doesn't change on every render
  const fetchData = useCallback(async () => {
    const response = await fetch(`https://api.example.com/items/${itemId}`);
    const result = await response.json();
    setData(result);
  }, [itemId]); // Only recreates if 'itemId' changes

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Safe to include as dependency now!

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}

// USE CASE 3: Exposing stable callbacks from custom hooks
function useCounter() {
  const [count, setCount] = useState(0);

  // Using functional state update (c => c + 1) means we don't need 'count' in deps!
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((c) => c - 1);
  }, []);

  return { count, increment, decrement };
}

// ============================================================================
// 7. WHEN NOT TO USE useCallback (COMMON PITFALLS)
// ============================================================================
/**
 * DO NOT OVERUSE IT:
 * 1. For simple HTML elements (<button onClick={handleClick}>):
 *    Native elements do not care about reference equality. Wrapping functions
 *    for basic elements actually SLOWS DOWN your app because React still does the
 *    work of creating arrays and memory checks on every render.
 *
 * 2. Without React.memo:
 *    If the child component is NOT wrapped in React.memo, passing a memoized
 *    function to it achieves NOTHING—the child will re-render anyway.
 */

function BadExample() {
  const [count, setCount] = useState(0);

  // ❌ BAD: No performance benefit here! Just extra boilerplate code.
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return <button onClick={handleClick}>Count: {count}</button>;
}

// ============================================================================
// 8. ADVANCED PRO TIP: FUNCTIONAL STATE UPDATES
// ============================================================================
/**
 * WANT TO REMOVE STATE FROM DEPENDENCIES?
 * Use the updater form of setState (prev => next).
 */

function TodoApp() {
  const [todos, setTodos] = useState([]);

  // ❌ BAD: 'todos' must be in dependency array, so function is recreated every time a todo is added.
  // const addTodo = useCallback((newTodo) => {
  //   setTodos([...todos, newTodo]);
  // }, [todos]);

  // ✅ GOOD: Uses updater function! No dependencies needed. Function reference stays permanently stable.
  const addTodo = useCallback((newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  return null;
}

// ============================================================================
// 9. SUMMARY CHEAT SHEET
// ============================================================================
/**
 * ┌──────────────────────┬─────────────────────────────────────────────────────────┐
 * │ CONCEPT              │ DESCRIPTION                                             │
 * ├──────────────────────┼─────────────────────────────────────────────────────────┤
 * │ Creation             │ const fn = () => {}; (New ref every render)             │
 * │ Execution            │ fn(); (Runs the code inside)                            │
 * │ Memoization          │ useCallback(() => {}, []); (Stays constant in memory)   │
 * └──────────────────────┴─────────────────────────────────────────────────────────┘
 *
 * THE GOLDEN TRIANGLE OF PERFORMANCE:
 * Parent renders ──► useCallback holds function reference constant ──► React.memo skips child render!
 */
