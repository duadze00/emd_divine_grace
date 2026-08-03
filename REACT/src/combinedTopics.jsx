import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
  useRef,
  useMemo,
  useCallback,
  Component,
} from "react";
import ReactDOM from "react-dom";

// ============================================================================
// TOPIC 3: CONTEXT API
// ============================================================================
// 3.1 Creating Context
const ThemeContext = createContext(null);

// 3.2 Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3.3 Custom Hook to Consume Context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

// ============================================================================
// TOPIC 8: USEREDUCER (COMPLEX STATE MANAGEMENT)
// ============================================================================
// 8.1 Reducer Function & Action Types
const initialTaskState = { tasks: [], count: 0 };

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        count: state.count + 1,
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
}

// ============================================================================
// TOPIC 10: PERFORMANCE OPTIMIZATION (REACT.MEMO)
// ============================================================================
// 10.1 React.memo prevents unnecessary re-renders if props don't change
const TaskListItem = React.memo(({ task, onToggle, onDelete }) => {
  console.log(`[Render] TaskListItem ID: ${task.id}`);
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
        marginBottom: "6px",
        backgroundColor: "#f3f4f6",
        borderRadius: "4px",
        textDecoration: task.completed ? "line-through" : "none",
      }}
    >
      <span
        onClick={() => onToggle(task.id)}
        style={{ cursor: "pointer", flexGrow: 1 }}
      >
        {task.completed ? "✓ " : "○ "} {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "4px 8px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </li>
  );
});

// ============================================================================
// TOPIC 11: ERROR BOUNDARIES
// ============================================================================
// 11.1 Class-based Error Boundary catches child component runtime crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fee2e2",
            border: "1px solid #ef4444",
            borderRadius: "4px",
            color: "#b91c1c",
          }}
        >
          <h4>Caught by Error Boundary!</h4>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// 11.2 Buggy Component to test Error Boundary
function BuggyTester() {
  const [crash, setCrash] = useState(false);
  if (crash) throw new Error("Simulated runtime error!");

  return (
    <button
      onClick={() => setCrash(true)}
      style={{
        background: "#dc2626",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Test Error Boundary Crash
    </button>
  );
}

// ============================================================================
// TOPIC 12: REACT PORTALS
// ============================================================================
// 12.1 Renders element directly into document.body to bypass layout z-index issues
function ModalPortal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          minWidth: "300px",
          color: "#111",
        }}
      >
        {children}
        <button
          onClick={onClose}
          style={{ marginTop: "16px", padding: "6px 12px", cursor: "pointer" }}
        >
          Close Portal Modal
        </button>
      </div>
    </div>,
    document.body,
  );
}

