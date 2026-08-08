import React, { useState, useEffect } from "react";
// useEffect is used to perform side effects in a component.
// Examples: fetching data, timers, event listeners, etc.

// The effect runs after rendering.
// The second parameter is the dependency array.
// The cleanup function removes things created by the effect, such as event listeners or timers.

// * useEffect TAKES THREE ARGUMENTS:
// * Effect callback
// * Cleanup function
// * Dependence array

const UseEffectBasics = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log("call useEffect");
    if (value > 0) {
      document.title = `New Messages(${value})`;
    }
  });

  console.log("render component");
  return (
    <>
      <h1>{value}</h1>
      <button className="btn" onClick={() => setValue(value + 1)}>
        click me
      </button>
    </>
  );
};

export default UseEffectBasics;
