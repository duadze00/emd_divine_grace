import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

/*
  =============================================================================
  REACT CUSTOM HOOKS
  =============================================================================

  WHAT IS A CUSTOM HOOK?
  A custom hook is a JavaScript function whose name starts with "use" and that 
  can call other React hooks (useState, useEffect, useContext, etc.).

  CUSTOM HOOK vs COMPONENT:
  - Component   ---> Returns JSX (UI elements)
  - Custom Hook ---> Returns Data, Functions, or State tuples

  WHY USE CUSTOM HOOKS?
  1. Reusability: Share stateful logic across multiple components.
  2. Clean Architecture: Keep UI components concise and focused purely on rendering.
  3. Separated Concerns: Isolate side effects and complex state workflows.

  MUST-KNOW RULES FOR INTERVIEWS:
  1. Name MUST start with "use": Enforces Rules of Hooks via React's linter.
  2. Isolated State: Every time you call a custom hook, the state inside it is 
     completely isolated. Component A and Component B calling useCounter() do NOT 
     share the count state.
  3. Hook Placement: Call custom hooks ONLY at the top level of function components 
     or inside other custom hooks—never inside loops, conditions, or module top-level logic.
  4. Context Guards: Always check if context returns undefined/null when creating 
     context wrapper hooks to catch missing Provider errors early.
*/

// =============================================================================
// 1. CUSTOM HOOK: useToggle (UI State Helper)
// =============================================================================
// Reusable helper for handling boolean states (modals, dark mode, dropdowns).
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Memoized with useCallback so the reference stays stable across parent re-renders
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  // Return as an array tuple [value, toggle, setValue] for flexible naming upon destructuring
  return [value, toggle, setValue];
}

// =============================================================================
// 2. CUSTOM HOOK: useLocalStorage (Persistent State)
// =============================================================================
// Keeps React state synchronized with browser localStorage.
function useLocalStorage(key, initialValue) {
  // Lazy initial state function runs only once during initial render (prevents disk read overhead)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync state changes back to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`[useLocalStorage] Error writing key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// =============================================================================
// 3. CUSTOM HOOK: useFetch (Production-Grade Async Fetcher)
// =============================================================================
// Handles async requests, loading, errors, and cleanup to prevent memory leaks.
function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    loading: Boolean(url),
    error: null,
  });

  useEffect(() => {
    // Return early if no URL is provided (allows conditional fetching)
    if (!url) {
      return;
    }

    // AbortController cancels pending HTTP requests if component unmounts
    // or if the URL changes before the request finishes.
    const controller = new AbortController();

    async function fetchData() {
      // Start loading and clear any previous error
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const json = await response.json();

        // Store the fetched data and stop loading
        setState({
          data: json,
          loading: false,
          error: null,
        });
      } catch (err) {
        // Ignore errors caused intentionally by AbortController
        if (err.name === "AbortError") {
          return;
        }

        // Store the error and stop loading
        setState({
          data: null,
          loading: false,
          error: err.message,
        });
      }
    }

    fetchData();

    // Cleanup function cancels the active fetch when URL changes
    // or when the component unmounts.
    return () => controller.abort();
  }, [url]);

  return state;
}

// =============================================================================
// 4. CUSTOM HOOK & CONTEXT: Auth Context Wrapper
// =============================================================================
// Standard React design pattern: Combining React Context with a custom consumption hook.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "Eric",
    id: 1,
    email: "eric@example.com",
  });

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to consume AuthContext safely
function useAuth() {
  const context = useContext(AuthContext);

  // Industry standard safety guard
  if (!context) {
    throw new Error("useAuth must be called within an AuthProvider component");
  }

  return context;
}

// =============================================================================
// 5. DEMO COMPONENT: CustomHooksDemo
// =============================================================================
// Showcases all custom hooks working together in a single component.

function UserProfileCard() {
  // Consuming Custom Context Hook
  const { user, logout, login } = useAuth();

  // Consuming Custom LocalStorage Hook
  const [theme, setTheme] = useLocalStorage("app-theme", "light");

  // Consuming Custom Toggle Hook
  const [isDetailsVisible, toggleDetails] = useToggle(false);

  // Consuming Custom Fetch Hook (dynamic URL based on auth state)
  const fetchUrl = user
    ? `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    : null;
  const { data: posts, loading, error } = useFetch(fetchUrl);

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: theme === "dark" ? "#222" : "#f9f9f9",
        color: theme === "dark" ? "#fff" : "#333",
        border: "1px solid #ccc",
        maxWidth: "500px",
        margin: "20px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Custom Hooks Demo</h2>

      {/* Local Storage Controls */}
      <p>
        Current Stored Theme: <strong>{theme}</strong>
      </p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme (Persisted)
      </button>

      <hr style={{ margin: "20px 0" }} />

      {/* Auth Context Usage */}
      {user ? (
        <div>
          <h3>Welcome back, {user.name}!</h3>
          <p>Email: {user.email}</p>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>User is logged out.</p>
          <button
            onClick={() =>
              login({ name: "Eric", id: 1, email: "eric@example.com" })
            }
          >
            Log In
          </button>
        </div>
      )}

      <hr style={{ margin: "20px 0" }} />

      {/* Toggle Hook Usage */}
      <button onClick={toggleDetails}>
        {isDetailsVisible ? "Hide Extra Details" : "Show Extra Details"}
      </button>

      {isDetailsVisible && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            background: "rgba(0,0,0,0.05)",
          }}
        >
          <h4>Fetched Posts (via useFetch)</h4>
          {loading && <p>Loading data...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {posts && (
            <ul>
              {posts.slice(0, 3).map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

// Parent Wrapper Component exporting the entire application setup
export default function CustomHooksApp() {
  return (
    <AuthProvider>
      <UserProfileCard />
    </AuthProvider>
  );
}
