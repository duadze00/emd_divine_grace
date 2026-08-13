function RecentActivity() {
  return (
    <div className="card activity-card">

      <div className="card-header">
        <div>
          <h2>Recent Activity</h2>
          <p>Latest system activities</p>
        </div>

        <button className="more-button">•••</button>
      </div>

      <div className="activity">

        <div className="activity-icon">♙</div>

        <div>
          <strong>New student registered</strong>
          <p>John Mensah joined Physics</p>
          <small>10 minutes ago</small>
        </div>

      </div>


      <div className="activity">

        <div className="activity-icon">₵</div>

        <div>
          <strong>Payment received</strong>
          <p>Mary completed her tuition payment</p>
          <small>32 minutes ago</small>
        </div>

      </div>


      <div className="activity">

        <div className="activity-icon">▣</div>

        <div>
          <strong>New course created</strong>
          <p>Advanced Sonography was added</p>
          <small>1 hour ago</small>
        </div>

      </div>


      <div className="activity">

        <div className="activity-icon">✓</div>

        <div>
          <strong>Exam published</strong>
          <p>Physics examination is now available</p>
          <small>2 hours ago</small>
        </div>

      </div>

    </div>
  );
}


export default RecentActivity