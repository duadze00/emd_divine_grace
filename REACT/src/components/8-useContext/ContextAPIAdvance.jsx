import { createContext, useContext, useState, useReducer, use } from "react";

//* ============================================================================
//* LEVEL 1: THE CORE PROBLEM (PROP DRILLING VS. CONTEXT)
//* ============================================================================

// Before using Context, understand WHY we need it.
// In traditional React, passing data deep down requires "Prop Drilling":
//
// App (holds user)
//  ↓ user
// Dashboard
//  ↓ user
// Profile
//  ↓ user
// UserCard (actually uses user)
//
// Intermediate components (Dashboard, Profile) act as unnecessary delivery trucks.
//
// React's Context API solves this by creating a direct channel:
//
//        Context Channel (UserContext)
//                    │
// App ───────────────┼─────────────────
//  ↓                 │                ↓
// Dashboard          │             Sidebar
//                    ▼
//                UserCard
//              (useContext)

//* ============================================================================
//* LEVEL 2: BASIC CONTEXT (THE 3-STEP FOUNDATION)
//* ============================================================================

// Context has 3 main building blocks:
// 1. createContext() -> Creates the channel
// 2. Provider        -> Publishes the data at top level
// 3. useContext()    -> Consumes the data directly anywhere inside the tree

// Step 1: Create the Context
const BasicUserContext = createContext();

// Step 2: Provide the Data
function BasicLevelExample() {
  const user = { name: "Eric", age: 25 };

  return (
    <>
      <BasicUserContext.Provider value={user}>
        <BasicDashboard />
      </BasicUserContext.Provider>
      //* NB: The above is same as the below:
      <BasicUserContext value={user}>
        <BasicDashboard />
      </BasicUserContext>
    </>
  );
}

// Intermediate component stays 100% clean—no props passed!
function BasicDashboard() {
  return <BasicProfile />;
}

function BasicProfile() {
  return <BasicUserCard />;
}

// Step 3: Consume the Data directly
function BasicUserCard() {
  const user = useContext(BasicUserContext);
  //* NB: user can also be destructured:
  const { name, id } = useContext(BasicUserContext);

  return (
    <div>
      <h3>Basic Context Output</h3>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

//* ============================================================================
//* LEVEL 3: DYNAMIC CONTEXT (PAIRING WITH STATE)
//* ============================================================================

// Very Important Concept:
// Context API by itself is NOT state management—it is a distribution pipeline.
// To change data dynamically, combine Context with useState.

const DynamicUserContext = createContext();

function DynamicLevelExample() {
  // 1. Hold dynamic state in top-level parent
  const [user, setUser] = useState({ name: "Eric", age: 25 });

  return (
    // 2. Pass BOTH the state value AND updater function into value={...}
    <DynamicUserContext.Provider value={{ user, setUser }}>
      <DynamicProfile />
    </DynamicUserContext.Provider>
  );
}

function DynamicProfile() {
  // 3. Grab state and updater function directly anywhere in the tree
  const { user, setUser } = useContext(DynamicUserContext);

  return (
    <div>
      <h3>Dynamic Context Output</h3>
      <p>Name: {user.name}</p>
      <button onClick={() => setUser({ ...user, name: "John" })}>
        Change Name to John
      </button>
    </div>
  );
}

//* ============================================================================
//* LEVEL 4: PRODUCTION PATTERN — CUSTOM PROVIDER & CUSTOM HOOK
//* ============================================================================

// In real-world projects, developers do NOT call useContext(RawContext) directly.
// Instead, they combine the Context, Provider, and Hook into a reusable pattern:
//
// 1. Encapsulate state inside a custom <Provider /> component
// 2. Expose a custom hook like useAuth()
// 3. Add a Safety Guard inside the hook to throw an error if used outside Provider

// --- Create Internal Context (not exported directly) ---
const AuthContext = createContext(null);

// --- Custom Provider Component ---
export function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: "Eric", role: "Admin" });

  const logout = () => setUser(null);
  const login = (name) => setUser({ name, role: "User" });

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* 
        What is {children}?
        Whatever components you place inside <AuthProvider>...</AuthProvider>
        are passed automatically as 'children' and rendered here!
      */}
      {children}
    </AuthContext.Provider>
  );
}

// --- Custom Hook with Safety Guard ---
function useAuth() {
  const context = useContext(AuthContext);

  // Safety Guard: Throws clear error for developers if placed in wrong spot
  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }

  return context;
}

