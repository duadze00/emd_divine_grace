import { useState } from "react";

function ShowAndHideElement(props) {
  return (
    <>
      <h1 style={{ backgroundColor: "red" }}>Hello, {props.name}</h1>
    </>
  );
}

function App() {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && <ShowAndHideElement name="Eric Mawule Duadze" />}
      <button
        type="button"
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "Hide Element" : "Show Element"}
      </button>
    </>
  );
}

export default App;
