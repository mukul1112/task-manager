import { useState } from "react";
import TaskForm from "./taskform";

export default function AddTask({ setTasks, setMessage }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const submitTask = async () => {
    if (!task.title || !task.description) {
      setMessage("Title and Description are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Task added successfully!");
        setTask({
          title: "",
          description: "",
          priority: "Medium",
          status: "Pending",
        });
        setTasks((tasks) => [...tasks, data]);
      } else {
        setMessage(`Error: ${data.message || "Failed to add task"}`);
      }
    } catch (error) {
      setMessage("Network error: Unable to reach API");
    }

    setLoading(false);
  };

  return (
    <div>
      <TaskForm
        className="p-4 w-full mx-auto flex gap-4 border-b-2"
        task={task}
        handleChange={handleChange}
        submitTask={submitTask}
        loading={loading}
      />

      {/* Message */}
    </div>
  );
}
