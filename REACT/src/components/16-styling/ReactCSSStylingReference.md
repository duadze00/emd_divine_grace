<!--* REACT CSS STYLING REFERENCE -->

1. Normal CSS.
File structure
src/
├── components/
│ └── TodoApp/
│ └── TodoApp.jsx
└── styles/
└── todo.css

Import
import "../../styles/todo.css";

Use
<button className="primaryBtn">
  Add Todo
</button>

CSS
.primaryBtn {
background-color: blue;
color: white;
padding: 10px 20px;
border: none;
border-radius: 6px;
}

«Normal CSS uses "className="className"".»
---

2. CSS Modules.
File structure
src/
└── components/
└── TodoApp/
├── TodoApp.jsx
└── TodoApp.module.css

Import
import styles from "./TodoApp.module.css";

Use
<button className={styles.primaryBtn}>
  Add Todo
</button>

CSS
.primaryBtn {
background-color: blue;
color: white;
padding: 10px 20px;
border: none;
border-radius: 6px;
}

«CSS Modules use "className={styles.className}".»
---

3. Inline CSS.
   No CSS file is required.
   <button
   style={{
       backgroundColor: "blue",
       color: "white",
       padding: "10px 20px",
       border: "none",
       borderRadius: "6px",
     }}

> Add Todo
> </button>

«React inline CSS uses JavaScript objects and camelCase properties.»
---

4. Tailwind CSS.
Use
<button className="bg-blue-600 text-white px-4 py-2 rounded">
  Add Todo
</button>

«Tailwind uses utility classes directly inside "className".»
---

<!--* KEY DIFFERENCE -->

// Normal CSS
import "../../styles/todo.css";

<button className="primaryBtn">
  Add Todo
</button>

// CSS Module
import styles from "./TodoApp.module.css";

<button className={styles.primaryBtn}>
  Add Todo
</button>

// Inline CSS
<button style={{ color: "blue" }}>
Add Todo
</button>

// Tailwind CSS
<button className="text-blue-600">
Add Todo
</button>

<!--* QUICK RULE -->

Style.css → Normal CSS
className="btn" → Normal CSS

Style.module.css → CSS Module
className={styles.btn} → CSS Module

style={{ ... }} → Inline CSS

className="..." → Tailwind
