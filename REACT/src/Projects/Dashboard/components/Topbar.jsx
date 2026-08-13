function Topbar() {
  return (
    <header className="topbar">
      <div className="search-box">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Search anything..."
        />
      </div>

      <div className="topbar-right">
        <button className="icon-button">
          🔔
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <div className="avatar">E</div>

          <div className="profile-info">
            <strong>Eric Mawule</strong>
            <span>Administrator</span>
          </div>

          <span>⌄</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar