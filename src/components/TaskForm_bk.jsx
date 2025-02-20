import { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({ title, description, category, order: 0 });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      >
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Add Task</button>
    </form>
  );
};

export default TaskForm;
