export function EventHandling() {
  const name = "Complex click handler";
  return (
    <>
      {/* NORMAL HANDLER */}
      <button type="button" onClick={clickHandler}>
        Click
      </button>

      {/* COMPLEX OR ARGUMENT HANDLER */}
      <button
        type="button"
        onClick={() => {
          complexClickHandler(name);
        }}
      >
        Click
      </button>

      {/* WRITING HANDLER FUNCTION INSIDE */}
      <button
        type="button"
        onClick={() => alert("The function was writing inside.")}
      >
        Click
      </button>
    </>
  );
}

function clickHandler() {
  alert("Click");
}

function complexClickHandler(name) {
  alert(name);
}
