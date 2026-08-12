import { Link, Outlet } from "react-router-dom";
// Outlet is basically a placeholder for the child route.

// Think of: <Dashboard> as the parent.
// And: <Profile /> as the child.

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <nav>
        <Link to="profile">Profile</Link>

        <Link to="settings">Settings</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default Dashboard;
