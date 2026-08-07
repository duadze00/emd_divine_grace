import React, { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import HeaderStats from "./components/HeaderStats.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskItem from "./components/TaskItem.jsx";
import "./styles/App.css";

function App() {
  const [tasks, setTasks] = useLocalStorage("app_tasks", [
    {
      id: "1",
      title: "Learn React Hooks",
      priority: "High",
      completed: true,
      createdAt: "2026-08-01",
    },
    {
      id: "2",
      title: "Build Task Manager App",
      priority: "Medium",
      completed: false,
      createdAt: "2026-08-01",
    },
  ]);

  const [filter, setFilter] = useState("All");

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="container">
      <HeaderStats totalTasks={tasks.length} completedTasks={completedCount} />

      <TaskForm onAddTask={handleAddTask} />

      <div className="filter-group">
        {["All", "Active", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`filter-btn ${filter === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found under "{filter}".</p>
        </div>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