// ============================================================================
// MAIN COMPONENT (COMBINING ALL TOPICS)
// ============================================================================
function MasterReactApp() {
  // --------------------------------------------------------------------------
  // TOPIC 1: USESTATE
  // --------------------------------------------------------------------------
  // 1.1 Primitive State
  const [filter, setFilter] = useState("all");

  // 1.2 Form State Object (Controlled Input)
  const [formData, setFormData] = useState({ text: "", category: "work" });
  const [formError, setFormError] = useState("");

  // 1.3 Lazy State Initialization
  const [savedPreference] = useState(() => {
    return "Loaded from Lazy State Initialization";
  });

  // --------------------------------------------------------------------------
  // TOPIC 8: USEREDUCER HOOK INITIALIZATION
  // --------------------------------------------------------------------------
  // 8.2 Dispatching actions to manage array updates immutably
  const [taskState, dispatch] = useReducer(taskReducer, initialTaskState);

  // --------------------------------------------------------------------------
  // TOPIC 9: USEREF
  // --------------------------------------------------------------------------
  // 9.1 DOM Node Access
  const inputRef = useRef(null);

  // 9.2 Mutable Persistence across renders without causing re-render
  const renderCounterRef = useRef(0);
  renderCounterRef.current += 1;

  // --------------------------------------------------------------------------
  // TOPIC 2: USEEFFECT & API DATA FETCHING
  // --------------------------------------------------------------------------
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2.1 Fetch with AbortController and Cleanup Function
  useEffect(() => {
    const controller = new AbortController();

    async function fetchSampleData() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1",
          {
            signal: controller.signal,
          },
        );
        const json = await response.json();
        setApiData(json);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSampleData();

    // 2.3 Effect Cleanup
    return () => controller.abort();
  }, []);

  // --------------------------------------------------------------------------
  // TOPIC 3: CONTEXT CONSUMPTION
  // --------------------------------------------------------------------------
  const { theme, toggleTheme } = useTheme();

  // --------------------------------------------------------------------------
  // TOPIC 4: FORMS & EVENT HANDLING
  // --------------------------------------------------------------------------
  // 4.1 Universal Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4.2 Form Submit Handler with Validation
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Stop page reload

    if (!formData.text.trim()) {
      setFormError("Task text cannot be empty");
      return;
    }

    setFormError("");
    dispatch({
      type: "ADD_TASK",
      payload: { id: Date.now(), text: formData.text, completed: false },
    });

    setFormData((prev) => ({ ...prev, text: "" }));
  };

  // --------------------------------------------------------------------------
  // TOPIC 10: PERFORMANCE OPTIMIZATION (USECALLBACK & USEMEMO)
  // --------------------------------------------------------------------------
  // 10.3 useCallback gives stable references to handlers passed down to React.memo children
  const handleToggleTask = useCallback((id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  }, []);

  const handleDeleteTask = useCallback((id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  // 10.2 useMemo caches expensive array filtering operations
  const filteredTasks = useMemo(() => {
    return taskState.tasks.filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });
  }, [taskState.tasks, filter]);

  // --------------------------------------------------------------------------
  // TOPIC 12: PORTAL MODAL STATE
  // --------------------------------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --------------------------------------------------------------------------
  // TOPIC 1: JSX LAYOUT & DYNAMIC STYLING
  // --------------------------------------------------------------------------
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: theme === "light" ? "#ffffff" : "#1f2937",
        color: theme === "light" ? "#111827" : "#f9fafb",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
      }}
    >
      <h2>Job-Ready React Master Reference</h2>
      <p style={{ fontSize: "0.875rem", opacity: 0.8 }}>
        Render count: {renderCounterRef.current} | {savedPreference}
      </p>

      {/* TOPIC 3 CONTROL */}
      <button
        onClick={toggleTheme}
        style={{ padding: "6px 12px", marginBottom: "16px", cursor: "pointer" }}
      >
        Toggle Theme Context (Current: {theme})
      </button>

      {/* TOPIC 4: CONTROLLED FORM */}
      <form onSubmit={handleFormSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <input
            ref={inputRef} // TOPIC 9: DOM Ref
            type="text"
            name="text"
            placeholder="Enter task text..."
            value={formData.text}
            onChange={handleInputChange}
            style={{
              flexGrow: 1,
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </div>
        {formError && (
          <span style={{ color: "#ef4444", fontSize: "0.85rem" }}>
            {formError}
          </span>
        )}
      </form>

      {/* TOPIC 9: DIRECT DOM ACTION */}
      <button
        onClick={() => inputRef.current.focus()}
        style={{ marginBottom: "16px", cursor: "pointer" }}
      >
        Focus Input via useRef
      </button>

      {/* TOPIC 1: FILTER BUTTONS */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {["all", "active", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              textTransform: "capitalize",
              border: "1px solid #ccc",
              backgroundColor: filter === type ? "#2563eb" : "#fff",
              color: filter === type ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* TOPIC 8 & 10: MEMOIZED LIST RENDERING */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.length === 0 ? (
          <p style={{ fontStyle: "italic", opacity: 0.6 }}>
            No tasks match filter.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </ul>

      {/* TOPIC 2: API DATA RENDERING */}
      <div
        style={{
          borderTop: "1px solid #ccc",
          paddingTop: "16px",
          marginTop: "20px",
        }}
      >
        <h4>useEffect API Status:</h4>
        {loading ? (
          <p>Loading API data...</p>
        ) : (
          <p>Fetched Todo Title: "{apiData?.title}"</p>
        )}
      </div>

      {/* TOPIC 11 & 12 EXAMPLES */}
      <div
        style={{
          borderTop: "1px solid #ccc",
          paddingTop: "16px",
          marginTop: "20px",
          display: "flex",
          gap: "12px",
        }}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ padding: "6px 12px", cursor: "pointer" }}
        >
          Open React Portal
        </button>

        <ErrorBoundary>
          <BuggyTester />
        </ErrorBoundary>
      </div>

      {/* TOPIC 12: PORTAL MODAL */}
      <ModalPortal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>React Portal Active</h3>
        <p>
          This modal is rendered directly into document.body using
          ReactDOM.createPortal!
        </p>
      </ModalPortal>
    </div>
  );
}

// Wrapper providing global theme context
export default function App() {
  return (
    <ThemeProvider>
      <MasterReactApp />
    </ThemeProvider>
  );
}
