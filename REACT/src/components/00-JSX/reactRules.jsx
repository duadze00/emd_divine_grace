// * EXPRESSIONS IN JSX.
// With JSX you can write expressions inside curly braces { }.

const expression = <h1>React is {5 + 5} times better with JSX</h1>;

// * INSERTING A LARGE BLOCK OF HTML.
// To write HTML on multiple lines, put the HTML inside parentheses ().

const insertingLargeHTMLElement = (
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
);

// * ONE TOP LEVEL ELEMENT
// The HTML code must be wrapped in ONE top level element. This could be HTML element or fragment.

const oneTopLevelElement = (
  <div>
    <h1>I am a Header.</h1>
    <h1>I am a Header too.</h1>
  </div>
);

const usingFragment = (
  <>
    <h1>I am a Header.</h1>
    <h1>I am a Header too.</h1>
  </>
);

// * ELEMENTS MUST BE CLOSED
// JSX follows XML rules, and therefore HTML elements must be properly closed.
const closeElement = <input type="text" />;
