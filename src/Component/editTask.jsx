import React, { useState } from "react";
import TaskForm from "./taskform";

function EditTask({ task, setTasks, setMessage, setIsOpen }) {
  const API_URL = "http://localhost:5000/tasks";
  const [currentTask, setCurrentTask] = useState(task);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };
  const updateTask = async (id, updates) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (response.ok) {
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? { ...task, ...data } : task))
        );
        setMessage("Task updated successfully!");
        setIsOpen(false);
      } else {
        setMessage("Failed to update task");
      }
    } catch (error) {
      setMessage("Error updating task");
    }
    setLoading(false);
  };
  return (
    <div>
      <TaskForm
        className="p-4 w-full mx-auto   border-b-2"
        task={currentTask}
        handleChange={handleChange}
        submitTask={() => updateTask(task._id, currentTask)}
        loading={loading}
        isEdit={true}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default EditTask;
