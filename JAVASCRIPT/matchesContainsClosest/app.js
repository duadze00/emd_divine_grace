const boundary = document.getElementById("global-bubble-boundary");
const terminal = document.getElementById("console-screen");
const clearBtn = document.getElementById("clear-console");

function printLog(text, type = "info") {
  const line = document.createElement("div");
  line.className = `log-line log-${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

clearBtn.addEventListener("click", () => {
  terminal.innerHTML = `<div class="log-line">// Screen cleared. Waiting for event sequences...</div>`;
});

// Single Context Pipeline (Event Delegation Core)
boundary.addEventListener("click", (event) => {
  const tgt = event.target;

  printLog(`═══ EVENT SEQUENCE STARTED: <${tgt.tagName.toLowerCase()}> ═══`);

  // 1. EVALUATION ENGINE: classList.contains()
  if (tgt.classList.contains("link-element")) {
    printLog(`✔ classList.contains("link-element") -> TRUE`, "success");
  } else {
    printLog(`✘ classList.contains("link-element") -> FALSE`, "warn");
  }

  // 2. EVALUATION ENGINE: matches()
  if (tgt.matches("button.btn-danger")) {
    printLog(`✔ matches("button.btn-danger") -> TRUE`, "success");
  } else {
    printLog(`✘ matches("button.btn-danger") -> FALSE`, "warn");
  }

  // 3. EVALUATION ENGINE: closest()
  const componentAncestor = tgt.closest(".nested-component");
  if (componentAncestor) {
    const compId = componentAncestor.getAttribute("data-component-id");
    printLog(
      `✔ closest(".nested-component") -> FOUND! ID: ${compId}`,
      "success",
    );
  } else {
    printLog(`✘ closest(".nested-component") -> null`, "warn");
  }
});

/**
 * ====================================================================================================
 *                         DOM EVENT TARGET EVALUATION ENGINE MATRIX
 * ====================================================================================================
 *
 * METHOD                  | SCOPE             | PARAMETER ENGINE    | SELECTION STRATEGY
 * ------------------------+-------------------+---------------------+---------------------------------
 * classList.contains()    | Exact Node Only   | Single Class String | Token array matching
 * matches()               | Exact Node Only   | CSS Selector String | Full engine selector matching
 * closest()               | Node + Ancestors  | CSS Selector String | Upward hierarchy climbing
 *
 * ---------------------------------------------------------------------------------------------------
 *
 * METHOD                  | BEST PRODUCTION USE-CASE                | KEY INTERVIEW CAVEAT
 * ------------------------+-----------------------------------------+---------------------------------
 * classList.contains()    | UI flags ('is-active', 'hidden')        | Fails if given dots like '.link'
 * matches()               | Compound criteria ('button.danger')     | Performance hit vs class check
 * closest()               | Nodes with inner icons or complex cards | Returns null if tree root hit
 * ====================================================================================================
 */

// ====================================================================================================
// RULE TO REMEMBER
// ====================================================================================================
// Use classList.contains("className") when checking for a single class.
// Use matches("CSS selector") when you need the flexibility of CSS selectors (multiple classes, element types, IDs, attributes, or combinations).

// matches() is called on the element (event.target), not on classList.
// CSS class selectors require a dot (.), so use ".link" instead of "link".

// Example
matches(".link"); //Correct
matches("link"); //Incorrect
