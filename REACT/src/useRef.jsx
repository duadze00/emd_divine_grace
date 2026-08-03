// ​useRef is used to:
// ​Access DOM nodes directly (focus, scroll, measurements).
// ​Store mutable values across renders without triggering re-renders.

import React, { useRef, useState } from 'react';

export default function UseRefTopic() {
  // ==========================================
  // SUBTOPIC 9.1: DOM NODE ACCESS & FOCUS MANAGEMENT
  // ==========================================
  const inputRef = useRef(null);

  const handleFocusInput = () => {
    // Focus the HTML input directly via ref.current
    inputRef.current.focus();
    inputRef.current.style.border = '2px solid green';
  };

  // ==========================================
  // SUBTOPIC 9.2: PERSISTING VALUES WITHOUT RE-RENDERING
  // ==========================================
  // Unlike state, updating ref.current DOES NOT cause component re-renders.
  const renderCountRef = useRef(0);
  const [, setDummyState] = useState(0); // Trigger dummy render

  renderCountRef.current += 1;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>9. useRef Masterclass</h2>
      
      {/* 9.1 Focus Management */}
      <div style={{ marginBottom: '20px' }}>
        <input ref={inputRef} type="text" placeholder="Click button to focus me..." />
        <button onClick={handleFocusInput}>Focus Input</button>
      </div>

      {/* 9.2 Mutable Persistence */}
      <div>
        <p>This component has rendered: <strong>{renderCountRef.current}</strong> times.</p>
        <button onClick={() => setDummyState((prev) => prev + 1)}>Force Component Render</button>
      </div>
    </div>
  );
}
