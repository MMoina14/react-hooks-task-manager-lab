import React, { createContext, useState, useEffect, useId } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch initial tasks from backend
  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error loading tasks:", err));
  }, []);

  // Add new task with unique id
  function addTask(title) {
    const id = Date.now();
    const newTask = { id, title, completed: false };
    setTasks([...tasks, newTask]);
  }

  // Toggle complete
  function toggleComplete(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Filter tasks by query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <TaskContext.Provider
      value={{ tasks: filteredTasks, addTask, toggleComplete, setQuery }}
    >
      {children}
    </TaskContext.Provider>
  );
}
