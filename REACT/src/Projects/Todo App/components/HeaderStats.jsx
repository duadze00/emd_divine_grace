import React from "react";
import "../styles/headerStats.css";

function HeaderStats({ totalTasks, completedTasks }) {
  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <header className="header">
      <h1>Task Flow Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-number">{totalTasks}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{completionPercentage}%</span>
          <span className="stat-label">Done</span>
        </div>
      </div>
    </header>
  );
}

export default HeaderStats