// ==========================================
// 1. Root Component (Holds the actual data)
// ==========================================
export default function Example() {
  const user = {
    name: "Eric",
    age: 25,
  };

  // Pass 'user' to Dashboard
  return <Dashboard user={user} />;
}

// ==========================================
// 2. Intermediate Component #1
// Doesn't use 'user', just receives and forwards it
// ==========================================
function Dashboard({ user }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h2>Dashboard Container</h2>
      {/* Passing 'user' down to Profile */}
      <Profile user={user} />
    </div>
  );
}

// ==========================================
// 3. Intermediate Component #2
// Also doesn't use 'user', just receives and forwards it
// ==========================================
function Profile({ user }) {
  return (
    <div style={{ border: "1px dashed #666", padding: "10px" }}>
      <h3>Profile Section</h3>
      {/* Passing 'user' down to UserCard */}
      <UserCard user={user} />
    </div>
  );
}

// ==========================================
// 4. Target Component
// Finally uses the 'user' prop!
// ==========================================
function UserCard({ user }) {
  return (
    <div
      style={{ background: "#f0f0f0", padding: "10px", borderRadius: "5px" }}
    >
      <h4>User Card</h4>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
    </div>
  );
}
