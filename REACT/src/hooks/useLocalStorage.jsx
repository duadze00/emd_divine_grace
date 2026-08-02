import { useState, useEffect } from "react";

/**
 * Custom hook to encapsulate state persistence in browser localStorage
 */
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (err) {
      console.error("Failed to load local storage:", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to save local storage:", err);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
