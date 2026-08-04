// In React, standard JavaScript errors inside components break the entire UI tree unless caught by an Error Boundary class component.

import React, { Component } from "react";

// ==========================================
// CLASS-BASED ERROR BOUNDARY
// ==========================================
// Error boundaries MUST be Class Components (Hooks do not exist yet for getDerivedStateFromError).
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an reporting service (e.g., Sentry)
    console.error("Logged to error reporting service:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            background: "#fee2e2",
            border: "1px solid #ef4444",
            borderRadius: "4px",
          }}
        >
          <h3>Something went wrong!</h3>
          <p style={{ color: "#b91c1c" }}>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// FAULTY COMPONENT TEST
// ==========================================
function BuggyComponent() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("Crashing on purpose to test ErrorBoundary!");
  }

  return (
    <button
      onClick={() => setShouldCrash(true)}
      style={{ background: "#ef4444", color: "white" }}
    >
      Trigger Component Crash
    </button>
  );
}

export default function ErrorBoundaryTopic() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Error Boundary Masterclass</h2>
      <p>
        If the component crashes, the boundary catches it without breaking the
        rest of the application UI.
      </p>

      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
}
