import { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required!");

    const newTask = {
      title,
      description,
      category,
      timestamp: new Date().toISOString(),
    };

    // Send task to backend
    const { data } = await axios.post("http://localhost:5000/tasks", newTask);

    if (data.insertedId) {
      onTaskAdded({ ...newTask, _id: data.insertedId });
      setTitle("");
      setDescription("");
      setCategory("To-Do");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        maxLength="50"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <textarea
        placeholder="Description (optional)"
        maxLength="200"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
