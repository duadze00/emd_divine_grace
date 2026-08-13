import UserProfile from "./UserProfile";

// Intermediate Component (Level 2)
// This component receives 'username' ONLY to pass it down to UserProfile.
function UserSection({ username }) {
  return (
    <fieldset>
      <legend>
        <strong>Middleman 2:</strong> UserSection
      </legend>

      <p>
        <em>Status: Passing through...</em> (This component does not use{" "}
        <code>username</code> for its own rendering)
      </p>

      {/* Forwarding the prop to the final destination */}
      <UserProfile username={username} />
    </fieldset>
  );
}

export default UserSection;
