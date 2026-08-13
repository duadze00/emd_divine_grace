// End-Consumer Component (Level 3)
// Finally, the data reaches the target component where it is actually used!
function UserProfile({ username }) {
  return (
    <fieldset>
      <legend>
        <strong>Target Consumer:</strong> UserProfile
      </legend>

      <p>
        <strong>Final Destination Reached!</strong>
      </p>
      <h3>Hello, {username}!</h3>
    </fieldset>
  );
}

export default UserProfile;
