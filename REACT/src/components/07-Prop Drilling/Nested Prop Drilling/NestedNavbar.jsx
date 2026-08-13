import UserSection from "./UserSection";

// Intermediate Component (Level 1)
// This component receives 'username' ONLY to forward it to UserSection.
function NestedNavbar({ username }) {
  return (
    <fieldset>
      <legend>
        <strong>Middleman 1:</strong> NestedNavbar
      </legend>

      <p>
        <em>Status: Passing through...</em> (This component does not use{" "}
        <code>username</code> for its own rendering)
      </p>

      {/* Forwarding the prop to Level 2 child */}
      <UserSection username={username} />
    </fieldset>
  );
}

export default NestedNavbar;
