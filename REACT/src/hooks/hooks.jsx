import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  createContext,
} from "react";

/*
* WHAT ARE HOOKS?
Hooks are special functions provided by React that allow
functional components to use state and other React features.

* RULES OF HOOKS:
1. Only call Hooks at the TOP LEVEL (not inside loops, conditions, or nested functions).
2. Only call Hooks from React functional components or Custom Hooks.
3. Custom Hooks must start with "use" (e.g., useFetch, useLocalStorage).

========================================================
PART 1: BASIC HOOKS
========================================================
*/

//* 1. useState
function UseStateExample() {
  const [name, setName] = useState("Eric");
  const [age, setAge] = useState(21);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function changeName() {
    setName("John"); // Always use the setter, never modify state directly
  }

  return (
    <div>
      <h2>useState Example</h2>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Logged In: {isLoggedIn ? "Yes" : "No"}</p>
      <button onClick={changeName}>Change Name</button>
    </div>
  );
}

// --- Updating Arrays in State ---
function ArrayStateExample() {
  const [students, setStudents] = useState(["John", "Mary"]);

  function addStudent() {
    // Spread operator creates a new array instead of mutating existing state
    setStudents([...students, "Eric"]);
  }

  return (
    <div>
      <h2>Array State</h2>
      {students.map((student, index) => (
        <p key={index}>{student}</p>
      ))}
      <button onClick={addStudent}>Add Student</button>
    </div>
  );
}

// --- Updating Objects in State ---
function ObjectStateExample() {
  const [user, setUser] = useState({ name: "Eric", age: 21 });

  function updateUser() {
    // Spread existing properties, then override specific keys
    setUser({ ...user, name: "John" });
  }

  return (
    <div>
      <h2>Object State</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={updateUser}>Update User</button>
    </div>
  );
}

// --- Functional State Updates ---
function FunctionalUpdateExample() {
  const [count, setCount] = useState(0);

  function increase() {
    // Use updater function when new state depends on previous state
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      <h2>Functional Update</h2>
      <h3>{count}</h3>
      <button onClick={increase}>Increase</button>
    </div>
  );
}

//* 2. useEffect
function UseEffectExample() {
  const [count, setCount] = useState(0);

  // Runs ONCE on mount (empty dependency array)
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  // Runs ON MOUNT and whenever 'count' changes
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  // Runs ON MOUNT with a CLEANUP function on unmount
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Running timer...");
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval to prevent memory leaks
  }, []);

  return (
    <div>
      <h2>useEffect Example</h2>
      <h3>{count}</h3>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

// --- Custom Hooks ---
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => prev - 1);

  return { count, increase, decrease };
}

function CustomHookExample() {
  const counter = useCounter(0);

  return (
    <div>
      <h2>Custom Hook Example</h2>
      <h3>{counter.count}</h3>
      <button onClick={counter.increase}>+</button>
      <button onClick={counter.decrease}>-</button>
    </div>
  );
}

/*
========================================================
ADVANCED HOOKS
========================================================
*/

//* 1. useRef
function UseRefExample() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <h2>useRef Example</h2>
      <input ref={inputRef} placeholder="Click button to focus" />
      <br />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

function LoginForm() {
  const emailRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted Email:", emailRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Uncontrolled Form (useRef)</h2>
      <input ref={emailRef} placeholder="Email" />
      <button type="submit">Login</button>
    </form>
  );
}

//* 2. useContext
const UserContext = createContext(null);

function UserProvider({ children }) {
  const user = { name: "Eric", role: "Developer" };
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

function Profile() {
  const user = useContext(UserContext);

  if (!user) return <p>No user context available.</p>;

  return (
    <div>
      <h2>Context Example</h2>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

function ContextExample() {
  return (
    <UserProvider>
      <Profile />
    </UserProvider>
  );
}

//* 3. useReducer
const initialReducerState = { count: 0 };

function countReducer(state, action) {
  switch (action.type) {
    case "INCREASE":
      return { count: state.count + 1 };
    case "DECREASE":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

function UseReducerExample() {
  const [state, dispatch] = useReducer(countReducer, initialReducerState);

  return (
    <div>
      <h2>useReducer Example</h2>
      <h3>{state.count}</h3>
      <button onClick={() => dispatch({ type: "INCREASE" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREASE" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}

//* 4. useMemo
function UseMemoExample() {
  const [number, setNumber] = useState(1);

  // Memoize expensive computations to avoid re-calculation on every render
  const expensiveCalculation = (num) => {
    console.log("Calculation running...");
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
      result += num;
    }
    return result;
  };

  const calculation = useMemo(() => {
    return expensiveCalculation(number);
  }, [number]);

  return (
    <div>
      <h2>useMemo Example</h2>
      <h3>Calculated Value: {calculation}</h3>
      <button onClick={() => setNumber(number + 1)}>Calculate Next</button>
    </div>
  );
}

//* 5. useCallback
function UseCallbackExample() {
  const [count, setCount] = useState(0);

  // Memoizes the function reference so it isn't recreated on every re-render
  const increase = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h2>useCallback Example</h2>
      <h3>{count}</h3>
      <button onClick={increase}>Increase</button>
    </div>
  );
}

//* Real World Hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

/*
========================================================
COMBINED MASTER COMPONENT
========================================================
*/
export default function ReactHooksReference() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>React Hooks Complete Reference</h1>
      <hr />
      <UseStateExample />
      <hr />
      <ArrayStateExample />
      <hr />
      <ObjectStateExample />
      <hr />
      <FunctionalUpdateExample />
      <hr />
      <UseEffectExample />
      <hr />
      <CustomHookExample />
      <hr />
      <UseRefExample />
      <hr />
      <LoginForm />
      <hr />
      <ContextExample />
      <hr />
      <UseReducerExample />
      <hr />
      <UseMemoExample />
      <hr />
      <UseCallbackExample />
    </div>
  );
}
