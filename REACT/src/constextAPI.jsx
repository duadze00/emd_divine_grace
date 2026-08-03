import React, { createContext, useContext, useState } from "react";

// ==========================================
// SUBTOPIC 3.1: CREATING THE CONTEXT
// ==========================================
// Context lets components share state deep in the tree without "prop drilling".
const ThemeContext = createContext(null);

// ==========================================
// SUBTOPIC 3.2: CONTEXT PROVIDER COMPONENT
// ==========================================
// Wraps child components and provides the state value.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ==========================================
// SUBTOPIC 3.3: CUSTOM HOOK FOR CONSUMING CONTEXT
// ==========================================
// Job-ready pattern: Always expose a custom hook to consume context safely.
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// ==========================================
// SUBTOPIC 3.4: CONSUMING CONTEXT IN DEEP CHILD COMPONENTS
// ==========================================
function DeepNestedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === "light" ? "#333" : "#fff",
        color: theme === "light" ? "#fff" : "#333",
        padding: "10px 15px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Current Theme: {theme} (Click to Toggle)
    </button>
  );
}

// Outer wrapper showing how everything links together
export default function ContextTopic() {
  return (
    <ThemeProvider>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h2>3. Context API Masterclass</h2>
        <p>This button consumes global state without receiving props!</p>
        <DeepNestedButton />
      </div>
    </ThemeProvider>
  );
}