function HeaderComponent() {
  // Clean consumption using custom hook!
  const { user, logout, login } = useAuth();

  if (!user) {
    return <button onClick={() => login("Eric")}>Log In</button>;
  }

  return (
    <div>
      <span>
        Logged in as: {user.name} ({user.role})
      </span>
      <button onClick={logout} style={{ marginLeft: "10px" }}>
        Log Out
      </button>
    </div>
  );
}

//* ============================================================================
//* LEVEL 5: MULTIPLE SEPARATE CONTEXTS & ARCHITECTURE
//* ============================================================================

// Rule of thumb in large applications:
// DO NOT PUT EVERYTHING IN ONE MONOLITHIC CONTEXT!
//
// Avoid:
// <AppContext.Provider value={{ user, theme, cart, notifications, settings }}>
//
// Prefer separating concerns into single-responsibility Contexts:
// src/
// ├── contexts/
// │   ├── AuthContext.jsx
// │   ├── ThemeContext.jsx
// │   └── CartContext.jsx

// --- Theme Context ---
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be inside <ThemeProvider>");
  return context;
}

// --- Cart Context ---
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => setCart((prev) => [...prev, item]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside <CartProvider>");
  return context;
}

//* ============================================================================
//* LEVEL 6: ADVANCED — CONTEXT + USEREDUCER (MINI REDUX PATTERN)
//* ============================================================================

// For complex global state changes, pair Context with useReducer:
//
// Context
//    │
//    ├── state
//    │
//    └── dispatch ────► useReducer(reducer, initialState)

const ShoppingReducerContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function ShoppingReducerProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <ShoppingReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingReducerContext.Provider>
  );
}

function useShoppingReducer() {
  const context = useContext(ShoppingReducerContext);
  if (!context) throw new Error("useShoppingReducer missing provider!");
  return context;
}

// Consumer component that actually uses the useShoppingReducer hook!
function ShoppingCartWithReducer() {
  const { state, dispatch } = useShoppingReducer();

  return (
    <div
      style={{ marginTop: "10px", padding: "10px", border: "1px dashed #888" }}
    >
      <h4>useReducer + Context Shopping Cart</h4>
      <p>Items in cart: {state.items.length}</p>

      <button
        onClick={() =>
          dispatch({
            type: "ADD_ITEM",
            payload: { id: Date.now(), name: "Headphones" },
          })
        }
        style={{ marginRight: "10px" }}
      >
        Add Item (dispatch)
      </button>

      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
        Clear Cart (dispatch)
      </button>

      <ul>
        {state.items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

//* ============================================================================
//* LEVEL 7: MODERN REACT 19 MODERNIZATIONS
//* ============================================================================

// In React 19+:
// 1. You can render <Context value={...}> directly without .Provider
// 2. You can consume context using the new 'use()' hook instead of 'useContext()'

const ModernContext = createContext("React 19 Direct Value");

function ModernChild() {
  // Using React 19's new 'use()' hook
  const value = use(ModernContext);
  return <p>Modern React 19 Feature: {value}</p>;
}

//* ============================================================================
//* FULL COMBINED EXECUTABLE ENTRY POINT
//* ============================================================================

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Complete React Context API Masterclass</h1>

      <hr />
      <h2>1. Basic Context</h2>
      <BasicLevelExample />

      <hr />
      <h2>2. Dynamic Context (useState)</h2>
      <DynamicLevelExample />

      <hr />
      <h2>3. Multiple Contexts Stacked Together</h2>
      {/* Wrap tree with modular providers */}
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            {/* ADDED: ShoppingReducerProvider so useShoppingReducer() works! */}
            <ShoppingReducerProvider>
              <MainAppContent />
            </ShoppingReducerProvider>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>

      <hr />
      <h2>4. React 19 Direct Context</h2>
      <ModernContext value="Direct Context Provider Works!">
        <ModernChild />
      </ModernContext>
    </div>
  );
}

function MainAppContent() {
  const { theme, toggleTheme } = useTheme();
  const { cart, addToCart } = useCart();

  const isDark = theme === "dark";

  return (
    <div
      style={{
        padding: "15px",
        background: isDark ? "#333" : "#f4f4f4",
        color: isDark ? "#fff" : "#000",
        borderRadius: "8px",
      }}
    >
      <HeaderComponent />
      <p>Current App Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme Mode</button>

      <h4>Store Items (Cart Count: {cart.length})</h4>
      <button onClick={() => addToCart({ id: Date.now(), name: "Book" })}>
        Add Book to Cart
      </button>

      {/* ADDED: Rendering our reducer-backed cart directly here */}
      <ShoppingCartWithReducer />
    </div>
  );
}
