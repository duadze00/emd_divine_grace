import React, { useState, useEffect } from "react";

/* ==========================================
   1. CUSTOM HOOK: Persistent LocalStorage
   ========================================== */
// Encapsulates state persistence logic so any component can save state to browser storage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (err) {
      console.error("Failed to load local storage:", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to save local storage:", err);
    }
  }, [key, value]);

  return [value, setValue];
}

/* ==========================================
   2. CHILD COMPONENT: Header & Analytics
   ========================================== */
function HeaderStats({ totalTasks, completedTasks }) {
  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <header style={styles.header}>
      <h1>Task Flow Dashboard</h1>
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <span style={styles.statNumber}>{totalTasks}</span>
          <span style={styles.statLabel}>Total Tasks</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statNumber}>{completedTasks}</span>
          <span style={styles.statLabel}>Completed</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statNumber}>{completionPercentage}%</span>
          <span style={styles.statLabel}>Done</span>
        </div>
      </div>
    </header>
  );
}

/* ==========================================
   3. CHILD COMPONENT: Controlled Task Form
   ========================================== */
function TaskForm({ onAddTask }) {
  // Controlled component state for title and category
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents web page reload on submission

    if (!title.trim()) return; // Simple validation

    // Constructing task object payload
    const newTask = {
      id: Date.now().toString(), // Generating a unique identifier key
      title: title.trim(),
      priority: priority,
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    };

    onAddTask(newTask); // Call parent callback function
    setTitle(""); // Clear form input
    setPriority("Medium"); // Reset priority selector
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={styles.select}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <button type="submit" style={styles.addButton}>
        Add Task
      </button>
    </form>
  );
}

/* ==========================================
   4. CHILD COMPONENT: Task Item
   ========================================== */
function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  const priorityColors = {
    Low: "#22c55e",
    Medium: "#f59e0b",
    High: "#ef4444",
  };

  return (
    <li
      style={{
        ...styles.taskItem,
        opacity: task.completed ? 0.6 : 1,
        textDecoration: task.completed ? "line-through" : "none",
      }}
    >
      <div style={styles.taskMain}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          style={styles.checkbox}
        />
        <div>
          <span style={styles.taskTitle}>{task.title}</span>
          <div style={styles.taskMeta}>
            <span
              style={{
                ...styles.badge,
                backgroundColor: priorityColors[task.priority] || "#6b7280",
              }}
            >
              {task.priority}
            </span>
            <small style={styles.date}>Created: {task.createdAt}</small>
          </div>
        </div>
      </div>

      <button
        onClick={() => onDeleteTask(task.id)}
        style={styles.deleteButton}
        title="Delete task"
      >
        🗑️
      </button>
    </li>
  );
}

/* ==========================================
   5. PARENT COMPONENT: Main App
   ========================================== */
function App() {
  // Using custom hook for state persistent across browser reloads
  const [tasks, setTasks] = useLocalStorage("app_tasks", [
    {
      id: "1",
      title: "Learn React Hooks",
      priority: "High",
      completed: true,
      createdAt: "2026-08-01",
    },
    {
      id: "2",
      title: "Build Task Manager App",
      priority: "Medium",
      completed: false,
      createdAt: "2026-08-01",
    },
  ]);

  // Filtering state
  const [filter, setFilter] = useState("All"); // Options: 'All', 'Active', 'Completed'

  // Handler: Add Task
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Handler: Toggle Completion State
  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Handler: Delete Task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Derived state for filtering
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true; // 'All'
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div style={styles.container}>
      <HeaderStats totalTasks={tasks.length} completedTasks={completedCount} />

      <TaskForm onAddTask={handleAddTask} />

      {/* Filter Control Section */}
      <div style={styles.filterGroup}>
        {["All", "Active", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              ...styles.filterBtn,
              backgroundColor: filter === tab ? "#3b82f6" : "#e5e7eb",
              color: filter === tab ? "#ffffff" : "#374151",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditional Rendering & List Mapping */}
      {filteredTasks.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No tasks found under "{filter}".</p>
        </div>
      ) : (
        <ul style={styles.taskList}>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

/* ==========================================
   6. STYLES (Inline JavaScript Style Object)
   ========================================== */
const styles = {
  container: {
    maxWidth: "650px",
    margin: "40px auto",
    padding: "24px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    color: "#1f2937",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "16px",
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statNumber: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#3b82f6",
  },
  statLabel: {
    fontSize: "12px",
    color: "#6b7280",
  },
  form: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  addButton: {
    padding: "10px 18px",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
  filterGroup: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  filterBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    marginBottom: "8px",
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    border: "1px solid #f3f4f6",
  },
  taskMain: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  taskTitle: {
    fontWeight: "500",
    fontSize: "15px",
  },
  taskMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "4px",
  },
  badge: {
    padding: "2px 6px",
    color: "#ffffff",
    fontSize: "10px",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  date: {
    color: "#9ca3af",
    fontSize: "11px",
  },
  deleteButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  emptyState: {
    textAlign: "center",
    padding: "32px",
    color: "#9ca3af",
  },
};

export default App;
