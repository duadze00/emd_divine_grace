// Receiver component: Accepts 'username' via props and uses it directly
function SimpleNavbar({ username }) {
  return (
    <fieldset>
      <legend>
        <strong>Child:</strong> SimpleNavbar Component
      </legend>

      <p>
        <strong>Direct Prop Received:</strong> <code>username</code>
      </p>
      <h3>Hello, {username}!</h3>
    </fieldset>
  );
}

export default SimpleNavbar;
