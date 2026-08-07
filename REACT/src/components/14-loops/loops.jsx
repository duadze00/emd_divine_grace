import React, { useState } from "react";

export default function ReactLoopsMasterclass() {
  // Sample data array representing items from a database
  const [products] = useState([
    { id: "p1", name: "Laptop", price: 999, inStock: true },
    { id: "p2", name: "Phone", price: 699, inStock: false },
    { id: "p3", name: "Headphones", price: 199, inStock: true },
    { id: "p4", name: "Smartwatch", price: 299, inStock: true },
  ]);

  // ==========================================
  // STANDARD FOR LOOP (OUTSIDE JSX)
  // ==========================================
  // Use case: Creating JSX elements imperatively before returning layout markup.
  const renderStarRating = (count) => {
    const starsArray = [];

    // Traditional 'for' loop constructs an array of JSX elements
    for (let i = 0; i < count; i++) {
      starsArray.push(
        <span
          key={`star-${i}`}
          style={{ color: "#f59e0b", fontSize: "1.2rem" }}
        >
          ★
        </span>,
      );
    }

    return starsArray;
  };

  // ==========================================
  // WHILE LOOP (OUTSIDE JSX)
  // ==========================================
  // Use case: Running a loop until a specific condition is met before rendering.
  const renderStepCounters = () => {
    const steps = [];
    let currentStep = 1;

    while (currentStep <= 3) {
      steps.push(
        <span
          key={`step-${currentStep}`}
          style={{
            padding: "4px 8px",
            marginRight: "6px",
            backgroundColor: "#e5e7eb",
            borderRadius: "4px",
            fontSize: "0.85rem",
          }}
        >
          Step {currentStep}
        </span>,
      );
      currentStep++;
    }

    return steps;
  };

  // ==========================================
  // FOR...OF LOOP (OUTSIDE JSX)
  // ==========================================
  // Use case: Accumulating calculated data or total values outside JSX.
  const calculateTotalValue = () => {
    let total = 0;

    for (const product of products) {
      if (product.inStock) {
        total += product.price;
      }
    }

    return total;
  };

  // ==========================================
  // JSX LAYOUT & DECLARATIVE INLINE LOOPS
  // ==========================================
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>React Loops Masterclass</h2>

      {/* --------------------------------------------------------------------------
          ARRAY.MAP() (THE STANDARD REACT WAY INSIDE JSX)
          --------------------------------------------------------------------------
          - Used because .map() produces an expression (returns a new array).
          - CRITICAL: Always pass a unique 'key' prop (e.g., product.id).
      -------------------------------------------------------------------------- */}
      <section style={{ marginBottom: "24px" }}>
        <h3>1. Standard .map() Loop (Inside JSX)</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((product) => (
            <li
              key={product.id} // Unique key requirement
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 12px",
                marginBottom: "8px",
                backgroundColor: "#f9fafb",
                borderRadius: "4px",
                border: "1px solid #f3f4f6",
              }}
            >
              <span>{product.name}</span>
              <strong>${product.price}</strong>
            </li>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------------------------
          CHAINING .FILTER() AND .MAP() (CONDITIONAL LOOPING)
          --------------------------------------------------------------------------
          - Filters the array first, then loops over only the matching items.
      -------------------------------------------------------------------------- */}
      <section style={{ marginBottom: "24px" }}>
        <h3>2. Filtered .map() Loop (In-Stock Only)</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products
            .filter((product) => product.inStock) // 1. Filter out out-of-stock items
            .map(
              (
                product, // 2. Loop through remaining items
              ) => (
                <li
                  key={product.id}
                  style={{
                    padding: "6px 12px",
                    marginBottom: "6px",
                    backgroundColor: "#ecfdf5",
                    color: "#065f46",
                    borderRadius: "4px",
                  }}
                >
                  ✓ {product.name} is available for ${product.price}
                </li>
              ),
            )}
        </ul>
      </section>

      {/* --------------------------------------------------------------------------
          RENDERING PRE-BUILT LOOPS (HELPER FUNCTIONS)
          -------------------------------------------------------------------------- */}
      <section style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
        <h3>3. Displaying Helper Function Loops</h3>

        {/* Render Result from Pattern 1 (For Loop) */}
        <p>Star Rating Loop: {renderStarRating(5)}</p>

        {/* Render Result from Pattern 2 (While Loop) */}
        <p>Step Counter Loop: {renderStepCounters()}</p>

        {/* Render Result from Pattern 3 (For...of Loop) */}
        <p>
          Calculated Total (For...of): <strong>${calculateTotalValue()}</strong>
        </p>
      </section>
    </div>
  );
}
