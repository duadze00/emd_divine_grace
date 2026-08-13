import { NavLink } from "react-router-dom";

import "../App.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">E</div>
        <div>
          <h2>EMD Admin</h2>
          <span>Management System</span>
        </div>
      </div>

      <div className="menu-title">MAIN MENU</div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>⌂</span>
          Overview
        </NavLink>

        <NavLink
          to="/dashboard/students"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>♙</span>
          Students
        </NavLink>

        <NavLink
          to="/dashboard/teachers"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>♟</span>
          Teachers
        </NavLink>

        <NavLink
          to="/dashboard/courses"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>▣</span>
          Courses
        </NavLink>

        <NavLink
          to="/dashboard/exams"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>▤</span>
          Exams
        </NavLink>

        <NavLink
          to="/dashboard/reports"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>◩</span>
          Reports
        </NavLink>
      </nav>

      <div className="menu-title">SYSTEM</div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>⚙</span>
          Settings
        </NavLink>

        <button className="nav-item logout">
          <span>↪</span>
          Logout
        </button>
      </nav>

      <div className="sidebar-user">
        <div className="avatar">E</div>

        <div>
          <strong>Eric Mawule</strong>
          <small>Administrator</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
