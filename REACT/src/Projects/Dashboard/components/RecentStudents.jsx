function RecentStudents() {

  const students = [
    {
      name: "John Mensah",
      email: "john@example.com",
      course: "Physics",
      status: "Active",
      date: "Aug 12, 2026",
    },
    {
      name: "Mary Owusu",
      email: "mary@example.com",
      course: "Sonography",
      status: "Active",
      date: "Aug 11, 2026",
    },
    {
      name: "David Asante",
      email: "david@example.com",
      course: "Computer Science",
      status: "Pending",
      date: "Aug 10, 2026",
    },
    {
      name: "Sarah Boateng",
      email: "sarah@example.com",
      course: "Nursing",
      status: "Active",
      date: "Aug 09, 2026",
    },
  ];

  return (
    <div className="card table-card">

      <div className="card-header">
        <div>
          <h2>Recent Students</h2>
          <p>Recently registered students</p>
        </div>

        <button className="view-button">
          View all
        </button>
      </div>

      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Status</th>
              <th>Date Joined</th>
            </tr>
          </thead>

          <tbody>

            {students.map((student) => (
              <tr key={student.email}>

                <td>
                  <div className="student">

                    <div className="avatar small">
                      {student.name.charAt(0)}
                    </div>

                    <div>
                      <strong>{student.name}</strong>
                      <small>{student.email}</small>
                    </div>

                  </div>
                </td>

                <td>{student.course}</td>

                <td>
                  <span
                    className={
                      student.status === "Active"
                        ? "status active-status"
                        : "status pending-status"
                    }
                  >
                    {student.status}
                  </span>
                </td>

                <td>{student.date}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentStudents