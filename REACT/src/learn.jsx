import React, { useState, useEffect } from 'react';

// ==========================================
// 1. ADVANCED PATTERN: Custom Hook
// ==========================================
// Custom hooks allow you to extract and reuse stateful logic across components.
// Here we create a custom hook to persist and synchronize state with localStorage.
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key:', key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage key:', key, error);
    }
  }, [key, value]);

  return [value, setValue];
}

// ==========================================
// 2. INTERMEDIATE PATTERN: Presentational Component
// ==========================================
// Demonstrates: Props destructuring, Conditional Rendering, and Event Delegation/Callbacks.
function TaskItem({ task, onToggleComplete, onDelete }) {
  // JSX Rule: Event handlers can pass inline functions or call props directly.
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        padding: '8px 12px',
        marginBottom: '8px',
        backgroundColor: '#f4f4f5',
        borderRadius: '4px',
        // JSX: Style attributes use camelCase and JavaScript objects
        textDecoration: task.completed ? 'line-through' : 'none',
        opacity: task.completed ? 0.6 : 1,
      }}
    >
      <span
        onClick={() => onToggleComplete(task.id)}
        style={{ cursor: 'pointer', flexGrow: 1 }}
      >
        {/* JSX Rule: Wrap JS expressions in curly braces {} */}
        {task.completed ? '✓ ' : '○ '}
        {task.text}
      </span>
      
      {/* Event handling: Calling parent handler with specific argument */}
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </li>
  );
}

// ==========================================
// 3. MAIN COMPONENT (BEGINNER -> ADVANCED)
// ==========================================
export default function JobReadyReferenceApp() {
  // ----------------------------------------
  // A. STATE MANAGEMENT (`useState`)
  // ----------------------------------------
  // State holds data that changes over time and triggers re-renders when updated.
  
  // 1. Simple Primitive State
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // 2. Form Input State (Controlled Component)
  const [inputText, setInputText] = useState('');

  // 3. Custom Hook State (Persisted Array State)
  const [tasks, setTasks] = useLocalStorage('react_reference_tasks', [
    { id: 1, text: 'Master React JSX', completed: true },
    { id: 2, text: 'Understand State & Props', completed: false },
  ]);

  // ----------------------------------------
  // B. EVENT HANDLERS
  // ----------------------------------------

  // Form Submission Handler
  const handleAddTask = (e) => {
    // IMPORTANT: Prevent default browser page reload on form submit
    e.preventDefault();

    // Guard clause: Avoid adding empty tasks
    if (!inputText.trim()) return;

    const newTask = {
      id: Date.now(), // Generate unique ID
      text: inputText.trim(),
      completed: false,
    };

    // IMMUTABILITY RULE: Never modify state directly (e.g., tasks.push(newTask) is BAD).
    // Always return a new array or object using the spread operator (...).
    setTasks((prevTasks) => [...prevTasks, newTask]);
    
    // Reset input field state
    setInputText('');
  };

  // Toggle Completion Handler (Updating an object inside an array immutably)
  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete Task Handler (Filtering out an item immutably)
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // ----------------------------------------
  // C. DERIVED STATE (No extra useState needed)
  // ----------------------------------------
  // Calculate values during render instead of creating duplicate state variables.
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const remainingCount = tasks.filter((t) => !t.completed).length;

  // ----------------------------------------
  // D. JSX LAYOUT & CONDITIONAL RENDERING
  // ----------------------------------------
  return (
    <div
      style={{
        maxWidth: '450px',
        margin: '40px auto',
        padding: '24px',
        fontFamily: 'system-ui, sans-serif',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <h2>Task Manager Reference</h2>

      {/* Controlled Form Component */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Add a new task..."
          // Controlled input: Value is bound to state, change updates state
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ flexGrow: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{ padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add
        </button>
      </form>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['all', 'active', 'completed'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              padding: '4px 12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              // Dynamic styling based on state
              backgroundColor: filter === type ? '#2563eb' : '#fff',
              color: filter === type ? '#fff' : '#000',
              textTransform: 'capitalize',
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Task List Rendering */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {/* CONDITIONAL RENDERING: Short-circuit (&&) or Ternary Operator */}
        {filteredTasks.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No tasks found.</p>
        ) : (
          // Mapping array data to components. MUST provide a unique 'key' prop!
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </ul>

      {/* Footer / Derived Data display */}
      <footer style={{ marginTop: '16px', fontSize: '0.875rem', color: '#6b7280' }}>
        {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining
      </footer>
    </div>
  );
}
