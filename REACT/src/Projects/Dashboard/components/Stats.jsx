function Stats() {
  return (
    <div className="stats-grid">

      <div className="stat-card">
        <div className="stat-top">
          <span>Total Students</span>
          <div className="stat-icon blue">♙</div>
        </div>

        <h2>1,248</h2>

        <p className="positive">
          ↑ 12.5% <span>from last month</span>
        </p>
      </div>


      <div className="stat-card">
        <div className="stat-top">
          <span>Total Revenue</span>
          <div className="stat-icon green">₵</div>
        </div>

        <h2>₵45,200</h2>

        <p className="positive">
          ↑ 8.2% <span>from last month</span>
        </p>
      </div>


      <div className="stat-card">
        <div className="stat-top">
          <span>Active Courses</span>
          <div className="stat-icon purple">▣</div>
        </div>

        <h2>36</h2>

        <p className="positive">
          ↑ 4.3% <span>from last month</span>
        </p>
      </div>


      <div className="stat-card">
        <div className="stat-top">
          <span>Pending Applications</span>
          <div className="stat-icon orange">!</div>
        </div>

        <h2>28</h2>

        <p className="negative">
          ↓ 2.4% <span>from last month</span>
        </p>
      </div>

    </div>
  );
}

export default Stats