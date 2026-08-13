function Analytics() {
  return (
    <div className="card analytics-card">
      <div className="card-header">
        <div>
          <h2>Student Analytics</h2>
          <p>Student registrations over the last 7 months</p>
        </div>

        <select>
          <option>Last 7 months</option>
          <option>Last 30 days</option>
          <option>This year</option>
        </select>
      </div>

      <div className="chart">
        <div className="chart-lines">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="bars">
          <div style={{ height: "35%" }}></div>
          <div style={{ height: "50%" }}></div>
          <div style={{ height: "42%" }}></div>
          <div style={{ height: "65%" }}></div>
          <div style={{ height: "58%" }}></div>
          <div style={{ height: "78%" }}></div>
          <div style={{ height: "90%" }}></div>
        </div>

        <div className="months">
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
        </div>
      </div>
    </div>
  );
}


export default Analytics