import { useState } from "react";

/**
 ** CONTROLLED INPUT COMPONENT.
 *
 ** WHY USE IT:
 * - React state is the "single source of truth" for the form data.
 * - Enables instant, real-time validation, formatting or conditional button disabling.
 *
 ** HOW IT WORKS:
 * 1. The input's `value` prop is permanently bound to a state variable (`username`).
 * 2. Every keystroke triggers `onChange`, which updates the state via `setUsername`.
 * 3. React re-renders the component, displaying the newly synchronized state value.
 */
function ControlledInput() {
  // Initialize state to hold the input value
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  // Handle changes on every keystroke
  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    // Real-time validation example
    if (value.length < 3 && value.length > 0) {
      setError("Username must be at least 3 characters long.");
    } else {
      setError("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // Prevent default browser page reload behavior
    e.preventDefault();

    if (username.trim() === "") {
      setError("Username cannot be empty.");
      return;
    }

    alert(`Submitted Controlled Value: ${username}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Controlled Component Example</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="controlled-username">Username: </label>
          <input
            id="controlled-username"
            type="text"
            // 1. Value is strictly tied to React state
            value={username}
            // 2. State updates on every change event
            onChange={handleChange}
            placeholder="Type your name..."
            style={{ padding: "6px", fontSize: "14px" }}
          />
        </div>

        {/* Conditional styling and feedback driven directly by state */}
        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}

        <button
          type="submit"
          // Disable button dynamically based on state criteria
          disabled={Boolean(error) || username.trim() === ""}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Submit Controlled Form
        </button>
      </form>

      <p style={{ marginTop: "15px", fontStyle: "italic" }}>
        Current Live State Value: <strong>{username}</strong>
      </p>
    </div>
  );
}

export default ControlledInput;
