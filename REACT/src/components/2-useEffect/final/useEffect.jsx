import { useState, useEffect } from "react";

export default function UseEffectTopic() {
  const [postId, setPostId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==========================================
  // LIFECYCLE PHASES & DEPENDENCY ARRAY
  // ==========================================
  // No array: Runs after EVERY render.
  // Empty array []: Runs ONCE on mount (component insertion).
  // With dependencies [postId]: Runs on mount AND whenever dependencies change.
  useEffect(() => {
    console.log(`Effect triggered for postId: ${postId}`);
  }, [postId]);

  // ==========================================
  // API DATA FETCHING WITH ABORTCONTROLLER
  // ==========================================
  // Job-Ready Requirement: Always handle loading, errors, and race conditions.
  useEffect(() => {
    // AbortController cancels pending requests if component unmounts or state changes fast
    const controller = new AbortController();

    async function fetchPost() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPost();

    // ==========================================
    // CLEANUP FUNCTIONS
    // ==========================================
    // Runs before re-executing effect or when component unmounts.
    return () => {
      controller.abort(); // Cancel HTTP request
    };
  }, [postId]);

  // ==========================================
  // TIMERS & SUBSCRIPTIONS CLEANUP
  // ==========================================
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Setup subscription / interval
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // CLEANUP: Prevents memory leaks by clearing the interval when unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>useEffect & API Fetching</h2>

      {/* Timer Display */}
      <p>Timer (Cleaned up properly): {seconds}s</p>

      {/* Dynamic API Fetch Trigger */}
      <button onClick={() => setPostId((prev) => prev + 1)}>
        Fetch Next Post (ID: {postId})
      </button>

      {/* State-Based Rendering */}
      {loading && <p>Loading data from API...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {data && !loading && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <h4>{data.title}</h4>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}
