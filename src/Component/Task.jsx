import { useEffect, useState } from "react";
import AddTask from "./addtask";
import EditTask from "./editTask";

const API_URL = "http://localhost:5000/tasks"; // Replace with your real API URL

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [priorityFilter, setPriorityFilter] = useState(""); // State for priority filter
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter
  const [isopen, setIsOpen] = useState(false); // State for EditTask modal
  const [editTask, seteditTask] = useState({}); // State for EditTask modal

  // Fetch Tasks from API
  const fetchTasks = async () => {
    try {
      console.log("fetching tasks");
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setMessage("Error fetching tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
    }, 1000);
    return () => clearTimeout(timeout);
  }, [message]);
  // Update Task (Status & Priority)
  const updateTask = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, ...updates } : task
          )
        );
        setMessage("Task updated successfully!");
      } else {
        setMessage("Failed to update task");
      }
    } catch (error) {
      setMessage("Error updating task");
    }
  };
  const editWholeTask = (task) => {
    setIsOpen(true);
    seteditTask(task);
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
        setMessage("Task deleted successfully!");
      } else {
        setMessage("Failed to delete task");
      }
    } catch (error) {
      setMessage("Error deleting task");
    }
  };

  // Filter tasks based on priority and status
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = priorityFilter
      ? task.priority === priorityFilter
      : true;
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    return matchesPriority && matchesStatus;
  });

  return (
    <div>
      <AddTask setTasks={setTasks} setMessage={setMessage} message={message} />

      <div className="p-6 w-full mx-auto">
        <h2 className=" mb-4">Task List</h2>

        {/* Filters Section */}
        <div className="mb-4 flex gap-4">
          <div>
            <label htmlFor="priorityFilter" className="mr-2">
              Filter by Priority:
            </label>
            <select
              id="priorityFilter"
              className="border p-1 rounded"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="statusFilter" className="mr-2">
              Filter by Status:
            </label>
            <select
              id="statusFilter"
              className="border p-1 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Priority</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id} className="border">
                  <td className="border p-2">{task.title}</td>
                  <td className="border p-2">{task.description}</td>

                  {/* Editable Priority */}
                  <td className="border p-2">
                    <select
                      className="border p-1 rounded w-full "
                      value={task.priority}
                      onChange={(e) =>
                        updateTask(task._id, { priority: e.target.value })
                      }
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>

                  {/* Editable Status */}
                  <td className="border p-2">
                    <select
                      className="border p-1 rounded w-full"
                      value={task.status}
                      onChange={(e) =>
                        updateTask(task._id, { status: e.target.value })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>

                  {/* Delete Button  edit utton*/}
                  <td className="border p-2 text-center flex gap-2 w-full justify-center">
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded w-full"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editWholeTask(task)}
                      className="bg-blue-500 text-white px-2 py-1 rounded w-full"
                    >
                      update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {message && <p className="mt-2 text-red-500">{message}</p>}
      </div>
      {isopen && (
        <div className="fixed top-0 z-50 left-0 w-full h-full bg-gray-400 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 w-96 rounded-md">
            <EditTask
              task={editTask}
              setTasks={setTasks}
              setMessage={setMessage}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}
