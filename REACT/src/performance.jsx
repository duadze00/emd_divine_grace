// React re-renders components by default when parents render. Learn React.memo, useCallback, and useMemo to prevent expensive recalculations.

import React, { useState, useMemo, useCallback } from "react";

// ==========================================
// SUBTOPIC 10.1: REACT.MEMO (COMPONENT SKIPPING)
// ==========================================
// Skips re-rendering Child if props haven't changed.
const HeavyChild = React.memo(({ onClick, label }) => {
  console.log(`[Render] HeavyChild: ${label}`);
  return (
    <button onClick={onClick} style={{ margin: "5px" }}>
      {label}
    </button>
  );
});

export default function PerformanceTopic() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ==========================================
  // SUBTOPIC 10.2: USEMEMO (EXPONSIVE CALCULATIONS)
  // ==========================================
  // Caches calculation results unless dependencies change.
  const expensiveCalculation = useMemo(() => {
    console.log("[Calc] Running heavy computation...");
    let total = 0;
    for (let i = 0; i < 10000000; i++) total += i;
    return total + count;
  }, [count]); // Only recalculates when `count` changes, NOT when `text` changes

  // ==========================================
  // SUBTOPIC 10.3: USECALLBACK (STABLE FUNCTION REFERENCES)
  // ==========================================
  // Prevents re-creating callback functions on every render (keeps props stable for React.memo).
  const handleChildClick = useCallback(() => {
    console.log("Child clicked!");
  }, []); // Empty array = stable reference across renders

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>10. Performance Optimization Masterclass</h2>

      <p>
        Expensive Total: <strong>{expensiveCalculation}</strong>
      </p>

      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment Count ({count})
      </button>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={text}
          placeholder="Type here..."
          onChange={(e) => setText(e.target.value)}
        />
        <p>
          Text (Typing won't trigger expensive calc or child render): {text}
        </p>
      </div>

      <HeavyChild onClick={handleChildClick} label="Stable Child Button" />
    </div>
  );
}
