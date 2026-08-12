import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/AuthenticationOrProtectedRoutes"; // Using Protected or Authenticated route.

import Home from "./pages/Home";
import About from "./pages/About";
import People from "./pages/People";
import Person from "./pages/useParams";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import Login from "./pages/useNavigate";
import Error from "./pages/Error";

function ReactRouterSetupBasics() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Normal routes */}
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/people" element={<People />} />

        {/* Dynamic route */}
        <Route path="/person/:id" element={<Person />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />

          {/* Notice: path="profile" doesn't have /.
              That's because it is relative to its parent.
              So: 
              /dashboard + profile = /dashboard/profile
              And: 
              /dashboard + settings = /dashboard/settings
          */}
        </Route>

        {/* +++++++++++++++++++++++++++++++++++++ THIS IS WHERE WE ARE USING THE PROTECTED ROUTE +++++++++++++++++++++++++++++++++++++ */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />

          <Route path="settings" element={<Settings />} />
        </Route>
        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        {/* 404 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ReactRouterSetupBasics;

//* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
//* THE FIVE CORE CORE CONCEPTS TO MEMORIZE
//* +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Don't memorize the entire code. Understand these:
//* 1. Link
// <Link to="/about">About</Link>
// Purpose: Navigate by clicking.

//* 2. NavLink
// <NavLink to="/about">About</NavLink>
// Purpose: Navigate + know whether the link is currently active.

//* 3. useParams
// const { id } = useParams();
// Purpose: Get dynamic values from the URL.
// /person/25
//         ↑
//        id

//* 4. useNavigate
// const navigate = useNavigate();

// navigate("/dashboard");
// Purpose: Navigate using JavaScript.
// Useful after:
// Login
// Form submission
// Button click
// Logout
// etc.

//* 5. Nested routes + Outlet
// Parent:
// <Route path="/dashboard" element={<Dashboard />}>
// Child:
// <Route path="profile" element={<Profile />} />
// Inside Dashboard:
{
  /* <Outlet /> */
}
// Purpose: Put child pages inside a parent layout.

//* 6. Protected routes
// if (!isLoggedIn) {
//   return <Navigate to="/login" replace />;
// }
// Purpose: Prevent unauthorized users from accessing certain routes.

//* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// URL
//  ↓
// Routes
//  ↓
// Which Route matches?
//  ↓
// What component should render?

//* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Link        → user clicks to navigate
// NavLink     → navigation + active state
// useParams   → read values from URL
// useNavigate → navigate with JavaScript
// Outlet      → render child route
// Navigate    → redirect
