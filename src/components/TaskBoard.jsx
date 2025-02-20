import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editValues, setEditValues] = useState({ title: "", description: "" });

  // Fetch tasks from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Handle Drag Start
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  // Handle Drop
  const handleDrop = async (e, newCategory) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, category: newCategory } : task
    );
    setTasks(updatedTasks);

    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, {
        category: newCategory,
      });
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  // Add Task (from TaskForm)
  const addTask = async (newTask) => {
    try {
      const res = await axios.post("http://localhost:5000/tasks", newTask);
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete Task
  const handleDelete = async (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
    await axios.delete(`http://localhost:5000/tasks/${taskId}`);
  };

  // Enable edit mode
  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditValues({ title: task.title, description: task.description });
  };

  // Handle edit input change
  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  // Save edited task
  const handleEditSave = async () => {
    if (!editValues.title.trim()) return alert("Task title cannot be empty!");

    const updatedTasks = tasks.map((task) =>
      task._id === editingTask
        ? { ...task, title: editValues.title, description: editValues.description }
        : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);

    try {
      await axios.put(`http://localhost:5000/tasks/${editingTask}`, {
        title: editValues.title,
        description: editValues.description,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-5">
      {/* TaskForm Component */}
      <TaskForm addTask={addTask} />

      {/* Task Board */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-gray-100 p-4 rounded-lg min-h-[300px]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, category)}
          >
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            {tasks
              .filter((task) => task.category === category)
              .map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-3 rounded shadow mb-2 cursor-pointer"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task._id)}
                  onDoubleClick={() => handleEdit(task)}
                >
                  {editingTask === task._id ? (
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="title"
                        value={editValues.title}
                        onChange={handleEditChange}
                        className="p-1 border rounded w-full mb-2"
                        autoFocus
                        onBlur={handleEditSave}
                        onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
                      />
                      <input
                        type="text"
                        name="description"
                        value={editValues.description}
                        onChange={handleEditChange}
                        className="p-1 border rounded w-full"
                        onBlur={handleEditSave}
                        onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm">{task.description}</p>
                      <button
                        className="text-red-500 text-sm mt-2"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
