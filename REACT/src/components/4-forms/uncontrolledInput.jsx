import { useRef } from "react";

/**
 ** UNCONTROLLED INPUT COMPONENT.
 *
 ** WHY USE IT:
 * - Integrates smoothly with non-React code or legacy libraries.
 * - Requires less boilerplate code for simple forms (no state or change handlers per input).
 * - Ideal for file inputs (`<input type="file" />`) since file data cannot be stored in standard state easily.
 *
 ** HOW IT WORKS:
 * 1. A `useRef` hook creates a reference object pointing directly to the DOM node.
 * 2. The input uses a standard HTML `ref` attribute to attach itself to that reference.
 * 3. React does not track keystrokes; instead, we query `inputRef.current.value` only when we need it.
 */
function UncontrolledInput() {
  // Create a ref to access the DOM input element directly
  const inputRef = useRef(null);

  // Handle form submission
  const handleSubmit = (e) => {
    // Prevent default browser page reload behavior
    e.preventDefault();

    // Access the raw DOM node's value via .current.value
    const inputValue = inputRef.current.value;

    if (inputValue.trim() === "") {
      alert("Input cannot be empty!");
      return;
    }

    alert(`Submitted Uncontrolled Value: ${inputValue}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Uncontrolled Component Example</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="uncontrolled-username">Username: </label>
          <input
            id="uncontrolled-username"
            type="text"
            // Attach the ref directly to the native DOM element
            ref={inputRef}
            placeholder="Type your name..."
            style={{ padding: "6px", fontSize: "14px" }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Submit Uncontrolled Form
        </button>
      </form>

      <p style={{ marginTop: "15px", fontStyle: "italic" }}>
        Note: Typing here does not trigger re-renders because React state isn't
        tracking keystrokes.
      </p>
    </div>
  );
}

export default UncontrolledInput;
