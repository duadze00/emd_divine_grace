import { useEffect, useState } from "react";

// ============================================================
// * LIFECYCLE OF COMPONENTS
// ============================================================

// Each component in React has a lifecycle that you can observe
// and respond to during its three main phases.

// * THREE PHASES
// 1. Mounting
// 2. Updating
// 3. Unmounting

// ============================================================
// * MOUNTING
// ============================================================

// Mounting means React creates the component and adds its
// rendered output to the DOM.
//
// Mounting happens when a component appears on the screen
// for the first time.

function Child() {
  const [count, setCount] = useState(0);

  // ==========================================================
  // * MOUNTING + UPDATING + UNMOUNTING WITH useEffect
  // ==========================================================

  useEffect(() => {
    // This code runs after the component mounts.
    console.log("Child component mounted");

    // The cleanup function runs when the component unmounts.
    return () => {
      console.log("Child component unmounted");
    };
  }, []);

  // ==========================================================
  // * UPDATING
  // ==========================================================

  // The component is updated whenever its state or props change.
  //
  // Clicking the button changes the state.
  // Changing the state causes React to render the component again.

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return (
    <div>
      <h2>Child Component</h2>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}

// ============================================================
// * PARENT COMPONENT
// ============================================================

function App() {
  const [showChild, setShowChild] = useState(true);

  return (
    <div>
      <h1>React Component Lifecycle</h1>

      <button onClick={() => setShowChild(!showChild)}>
        {showChild ? "Unmount Child" : "Mount Child"}
      </button>

      <hr />

      {showChild && <Child />}
    </div>
  );
}

export default App;

//           MOUNTING
//              ↓
//     Component is created
//              ↓
//     Rendered to the DOM
//              ↓
//     useEffect runs
//              ↓
//         UPDATING
//              ↓
//  State or props change
//              ↓
//        Re-render
//              ↓
//  Relevant useEffect runs
//              ↓
//     More updates...
//              ↓
//        UNMOUNTING
//              ↓
//  Component removed from DOM
//              ↓
//   Effect cleanup runs
