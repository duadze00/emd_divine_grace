import { Link } from "react-router-dom";
// Link is React Router's version of a navigation link.

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/people">People</Link>{/* When the user clicks this, navigate to /people. */}
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}

export default Navbar;
