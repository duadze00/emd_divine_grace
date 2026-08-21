import React, { useState } from "react";
import "../styles/taskForm.css";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      priority,
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    };

    onAddTask(newTask);
    setTitle("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="form-select"
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm