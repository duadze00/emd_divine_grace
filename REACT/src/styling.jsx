import React from "react";
// Import CSS Modules scoped object
import styles from "./stylingModule.css";

export default function StylingTopic() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>6. Styling Masterclass</h2>

      {/* ==========================================
          SUBTOPIC 6.1: CSS MODULES
          ========================================== */}
      <section style={{ marginBottom: "20px" }}>
        <h3>CSS Modules (Scoped Classes)</h3>
        {/* Rendered as unique hash class name e.g., class="Button_primaryBtn__x8Yz" */}
        <button className={styles.primaryBtn}>Scoped CSS Module Button</button>
      </section>

      {/* ==========================================
          SUBTOPIC 6.2: TAILWIND CSS (UTILITY CLASSES)
          ========================================== */}
      <section>
        <h3>Tailwind CSS (Utility-First)</h3>
        {/* Direct utility classes (Requires Tailwind CSS configured in project) */}
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded shadow transition-all duration-200">
          Tailwind Styled Button
        </button>
      </section>
    </div>
  );
}
