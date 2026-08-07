function ProfileCard() {
  const user = {
    name: "Alex",
    role: "Frontend Engineer",
    avatarUrl: "https://via.placeholder.com/150",
    isOnline: true,
  };

  return (
    <div className="card">
      {/* 1. Embedding dynamic variable values */}
      <img src={user.avatarUrl} alt={user.name} />
      <h3>{user.name}</h3>
      <p>Role: {user.role}</p>

      {/* 2. Ternary operator for conditional rendering */}
      <span className="status">
        Status: {user.isOnline ? "Online 🟢" : "Offline 🔴"}
      </span>

      {/* 3. Inline style object (Note the outer {} for JS, inner {} for object) */}
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        {/* Calling a JavaScript method inside JSX */}
        Member since: {new Date().getFullYear()}
      </div>
    </div>
  );
}
