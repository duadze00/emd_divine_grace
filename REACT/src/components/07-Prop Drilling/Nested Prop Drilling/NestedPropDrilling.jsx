import NestedNavbar from "./NestedNavbar";

function NestedPropDrilling() {
  // Data source defined at top level
  const username = "Eric Mawule Duadze";

  return (
    <fieldset>
      <legend>
        <strong>Top Parent:</strong> NestedPropDrilling
      </legend>

      <p>
        <strong>Data Source:</strong> <code>username = "{username}"</code>
      </p>
      <p>
        <small>
          Notice how this data will travel down through{" "}
          <code>NestedNavbar</code> and <code>UserSection</code> before reaching{" "}
          <code>UserProfile</code>.
        </small>
      </p>

      {/* Sending data down to level 1 child */}
      <NestedNavbar username={username} />
    </fieldset>
  );
}

export default NestedPropDrilling;
