import React, { useState } from 'react';

export default function UseStateTopic() {
  // ==========================================
  // SUBTOPIC 1.1: PRIMITIVE STATE & BASIC UPDATES
  // ==========================================
  // Primitive values: numbers, strings, booleans.
  const [count, setCount] = useState(0);

  // ==========================================
  // SUBTOPIC 1.2: FUNCTIONAL UPDATES (PREVIOUS STATE)
  // ==========================================
  // Rule: When the new state depends on the previous state, pass a callback.
  // Batching: Multiple updates using functional updates execute sequentially.
  const handleTripleIncrement = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  // ==========================================
  // SUBTOPIC 1.3: OBJECT STATE & IMMUTABILITY
  // ==========================================
  // React compares references. You MUST pass a NEW object using the spread operator (...).
  const [user, setUser] = useState({ name: 'Alex', role: 'Developer' });

  const updateRole = () => {
    setUser((prevUser) => ({
      ...prevUser, // 1. Copy old properties
      role: 'Senior Developer' // 2. Overwrite target property
    }));
  };

  // ==========================================
  // SUBTOPIC 1.4: ARRAY STATE (ADDING, REMOVING, UPDATING)
  // ==========================================
  // Never use mutating methods like .push(), .pop(), or .splice().
  const [items, setItems] = useState(['HTML', 'CSS']);

  const addItem = () => {
    // Adding: Spread existing items into a new array
    setItems((prev) => [...prev, 'JavaScript']);
  };

  const removeItem = (targetIndex) => {
    // Removing: Use .filter() to create a new array excluding the target
    setItems((prev) => prev.filter((_, index) => index !== targetIndex));
  };

  const updateItem = (targetIndex) => {
    // Updating: Use .map() to produce a transformed new array
    setItems((prev) =>
      prev.map((item, index) => (index === targetIndex ? `${item} (Mastered)` : item))
    );
  };

  // ==========================================
  // SUBTOPIC 1.5: LAZY INITIALIZATION
  // ==========================================
  // If calculating initial state is expensive (e.g., reading localStorage),
  // pass a function to useState so it only runs on initial render.
  const [savedData] = useState(() => {
    // Heavy computational work or localStorage reading goes here
    return 'Expensive Initial Value';
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>1. useState Masterclass</h2>
      
      {/* 1.1 & 1.2 Output */}
      <section style={{ marginBottom: '16px' }}>
        <h3>Count: {count}</h3>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={handleTripleIncrement}>+3 (Functional)</button>
      </section>

      {/* 1.3 Output */}
      <section style={{ marginBottom: '16px' }}>
        <h3>User: {user.name} ({user.role})</h3>
        <button onClick={updateRole}>Promote Role</button>
      </section>

      {/* 1.4 Output */}
      <section style={{ marginBottom: '16px' }}>
        <h3>Array Management:</h3>
        <button onClick={addItem}>Add JS</button>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item}{' '}
              <button onClick={() => updateItem(index)}>Update</button>{' '}
              <button onClick={() => removeItem(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* 1.5 Output */}
      <section>
        <p>Lazy Initial State: {savedData}</p>
      </section>
    </div>
  );
}
