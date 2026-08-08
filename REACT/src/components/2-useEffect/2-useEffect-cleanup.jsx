import React, { useState, useEffect } from "react";

// useEffect is used to perform side effects in a component.
// Examples: fetching data, timers, event listeners, etc.

// The effect runs after rendering.
// The second parameter is the dependency array.
// The cleanup function removes things created by the effect, such as event listeners or timers.

const UseEffectCleanup = () => {
  const [size, setSize] = useState(window.innerWidth);

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(
    // useEffect callback
    () => {
      console.log("useEffect");
      window.addEventListener("resize", checkSize);

      // Cleanup function
      return () => {
        console.log("cleanup");
        window.removeEventListener("resize", checkSize);
      };
    },[/* Dependency array */]);
  console.log("render");

  // The arrow function (checkSize) passed to useEffect is the effect callback.
  // [] is the dependency array. Because [] is empty, the effect runs once after the component mounts.
  // The returned function is the cleanup function. It removes the resize event listener when the component unmounts.

  return (
    <>
      <h1>window</h1>
      <h2>{size} PX</h2>
    </>
  );
};

export default UseEffectCleanup;
