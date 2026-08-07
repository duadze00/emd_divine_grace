// This component demonstrates CSS Keyframe Animations (zero external libraries) and Framer Motion Animations (industry-standard React library).
// ​Note for Framer Motion: Requires npm i framer-motion.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimationsTopic() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Animations Masterclass</h2>

      {/* Toggle control */}
      <button onClick={() => setIsVisible((prev) => !prev)}>
        Toggle Visibility
      </button>

      <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
        {/* ==========================================
            PURE CSS TRANSITIONS / KEYFRAMES
            ========================================== */}
        <div>
          <h3>1. Pure CSS Transitions</h3>
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#3b82f6",
              borderRadius: "8px",
              transition: "all 0.4s ease-in-out",
              // Conditional styles trigger smooth CSS transition
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "scale(1) translateY(0)"
                : "scale(0.8) translateY(-20px)",
            }}
          />
        </div>

        {/* ==========================================
            FRAMER MOTION (RECOMMENDED FOR REACT)
            ========================================== */}
        <div>
          <h3>2. Framer Motion + AnimatePresence</h3>
          {/* AnimatePresence enables exit animations when elements unmount */}
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: -20 }} // Start state
                animate={{ opacity: 1, scale: 1, y: 0 }} // Active state
                exit={{ opacity: 0, scale: 0.5, y: -20 }} // Unmount state
                transition={{ duration: 0.3 }}
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#10b981",
                  borderRadius: "8px",
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
