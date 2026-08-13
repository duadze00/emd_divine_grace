import SimplePropDrilling from "./Single Prop Drilling/SimplePropDrilling";
import NestedPropDrilling from "./Nested Prop Drilling/NestedPropDrilling";
import Example from "./Example/Example";

// PROP DRILLING OVERVIEW
// Component Tree Hierarchy:
// App
//  ├── SimplePropDrilling ──> SimpleNavbar
//  └── NestedPropDrilling
//       └── NestedNavbar
//            └── UserSection
//                 └── UserProfile

/*
 * =============================================================================
 * KEY TAKEAWAY: PROP DRILLING IN REACT
 * =============================================================================
 * 
 * 1. WHAT IT IS:
     Prop drilling happens when you pass props down through intermediate 
     components that do not actually use the data, just so deeper descendants 
     can receive it.

 * 2. WHEN PROPS ARE GOOD:
     Passing props directly (1-2 levels deep) is completely normal, explicit, 
     and easy to trace. Don't avoid props entirely!

 * 3. WHEN TO USE ALTERNATIVES:
     When data must travel through 3 or more layers of "middleman" components 
     that don't use the data, consider:
     - Component Composition (passing elements via `children`)
     - React Context API
     - State Management Libraries (Zustand, Redux, etc.)
  =============================================================================
*/

function PropDrilling() {
  return (
    <main>
      <header>
        <h1>React Data Flow: Prop Drilling Explained</h1>
        <p>
          In React, data flows unidirectionally (top-down) from parent to child
          through <strong>props</strong>.
        </p>
      </header>

      <section>
        <SimplePropDrilling />
      </section>

      <hr />

      <section>
        <NestedPropDrilling />
      </section>

      <hr />
      <section>
        <Example />
      </section>
    </main>
  );
}

export default PropDrilling;
