// React provides a Hook called useState().
import { useState } from "react";

export function State() {
  const [count, setCount] = useState(0);
  // count is the current value.
  // setCount is the function that changes it.
  // 0 is the initial value.

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>Increase</button>
    </>
  );
}

export function State1() {
  const [name, setName] = useState("Eric");

  return (
    <>
      <h1>Hello {name}</h1>

      <button onClick={() => setName("John")}>Change Name</button>
    </>
  );
}

export function CanBeAnything() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <h1 onClick={() => setCount(count + 1)}>Count: {count}</h1>
      <h2 onClick={() => setName("Eric")}>Name: {name}</h2>
      <h3 onClick={() => setEmail("Duadze.com")}>Email: {email}</h3>
      <h4 onClick={() => setIsLoggedIn(false)}>
        Logged In: {isLoggedIn ? "Yes" : "No"}
      </h4>
    </>
  );
}

// * STATE SETTER CAN UPDATE ANY DATA TYPE
Number;
const [age, setAge] = useState(20);
setAge(21);

String;
const [name, setName] = useState("Eric");
setName("John");

Boolean;
const [isLoggedIn, setIsLoggedIn] = useState(false);
setIsLoggedIn(true);

Array;
const [items, setItems] = useState([]);
setItems(["Apple", "Orange"]);

Object;
const [user, setUser] = useState({
  name: "Eric",
  age: 21,
});
setUser({
  name: "John",
  age: 25,
});

// * UPDATING BASE ON PREVIOUS STATE
// Instead of:
setCount(count + 1);
// You can do:
setCount((previousCount) => previousCount + 1);
