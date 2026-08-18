import { useReducer, useEffect, useState } from "react";

const initialState = {
  todos: [],
};

// Lazy initializer to read from localStorage on initial render
const init = (initialState) => {
  const saved = localStorage.getItem("todos_app_state");
  return saved ? JSON.parse(saved) : initialState;
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case "CLEAR_TODOS":
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
}

function UseReducer() {
  // Pass init function as the 3rd argument to useReducer
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const [text, setText] = useState("");

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem("todos_app_state", JSON.stringify(state));
  }, [state]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch({
      type: "ADD_TODO",
      payload: { id: Date.now(), text: text.trim(), completed: false },
    });
    setText("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h1>Todo List</h1>

      {/* Form for adding items */}
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit">Add</button>
      </form>

      {/* Clear All button */}
      {state.todos.length > 0 && (
        <button
          onClick={() => dispatch({ type: "CLEAR_TODOS" })}
          style={{
            marginBottom: "16px",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Clear All
        </button>
      )}

      {/* Render todos */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span
              onClick={() =>
                dispatch({ type: "TOGGLE_TODO", payload: todo.id })
              }
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
                color: todo.completed ? "#888" : "#000",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: todo.id })
              }
              style={{ padding: "4px 8px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UseReducer;
