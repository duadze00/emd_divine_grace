import React, { useReducer } from "react";

// When state logic becomes complex (multiple actions affecting the same state, or states depending on each other), useReducer is cleaner and easier to scale than multiple useState calls.

// ==========================================
// SUBTOPIC 8.1: REDUCER FUNCTION & ACTION TYPES
// ==========================================
// Reducers are pure functions: (current state, action) => new state.
const initialState = { count: 0, step: 1, error: null };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: Math.max(0, state.count - state.step) };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function UseReducerTopic() {
  // ==========================================
  // SUBTOPIC 8.2: HOOK INITIALIZATION & DISPATCHING
  // ==========================================
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>8. useReducer Masterclass</h2>
      <p>
        Count: <strong>{state.count}</strong> (Step: {state.step})
      </p>

      {/* Dispatching Actions with Type and Payload */}
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        + Increase
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        - Decrease
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>

      {/* Payload example */}
      <div style={{ marginTop: "10px" }}>
        <label>Change Step Size: </label>
        <select
          value={state.step}
          onChange={(e) =>
            dispatch({ type: "SET_STEP", payload: Number(e.target.value) })
          }
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
    </div>
  );
}
