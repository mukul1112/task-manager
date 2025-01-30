import React, { useState } from "react";

function TaskForm({
  task,
  handleChange,
  submitTask,
  loading,
  className,
  isEdit,
  setIsOpen,
}) {
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { title: "", description: "" };

    // Check if title is empty
    if (!task.title.trim()) {
      newErrors.title = "Title is required";
      formIsValid = false;
    }

    // Check if description is empty
    if (!task.description.trim()) {
      newErrors.description = "Description is required";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      submitTask();
    }
  };
  return (
    <div className={`${className}`}>
      <h2 className="text-md w-full mb-4">
        {isEdit ? "Edit Task" : "Add Task"}
      </h2>

      {/* Input Fields */}
      <div className="mb-4 w-full">
        <label htmlFor="title" className=" mb-1 text-sm font-semibold">
          Task Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Task Title"
          value={task.title}
          className={`border p-2 w-full rounded ${
            errors.title ? "border-red-500" : ""
          }`}
          onChange={handleChange}
        />
        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="description" className=" mb-1 text-sm font-semibold">
          Task Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Task Description"
          className={`border p-2 w-full rounded ${
            errors.description ? "border-red-500" : ""
          }`}
          value={task.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description}</p>
        )}
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="priority" className=" mb-1 text-sm font-semibold">
          Priority
        </label>
        <select
          name="priority"
          id="priority"
          className="border p-2 w-full rounded"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="status" className=" mb-1 text-sm font-semibold">
          Status
        </label>
        <select
          name="status"
          id="status"
          className="border p-2 w-full rounded"
          value={task.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {isEdit
          ? loading
            ? "Updating..."
            : "Update Task"
          : loading
          ? "Adding..."
          : "Add Task"}
      </button>
      {isEdit && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded pt-2 w-full mt-2"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

export default TaskForm;
