import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./components/Setting";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardHome from "./components/DasboardHome";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Reports from "./components/Reports";
import Exams from "./components/Exams";
import Courses from "./components/Courses";

function Dashboard() {
  return (
    <Router>
      <div className="app">
        <Sidebar />

        <div className="main">
          <Topbar />

          <Routes>
            <Route path="/dashboard" element={<DashboardHome />} />

            <Route path="/dashboard/students" element={<Students />} />

            <Route path="/dashboard/teachers" element={<Teachers />} />

            <Route path="/dashboard/courses" element={<Courses />} />

            <Route path="/dashboard/exams" element={<Exams />} />

            <Route path="/dashboard/reports" element={<Reports />} />

            <Route path="/dashboard/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Dashboard;
