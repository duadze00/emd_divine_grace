import SimpleNavbar from "./SimpleNavbar";

function SimplePropDrilling() {
  // 1. Data originates in the parent component
  const username = "Eric Mawule Duadze";

  return (
    <fieldset>
      <legend>
        <strong>Parent:</strong> SimplePropDrilling Component
      </legend>

      <p>
        <strong>State/Data Origin:</strong> <code>username = "{username}"</code>
      </p>
      <p>
        <small>
          Action: Passing <code>username</code> directly to{" "}
          <code>SimpleNavbar</code> as a prop.
        </small>
      </p>

      {/* Direct prop passing to child */}
      <SimpleNavbar username={username} />
    </fieldset>
  );
}

export default SimplePropDrilling;
