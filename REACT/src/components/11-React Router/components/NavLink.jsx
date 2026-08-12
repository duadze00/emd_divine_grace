import { NavLink } from "react-router-dom";
// NavLink is similar to Link, but it knows whether its route is currently active.

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>

      {/* Navigates and knows when /about is the active route.*/}
      {/*For example, you can style the active link: */}
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        About
      </NavLink>

      <NavLink to="/people">People</NavLink>

      <NavLink to="/dashboard">Dashboard</NavLink>
    </nav>
  );
}

export default Navbar;
