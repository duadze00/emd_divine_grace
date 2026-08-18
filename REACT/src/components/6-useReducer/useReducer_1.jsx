import { useReducer } from "react";

// 1. Define the initial state object outside the component
const initialState = { count: 0 };

// 2. Move the reducer function OUTSIDE the component so it isn't re-created on every render
function reducer(state, action) {
  // Use a switch statement to handle different action types
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "add":
      // Reading extra data sent via action.payload
      return { count: state.count + action.payload };
    case "reset":
      return initialState;
    default:
      // Always handle unexpected action types safely
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function UseReducer() {
  // 3. Initialize useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>useReducer Demo</h1>
      <h2>Current Count: {state.count}</h2>

      {/* 4. Dispatch actions when buttons are clicked */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => dispatch({ type: "increment" })}>
          Increment (+1)
        </button>
        <button onClick={() => dispatch({ type: "decrement" })}>
          Decrement (-1)
        </button>
        <button onClick={() => dispatch({ type: "add", payload: 10 })}>
          Add 10
        </button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}

export default UseReducer;

// CLICK
//   ↓
// dispatch()
//   ↓
// ACTION
//   ↓
// REDUCER
//   ↓
// NEW STATE
//   ↓
// RENDER
