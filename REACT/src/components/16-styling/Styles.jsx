import "./normalCSS.css"; // * Normal CSS import
import Styles from "./Styles.module.css"; // * Module styles import

// * INLINE REACT STYLING.
function InlineStyling() {
  return (
    <>
      <h1
        style={{
          textTransform: "capitalize",
          letterSpacing: "2px",
          color: "magenta",
          textAlign: "center",
        }}
      >
        Inline styling in react
      </h1>
    </>
  );
}

// * NORMAL CSS STYLING.
function NormalCSSStyling() {
  return (
    <>
      <h1>Normal CSS styling</h1>
    </>
  );
}

// * REACT MODULE STYLING.
function ModuleReactStyling() {
  return (
    <>
      <h1 className={Styles.heading}>React module styling</h1>
    </>
  );
}

// * TAILWIND STYLING.
function TailwindStyling() {
  return (
    <>
      <h1>Tailwind CSS (Utility-First)</h1>

      <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded shadow transition-all duration-200">
        Tailwind Styled Button
      </button>
    </>
  );
}

function Styles() {
  return (
    <>
      <InlineStyling />
      <hr />
      <NormalCSSStyling />
      <hr />
      <ModuleReactStyling />
      <hr />
      <TailwindStyling />
    </>
  );
}

export default Styles;
