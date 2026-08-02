import React from "react";
import "../styles/taskItem.css";

function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  const priorityClasses = {
    Low: "badge-low",
    Medium: "badge-medium",
    High: "badge-high",
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="task-checkbox"
        />
        <div>
          <span className="task-title">{task.title}</span>
          <div className="task-meta">
            <span
              className={`badge ${priorityClasses[task.priority] || "badge-default"}`}
            >
              {task.priority}
            </span>
            <small className="task-date">Created: {task.createdAt}</small>
          </div>
        </div>
      </div>

      <button
        onClick={() => onDeleteTask(task.id)}
        className="delete-button"
        title="Delete task"
      >
        🗑️
      </button>
    </li>
  );
}

export default TaskItem;
