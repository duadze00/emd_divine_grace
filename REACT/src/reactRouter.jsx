// Note: Requires installing react-router-dom
// (npm i react-router-dom).
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
  Outlet,
} from "react-router-dom";

// Pages / Dummy Components
function Home() {
  return <h3>Home Page</h3>;
}

// ==========================================
// DYNAMIC ROUTE PARAMS (useParams)
// ==========================================
function UserProfile() {
  const { id } = useParams(); // Reads dynamic route param ":id"
  const navigate = useNavigate(); // Programmatic navigation hook

  return (
    <div>
      <h3>User Profile Page</h3>
      <p>
        Viewing user ID: <strong>{id}</strong>
      </p>

      {/* ==========================================
          PROGRAMMATIC NAVIGATION
          ========================================== */}
      <button onClick={() => navigate("/")}>Go to Home Programmatically</button>
    </div>
  );
}

// ==========================================
// NESTED ROUTES & OUTLET
// ==========================================
function DashboardLayout() {
  return (
    <div style={{ border: "1px dashed #666", padding: "10px" }}>
      <h3>Dashboard Header (Shared Layout)</h3>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to="/dashboard/stats">Stats</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <hr />
      {/* Outlet renders child route content */}
      <Outlet />
    </div>
  );
}

export default function ReactRouterTopic() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h2>5. React Router Masterclass</h2>

        {/* Navigation bar using NavLink for active styling */}
        <nav style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Home
          </NavLink>
          <NavLink
            to="/user/42"
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            User Profile (ID: 42)
          </NavLink>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Dashboard Layout
          </NavLink>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserProfile />} />

          {/* Nested Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="stats" element={<p>Dashboard Stats Content</p>} />
            <Route
              path="settings"
              element={<p>Dashboard Settings Content</p>}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
