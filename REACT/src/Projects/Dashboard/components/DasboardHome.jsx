import Stats from "./Stats";
import Analytics from "./Analystics";
import RecentActivity from "./RecentActivity";
import RecentStudents from "./RecentStudents";

function DashboardHome() {
  return (
    <div className="dashboard-content">
      <div className="welcome">
        <div>
          <h1>Good morning, Eric 👋</h1>
          <p>Here's what's happening with your school today.</p>
        </div>

        <button className="primary-button">+ Add Student</button>
      </div>

      <Stats />

      <div className="dashboard-grid">
        <Analytics />
        <RecentActivity />
      </div>

      <RecentStudents />
    </div>
  );
}

export default DashboardHome;
